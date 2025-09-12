import { flashcardData, CHAPTER_EMOJIS } from './data.js';

/* =========================
Constantes & Utilitaires
========================= */
const DAY_MS = 24 * 60 * 60 * 1000;
const MIN_MS = 60 * 1000;

const DEFAULT_EASE = 2.5; // 250%
const MIN_EASE = 1.3; // 130% plancher
const HARD_MULTIPLIER = 1.2; // Hard: x1.2
const EASY_BONUS = 1.3; // Easy: +30%
const INTERVAL_MOD = 1.0; // Modificateur global
const LEARNING_STEPS_MIN = [10, 60]; // en minutes (ex: 10m -> 1h) (gardées < 1 jour)

const STORAGE_KEYS = {
    cards: 'srs_cards_v1',
    prefs: 'srs_prefs_v1',
    stats: 'srs_stats_v1',
    theme: 'srs_theme_v1',
    dailySeed: 'srs_day_seed_v1',
    // NOUVEAU: état persistant du chrono (pour reprise robuste après crash/reload)
    timer: 'srs_timer_v1',
};

const KEYCODES = {
    ENTER: 'Enter',
    SPACE: ' ',
    ESC: 'Escape',
};
/* =========================
I18N
========================= */
const I18N = {
    fr: {
        reverse_fr_en: '⇄ FR → EN',
        reverse_en_fr: '⇄ EN → FR',
        toggle_chapter_tooltip: 'Activer/désactiver ce chapitre',
        all_chapters: 'Tous les chapitres',
        all_chapters_short: 'Tous chapitres',
        n_chapters_selected: '{n} chapitres sélectionnés',
        reset_all: 'Tout réinitialiser (toutes cartes)',
        reset_chapter: 'Réinitialiser: {chapter}',
        type_and_enter: 'Tapez votre réponse et appuyez Entrée (Entrée sans réponse = révéler)',
        press_enter_or_click: 'Appuyez sur Entrée ou cliquez la carte pour passer',
        grading_shortcuts: 'Encore (1) • Difficile (2) • Bien (3) • Facile (4) — ou Entrée/clic pour passer',
        grade_again: 'Encore',
        grade_hard: 'Difficile',
        grade_good: 'Bien',
        grade_easy: 'Facile',
        session_done_title: '🎉 Session terminée',
        session_done_subtitle: 'Vous avez triomphé des cartes disponibles. Revenez plus tard !',
        cycle_progress: 'Cycle: {done}/{total}',
        today_studied_correct: "Aujourd'hui: {studied} cartes, {correct} correctes",
        time_today_and_total: "Temps aujourd'hui: {timeToday} • Total cumulé: {timeTotal}",
        grades_breakdown: 'Encore: {again} • Difficile: {hard} • Bien: {good} • Facile: {easy}',
        streak: 'Streak: {streak} 🔥',
        cards: 'cartes',
        total_time_title: 'Total cumulé: {x}',
        empty_input_hint: 'Champ vide. Appuyez sur Espace pour révéler ou tapez une réponse.',
        auto_prefix: 'Auto: ',
        reset_selection_and_timer: 'Sélection réinitialisée ✅ — Chrono remis à zéro ⏱️',
        reset_selection: 'Sélection réinitialisée ✅',
    },
    en: {
        reverse_fr_en: '⇄ FR → EN',
        reverse_en_fr: '⇄ EN → FR',
        toggle_chapter_tooltip: 'Toggle this chapter',
        all_chapters: 'All chapters',
        all_chapters_short: 'All chapters',
        n_chapters_selected: '{n} chapters selected',
        reset_all: 'Reset everything (all cards)',
        reset_chapter: 'Reset: {chapter}',
        type_and_enter: 'Type your answer and press Enter (Enter on an empty field reveals)',
        press_enter_or_click: 'Press Enter or click the card to continue',
        grading_shortcuts: 'Again (1) • Hard (2) • Good (3) • Easy (4) — or Enter/click to continue',
        grade_again: 'Again',
        grade_hard: 'Hard',
        grade_good: 'Good',
        grade_easy: 'Easy',
        session_done_title: '🎉 Session complete',
        session_done_subtitle: 'You have finished the available cards. Come back later!',
        cycle_progress: 'Cycle: {done}/{total}',
        today_studied_correct: 'Today: {studied} cards, {correct} correct',
        time_today_and_total: 'Time today: {timeToday} • Total time: {timeTotal}',
        grades_breakdown: 'Again: {again} • Hard: {hard} • Good: {good} • Easy: {easy}',
        streak: 'Streak: {streak} 🔥',
        cards: 'cards',
        total_time_title: 'Total time: {x}',
        empty_input_hint: 'Empty field. Press Space to reveal or type an answer.',
        auto_prefix: 'Auto: ',
        reset_selection_and_timer: 'Selection reset ✅ — Timer cleared ⏱️',
        reset_selection: 'Selection reset ✅',
    }
};

