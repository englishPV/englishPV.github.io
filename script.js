import { flashcardData, CHAPTER_EMOJIS } from './data.js';

// Utils & état
const $=id=>document.getElementById(id);
const on=(el,ev,fn,opt)=>el&&el.addEventListener(ev,fn,opt||false);
const DAY_MS=86400000, MIN_MS=60000, HOUR_MS=3600000;
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
const nowMs=()=>Date.now();
const isoDate=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;

// SRS config (espacement adaptatif + Leitner)
const SRS_CFG={
  startEase:2.3, minEase:1.3, maxEase:3.5,
  hardMult:1.2, easyBonus:1.15,
  easeAdj:{again:-0.25,hard:-0.15,good:+0.05,easy:+0.15},
  newStepsMin:[1,10],             // minutes (nouvelle carte)
  relearnStepsMin:[10,1440],      // minutes (réapprentissage après oubli)
  graduatingIvlDays:1,            // interval initial après apprentissage
  lapseResetFactor:0.5,           // réduction d'intervalle après oubli
  // Leitner: bornes d’intervalle par boîte (en jours)
  boxBounds:{
    1:{min:0.08,max:1},   // 2h -> 1j
    2:{min:2,max:4},      // 2 -> 4j
    3:{min:5,max:12},     // 5 -> 12j
    4:{min:15,max:45},    // 15 -> 45j
    5:{min:45,max:120}    // 45 -> 120j
  }
};

const GradeNames={1:'again',2:'hard',3:'good',4:'easy'};
const FAST_CHAR_MS=180, AUTO_ADVANCE_MS=120;

const S={
  allCards:[], currentDeck:[], currentIndex:0, currentChapter:'Tout',
  availableChapters:['Tout'],
  elapsedSeconds:0, darkMode:false, currentTheme:'default', reverseMode:false,
  streak:0, maxStreak:0, answerStartAt:null,
  isRevealed:false, awaitingGrade:false, awaitingAdvance:false,
  dailyHistory:{}, sessionNewShown:0, seenCountInSession:0,
  searchIndex:[],
  adaptiveScheduler:null, // hook IA optionnel
  // Cycle unique par chapitre
  cycle: { chapter:'Tout', seen:{} } // seen: { [cardId]: true }
};

const els={
  burgerButton:$('burger-button'), sidebarMenu:$('sidebar-menu'), menuOverlay:$('menu-overlay'), closeMenuButton:$('close-menu-button'),
  menuChapters:$('menu-chapters'), resetOptions:$('reset-options'), resetDataButton:$('reset-data-button'),
  searchBar:$('search-bar'), searchResultsContainer:$('search-results-container'),
  reverseModeButton:$('reverse-mode-button'), darkModeToggle:$('dark-mode-toggle'), themeSelector:$('theme-selector'),
  currentChapterLabel:$('current-chapter-label'),
  flashcardContainer:$('flashcard-container'), cardFrenchWord:$('card-french-word'), cardEnglishWord:$('card-english-word'),
  cardScore:$('card-score'), messageArea:$('message-area'), answerInput:$('answer-input'), submitAnswerButton:$('submit-answer-button'),
  gradeBar:$('grade-bar'),
  timer:$('timer'), streakBadge:$('streak-badge'),
  progressText:$('progress-text'), progressBarFill:$('progress-bar-fill'), progressPercentage:$('progress-percentage'),
  statsContent:$('stats-content'), sparkline:$('sparkline'), sparkPath:$('sparkline-path'), sparkFill:$('sparkline-fill'), sparkLast:$('sparkline-last'), chartLegend:$('chart-legend'), chartTitle:$('chart-title')
};

// UI helpers
function showMsg(text,cls,timeout=1600){els.messageArea.textContent=text;els.messageArea.className='w-full text-center h-6 text-sm font-medium '+(cls||'');if(timeout){setTimeout(()=>{if(els.messageArea.textContent===text)els.messageArea.textContent=''},timeout)}}
function renderTimer(){const s=S.elapsedSeconds,h=String(s/3600|0).padStart(2,'0'),m=String((s%3600)/60|0).padStart(2,'0'),sec=String(s%60).padStart(2,'0');els.timer.textContent=`${h}:${m}:${sec}`}
function notSeenInCycleList(base){ return base.filter(c=>!S.cycle.seen[String(c.id)]) }
function renderProgressBar(){
  const total = baseListForCurrentChapter().length;
  const seenCycle = total - notSeenInCycleList(baseListForCurrentChapter()).length;
  const pct = total ? Math.min(100, Math.round(seenCycle * 100 / total)) : 0;
  els.progressText.textContent = `Cycle: ${seenCycle}/${total}`;
  els.progressBarFill.style.width = `${pct}%`;
  if (els.progressPercentage) els.progressPercentage.textContent = `${pct}%`;
}
function setSubmitVisible(v){els.submitAnswerButton.classList.toggle('hidden',!v)}
function setInputDisabled(v){els.answerInput.disabled=!!v}
function setGradeBarVisible(v){els.gradeBar.classList.toggle('hidden',!v)}
function applyNeutralCardStyle(){const el=els.flashcardContainer;el.classList.remove('light-mode-card-neutral','dark-mode-card-neutral');el.classList.add(S.darkMode?'dark-mode-card-neutral':'light-mode-card-neutral')}
function minutesToMs(m){return m*MIN_MS} function daysToMs(d){return d*DAY_MS}
function formatInterval(ms){if(ms<MIN_MS) return `${Math.max(1,Math.round(ms/1000/10)*10)}s`; if(ms<60*MIN_MS) return `${Math.round(ms/MIN_MS)}m`; if(ms<DAY_MS) return `${Math.round(ms/(60*MIN_MS))}h`; const d=Math.round(ms/DAY_MS); return d<30?`${d}j`:`${Math.round(d/30)}mo`}

