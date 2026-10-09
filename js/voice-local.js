// js/voice-local.js — Dictée vocale qui marche aussi dans Brave.
// Chrome/Edge : dictée Google. Brave ou erreur "network" : Whisper 100 % local.

const CONFIG = {
  transformersUrl: 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.2',
  model: 'onnx-community/whisper-base', // plus léger : whisper-tiny | plus précis : whisper-small
  language: 'french',
  webSpeechLang: 'fr-FR',
  maxSeconds: 60,          // durée max d'un enregistrement
  silenceStopMs: 2000,     // arrêt auto après 2 s de silence
  silenceThreshold: 0.015,
};

const FAIL_KEY = 'voice.webspeech.failed';
let transcriberPromise = null, transcriberReady = false, current = null, lastField = null;

// ---------- Messages à l'écran ----------
let toast;
function status(msg, ms) {
  console.log('[voice]', msg);
  if (!toast) {
    toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;left:50%;bottom:20px;transform:translateX(-50%);background:#222;color:#fff;padding:10px 16px;border-radius:10px;font:14px system-ui,sans-serif;z-index:99999;box-shadow:0 4px 16px #0006;max-width:90vw;text-align:center';
    document.body.appendChild(toast);
  }
  toast.textContent = msg; toast.style.display = msg ? 'block' : 'none';
  clearTimeout(toast._t);
  if (ms) toast._t = setTimeout(() => (toast.style.display = 'none'), ms);
}

function explain(e) {
  const n = e?.name || '', m = e?.message || String(e);
  if (n === 'NotAllowedError') return 'Micro refusé : clique sur l’icône à gauche de l’adresse → Micro → Autoriser.';
  if (n === 'NotFoundError') return 'Aucun micro détecté.';
  if (n === 'NotReadableError') return 'Micro déjà utilisé par une autre appli (Discord, Teams…).';
  if (/fetch|network|import|load/i.test(m)) return 'Impossible de télécharger le modèle : baisse les Shields de Brave pour ce site ou vérifie ta connexion.';
  return 'Erreur dictée : ' + m;
}

// ---------- Insertion du texte dans le champ ----------
function insertText(target, text) {
  text = (text || '').trim();
  if (!text || !target) return;
  if (target.isContentEditable) {
    target.focus();
    const sep = target.textContent && !/\s$/.test(target.textContent) ? ' ' : '';
    document.execCommand('insertText', false, sep + text);
    return;
  }
  const s = target.selectionStart ?? target.value.length, e = target.selectionEnd ?? target.value.length;
  const before = target.value.slice(0, s), sep = before && !/\s$/.test(before) ? ' ' : '';
  target.value = before + sep + text + target.value.slice(e);
  try { const p = (before + sep + text).length; target.setSelectionRange(p, p); } catch {}
  target.dispatchEvent(new Event('input', { bubbles: true }));
  target.dispatchEvent(new Event('change', { bubbles: true }));
}

// ---------- Bouton ----------
function setButton(btn, state) {
  if (!btn) return;
  btn.dataset.voiceState = state;
  btn.classList.toggle('voice-on', state === 'rec');
  btn.setAttribute('aria-pressed', String(state === 'rec'));
}
function finish(session) { if (current === session) current = null; setButton(session.button, 'idle'); }

// ---------- Moteur 1 : dictée Google ----------
function startWebSpeech(target, button) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const r = new SR();
  r.lang = CONFIG.webSpeechLang; r.continuous = true; r.interimResults = false;
  const session = { button, stop: () => r.stop() };
  r.onresult = (e) => { for (let i = e.resultIndex; i < e.results.length; i++) if (e.results[i].isFinal) insertText(target, e.results[i][0].transcript); };
  r.onerror = (e) => {
    if (e.error === 'network' || e.error === 'service-not-allowed') {
      localStorage.setItem(FAIL_KEY, '1');          // on retient : plus jamais Google sur ce navigateur
      r.onend = null; finish(session);
      status('Dictée Google indisponible → passage en mode local (Whisper)…');
      start(button, target);                          // bascule automatique
      return;
    }
    if (e.error === 'not-allowed') status(explain({ name: 'NotAllowedError' }), 6000);
    else if (!['aborted', 'no-speech'].includes(e.error)) status('Erreur dictée : ' + e.error, 4000);
  };
  r.onend = () => { finish(session); status('', 0); };
  r.start();
  status('🎙️ Je t’écoute… (reclique pour arrêter)');
  return session;
}

// ---------- Moteur 2 : Whisper local ----------
function loadTranscriber() {
  if (!transcriberPromise) {
    transcriberPromise = (async () => {
      const { pipeline } = await import(CONFIG.transformersUrl);
      const progress_callback = (p) => {
        if (p.status === 'progress' && /onnx/.test(p.file || '') && !current?.recording)
          status(`⏳ Téléchargement du modèle (1re fois seulement)… ${Math.round(p.progress || 0)} %`);
      };
      let gpu = false;
      try { gpu = !!(navigator.gpu && await navigator.gpu.requestAdapter()); } catch {}
      if (gpu) {
        try { return await pipeline('automatic-speech-recognition', CONFIG.model, { device: 'webgpu', dtype: { encoder_model: 'fp32', decoder_model_merged: 'q4' }, progress_callback }); }
        catch (e) { console.warn('[voice] WebGPU KO → WASM', e); }
      }
      return await pipeline('automatic-speech-recognition', CONFIG.model, { device: 'wasm', dtype: 'q8', progress_callback });
    })();
    transcriberPromise.then(() => (transcriberReady = true), () => (transcriberPromise = null));
  }
  return transcriberPromise;
}

