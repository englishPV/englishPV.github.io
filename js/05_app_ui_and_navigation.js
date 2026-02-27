/* --- UI STATE & ROUTING --- */
let selectionMode = false;
let selectedIds = new Set(); 
let expandedFolders = new Set(); 
let selectionContext = null; 

const Nav = {
  stack: [], scrollPos: 0,
  push(){ this.scrollPos = $('#dL')?.scrollTop||0; this.stack.push(deepClone({view:State.view,chapterId:State.chapterId,review:State.review,dailyKey:State.dailyKey,scrollPos:this.scrollPos,expandedFolders:[...expandedFolders]})) },
  back(){ 
    if(!this.stack.length) return false; 
    const p=this.stack.pop(); 
    State.virtualChapter=null; 
    State.view=p.view; State.chapterId=p.chapterId; State.review=p.review; State.dailyKey=p.dailyKey; 
    expandedFolders = new Set(p.expandedFolders || []);
    this.scrollPos = p.scrollPos || 0; 
    render(!1);
    return true;
  },
  clear(){ this.stack=[]; this.scrollPos=0 }
};

const State = { view:'deck', chapterId:null, review:null, cardsIndex:0, dailyKey:null, virtualChapter:null };
const _real = id => getChs().find(c=>c.id===id), getCh = id => (State.virtualChapter?.id===id) ? State.virtualChapter : _real(id);
function updFilt(ch,key){ let t=ch; if(ch.virtual&&ch._groupId){const g=findGrp(getSub(),ch._groupId);if(g){if(!g.filters)g.filters={grades:GRADE_FILTERS()};t=g}} togFilt(t,key); if(t!==ch)ch.filters=t.filters; saveData(); goChapter(ch.id,!1) }
const delImpCh = id => { const s=getSub(), i=s.chapters.findIndex(c=>c.id===id); if(i<0||!s.chapters[i].imported||!confirm('Supprimer ?'))return!1; ensGrps(s).forEach(g=>g.chapIds=g.chapIds.filter(x=>x!==id)); valGrps(s); s.chapters.splice(i,1); if(!s.chapters.length&&s.imported){data.subjects=data.subjects.filter(x=>x.id!==s.id);data.app.currentSubjectId=data.subjects[0]?.id} saveData(); return!0 };

/* --- UI HELPERS & LISTENERS --- */
function getDeckTint(item, type) {
    let k; if (type === 'chapter') k = item.stats.gradeCounts || getLive(item); else k = buildGrpStats(getSub(), item).counts;
    const totalGraded = k.echec + k.difficile + k.bien + k.facile;
    let r = 0, g = 0, b = 0, a = 0;
    if (totalGraded > 0) {
        const wRed = (k.echec + k.difficile) / totalGraded, wBlue = k.bien / totalGraded, wGreen = k.facile / totalGraded;
        r = (239 * wRed) + (59 * wBlue) + (34 * wGreen); g = (68 * wRed) + (130 * wBlue) + (197 * wGreen); b = (68 * wRed) + (246 * wBlue) + (94 * wGreen); a = 0.25;
    }
    if (item.deadline) {
        const now = new Date(); now.setHours(0,0,0,0); const ddl = new Date(item.deadline); ddl.setHours(0,0,0,0);
        const diff = (ddl - now) / 864e5; let urgency = 0;
        if (diff <= 0) urgency = 1; else if (diff <= 7) urgency = 1 - (diff / 7);
        if (urgency > 0) { const tR = 239, tG = 68, tB = 68; if (totalGraded === 0) { r = tR; g = tG; b = tB; a = 0.5 * urgency; } else { r = r * (1 - urgency) + tR * urgency; g = g * (1 - urgency) + tG * urgency; b = b * (1 - urgency) + tB * urgency; a = 0.25 + (0.25 * urgency); } }
    }
    if (a <= 0.01) return '';
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
}

function checkExpiredDates(list) {
    const now = new Date(); now.setHours(0,0,0,0); let changed = false;
    list.forEach(item => { if (item.deadline) { const ddl = new Date(item.deadline); ddl.setHours(0,0,0,0); if (ddl < now) { item.deadline = null; changed = true; } } });
    return changed;
}

function getDailyGoalCalc(ch) {
    if(!ch.deadline) return null;
    const now = new Date(); now.setHours(0,0,0,0); const ddl = new Date(ch.deadline); ddl.setHours(0,0,0,0);
    let days = Math.ceil((ddl - now) / 864e5); if (days <= 0) days = 1;
    const k = ch.stats.gradeCounts || getLive(ch);
    let pool = k.unseen + k.echec + k.difficile, label = "cartes (Mauvaises)";
    if (pool === 0) { pool = k.bien; label = "cartes (Bien)"; if (pool === 0) return { val: 0, text: "Objectif atteint !", pool: 0 }; }
    return { val: Math.ceil(pool / days), text: `${label} / jour`, pool: pool };
}

const backBtn=$('#backBtn'), titleEl=$('#title'), botAct=$('#bottomActions'), revBar=$('#revisionBar'), startBtn=$('#startReviewBtn');

function renSubMenu(){
  let m=$('#subjectMenu'); if(!m){m=D.createElement('div');m.id='subjectMenu';m.className='subject-menu';D.body.appendChild(m)}
  m.innerHTML=data.subjects.map(s=>`<div class="subject-item" data-id="${s.id}"><div class="name">${s.emoji?s.emoji+' ':''}${s.title}</div><div class="meta">${s.chapters?.length||0} chap.</div>${s.id===data.app.currentSubjectId?'<div class="muted">✓</div>':''}<div class="subject-actions"><button class="btn btn--tiny rs">✏️</button>${!(s.chapters?.length)?'<button class="btn btn--tiny ds">🗑️</button>':''}</div></div>`).join('');
  $$('.subject-item',m).forEach(el=>{
    el.onclick=e=>{if(e.target.closest('button'))return;const id=el.dataset.id;if(id!==data.app.currentSubjectId){setSub(id);closeSubMenu();goDeck(!1)}else closeSubMenu();e.stopPropagation()};
    const r=el.querySelector('.rs'); if(r)r.onclick=e=>{e.stopPropagation();const id=el.dataset.id,s=data.subjects.find(x=>x.id===id),t=prompt('Nom:',s.title);if(t){renSub(id,t,prompt('Emoji:',s.emoji));renSubMenu();setTop({title:`Deck • ${getSub().title}`});goDeck(!1)}};
    const d=el.querySelector('.ds'); if(d)d.onclick=e=>{e.stopPropagation();const id=el.dataset.id;if(confirm('Supprimer ?')){data.subjects=data.subjects.filter(s=>s.id!==id);if(data.app.currentSubjectId===id)data.app.currentSubjectId=data.subjects[0]?.id;closeSubMenu();goDeck(!1);saveData()}}
  })
}
const openSubMenu = () => { renSubMenu(); const m=$('#subjectMenu'), r=titleEl.getBoundingClientRect(); m.style.top=`${r.bottom+6}px`; m.style.left=`${r.left}px`; m.style.display='block'; setTimeout(()=>D.addEventListener('click',clsOnOut),0) };
const closeSubMenu = () => { const m=$('#subjectMenu'); if(m)m.style.display='none'; D.removeEventListener('click',clsOnOut) };
const clsOnOut = e => { if(!$('#subjectMenu')?.contains(e.target)&&e.target!==titleEl)closeSubMenu() };

titleEl.onclick = () => { if(State.view!=='deck')goDeck(!1); else($('#subjectMenu')?.style.display==='block')?closeSubMenu():openSubMenu() };

backBtn.onclick = () => { 
  if(selectionMode) { exitSelectionMode(); return; }
  if(State.view==='recap'){
    if(Nav.stack.length)Nav.stack.pop();
    const t=State.review?.chapterId||State.chapterId;
    State.review=null; hideRevAct();
    if(t?.startsWith('group-')){
      const g=findGrp(getSub(),t.replace('group-',''));
      if(g){State.virtualChapter=buildVirt(getSub(),g);goChapter(State.virtualChapter.id,!1)}
      else goDeck(!1);
    } else if(t) goChapter(t,!1);
    else goDeck(!1);
  } else if(State.view==='review') {
    if(!State.review?.end && !confirm('Quitter la révision ?')) return;
    if(Nav.stack.length) Nav.back();
    else goDeck(!1);
  } else {
    if(Nav.stack.length) {
      Nav.back();
    } else {
      if(expandedFolders.size > 0) {
        expandedFolders.clear();
        goDeck(false);
      }
    }
  }
};

$('#cardsBtn').onclick = () => goCards(State.chapterId); 
$('#settingsBtn').onclick = () => openSet(State.chapterId); 
startBtn.onclick = () => startRev(State.chapterId);

function setTop({title,showBack}){ backBtn.classList.toggle('hidden',showBack===!1); if(title)titleEl.textContent=title }
function setBot({actions,revision,sz=10,en=true,av=null,cid=null}){ botAct.style.display=actions?'grid':'none'; revBar.style.display=revision?'block':'none'; $('#app').style.setProperty('--row-actions',actions?'52px':'0px'); $('#app').style.setProperty('--row-rev',revision?'64px':'0px'); if(av==null&&cid){const c=getCh(cid);av=c?cntAv(c):0} startBtn.textContent=`Révision • ${av>0?M.min(sz,av):sz} cartes${revision&&(av>0)?` • ${av} dispo`:''}`; startBtn.disabled=!en||(av||0)<=0 }
function render(push=true){ if(State.view==='deck')goDeck(push); else if(State.view==='chapter')goChapter(State.chapterId,push); else if(State.view==='cards')goCards(State.chapterId,push); else if(State.view==='review')goReview(push); else if(State.view==='recap')goRecap(push); else if(State.view==='settings')openSet(State.chapterId,push); else if(State.view==='daily')goDaily(State.chapterId,State.dailyKey,push) }
const hideRevAct = () => { $('#reviewActionsBar').style.display='none' };

/* --- SELECTION & GESTURES --- */
function goDeckKeepScroll() {
  const scrollEl = $('#dL');
  const savedScroll = scrollEl ? scrollEl.scrollTop : 0;
  goDeck(false);
  requestAnimationFrame(() => {
    const newScrollEl = $('#dL');
    if(newScrollEl) newScrollEl.scrollTop = savedScroll;
  });
}

function enterSelectionMode(initialId) {
  selectionMode = true;
  selectedIds = new Set();
  if(initialId) selectedIds.add(initialId);
  removeFABs();
  goDeckKeepScroll();
}

function exitSelectionMode() {
  selectionMode = false;
  selectedIds.clear();
  removeFABs();
  goDeckKeepScroll();
}

function removeFABs() {
  $$('.fab-confirm, .fab-cancel').forEach(el => el.remove());
}