function t(key, params = {}) {
    const dict = I18N[App.prefs?.lang] || I18N.fr;
    const base = dict[key] ?? I18N.fr[key] ?? key;
    return base.replace(/\{(\w+)\}/g, (_, k) => (params[k] != null ? String(params[k]) : ''));
}
function nowMs() {
    return Date.now();
}
function todayKey(date = new Date()) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.toISOString().slice(0, 10);
}
function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
}
function randFuzz() {
    return 0.95 + Math.random() * 0.10;
}
function seededRandom(seed) {
    // Xorshift simple
    let x = seed || 123456789;
    return function () {
        x ^= x << 13;
        x ^= x >>> 17;
        x ^= x << 5;
        // 0..1
        return ((x < 0 ? ~x + 1 : x) % 1000000) / 1000000;
    };
}
function shuffleInPlace(arr, rnd = Math.random) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(rnd() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
function normalizeText(s) {
    return s
        .toLowerCase()
        .replace(/[()]/g, ' ')
        .replace(/[.,;:!?/\\'’"«»\-–—]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}
function splitAlternatives(s) {
    return s.split(/[\/,]/).map(v => normalizeText(v)).filter(Boolean);
}
function jaccardSimilarity(a, b) {
    const ta = new Set(a.split(' ').filter(Boolean));
    const tb = new Set(b.split(' ').filter(Boolean));
    let inter = 0;
    for (const tok of ta)
        if (tb.has(tok)) inter++;
    const union = ta.size + tb.size - inter;
    return union === 0 ? 0 : inter / union;
}
function bestSimilarity(userRaw, targetRaw) {
    const userN = normalizeText(userRaw);
    const alts = splitAlternatives(targetRaw);
    let best = 0;
    for (const alt of alts) {
        const s = jaccardSimilarity(userN, alt);
        if (s > best) best = s;
    }
    return best; // 0..1
}
function formatMs(hhmmssMs) {
    const s = Math.floor(hhmmssMs / 1000);
    const hh = String(Math.floor(s / 3600)).padStart(2, '0');
    const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
}
function percent(n) { return `${Math.round(n * 100)}%`; }

/* =========================
DOM
========================= */
const els = {
    burgerButton: document.getElementById('burger-button'),
    sidebarMenu: document.getElementById('sidebar-menu'),
    menuOverlay: document.getElementById('menu-overlay'),
    closeMenuButton: document.getElementById('close-menu-button'),
    menuChapters: document.getElementById('menu-chapters'),
    chaptersTitle: document.getElementById('chapters-title'),
    searchBar: document.getElementById('search-bar'),
    searchResults: document.getElementById('search-results-container'),
    darkModeToggle: document.getElementById('dark-mode-toggle'),
    reverseModeButton: document.getElementById('reverse-mode-button'),
    themeSelector: document.getElementById('theme-selector'),
    resetOptions: document.getElementById('reset-options'),
    resetButton: document.getElementById('reset-data-button'),

    currentChapterLabel: document.getElementById('current-chapter-label'),
    flashcardContainer: document.getElementById('flashcard-container'),
    cardFrench: document.getElementById('card-french-word'),
    cardEnglish: document.getElementById('card-english-word'),
    cardScore: document.getElementById('card-score'),
    messageArea: document.getElementById('message-area'),

    inputBar: document.getElementById('input-bar'),
    answerInput: document.getElementById('answer-input'),
    submitAnswerButton: document.getElementById('submit-answer-button'),

    gradeBar: document.getElementById('grade-bar'),
    btnAgain: document.getElementById('grade-again'),
    btnHard: document.getElementById('grade-hard'),
    btnGood: document.getElementById('grade-good'),
    btnEasy: document.getElementById('grade-easy'),

    timer: document.getElementById('timer'),
    streakBadge: document.getElementById('streak-badge'),
    progressText: document.getElementById('progress-text'),
    progressPerc: document.getElementById('progress-percentage'),
    progressFill: document.getElementById('progress-bar-fill'),

    statsContent: document.getElementById('stats-content'),
    sparkline: document.getElementById('sparkline'),
    sparklinePath: document.getElementById('sparkline-path'),
    sparklineFill: document.getElementById('sparkline-fill'),
    sparklineLast: document.getElementById('sparkline-last'),
    chartTitle: document.getElementById('chart-title'),
    chartLegend: document.getElementById('chart-legend'),

    animatedBg: document.getElementById('animated-bg-elements'),
};

/* =========================
État global
========================= */
const App = {
    // cartes (persistées)
    cards: new Map(), // id -> CardState

    // préférences (persistées)
    prefs: {
    darkMode: false,
    reverseMode: false,
    theme: 'default',
    activeChapters: [],
    lang: 'fr', // NOUVEAU
},

    // stats (persistées)
    stats: {
        byDay: {}, // 'YYYY-MM-DD' -> { studied: number, correct: number, again: number, hard: number, good: number, easy: number, timeMs: number }
        streak: 0,
        lastStudyDay: null,
        totalTimeMs: 0, // temps total cumulé (ms)
    },

    // session (non persistée sauf pour le départ chrono)
    session: {
        startedAt: null, // NOUVEAU: persiste via STORAGE_KEYS.timer
        timerInterval: null,
        queueLearning: [],
        queueReview: [],
        queueNew: [],
        rng: Math.random,
        currentCardId: null,
        revealed: false,
        inputLocked: false,
        pendingNext: false,
        autoGraded: false,
        lastGrade: null,
        lastScore: null,
        recentlyShown: [],
        skipBuffer: [],
        studiedCount: 0,
        sessionTotal: 0,
    },

    data: {
        chapters: [],
    }
};

/* =========================
Chargement / Sauvegarde
========================= */
function loadPersisted() {
    const rawCards = localStorage.getItem(STORAGE_KEYS.cards);
    const rawPrefs = localStorage.getItem(STORAGE_KEYS.prefs);
    const rawStats = localStorage.getItem(STORAGE_KEYS.stats);
    const rawTheme = localStorage.getItem(STORAGE_KEYS.theme);
    const daySeed = localStorage.getItem(STORAGE_KEYS.dailySeed);
    const rawTimer = localStorage.getItem(STORAGE_KEYS.timer); // NOUVEAU

    if (rawPrefs) {
        try { Object.assign(App.prefs, JSON.parse(rawPrefs)); } catch { }
    }
    if (rawTheme) {
        App.prefs.theme = rawTheme;
    }
    if (rawStats) {
        try { Object.assign(App.stats, JSON.parse(rawStats)); } catch { }
    }

    // init cartes
    const known = new Map();
    if (rawCards) {
        try {
            const arr = JSON.parse(rawCards);
            for (const c of arr) known.set(String(c.id), c);
        } catch { }
    }

    // fusion avec nouvelles cartes
    for (const base of flashcardData) {
        const id = String(base.id);
        let cs = known.get(id);
        if (!cs) {
            cs = {
                id,
                french: base.french,
                english: base.english,
                chapter: base.chapter,
                ease: DEFAULT_EASE,
                intervalDays: 0,
                dueMs: 0,
                state: 'new', // 'new' | 'learning' | 'review' | 'relearning'
                learningStepIndex: 0,
                reps: 0,
                lapses: 0,
                lastScore: null,
                lastAnswer: '',
                suspended: false,
                buriedUntil: 0,
            };
        } else {
            cs.french = base.french;
            cs.english = base.english;
            cs.chapter = base.chapter;
        }
        App.cards.set(id, cs);
    }

    // chapters uniques
    const chapters = [...new Set(flashcardData.map(c => c.chapter))].sort();
    App.data.chapters = chapters;

    // NOUVEAU: rattrapage du chrono si la page a été fermée sans sauvegarde
    if (rawTimer) {
        try {
            const t = JSON.parse(rawTimer);
            if (t && Number.isFinite(t.startedAt) && t.startedAt > 0) {
                // Ajoute le temps écoulé depuis le dernier start jusqu'à maintenant, réparti par jour
                addTimeRangeToStats(t.startedAt, nowMs());
                saveStats();
                // Repart immédiatement le chrono à partir de maintenant
                App.session.startedAt = nowMs();
                persistTimerState();
            }
        } catch { /* ignore */ }
    }

    // daily seed pour l'ordre des new
    if (daySeed && todayKey() === JSON.parse(daySeed).day) {
        const { seed } = JSON.parse(daySeed);
        App.session.rng = seededRandom(seed);
    } else {
        const seed = Math.floor(Math.random() * 1e9);
        localStorage.setItem(STORAGE_KEYS.dailySeed, JSON.stringify({ day: todayKey(), seed }));
        App.session.rng = seededRandom(seed);
    }
}
function saveCards() {
    localStorage.setItem(STORAGE_KEYS.cards, JSON.stringify([...App.cards.values()]));
}
/* =========================
Langue UI
========================= */
function setReverseButtonLabel() {
    els.reverseModeButton.textContent = App.prefs.reverseMode ? t('reverse_en_fr') : t('reverse_fr_en');
}
function applyLanguage() {
    document.documentElement.lang = App.prefs.lang === 'en' ? 'en' : 'fr';
    setReverseButtonLabel();

    // re-render sections avec du texte
    renderChaptersMenu();
    updateCurrentChapterLabel();
    populateResetOptions();
    renderStats();
    updateProgress();
    if (App.session.currentCardId) {
        const c = App.cards.get(App.session.currentCardId);
        renderCard(c);
    }
}
function savePrefs() {
    localStorage.setItem(STORAGE_KEYS.prefs, JSON.stringify(App.prefs));
    localStorage.setItem(STORAGE_KEYS.theme, App.prefs.theme);
}
function saveStats() {
    localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(App.stats));
}

// NOUVEAU: Sauvegarde simple de l'état du chrono (seulement startedAt)
function persistTimerState() {
    const payload = {
        startedAt: App.session.startedAt && Number.isFinite(App.session.startedAt) ? App.session.startedAt : null,
    };
    try {
        localStorage.setItem(STORAGE_KEYS.timer, JSON.stringify(payload));
    } catch { /* ignore quota errors */ }
}

// NOUVEAU: Ajoute un intervalle de temps aux stats, en le répartissant proprement
function addTimeRangeToStats(startMs, endMs) {
    if (!Number.isFinite(startMs) || !Number.isFinite(endMs)) return;
    if (endMs <= startMs) return;

    let curDayStart = new Date(startMs);
    curDayStart.setHours(0, 0, 0, 0);

    while (true) {
        const dayStart = curDayStart.getTime();
        const nextDayStart = dayStart + DAY_MS;
        const sliceStart = Math.max(startMs, dayStart);
        const sliceEnd = Math.min(endMs, nextDayStart);
        const slice = Math.max(0, sliceEnd - sliceStart);

        if (slice > 0) {
            const key = todayKey(curDayStart);
            if (!App.stats.byDay[key]) {
                App.stats.byDay[key] = { studied: 0, correct: 0, again: 0, hard: 0, good: 0, easy: 0, timeMs: 0 };
            }
            App.stats.byDay[key].timeMs = (App.stats.byDay[key].timeMs || 0) + slice;
            App.stats.totalTimeMs = (App.stats.totalTimeMs || 0) + slice;
        }
        if (sliceEnd >= endMs) break;
        curDayStart = new Date(nextDayStart);
    }
}

/* =========================
Thème / Mode Sombre / BG
========================= */
function applyDarkMode() {
    document.body.classList.toggle('dark-mode', !!App.prefs.darkMode);
    document.body.classList.toggle('light-mode', !App.prefs.darkMode);
    els.darkModeToggle.setAttribute('aria-pressed', App.prefs.darkMode ? 'true' : 'false');
    els.darkModeToggle.textContent = App.prefs.darkMode ? '☀️' : '🌙';
}
function applyTheme() {
    const theme = App.prefs.theme || 'default';
    if (theme === 'pastel') {
        enablePastelBg();
    } else {
        disablePastelBg();
    }
}
function enablePastelBg() {
    const c = els.animatedBg;
    c.innerHTML = '';
    const count = 10;
    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        const size = 80 + Math.floor(Math.random() * 120);
        el.style.position = 'absolute';
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.borderRadius = '50%';
        el.style.filter = 'blur(18px)';
        el.style.opacity = '0.28';
        const colors = ['#A78BFA', '#60A5FA', '#34D399', '#FBBF24', '#F472B6', '#F87171', '#22D3EE'];
        el.style.background = colors[Math.floor(Math.random() * colors.length)];
        el.style.left = `${Math.random() * 100}%`;
        el.style.top = `${Math.random() * 100}%`;
        el.style.transform = 'translate(-50%, -50%)';
        el.style.transition = 'transform 10s ease-in-out';
        c.appendChild(el);

        setTimeout(() => {
            const drift = () => {
                const x = (Math.random() * 100);
                const y = (Math.random() * 100);
                el.style.left = `${x}%`;
                el.style.top = `${y}%`;
            };
            drift();
            el._driftInterval = setInterval(drift, 10000);
        }, 100);
    }
}
function disablePastelBg() {
    const c = els.animatedBg;
    if (!c) return;
    [...c.children].forEach(ch => {
        if (ch._driftInterval) clearInterval(ch._driftInterval);
    });
    c.innerHTML = '';
}

/* =========================
Menu Burger
========================= */
function openMenu() {
    document.body.classList.add('menu-open');
    els.menuOverlay.setAttribute('aria-hidden', 'false');
    els.sidebarMenu.setAttribute('aria-hidden', 'false');
    els.burgerButton.setAttribute('aria-expanded', 'true');
    els.sidebarMenu.classList.remove('menu-slide-out');
    els.sidebarMenu.classList.add('menu-slide-in');
}
function closeMenu() {
    document.body.classList.remove('menu-open');
    els.menuOverlay.setAttribute('aria-hidden', 'true');
    els.sidebarMenu.setAttribute('aria-hidden', 'true');
    els.burgerButton.setAttribute('aria-expanded', 'false');
    els.sidebarMenu.classList.add('menu-slide-out');
    els.sidebarMenu.classList.remove('menu-slide-in');
}

/* =========================
Chapitres / UI menu
========================= */
function renderChaptersMenu() {
    const container = els.menuChapters;
    container.innerHTML = '';

    const makeBtn = (label, value, isActive) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `w-full px-3 py-2 rounded-md text-left ${isActive ? 'chapter-button-active' : 'chapter-button-default'}`;
        btn.textContent = `${CHAPTER_EMOJIS[value] || '📘'} ${label}`;
        btn.title = t('toggle_chapter_tooltip');
        btn.addEventListener('click', () => {
            toggleChapter(value);
        });
        return btn;
    };

    const allActive = App.prefs.activeChapters.length === 0;
    const btnAll = makeBtn(t('all_chapters'), 'ALL', allActive);
    btnAll.addEventListener('click', () => setChapters([]));
    container.appendChild(btnAll);

    for (const ch of App.data.chapters) {
        const active = App.prefs.activeChapters.includes(ch);
        container.appendChild(makeBtn(ch, ch, active));
    }

    updateCurrentChapterLabel();
    populateResetOptions();
}

function updateCurrentChapterLabel() {
    const actives = App.prefs.activeChapters;
    let text = '';
    if (!actives || actives.length === 0) {
        text = t('all_chapters_short');
    } else if (actives.length === 1) {
        text = actives[0];
    } else {
        text = t('n_chapters_selected', { n: actives.length });
    }
    els.currentChapterLabel.textContent = text;
}

function populateResetOptions() {
    const sel = els.resetOptions;
    sel.innerHTML = '';
    const optAll = document.createElement('option');
    optAll.value = 'ALL';
    optAll.textContent = t('reset_all');
    sel.appendChild(optAll);

    for (const ch of App.data.chapters) {
        const opt = document.createElement('option');
        opt.value = ch;
        opt.textContent = t('reset_chapter', { chapter: ch });
        sel.appendChild(opt);
    }
}
function updateCurrentChapterLabel() {
    const actives = App.prefs.activeChapters;
    let text = '';
    if (!actives || actives.length === 0) {
        text = 'Tous chapitres';
    } else if (actives.length === 1) {
        text = actives[0];
    } else {
        text = `${actives.length} chapitres sélectionnés`;
    }
    els.currentChapterLabel.textContent = text;
}
function setChapters(arr) {
    App.prefs.activeChapters = arr.slice();
    savePrefs();
    renderChaptersMenu();
    rebuildQueuesAndMaybeReload();
}
function toggleChapter(chapter) {
    const sel = new Set(App.prefs.activeChapters);
    if (sel.has(chapter)) sel.delete(chapter);
    else sel.add(chapter);
    App.prefs.activeChapters = [...sel];
    savePrefs();
    renderChaptersMenu();
    rebuildQueuesAndMaybeReload();
}
function populateResetOptions() {
    const sel = els.resetOptions;
    sel.innerHTML = '';
    const optAll = document.createElement('option');
    optAll.value = 'ALL';
    optAll.textContent = 'Tout réinitialiser (toutes cartes)';
    sel.appendChild(optAll);

    for (const ch of App.data.chapters) {
        const opt = document.createElement('option');
        opt.value = ch;
        opt.textContent = `Réinitialiser: ${ch}`;
        sel.appendChild(opt);
    }
}

/* =========================
Files d’attente (Anki-like)
========================= */
function isInActiveChapters(card) {
    const actives = App.prefs.activeChapters;
    if (!actives || actives.length === 0) return true;
    return actives.includes(card.chapter);
}
function collectQueues() {
    const learning = [];
    const review = [];
    const news = [];

    const now = nowMs();
    for (const c of App.cards.values()) {
        if (!isInActiveChapters(c)) continue;
        if (c.suspended) continue;
        if (c.buriedUntil && c.buriedUntil > now) continue;

        switch (c.state) {
            case 'learning':
            case 'relearning':
                if (c.dueMs <= now) learning.push(c);
                break;
            case 'review':
                if (c.dueMs <= now) review.push(c);
                break;
            case 'new':
            default:
                news.push(c);
                break;
        }
    }

    learning.sort((a, b) => a.dueMs - b.dueMs);

    const now2 = nowMs();
    review.sort((a, b) => {
        const overA = (now2 - a.dueMs) / Math.max(1, a.intervalDays * DAY_MS);
        const overB = (now2 - b.dueMs) / Math.max(1, b.intervalDays * DAY_MS);
        if (overB !== overA) return overB - overA;
        if (a.intervalDays !== b.intervalDays) return a.intervalDays - b.intervalDays;
        return a.id.localeCompare(b.id);
    });

    const rnd = App.session.rng;
    shuffleInPlace(news, rnd);

    return { learning, review, news };
}
function rebuildQueues() {
    const { learning, review, news } = collectQueues();
    App.session.queueLearning = learning.map(c => c.id);
    App.session.queueReview = review.map(c => c.id);
    App.session.queueNew = news.map(c => c.id);

    const totalDue = learning.length + review.length + news.length;
    App.session.sessionTotal = totalDue;
    updateProgress();
}
function rebuildQueuesAndMaybeReload() {
    rebuildQueues();
    if (!App.session.currentCardId) {
        loadNextCard();
    } else {
        updateProgress();
    }
}
function pickNextCardId() {
    const recent = new Set(App.session.recentlyShown.slice(-10));
    const pickFrom = (queue) => {
        for (let i = 0; i < queue.length; i++) {
            if (!recent.has(queue[i])) {
                const id = queue.splice(i, 1)[0];
                return id;
            }
        }
        return queue.shift() || null;
    };

    if (App.session.skipBuffer.length > 0) {
        const id = App.session.skipBuffer.shift();
        return id;
    }

    let id = pickFrom(App.session.queueLearning);
    if (id) return id;
    id = pickFrom(App.session.queueReview);
    if (id) return id;
    id = pickFrom(App.session.queueNew);
    if (id) return id;

    return null;
}

/* =========================
Affichage de carte
========================= */
function renderCard(card) {
    const reverse = App.prefs.reverseMode;

    els.cardEnglish.classList.toggle('hidden', !App.session.revealed);

    if (App.session.lastScore != null) {
        els.cardScore.textContent = `${Math.round(App.session.lastScore * 100)}%`;
    } else if (App.session.lastGrade != null) {
        const labels = {1: t('grade_again'), 2: t('grade_hard'), 3: t('grade_good'), 4: t('grade_easy')};
        els.cardScore.textContent = labels[App.session.lastGrade] || '--%';
    } else {
        els.cardScore.textContent = '--%';
    }

    if (!reverse) {
        els.cardFrench.textContent = card.french;
        els.cardEnglish.textContent = card.english;
    } else {
        els.cardFrench.textContent = card.english;
        els.cardEnglish.textContent = card.french;
    }

    const cardEl = els.flashcardContainer;
    const isDark = document.body.classList.contains('dark-mode');
    cardEl.classList.remove('flash-error');
    cardEl.style.backgroundColor = '';
    cardEl.style.borderColor = '';
    cardEl.style.color = '';
    cardEl.classList.toggle('dark-mode-card-neutral', isDark);
    cardEl.classList.toggle('light-mode-card-neutral', !isDark);

    if (!App.session.revealed) {
        els.messageArea.textContent = t('type_and_enter');
    } else if (App.session.autoGraded) {
        els.messageArea.textContent = t('press_enter_or_click');
    } else {
        els.messageArea.textContent = t('grading_shortcuts');
    }

    els.answerInput.disabled = App.session.inputLocked;
    els.submitAnswerButton.disabled = App.session.inputLocked;

    els.gradeBar.classList.toggle('hidden', !App.session.revealed);

    const allowGrading = App.session.revealed && !App.session.autoGraded;
    els.btnAgain.disabled = !allowGrading;
    els.btnHard.disabled = !allowGrading;
    els.btnGood.disabled = !allowGrading;
    els.btnEasy.disabled = !allowGrading;
}
function loadNextCard() {
    App.session.revealed = false;
    App.session.inputLocked = false;
    App.session.pendingNext = false;
    App.session.autoGraded = false;
    App.session.lastGrade = null;
    App.session.lastScore = null;

    const id = pickNextCardId();
    App.session.currentCardId = id;

    if (!id) {
        renderSessionDone();
        updateProgress();
        return;
    }

    els.answerInput.value = '';
    els.answerInput.disabled = false;
    els.submitAnswerButton.disabled = false;

    const card = App.cards.get(id);
    App.session.recentlyShown.push(id);
    renderCard(card);

    try {
        els.answerInput.focus({ preventScroll: true });
        els.answerInput.select();
    } catch {}
    requestAnimationFrame(() => {
        try {
            els.answerInput.focus({ preventScroll: true });
            els.answerInput.select();
        } catch {}
    });

    updateProgress();
}
function renderSessionDone() {
    els.cardFrench.textContent = t('session_done_title');
    els.cardEnglish.textContent = '';
    els.cardEnglish.classList.add('hidden');
    els.cardScore.textContent = '--%';
    els.messageArea.textContent = t('session_done_subtitle');
    els.answerInput.value = '';
    els.answerInput.disabled = true;
    els.submitAnswerButton.disabled = true;
    els.gradeBar.classList.add('hidden');
}

/* =========================
Progression / Stats
========================= */
function updateProgress() {
    const done = App.session.studiedCount;
    const total = App.session.sessionTotal;
    els.progressText.textContent = t('cycle_progress', { done, total });
    const p = total > 0 ? (done / Math.max(1, total)) : 1;
    els.progressPerc.textContent = percent(p);
    els.progressFill.style.width = percent(p);
}
function updateStreakOnGrade(grade) {
    if (grade >= 3) {
        App.stats.streak += 1;
    } else {
        App.stats.streak = 0;
    }
    els.streakBadge.textContent = `🔥 ${App.stats.streak}`;
    saveStats();
}
function bumpDailyStats(grade) {
    const day = todayKey();
    if (!App.stats.byDay[day]) {
        App.stats.byDay[day] = { studied: 0, correct: 0, again: 0, hard: 0, good: 0, easy: 0, timeMs: 0 };
    }
    const s = App.stats.byDay[day];
    s.studied += 1;
    if (grade === 1) s.again += 1;
    if (grade === 2) s.hard += 1;
    if (grade === 3) s.good += 1;
    if (grade === 4) s.easy += 1;
    if (grade >= 3) s.correct += 1;

    if (App.stats.lastStudyDay && App.stats.lastStudyDay !== day) {
        // futur: gestion de streak par jours consécutifs
    }
    App.stats.lastStudyDay = day;
    saveStats();
    renderStats();
}

/* =========================
Sauvegarde du temps (chrono persistant)
========================= */
// MODIFIÉ: ajoute le delta écoulé au stats.byDay (avec répartition multi-jours) et au total
function saveElapsedTime() {
    const startedAt = App.session.startedAt;
    if (!startedAt) return;

    const now = nowMs();
    if (!Number.isFinite(now - startedAt) || now <= startedAt) {
        App.session.startedAt = null;
        persistTimerState();
        return;
    }

    // Ajoute proprement le delta (possiblement sur plusieurs jours)
    addTimeRangeToStats(startedAt, now);
    saveStats();
    renderStats();

    // éviter double comptage si plusieurs événements se déclenchent
    App.session.startedAt = null;
    persistTimerState();
}

function renderStats() {
    const day = todayKey();
    const s = App.stats.byDay[day] || { studied: 0, correct: 0, again: 0, hard: 0, good: 0, easy: 0, timeMs: 0 };

    els.statsContent.innerHTML =
        `<div>${t('today_studied_correct', { studied: s.studied, correct: s.correct })}</div>
         <div>${t('time_today_and_total', { timeToday: formatMs(s.timeMs || 0), timeTotal: formatMs(App.stats.totalTimeMs || 0) })}</div>
         <div>${t('grades_breakdown', { again: s.again, hard: s.hard, good: s.good, easy: s.easy })}</div>
         <div>${t('streak', { streak: App.stats.streak })}</div>`;
    const days = [];
    const now = new Date();
    for (let i = 13; i >= 0; i--) {
        const d = new Date(now.getTime() - i * DAY_MS);
        days.push(todayKey(d));
    }
    const values = days.map(k => (App.stats.byDay[k]?.studied) || 0);
    const max = Math.max(1, ...values);

    const W = els.sparkline.viewBox?.baseVal?.width || els.sparkline.clientWidth || 260;
    const H = els.sparkline.viewBox?.baseVal?.height || 70;

    const stepX = W / (values.length - 1 || 1);
    const pts = values.map((v, i) => {
        const x = i * stepX;
        const y = H - (v / max) * (H - 10) - 5;
        return [x, y];
    });

    const d = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
    els.sparklinePath.setAttribute('d', d);

    if (pts.length) {
        const df = `${d} L${pts[pts.length - 1][0]},${H} L0,${H} Z`;
        els.sparklineFill.setAttribute('d', df);
        els.sparklineLast.setAttribute('cx', pts[pts.length - 1][0]);
        els.sparklineLast.setAttribute('cy', pts[pts.length - 1][1]);
    }

    els.chartLegend.textContent = `${values[values.length - 1]} cartes`;
}

/* =========================
Timer (affichage + persistance continue)
========================= */
// MODIFIÉ: Le timer repart à partir du temps déjà sauvegardé aujourd'hui + delta "live".
// L'état de départ (startedAt) est persisté pour rattraper après reload/crash.
function startTimer() {
    if (!els.timer) return;

    if (App.session.timerInterval) clearInterval(App.session.timerInterval);

    // Si pas déjà démarré, on démarre maintenant
    if (!App.session.startedAt) {
        App.session.startedAt = nowMs();
        persistTimerState();
    }

    const tick = () => {
        const baseMs = (App.stats.byDay?.[todayKey()]?.timeMs) || 0;
        const liveMs = App.session.startedAt ? (nowMs() - App.session.startedAt) : 0;
        const elapsedMs = baseMs + Math.max(0, liveMs);

        els.timer.textContent = formatMs(elapsedMs);
        els.timer.setAttribute('title', t('total_time_title', { x: formatMs(App.stats.totalTimeMs || 0) }));

        persistTimerState();
    };

    tick();
    App.session.timerInterval = setInterval(tick, 1000);
}

// NOUVEAU: arrêt propre de l’affichage du timer
function stopTimerDisplay() {
    if (App.session.timerInterval) {
        clearInterval(App.session.timerInterval);
        App.session.timerInterval = null;
    }
}

/* =========================
Évaluation / Notation
========================= */
function revealAnswer(by = 'user') {
    if (App.session.revealed) return;
    App.session.revealed = true;
    App.session.inputLocked = true;
    const card = App.cards.get(App.session.currentCardId);
    renderCard(card);
}
function evaluateAnswer() {
    const card = App.cards.get(App.session.currentCardId);
    if (!card) return;

    const reverse = App.prefs.reverseMode;
    const user = els.answerInput.value.trim();
    if (!user) {
    flashMessage(t("empty_input_hint"), true);
    return;
}

    App.session.revealed = true;
    App.session.inputLocked = true;

    const target = reverse ? card.french : card.english;
    const sim = bestSimilarity(user, target);
    App.session.lastScore = sim;

    let grade = 1;
    if (sim >= 0.85) grade = 4;
    else if (sim >= 0.70) grade = 3;
    else if (sim >= 0.45) grade = 2;
    else grade = 1;

    applyGrade(card, grade, { auto: true, showFeedback: true, typedAnswer: user });
    App.session.autoGraded = true;
    App.session.pendingNext = true;

    renderCard(card);
}
function applyGrade(card, grade, { auto = false, showFeedback = false, typedAnswer = '' } = {}) {
    const now = nowMs();

    if (grade === 1) card.ease = clamp(card.ease - 0.20, MIN_EASE, 3.5);
    else if (grade === 2) card.ease = clamp(card.ease - 0.15, MIN_EASE, 3.5);
    else if (grade === 4) card.ease = clamp(card.ease + 0.15, MIN_EASE, 3.5);

    const fuzz = randFuzz();

    const wasNewOrLearning = (card.state === 'new' || card.state === 'learning' || card.state === 'relearning');

    if (grade === 1) {
        card.state = (card.state === 'review') ? 'relearning' : 'learning';
        card.learningStepIndex = 0;
        card.dueMs = now + LEARNING_STEPS_MIN[0] * MIN_MS;
        card.lapses += (card.state === 'relearning' ? 1 : 0);
    } else if (grade === 2) {
        if (card.state === 'review') {
            const nextDays = Math.max(1, Math.round(card.intervalDays * HARD_MULTIPLIER * fuzz));
            card.intervalDays = nextDays;
            card.dueMs = now + nextDays * DAY_MS;
        } else {
            const i = clamp(card.learningStepIndex, 0, LEARNING_STEPS_MIN.length - 1);
            card.state = (card.state === 'relearning') ? 'relearning' : 'learning';
            card.dueMs = now + LEARNING_STEPS_MIN[i] * MIN_MS;
        }
    } else if (grade === 3) {
        if (card.state === 'review') {
            const nextDays = Math.max(1, Math.round(card.intervalDays * card.ease * INTERVAL_MOD * fuzz));
            card.intervalDays = nextDays;
            card.dueMs = now + nextDays * DAY_MS;
        } else {
            const nextIdx = card.learningStepIndex + 1;
            if (nextIdx < LEARNING_STEPS_MIN.length) {
                card.state = (card.state === 'relearning') ? 'relearning' : 'learning';
                card.learningStepIndex = nextIdx;
                card.dueMs = now + LEARNING_STEPS_MIN[nextIdx] * MIN_MS;
            } else {
                card.state = 'review';
                card.learningStepIndex = 0;
                const baseInit = 1;
                const nextDays = Math.max(1, Math.round(baseInit * fuzz));
                card.intervalDays = nextDays;
                card.dueMs = now + nextDays * DAY_MS;
            }
        }
    } else if (grade === 4) {
        if (card.state === 'review') {
            const nextDays = Math.max(1, Math.round(card.intervalDays * card.ease * INTERVAL_MOD * EASY_BONUS * fuzz));
            card.intervalDays = nextDays;
            card.dueMs = now + nextDays * DAY_MS;
        } else {
            card.state = 'review';
            card.learningStepIndex = 0;
            const baseInit = 3;
            const nextDays = Math.max(1, Math.round(baseInit * card.ease * EASY_BONUS * fuzz));
            card.intervalDays = nextDays;
            card.dueMs = now + nextDays * DAY_MS;
        }
    }

    card.reps += 1;
    card.lastAnswer = typedAnswer;
    card.lastScore = App.session.lastScore;

    card.buriedUntil = now + 60 * 1000;

    saveCards();

    removeFromQueues(card.id);

    if (showFeedback) {
    let label = '';
    if (grade === 1) label = t('grade_again');
    if (grade === 2) label = t('grade_hard');
    if (grade === 3) label = t('grade_good');
    if (grade === 4) label = t('grade_easy');
    flashMessage(`${t('auto_prefix')}${label}`, false);
}

    App.session.studiedCount += 1;
    updateProgress();
    bumpDailyStats(grade);
    updateStreakOnGrade(grade);

    App.session.lastGrade = grade;
}
function removeFromQueues(id) {
    const arrays = [App.session.queueLearning, App.session.queueReview, App.session.queueNew];
    for (const arr of arrays) {
        const idx = arr.indexOf(id);
        if (idx !== -1) arr.splice(idx, 1);
    }
}

/* =========================
Skip (passer sans évaluer)
========================= */
function skipCurrentCard() {
    const id = App.session.currentCardId;
    if (!id) return;
    App.session.skipBuffer.push(id);
    App.session.pendingNext = false;
    loadNextCard();
}

/* =========================
UI utils
========================= */
function flashMessage(msg, isError = false) {
    els.messageArea.textContent = msg || '';
    if (isError) {
        els.flashcardContainer.classList.remove('flash-error');
        void els.flashcardContainer.offsetWidth;
        els.flashcardContainer.classList.add('flash-error');
    }
}

/* =========================
Recherche
========================= */
function setupAutoSaveOnLeave() {
    const pauseAndSave = () => {
        stopTimerDisplay();
        saveElapsedTime(); // ajoute le delta et remet startedAt à null + persiste l'état
    };

    window.addEventListener('pagehide', pauseAndSave, { capture: true });
    window.addEventListener('beforeunload', pauseAndSave, { capture: true });

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            pauseAndSave();
        } else if (document.visibilityState === 'visible') {
            // Repart automatiquement depuis le temps déjà enregistré aujourd'hui
            startTimer();
        }
    });
}