async function decode16k(blob) {
  const ac = new AudioContext({ sampleRate: 16000 });
  try { return (await ac.decodeAudioData(await blob.arrayBuffer())).getChannelData(0); }
  finally { ac.close(); }
}

const HALLUCINATIONS = /amara\.org|sous-titr|merci d'avoir regardé|abonnez-vous/i;

function startWhisper(target, button) {
  const session = { button, recording: false, stopped: false, _stop: null, stop() { this.stopped = true; this._stop?.(); } };
  (async () => {
    let stream = null, ac = null, tick = null;
    try {
      const modelP = loadTranscriber(); // téléchargement en parallèle de l'enregistrement
      modelP.catch(() => {});
      stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
      if (session.stopped) return;

      const rec = new MediaRecorder(stream), chunks = [];
      rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      const stopped = new Promise((res) => (rec.onstop = res));
      session._stop = () => rec.state !== 'inactive' && rec.stop();

      // détection de silence → arrêt auto
      ac = new AudioContext(); await ac.resume().catch(() => {});
      const an = ac.createAnalyser(); an.fftSize = 2048;
      ac.createMediaStreamSource(stream).connect(an);
      const buf = new Float32Array(an.fftSize);
      const t0 = performance.now(); let last = t0, spoke = false;
      tick = setInterval(() => {
        an.getFloatTimeDomainData(buf);
        let sum = 0; for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
        if (Math.sqrt(sum / buf.length) > CONFIG.silenceThreshold) { last = performance.now(); spoke = true; }
        const now = performance.now();
        if ((spoke && now - last > CONFIG.silenceStopMs) || now - t0 > CONFIG.maxSeconds * 1000) session._stop();
      }, 100);

      session.recording = true;
      rec.start(250);
      status('🎙️ Je t’écoute… (arrêt auto après un silence, ou reclique)');
      await stopped;
      session.recording = false;
      clearInterval(tick); tick = null;
      stream.getTracks().forEach((t) => t.stop()); stream = null;
      ac.close(); ac = null;

      if (!spoke) { status('Je n’ai rien entendu, réessaie.', 3000); return; }
      setButton(button, 'busy');
      const audio = await decode16k(new Blob(chunks, { type: rec.mimeType }));
      if (!transcriberReady) status('⏳ Chargement du modèle (une seule fois)…');
      const transcriber = await modelP;
      status('✍️ Transcription…');
      const out = await transcriber(audio, { language: CONFIG.language, task: 'transcribe', chunk_length_s: 30, stride_length_s: 5 });
      const text = (out?.text || '').trim();
      if (text && !HALLUCINATIONS.test(text)) { insertText(target, text); status('✅ ' + text.slice(0, 80), 2500); }
      else status('Je n’ai rien compris, réessaie.', 3000);
    } catch (e) {
      console.error('[voice]', e);
      status(explain(e), 7000);
    } finally {
      clearInterval(tick);
      stream?.getTracks().forEach((t) => t.stop());
      if (ac) ac.close().catch(() => {});
      finish(session);
    }
  })();
  return session;
}

// ---------- Choix automatique du moteur ----------
function start(button, target) {
  setButton(button, 'rec');
  const google = (window.SpeechRecognition || window.webkitSpeechRecognition) && !navigator.brave && localStorage.getItem(FAIL_KEY) !== '1';
  current = google ? startWebSpeech(target, button) : startWhisper(target, button);
}
function toggle(button, target) { if (current) current.stop(); else start(button, target); }

// ---------- Branchement automatique ----------
document.addEventListener('focusin', (e) => {
  if (e.target.matches?.('textarea, input:not([type]), input[type=text], input[type=search], [contenteditable]:not([contenteditable=false])')) lastField = e.target;
});
// Capture au niveau du document → passe AVANT l'ancien code de 12_voice.js et le neutralise
document.addEventListener('click', (e) => {
  const btn = e.target.closest?.('[data-dictation]');
  if (!btn) return;
  e.preventDefault(); e.stopImmediatePropagation();
  const sel = btn.getAttribute('data-dictation');
  const target = (sel && document.querySelector(sel)) || lastField;
  if (!target) { status('Clique d’abord dans la zone de texte, puis sur le micro.', 4000); return; }
  toggle(btn, target);
}, true);

window.Dictation = {
  toggle, stop: () => current?.stop(),
  preload: loadTranscriber,
  resetGoogle: () => localStorage.removeItem(FAIL_KEY),
  config: CONFIG,
};
console.log('[voice] module chargé —', navigator.brave ? 'Brave → Whisper local' : 'dictée Google avec repli Whisper');