function renderFABs() {
  removeFABs();
  if(!selectionMode) return;
  
  const fabConfirm = D.createElement('button');
  fabConfirm.className = 'fab-confirm';
  fabConfirm.innerHTML = '✓';
  fabConfirm.title = 'Créer un dossier';
  fabConfirm.onclick = () => {
    const ids = [...selectedIds];
    if(ids.length < 2) { toast('Sélectionnez au moins 2 éléments', 'error'); return; }
    const sub = getSub();
    let parentGid = null;
    for(const eid of expandedFolders) {
      const g = findGrp(sub, eid);
      if(g) {
        const allInFolder = ids.every(id => g.chapIds.includes(id));
        if(allInFolder) { parentGid = eid; break; }
      }
    }
    const newGid = addGrp(sub, ids, parentGid);
    if(newGid) {
      const title = prompt('Nom du dossier:', '');
      if(title) { const ng = findGrp(sub, newGid); if(ng) ng.title = title.trim(); }
      valGrps(sub); saveData();
      toast('Dossier créé !', 'success');
    }
    exitSelectionMode();
  };
  D.body.appendChild(fabConfirm);
  
  const fabCancel = D.createElement('button');
  fabCancel.className = 'fab-cancel';
  fabCancel.innerHTML = '✕';
  fabCancel.title = 'Annuler';
  fabCancel.onclick = () => exitSelectionMode();
  D.body.appendChild(fabCancel);
}

const hasSelection = () => window.getSelection()?.toString().length > 0;

function bindPullRefresh(container, onRefresh) {
  let startY = 0, pulling = false, indicator = null;
  container.addEventListener('touchstart', e => { if(container.scrollTop <= 5) { startY = e.touches[0].clientY; pulling = true; } }, {passive:!0});
  container.addEventListener('touchmove', e => {
    if(!pulling) return; const delta = e.touches[0].clientY - startY;
    if(delta > 0 && delta < 120) {
      if(!indicator) { indicator = D.createElement('div'); indicator.innerHTML = '↻'; indicator.style.cssText = 'text-align:center;padding:10px;color:var(--muted);font-size:20px;transition:transform 0.2s'; container.prepend(indicator); }
      indicator.style.transform = `rotate(${delta * 3}deg)`;
    }
  }, {passive:!0});
  container.addEventListener('touchend', e => {
    if(indicator) { if(e.changedTouches[0].clientY - startY > 80) { haptic('medium'); onRefresh(); } indicator.remove(); indicator = null; }
    pulling = false;
  });
}

