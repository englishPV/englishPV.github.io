const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const voiceSource = fs.readFileSync('js/12_voice.js', 'utf8');
const appSource = fs.readFileSync('js/05_app_ui_and_navigation.js', 'utf8');

function voiceHarness() {
  const instances = [];
  class Recognition {
    constructor() { instances.push(this); }
    start() { this.onstart?.(); }
    abort() { this.onend?.(); }
    speak(text) {
      const result = [{ transcript: text }]; result.isFinal = true;
      this.onresult({ resultIndex: 0, results: [result] });
    }
  }
  const chapter = { id: 'anglais-1', title: 'Vocabulaire', settings: {} };
  const cards = [
    { id: 'first', front: 'soja', back: 'soyabeans' },
    { id: 'second', front: 'arbre', back: 'tree' }
  ];
  const ctx = {
    document: { getElementById: () => null }, Math, Date, setTimeout, clearTimeout,
    setInterval, clearInterval,
    data: { app: { prefs: {} }, subjects: [{ id: 'anglais', chapters: [chapter] }] },
    State: { view: 'review', review: { chapterId: chapter.id, start: 1, index: 0 } },
    SpeechRecognition: Recognition
  };
  ctx.window = ctx;
  vm.runInNewContext(voiceSource, ctx);
  return { Voice: ctx.Voice, ctx, instances, chapter, cards };
}

test('soyabeans accepte la transcription fautive locale sans assouplir les autres mots', () => {
  const { Voice } = voiceHarness();
  assert.equal(Voice.scoreAnswer('soldier beans', 'soyabeans').ok, true);
  assert.equal(Voice.scoreAnswer('soya beans', 'soyabeans').ok, true);
  assert.equal(Voice.scoreAnswer('soybeans', 'soyabeans').ok, true);
  assert.equal(Voice.scoreAnswer('soldier beans', 'tree').ok, false);
});

test('nouvelle carte et annulation ignorent les anciens résultats du micro', () => {
  const { Voice, ctx, instances, chapter, cards } = voiceHarness();
  const committed = [];
  Voice.attach({ onCommit: (_, res) => committed.push(res.expected) });
  Voice.setWanted(true, { silent: true });
  Voice.setCard(Voice.cardContext(cards[0], chapter));
  const first = instances.at(-1);
  Voice._internal.readyAt = 0;
  first.speak('soyabeans');
  assert.equal(committed.length, 0); // confirmation différée
  Voice.dismiss();
  assert.equal(Voice.state().text, '');
  first.speak('soyabeans'); // événement retardataire de l'ancien recognizer
  assert.equal(Voice.state().text, '');
  ctx.State.review.index++;
  Voice.setCard(Voice.cardContext(cards[1], chapter));
  first.speak('soyabeans');
  assert.equal(Voice.state().text, '');
  assert.equal(committed.length, 0);
  Voice.stop({ quiet: true });
});

