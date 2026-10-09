'use strict';
/*
 * Tests du remplaçant Whisper (js/voice-whisper-shim.js), exécuté dans une fenêtre simulée :
 * faux micro, faux MediaRecorder, faux AudioContext et horloge contrôlée (50 ms par pas).
 *
 * Testé : activation, choix de la langue envoyée à Whisper, filtrage du texte, journal
 * « [whisper] entendu : », cycle de vie de la reconnaissance, erreurs, chargement du modèle.
 *
 * NON testé ici : la qualité de Whisper. Aucun modèle n'est chargé (le bac à sable ne joint
 * pas Hugging Face). Seul un essai dans un vrai navigateur, avec un vrai micro, la mesure.
 *
 * Une seule substitution est faite dans le code testé : l'import dynamique du CDN
 * (`await import(CFG.lib)`) devient `await __shimImport(CFG.lib)`. Le test vérifie qu'elle
 * n'a lieu qu'une fois ; le fichier du shim reste intact.
 */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const SHIM_SRC = fs.readFileSync(path.join(__dirname, '..', 'js', 'voice-whisper-shim.js'), 'utf8');
const IMPORT_CALL = 'await import(CFG.lib)';
const EVENT_TYPES = ['start', 'audiostart', 'speechstart', 'speechend', 'audioend', 'result', 'nomatch', 'error', 'end'];
const flush = () => new Promise(resolve => setImmediate(resolve));

/* Attend qu'une condition devienne vraie (en laissant tourner les promesses). */
async function until(cond, label, max = 2000) {
  for (let i = 0; i < max; i++) {
    if (cond()) return;
    await flush();
  }
  throw new Error('délai dépassé : ' + label);
}

/* Faux pipeline Transformers.js : enregistre les appels et renvoie un transcripteur factice. */
function fakePipeline(env, task, model, options) {
  env.pipelineCalls.push({ task, model, options });
  return (async () => {
    if (options.device === 'webgpu' && env.webgpuFails) throw new Error('WebGPU indisponible');
    if (env.modelFailing) throw new Error('modèle injoignable');
    if (env.modelGate) await env.modelGate;
    return async function transcriber(audio, opts) {
      env.transcribeCalls.push({ audioLen: audio.length, opts: Object.assign({}, opts) });
      if (audio.length === 16000) return { text: '' };          // échauffement du modèle (1 s de silence)
      if (env.transcribeError) throw env.transcribeError;
      return { text: env.answers.length ? env.answers.shift() : '' };
    };
  })();
}

