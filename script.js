// Import des modules nécessaires
import { flashcardData, CHAPTER_EMOJIS } from './data.js';
import { scheduleCard, getRetrievability } from './fsrs-helper.js';

// Utils & état
const $ = id => document.getElementById(id);
const on = (el, ev, fn, opt) => el && el.addEventListener(ev, fn, opt || false);
const DAY_MS = 86400000;
const MIN_MS = 60000;
const nowMs = () => Date.now();
const isoDate = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// Constantes de l'application
const Grade = { Again: 1, Hard: 2, Good: 3, Easy: 4 };
const AUTO_ADVANCE_MS = 200;

const S = {
  allCards: [], currentDeck: [], currentIndex: 0, currentChapter: 'Tout',
  availableChapters: ['Tout'],
  dailyNewCardLimit: 7, // Limite de nouvelles cartes par jour, comme dans votre recherche
  elapsedSeconds: 0, darkMode: false, currentTheme: 'default', reverseMode: false,
  streak: 0, maxStreak: 0, answerStartAt: null,
  isRevealed: false, awaitingGrade: false, awaitingAdvance: false,
  dailyHistory: {},
  searchIndex: [],
};

const els = {
  burgerButton: $('burger-button'), sidebarMenu: $('sidebar-menu'), menuOverlay: $('menu-overlay'), closeMenuButton: $('close-menu-button'),
  menuChapters: $('menu-chapters'), resetOptions: $('reset-options'), resetDataButton: $('reset-data-button'),
  searchBar: $('search-bar'), searchResultsContainer: $('search-results-container'),
  reverseModeButton: $('reverse-mode-button'), darkModeToggle: $('dark-mode-toggle'), themeSelector: $('theme-selector'),
  currentChapterLabel: $('current-chapter-label'),
  flashcardContainer: $('flashcard-container'), cardFrenchWord: $('card-french-word'), cardEnglishWord: $('card-english-word'),
  cardScore: $('card-score'), messageArea: $('message-area'), answerInput: $('answer-input'), submitAnswerButton: $('submit-answer-button'),
  gradeBar: $('grade-bar'),
  timer: $('timer'), streakBadge: $('streak-badge'),
  progressText: $('progress-text'), progressBarFill: $('progress-bar-fill'), progressPercentage: $('progress-percentage'),
  statsContent: $('stats-content'), sparkline: $('sparkline'), sparkPath: $('sparkline-path'), sparkFill: $('sparkline-fill'), sparkLast: $('sparkline-last'), chartLegend: $('chart-legend')
};