function reviewHarness() {
  const card = { id: 'first', grade: 'unseen', perfEma: .5, successes: 0,
    failures: 0, timesReviewed: 0, dueAt: 0 };
  const chapter = { stats: { gradeCounts: { unseen: 1, bien: 0, echec: 0 },
    totalReviews: 0, dailyReviews: {}, dailyDurMs: {}, dailyDurCount: {},
    dailyChanges: {}, dailyLog: {} }, filters: { grades: {} } };
  const review = { queue: [card.id], index: 0, flipped: false, cardStart: Date.now(),
    history: [], answers: [], chapterId: 'anglais-1' };
  let wanted = true;
  const context = {
    window: {}, State: { review, view: 'review' }, M: Math, Date,
    GRADES: ['unseen', 'echec', 'difficile', 'bien', 'facile'],
    GRADE_TO_RATING: { echec: 1, difficile: 2, bien: 3, facile: 4 },
    getCur: () => ({ card, chap: chapter }), deepClone: x => JSON.parse(JSON.stringify(x)),
    syncG: ch => { ch.stats.gradeCounts = { unseen: 0, bien: card.grade === 'bien' ? 1 : 0,
      echec: card.grade === 'echec' ? 1 : 0 }; },
    schNx: () => {}, todayKey: () => '2026-10-08', isSucc: g => g === 'bien',
    Voice: { state: () => ({ wanted, supported: true }), stop: () => {}, restartCard: () => {},
      reset: () => {}, scoreAnswer: () => ({ ok: false, grade: 'echec', rating: 1 }),
      prefs: () => ({ voiceTolerance: 'normal' }) },
    voiceCtxOf: () => ({ expected: 'soyabeans', forms: false }),
    renRev: () => {}, debouncedSave: () => {}, saveData: () => {},
    FireSync: { isConnected: false }, toast: () => {}, goRecap: () => {}
  };
  context.window = context;
  const block = appSource.slice(appSource.indexOf('function applyGrade('),
    appSource.indexOf('function goRecap(')) + '\n' +
    appSource.slice(appSource.indexOf('function voiceActive('),
    appSource.indexOf('function startSingleCardReview(')) + '\n' +
    appSource.slice(appSource.indexOf('function undoRev('),
    appSource.indexOf('const getPreviewTxt='));
  vm.runInNewContext(block, context);
  return { context, review, card, chapter, mic: on => { wanted = on; } };
}

test('réessayer ne change ni la note ni les stats, même micro désactivé', () => {
  const { context: c, review: r, card, chapter, mic } = reviewHarness();
  c.voiceCommit({ ok: false, grade: 'echec', rating: 1, spoken: 'no', total: 1 }, 'bad');
  assert.equal(card.grade, 'echec');
  c.voiceRetry();
  assert.equal(r.voiceRetrying, true);
  assert.equal(r.history.length, 1);
  c.voiceCommit({ ok: true, grade: 'bien', rating: 3, spoken: 'soyabeans' }, 'ok');
  assert.equal(card.grade, 'echec');
  assert.equal(chapter.stats.totalReviews, 1);
  assert.equal(r.answers.length, 1);
  mic(false);
  c.subG('bien'); // un clic/une touche 3 ne doit rien changer après l'échec vocal
  c.undoRev(); // idem pour le bouton annuler la notation
  assert.equal(card.grade, 'echec');
  assert.equal(r.answers.length, 1);
});

test('notation manuelle quand le micro est coupé', () => {
  const { context: c, review: r, card, chapter, mic } = reviewHarness();
  mic(false);
  r.flipped = true;
  c.subG('bien');
  assert.equal(card.grade, 'bien');
  assert.equal(r.answers.length, 1);
  assert.equal(chapter.stats.totalReviews, 1);
});

test('succès vocal attend explicitement la carte suivante', () => {
  const { context: c, review: r, card } = reviewHarness();
  c.voiceCommit({ ok: true, grade: 'bien', rating: 3, spoken: 'soyabeans' }, 'ok');
  assert.equal(card.grade, 'bien');
  assert.equal(r.index, 0);
  assert.equal(r.end, undefined);
  assert.equal(r.answers.length, 1);
});

test('un recto déjà révélé reste interdit au micro après Annuler', () => {
  const { context: c, review: r } = reviewHarness();
  r.revealedWithoutVoice = true;
  r.flipped = true;
  c.subG('echec');
  c.undoRev();
  assert.equal(r.flipped, false);
  assert.equal(r.revealedWithoutVoice, true);
  assert.equal(c.voiceMayEnable(), false);
});

test('le bouton micro refuse une activation après le retournement', () => {
  const { Voice, ctx } = voiceHarness();
  ctx.voiceMayEnable = () => false;
  Voice.setWanted(true, { silent: true });
  assert.equal(Voice.state().wanted, false);
});

