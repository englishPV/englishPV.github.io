/*10_insights.js — Insights : tableau de bord statistique global + navigateur de
  cartes multi-chapitres.
  · goStats()     : statistiques de TOUS les chapitres (sélecteurs matière /
                    chapitre / période), graphiques SVG, carte de chaleur,
                    prévisions FSRS, temps, médias, cartes difficiles…
  · goDayAll()    : détail d'une journée, tous chapitres confondus.
  · goAllCards()  : menu « Cartes » global avec sélecteurs et recherche.
  Aucune dépendance externe : SVG + DOM, tout est calculé localement.          */

/* ───────────────────────────── État persistant ─────────────────────────────── */
State.stats = State.stats || { subjectId:'', chapterId:'', period:30, tab:'overview' };
State.allCards = State.allCards || null;
const stNewBrowser = () => ({ subjectId:'', chapterId:'', grades:GRADE_FILTERS(), types:Object.fromEntries(MATH_TYPES.map(t => [t, true])), q:'', sort:'chapter' });

/* Empêche de quitter une révision en cours par inadvertance (barre latérale,
   sélecteurs de vue…) : les vues Insights demandent confirmation.            */
function stReviewBusy(){ return State.view === 'review' && State.review && !State.review.end; }
function stLeaveReviewGuard(){ return !stReviewBusy() || confirm('Quitter la révision en cours ?'); }

/* ─────────────────────────────── Utilitaires ──────────────────────────────── */
const stFmt = n => (n || 0).toLocaleString('fr-FR');
const stPct = (a, b) => b > 0 ? Math.round(a / b * 100) : 0;
const stKeys = n => Array.from({ length: n }, (_, i) => dateKey(daysAgo(n, i)));
const stDayLabel = k => fmtDayFR(k);
const stShortDay = k => { const [, m, d] = k.split('-'); return `${d}/${m}`; };
const stMonthLabel = k => ['janv.','févr.','mars','avr.','mai','juin','juil.','août','sept.','oct.','nov.','déc.'][+k.split('-')[1] - 1];