// --- Helpers UI ---
function showMsg(text, cls, timeout = 1800) { els.messageArea.textContent = text; els.messageArea.className = 'w-full text-center h-6 text-sm font-medium ' + (cls || ''); if (timeout) { setTimeout(() => { if (els.messageArea.textContent === text) els.messageArea.textContent = '' }, timeout) } }
function renderTimer() { const s = S.elapsedSeconds, h = String(s / 3600 | 0).padStart(2, '0'), m = String((s % 3600) / 60 | 0).padStart(2, '0'), sec = String(s % 60).padStart(2, '0'); els.timer.textContent = `${h}:${m}:${sec}`; }
function renderProgressBar() {
  const base = baseListForCurrentChapter();
  const total = base.length;
  const learned = base.filter(c => c.state !== 0).length; // FSRS state 0 = New
  const pct = total > 0 ? Math.round(learned * 100 / total) : 0;
  els.progressText.textContent = `Apprises: ${learned}/${total}`;
  els.progressBarFill.style.width = `${pct}%`;
  if (els.progressPercentage) els.progressPercentage.textContent = `${pct}%`;
}
function setSubmitVisible(v) { els.submitAnswerButton.classList.toggle('hidden', !v); }
function setInputDisabled(v) { els.answerInput.disabled = !!v; }
function setGradeBarVisible(v) { els.gradeBar.classList.toggle('hidden', !v); }
function applyNeutralCardStyle() { const el = els.flashcardContainer; el.classList.remove('light-mode-card-neutral', 'dark-mode-card-neutral'); el.classList.add(S.darkMode ? 'dark-mode-card-neutral' : 'light-mode-card-neutral'); }
function formatInterval(ms) { if (ms < 0) ms = 0; if (ms < MIN_MS) return `${Math.round(ms / 1000)}s`; if (ms < 60 * MIN_MS) return `${Math.round(ms / MIN_MS)}m`; if (ms < DAY_MS) return `${Math.round(ms / (60 * MIN_MS))}h`; const d = Math.round(ms / DAY_MS); return d < 30 ? `${d}j` : `${Math.round(d / 30)}mo`; }
function setMenuOpen(open) { els.sidebarMenu.classList.toggle('menu-slide-in', open); els.sidebarMenu.classList.toggle('menu-slide-out', !open); document.body.classList.toggle('menu-open', open); els.menuOverlay.setAttribute('aria-hidden', String(!open)); els.sidebarMenu.setAttribute('aria-hidden', String(!open)); els.burgerButton.setAttribute('aria-expanded', String(!!open)); }
function setDarkMode(onMode) { S.darkMode = !!onMode; document.body.classList.toggle('dark-mode', S.darkMode); document.body.classList.toggle('light-mode', !S.darkMode); els.darkModeToggle.innerHTML = S.darkMode ? '☀' : '🌙'; els.darkModeToggle.setAttribute('aria-pressed', String(S.darkMode)); saveState(); }


// --- Modèle de carte et migration FSRS ---
function initCard(rawCard) {
    const now = new Date();
    return {
      id: String(rawCard.id ?? `${rawCard.chapter}::${rawCard.french ?? rawCard.fr}`),
      french: rawCard.french ?? rawCard.fr,
      english: rawCard.english ?? rawCard.en,
      chapter: rawCard.chapter,
      // Champs FSRS
      due: rawCard.due ? new Date(rawCard.due) : now,
      stability: rawCard.stability || 0,
      difficulty: rawCard.difficulty || 0,
      elapsed_days: rawCard.elapsed_days || 0,
      scheduled_days: rawCard.scheduled_days || 0,
      reps: rawCard.reps || 0,
      lapses: rawCard.lapses || 0,
      state: rawCard.state ?? 0, // 0:New, 1:Learning, 2:Review, 3:Relearning
      last_review: rawCard.last_review ? new Date(rawCard.last_review) : null,
      // Métadonnées de l'application
      revCount: rawCard.revCount || 0,
      okCount: rawCard.okCount || 0,
      totalTimeMs: rawCard.totalTimeMs || 0,
      lastLatency: rawCard.lastLatency || 0,
    };
}
function migrateCardToFSRS(oldCard) {
    if (oldCard.hasOwnProperty('stability')) return oldCard; // Déjà au format FSRS
    console.log("Migration de l'ancienne carte ID:", oldCard.id);
    const migrated = initCard(oldCard);
    if (oldCard.state === 'review' && oldCard.intervalDays > 0) {
        migrated.state = 2; // Review
        migrated.stability = oldCard.intervalDays;
        migrated.difficulty = Math.max(0.1, 7 - ((oldCard.ef || 2.5) - 1.3) / (3.5 - 1.3) * 6);
        migrated.reps = oldCard.reps || 1;
    }
    migrated.lapses = oldCard.lapses || 0;
    migrated.last_review = oldCard.lastSeen ? new Date(oldCard.lastSeen) : null;
    migrated.due = oldCard.nextDue ? new Date(oldCard.nextDue) : new Date();
    return migrated;
}