/* ══ Échecs du navigateur : horloge simulée + reconnaissance scénarisée ══
   Reproduit le bug « le micro s'allume et s'éteint sans arrêt » : un navigateur dont
   le service de reconnaissance échoue juste après le démarrage (onstart → erreur
   réseau → onend), ou qui se termine sans rien signaler. Le module doit s'arrêter
   après quelques tentatives et expliquer pourquoi, au lieu de boucler. */
function clockHarness(script) {
  let now = 1800000000000, seq = 0;
  const timers = new Map();
  const clock = {
    now: () => now,
    setTimeout: (fn, ms) => { const id = ++seq; timers.set(id, { at: now + (ms || 0), fn }); return id; },
    clearTimeout: id => { timers.delete(id); },
    setInterval: (fn, ms) => { const id = ++seq; timers.set(id, { at: now + ms, fn, every: ms }); return id; },
    clearInterval: id => { timers.delete(id); },
    advance(ms) {
      const end = now + ms;
      for (;;) {
        let next = null, nextId = null;
        for (const [id, t] of timers) {
          if (t.at <= end && (!next || t.at < next.at || (t.at === next.at && id < nextId))) { next = t; nextId = id; }
        }
        if (!next) break;
        now = next.at;
        if (next.every) next.at += next.every; else timers.delete(nextId);
        next.fn();
      }
      now = end;
    }
  };
  const starts = [], toasts = [];
  class Scripted {
    constructor() { this.lang = 'en-GB'; this.pending = []; }
    later(ms, fn) { this.pending.push(clock.setTimeout(fn, ms)); }
    start() { starts.push(clock.now()); script(this, starts.length); }
    abort() { this.pending.forEach(id => clock.clearTimeout(id)); this.pending = []; }
  }
  const chapter = { id: 'anglais-1', title: 'Vocabulaire', settings: {} };
  const card = { id: 'first', front: 'soja', back: 'soyabeans' };
  const ctx = {
    document: { getElementById: () => null }, Math, console,
    setTimeout: clock.setTimeout, clearTimeout: clock.clearTimeout,
    setInterval: clock.setInterval, clearInterval: clock.clearInterval,
    Date: { now: clock.now },
    data: { app: { prefs: {} }, subjects: [{ id: 'anglais', chapters: [chapter] }] },
    State: { view: 'review', review: { chapterId: chapter.id, start: 1, index: 0 } },
    SpeechRecognition: Scripted,
    toast: (msg, type) => toasts.push({ msg, type })
  };
  ctx.window = ctx;
  vm.runInNewContext(voiceSource, ctx);
  const Voice = ctx.Voice;
  Voice.setCard(Voice.cardContext(card, chapter));
  return { Voice, clock, starts, toasts, ctx, card, chapter };
}

const networkFailure = (rec) => {
  rec.later(30, () => rec.onstart && rec.onstart());
  rec.later(300, () => rec.onerror && rec.onerror({ error: 'network' }));
  rec.later(310, () => rec.onend && rec.onend());
};

test('erreur réseau répétée : le micro abandonne après 2 essais avec un message', () => {
  const h = clockHarness(networkFailure);
  h.Voice.setWanted(true, { silent: true });
  h.clock.advance(20000);
  assert.equal(h.starts.length, 2, 'pas de boucle infinie de redémarrage');
  assert.equal(h.Voice.state().wanted, false);
  assert.equal(h.Voice.state().listening, false);
  assert.equal(h.Voice.state().starting, false);
  assert.match(h.Voice.state().errorMsg, /réseau/);
  assert.equal(h.toasts.at(-1).type, 'error');
});

test('le bandeau affiche la raison de l\'arrêt, même après un nouveau rendu', () => {
  const h = clockHarness(networkFailure);
  h.Voice.setWanted(true, { silent: true });
  h.clock.advance(20000);
  const html = h.Voice.barHTML({ english: true, eligible: true });
  assert.match(html, /is-err/);
  assert.match(html, /réseau/);
  assert.doesNotMatch(html, /Activation du micro/);
});