function bindSwipeNav() {
  const wrap = $('.review-wrap'); if(!wrap) return;
  const card = wrap.querySelector('.review-card'); if(!card) return;
  const scroller = wrap.querySelector('.review-scroller');

  let startX = 0, startY = 0, deltaX = 0;
  let mode = 'idle';

  wrap.addEventListener('touchstart', e => {
    if(e.touches.length !== 1 || mode === 'animating') return;
    if(hasSelection()) { mode = 'selecting'; return; }
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    deltaX = 0;
    mode = 'undecided';
    card.style.transition = 'none';
  }, {passive: true});

  wrap.addEventListener('touchmove', e => {
    if(e.touches.length !== 1) return;
    if(mode !== 'undecided' && mode !== 'swiping') return;
    const dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;
    if(mode === 'undecided') {
      if(hasSelection()) { mode = 'selecting'; return; }
      if(Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { mode = 'scrolling'; return; }
      if(Math.abs(dx) > 12) {
        mode = 'swiping';
        window.getSelection()?.removeAllRanges();
        if(scroller) { scroller.style.userSelect = 'none'; scroller.style.webkitUserSelect = 'none'; }
      }
    }
    if(mode !== 'swiping') return;
    deltaX = dx;
    const r = State.review;
    const canGoBack = r && r.history && r.history.length > 0;
    let tx = deltaX > 0 ? (canGoBack ? deltaX : deltaX * 0.15) : deltaX * 0.15;
    card.style.transform = `translateX(${tx}px) rotate(${tx * 0.015}deg)`;
    card.style.opacity = String(Math.max(0.5, 1 - Math.abs(tx) / 500));
  }, {passive: true});

  wrap.addEventListener('touchend', () => {
    if(scroller) { scroller.style.userSelect = ''; scroller.style.webkitUserSelect = ''; }
    if(mode === 'swiping') {
      const r = State.review;
      const canGoBack = r && r.history && r.history.length > 0;
      if(deltaX > 80 && canGoBack) {
        mode = 'animating';
        card.style.transition = 'transform 0.25s ease-out, opacity 0.25s ease-out';
        card.style.transform = `translateX(${window.innerWidth + 100}px) rotate(12deg)`;
        card.style.opacity = '0';
        setTimeout(() => { haptic('medium'); undoRev(); }, 200);
      } else {
        card.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease-out';
        card.style.transform = '';
        card.style.opacity = '';
        setTimeout(() => { card.style.transition = ''; }, 350);
        mode = 'idle';
      }
    } else { mode = 'idle'; }
    deltaX = 0;
  });
}

function initGest(){ const s=$('.review-scroller'); if(s)$$('img',s).forEach(i=>i.onclick=e=>{e.preventDefault();openLB(i,s)}); bindSz() }
function bindSz() {
    const elements = $$('.review-card .term, .review-card .definition'); const getDist = (t) => Math.hypot(t[0].pageX - t[1].pageX, t[0].pageY - t[1].pageY);
    elements.forEach(el => {
        let startDist = 0; let startVal = 0; const isTerm = el.classList.contains('term');
        el.addEventListener('touchstart', (e) => { if (e.touches.length === 2) { if (e.cancelable) e.preventDefault(); startDist = getDist(e.touches); startVal = isTerm ? data.app.prefs.fsTerm : data.app.prefs.fsDef; } }, { passive: false });
        el.addEventListener('touchmove', (e) => { if (e.touches.length === 2 && startDist > 0) { if (e.cancelable) e.preventDefault(); const dist = getDist(e.touches); const scale = dist / startDist; const newVal = clamp(Math.round(startVal * scale), 12, 90); if (isTerm) { data.app.prefs.fsTerm = newVal; } else { data.app.prefs.fsDef = newVal; } applyUI(); } }, { passive: false });
        el.addEventListener('touchend', (e) => { if (e.touches.length < 2 && startDist > 0) { startDist = 0; saveData(); } });
    });
}

/* --- VIEWS --- */
function goDeck(push=true){
  safeCloseLB(); Media.revokeAll(); clearMathCache();
  if(push) Nav.push(); State.view='deck'; State.chapterId=null; 
  const s=getSub(); setTop({title:`Deck • ${s.emoji?s.emoji+' ':''}${s.title}`, showBack: selectionMode || expandedFolders.size > 0}); setBot({actions:!1, revision:!1}); hideRevAct();
  let needsSave = false; if (checkExpiredDates(ensGrps(s))) needsSave = true; if (checkExpiredDates(s.chapters)) needsSave = true; if (needsSave) debouncedSave();

  const v=$('#view'), grps=ensGrps(s), chs=(s.chapters||[]);
  const items = buildDeckItems(s, null, 0);
  
  v.innerHTML=`<div class="card flexcol" style="flex:1"><div class="deck-head" style="display:flex;align-items:center;justify-content:space-between"><div class="section-title" style="margin:0">Chapitres & Fichiers</div><div class="actions" style="display:flex;gap:6px"><button class="btn ${selectionMode?'btn--primary':'btn--ghost'} btn--tiny" id="editModeBtn">${selectionMode?'✓ Terminer':'✏️ Éditer'}</button><button class="btn btn--ghost btn--tiny" id="impB">Importer</button><input id="impI" type="file" class="hidden" accept="*/*" multiple/></div></div><div id="dL" class="scroll-y" style="flex:1;min-height:0;padding-right:4px"><div class="list" id="deckList"></div></div></div>`;
  const listEl = $('#deckList');
  listEl.innerHTML = items.map(item => renderDeckItem(item, s)).join('');
  const impBtn = $('#impB');
  const impInput = $('#impI');
  if (impBtn && impInput) { impBtn.onclick = () => impInput.click(); }
  $('#impI').onchange = async e => { try { await importFiles([...e.target.files]); toast('Import terminé !', 'success'); goDeck(!1); } catch(x) { toast('Erreur import', 'error'); } finally { e.target.value=''; } };
  
  $('#editModeBtn').onclick = () => {
    if(selectionMode) { exitSelectionMode(); } else { selectionMode = true; selectedIds.clear(); goDeckKeepScroll(); }
  };
  
  if(!push && Nav.scrollPos > 0) { setTimeout(() => { const list = $('#dL'); if(list) list.scrollTop = Nav.scrollPos; }, 50); }
  const list = $('#dL'); if(list) bindPullRefresh(list, () => { toast('Actualisation...', 'info', 1000); goDeck(false); });
  
  if(selectionMode) renderFABs();
  bindDeckNew();
}

function buildDeckItems(s, parentGid, depth) {
  const grps = ensGrps(s);
  const items = [];
  
  const levelGroups = grps.filter(g => (g.parentGroupId||null) === parentGid);
  const inGroupAtLevel = new Set();
  levelGroups.forEach(g => g.chapIds.forEach(id => inGroupAtLevel.add(id)));
  levelGroups.forEach(g => (g.childGroupIds||[]).forEach(cgid => {
    getAllChapIdsRecursive(s, cgid).forEach(id => inGroupAtLevel.add(id));
  }));
  
  let levelChapters;
  if(parentGid === null) {
    const allInGroups = new Set();
    grps.forEach(g => {
      if(!g.parentGroupId) {
        g.chapIds.forEach(id => allInGroups.add(id));
        (g.childGroupIds||[]).forEach(cgid => getAllChapIdsRecursive(s, cgid).forEach(id => allInGroups.add(id)));
      }
    });
    levelChapters = s.chapters.filter(c => !allInGroups.has(c.id));
  } else {
    const parentG = findGrp(s, parentGid);
    levelChapters = parentG ? parentG.chapIds.map(id => s.chapters.find(c=>c.id===id)).filter(Boolean) : [];
  }
  
  const sorter = (a, b) => { 
    const aDeadline = a.deadline || (a.type === 'group' ? null : null);
    const bDeadline = b.deadline || (b.type === 'group' ? null : null);
    if (aDeadline && !bDeadline) return -1; if (!aDeadline && bDeadline) return 1; 
    if (aDeadline && bDeadline) { const diff = new Date(aDeadline) - new Date(bDeadline); if (diff !== 0) return diff; }
    return (b.lastUsed || 0) - (a.lastUsed || 0); 
  };
  
  const groupItems = levelGroups.map(g => ({type:'group', group:g, depth}));
  const chapItems = levelChapters.map(c => ({type:'chapter', chapter:c, depth, parentGid}));
  
  groupItems.sort((a,b) => sorter(a.group, b.group));
  chapItems.sort((a,b) => sorter(a.chapter, b.chapter));
  
  for(const gi of groupItems) {
    items.push(gi);
    if(expandedFolders.has(gi.group.id)) {
      const children = buildDeckItems(s, gi.group.id, depth + 1);
      items.push(...children);
    }
  }
  items.push(...chapItems);
  
  return items;
}

function renderDeckItem(item, s) {
  const depthClass = item.depth > 0 ? ` folder-child${item.depth >= 2 ? ` folder-child-depth-${Math.min(item.depth, 3)}` : ''}` : '';
  
  if(item.type === 'group') {
    const g = item.group;
    const {counts:c} = buildGrpStats(s, g);
    const tot = Object.values(c).reduce((a,b)=>a+b,0);
    const pct = tot ? M.round((tot-c.unseen)*100/tot) : 0;
    const tint = getDeckTint(g, 'group');
    const emoji = g.emoji || '📁';
    const title = g.title || 'Fichier ('+grpEmojis(s,g)+')';
    const isExpanded = expandedFolders.has(g.id);
    const chevron = isExpanded ? '▾' : '›';
    
    let rightContent = '';
    if(selectionMode) {
      rightContent = `<button class="remove-x" data-action="delete-folder" data-gid="${g.id}" title="Supprimer le dossier">✕</button>`;
    } else if(isExpanded) {
      const parentG = findGrpOfGrp(s, g.id);
      if(parentG) {
        rightContent = `<button class="remove-x" data-action="remove-subfolder" data-gid="${g.id}" data-parent="${parentG.id}" title="Sortir du dossier" style="margin-right:12px">✕</button>`;
      }
    }
    
    return `<div class="deck-item${depthClass}" data-type="group" data-id="${g.id}" style="${tint?'background-color:'+tint:''}">
      <div class="slide">
        <div class="deck-emoji">${emoji}</div>
        <div class="deck-info">
          <div class="deck-title">${title}</div>
          <div class="deck-sub">
            <div class="mini-bar"><div class="mini-bar-fill" style="width:${pct}%"></div></div>
            <span>${pct}%</span>
            <div class="mini-dots"><div class="md" style="background:var(--red)"></div><div class="md" style="background:var(--amber)"></div><div class="md" style="background:var(--blue)"></div><div class="md" style="background:var(--green)"></div></div>
            <span>${c.echec}·${c.difficile}·${c.bien}·${c.facile}</span>
            <span class="folder-badge">${getAllChapIdsRecursive(s, g.id).length} chap.</span>
          </div>
        </div>
        ${rightContent}
        <div class="deck-chevron">${chevron}</div>
      </div>
    </div>`;
  } else {
    const c = item.chapter;
    const k = getLive(c), tot = c.cards.length, pct = tot ? M.round((tot-k.unseen)/tot*100) : 0;
    const tint = getDeckTint(c, 'chapter');
    const emoji = c.emoji || getEmoji(c.title) || '📄';
    
    let rightContent = '';
    if(selectionMode) {
      const isChecked = selectedIds.has(c.id);
      rightContent = `<div class="sel-checkbox ${isChecked ? 'checked' : ''}" data-action="toggle-select" data-cid="${c.id}"></div>`;
    } else if(item.parentGid && expandedFolders.has(item.parentGid)) {
      rightContent = `<button class="remove-x" data-action="remove-from-folder" data-cid="${c.id}" data-gid="${item.parentGid}" title="Sortir du dossier" style="margin-right:12px">✕</button>`;
    }
    
    if(selectionMode) { rightContent = ''; }
    let selectBox = '';
    if(selectionMode) {
      const isChecked = selectedIds.has(c.id);
      selectBox = `<div class="sel-checkbox ${isChecked ? 'checked' : ''}" data-action="toggle-select" data-cid="${c.id}"></div>`;
    }
    
    return `<div class="deck-item${depthClass}" data-type="chapter" data-id="${c.id}" data-parent-gid="${item.parentGid||''}" style="${tint?'background-color:'+tint:''}">
      ${c.imported?'<div class="right-action"><button class="btn btn--solid btn--red btn--tiny delCh" data-cid="'+c.id+'">Supprimer</button></div>':''}
      <div class="slide">
        ${selectBox}
        <div class="deck-emoji">${emoji}</div>
        <div class="deck-info">
          <div class="deck-title">${c.title}</div>
          <div class="deck-sub">
            <div class="mini-bar"><div class="mini-bar-fill" style="width:${pct}%"></div></div>
            <span>${pct}%</span>
            <div class="mini-dots"><div class="md" style="background:#9ca3af"></div><div class="md" style="background:var(--red)"></div><div class="md" style="background:var(--green)"></div></div>
            <span>${k.unseen}·${k.echec}·${k.facile}</span>
          </div>
        </div>
        ${rightContent}
        <div class="deck-chevron">›</div>
      </div>
    </div>`;
  }
}

function bindDeckNew() {
  const l = $('#dL'); if(!l) return;
  const sub = getSub();
  
  if(bindDeckNew._globalExit) D.removeEventListener('pointerup', bindDeckNew._globalExit);
  bindDeckNew._globalExit = (e) => {
    if(!selectionMode) return;
    const deckItem = e.target.closest('.deck-item, .fab-confirm, .fab-cancel');
    if(!deckItem) exitSelectionMode();
  };
  D.addEventListener('pointerup', bindDeckNew._globalExit);

  l.onclick = e => {
    if(e.target.matches('.delCh')) { e.stopPropagation(); if(delImpCh(e.target.dataset.cid)) goDeck(!1); return; }
    const selBox = e.target.closest('[data-action="toggle-select"]');
    if(selBox) { e.stopPropagation(); const cid = selBox.dataset.cid; if(selectedIds.has(cid)) selectedIds.delete(cid); else selectedIds.add(cid); goDeckKeepScroll(); return; }
    const remBtn = e.target.closest('[data-action="remove-from-folder"]');
    if(remBtn) { e.stopPropagation(); remFromGrp(sub, remBtn.dataset.gid, remBtn.dataset.cid); valGrps(sub); saveData(); goDeckKeepScroll(); return; }
    const delFolderBtn = e.target.closest('[data-action="delete-folder"]');
    if(delFolderBtn) { e.stopPropagation(); if(confirm('Supprimer ce dossier ?')) { delGrp(sub, delFolderBtn.dataset.gid); valGrps(sub); saveData(); exitSelectionMode(); } return; }
    const remSubBtn = e.target.closest('[data-action="remove-subfolder"]');
    if(remSubBtn) { e.stopPropagation(); removeChildGrpFromParent(sub, remSubBtn.dataset.parent, remSubBtn.dataset.gid); valGrps(sub); saveData(); goDeckKeepScroll(); return; }
  };
  
  let longPressTimer = null, startX = 0, startY = 0, pressedEl = null, didLongPress = false;
  let dragging = false, dragData = null, dragGhost = null, dragStarted = false, currentDropTarget = null, dropMode = null; 
  
  function createGhost(item) {
    const ghost = D.createElement('div');
    ghost.className = 'drag-ghost';
    const titleEl = item.querySelector('.deck-title');
    const emoji = item.querySelector('.deck-emoji');
    ghost.textContent = (emoji ? emoji.textContent + ' ' : '') + (titleEl ? titleEl.textContent : 'Item');
    D.body.appendChild(ghost);
    return ghost;
  }
  
  function updateGhost(x, y) {
    if(!dragGhost) return;
    dragGhost.style.transform = `translate(${x - 30}px, ${y - 20}px) scale(1.02)`;
  }
  
  function removeGhost() {
    if(dragGhost) { dragGhost.remove(); dragGhost = null; }
  }
  
  function clearDropTargets() {
    $$('.drop-target, .drop-target-above, .drop-target-below, .drop-target-inside', l).forEach(el => {
      el.classList.remove('drop-target', 'drop-target-above', 'drop-target-below', 'drop-target-inside');
    });
    currentDropTarget = null;
    dropMode = null;
  }
  
  function getDropInfo(x, y) {
    const items = $$('.deck-item', l);
    for(const item of items) {
      const rect = item.getBoundingClientRect();
      if(x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) continue;
      
      const itemType = item.dataset.type;
      const itemId = item.dataset.id;
      
      if(dragData && itemId === dragData.id) continue;
      
      const relY = (y - rect.top) / rect.height;
      
      if(itemType === 'group') {
        if(relY < 0.25) return { el: item, type: itemType, id: itemId, mode: 'above' };
        if(relY > 0.75) return { el: item, type: itemType, id: itemId, mode: 'below' };
        return { el: item, type: itemType, id: itemId, mode: 'inside' };
      } else {
        if(relY < 0.5) return { el: item, type: itemType, id: itemId, mode: 'above' };
        return { el: item, type: itemType, id: itemId, mode: 'below' };
      }
    }
    return null;
  }
  
  function executeDrop(dragInfo, dropInfo) {
    if(!dragInfo || !dropInfo) return;
    const sub = getSub();
    const srcType = dragInfo.type;
    const srcId = dragInfo.id;
    
    if(dropInfo.mode === 'root') {
      if(srcType === 'chapter') {
        const parentG = findGrpCh(sub, srcId);
        if(parentG) { remFromGrp(sub, parentG.id, srcId); }
      } else if(srcType === 'group') {
        const parentG = findGrpOfGrp(sub, srcId);
        if(parentG) { removeChildGrpFromParent(sub, parentG.id, srcId); }
      }
      valGrps(sub); saveData();
      toast('Déplacé à la racine', 'success');
      return;
    }
    
    const dstType = dropInfo.type;
    const dstId = dropInfo.id;
    
    if(dropInfo.mode === 'inside' && dstType === 'group') {
      if(srcType === 'chapter') {
        const oldG = findGrpCh(sub, srcId);
        if(oldG && oldG.id !== dstId) remFromGrp(sub, oldG.id, srcId);
        toGrp(sub, dstId, srcId);
        toast('Chapitre ajouté au dossier', 'success');
      } else if(srcType === 'group' && srcId !== dstId) {
        const srcG = findGrp(sub, srcId);
        const dstG = findGrp(sub, dstId);
        if(srcG && dstG) {
          const dstAllChildren = getAllChapIdsRecursive(sub, srcId);
          const isCircular = (function checkCirc(gid) {
            if(gid === srcId) return true;
            const g = findGrp(sub, gid);
            if(!g) return false;
            return (g.childGroupIds||[]).some(cg => checkCirc(cg));
          })(dstId);
          
          if(!isCircular) {
            const oldParent = findGrpOfGrp(sub, srcId);
            if(oldParent) {
              oldParent.childGroupIds = (oldParent.childGroupIds||[]).filter(x => x !== srcId);
            }
            srcG.parentGroupId = dstId;
            if(!dstG.childGroupIds) dstG.childGroupIds = [];
            if(!dstG.childGroupIds.includes(srcId)) dstG.childGroupIds.push(srcId);
            toast('Dossier imbriqué', 'success');
          } else {
            toast('Impossible : référence circulaire', 'error');
          }
        }
      }
    } else if(dropInfo.mode === 'above' || dropInfo.mode === 'below') {
      if(srcType === 'chapter') {
        let targetParentG = null;
        if(dstType === 'chapter') {
          targetParentG = findGrpCh(sub, dstId);
        } else if(dstType === 'group') {
          const dstG = findGrp(sub, dstId);
          targetParentG = dstG ? (dstG.parentGroupId ? findGrp(sub, dstG.parentGroupId) : null) : null;
        }
        
        const oldG = findGrpCh(sub, srcId);
        if(oldG) remFromGrp(sub, oldG.id, srcId);
        
        if(targetParentG) {
          toGrp(sub, targetParentG.id, srcId);
          toast('Chapitre déplacé', 'success');
        } else {
          toast('Chapitre déplacé à la racine', 'success');
        }
      } else if(srcType === 'group') {
        const srcG = findGrp(sub, srcId);
        if(!srcG) return;
        
        let targetParentGid = null;
        if(dstType === 'group') {
          const dstG = findGrp(sub, dstId);
          targetParentGid = dstG ? dstG.parentGroupId : null;
        } else if(dstType === 'chapter') {
          const parentG = findGrpCh(sub, dstId);
          targetParentGid = parentG ? parentG.id : null;
        }
        
        const oldParent = findGrpOfGrp(sub, srcId);
        if(oldParent) {
          oldParent.childGroupIds = (oldParent.childGroupIds||[]).filter(x => x !== srcId);
        }
        
        if(targetParentGid && targetParentGid !== srcId) {
          const newParent = findGrp(sub, targetParentGid);
          if(newParent) {
            srcG.parentGroupId = targetParentGid;
            if(!newParent.childGroupIds) newParent.childGroupIds = [];
            if(!newParent.childGroupIds.includes(srcId)) newParent.childGroupIds.push(srcId);
          } else {
            srcG.parentGroupId = null;
          }
        } else {
          srcG.parentGroupId = null;
        }
        toast('Dossier déplacé', 'success');
      }
    }
    
    valGrps(sub); saveData();
  }
  
  const onPointerDown = e => {
    if(e.target.closest('button, .sel-checkbox, .remove-x')) return;
    const item = e.target.closest('.deck-item');
    if(!item) return;
    
    pressedEl = item;
    startX = e.clientX;
    startY = e.clientY;
    didLongPress = false;
    dragging = false;
    dragStarted = false;
    
    clearTimeout(longPressTimer);
    
    longPressTimer = setTimeout(() => {
      didLongPress = true;
      haptic('medium');
      
      dragging = true;
      dragData = { type: item.dataset.type, id: item.dataset.id, el: item };
      item.classList.add('dragging-origin');
      dragGhost = createGhost(item);
      updateGhost(startX, startY);
      
      l.classList.add('scroll-lock');
    }, 400);
  };
  
  const onPointerMove = e => {
    if(!pressedEl) return;
    const dx = e.clientX - startX, dy = e.clientY - startY;
    
    if(!dragging && M.hypot(dx, dy) > 15) { clearTimeout(longPressTimer); return; }
    
    if(dragging) {
      e.preventDefault();
      dragStarted = true;
      updateGhost(e.clientX, e.clientY);
      
      clearDropTargets();
      const info = getDropInfo(e.clientX, e.clientY);
      if(info) {
        if(info.mode === 'root') { info.el.classList.add('drop-target'); } 
        else if(info.mode === 'inside') { info.el.classList.add('drop-target-inside'); } 
        else if(info.mode === 'above') { info.el.classList.add('drop-target-above'); } 
        else if(info.mode === 'below') { info.el.classList.add('drop-target-below'); }
        currentDropTarget = info;
        dropMode = info.mode;
      }
      
      const lRect = l.getBoundingClientRect();
      const edgeSize = 40;
      if(e.clientY < lRect.top + edgeSize) { l.scrollTop -= 8; } 
      else if(e.clientY > lRect.bottom - edgeSize) { l.scrollTop += 8; }
    }
  };
  
  const onPointerUp = e => {
    clearTimeout(longPressTimer);
    
    if(dragging && dragStarted) {
      const dropInfo = getDropInfo(e.clientX, e.clientY);
      if(dropInfo && dragData) { executeDrop(dragData, dropInfo); }
      
      if(dragData?.el) dragData.el.classList.remove('dragging-origin');
      clearDropTargets();
      removeGhost();
      l.classList.remove('scroll-lock');
      dragging = false; dragData = null; dragStarted = false; pressedEl = null;
      
      goDeckKeepScroll();
      return;
    }
    
    if(dragging && !dragStarted) {
      if(dragData?.el) dragData.el.classList.remove('dragging-origin');
      removeGhost();
      l.classList.remove('scroll-lock');
      dragging = false; dragData = null; pressedEl = null;
      return;
    }
    
    if(!pressedEl || didLongPress) { pressedEl = null; return; }
    
    const item = pressedEl;
    pressedEl = null;
    
    if(e.target.closest('button, .sel-checkbox, .remove-x')) return;
    
    const dx = e.clientX - startX, dy = e.clientY - startY;
    if(M.hypot(dx, dy) > 15) return;
    
    const type = item.dataset.type;
    const id = item.dataset.id;
    
    if(selectionMode) {
      if(type === 'chapter') {
        if(selectedIds.has(id)) selectedIds.delete(id); else selectedIds.add(id);
        goDeck(false);
      } else if(type === 'group') {
        if(expandedFolders.has(id)) expandedFolders.delete(id); else expandedFolders.add(id);
        goDeckKeepScroll();
      }
    } else {
      if(type === 'group') { openGrp(sub, id); } else { goChapter(id); }
    }
  };
  
  const onPointerCancel = () => {
    clearTimeout(longPressTimer);
    if(dragging) {
      if(dragData?.el) dragData.el.classList.remove('dragging-origin');
      clearDropTargets(); removeGhost(); l.classList.remove('scroll-lock');
    }
    dragging = false; dragData = null; dragStarted = false; pressedEl = null;
  };
  
  l.addEventListener('pointerdown', onPointerDown);
  l.addEventListener('pointermove', onPointerMove, {passive: false});
  l.addEventListener('pointerup', onPointerUp);
  l.addEventListener('pointercancel', onPointerCancel);
}

function openGrp(s,gid){ const g=findGrp(s,gid); if(g){State.virtualChapter=buildVirt(s,g);goChapter(State.virtualChapter.id)} }

D.addEventListener('pointerup', (e) => {
    if(!selectionMode) return;
    const deckItem = e.target.closest('.deck-item');
    const fab = e.target.closest('.fab-confirm, .fab-cancel');
    if(!deckItem && !fab) { exitSelectionMode(); }
});

function goChapter(id,push=true){
  safeCloseLB(); Media.revokeAll(); clearMathCache(); if(push)Nav.push(); State.view='chapter'; State.chapterId=id; const c=getCh(id); if(!c){Nav.back();return} setTop({title:c.title}); updRevBar(c); hideRevAct(); const k=c.stats.gradeCounts||getLive(c), sel=c.filters.grades, v=$('#view');
  const dailyCalc = getDailyGoalCalc(c);
  const last7=getLastN(c,7), lbls7=getLbls(7), max7=M.max(1,...last7);
  v.innerHTML=`<div class="card" style="flex:1;display:flex;flex-direction:column;overflow-y:auto;min-height:0"><div class="section-title">${c.virtual?c.description:(getEmoji(c.title)?getEmoji(c.title)+' ':'')+'Statistiques'}</div><div class="stats-row"><div class="chart-wrap"><canvas id="gradeChart" width="140" height="140"></canvas></div><div class="bar7-side"><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.3px;margin-bottom:2px">7 derniers jours</div>${last7.map((val,i)=>`<div class="bar7-row" data-day="${dayKeyIdx(7,i)}"><div class="bar7-label">${lbls7[i].substring(0,3)}</div><div class="bar7-track"><div class="bar7-fill" style="width:${max7?(val/max7*100):0}%"></div></div><div class="bar7-val">${val}</div></div>`).join('')}</div></div><div class="legend" id="legend">${GRADES.map(x=>`<div class="legend-item ${sel[x]?'':'inactive'}" data-key="${x}"><span class="dot ${GC[x]}"></span><span style="flex:1">${x[0].toUpperCase()+x.slice(1)}</span><b class="count">${k[x]}</b></div>`).join('')}</div><div class="stats-grid mt8"><div class="stat-card"><div class="stat-val">${k.unseen}</div><div class="stat-lbl">Non vues</div></div><div class="stat-card"><div class="stat-val">${c.cards.length}</div><div class="stat-lbl">Total</div></div><div class="stat-card"><div class="stat-val">${getTod(c)}</div><div class="stat-lbl">Aujourd'hui</div></div><div class="stat-card"><div class="stat-val">${getStreak(c)}j</div><div class="stat-lbl">🔥 Streak</div></div><div class="stat-card"><div class="stat-val">${getSucc(c)}%</div><div class="stat-lbl">Réussite</div></div><div class="stat-card"><div class="stat-val">${get7dAvgMs(c)?M.round(get7dAvgMs(c)/100)/10+'s':'—'}</div><div class="stat-lbl">Moy. 7j</div></div></div><div class="mt8" style="padding:10px;background:var(--surface);border:1px solid var(--border);border-radius:10px;"><div style="display:flex;align-items:center;justify-content:space-between;"><span style="font-size:13px;font-weight:bold;color:var(--muted)">Date Limite:</span><input type="date" id="deadlineInput" class="input" style="width:auto;padding:4px 8px;" value="${c.deadline||''}"></div>${dailyCalc?`<div class="mt6" style="font-size:13px;color:var(--primary);display:flex;justify-content:space-between"><span>Objectif fixé: <b>${c._goalCache?.size||dailyCalc.val}</b>/jour</span><span>Reste: <b>${cntAv(c)}</b> dispo</span></div>`:''}</div></div>`;
  drawChart('gradeChart',k,sel); $('#gradeChart').onclick=e=>hChartClk(e,'gradeChart',c); $$('.legend-item').forEach(el=>el.onclick=()=>updFilt(c,el.dataset.key)); $$('.bar7-row').forEach(el=>{el.onclick=()=>goDaily(c.id,el.dataset.day)});

// LIGNE À AJOUTER ICI :
$('#deadlineInput').onchange = (e) => { const val = e.target.value; if (c.virtual && c._groupId) { const g = findGrp(getSub(), c._groupId); if (g) g.deadline = val; } else { c.deadline = val; } debouncedSave(); if(typeof FireSync!=='undefined'&&FireSync.isConnected)FireSync.pushToCloud(); goChapter(c.id, false); };

botAct.style.gridTemplateColumns=''; botAct.innerHTML=`<button class="action btn" id="cardsBtn">Cartes</button><button class="action btn" id="settingsBtn">Paramètres</button>`; $('#cardsBtn').onclick=()=>goCards(State.chapterId); $('#settingsBtn').onclick=()=>openSet(State.chapterId);
      botAct.style.gridTemplateColumns=''; botAct.innerHTML=`<button class="action btn" id="cardsBtn">Cartes</button><button class="action btn" id="settingsBtn">Paramètres</button>`; $('#cardsBtn').onclick=()=>goCards(State.chapterId); $('#settingsBtn').onclick=()=>openSet(State.chapterId);
  if(isMathChapter()){const det=data.app.prefs.mathDetail;botAct.innerHTML=`<button class="action btn" id="cb2">Cartes</button><button class="action btn ${det?'btn--primary':''}" id="db2">${det?'✓ ':''}Détail</button><button class="action btn" id="sb2">Paramètres</button>`;botAct.style.gridTemplateColumns='1fr 1fr 1fr';$('#cb2').onclick=()=>goCards(State.chapterId);$('#sb2').onclick=()=>openSet(State.chapterId);$('#db2').onclick=()=>{data.app.prefs.mathDetail=!data.app.prefs.mathDetail;saveData();goChapter(c.id,false)};}
}
function updRevBar(c){ const n=cntAv(c); setBot({actions:!0,revision:!0,sz:c.settings.sessionSize,en:c.cards.length>0,av:n,cid:c.id}) }

async function goCards(cid,push=true){
  safeCloseLB(); Media.revokeAll(); if(push)Nav.push(); State.view='cards'; State.chapterId=cid; 
  const c=getCh(cid), pool=c.cards.filter(x=>c.filters.grades[x.grade||'unseen']), v=$('#view'); 
  setTop({title:`${c.title} • Cartes`}); setBot({actions:!1,revision:!1}); hideRevAct();
  v.innerHTML=`<div style="flex:1;display:flex;flex-direction:column;min-height:0"><div style="flex-shrink:0"><div class="section-title">Cartes (${pool.length})</div><div style="margin-bottom:10px"><input type="text" id="cardSearch" class="input" placeholder="Rechercher..." autocomplete="off" spellcheck="false"></div></div><div id="cardsGrid" class="scroll-y" style="flex:1;min-height:0;padding-right:4px"><div class="cards-grid" id="gridCont"></div></div></div>`;

  const renderCards = async (q='') => {
    const norm = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""), cleanQ = norm(q);
    let filtered = [];
    if (!cleanQ) { filtered = pool; } else {
        const scored = pool.map(x => {
            const {f,b} = getSides(x,c); const tf = norm(f); const tb = norm(b);
            const fStart = tf.startsWith(cleanQ), bStart = tb.startsWith(cleanQ), fIn = tf.includes(cleanQ), bIn = tb.includes(cleanQ);
            if (!fIn && !bIn) return null;
            let score = 2; let len = 100000; 
            if (fStart || bStart) { score = 1; len = Math.min(fStart ? tf.length : 100000, bStart ? tb.length : 100000); } else { score = 2; len = Math.min(fIn ? tf.length : 100000, bIn ? tb.length : 100000); }
            return { card: x, score, len };
        }).filter(x => x !== null);
        scored.sort((a, b) => { if (a.score !== b.score) return a.score - b.score; return a.len - b.len; });
        filtered = scored.map(s => s.card);
    }
    const grid = $('#gridCont'); grid.innerHTML = '';
    if(filtered.length === 0) { grid.innerHTML = `<div class="muted center" style="grid-column:1/-1;padding:20px">Aucune carte trouvée.</div>`; } 
    else {
       filtered.forEach(x => {
          const {f,b} = getSides(x,c), el = D.createElement('div');
          el.className = `card-block grade-${x.grade||'unseen'}`; el.dataset.id = x.id;
          const msC=getMathSimple(x), bContent=(!data.app.prefs.mathDetail&&msC)?formatText(msC):formatText(b);
          el.innerHTML = `<div class="term">${formatText(f)}</div><div class="definition">${bContent}</div>${x.avgMs?`<div class="cb-time">${fmtDur(x.avgMs)}</div>`:''}`;
          grid.appendChild(el);
       });
    }
    await Media.resolve(grid); await tsLat(grid);
  };
  await renderCards(); 
  $('#cardSearch').oninput = (e) => renderCards(e.target.value);
  $('#cardsGrid').onclick=e=>{ const b=e.target.closest('.card-block'); if(b){ $$('.card-block').forEach(x=>{if(x!==b)x.classList.remove('flipped')}); b.classList.toggle('flipped'); } };
}