// --- Construction du Deck (Logique FSRS) ---
function buildScheduledDeck(list) {
    const now = nowMs();
    const dueCards = list.filter(c => new Date(c.due).getTime() <= now);
    const learningDue = dueCards.filter(c => c.state === 1 || c.state === 3);
    let reviewDue = dueCards.filter(c => c.state === 2);
    let newCards = dueCards.filter(c => c.state === 0);

    const todayStr = isoDate();
    const newToday = S.dailyHistory[todayStr]?.new || 0;
    const newCardLimit = Math.max(0, S.dailyNewCardLimit - newToday);
    newCards = newCards.slice(0, newCardLimit);

    reviewDue.forEach(c => c.retrievability = getRetrievability(c));
    reviewDue.sort((a, b) => a.retrievability - b.retrievability); // Priorité aux cartes les plus oubliées
    learningDue.sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime());

    // Entrelacement simple pour varier les types de cartes
    const deck = [];
    const piles = { reviews: reviewDue, learning: learningDue, news: newCards };
    const sequence = ['reviews', 'news', 'reviews', 'learning'];
    let i = 0;
    while (piles.reviews.length || piles.learning.length || piles.news.length) {
        const pileName = sequence[i % sequence.length];
        const pile = piles[pileName];
        if (pile.length > 0) {
            deck.push(pile.shift());
        } else { // Si la pile prioritaire est vide, on prend la première disponible
            if (piles.reviews.length) deck.push(piles.reviews.shift());
            else if (piles.learning.length) deck.push(piles.learning.shift());
            else if (piles.news.length) deck.push(piles.news.shift());
        }
        i++;
    }
    return deck;
}

function baseListForCurrentChapter() { return (S.currentChapter === 'Tout') ? [...S.allCards] : S.allCards.filter(c => c.chapter === S.currentChapter); }
function rebuildDeck() { S.currentDeck = buildScheduledDeck(baseListForCurrentChapter()); S.currentIndex = 0; }

// --- Chapitres ---
function computeAvailableChapters() { const set = new Set(S.allCards.map(c => c.chapter)); S.availableChapters = ['Tout', ...Array.from(set).filter(Boolean).sort((a, b) => a.localeCompare(b))]; }
function renderChapterButtons() {
  const frag = document.createDocumentFragment();
  S.availableChapters.forEach(name => {
    const b = document.createElement('button');
    b.dataset.chapter = name;
    b.innerHTML = `${name === 'Tout' ? '📚' : (CHAPTER_EMOJIS[name] || '📘')} ${name}`;
    b.className = 'p-2 sm:p-3 rounded-lg shadow font-medium text-xs sm:text-sm transition-all duration-200 ease-in-out hover:opacity-80 w-full truncate chapter-button-default';
    frag.appendChild(b);
  });
  els.menuChapters.innerHTML = ''; els.menuChapters.appendChild(frag);
  updateActiveChapterButtons();
}
function updateActiveChapterButtons() { [...els.menuChapters.children].forEach(btn => { btn.classList.toggle('chapter-button-active', btn.dataset.chapter === S.currentChapter); btn.classList.toggle('chapter-button-default', btn.dataset.chapter !== S.currentChapter); }); }
function renderResetOptions() { els.resetOptions.innerHTML = S.availableChapters.map(n => `<option value="${n}">${n}</option>`).join(''); }