function setMenuOpen(open){
  els.sidebarMenu.classList.toggle('menu-slide-in',open);
  els.sidebarMenu.classList.toggle('menu-slide-out',!open);
  document.body.classList.toggle('menu-open',open);
  els.menuOverlay.setAttribute('aria-hidden',String(!open));
  els.sidebarMenu.setAttribute('aria-hidden',String(!open));
  els.burgerButton.setAttribute('aria-expanded',String(!!open));
}

function setDarkMode(onMode){
  S.darkMode=!!onMode; document.body.classList.toggle('dark-mode',S.darkMode); document.body.classList.toggle('light-mode',!S.darkMode);
  els.darkModeToggle.innerHTML=S.darkMode?'☀':'🌙'; els.darkModeToggle.setAttribute('aria-pressed',String(S.darkMode));
  saveState();
}

// Leitner helpers
function clampToBoxBounds(intervalDays, box){
  const b=SRS_CFG.boxBounds[clamp(box,1,5)];
  if(!b) return intervalDays;
  return clamp(intervalDays, b.min, b.max);
}
function updateBox(prevBox, gName){
  const delta = gName==='again'?-1 : gName==='hard'?0 : gName==='good'?1 : 2;
  return clamp((prevBox||1)+delta,1,5);
}
function computeMasteryScore(c){
  const box = Number.isFinite(c.box)?c.box:1;
  const reps = Number.isFinite(c.reps)?c.reps:0;
  const lapses = Number.isFinite(c.lapses)?c.lapses:0;
  const base = 20*box + 10*Math.min(reps,5) - 15*lapses;
  return clamp(Math.round(base),0,100);
}
function masteryCategory(score){
  if(score<50) return 'À revoir souvent';
  if(score<80) return 'En progression';
  return 'Maîtrisé';
}

// Modèle carte & scheduler
function upgradeCardModel(c0){
  const c={...c0};
  c.ef=Number.isFinite(c.ef)?c.ef:SRS_CFG.startEase;
  c.box=Number.isFinite(c.box)?c.box:1;
  c.reps=Number.isFinite(c.reps)?c.reps:0;
  c.lapses=Number.isFinite(c.lapses)?c.lapses:0;

  c.intervalDays=Number.isFinite(c.intervalDays)?c.intervalDays:0;
  c.state=c.state||'new';
  c.stepIndex=Number.isFinite(c.stepIndex)?c.stepIndex:0;

  c.revCount=Number.isFinite(c.revCount)?c.revCount:0;
  c.okCount=Number.isFinite(c.okCount)?c.okCount:0;
  c.totalTimeMs=Number.isFinite(c.totalTimeMs)?c.totalTimeMs:0;
  c.lastScorePct=Number.isFinite(c.lastScorePct)?c.lastScorePct:null;
  c.lastGrade=Number.isFinite(c.lastGrade)?c.lastGrade:null;
  c.lastSeen=Number.isFinite(c.lastSeen)?c.lastSeen:0;
  c.nextDue=Number.isFinite(c.nextDue)?c.nextDue:0;
  c.lastLatency=Number.isFinite(c.lastLatency)?c.lastLatency:0;

  c.masteryScore=Number.isFinite(c.masteryScore)?c.masteryScore:computeMasteryScore(c);
  return c;
}

function computeNextIntervalDaysReview(card, gName){
  const prev = Math.max(card.intervalDays||1, 0.04);
  if(gName==='hard')  return Math.max(1, Math.round(prev * SRS_CFG.hardMult));
  if(gName==='good')  return Math.round(prev * (card.ef||SRS_CFG.startEase));
  if(gName==='easy')  return Math.round(prev * ((card.ef||SRS_CFG.startEase) + 0.15));
  return 0.25;
}

async function scheduleWithGrade(card, grade){
  const now=nowMs(); const gName=GradeNames[grade]||'good';
  const before = {...card};

  const deltaEase = SRS_CFG.easeAdj[gName]||0;
  card.ef = clamp((card.ef||SRS_CFG.startEase)+deltaEase, SRS_CFG.minEase, SRS_CFG.maxEase);
  card.box = updateBox(card.box||1, gName);

  if(gName==='again'){ card.reps=0; card.lapses=(card.lapses||0)+1; }
  else if(gName==='hard'){ card.reps = Math.max(1, (card.reps||0)); }
  else { card.reps=(card.reps||0)+1; }

  card.lastSeen = now;

  if(card.state==='new' || card.state==='learning'){
    if(gName==='again'){
      card.state='learning';
      card.stepIndex=0;
      card.nextDue=now+minutesToMs(SRS_CFG.newStepsMin[0]);
    } else if(gName==='hard'){
      card.state='learning';
      const idx = Math.max(0, card.stepIndex|0);
      const step = SRS_CFG.newStepsMin[idx] ?? SRS_CFG.newStepsMin.at(-1);
      card.stepIndex=idx;
      card.nextDue=now+minutesToMs(step);
    } else if(gName==='good'){
      const nextIdx=(card.stepIndex|0)+1;
      if(nextIdx < SRS_CFG.newStepsMin.length){
        card.state='learning';
        card.stepIndex=nextIdx;
        card.nextDue=now+minutesToMs(SRS_CFG.newStepsMin[nextIdx]);
      } else {
        card.state='review';
        card.intervalDays=SRS_CFG.graduatingIvlDays;
        card.intervalDays = clampToBoxBounds(card.intervalDays, card.box);
        card.nextDue=now+daysToMs(card.intervalDays);
      }
    } else if(gName==='easy'){
      card.state='review';
      const ivl = Math.max(1, Math.round(SRS_CFG.graduatingIvlDays * 3));
      card.intervalDays = clampToBoxBounds(ivl, card.box);
      card.nextDue=now+daysToMs(card.intervalDays);
    }
  } else if(card.state==='review'){
    if(gName==='again'){
      card.state='relearning';
      card.stepIndex=0;
      card.nextDue=now+minutesToMs(SRS_CFG.relearnStepsMin[0]);
    } else {
      let ivl = computeNextIntervalDaysReview(card, gName);
      ivl = clampToBoxBounds(ivl, card.box);
      card.intervalDays = ivl;
      card.nextDue = now + daysToMs(ivl);
    }
  } else if(card.state==='relearning'){
    if(gName==='again'){
      card.stepIndex=0;
      card.nextDue=now+minutesToMs(SRS_CFG.relearnStepsMin[0]);
    } else if(gName==='hard'){
      const idx=Math.max(0,card.stepIndex|0);
      const step=SRS_CFG.relearnStepsMin[idx]??SRS_CFG.relearnStepsMin.at(-1);
      card.stepIndex=idx;
      card.nextDue=now+minutesToMs(step);
    } else {
      const nextIdx=(card.stepIndex|0)+1;
      if(nextIdx < SRS_CFG.relearnStepsMin.length){
        card.stepIndex=nextIdx;
        card.nextDue=now+minutesToMs(SRS_CFG.relearnStepsMin[nextIdx]);
      } else {
        card.state='review';
        const reduced=Math.max(1,Math.round((card.intervalDays||1)*SRS_CFG.lapseResetFactor));
        card.intervalDays = clampToBoxBounds(reduced, card.box);
        card.nextDue=now+daysToMs(card.intervalDays);
      }
    }
  }

  if (typeof S.adaptiveScheduler === 'function'){
    try{
      const suggest = await S.adaptiveScheduler({card, stateBefore:before, rating:gName});
      if(suggest){
        if(Number.isFinite(suggest.box)) card.box = clamp(suggest.box,1,5);
        if(Number.isFinite(suggest.intervalDays) && suggest.intervalDays>0 && card.state==='review'){
          const mixed = 0.7*(card.intervalDays||1) + 0.3*suggest.intervalDays;
          card.intervalDays = clampToBoxBounds(mixed, card.box);
          card.nextDue = now + daysToMs(card.intervalDays);
        }
      }
    }catch(e){}
  }

  card.masteryScore = computeMasteryScore(card);
  return (card.nextDue - now);
}

