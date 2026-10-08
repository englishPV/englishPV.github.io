/*12_voice.js — Révision à la voix (reconnaissance vocale)
  ══════════════════════════════════════════════════════════════════════════
  Moteur : Web Speech API du navigateur (SpeechRecognition / webkitSpeechRecognition).
  C'est le meilleur moteur disponible pour un site statique sans dépendance :
    · Chrome / Edge  → moteur Google (streaming, très bonne précision, gratuit)
    · Safari (iOS)   → dictée Apple
    · Firefox        → non supporté : l'interface se désactive proprement
  Aucun modèle à télécharger, aucun serveur, aucune clé API.

  Trois briques :
   1. VoiceMatch — évaluation d'une réponse orale face à une réponse attendue.
      Alignement « plus longue sous-séquence commune » tolérant aux fautes et
      aux homophones, par tiroirs (formes verbales / traductions alternatives),
      ce qui permet une note à virgule (2 formes sur 3 → 2,33).
   2. VoiceRec — cycle de vie de la reconnaissance (activation continue,
      redémarrage automatique, silence → évaluation, verrouillage).
   3. VoiceUI  — bouton micro, bandeau d'état, section de réglages.

  Le module ne modifie pas le SRS : il fournit une note (rating FSRS flottant)
  que l'application applique comme n'importe quelle évaluation.
  ══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const D = document, M = Math;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const SUPPORTED = !!SR;
  const clamp01 = n => n < 0 ? 0 : n > 1 ? 1 : n;

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ══════════════════════ 1. Préférences ══════════════════════ */
  const PREF_DEFAULTS = {
    voiceOn: false,        // micro activé (mémorisé : il le reste d'une session à l'autre)
    voiceDelay: 1200,      // délai avant la carte suivante quand la réponse est bonne
    voiceTolerance: 'normal',
    voiceLang: 'auto',
    voiceShowSpoken: true
  };
  const TOL = {
    strict:  { sim: 0.96, phonetic: false },
    normal:  { sim: 0.85, phonetic: true },
    lenient: { sim: 0.70, phonetic: true }
  };
  const TOL_LABEL = { strict: 'Stricte', normal: 'Normale', lenient: 'Souple' };
  const LANGS = { auto: 'Automatique', 'en-GB': 'Anglais (UK)', 'en-US': 'Anglais (US)', 'fr-FR': 'Français' };

  function prefs() {
    if (typeof data === 'undefined' || !data || !data.app) return { ...PREF_DEFAULTS };
    data.app.prefs = data.app.prefs || {};
    const p = data.app.prefs;
    for (const k of Object.keys(PREF_DEFAULTS)) if (p[k] === undefined) p[k] = PREF_DEFAULTS[k];
    if (!TOL[p.voiceTolerance]) p.voiceTolerance = 'normal';
    if (!LANGS[p.voiceLang]) p.voiceLang = 'auto';
    p.voiceDelay = M.max(0, M.min(5000, M.round(Number(p.voiceDelay) || 0)));
    return p;
  }
  function persist() {
    try {
      if (typeof debouncedSave === 'function') debouncedSave();
      else if (typeof saveData === 'function') saveData();
    } catch (e) {}
  }

  /* ══════════════════════ 2. Moteur d'évaluation ══════════════════════ */

  /* Mots outils jamais pénalisés (on ne va pas échouer sur un « to » oublié). */
  const NEUTRAL = new Set(['to', 'a', 'an', 'the', 'of']);
  /* Emplacements génériques (sb, sth, qn…) : jamais exigés. */
  const PLACEHOLDER = new Set(['sb', 'sbs', 'sth', 'sthg', 'sone', 'qn', 'qc', 'qqn', 'qch', "one's", 'someone', 'somebody', 'something']);

  const deaccent = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const cleanTok = s => deaccent(String(s).toLowerCase()).replace(/[’‘`´]/g, "'").replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, '');
  const WORD_RE = /[A-Za-zÀ-ÖØ-öø-ÿ0-9]+(?:['’\-][A-Za-zÀ-ÖØ-öø-ÿ0-9]+)*/g;

  function tokenize(raw) {
    const out = [];
    const re = new RegExp(WORD_RE.source, 'g');
    let m;
    while ((m = re.exec(String(raw || '')))) {
      out.push({ raw: m[0], clean: cleanTok(m[0]), start: m.index, end: m.index + m[0].length });
    }
    return out;
  }

  function parseExpected(raw) {
    const toks = tokenize(raw);
    const ranges = [];
    const pre = /\([^)]*\)|\[[^\]]*\]/g;
    let p;
    while ((p = pre.exec(String(raw || '')))) ranges.push([p.index, p.index + p[0].length]);
    toks.forEach(t => {
      t.opt = ranges.some(([a, b]) => t.start >= a && t.end <= b);
      t.neutral = NEUTRAL.has(t.clean) || PLACEHOLDER.has(t.clean);
      t.exigible = !t.opt && !t.neutral;
    });
    return { raw: String(raw || ''), toks };
  }

  /* Une réponse « liste de formes verbales » : mots simples séparés par « / »
     (bear / bore / borne/born). Chaque forme est alors OBLIGATOIRE.
     Ailleurs, les « / » et les virgules séparent des traductions ALTERNATIVES. */
  function looksLikeForms(raw) {
    const s = String(raw || '').replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
    return /^[A-Za-zÀ-ÖØ-öø-ÿ'’-]+(\s*\/\s*[A-Za-zÀ-ÖØ-öø-ÿ'’-]+){1,3}$/.test(s);
  }
  const segmentsOf = raw => String(raw || '').split(/\s*\/\s*/).map(s => s.trim()).filter(Boolean);
  /* Deux listes de mots parallèles (« occidental / oriental » → « western / eastern »)
     = traductions alternatives, pas des formes à réciter. */
  function parallelLists(front, back) {
    const a = segmentsOf(front), b = segmentsOf(back);
    if (a.length < 2 || a.length !== b.length) return false;
    const single = arr => arr.every(x => /^[A-Za-zÀ-ÖØ-öø-ÿ'’-]+$/.test(x));
    return single(a) && single(b);
  }

  /* Découpage en « tiroirs » :
       « / » espacé  → nouveau tiroir obligatoire (mode formes)
       « / » collé   → variante acceptée du même tiroir
       « , »         → variante acceptée du même tiroir
       espace simple → même phrase (plusieurs mots) */
  function buildSlots(parsed, forms) {
    const { toks, raw } = parsed;
    const slots = [];
    toks.forEach((t, k) => {
      const gap = k ? raw.slice(toks[k - 1].end, t.start) : '';
      /* « / » entouré d'espaces = séparateur ; « / » collé = variante acceptée */
      const spaced = /^\s+\/\s*$|^\s*\/\s+$/.test(gap);
      const tight = !spaced && /\/\s*/.test(gap);
      const comma = /,/.test(gap);
      let newSlot = false, variant = false;
      if (k === 0) newSlot = true;
      else if (spaced) { newSlot = true; variant = !forms; }
      else if (tight || comma) { newSlot = true; variant = true; }
      if (newSlot) {
        const slot = { variants: [[t]], toks: [t] };
        if (variant && slots.length) {
          const prev = slots[slots.length - 1];
          prev.variants.push(slot.variants[0]);
          prev.toks.push(...slot.toks);
        } else slots.push(slot);
      } else {
        const slot = slots[slots.length - 1];
        slot.variants[slot.variants.length - 1].push(t);
        slot.toks.push(t);
      }
    });
    slots.forEach(s => s.toks.forEach(t => { t.slot = s; }));
    return slots;
  }

  /* Squelette phonétique (les homophones du quotidien : blew/blue, bear/bare). */
  const SOUND = { b: '1', f: '1', p: '1', v: '1', c: '2', g: '2', j: '2', k: '2', q: '2', s: '2', x: '2', z: '2', d: '3', t: '3', l: '4', m: '5', n: '5', r: '6' };
  function skeleton(w) {
    let out = '', prev = '';
    for (const ch of w) {
      const c = SOUND[ch];
      if (!c) continue;
      if (c !== prev) out += c;
      prev = c;
    }
    return out;
  }

  function lev(a, b) {
    const m = a.length, n = b.length;
    if (!m) return n;
    if (!n) return m;
    let prev = new Array(n + 1), cur = new Array(n + 1);
    for (let j = 0; j <= n; j++) prev[j] = j;
    for (let i = 1; i <= m; i++) {
      cur[0] = i;
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        cur[j] = M.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      }
      const tmp = prev; prev = cur; cur = tmp;
    }
    return prev[n];
  }

  function fuzzyEq(a, b, tol) {
    return wordSim(a, b, tol) > 0;
  }

  /* Similarité graduée : 1 = identique, ~0,8 = variante entendue, 0,78 = homophone.
     Le score gradué permet à l'alignement de préférer « bear↔bear » à « bear↔bore ». */
  function wordSim(a, b, tol) {
    if (!a || !b) return 0;
    if (a === b) return 1;
    const s = 1 - lev(a, b) / M.max(a.length, b.length);
    if (s >= tol.sim) return s;
    if (tol.phonetic && a.length > 3 && b.length > 3) {
      const sa = skeleton(a), sb = skeleton(b);
      if (sa && sa === sb && M.abs(a.length - b.length) <= 1) return 0.78;
    }
    return 0;
  }

  /* Alignement : maximise la similarité totale (et non le nombre de mots). */
  function align(spoken, seq, tol) {
    const n = seq.length, m = spoken.length;
    const dp = Array.from({ length: n + 1 }, () => new Float32Array(m + 1));
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        const up = dp[i - 1][j], left = dp[i][j - 1];
        const dry = dp[i - 1][j - 1] + wordSim(seq[i - 1].clean, spoken[j - 1], tol);
        dp[i][j] = up > left ? (up > dry ? up : dry) : (left > dry ? left : dry);
      }
    }
    const tokOk = new Array(n).fill(false), spOk = new Array(m).fill(false);
    let i = n, j = m;
    const same = (a, b) => M.abs(a - b) < 1e-6;
    while (i > 0 && j > 0) {
      const sc = wordSim(seq[i - 1].clean, spoken[j - 1], tol);
      /* En cas d'égalité, on préfère le mot attendu le PLUS TÔT : indispensable
         pour les formes répétées (buy / bought / bought, dived / dived/dove). */
      if (same(dp[i][j], dp[i - 1][j])) i--;
      else if (same(dp[i][j], dp[i][j - 1])) j--;
      else if (sc > 0 && same(dp[i][j], dp[i - 1][j - 1] + sc)) {
        tokOk[i - 1] = true; spOk[j - 1] = true; i--; j--;
      } else i--;
    }
    return { tokOk, spOk };
  }

  /* note FSRS : réponse parfaite → 3 (Bien) ; sinon interpolation 1 → 2,4
     (2 formes sur 3 = 2,33) ; une carte ratée ne peut jamais être « Bien ». */
  function ratingFromRatio(ratio) {
    if (ratio >= 0.999) return 3;
    return M.min(2.4, M.max(1, 1 + 2 * ratio));
  }
  function gradeFromRating(r) {
    return r < 1.5 ? 'echec' : r < 2.5 ? 'difficile' : r < 3.5 ? 'bien' : 'facile';
  }
  const frNum = n => (M.round(n * 100) / 100).toFixed(2).replace('.', ',');

  /**
   * Évalue une réponse orale.
   * @param {string} spoken    transcription reconnue
   * @param {string} expected  réponse attendue (côté verso)
   * @param {object} opts      { tolerance, forms }
   */
  function scoreAnswer(spoken, expected, opts) {
    opts = opts || {};
    const tol = TOL[opts.tolerance] || TOL.normal;
    const parsed = parseExpected(expected);
    const slots = buildSlots(parsed, !!opts.forms);
    const spokenToks = tokenize(spoken);
    const spokenClean = spokenToks.map(t => t.clean).filter(Boolean);

    const req = [];
    parsed.toks.forEach(t => { if (t.exigible) { t.qi = req.length; req.push(t); } });
    const { tokOk, spOk } = align(spokenClean, req, tol);

    let okCount = 0;
    slots.forEach(s => {
      const isOk = s.variants.some(v => {
        const r = v.filter(t => t.exigible);
        return r.length === 0 || r.every(t => tokOk[t.qi]);
      });
      s.ok = isOk;
      if (isOk) okCount++;
    });

    const total = slots.length;
    const ratio = total ? okCount / total : 0;
    const rating = ratingFromRatio(ratio);

    /* Statut de chaque mot de la réponse (pour l'affichage : rouge = faux). */
    parsed.toks.forEach(t => {
      if (!t.exigible) t.status = 'dim';
      else if (t.slot && t.slot.ok) t.status = tokOk[t.qi] ? 'ok' : 'alt';
      else t.status = 'bad';
    });
    const spokenOk = spokenToks.map((t, i) => {
      if (!spokenClean[i]) return 'dim';
      if (spOk[i]) return 'ok';
      return (NEUTRAL.has(spokenClean[i]) || PLACEHOLDER.has(spokenClean[i])) ? 'dim' : 'bad';
    });

    return {
      ok: ratio >= 0.999,
      ratio, rating,
      grade: gradeFromRating(rating),
      matched: okCount, total,
      tokens: parsed.toks,
      spokenToks, spokenOk,
      spoken: String(spoken || '').trim(),
      expected: parsed.raw,
      tolerance: opts.tolerance || 'normal',
      empty: spokenClean.length === 0
    };
  }

  /* HTML de la réponse attendue : en rouge ce qui est faux, normal le reste. */
  function answerHTML(raw, res) {
    if (!res || !res.tokens || !res.tokens.length) {
      return typeof formatText === 'function' ? formatText(raw) : esc(raw);
    }
    const s = String(raw || '');
    let out = '', cur = 0;
    res.tokens.forEach(t => {
      out += esc(s.slice(cur, t.start));
      const cls = t.status === 'ok' ? 'vm-ok' : t.status === 'bad' ? 'vm-bad' : t.status === 'alt' ? 'vm-alt' : 'vm-dim';
      out += `<span class="${cls}">${esc(s.slice(t.start, t.end))}</span>`;
      cur = t.end;
    });
    out += esc(s.slice(cur));
    return out;
  }
  /* HTML de la phrase reconnue (« vous avez dit »). */
  function spokenHTML(res) {
    if (!res || !res.spokenToks || !res.spokenToks.length) return '';
    return res.spokenToks.map((t, i) => {
      const st = res.spokenOk[i];
      const cls = st === 'ok' ? 'vm-ok' : st === 'bad' ? 'vm-bad' : 'vm-dim';
      return `<span class="${cls}">${esc(t.raw)}</span>`;
    }).join(' ');
  }

  /* ══════════════════════ 3. Reconnaissance vocale ══════════════════════ */
  const SILENCE_MS = 1200;   // fin de phrase probable
  const GRACE_MS = 800;      // marge avant de valider un échec
  const CONFIRM_MS = 380;    // stabilité exigée avant de valider un succès

  const S = {
    wanted: false, listening: false, starting: false, blocked: false, error: null,
    rec: null, lang: null, key: null, listen: false, eligible: false,
    text: '', interim: '', full: '', live: null, result: null,
    scorer: null, locked: false,
    silenceT: null, graceT: null, confirmT: null, restartT: null, watchT: null, autoT: null,
    fails: 0, hand: { onCommit: null, onLive: null, onState: null },
    testing: false
  };

  const isReviewView = () => typeof State !== 'undefined' && State.view === 'review' && State.review && !State.review.end;
  const shouldListen = () => S.wanted && S.listen && isReviewView() && !S.blocked && SUPPORTED;

  function clearTimers() {
    ['silenceT', 'graceT', 'confirmT'].forEach(k => { if (S[k]) { clearTimeout(S[k]); S[k] = null; } });
  }
  function emit() {
    try { S.hand.onState && S.hand.onState(); } catch (e) {}
    renderLive();
  }

  function ensureRec() {
    if (S.rec || !SUPPORTED) return S.rec;
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    rec.lang = S.lang || 'en-GB';
    rec.onstart = () => { S.listening = true; S.starting = false; S.fails = 0; S.error = null; emit(); };
    rec.onend = () => { S.listening = false; emit(); scheduleRestart(); };
    rec.onerror = e => {
      const err = e && e.error;
      S.error = err || 'error';
      S.starting = false;
      if (err === 'not-allowed' || err === 'service-not-allowed') {
        S.blocked = true;
        setWanted(false, { silent: true });
        if (typeof toast === 'function') toast('Micro refusé : autorisez le microphone dans le navigateur', 'error', 4500);
      }
      emit();
    };
    rec.onresult = onResult;
    S.rec = rec;
    return rec;
  }

  function start() {
    if (!SUPPORTED || !shouldListen()) return;
    if (S.listening || S.starting) return;
    const rec = ensureRec();
    if (!rec) return;
    if (S.lang && rec.lang !== S.lang) rec.lang = S.lang;
    try { S.starting = true; rec.start(); } catch (e) { S.starting = false; scheduleRestart(500); }
    watch();
  }

  function stop(opts) {
    opts = opts || {};
    clearTimers();
    clearAuto();
    if (S.restartT) { clearTimeout(S.restartT); S.restartT = null; }
    if (!opts.keepWatchdog) unwatch();
    const rec = S.rec;
    if (rec) { try { rec.abort(); } catch (e) {} }
    S.listening = false; S.starting = false;
    if (!opts.quiet) emit();
  }

  function scheduleRestart(delay) {
    if (S.restartT) clearTimeout(S.restartT);
    if (!shouldListen()) return;
    S.fails++;
    const d = delay != null ? delay : (S.fails < 6 ? 260 : M.min(4000, 260 * S.fails));
    S.restartT = setTimeout(() => { S.restartT = null; if (shouldListen()) start(); }, d);
  }

  /* Surveillance : le micro s'éteint dès qu'on quitte la révision. */
  function watch() {
    if (S.watchT) return;
    S.watchT = setInterval(() => {
      if (shouldListen()) { if (!S.listening && !S.starting && !S.restartT) start(); }
      else stop({ quiet: true, keepWatchdog: false });
    }, 1500);
  }
  function unwatch() { if (S.watchT) { clearInterval(S.watchT); S.watchT = null; } }

  function onResult(e) {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const r = e.results[i];
      const txt = (r[0] && r[0].transcript) || '';
      if (r.isFinal) { S.text = (S.text + ' ' + txt).replace(/\s+/g, ' ').trim(); interim = interim.replace(/\s+/g, ' ').trim(); }
      else interim += ' ' + txt;
    }
    S.interim = interim.replace(/\s+/g, ' ').trim();
    S.full = (S.text + ' ' + S.interim).replace(/\s+/g, ' ').trim();
    clearTimers();
    liveCheck();
    emit();
    scheduleSilence();
  }

  function liveCheck() {
    if (S.locked || !S.scorer || !S.full) return;
    let res = null;
    try { res = S.scorer(S.full); } catch (e) { return; }
    if (!res || !res.total) return;
    S.live = res;
    if (res.ratio >= 0.999) {
      /* Succès : on attend une courte stabilité (les résultats provisoires
         peuvent encore être corrigés par le moteur) puis on valide. */
      if (S.confirmT) clearTimeout(S.confirmT);
      S.confirmT = setTimeout(() => {
        S.confirmT = null;
        const cur = (S.full || '').trim();
        const r2 = S.scorer ? S.scorer(cur) : null;
        if (r2 && r2.ratio >= 0.999) commitSuccess(cur, r2);
      }, CONFIRM_MS);
    } else if (S.confirmT) { clearTimeout(S.confirmT); S.confirmT = null; }
  }

  function scheduleSilence() {
    if (S.locked || !S.scorer) return;
    S.silenceT = setTimeout(() => {
      S.silenceT = null;
      const txt = (S.full || '').trim();
      if (!txt) return;
      const r = S.scorer ? S.scorer(txt) : null;
      if (r && r.ratio >= 0.999) return commitSuccess(txt, r);
      S.graceT = setTimeout(() => {
        S.graceT = null;
        commitFailure((S.full || '').trim());
      }, GRACE_MS);
    }, SILENCE_MS);
  }

  function commitSuccess(text, res) {
    if (S.locked) return;
    S.locked = true;
    clearTimers();
    res = res || (S.scorer ? S.scorer(text) : null);
    S.result = res;
    if (typeof haptic === 'function') haptic('success');
    try { S.hand.onCommit && S.hand.onCommit(text, res, 'ok'); } catch (e) {}
  }

  function commitFailure(text) {
    if (S.locked) return;
    if (!text) return;
    const res = S.scorer ? S.scorer(text) : null;
    if (!res || !res.total) return;
    S.locked = true;
    clearTimers();
    S.result = res;
    if (typeof haptic === 'function') haptic('error');
    try { S.hand.onCommit && S.hand.onCommit(text, res, 'bad'); } catch (e) {}
  }

  /* ── API cycle de vie ── */
  function setWanted(on, opts) {
    opts = opts || {};
    S.wanted = !!on;
    if (typeof data !== 'undefined' && data && data.app) { prefs().voiceOn = S.wanted; if (!opts.silent) persist(); }
    if (!S.wanted) stop({ quiet: true });
    else { S.blocked = S.blocked && !opts.force; if (opts.force) S.blocked = false; start(); }
    emit();
    if (!opts.silent && typeof toast === 'function') {
      toast(S.wanted ? 'Micro activé — répondez à voix haute' : 'Micro désactivé', S.wanted ? 'success' : 'info', 1800);
    }
  }
  function toggle() { setWanted(!S.wanted, { force: true }); }

  function sync() { if (shouldListen()) start(); else stop({ quiet: true }); }

  /* Appelé à chaque changement de vue (setTop) : le micro ne tourne QUE pendant
     la révision. À la fin d'une session il se coupe, et « Continuer la révision »
     le rallume tout seul tant que la préférence reste active. */
  function syncView(view) {
    if (view !== 'review') stop({ quiet: true });
    else sync();
  }

  function setCard(ctx) {
    const key = ctx ? ctx.key : null;
    if (key !== S.key) {
      S.key = key; S.text = ''; S.interim = ''; S.full = ''; S.live = null; S.result = null;
      S.locked = false; clearTimers();
    }
    S.eligible = !!(ctx && ctx.eligible);
    S.listen = !!(ctx && ctx.listen);
    S.scorer = (ctx && ctx.scorer) || null;
    const lg = (ctx && ctx.lang) || 'en-GB';
    if (S.lang !== lg) {
      S.lang = lg;
      if (S.rec) { try { S.rec.lang = lg; } catch (e) {} }
      if (S.listening || S.starting) { stop({ quiet: true }); S.blocked = false; }
    }
    sync();
  }

  function reset() {
    stop({ quiet: true });
    S.key = null; S.text = ''; S.interim = ''; S.full = ''; S.live = null; S.result = null;
    S.locked = false; S.eligible = false; S.listen = false; S.scorer = null;
  }

  function consume() { S.text = ''; S.interim = ''; S.full = ''; S.live = null; S.locked = false; clearTimers(); }
  /* Verrouille l'évaluation : le retour est affiché, on attend le clic. */
  function lock() { S.locked = true; clearTimers(); }

  /* ── minuterie de passage automatique ── */
  function armAuto(ms, fn) {
    clearAuto();
    if (!ms || ms <= 0) return;
    S.autoT = setTimeout(() => { S.autoT = null; try { fn(); } catch (e) {} }, ms);
  }
  function clearAuto() { if (S.autoT) { clearTimeout(S.autoT); S.autoT = null; } }

  /* ══════════════════════ 4. Contexte de carte ══════════════════════ */

  const BAD_TEXT = /\$|\\[a-zA-Z]|<img|\[IMAGE_ID|<<<|>>>|\\n\\s*[-*]/;
  function isSpeakable(t) {
    return typeof t === 'string' && t.trim().length > 0 && t.length <= 180 && !BAD_TEXT.test(t);
  }
  function isEnglishChapter(chap) {
    if (!chap) return false;
    try {
      for (const s of (data.subjects || [])) {
        if (s.id !== 'anglais' && !/anglais|english/i.test(s.title || '')) continue;
        if ((s.chapters || []).some(c => c.id === chap.id)) return true;
        if (chap._ids && (s.chapters || []).some(c => chap._ids.includes(c.id))) return true;
      }
    } catch (e) {}
    return false;
  }
  const isVerbChapter = chap => /verbe|irregul|irrégul/i.test((chap && (chap.title || chap.description)) || '');

  function cardContext(card, chap) {
    const base = { eligible: false, listen: false, english: false, key: null, expected: '', lang: 'en-GB', forms: false, scorer: null };
    if (!card || !chap) return base;
    const english = isEnglishChapter(chap);
    if (!english) return base;
    let sides = { f: card.front, b: card.back };
    try { if (typeof getSides === 'function') sides = getSides(card, chap) || sides; } catch (e) {}
    const expected = sides.b || '';
    const front = sides.f || '';
    const p = prefs();
    const langSwap = !!(chap.settings && chap.settings.langSwap);
    const lang = p.voiceLang !== 'auto' ? p.voiceLang : (langSwap ? 'fr-FR' : 'en-GB');
    const forms = isVerbChapter(chap) || (looksLikeForms(expected) && !parallelLists(front, expected));
    const eligible = isSpeakable(expected) && (looksLikeForms(expected) || true);
    const r = (typeof State !== 'undefined' && State.review) || {};
    const key = [r.chapterId || '', r.start || '', card.id, r.index, r.flipped ? 'v' : 'r'].join('|');
    const tol = p.voiceTolerance;
    return {
      key, card, chap, front, expected, lang, english, eligible, listen: english, forms,
      scorer: eligible ? (txt => scoreAnswer(txt, expected, { tolerance: tol, forms })) : null
    };
  }

  /* ══════════════════════ 5. Interface ══════════════════════ */
  function state() {
    return {
      supported: SUPPORTED, wanted: S.wanted, listening: S.listening, starting: S.starting,
      blocked: S.blocked, error: S.error, interim: S.interim, text: S.full, live: S.live,
      eligible: S.eligible, locked: S.locked
    };
  }

  function micHTML(size) {
    const st = state();
    let cls = 'voice-mic' + (size === 'lg' ? ' voice-mic--lg' : ''), icon = 'mic', title;
    if (!st.supported) { cls += ' is-blocked'; icon = 'mic-off'; title = 'Reconnaissance vocale non supportée par ce navigateur (Chrome, Edge ou Safari conseillé)'; }
    else if (!st.wanted) { icon = 'mic-off'; title = 'Réviser à la voix : appuyez pour activer le micro'; }
    else if (st.blocked) { cls += ' is-blocked'; icon = 'mic-off'; title = 'Micro bloqué : autorisez le microphone dans les réglages du navigateur'; }
    else if (st.listening) { cls += ' is-on'; title = 'Micro actif — appuyez pour le couper'; }
    else { cls += ' is-starting'; title = 'Activation du micro…'; }
    return `<button type="button" class="${cls}" id="voiceMicBtn" data-voice-mic="1" aria-pressed="${st.wanted ? 'true' : 'false'}" title="${esc(title)}" aria-label="${esc(title)}">${typeof ico === 'function' ? ico(icon) : ''}</button>`;
  }

  function bindMic(root) {
    (root || D).querySelectorAll('[data-voice-mic]').forEach(b => {
      if (b._vBound) return;
      b._vBound = true;
      b.addEventListener('click', e => {
        e.preventDefault(); e.stopPropagation();
        if (!SUPPORTED) { if (typeof toast === 'function') toast('Reconnaissance vocale non supportée : utilisez Chrome, Edge ou Safari', 'error', 4000); return; }
        if (S.blocked) S.blocked = false;
        toggle();
      });
    });
  }

  const fmtDelay = ms => ms <= 0 ? 'Immédiat' : (ms < 1000 ? ms + ' ms' : (M.round(ms / 100) / 10).toFixed(1).replace('.', ',') + ' s');
  /* Message d'écoute adapté à la langue reconnue sur la carte courante. */
  const listenHint = () => S.lang === 'fr-FR' ? 'Écoute… dictez la réponse en français.'
                       : /^en/.test(S.lang || '') ? 'Écoute… dictez la réponse en anglais.'
                       : 'Écoute… dictez la réponse.';

  /**
   * Bandeau sous la carte de révision.
   * @param {object} o { english, eligible, result, delayMs, spoken }
   */
  function barHTML(o) {
    o = o || {};
    if (!o.english) return '';
    const st = state();
    const p = prefs();
    const res = o.result || null;
    let cls = 'voice-bar', txt = '';

    if (!SUPPORTED) {
      cls += ' is-off';
      txt = `<span class="voice-bar__text">Reconnaissance vocale indisponible sur ce navigateur — Chrome, Edge ou Safari requis.</span>`;
    } else if (!o.eligible) {
      cls += ' is-off';
      txt = `<span class="voice-bar__text">Carte non dictable (image ou formule) — répondez normalement.</span>`;
    } else if (res && res.ok) {
      cls += ' is-ok';
      txt = `<span class="voice-bar__score">✓ ${res.matched}/${res.total}</span>
             <span class="voice-bar__text">Bien joué ! <span class="voice-bar__hint">carte validée${o.delayMs > 0 ? ' — suite dans ' + fmtDelay(o.delayMs) : ''}</span></span>`;
    } else if (res && !res.ok) {
      cls += ' is-bad';
      if (res.manual) {
        txt = `<span class="voice-bar__score">✗ non sue</span>
               <span class="voice-bar__text">Réponse affichée — la carte repart en révision (note 1).</span>`;
      } else {
        const detail = res.total > 1 ? `${res.matched}/${res.total} formes · note ${frNum(res.rating)}` : 'réponse incomplète';
        txt = `<span class="voice-bar__score">✗ ${detail}</span>
               <span class="voice-bar__text">${p.voiceShowSpoken && res.spoken ? `Vous avez dit : <span class="voice-spoken">${spokenHTML(res)}</span>` : 'Corrigez puis passez à la suite.'}</span>`;
      }
    } else if (!st.wanted) {
      cls += ' is-off';
      txt = `<span class="voice-bar__text">Mode vocal prêt. ${o.eligible ? 'Appuyez sur le micro et dictez la réponse.' : ''}</span>`;
    } else if (st.blocked) {
      cls += ' is-off';
      txt = `<span class="voice-bar__text">Micro bloqué par le navigateur — autorisez-le puis réactivez le mode vocal.</span>`;
    } else {
      cls += ' is-live';
      const live = st.live;
      const sc = live && live.total ? `<span class="voice-bar__score">${live.matched}/${live.total}</span>` : '';
      const heard = st.interim || st.text;
      txt = `${sc}<span class="voice-bar__text">${heard ? `<span class="voice-live">${esc(heard)}</span>` : (st.listening ? listenHint() : 'Activation du micro…')}</span>`;
    }
    return `<div class="${cls}" id="voiceBar">
      ${micHTML()}
      <div class="voice-bar__text" id="voiceBarText">${txt}</div>
    </div>`;
  }

  /* Mise à jour « légère » du bandeau (sans reconstruire la carte). */
  function renderLive() {
    const bar = D.getElementById('voiceBar');
    if (!bar) return;
    const t = bar.querySelector('#voiceBarText');
    if (!t) return;
    const st = state();
    if (!st.wanted || st.locked || S.result) return;
    const live = st.live;
    const sc = live && live.total ? `<span class="voice-bar__score">${live.matched}/${live.total}</span>` : '';
    const heard = st.interim || st.text;
    bar.classList.toggle('is-live', !!(st.wanted && !st.blocked));
    t.innerHTML = `${sc}<span class="voice-bar__text">${heard ? `<span class="voice-live">${esc(heard)}</span>` : (st.listening ? listenHint() : 'Activation du micro…')}</span>`;
  }

  /* Barre d'action sous la carte, en mode vocal. */
  function actionsHTML(o) {
    o = o || {};
    const res = o.result || null;
    if (res && res.ok) {
      return `<button class="btn btn--solid btn--green voice-next" id="voiceNextBtn">
                <span class="voice-next__fill" id="voiceNextFill"></span>
                <span>Carte suivante</span></button>`;
    }
    if (res && !res.ok) {
      return `<div class="voice-row">
        <button class="btn btn--outline" id="voiceRetryBtn">${typeof ico === 'function' ? ico('rotate-ccw', 'ico--sm') : ''}<span>Réessayer</span></button>
        <button class="btn btn--solid btn--primary" id="voiceNextBtn"><span>Carte suivante</span></button>
      </div>`;
    }
    return '';
  }

  /* ══════════════════════ 6. Réglages ══════════════════════ */
  function sliderHTML(id, val, min, max, step, label) {
    const pct = ((val - min) / M.max(1e-6, max - min) * 100).toFixed(1);
    return `<div class="s-control">
      <button class="step-btn" type="button" id="${id}D" aria-label="Diminuer">−</button>
      <div class="s-slider-container"><input type="range" class="s-slider" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}" style="--fill:${pct}%" aria-label="${esc(label)}"></div>
      <button class="step-btn" type="button" id="${id}I" aria-label="Augmenter">+</button>
    </div>`;
  }

  function settingsHTML() {
    const p = prefs();
    const st = state();
    const chips = (id, cur, map) => `<div class="voice-chip-row" id="${id}">` +
      Object.keys(map).map(k => `<button type="button" class="voice-chip ${cur === k ? 'is-active' : ''}" data-val="${k}">${esc(map[k])}</button>`).join('') + `</div>`;
    return `
    <div class="settings-section" id="voiceSection">
      <div class="section-title">Révision à la voix</div>
      ${typeof sRow === 'function' ? sRow('rowVoice', 'mic', 'Mode vocal (micro)', 'Dicter la réponse : validation automatique, correction en rouge', sToggle(!!p.voiceOn), 1) : ''}
      ${!SUPPORTED ? `<div class="voice-settings-note">⚠️ Ce navigateur ne fournit pas la reconnaissance vocale. Utilisez Chrome, Edge ou Safari (mobile comme ordinateur).</div>` : ''}
      ${st.blocked ? `<div class="voice-settings-note">⚠️ Micro bloqué : autorisez le microphone dans les réglages du navigateur, puis réactivez le mode vocal.</div>` : ''}
      ${typeof sRow === 'function' ? sRow('', 'clock', 'Passer à la carte suivante après', 'Temps d\'affichage de la réponse en vert quand la carte est réussie', `<div class="s-value" id="vslDelayV">${fmtDelay(p.voiceDelay)}</div>`) : ''}
      ${sliderHTML('vslDelay', p.voiceDelay, 0, 3000, 250, 'Délai avant la carte suivante')}
      <div class="settings-row" style="cursor:default">
        <div class="s-icon dynamic">${typeof ico === 'function' ? ico('target') : ''}</div>
        <div class="s-label"><div class="s-title">Tolérance de prononciation</div><div class="s-sub">Souple accepte les homophones (blew / blue) · Stricte exige la prononciation exacte</div></div>
      </div>
      ${chips('voiceTolChips', p.voiceTolerance, TOL_LABEL)}
      <div class="settings-row" style="cursor:default">
        <div class="s-icon dynamic">${typeof ico === 'function' ? ico('volume-2') : ''}</div>
        <div class="s-label"><div class="s-title">Langue reconnue</div><div class="s-sub">Automatique = anglais (ou français si le chapitre est en sens inverse)</div></div>
      </div>
      ${chips('voiceLangChips', p.voiceLang, LANGS)}
      ${typeof sRow === 'function' ? sRow('rowVoiceSpoken', 'file-text', 'Afficher ma phrase reconnue', 'Montrer ce qui a été entendu, mot à mot', sToggle(!!p.voiceShowSpoken), 1) : ''}
      <div class="voice-chip-row" style="padding-top:4px">
        <button type="button" class="btn btn--outline btn--sm" id="voiceTestBtn" style="width:auto">${typeof ico === 'function' ? ico('mic', 'ico--sm') : ''}<span>Tester le micro</span></button>
      </div>
      <div class="voice-test-out" id="voiceTestOut">Le test ne dure que quelques secondes et ne modifie aucune carte.</div>
      <div class="voice-settings-note">Le mode vocal est disponible dans les chapitres d'<b>anglais</b> : le micro reste actif d'une carte à l'autre et d'une session à l'autre tant que vous ne le coupez pas.</div>
    </div>`;
  }

  function bindSettings(root, opts) {
    opts = opts || {};
    const p = prefs();
    const box = (root || D).querySelector('#voiceSection');
    if (!box) return;
    const onChange = () => { persist(); try { opts.onChange && opts.onChange(); } catch (e) {} };
    const rerender = () => { try { opts.rerender && opts.rerender(); } catch (e) {} };

    const rowVoice = box.querySelector('#rowVoice');
    if (rowVoice) rowVoice.onclick = () => {
      p.voiceOn = !p.voiceOn;
      S.wanted = p.voiceOn;
      S.blocked = false;
      if (p.voiceOn) start(); else stop({ quiet: true });
      onChange(); emit(); rerender();
    };
    const rowSpoken = box.querySelector('#rowVoiceSpoken');
    if (rowSpoken) rowSpoken.onclick = () => { p.voiceShowSpoken = !p.voiceShowSpoken; onChange(); rerender(); };

    /* curseur du délai */
    const sl = box.querySelector('#vslDelay'), out = box.querySelector('#vslDelayV');
    if (sl) {
      const paint = (v, commit) => {
        p.voiceDelay = v;
        sl.value = v;
        sl.style.setProperty('--fill', ((v - 0) / 3000 * 100).toFixed(1) + '%');
        if (out) out.textContent = fmtDelay(v);
        if (commit) onChange();
      };
      sl.oninput = () => paint(M.max(0, M.min(3000, M.round(+sl.value))), false);
      sl.onchange = () => paint(M.max(0, M.min(3000, M.round(+sl.value))), true);
      const dec = box.querySelector('#vslDelayD'), inc = box.querySelector('#vslDelayI');
      if (dec) dec.onclick = e => { e.stopPropagation(); paint(M.max(0, p.voiceDelay - 250), true); };
      if (inc) inc.onclick = e => { e.stopPropagation(); paint(M.min(3000, p.voiceDelay + 250), true); };
    }

    const chips = (id, prop) => {
      const c = box.querySelector('#' + id);
      if (!c) return;
      c.onclick = e => {
        const b = e.target.closest('[data-val]');
        if (!b) return;
        p[prop] = b.dataset.val;
        onChange(); rerender();
      };
    };
    chips('voiceTolChips', 'voiceTolerance');
    chips('voiceLangChips', 'voiceLang');

    const testBtn = box.querySelector('#voiceTestBtn'), testOut = box.querySelector('#voiceTestOut');
    if (testBtn) testBtn.onclick = () => testMic(testOut);
  }

  function testMic(out) {
    if (!SUPPORTED) { if (out) out.textContent = '⚠️ Reconnaissance vocale indisponible sur ce navigateur.'; return; }
    if (out) out.innerHTML = '<b>🎙️ Parlez…</b> (test en cours)';
    let rec = null, done = false, text = '';
    try {
      rec = new SR();
      rec.lang = (prefs().voiceLang !== 'auto' ? prefs().voiceLang : 'en-GB');
      rec.continuous = true; rec.interimResults = true; rec.maxAlternatives = 1;
      rec.onresult = e => {
        let t = '';
        for (let i = 0; i < e.results.length; i++) t += (e.results[i][0] && e.results[i][0].transcript) || '';
        text = t.trim();
        if (out) out.innerHTML = `<b>Entendu :</b> ${esc(text || '…')}`;
      };
      rec.onerror = e => {
        done = true;
        if (out) out.innerHTML = (e && (e.error === 'not-allowed' || e.error === 'service-not-allowed'))
          ? '⚠️ <b>Micro refusé.</b> Autorisez le microphone dans les réglages du navigateur.'
          : `⚠️ Erreur : ${esc((e && e.error) || 'inconnue')}`;
        try { rec.abort(); } catch (err) {}
      };
      rec.onend = () => { if (!done) { done = true; if (out && !text) out.textContent = 'Aucune parole détectée.'; } };
      rec.start();
      setTimeout(() => { try { rec.stop(); } catch (e) {} if (out && text) out.innerHTML = `<b>Entendu :</b> ${esc(text)}`; }, 6000);
    } catch (e) {
      if (out) out.textContent = '⚠️ Impossible de démarrer le micro : ' + (e && e.message ? e.message : 'erreur inconnue');
    }
  }

  /* ══════════════════════ 7. Export ══════════════════════ */
  const api = {
    supported: SUPPORTED,
    /* moteur */
    scoreAnswer, answerHTML, spokenHTML, ratingFromRatio, gradeFromRating, frNum,
    looksLikeForms, buildSlots, parseExpected, cardContext, isSpeakable, isEnglishChapter, isVerbChapter,
    /* cycle de vie */
    setWanted, toggle, setCard, sync, syncView, reset, consume, stop, start, lock,
    armAuto, clearAuto,
    attach(handlers) { S.hand = Object.assign(S.hand, handlers || {}); },
    /* interface */
    state, micHTML, bindMic, barHTML, actionsHTML, renderLive,
    settingsHTML, bindSettings,
    prefs: prefs,
    fmtDelay,
    _internal: S
  };
  window.Voice = api;
  if (typeof window.VoiceMatch === 'undefined') window.VoiceMatch = { scoreAnswer, answerHTML, spokenHTML, ratingFromRatio, gradeFromRating };
})();
