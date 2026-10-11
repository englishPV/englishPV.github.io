// Onglet « Évolution » des statistiques (js/10_insights.js) : reconstruction de
// l'historique à partir du journal des révisions (stTimeline), et file de révision
// (bldQ, js/04_srs_algorithm_and_stats.js) : erreurs d'abord, plafond de nouvelles
// cartes par jour.
// Lancer depuis la racine du dépôt : node --test tests/*.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const INSIGHTS = fs.readFileSync('js/10_insights.js', 'utf8');
const SRS = fs.readFileSync('js/04_srs_algorithm_and_stats.js', 'utf8');

/* ══ stTimeline ══ */
function loadTimeline() {
  const src = INSIGHTS.slice(INSIGHTS.indexOf('function stTimeline('), INSIGHTS.indexOf('/* ───────────────────────────── Composants SVG/DOM'));
  const ctx = {
    Math, Date, Set, Map, Array, Object,
    GRADE_INIT: () => ({ unseen: 0, echec: 0, difficile: 0, bien: 0, facile: 0 }),
    isSucc: g => g === 'facile' || g === 'bien'
  };
  vm.runInNewContext(src, ctx);
  return ctx;
}

/* 3 cartes ; état actuel : c1=facile, c2=difficile, c3=unseen.
   Journal : 01/10 c1 unseen→bien + c2 unseen→echec ; 02/10 c1 bien→facile +
   c2 echec→difficile ; 03/10 c1 facile→facile (même niveau : révision quand même). */
function mkChapter() {
  return {
    id: 'ch1',
    cards: [
      { id: 'c1', grade: 'facile' },
      { id: 'c2', grade: 'difficile' },
      { id: 'c3', grade: 'unseen' }
    ],
    stats: {
      dailyReviews:  { '2026-10-01': 2, '2026-10-02': 2, '2026-10-03': 1 },
      dailyDurMs:    { '2026-10-01': 10000, '2026-10-02': 20000, '2026-10-03': 5000 },
      dailyDurCount: { '2026-10-01': 2, '2026-10-02': 2, '2026-10-03': 1 },
      dailyLog: {
        '2026-10-01': [
          { cardId: 'c1', prev: 'unseen', next: 'bien', ts: 1000, ms: 5000 },
          { cardId: 'c2', prev: 'unseen', next: 'echec', ts: 2000, ms: 5000 }
        ],
        '2026-10-02': [
          { cardId: 'c1', prev: 'bien', next: 'facile', ts: 3000, ms: 10000 },
          { cardId: 'c2', prev: 'echec', next: 'difficile', ts: 4000, ms: 10000 }
        ],
        '2026-10-03': [
          { cardId: 'c1', prev: 'facile', next: 'facile', ts: 5000, ms: 5000 }
        ],
        '2026-09-30': [ // hors période : ignoré
          { cardId: 'c1', prev: 'unseen', next: 'bien', ts: 500, ms: 1000 }
        ]
      }
    }
  };
}
const DAYS = ['2026-10-01', '2026-10-02', '2026-10-03'];

test('stTimeline reconstruit la répartition des niveaux jour par jour (recul depuis l\'état actuel)', () => {
  const { stTimeline } = loadTimeline();
  const tl = stTimeline([{ ch: mkChapter() }], DAYS);
  assert.equal(tl.n, 3);
  assert.equal(tl.total, 3);
  // fin du 01/10 : c1=bien, c2=echec, c3=unseen
  assert.deepEqual(tl.grades[0], { unseen: 1, echec: 1, difficile: 0, bien: 1, facile: 0 });
  // fin du 02/10 : c1=facile, c2=difficile, c3=unseen
  assert.deepEqual(tl.grades[1], { unseen: 1, echec: 0, difficile: 1, bien: 0, facile: 1 });
  // fin du 03/10 : pas de changement de niveau (révision au même niveau)
  assert.deepEqual(tl.grades[2], { unseen: 1, echec: 0, difficile: 1, bien: 0, facile: 1 });
});