test('réactiver le micro après un abandon efface le message et relance une tentative', () => {
  const h = clockHarness(networkFailure);
  h.Voice.setWanted(true, { silent: true });
  h.clock.advance(20000);
  assert.equal(h.starts.length, 2);
  h.Voice.toggle();                      // clic sur le micro
  assert.equal(h.Voice.state().errorMsg, '');
  assert.equal(h.starts.length, 3);
  assert.equal(h.Voice.state().wanted, true);
});

test('une carte suivante ne relance pas un micro abandonné', () => {
  const h = clockHarness(networkFailure);
  h.Voice.setWanted(true, { silent: true });
  h.clock.advance(20000);
  const n = h.starts.length;
  h.ctx.State.review.index++;
  h.Voice.setCard(h.Voice.cardContext({ id: 'second', front: 'arbre', back: 'tree' }, h.chapter));
  h.clock.advance(5000);
  assert.equal(h.starts.length, n);
  assert.equal(h.Voice.state().wanted, false);
});

test('fin de session sans onstart ni erreur : pas de blocage sur « Activation »', () => {
  const h = clockHarness((rec) => { rec.later(100, () => rec.onend && rec.onend()); });
  h.Voice.setWanted(true, { silent: true });
  h.clock.advance(20000);
  assert.equal(h.Voice.state().starting, false);
  assert.equal(h.starts.length, 2);
  assert.equal(h.Voice.state().wanted, false);
  assert.ok(h.Voice.state().errorMsg);
});

test('micro introuvable (audio-capture) : arrêt immédiat, sans nouvelle tentative', () => {
  const h = clockHarness((rec) => {
    rec.later(30, () => rec.onerror && rec.onerror({ error: 'audio-capture' }));
    rec.later(40, () => rec.onend && rec.onend());
  });
  h.Voice.setWanted(true, { silent: true });
  h.clock.advance(5000);
  assert.equal(h.starts.length, 1);
  assert.equal(h.Voice.state().wanted, false);
  assert.match(h.Voice.state().errorMsg, /micro/i);
});

test('navigateur qui ne démarre jamais (aucun événement) : délai dépassé puis abandon', () => {
  const h = clockHarness(() => {});
  h.Voice.setWanted(true, { silent: true });
  h.clock.advance(60000);
  assert.equal(h.starts.length, 2);
  assert.equal(h.Voice.state().wanted, false);
  assert.equal(h.Voice.state().starting, false);
  assert.match(h.Voice.state().errorMsg, /démarre/);
});

test('une parole reconnue remet le compteur d\'échecs à zéro', () => {
  const h = clockHarness((rec, n) => {
    if (n !== 2) return networkFailure(rec);
    rec.later(30, () => rec.onstart && rec.onstart());                  // n = 2 : le service répond
    rec.later(500, () => rec.onresult && rec.onresult({ resultIndex: 0,
      results: [Object.assign([{ transcript: 'soy' }], { isFinal: false })] }));
    rec.later(900, () => rec.onend && rec.onend());
  });
  h.Voice.setWanted(true, { silent: true });
  h.clock.advance(1000);                 // 1re tentative ratée
  assert.equal(h.Voice._internal.fails, 1);
  h.clock.advance(600);                  // 2e tentative : la parole arrive, avant toute validation
  assert.equal(h.Voice._internal.fails, 0);
  assert.equal(h.Voice.state().wanted, true);
});

test('silences normaux (no-speech après 8 s) : le micro reste actif sans message', () => {
  const h = clockHarness((rec) => {
    rec.later(30, () => rec.onstart && rec.onstart());
    rec.later(8000, () => rec.onerror && rec.onerror({ error: 'no-speech' }));
    rec.later(8010, () => rec.onend && rec.onend());
  });
  h.Voice.setWanted(true, { silent: true });
  h.clock.advance(60000);
  assert.equal(h.Voice.state().wanted, true);
  assert.equal(h.Voice.state().errorMsg, '');
  assert.ok(h.starts.length >= 6);
});