function makeEnv({ storage = {}, brave = false, gpu = false, htmlLang = 'fr' } = {}) {
  const env = {
    now: 0, level: 0, nextId: 1,
    logs: [], timeouts: [], intervals: new Map(),
    storage: new Map(Object.entries(storage)),
    pipelineCalls: [], transcribeCalls: [], answers: [], decodedTexts: [], imports: [],
    recorders: [], elements: [], chunkCount: 0, tracksStopped: 0,
    transcribeError: null, modelFailing: false, webgpuFails: false, micError: null, modelGate: null,
  };
  env.analyser = { fftSize: 0, getFloatTimeDomainData(buf) { buf.fill(env.level); } };
  const sandbox = {
    console: {
      log: (...a) => env.logs.push(a.join(' ')),
      warn: (...a) => env.logs.push('warn: ' + a.join(' ')),
      error: (...a) => env.logs.push('error: ' + a.map(String).join(' ')),
    },
    localStorage: {
      getItem: k => (env.storage.has(k) ? env.storage.get(k) : null),
      setItem: (k, v) => { env.storage.set(k, String(v)); },
      removeItem: k => { env.storage.delete(k); },
    },
    navigator: {
      brave: brave ? {} : undefined,
      gpu: gpu ? { requestAdapter: async () => ({}) } : undefined,
      mediaDevices: {
        getUserMedia: async () => {
          if (env.micError) throw env.micError;
          return { getTracks: () => [{ stop() { env.tracksStopped++; } }] };
        },
      },
    },
    document: {
      documentElement: { lang: htmlLang },
      body: { appendChild(el) { env.elements.push(el); } },
      createElement: () => ({ style: {}, textContent: '' }),
    },
    performance: { now: () => env.now },
    setInterval: (fn, ms) => { const id = env.nextId++; env.intervals.set(id, { fn, ms, due: env.now + ms }); return id; },
    clearInterval: id => { env.intervals.delete(id); },
    setTimeout: (fn, ms) => { const id = env.nextId++; env.timeouts.push({ id, fn, ms, done: false }); return id; },
    clearTimeout: id => { const t = env.timeouts.find(x => x.id === id); if (t) t.done = true; },
    EventTarget, Event, DOMException, Blob,
    AudioContext: class {
      constructor(options) { this.options = options; }
      resume() { return Promise.resolve(); }
      createAnalyser() { return env.analyser; }
      createMediaStreamSource() { return { connect() {} }; }
      decodeAudioData(buffer) {
        env.decodedTexts.push(Buffer.from(buffer).toString('utf8'));
        return Promise.resolve({ getChannelData: () => new Float32Array(4000) });
      }
      close() { return Promise.resolve(); }
    },
    MediaRecorder: class {
      constructor(stream) {
        this.stream = stream; this.state = 'inactive'; this.mimeType = 'audio/webm';
        this.ondataavailable = null; this.onstop = null;
        env.recorders.push(this);
      }
      start() { this.state = 'recording'; }
      stop() {
        if (this.state === 'inactive') return;
        this.state = 'inactive';
        env.chunkCount++;
        if (this.ondataavailable) this.ondataavailable({ data: new Blob(['chunk-' + env.chunkCount]) });
        if (this.onstop) this.onstop();
      }
    },
    __shimImport: async url => { env.imports.push(url); return { pipeline: (t, m, o) => fakePipeline(env, t, m, o) }; },
  };
  sandbox.window = sandbox;
  env.win = sandbox;
  const count = SHIM_SRC.split(IMPORT_CALL).length - 1;
  if (count !== 1) throw new Error('substitution de l\'import attendue une fois, trouvée ' + count);
  vm.runInNewContext(SHIM_SRC.replace(IMPORT_CALL, 'await __shimImport(CFG.lib)'), sandbox);
  return env;
}

/* Exécute les minuteries de délai (setTimeout) de durée donnée. */
function runTimeouts(env, ms) {
  for (const t of env.timeouts) {
    if (!t.done && t.ms === ms) { t.done = true; t.fn(); }
  }
}

/* Avance l'horloge factice par pas de 50 ms, en exécutant les intervalles dus. */
async function advance(env, ms) {
  for (let elapsed = 0; elapsed < ms; elapsed += 50) {
    env.now += 50;
    for (const [id, it] of [...env.intervals]) {
      if (env.intervals.has(id) && it.due <= env.now) { it.due += it.ms; it.fn(); }
    }
    await flush();
  }
}

function newRec(env, lang) {
  const rec = new env.win.SpeechRecognition();
  if (lang !== undefined) rec.lang = lang;
  rec.events = [];
  for (const type of EVENT_TYPES) rec['on' + type] = ev => rec.events.push({ type, ev });
  return rec;
}
const types = rec => rec.events.map(e => e.type);
const transcripts = rec => rec.events
  .filter(e => e.type === 'result')
  .map(e => e.ev.results[e.ev.resultIndex][0].transcript);
const utterances = env => env.transcribeCalls.filter(c => c.audioLen !== 16000);
const plain = obj => JSON.parse(JSON.stringify(obj));   // objets créés dans le contexte simulé

