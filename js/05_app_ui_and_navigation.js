/*05_app_ui_and_navigation.js*/
/* --- UI STATE & ROUTING --- */
let selectionMode = false;
let selectedIds = new Set(); 
let expandedFolders = new Set(); 
let selectionContext = null; 

const Nav = {
  stack:[], scrollPos: 0,
  push(){ this.scrollPos = $('#dL')?.scrollTop||0; this.stack.push(deepClone({view:State.view,chapterId:State.chapterId,review:State.review,dailyKey:State.dailyKey,scrollPos:this.scrollPos,cardsMode:State.cardsMode,expandedFolders:[...expandedFolders]})) },
  back(){ 
    if(!this.stack.length) return false; 
    const p=this.stack.pop(); 
    State.virtualChapter=null; 
    State.view=p.view; State.chapterId=p.chapterId; State.review=p.review; State.dailyKey=p.dailyKey; State.cardsMode=p.cardsMode||null; 
    expandedFolders = new Set(p.expandedFolders ||[]);
    const savedScroll = p.scrollPos || 0;
    this.scrollPos = savedScroll;
    render(!1);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const scrollEl = $('#dL');
        if(scrollEl && savedScroll > 0) scrollEl.scrollTop = savedScroll;
      });
    });
    return true;
  },
  clear(){ this.stack=[]; this.scrollPos=0 }
};

const State = { view:'deck', chapterId:null, review:null, cardsIndex:0, dailyKey:null, virtualChapter:null, cardsMode:null, setTab:null };
/* _real() cherche d'abord dans la matière courante, puis dans TOUTES les
   matières : indispensable pour les révisions multi-chapitres qui traversent
   plusieurs matières (menu « Cartes » global, statistiques). */
const _real = id => {
  if(!id) return undefined;
  const here = getChs().find(c => c.id === id);
  if(here) return here;
  for(const s of (data?.subjects || [])){
    const c = (s.chapters || []).find(x => x.id === id);
    if(c) return c;
  }
  return undefined;
};
const getCh = id => (State.virtualChapter?.id === id) ? State.virtualChapter : _real(id);

function updFilt(ch,key){ let t=ch; if(ch.virtual&&ch._groupId){const g=findGrp(getSub(),ch._groupId);if(g){if(!g.filters)g.filters={grades:GRADE_FILTERS()};t=g}} togFilt(t,key); if(t!==ch)ch.filters=t.filters; saveData(); goChapter(ch.id,!1) }

// ✅ Ajout : Mise à jour du filtre par type (Maths)
function updTypeFilt(ch,key){
    let t=ch;
    if(ch.virtual&&ch._groupId){
        const g=findGrp(getSub(),ch._groupId);
        if(g){
            if(!g.filters) g.filters={grades:GRADE_FILTERS()};
            if(!g.filters.types) g.filters.types=MATH_TYPE_FILTERS();
            t=g;
        }
    }
    togTypeFilt(t,key);
    if(t!==ch) ch.filters=deepClone(t.filters);
    saveData();
    goChapter(ch.id,!1);
}

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
        const now = new Date(); now.setHours(0,0,0,0);
        const dp = item.deadline.split('-');
        const ddl = new Date(+dp[0], +dp[1] - 1, +dp[2]);
        ddl.setHours(0,0,0,0);
        const diff = (ddl - now) / 864e5; let urgency = 0;
        if (diff <= 0) urgency = 1; else if (diff <= 7) urgency = 1 - (diff / 7);
        if (urgency > 0) { const tR = 239, tG = 68, tB = 68; if (totalGraded === 0) { r = tR; g = tG; b = tB; a = 0.5 * urgency; } else { r = r * (1 - urgency) + tR * urgency; g = g * (1 - urgency) + tG * urgency; b = b * (1 - urgency) + tB * urgency; a = 0.25 + (0.25 * urgency); } }
    }
    if (a <= 0.01) return '';
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
}

function checkExpiredDates(list) {
    const now = new Date(); now.setHours(0,0,0,0); let changed = false;
    list.forEach(item => { if (item.deadline) {
      const dp = item.deadline.split('-');
      const ddl = new Date(+dp[0], +dp[1] - 1, +dp[2]);
      ddl.setHours(0,0,0,0);
      if (ddl < now) { item.deadline = null; changed = true; }
    } });
    return changed;
}

function getDailyGoalCalc(ch) {
    if(!ch.deadline) return null;
    const now = new Date(); now.setHours(0,0,0,0);
    const p = ch.deadline.split('-');
    const ddl = new Date(+p[0], +p[1] - 1, +p[2]);
    ddl.setHours(0,0,0,0);
    let days = Math.round((ddl - now) / 864e5) + 1;
    if (days <= 0) days = 1;
    const k = ch.stats.gradeCounts || getLive(ch);
    let pool = k.unseen + k.echec + k.difficile, label = "cartes (Mauvaises)";
    if (pool === 0) { pool = k.bien; label = "cartes (Bien)"; if (pool === 0) return { val: 0, text: "Objectif atteint !", pool: 0 }; }
    return { val: Math.ceil(pool / days), text: `${label} / jour`, pool: pool };
}

const backBtn=$('#backBtn'), titleEl=$('#title'), botAct=$('#bottomActions'), revBar=$('#revisionBar'), startBtn=$('#startReviewBtn');

function renSubMenu(){
  let m=$('#subjectMenu'); if(!m){m=D.createElement('div');m.id='subjectMenu';m.className='subject-menu';D.body.appendChild(m)}
  m.innerHTML=data.subjects.map(s=>`<div class="subject-item ${s.id===data.app.currentSubjectId?'is-current':''}" data-id="${s.id}">
      <span class="subj-emoji">${s.emoji || ''}</span>
      <span class="name">${s.title}</span>
      <span class="meta">${s.chapters?.length||0}</span>
      ${s.id===data.app.currentSubjectId?`<span class="check">${ico('check','ico--xs')}</span>`:''}
      <span class="subject-actions">
        <button class="btn btn--ghost btn--icon rs" title="Renommer" style="width:28px;min-height:28px;padding:0">${ico('pencil','ico--xs')}</button>
        ${!(s.chapters?.length)?`<button class="btn btn--ghost btn--icon ds" title="Supprimer" style="width:28px;min-height:28px;padding:0">${ico('trash','ico--xs')}</button>`:''}
      </span>
    </div>`).join('');

      $$('.subject-item',m).forEach(el=>{
    el.onclick=e=>{if(e.target.closest('button'))return;const id=el.dataset.id;if(id!==data.app.currentSubjectId){setSub(id);closeSubMenu();goDeck(!1)}else closeSubMenu();e.stopPropagation()};
    const r=el.querySelector('.rs'); if(r)r.onclick=e=>{e.stopPropagation();const id=el.dataset.id,s=data.subjects.find(x=>x.id===id),t=prompt('Nom:',s.title);if(t){renSub(id,t,prompt('Emoji:',s.emoji));renSubMenu();setTop({title:`Deck • ${getSub().title}`});goDeck(!1)}};
    const d=el.querySelector('.ds'); if(d)d.onclick=e=>{e.stopPropagation();const id=el.dataset.id;if(confirm('Supprimer ?')){data.subjects=data.subjects.filter(s=>s.id!==id);if(data.app.currentSubjectId===id)data.app.currentSubjectId=data.subjects[0]?.id;closeSubMenu();goDeck(!1);saveData()}}
    });
  
  // ✅ Bouton "Nouvelle matière" — ajouté une seule fois à la fin
  const addBtn = D.createElement('button');
  addBtn.className = 'add-row';
  addBtn.innerHTML = `${ico('plus')}<span>Nouvelle matière</span>`;
  addBtn.onclick = (e) => {
    e.stopPropagation();
    const title = prompt('Nom de la matière :');
    if(!title || !title.trim()) return;
    const emoji = prompt('Emoji (optionnel) :', '') || '';
    const newSub = { id: 'sub-' + slugify(title) + '-' + Date.now(), title: title.trim(), emoji: emoji.trim(), chapters: [], groups:[] };
    data.subjects.push(newSub);
    data.app.currentSubjectId = newSub.id;
    saveData();
    closeSubMenu();
    goDeck(false);
    toast('Matière créée !', 'success');
  };
  m.appendChild(addBtn);
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
    // ✅ Révision rapide depuis les stats / la liste globale des cartes
    if(State.review?.singleCardMode && State.review?.returnTo) {
      const kind = State.review.returnTo.kind;
      if(Nav.stack.length) Nav.stack.pop();
      State.review = null;
      $('#app').classList.remove('focus-mode');
      if(kind === 'stats') goStats(false);
      else if(kind === 'cards') goAllCards(false);
      else goDeck(false);
      return;
    }
    // ✅ Révision rapide → retour immédiat sans confirmation
    if(State.review?.singleCardMode && State.review?.returnToCards) {
      const ret = State.review.returnToCards;
      if(ret.chapterId.startsWith('group-')) {
        const gid = ret.chapterId.replace('group-', '');
        const sub = getSub();
        const g = findGrp(sub, gid);
        if(g) State.virtualChapter = buildVirt(sub, g);
      }
      if(Nav.stack.length) Nav.stack.pop();
      State.review = null;
      $('#app').classList.remove('focus-mode');
      goCards(ret.chapterId, false, ret.searchQuery, ret.scrollPos, ret.cardId);
      return;
    }
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

$('#cardsBtn').onclick = () => goAllCards(); 
$('#settingsBtn').onclick = () => openSet(State.chapterId); 
startBtn.onclick = () => startRev(State.chapterId);

function setTop({title,showBack}){ backBtn.classList.toggle('hidden',showBack===!1); if(title)titleEl.textContent=title }
function setBot({actions,revision,sz=10,en=true,av=null,cid=null}){ botAct.style.display=actions?'grid':'none'; revBar.style.display=revision?'block':'none'; $('#app').style.setProperty('--row-actions',actions?'52px':'0px'); $('#app').style.setProperty('--row-rev',revision?'64px':'0px'); if(av==null&&cid){const c=getCh(cid);av=c?cntAv(c):0} startBtn.textContent=`Révision • ${av>0?M.min(sz,av):sz} cartes${revision&&(av>0)?` • ${av} dispo`:''}`; startBtn.disabled=!en||(av||0)<=0 }
function render(push=true){ if(State.view==='deck')goDeck(push); else if(State.view==='chapter')goChapter(State.chapterId,push); else if(State.view==='cards')goCards(State.cardsMode==='all'?null:State.chapterId,push); else if(State.view==='review')goReview(push); else if(State.view==='recap')goRecap(push); else if(State.view==='settings')openSet(State.chapterId,push,State.setTab); else if(State.view==='stats')goStats(push); else if(State.view==='daily')goDaily(State.chapterId,State.dailyKey,push); else if(State.view==='dailyAll')goDayAll(State.dailyKey,push) }
const hideRevAct = () => { $('#reviewActionsBar').style.display='none' };

/* --- SELECTION & GESTURES --- */
function goDeckKeepScroll() {
  const scrollEl = $('#dL');
  const savedScroll = scrollEl ? scrollEl.scrollTop : 0;
  goDeck(false);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const newScrollEl = $('#dL');
      if(newScrollEl) newScrollEl.scrollTop = savedScroll;
    });
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
  setTop({title:`Deck • ${getSub().emoji?getSub().emoji+' ':''}${getSub().title}`, showBack: expandedFolders.size > 0});
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
  fabConfirm.innerHTML = ico('check','ico--lg');
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
  fabCancel.innerHTML = ico('x','ico--lg');
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
      if(!indicator) { indicator = D.createElement('div'); indicator.innerHTML = ico('refresh'); indicator.style.cssText = 'text-align:center;padding:10px;color:var(--muted);font-size:20px;transition:transform 0.2s'; container.prepend(indicator); }
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
  exitDrive(); safeCloseLB(); Media.revokeAll(); clearMathCache();
  if(push) Nav.push(); State.view='deck'; State.chapterId=null; 
  const s=getSub(); setTop({title:`Deck • ${s.emoji?s.emoji+' ':''}${s.title}`, showBack: selectionMode || expandedFolders.size > 0}); setBot({actions:!1, revision:!1}); hideRevAct();
  let needsSave = false; if (checkExpiredDates(ensGrps(s))) needsSave = true; if (checkExpiredDates(s.chapters)) needsSave = true; if (needsSave) debouncedSave();

  const v=$('#view');
  const items = buildDeckItems(s, null, 0);
  
    const nbCh = s.chapters.length, nbCards = s.chapters.reduce((n,ch)=>n+ch.cards.length,0);
    v.innerHTML = `
      <div class="card card--flush">
        <div class="view-head">
          <div>
            <h2 class="view-head__title">Chapitres &amp; fichiers</h2>
            <div class="view-head__meta">${nbCh} chapitre${nbCh>1?'s':''} · ${nbCards} carte${nbCards>1?'s':''}</div>
          </div>
          <div class="view-head__actions">
            <button class="btn btn--outline btn--sm" id="statsB">${ico('chart')}<span>Stats</span></button>
            <button class="btn ${selectionMode?'btn--primary':'btn--outline'} btn--sm" id="editModeBtn">
              ${ico(selectionMode?'check':'pencil')}<span>${selectionMode?'Terminer':'Éditer'}</span>
            </button>
            <button class="btn btn--outline btn--sm" id="impB">${ico('upload')}<span>Importer</span></button>
            <button class="btn btn--outline btn--sm btn--icon" id="setB" title="Paramètres" aria-label="Paramètres">${ico('settings')}</button>
            <input id="impI" type="file" class="hidden" accept="*/*" multiple />
          </div>
        </div>
        <div class="search-field deck-search">
          ${ico('search')}
          <input type="text" id="globalSearch" class="input" placeholder="Rechercher une carte…" autocomplete="off" spellcheck="false" />
          <button id="globalSearchClear" class="clear-btn hidden" aria-label="Effacer la recherche">${ico('x','ico--sm')}</button>
          <span class="search-kbd" aria-hidden="true"><kbd>Ctrl</kbd><kbd>K</kbd></span>
          <div id="globalSearchResults" class="hidden"></div>
        </div>
        <div id="dL" class="scroll-y deck-scroll">
          <div class="deck-list" id="deckList"></div>
        </div>
      </div>`;
    const listEl = $('#deckList');
  listEl.innerHTML = items.map(item => renderDeckItem(item, s)).join('') 
    + `<button class="add-row" id="addChapterBtn">${ico('plus')}<span>Nouveau chapitre</span></button>`;
  
  $('#addChapterBtn').onclick = () => {
    const title = prompt('Nom du chapitre :');
    if(!title || !title.trim()) return;
    const sub = getSub();
    const ch = mkChapter('chap-' + slugify(title) + '-' + Date.now(), title.trim(),[]);
    sub.chapters.push(ch);
    saveData();
    goDeck(false);
    toast('Chapitre créé !', 'success');
  };
  const impBtn = $('#impB');
  const impInput = $('#impI');
  if (impBtn && impInput) { impBtn.onclick = () => impInput.click(); }
  $('#impI').onchange = async e => { try { await importFiles([...e.target.files]); toast('Import terminé !', 'success'); goDeck(!1); } catch(x) { toast('Erreur import', 'error'); } finally { e.target.value=''; } };
  
  $('#editModeBtn').onclick = () => {
    if(selectionMode) { exitSelectionMode(); } else { selectionMode = true; selectedIds.clear(); goDeckKeepScroll(); }
  };
  const statsB = $('#statsB'); if (statsB) statsB.onclick = () => goStats(true);
  const setB = $('#setB'); if (setB) setB.onclick = () => openSet(State.chapterId, true, 'general');
  
    if(selectionMode) renderFABs();
  bindDeckNew();
  bindGlobalSearch();
}