test('refus du micro : arrêt propre, sans message de boucle', () => {
  const h = clockHarness((rec) => {
    rec.later(30, () => rec.onerror && rec.onerror({ error: 'not-allowed' }));
    rec.later(40, () => rec.onend && rec.onend());
  });
  h.Voice.setWanted(true, { silent: true });
  h.clock.advance(5000);
  assert.equal(h.starts.length, 1);
  assert.equal(h.Voice.state().wanted, false);
  assert.equal(h.Voice.state().blocked, true);
});

/* Session normale qui se termine par un silence (no-speech après 2,5 s). */
const quietSession = (rec) => {
  rec.later(30, () => rec.onstart && rec.onstart());
  rec.later(2500, () => rec.onerror && rec.onerror({ error: 'no-speech' }));
  rec.later(2520, () => rec.onend && rec.onend());
};

test('fin de session normale : entre deux sessions l\'écran reste « à l\'écoute », sans bascule', () => {
  const h = clockHarness(quietSession);
  h.Voice.setWanted(true, { silent: true });
  h.clock.advance(100);
  assert.equal(h.Voice.state().listening, true);
  h.clock.advance(2420);                 // fin de session à 2520 ms, après silence
  assert.equal(h.Voice.state().listening, false, 'rien n\'écoute entre deux sessions');
  assert.equal(h.Voice.state().resuming, true);
  assert.equal(h.Voice.state().wanted, true);
  assert.equal(h.Voice.state().errorMsg, '');
  assert.match(h.Voice.micHTML(), /is-on/, 'le bouton reste allumé');
  assert.match(h.Voice.barHTML({ english: true, eligible: true }), /Écoute…/, 'le bandeau ne repasse pas sur « Activation »');
  h.clock.advance(400);                  // reprise à 2780 ms, onstart à 2810 ms
  assert.equal(h.starts.length, 2);
  assert.equal(h.Voice.state().listening, true);
  assert.equal(h.Voice.state().resuming, false);
  assert.equal(h.Voice.state().wanted, true);
});

test('reprise qui échoue : l\'affichage repasse sur « Activation », sans faux « Écoute »', () => {
  const h = clockHarness((rec, n) => (n === 1 ? quietSession(rec) : networkFailure(rec)));
  h.Voice.setWanted(true, { silent: true });
  h.clock.advance(2520);
  assert.equal(h.Voice.state().resuming, true);
  h.clock.advance(600);                  // reprise lancée à 2780 ms, échec réseau à 3090 ms
  assert.equal(h.starts.length, 2);
  assert.equal(h.Voice.state().listening, false);
  assert.equal(h.Voice.state().resuming, false);
  assert.equal(h.Voice._internal.fails, 1);
  assert.match(h.Voice.barHTML({ english: true, eligible: true }), /Activation du micro/);
});

test('carte suivante : le bandeau reste « à l\'écoute » pendant la relance du micro', () => {
  const h = clockHarness(quietSession);
  h.Voice.setWanted(true, { silent: true });
  h.clock.advance(100);
  assert.equal(h.Voice.state().listening, true);
  const next = { id: 'second', front: 'maïs', back: 'corn' };
  h.Voice.setCard(h.Voice.cardContext(next, h.chapter));
  assert.equal(h.starts.length, 2, 'le micro repart pour la nouvelle carte');
  assert.equal(h.Voice.state().resuming, true);
  const bar = h.Voice.barHTML({ english: true, eligible: true });
  assert.match(bar, /Écoute…/);
  assert.doesNotMatch(bar, /Activation du micro/);
  h.clock.advance(50);                   // onstart de la nouvelle session
  assert.equal(h.Voice.state().listening, true);
  assert.equal(h.Voice.state().resuming, false);
  assert.equal(h.Voice.state().wanted, true);
});

