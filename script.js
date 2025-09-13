// script.js
import { flashcardData, CHAPTER_EMOJIS } from './data.js';

const DAY_MS=86400000,MIN_MS=60000,DEFAULT_EASE=2.5,MIN_EASE=1.3,HARD_MULTIPLIER=1.2,EASY_BONUS=1.3,INTERVAL_MOD=1,LEARNING_STEPS_MIN=[10,60];
const STORAGE_KEYS={cards:'srs_cards_v1',prefs:'srs_prefs_v1',stats:'srs_stats_v1',theme:'srs_theme_v1',dailySeed:'srs_day_seed_v1',timer:'srs_timer_v1'};
const KEYCODES={ENTER:'Enter',SPACE:' ',ESC:'Escape'};
const nowMs=()=>Date.now();
const todayKey=(d=new Date())=>{const t=new Date(d);t.setHours(0,0,0,0);return t.toISOString().slice(0,10)};
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const randFuzz=()=>.95+Math.random()*.1;
const seededRandom=seed=>{let x=seed||123456789;return()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return((x<0?~x+1:x)%1e6)/1e6}};
const shuffleInPlace=(a,rnd=Math.random)=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const normalizeText=s=>s.toLowerCase().replace(/[()]/g,' ').replace(/[.,;:!?/\\'’"«»\-–—]/g,' ').replace(/\s+/g,' ').trim();
const splitAlternatives=s=>s.split(/[\/,]/).map(v=>normalizeText(v)).filter(Boolean);
const jaccardSimilarity=(a,b)=>{const ta=new Set(a.split(' ').filter(Boolean)),tb=new Set(b.split(' ').filter(Boolean));let inter=0;for(const tok of ta)if(tb.has(tok))inter++;const u=ta.size+tb.size-inter;return u===0?0:inter/u};
const bestSimilarity=(userRaw,targetRaw)=>{const u=normalizeText(userRaw),alts=splitAlternatives(targetRaw);let best=0;for(const alt of alts){const s=jaccardSimilarity(u,alt);if(s>best)best=s}return best};
const formatMs=ms=>{const s=Math.floor(ms/1000),hh=String(Math.floor(s/3600)).padStart(2,'0'),mm=String(Math.floor((s%3600)/60)).padStart(2,'0'),ss=String(s%60).padStart(2,'0');return`${hh}:${mm}:${ss}`};
const percent=n=>`${Math.round(n*100)}%`;

const els={
  burgerButton:document.getElementById('burger-button'),
  sidebarMenu:document.getElementById('sidebar-menu'),
  menuOverlay:document.getElementById('menu-overlay'),
  closeMenuButton:document.getElementById('close-menu-button'),
  menuChapters:document.getElementById('menu-chapters'),
  chaptersTitle:document.getElementById('chapters-title'),
  searchBar:document.getElementById('search-bar'),
  searchResults:document.getElementById('search-results-container'),
  darkModeToggle:document.getElementById('dark-mode-toggle'),
  reverseModeButton:document.getElementById('reverse-mode-button'),
  themeSelector:document.getElementById('theme-selector'),
  resetOptions:document.getElementById('reset-options'),
  resetButton:document.getElementById('reset-data-button'),
  currentChapterLabel:document.getElementById('current-chapter-label'),
  flashcardContainer:document.getElementById('flashcard-container'),
  cardFrench:document.getElementById('card-french-word'),
  cardEnglish:document.getElementById('card-english-word'),
  cardScore:document.getElementById('card-score'),
  messageArea:document.getElementById('message-area'),
  inputBar:document.getElementById('input-bar'),
  answerInput:document.getElementById('answer-input'),
  submitAnswerButton:document.getElementById('submit-answer-button'),
  gradeBar:document.getElementById('grade-bar'),
  btnAgain:document.getElementById('grade-again'),
  btnHard:document.getElementById('grade-hard'),
  btnGood:document.getElementById('grade-good'),
  btnEasy:document.getElementById('grade-easy'),
  timer:document.getElementById('timer'),
  streakBadge:document.getElementById('streak-badge'),
  progressText:document.getElementById('progress-text'),
  progressPerc:document.getElementById('progress-percentage'),
  progressFill:document.getElementById('progress-bar-fill'),
  statsContent:document.getElementById('stats-content'),
  sparkline:document.getElementById('sparkline'),
  sparklinePath:document.getElementById('sparkline-path'),
  sparklineFill:document.getElementById('sparkline-fill'),
  sparklineLast:document.getElementById('sparkline-last'),
  chartTitle:document.getElementById('chart-title'),
  chartLegend:document.getElementById('chart-legend'),
  animatedBg:document.getElementById('animated-bg-elements'),
};

const App={
  cards:new Map(),
  prefs:{darkMode:false,reverseMode:false,theme:'default',activeChapters:[]},
  stats:{byDay:{},streak:0,lastStudyDay:null,totalTimeMs:0},
  session:{startedAt:null,timerInterval:null,queueLearning:[],queueReview:[],queueNew:[],rng:Math.random,currentCardId:null,revealed:false,inputLocked:false,pendingNext:false,autoGraded:false,lastGrade:null,lastScore:null,recentlyShown:[],skipBuffer:[],studiedCount:0,sessionTotal:0},
  data:{chapters:[]}
};

function loadPersisted(){
  const rawCards=localStorage.getItem(STORAGE_KEYS.cards),
        rawPrefs=localStorage.getItem(STORAGE_KEYS.prefs),
        rawStats=localStorage.getItem(STORAGE_KEYS.stats),
        rawTheme=localStorage.getItem(STORAGE_KEYS.theme),
        daySeed=localStorage.getItem(STORAGE_KEYS.dailySeed),
        rawTimer=localStorage.getItem(STORAGE_KEYS.timer);
  if(rawPrefs){try{Object.assign(App.prefs,JSON.parse(rawPrefs))}catch{}}
  if(rawTheme){App.prefs.theme=rawTheme}
  if(rawStats){try{Object.assign(App.stats,JSON.parse(rawStats))}catch{}}
  const known=new Map();
  if(rawCards){try{for(const c of JSON.parse(rawCards))known.set(String(c.id),c)}catch{}}
  for(const base of flashcardData){
    const id=String(base.id);let cs=known.get(id);
    if(!cs){cs={id,french:base.french,english:base.english,chapter:base.chapter,ease:DEFAULT_EASE,intervalDays:0,dueMs:0,state:'new',learningStepIndex:0,reps:0,lapses:0,lastScore:null,lastAnswer:'',suspended:false,buriedUntil:0}}
    else{cs.french=base.french;cs.english=base.english;cs.chapter=base.chapter}
    App.cards.set(id,cs);
  }
  App.data.chapters=[...new Set(flashcardData.map(c=>c.chapter))].sort();
  if(rawTimer){try{const t=JSON.parse(rawTimer);if(t&&Number.isFinite(t.startedAt)&&t.startedAt>0){addTimeRangeToStats(t.startedAt,nowMs());saveStats();App.session.startedAt=nowMs();persistTimerState()}}catch{}}
  if(daySeed&&todayKey()===JSON.parse(daySeed).day){const{seed}=JSON.parse(daySeed);App.session.rng=seededRandom(seed)}
  else{const seed=Math.floor(Math.random()*1e9);localStorage.setItem(STORAGE_KEYS.dailySeed,JSON.stringify({day:todayKey(),seed}));App.session.rng=seededRandom(seed)}
}
const saveCards=()=>localStorage.setItem(STORAGE_KEYS.cards,JSON.stringify([...App.cards.values()]));
const savePrefs=()=>{localStorage.setItem(STORAGE_KEYS.prefs,JSON.stringify(App.prefs));localStorage.setItem(STORAGE_KEYS.theme,App.prefs.theme)};
const saveStats=()=>localStorage.setItem(STORAGE_KEYS.stats,JSON.stringify(App.stats));
function persistTimerState(){try{localStorage.setItem(STORAGE_KEYS.timer,JSON.stringify({startedAt:App.session.startedAt&&Number.isFinite(App.session.startedAt)?App.session.startedAt:null}))}catch{}}
function addTimeRangeToStats(startMs,endMs){
  if(!Number.isFinite(startMs)||!Number.isFinite(endMs)||endMs<=startMs)return;
  let curDayStart=new Date(startMs);curDayStart.setHours(0,0,0,0);
  while(true){
    const dayStart=curDayStart.getTime(),nextDayStart=dayStart+DAY_MS,sliceStart=Math.max(startMs,dayStart),sliceEnd=Math.min(endMs,nextDayStart),slice=Math.max(0,sliceEnd-sliceStart);
    if(slice>0){
      const key=todayKey(curDayStart);
      if(!App.stats.byDay[key])App.stats.byDay[key]={studied:0,correct:0,again:0,hard:0,good:0,easy:0,timeMs:0};
      App.stats.byDay[key].timeMs=(App.stats.byDay[key].timeMs||0)+slice;
      App.stats.totalTimeMs=(App.stats.totalTimeMs||0)+slice;
    }
    if(sliceEnd>=endMs)break;
    curDayStart=new Date(nextDayStart);
  }
}

function applyDarkMode(){
  document.body.classList.toggle('dark-mode',!!App.prefs.darkMode);
  document.body.classList.toggle('light-mode',!App.prefs.darkMode);
  els.darkModeToggle.setAttribute('aria-pressed',App.prefs.darkMode?'true':'false');
  els.darkModeToggle.textContent=App.prefs.darkMode?'☀️':'🌙';
}
function applyTheme(){(App.prefs.theme||'default')==='pastel'?enablePastelBg():disablePastelBg()}
function enablePastelBg(){
  const c=els.animatedBg;c.innerHTML='';
  for(let i=0;i<10;i++){
    const el=document.createElement('div'),size=80+Math.floor(Math.random()*120),colors=['#A78BFA','#60A5FA','#34D399','#FBBF24','#F472B6','#F87171','#22D3EE'];
    Object.assign(el.style,{position:'absolute',width:`${size}px`,height:`${size}px`,borderRadius:'50%',filter:'blur(18px)',opacity:'0.28',background:colors[Math.floor(Math.random()*colors.length)],left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,transform:'translate(-50%,-50%)',transition:'transform 10s ease-in-out'});
    c.appendChild(el);
    setTimeout(()=>{const drift=()=>{el.style.left=`${Math.random()*100}%`;el.style.top=`${Math.random()*100}%`};drift();el._driftInterval=setInterval(drift,1e4)},100);
  }
}
function disablePastelBg(){
  const c=els.animatedBg;if(!c)return;[...c.children].forEach(ch=>{if(ch._driftInterval)clearInterval(ch._driftInterval)});c.innerHTML='';
}

const toggleMenu=open=>{
  document.body.classList.toggle('menu-open',open);
  els.menuOverlay.setAttribute('aria-hidden',open?'false':'true');
  els.sidebarMenu.setAttribute('aria-hidden',open?'false':'true');
  els.burgerButton.setAttribute('aria-expanded',open?'true':'false');
  els.sidebarMenu.classList.toggle('menu-slide-in',open);
  els.sidebarMenu.classList.toggle('menu-slide-out',!open);
};
const openMenu=()=>toggleMenu(true);
const closeMenu=()=>toggleMenu(false);

function renderChaptersMenu(){
  const c=els.menuChapters;c.innerHTML='';
  const makeBtn=(label,value,isActive)=>{
    const b=document.createElement('button');
    b.type='button';
    b.className=`w-full px-3 py-2 rounded-md text-left ${isActive?'chapter-button-active':'chapter-button-default'}`;
    b.textContent=`${CHAPTER_EMOJIS[value]||'📘'} ${label}`;
    b.title='Activer/désactiver ce chapitre';
    b.addEventListener('click',()=>toggleChapter(value));
    return b;
  };
  const allActive=App.prefs.activeChapters.length===0;
  const btnAll=makeBtn('Tous les chapitres','ALL',allActive);
  btnAll.addEventListener('click',()=>setChapters([]));
  c.appendChild(btnAll);
  for(const ch of App.data.chapters){c.appendChild(makeBtn(ch,ch,App.prefs.activeChapters.includes(ch)))}
  updateCurrentChapterLabel();
  populateResetOptions();
}
function updateCurrentChapterLabel(){
  const a=App.prefs.activeChapters;
  els.currentChapterLabel.textContent=!a||a.length===0?'Tous chapitres':a.length===1?a[0]:`${a.length} chapitres sélectionnés`;
}
function setChapters(arr){App.prefs.activeChapters=arr.slice();savePrefs();renderChaptersMenu();rebuildQueuesAndMaybeReload()}
function toggleChapter(ch){const s=new Set(App.prefs.activeChapters);s.has(ch)?s.delete(ch):s.add(ch);App.prefs.activeChapters=[...s];savePrefs();renderChaptersMenu();rebuildQueuesAndMaybeReload()}
function populateResetOptions(){
  const sel=els.resetOptions;sel.innerHTML='';
  const optAll=document.createElement('option');optAll.value='ALL';optAll.textContent='Tout réinitialiser (toutes cartes)';sel.appendChild(optAll);
  for(const ch of App.data.chapters){const o=document.createElement('option');o.value=ch;o.textContent=`Réinitialiser: ${ch}`;sel.appendChild(o)}
}

const isInActiveChapters=c=>{const a=App.prefs.activeChapters;return !a||a.length===0||a.includes(c.chapter)};
function collectQueues(){
  const learning=[],review=[],news=[],now=nowMs();
  for(const c of App.cards.values()){
    if(!isInActiveChapters(c)||c.suspended)continue;
    if(c.buriedUntil&&c.buriedUntil>now)continue;
    if(c.state==='learning'||c.state==='relearning'){if(c.dueMs<=now)learning.push(c)}
    else if(c.state==='review'){if(c.dueMs<=now)review.push(c)}
    else news.push(c);
  }
  learning.sort((a,b)=>a.dueMs-b.dueMs);
  const now2=nowMs();
  review.sort((a,b)=>{const overA=(now2-a.dueMs)/Math.max(1,a.intervalDays*DAY_MS),overB=(now2-b.dueMs)/Math.max(1,b.intervalDays*DAY_MS);if(overB!==overA)return overB-overA;if(a.intervalDays!==b.intervalDays)return a.intervalDays-b.intervalDays;return a.id.localeCompare(b.id)});
  shuffleInPlace(news,App.session.rng);
  return{learning,review,news};
}
function rebuildQueues(){
  const{learning,review,news}=collectQueues();
  App.session.queueLearning=learning.map(c=>c.id);
  App.session.queueReview=review.map(c=>c.id);
  App.session.queueNew=news.map(c=>c.id);
  App.session.sessionTotal=learning.length+review.length+news.length;
  updateProgress();
}
function rebuildQueuesAndMaybeReload(){rebuildQueues();if(!App.session.currentCardId)loadNextCard();else updateProgress()}
function pickNextCardId(){
  const recent=new Set(App.session.recentlyShown.slice(-10));
  const pick=q=>{for(let i=0;i<q.length;i++){if(!recent.has(q[i]))return q.splice(i,1)[0]}return q.shift()||null};
  if(App.session.skipBuffer.length>0)return App.session.skipBuffer.shift();
  let id=pick(App.session.queueLearning);if(id)return id;
  id=pick(App.session.queueReview);if(id)return id;
  id=pick(App.session.queueNew);if(id)return id;
  return null;
}

function renderCard(card){
  const reverse=App.prefs.reverseMode;
  els.cardEnglish.classList.toggle('hidden',!App.session.revealed);
  if(App.session.lastScore!=null)els.cardScore.textContent=`${Math.round(App.session.lastScore*100)}%`;
  else if(App.session.lastGrade!=null){const labels={1:'Encore',2:'Difficile',3:'Bien',4:'Facile'};els.cardScore.textContent=labels[App.session.lastGrade]||'--%'}
  else els.cardScore.textContent='--%';
  if(!reverse){els.cardFrench.textContent=card.french;els.cardEnglish.textContent=card.english}
  else{els.cardFrench.textContent=card.english;els.cardEnglish.textContent=card.french}
  const cardEl=els.flashcardContainer,isDark=document.body.classList.contains('dark-mode');
  cardEl.classList.remove('flash-error');
  cardEl.style.backgroundColor='';cardEl.style.borderColor='';cardEl.style.color='';
  cardEl.classList.toggle('dark-mode-card-neutral',isDark);
  cardEl.classList.toggle('light-mode-card-neutral',!isDark);
  els.messageArea.textContent=!App.session.revealed?'Tapez votre réponse et appuyez Entrée (Entrée sans réponse = révéler)':App.session.autoGraded?'Appuyez sur Entrée ou cliquez la carte pour passer':'Encore (1) • Difficile (2) • Bien (3) • Facile (4) — ou Entrée/clic pour passer';
  els.answerInput.disabled=App.session.inputLocked;els.submitAnswerButton.disabled=App.session.inputLocked;
  els.gradeBar.classList.toggle('hidden',!App.session.revealed);
  const allow=App.session.revealed&&!App.session.autoGraded;
  els.btnAgain.disabled=!allow;els.btnHard.disabled=!allow;els.btnGood.disabled=!allow;els.btnEasy.disabled=!allow;
}
function loadNextCard(){
  App.session.revealed=false;App.session.inputLocked=false;App.session.pendingNext=false;App.session.autoGraded=false;App.session.lastGrade=null;App.session.lastScore=null;
  const id=pickNextCardId();App.session.currentCardId=id;
  if(!id){renderSessionDone();updateProgress();return}
  els.answerInput.value='';els.answerInput.disabled=false;els.submitAnswerButton.disabled=false;
  const card=App.cards.get(id);App.session.recentlyShown.push(id);renderCard(card);
  try{els.answerInput.focus({preventScroll:true});els.answerInput.select()}catch{}
  requestAnimationFrame(()=>{try{els.answerInput.focus({preventScroll:true});els.answerInput.select()}catch{}});
  updateProgress();
}
function renderSessionDone(){
  els.cardFrench.textContent='🎉 Session terminée';els.cardEnglish.textContent='';els.cardEnglish.classList.add('hidden');els.cardScore.textContent='--%';
  els.messageArea.textContent='Vous avez triomphé des cartes disponibles. Revenez plus tard !';
  els.answerInput.value='';els.answerInput.disabled=true;els.submitAnswerButton.disabled=true;els.gradeBar.classList.add('hidden');
}

function updateProgress(){
  const done=App.session.studiedCount,total=App.session.sessionTotal;
  els.progressText.textContent=`Cycle: ${done}/${total}`;
  const p=total>0?done/Math.max(1,total):1;
  els.progressPerc.textContent=percent(p);els.progressFill.style.width=percent(p);
}
function updateStreakOnGrade(g){App.stats.streak+=g>=3?1:-App.stats.streak;els.streakBadge.textContent=`🔥 ${App.stats.streak}`;saveStats()}
function bumpDailyStats(grade){
  const day=todayKey();if(!App.stats.byDay[day])App.stats.byDay[day]={studied:0,correct:0,again:0,hard:0,good:0,easy:0,timeMs:0};
  const s=App.stats.byDay[day];s.studied++;if(grade===1)s.again++;if(grade===2)s.hard++;if(grade===3)s.good++;if(grade===4)s.easy++;if(grade>=3)s.correct++;
  App.stats.lastStudyDay=day;saveStats();renderStats();
}

function saveElapsedTime(){
  const startedAt=App.session.startedAt;if(!startedAt){persistTimerState();return}
  const n=nowMs();if(!Number.isFinite(n-startedAt)||n<=startedAt){App.session.startedAt=null;persistTimerState();return}
  addTimeRangeToStats(startedAt,n);saveStats();renderStats();App.session.startedAt=null;persistTimerState();
}

function renderStats(){
  const day=todayKey(),s=App.stats.byDay[day]||{studied:0,correct:0,again:0,hard:0,good:0,easy:0,timeMs:0};
  els.statsContent.innerHTML=`<div>Aujourd'hui: ${s.studied} cartes, ${s.correct} correctes</div>
                                  <div>Temps aujourd'hui: ${formatMs(s.timeMs||0)} • Total cumulé: ${formatMs(App.stats.totalTimeMs||0)}</div>
                                  <div>Encore: ${s.again} • Difficile: ${s.hard} • Bien: ${s.good} • Facile: ${s.easy}</div>
                                  <div>Streak: ${App.stats.streak} 🔥</div>`;
  const days=[],now=new Date();for(let i=13;i>=0;i--){days.push(todayKey(new Date(now.getTime()-i*DAY_MS)))};const values=days.map(k=>(App.stats.byDay[k]?.studied)||0),max=Math.max(1,...values);
  const W=els.sparkline.viewBox?.baseVal?.width||els.sparkline.clientWidth||260,H=els.sparkline.viewBox?.baseVal?.height||70,stepX=W/((values.length-1)||1),
        pts=values.map((v,i)=>[i*stepX,H-(v/max)*(H-10)-5]),
        d=pts.map((p,i)=>i===0?`M${p[0]},${p[1]}`:`L${p[0]},${p[1]}`).join(' ');
  els.sparklinePath.setAttribute('d',d);
  if(pts.length){
    const df=`${d} L${pts[pts.length-1][0]},${H} L0,${H} Z`;
    els.sparklineFill.setAttribute('d',df);els.sparklineLast.setAttribute('cx',pts[pts.length-1][0]);els.sparklineLast.setAttribute('cy',pts[pts.length-1][1]);
  }
  els.chartLegend.textContent=`${values[values.length-1]} cartes`;
}

function startTimer(){
  if(!els.timer)return;
  if(App.session.timerInterval)clearInterval(App.session.timerInterval);
  if(!App.session.startedAt){App.session.startedAt=nowMs();persistTimerState()}
  const tick=()=>{const baseMs=(App.stats.byDay?.[todayKey()]?.timeMs)||0,liveMs=App.session.startedAt?(nowMs()-App.session.startedAt):0,elapsedMs=baseMs+Math.max(0,liveMs);
    els.timer.textContent=formatMs(elapsedMs);els.timer.setAttribute('title',`Total cumulé: ${formatMs(App.stats.totalTimeMs||0)}`);persistTimerState()};
  tick();App.session.timerInterval=setInterval(tick,1000);
}
function stopTimerDisplay(){if(App.session.timerInterval){clearInterval(App.session.timerInterval);App.session.timerInterval=null}}

function revealAnswer(){if(App.session.revealed)return;App.session.revealed=true;App.session.inputLocked=true;renderCard(App.cards.get(App.session.currentCardId))}
function evaluateAnswer(){
  const card=App.cards.get(App.session.currentCardId);if(!card)return;
  const reverse=App.prefs.reverseMode,user=els.answerInput.value.trim();if(!user){flashMessage("Champ vide. Appuyez sur Espace pour révéler ou tapez une réponse.",true);return}
  App.session.revealed=true;App.session.inputLocked=true;
  const target=reverse?card.french:card.english,sim=bestSimilarity(user,target);App.session.lastScore=sim;
  let grade=1;if(sim>=.85)grade=4;else if(sim>=.7)grade=3;else if(sim>=.45)grade=2;
  applyGrade(card,grade,{auto:true,showFeedback:true,typedAnswer:user});App.session.autoGraded=true;App.session.pendingNext=true;renderCard(card);
}
function applyGrade(card,grade,{auto=false,showFeedback=false,typedAnswer=''}={}){
  const now=nowMs();
  if(grade===1)card.ease=clamp(card.ease-.20,MIN_EASE,3.5);
  else if(grade===2)card.ease=clamp(card.ease-.15,MIN_EASE,3.5);
  else if(grade===4)card.ease=clamp(card.ease+.15,MIN_EASE,3.5);
  const fuzz=randFuzz();
  if(grade===1){
    card.state=(card.state==='review')?'relearning':'learning';
    card.learningStepIndex=0;card.dueMs=now+LEARNING_STEPS_MIN[0]*MIN_MS;card.lapses+=(card.state==='relearning'?1:0);
  }else if(grade===2){
    if(card.state==='review'){const nextDays=Math.max(1,Math.round(card.intervalDays*HARD_MULTIPLIER*fuzz));card.intervalDays=nextDays;card.dueMs=now+nextDays*DAY_MS}
    else{const i=clamp(card.learningStepIndex,0,LEARNING_STEPS_MIN.length-1);card.state=(card.state==='relearning')?'relearning':'learning';card.dueMs=now+LEARNING_STEPS_MIN[i]*MIN_MS}
  }else if(grade===3){
    if(card.state==='review'){const nextDays=Math.max(1,Math.round(card.intervalDays*card.ease*INTERVAL_MOD*fuzz));card.intervalDays=nextDays;card.dueMs=now+nextDays*DAY_MS}
    else{const nextIdx=card.learningStepIndex+1;if(nextIdx<LEARNING_STEPS_MIN.length){card.state=(card.state==='relearning')?'relearning':'learning';card.learningStepIndex=nextIdx;card.dueMs=now+LEARNING_STEPS_MIN[nextIdx]*MIN_MS}
    else{card.state='review';card.learningStepIndex=0;const nextDays=Math.max(1,Math.round(1*fuzz));card.intervalDays=nextDays;card.dueMs=now+nextDays*DAY_MS}}
  }else if(grade===4){
    if(card.state==='review'){const nextDays=Math.max(1,Math.round(card.intervalDays*card.ease*INTERVAL_MOD*EASY_BONUS*fuzz));card.intervalDays=nextDays;card.dueMs=now+nextDays*DAY_MS}
    else{card.state='review';card.learningStepIndex=0;const nextDays=Math.max(1,Math.round(3*card.ease*EASY_BONUS*fuzz));card.intervalDays=nextDays;card.dueMs=now+nextDays*DAY_MS}
  }
  card.reps+=1;card.lastAnswer=typedAnswer;card.lastScore=App.session.lastScore;card.buriedUntil=now+60000;saveCards();removeFromQueues(card.id);
  if(showFeedback){const label=grade===1?'Encore':grade===2?'Difficile':grade===3?'Bien':'Facile';flashMessage(`Auto: ${label}`,false)}
  App.session.studiedCount+=1;updateProgress();bumpDailyStats(grade);updateStreakOnGrade(grade);App.session.lastGrade=grade;
}
function removeFromQueues(id){for(const arr of[App.session.queueLearning,App.session.queueReview,App.session.queueNew]){const idx=arr.indexOf(id);if(idx!==-1)arr.splice(idx,1)}}

function skipCurrentCard(){const id=App.session.currentCardId;if(!id)return;App.session.skipBuffer.push(id);App.session.pendingNext=false;loadNextCard()}

function flashMessage(msg,isError=false){els.messageArea.textContent=msg||'';if(isError){els.flashcardContainer.classList.remove('flash-error');void els.flashcardContainer.offsetWidth;els.flashcardContainer.classList.add('flash-error')}}

function setupAutoSaveOnLeave(){
  const pauseAndSave=()=>{stopTimerDisplay();saveElapsedTime()};
  window.addEventListener('pagehide',pauseAndSave,{capture:true});
  window.addEventListener('beforeunload',pauseAndSave,{capture:true});
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')pauseAndSave();else if(document.visibilityState==='visible')startTimer()});
}
function setupSearch(){
  els.searchBar.addEventListener('input',()=>{
    const q=normalizeText(els.searchBar.value),cont=els.searchResults;cont.innerHTML='';if(!q)return;
    const results=[];for(const c of App.cards.values()){if(!isInActiveChapters(c))continue;const fr=normalizeText(c.french),en=normalizeText(c.english);if(fr.includes(q)||en.includes(q))results.push(c);if(results.length>=30)break}
    for(const card of results){const div=document.createElement('div');div.className='p-2 rounded-md hover:bg-emerald-50 dark:hover:bg-gray-700 cursor-pointer';div.innerHTML=`<span class="text-emerald-600 dark:text-emerald-300">#${card.id}</span> — ${card.french} <span class="text-gray-400">/</span> ${card.english}`;div.addEventListener('click',()=>{jumpToCard(card.id);closeMenu()});cont.appendChild(div)}
  });
}
function jumpToCard(id){
  App.session.skipBuffer=[];App.session.recentlyShown=App.session.recentlyShown.filter(x=>x!==id);removeFromQueues(id);
  const c=App.cards.get(id);if(c)c.buriedUntil=0;App.session.queueLearning.unshift(id);loadNextCard();closeMenu();els.searchBar.value='';els.searchResults.innerHTML='';
}

function resetSelection(){
  const target=els.resetOptions.value,targets=[];
  for(const c of App.cards.values()){if(target==='ALL'||c.chapter===target)targets.push(c)}
  for(const c of targets){c.ease=DEFAULT_EASE;c.intervalDays=0;c.dueMs=0;c.state='new';c.learningStepIndex=0;c.reps=0;c.lapses=0;c.lastScore=null;c.lastAnswer='';c.suspended=false;c.buriedUntil=0}
  saveCards();
  if(target==='ALL'){resetAllTimerCounters();flashMessage('Sélection réinitialisée ✅ — Chrono remis à zéro ⏱️')}else flashMessage('Sélection réinitialisée ✅');
  rebuildQueuesAndMaybeReload();
}
function resetAllTimerCounters(){
  stopTimerDisplay();App.session.startedAt=null;persistTimerState();
  if(App.stats.byDay){for(const k of Object.keys(App.stats.byDay)){if(App.stats.byDay[k])App.stats.byDay[k].timeMs=0}}
  App.stats.totalTimeMs=0;saveStats();
  try{localStorage.removeItem(STORAGE_KEYS.timer)}catch{}
  els.timer.textContent=formatMs(0);els.timer.setAttribute('title',`Total cumulé: ${formatMs(0)}`);renderStats();startTimer();
}

function setupMenu(){
  els.burgerButton.addEventListener('click',openMenu);
  els.menuOverlay.addEventListener('click',closeMenu);
  els.closeMenuButton.addEventListener('click',closeMenu);
  document.addEventListener('keydown',e=>{if(e.key===KEYCODES.ESC)closeMenu()});
}
function setupDarkMode(){
  els.darkModeToggle.addEventListener('click',()=>{App.prefs.darkMode=!App.prefs.darkMode;savePrefs();applyDarkMode()});applyDarkMode();
}
function setupTheme(){
  els.themeSelector.value=App.prefs.theme||'default';
  els.themeSelector.addEventListener('change',()=>{App.prefs.theme=els.themeSelector.value;savePrefs();applyTheme()});applyTheme();
}
function setupReverseMode(){
  const setTxt=()=>els.reverseModeButton.textContent=App.prefs.reverseMode?'⇄ EN → FR':'⇄ FR → EN';
  els.reverseModeButton.addEventListener('click',()=>{App.prefs.reverseMode=!App.prefs.reverseMode;savePrefs();setTxt();if(App.session.currentCardId){renderCard(App.cards.get(App.session.currentCardId))}});setTxt();
}
function setupReset(){els.resetButton.addEventListener('click',resetSelection)}
function setupCardInteractions(){
  els.flashcardContainer.addEventListener('click',()=>{if(!App.session.revealed){revealAnswer('click');App.session.pendingNext=true;renderCard(App.cards.get(App.session.currentCardId))}else{App.session.pendingNext=false;loadNextCard()}});
  els.submitAnswerButton.addEventListener('click',()=>{if(!App.session.revealed)evaluateAnswer()});
  const onGrade=g=>{
    const card=App.cards.get(App.session.currentCardId);if(!card)return;
    if(!App.session.revealed)revealAnswer('gradeclick');
    if(App.session.autoGraded)return;
    applyGrade(card,g,{auto:false,showFeedback:false});loadNextCard();
  };
  els.btnAgain.addEventListener('click',()=>onGrade(1));
  els.btnHard.addEventListener('click',()=>onGrade(2));
  els.btnGood.addEventListener('click',()=>onGrade(3));
  els.btnEasy.addEventListener('click',()=>onGrade(4));
  document.addEventListener('keydown',e=>{
    const t=(e.target&&e.target.tagName)||'',isTyping=t==='INPUT'||t==='TEXTAREA',inputEmpty=els.answerInput.value.trim().length===0;
    if(e.key===KEYCODES.SPACE){if(!isTyping)e.preventDefault();return}
    if(['1','2','3','4'].includes(e.key)){if(App.session.revealed&&!App.session.autoGraded){e.preventDefault();onGrade(parseInt(e.key,10))}return}
    if(e.key===KEYCODES.ENTER){e.preventDefault();if(!App.session.revealed){if(!inputEmpty)evaluateAnswer();else{revealAnswer('enter');App.session.pendingNext=true;renderCard(App.cards.get(App.session.currentCardId))}}else{App.session.pendingNext=false;loadNextCard()}}
  });
}

function init(){
  loadPersisted();setupMenu();setupDarkMode();setupTheme();setupReverseMode();renderChaptersMenu();setupReset();setupSearch();renderStats();setupAutoSaveOnLeave();rebuildQueues();loadNextCard();startTimer();setupCardInteractions();
}
init();