async function goDaily(cid,k,push=true){
  safeCloseLB(); Media.revokeAll(); if(push)Nav.push(); State.view='daily'; State.chapterId=cid; State.dailyKey=k; const c=getCh(cid), sub=getSub(); setTop({title:`Activité • ${fmtDayFR(k)}`}); setBot({actions:!1,revision:!1});
  const log=c.virtual?(findGrp(sub,c._groupId)?getLogGrp(sub,findGrp(sub,c._groupId),k):[]):(c.stats.dailyLog[k]||[]), v=$('#view'); if(!log.length){v.innerHTML=`<div class="card"><div class="section-title">Activité ${fmtDayFR(k)}</div><div class="muted">Aucune donnée.</div></div>`;return}
  log.sort((a,b)=>a.ts-b.ts); const byC=new Map(); for(const e of log){const cur=byC.get(e.cardId)||{f:e.prev,l:e.next,ts:e.ts,lts:e.ts,_c:e._chapId};if(e.ts>cur.lts){cur.l=e.next;cur.lts=e.ts}byC.set(e.cardId,cur)}
  const rows=[...byC].map(([id,i])=>{const ch=c.virtual?_real(i._c):c,card=ch.cards.find(x=>x.id===id);return card?{t:formatText(getSides(card,ch).f),d:formatText(getSides(card,ch).b),b:i.f,a:i.l}:null}).filter(Boolean);
  v.innerHTML=`<div class="card" style="flex:1;display:flex;flex-direction:column;min-height:0"><div class="section-title">Activité ${fmtDayFR(k)}</div><div id="dayL" class="scroll-y" style="flex:1"><div class="list">${rows.map(r=>`<div class="grid2"><div class="card-block grade-${r.b}"><div class="term">${r.t}</div><div class="definition">${r.d}</div></div><div class="card-block grade-${r.a}"><div class="term">${r.t}</div><div class="definition">${r.d}</div></div></div>`).join('')}</div></div></div>`;
  await Media.resolve(v); await tsLat(v); $('#dayL').onclick=e=>{const b=e.target.closest('.card-block');if(b)b.classList.toggle('flipped')}
}
function getLogGrp(s,g,k){ return g.chapIds.flatMap(cid=>{const ch=s.chapters.find(c=>c.id===cid);return(ch?.stats?.dailyLog?.[k]||[]).map(e=>({...e,_chapId:cid}))}) }