test('une réponse incomplète attend Entrée même après un long silence', () => {
  const h = clockHarness(rec => {
    rec.later(30, () => rec.onstart());
    rec.later(100, () => rec.onresult({ resultIndex: 0,
      results: [Object.assign([{ transcript: 'wrong' }], { isFinal: true })] }));
  });
  const commits = [];
  h.Voice.attach({ onCommit: (...args) => commits.push(args) });
  h.Voice.setWanted(true, { silent: true });
  h.clock.advance(30000);
  assert.equal(commits.length, 0);
  assert.equal(h.Voice.state().text, 'wrong', 'la première parole ne doit pas être ignorée');
  assert.equal(h.Voice.submit(), true);
  assert.equal(commits.length, 1);
  assert.equal(commits[0][2], 'bad');
  assert.equal(h.Voice.submit(), false);
});

test('une bonne réponse reste validée automatiquement', () => {
  const h = clockHarness(rec => {
    rec.later(30, () => rec.onstart());
    rec.later(100, () => rec.onresult({ resultIndex: 0,
      results: [Object.assign([{ transcript: 'soyabeans' }], { isFinal: true })] }));
  });
  const commits = [];
  h.Voice.attach({ onCommit: (...args) => commits.push(args) });
  h.Voice.setWanted(true, { silent: true });
  assert.equal(h.Voice.submit(), false, 'Entrée sans transcription ne note rien');
  h.clock.advance(1000);
  assert.equal(commits.length, 1);
  assert.equal(commits[0][2], 'ok');
});

test('erreur sans onend : pas de blocage ni de boucle du micro', () => {
  const h = clockHarness(rec => {
    rec.later(30, () => rec.onstart());
    rec.later(100, () => rec.onerror({ error: 'network' }));
  });
  h.Voice.setWanted(true, { silent: true });
  h.clock.advance(20000);
  assert.equal(h.starts.length, 2);
  assert.equal(h.Voice.state().wanted, false);
  assert.match(h.Voice.state().errorMsg, /réseau/);
});

test('sessions vides de plusieurs secondes : arrêt plutôt que redémarrage infini', () => {
  const h = clockHarness(rec => {
    rec.later(30, () => rec.onstart());
    rec.later(3000, () => rec.onend());
  });
  h.Voice.setWanted(true, { silent: true });
  h.clock.advance(30000);
  assert.equal(h.starts.length, 2);
  assert.equal(h.Voice.state().wanted, false);
});

test('Entrée valide la dictée initiale et les nouvelles tentatives, sans passer à la suite', () => {
  const { context: c, review: r } = reviewHarness();
  let submits = 0, prevented = 0;
  c.Voice.state = () => ({ wanted: true, supported: true, eligible: true });
  c.Voice.submit = () => { submits++; };
  const event = { key: 'Enter', preventDefault: () => prevented++ };
  assert.equal(c.voiceKeyAction(event), true);
  r.voiceResult = { ok: false }; r.voiceRetrying = true;
  assert.equal(c.voiceKeyAction(event), true);
  c.voiceKeyAction({ ...event, repeat: true });
  assert.equal(submits, 2);
  assert.equal(prevented, 3);
  assert.equal(r.index, 0);
});

test('clic simple souris retourne la carte ; images, liens et sélection restent utilisables', () => {
  let click, flips = 0, selection = '';
  const r = { flipped: false };
  const ctx = { r, Date, window: { getSelection: () => selection },
    $: () => ({ addEventListener: (_, fn) => { click = fn; } }),
    revealAnswer: () => { flips++; } };
  vm.runInNewContext(appSource.slice(appSource.indexOf('  let lastTap = 0;'),
    appSource.indexOf('  /* Branchement du moteur vocal')), ctx);
  const event = { pointerType: 'mouse', target: { closest: () => null } };
  click(event);
  assert.equal(flips, 1);
  click({ ...event, target: { closest: () => ({}) } });
  selection = 'texte sélectionné'; click(event);
  selection = ''; r.flipped = true; click(event);
  assert.equal(flips, 1);
});

/* ══ Bandeau allégé : plus de consignes répétées à chaque carte ══
   On compare le texte visible du bandeau (sans les attributs du bouton micro). */
