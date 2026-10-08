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