function buildDeckItems(s, parentGid, depth) {
  const grps = ensGrps(s);
  const items =[];
  
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
    levelChapters = parentG ? parentG.chapIds.map(id => s.chapters.find(c=>c.id===id)).filter(Boolean) :[];
  }
  
  const sorter = (a, b) => { 
    const aDeadline = a.deadline || null;
    const bDeadline = b.deadline || null;
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

    let rightContent = '';
    if(selectionMode) {
      rightContent = `<button class="remove-x" data-action="delete-folder" data-gid="${g.id}" title="Supprimer le dossier">${ico('x','ico--xs')}</button>`;
    } else if(isExpanded) {
      rightContent = `<button class="btn btn--primary btn--sm" data-action="review-folder" data-gid="${g.id}">${ico('play','ico--sm')}<span>Tout</span></button>`;
      const parentG = findGrpOfGrp(s, g.id);
      if(parentG) {
        rightContent += `<button class="remove-x" data-action="remove-subfolder" data-gid="${g.id}" data-parent="${parentG.id}" title="Sortir du dossier">${ico('x','ico--xs')}</button>`;
      }
    }

    return `<div class="deck-item${depthClass}${isExpanded ? ' is-open' : ''}" data-type="group" data-id="${g.id}" draggable="false">
      ${tint ? `<div class="tint-bar" style="background:${tint}"></div>` : ''}
      <div class="slide">
        <div class="deck-emoji">${emoji}</div>
        <div class="deck-info">
          <div class="deck-title">${title}</div>
          <div class="deck-sub">
            <span class="mini-bar"><span class="mini-bar-fill" style="width:${pct}%"></span></span>
            <span class="pct">${pct}%</span>
            <span class="mini-dots"><i class="md" style="background:var(--red)"></i><i class="md" style="background:var(--amber)"></i><i class="md" style="background:var(--blue)"></i><i class="md" style="background:var(--green)"></i></span>
            <span>${c.echec} · ${c.difficile} · ${c.bien} · ${c.facile}</span>
            <span class="folder-badge">${getAllChapIdsRecursive(s, g.id).length} chap.</span>
          </div>
        </div>
        ${rightContent}
        <div class="deck-chevron">${ico('chevron-right','ico--sm')}</div>
      </div>
    </div>`;
  } else {
    const c = item.chapter;
    const k = getLive(c), tot = c.cards.length, pct = tot ? M.round((tot-k.unseen)/tot*100) : 0;
    const tint = getDeckTint(c, 'chapter');
    const emoji = c.emoji || getEmoji(c.title) || '📄';

    let rightContent = '';
    if(!selectionMode && item.parentGid && expandedFolders.has(item.parentGid)) {
      rightContent = `<button class="remove-x" data-action="remove-from-folder" data-cid="${c.id}" data-gid="${item.parentGid}" title="Sortir du dossier">${ico('x','ico--xs')}</button>`;
    }

    let selectBox = '';
    if(selectionMode) {
      const isChecked = selectedIds.has(c.id);
      selectBox = `<div class="sel-checkbox ${isChecked ? 'checked' : ''}" data-action="toggle-select" data-cid="${c.id}"></div>`;
    }

    return `<div class="deck-item${depthClass}" data-type="chapter" data-id="${c.id}" data-parent-gid="${item.parentGid||''}" draggable="false">
      ${tint ? `<div class="tint-bar" style="background:${tint}"></div>` : ''}
      ${c.imported?'<div class="right-action"><button class="btn btn--red btn--sm delCh" data-cid="'+c.id+'">Supprimer</button></div>':''}
      <div class="slide">
        ${selectBox}
        <div class="deck-emoji">${emoji}</div>
        <div class="deck-info">
          <div class="deck-title">${c.title}</div>
          <div class="deck-sub">
            <span class="mini-bar"><span class="mini-bar-fill" style="width:${pct}%"></span></span>
            <span class="pct">${pct}%</span>
            <span class="mini-dots"><i class="md" style="background:#9ca3af"></i><i class="md" style="background:var(--red)"></i><i class="md" style="background:var(--green)"></i></span>
            <span>${k.unseen} non vues · ${k.echec} à revoir · ${k.facile} acquises</span>
          </div>
        </div>
        ${rightContent}
        <div class="deck-chevron">${ico('chevron-right','ico--sm')}</div>
      </div>
    </div>`;
  }
}