function goReview(push=true){ safeCloseLB(); Media.revokeAll(); if(push)Nav.push(); State.view='review'; setTop({title:'Révision'}); setBot({actions:!1,revision:!0}); $('#revisionBar').style.display='none'; $('#reviewActionsBar').style.display='block'; $('#app').classList.toggle('focus-mode', data.app.prefs.focusMode); renRev() }

function renRev(){
  const v=$('#view'), r=State.review, {card,chap}=getCur(), idx=r.index+1, tot=r.queue.length, {f,b}=getSides(card,chap), ff=chap.settings.reviewOrder!=='back-first';
  const ms=getMathSimple(card), fT=formatText(f), bT=(!data.app.prefs.mathDetail&&ms)?formatText(ms):formatText(b), progress=((r.index)/tot)*100;
  const undoBtn = r.history.length ? `<button id="undoBtn" style="background:0 0;border:0;color:var(--muted);font-size:18px;padding:0 8px;cursor:pointer">↺</button>` : '';
  
  v.innerHTML=`<div class="review-wrap">
    <div class="progress-bar" style="width:${progress}%"></div>
    <div class="review-top"><div style="display:flex;align-items:center">${undoBtn} ${r.mode==='multi'?'Multi • '+chap.title:chap.title}</div><div>${idx} / ${tot}</div></div>
    <div class="review-card"><div class="review-scroller">${!r.flipped ? `<div class="term" data-face="${ff?'front':'back'}">${fT}</div>` : `<div class="stack"><div class="term" data-face="front">${fT}</div><div class="definition" data-face="back" style="margin-top:20px;padding-top:20px;border-top:1px dashed var(--border)">${bT}</div></div>`}</div></div>
  </div>`;
  
  const scroller = v.querySelector('.review-scroller');
  const finishSetup = () => { Media.resolve(v); initGest(); bindSwipeNav(); };
  if(scroller) tsLat(scroller).then(finishSetup); else finishSetup();
  if(r.history.length) $('#undoBtn').onclick = undoRev; 
  
  let lastTap = 0;
  $('.review-scroller').addEventListener('click', e => {
    if(e.target.closest('img')) return;
    const now = Date.now();
    if(now - lastTap < 300 && !r.flipped) { haptic('light'); r.flipped = true; renRev(); }
    lastTap = now;
  });

  const bar=$('#reviewActionsBar');
  if(!r.flipped){
      bar.innerHTML=`<button class="btn btn--solid btn--primary" id="flipBtn">Retourner</button>`;
      $('#flipBtn').onclick=()=>{haptic('light');r.flipped=!0;renRev()}
  } else {
      bar.innerHTML=`<div class="row-4">${['echec','difficile','bien','facile'].map(g=>`<button class="btn ${GB[g]}" id="g_${g}">${g}</button>`).join('')}</div>`;
      ['echec','difficile','bien','facile'].forEach(g=>$('#g_'+g).onclick=()=>subG(g))
  }
}

