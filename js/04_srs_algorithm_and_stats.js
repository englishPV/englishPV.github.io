/*04_srs_algorithm_and_stats.js*/
/* === FSRS-6 IMPLEMENTATION + STATS === */

// ═══════════════════════════════════════════════════
//  FSRS-6 CORE — 21 paramètres, courbe en loi de puissance
// ═══════════════════════════════════════════════════

const FSRS_DECAY = -0.5;
const FSRS_FACTOR = 19.0 / 81.0;
const DESIRED_RETENTION = 0.9;

const FSRS_W = [
  0.212, 1.2931, 2.3065, 8.2956, 6.4133, 0.8334, 3.0194, 0.001,
  1.8722, 0.1666, 0.796, 1.4835, 0.0614, 0.2629, 1.6483, 0.6014,
  1.8729, 0.5425, 0.0912, 0.0658, 0.1542
];

const GRADE_TO_RATING = {
  'echec': 1,
  'difficile': 2,
  'bien': 3,
  'facile': 4
};

function fsrsRetrievability(elapsedDays, stability) {
  if (stability <= 0) return 0;
  return Math.pow(1 + FSRS_FACTOR * (elapsedDays / stability), FSRS_DECAY);
}

function fsrsNextInterval(stability, desiredRetention) {
  if (stability <= 0) return 1;
  const interval = (stability / FSRS_FACTOR) *
    (Math.pow(desiredRetention, 1 / FSRS_DECAY) - 1);
  return Math.max(1, Math.round(interval));
}

function fsrsInitialStability(rating) {
  return FSRS_W[rating - 1];
}

function fsrsInitialDifficulty(rating) {
  return clamp(
    FSRS_W[4] - Math.exp(FSRS_W[5] * (rating - 1)) + 1,
    1, 10
  );
}

function fsrsNextDifficulty(d, rating) {
  const d0Good = FSRS_W[4] - Math.exp(FSRS_W[5] * (3 - 1)) + 1;
  const newD = FSRS_W[7] * d0Good + (1 - FSRS_W[7]) * (d + FSRS_W[6] * (rating - 3));
  return clamp(newD, 1, 10);
}

function fsrsNextStabilitySuccess(d, s, r, rating) {
  const hardPenalty = (rating === 2) ? FSRS_W[15] : 1;
  const easyBonus = (rating === 4) ? FSRS_W[16] : 1;
  const sinc = 1 +
    Math.exp(FSRS_W[8]) *
    (11 - d) *
    Math.pow(s, -FSRS_W[9]) *
    (Math.exp((1 - r) * FSRS_W[10]) - 1) *
    hardPenalty *
    easyBonus;
  return s * sinc;
}

function fsrsNextStabilityFail(d, s, r) {
  const newS = FSRS_W[11] *
    Math.pow(d, -FSRS_W[12]) *
    (Math.pow(s + 1, FSRS_W[13]) - 1) *
    Math.exp(FSRS_W[14] * (1 - r));
  return Math.min(newS, s);
}

function fsrsSameDayStability(s, rating) {
  return s * Math.exp(
    FSRS_W[17] * (rating - 3 + FSRS_W[18])
  ) * Math.pow(s, -FSRS_W[19]);
}

// ═══════════════════════════════════════════════════
//  FONCTION PRINCIPALE : schNx
// ═══════════════════════════════════════════════════

function schNx(card, grade, now) {
  const rating = GRADE_TO_RATING[grade];
  if (!rating) return;

  const dr = data?.app?.prefs?.desiredRetention || DESIRED_RETENTION;

  const elapsedDays = card.lastReviewed
    ? Math.max(0, (now - card.lastReviewed) / 864e5)
    : 0;

  const isSameDay = elapsedDays < 1 && card.timesReviewed > 0;

  if (!card.timesReviewed || card.timesReviewed === 0) {
    card.stability = fsrsInitialStability(rating);
    card.difficulty = fsrsInitialDifficulty(rating);
  } else if (isSameDay) {
    card.difficulty = fsrsNextDifficulty(card.difficulty || 5, rating);
    card.stability = fsrsSameDayStability(card.stability || 1, rating);
  } else {
    const s = card.stability || 1;
    const d = card.difficulty || 5;
    const r = fsrsRetrievability(elapsedDays, s);

    card.difficulty = fsrsNextDifficulty(d, rating);

    if (rating === 1) {
      card.stability = fsrsNextStabilityFail(card.difficulty, s, r);
    } else {
      card.stability = fsrsNextStabilitySuccess(card.difficulty, s, r, rating);
    }
  }

  const intervalDays = fsrsNextInterval(card.stability, dr);
  card.intervalDays = intervalDays;
  card.dueAt = now + intervalDays * 864e5;
  card.ef = card.difficulty ? (3.5 - card.difficulty * 0.2) : 2.5;

  if (rating < 3) {
    card.streak = (card.streak <= 0 ? card.streak - 1 : -1);
  } else {
    card.streak = (card.streak >= 0 ? card.streak + 1 : 1);
  }
  card.streak = clamp(card.streak, -8, 12);
}