const barText = html => {
  const key = 'id="voiceBarText">';
  const a = html.indexOf(key) + key.length;
  return html.slice(a, html.indexOf('</div>', a));
};
const plain = html => barText(html).replace(/<[^>]+>/g, '').trim();

test('bandeau : rien à écrire quand le micro est coupé ou la carte déjà révélée', () => {
  const h = clockHarness(() => {});
  assert.equal(plain(h.Voice.barHTML({ english: true, eligible: true })), '');
  assert.equal(plain(h.Voice.barHTML({ english: true, eligible: true, revealed: true })), '');
});

test('bandeau : un résultat n\'affiche que son score, le bouton « Carte suivante » reste', () => {
  const h = clockHarness(() => {});
  const ok = { ok: true, matched: 3, total: 3 };
  assert.equal(plain(h.Voice.barHTML({ english: true, eligible: true, result: ok })), '✓ 3/3');
  assert.equal(plain(h.Voice.barHTML({ english: true, eligible: true, result: { ok: false, manual: true } })), '✗ non sue');
  assert.equal(plain(h.Voice.barHTML({ english: true, eligible: true,
    result: { ok: false, matched: 1, total: 3, rating: 1.67, spoken: '' } })), '✗ 1/3 formes · note 1,67');
  assert.match(h.Voice.actionsHTML({ result: ok }), /Carte suivante/);
});

test('bandeau : une réponse ratée garde la phrase entendue, sans « Corrigez puis passez »', () => {
  const h = clockHarness(() => {});
  const res = h.Voice.scoreAnswer('soldier beans', 'tree');
  const text = plain(h.Voice.barHTML({ english: true, eligible: true, result: res }));
  assert.match(text, /Vous avez dit : soldier beans/);
  assert.doesNotMatch(text, /Corrigez/);
  h.ctx.data.app.prefs.voiceShowSpoken = false;       // réglage « Afficher ma phrase reconnue » coupé
  const quiet = plain(h.Voice.barHTML({ english: true, eligible: true, result: res }));
  assert.equal(quiet, '✗ réponse incomplète');        // une seule forme attendue : seul le score reste
  assert.doesNotMatch(quiet, /Corrigez|Vous avez dit/);
});

test('bandeau : un entraînement se signale par un seul mot', () => {
  const h = clockHarness(() => {});
  const html = h.Voice.barHTML({ english: true, eligible: true, practice: true, result: { ok: true, matched: 3, total: 3 } });
  assert.match(html, /Entraînement/);
  assert.doesNotMatch(html, /note initiale/);
});

test('bandeau : pendant l\'écoute, un simple « Écoute… »', () => {
  const h = clockHarness(rec => { rec.later(30, () => rec.onstart && rec.onstart()); });
  h.Voice.setWanted(true, { silent: true });
  h.clock.advance(100);
  assert.equal(plain(h.Voice.barHTML({ english: true, eligible: true })), 'Écoute…');
});

test('« Entrée pour valider » ne s\'affiche que sur la première carte', () => {
  const h = clockHarness(rec => {
    rec.later(30, () => rec.onstart && rec.onstart());
    rec.later(100, () => rec.onresult && rec.onresult({ resultIndex: 0,
      results: [Object.assign([{ transcript: 'soy' }], { isFinal: false })] }));
  });
  h.Voice.setWanted(true, { silent: true });
  h.clock.advance(200);
  h.ctx.State.review.voiceHintIdx = h.ctx.State.review.index;   // renRev pose ce repère à la 1re carte où le micro sert
  assert.match(plain(h.Voice.barHTML({ english: true, eligible: true })), /soy · Entrée pour valider/);
  h.ctx.State.review.index = 1;                       // carte suivante de la même session
  const later = plain(h.Voice.barHTML({ english: true, eligible: true }));
  assert.match(later, /soy/);
  assert.doesNotMatch(later, /Entrée/);
});

