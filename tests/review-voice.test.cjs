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