// ═══════════════════════════════════════════════════
//  QUEUE BUILDER
// ═══════════════════════════════════════════════════

function bldQ(c, pool, sz) {
  const sh = a => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = M.floor(M.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const now = Date.now();
  const dr = data?.app?.prefs?.desiredRetention || DESIRED_RETENTION;

  const scored = pool.map(card => {
    const g = card.grade || 'unseen';

    if (g === 'unseen') {
      return { card, priority: 0, score: Math.random() * 0.1 };
    }

    const s = card.stability || 1;
    const elapsedDays = card.lastReviewed
      ? Math.max(0, (now - card.lastReviewed) / 864e5)
      : 0;
    const r = fsrsRetrievability(elapsedDays, s);

    if (g === 'echec') {
      return { card, priority: 1, score: -r + Math.random() * 0.05 };
    }

    if (g === 'difficile') {
      return { card, priority: 2, score: -r + Math.random() * 0.05 };
    }

    if (r <= dr) {
      return { card, priority: 3, score: r + Math.random() * 0.02 };
    }

    return { card, priority: 4, score: r + Math.random() * 0.02 };
  });

  scored.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    return a.score - b.score;
  });

  return scored.slice(0, sz).map(x => x.card);
}

// ═══════════════════════════════════════════════════
//  STATS & HELPERS
// ═══════════════════════════════════════════════════

function getStreak(c) {
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    if (c.stats.dailyReviews[dateKey(d)] > 0) streak++;
    else if (i) break;
  }
  return streak;
}

function togTypeFilt(c, k) {
  const s = c.filters.types;
  if (!s) return;
  const keys = Object.keys(s),
    actCnt = keys.reduce((n, x) => n + (s[x] ? 1 : 0), 0);
  if (actCnt === keys.length) {
    keys.forEach(x => s[x] = (x === k));
  } else if (actCnt === 1 && s[k]) {
    keys.forEach(x => s[x] = true);
  } else {
    s[k] = !s[k];
    if (!s[k] && actCnt === 1) s[k] = true;
  }
}

const getLive = c => {
  const o = GRADE_INIT();
  c.cards.forEach(x => o[x.grade || 'unseen']++);
  return o;
};

const syncG = c => c.stats.gradeCounts = getLive(c);
const getTod = c => c.stats.dailyReviews[todayKey()] || 0;
const getTodCh = c => c.stats.dailyChanges[todayKey()] || { changed: 0, total: 0 };

const cardPassesFilter = (card, filters) => {
  if (!filters.grades[card.grade || 'unseen']) return false;
  if (filters.types && card.cardType && !filters.types[card.cardType]) return false;
  return true;
};

const cntAv = c => c.cards.filter(x => cardPassesFilter(x, c.filters)).length;

const getSucc = c => {
  const k = c.stats.gradeCounts,
    g = k.bien + k.facile,
    t = g + k.echec + k.difficile;
  return t ? M.round(g / t * 100) : 0;
};

const get7dAvgMs = c => {
  const b = new Date();
  let s = 0, n = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(b);
    d.setDate(b.getDate() - i);
    const k = dateKey(d);
    s += (c.stats.dailyDurMs[k] || 0);
    n += (c.stats.dailyDurCount[k] || 0);
  }
  return n ? M.round(s / n) : 0;
};

const get7dAvg = c => {
  const b = new Date(), a = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(b);
    d.setDate(b.getDate() - i);
    a.push(c.stats.dailyReviews[dateKey(d)] || 0);
  }
  return M.round(avg(a));
};