async function listen(env, rec) {
  rec.start();
  await until(() => env.intervals.size > 0, 'écoute en cours');
}
async function say(env, speechMs = 400, silenceMs = 1300) {
  env.level = 0.5; await advance(env, speechMs);
  env.level = 0; await advance(env, silenceMs);
}
async function finished(rec) {
  await until(() => rec.events.some(e => e.type === 'end'), 'fin de session');
}
async function session(env, rec, answer) {
  if (answer !== undefined) env.answers.push(answer);
  await listen(env, rec);
  await say(env);
  await finished(rec);
}
/* Langue effectivement envoyée à Whisper pour une phrase dite avec un module réglé sur `lang`. */
async function languageOptsFor(env, lang) {
  const rec = newRec(env, lang);
  await session(env, rec, 'soy beans');
  return utterances(env).at(-1).opts;
}

/* ══ A. Activation et configuration ═══════════════════════════════════════════ */

test('hors Brave et sans réglage, SpeechRecognition reste celui du navigateur', () => {
  const env = makeEnv();
  assert.equal(env.win.SpeechRecognition, undefined);
  assert.equal(env.win.webkitSpeechRecognition, undefined);
});

test('sur Brave, SpeechRecognition et webkitSpeechRecognition désignent la même classe', () => {
  const env = makeEnv({ brave: true });
  assert.equal(typeof env.win.SpeechRecognition, 'function');
  assert.equal(env.win.webkitSpeechRecognition, env.win.SpeechRecognition);
});

test('voice.whisper = 0 désactive le remplacement, même sur Brave', () => {
  const env = makeEnv({ brave: true, storage: { 'voice.whisper': '0' } });
  assert.equal(env.win.SpeechRecognition, undefined);
});

test('voice.whisper = 1 force le remplacement hors Brave', () => {
  const env = makeEnv({ storage: { 'voice.whisper': '1' } });
  assert.equal(typeof env.win.SpeechRecognition, 'function');
});

test('modèle par défaut : onnx-community/whisper-base', () => {
  const env = makeEnv({ brave: true });
  assert.equal(env.win.WhisperVoice.config.model, 'onnx-community/whisper-base');
});

test('voice.model remplace le modèle par défaut (ex. whisper-small)', () => {
  const env = makeEnv({ brave: true, storage: { 'voice.model': 'onnx-community/whisper-small' } });
  assert.equal(env.win.WhisperVoice.config.model, 'onnx-community/whisper-small');
});