test('carte non dictable (image, formule) : pas de micro, bouton gris, bandeau vide', () => {
  const h = clockHarness(rec => { rec.later(30, () => rec.onstart && rec.onstart()); });
  h.Voice.setWanted(true, { silent: true });
  h.clock.advance(100);
  const before = h.starts.length;
  h.Voice.setCard(h.Voice.cardContext({ id: 'img', front: 'schéma', back: '[IMAGE_ID:3]' }, h.chapter));
  h.clock.advance(5000);
  assert.equal(h.Voice.state().eligible, false);
  assert.equal(h.Voice.state().listening, false);
  assert.equal(h.starts.length, before, 'le navigateur n\'ouvre pas le micro pour cette carte');
  assert.doesNotMatch(h.Voice.micHTML(), /is-on|is-starting/, 'le bouton ne fait pas croire à une écoute');
  assert.equal(plain(h.Voice.barHTML({ english: true, eligible: false })), '');
});

test('activer ou couper le micro ne lance plus de toast de confirmation', () => {
  const h = clockHarness(() => {});
  h.Voice.setWanted(true);
  h.Voice.setWanted(false);
  assert.deepEqual(h.toasts, []);
});

function hintHarness() {
  const ctx = {};
  vm.runInNewContext(appSource.slice(appSource.indexOf('function voiceHintsHere('), appSource.indexOf('function renRev(')), ctx);
  return ctx;
}

test('indications clavier du mode vocal : seulement sur la première carte où le micro sert', () => {
  const { reviewHintHTML: hint } = hintHarness();
  assert.match(hint(true, null, true), /je ne sais pas/);
  assert.match(hint(true, null, true), /valider ma réponse/);
  assert.equal(hint(false, null, true), '');
  assert.match(hint(true, { ok: true }, false), /carte suivante/);
  assert.equal(hint(false, { ok: true }, false), '');
});

test('repère des indications : posé à la première carte où le micro sert, puis figé', () => {
  const { voiceHintsHere } = hintHarness();
  const r = { index: 0 };
  assert.equal(voiceHintsHere(r, false, null), false, 'carte sans micro : rien à poser');
  r.index = 1;
  assert.equal(voiceHintsHere(r, true, null), true, 'premier usage du micro : indications ici');
  assert.equal(voiceHintsHere(r, true, null), true, 'nouveau rendu de la même carte : toujours ici');
  r.index = 2;
  assert.equal(voiceHintsHere(r, true, null), false, 'carte suivante : plus d\'indications');
  assert.equal(voiceHintsHere(r, false, { ok: true }), false);
});

test('révision classique : les indications « retourner » et 1–4 restent sur chaque carte', () => {
  const { reviewHintHTML: hint } = hintHarness();
  for (const first of [true, false]) {
    assert.match(hint(first, null, false), /retourner/);
    assert.match(hint(first, null, false), /<kbd>1<\/kbd><kbd>2<\/kbd><kbd>3<\/kbd><kbd>4<\/kbd> évaluer/);
  }
});

function chapterVoiceHarness(state) {
  const ctx = {
    Voice: { isEnglishChapter: () => true, state: () => state, micHTML: () => '<button class="voice-mic"></button>' },
    escTxt: s => s
  };
  vm.runInNewContext(appSource.slice(appSource.indexOf('function chapterVoiceHTML('), appSource.indexOf('function bindChapterVoice(')), ctx);
  return ctx.chapterVoiceHTML;
}

test('page du chapitre : libellé court, sans phrase d\'explication', () => {
  const off = chapterVoiceHarness({ supported: true, wanted: false, errorMsg: '' });
  assert.match(off({ id: 'x' }), /Révision à la voix/);
  assert.doesNotMatch(off({ id: 'x' }), /dictez/);
  const on = chapterVoiceHarness({ supported: true, wanted: true, errorMsg: '' });
  assert.match(on({ id: 'x' }), /Mode vocal <b>activé<\/b>/);
  assert.doesNotMatch(on({ id: 'x' }), /Continuer la session/);
});