function subG(nxt){
  const r=State.review, now=Date.now(), {card,chap}=getCur(); if(!card||!chap){goDeck(!1);return}
  haptic(nxt === 'facile' ? 'success' : nxt === 'echec' ? 'error' : 'light'); 

  r.history.push({ idx: r.index, cardState: deepClone(card), statsState: deepClone(chap.stats), ansIdx: r.answers.length });
  const ms=M.max(0,now-(r.cardStart||now)), prev=card.grade||'unseen', wZ=!chap.stats.gradeCounts[nxt];
  card.grade=nxt; syncG(chap); card.perfEma=(1-.3)*(card.perfEma??.5)+.3*(nxt==='facile'?1:nxt==='bien'?0.75:nxt==='difficile'?0.35:0);
  schNx(card,nxt,now); card.lastReviewed=now; card.lastMs=ms; card.avgMs=card.avgMs?M.round(card.avgMs*.7+ms*.3):ms; card.timesReviewed++;
  if(isSucc(nxt))card.successes++;else card.failures++; chap.stats.totalReviews++; const k=todayKey();
  chap.stats.dailyReviews[k]=(chap.stats.dailyReviews[k]||0)+1; chap.stats.dailyDurMs[k]=(chap.stats.dailyDurMs[k]||0)+ms; chap.stats.dailyDurCount[k]=(chap.stats.dailyDurCount[k]||0)+1;
  const dc=chap.stats.dailyChanges[k]||{changed:0,total:0}; dc.total++; if(prev!==nxt)dc.changed++; chap.stats.dailyChanges[k]=dc;
  (chap.stats.dailyLog[k]=chap.stats.dailyLog[k]||[]).push({cardId:card.id,prev,next:nxt,ms,ts:now}); if(wZ&&nxt!=='unseen')chap.filters.grades[nxt]=!0;
  r.answers.push({cardId:card.id,prev,next:nxt,ms});
    if(r.index<r.queue.length-1){r.index++;r.flipped=!1;r.cardStart=Date.now();debouncedSave();if(typeof FireSync!=='undefined'&&FireSync.isConnected)FireSync.scheduleAutoSync();renRev()}else{r.end=Date.now();debouncedSave();if(typeof FireSync!=='undefined'&&FireSync.isConnected)FireSync.pushToCloud();goRecap(!1)}
}

function goRecap(push=true){
  safeCloseLB(); Media.revokeAll(); if(push)Nav.push(); State.view='recap'; const c=getCh(State.review.chapterId)||State.virtualChapter||getCh(State.review.multiChaps[0]); setTop({title:'Récapitulatif'}); setBot({actions:!1,revision:!1}); hideRevAct();
  const dur=(State.review.answers||[]).reduce((s,a)=>s+(a.ms||0),0), n=State.review.answers.length;
  $('#view').innerHTML=`<div class="card recap" style="flex:1"><div><h2>Récapitulatif</h2><div class="subtitle">${c.title}</div></div><div class="grid2"><div class="stat"><div class="label">Moy. 7j</div><div class="val">${get7dAvg(c)}</div></div><div class="stat"><div class="label">Changement</div><div class="val">${getTodCh(c).total>0?M.round(getTodCh(c).changed/getTodCh(c).total*100):0}%</div></div><div class="stat"><div class="label">Fait</div><div class="val">${getTod(c)}</div></div></div><div class="grid2"><div class="stat"><div class="label">Session</div><div class="val">${n}</div></div><div class="stat"><div class="label">Durée</div><div class="val">${fmtDur(dur)}</div></div></div><div class="cta"><button class="btn btn--solid btn--primary" id="contBtn">Continuer</button></div></div>`;
  $('#contBtn').onclick=()=>startRev(c.id,!1,true);
  // Sync pending from another device during review
  if(window._pendingSync && typeof FireSync!=='undefined' && FireSync.isConnected){
    window._pendingSync=false;
    FireSync.pullFromCloud(true);
  }
}

function continueOrNew(cid,queue,mode,push,isCont,extras={}){
  if(isCont&&State.review){State.review.queue.push(...queue);State.review.index++;State.review.flipped=!1;State.review.cardStart=Date.now();State.review.end=null}
  else State.review={chapterId:cid,queue,index:0,flipped:!1,answers:[],history:[],start:Date.now(),end:null,cardStart:Date.now(),...extras};
  goReview(push)
}

function startRev(cid,push=true,isCont=false){
  if(!cid)return;const c=getCh(cid);
  if(c.virtual&&c._ids)return startRevMulti(c._ids,c.id,c.filters,push,isCont);
  if(c.deadline){const ds=getDayStart();if(!c._goalCache||c._goalCache.day!==ds){const calc=getDailyGoalCalc(c);c._goalCache={day:ds,size:calc?.val||10,pool:calc?.pool||0}}c.settings.sessionSize=c._goalCache.size}
  let pool=c.cards.filter(x=>c.filters.grades[x.grade||'unseen']);
  if(isCont&&State.review?.queue){const seen=new Set(State.review.queue);pool=pool.filter(x=>!seen.has(x.id))}
  if(!pool.length){alert('Plus de cartes disponibles dans ce filtre.');return}
  c.lastUsed=Date.now();saveData();
  continueOrNew(cid,bldQ(c,pool,c.settings.sessionSize).map(x=>x.id),null,push,isCont)
}

function startRevMulti(ids,vid,flt,push=true,isCont=false){
  const all=ids.map(_real).filter(Boolean),pool=[];
  const seen=isCont&&State.review?new Set(State.review.queue.map(i=>i.cardId)):new Set();
  all.forEach(ch=>ch.cards.forEach(c=>{if(flt.grades[c.grade||'unseen']&&!seen.has(c.id))pool.push({chapId:ch.id,card:c})}));
  if(!pool.length){alert('Plus de cartes disponibles.');return}
  const wt={unseen:6,echec:5,difficile:3.5,bien:2,facile:1};
  const scored=pool.map(i=>{const g=i.card.grade||'unseen',base=wt[g]||1,due=i.card.dueAt>0?(Date.now()-i.card.dueAt>0?1+M.min(3,(Date.now()-i.card.dueAt)/864e5):.85):1.15;return{chapId:i.chapId,cardId:i.card.id,w:base*due*(1+(1-(i.card.perfEma||.5))*1.6)*(1+M.min(2,(i.card.avgMs||0)/3000))*(.9+M.random()*.2)}}).sort((a,b)=>b.w-a.w);
  const sz=M.round(all.reduce((s,c)=>s+(c.settings.sessionSize||10),0)/all.length)||10;
  if(vid.startsWith('group-')){const g=findGrp(getSub(),vid.replace('group-',''));if(g){g.lastUsed=Date.now();saveData()}}
  continueOrNew(vid,scored.slice(0,sz),null,push,isCont,{mode:'multi',multiChaps:ids.slice()})
}

function getCur(){ const r=State.review; if(!r||r.index<0||r.index>=r.queue.length)return{card:null,chap:null}; if(r.mode==='multi'){const i=r.queue[r.index];if(!i)return{card:null,chap:null};const ch=_real(i.chapId);if(!ch)return{card:null,chap:null};return{card:ch.cards.find(x=>x.id===i.cardId)||null,chap:ch}}else{const ch=getCh(r.chapterId);if(!ch)return{card:null,chap:null};return{card:ch.cards.find(x=>x.id===r.queue[r.index])||null,chap:ch}} }

function undoRev(){
  const r = State.review; if(!r.history.length) return;
  const snap = r.history.pop(); r.index = snap.idx;
  const {card, chap} = getCur(); Object.assign(card, snap.cardState); chap.stats = snap.statsState;
  if(r.answers.length > snap.ansIdx) r.answers.splice(snap.ansIdx);
  r.flipped = false; 
  saveData(); renRev();
}

const getPreviewTxt=()=>{const s=data.subjects.find(s=>s.title.toLowerCase().includes('physique'))||data.subjects[0],a=(s?.chapters||[]).flatMap(c=>c.cards).filter(c=>!c.front.includes('<img')&&!c.back.includes('<img'));if(!a.length)return{f:"La constante de Planck",b:"h = 6,626 x 10⁻³⁴ J.s"};const r=a[M.floor(M.random()*a.length)];return{f:r.front.replace(/<br>/g,' '),b:r.back.replace(/<br>/g,' ')}};