function stEv(e){ return (typeof e === 'string' ? e : '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }
function stPlain(html){ return String(html || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim(); }
function stTrunc(s, n = 90){ s = stPlain(s); return s.length > n ? s.slice(0, n - 1) + '…' : s; }

/* Images présentes dans une carte (fichiers statiques ou médias importés) */
const ST_IMG_RE = /\[IMAGE_ID:\s*([^\]]+?)\s*\]|<img[^>]+src=["']([^"']+)["']/gi;
function stCardImages(card){
  const raw = `${card.front || ''} ${card.back || ''}`, out = [];
  let m;
  ST_IMG_RE.lastIndex = 0;
  while((m = ST_IMG_RE.exec(raw))){ out.push(m[1] ? 'images/' + m[1].trim() : m[2]); }
  return out;
}

/* Sélection courante : liste de {sub, ch} selon les sélecteurs */
function stScope(){
  const st = State.stats;
  const out = [];
  (data.subjects || []).forEach(s => {
    if(st.subjectId && s.id !== st.subjectId) return;
    (s.chapters || []).forEach(ch => {
      if(st.chapterId && ch.id !== st.chapterId) return;
      out.push({ sub:s, ch });
    });
  });
  if(out.length) return out;
  (data.subjects || []).forEach(s => (s.chapters || []).forEach(ch => out.push({ sub:s, ch })));
  return out;
}
const stScopeLabel = () => {
  const st = State.stats;
  if(st.chapterId){
    for(const s of (data.subjects || [])){
      const c = (s.chapters || []).find(x => x.id === st.chapterId);
      if(c) return c.title;
    }
  }
  if(st.subjectId){ const s = data.subjects.find(x => x.id === st.subjectId); return s ? s.title : 'Matière'; }
  return 'Toutes les matières';
};

/* ───────────────────────────── Agrégations ────────────────────────────────── */
function stAggregate(chs, days){
  const daySet = new Set(days);
  const a = {
    cards:0, unseen:0, seen:0, due:0,
    reviews:0, durMs:0, durN:0, ok:0, ko:0, changed:0, changes:0,
    byGrade: GRADE_INIT(), perDay:{}, byHour: new Array(24).fill(0),
    retSum:0, retN:0, chapters:chs.length, activeDays:0, best:{ key:null, n:0 }
  };
  days.forEach(d => a.perDay[d] = 0);

  chs.forEach(({ ch }) => {
    a.cards += ch.cards.length;
    const k = ch.stats.gradeCounts || getLive(ch);
    GRADES.forEach(g => a.byGrade[g] += (k[g] || 0));

    ch.cards.forEach(c => {
      const g = c.grade || 'unseen';
      if(g === 'unseen'){ a.unseen++; return; }
      a.seen++;
      if((c.dueAt || 0) <= Date.now()) a.due++;
      if(c.lastReviewed && c.stability) { a.retSum += fsrsRetrievability((Date.now() - c.lastReviewed) / 864e5, c.stability); a.retN++; }
    });

    const st = ch.stats;
    Object.keys(st.dailyReviews || {}).forEach(d => { if(daySet.has(d)) a.perDay[d] += st.dailyReviews[d] || 0; });
    days.forEach(d => {
      a.durMs += st.dailyDurMs?.[d] || 0;
      a.durN += st.dailyDurCount?.[d] || 0;
      const c = st.dailyChanges?.[d];
      if(c){ a.changed += c.changed || 0; a.changes += c.total || 0; }
      (st.dailyLog?.[d] || []).forEach(e => {
        if(isSucc(e.next)) a.ok++; else a.ko++;
        const h = new Date(e.ts).getHours();
        if(h >= 0 && h < 24) a.byHour[h]++;
      });
    });
  });

  days.forEach(d => {
    a.reviews += a.perDay[d];
    if(a.perDay[d] > 0) a.activeDays++;
    if(a.perDay[d] > a.best.n) a.best = { key:d, n:a.perDay[d] };
  });
  a.avgMs = a.durN ? a.durMs / a.durN : 0;
  a.retention = a.retN ? a.retSum / a.retN : null;
  return a;
}

function stForecast(chs, n = 14){
  const base = new Date(); base.setHours(0, 0, 0, 0);
  const out = [];
  for(let i = 0; i < n; i++){ const d = new Date(base); d.setDate(base.getDate() + i); out.push({ key:dateKey(d), n:0, label: i === 0 ? "Auj." : (i === 1 ? 'Dem.' : stShortDay(dateKey(d))) }); }
  chs.forEach(({ ch }) => ch.cards.forEach(c => {
    if((c.grade || 'unseen') === 'unseen' || !c.dueAt) return;
    const d = new Date(c.dueAt); d.setHours(0, 0, 0, 0);
    const diff = Math.round((d - base) / 864e5);
    if(diff < 0) out[0].n++;
    else if(diff < n) out[diff].n++;
  }));
  return out;
}

function stChapterStats(chs, days){
  return chs.map(({ sub, ch }) => {
    const k = ch.stats.gradeCounts || getLive(ch);
    const total = ch.cards.length || 1;
    let ok = 0, ko = 0, rev = 0, dur = 0, durN = 0;
    days.forEach(d => {
      rev += ch.stats.dailyReviews?.[d] || 0;
      dur += ch.stats.dailyDurMs?.[d] || 0;
      durN += ch.stats.dailyDurCount?.[d] || 0;
      (ch.stats.dailyLog?.[d] || []).forEach(e => isSucc(e.next) ? ok++ : ko++);
    });
    const due = ch.cards.filter(c => { const g = c.grade || 'unseen'; return g !== 'unseen' && (c.dueAt || 0) <= Date.now(); }).length;
    let last = null;
    Object.keys(ch.stats.dailyReviews || {}).forEach(d => { if((ch.stats.dailyReviews[d] || 0) > 0 && (!last || d > last)) last = d; });
    return { sub, ch, k, total, seen: total - k.unseen, due, rev, dur, avgMs: durN ? dur / durN : 0,
             succ: (ok + ko) ? stPct(ok, ok + ko) : null, ret: getChapterAvgRetrievability(ch), last };
  }).sort((a, b) => b.rev - a.rev || b.due - a.due || a.ch.title.localeCompare(b.ch.title));
}

/* ───────────────────────────── Composants SVG/DOM ─────────────────────────── */
const ST_COLORS = { unseen:'#9ca3af', echec:'#ef4444', difficile:'#f59e0b', bien:'#3b82f6', facile:'#22c55e' };
const ST_LABELS = { unseen:'Non vues', echec:'Échec', difficile:'Difficile', bien:'Bien', facile:'Facile' };

function stDonut(segments, totalLabel, opts = {}){
  const R = 54, C = 2 * Math.PI * R;
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  let acc = 0;
  const arcs = segments.filter(s => s.value > 0).map(s => {
    const len = s.value / total * C, off = -acc / total * C;
    acc += s.value;
    return `<circle class="dn-seg" cx="60" cy="60" r="${R}" fill="none" stroke="${s.color}" stroke-width="17"
      stroke-dasharray="${len.toFixed(2)} ${(C - len).toFixed(2)}" stroke-dashoffset="${off.toFixed(2)}"
      transform="rotate(-90 60 60)" ${s.key ? `data-dn="${s.key}"` : ''}>
      <title>${stEv(s.label)} : ${stFmt(s.value)} (${stPct(s.value, total)} %)</title></circle>`;
  }).join('');
  return `<div class="dn-wrap ${opts.compact ? 'is-compact' : ''}">
    <svg class="dn" viewBox="0 0 120 120" role="img" aria-label="${stEv(opts.aria || 'Répartition')}">
      <circle cx="60" cy="60" r="${R}" fill="none" stroke="var(--surface-3)" stroke-width="17"/>
      ${arcs}
      <text x="60" y="57" class="dn-val">${totalLabel ?? stFmt(total)}</text>
      <text x="60" y="72" class="dn-cap">${stEv(opts.caption || 'cartes')}</text>
    </svg>
    ${opts.legend === false ? '' : `<div class="dn-legend">${segments.map(s => `<div class="dn-legend__row ${s.value ? '' : 'is-empty'}" ${s.key ? `data-dn="${s.key}"` : ''}>
      <span class="dot" style="background:${s.color}"></span>
      <span class="dn-legend__lbl">${stEv(s.label)}</span>
      <b>${stFmt(s.value)}</b><i>${stPct(s.value, total)} %</i></div>`).join('')}</div>`}
  </div>`;
}

function stBars(items, opts = {}){
  const max = Math.max(1, ...items.map(x => x.n));
  const dense = items.length > 45 ? ' is-dense' : '';
  return `<div class="st-bars ${opts.className || ''}${dense}" style="--cols:${items.length}">
    ${items.map(x => `<div class="st-bar" ${x.key ? `data-day="${x.key}"` : ''} title="${stEv(x.title || ((x.label || '') + ' · ' + x.n))}">
      <span class="st-bar__n">${x.n || ''}</span>
      <span class="st-bar__track">${x.n ? `<i style="height:${Math.round(x.n / max * 100)}%"></i>` : ''}</span>
      <span class="st-bar__lbl">${stEv(x.label || '')}</span>
    </div>`).join('')}
  </div>`;
}

function stProgressStack(k, total){
  return `<div class="st-stack">${GRADES.map(g => k[g] ? `<i style="flex:${k[g]};background:${ST_COLORS[g]}" title="${ST_LABELS[g]} : ${k[g]}"></i>` : '').join('')}
    <span class="st-stack__void" style="flex:${Math.max(0, total - GRADES.reduce((n, g) => n + (k[g] || 0), 0))}"></span></div>`;
}

function stKpi(label, value, sub = '', cls = ''){
  return `<div class="stat-card ${cls}"><div class="stat-val">${value}</div><div class="stat-lbl">${stEv(label)}</div>${sub ? `<div class="stat-sub">${sub}</div>` : ''}</div>`;
}

/* ─────────────────────────────── Vue STATISTIQUES ─────────────────────────── */
function goStats(push = true, patch = null){
  if(!stLeaveReviewGuard()) return;
  safeCloseLB(); Media.revokeAll();
  exitDrive();
  if(patch) Object.assign(State.stats, patch);
  const st = State.stats;
  const fromChapter = State.view === 'chapter';
  if(!st._init){
    st._init = true;
    if(fromChapter && State.chapterId){
      /* première ouverture depuis un chapitre : on cadre dessus */
      const owner = data.subjects.find(s => s.chapters.some(c => c.id === State.chapterId));
      if(owner){ st.subjectId = owner.id; st.chapterId = State.chapterId; }
    }
  }
  if(push) Nav.push();
  State.view = 'stats';
  setTop({ title:'Statistiques · ' + stScopeLabel() });
  setBot({ actions:!1, revision:!1 }); hideRevAct();
  const v = $('#view');
  v.classList.remove('drive-open');

  const chs = stScope();
  const days = stKeys(st.period);
  const agg = stAggregate(chs, days);
  const periods = [{ k:7, l:'7 j' }, { k:30, l:'30 j' }, { k:90, l:'90 j' }, { k:365, l:'1 an' }];
  const tabs = [
    { k:'overview', l:'Vue d\'ensemble', i:'chart' },
    { k:'chapters', l:'Chapitres', i:'layers' },
    { k:'cards', l:'Cartes', i:'grid' },
    { k:'media', l:'Médias', i:'image' }
  ];
  const subjOptions = `<option value="">Toutes les matières</option>` + data.subjects.map(s =>
    `<option value="${s.id}" ${st.subjectId === s.id ? 'selected' : ''}>${stEv((s.emoji ? s.emoji + ' ' : '') + s.title)}</option>`).join('');
  const chapList = st.subjectId ? (data.subjects.find(s => s.id === st.subjectId)?.chapters || []) : data.subjects.flatMap(s => (s.chapters || []).map(c => ({ ...c, _sub:s.title })));
  const chapOptions = `<option value="">Tous les chapitres</option>` + chapList.map(c =>
    `<option value="${c.id}" ${st.chapterId === c.id ? 'selected' : ''}>${stEv((c.emoji || getEmoji(c.title) || '') + ' ' + c.title)}</option>`).join('');

  v.innerHTML = `
    <div class="settings-page scroll-y st-page">
      <div class="st-hero">
        <div>
          <h1>Statistiques</h1>
          <p>${stEv(stScopeLabel())} · ${agg.cards} cartes · ${agg.chapters} chapitre${agg.chapters > 1 ? 's' : ''}</p>
        </div>
        <button type="button" class="btn btn--outline btn--sm" id="stExport" title="Exporter les statistiques par chapitre (CSV)">${ico('download', 'ico--sm')}<span>CSV</span></button>
      </div>

      <div class="st-controls">
        <select class="input st-select" id="stSubject" aria-label="Matière">${subjOptions}</select>
        <select class="input st-select" id="stChapter" aria-label="Chapitre">${chapOptions}</select>
      </div>
      <div class="seg seg--period" id="stPeriod">
        ${periods.map(p => `<button type="button" class="seg__btn ${st.period === p.k ? 'is-active' : ''}" data-period="${p.k}"><span>${p.l}</span></button>`).join('')}
      </div>
      <div class="seg" id="stTabs">
        ${tabs.map(t => `<button type="button" class="seg__btn ${st.tab === t.k ? 'is-active' : ''}" data-tab="${t.k}">${ico(t.i, 'ico--xs')}<span>${t.l}</span></button>`).join('')}
      </div>
      <div id="stBody"></div>
    </div>`;

  /* ── sélecteurs ── */
  $('#stSubject').onchange = e => goStats(false, { subjectId:e.target.value, chapterId:'' });
  const chSel = $('#stChapter');
  chSel.onchange = e => goStats(false, { chapterId:e.target.value });
  $('#stPeriod').addEventListener('click', e => {
    const b = e.target.closest('[data-period]'); if(!b) return;
    goStats(false, { period:+b.dataset.period });
  });
  $('#stExport').onclick = () => stExportCsv(chs, days, agg);
  $('#stTabs').addEventListener('click', e => {
    const b = e.target.closest('[data-tab]'); if(!b || b.dataset.tab === st.tab) return;
    goStats(false, { tab:b.dataset.tab });
    const p = $('.st-page'); if(p) p.scrollTop = 0;
  });

  const body = $('#stBody');
  body.innerHTML = st.tab === 'chapters' ? stPanelChapters(chs, days, agg)
                : st.tab === 'cards'    ? stPanelCards(chs, days, agg)
                : st.tab === 'media'    ? stPanelMedia(chs, agg)
                : stPanelOverview(chs, days, agg);
  stBind(body, chs, days, agg);
  tsLat(body);
}

/* Export CSV : une ligne par chapitre (ouvrable dans un tableur) */
function stExportCsv(chs, days, agg){
  const rows = stChapterStats(chs, days);
  const head = ['matiere','chapitre','cartes','vues','non_vues','dues','revisions_periode','reussite_pct','retention_pct','temps_total_s','temps_moyen_s','derniere_revision'];
  const cell = v => {
    const x = v == null ? '' : String(v);
    return /[;"\n]/.test(x) ? '"' + x.replace(/"/g, '""') + '"' : x;
  };
  const csv = [head.join(';')].concat(rows.map(r => [
    r.sub.title, r.ch.title, r.total, r.seen, r.total - r.seen, r.due, r.rev,
    r.succ, r.ret, (r.dur / 1000).toFixed(1), (r.avgMs / 1000).toFixed(1), r.last || ''
  ].map(cell).join(';'))).join('\n');
  const a = D.createElement('a');
  a.href = URL.createObjectURL(new Blob(['\ufeff' + csv], { type:'text/csv;charset=utf-8' }));
  a.download = `statistiques-flashcards-${dateKey(new Date())}.csv`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  toast('Export CSV généré', 'success');
}

/* ── Panneau : vue d'ensemble ───────────────────────────────────────────────── */
function stPanelOverview(chs, days, agg){
  const st = State.stats;
  const fc = stForecast(chs, 14);
  const fcItems = fc.map((x, i) => ({
    ...x,
    label: i < 2 ? x.label : (i % 2 === 0 ? x.label : ''),
    title: `${stDayLabel(x.key)} · ${x.n} carte${x.n > 1 ? 's' : ''} à revoir`
  }));
  const heat = stHeatmap(chs, st.period >= 365 ? 26 : (st.period >= 90 ? 26 : 18));
  const today = todayKey();
  const todayN = agg.perDay[today] || 0;
  const goal = data.app.prefs.dailyGoal || 20;
  const goalPct = Math.min(100, stPct(todayN, goal));
  const realStreak = stStreak(chs);
  const dur = agg.durMs;
  const nextWeek = fc.slice(0, 7).reduce((n, x) => n + x.n, 0);
  const seenPct = stPct(agg.seen, agg.cards);

  const seg = GRADES.map(g => ({ key:g, label:ST_LABELS[g], value:agg.byGrade[g] || 0, color:ST_COLORS[g] }));
  /* Un libellé tous les « step » jours : lisible même sur téléphone */
  const labelStep = Math.max(1, Math.ceil(days.length / 8));
  const dayItems = days.map((k, i) => ({
    key:k, n:agg.perDay[k] || 0,
    label: (i % labelStep === 0 || i === days.length - 1) ? stShortDay(k) : '',
    title: `${stDayLabel(k)} · ${agg.perDay[k] || 0} révision${(agg.perDay[k] || 0) > 1 ? 's' : ''}`
  }));

  return `
    <div class="section-title">Aujourd'hui</div>
    <div class="st-goal">
      <div class="st-goal__top"><b>${todayN}</b> / ${goal} cartes révisées
        <span class="st-goal__pct">${goalPct} %</span></div>
      <div class="st-goal__bar"><i style="width:${goalPct}%"></i></div>
      <div class="st-goal__meta">${agg.due} carte${agg.due > 1 ? 's' : ''} à revoir · ${agg.unseen} non vue${agg.unseen > 1 ? 's' : ''} · série ${realStreak} j</div>
    </div>

    <div class="section-title mt8">Chiffres clés</div>
    <div class="stats-grid st-kpis">
      ${stKpi('Cartes totales', stFmt(agg.cards), `${seenPct} % déjà vues`)}
      ${stKpi('À réviser', stFmt(agg.due + agg.unseen), `${stFmt(agg.due)} dues · ${stFmt(agg.unseen)} neuves`)}
      ${stKpi('Révisions (période)', stFmt(agg.reviews), `${agg.activeDays} jour${agg.activeDays > 1 ? 's' : ''} actif${agg.activeDays > 1 ? 's' : ''}`)}
      ${stKpi('Taux de réussite', agg.ok + agg.ko ? stPct(agg.ok, agg.ok + agg.ko) + ' %' : '—', `${stFmt(agg.ok)} réussies · ${stFmt(agg.ko)} échouées`)}
      ${stKpi('Temps de révision', dur ? fmtDur(dur) : '—', agg.avgMs ? `${(agg.avgMs / 1000).toFixed(1)} s / carte` : '')}
      ${stKpi('Rétention moyenne', agg.retention == null ? '—' : Math.round(agg.retention * 100) + ' %', 'FSRS · probabilité de rappel')}
      ${stKpi('Charge 7 jours', stFmt(nextWeek), 'cartes programmées')}
      ${stKpi('Meilleur jour', agg.best.key ? stShortDay(agg.best.key) : '—', agg.best.n ? stFmt(agg.best.n) + ' révisions' : '')}
    </div>

    <div class="section-title mt8">Répartition par niveau</div>
    <div class="st-card">${stDonut(seg, stFmt(agg.cards), { caption:'cartes', aria:'Répartition des cartes par niveau' })}
      <div class="st-note">Clique un niveau pour filtrer les cartes correspondantes.</div></div>

    <div class="section-title mt8">Activité quotidienne</div>
    <div class="st-card">${stBars(dayItems, { className:'st-bars--daily' })}
      <div class="st-note">${stFmt(agg.reviews)} révisions sur ${days.length} jours · moyenne ${(agg.reviews / Math.max(1, days.length)).toFixed(1)} / jour</div></div>

    <div class="section-title mt8">Régularité (${heat.weeks} semaines)</div>
    <div class="st-card">
      <div class="hm-wrap scroll-x"><div class="hm">${heat.cells}</div></div>
      <div class="hm-legend"><span>Moins</span>${[0,1,2,3,4].map(l => `<i class="hm-cell lvl-${l}"></i>`).join('')}<span>Plus</span></div>
      <div class="st-note">${heat.active} jour${heat.active > 1 ? 's' : ''} avec révision · total ${stFmt(heat.total)} cartes</div>
    </div>

    <div class="section-title mt8">Prévisions (14 jours)</div>
    <div class="st-card">${stBars(fcItems, { className:'st-bars--forecast' })}
      <div class="st-note">Cartes dont l'échéance FSRS tombe ces prochains jours. Aujourd'hui inclus : les cartes en retard.</div></div>

    <div class="section-title mt8">Rythme horaire (période)</div>
    <div class="st-card">${stBars(agg.byHour.map((n, h) => ({ n, label: h % 3 === 0 ? String(h).padStart(2, '0') + 'h' : '', title:`${String(h).padStart(2, '0')} h · ${n} révisions` })), { className:'st-bars--hours' })}
      <div class="st-note">Heures auxquelles tu révises — utile pour caler le rappel quotidien.</div></div>`;
}

function stStreak(chs){
  let n = 0;
  for(let i = 0; i < 400; i++){
    const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - i);
    const k = dateKey(d);
    const tot = chs.reduce((s, { ch }) => s + (ch.stats.dailyReviews?.[k] || 0), 0);
    if(tot > 0) n++;
    else if(i > 0) break;
  }
  return n;
}

/* ── Carte de chaleur ──────────────────────────────────────────────────────── */
function stHeatmap(chs, weeks = 26){
  const total = weeks * 7;
  const start = new Date(); start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - (total - 1));
  start.setDate(start.getDate() - start.getDay());         // aligné sur dimanche
  const today = new Date(); today.setHours(0, 0, 0, 0);

  /* Fenêtre exacte affichée : dimanche → aujourd'hui */
  const keys = [];
  const cur = new Date(start);
  while(cur <= today){ keys.push(dateKey(cur)); cur.setDate(cur.getDate() + 1); }
  const inWindow = new Set(keys);

  const per = {};
  let max = 0, sum = 0;
  chs.forEach(({ ch }) => {
    Object.keys(ch.stats.dailyReviews || {}).forEach(k => {
      const n = ch.stats.dailyReviews[k] || 0;
      if(!n || !inWindow.has(k)) return;
      per[k] = (per[k] || 0) + n;
      sum += n;
      if(per[k] > max) max = per[k];
    });
  });

  let active = 0;
  const cells = keys.map(k => {
    const n = per[k] || 0;
    if(n) active++;
    const lvl = n === 0 ? 0 : Math.min(4, Math.ceil(n / Math.max(1, max) * 4));
    return `<button type="button" class="hm-cell lvl-${lvl}" data-day="${k}" title="${stEv(stDayLabel(k))} · ${n} révision${n > 1 ? 's' : ''}" aria-label="${n} révisions"></button>`;
  }).join('');
  return { cells, active, total:sum, max, weeks };
}

/* ── Panneau : chapitres ───────────────────────────────────────────────────── */
function stPanelChapters(chs, days, agg){
  const rows = stChapterStats(chs, days);
  const bySub = {};
  chs.forEach(({ sub, ch }) => {
    const b = bySub[sub.id] = bySub[sub.id] || { sub, cards:0, seen:0, due:0, rev:0, ok:0, ko:0, dur:0, durN:0 };
    const k = ch.stats.gradeCounts || getLive(ch);
    b.cards += ch.cards.length; b.seen += ch.cards.length - k.unseen;
    b.due += ch.cards.filter(c => { const g = c.grade || 'unseen'; return g !== 'unseen' && (c.dueAt || 0) <= Date.now(); }).length;
    days.forEach(d => {
      b.rev += ch.stats.dailyReviews?.[d] || 0;
      b.dur += ch.stats.dailyDurMs?.[d] || 0; b.durN += ch.stats.dailyDurCount?.[d] || 0;
      (ch.stats.dailyLog?.[d] || []).forEach(e => isSucc(e.next) ? b.ok++ : b.ko++);
    });
  });
  const subRows = Object.values(bySub).sort((a, b) => b.rev - a.rev || b.cards - a.cards);

  const types = (() => {
    const t = {}; MATH_TYPES.forEach(x => t[x] = { type:x, n:0, seen:0, ok:0, ko:0 });
    chs.forEach(({ ch }) => ch.cards.forEach(c => {
      if(!c.cardType || !t[c.cardType]) return;
      const o = t[c.cardType]; o.n++;
      if((c.grade || 'unseen') !== 'unseen') o.seen++;
      o.ok += c.successes || 0; o.ko += c.failures || 0;
    }));
    return Object.values(t).filter(x => x.n > 0);
  })();

  return `
    <div class="section-title">Progression par chapitre (${rows.length})</div>
    <div class="st-card st-card--list">
      ${rows.map(r => `<button type="button" class="st-row" data-chap="${r.ch.id}">
        <span class="st-row__emoji">${stEv(r.ch.emoji || getEmoji(r.ch.title) || '📄')}</span>
        <span class="st-row__main">
          <span class="st-row__title">${stEv(r.ch.title)}</span>
          <span class="st-row__meta">${stEv(r.sub.title)} · ${r.seen}/${r.total} vues · ${r.due} à revoir${r.rev ? ` · ${r.rev} révisions` : ''}${r.avgMs ? ` · ${(r.avgMs / 1000).toFixed(1)} s/carte` : ''}</span>
          ${stProgressStack(r.k, r.total)}
        </span>
        <span class="st-row__side">
          <b>${r.succ == null ? '—' : r.succ + ' %'}</b>
          <i>${r.ret == null ? '' : 'rét. ' + r.ret + ' %'}</i>
          <i>${r.rev ? fmtDur(r.dur) : ''}</i>
        </span>
      </button>`).join('') || `<div class="empty"><div class="empty__title">Aucun chapitre</div></div>`}
    </div>

    ${subRows.length > 1 ? `<div class="section-title mt8">Comparaison des matières</div>
    <div class="st-card st-card--list">
      ${subRows.map(b => `<div class="st-row st-row--static">
        <span class="st-row__emoji">${stEv(b.sub.emoji || '📚')}</span>
        <span class="st-row__main">
          <span class="st-row__title">${stEv(b.sub.title)}</span>
          <span class="st-row__meta">${b.cards} cartes · ${stPct(b.seen, b.cards)} % vues · ${b.due} à revoir · ${b.rev} révisions</span>
        </span>
        <span class="st-row__side"><b>${b.ok + b.ko ? stPct(b.ok, b.ok + b.ko) + ' %' : '—'}</b><i>${b.dur ? fmtDur(b.dur) : ''}</i>${b.durN ? `<i>${(b.dur / b.durN / 1000).toFixed(1)} s</i>` : ''}</span>
      </div>`).join('')}
    </div>` : ''}

    ${types.length ? `<div class="section-title mt8">Types de cartes (maths)</div>
    <div class="stats-grid st-kpis">
      ${types.map(t => stKpi(TYPE_LABELS[t.type] || t.type, stFmt(t.n), `${t.seen} vues · ${t.ok + t.ko ? stPct(t.ok, t.ok + t.ko) + ' % de réussite' : 'jamais révisées'}`)).join('')}
    </div>` : ''}`;
}

/* ── Panneau : cartes ─────────────────────────────────────────────────────── */
function stPanelCards(chs, days, agg){
  const hard = [];
  const soon = [];
  const recent = [];
  const now = Date.now();
  chs.forEach(({ sub, ch }) => ch.cards.forEach(c => {
    const g = c.grade || 'unseen';
    if((c.failures || 0) > 0 || g === 'echec')
      hard.push({ ch, sub, c, score:(c.failures || 0) * 2 - (c.successes || 0) + (g === 'echec' ? 3 : 0) });
    if(g !== 'unseen' && c.dueAt && c.dueAt <= now + 864e5)
      soon.push({ ch, sub, c, due:c.dueAt });
    if(c.lastReviewed) recent.push({ ch, sub, c });
  }));
  hard.sort((a, b) => b.score - a.score || (a.c.stability || 0) - (b.c.stability || 0));
  soon.sort((a, b) => a.due - b.due);
  recent.sort((a, b) => b.c.lastReviewed - a.c.lastReviewed);

  const row = (it, extra) => `<button type="button" class="st-row" data-single="${it.ch.id}|${it.c.id}">
    <span class="st-row__emoji">${stEv(it.ch.emoji || getEmoji(it.ch.title) || '📄')}</span>
    <span class="st-row__main">
      <span class="st-row__title">${stEv(stTrunc(it.c.front, 110))}</span>
      <span class="st-row__meta">${stEv(it.ch.title)}${extra ? ' · ' + extra : ''}</span>
    </span>
    <span class="st-row__side"><span class="grade-tag ${it.c.grade || 'unseen'}">${it.c.grade || 'unseen'}</span></span>
  </button>`;

  const gradeByChap = stChapterStats(chs, days);

  return `
    <div class="section-title">Cartes les plus difficiles</div>
    <div class="st-card st-card--list">
      ${hard.slice(0, 12).map(it => row(it, `${it.c.failures || 0} échec${(it.c.failures || 0) > 1 ? 's' : ''} · ${it.c.successes || 0} réussite${(it.c.successes || 0) > 1 ? 's' : ''}`)).join('')
        || `<div class="empty"><div class="empty__title">Aucune carte en difficulté</div><div class="empty__sub">Toutes les cartes révisées sont au vert.</div></div>`}
    </div>

    <div class="section-title mt8">À revoir dans les prochaines 24 h (${soon.length})</div>
    <div class="st-card st-card--list">
      ${soon.slice(0, 12).map(it => row(it, `échéance ${stShortDay(dateKey(new Date(it.due)))}`)).join('')
        || `<div class="empty"><div class="empty__title">Rien d'urgent</div><div class="empty__sub">Aucune carte programmée dans les 24 prochaines heures.</div></div>`}
    </div>

    <div class="section-title mt8">Dernières révisions</div>
    <div class="st-card st-card--list">
      ${recent.slice(0, 12).map(it => row(it, `il y a ${stAgo(now - it.c.lastReviewed)}${it.c.lastMs ? ' · ' + (it.c.lastMs / 1000).toFixed(1) + ' s' : ''}`)).join('')
        || `<div class="empty"><div class="empty__title">Pas encore de révision</div></div>`}
    </div>

    <div class="section-title mt8">Charge par chapitre (période)</div>
    <div class="st-card st-card--list">
      ${gradeByChap.slice(0, 15).map(r => `<div class="st-row st-row--static">
        <span class="st-row__emoji">${stEv(r.ch.emoji || getEmoji(r.ch.title) || '📄')}</span>
        <span class="st-row__main"><span class="st-row__title">${stEv(r.ch.title)}</span>
        <span class="st-row__meta">${r.rev} révisions · ${r.due} à revoir · ${r.succ == null ? 'pas de données' : r.succ + ' % de réussite'}</span></span>
        <span class="st-row__side"><b>${r.total}</b><i>cartes</i></span>
      </div>`).join('')}
    </div>`;
}

function stAgo(ms){
  const s = Math.max(0, Math.round(ms / 1000));
  if(s < 60) return s + ' s';
  if(s < 3600) return Math.round(s / 60) + ' min';
  if(s < 86400) return Math.round(s / 3600) + ' h';
  return Math.round(s / 86400) + ' j';
}

/* ── Panneau : médias ─────────────────────────────────────────────────────── */
function stPanelMedia(chs, agg){
  const imgs = new Map();
  let cardsWithImg = 0;
  chs.forEach(({ sub, ch }) => ch.cards.forEach(c => {
    const list = stCardImages(c);
    if(!list.length) return;
    cardsWithImg++;
    list.forEach(u => {
      const key = u.replace(/[?&]v=\d+/, '');
      if(!imgs.has(key)) imgs.set(key, { url:key, cards:0, chap:ch, sub });
      imgs.get(key).cards++;
    });
  }));
  const arr = [...imgs.values()];
  const media = Media.stats();
  const idx = data.mediaIndex || {};
  const biggest = Object.entries(idx).map(([k, v]) => ({ k, ...v })).sort((a, b) => (b.size || 0) - (a.size || 0)).slice(0, 8);

  return `
    <div class="section-title">Schémas dans les cartes</div>
    <div class="stats-grid st-kpis">
      ${stKpi('Cartes illustrées', stFmt(cardsWithImg), `${stPct(cardsWithImg, agg.cards)} % du périmètre`)}
      ${stKpi('Images distinctes', stFmt(arr.length), arr.length ? 'fichiers référencés' : 'aucune image')}
      ${stKpi('Médias importés', stFmt(media.count), media.count ? fmtBytes(media.size) + ' stockés' : 'bibliothèque vide')}
      ${stKpi('Chapitres illustrés', stFmt(new Set(arr.map(x => x.chap.id)).size), 'avec au moins une image')}
    </div>

    ${arr.length ? `<div class="section-title mt8">Galerie (${Math.min(arr.length, 60)} affichées)</div>
      <div class="st-card"><div class="st-gallery" id="stGallery">
        ${arr.slice(0, 60).map(x => `<figure class="st-thumb" data-full="${stEv(x.url)}" title="${stEv(x.url)} — ${x.cards} carte(s)">
          <img src="${stEv(x.url)}" alt="" loading="lazy" decoding="async">
          <figcaption>${x.cards} carte${x.cards > 1 ? 's' : ''}</figcaption></figure>`).join('')}
      </div><div class="st-note">Clique une vignette pour l'ouvrir en grand (zoom, balayage).</div></div>` : ''}

    ${media.count ? `<div class="section-title mt8">Bibliothèque média (IndexedDB)</div>
    <div class="st-card st-card--list">
      <div class="st-row st-row--static"><span class="st-row__main"><span class="st-row__title">Poids total</span>
        <span class="st-row__meta">${media.count} fichier${media.count > 1 ? 's' : ''} importé${media.count > 1 ? 's' : ''} (Anki / cartes)</span></span>
        <span class="st-row__side"><b>${fmtBytes(media.size)}</b></span></div>
      ${biggest.map(b => `<div class="st-row st-row--static"><span class="st-row__emoji">${imgOrDoc(b.type)}</span>
        <span class="st-row__main"><span class="st-row__title">${stEv(b.name || b.k)}</span>
        <span class="st-row__meta">${stEv(String(b.type || '—').replace('image/', 'image ').replace('application/', ''))}</span></span>
        <span class="st-row__side"><b>${fmtBytes(b.size)}</b></span></div>`).join('')}
    </div>
    <div class="set-actions"><button type="button" class="btn btn--outline btn--sm" id="stWipeMedia">${ico('trash', 'ico--sm')}<span>Effacer les médias importés</span></button></div>` : ''}

    <div class="section-title mt8">Stockage de l'appareil</div>
    <div class="st-card">
      <div class="st-storage" id="stStorage"><div class="st-storage__bar"><i></i></div>
      <div class="st-storage__lbl">Calcul…</div></div>
      <div class="st-note">Estimation fournie par le navigateur (données locales + médias).</div>
    </div>`;
}
const imgOrDoc = t => String(t || '').startsWith('image/') ? '🖼️' : '📄';

/* ─────────────────────────── Liaisons de la vue ──────────────────────────── */
function stBind(body, chs, days, agg){
  /* donut → filtre les cartes de la période par niveau */
  body.querySelectorAll('[data-dn]').forEach(el => el.onclick = () => {
    goAllCards(true, null, { grades:Object.fromEntries(GRADES.map(g => [g, g === el.dataset.dn])) });
  });
  /* barres jour / heatmap → détail du jour */
  body.querySelectorAll('[data-day]').forEach(el => el.onclick = () => goDayAll(el.dataset.day));
  /* lignes chapitre → chapitre */
  body.querySelectorAll('[data-chap]').forEach(el => el.onclick = () => {
    const sub = data.subjects.find(s => s.chapters.some(c => c.id === el.dataset.chap));
    if(sub && sub.id !== data.app.currentSubjectId) setSub(sub.id);
    goChapter(el.dataset.chap);
  });
  /* lignes carte → révision rapide de la carte */
  body.querySelectorAll('[data-single]').forEach(el => el.onclick = () => {
    const [cid, cardId] = el.dataset.single.split('|');
    const sub = data.subjects.find(s => s.chapters.some(c => c.id === cid));
    if(sub && sub.id !== data.app.currentSubjectId) setSub(sub.id);
    stQuickReview(cid, cardId, 'stats');
  });
  /* galerie → lightbox */
  const gal = $('#stGallery');
  if(gal){
    gal.querySelectorAll('.st-thumb img').forEach(img => img.onclick = () => { try { openLB(img, gal); } catch (e) { W.open(img.src, '_blank'); } });
    Media.resolve(gal);
  }
  const wipe = $('#stWipeMedia');
  if(wipe) wipe.onclick = async () => {
    if(!confirm('Effacer tous les médias importés ?')) return;
    await Media.clearAll();
    toast('Médias effacés', 'success');
    goStats(false);
  };
  /* stockage http */
  const storageEl = $('#stStorage');
  if(storageEl && navigator.storage?.estimate){
    navigator.storage.estimate().then(({ usage, quota }) => {
      const pct = quota ? usage / quota * 100 : 0;
      storageEl.innerHTML = `<div class="st-storage__bar"><i style="width:${pct.toFixed(1)}%"></i></div>
        <div class="st-storage__lbl"><b>${fmtBytes(usage)}</b> utilisés sur ${fmtBytes(quota)} <span>(${pct.toFixed(1)} %)</span></div>`;
    }).catch(() => { storageEl.innerHTML = `<div class="st-storage__lbl">Estimation indisponible sur cet appareil.</div>`; });
  } else if(storageEl){
    storageEl.innerHTML = `<div class="st-storage__lbl">Estimation indisponible sur cet appareil.</div>`;
  }
}

/* ───────────────────────────── Détail d'une journée ──────────────────────── */
function goDayAll(key, push = true){
  exitDrive(); safeCloseLB(); Media.revokeAll();
  if(!key) key = todayKey();
  if(push) Nav.push();
  State.view = 'dailyAll'; State.dailyKey = key;
  setTop({ title:stDayLabel(key) });
  setBot({ actions:!1, revision:!1 }); hideRevAct();
  const v = $('#view');

  const entries = [];
  data.subjects.forEach(s => (s.chapters || []).forEach(ch => {
    (ch.stats.dailyLog?.[key] || []).forEach(e => entries.push({ ...e, ch, sub:s }));
  }));
  entries.sort((a, b) => b.ts - a.ts);
  const ok = entries.filter(e => isSucc(e.next)).length;
  const dur = entries.reduce((n, e) => n + (e.ms || 0), 0);
  const changed = entries.filter(e => e.prev !== e.next).length;
  const perChapter = {};
  entries.forEach(e => { perChapter[e.ch.id] = perChapter[e.ch.id] || { ch:e.ch, sub:e.sub, n:0, ok:0 }; perChapter[e.ch.id].n++; if(isSucc(e.next)) perChapter[e.ch.id].ok++; });
  const byHour = new Array(24).fill(0);
  entries.forEach(e => { const h = new Date(e.ts).getHours(); if(h >= 0 && h < 24) byHour[h]++; });
  const GR = { echec:'circle-x', difficile:'circle-alert', bien:'circle-check', facile:'zap' };
  const byId = new Map();
  data.subjects.forEach(s => s.chapters.forEach(ch => ch.cards.forEach(c => byId.set(ch.id + '|' + c.id, { c, ch }))));

  v.innerHTML = `
    <div class="settings-page scroll-y st-page">
      <div class="st-hero"><div><h1>${stEv(stDayLabel(key))}</h1>
      <p>${entries.length} carte${entries.length > 1 ? 's' : ''} révisée${entries.length > 1 ? 's' : ''} · ${Object.keys(perChapter).length} chapitre(s)</p></div></div>
      <div class="stats-grid st-kpis">
        ${stKpi('Cartes révisées', stFmt(entries.length), '')}
        ${stKpi('Réussite', entries.length ? stPct(ok, entries.length) + ' %' : '—', '')}
        ${stKpi('Changements', stFmt(changed), 'de niveau')}
        ${stKpi('Temps', dur ? fmtDur(dur) : '—', entries.length ? `${(dur / entries.length / 1000).toFixed(1)} s / carte` : '')}
      </div>
      ${entries.length ? `<div class="section-title mt8">Rythme de la journée</div>
      <div class="st-card">${stBars(byHour.map((n, h) => ({ n, label:h % 3 === 0 ? String(h).padStart(2, '0') + 'h' : '' })), { className:'st-bars--hours' })}</div>
      <div class="section-title mt8">Chapitres travaillés</div>
      <div class="st-card st-card--list">
        ${Object.values(perChapter).sort((a, b) => b.n - a.n).map(x => `<button type="button" class="st-row" data-chap="${x.ch.id}">
          <span class="st-row__emoji">${stEv(x.ch.emoji || getEmoji(x.ch.title) || '📄')}</span>
          <span class="st-row__main"><span class="st-row__title">${stEv(x.ch.title)}</span>
          <span class="st-row__meta">${x.n} carte${x.n > 1 ? 's' : ''} · ${stPct(x.ok, x.n)} % de réussite</span></span>
          <span class="st-row__side"><b>${x.n}</b></span></button>`).join('')}
      </div>
      <div class="section-title mt8">Détail des décisions</div>
      <div class="st-card st-card--list">
        ${entries.map(e => {
          const t = new Date(e.ts);
          const found = byId.get(e.ch.id + '|' + e.cardId);
          const front = found ? getSides(found.c, found.ch).f : 'Carte supprimée';
          return `<div class="st-row st-row--static">
            <span class="st-row__time">${String(t.getHours()).padStart(2, '0')}:${String(t.getMinutes()).padStart(2, '0')}</span>
            <span class="st-row__main"><span class="st-row__title">${stEv(stTrunc(front, 120))}</span>
            <span class="st-row__meta">${stEv(e.ch.title)} · avant : ${stEv(e.prev || 'unseen')} · ${fmtDur(e.ms || 0)}</span></span>
            <span class="st-row__side"><span class="grade-tag ${e.next}">${ico(GR[e.next] || 'dot', 'ico--xs')}${stEv(e.next)}</span></span>
          </div>`;
        }).join('')}
      </div>` : `<div class="empty">${ico('calendar', 'ico--xl')}<div class="empty__title">Aucune révision ce jour-là</div><div class="empty__sub">Choisis un autre jour dans la carte de chaleur ou les barres d'activité.</div></div>`}
    </div>`;

  v.querySelectorAll('[data-chap]').forEach(el => el.onclick = () => {
    const sub = data.subjects.find(s => s.chapters.some(c => c.id === el.dataset.chap));
    if(sub && sub.id !== data.app.currentSubjectId) setSub(sub.id);
    goChapter(el.dataset.chap);
  });
  tsLat(v);
}

/* ═════════════════════════════ MENU « CARTES » ═══════════════════════════════
   Navigateur de toutes les cartes : sélecteurs matière/chapitre, filtres de
   niveau et de type, recherche, tri, chargement progressif et révision directe. */
function goAllCards(push = true, savedSearch = '', patch = null){
  if(!stLeaveReviewGuard()) return;
  safeCloseLB(); Media.revokeAll();
  exitDrive();
  if(patch) Object.assign(State.allCards, patch);
  if(push) Nav.push();
  State.view = 'cards';
  State.cardsMode = 'all';
  State.chapterId = null;
  State.allCards = State.allCards || stNewBrowser();
  const A = State.allCards;

  setTop({ title:'Cartes' });
  setBot({ actions:!1, revision:!1 }); hideRevAct();
  const v = $('#view');
  v.classList.remove('drive-open');

  const subjOptions = `<option value="">Toutes les matières</option>` + data.subjects.map(s =>
    `<option value="${s.id}" ${A.subjectId === s.id ? 'selected' : ''}>${stEv((s.emoji ? s.emoji + ' ' : '') + s.title)}</option>`).join('');
  const chapList = A.subjectId ? (data.subjects.find(s => s.id === A.subjectId)?.chapters || []) : data.subjects.flatMap(s => (s.chapters || []).map(c => ({ ...c, _sub:s.title })));
  const chapOptions = `<option value="">Tous les chapitres</option>` + chapList.map(c =>
    `<option value="${c.id}" ${A.chapterId === c.id ? 'selected' : ''}>${stEv((c.emoji || getEmoji(c.title) || '') + ' ' + c.title)}</option>`).join('');
  const hasTypes = stScopeCards().some(x => x.c.cardType);

  v.innerHTML = `
    <div class="settings-page scroll-y ac-page">
      <div class="st-hero"><div><h1>Toutes les cartes</h1><p id="acCount">…</p></div>
        <button type="button" class="btn btn--solid btn--primary btn--sm" id="acReview">${ico('zap', 'ico--sm')}<span>Réviser</span></button></div>

      <div class="st-controls">
        <select class="input st-select" id="acSubject" aria-label="Matière">${subjOptions}</select>
        <select class="input st-select" id="acChapter" aria-label="Chapitre">${chapOptions}</select>
      </div>

      <div class="search-field deck-search ac-search">
        ${ico('search')}
        <input type="text" id="acSearch" class="input" placeholder="Rechercher dans toutes les cartes…" autocomplete="off" spellcheck="false" value="${stEv(savedSearch || A.q || '')}">
      </div>

      <div class="chip-row" id="acGrades">${GRADES.map(g => `<button type="button" class="chip ${A.grades[g] ? 'is-on' : ''}" data-grade="${g}"><span class="dot ${GC[g]}"></span>${ST_LABELS[g]}</button>`).join('')}</div>
      ${hasTypes ? `<div class="chip-row" id="acTypes">${MATH_TYPES.map(t => `<button type="button" class="chip ${A.types?.[t] ? 'is-on' : ''}" data-type="${t}"><span class="dot" style="background:${TYPE_COLORS[t]}"></span>${TYPE_LABELS[t]}</button>`).join('')}</div>` : ''}

      <div class="st-controls st-controls--end">
        <select class="input st-select" id="acSort" aria-label="Tri">
          <option value="chapter" ${A.sort === 'chapter' ? 'selected' : ''}>Ordre des chapitres</option>
          <option value="due" ${A.sort === 'due' ? 'selected' : ''}>Échéance la plus proche</option>
          <option value="hard" ${A.sort === 'hard' ? 'selected' : ''}>Les plus difficiles</option>
          <option value="reviewed" ${A.sort === 'reviewed' ? 'selected' : ''}>Les plus révisées</option>
          <option value="alpha" ${A.sort === 'alpha' ? 'selected' : ''}>A → Z</option>
        </select>
        <button type="button" class="btn btn--outline btn--sm" id="acReset">${ico('rotate-ccw', 'ico--sm')}<span>Filtres</span></button>
      </div>

      <div id="acList" class="ac-list"></div>
      <div class="ac-more"><button type="button" class="btn btn--outline btn--sm hidden" id="acMore">Charger plus</button></div>
    </div>`;

  $('#acSubject').onchange = e => goAllCards(false, '', { subjectId:e.target.value, chapterId:'' });
  $('#acChapter').onchange = e => goAllCards(false, '', { chapterId:e.target.value });
  $('#acSort').onchange = e => goAllCards(false, '', { sort:e.target.value });
  $('#acGrades').addEventListener('click', e => {
    const b = e.target.closest('[data-grade]'); if(!b) return;
    const g = b.dataset.grade;
    A.grades[g] = !A.grades[g];
    if(GRADES.every(x => !A.grades[x])) A.grades[g] = true;   // au moins un niveau
    goAllCards(false);
  });
  const typesEl = $('#acTypes');
  if(typesEl) typesEl.addEventListener('click', e => {
    const b = e.target.closest('[data-type]'); if(!b) return;
    A.types = A.types || Object.fromEntries(MATH_TYPES.map(t => [t, true]));
    A.types[b.dataset.type] = !A.types[b.dataset.type];
    if(MATH_TYPES.every(t => !A.types[t])) A.types[b.dataset.type] = true;
    goAllCards(false);
  });
  $('#acReset').onclick = () => { State.allCards = null; goAllCards(false); };

  let q = savedSearch || A.q || '';
  const search = $('#acSearch');
  let timer = null;
  search.oninput = () => { clearTimeout(timer); timer = setTimeout(() => { A.q = search.value; paint(); }, 140); };

  const PAGE = 48;
  let limit = PAGE;
  const listEl = $('#acList'), moreEl = $('#acMore');

  function pool(){
    const out = [];
    const norm = s => stPlain(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const nq = norm(A.q || '');
    (data.subjects || []).forEach(s => {
      if(A.subjectId && s.id !== A.subjectId) return;
      (s.chapters || []).forEach(ch => {
        if(A.chapterId && ch.id !== A.chapterId) return;
        ch.cards.forEach(c => {
          const g = c.grade || 'unseen';
          if(!A.grades[g]) return;
          if(A.types && c.cardType && !A.types[c.cardType]) return;
          let score = 0;
          if(nq){
            const f = norm(c.front), b = norm(c.back);
            if(f.startsWith(nq)) score = 0;
            else if(b.startsWith(nq)) score = 1;
            else if(f.includes(nq)) score = 2;
            else if(b.includes(nq)) score = 3;
            else return;
          }
          out.push({ c, ch, sub:s, score });
        });
      });
    });
    const sorts = {
      chapter:null,
      due:(a, b) => (a.c.grade || 'unseen') === 'unseen' ? 1 : ((b.c.grade || 'unseen') === 'unseen' ? -1 : (a.c.dueAt || 0) - (b.c.dueAt || 0)),
      hard:(a, b) => (b.c.failures || 0) - (a.c.failures || 0) || (a.c.stability || 99) - (b.c.stability || 99),
      reviewed:(a, b) => (b.c.timesReviewed || 0) - (a.c.timesReviewed || 0),
      alpha:(a, b) => stPlain(a.c.front).localeCompare(stPlain(b.c.front))
    };
    if(A.q) out.sort((a, b) => a.score - b.score);
    else if(sorts[A.sort]) out.sort(sorts[A.sort]);
    return out;
  }
  let items = pool();

  function paint(reset = true){
    items = pool();
    if(reset) limit = PAGE;
    $('#acCount').textContent = `${items.length} carte${items.length > 1 ? 's' : ''} · ${new Set(items.map(i => i.ch.id)).size} chapitre(s) · ${new Set(items.map(i => i.sub.id)).size} matière(s)`;
    const shown = items.slice(0, limit);
    listEl.innerHTML = shown.length ? shown.map((it, i) => {
      const { f, b } = getSides(it.c, it.ch);
      return `<article class="ac-item grade-${it.c.grade || 'unseen'}" data-id="${it.c.id}" data-chap="${it.ch.id}" data-i="${i}">
        <header class="ac-item__head">
          <span class="ac-item__chap">${stEv(it.ch.emoji || getEmoji(it.ch.title) || '📄')} ${stEv(it.ch.title)}</span>
          <span class="ac-item__meta">${stEv(it.sub.title)}${it.c.timesReviewed ? ` · ${it.c.timesReviewed}×` : ''}${it.c.avgMs ? ` · ${(it.c.avgMs / 1000).toFixed(1)} s` : ''}</span>
          <button type="button" class="icon-btn ac-item__go" title="Réviser cette carte" aria-label="Réviser cette carte">${ico('zap', 'ico--sm')}</button>
        </header>
        <div class="ac-item__front">${formatText(f)}</div>
        <div class="ac-item__back">${(data.app.prefs.mathDetail === false && getMathSimple(it.c)) ? formatText(getMathSimple(it.c)) : formatText(b)}</div>
      </article>`;
    }).join('') : `<div class="empty">${ico('search', 'ico--lg')}<div class="empty__title">Aucune carte</div><div class="empty__sub">Ajuste les filtres, la matière ou la recherche.</div></div>`;
    moreEl.classList.toggle('hidden', limit >= items.length);
    moreEl.textContent = `Charger plus (${Math.max(0, items.length - limit)} restantes)`;
    Media.resolve(listEl); tsLat(listEl);
    const rv = $('#acReview');
    if(rv){
      const size = Math.min(items.length, Math.max(5, data.app.prefs.sessionSize || 10));
      rv.innerHTML = `${ico('zap', 'ico--sm')}<span>Réviser ${size}</span>`;
      rv.disabled = !items.length;
    }
  }

  moreEl.onclick = () => { limit += PAGE * 2; paint(false); };
  listEl.addEventListener('click', e => {
    const item = e.target.closest('.ac-item'); if(!item) return;
    if(e.target.closest('.ac-item__go')){
      stQuickReview(item.dataset.chap, item.dataset.id, 'cards');
      return;
    }
    item.classList.toggle('is-open');
  });
  listEl.addEventListener('dblclick', e => {
    const item = e.target.closest('.ac-item'); if(!item) return;
    item.classList.add('is-open');
  });
  $('#acReview').onclick = () => {
    const label = A.chapterId ? (getCh(A.chapterId)?.title || 'chapitre')
                : A.subjectId ? (data.subjects.find(s => s.id === A.subjectId)?.title || 'matière')
                : 'toutes les cartes';
    startReviewSelection(items, label);
  };

  paint(true);
}

/* Cartes du périmètre courant (sans filtres) — sert à détecter les types maths */
function stScopeCards(){
  const st = State.stats;
  const out = [];
  (data.subjects || []).forEach(s => (s.chapters || []).forEach(ch => {
    if(st.subjectId && s.id !== st.subjectId) return;
    if(st.chapterId && ch.id !== st.chapterId) return;
    ch.cards.forEach(c => out.push({ c, ch, sub:s }));
  }));
  return out;
}

/* Révision rapide d'une carte depuis les vues Insights / navigateur de cartes.
   Le retour ramène sur la vue d'origine (stats ou liste de cartes).           */
function stQuickReview(chapId, cardId, back = 'cards'){
  const ch = _real(chapId);
  if(!ch) return;
  const card = ch.cards.find(x => x.id === cardId);
  if(!card) return;
  Nav.push();
  State.review = {
    chapterId:chapId, queue:[cardId], index:0, flipped:false, answers:[], history:[],
    start:Date.now(), end:null, cardStart:Date.now(),
    singleCardMode:true, returnTo:{ kind:back }
  };
  goReview(false);
}

/* Lancer une révision sur une sélection arbitraire de cartes (multi-chapitres) */
function startReviewSelection(items, label = ''){
  const pool = items.filter(x => x && x.c && x.ch);
  if(!pool.length){ toast('Aucune carte à réviser', 'info'); return; }
  const wt = { unseen:6, echec:5, difficile:3.5, bien:2, facile:1 };
  const now = Date.now();
  const ranked = pool.map(i => {
    const g = i.c.grade || 'unseen', base = wt[g] || 1;
    const late = i.c.dueAt > 0 ? (now - i.c.dueAt > 0 ? 1 + M.min(3, (now - i.c.dueAt) / 864e5) : 0.85) : 1.15;
    return { chapId:i.ch.id, cardId:i.c.id, w: base * late * (1 + (1 - (i.c.perfEma || 0.5)) * 1.6) * (0.9 + M.random() * 0.2) };
  }).sort((a, b) => b.w - a.w);
  const size = Math.min(ranked.length, Math.max(5, data.app.prefs.sessionSize || 10));
  const queue = ranked.slice(0, size).map(x => ({ chapId:x.chapId, cardId:x.cardId }));
  const chaps = [...new Set(queue.map(x => x.chapId))];
  if(chaps[0] && data.app.currentSubjectId !== (data.subjects.find(s => s.chapters.some(c => c.id === chaps[0]))?.id)){
    const sub = data.subjects.find(s => s.chapters.some(c => c.id === chaps[0]));
    if(sub) setSub(sub.id);
  }
  continueOrNew('multi:' + (label || 'sélection'), queue, null, true, false, { mode:'multi', multiChaps:chaps, label });
}