test('stTimeline : cumul, réussite glissante 7 j, cartes vues, nouvelles cartes, bilan', () => {
  const { stTimeline } = loadTimeline();
  const tl = stTimeline([{ ch: mkChapter() }], DAYS);
  assert.deepEqual(tl.cumRev, [2, 4, 5]);
  assert.deepEqual(tl.succ7, [50, 50, 60]);      // 1/2, 2/4, 3/5
  assert.deepEqual(tl.seen, [2, 2, 2]);           // c1 et c2 vues dès le 01/10
  assert.deepEqual(tl.fresh, [2, 0, 0]);          // 2 cartes vues pour la 1re fois le 01/10
  assert.deepEqual(tl.avgS7, [5, 7.5, 7]);        // 10 s/2, 30 s/4, 35 s/5
  // bilan : 1re moitié = 01/10, 2e moitié = 02 + 03/10
  // (spread : les objets viennent du royaume vm, de prototype différent)
  assert.deepEqual({ ...tl.halves.a }, { ok: 1, ko: 1, rev: 2, activeDays: 1, newCards: 2, succ: 50 });
  assert.deepEqual({ ...tl.halves.b }, { ok: 2, ko: 1, rev: 3, activeDays: 2, newCards: 0, succ: 67 });
  assert.equal(tl.evTotal, 5);                    // l'événement du 30/09 (hors période) est ignoré
  assert.equal(tl.hasData, true);
});

test('stTimeline : jours sans événement conservent l\'état, cartes supprimées ignorées, périmètre vide', () => {
  const { stTimeline } = loadTimeline();
  const ch = mkChapter();
  // carte supprimée : son événement ne doit ni compter ni ressusciter la carte
  ch.stats.dailyLog['2026-10-02'].push({ cardId: 'gone', prev: 'unseen', next: 'bien', ts: 3500, ms: 1 });
  const tl = stTimeline([{ ch }], ['2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04']);
  assert.equal(tl.total, 3);
  assert.equal(tl.evTotal, 5);
  assert.deepEqual(tl.grades[3], tl.grades[2], 'le 04/10 (sans événement) reprend l\'état du 03/10');
  const empty = stTimeline([], DAYS);
  assert.equal(empty.hasData, false);
  assert.equal(empty.total, 0);
  assert.deepEqual(empty.succ7, [null, null, null]);
});

/* ══ Rendu du panneau Évolution (test de fumée) ══ */
function loadPanel() {
  const src = INSIGHTS.slice(INSIGHTS.indexOf('const ST_COLORS ='), INSIGHTS.indexOf('/* Moteur d\'animation'));
  const ctx = {
    Math, Date, Array, Object,
    GRADES: ['unseen', 'echec', 'difficile', 'bien', 'facile'],
    GRADE_INIT: () => ({ unseen: 0, echec: 0, difficile: 0, bien: 0, facile: 0 }),
    isSucc: g => g === 'facile' || g === 'bien',
    stEv: s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])),
    stFmt: n => (n || 0).toLocaleString('fr-FR'),
    stPct: (a, b) => b > 0 ? Math.round(a / b * 100) : 0,
    stShortDay: k => { const [, m, d] = k.split('-'); return `${d}/${m}`; },
    stDayLabel: k => k,
    todayKey: () => '2026-10-03',
    ico: () => '<svg/>'
  };
  vm.runInNewContext(src, ctx);
  return ctx;
}