function openSet(cid,push=true){
  safeCloseLB(); Media.revokeAll(); if(!cid)cid=State.chapterId; const c=getCh(cid); if(!c)return; if(push)Nav.push(); State.view='settings'; setTop({title:'Paramètres'}); setBot({actions:!1}); hideRevAct(); const v=$('#view'), P=data.app.prefs;
  const isDark = data.app.theme==='dark'; const prev = getPreviewTxt();
  
  const sCtrl=(sId,subId,addId,valId,val,sfx='')=>`<div class="s-control"><button class="step-btn" id="${subId}">-</button><div class="s-slider-container" style="margin:0 10px;flex:1"><input type="range" class="s-slider" id="${sId}" min="12" max="72" value="${val}"></div><button class="step-btn" id="${addId}">+</button></div>`;
  const swatches=['indigo','blue','teal','emerald','rose','amber','violet'].map(x=>`<button class="swatch ${P.accent===x?'is-active':''}" data-accent="${x}" style="--sw:var(--${x==='indigo'?'primary':x})"></button>`).join('');
  const sect=(t,body)=>`<div class="settings-section"><div class="section-title">${t}</div>${body}</div>`;
  v.innerHTML=`<div class="settings-page scroll-y" style="flex:1">
    <div class="settings-hero">Paramètres</div>
    ${sect('Chapitre',
      sRow('rowTitle','✏️','Nom du chapitre',c.title,sChev,1)+
      sRow('rowEmoji','😊','Emoji','',sVal(c.emoji||getEmoji(c.title)||'Aucun')+sChev,1)+
      sRow('rowLang','🔄','Ordre des langues',c.settings.langSwap?'Verso → Recto':'Recto → Verso',sChev,1)
    )}
    ${sect('Apparence',
      sRow('rowTheme','🌓','Mode sombre','',sToggle(isDark),1)+
      sRow('rowFocus','🎯','Mode Immersion (Zen)','Interface invisible en révision',sToggle(P.focusMode),1)+
      sRow('','🎨','Couleur','',`<div class="swatches">${swatches}</div>`)
    )}
    ${sect('Typographie (Aperçu direct)',
      `<div class="preview-box"><div class="preview-recto" id="preT"></div><div class="preview-verso" id="preD"></div></div>`+
      sRow('','Aa','Taille Recto','',sVal(P.fsTerm+'px').replace('s-value','s-value" id="valT'))+sCtrl('sldT','subT','addT','valT',P.fsTerm)+
      sRow('','Aa','Taille Verso','',sVal(P.fsDef+'px').replace('s-value','s-value" id="valD'))+sCtrl('sldD','subD','addD','valD',P.fsDef)
    )}
    ${sect('Session',
      sRow('','📚','Taille session','Nombre de cartes par révision',sVal(c.settings.sessionSize).replace('s-value','s-value" id="valS'))+sCtrl('sldS','subS','addS','valS',c.settings.sessionSize)
    )}
     ${sect('Données',
      sRow('rowExp','📤','Exporter','Sauvegarder toutes les données',sChev,1)+
      sRow('rowImp','📥','Importer','Restaurer une sauvegarde',sChev,1)+
      '<input type="file" id="impF" class="hidden">'
    )}
    ${sect('Zone dangereuse',
      sRow('rowRstC','🔄','Réinitialiser ce chapitre','Remettre toutes les cartes à "Non vu"','',1)+
      `<div class="settings-row" id="rowRstA"><div class="s-icon danger">💥</div><div class="s-label"><div class="s-title">Réinitialiser l'application</div><div class="s-sub">Supprimer toutes les données</div></div></div>`
    )}
    <div class="settings-footer">Flashcards v${APP_VER}<br><span style="opacity:.7;font-size:.9em">JB. C</span></div></div>`;

  const preBox = v.querySelector('.preview-box');
  $('#preT').innerHTML = formatText(prev.f); $('#preD').innerHTML = formatText(prev.b); Media.resolve(preBox); tsLat(preBox);
  const setupControl = (sldId, subId, addId, valId, obj, prop, suffix = '', cssVar = null, fontPrev = null) => {
      const sld = $(sldId), sub = $(subId), add = $(addId), val = $(valId), pre = fontPrev ? $(fontPrev) : null;
      const update = (v) => {
          v = parseInt(v); const min = parseInt(sld.min), max = parseInt(sld.max); if(v < min) v = min; if(v > max) v = max;
          obj[prop] = v; sld.value = v; val.textContent = v + suffix;
          if(cssVar) D.documentElement.style.setProperty(cssVar, v + 'px'); if(pre) pre.style.fontSize = v + 'px';
      };
      sld.oninput = () => update(sld.value); sld.onchange = () => { debouncedSave(); haptic('light'); };
      sub.onclick = (e) => { e.stopPropagation(); update(parseInt(sld.value) - 1); debouncedSave(); haptic('light'); };
      add.onclick = (e) => { e.stopPropagation(); update(parseInt(sld.value) + 1); debouncedSave(); haptic('light'); };
  };

  setupControl('#sldT', '#subT', '#addT', '#valT', P, 'fsTerm', 'px', '--fs-term', '#preT');
  setupControl('#sldD', '#subD', '#addD', '#valD', P, 'fsDef', 'px', '--fs-def', '#preD');
  setupControl('#sldS', '#subS', '#addS', '#valS', c.settings, 'sessionSize', '');

    const cloudSave=()=>{if(typeof FireSync!=='undefined'&&FireSync.isConnected)FireSync.pushToCloud()};
  $('#rowTitle').onclick=()=>{ const t=prompt('Nouveau titre:', c.title); if(t && t.trim()){ const newTitle = t.trim(); if(c.virtual && c._groupId){ const g = findGrp(getSub(), c._groupId); if(g) g.title = newTitle; c.title = newTitle; } else { const real = _real(c.id); if(real) real.title = newTitle; c.title = newTitle; } updChDesc(c); debouncedSave(); cloudSave(); openSet(cid, !1); } };
    $('#rowEmoji').onclick=()=>{ const emojiActuel = c.emoji || getEmoji(c.title) || ''; const e = prompt('Emoji (laissez vide pour l\'émoji par défaut) :', emojiActuel); if (e !== null) { const newEmoji = e.trim(); if (c.virtual && c._groupId) { const g = findGrp(getSub(), c._groupId); if (g) g.emoji = newEmoji; c.emoji = newEmoji; } else { const real = _real(c.id); if (real) real.emoji = newEmoji; c.emoji = newEmoji; } updChDesc(c); debouncedSave(); cloudSave(); openSet(cid, !1); } };
    $('#rowLang').onclick=()=>{c.settings.langSwap=!c.settings.langSwap;debouncedSave();cloudSave();openSet(cid,!1)};
  $('#rowTheme').onclick=()=>{data.app.theme=isDark?'light':'dark';debouncedSave();cloudSave();applyTh();openSet(cid,!1)};
  $('#rowFocus').onclick=()=>{P.focusMode=!P.focusMode;debouncedSave();cloudSave();openSet(cid,!1)};
  $$('.swatch').forEach(b=>b.onclick=e=>{ e.stopPropagation(); P.accent=b.dataset.accent; debouncedSave(); applyUI(); $$('.swatch').forEach(x=>x.classList.toggle('is-active',x===b)); $$('.s-icon.dynamic').forEach(icon => { icon.style.background = `var(--primary)`; }); haptic('light'); });
  $('#rowExp').onclick=()=>{const a=D.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(data)],{type:'application/json'}));a.download=`flashcards-${dateKey(new Date())}.json`;a.click()};
  $('#rowImp').onclick=()=>$('#impF').click();
  $('#impF').onchange=async e=>{if(confirm("Écraser toutes les données ?")){data=JSON.parse(await e.target.files[0].text());upgrade();applyTh();applyUI();saveData();goDeck(!1)}};
  $('#rowRstC').onclick=()=>{if(confirm('Réinitialiser ce chapitre ?')){c.cards.forEach(x=>Object.assign(x,{grade:'unseen',timesReviewed:0,ef:2.5,intervalDays:0,dueAt:0,streak:0}));c.stats=mkStats(c.cards.length);saveData();cloudSave();openSet(cid,!1)}};
  $('#rowRstA').onclick=async()=>{if(confirm('⚠️ Supprimer TOUTES les données ?')){await Media.clearAll();LS.removeItem(KEY);location.reload()}};
}

function applyTh(){ D.documentElement.dataset.theme=data.app.theme }
function applyUI(){ const p=data.app.prefs; D.documentElement.style.setProperty('--fs-term',p.fsTerm+'px'); D.documentElement.style.setProperty('--fs-def',p.fsDef+'px'); const pl={indigo:['#6366f1','#5457e6'],blue:['#3b82f6','#2563eb'],teal:['#14b8a6','#0d9488'],emerald:['#10b981','#059669'],rose:['#f43f5e','#e11d48'],amber:['#f59e0b','#d97706'],violet:['#8b5cf6','#7c3aed']}, c=pl[p.accent]||pl.indigo; D.documentElement.style.setProperty('--primary',c[0]); D.documentElement.style.setProperty('--primary-600',c[1]) }
function reconcile(){ const c=buildCanon(), o=data.subjects||[], oMap=Object.fromEntries(o.map(s=>[s.title,s])); data.subjects=c.map(x=>{const old=oMap[x.title]||{}, ocMap=Object.fromEntries((old.chapters||[]).map(c=>[c.title,c])); const chs=x.chapters.map(nc=>{const oc=ocMap[nc.title]; if(!oc)return nc; const cardMap=Object.fromEntries(oc.cards.map(c=>[extractId(c.id),c])); return{...nc,stats:{...oc.stats},cards:nc.cards.map(cd=>{const oldC=cardMap[extractId(cd.id)]; return oldC?{...cd,grade:oldC.grade,ef:oldC.ef,intervalDays:oldC.intervalDays,dueAt:oldC.dueAt}:cd})}}); return{...x,chapters:chs,groups:old.groups||[]}}); o.forEach(x=>{if(!data.subjects.find(z=>z.id===x.id))data.subjects.push(x)}); if(!data.subjects.find(x=>x.id===data.app.currentSubjectId))data.app.currentSubjectId=data.subjects[0].id }

function upgrade(){ 
  if(!data.app) data.app = {theme:'dark'}; 
  data.app.prefs = {fsTerm:22, fsDef:24, accent:'indigo', radius:14, ...(data.app.prefs||{})}; 
  if(data.app.prefs.mathDetail === undefined) data.app.prefs.mathDetail = false;
if(!data.app.prefs.hasOwnProperty('mathDetail')) data.app.prefs.mathDetail = false;
  data.subjects.forEach(s => {
    ensGrps(s).forEach(g => {
      if(!g.childGroupIds) g.childGroupIds = [];
      if(!g.parentGroupId) g.parentGroupId = null;
      if(!g.chapIds) g.chapIds = [];
    });
    valGrps(s); 
    s.emoji = s.emoji || ''; 
    s.chapters.forEach(c => {
      c.emoji = c.emoji || ''; 
      updChDesc(c); 
      c.stats.dailyLog = c.stats.dailyLog || {}; 
      syncG(c);
    });
  });
  ensureMathGrouped();
}

function ensureMathGrouped(){
  const mathSub = data.subjects.find(s => s.title.toLowerCase() === 'maths');
  if(!mathSub || mathSub.chapters.length < 2) return;
  
  const isExcluded = c => /travail/i.test(c.title);
  const courseChaps = mathSub.chapters.filter(c => !isExcluded(c));
  
  const grps = ensGrps(mathSub);
  const existing = grps.find(g => g.id === 'g-math-all');
  
  if(existing) {
    const alreadyIn = new Set();
    getAllChapIdsRecursive(mathSub, 'g-math-all').forEach(id => alreadyIn.add(id));
    for(const c of courseChaps) {
      if(!alreadyIn.has(c.id)) existing.chapIds.push(c.id);
    }
    const excludedIds = new Set(mathSub.chapters.filter(isExcluded).map(c => c.id));
    existing.chapIds = existing.chapIds.filter(id => !excludedIds.has(id));
  } else {
    grps.push({
      id: 'g-math-all',
      chapIds: courseChaps.map(c => c.id),
      childGroupIds: [],
      parentGroupId: null,
      createdAt: Date.now(),
      title: 'Résumé de Cours',
      emoji: '📖',
      lastUsed: Date.now()
    });
  }
  valGrps(mathSub);
}
/* === QCM MODE === */
const QCM_CACHE_KEY='qcm_cache_v2';
const getQCMCache=()=>{try{return JSON.parse(LS.getItem(QCM_CACHE_KEY)||'{}')}catch{return{}}};
const setQCMCache=c=>{const k=Object.keys(c);if(k.length>500)k.slice(0,k.length-400).forEach(x=>delete c[x]);try{LS.setItem(QCM_CACHE_KEY,JSON.stringify(c))}catch{}};

function cleanForPrompt(html){
  return(html||'').replace(/<br\s*\/?>/gi,'\n').replace(/<img[^>]*>/gi,'').replace(/<[^>]+>/g,'')
    .replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&nbsp;/g,' ')
    .trim().substring(0,500);
}

const GEMINI_KEY='AIzaSyDkS9G1fCtVaR1ULvaDP2osbvc6JiNt0rE';

async function callGeminiQCM(apiKey,cards){
  const prompt=`Tu es un professeur de prépa. Pour chaque flashcard, génère exactement 3 mauvaises réponses plausibles pour un QCM.