// --- Rendu de Carte ---
function renderCard(focus = 1) {
  els.messageArea.textContent = ''; els.answerInput.value = ''; S.answerStartAt = null; S.isRevealed = false; S.awaitingGrade = false; S.awaitingAdvance = false;
  setGradeBarVisible(false); setSubmitVisible(true); setInputDisabled(false); applyNeutralCardStyle();

  if (!S.currentDeck.length || S.currentIndex >= S.currentDeck.length) {
    const base = baseListForCurrentChapter();
    const dueCount = base.filter(c => new Date(c.due).getTime() <= nowMs()).length;
    els.cardFrenchWord.textContent = dueCount === 0 ? 'Félicitations ! Aucune carte à réviser.' : 'Deck terminé pour le moment !';
    els.cardEnglishWord.textContent = ''; els.cardEnglishWord.classList.add('hidden'); els.cardScore.textContent = '✓';
    setInputDisabled(true); setSubmitVisible(false);
    return;
  }
  const card = S.currentDeck[S.currentIndex];
  const promptEl = S.reverseMode ? els.cardEnglishWord : els.cardFrenchWord;
  const translationEl = S.reverseMode ? els.cardFrenchWord : els.cardEnglishWord;
  els.cardFrenchWord.textContent = card.french; els.cardEnglishWord.textContent = card.english;
  promptEl.classList.remove('hidden'); translationEl.classList.add('hidden');

  const retrievability = getRetrievability(card);
  const nextDue = new Date(card.due).getTime();
  const intervalMs = card.last_review ? nextDue - new Date(card.last_review).getTime() : 0;
  els.cardScore.textContent = `R: ${(retrievability * 100).toFixed(0)}%`;
  els.cardScore.title = `Stabilité: ${card.stability.toFixed(1)}j\nDifficulté: ${card.difficulty.toFixed(1)}\nProchaine révision dans: ${formatInterval(intervalMs)}`;

  if (focus) els.answerInput.focus({ preventScroll: true });
  els.currentChapterLabel.textContent = S.currentChapter;
}

// --- Logique de Notation et d'Avancement ---
function registerOutcome(card, grade, latencyMs) {
  card.revCount = (card.revCount || 0) + 1;
  if (grade >= Grade.Good) card.okCount = (card.okCount || 0) + 1;
  card.totalTimeMs = (card.totalTimeMs || 0) + (latencyMs || 0);
  card.lastLatency = latencyMs || 0;
  if (grade >= Grade.Good) { S.streak++; S.maxStreak = Math.max(S.maxStreak, S.streak); } else { S.streak = 0; }
  els.streakBadge.textContent = `🔥 ${S.streak}`;

  const d = isoDate();
  const rec = S.dailyHistory[d] || { rev: 0, ok: 0, ms: 0, new: 0 };
  rec.rev += 1;
  if (grade >= Grade.Good) rec.ok += 1;
  rec.ms += (latencyMs || 0);
  S.dailyHistory[d] = rec;
}

async function onGrade(grade) {
  if (!S.currentDeck.length || !S.awaitingGrade) return;
  S.awaitingGrade = false;

  const card = S.currentDeck[S.currentIndex];
  const latency = S.answerStartAt ? (nowMs() - S.answerStartAt) : 0;
  const wasNew = card.state === 0;

  scheduleCard(card, grade);
  registerOutcome(card, grade, latency);
  if (wasNew) { const d = isoDate(); S.dailyHistory[d].new = (S.dailyHistory[d].new || 0) + 1; }

  const nextDueMs = new Date(card.due).getTime() - nowMs();
  const labels = { 1: 'Encore', 2: 'Difficile', 3: 'Bien', 4: 'Facile' };
  showMsg(`${labels[grade]} — Dans ${formatInterval(nextDueMs)}`, grade >= Grade.Good ? 'text-emerald-500' : 'text-red-500');

  saveState(); // Sauvegarde immédiate après une notation
  setTimeout(() => {
    renderStats(); renderSparkline(); renderProgressBar(); // Mettre à jour les stats après la sauvegarde
    nextCard();
  }, AUTO_ADVANCE_MS);
}

function revealTranslation() {
  const trEl = S.reverseMode ? els.cardFrenchWord : els.cardEnglishWord;
  trEl.classList.remove('hidden');
  S.isRevealed = true;
}

function handleSubmitAnswer() {
  if (S.awaitingGrade) return;
  revealTranslation();
  S.awaitingGrade = true;
  setGradeBarVisible(true);
  setSubmitVisible(false);
  setInputDisabled(true);
  showMsg('Évaluez votre rappel (raccourcis 1, 2, 3, 4)', 'text-sky-500', 4000);
}

function nextCard() {
  if (!S.currentDeck.length) { renderCard(); return; }
  S.currentDeck.shift(); // On retire la carte qui vient d'être vue
  renderCard();
  renderProgressBar();
}

