/* --- SRS (Spaced Repetition System) & STATS CALCULATIONS --- */

function getStreak(c) {
  let streak = 0; const today = new Date();
  for(let i = 0; i < 365; i++) {
    const d = new Date(today); d.setDate(today.getDate() - i);
    if(c.stats.dailyReviews[dateKey(d)] > 0) streak++; else if(i) break;
  }
  return streak;
}

const getLive = c => { const o = GRADE_INIT(); c.cards.forEach(x => o[x.grade || 'unseen']++); return o; };
const syncG = c => c.stats.gradeCounts = getLive(c);
const getTod = c => c.stats.dailyReviews[todayKey()] || 0;
const getTodCh = c => c.stats.dailyChanges[todayKey()] || {changed:0, total:0};
const cntAv = c => c.cards.filter(x => c.filters.grades[x.grade || 'unseen']).length;

const getSucc = c => {
  const k = c.stats.gradeCounts, g = k.bien + k.facile, t = g + k.echec + k.difficile;
  return t ? M.round(g / t * 100) : 0;
};

const get7dAvgMs = c => {
  const b = new Date(); let s = 0, n = 0;
  for(let i = 0; i < 7; i++){
    const d = new Date(b); d.setDate(b.getDate() - i);
    const k = dateKey(d); s += (c.stats.dailyDurMs[k] || 0); n += (c.stats.dailyDurCount[k] || 0);
  }
  return n ? M.round(s / n) : 0;
};

const get7dAvg = c => {
  const b = new Date(), a = [];
  for(let i = 0; i < 7; i++){ const d = new Date(b); d.setDate(b.getDate() - i); a.push(c.stats.dailyReviews[dateKey(d)] || 0); }
  return M.round(avg(a));
};

const daysAgo = (n, i) => { const d = new Date(); d.setDate(d.getDate() - ((n - 1) - i)); return d; };
const getLastN = (c, n) => Array.from({length:n}, (_, i) => c.stats.dailyReviews[dateKey(daysAgo(n, i))] || 0);
const getLbls = n => Array.from({length:n}, (_, i) => ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'][daysAgo(n, i).getDay()]);
const dayKeyIdx = (n, i) => dateKey(daysAgo(n, i));

function schNx(c, g, now){
  const q = {'facile':5,'bien':4,'difficile':2,'echec':1}[g] || 0; 
  let ef = c.ef || 2.5; 
  ef = ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)); 
  if(ef < 1.3) ef = 1.3; 
  c.ef = ef;

  if(q < 3){
    c.intervalDays = (g === 'echec') ? 0.02 : 0.5;
    c.streak = (c.streak <= 0 ? c.streak - 1 : -1);
  } else {
    c.intervalDays = c.intervalDays < .001 ? 1 : c.intervalDays < 1.5 ? 6 : M.round(c.intervalDays * ef);
    c.streak = (c.streak >= 0 ? c.streak + 1 : 1);
  }
  c.streak = clamp(c.streak, -8, 12); 
  c.dueAt = now + c.intervalDays * 864e5;
}

function bldQ(c, pool, sz){
  const sh = a => { for(let i = a.length - 1; i > 0; i--){ const j = M.floor(M.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const nc = [], lc = [], dr = [], ot = [];
  pool.forEach(x => {
      const g = x.grade || 'unseen';
      if(g === 'unseen') nc.push(x); else if(g === 'echec' || g === 'difficile') lc.push(x); else if(x.dueAt <= Date.now()) dr.push(x); else ot.push(x);
  });
  return [...sh(lc), ...sh(dr), ...sh(nc), ...sh(ot)].slice(0, sz);
}

/* --- CHARTS --- */
const ChartHit = {};
function drawChart(id, k, sel){ 
  const el = D.getElementById(id); if(!el) return; 
  const ctx = el.getContext('2d'), w = 140, h = 140, cx = 70, cy = 70, R = 64, r = 40; 
  ctx.clearRect(0,0,w,h); 
  const segs = [{k:'unseen',c:'#9ca3af'},{k:'echec',c:'#ef4444'},{k:'difficile',c:'#f59e0b'},{k:'bien',c:'#3b82f6'},{k:'facile',c:'#22c55e'}];
  const tot = segs.reduce((s, x) => s + (k[x.k] || 0), 0); 
  const arcs = []; 
  
  if(!tot){
    ctx.beginPath(); ctx.arc(cx,cy,R,0,6.28); ctx.lineWidth = 24; ctx.strokeStyle = '#cbd5e1'; ctx.stroke(); 
    ChartHit[id] = {cx, cy, innerR: r, outerR: R, arcs: []}; return;
  } 
  
  let start = -1.57; 
  segs.forEach(s => {
    const v = k[s.k]; if(!v) return;
    const ang = (v / tot) * 6.28, end = start + ang, act = !sel || sel[s.k];
    ctx.beginPath(); ctx.arc(cx, cy, 52, start, end); ctx.lineWidth = 24; ctx.strokeStyle = s.c; ctx.globalAlpha = act ? 0.9 : 0.2; ctx.stroke(); ctx.globalAlpha = 1;
    arcs.push({key: s.k, start, end}); start = end;
  }); 
  
  ctx.fillStyle = '#0ea5e9'; ctx.font = 'bold 15px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(tot, cx, cy + 4); 
  ChartHit[id] = {cx, cy, innerR: r, outerR: R, arcs};
}

function hChartClk(e, id, ch){ 
  const h = ChartHit[id]; if(!h) return; 
  const r = e.target.getBoundingClientRect(), dx = (e.clientX - r.left) * (180 / r.width) - h.cx, dy = (e.clientY - r.top) * (180 / r.height) - h.cy, d = M.hypot(dx, dy); 
  if(d < h.innerR || d > h.outerR) return; 
  let a = M.atan2(dy, dx); if(a < -1.57) a += 6.28; 
  const hit = h.arcs.find(s => a >= s.start && a <= s.end); 
  if(hit) updFilt(ch, hit.key); 
}

function togFilt(c, k){ 
  const s = c.filters.grades, keys = Object.keys(s), actCnt = keys.reduce((n, x) => n + (s[x] ? 1 : 0), 0);
  if(actCnt === keys.length){ keys.forEach(x => s[x] = (x === k)); }
  else if(actCnt === 1 && s[k]){ keys.forEach(x => s[x] = !0); }
  else { s[k] = !s[k]; if(!s[k] && actCnt === 1) s[k] = !0; }
}