// js/voice-whisper-shim.js  (v3)
// Dans Brave, remplace la dictee Google (bloquee) par Whisper 100 % local.
(function () {
  'use strict';
  var MODE = localStorage.getItem('voice.whisper'); // '1' = forcer partout, '0' = desactiver
  if (MODE === '0' || (!navigator.brave && MODE !== '1')) return;

  var CFG = {
    lib: 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.2',
    model: localStorage.getItem('voice.model') || 'onnx-community/whisper-base',
    threshold: 0.015,
    silenceMs: 1200,
    noSpeechMs: 8000,
    maxSegmentMs: 30000
  };

  // ---------- Message a l'ecran ----------
  var box = null, boxTimer = null;
  function toast(msg, ms) {
    console.log('[whisper]', msg);
    if (!box) {
      box = document.createElement('div');
      box.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:#222;color:#fff;padding:9px 15px;border-radius:10px;font:13px system-ui,sans-serif;z-index:99999;box-shadow:0 4px 16px #0006;max-width:90vw;text-align:center;pointer-events:none';
      document.body.appendChild(box);
    }
    box.textContent = msg;
    box.style.display = msg ? 'block' : 'none';
    clearTimeout(boxTimer);
    if (ms) boxTimer = setTimeout(function () { box.style.display = 'none'; }, ms);
  }

  // ---------- Modele ----------
  var modelP = null, ready = false;
  function loadModel() {
    if (modelP) return modelP;
    modelP = (async function () {
      var mod = await import(CFG.lib);
      var pipeline = mod.pipeline;
      var progress_callback = function (p) {
        if (p.status === 'progress' && String(p.file || '').indexOf('.onnx') !== -1)
          toast('Modele vocal : ' + Math.round(p.progress || 0) + ' % (premiere fois seulement)');
      };
      var t = null, gpu = false;
      try { gpu = !!(navigator.gpu && await navigator.gpu.requestAdapter()); } catch (e) {}
      if (gpu) {
        try {
          t = await pipeline('automatic-speech-recognition', CFG.model, {
            device: 'webgpu', dtype: { encoder_model: 'fp32', decoder_model_merged: 'q4' }, progress_callback: progress_callback
          });
        } catch (e) { console.warn('[whisper] WebGPU KO, passage en WASM', e); }
      }
      if (!t) t = await pipeline('automatic-speech-recognition', CFG.model, { device: 'wasm', dtype: 'q8', progress_callback: progress_callback });
      try { await t(new Float32Array(16000), { language: 'french' }); } catch (e) {}
      return t;
    })();
    modelP.then(
      function () { ready = true; localStorage.setItem('voice.whisper.cached', '1'); toast('Modele vocal pret', 1500); },
      function (e) { modelP = null; console.error('[whisper]', e); }
    );
    return modelP;
  }

  var LANGS = { fr: 'french', en: 'english', es: 'spanish', de: 'german', it: 'italian', pt: 'portuguese', nl: 'dutch' };
  function langOf(l) { var c = String(l || 'fr').slice(0, 2).toLowerCase(); return LANGS[c] || c; }

  async function decode16k(blob) {
    var ac = new AudioContext({ sampleRate: 16000 });
    try { var b = await ac.decodeAudioData(await blob.arrayBuffer()); return b.getChannelData(0); }
    finally { ac.close(); }
  }

  var queue = Promise.resolve();
  function transcribe(blob, lang) {
    var job = queue.then(async function () {
      var audio = await decode16k(blob);
      var t = await loadModel();
      var forced = localStorage.getItem('voice.lang');
      var opts = { task: 'transcribe', chunk_length_s: 30, stride_length_s: 5 };
      if (forced !== 'auto') opts.language = forced || langOf(lang);
      var out = await t(audio, opts);
      return (out && out.text) || '';
    });
    queue = job.catch(function () {});
    return job;
  }

  // Filtre les "hallucinations" classiques de Whisper (sans sequences speciales)
  var JUNK = ['amara.org', 'sous-titr', 'avoir regard', 'abonnez-vous', 'thanks for watching'];
  function stripBetween(s, open, close) {
    var out = '', depth = 0;
    for (var i = 0; i < s.length; i++) {
      var ch = s.charAt(i);
      if (ch === open) { depth++; continue; }
      if (ch === close && depth > 0) { depth--; continue; }
      if (depth === 0) out += ch;
    }
    return out;
  }
  function clean(t) {
    t = String(t || '');
    t = stripBetween(t, String.fromCharCode(91), String.fromCharCode(93)); // crochets
    t = stripBetween(t, String.fromCharCode(40), String.fromCharCode(41)); // parentheses
    t = t.split(String.fromCharCode(9834)).join('');                       // note de musique
    t = t.replace(/\s+/g, ' ').trim();
    var low = t.toLowerCase();
    for (var i = 0; i < JUNK.length; i++) if (low.indexOf(JUNK[i]) !== -1) return '';
    if (!/[a-z0-9\u00C0-\u024F]/i.test(t)) return '';
    return t;
  }

  function list(arr) { var a = arr.slice(); a.item = function (i) { return this[i]; }; return a; }

  // ---------- Remplacant de SpeechRecognition ----------
  class WhisperRecognition extends EventTarget {
    constructor() {
      super();
      this.lang = document.documentElement.lang || 'fr-FR';
      this.continuous = false; this.interimResults = false; this.maxAlternatives = 1; this.grammars = null;
      var names = ['start', 'end', 'result', 'error', 'nomatch', 'audiostart', 'audioend', 'soundstart', 'soundend', 'speechstart', 'speechend'];
      for (var i = 0; i < names.length; i++) this['on' + names[i]] = null;
      this._s = null;
    }
    _emit(type, props) {
      var ev = new Event(type);
      if (props) for (var k in props) Object.defineProperty(ev, k, { value: props[k], enumerable: true });
      this.dispatchEvent(ev);
      try { if (typeof this['on' + type] === 'function') this['on' + type].call(this, ev); } catch (e) { console.error(e); }
    }
    start() {
      if (this._s) throw new DOMException('recognition has already started.', 'InvalidStateError');
      var s = this._s = { stopped: false, aborted: false, results: [], spoke: false, cut: null };
      this._run(s);
    }
    stop() { var s = this._s; if (s && !s.stopped) { s.stopped = true; if (s.cut) s.cut(); } }
    abort() { var s = this._s; if (s && !s.stopped) { s.stopped = true; s.aborted = true; if (s.cut) s.cut(); } }

    _deliver(s, raw) {
      if (s.aborted) return;
      console.log('[whisper] entendu :', JSON.stringify(raw));
      var text = clean(raw);
      if (!text) { this._emit('nomatch', { resultIndex: s.results.length, results: list(s.results) }); return; }
      var res = [{ transcript: (s.results.length ? ' ' : '') + text, confidence: 0.9 }];
      res.isFinal = true;
      res.item = function (i) { return this[i]; };
      s.results.push(res);
      this._emit('result', { resultIndex: s.results.length - 1, results: list(s.results) });
    }

    async _run(s) {
      var self = this, stream = null, ac = null, timer = null, started = false;
      var jobs = [], lang = this.lang;
      loadModel().catch(function () {});
      try {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
        } catch (e) {
          self._emit('error', { error: e.name === 'NotAllowedError' ? 'not-allowed' : 'audio-capture', message: e.message });
          return;
        }
        if (s.stopped) return;
        started = true;
        self._emit('start'); self._emit('audiostart');

        ac = new AudioContext();
        try { await ac.resume(); } catch (e) {}
        var an = ac.createAnalyser(); an.fftSize = 2048;
        ac.createMediaStreamSource(stream).connect(an);
        var buf = new Float32Array(an.fftSize);
        var t0 = performance.now();

        while (!s.stopped) {
          var rec = new MediaRecorder(stream), chunks = [];
          rec.ondataavailable = function (e) { if (e.data.size) chunks.push(e.data); };
          var done = new Promise(function (r) { rec.onstop = r; });
          rec.start(250);
          var segStart = performance.now(), last = segStart, spoke = false;
          await new Promise(function (resolve) {
            s.cut = resolve;
            timer = setInterval(function () {
              an.getFloatTimeDomainData(buf);
              var sum = 0;
              for (var i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
              var now = performance.now();
              if (Math.sqrt(sum / buf.length) > CFG.threshold) {
                if (!spoke) { spoke = s.spoke = true; self._emit('speechstart'); }
                last = now;
              }
              if (spoke && now - last > CFG.silenceMs) resolve();
              else if (now - segStart > CFG.maxSegmentMs) resolve();
              else if (!spoke && !self.continuous && now - t0 > CFG.noSpeechMs) resolve();
            }, 50);
          });
          clearInterval(timer); s.cut = null;
          if (rec.state !== 'inactive') rec.stop();
          await done;
          if (spoke) self._emit('speechend');
          if (spoke && !s.aborted) {
            if (!ready) toast('Chargement du modele vocal...');
            var blob = new Blob(chunks, { type: rec.mimeType });
            jobs.push(transcribe(blob, lang).then(
              function (t) { self._deliver(s, t); },
              function (e) {
                toast('Modele vocal indisponible : baisse les Shields pour ce site ou verifie ta connexion.', 7000);
                self._emit('error', { error: 'network', message: String((e && e.message) || e) });
              }
            ));
          }
          if (!self.continuous) break;
        }
        if (!s.spoke && !s.stopped && !self.continuous) self._emit('error', { error: 'no-speech', message: '' });
      } catch (e) {
        console.error('[whisper]', e);
        self._emit('error', { error: 'audio-capture', message: String((e && e.message) || e) });
      } finally {
        clearInterval(timer);
        if (stream) stream.getTracks().forEach(function (t) { t.stop(); });
        if (ac) ac.close().catch(function () {});
        if (started) self._emit('audioend');
        await Promise.allSettled(jobs);
        if (s.aborted) self._emit('error', { error: 'aborted', message: '' });
        self._s = null;
        self._emit('end');
      }
    }
  }

  window.SpeechRecognition = WhisperRecognition;
  window.webkitSpeechRecognition = WhisperRecognition;
  window.WhisperVoice = { preload: loadModel, config: CFG, isReady: function () { return ready; } };

  if (localStorage.getItem('voice.whisper.cached') === '1')
    (window.requestIdleCallback || setTimeout)(function () { loadModel().catch(function () {}); }, 3000);

  console.log('[whisper] Dictee locale active (Brave) - modele : ' + CFG.model);
})();