function setupSearch() {
    els.searchBar.addEventListener('input', () => {
        const q = normalizeText(els.searchBar.value);
        const cont = els.searchResults;
        cont.innerHTML = '';
        if (!q) return;

        const results = [];
        for (const c of App.cards.values()) {
            if (!isInActiveChapters(c)) continue;
            const fr = normalizeText(c.french);
            const en = normalizeText(c.english);
            if (fr.includes(q) || en.includes(q)) results.push(c);
            if (results.length >= 30) break;
        }

        for (const card of results) {
            const div = document.createElement('div');
            div.className = 'p-2 rounded-md hover:bg-emerald-50 dark:hover:bg-gray-700 cursor-pointer';
            div.innerHTML = `<span class="text-emerald-600 dark:text-emerald-300">#${card.id}</span> — ${card.french} <span class="text-gray-400">/</span> ${card.english}`;
            div.addEventListener('click', () => {
                jumpToCard(card.id);
                closeMenu();
            });
            cont.appendChild(div);
        }
    });
}
function jumpToCard(id) {
    App.session.skipBuffer = [];
    App.session.recentlyShown = App.session.recentlyShown.filter(x => x !== id);

    removeFromQueues(id);

    const c = App.cards.get(id);
    if (c) c.buriedUntil = 0;

    App.session.queueLearning.unshift(id);

    loadNextCard();

    closeMenu();
    els.searchBar.value = '';
    els.searchResults.innerHTML = '';
}

