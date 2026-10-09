// js/voice-whisper-shim.js
// Dans Brave, remplace la dictée Google (bloquée) par Whisper 100 % local.
// 12_voice.js continue d'utiliser webkitSpeechRecognition sans rien changer.
(() => {
  'use strict';
  const MODE = localStorage.getItem('voice.whisper'); // '1' = forcer partout, '0' = désactiver
  if (MODE === '0' || (!navigator.brave && MODE !== '1')) return;

  const CFG = {
    lib: 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.2',
    model: localStorage.getItem('voice.model') || 'onnx-community/whisper-base',
    threshold: 0.015,     // seuil "quelqu'un parle"
    silenceMs: 1200,      // fin de phrase après 1,2 s de silence
    noSpeechMs: 8000,     // erreur "no-speech" si rien entendu en 8 s
    maxSegmentMs: 30000,  // découpe max d'un segment
  };

  // ---------- Petit message à l'écran ----------
  let box;
  function toast(msg, ms) {
    console.log('[whisper]', msg);
    if (!box) {
      box = document.createElement('div');
      box.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:#222;color:#fff;padding:9px 15px;border-radius:10px;font:13px system-ui,sans-serif;z-index:99999;box-shadow:0 4px 16px #0006;max-width:90vw;text-align:center;pointer-events:none';
      document.body.appendChild(box);
    }
    box.textContent = msg; box.style.display = msg ? 'block' : 'none';
    clearTimeout(box._t);
    if (ms) box._t = setTimeout(() => (box.style.display = 'none'), ms);
  }

  // ---------- Modèle ----------
  let modelP = null, ready = false;
  function loadModel() {
    if (modelP) return modelP;
    modelP = (async () => {
      const { pipeline } = await import(CFG.lib);
      const progress_callback = (p) => {
        if (p.status === 'progress' && /\.onnx/.test(p.file || ''))
          toast(`⏳ Modèle vocal : ${Math.round(p.progress || 0)} % (première fois seulement)`);
      };
      let t = null, gpu = false;
      try { gpu = !!(navigator.gpu && await navigator.gpu.requestAdapter()); } catch {}
      if (gpu) {
        try { t = await pipeline('automatic-speech-recognition', CFG.model, { device: 'webgpu', dtype: { encoder_model: 'fp32', decoder_model_merged: 'q4' }, progress_callback }); }
        catch (e) { console.warn('[whisper] WebGPU KO → WASM', e); }
      }
      if (!t) t = await pipeline('automatic-speech-recognition', CFG.model, { device: 'wasm', dtype: 'q8', progress_callback });
      try { await t(new Float32Array(16000), { language: 'french' }); } catch {} // préchauffage
      return t;
    })();
    modelP.then(
      () => { ready = true; localStorage.setItem('voice.whisper.cached', '1'); toast('✅ Modèle vocal prêt', 1500); },
      (e) => { modelP = null; console.error('[whisper]', e); }
    );
    return modelP;
  }

  const LANGS = { fr: 'french', en: 'english', es: 'spanish', de: 'german', it: 'italian', pt: 'portuguese', nl: 'dutch' };
  const langOf = (l) => { const c = (l || 'fr').slice(0, 2).toLowerCase(); return LANGS[c] || c; };

  async function decode16k(blob) {
    const ac = new AudioContext({ sampleRate: 16000 });
    try { return (await ac.decodeAudioData(await blob.arrayBuffer())).getChannelData(0); }
    finally { ac.close(); }
  }

  let queue = Promise.resolve();
  function transcribe(blob, lang) {
    const job = queue.then(async () => {
      const audio = await decode16k(blob);
      const t = await loadModel();
      const out = await t(audio, { language: langOf(lang), task: 'transcribe', chunk_length_s: 30, stride_length_s: 5 });
      return out?.text || '';
    });
    queue = job.catch(() => {});
    return job;
  }

  const JUNK = /amara\.org|sous-titr|merci d'avoir regardé|abonnez-vous|thanks for watching/i;
  function clean(t) {
    t = (t || '').replace(/

$$
[^
$$

]*\]|$[^)]*$|♪/g, '').replace(/\s+/g, ' ').trim();
    return !t || JUNK.test(t) || /^[.,!?…\s-]*$/.test(t) ? '' : t;
  }

  const list = (arr) => Object.assign([...arr], { item(i) { return this[i]; } });

  // ---------- Remplaçant de SpeechRecognition ----------
  class WhisperRecognition extends EventTarget {
    constructor() {
      super();
      this.lang = document.documentElement.lang || 'fr-FR';
      this.continuous = false; this.interimResults = false; this.maxAlternatives = 1; this.grammars = null;
      for (const n of ['start', 'end', 'result', 'error', 'nomatch', 'audiostart', 'audioend', 'soundstart', 'soundend', 'speechstart', 'speechend']) this['on' + n] = null;
      this._s = null;
    }
    _emit(type, props) {
      const ev = new Event(type);
      if (props) for (const k in props) Object.defineProperty(ev, k, { value: props[k], enumerable: true });
      this.dispatchEvent(ev);
      try { this['on' + type]?.call(this, ev); } catch (e) { console.error(e); }
    }
    start() {
      if (this._s) throw new DOMException('recognition has already started.', 'InvalidStateError');
      const s = (this._s = { stopped: false, aborted: false, results: [], spoke: false, cut: null });
      this._run(s);
    }
    stop() { const s = this._s; if (s && !s.stopped) { s.stopped = true; s.cut?.(); } }
    abort() { const s = this._s; if (s && !s.stopped) { s.stopped = true; s.aborted = true; s.cut?.(); } }

    _deliver(s, raw) {
      if (s.aborted) return;
      const text = clean(raw);
      if (!text) { this._emit('nomatch', { resultIndex: s.results.length, results: list(s.results) }); return; }
      const res = Object.assign([{ transcript: (s.results.length ? ' ' : '') + text, confidence: 0.9 }], { isFinal: true, item(i) { return this[i]; } });
      s.results.push(res);
      this._emit('result', { resultIndex: s.results.length - 1, results: list(s.results) });
    }

    async _run(s) {
      let stream = null, ac = null, timer = null, started = false;
      const jobs = [], lang = this.lang;
      loadModel().catch(() => {});
      try {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
        } catch (e) {
          this._emit('error', { error: e.name === 'NotAllowedError' ? 'not-allowed' : 'audio-capture', message: e.message });
          return;
        }
        if (s.stopped) return;
        started = true;
        this._emit('start'); this._emit('audiostart');

        ac = new AudioContext(); await ac.resume().catch(() => {});
        const an = ac.createAnalyser(); an.fftSize = 2048;
        ac.createMediaStreamSource(stream).connect(an);
        const buf = new Float32Array(an.fftSize);
        const t0 = performance.now();

        while (!s.stopped) {
          const rec = new MediaRecorder(stream), chunks = [];
          rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
          const done = new Promise((r) => (rec.onstop = r));
          rec.start(250);
          const segStart = performance.now(); let last = segStart, spoke = false;
          await new Promise((resolve) => {
            s.cut = resolve;
            timer = setInterval(() => {
              an.getFloatTimeDomainData(buf);
              let sum = 0; for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
              const now = performance.now();
              if (Math.sqrt(sum / buf.length) > CFG.threshold) {
                if (!spoke) { spoke = s.spoke = true; this._emit('speechstart'); }
                last = now;
              }
              if (spoke && now - last > CFG.silenceMs) resolve();
              else if (now - segStart > CFG.maxSegmentMs) resolve();
              else if (!spoke && !this.continuous && now - t0 > CFG.noSpeechMs) resolve();
            }, 50);
          });
          clearInterval(timer); s.cut = null;
          if (rec.state !== 'inactive') rec.stop();
          await done;
          if (spoke) this._emit('speechend');
          if (spoke && !s.aborted) {
            if (!ready) toast('⏳ Chargement du modèle vocal…');
            jobs.push(transcribe(new Blob(chunks, { type: rec.mimeType }), lang).then(
              (t) => this._deliver(s, t),
              (e) => { toast('❌ Modèle vocal indisponible : baisse les Shields pour ce site ou vérifie ta connexion.', 7000); this._emit('error', { error: 'network', message: String(e?.message || e) }); }
            ));
          }
          if (!this.continuous) break;
        }
        if (!s.spoke && !s.stopped && !this.continuous) this._emit('error', { error: 'no-speech', message: '' });
      } catch (e) {
        console.error('[whisper]', e);
        this._emit('error', { error: 'audio-capture', message: String(e?.message || e) });
      } finally {
        clearInterval(timer);
        stream?.getTracks().forEach((t) => t.stop());
        ac?.close().catch(() => {});
        if (started) this._emit('audioend');
        await Promise.allSettled(jobs);
        if (s.aborted) this._emit('error', { error: 'aborted', message: '' });
        this._s = null;
        this._emit('end');
      }
    }
  }

  window.SpeechRecognition = WhisperRecognition;
  window.webkitSpeechRecognition = WhisperRecognition;
  window.WhisperVoice = { preload: loadModel, config: CFG, isReady: () => ready };

  // Visites suivantes : on précharge le modèle (déjà en cache) pour répondre plus vite
  if (localStorage.getItem('voice.whisper.cached') === '1')
    (window.requestIdleCallback || setTimeout)(() => loadModel().catch(() => {}), 3000);

  console.log('[whisper] Dictée locale active (Brave) — modèle :', CFG.model);
})();