const daysAgo = (n, i) => {
  const d = new Date();
  d.setDate(d.getDate() - ((n - 1) - i));
  return d;
};

const getLastN = (c, n) =>
  Array.from({ length: n }, (_, i) =>
    c.stats.dailyReviews[dateKey(daysAgo(n, i))] || 0);

const getLbls = n =>
  Array.from({ length: n }, (_, i) =>
    ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'][daysAgo(n, i).getDay()]);

const dayKeyIdx = (n, i) => dateKey(daysAgo(n, i));

// ═══════════════════════════════════════════════════
//  CHARTS
// ═══════════════════════════════════════════════════

const ChartHit = {};

function drawChart(id, k, sel) {
  const el = D.getElementById(id);
  if (!el) return;
  const ctx = el.getContext('2d'), w = 140, h = 140, cx = 70, cy = 70, R = 64, r = 40;
  ctx.clearRect(0, 0, w, h);
  const segs = [
    { k: 'unseen', c: '#9ca3af' },
    { k: 'echec', c: '#ef4444' },
    { k: 'difficile', c: '#f59e0b' },
    { k: 'bien', c: '#3b82f6' },
    { k: 'facile', c: '#22c55e' }
  ];
  const tot = segs.reduce((s, x) => s + (k[x.k] || 0), 0);
  const arcs = [];

  if (!tot) {
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.28);
    ctx.lineWidth = 24; ctx.strokeStyle = '#cbd5e1'; ctx.stroke();
    ChartHit[id] = { cx, cy, innerR: r, outerR: R, arcs: [] };
    return;
  }

  let start = -1.57;
  segs.forEach(s => {
    const v = k[s.k]; if (!v) return;
    const ang = (v / tot) * 6.28, end = start + ang, act = !sel || sel[s.k];
    ctx.beginPath(); ctx.arc(cx, cy, 52, start, end);
    ctx.lineWidth = 24; ctx.strokeStyle = s.c;
    ctx.globalAlpha = act ? 0.9 : 0.2; ctx.stroke(); ctx.globalAlpha = 1;
    arcs.push({ key: s.k, start, end }); start = end;
  });

  ctx.fillStyle = '#0ea5e9'; ctx.font = 'bold 15px sans-serif';
  ctx.textAlign = 'center'; ctx.fillText(tot, cx, cy + 4);
  ChartHit[id] = { cx, cy, innerR: r, outerR: R, arcs };
}

function hChartClk(e, id, ch) {
  const h = ChartHit[id]; if (!h) return;
  const r = e.target.getBoundingClientRect(),
    dx = (e.clientX - r.left) * (180 / r.width) - h.cx,
    dy = (e.clientY - r.top) * (180 / r.height) - h.cy,
    d = M.hypot(dx, dy);
  if (d < h.innerR || d > h.outerR) return;
  let a = M.atan2(dy, dx);
  if (a < -1.57) a += 6.28;
  const hit = h.arcs.find(s => a >= s.start && a <= s.end);
  if (hit) updFilt(ch, hit.key);
}

function togFilt(c, k) {
  const s = c.filters.grades, keys = Object.keys(s),
    actCnt = keys.reduce((n, x) => n + (s[x] ? 1 : 0), 0);
  if (actCnt === keys.length) {
    keys.forEach(x => s[x] = (x === k));
  } else if (actCnt === 1 && s[k]) {
    keys.forEach(x => s[x] = true);
  } else {
    s[k] = !s[k];
    if (!s[k] && actCnt === 1) s[k] = true;
  }
}

// ═══════════════════════════════════════════════════
//  UTILITAIRES FSRS pour stats/dashboard
// ═══════════════════════════════════════════════════

function getCardRetrievability(card) {
  if (!card.lastReviewed || !card.stability) return null;
  const elapsedDays = (Date.now() - card.lastReviewed) / 864e5;
  return fsrsRetrievability(elapsedDays, card.stability);
}

function getChapterAvgRetrievability(ch) {
  const reviewed = ch.cards.filter(c => c.lastReviewed && c.stability);
  if (!reviewed.length) return null;
  const sum = reviewed.reduce((s, c) => s + getCardRetrievability(c), 0);
  return M.round((sum / reviewed.length) * 100);
}