function bindDeckNew() {
  const l = $('#dL'); if(!l) return;
  const sub = getSub();
  
  if(bindDeckNew._cleanup) {
    bindDeckNew._cleanup();
    bindDeckNew._cleanup = null;
  }
  
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
    if(selBox) { e.stopPropagation(); const cid = selBox.dataset.cid; if(selectedIds.has(cid)) selectedIds.delete(cid); else selectedIds.add(cid); selBox.classList.toggle('checked', selectedIds.has(cid)); return; }
    const remBtn = e.target.closest('[data-action="remove-from-folder"]');
    if(remBtn) { e.stopPropagation(); remFromGrp(sub, remBtn.dataset.gid, remBtn.dataset.cid); valGrps(sub); saveData(); goDeckKeepScroll(); return; }
    const delFolderBtn = e.target.closest('[data-action="delete-folder"]');
    if(delFolderBtn) { e.stopPropagation(); if(confirm('Supprimer ce dossier ?')) { delGrp(sub, delFolderBtn.dataset.gid); valGrps(sub); saveData(); exitSelectionMode(); } return; }
    const remSubBtn = e.target.closest('[data-action="remove-subfolder"]');
    if(remSubBtn) { e.stopPropagation(); removeChildGrpFromParent(sub, remSubBtn.dataset.parent, remSubBtn.dataset.gid); valGrps(sub); saveData(); goDeckKeepScroll(); return; }
    const revFolderBtn = e.target.closest('[data-action="review-folder"]');
    if(revFolderBtn) { e.stopPropagation(); const g=findGrp(sub,revFolderBtn.dataset.gid); if(g){State.virtualChapter=buildVirt(sub,g);goChapter(State.virtualChapter.id)} return; }
  };

  let longPressTimer = null, startX = 0, startY = 0, pressedEl = null, didLongPress = false;
  let dragging = false, dragData = null, dragGhost = null, dragStarted = false, currentDropTarget = null, dropMode = null;
  let activePointerId = null, autoScrolling = false, dndGuardsOn = false, startScrollTop = 0;

  function createGhost(item) {
    const ghost = D.createElement('div');
    ghost.className = 'drag-ghost';
    ghost.setAttribute('aria-hidden', 'true');
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
    $$('.drag-ghost').forEach(el => el.remove());
  }

  function preventDndDefault(e) { e.preventDefault(); }

  function setDndGuards(on) {
    if(on === dndGuardsOn) return;
    dndGuardsOn = on;
    D.documentElement.classList.toggle('is-dnd', on);
    l.classList.toggle('scroll-lock', on);
    if(on) {
      D.addEventListener('touchmove', preventDndDefault, {passive: false, capture: true});
      D.addEventListener('selectstart', preventDndDefault, true);
      D.addEventListener('contextmenu', preventDndDefault, true);
      try { W.getSelection()?.removeAllRanges(); } catch {}
    } else {
      D.removeEventListener('touchmove', preventDndDefault, true);
      D.removeEventListener('selectstart', preventDndDefault, true);
      D.removeEventListener('contextmenu', preventDndDefault, true);
    }
  }

  function abortDrag() {
    clearTimeout(longPressTimer);
    longPressTimer = null;
    if(dragData?.el) dragData.el.classList.remove('dragging-origin');
    clearDropTargets();
    removeGhost();
    setDndGuards(false);
    if(pressedEl && activePointerId != null) {
      try { pressedEl.releasePointerCapture(activePointerId); } catch {}
    }
    dragging = false; dragData = null; dragStarted = false;
    pressedEl = null; didLongPress = false; activePointerId = null;
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
            if(!dstG.childGroupIds) dstG.childGroupIds =[];
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
            if(!newParent.childGroupIds) newParent.childGroupIds =[];
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
    if(e.pointerType === 'mouse' && e.button !== 0) return;
    if(e.target.closest('button, .sel-checkbox, .remove-x')) return;
    const item = e.target.closest('.deck-item');
    if(!item) return;

    abortDrag();
    pressedEl = item;
    activePointerId = e.pointerId;
    startX = e.clientX;
    startY = e.clientY;
    startScrollTop = l.scrollTop;
    didLongPress = false;
    dragging = false;
    dragStarted = false;

    longPressTimer = setTimeout(() => {
      if(!pressedEl || pressedEl !== item) return;
      didLongPress = true;
      haptic('medium');
      try { W.getSelection()?.removeAllRanges(); } catch {}

      dragging = true;
      dragData = { type: item.dataset.type, id: item.dataset.id, el: item };
      item.classList.add('dragging-origin');
      dragGhost = createGhost(item);
      updateGhost(startX, startY);
      setDndGuards(true);
      try { item.setPointerCapture(e.pointerId); } catch {}
    }, 380);
  };

  const onPointerMove = e => {
    if(activePointerId != null && e.pointerId !== activePointerId) return;
    if(!pressedEl) return;
    const dx = e.clientX - startX, dy = e.clientY - startY;
    const dist = M.hypot(dx, dy);

    if(!dragging && dist > 12) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
      return;
    }

    if(dragging) {
      if(e.cancelable) e.preventDefault();
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
      autoScrolling = true;
      if(e.clientY < lRect.top + edgeSize) { l.scrollTop -= 8; }
      else if(e.clientY > lRect.bottom - edgeSize) { l.scrollTop += 8; }
      autoScrolling = false;
    }
  };

  const onPointerUp = e => {
    if(activePointerId != null && e.pointerId !== activePointerId) return;
    clearTimeout(longPressTimer);
    longPressTimer = null;

    if(dragging && dragStarted) {
      const dropInfo = getDropInfo(e.clientX, e.clientY);
      if(dropInfo && dragData) { executeDrop(dragData, dropInfo); }
      abortDrag();
      goDeckKeepScroll();
      return;
    }

    if(dragging && !dragStarted) {
      abortDrag();
      return;
    }

    if(!pressedEl || didLongPress) { abortDrag(); return; }

    const item = pressedEl;
    const type = item.dataset.type;
    const id = item.dataset.id;
    abortDrag();

    if(e.target.closest('button, .sel-checkbox, .remove-x')) return;

    const dx = e.clientX - startX, dy = e.clientY - startY;
    if(M.hypot(dx, dy) > 30) return;

    if(selectionMode) {
      if(type === 'chapter') {
        if(selectedIds.has(id)) selectedIds.delete(id); else selectedIds.add(id);
        const checkbox = item.querySelector('.sel-checkbox');
        if(checkbox) {
          checkbox.classList.toggle('checked', selectedIds.has(id));
        } else {
          goDeckKeepScroll();
        }
      } else if(type === 'group') {
        openGrp(sub, id);
      }
    } else {
      if(type === 'group') { openGrp(sub, id); } else { goChapter(id); }
    }
  };

  const onPointerCancel = e => {
    if(activePointerId != null && e.pointerId !== activePointerId) return;
    abortDrag();
  };

  const onNativeScroll = () => {
    if(autoScrolling) return;
    if(dragging || dragGhost) { abortDrag(); return; }
    if(longPressTimer && Math.abs(l.scrollTop - startScrollTop) > 6) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  };

  const onContextMenu = e => {
    if(dragging || e.target.closest('.deck-item')) e.preventDefault();
  };

  const onVisibility = () => {
    if(D.visibilityState !== 'visible') abortDrag();
  };

  abortDrag();
  l.addEventListener('pointerdown', onPointerDown);
  D.addEventListener('pointermove', onPointerMove, {passive: true});
  D.addEventListener('pointerup', onPointerUp);
  D.addEventListener('pointercancel', onPointerCancel);
  D.addEventListener('lostpointercapture', onPointerCancel);
  l.addEventListener('scroll', onNativeScroll, {passive: true});
  l.addEventListener('contextmenu', onContextMenu);
  D.addEventListener('visibilitychange', onVisibility);

  bindDeckNew._cleanup = () => {
    abortDrag();
    l.removeEventListener('pointerdown', onPointerDown);
    D.removeEventListener('pointermove', onPointerMove);
    D.removeEventListener('pointerup', onPointerUp);
    D.removeEventListener('pointercancel', onPointerCancel);
    D.removeEventListener('lostpointercapture', onPointerCancel);
    l.removeEventListener('scroll', onNativeScroll);
    l.removeEventListener('contextmenu', onContextMenu);
    D.removeEventListener('visibilitychange', onVisibility);
  };
}
function bindGlobalSearch() {
  const input = $('#globalSearch');
  const results = $('#globalSearchResults');
  const clearBtn = $('#globalSearchClear');
  if(!input || !results) return;

  const allCards =[];
  for(const sub of data.subjects) {
    for(const ch of (sub.chapters ||[])) {
      const emoji = ch.emoji || getEmoji(ch.title) || '📄';
      for(const card of ch.cards) {
        allCards.push({ card, ch, sub, emoji, chId: ch.id, subId: sub.id });
      }
    }
  }

  const norm = s => (s||'').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/<[^>]+>/g,'').replace(/&[^;]+;/g,' ');

  let debounceTimer = null;

  input.oninput = () => {
    clearTimeout(debounceTimer);
    const q = input.value.trim();
    clearBtn.classList.toggle('hidden', !q);
    input.closest('.search-field')?.classList.toggle('has-query', !!q);
    if(!q) { results.classList.add('hidden'); results.innerHTML = ''; return; }
    debounceTimer = setTimeout(() => doSearch(q), 150);
  };

  clearBtn.onclick = (e) => {
    e.stopPropagation();
    input.value = '';
    clearBtn.classList.add('hidden');
    input.closest('.search-field')?.classList.remove('has-query');
    results.classList.add('hidden');
    results.innerHTML = '';
    input.focus();
  };

  D.addEventListener('click', (e) => {
    if(!e.target.closest('#globalSearch, #globalSearchResults, #globalSearchClear')) {
      results.classList.add('hidden');
    }
  });

  input.onfocus = () => { if(input.value.trim()) doSearch(input.value.trim()); };

  function doSearch(q) {
    const cleanQ = norm(q);
    if(cleanQ.length < 2) { results.classList.add('hidden'); return; }

    // Score chaque carte
    const scored =[];
    for(const item of allCards) {
      const front = norm(item.card.front);
      const back = norm(item.card.back);
      const fStart = front.startsWith(cleanQ);
      const bStart = back.startsWith(cleanQ);
      const fIn = front.includes(cleanQ);
      const bIn = back.includes(cleanQ);
      if(!fIn && !bIn) continue;

      let score;
      if(fStart) score = 0;
      else if(bStart) score = 1;
      else if(fIn) score = 2;
      else score = 3;

      scored.push({ ...item, score });
    }

    if(!scored.length) {
      results.innerHTML = `<div class="gs-empty">Aucun résultat pour « ${q} ».</div>`;
      results.classList.remove('hidden');
      return;
    }

    // Grouper par chapitre
    const byChap = new Map();
    for(const item of scored) {
      const key = item.subId + '/' + item.chId;
      if(!byChap.has(key)) byChap.set(key, { items:[], bestScore: item.score, ch: item.ch, sub: item.sub, emoji: item.emoji, chId: item.chId, subId: item.subId });
      const group = byChap.get(key);
      group.items.push(item);
      if(item.score < group.bestScore) group.bestScore = item.score;
    }

    // Trier les groupes : celui avec le meilleur match en premier
    const sortedGroups =[...byChap.values()].sort((a, b) => {
      if(a.bestScore !== b.bestScore) return a.bestScore - b.bestScore;
      return b.items.length - a.items.length;
    });

    // Limiter à 30 résultats total
    let totalShown = 0;
    const maxTotal = 30;
    const maxPerChap = 5;

    let html = '';
    const flatResults =[];

    for(const group of sortedGroups) {
      if(totalShown >= maxTotal) break;

      const chLabel = group.ch.title.length > 30 ? group.ch.title.substring(0, 27) + '…' : group.ch.title;
      const subLabel = group.sub.title;

      html += `<div class="gs-group">
        <span class="gs-group-emoji">${group.emoji}</span>
        <span class="gs-group-name">${chLabel}</span>
        <span class="gs-group-sub">${subLabel}</span>
      </div>`;

      // Trier les cartes du groupe par score
      group.items.sort((a, b) => a.score - b.score);
      const shown = group.items.slice(0, Math.min(maxPerChap, maxTotal - totalShown));

      for(const item of shown) {
        const {f, b} = getSides(item.card, item.ch);
        const gradeClass = item.card.grade || 'unseen';
        const idx = flatResults.length;
        flatResults.push(item);

        html += `<div class="gs-result" data-idx="${idx}" role="button" tabindex="0">
          <span class="gs-dot" style="background:var(--${GC[gradeClass]})"></span>
          <div class="gs-main">
            <div class="gs-front">${formatText(f)}</div>
            <div class="gs-back">${formatText(b)}</div>
          </div>
        </div>`;
        totalShown++;
      }

      // Lien « voir tout » si le chapitre a plus de résultats
      if(group.items.length > maxPerChap) {
        const moreIdx = flatResults.length;
        flatResults.push({ _seeAll: true, chId: group.chId, subId: group.subId });
        html += `<div class="gs-result is-more" data-idx="${moreIdx}" role="button" tabindex="0">+ ${group.items.length - maxPerChap} autres résultats dans ce chapitre →</div>`;
      }
    }

    results.innerHTML = html;
    results.classList.remove('hidden');

    // Rendre le LaTeX dans les résultats
    tsLat(results);

    // Bind clicks
    $$('.gs-result', results).forEach(el => {
      el.onclick = () => {
        const idx = parseInt(el.dataset.idx);
        const item = flatResults[idx];
        if(!item) return;

        const targetSubId = item._seeAll ? item.subId : item.subId;
        const targetChId = item._seeAll ? item.chId : item.chId;

        if(targetSubId !== data.app.currentSubjectId) setSub(targetSubId);

        input.value = '';
        clearBtn.classList.add('hidden');
        results.classList.add('hidden');
        results.innerHTML = '';

        goCards(targetChId);
      };
    });
  }
}

function stripHTML(s) {
  return (s||'').replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
}
function openGrp(s, gid) {
  const scrollEl = $('#dL');
  const savedScroll = scrollEl ? scrollEl.scrollTop : 0;

  if (expandedFolders.has(gid)) expandedFolders.delete(gid);
  else expandedFolders.add(gid);

  const listEl = $('#deckList');
  if (listEl) {
    const items = buildDeckItems(s, null, 0);  // ← CORRECTION : construire les items
    listEl.innerHTML = items.map(item => renderDeckItem(item, s)).join('')
      + `<button class="add-row" id="addChapterBtn">${ico('plus')}<span>Nouveau chapitre</span></button>`;

    $('#addChapterBtn').onclick = () => {
      const title = prompt('Nom du chapitre :');
      if(!title || !title.trim()) return;
      const sub = getSub();
      const ch = mkChapter('chap-' + slugify(title) + '-' + Date.now(), title.trim(), []);
      sub.chapters.push(ch);
      saveData();
      goDeck(false);
      toast('Chapitre créé !', 'success');
    };

    setTop({
      title: `Deck • ${s.emoji ? s.emoji + ' ' : ''}${s.title}`,
      showBack: selectionMode || expandedFolders.size > 0
    });
    bindDeckNew();
    if (selectionMode) renderFABs();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (scrollEl) scrollEl.scrollTop = savedScroll;
      });
    });
  } else {
    goDeckKeepScroll();
  }
}