// --- Sauvegarde et Synchronisation ---
function saveState() {
  try {
    const serializableCards = S.allCards.map(c => ({
      ...c,
      due: c.due ? c.due.getTime() : null,
      last_review: c.last_review ? c.last_review.getTime() : null,
    }));
    const stateToSave = {
      allCards: serializableCards, elapsedSeconds: S.elapsedSeconds, currentChapter: S.currentChapter, darkMode: S.darkMode,
      currentTheme: S.currentTheme, reverseMode: S.reverseMode, streak: S.streak, maxStreak: S.maxStreak, dailyHistory: S.dailyHistory,
    };
    localStorage.setItem('flashcardAppData_v2_fsrs', JSON.stringify(stateToSave));
  } catch (e) { console.error("Erreur sauvegarde:", e); }
}

function loadAndSyncData() {
  const savedJSON = localStorage.getItem('flashcardAppData_v2_fsrs');
  const oldSavedJSON = localStorage.getItem('flashcardAppData'); // Pour migration
  const masterData = flashcardData;
  let savedState = null;
  let addedWordsCount = 0, migratedCount = 0;

  try {
    if (savedJSON) savedState = JSON.parse(savedJSON);
    else if (oldSavedJSON) { savedState = JSON.parse(oldSavedJSON); console.log("Anciennes données détectées, migration..."); }
  } catch (e) { console.error("Erreur parsing:", e); }

  if (!savedState || !savedState.allCards || savedState.allCards.length === 0) {
    S.allCards = masterData.map(raw => initCard(raw));
  } else {
    const deserializedCards = savedState.allCards.map(c => ({
      ...c,
      due: c.due ? new Date(c.due) : new Date(),
      last_review: c.last_review ? new Date(c.last_review) : null
    }));
    const savedCardsMap = new Map(deserializedCards.map(c => [String(c.id), c]));
    const masterIds = new Set();
    const finalCards = [];

    masterData.forEach(rawCard => {
      const id = String(rawCard.id ?? `${rawCard.chapter}::${rawCard.french ?? rawCard.fr}`);
      masterIds.add(id);
      let cardToPush = savedCardsMap.get(id);
      if (cardToPush) {
        Object.assign(cardToPush, { french: rawCard.french, english: rawCard.english, chapter: rawCard.chapter });
      } else {
        cardToPush = initCard(rawCard);
        addedWordsCount++;
      }
      if (!cardToPush.hasOwnProperty('stability')) {
        cardToPush = migrateCardToFSRS(cardToPush);
        migratedCount++;
      }
      finalCards.push(cardToPush);
    });
    S.allCards = finalCards.filter(c => masterIds.has(String(c.id)));
    Object.assign(S, { ...savedState, allCards: S.allCards });
  }

  if (addedWordsCount > 0) showMsg(`${addedWordsCount} nouveau(x) mot(s) ajouté(s) ✨`, 'text-emerald-500', 3500);
  if (migratedCount > 0) showMsg(`${migratedCount} cartes migrées vers le nouvel algorithme !`, 'text-sky-500', 3500);

  setDarkMode(S.darkMode);
  if (els.themeSelector) els.themeSelector.value = S.currentTheme;
  buildSearchIndex();
  initUI();
}

// --- Recherche ---
function buildSearchIndex() { S.searchIndex = S.allCards.map(c => ({ id: c.id, text: `${c.french.toLowerCase()} ${c.english.toLowerCase()}`, ref: c })); }
function filterCardsForSearch(q) {
  const query = (q || '').trim().toLowerCase();
  if (!query) { els.searchResultsContainer.innerHTML = ''; return; }
  const res = S.searchIndex.filter(c => c.text.includes(query)).slice(0, 8);
  if (!res.length) { els.searchResultsContainer.innerHTML = '<p class="p-2">Aucun résultat</p>'; return; }
  const hoverCls = S.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200';
  els.searchResultsContainer.innerHTML = res.map(item => `<div class="p-2 cursor-pointer rounded ${hoverCls}" data-id="${item.id}">${item.ref.french} — ${item.ref.english}</div>`).join('');
}
function jumpToCard(cardId) {
  const card = S.allCards.find(c => String(c.id) === String(cardId));
  if (!card) return;
  if (S.currentChapter !== card.chapter && card.chapter) { S.currentChapter = card.chapter; rebuildDeck(); updateActiveChapterButtons(); }
  
  // Place la carte au début du deck actuel si elle n'est pas déjà due
  const deckCardIndex = S.currentDeck.findIndex(c => String(c.id) === String(cardId));
  if (deckCardIndex > -1) {
    S.currentDeck.splice(deckCardIndex, 1);
  }
  S.currentDeck.unshift(card);
  
  renderCard(1);
}