test('bibliothèque figée sur Transformers.js 3.0.2', () => {
  const env = makeEnv({ brave: true });
  assert.equal(env.win.WhisperVoice.config.lib, 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.2');
});

test('seuils de détection inchangés (volume, silence, pas de parole, segment maximal)', () => {
  const { config } = makeEnv({ brave: true }).win.WhisperVoice;
  assert.equal(config.threshold, 0.015);
  assert.equal(config.silenceMs, 1200);
  assert.equal(config.noSpeechMs, 8000);
  assert.equal(config.maxSegmentMs, 30000);
});

test('avec cache : préchargement planifié à 3 s, rien n\'est chargé avant', () => {
  const env = makeEnv({ brave: true, storage: { 'voice.whisper.cached': '1' } });
  assert.ok(env.timeouts.some(t => t.ms === 3000), 'préchargement planifié');
  assert.equal(env.imports.length, 0, 'rien n\'est chargé avant le délai');
  runTimeouts(env, 3000);
  assert.equal(env.imports.length, 1, 'la bibliothèque est chargée après le délai');
});

test('sans cache, aucun préchargement n\'est planifié', () => {
  const env = makeEnv({ brave: true });
  assert.equal(env.timeouts.some(t => t.ms === 3000), false);
  assert.equal(env.imports.length, 0);
});

/* ══ B. Modèle, GPU et progression ════════════════════════════════════════════ */

test('sans GPU : Whisper chargé en WASM, quantification q8', async () => {
  const env = makeEnv({ brave: true, storage: { 'voice.whisper.cached': '1' } });
  runTimeouts(env, 3000);
  await until(() => env.pipelineCalls.length > 0, 'chargement du modèle');
  const call = env.pipelineCalls[0];
  assert.equal(call.model, 'onnx-community/whisper-base');
  assert.equal(call.options.device, 'wasm');
  assert.equal(call.options.dtype, 'q8');
});

test('avec GPU : WebGPU, encodeur en fp32 et décodeur en q4', async () => {
  const env = makeEnv({ brave: true, gpu: true, storage: { 'voice.whisper.cached': '1' } });
  runTimeouts(env, 3000);
  await until(() => env.pipelineCalls.length > 0, 'chargement du modèle');
  const { device, dtype } = env.pipelineCalls[0].options;
  assert.equal(device, 'webgpu');
  assert.deepEqual(plain(dtype), { encoder_model: 'fp32', decoder_model_merged: 'q4' });
});

test('GPU en échec : repli automatique sur WASM', async () => {
  const env = makeEnv({ brave: true, gpu: true, storage: { 'voice.whisper.cached': '1' } });
  env.webgpuFails = true;
  runTimeouts(env, 3000);
  await until(() => env.pipelineCalls.length >= 2, 'second essai');
  assert.equal(env.pipelineCalls[0].options.device, 'webgpu');
  assert.equal(env.pipelineCalls[1].options.device, 'wasm');
  assert.equal(env.pipelineCalls[1].options.dtype, 'q8');
  assert.ok(env.logs.some(l => l.includes('WebGPU KO')), 'le repli est journalisé');
});

test('progression d\'un fichier .onnx : pourcentage arrondi affiché', async () => {
  const env = makeEnv({ brave: true, storage: { 'voice.whisper.cached': '1' } });
  runTimeouts(env, 3000);
  await until(() => env.pipelineCalls.length > 0, 'chargement du modèle');
  env.pipelineCalls[0].options.progress_callback({ status: 'progress', file: 'onnx/encoder_model.onnx', progress: 42.4 });
  assert.ok(env.logs.includes('[whisper] Modele vocal : 42 % (premiere fois seulement)'));
});

test('progression d\'un fichier qui n\'est pas un .onnx : rien n\'est affiché', async () => {
  const env = makeEnv({ brave: true, storage: { 'voice.whisper.cached': '1' } });
  runTimeouts(env, 3000);
  await until(() => env.pipelineCalls.length > 0, 'chargement du modèle');
  env.pipelineCalls[0].options.progress_callback({ status: 'progress', file: 'tokenizer.json', progress: 80 });
  assert.equal(env.logs.some(l => l.includes('Modele vocal : ')), false);
});

test('première utilisation : « Chargement » pendant l\'attente du modèle, puis « pret »', async () => {
  const env = makeEnv({ brave: true });
  let release;
  env.modelGate = new Promise(resolve => { release = resolve; });
  env.answers.push('soy beans');
  const rec = newRec(env, 'en-GB');
  await listen(env, rec);
  await say(env);
  await until(() => env.logs.some(l => l.includes('Chargement du modele vocal')), 'message de chargement');
  release();
  await finished(rec);
  const iLoading = env.logs.findIndex(l => l.includes('Chargement du modele vocal'));
  const iReady = env.logs.findIndex(l => l.includes('Modele vocal pret'));
  assert.ok(iLoading >= 0 && iReady > iLoading, 'chargement puis prêt, dans cet ordre');
  assert.deepEqual(transcripts(rec), ['soy beans']);
});

/* ══ C. Langue envoyée à Whisper ══════════════════════════════════════════════ */

test('sans voice.lang : la langue du module (en-GB) donne english', async () => {
  const opts = await languageOptsFor(makeEnv({ brave: true }), 'en-GB');
  assert.equal(opts.language, 'english');
});

test('sans voice.lang : la langue du module (fr-FR) donne french', async () => {
  const opts = await languageOptsFor(makeEnv({ brave: true }), 'fr-FR');
  assert.equal(opts.language, 'french');
});

test('voice.lang = english l\'emporte sur fr-FR', async () => {
  const opts = await languageOptsFor(makeEnv({ brave: true, storage: { 'voice.lang': 'english' } }), 'fr-FR');
  assert.equal(opts.language, 'english');
});

test('voice.lang = french l\'emporte sur en-GB', async () => {
  const opts = await languageOptsFor(makeEnv({ brave: true, storage: { 'voice.lang': 'french' } }), 'en-GB');
  assert.equal(opts.language, 'french');
});

test('voice.lang = auto : aucune clé language, Whisper détecte la langue', async () => {
  const opts = await languageOptsFor(makeEnv({ brave: true, storage: { 'voice.lang': 'auto' } }), 'en-GB');
  assert.equal('language' in opts, false);
});

test('voice.lang vide : retombe sur la langue du module', async () => {
  const opts = await languageOptsFor(makeEnv({ brave: true, storage: { 'voice.lang': '' } }), 'en-GB');
  assert.equal(opts.language, 'english');
});

test('voice.lang changé entre deux phrases : appliqué à la phrase suivante', async () => {
  const env = makeEnv({ brave: true, storage: { 'voice.lang': 'english' } });
  const rec = newRec(env, 'fr-FR');
  await session(env, rec, 'soy beans');
  assert.equal(utterances(env).at(-1).opts.language, 'english');
  env.storage.set('voice.lang', 'auto');
  rec.events.length = 0;
  await session(env, rec, 'tree');
  assert.equal('language' in utterances(env).at(-1).opts, false);
});

test('task, chunk_length_s et stride_length_s toujours fournis (forcé ou auto)', async () => {
  const env = makeEnv({ brave: true, storage: { 'voice.lang': 'english' } });
  const forced = await languageOptsFor(env, 'fr-FR');
  env.storage.set('voice.lang', 'auto');
  const auto = await languageOptsFor(env, 'fr-FR');
  for (const opts of [forced, auto]) {
    assert.equal(opts.task, 'transcribe');
    assert.equal(opts.chunk_length_s, 30);
    assert.equal(opts.stride_length_s, 5);
  }
});

test('espagnol, allemand, portugais, néerlandais et italien sont reconnus', async () => {
  const env = makeEnv({ brave: true });
  const expected = [['es-ES', 'spanish'], ['de-DE', 'german'], ['pt-BR', 'portuguese'], ['nl-NL', 'dutch'], ['it-IT', 'italian']];
  for (const [lang, name] of expected) {
    const opts = await languageOptsFor(env, lang);
    assert.equal(opts.language, name, lang);
  }
});

test('langue hors de la table (ja-JP) : le code « ja » est transmis tel quel', async () => {
  const opts = await languageOptsFor(makeEnv({ brave: true }), 'ja-JP');
  assert.equal(opts.language, 'ja');
});

test('sans langue du module, la langue de la page sert de repli', async () => {
  const opts = await languageOptsFor(makeEnv({ brave: true, htmlLang: 'en' }), undefined);
  assert.equal(opts.language, 'english');
});

/* ══ D. Filtrage du texte et journal ══════════════════════════════════════════ */

test('journal : le texte brut est écrit avant tout filtrage', async () => {
  const env = makeEnv({ brave: true });
  const rec = newRec(env, 'en-GB');
  await session(env, rec, '[BLANK_AUDIO]');
  assert.ok(env.logs.includes('[whisper] entendu : "[BLANK_AUDIO]"'));
  assert.ok(types(rec).includes('nomatch'), 'le texte filtré ne donne aucun résultat');
});

test('journal : texte échappé en JSON, guillemets compris', async () => {
  const env = makeEnv({ brave: true });
  const rec = newRec(env, 'en-GB');
  await session(env, rec, 'il dit "oui"');
  assert.ok(env.logs.includes('[whisper] entendu : ' + JSON.stringify('il dit "oui"')));
  assert.deepEqual(transcripts(rec), ['il dit "oui"']);
});

test('texte entre crochets supprimé', async () => {
  const env = makeEnv({ brave: true });
  const rec = newRec(env, 'en-GB');
  await session(env, rec, '[Music] soy beans');
  assert.deepEqual(transcripts(rec), ['soy beans']);
});

test('texte entre parenthèses supprimé', async () => {
  const env = makeEnv({ brave: true });
  const rec = newRec(env, 'en-GB');
  await session(env, rec, '(laughs) tree');
  assert.deepEqual(transcripts(rec), ['tree']);
});

test('notes de musique supprimées et espaces multiples réduits', async () => {
  const env = makeEnv({ brave: true });
  const rec = newRec(env, 'en-GB');
  await session(env, rec, '  ♪ tree   ♪ ');
  assert.deepEqual(transcripts(rec), ['tree']);
});

test('hallucination « Thanks for watching » : aucun résultat', async () => {
  const env = makeEnv({ brave: true });
  const rec = newRec(env, 'en-GB');
  await session(env, rec, 'Thanks for watching!');
  assert.ok(types(rec).includes('nomatch'));
  assert.equal(transcripts(rec).length, 0);
});

test('hallucinations « amara.org » et « sous-titres » : aucun résultat', async () => {
  const env = makeEnv({ brave: true });
  const first = newRec(env, 'fr-FR');
  await session(env, first, 'Visitez amara.org');
  const second = newRec(env, 'fr-FR');
  await session(env, second, 'Sous-titres réalisés par la communauté');
  assert.equal(transcripts(first).length, 0);
  assert.equal(transcripts(second).length, 0);
});

test('ponctuation seule : aucun résultat', async () => {
  const env = makeEnv({ brave: true });
  const rec = newRec(env, 'en-GB');
  await session(env, rec, '...');
  assert.ok(types(rec).includes('nomatch'));
});

test('lettres accentuées conservées', async () => {
  const env = makeEnv({ brave: true });
  const rec = newRec(env, 'fr-FR');
  await session(env, rec, 'élève');
  assert.deepEqual(transcripts(rec), ['élève']);
});

/* ══ E. Cycle de vie, erreurs et fiabilité ════════════════════════════════════ */

test('phrase nominale : start, audiostart, speechstart, speechend, audioend, result, end', async () => {
  const env = makeEnv({ brave: true });
  const rec = newRec(env, 'en-GB');
  await session(env, rec, 'soy beans');
  assert.deepEqual(types(rec), ['start', 'audiostart', 'speechstart', 'speechend', 'audioend', 'result', 'end']);
});

test('start() deux fois de suite : InvalidStateError', async () => {
  const env = makeEnv({ brave: true });
  const rec = newRec(env, 'en-GB');
  rec.start();
  assert.throws(() => rec.start(), { name: 'InvalidStateError' });
  rec.abort();
  await finished(rec);
});

test('silence seul : erreur no-speech après 8 s, puis fin', async () => {
  const env = makeEnv({ brave: true });
  const rec = newRec(env, 'en-GB');
  await listen(env, rec);
  await advance(env, 8100);
  await finished(rec);
  assert.deepEqual(types(rec), ['start', 'audiostart', 'error', 'audioend', 'end']);
  assert.equal(rec.events.find(e => e.type === 'error').ev.error, 'no-speech');
});

test('permission de micro refusée : erreur not-allowed, sans démarrage', async () => {
  const env = makeEnv({ brave: true });
  env.micError = Object.assign(new Error('refusé'), { name: 'NotAllowedError' });
  const rec = newRec(env, 'en-GB');
  rec.start();
  await finished(rec);
  assert.deepEqual(types(rec), ['error', 'end']);
  assert.equal(rec.events[0].ev.error, 'not-allowed');
});

test('micro introuvable : erreur audio-capture', async () => {
  const env = makeEnv({ brave: true });
  env.micError = Object.assign(new Error('aucun périphérique'), { name: 'NotFoundError' });
  const rec = newRec(env, 'en-GB');
  rec.start();
  await finished(rec);
  assert.equal(rec.events[0].ev.error, 'audio-capture');
});

test('abort() pendant la parole : erreur aborted, rien n\'est transcrit', async () => {
  const env = makeEnv({ brave: true });
  const rec = newRec(env, 'en-GB');
  await listen(env, rec);
  env.level = 0.5;
  await advance(env, 400);
  rec.abort();
  await finished(rec);
  assert.equal(rec.events.find(e => e.type === 'error').ev.error, 'aborted');
  assert.equal(transcripts(rec).length, 0);
  assert.equal(utterances(env).length, 0, 'aucune transcription lancée');
});

test('stop() pendant la parole : la phrase est tout de même transcrite', async () => {
  const env = makeEnv({ brave: true });
  env.answers.push('soy beans');
  const rec = newRec(env, 'en-GB');
  await listen(env, rec);
  env.level = 0.5;
  await advance(env, 400);
  rec.stop();
  await finished(rec);
  assert.deepEqual(transcripts(rec), ['soy beans']);
  assert.equal(types(rec).includes('error'), false);
});

test('stop() sans start() : aucune exception, aucun événement', () => {
  const env = makeEnv({ brave: true });
  const rec = newRec(env, 'en-GB');
  assert.doesNotThrow(() => rec.stop());
  assert.deepEqual(types(rec), []);
});

test('échec de transcription : erreur network et message affiché 7 s', async () => {
  const env = makeEnv({ brave: true });
  env.transcribeError = new Error('réseau coupé');
  const rec = newRec(env, 'en-GB');
  await session(env, rec, 'soy beans');
  assert.equal(rec.events.find(e => e.type === 'error').ev.error, 'network');
  assert.ok(env.logs.some(l => l.includes('Modele vocal indisponible')));
  assert.ok(env.timeouts.some(t => t.ms === 7000));
});

test('échec du chargement du modèle, puis nouvel essai qui réussit', async () => {
  const env = makeEnv({ brave: true });
  env.modelFailing = true;
  const failed = newRec(env, 'en-GB');
  await session(env, failed);
  assert.equal(failed.events.find(e => e.type === 'error').ev.error, 'network');
  env.modelFailing = false;
  const retry = newRec(env, 'en-GB');
  await session(env, retry, 'soy beans');
  assert.deepEqual(transcripts(retry), ['soy beans']);
  assert.ok(env.pipelineCalls.length >= 2, 'le modèle est recherché à nouveau');
});

test('après une réussite : isReady() vrai et cache marqué ; avant : faux', async () => {
  const env = makeEnv({ brave: true });
  assert.equal(env.win.WhisperVoice.isReady(), false);
  assert.equal(env.storage.get('voice.whisper.cached'), undefined);
  await session(env, newRec(env, 'en-GB'), 'soy beans');
  assert.equal(env.win.WhisperVoice.isReady(), true);
  assert.equal(env.storage.get('voice.whisper.cached'), '1');
});

test('parole de plus de 30 s : un seul segment transcrit, puis fin', async () => {
  const env = makeEnv({ brave: true });
  env.answers.push('a long answer');
  const rec = newRec(env, 'en-GB');
  await listen(env, rec);
  env.level = 0.5;
  await advance(env, 31000);
  await finished(rec);
  assert.equal(utterances(env).length, 1);
  assert.deepEqual(transcripts(rec), ['a long answer']);
});

test('le segment enregistré est transmis au décodeur (contenu des morceaux)', async () => {
  const env = makeEnv({ brave: true });
  const rec = newRec(env, 'en-GB');
  await session(env, rec, 'soy beans');
  assert.deepEqual(env.decodedTexts, ['chunk-1']);
});

test('deux phrases à la suite : journal et résultats dans l\'ordre', async () => {
  const env = makeEnv({ brave: true });
  const rec = newRec(env, 'en-GB');
  await session(env, rec, 'soy beans');
  rec.events.length = 0;
  await session(env, rec, 'tree');
  assert.deepEqual(transcripts(rec), ['tree']);
  const entendu = env.logs
    .filter(l => l.startsWith('[whisper] entendu :'))
    .map(l => JSON.parse(l.slice('[whisper] entendu : '.length)));
  assert.deepEqual(entendu, ['soy beans', 'tree']);
});