/* =========================
Reset / Réinitialisation
========================= */
function resetSelection() {
    const target = els.resetOptions.value;
    const targets = [];

    for (const c of App.cards.values()) {
        if (target === 'ALL' || c.chapter === target) {
            targets.push(c);
        }
    }
    for (const c of targets) {
        c.ease = DEFAULT_EASE;
        c.intervalDays = 0;
        c.dueMs = 0;
        c.state = 'new';
        c.learningStepIndex = 0;
        c.reps = 0;
        c.lapses = 0;
        c.lastScore = null;
        c.lastAnswer = '';
        c.suspended = false;
        c.buriedUntil = 0;
    }
    saveCards();

    // NOUVEAU: le chrono ne se remet à zéro QUE si la cible est "ALL"
    if (target === 'ALL') {
    resetAllTimerCounters();
    flashMessage(t('reset_selection_and_timer'));
} else {
    flashMessage(t('reset_selection'));
}

    rebuildQueuesAndMaybeReload();
}

// NOUVEAU: Réinitialise complètement les compteurs de temps (jour + total) et repart à zéro
function resetAllTimerCounters() {
    // on arrête l’affichage courant et on ne sauve pas le delta (reset complet)
    stopTimerDisplay();
    App.session.startedAt = null;
    persistTimerState();

    // remet à zéro les temps (tous les jours + total)
    if (App.stats.byDay) {
        for (const k of Object.keys(App.stats.byDay)) {
            if (App.stats.byDay[k]) App.stats.byDay[k].timeMs = 0;
        }
    }
    App.stats.totalTimeMs = 0;
    saveStats();

    // met à jour l’UI et efface l’état persistant du timer
    try { localStorage.removeItem(STORAGE_KEYS.timer); } catch {}
    els.timer.textContent = formatMs(0);
    els.timer.setAttribute('title', `Total cumulé: ${formatMs(0)}`);
    renderStats();

    // repart proprement
    startTimer();
}