// --- Événements ---
on(els.burgerButton, 'click', () => setMenuOpen(true));
on(els.menuOverlay, 'click', () => setMenuOpen(false));
on(els.closeMenuButton, 'click', () => setMenuOpen(false));

on(els.menuChapters, 'click', e => {
  const btn = e.target.closest('button[data-chapter]');
  if (!btn) return;
  const ch = btn.dataset.chapter;
  if (ch === S.currentChapter) { setMenuOpen(false); return; }
  S.currentChapter = ch;
  rebuildDeck(); renderCard(0); renderProgressBar(); updateActiveChapterButtons(); saveState();
  setMenuOpen(false);
});

on(els.resetDataButton, 'click', () => {
    if (!confirm("Êtes-vous sûr de vouloir réinitialiser la progression pour la sélection ? Cette action est irréversible.")) return;
    const chapter = els.resetOptions.value || 'Tout';
    S.allCards.forEach(c => { if (chapter === 'Tout' || c.chapter === chapter) { Object.assign(c, initCard(c)); } });
    if (chapter === 'Tout') { Object.assign(S, { streak: 0, maxStreak: 0, dailyHistory: {} }); }
    rebuildDeck(); renderCard(0); renderStats(); renderSparkline(); renderProgressBar(); saveState();
    showMsg('Progression réinitialisée', 'text-orange-500', 1500);
});

on(els.darkModeToggle, 'click', () => setDarkMode(!S.darkMode));
on(els.reverseModeButton, 'click', () => { S.reverseMode = !S.reverseMode; renderCard(0); saveState(); });
on(els.themeSelector, 'change', () => { S.currentTheme = els.themeSelector.value; saveState(); });

on(els.searchBar, 'input', e => filterCardsForSearch(e.target.value));
on(els.searchResultsContainer, 'click', e => {
  const item = e.target.closest('[data-id]'); if (!item) return;
  jumpToCard(item.dataset.id);
  els.searchBar.value = ''; els.searchResultsContainer.innerHTML = '';
  setMenuOpen(false);
});
on(els.searchBar, 'keydown', e => {
  if (e.key === 'Enter') {
    const first = els.searchResultsContainer.querySelector('[data-id]');
    if (first) { jumpToCard(first.getAttribute('data-id')); e.preventDefault(); }
    els.searchBar.value = ''; els.searchResultsContainer.innerHTML = ''; setMenuOpen(false);
  }
});

on(els.flashcardContainer, 'click', () => { if (!S.isRevealed && !els.answerInput.disabled) handleSubmitAnswer(); });
on(els.submitAnswerButton, 'click', handleSubmitAnswer);
on(els.answerInput, 'input', () => { if (!S.answerStartAt && els.answerInput.value.trim().length > 0) S.answerStartAt = nowMs(); });
on(els.gradeBar, 'click', e => { const btn = e.target.closest('button[data-grade]'); if (btn) onGrade(parseInt(btn.dataset.grade, 10)); });