function goChapter(id,push=true){
  exitDrive(); safeCloseLB(); Media.revokeAll(); clearMathCache(); if(push)Nav.push(); State.view='chapter'; State.chapterId=id; const c=getCh(id); if(!c){Nav.back();return} setTop({title:c.title}); updRevBar(c); hideRevAct(); const k=c.stats.gradeCounts||getLive(c), sel=c.filters.grades, v=$('#view');
  const dailyCalc = getDailyGoalCalc(c);
  const last7=getLastN(c,7), lbls7=getLbls(7), max7=M.max(1,...last7);

  // ✅ Légende des types (Maths)
  const hasTypes = c.filters.types && c.cards.some(x => x.cardType);
  const typeLegendHTML = hasTypes ? (() => {
      const tSel = c.filters.types;
      const tCounts = {}; MATH_TYPES.forEach(t => { tCounts[t] = c.cards.filter(x => x.cardType === t).length; });
      return `<div class="legend mt6" id="typeLegend">${MATH_TYPES.map(t =>
          `<div class="legend-item ${tSel[t]?'':'inactive'}" data-tkey="${t}"><span class="dot" style="background:${TYPE_COLORS[t]}"></span><span style="flex:1">${TYPE_LABELS[t]}</span><b class="count">${tCounts[t]}</b></div>`
      ).join('')}</div>`;
  })() : '';

  const statsLabel = c.virtual ? c.description : ((getEmoji(c.title) ? getEmoji(c.title) + ' ' : '') + 'Statistiques');
  v.innerHTML = `
    <div class="card card--flush">
      <div class="view-head">
        <div>
          <h2 class="view-head__title">${c.title}</h2>
          <div class="view-head__meta">${c.cards.length} carte${c.cards.length>1?'s':''} · ${k.unseen} non vue${k.unseen>1?'s':''} · ${cntAv(c)} à réviser</div>
        </div>
      </div>
      <div class="view-body">
        <div class="section-title">${statsLabel}</div>
        <div class="stats-row">
          <div class="chart-wrap"><canvas id="gradeChart" width="140" height="140"></canvas></div>
          <div class="bar7-side">
            <div class="bar7-head">7 derniers jours</div>
            ${last7.map((val,i)=>`<div class="bar7-row" data-day="${dayKeyIdx(7,i)}" title="Voir le détail du jour">
              <div class="bar7-label">${lbls7[i].substring(0,3)}</div>
              <div class="bar7-track"><div class="bar7-fill" style="width:${max7?(val/max7*100):0}%"></div></div>
              <div class="bar7-val">${val}</div>
            </div>`).join('')}
          </div>
        </div>

        <div class="legend" id="legend">${GRADES.map(x=>`<div class="legend-item ${sel[x]?'':'inactive'}" data-key="${x}" title="Filtrer les cartes « ${x} »">
          <span class="dot ${GC[x]}"></span><span>${x[0].toUpperCase()+x.slice(1)}</span><b class="count">${k[x]}</b>
        </div>`).join('')}</div>
        ${typeLegendHTML}

        <div class="section-title mt8">Chiffres clés</div>
        <div class="stats-grid">
          <div class="stat-card"><div class="stat-val">${k.unseen}</div><div class="stat-lbl">Non vues</div></div>
          <div class="stat-card"><div class="stat-val">${c.cards.length}</div><div class="stat-lbl">Total cartes</div></div>
          <div class="stat-card"><div class="stat-val">${getTod(c)}</div><div class="stat-lbl">Révisées aujourd'hui</div></div>
          <div class="stat-card"><div class="stat-val">${getStreak(c)}&nbsp;j</div><div class="stat-lbl">Série en cours</div></div>
          <div class="stat-card"><div class="stat-val">${getSucc(c)}%</div><div class="stat-lbl">Taux de réussite</div></div>
          <div class="stat-card"><div class="stat-val">${get7dAvgMs(c)?M.round(get7dAvgMs(c)/100)/10+'&nbsp;s':'—'}</div><div class="stat-lbl">Temps moyen (7 j)</div></div>
        </div>

        <div class="section-title mt8">Échéance</div>
        <div class="deadline-box mt8">
          <label class="field-label" for="deadlineInput">Date limite de révision</label>
          <input type="date" id="deadlineInput" class="input" value="${c.deadline||''}">
        </div>
        ${dailyCalc?`<div class="goal-line" id="goalDisplay"><span>Objectif : <b>${c._goalCache?.size||dailyCalc.val}</b>/jour</span><span>Reste <b>${cntAv(c)}</b> cartes disponibles</span></div>`:''}
      </div>
    </div>`;

  drawChart('gradeChart',k,sel); 
  $('#gradeChart').onclick=e=>hChartClk(e,'gradeChart',c); 
  
  // ✅ Bindings des filtres
  $$('#legend .legend-item').forEach(el=>el.onclick=()=>updFilt(c,el.dataset.key));
  if(hasTypes) {
      $$('#typeLegend .legend-item').forEach(el=>el.onclick=()=>updTypeFilt(c,el.dataset.tkey));
  }
  
  $$('.bar7-row').forEach(el=>{el.onclick=()=>goDaily(c.id,el.dataset.day)});

  $('#deadlineInput').onchange = (e) => {
    const val = e.target.value || null;
    if (c.virtual && c._groupId) {
      const g = findGrp(getSub(), c._groupId);
      if (g) g.deadline = val;
    } else {
      c.deadline = val;
    }
    delete c._goalCache;
    debouncedSave();
    if (typeof FireSync !== 'undefined' && FireSync.isConnected) FireSync.pushToCloud();
    const newCalc = getDailyGoalCalc(c);
    const goalEl = $('#goalDisplay');
    if (newCalc && newCalc.val > 0) {
      const html = `<span>Objectif fixé: <b>${newCalc.val}</b>/jour</span><span>Reste: <b>${cntAv(c)}</b> dispo</span>`;
      if (goalEl) {
        goalEl.innerHTML = html;
      } else {
        const container = e.target.closest('.mt8');
        if (container) {
          const div = D.createElement('div');
          div.className = 'mt6';
          div.id = 'goalDisplay';
          div.style.cssText = 'font-size:13px;color:var(--primary);display:flex;justify-content:space-between';
          div.innerHTML = html;
          container.appendChild(div);
        }
      }
    } else if (goalEl) {
      goalEl.remove();
    }
    updRevBar(c);
  };

  botAct.style.gridTemplateColumns=''; botAct.innerHTML=`<button class="action btn" id="cardsBtn">Cartes</button><button class="action btn" id="settingsBtn">Paramètres</button>`; $('#cardsBtn').onclick=()=>goCards(State.chapterId); $('#settingsBtn').onclick=()=>openSet(State.chapterId,true,'general');
  if(isMathChapter()){const det=data.app.prefs.mathDetail;botAct.innerHTML=`<button class="action btn" id="cb2">Cartes</button><button class="action btn ${det?'btn--primary':''}" id="db2">${det?'✓ ':''}Détail</button><button class="action btn" id="sb2">Paramètres</button>`;botAct.style.gridTemplateColumns='1fr 1fr 1fr';$('#cb2').onclick=()=>goCards(State.chapterId);$('#sb2').onclick=()=>openSet(State.chapterId,true,'general');$('#db2').onclick=()=>{data.app.prefs.mathDetail=!data.app.prefs.mathDetail;saveData();goChapter(c.id,false)};}
}
function updRevBar(c){ const n=cntAv(c); setBot({actions:!0,revision:!0,sz:c.settings.sessionSize,en:c.cards.length>0,av:n,cid:c.id}) }

/* Aiguillage : sans chapitre → navigateur de cartes global (menu « Cartes ») */
function goCards(cid, push = true, ...rest){
  if(!cid) return goAllCards(push, ...rest);
  return goCardsChapter(cid, push, ...rest);
}

async function goCardsChapter(cid, push=true, savedSearch='', savedScroll=0, scrollToCardId=null){
  exitDrive(); safeCloseLB(); Media.revokeAll(); if(push)Nav.push(); State.view='cards'; State.cardsMode='chapter'; State.chapterId=cid; 
  $('#app').classList.remove('focus-mode');
  const c=getCh(cid), pool=c.cards.filter(x=>cardPassesFilter(x,c.filters)), v=$('#view'); 
  setTop({title:`${c.title} • Cartes`}); setBot({actions:!1,revision:!1}); hideRevAct();
      v.innerHTML = `
        <div class="card card--flush">
          <div class="view-head">
            <div>
              <h2 class="view-head__title">${c.title}</h2>
              <div class="view-head__meta">${pool.length} carte${pool.length>1?'s':''} dans le filtre courant</div>
            </div>
            <div class="view-head__actions">
              <button class="btn btn--solid btn--primary btn--sm" id="addCardBtn">
                ${ico('plus')}<span>Nouvelle carte</span>
              </button>
            </div>
          </div>
          <div class="search-field deck-search">
            ${ico('search')}
            <input type="text" id="cardSearch" class="input" placeholder="Rechercher dans ce chapitre…" autocomplete="off" spellcheck="false" />
          </div>
          <div id="cardsGrid" class="scroll-y deck-scroll">
            <div class="cards-grid" id="gridCont"></div>
          </div>
        </div>`;

  const renderCards = async (q='') => {
    const norm = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""), cleanQ = norm(q);
    let filtered =[];
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
    if(filtered.length === 0) { grid.innerHTML = `<div class="empty" style="grid-column:1/-1">${ico('search','ico--lg')}<div class="empty__title">Aucune carte trouvée</div><div class="empty__sub">Essaie un autre terme, ou vérifie les filtres du chapitre.</div></div>`; } 
    else {
       filtered.forEach(x => {
          const {f,b} = getSides(x,c), el = D.createElement('div');
          el.className = `card-block grade-${x.grade||'unseen'}`; el.dataset.id = x.id;
          const msC=getMathSimple(x), bContent=(!data.app.prefs.mathDetail&&msC)?formatText(msC):formatText(b);
          el.innerHTML = `<div class="term">${formatText(f)}</div><div class="definition">${bContent}</div>${x.avgMs?`<div class="cb-time">${fmtDur(x.avgMs)}</div>`:''}`;
          grid.appendChild(el);
       });
    }
    await Media.resolve(grid);
    await tsLat(grid);
  };
  await renderCards(savedSearch);

  // La vue peut avoir changé pendant le chargement (retour rapide, etc.) :
  // dans ce cas les éléments ci-dessous n'existent plus.
  if (State.view !== 'cards' || State.chapterId !== cid) return;

  // ✅ Restaurer la recherche dans l'input
  if(savedSearch) {
    $('#cardSearch').value = savedSearch;
  }

  if ($('#cardSearch')) $('#cardSearch').oninput = (e) => renderCards(e.target.value);

  $('#addCardBtn').onclick = () => openCardEditor(c, null, () => goCards(cid, false));

  // === APPUI LONG → RÉVISION RAPIDE D'UNE CARTE ===
  let lpTimer = null, lpDid = false, lpX = 0, lpY = 0;
  const cg = $('#cardsGrid');

  cg.addEventListener('pointerdown', e => {
    const block = e.target.closest('.card-block');
    if(!block || e.target.closest('img')) return;
    lpX = e.clientX; lpY = e.clientY; lpDid = false;
    lpTimer = setTimeout(() => {
      lpDid = true;
      haptic('medium');
      startSingleCardReview(cid, block.dataset.id,
        $('#cardSearch')?.value || '', cg.scrollTop || 0);
    }, 400);
  });

  cg.addEventListener('pointermove', e => {
    if(lpTimer && M.hypot(e.clientX - lpX, e.clientY - lpY) > 15) {
      clearTimeout(lpTimer); lpTimer = null;
    }
  });

  cg.addEventListener('pointerup', () => { clearTimeout(lpTimer); lpTimer = null; });
  cg.addEventListener('pointercancel', () => { clearTimeout(lpTimer); lpTimer = null; });

  // Click → flip (bloqué après un appui long)
  cg.onclick = e => {
    if(lpDid) { lpDid = false; return; }
    const b = e.target.closest('.card-block');
    if(b) {
      $$('.card-block').forEach(x => { if(x !== b) x.classList.remove('flipped'); });
      b.classList.toggle('flipped');
    }
  };

  // ✅ Scroll vers la carte évaluée (scrollIntoView = fiable)
  if(scrollToCardId) {
    setTimeout(() => {
      const cardEl = cg?.querySelector(`.card-block[data-id="${scrollToCardId}"]`);
      if(cardEl) {
        cardEl.scrollIntoView({ block: 'center', behavior: 'instant' });
        cardEl.classList.add('just-graded');
        setTimeout(() => cardEl.classList.remove('just-graded'), 1500);
      }
    }, 80);
  } else if(savedScroll > 0) {
    setTimeout(() => { if(cg) cg.scrollTop = savedScroll; }, 80);
  }
}
function openCardEditor(chapter, existingCard, onSave) {
  $$('.card-editor-overlay').forEach(el => el.remove());

  const isEdit = !!existingCard;
  const frontInit = isEdit ? existingCard.front.replace(/<br\s*\/?>/gi, '\n') : '';
  const backInit = isEdit ? existingCard.back.replace(/<br\s*\/?>/gi, '\n') : '';

  const overlay = D.createElement('div');
  overlay.className = 'card-editor-overlay';

  // Boutons organisés par catégorie, gros pour mobile
  const latexSections =[
    { title: 'Structures', btns:[
      { label: '$…$', insert: '$$', cursor: -1, tip: 'Inline' },
      { label: '$$…$$', insert: '$$$$', cursor: -2, tip: 'Display' },
      { label: 'a/b', insert: '$\\frac{}{}$', cursor: -4 },
      { label: '√', insert: '$\\sqrt{}$', cursor: -2 },
      { label: 'x²', insert: '$^{}$', cursor: -2 },
      { label: 'xₙ', insert: '$_{}$', cursor: -2 },
    ]},
    { title: 'Opérateurs', btns:[
      { label: 'Σ', insert: '$\\sum_{k=0}^{n}$' },
      { label: '∫', insert: '$\\int_{a}^{b}$' },
      { label: 'lim', insert: '$\\lim_{n \\to +\\infty}$' },
      { label: 'Π', insert: '$\\prod_{k=1}^{n}$' },
    ]},
    { title: 'Relations', btns:[
      { label: '→', insert: '$\\to$' },
      { label: '⟹', insert: '$\\Rightarrow$' },
      { label: '⟺', insert: '$\\Leftrightarrow$' },
      { label: '≤', insert: '$\\leq$' },
      { label: '≥', insert: '$\\geq$' },
      { label: '≠', insert: '$\\neq$' },
      { label: '∈', insert: '$\\in$' },
      { label: '∀', insert: '$\\forall$' },
      { label: '∃', insert: '$\\exists$' },
    ]},
    { title: 'Ensembles & Lettres', btns:[
      { label: 'ℝ', insert: '$\\mathbb{R}$' },
      { label: 'ℕ', insert: '$\\mathbb{N}$' },
      { label: 'ℂ', insert: '$\\mathbb{C}$' },
      { label: 'α', insert: '$\\alpha$' },
      { label: 'β', insert: '$\\beta$' },
      { label: 'λ', insert: '$\\lambda$' },
      { label: 'ε', insert: '$\\varepsilon$' },
      { label: '∞', insert: '$\\infty$' },
    ]},
  ];

  const allBtns =[];
  let toolbarHTML = '';
  for(const sec of latexSections) {
    toolbarHTML += `<div class="latex-toolbar-section">${sec.title}</div>`;
    for(const b of sec.btns) {
      toolbarHTML += `<button class="latex-btn" data-idx="${allBtns.length}">${b.label}</button>`;
      allBtns.push(b);
    }
  }

  overlay.innerHTML = `<div class="card-editor">
    <div class="card-editor-header">
      <h3>${isEdit ? 'Modifier' : 'Nouvelle carte'}</h3>
            <button class="ce-close-btn" id="ceClose" aria-label="Fermer">${ico('x','ico--sm')}</button>
    </div>
    <div class="card-editor-body">
      <div class="editor-face-tabs">
        <button class="editor-face-tab active" data-face="front">Recto</button>
        <button class="editor-face-tab" data-face="back">Verso</button>
      </div>
      
      <div id="ceFrontWrap">
        <textarea id="ceFront" placeholder="Question ou terme à apprendre..." style="min-height:90px">${frontInit}</textarea>
        <div class="card-editor-preview" id="ceFrontPreview"></div>
      </div>
      
      <div id="ceBackWrap" style="display:none">
        <textarea id="ceBack" placeholder="Réponse, formule, définition..." style="min-height:90px">${backInit}</textarea>
        <div class="card-editor-preview" id="ceBackPreview"></div>
      </div>
      
      <div class="latex-toolbar">${toolbarHTML}</div>
    </div>
    <div class="card-editor-footer">
      <button class="btn btn--ghost" id="ceCancel">Annuler</button>
      <button class="btn btn--solid btn--primary" id="ceSave">${isEdit ? 'Enregistrer' : 'Ajouter'}</button>
    </div>
  </div>`;

  D.body.appendChild(overlay);

  const frontTA = $('#ceFront');
  const backTA = $('#ceBack');
  const frontPrev = $('#ceFrontPreview');
  const backPrev = $('#ceBackPreview');
  const frontWrap = $('#ceFrontWrap');
  const backWrap = $('#ceBackWrap');
  let activeTA = frontTA;
  let activeFace = 'front';

  // Tab switching
  $$('.editor-face-tab', overlay).forEach(tab => {
    tab.onclick = () => {
      const face = tab.dataset.face;
      activeFace = face;
      $$('.editor-face-tab', overlay).forEach(t => t.classList.toggle('active', t === tab));
      frontWrap.style.display = face === 'front' ? '' : 'none';
      backWrap.style.display = face === 'back' ? '' : 'none';
      activeTA = face === 'front' ? frontTA : backTA;
      activeTA.focus();
    };
  });

  frontTA.onfocus = () => { activeTA = frontTA; };
  backTA.onfocus = () => { activeTA = backTA; };

  // Toolbar
  $$('.latex-btn', overlay).forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const b = allBtns[parseInt(btn.dataset.idx)];
      const ta = activeTA;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const text = ta.value;
      const selected = text.substring(start, end);

      let insertText = b.insert;
      let newCursor = start + insertText.length;

      if(selected && (b.insert === '$$' || b.insert === '$$$$')) {
        const w = b.insert.length === 2 ? '$' : '$$';
        insertText = w + selected + w;
        newCursor = start + insertText.length;
      } else if(b.cursor) {
        newCursor = start + insertText.length + b.cursor;
      }

      ta.value = text.substring(0, start) + insertText + text.substring(end);
      ta.focus();
      ta.setSelectionRange(newCursor, newCursor);
      updatePreview();
    };
  });

  // Live preview
  let previewTimer = null;
  function updatePreview() {
    clearTimeout(previewTimer);
    previewTimer = setTimeout(() => {
      frontPrev.innerHTML = formatText(frontTA.value);
      backPrev.innerHTML = formatText(backTA.value);
      tsLat(frontPrev);
      tsLat(backPrev);
    }, 400);
  }

  frontTA.oninput = updatePreview;
  backTA.oninput = updatePreview;
  if(isEdit) updatePreview();

  // Close
  const close = () => overlay.remove();
  $('#ceClose').onclick = close;
  $('#ceCancel').onclick = close;
  overlay.onclick = (e) => { if(e.target === overlay) close(); };

  // Save
  $('#ceSave').onclick = () => {
    const front = frontTA.value.trim();
    const back = backTA.value.trim();

    if(!front) { 
      toast('Le recto est vide', 'error'); 
      $$('.editor-face-tab', overlay)[0].click();
      frontTA.focus(); 
      return; 
    }
    if(!back) { 
      toast('Le verso est vide', 'error'); 
      $$('.editor-face-tab', overlay)[1].click();
      backTA.focus(); 
      return; 
    }

    if(isEdit) {
      existingCard.front = front;
      existingCard.back = back;
    } else {
      const newCard = mkCard(
        'card-' + Date.now() + '-' + M.floor(M.random() * 1000),
        front, back
      );
      chapter.cards.push(newCard);
    }

    syncG(chapter);
    saveData();
    if(typeof FireSync !== 'undefined' && FireSync.isConnected) FireSync.pushToCloud();
    close();
    toast(isEdit ? 'Carte modifiée !' : 'Carte ajoutée !', 'success');
    if(onSave) onSave();
  };

  setTimeout(() => frontTA.focus(), 150);
}
function getLogGrp(s,g,k){ return g.chapIds.flatMap(cid=>{const ch=s.chapters.find(c=>c.id===cid);return(ch?.stats?.dailyLog?.[k]||[]).map(e=>({...e,_chapId:cid}))}) }