/* =========================
Événements UI
========================= */
function setupMenu() {
    els.burgerButton.addEventListener('click', openMenu);
    els.menuOverlay.addEventListener('click', closeMenu);
    els.closeMenuButton.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (e) => {
        if (e.key === KEYCODES.ESC) closeMenu();
    });
}
function setupDarkMode() {
    els.darkModeToggle.addEventListener('click', () => {
        App.prefs.darkMode = !App.prefs.darkMode;
        savePrefs();
        applyDarkMode();
    });
    applyDarkMode();
}
function setupTheme() {
    els.themeSelector.value = App.prefs.theme || 'default';
    els.themeSelector.addEventListener('change', () => {
        App.prefs.theme = els.themeSelector.value;
        savePrefs();
        applyTheme();
    });
    applyTheme();
}


function setupReverseMode() {
    els.reverseModeButton.addEventListener('click', () => {
        App.prefs.reverseMode = !App.prefs.reverseMode;

        // NOUVEAU: on couple la langue à la direction d'étude
        // FR→EN (reverseMode = false) => UI en anglais
        // EN→FR (reverseMode = true)  => UI en français
        //App.prefs.lang = App.prefs.reverseMode ? 'fr' : 'en';

        savePrefs();
        applyLanguage();
        if (App.session.currentCardId) {
            const c = App.cards.get(App.session.currentCardId);
            renderCard(c);
        }
    });

    setReverseButtonLabel();
}
function setupReset() {
    els.resetButton.addEventListener('click', resetSelection);
}
function setupCardInteractions() {
    els.flashcardContainer.addEventListener('click', () => {
        if (!App.session.revealed) {
            revealAnswer('click');
            App.session.pendingNext = true;
            renderCard(App.cards.get(App.session.currentCardId));
        } else {
            App.session.pendingNext = false;
            loadNextCard();
        }
    });

    els.submitAnswerButton.addEventListener('click', () => {
        if (!App.session.revealed) evaluateAnswer();
    });

    const onGradeBtn = (g) => {
        const card = App.cards.get(App.session.currentCardId);
        if (!card) return;

        if (!App.session.revealed) {
            revealAnswer('gradeclick');
        }

        if (App.session.autoGraded) {
            return;
        }

        applyGrade(card, g, { auto: false, showFeedback: false });
        loadNextCard();
    };
    els.btnAgain.addEventListener('click', () => onGradeBtn(1));
    els.btnHard.addEventListener('click', () => onGradeBtn(2));
    els.btnGood.addEventListener('click', () => onGradeBtn(3));
    els.btnEasy.addEventListener('click', () => onGradeBtn(4));

    document.addEventListener('keydown', (e) => {
        const targetTag = (e.target && e.target.tagName) || '';
        const isTyping = targetTag === 'INPUT' || targetTag === 'TEXTAREA';
        const inputEmpty = els.answerInput.value.trim().length === 0;

        if (e.key === KEYCODES.SPACE) {
            if (!isTyping) e.preventDefault();
            return;
        }

        if (['1','2','3','4'].includes(e.key)) {
            if (App.session.revealed && !App.session.autoGraded) {
                e.preventDefault();
                onGradeBtn(parseInt(e.key, 10));
            }
            return;
        }

        if (e.key === KEYCODES.ENTER) {
            e.preventDefault();

            if (!App.session.revealed) {
                if (!inputEmpty) {
                    evaluateAnswer();
                } else {
                    revealAnswer('enter');
                    App.session.pendingNext = true;
                    renderCard(App.cards.get(App.session.currentCardId));
                }
            } else {
                App.session.pendingNext = false;
                loadNextCard();
            }
        }
    });
}

/* =========================
Initialisation
========================= */
function init() {
    loadPersisted();
    setupMenu();
    setupDarkMode();
    setupTheme();
    setupReverseMode();

    applyLanguage(); // NOUVEAU: applique la langue courante à toute l’UI

    renderChaptersMenu();
    setupReset();
    setupSearch();
    renderStats();

    setupAutoSaveOnLeave();
    rebuildQueues();
    loadNextCard();
    startTimer();
    setupCardInteractions();
}

init();