// Similarité & grading auto
const ARTICLES_TO_IGNORE=['a','an','the','un','une','des','le','la','les',"l'"];
const STRIP_DIACRITICS=/[\u0300-\u036f]/g;
const normalizeAnswer=s=>(s||'').toLowerCase().normalize('NFD').replace(STRIP_DIACRITICS,'').replace(/[_-]/g,' ').replace(/[^a-z' ]+/g,' ').replace(/\s+/g,' ').trim();
const removeArticlesTokens=s=>s.split(' ').filter(w=>!ARTICLES_TO_IGNORE.includes(w)).join(' ');
const expandAlternatives=s=>String(s).split(/[\/,]/).map(x=>x.trim()).filter(Boolean);
function levenshtein(a,b){const n=a.length,m=b.length;if(!n)return m;if(!m)return n;const dp=Array(n+1).fill(null).map(()=>new Uint16Array(m+1));for(let j=0;j<=m;j++)dp[0][j]=j;for(let i=1;i<=n;i++){dp[i][0]=i;const ai=a.charCodeAt(i-1);for(let j=1;j<=m;j++){const cost=(ai===b.charCodeAt(j-1))?0:1;dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+cost)}}return dp[n][m]}
function bestSimilarity(userNorm, correctFull){
  let bestSim=0, exact=false;
  for(const cand of expandAlternatives(correctFull)){
    const cNorm=normalizeAnswer(cand); if(!cNorm) continue;
    const uNoArt=removeArticlesTokens(userNorm), cNoArt=removeArticlesTokens(cNorm);
    if(uNoArt===cNoArt){ exact=true; bestSim=1; break; }
    const dist=levenshtein(userNorm,cNorm), sim=1-dist/Math.max(1,Math.max(userNorm.length,cNorm.length));
    if(sim>bestSim) bestSim=sim;
  }
  return {bestSim, exact};
}
function scorePctFor(grade, exact, sim, msPerChar){
  const base={1:35,2:60,3:85,4:94}[grade]||85; let delta=0;
  if(msPerChar<=FAST_CHAR_MS*0.6) delta+=4; else if(msPerChar<=FAST_CHAR_MS) delta+=2; else delta-=2;
  if(!exact){ if(sim<0.40) delta-=15; else if(sim<0.70) delta-=8; else if(sim<0.85) delta-=3; else if(sim<0.95) delta-=1; }
  return clamp(Math.round(base+delta),10,98);
}
function gradeFromTyped(userInput, correctFull, latencyMs){
  const uNorm=normalizeAnswer(userInput); if(!uNorm) return {grade:1,scorePct:35,exact:false};
  const {bestSim,exact}=bestSimilarity(uNorm,correctFull); const chars=uNorm.replace(/\s+/g,'').length||1; const msPerChar=latencyMs>0?latencyMs/chars:Infinity;
  if(exact){ const grade=(msPerChar<=FAST_CHAR_MS)?4:3; return {grade,scorePct:scorePctFor(grade,true,1,msPerChar),exact:true}; }
  if(bestSim>=0.90){ const grade=(msPerChar<=FAST_CHAR_MS)?4:3; return {grade,scorePct:scorePctFor(grade,false,bestSim,msPerChar),exact:false}; }
  if(bestSim>=0.70) return {grade:3,scorePct:scorePctFor(3,false,bestSim,msPerChar),exact:false};
  if(bestSim>=0.40) return {grade:2,scorePct:scorePctFor(2,false,bestSim,msPerChar),exact:false};
  return {grade:1,scorePct:scorePctFor(1,false,bestSim,msPerChar),exact:false};
}

// ——————————————————————————————————————————————
// Construction du deck de cartes
// ——————————————————————————————————————————————
function ensureCycleForCurrentChapter(){
  if (S.cycle.chapter !== S.currentChapter){
    S.cycle.chapter = S.currentChapter;
    S.cycle.seen = {};
  }
}
function resetCycleForCurrentChapter(){
  S.cycle.chapter = S.currentChapter;
  S.cycle.seen = {};
}

function buildScheduledDeck(list){
  ensureCycleForCurrentChapter();

  let base = [...list];
  let unseen = base.filter(c => !S.cycle.seen[String(c.id)]);

  let cycleReset = false;
  if (unseen.length === 0 && base.length > 0){
    resetCycleForCurrentChapter();
    unseen = [...base];
    cycleReset = true;
  }

  const now = nowMs();
  const learningDue = [], reviewDue = [], learningNotDue = [], reviewNotDue = [], newCards = [];
  for (const c of unseen) {
    if (c.state === 'new') { newCards.push(c); continue; }
    const due = (c.nextDue || 0) <= now;
    if (c.state === 'learning' || c.state === 'relearning') {
      if (due) learningDue.push(c); else learningNotDue.push(c);
    } else { // review
      if (due) reviewDue.push(c); else reviewNotDue.push(c);
    }
  }

  learningDue.sort((a,b)=>(a.nextDue||0)-(b.nextDue||0));
  reviewDue.sort((a,b)=>{
    const ma=(a.masteryScore||0), mb=(b.masteryScore||0);
    if (ma!==mb) return ma-mb;
    return (a.nextDue||0)-(b.nextDue||0);
  });

  const others = [
    ...newCards, 
    ...learningNotDue, 
    ...reviewNotDue
  ].sort((a,b)=>{
    const ma=(a.masteryScore||0), mb=(b.masteryScore||0);
    if (ma!==mb) return ma-mb;
    return (a.nextDue||Infinity)-(b.nextDue||Infinity);
  });

  const deck = [...learningDue, ...reviewDue, ...others];

  if (cycleReset) {
    showMsg('Nouveau cycle lancé', 'text-amber-500 dark:text-amber-400', 1400);
  }
  return deck;
}

function baseListForCurrentChapter(){ return (S.currentChapter==='Tout')?[...S.allCards]:S.allCards.filter(c=>c.chapter===S.currentChapter) }
function rebuildDeck(){ S.currentDeck=buildScheduledDeck(baseListForCurrentChapter()); S.currentIndex=0 }

// Chapitres dynamiques
function computeAvailableChapters(){
  const set=new Set(S.allCards.map(c=>c.chapter));
  S.availableChapters=['Tout', ...Array.from(set).filter(Boolean).sort((a,b)=>a.localeCompare(b))];
}
function renderChapterButtons(){
  const frag=document.createDocumentFragment();
  for(const name of S.availableChapters){
    const b=document.createElement('button');
    b.dataset.chapter=name;
    const emoji = name==='Tout' ? '📚' : (CHAPTER_EMOJIS[name] || '📘');
    b.innerHTML=`${emoji} ${name}`;
    b.className='p-2 sm:p-3 rounded-lg shadow font-medium text-xs sm:text-sm transition-all duration-200 ease-in-out hover:opacity-80 w-full truncate chapter-button-default';
    frag.appendChild(b);
  }
  els.menuChapters.innerHTML=''; els.menuChapters.appendChild(frag); updateActiveChapterButtons();
}
function updateActiveChapterButtons(){
  [...els.menuChapters.children].forEach(btn=>{
    btn.classList.remove('chapter-button-active','chapter-button-default');
    btn.classList.add(btn.dataset.chapter===S.currentChapter?'chapter-button-active':'chapter-button-default');
  });
}
function renderResetOptions(){ els.resetOptions.innerHTML=S.availableChapters.map(n=>`<option value="${n}">${n}</option>`).join('') }

// Rendu carte
function updateCardScoreUI(newPct, oldPct){
  const hasOld=Number.isFinite(oldPct); const delta=hasOld?(newPct-oldPct):null; const sign=(delta!=null)?(delta>=0?'+':'−'):''; const abs=(delta!=null)?Math.abs(delta):null;
  els.cardScore.textContent=hasOld?`${newPct}% (${sign}${abs})`:`${newPct}%`;
}
function renderCard(focus=1){
  els.messageArea.textContent=''; els.answerInput.value=''; S.answerStartAt=null; S.isRevealed=false; S.awaitingGrade=false; S.awaitingAdvance=false;
  setGradeBarVisible(false); setSubmitVisible(true); setInputDisabled(false); applyNeutralCardStyle();
  if(!S.currentDeck.length||S.currentIndex>=S.currentDeck.length){
    els.cardFrenchWord.textContent='Aucune carte à afficher.'; els.cardEnglishWord.textContent=''; els.cardEnglishWord.classList.add('hidden'); els.cardScore.textContent='--%'; return;
  }
  const card=S.currentDeck[S.currentIndex];
  const promptEl=S.reverseMode?els.cardEnglishWord:els.cardFrenchWord, translationEl=S.reverseMode?els.cardFrenchWord:els.cardEnglishWord;
  els.cardFrenchWord.textContent=card.french; els.cardEnglishWord.textContent=card.english; promptEl.classList.remove('hidden'); translationEl.classList.add('hidden');

  els.cardScore.textContent=Number.isFinite(card.lastScorePct)?`${card.lastScorePct}%`:'--%';
  const cat = masteryCategory(card.masteryScore||0);
  els.cardScore.title = `Maîtrise: ${card.masteryScore||0}% • Boîte: ${card.box||1} • Facilité: ${(card.ef||SRS_CFG.startEase).toFixed(2)} • ${cat}`;

  if(focus) els.answerInput.focus({preventScroll:true});
  els.currentChapterLabel.textContent=S.currentChapter;
}

// Notation & enregistrement
function registerOutcome(card, grade, scorePct, latencyMs){
  card.revCount=(card.revCount||0)+1; if(grade>=3) card.okCount=(card.okCount||0)+1; card.totalTimeMs=(card.totalTimeMs||0)+(latencyMs||0);
  card.lastScorePct=clamp(Math.round(scorePct),0,100); card.lastGrade=grade; card.lastLatency=latencyMs||0;
  if(grade>=3){ S.streak++; S.maxStreak=Math.max(S.maxStreak,S.streak); } else { if(S.streak!==0) S.streak=0; }
  els.streakBadge.textContent=`🔥 ${S.streak}`;
  const d=isoDate(); const rec=S.dailyHistory[d]||{rev:0,ok:0,ms:0}; rec.rev+=1; if(grade>=3) rec.ok+=1; rec.ms+=(latencyMs||0); S.dailyHistory[d]=rec;
}
async function onGrade(grade,opts={}){
  if(!S.currentDeck.length) return 0;
  const card=S.currentDeck[S.currentIndex]; const latency=opts.latencyMs||0; const oldPct=Number.isFinite(card.lastScorePct)?card.lastScorePct:null; const preState=card.state;
  const scorePct=Number.isFinite(opts.scorePct)?opts.scorePct:({1:35,2:60,3:85,4:95}[grade]);

  const nextMs=await scheduleWithGrade(card,grade);
  registerOutcome(card,grade,scorePct,latency);
  if(preState==='new') S.sessionNewShown++;

  S.cycle.seen[String(card.id)] = true;
  updateCardScoreUI(scorePct,oldPct);

  const labels={1:'Encore',2:'Difficile',3:'Bien',4:'Facile'};
  if(opts.showFeedback!==false) showMsg(`${labels[grade]} — ${formatInterval(nextMs)}`, grade>=3?'text-emerald-500 dark:text-emerald-400':'text-red-500 dark:text-red-400', 1200);

  rebuildDeck(); renderStats(); renderSparkline(); renderProgressBar(); saveState();
  if(opts.autoAdvance!==false){ setTimeout(nextCard, AUTO_ADVANCE_MS); } else { S.awaitingAdvance=true; setTimeout(()=>{ showMsg('ENTER pour continuer','text-sky-500 dark:text-sky-400',1400); }, 150); }
  return nextMs;
}

// Saisie & ENTER
function revealTranslation(){ const trEl=S.reverseMode?els.cardFrenchWord:els.cardEnglishWord; trEl.classList.remove('hidden'); S.isRevealed=true; }
function handleSubmitAnswer(){
  if(els.answerInput.disabled) return; if(!S.currentDeck.length) return;
  const user=els.answerInput.value.trim(); const cur=S.currentDeck[S.currentIndex];
  if(!user){
    if(!S.isRevealed){ revealTranslation(); S.awaitingGrade=true; setGradeBarVisible(true); setSubmitVisible(false); setInputDisabled(true); showMsg('Révélé — 1 Encore, 2 Diff., 3 Bien, 4 Facile','text-sky-500 dark:text-sky-400',2000); }
    else { showMsg('1 Encore, 2 Diff., 3 Bien, 4 Facile','text-sky-500 dark:text-sky-400',1200); }
    return;
  }
  const latency=S.answerStartAt?(Date.now()-S.answerStartAt):0; revealTranslation();
  const correct=(S.reverseMode?cur.french:cur.english).trim(); const {grade,scorePct}=gradeFromTyped(user,correct,latency);
  const oldPct=Number.isFinite(cur.lastScorePct)?cur.lastScorePct:null; setSubmitVisible(false); setInputDisabled(true); setGradeBarVisible(false);
  onGrade(grade,{scorePct,latencyMs:latency,autoAdvance:false,showFeedback:false}).then(nextMs=>{
    const delta=(oldPct!=null)?(scorePct-oldPct):null; const deltaTxt=(delta!=null)?` (${delta>=0?'+':'−'}${Math.abs(delta)}%)`:''; const good=(grade>=3);
    showMsg(`${good?'Bonne réponse !':'Mauvaise réponse !'}${deltaTxt}${nextMs?` — ${formatInterval(nextMs)}`:''}`, good?'text-emerald-500 dark:text-emerald-400':'text-red-500 dark:text-red-400',1600);
    S.awaitingAdvance=true;
  });
}
function nextCard(){ S.seenCountInSession++; if(!S.currentDeck.length){ renderCard(); return; } S.currentIndex=0; renderCard(); renderProgressBar(); saveState(); }

// --- NOUVEAU SYSTÈME DE SAUVEGARDE ET DE SYNCHRONISATION ---

// Sauvegarde l'état actuel de l'application dans le localStorage.
// Cette fonction est appelée après chaque action de l'utilisateur.
function saveState() {
  try {
    const seenArray = Object.keys(S.cycle.seen || {});
    const stateToSave = {
      allCards: S.allCards,
      elapsedSeconds: S.elapsedSeconds,
      currentChapter: S.currentChapter,
      darkMode: S.darkMode,
      currentTheme: S.currentTheme,
      reverseMode: S.reverseMode,
      streak: S.streak,
      maxStreak: S.maxStreak,
      dailyHistory: S.dailyHistory,
      sessionNewShown: S.sessionNewShown,
      seenCountInSession: S.seenCountInSession,
      cycle: { chapter: S.cycle.chapter, seen: seenArray }
    };
    localStorage.setItem('flashcardAppData', JSON.stringify(stateToSave));
  } catch (e) {
    console.error("Erreur lors de la sauvegarde des données:", e);
  }
}

// Charge les données, synchronise avec les nouvelles cartes, et initialise l'application.
// C'est le point d'entrée principal au chargement de la page.
function loadAndSyncData() {
  const savedJSON = localStorage.getItem('flashcardAppData');
  const masterData = flashcardData;
  let savedState = null;
  let addedWordsCount = 0;
  
  try {
    if (savedJSON) savedState = JSON.parse(savedJSON);
  } catch (e) {
    console.error("Erreur lors du parsing des données sauvegardées:", e);
  }

  if (!savedState || !savedState.allCards || savedState.allCards.length === 0) {
    console.log("Aucune sauvegarde valide trouvée. Initialisation à partir de zéro.");
    S.allCards = masterData.map(raw => {
      const id = String(raw.id ?? `${raw.chapter}::${raw.french ?? raw.fr}`);
      return upgradeCardModel({ ...raw, id });
    });
    S.currentChapter = 'Tout';
  } else {
    console.log("Sauvegarde trouvée. Synchronisation avec le vocabulaire de base.");
    
    const savedCardsMap = new Map(savedState.allCards.map(c => [String(c.id), c]));
    const masterIds = new Set();
    const finalCards = [];

    for (const rawCard of masterData) {
      const id = String(rawCard.id ?? `${rawCard.chapter}::${rawCard.french ?? raw.fr}`);
      masterIds.add(id);
      
      const savedCard = savedCardsMap.get(id);

      if (savedCard) {
        const updatedCard = {
          ...savedCard,
          french: rawCard.french ?? rawCard.fr,
          english: rawCard.english ?? rawCard.en,
          chapter: rawCard.chapter
        };
        finalCards.push(upgradeCardModel(updatedCard));
      } else {
        const newCard = upgradeCardModel({ ...rawCard, id });
        finalCards.push(newCard);
        addedWordsCount++;
      }
    }
    
    S.allCards = finalCards.filter(c => masterIds.has(String(c.id)));
    
    S.elapsedSeconds = savedState.elapsedSeconds || 0;
    S.currentChapter = savedState.currentChapter || 'Tout';
    S.darkMode = !!savedState.darkMode;
    S.currentTheme = savedState.currentTheme || 'default';
    S.reverseMode = !!savedState.reverseMode;
    S.streak = savedState.streak || 0;
    S.maxStreak = savedState.maxStreak || 0;
    S.dailyHistory = savedState.dailyHistory || {};
    S.sessionNewShown = savedState.sessionNewShown || 0;
    S.seenCountInSession = savedState.seenCountInSession || 0;
    
    const cycleSeenArray = (savedState.cycle && Array.isArray(savedState.cycle.seen)) ? savedState.cycle.seen : [];
    S.cycle = {
      chapter: (savedState.cycle?.chapter) || S.currentChapter,
      seen: Object.fromEntries(cycleSeenArray.map(id => [String(id), true]))
    };
  }
  
  if (addedWordsCount > 0) {
    showMsg(`${addedWordsCount} nouveau(x) mot(s) ajouté(s) ✨`, 'text-emerald-500 dark:text-emerald-400', 3500);
  }
  
  document.body.classList.toggle('dark-mode', S.darkMode);
  document.body.classList.toggle('light-mode', !S.darkMode);
  els.darkModeToggle.innerHTML = S.darkMode ? '☀' : '🌙';
  if (els.themeSelector) els.themeSelector.value = S.currentTheme;

  buildSearchIndex();
  initUI();
  
  saveState();
}

// Recherche & chapitres
function buildSearchIndex(){ S.searchIndex=S.allCards.map(c=>({id:c.id,french_lc:c.french.toLowerCase(),english_lc:c.english.toLowerCase(),chapter:c.chapter,ref:c})) }
function filterCardsForSearch(q){
  els.searchResultsContainer.innerHTML=''; const query=(q||'').trim().toLowerCase(); if(!query) return;
  const res=[]; for(const c of S.searchIndex){ if(c.french_lc.includes(query)||c.english_lc.includes(query)) { res.push(c.ref); if(res.length>=8) break; } }
  if(!res.length){ els.searchResultsContainer.innerHTML='<p class="p-2">Aucun résultat</p>'; return; }
  const hoverCls=S.darkMode?'hover:bg-gray-700':'hover:bg-gray-200';
  els.searchResultsContainer.innerHTML=res.map(card=>`<div class="p-2 cursor-pointer rounded ${hoverCls}" data-id="${card.id}">${card.french} — ${card.english} (${card.chapter})</div>`).join('');
}

function putCardAtFront(deck, card) {
  const idStr = String(card.id);
  const rest = deck.filter(c => String(c.id) !== idStr);
  return [card, ...rest];
}

function jumpToCard(cardId, opts = {}) {
  const card = S.allCards.find(c => String(c.id) === String(cardId));
  if (!card) { showMsg('Carte introuvable', 'text-red-500', 1500); return; }

  const switchChapter = opts.switchChapter !== false;
  if (switchChapter && S.currentChapter !== card.chapter) {
    S.currentChapter = card.chapter;
    resetCycleForCurrentChapter();
    rebuildDeck();
    updateActiveChapterButtons();
    els.currentChapterLabel.textContent = S.currentChapter;
  } else if (!S.currentDeck.length) {
    rebuildDeck();
  }

  const base = baseListForCurrentChapter();
  const unseen = base.filter(c=>!S.cycle.seen[String(c.id)]);
  if (S.cycle.seen[String(card.id)] && unseen.length > 0) {
    showMsg('Cette carte a déjà été vue dans ce cycle. Terminez le cycle pour la revoir.', 'text-amber-500 dark:text-amber-400', 2200);
    return;
  }

  S.currentDeck = putCardAtFront(S.currentDeck, card);
  S.currentIndex = 0;
  renderCard(1);
  saveState();
}

// Events
on(els.burgerButton,'click',()=>setMenuOpen(true));
on(els.menuOverlay,'click',()=>setMenuOpen(false));
on(els.closeMenuButton,'click',()=>setMenuOpen(false));

on(els.menuChapters,'click',e=>{
  const btn=e.target.closest('button[data-chapter]'); if(!btn) return;
  const ch=btn.dataset.chapter; if(!ch||ch===S.currentChapter) { setMenuOpen(false); return; }
  S.currentChapter=ch; resetCycleForCurrentChapter(); S.sessionNewShown=0; S.seenCountInSession=0;
  rebuildDeck(); renderCard(0); renderProgressBar(); updateActiveChapterButtons(); els.currentChapterLabel.textContent=S.currentChapter; saveState();
  setMenuOpen(false);
});

on(els.resetDataButton,'click',()=>{
  const chapter=els.resetOptions.value||'Tout';
  const resetOne=c=>{
    const n=upgradeCardModel({id:c.id,french:c.french,english:c.english,chapter:c.chapter});
    Object.assign(c,n);
  };
  S.allCards.forEach(c=>{ if(chapter==='Tout'||c.chapter===chapter) resetOne(c); });
  if(chapter==='Tout'){ S.seenCountInSession=0; S.sessionNewShown=0; S.streak=0; S.maxStreak=0; S.dailyHistory={}; }
  if (chapter==='Tout' || chapter===S.currentChapter) resetCycleForCurrentChapter();

  rebuildDeck(); renderCard(0); renderStats(); renderSparkline(); renderProgressBar(); saveState();
  showMsg('Réinitialisé','text-orange-500 dark:text-yellow-400',1200);
});

on(els.darkModeToggle,'click',()=>setDarkMode(!S.darkMode));
on(els.reverseModeButton,'click',()=>{S.reverseMode=!S.reverseMode; renderCard(0); saveState()});
on(els.themeSelector,'change',()=>{S.currentTheme=els.themeSelector.value; saveState()});

on(els.searchBar,'input',e=>{filterCardsForSearch(e.target.value)});
on(els.searchResultsContainer,'click',e=>{
  const item=e.target.closest('[data-id]'); if(!item) return;
  const id = String(item.dataset.id);
  jumpToCard(id, { switchChapter: true });
  els.searchBar.value=''; els.searchResultsContainer.innerHTML='';
  setMenuOpen(false);
});
on(els.searchBar,'keydown',e=>{
  if(e.key==='Enter'){
    const first=els.searchResultsContainer.querySelector('[data-id]');
    if(first){
      jumpToCard(first.getAttribute('data-id'), { switchChapter: true });
      els.searchBar.value=''; els.searchResultsContainer.innerHTML='';
      setMenuOpen(false);
      e.preventDefault();
    }
  }
});

on(els.flashcardContainer,'click',()=>{
  if(!S.isRevealed){
    if(!els.answerInput.value.trim()){
      revealTranslation(); S.awaitingGrade=true; setGradeBarVisible(true); setSubmitVisible(false); setInputDisabled(true);
      showMsg('Révélé — 1 Encore, 2 Diff., 3 Bien, 4 Facile','text-sky-500 dark:text-sky-400',2000);
    }
  } else if(S.awaitingAdvance){ nextCard(); }
});

on(els.submitAnswerButton,'click',handleSubmitAnswer);
on(els.answerInput,'input',()=>{ if(!S.answerStartAt && els.answerInput.value.trim().length>0) S.answerStartAt=Date.now(); });

on(els.gradeBar,'click',e=>{
  const btn=e.target.closest('button[data-grade]'); if(!btn) return;
  const g=parseInt(btn.dataset.grade,10); if(S.awaitingGrade&&S.currentDeck.length) onGrade(g,{autoAdvance:true});
});

on(document,'keydown',e=>{
  const inField=document.activeElement===els.answerInput||document.activeElement===els.searchBar;
  if(e.key==='Enter'){ e.preventDefault(); if(S.awaitingAdvance){ nextCard(); return; } handleSubmitAnswer(); return; }
  if(inField) return;
  if(e.key===' '){ e.preventDefault(); if(S.awaitingAdvance){ nextCard(); } else if(!S.isRevealed && !els.answerInput.value.trim()){ revealTranslation(); S.awaitingGrade=true; setGradeBarVisible(true); setSubmitVisible(false); setInputDisabled(true); showMsg('Révélé — 1 Encore, 2 Diff., 3 Bien, 4 Facile','text-sky-500 dark:text-sky-400',2000); } }
  if(e.key==='1'){e.preventDefault(); if(S.awaitingGrade&&S.currentDeck.length) onGrade(1,{autoAdvance:true});}
  if(e.key==='2'){e.preventDefault(); if(S.awaitingGrade&&S.currentDeck.length) onGrade(2,{autoAdvance:true});}
  if(e.key==='3'){e.preventDefault(); if(S.awaitingGrade&&S.currentDeck.length) onGrade(3,{autoAdvance:true});}
  if(e.key==='4'){e.preventDefault(); if(S.awaitingGrade&&S.currentDeck.length) onGrade(4,{autoAdvance:true});}
});

// Stats & sparkline
function renderStats(){
  const total = S.allCards.length;
  const reviewed = S.allCards.filter(c=>(c.revCount||0)>0).length;
  const newRemain = S.allCards.filter(c=>c.state==='new').length;
  const dueNow = S.allCards.filter(c=>(c.state!=='new')&&(c.nextDue||0)<=nowMs()).length;

  const totalReviews=Object.values(S.dailyHistory).reduce((s,r)=>s+(r.rev||0),0);
  const okReviews=Object.values(S.dailyHistory).reduce((s,r)=>s+(r.ok||0),0);
  const acc=totalReviews?Math.round(okReviews*100/totalReviews):0;
  const timeSum=Object.values(S.dailyHistory).reduce((s,r)=>s+(r.ms||0),0);
  const avgLatency=totalReviews?Math.round(timeSum/totalReviews):0;
  const avgScore=(i=>i.length?Math.round(i.reduce((a,b)=>a+b,0)/i.length):0)(S.allCards.map(c=>c.lastScorePct).filter(Number.isFinite));
  const avgInterval=(i=>i.length?Math.round(i.reduce((a,b)=>a+b,0)/i.length):0)(S.allCards.filter(c=>c.state==='review').map(c=>c.intervalDays||0));
  const avgEase=(i=>i.length?Math.round(i.reduce((a,b)=>a+b,0)/i.length*100)/100:0)(S.allCards.map(c=>c.ef||SRS_CFG.startEase));
  const today=isoDate(); const todayReviews=(S.dailyHistory[today]?.rev)||0;

  const cats = { low:0, mid:0, high:0 };
  const boxes = {1:0,2:0,3:0,4:0,5:0};
  for(const c of S.allCards){
    const s=c.masteryScore||0;
    if(s<50) cats.low++; else if(s<80) cats.mid++; else cats.high++;
    const b=clamp(c.box||1,1,5); boxes[b]++;
  }

  const mastered=S.allCards.filter(c=>(c.masteryScore||0)>=80).length;
  const fmt=ms=>ms<1000?`${ms}ms`:`${(ms/1000).toFixed(1)}s`;
  els.statsContent.innerHTML=`
    <div class="grid grid-cols-2 gap-y-1 gap-x-4">
      <div class="text-gray-500 dark:text-gray-400">Total de mots</div><div class="text-right font-semibold">${total}</div>
      <div class="text-gray-500 dark:text-gray-400">Mots revus</div><div class="text-right font-semibold">${reviewed}</div>
      <div class="text-gray-500 dark:text-gray-400">Nouvelles restantes</div><div class="text-right font-semibold">${newRemain}</div>
      <div class="text-gray-500 dark:text-gray-400">À revoir maintenant</div><div class="text-right font-semibold">${dueNow}</div>
      <div class="text-gray-500 dark:text-gray-400">Total révisions</div><div class="text-right font-semibold">${totalReviews}</div>
      <div class="text-gray-500 dark:text-gray-400">Précision</div><div class="text-right font-semibold">${acc}%</div>
      <div class="text-gray-500 dark:text-gray-400">Temps moyen</div><div class="text-right font-semibold">${fmt(avgLatency)}</div>
      <div class="text-gray-500 dark:text-gray-400">Score moyen (saisie)</div><div class="text-right font-semibold">${avgScore}%</div>
      <div class="text-gray-500 dark:text-gray-400">Intervalle moyen</div><div class="text-right font-semibold">${avgInterval}j</div>
      <div class="text-gray-500 dark:text-gray-400">Facilité moyenne</div><div class="text-right font-semibold">${avgEase}</div>
      <div class="col-span-2 mt-2 border-t border-gray-200 dark:border-gray-700"></div>
      <div class="text-gray-500 dark:text-gray-400">Maîtrise faible (&lt;50)</div><div class="text-right font-semibold">${cats.low}</div>
      <div class="text-gray-500 dark:text-gray-400">En progression (50–79)</div><div class="text-right font-semibold">${cats.mid}</div>
      <div class="text-gray-500 dark:text-gray-400">Maîtrisés (≥80)</div><div class="text-right font-semibold">${cats.high}</div>
      <div class="col-span-2 mt-2 border-t border-gray-200 dark:border-gray-700"></div>
      <div class="text-gray-500 dark:text-gray-400">Boîte 1</div><div class="text-right font-semibold">${boxes[1]}</div>
      <div class="text-gray-500 dark:text-gray-400">Boîte 2</div><div class="text-right font-semibold">${boxes[2]}</div>
      <div class="text-gray-500 dark:text-gray-400">Boîte 3</div><div class="text-right font-semibold">${boxes[3]}</div>
      <div class="text-gray-500 dark:text-gray-400">Boîte 4</div><div class="text-right font-semibold">${boxes[4]}</div>
      <div class="text-gray-500 dark:text-gray-400">Boîte 5</div><div class="text-right font-semibold">${boxes[5]}</div>
      <div class="col-span-2 mt-2 border-t border-gray-200 dark:border-gray-700"></div>
      <div class="text-gray-500 dark:text-gray-400">Révisions aujourd’hui</div><div class="text-right font-semibold">${todayReviews}</div>
    </div>`;
}
function daysBack(n){const a=[],t=new Date();for(let i=n-1;i>=0;i--){const d=new Date(t);d.setDate(t.getDate()-i);a.push(isoDate(d))}return a}
function renderSparkline(){
  const svg=els.sparkline, path=els.sparkPath, fill=els.sparkFill, dot=els.sparkLast, legend=els.chartLegend; if(!svg||!path||!fill||!dot||!legend) return;
  const w=svg.clientWidth||260, h=svg.clientHeight||70, pad=6, days=daysBack(14), vals=days.map(d=>(S.dailyHistory[d]?.rev)||0), maxV=Math.max(1,...vals), dx=(w-2*pad)/(vals.length-1||1);
  const pts=vals.map((v,i)=>[pad+i*dx, h-pad - (v/maxV)*(h-2*pad-12)]);
  if(!pts.length){path.setAttribute('d','');fill.setAttribute('d','');return}
  const d='M '+pts.map(p=>p.join(',')).join(' L '); path.setAttribute('d',d);
  const first=pts[0], last=pts[pts.length-1]; fill.setAttribute('d', d+` L ${last[0]},${h-pad} L ${first[0]},${h-pad} Z`); dot.setAttribute('cx',String(last[0])); dot.setAttribute('cy',String(last[1]));
  const total14=vals.reduce((a,b)=>a+b,0), days7=days.slice(-7), rev7=days7.reduce((a,d)=>a+((S.dailyHistory[d]?.rev)||0),0), ok7=days7.reduce((a,d)=>a+((S.dailyHistory[d]?.ok)||0),0), acc7=rev7?Math.round(ok7*100/rev7):0;
  legend.textContent=`${total14} révisions • ${acc7}%/7j`;
}

// Initialisation de l'UI (après le chargement des données)
function initUI(){
  computeAvailableChapters();
  renderChapterButtons();
  renderResetOptions();
  rebuildDeck();
  renderCard(0);
  renderProgressBar();
  renderStats(); 
  renderSparkline();
  setInterval(()=>{S.elapsedSeconds++; renderTimer(); if(S.elapsedSeconds%15===0) saveState();},1000);
}

// --- POINT D'ENTRÉE DE L'APPLICATION ---
// Lance le chargement, la synchronisation des données et l'initialisation de l'interface utilisateur.
loadAndSyncData();
