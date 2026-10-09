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
      redémarrage automatique, succès automatique, validation manuelle des échecs, verrouillage).
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
    const spokenClean = spokenToks.map(t => t.clean);
    // Le moteur anglais transcrit parfois « soyabeans » en « soldier bean(s) ».
    // Variantes locales à ce mot seulement : aucun assouplissement des autres cartes.
    const soya = parsed.toks.find(t => /^soyabeans?$|^soybeans?$/.test(t.clean));
    if (soya) {
      const canonical = soya.clean.endsWith('s') ? 'soyabeans' : 'soyabean';
      spokenClean.forEach((w, i) => {
        if (/^(soya|soldier)$/.test(w) && /^beans?$/.test(spokenClean[i + 1] || '')) {
          spokenClean[i] = canonical; spokenClean[i + 1] = '';
        } else if (/^soybeans?$/.test(w)) spokenClean[i] = canonical;
      });
    }

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
      empty: !spokenClean.some(Boolean)
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
  const CONFIRM_MS = 380;    // stabilité exigée avant de valider un succès

  /* Garde-fou contre les boucles d'activation. Un navigateur dont le service de
     reconnaissance échoue juste après le démarrage (réseau injoignable, micro occupé,
     dictée désactivée…) ne doit pas faire clignoter le micro indéfiniment.
     Une tentative est « ratée » si elle se termine par une erreur (hors silence normal),
     ou si elle se termine sans parole ni signal de silence normal. Au bout de MAX_FAILS échecs de suite,
     le micro s'arrête et le motif reste affiché ; un clic sur le micro relance l'essai. */
  const MAX_FAILS = 2;
  const QUICK_MS = 1500;     // une fin plus rapide que ça n'est pas une vraie session
  const START_MS = 10000;    // ni onstart ni onend au bout de ce délai → tentative ratée
  const RETRY_MS = 700;      // pause avant un nouvel essai
  const FATAL_ERR = ['audio-capture', 'language-not-supported'];  // inutile de réessayer

  /* Message affiché quand le micro s'arrête seul (bandeau, bouton, notification). */
  function errorText(code) {
    const c = code || '';
    if (c === 'network') return 'Reconnaissance vocale injoignable : erreur réseau (« network »). Vérifiez la connexion, un VPN, un pare-feu ou un bloqueur de pubs, ou essayez Chrome ou Edge.';
    if (c === 'audio-capture') return 'Micro introuvable ou occupé (erreur « audio-capture »). Vérifiez qu\'il est branché, choisi dans Windows et non utilisé par une autre application.';
    if (c === 'language-not-supported') return 'Langue non prise en charge par ce navigateur. Essayez « Anglais (US) » dans les réglages du mode vocal.';
    if (c === 'start-timeout') return 'Le navigateur ne démarre pas le micro. Autorisez le micro pour ce site (cadenas dans la barre d\'adresse), puis réactivez-le.';
    if (!c) return 'Reconnaissance vocale interrompue dès son démarrage, sans message du navigateur. Vérifiez le micro et la connexion, ou essayez Chrome ou Edge.';
    return `Reconnaissance vocale interrompue dès son démarrage (erreur « ${c} »). Réessayez, ou essayez un autre navigateur.`;
  }

  const S = {
    wanted: false, listening: false, starting: false, blocked: false, error: null,
    rec: null, lang: null, key: null, listen: false, eligible: false,
    text: '', interim: '', full: '', live: null, result: null,
    scorer: null, locked: false,
    confirmT: null, restartT: null, watchT: null,
    fails: 0, startedAt: 0, gotSpeech: false, errorMsg: '', resuming: false,
    hand: { onCommit: null, onLive: null, onState: null },
    testing: false, readyAt: 0
  };

  const isReviewView = () => typeof State !== 'undefined' && State.view === 'review' && State.review && !State.review.end;
  const shouldListen = () => S.wanted && S.listen && !S.locked && isReviewView() && !S.blocked && SUPPORTED;

  function clearTimers() {
    ['confirmT'].forEach(k => { if (S[k]) { clearTimeout(S[k]); S[k] = null; } });
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
    /* onstart ne remet PAS le compteur d'échecs à zéro : un navigateur qui démarre puis
       échoue aussitôt doit être compté comme un échec (c'était la cause de la boucle). */
    rec.onstart = () => { if (S.rec !== rec) return; S.listening = true; S.starting = false; S.resuming = false; S.error = null; emit(); };
    rec.onend = () => {
      if (S.rec !== rec) return;
      const code = S.error, dur = Date.now() - S.startedAt;
      S.listening = false; S.starting = false;   // fin de tentative : on ne reste jamais « en démarrage »
      /* Tentative ratée : une erreur (hors silence normal), ou une fin sans parole ni signal de silence normal */
      const failed = code ? !(code === 'no-speech' && dur >= QUICK_MS) : !S.gotSpeech;
      if (failed) return attemptFailed(code);
      S.fails = 0;
      /* Reprise normale : l'écran reste « à l'écoute » le temps du raccord, sans bascule */
      S.resuming = shouldListen();
      emit();
      scheduleRestart();
    };
    rec.onerror = e => {
      if (S.rec !== rec) return;
      const err = e && e.error;
      S.error = err || 'error';
      S.starting = false;
      if (err === 'not-allowed' || err === 'service-not-allowed') {
        S.blocked = true;
        setWanted(false, { silent: true });
        if (typeof toast === 'function') toast('Micro refusé : autorisez le microphone dans le navigateur', 'error', 4500);
      }
      // Certains navigateurs ne livrent jamais onend après une erreur.
      if (err !== 'no-speech' && !S.blocked) {
        stop({ quiet: true, keepWatchdog: true });
        return attemptFailed(err || 'error');
      }
      emit();
    };
    rec.onresult = e => { if (S.rec === rec) onResult(e); };
    S.rec = rec;
    return rec;
  }

  function start() {
    if (!SUPPORTED || !shouldListen()) return;
    if (S.listening || S.starting) return;
    const rec = ensureRec();
    if (!rec) return;
    if (S.lang && rec.lang !== S.lang) rec.lang = S.lang;
    S.error = null; S.gotSpeech = false; S.startedAt = Date.now();   // nouvelle tentative
    try { S.starting = true; rec.start(); }
    catch (e) { S.starting = false; return attemptFailed('start-error'); }
    watch();
  }

  function stop(opts) {
    opts = opts || {};
    clearTimers();
    if (S.restartT) { clearTimeout(S.restartT); S.restartT = null; }
    if (!opts.keepWatchdog) unwatch();
    const rec = S.rec;
    S.rec = null; // invalide immédiatement les événements tardifs de cette instance
    if (rec) { try { rec.abort(); } catch (e) {} }
    S.listening = false; S.starting = false; S.resuming = false;
    if (!opts.quiet) emit();
  }

  function scheduleRestart(delay) {
    if (S.restartT) clearTimeout(S.restartT);
    if (!shouldListen()) return;
    const d = delay != null ? delay : 260;
    S.restartT = setTimeout(() => { S.restartT = null; if (shouldListen()) start(); }, d);
  }

  /* Une tentative a échoué : nouvel essai, ou abandon si le navigateur n'y arrive pas. */
  function attemptFailed(code) {
    S.fails++;
    S.resuming = false;   // un échec affiche de nouveau l'activation, honnêtement
    if (FATAL_ERR.includes(code) || S.fails >= MAX_FAILS) return giveUp(code);
    emit();
    scheduleRestart(RETRY_MS);
  }

  /* Abandon : le micro s'arrête et le motif reste affiché (un clic le relance). */
  function giveUp(code) {
    stop({ quiet: true });
    S.wanted = false; S.fails = 0; S.error = code || null;
    S.errorMsg = errorText(code);
    const p = prefs(); p.voiceOn = false; persist();
    emit();
    if (typeof toast === 'function') toast(S.errorMsg, 'error', 7000);
  }

  /* Surveillance : le micro s'éteint dès qu'on quitte la révision. Une tentative qui ne
     répond ni par onstart ni par onend au bout de START_MS est comptée comme un échec. */
  function watch() {
    if (S.watchT) return;
    S.watchT = setInterval(() => {
      if (!shouldListen()) { stop({ quiet: true, keepWatchdog: false }); return; }
      if (S.starting && !S.listening && Date.now() - S.startedAt > START_MS) {
        stop({ quiet: true, keepWatchdog: true });
        return attemptFailed('start-timeout');
      }
      if (!S.listening && !S.starting && !S.restartT) start();
    }, 1500);
  }
  function unwatch() { if (S.watchT) { clearInterval(S.watchT); S.watchT = null; } }

  function onResult(e) {
    S.gotSpeech = true; S.fails = 0;   // le service répond : ce n'est pas un échec
    if (!shouldListen() || S.locked || !S.scorer || Date.now() < S.readyAt) return;
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

  // Une pause n'est pas une réponse définitive : seul Entrée valide un échec.
  function submit() {
    if (!shouldListen() || !S.scorer) return false;
    const text = (S.full || '').trim();
    if (!text) return false;
    const res = S.scorer(text);
    if (!res || !res.total) return false;
    if (res.ok) commitSuccess(text, res);
    else commitFailure(text);
    return true;
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
    if (on && !S.wanted && typeof window.voiceMayEnable === 'function' && !window.voiceMayEnable()) {
      if (typeof toast === 'function') toast('Micro indisponible sur cette carte', 'info');
      return;
    }
    S.wanted = !!on;
    S.errorMsg = ''; S.error = null; S.fails = 0;   // chaque activation repart de zéro
    if (typeof data !== 'undefined' && data && data.app) { prefs().voiceOn = S.wanted; if (!opts.silent) persist(); }
    if (!S.wanted) stop({ quiet: true });
    else { S.blocked = S.blocked && !opts.force; if (opts.force) S.blocked = false; start(); }
    emit();   // pas de toast « Micro activé » : le bouton change déjà d'état
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
    const changed = key !== S.key;
    if (changed) {
      stop({ quiet: true }); // ne jamais réutiliser une reconnaissance de la carte précédente
      S.readyAt = 0; // les anciens événements sont déjà invalidés par stop()
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
    /* Carte suivante : le micro repart aussitôt, sans afficher « Activation du micro… » */
    if (changed && S.wanted && S.listen) S.resuming = true;
    sync();
  }

  function reset() {
    stop({ quiet: true });
    S.key = null; S.readyAt = 0; S.text = ''; S.interim = ''; S.full = ''; S.live = null; S.result = null;
    S.locked = false; S.eligible = false; S.listen = false; S.scorer = null;
  }

  function consume() { S.text = ''; S.interim = ''; S.full = ''; S.live = null; S.locked = false; clearTimers(); }
  function restartCard() {
    stop({quiet:true}); consume(); S.result = null;
    S.readyAt = 0;
    sync(); emit();
  }
  function dismiss() {
    if (S.locked) return;
    restartCard(); // annule les timers ET la transcription en attente
  }
  /* Verrouille l'évaluation : le retour est affiché, on attend le clic. */
  function lock() { S.locked = true; stop({quiet:true}); }

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
    const key = [r.chapterId || '', r.start || '', card.id, r.index].join('|');
    const tol = p.voiceTolerance;
    return {
      key, card, chap, front, expected, lang, english, eligible,
      /* Carte non dictable (image, formule) : pas de micro, il ne servirait à rien */
      listen: eligible && english && !r.revealedWithoutVoice && (!r.voiceResult || r.voiceRetrying), forms,
      scorer: eligible ? (txt => scoreAnswer(txt, expected, { tolerance: tol, forms })) : null
    };
  }

  /* ══════════════════════ 5. Interface ══════════════════════ */
  function state() {
    return {
      supported: SUPPORTED, wanted: S.wanted, listening: S.listening, resuming: S.resuming, starting: S.starting,
      blocked: S.blocked, error: S.error, errorMsg: S.errorMsg, interim: S.interim, text: S.full, live: S.live,
      eligible: S.eligible, locked: S.locked
    };
  }

  /* État visible du micro : classe, icône et infobulle. Source unique pour le rendu
     complet et pour la mise à jour en direct (sinon le bouton ne suit pas le micro). */
  function micState(st) {
    if (!st.supported) return { cls: ' is-blocked', icon: 'mic-off', title: 'Reconnaissance vocale non supportée par ce navigateur (Chrome, Edge ou Safari conseillé)' };
    if (!st.wanted) {
      if (S.errorMsg) return { cls: ' is-blocked', icon: 'mic-off', title: S.errorMsg };
      return { cls: '', icon: 'mic-off', title: 'Réviser à la voix : appuyez pour activer le micro' };
    }
    if (st.blocked) return { cls: ' is-blocked', icon: 'mic-off', title: 'Micro bloqué : autorisez le microphone dans les réglages du navigateur' };
    /* Carte sans réponse dictable : le micro reste en veille sur cette carte */
    if (isReviewView() && !st.eligible) return { cls: '', icon: 'mic', title: 'Carte non dictable (image ou formule)' };
    if (st.listening || st.resuming) return { cls: ' is-on', icon: 'mic', title: 'Micro actif — appuyez pour le couper' };
    return { cls: ' is-starting', icon: 'mic', title: 'Activation du micro…' };
  }

  function micHTML(size) {
    const st = state(), m = micState(st);
    const cls = 'voice-mic' + (size === 'lg' ? ' voice-mic--lg' : '') + m.cls;
    return `<button type="button" class="${cls}" id="voiceMicBtn" data-voice-mic="1" data-icon="${m.icon}" aria-pressed="${st.wanted ? 'true' : 'false'}" title="${esc(m.title)}" aria-label="${esc(m.title)}">${typeof ico === 'function' ? ico(m.icon) : ''}</button>`;
  }

  /* Met à jour le bouton déjà affiché (classe, icône, infobulle) sans le reconstruire. */
  function refreshMic(root) {
    const b = root && root.querySelector && root.querySelector('#voiceMicBtn');
    if (!b) return;
    const st = state(), m = micState(st);
    const cls = 'voice-mic' + (b.classList.contains('voice-mic--lg') ? ' voice-mic--lg' : '') + m.cls;
    if (b.className !== cls) b.className = cls;
    b.setAttribute('aria-pressed', st.wanted ? 'true' : 'false');
    b.title = m.title; b.setAttribute('aria-label', m.title);
    if (b.getAttribute('data-icon') !== m.icon) {
      b.setAttribute('data-icon', m.icon);
      if (typeof ico === 'function') b.innerHTML = ico(m.icon);
    }
  }

  function bindMic(root) {
    (root || D).querySelectorAll('#voiceBar').forEach(bar => {
      bar.addEventListener('click', e => {
        if (e.target.closest('[data-voice-dismiss]')) { e.preventDefault(); dismiss(); }
      });
    });
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

  /* Les indications clavier ne se répètent pas à chaque carte : elles ne sont posées (renRev)
     que sur la première carte de la session où le micro sert. */
  const tipsHere = () => typeof State !== 'undefined' && !!State.review && State.review.voiceHintIdx === State.review.index;

  /**
   * Bandeau sous la carte de révision. Il n'écrit que ce qui change quelque chose :
   * le score, le motif d'un arrêt, la phrase entendue. Le bouton micro montre le reste.
   * @param {object} o { english, eligible, result, practice, revealed }
   */
  function barHTML(o) {
    o = o || {};
    if (!o.english) return '';
    const st = state();
    const p = prefs();
    const res = o.result || null;
    const practice = o.practice ? '<span class="voice-bar__text">Entraînement</span>' : '';
    let cls = 'voice-bar', txt = '';

    if (res && res.ok) {
      cls += ' is-ok';
      txt = `<span class="voice-bar__score">✓ ${res.matched}/${res.total}</span>${practice}`;
    } else if (res && !res.ok) {
      cls += ' is-bad';
      if (res.manual) {
        txt = `<span class="voice-bar__score">✗ non sue</span>${practice}`;
      } else {
        const detail = res.total > 1 ? `${res.matched}/${res.total} formes · note ${frNum(res.rating)}` : 'réponse incomplète';
        const heard = p.voiceShowSpoken && res.spoken ? `<span class="voice-bar__text">Vous avez dit : <span class="voice-spoken">${spokenHTML(res)}</span></span>` : '';
        txt = `<span class="voice-bar__score">✗ ${detail}</span>${practice}${heard}`;
      }
    } else if (!SUPPORTED || !o.eligible || o.revealed || !st.wanted || st.blocked) {
      /* Micro indisponible sur cette carte, coupé, bloqué ou arrêté après des échecs :
         seul le motif (erreur, blocage) est écrit ; l'état se lit sur le bouton micro. */
      cls += S.errorMsg ? ' is-err' : ' is-off';
      txt = offHTML();
    } else {
      cls += ' is-live';
      txt = liveHTML(st);
    }
    return `<div class="${cls}" id="voiceBar">
      ${micHTML()}
      <div class="voice-bar__text" id="voiceBarText">${txt}</div>
    </div>`;
  }

  /* Texte du bandeau micro coupé : seulement le motif de l'arrêt ou du blocage. */
  function offHTML() {
    if (S.errorMsg) return `<span class="voice-bar__text">${esc(S.errorMsg)}</span>`;
    if (S.blocked) return `<span class="voice-bar__text">Micro bloqué par le navigateur — autorisez-le puis réactivez le mode vocal.</span>`;
    return '';
  }
  /* Texte du bandeau pendant l'écoute : score provisoire, phrase entendue, ou attente. */
  function liveHTML(st) {
    const live = st.live;
    const sc = live && live.total ? `<span class="voice-bar__score">${live.matched}/${live.total}</span>` : '';
    const heard = st.interim || st.text;
    const tip = tipsHere() ? ' · Entrée pour valider' : '';
    const body = heard
      ? `<span class="voice-live">${esc(heard)}</span>${tip}`
      : ((st.listening || st.resuming) ? 'Écoute…' : 'Activation du micro…');
    return `${sc}<span class="voice-bar__text">${body}</span>${heard ? dismissHTML() : ''}`;
  }

  const dismissHTML = () => `<button type="button" class="voice-dismiss" data-voice-dismiss aria-label="Annuler la transcription" title="Annuler la transcription">${typeof ico === 'function' ? ico('x','ico--sm') : '×'}</button>`;

  /* Mise à jour « légère » du bouton et du bandeau (sans reconstruire la carte). */
  function renderLive() {
    const bar = D.getElementById('voiceBar');
    if (!bar) return;
    const st = state();
    refreshMic(bar);
    const t = bar.querySelector('#voiceBarText');
    if (!t || st.locked || S.result) return;
    if (!st.wanted || st.blocked || !st.eligible) {
      /* Rien à changer si le bandeau n'affichait pas l'écoute (ex. réponse déjà révélée) */
      if (!S.errorMsg && !st.blocked && !bar.classList.contains('is-live')) return;
      bar.classList.remove('is-live');
      bar.classList.toggle('is-err', !!S.errorMsg);
      bar.classList.toggle('is-off', !S.errorMsg);
      t.innerHTML = offHTML();
      return;
    }
    bar.classList.remove('is-off', 'is-err');
    bar.classList.add('is-live');
    t.innerHTML = liveHTML(st);
  }

  /* Barre d'action sous la carte, en mode vocal. */
  function actionsHTML(o) {
    o = o || {};
    const res = o.result || null;
    if (res && res.ok) {
      return `<button class="btn btn--solid btn--green voice-next" id="voiceNextBtn"><span>Carte suivante</span></button>`;
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
  function settingsHTML() {
    const p = prefs();
    const st = state();
    const chips = (id, cur, map) => `<div class="voice-chip-row" id="${id}">` +
      Object.keys(map).map(k => `<button type="button" class="voice-chip ${cur === k ? 'is-active' : ''}" data-val="${k}">${esc(map[k])}</button>`).join('') + `</div>`;
    return `
    <div class="settings-section" id="voiceSection">
      <div class="section-title">Révision à la voix</div>
      ${typeof sRow === 'function' ? sRow('rowVoice', 'mic', 'Mode vocal (micro)', 'Bonne réponse automatique ; sinon Entrée pour valider, puis passage manuel', sToggle(!!p.voiceOn), 1) : ''}
      ${!SUPPORTED ? `<div class="voice-settings-note">⚠️ Ce navigateur ne fournit pas la reconnaissance vocale. Utilisez Chrome, Edge ou Safari (mobile comme ordinateur).</div>` : ''}
      ${st.blocked ? `<div class="voice-settings-note">⚠️ Micro bloqué : autorisez le microphone dans les réglages du navigateur, puis réactivez le mode vocal.</div>` : ''}
      ${st.errorMsg ? `<div class="voice-settings-note">⚠️ ${esc(st.errorMsg)}</div>` : ''}
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
      setWanted(!S.wanted, {force:true});
      onChange(); rerender();
    };
    const rowSpoken = box.querySelector('#rowVoiceSpoken');
    if (rowSpoken) rowSpoken.onclick = () => { p.voiceShowSpoken = !p.voiceShowSpoken; onChange(); rerender(); };

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
    restartCard, dismiss, submit,
    attach(handlers) { S.hand = Object.assign(S.hand, handlers || {}); },
    /* interface */
    state, micHTML, bindMic, barHTML, actionsHTML, renderLive,
    settingsHTML, bindSettings,
    prefs: prefs,
    _internal: S
  };
  window.Voice = api;
  if (typeof window.VoiceMatch === 'undefined') window.VoiceMatch = { scoreAnswer, answerHTML, spokenHTML, ratingFromRatio, gradeFromRating };
})();