function goReview(push=true){ exitDrive(); safeCloseLB(); Media.revokeAll(); if(push)Nav.push(); State.view='review'; setTop({title:'Révision'}); setBot({actions:!1,revision:!0}); $('#revisionBar').style.display='none'; $('#reviewActionsBar').style.display='block'; $('#app').classList.toggle('focus-mode', data.app.prefs.focusMode); renRev() }

function renRev(){
  if(State.review?.isQCM) { renQCM(); return; }
  const v=$('#view'), r=State.review, {card,chap}=getCur(), idx=r.index+1, tot=r.queue.length, {f,b}=getSides(card,chap), ff=chap.settings.reviewOrder!=='back-first';
  const ms=getMathSimple(card), fT=formatText(f), bT=(!data.app.prefs.mathDetail&&ms)?formatText(ms):formatText(b), progress=((r.index)/tot)*100;
  const undoBtn = r.history.length
    ? `<button id="undoBtn" title="Annuler la dernière évaluation">${ico('rotate-ccw','ico--sm')}</button>` : '';
  const chapLabel = r.mode === 'multi' ? 'Multi-chapitres · ' + chap.title : chap.title;

  v.innerHTML = `
    <div class="review-wrap">
      <div class="progress-bar" style="width:${progress}%"></div>
      <div class="review-top">
        <div class="review-top__left">${undoBtn}<span class="chap">${chapLabel}</span></div>
        <div class="review-count"><b>${idx}</b> / ${tot}</div>
      </div>
      <div class="review-card">
        <div class="review-scroller">${!r.flipped
          ? `<div class="term" data-face="${ff ? 'front' : 'back'}">${fT}</div>`
          : `<div class="stack">
               <div class="term" data-face="front">${fT}</div>
               <div class="definition" data-face="back">${bT}</div>
             </div>`}
        </div>
        <div class="review-hint">
          <span><kbd>Espace</kbd> retourner</span>
          <span><kbd>1</kbd><kbd>2</kbd><kbd>3</kbd><kbd>4</kbd> évaluer</span>
        </div>
      </div>
    </div>`;

  const finishSetup = async () => {
    await Media.resolve(v);
    const scroller = v.querySelector('.review-scroller');
    if(scroller) await tsLat(scroller);
    initGest();
    bindSwipeNav();
  };
  finishSetup();
  if(r.history.length && $('#undoBtn')) $('#undoBtn').onclick = undoRev; 
  
  let lastTap = 0;
  const scrollerEl = $('.review-scroller');
  if(scrollerEl) scrollerEl.addEventListener('click', e => {
    if(e.target.closest('img')) return;
    const now = Date.now();
    if(now - lastTap < 300 && !r.flipped) { haptic('light'); r.flipped = true; renRev(); }
    lastTap = now;
  });

  const bar=$('#reviewActionsBar');
  if(!r.flipped){
      bar.innerHTML=`<button class="btn btn--solid btn--primary" id="flipBtn">${ico('eye','ico--sm')}<span>Afficher la réponse</span></button>`;
      $('#flipBtn').onclick=()=>{haptic('light');r.flipped=!0;renRev()}
  } else {
      const GU = [['echec','circle-x','Échec','1'],['difficile','circle-alert','Difficile','2'],['bien','circle-check','Bien','3'],['facile','zap','Facile','4']];
      bar.innerHTML=`<div class="row-4">${GU.map(([g,ic,lab,k])=>`<button class="btn ${GB[g]}" id="g_${g}" data-grade="${g}">${ico(ic,'ico--sm')}<span>${lab}</span><kbd class="grade-kbd">${k}</kbd></button>`).join('')}</div>`;
      GU.forEach(([g])=>$('#g_'+g).onclick=()=>subG(g))
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

  if(r.index<r.queue.length-1){
    r.index++;r.flipped=!1;r.cardStart=Date.now();
    debouncedSave();
    /* Synchro cloud toutes les 10 cartes : avant, un push de l'intégralité
       des données par carte se cumulait (2 à 6 s par push) et la plupart
       des pushes étaient jetés → divergence entre appareils. */
    if(r.answers.length%10===0 && typeof FireSync!=='undefined'&&FireSync.isConnected)FireSync.pushToCloud();
    renRev();
  } else {
    r.end=Date.now();
    saveData();
    /* Fin de session → push toujours effectué (jamais perdu) */
    if(typeof FireSync!=='undefined'&&FireSync.isConnected)FireSync.pushToCloud();

    // ✅ Mode carte unique lancé depuis les stats / le menu Cartes global
    if(r.singleCardMode && r.returnTo) {
      const kind = r.returnTo.kind;
      State.review = null;
      $('#app').classList.remove('focus-mode');
      if(Nav.stack.length) Nav.stack.pop();
      if(kind === 'stats') goStats(false);
      else if(kind === 'cards') goAllCards(false);
      else goDeck(false);
    }
    // ✅ Mode carte unique → retour direct au menu Cartes
    else if(r.singleCardMode && r.returnToCards) {
      const ret = r.returnToCards;

      // Reconstruire le chapitre virtuel pour qu'il reflète les grades à jour
      if(ret.chapterId.startsWith('group-')) {
        const gid = ret.chapterId.replace('group-', '');
        const sub = getSub();
        const g = findGrp(sub, gid);
        if(g) State.virtualChapter = buildVirt(sub, g);
      }

      State.review = null;
      $('#app').classList.remove('focus-mode');
      if(Nav.stack.length) Nav.stack.pop();
      goCards(ret.chapterId, false, ret.searchQuery, ret.scrollPos, ret.cardId);
    } else {
      goRecap(!1);
    }
  }
}

function goRecap(push=true){
  exitDrive(); safeCloseLB(); Media.revokeAll();
  if(!State.review){ goDeck(!1); return }                 // aucune session en cours
  if(push)Nav.push(); State.view='recap'; const c=getCh(State.review.chapterId)||State.virtualChapter||getCh((State.review.multiChaps||[])[0])||{title:'Session',stats:mkStats(0)}; setTop({title:'Récapitulatif'}); setBot({actions:!1,revision:!1}); hideRevAct();
  const dur=(State.review.answers||[]).reduce((s,a)=>s+(a.ms||0),0), n=State.review.answers.length;
  $('#view').innerHTML = `
    <div class="card recap">
      <div>
        <h2>Session terminée</h2>
        <div class="subtitle">${c.title}</div>
      </div>
      <div class="grid2">
        <div class="stat"><div class="label">Réussite 7 j</div><div class="val">${get7dAvg(c)}</div></div>
        <div class="stat"><div class="label">Changement</div><div class="val">${getTodCh(c).total>0?M.round(getTodCh(c).changed/getTodCh(c).total*100):0}%</div></div>
        <div class="stat"><div class="label">Cartes révisées</div><div class="val">${getTod(c)}</div></div>
      </div>
      <div class="grid2">
        <div class="stat"><div class="label">Cette session</div><div class="val">${n}</div></div>
        <div class="stat"><div class="label">Durée</div><div class="val">${fmtDur(dur)}</div></div>
      </div>
      <div class="cta"><button class="btn btn--solid btn--primary" id="contBtn">${ico('zap','ico--sm')}<span>Continuer la révision</span></button></div>
      <button class="btn btn--ghost btn--sm" id="recapDeckBtn">${ico('layers','ico--sm')}<span>Revenir aux decks</span></button>
    </div>`;
  $('#recapDeckBtn').onclick = () => {
    if (typeof FireSync !== 'undefined' && FireSync.flushPending) FireSync.flushPending();
    goDeck(false);
  };
  $('#contBtn').onclick=()=>startRev(c.id,!1,true);
}

function continueOrNew(cid,queue,mode,push,isCont,extras={}){
  if(isCont&&State.review){State.review.queue.push(...queue);State.review.index++;State.review.flipped=!1;State.review.cardStart=Date.now();State.review.end=null}
  else State.review={chapterId:cid,queue,index:0,flipped:!1,answers:[],history:[],start:Date.now(),end:null,cardStart:Date.now(),...extras};
  goReview(push)
}

function startRev(cid,push=true,isCont=false){
  if(!cid)return;exitDrive();const c=getCh(cid);
  if(c.virtual&&c._ids)return startRevMulti(c._ids,c.id,c.filters,push,isCont);
  let sessionSize = c.settings.sessionSize;
  if(c.deadline){const ds=getDayStart();if(!c._goalCache||c._goalCache.day!==ds){const calc=getDailyGoalCalc(c);c._goalCache={day:ds,size:calc?.val||10,pool:calc?.pool||0}} sessionSize=c._goalCache.size}
  // ✅ Filtrage par type
  let pool=c.cards.filter(x=>cardPassesFilter(x,c.filters));
  if(isCont&&State.review?.queue){const seen=new Set(State.review.queue);pool=pool.filter(x=>!seen.has(x.id))}
  if(!pool.length){alert('Plus de cartes disponibles dans ce filtre.');return}
  c.lastUsed=Date.now();saveData();
  continueOrNew(cid,bldQ(c,pool,sessionSize).map(x=>x.id),null,push,isCont)
}
function startSingleCardReview(chapterId, cardId, searchQuery, scrollPos) {
  const c = getCh(chapterId);
  if(!c) return;
  const card = c.cards.find(x => x.id === cardId);
  if(!card) return;

  Nav.push();
  const returnInfo = { chapterId, cardId, searchQuery, scrollPos };

  if(card._origin) {
    State.review = {
      chapterId,
      queue: [{ chapId: card._origin.chapId, cardId: card._origin.cardId }],
      index: 0, flipped: false, answers: [], history: [],
      start: Date.now(), end: null, cardStart: Date.now(),
      mode: 'multi', multiChaps: [card._origin.chapId],
      singleCardMode: true, returnToCards: returnInfo
    };
  } else {
    State.review = {
      chapterId,
      queue: [cardId],
      index: 0, flipped: false, answers: [], history: [],
      start: Date.now(), end: null, cardStart: Date.now(),
      singleCardMode: true, returnToCards: returnInfo
    };
  }

  goReview(false);
}
function startRevMulti(ids,vid,flt,push=true,isCont=false){
  exitDrive();
  const all=ids.map(_real).filter(Boolean),pool=[];
  const seen=isCont&&State.review?new Set(State.review.queue.map(i=>i.cardId)):new Set();
  // ✅ Filtrage par type dans le mode multi
  all.forEach(ch=>ch.cards.forEach(c=>{
      if(!flt.grades[c.grade||'unseen']) return;
      if(flt.types && c.cardType && !flt.types[c.cardType]) return;
      if(seen.has(c.id)) return;
      pool.push({chapId:ch.id,card:c});
  }));
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

/* ══════════════════════════════════════════════════════════════════════════
   PARAMÈTRES
   Une seule page, accessible À TOUT MOMENT — avec ou sans chapitre ouvert.
   · Onglet « Application » : disponibles même sans chapitre sélectionné
   · Onglet « Chapitre »    : visible dès qu'un chapitre est ouvert
   Tout est appliqué immédiatement, puis sauvegardé (local + cloud).
   ══════════════════════════════════════════════════════════════════════════ */

const escTxt = s => String(s ?? '').replace(/[&<>"']/g, ch => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[ch]));
const fmtBytes = n => {
  n = n || 0;
  if (n < 1024) return n + ' o';
  if (n < 1024 * 1024) return (n / 1024).toFixed(n < 10240 ? 1 : 0) + ' Ko';
  if (n < 1024 * 1024 * 1024) return (n / 1048576).toFixed(1) + ' Mo';
  return (n / 1073741824).toFixed(2) + ' Go';
};

function openSet(cid, push = true, tab = null){
  safeCloseLB(); Media.revokeAll();
  if(cid === undefined || cid === null) cid = State.chapterId || null;
  let c = cid ? getCh(cid) : null;
  if(!c) cid = null;

  if(typeof stLeaveReviewGuard === 'function' && !stLeaveReviewGuard()) return;
  exitDrive();   // sortir du Drive
  if(push) Nav.push();
  State.view = 'settings';
  State.chapterId = cid;
  State.setTab = tab || State.setTab || 'general';
  if(!c && State.setTab === 'chapter') State.setTab = 'general';

  setTop({ title: c ? `Paramètres • ${c.title}` : 'Paramètres' });
  setBot({ actions: !1, revision: !1 }); hideRevAct();

  const v = $('#view');
  v.classList.remove('drive-open');
  const P = data.app.prefs;

  /* ── helpers locaux ──────────────────────────────────────────────────── */
  const save = () => {
    debouncedSave();
    if(typeof FireSync !== 'undefined' && FireSync.isConnected) FireSync.pushToCloud();
  };
  const sect = (title, body, note = '') =>
    `<div class="settings-section"><div class="section-title">${title}</div>${body}${note ? `<div class="set-note">${note}</div>` : ''}</div>`;
  const bindRow = (id, fn) => { const el = $(id); if(el) el.onclick = fn; };

  const slider = (id, obj, prop, { min, max, step = 1, suffix = '', fmt = null, hint = null, onChange = null } = {}) =>
    sRow('', hint && hint.icon || 'filter', hint && hint.title || '', hint && hint.sub || '',
         sVal('').replace('s-value', `s-value" id="${id}V`)) +
    `<div class="s-control">
       <button class="step-btn" type="button" id="${id}D" aria-label="Diminuer">−</button>
       <div class="s-slider-container"><input type="range" class="s-slider" id="${id}" min="${min}" max="${max}" step="${step}" value="${obj[prop] ?? min}" aria-label="${hint ? escTxt(hint.title) : prop}"></div>
       <button class="step-btn" type="button" id="${id}I" aria-label="Augmenter">+</button>
     </div>`;

  const bindSlider = (id, obj, prop, { min, max, step = 1, suffix = '', fmt = null, onChange = null, commit = true, cssVar = null, preview = null } = {}) => {
    const sld = $(id), dec = $(id + 'D'), inc = $(id + 'I'), val = $(id + 'V');
    if(!sld) return null;
    const norm = raw => {
      let n = step < 1 ? Math.round(raw / step) * step : Math.round(raw);
      n = clamp(+n.toFixed(3), min, max);
      return n;
    };
    const paint = (n, doCommit) => {
      obj[prop] = n;
      sld.value = n;
      sld.style.setProperty('--fill', ((n - min) / Math.max(1e-6, max - min) * 100).toFixed(1) + '%');
      if(val) val.textContent = fmt ? fmt(n) : n + suffix;
      if(cssVar) D.documentElement.style.setProperty(cssVar, n + 'px');
      if(preview){ const pe = $(preview); if(pe) pe.style.fontSize = n + 'px'; }
      if(onChange) onChange(n);
      if(doCommit && commit){ save(); haptic('light'); }
    };
    sld.oninput = () => paint(norm(+sld.value), false);
    sld.onchange = () => paint(norm(+sld.value), true);
    if(dec) dec.onclick = e => { e.stopPropagation(); paint(norm(+sld.value - step), true); };
    if(inc) inc.onclick = e => { e.stopPropagation(); paint(norm(+sld.value + step), true); };
    paint(norm(+sld.value), false);
    return paint;
  };

  const gradeChips = (filters, onToggle) => `<div class="chip-row" id="setGrades">${GRADES.map(g =>
      `<button type="button" class="chip ${filters[g] ? 'is-on' : ''}" data-grade="${g}"><span class="dot ${GC[g]}"></span>${g[0].toUpperCase() + g.slice(1)}</button>`).join('')}</div>`;

  /* ── coquille ────────────────────────────────────────────────────────── */
  const tabs = [
    { k:'general', label:'Application', icon:'settings' },
    ...(c ? [{ k:'chapter', label:'Chapitre', icon: c.virtual ? 'folder' : 'book' }] : [])
  ];
  v.innerHTML = `
    <div class="settings-page scroll-y">
      <div class="settings-hero">
        <div>
          <h1>Paramètres</h1>
          <p>${c ? `${escTxt(c.emoji || getEmoji(c.title) || '')} ${escTxt(c.title)} · ${c.cards.length} carte${c.cards.length > 1 ? 's' : ''}` : 'Réglages généraux — aucun chapitre ouvert'}</p>
        </div>
      </div>
      ${tabs.length > 1 ? `<div class="seg" id="setTabs">${tabs.map(t =>
        `<button type="button" class="seg__btn ${State.setTab === t.k ? 'is-active' : ''}" data-tab="${t.k}">${ico(t.icon, 'ico--xs')}<span>${t.label}</span></button>`).join('')}</div>` : ''}
      <div id="setBody"></div>
      <div class="settings-footer">Flashcards v${APP_VER} · JB. C</div>
    </div>
    <input type="file" id="impF" class="hidden" accept=".json,application/json">
    <input type="file" id="impCardsF" class="hidden" accept="*/*" multiple>`;

  $('#setTabs')?.addEventListener('click', e => {
    const b = e.target.closest('[data-tab]');
    if(!b || b.dataset.tab === State.setTab) return;
    openSet(cid, false, b.dataset.tab);
    const el = $('.settings-page'); if(el) el.scrollTop = 0;
  });

  /* ══════════════════════ ONGLET APPLICATION ══════════════════════════ */
  const paintGeneral = () => {
    const isDark = data.app.theme !== 'light';
    const prev = getPreviewTxt();
    const swatches = ['indigo','blue','teal','emerald','rose','amber','violet']
      .map(x => `<button type="button" class="swatch ${P.accent === x ? 'is-active' : ''}" data-accent="${x}" style="--sw:var(--${x === 'indigo' ? 'primary' : x})" aria-label="Accent ${x}"></button>`).join('');
    const fs = (typeof FireSync !== 'undefined') ? FireSync : null;
    const user = fs && fs.getUser ? fs.getUser() : null;
    const connected = !!(fs && fs.isConnected);
    const cloudOff = (typeof firebase === 'undefined');
    const media = Media.stats();
    const localSize = (() => { try { return (LS.getItem(KEY) || '').length + JSON.stringify(data).length; } catch { return 0; } })();

    return `
      ${sect('Apparence',
        sRow('rowTheme','moon-star','Mode sombre', isDark ? 'Thème sombre activé' : 'Thème clair activé', sToggle(isDark), 1) +
        sRow('rowFocus','target','Mode Zen (immersion)','Interface masquée pendant la révision', sToggle(!!P.focusMode), 1) +
        sRow('','palette','Couleur d\'accent','Appliquer à toute l\'application', `<div class="swatches">${swatches}</div>`)
      )}

      ${sect('Typographie',
        `<div class="preview-box"><div class="preview-recto" id="preT"></div><div class="preview-verso" id="preD"></div></div>` +
        slider('sldT', P, 'fsTerm', { min:12, max:72, suffix:' px', hint:{ icon:'Aa', title:'Taille Recto', sub:'Question / terme affiché en grand' }, cssVar:'--fs-term', preview:'#preT' }) +
        slider('sldD', P, 'fsDef', { min:12, max:72, suffix:' px', hint:{ icon:'Aa', title:'Taille Verso', sub:'Réponse / définition' }, cssVar:'--fs-def', preview:'#preD' }),
        'Sur ordinateur, <b>Maj + molette</b> ajuste ces tailles directement en révision.')}

      ${sect('Révision',
        slider('sldDefSize', P, 'sessionSize', { min:5, max:60, suffix:' cartes', hint:{ icon:'book-open', title:'Taille de session par défaut', sub:'Utilisée pour la révision multi-chapitres et les nouveaux chapitres' } }) +
        slider('sldGoal', P, 'dailyGoal', { min:5, max:200, step:5, suffix:' cartes', hint:{ icon:'target', title:'Objectif quotidien', sub:'But de cartes révisées par jour (progression affichée dans les stats)' } }) +
        slider('sldRet', P, 'desiredRetention', { min:0.80, max:0.97, step:0.01, fmt:v => Math.round(v * 100) + ' %', hint:{ icon:'sparkles', title:'Rétention cible (FSRS)', sub:'Probabilité de se souvenir d\'une carte au moment de la révision' } }) +
        sRow('rowMathDetail','sparkles','Résumé maths affiché d\'abord','Au verso, montre la version courte avant le détail', sToggle(!!P.mathDetail), 1),
        'Une rétention plus haute = intervalles plus courts, donc plus de révisions par jour.')}

      ${sect('Synchronisation',
        connected
          ? sRow('rowSyncNow','refresh','Synchroniser maintenant', escTxt(user?.email || 'Connecté'), sChev, 1) +
            sRow('rowSyncPush','upload','Envoyer vers le cloud','Écraser la version distante', sChev, 1) +
            sRow('rowSyncPull','download','Récupérer depuis le cloud','Remplacer les données locales', sChev, 1) +
            sRow('rowSyncBackup','archive','Restaurer une sauvegarde','Récupérer la dernière sauvegarde cloud', sChev, 1) +
            sRow('rowSyncOut','log-out','Se déconnecter','', '', 1)
          : sRow('rowSyncIn','cloud','Se connecter (Google)','Synchroniser entre plusieurs appareils', sChev, 1),
        cloudOff ? 'Firebase n\'a pas pu être chargé : l\'application fonctionne en mode 100 % local.' : (connected ? 'Les modifications sont envoyées automatiquement.' : 'Les données restent sur cet appareil tant que vous n\'êtes pas connecté.'))}

      ${sect('Données',
        sRow('rowExp','download','Exporter la sauvegarde','Fichier JSON de toutes les données', sChev, 1) +
        sRow('rowImp','upload','Importer une sauvegarde','Remplace les données actuelles', sChev, 1) +
        sRow('rowImpCards','package','Importer des cartes','Anki (.apkg), CSV / TSV, JSON', sChev, 1) +
        sRow('rowMedia','image','Médias importés', media.count ? `${media.count} fichier${media.count > 1 ? 's' : ''} · ${fmtBytes(media.size)}` : 'Aucun média importé', sChev, 1),
        `Données locales : <b>${fmtBytes(localSize)}</b> · chapitres : <b>${data.subjects.reduce((n, s) => n + s.chapters.length, 0)}</b> · cartes : <b>${data.subjects.reduce((n, s) => n + s.chapters.reduce((m, ch) => m + ch.cards.length, 0), 0)}</b>.`)}

      ${sect('Zone dangereuse',
        `<div class="set-actions">
           <button type="button" class="btn btn--red btn--sm" id="rowRstA">${ico('alert-triangle','ico--sm')}<span>Réinitialiser l'application</span></button>
           <button type="button" class="btn btn--outline btn--sm" id="rowWipeMedia">${ico('trash','ico--sm')}<span>Effacer les médias importés</span></button>
         </div>`,
        'La réinitialisation supprime <b>toutes</b> les données locales (progression, réglages, médias) après confirmation.')}`;
  };

  /* ══════════════════════ ONGLET CHAPITRE ═════════════════════════════ */
  const paintChapter = () => {
    const k = c.stats.gradeCounts || getLive(c);
    const dailyCalc = getDailyGoalCalc(c);
    const isMath = c.cards.some(x => x.cardType);
    return `
      ${sect('Identité',
        sRow('rowTitle','pencil','Nom', escTxt(c.title), sChev, 1) +
        sRow('rowEmoji','smile','Emoji', escTxt(c.emoji || getEmoji(c.title) || 'Aucun'), sChev, 1) +
        (c.virtual ? sRow('rowFolder','folder','Dossier (chapitre virtuel)','Les réglages s\'appliquent au dossier entier', '') : '')
      )}

      ${sect('Progression',
        `<div class="stats-grid set-grid">
           <div class="stat-card"><div class="stat-val">${c.cards.length}</div><div class="stat-lbl">Cartes</div></div>
           <div class="stat-card"><div class="stat-val">${k.unseen}</div><div class="stat-lbl">Non vues</div></div>
           <div class="stat-card"><div class="stat-val">${cntAv(c)}</div><div class="stat-lbl">À réviser</div></div>
           <div class="stat-card"><div class="stat-val">${getSucc(c)}%</div><div class="stat-lbl">Réussite</div></div>
         </div>
         <div class="section-title mt8">Filtre des niveaux</div>
         ${gradeChips(c.filters.grades)}` +
        (isMath ? `<div class="section-title mt8">Filtre des types (maths)</div>
          <div class="chip-row" id="setTypes">${MATH_TYPES.map(t => `<button type="button" class="chip ${c.filters.types?.[t] ? 'is-on' : ''}" data-type="${t}"><span class="dot" style="background:${TYPE_COLORS[t]}"></span>${TYPE_LABELS[t]}</button>`).join('')}</div>` : ''),
        'Les filtres déterminent les cartes proposées en révision (et le compteur « à réviser »).')}

      ${sect('Révision du chapitre',
        sRow('rowLang','arrow-left-right','Sens de lecture', c.settings.langSwap ? 'Verso → Recto' : 'Recto → Verso', sChev, 1) +
        slider('sldS', c.settings, 'sessionSize', { min:5, max:60, suffix:' cartes', hint:{ icon:'book-open', title:'Taille de session', sub:'Nombre de cartes tirées à chaque révision' } }) +
        (c.virtual ? '' : `<div class="s-row-inline">
            <div class="s-inline-label">${ico('calendar','ico--sm')}<span>Date limite de révision</span></div>
            <input type="date" id="deadlineInput" class="input" value="${c.deadline || ''}">
          </div>
          ${dailyCalc ? `<div class="goal-line" id="goalDisplay"><span>Objectif : <b>${dailyCalc.val}</b>/jour</span><span>Reste <b>${cntAv(c)}</b> cartes</span></div>` : ''}`)
      )}

      ${sect('Zone dangereuse',
        `<div class="set-actions">
           <button type="button" class="btn btn--outline btn--sm" id="rowRstC">${ico('rotate-ccw','ico--sm')}<span>Réinitialiser la progression</span></button>
           <button type="button" class="btn btn--red btn--sm" id="rowDelC">${ico('trash','ico--sm')}<span>${c.virtual ? 'Supprimer le dossier' : 'Supprimer le chapitre'}</span></button>
         </div>`,
        c.virtual ? 'Le dossier sera dissocié : les chapitres qu\'il contient ne sont pas supprimés.' : 'La suppression est définitive pour ce chapitre et ses cartes.')}`;
  };

  /* ── rendu + liaisons ────────────────────────────────────────────────── */
  const paintPanel = () => {
    const body = $('#setBody');
    if(!body) return;
    body.innerHTML = State.setTab === 'chapter' && c ? paintChapter() : paintGeneral();

    if(State.setTab === 'chapter' && c){
      /* filtres */
      $('#setGrades')?.addEventListener('click', e => {
        const b = e.target.closest('[data-grade]'); if(!b) return;
        const t = (c.virtual && c._groupId) ? (findGrp(getSub(), c._groupId) || c) : c;
        if(!t.filters) t.filters = { grades: GRADE_FILTERS() };
        togFilt(t, b.dataset.grade);
        if(t !== c) c.filters = deepClone(t.filters);
        save(); openSet(cid, false, 'chapter');
      });
      $('#setTypes')?.addEventListener('click', e => {
        const b = e.target.closest('[data-type]'); if(!b) return;
        const t = (c.virtual && c._groupId) ? (findGrp(getSub(), c._groupId) || c) : c;
        if(!t.filters) t.filters = { grades: GRADE_FILTERS() };
        if(!t.filters.types) t.filters.types = MATH_TYPE_FILTERS();
        togTypeFilt(t, b.dataset.type);
        if(t !== c) c.filters = deepClone(t.filters);
        save(); openSet(cid, false, 'chapter');
      });

      bindRow('#rowLang', () => { c.settings.langSwap = !c.settings.langSwap; save(); openSet(cid, false, 'chapter'); });
      bindSlider('#sldS', c.settings, 'sessionSize', { min:5, max:60 });
      bindRow('#rowTitle', () => {
        const t = prompt('Nouveau nom :', c.title);
        if(t && t.trim()){
          const nt = t.trim();
          if(c.virtual && c._groupId){ const g = findGrp(getSub(), c._groupId); if(g) g.title = nt; }
          else { const real = _real(c.id); if(real) real.title = nt; }
          c.title = nt; updChDesc(c); save(); openSet(cid, false, 'chapter');
        }
      });
      bindRow('#rowEmoji', () => {
        const e2 = prompt('Emoji (vide = aucun) :', c.emoji || getEmoji(c.title) || '');
        if(e2 !== null){
          const ne = e2.trim();
          if(c.virtual && c._groupId){ const g = findGrp(getSub(), c._groupId); if(g) g.emoji = ne; }
          else { const real = _real(c.id); if(real) real.emoji = ne; }
          c.emoji = ne; updChDesc(c); save(); openSet(cid, false, 'chapter');
        }
      });
      const dl = $('#deadlineInput');
      if(dl) dl.onchange = e => {
        const val = e.target.value || null;
        if(c.virtual && c._groupId){ const g = findGrp(getSub(), c._groupId); if(g) g.deadline = val; }
        else { const real = _real(c.id); if(real) real.deadline = val; c.deadline = val; }
        delete c._goalCache;
        save(); openSet(cid, false, 'chapter');
      };
      bindRow('#rowRstC', () => {
        if(!confirm(`Réinitialiser la progression de « ${c.title} » ?`)) return;
        const targets = (c.virtual && c._ids) ? c._ids.map(_real).filter(Boolean) : [_real(c.id) || c];
        targets.forEach(ch => {
          ch.cards.forEach(x => Object.assign(x, { grade:'unseen', timesReviewed:0, lastReviewed:0, ef:2.5, intervalDays:0, dueAt:0, streak:0, stability:0, difficulty:0, successes:0, failures:0 }));
          ch.stats = mkStats(ch.cards.length);
        });
        save(); toast('Progression réinitialisée', 'success'); openSet(cid, false, 'chapter');
      });
      bindRow('#rowDelC', () => {
        if(c.virtual && c._groupId){
          if(!confirm(`Supprimer le dossier « ${c.title} » ?`)) return;
          delGrp(getSub(), c._groupId); State.virtualChapter = null; save();
          toast('Dossier supprimé', 'success'); goDeck(false);
          return;
        }
        if(!confirm(`Supprimer « ${c.title} » et ses ${c.cards.length} cartes ?`)) return;
        const sub = getSub(), i = sub.chapters.findIndex(x => x.id === c.id);
        if(i >= 0){
          ensGrps(sub).forEach(g => g.chapIds = (g.chapIds || []).filter(x => x !== c.id));
          valGrps(sub); sub.chapters.splice(i, 1); save();
          toast('Chapitre supprimé', 'success'); State.chapterId = null; goDeck(false);
        }
      });
      return;
    }

    /* ── onglet application ── */
    const preBox = body.querySelector('.preview-box');
    if(preBox){
      const pv = getPreviewTxt();
      $('#preT').innerHTML = formatText(pv.f);
      $('#preD').innerHTML = formatText(pv.b);
      Media.resolve(preBox); tsLat(preBox);
    }
    bindSlider('#sldT', P, 'fsTerm', { min:12, max:72, cssVar:'--fs-term', preview:'#preT' });
    bindSlider('#sldD', P, 'fsDef', { min:12, max:72, cssVar:'--fs-def', preview:'#preD' });
    bindSlider('#sldDefSize', P, 'sessionSize', { min:5, max:60 });
    bindSlider('#sldGoal', P, 'dailyGoal', { min:5, max:200, step:5 });
    bindSlider('#sldRet', P, 'desiredRetention', { min:0.80, max:0.97, step:0.01 });

    bindRow('#rowTheme', () => { data.app.theme = data.app.theme === 'light' ? 'dark' : 'light'; save(); applyTh(); openSet(cid, false, 'general'); });
    bindRow('#rowFocus', () => { P.focusMode = !P.focusMode; save(); openSet(cid, false, 'general'); });
    bindRow('#rowMathDetail', () => { P.mathDetail = !P.mathDetail; save(); openSet(cid, false, 'general'); });

    $$('.swatch').forEach(b => b.onclick = e => {
      e.stopPropagation();
      P.accent = b.dataset.accent;
      save(); applyUI();
      $$('.swatch').forEach(x => x.classList.toggle('is-active', x === b));
      haptic('light');
    });

    const fs = (typeof FireSync !== 'undefined') ? FireSync : null;
    bindRow('#rowSyncIn', () => fs && fs.login());
    bindRow('#rowSyncNow', () => { if(fs) { toast('Synchronisation…', 'info'); fs.syncNow(); } });
    bindRow('#rowSyncPush', () => { if(fs && confirm('Envoyer les données locales vers le cloud ?')) fs.pushToCloud(); });
    bindRow('#rowSyncPull', () => { if(fs && confirm('Remplacer les données locales par celles du cloud ?')) fs.pullFromCloud(); });
    bindRow('#rowSyncBackup', () => { if(fs && confirm('Restaurer la dernière sauvegarde cloud ?')) fs.restoreFromBackup(); });
    bindRow('#rowSyncOut', () => { if(fs && confirm('Se déconnecter du cloud ?')) fs.logout(); });

    bindRow('#rowExp', () => {
      const a = D.createElement('a');
      a.href = URL.createObjectURL(new Blob([JSON.stringify(data)], { type:'application/json' }));
      a.download = `flashcards-${dateKey(new Date())}.json`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    });
    bindRow('#rowImp', () => $('#impF')?.click());
    bindRow('#rowImpCards', () => $('#impCardsF')?.click());
    bindRow('#rowMedia', () => { goStats(false, { subjectId:'', chapterId:'', tab:'media' }); });

    const impF = $('#impF');
    if(impF) impF.onchange = async e => {
      const f = e.target.files?.[0];
      if(!f) return;
      if(confirm('Écraser toutes les données actuelles par cette sauvegarde ?')){
        try {
          const obj = JSON.parse(await f.text());
          data = obj; upgrade(); applyTh(); applyUI(); saveData();
          toast('Sauvegarde restaurée', 'success');
          goDeck(false);
        } catch(err){ toast('Fichier invalide', 'error'); }
      }
      e.target.value = '';
    };
    const impCF = $('#impCardsF');
    if(impCF) impCF.onchange = async e => {
      const files = [...(e.target.files || [])];
      if(!files.length) return;
      try { await importFiles(files); toast('Import terminé', 'success'); goDeck(false); }
      catch(err){ console.error(err); toast('Import impossible', 'error'); }
      e.target.value = '';
    };

    bindRow('#rowWipeMedia', async () => {
      if(!confirm('Effacer tous les médias importés (images/documents des cartes importées) ?')) return;
      await Media.clearAll(); save();
      toast('Médias effacés', 'success'); openSet(cid, false, 'general');
    });
    bindRow('#rowRstA', async () => {
      if(!confirm('⚠️ Supprimer TOUTES les données (progression, réglages, médias) ?')) return;
      try { await Media.clearAll(); } catch {}
      LS.removeItem(KEY);
      location.reload();
    });
  };

  paintPanel();
}

function applyTh(){ D.documentElement.dataset.theme = data.app.theme }

function applyUI(){ const p=data.app.prefs; D.documentElement.style.setProperty('--fs-term',p.fsTerm+'px'); D.documentElement.style.setProperty('--fs-def',p.fsDef+'px'); const pl={indigo:['#6366f1','#5457e6'],blue:['#3b82f6','#2563eb'],teal:['#14b8a6','#0d9488'],emerald:['#10b981','#059669'],rose:['#f43f5e','#e11d48'],amber:['#f59e0b','#d97706'],violet:['#8b5cf6','#7c3aed']}, c=pl[p.accent]||pl.indigo; D.documentElement.style.setProperty('--primary',c[0]); D.documentElement.style.setProperty('--primary-600',c[1]) }
function reconcile(){ 
  const c=buildCanon(), o=data.subjects||[], oMap=Object.fromEntries(o.map(s=>[s.title,s])); 
  data.subjects=c.map(x=>{
    const old=oMap[x.title]||{}, ocMap=Object.fromEntries((old.chapters||[]).map(c=>[c.title,c])); 
    const chs=x.chapters.map(nc=>{
      const oc=ocMap[nc.title]; if(!oc)return nc; 
      const cardMap=Object.fromEntries(oc.cards.map(c=>[extractId(c.id),c])); 
      return{...nc,stats:{...oc.stats},cards:nc.cards.map(cd=>{const oldC=cardMap[extractId(cd.id)]; return oldC?{...cd,grade:oldC.grade,ef:oldC.ef,intervalDays:oldC.intervalDays,dueAt:oldC.dueAt}:cd})}
    }); 
    // ✅ Conserver les chapitres créés manuellement (pas dans le canon)
    const canonTitles = new Set(x.chapters.map(nc => nc.title));
    const userChapters = (old.chapters||[]).filter(oc => !canonTitles.has(oc.title));
    return{...x,chapters:[...chs, ...userChapters],groups:old.groups||[]}
  }); 
  o.forEach(x=>{if(!data.subjects.find(z=>z.id===x.id))data.subjects.push(x)}); 
  if(!data.subjects.find(x=>x.id===data.app.currentSubjectId))data.app.currentSubjectId=data.subjects[0].id 
}
function upgrade() {
  // 1. Initialisation des préférences de base
  if (!data.app) data.app = { theme: 'dark' };
  data.app.prefs = {
    fsTerm: 22, fsDef: 24, accent: 'indigo', radius: 14,
    sessionSize: 10, dailyGoal: 20, desiredRetention: 0.9,
    focusMode: false, mathDetail: false,
    ...(data.app.prefs || {})
  };
  if (data.app.prefs.mathDetail === undefined) data.app.prefs.mathDetail = false;
  if (!data.app.prefs.hasOwnProperty('mathDetail')) data.app.prefs.mathDetail = false;
  if (typeof data.app.prefs.desiredRetention !== 'number' || data.app.prefs.desiredRetention <= 0 || data.app.prefs.desiredRetention > 1) data.app.prefs.desiredRetention = 0.9;
  if (!(data.app.prefs.sessionSize > 0)) data.app.prefs.sessionSize = 10;
  if (!(data.app.prefs.dailyGoal > 0)) data.app.prefs.dailyGoal = 20;

  // ── Migration SM-2 → FSRS (Le nouveau bloc à ajouter ici) ──
  if (!data.app._fsrsMigrated) {
    data.subjects.forEach(s => {
      (s.chapters || []).forEach(ch => {
        ch.cards.forEach(card => {
          if (card.timesReviewed > 0 && !card.stability) {
            // Estimer la stabilité à partir de l'ancien intervalDays
            card.stability = Math.max(0.5, card.intervalDays || 1);
            // Convertir ef en difficulté FSRS (1-10)
            const ef = card.ef || 2.5;
            // Utilisation de Math.min(Math.max()) si clamp n'est pas défini globalement
            card.difficulty = Math.min(Math.max(Math.round((3.5 - ef) / 0.2), 1), 10);
          }
        });
      });
    });
    data.app._fsrsMigrated = true;
    if (typeof saveData === 'function') saveData(); // Sauvegarde les changements
    console.log('[FSRS] Migration SM-2 → FSRS completed');
  }

  // 2. Mise à jour des structures de données existantes
  data.subjects.forEach(s => {
    ensGrps(s).forEach(g => {
      if (!g.childGroupIds) g.childGroupIds = [];
      if (!g.parentGroupId) g.parentGroupId = null;
      if (!g.chapIds) g.chapIds = [];
    });
    valGrps(s);
    s.emoji = s.emoji || '';

    // Ajout des filtres type pour les chapitres math
    const isMathSub = /math/i.test(s.title || '');
    s.chapters.forEach(c => {
      c.emoji = c.emoji || '';
      updChDesc(c);
      c.stats.dailyLog = c.stats.dailyLog || {};
      syncG(c);
      if (isMathSub && !c.filters.types && c.cards.some(x => x.cardType)) {
        if (typeof MATH_TYPE_FILTERS === 'function') {
          c.filters.types = MATH_TYPE_FILTERS();
        }
      }
    });
  });

  if (typeof ensureMathGrouped === 'function') ensureMathGrouped();
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
    // ✅ S'assurer que le groupe a les filtres types
    if(!existing.filters) existing.filters = { grades: GRADE_FILTERS() };
    if(!existing.filters.types) existing.filters.types = MATH_TYPE_FILTERS();
  } else {
    grps.push({
      id: 'g-math-all',
      chapIds: courseChaps.map(c => c.id),
      childGroupIds:[],
      parentGroupId: null,
      createdAt: Date.now(),
      title: 'Tous les chapitres',
      emoji: '📖',
      lastUsed: Date.now(),
      // ✅ Ajout des filtres par défaut lors de la création
      filters: { grades: GRADE_FILTERS(), types: MATH_TYPE_FILTERS() }
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

const GEMINI_KEY='';

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

Réponds UNIQUEMENT en JSON valide, sans markdown, sans backticks:[{"id":"...","wrong":["...","...","..."]}]

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
    // ✅ Filtrage par type (Multi)
    all.forEach(ch=>ch.cards.forEach(card=>{
        if(!c.filters.grades[card.grade||'unseen']) return;
        if(c.filters.types && card.cardType && !c.filters.types[card.cardType]) return;
        pool.push({chapId:ch.id,card});
    }));
    if(pool.length<2){alert('Pas assez de cartes.');return}
    if(all.reduce((s,ch)=>s+ch.cards.length,0)<4){alert('Il faut au moins 4 cartes.');return}
    const wt={unseen:6,echec:5,difficile:3.5,bien:2,facile:1};
    const scored=pool.map(i=>({chapId:i.chapId,cardId:i.card.id,w:(wt[i.card.grade||'unseen']||1)*(.9+M.random()*.2)})).sort((a,b)=>b.w-a.w);
    const sz=M.round(all.reduce((s,ch)=>s+(ch.settings.sessionSize||10),0)/all.length)||10;
    if(cid.startsWith('group-')){const g=findGrp(getSub(),cid.replace('group-',''));if(g){g.lastUsed=Date.now();saveData()}}
    queue=scored.slice(0,sz);mode='multi';multiChaps=c._ids.slice();
  }else{
    // ✅ Filtrage par type (Solo)
    const pool=c.cards.filter(x=>cardPassesFilter(x,c.filters));
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
  const undoBtn=r.history.length?`<button id="undoBtn" title="Annuler la dernière réponse">${ico('rotate-ccw','ico--sm')}</button>`:'';
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
    <div class="review-top">
      <div class="review-top__left">${undoBtn}<span class="chap">QCM · ${chap.title}</span></div>
      <div class="review-count"><b>${idx}</b> / ${tot}</div>
    </div>
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

// Polyfill
window.requestIdleCallback = window.requestIdleCallback ||
  function(cb, opts) { return setTimeout(cb, opts?.timeout || 1); };

function removeSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;
  splash.style.opacity = '0';
  setTimeout(() => splash.remove(), 300);
}

async function syncInBackground() {
  if (typeof firebase === 'undefined') return; // mode local : pas de sync
  if (!FireSync.isConnected) {
    /* Attendre la restauration de la session (peut prendre quelques
       secondes sur téléphone) avant la synchronisation de démarrage */
    await Promise.race([
      new Promise(resolve => {
        const unsub = firebase.auth().onAuthStateChanged(user => {
          if (user) { unsub(); resolve(); }
        });
      }),
      new Promise(resolve => setTimeout(resolve, 8000))
    ]);
  }

  if (FireSync.isConnected) {
    try {
      await FireSync.pullIfNewer();
    } catch (e) {
      console.warn('[Init] Cloud pull failed:', e);
    }
  }
}

// ✅ loadMathLazy supprimé car données math RAW_MATH dans data.js

async function init() {
  Media.open();

  try {
    data = loadData();

    if (data.app?.version !== APP_VER) {
      reconcile();
      data.app.version = APP_VER;
      saveData({ quiet: true });
    }

    // ✅ Reset maths one-shot : change le tag pour forcer un nouveau reset
    if(data.app._mathReset !== MATH_FINGERPRINT) {
      data.subjects = (data.subjects ||[]).filter(s => !/math/i.test(s.title || ''));
      const freshMath = buildMathSub();
      data.subjects.splice(1, 0, freshMath);
      data.app._mathReset = MATH_FINGERPRINT;
      saveData();
      console.log('[MATH RESET] Done — new math chapters loaded');
    }

    pruneStats();
    upgrade();
    applyTh();
    applyUI();
    Nav.clear();
    goDeck(false);

    removeSplash();

    requestIdleCallback(() => {
      if (typeof FireSync !== 'undefined') {
        FireSync.initSyncButton();
        syncInBackground();
      }
    }, { timeout: 2000 });

    // ✅ Appel loadMathLazy supprimé

    setInterval(() => saveData({ quiet: true }), 30000);

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        saveData({ quiet: true });
        if (typeof FireSync !== 'undefined' && FireSync.isConnected) {
          FireSync.pushToCloud();
        }
      } else if (document.visibilityState === 'visible') {
        if (typeof FireSync !== 'undefined' && FireSync.isConnected) {
          FireSync.checkRemote();
        }
      }
    });
    /* pagehide : dernier effort avant la fermeture de l'onglet/app
       (couvre iOS quand visibilitychange ne suffit pas) */
    window.addEventListener('pagehide', () => {
      try { saveData({ quiet: true }); } catch (e) {}
      if (typeof FireSync !== 'undefined' && FireSync.isConnected) FireSync.pushToCloud();
    });

  } catch (e) {
    console.error('Init error, resetting:', e);
    try {
      localStorage.removeItem(KEY);
      data = loadData();
      upgrade(); applyTh(); applyUI(); Nav.clear(); goDeck(false);
    } catch (e2) {
      console.error('Init reset failed:', e2);
    } finally {
      removeSplash(); // le splash doit disparaître dans tous les cas
    }
  }
}

init();