on(document, 'keydown', e => {
  const inField = document.activeElement === els.answerInput || document.activeElement === els.searchBar;
  if (e.key === 'Enter' && !inField) { e.preventDefault(); if (!S.isRevealed && !els.answerInput.disabled) handleSubmitAnswer(); }
  if (e.key === 'Enter' && document.activeElement === els.answerInput) { e.preventDefault(); handleSubmitAnswer(); }

  if (S.awaitingGrade && !inField) {
    if (e.key >= '1' && e.key <= '4') { e.preventDefault(); onGrade(parseInt(e.key)); }
  }
});

// --- Stats & Sparkline ---
function renderStats() {
    const total = S.allCards.length;
    const learned = S.allCards.filter(c => c.state !== 0).length;
    const dueNow = S.allCards.filter(c => new Date(c.due).getTime() <= nowMs()).length;
    const reviewCards = S.allCards.filter(c => c.state === 2);
    const avgStability = reviewCards.length ? reviewCards.reduce((sum, c) => sum + c.stability, 0) / reviewCards.length : 0;
    const matureCards = reviewCards.filter(c => c.stability >= 21).length;
    const totalReviews = Object.values(S.dailyHistory).reduce((s, r) => s + r.rev, 0);
    const okReviews = Object.values(S.dailyHistory).reduce((s, r) => s + r.ok, 0);
    const acc = totalReviews ? Math.round(okReviews * 100 / totalReviews) : 0;
    
    els.statsContent.innerHTML = `
      <div class="grid grid-cols-2 gap-y-1 gap-x-4">
        <div class="text-gray-500 dark:text-gray-400">Total</div><div class="text-right font-semibold">${total}</div>
        <div class="text-gray-500 dark:text-gray-400">Apprises</div><div class="text-right font-semibold">${learned}</div>
        <div class="text-gray-500 dark:text-gray-400">À revoir</div><div class="text-right font-semibold">${dueNow}</div>
        <div class="text-gray-500 dark:text-gray-400">Matures (>21j)</div><div class="text-right font-semibold">${matureCards}</div>
        <div class="text-gray-500 dark:text-gray-400">Stabilité moy.</div><div class="text-right font-semibold">${avgStability.toFixed(1)}j</div>
        <div class="text-gray-500 dark:text-gray-400">Précision</div><div class="text-right font-semibold">${acc}%</div>
      </div>`;
}
function renderSparkline() {
    const svg = els.sparkline, path = els.sparkPath, fill = els.sparkFill, dot = els.sparkLast, legend = els.chartLegend;
    if (!svg || !path) return;
    const w = svg.clientWidth || 260, h = svg.clientHeight || 70, pad = 6;
    const days = Array.from({ length: 14 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (13 - i)); return isoDate(d); });
    const vals = days.map(d => S.dailyHistory[d]?.rev || 0);
    const maxV = Math.max(1, ...vals);
    const dx = (w - 2 * pad) / (vals.length - 1 || 1);
    const pts = vals.map((v, i) => [pad + i * dx, h - pad - (v / maxV) * (h - 2 * pad - 12)]);
    if (!pts.length) { path.setAttribute('d', ''); return; }
    const d = 'M ' + pts.map(p => p.join(',')).join(' L ');
    path.setAttribute('d', d);
    fill.setAttribute('d', d + ` L ${pts[pts.length - 1][0]},${h - pad} L ${pts[0][0]},${h - pad} Z`);
    dot.setAttribute('cx', String(pts[pts.length - 1][0]));
    dot.setAttribute('cy', String(pts[pts.length - 1][1]));
    const total14 = vals.reduce((a, b) => a + b, 0);
    const rev7 = vals.slice(-7).reduce((a,b)=>a+b,0);
    legend.textContent = `${total14} révisions / 14j`;
}

// --- Initialisation ---
function initUI() {
  computeAvailableChapters();
  renderChapterButtons();
  renderResetOptions();
  rebuildDeck();
  renderCard(0);
  renderProgressBar();
  renderStats();
  renderSparkline();
  setInterval(() => { S.elapsedSeconds++; renderTimer(); if (S.elapsedSeconds % 15 === 0) saveState(); }, 1000);
}

// --- Point d'entrée de l'application ---
loadAndSyncData();