Règles STRICTES:
- Même format que la bonne réponse (si LaTeX avec $..$ ou \\(..\\), les mauvaises aussi)
- CRÉDIBLES: un bon étudiant pourrait hésiter
- Liées au même sujet et chapitre
- Longueur similaire à la bonne réponse
- JAMAIS répéter la bonne réponse
- Si c'est une formule, donne des formules avec des erreurs subtiles (mauvais signe, mauvais exposant, variable inversée...)
- Si c'est une définition, donne des définitions de concepts proches mais différents

Réponds UNIQUEMENT en JSON valide, sans markdown, sans backticks:
[{"id":"...","wrong":["...","...","..."]}]

Flashcards:
${cards.map(c=>`ID: ${c.id}\nQ: ${c.q}\nR: ${c.a}`).join('\n---\n')}`;

  const resp=await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash:generateContent?key='+GEMINI_KEY,
    {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
      contents:[{parts:[{text:prompt}]}],
      generationConfig:{temperature:0.9,maxOutputTokens:4096}
    })}
  );
  if(!resp.ok)throw new Error('API '+resp.status);
  const d=await resp.json();
  const txt=d.candidates?.[0]?.content?.parts?.[0]?.text||'';
  const m=txt.match(/\[[\s\S]*\]/);
  if(!m)throw new Error('No JSON');
  return JSON.parse(m[0]);
}

function getRandomDistractors(cardId,reviewState){
  let allCards;
  if(reviewState.mode==='multi'&&reviewState.multiChaps){
    allCards=reviewState.multiChaps.flatMap(cid=>{const ch=_real(cid);return ch?ch.cards.map(c=>({card:c,chap:ch})):[]});
  }else{
    const ch=getCh(reviewState.chapterId);
    allCards=ch?ch.cards.map(c=>({card:c,chap:ch})):[];
  }
  const current=allCards.find(p=>p.card.id===cardId);
  if(!current)return[];
  const correctB=getSides(current.card,current.chap).b;
  const others=allCards.filter(p=>p.card.id!==cardId&&getSides(p.card,p.chap).b!==correctB);
  return[...others].sort(()=>M.random()-.5).slice(0,3).map(p=>getSides(p.card,p.chap).b);
}

async function generateQCMDistractors(queue,chapterId,mode,multiChaps){
  const apiKey=data.app.prefs?.geminiKey;
  const cache=getQCMCache();
  const result={};
  const toGenerate=[];

  for(const item of queue){
    let card,chap,cardId;
    if(mode==='multi'){cardId=item.cardId;chap=_real(item.chapId);card=chap?.cards.find(c=>c.id===cardId)}
    else{cardId=item;chap=getCh(chapterId);card=chap?.cards.find(c=>c.id===cardId)}
    if(!card||!chap)continue;
    if(cache[cardId]){result[cardId]=cache[cardId]}
    else{const{f,b}=getSides(card,chap);toGenerate.push({id:cardId,q:cleanForPrompt(f),a:cleanForPrompt(b)})}
  }

  if(toGenerate.length===0||!GEMINI_KEY)return result;

  try{
    for(let i=0;i<toGenerate.length;i+=10){
      const batch=toGenerate.slice(i,i+10);
      const aiResult=await callGeminiQCM(apiKey,batch);
      for(const item of aiResult){
        if(item.id&&Array.isArray(item.wrong)&&item.wrong.length>=3){
          result[item.id]=item.wrong.slice(0,3);
          cache[item.id]=item.wrong.slice(0,3);
        }
      }
    }
    setQCMCache(cache);
  }catch(e){console.warn('[QCM] Gemini failed:',e)}
  return result;
}

async function startQCM(cid){
  if(!cid)return;const c=getCh(cid);if(!c)return;

  let queue,mode=null,multiChaps=null;

  if(c.virtual&&c._ids){
    const all=c._ids.map(_real).filter(Boolean),pool=[];
    all.forEach(ch=>ch.cards.forEach(card=>{if(c.filters.grades[card.grade||'unseen'])pool.push({chapId:ch.id,card})}));
    if(pool.length<2){alert('Pas assez de cartes.');return}
    if(all.reduce((s,ch)=>s+ch.cards.length,0)<4){alert('Il faut au moins 4 cartes.');return}
    const wt={unseen:6,echec:5,difficile:3.5,bien:2,facile:1};
    const scored=pool.map(i=>({chapId:i.chapId,cardId:i.card.id,w:(wt[i.card.grade||'unseen']||1)*(.9+M.random()*.2)})).sort((a,b)=>b.w-a.w);
    const sz=M.round(all.reduce((s,ch)=>s+(ch.settings.sessionSize||10),0)/all.length)||10;
    if(cid.startsWith('group-')){const g=findGrp(getSub(),cid.replace('group-',''));if(g){g.lastUsed=Date.now();saveData()}}
    queue=scored.slice(0,sz);mode='multi';multiChaps=c._ids.slice();
  }else{
    const pool=c.cards.filter(x=>c.filters.grades[x.grade||'unseen']);
    if(pool.length<2){alert('Pas assez de cartes.');return}
    if(c.cards.length<4){alert('Il faut au moins 4 cartes.');return}
    c.lastUsed=Date.now();saveData();
    queue=bldQ(c,pool,c.settings.sessionSize).map(x=>x.id);
  }

  Nav.push();
  setTop({title:'QCM'});setBot({actions:!1,revision:!1});hideRevAct();
  $('#view').innerHTML='<div style="flex:1;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px"><div style="font-size:40px">🧠</div><div style="color:var(--muted);font-weight:700">Génération des questions...</div></div>';

  const distractors=await generateQCMDistractors(queue,cid,mode,multiChaps);

  State.review={
    chapterId:cid,queue,index:0,flipped:!1,answers:[],history:[],
    start:Date.now(),end:null,cardStart:Date.now(),
    isQCM:!0,qcmOptions:null,qcmAnswered:!1,qcmDistractors:distractors,
    ...(mode==='multi'?{mode:'multi',multiChaps}:{})
  };
  goReview(!1);
}

function renQCM(){
  const v=$('#view'),r=State.review,{card,chap}=getCur();
  if(!card||!chap){goDeck(!1);return}
  const idx=r.index+1,tot=r.queue.length,{f,b}=getSides(card,chap),fT=formatText(f),progress=(r.index/tot)*100;
  const undoBtn=r.history.length?'<button id="undoBtn" style="background:0 0;border:0;color:var(--muted);font-size:18px;padding:0 8px;cursor:pointer">↺</button>':'';
  const cardId=r.mode==='multi'?r.queue[r.index].cardId:r.queue[r.index];

  if(!r.qcmOptions){
    const aiWrong=r.qcmDistractors?.[cardId];
    if(aiWrong&&aiWrong.length>=3){
      r.qcmOptions=[
        {text:formatText(b),correct:!0},
        ...aiWrong.slice(0,3).map(w=>({text:formatText(w),correct:!1}))
      ].sort(()=>M.random()-.5);
    }else{
      const wrong=getRandomDistractors(cardId,r);
      r.qcmOptions=[
        {text:formatText(b),correct:!0},
        ...wrong.slice(0,3).map(w=>({text:formatText(w),correct:!1}))
      ].sort(()=>M.random()-.5);
    }
    r.qcmAnswered=!1;
  }

  const letters=['A','B','C','D'];
  v.innerHTML=`<div class="review-wrap">
    <div class="progress-bar" style="width:${progress}%"></div>
    <div class="review-top"><div style="display:flex;align-items:center">${undoBtn} QCM • ${chap.title}</div><div>${idx} / ${tot}</div></div>
    <div class="review-card">
      <div class="review-scroller qcm-scroller">
        <div class="term qcm-question">${fT}</div>
        <div class="qcm-options">${r.qcmOptions.map((opt,i)=>`<button class="qcm-option" data-idx="${i}"><span class="qcm-letter">${letters[i]}</span><span class="qcm-text">${opt.text}</span></button>`).join('')}</div>
      </div>
    </div>
  </div>`;

  $('#reviewActionsBar').style.display='none';
  $('#app').style.setProperty('--row-rev','0px');
  if(r.history.length&&$('#undoBtn'))$('#undoBtn').onclick=undoRev;
  $$('.qcm-option',v).forEach(btn=>{btn.onclick=()=>{if(!r.qcmAnswered)handleQCMAnswer(parseInt(btn.dataset.idx))}});
  Media.resolve(v);const scroller=v.querySelector('.review-scroller');if(scroller)tsLat(scroller);
}

function handleQCMAnswer(idx){
  const r=State.review;if(r.qcmAnswered)return;r.qcmAnswered=!0;
  const opt=r.qcmOptions[idx],isCorrect=opt.correct;
  $$('.qcm-option').forEach((btn,i)=>{
    btn.disabled=!0;
    if(r.qcmOptions[i].correct)btn.classList.add('qcm-correct');
    if(i===idx&&!isCorrect)btn.classList.add('qcm-wrong');
  });
  haptic(isCorrect?'success':'error');
  setTimeout(()=>{r.qcmOptions=null;r.qcmAnswered=!1;subG(isCorrect?'bien':'echec')},isCorrect?800:1500);
}
async function init(){
  Media.open();

  if(typeof FireSync !== 'undefined') {
    FireSync.initSyncButton();
  }

  try {
    const r = await fetch('math.md');
    if(r.ok) dataMATH = parseMathData(await r.text());
  } catch(e){ console.warn('math.md non trouvé, fallback vide'); }

  try {
    data = loadData();

    // ALWAYS try to pull from cloud on startup
    if(typeof FireSync !== 'undefined') {
      // Wait briefly for auth to resolve if not yet connected
      if(!FireSync.isConnected) {
        await new Promise(r => {
          let tries = 0;
          const check = () => {
            if(FireSync.isConnected || tries++ > 15) r();
            else setTimeout(check, 200);
          };
          check();
        });
      }
      if(FireSync.isConnected) {
        console.log('[Init] Pulling cloud data...');
        try { await FireSync.pullIfNewer(); } catch(e) { console.warn('[Init] Cloud pull failed:', e); }
      }
    }

    if(data.app?.version !== APP_VER){ reconcile(); data.app.version = APP_VER; typeof FireSync!=='undefined'&&FireSync.saveDataLocal ? FireSync.saveDataLocal() : saveData(); }
    pruneStats(); upgrade(); applyTh(); applyUI(); Nav.clear(); goDeck(!1);

    setInterval(saveData, 30000);
  } catch(e) {
    console.error('Init error, resetting:', e);
    localStorage.removeItem(KEY);
    data = loadData();
    upgrade(); applyTh(); applyUI(); Nav.clear(); goDeck(!1);
    setInterval(saveData, 30000);
  }
}

init();