test('stPanelEvolution : rend le lecteur, le camembert, les courbes et le bilan', () => {
  const panel = loadPanel();
  const tl = loadTimeline().stTimeline([{ ch: mkChapter() }], DAYS);
  const html = panel.stPanelEvolution(tl, {});
  assert.match(html, /id="stEvoPlay"/);
  assert.match(html, /id="stEvoSlider"/);
  assert.match(html, /st-evo-seg/);                      // camembert animé (5 tranches)
  assert.match(html, /data-chart="succ"/);
  assert.match(html, /data-chart="rev"/);
  assert.match(html, /data-chart="seen"/);
  assert.match(html, /Taux de réussite \(moy\. glissante 7 j\)/);
  assert.match(html, /st-bilan__verdict/);              // bilan « progresse-t-on ? »
  assert.match(html, /Tu progresses/, 'succ 50 → 67 : verdict positif');
  // état vide : message dédié
  const empty = loadTimeline().stTimeline([], DAYS);
  assert.match(panel.stPanelEvolution(empty, {}), /Pas encore d'historique/);
});

/* ══ bldQ (file de révision) ══ */
function loadBldQ(prefs) {
  const prelude = `
    var M = Math;
    var DESIRED_RETENTION = 0.9;
    var fsrsRetrievability = function (elapsed, s) { return Math.pow(1 + (19 / 81) * (elapsed / s), -0.5); };
    var todayKey = function () { return '2026-10-09'; };
    var data = { app: { prefs: ${JSON.stringify(prefs)} } };
  `;
  const src = prelude + SRS.slice(SRS.indexOf('function bldQ('), SRS.indexOf('function getStreak('));
  const ctx = { Math, Date };
  vm.runInNewContext(src, ctx);
  return ctx;
}

function mkPool(now) {
  return [
    { id: 'new1',  grade: 'unseen' },
    { id: 'new2',  grade: 'unseen' },
    { id: 'fail',  grade: 'echec',     stability: 2,  lastReviewed: now - 3 * 864e5,  dueAt: now - 864e5 },
    { id: 'hard',  grade: 'difficile', stability: 4,  lastReviewed: now - 2 * 864e5,  dueAt: now - 864e5 },
    { id: 'due',   grade: 'bien',      stability: 5,  lastReviewed: now - 10 * 864e5, dueAt: now - 864e5 },
    { id: 'later', grade: 'facile',    stability: 30, lastReviewed: now - 2 * 864e5,  dueAt: now + 10 * 864e5 }
  ];
}

test('bldQ : les erreurs passent avant les cartes dues, elles-mêmes avant les nouvelles', () => {
  const now = Date.now();
  const ch = { id: 'ch1', deadline: null, cards: mkPool(now), stats: { dailyLog: {} } };
  const { bldQ } = loadBldQ({ desiredRetention: 0.9, newCardLimit: 20 });
  const q = bldQ(ch, ch.cards, 10).map(c => c.id);
  assert.equal(q[0], 'fail', 'échec en premier');
  assert.equal(q[1], 'hard', 'difficile ensuite');
  assert.equal(q[2], 'due', 'carte due (r < rétention cible) avant les nouvelles');
  assert.ok(q.indexOf('later') > q.indexOf('due'), 'carte pas encore due en dernier');
  assert.deepEqual(q.filter(id => id.startsWith('new')).sort(), ['new1', 'new2']);
  assert.ok(q.indexOf('new1') > q.indexOf('due'), 'nouvelles cartes après les cartes dues');
});

test('bldQ : avec une date limite, les nouvelles cartes passent avant les révisions banales', () => {
  const now = Date.now();
  const ch = { id: 'ch1', deadline: '2026-12-01', cards: mkPool(now), stats: { dailyLog: {} } };
  const { bldQ } = loadBldQ({ desiredRetention: 0.9, newCardLimit: 20 });
  const q = bldQ(ch, ch.cards, 10).map(c => c.id);
  assert.equal(q[0], 'fail');
  assert.equal(q[1], 'hard');
  assert.ok(q[2] === 'new1' || q[2] === 'new2', 'objectif du jour : les nouvelles avancent');
  assert.ok(q.indexOf('due') > 2);
});

test('bldQ : plafond de nouvelles cartes par jour (les dues passent avant)', () => {
  const now = Date.now();
  const ch = {
    id: 'ch1', deadline: null,
    cards: [
      { id: 'new1', grade: 'unseen' },
      { id: 'new2', grade: 'unseen' },
      { id: 'new3', grade: 'unseen' },
      { id: 'due',   grade: 'bien',   stability: 5,  lastReviewed: now - 10 * 864e5, dueAt: now - 864e5 },
      { id: 'later', grade: 'facile', stability: 30, lastReviewed: now - 2 * 864e5,  dueAt: now + 10 * 864e5 }
    ],
    stats: { dailyLog: { '2026-10-09': [   // 2 nouvelles cartes déjà vues aujourd'hui
      { cardId: 'x', prev: 'unseen', next: 'bien', ts: 1, ms: 1 },
      { cardId: 'y', prev: 'unseen', next: 'bien', ts: 2, ms: 1 }
    ] } }
  };
  const { bldQ } = loadBldQ({ desiredRetention: 0.9, newCardLimit: 2 });
  const q = bldQ(ch, ch.cards, 10).map(c => c.id);
  assert.equal(q[0], 'due');
  assert.equal(q[1], 'later');
  assert.deepEqual(q.slice(2).sort(), ['new1', 'new2', 'new3'], 'plafond atteint : nouvelles cartes repoussées en dernier');

  const { bldQ: bldQIllimite } = loadBldQ({ desiredRetention: 0.9, newCardLimit: 0 });
  const q2 = bldQIllimite(ch, ch.cards, 10).map(c => c.id);
  assert.equal(q2[0], 'due');
  assert.ok(q2.indexOf('new1') < q2.indexOf('later'), '0 = illimité : les nouvelles passent avant la révision avancée');

  ch.deadline = '2026-12-01';
  const { bldQ: bldQDeadline } = loadBldQ({ desiredRetention: 0.9, newCardLimit: 1 });
  const q3 = bldQDeadline(ch, ch.cards, 10).map(c => c.id);
  assert.ok(q3.indexOf('new1') < q3.indexOf('later'), 'date limite : le plafond ne s\'applique pas');
});
