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
};

const KEYCODES = {
    ENTER: 'Enter',
    SPACE: ' ',
    ESC: 'Escape',
};

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
    return 0.95 + Math.random() * 0.10; // ±5%  <- CORRIGÉ: Opérateur '*' ajouté
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
        .replace(/[()]/g, ' ') // CORRIGÉ: Retire les parenthèses
        .replace(/[.,;:!?/\\'’"«»\-–—]/g, ' ') // CORRIGÉ: Ligne malformée retirée
        .replace(/\s+/g, ' ')
        .trim();
}
function splitAlternatives(s) {
    // coupe sur virgule ou slash pour obtenir variantes
    return s.split(/[\/,]/).map(v => normalizeText(v)).filter(Boolean);
}
function jaccardSimilarity(a, b) {
    // similarité simple via tokens
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
        activeChapters: [], // multi-sélection (strings)
    },

    // stats (persistées)
    stats: {
        byDay: {}, // 'YYYY-MM-DD' -> { studied: number, correct: number, again: number, hard: number, good: number, easy: number }
        streak: 0,
        lastStudyDay: null,
    },

    // session
    session: {
        startedAt: nowMs(),
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
        recentlyShown: [], // éviter immédiate répétition
        skipBuffer: [], // cartes passées sans évaluer (reviennent plus tard)
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
            // Maj contenu au cas où (libellés)
            cs.french = base.french;
            cs.english = base.english;
            cs.chapter = base.chapter;
        }
        App.cards.set(id, cs);
    }

    // chapters uniques
    const chapters = [...new Set(flashcardData.map(c => c.chapter))].sort();
    App.data.chapters = chapters;

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
function savePrefs() {
    localStorage.setItem(STORAGE_KEYS.prefs, JSON.stringify(App.prefs));
    localStorage.setItem(STORAGE_KEYS.theme, App.prefs.theme);
}
function saveStats() {
    localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(App.stats));
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
        // animation de fond douce
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
        el.style.width = `${size}px`; // <- CORRIGÉ: Template literal
        el.style.height = `${size}px`; // <- CORRIGÉ: Template literal
        el.style.borderRadius = '50%';
        el.style.filter = 'blur(18px)';
        el.style.opacity = '0.28';
        const colors = ['#A78BFA', '#60A5FA', '#34D399', '#FBBF24', '#F472B6', '#F87171', '#22D3EE'];
        el.style.background = colors[Math.floor(Math.random() * colors.length)];
        el.style.left = `${Math.random() * 100}%`; // <- CORRIGÉ: Template literal
        el.style.top = `${Math.random() * 100}%`; // <- CORRIGÉ: Template literal
        el.style.transform = 'translate(-50%, -50%)';
        el.style.transition = 'transform 10s ease-in-out';
        c.appendChild(el);

        // mouvement flottant
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
        btn.className = `w-full px-3 py-2 rounded-md text-left ${isActive ? 'chapter-button-active' : 'chapter-button-default'}`; // <- CORRIGÉ: Template literal
        btn.textContent = `${CHAPTER_EMOJIS[value] || '📘'} ${label}`; // <- CORRIGÉ: Template literal
        btn.title = 'Activer/désactiver ce chapitre';
        btn.addEventListener('click', () => {
            toggleChapter(value);
        });
        return btn;
    };

    // "Tous les chapitres"
    const allActive = App.prefs.activeChapters.length === 0;
    const btnAll = makeBtn('Tous les chapitres', 'ALL', allActive);
    btnAll.addEventListener('click', () => setChapters([]));
    container.appendChild(btnAll);

    // chapitres individuels
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
        text = 'Tous chapitres';
    } else if (actives.length === 1) {
        text = actives[0];
    } else {
        text = `${actives.length} chapitres sélectionnés`; // <- CORRIGÉ: Template literal
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
        opt.textContent = `Réinitialiser: ${ch}`; // <- CORRIGÉ: Template literal
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

    learning.sort((a, b) => a.dueMs - b.dueMs); // plus urgent d'abord

    // Tri par "relative overdueness"
    const now2 = nowMs();
    review.sort((a, b) => {
        const overA = (now2 - a.dueMs) / Math.max(1, a.intervalDays * DAY_MS);
        const overB = (now2 - b.dueMs) / Math.max(1, b.intervalDays * DAY_MS);
        // plus surchargé d'abord
        if (overB !== overA) return overB - overA;
        // tiebreak: plus court intervalle d'abord
        if (a.intervalDays !== b.intervalDays) return a.intervalDays - b.intervalDays;
        return a.id.localeCompare(b.id);
    });

    // Nouveaux: mélangés avec seed du jour
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
    // Priorité: learning -> review -> new
    const recent = new Set(App.session.recentlyShown.slice(-10));
    const pickFrom = (queue) => {
        // éviter répétition immédiate
        for (let i = 0; i < queue.length; i++) {
            if (!recent.has(queue[i])) {
                const id = queue.splice(i, 1)[0];
                return id;
            }
        }
        // sinon, premier
        return queue.shift() || null;
    };

    // si une carte a été "passée", on la réinjecte de temps en temps
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

    // Affichage score / libellé de note
    if (App.session.lastScore != null) {
        els.cardScore.textContent = `${Math.round(App.session.lastScore * 100)}%`;
    } else if (App.session.lastGrade != null) {
        const labels = {1: 'Encore', 2: 'Difficile', 3: 'Bien', 4: 'Facile'};
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

    // Message d'aide
    els.messageArea.textContent = App.session.revealed
        ? 'Appuyez sur Entrée ou cliquez la carte pour passer'
        : 'Tapez votre réponse et appuyez Entrée (Entrée sans réponse = révéler)';

    // saisie
    els.answerInput.value = '';
    els.answerInput.disabled = App.session.inputLocked;
    els.submitAnswerButton.disabled = App.session.inputLocked;

    // barre de note visible seulement quand révélé
    els.gradeBar.classList.toggle('hidden', !App.session.revealed);
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
    const card = App.cards.get(id);
    App.session.recentlyShown.push(id);
    renderCard(card);
    updateProgress();
}
function renderSessionDone() {
    els.cardFrench.textContent = '🎉 Session terminée';
    els.cardEnglish.textContent = '';
    els.cardEnglish.classList.add('hidden');
    els.cardScore.textContent = '--%';
    els.messageArea.textContent = 'Vous avez triomphé des cartes disponibles. Revenez plus tard !';
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
    els.progressText.textContent = `Cycle: ${done}/${total}`; // <- CORRIGÉ: Template literal
    const p = total > 0 ? (done / Math.max(1, total)) : 1;
    els.progressPerc.textContent = percent(p);
    els.progressFill.style.width = percent(p);
}
function updateStreakOnGrade(grade) {
    // On considère Good/Easy comme "correct"
    if (grade >= 3) {
        App.stats.streak += 1;
    } else {
        App.stats.streak = 0;
    }
    els.streakBadge.textContent = `🔥 ${App.stats.streak}`; // <- CORRIGÉ: Template literal
    saveStats();
}
function bumpDailyStats(grade) {
    const day = todayKey();
    if (!App.stats.byDay[day]) {
        App.stats.byDay[day] = { studied: 0, correct: 0, again: 0, hard: 0, good: 0, easy: 0 };
    }
    const s = App.stats.byDay[day];
    s.studied += 1;
    if (grade === 1) s.again += 1;
    if (grade === 2) s.hard += 1;
    if (grade === 3) s.good += 1;
    if (grade === 4) s.easy += 1;
    if (grade >= 3) s.correct += 1;

    // maintenir chaîne jours d'étude
    if (App.stats.lastStudyDay && App.stats.lastStudyDay !== day) {
        // si jours consécutifs non vérifiés — possible d'étendre plus tard
    }
    App.stats.lastStudyDay = day;
    saveStats();
    renderStats();
}
function renderStats() {
    // contenu textuel
    const day = todayKey();
    const s = App.stats.byDay[day] || { studied: 0, correct: 0, again: 0, hard: 0, good: 0, easy: 0 };
    els.statsContent.innerHTML = `<div>Aujourd'hui: ${s.studied} cartes, ${s.correct} correctes</div>
                                <div>Encore: ${s.again} • Difficile: ${s.hard} • Bien: ${s.good} • Facile: ${s.easy}</div>
                                <div>Streak: ${App.stats.streak} 🔥</div>`; // <- CORRIGÉ: Template literal

    // sparkline 14j
    const days = [];
    const now = new Date();
    for (let i = 13; i >= 0; i--) {
        const d = new Date(now.getTime() - i * DAY_MS);
        days.push(todayKey(d));
    }
    const values = days.map(k => (App.stats.byDay[k]?.studied) || 0);
    const max = Math.max(1, ...values);

    // Path simple
    const W = els.sparkline.viewBox.baseVal?.width || els.sparkline.clientWidth || 260;
    const H = els.sparkline.viewBox.baseVal?.height || 70;

    const stepX = W / (values.length - 1 || 1);
    const pts = values.map((v, i) => {
        const x = i * stepX;
        const y = H - (v / max) * (H - 10) - 5; // padding vertical
        return [x, y];
    });

    const d = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' '); // <- CORRIGÉ: Template literal
    els.sparklinePath.setAttribute('d', d);

    // Fill sous la courbe
    if (pts.length) {
        const df = `${d} L${pts[pts.length - 1][0]},${H} L0,${H} Z`; // <- CORRIGÉ: Template literal
        els.sparklineFill.setAttribute('d', df);
        els.sparklineLast.setAttribute('cx', pts[pts.length - 1][0]);
        els.sparklineLast.setAttribute('cy', pts[pts.length - 1][1]);
    }

    els.chartLegend.textContent = `${values[values.length - 1]} cartes`; // <- CORRIGÉ: Template literal
}


/* =========================
Timer
========================= */
function startTimer() {
    const start = App.session.startedAt;
    if (App.session.timerInterval) clearInterval(App.session.timerInterval);
    App.session.timerInterval = setInterval(() => {
        els.timer.textContent = formatMs(nowMs() - start);
    }, 1000);
}

/* =========================
Évaluation / Notation
========================= */
function revealAnswer(by = 'user') {
    if (App.session.revealed) return;
    App.session.revealed = true;
    App.session.inputLocked = true; // après révélation: plus de saisie
    const card = App.cards.get(App.session.currentCardId);
    renderCard(card);
}
function evaluateAnswer() {
    const card = App.cards.get(App.session.currentCardId);
    if (!card) return;

    const reverse = App.prefs.reverseMode;
    const user = els.answerInput.value.trim();
    if (!user) {
        // Rien saisi: on peut signaler
        flashMessage("Champ vide. Appuyez sur Espace pour révéler ou tapez une réponse.", true);
        return;
    }

    // Révéler la réponse (côté UI) et verrouiller la saisie
    App.session.revealed = true;
    App.session.inputLocked = true;

    // Similarité
    const target = reverse ? card.french : card.english;
    const sim = bestSimilarity(user, target);
    App.session.lastScore = sim;

    // Choisir une note auto
    let grade = 1;
    if (sim >= 0.85) grade = 4; // Easy
    else if (sim >= 0.70) grade = 3; // Good
    else if (sim >= 0.45) grade = 2; // Hard
    else grade = 1; // Again

    applyGrade(card, grade, { auto: true, showFeedback: true, typedAnswer: user });
    App.session.autoGraded = true;
    App.session.pendingNext = true;

    renderCard(card);
}
function applyGrade(card, grade, { auto = false, showFeedback = false, typedAnswer = '' } = {}) {
    // Conformément au SM-2 modifié + étapes d'apprentissage
    // Again: ease - 20%; Hard: ease -15%; Good: ease inchangée; Easy: ease +15% (min 130%)
    // Fuzz ±5% sur les intervalles; ordre learning -> review -> new
    const now = nowMs();

    // mise à jour ease
    if (grade === 1) card.ease = clamp(card.ease - 0.20, MIN_EASE, 3.5);
    else if (grade === 2) card.ease = clamp(card.ease - 0.15, MIN_EASE, 3.5);
    else if (grade === 4) card.ease = clamp(card.ease + 0.15, MIN_EASE, 3.5);

    const fuzz = randFuzz();

    const wasNewOrLearning = (card.state === 'new' || card.state === 'learning' || card.state === 'relearning');

    if (grade === 1) {
        // Again -> (re)learning step 0
        card.state = (card.state === 'review') ? 'relearning' : 'learning';
        card.learningStepIndex = 0;
        card.dueMs = now + LEARNING_STEPS_MIN[0] * MIN_MS;
        card.lapses += (card.state === 'relearning' ? 1 : 0);
    } else if (grade === 2) {
        // Hard
        if (card.state === 'review') {
            const nextDays = Math.max(1, Math.round(card.intervalDays * HARD_MULTIPLIER * fuzz));
            card.intervalDays = nextDays;
            card.dueMs = now + nextDays * DAY_MS;
        } else {
            // En learning/relearning: rester sur la même marche
            const i = clamp(card.learningStepIndex, 0, LEARNING_STEPS_MIN.length - 1);
            card.state = (card.state === 'relearning') ? 'relearning' : 'learning';
            card.dueMs = now + LEARNING_STEPS_MIN[i] * MIN_MS;
        }
    } else if (grade === 3) {
        // Good
        if (card.state === 'review') {
            const nextDays = Math.max(1, Math.round(card.intervalDays * card.ease * INTERVAL_MOD * fuzz));
            card.intervalDays = nextDays;
            card.dueMs = now + nextDays * DAY_MS;
        } else {
            // Learning: avancer d'une marche; si dernière marche => graduate en review
            const nextIdx = card.learningStepIndex + 1;
            if (nextIdx < LEARNING_STEPS_MIN.length) {
                card.state = (card.state === 'relearning') ? 'relearning' : 'learning';
                card.learningStepIndex = nextIdx;
                card.dueMs = now + LEARNING_STEPS_MIN[nextIdx] * MIN_MS;
            } else {
                // Graduation
                card.state = 'review';
                card.learningStepIndex = 0;
                // interval initial (1 jour) * fuzz
                const baseInit = 1;
                const nextDays = Math.max(1, Math.round(baseInit * fuzz));
                card.intervalDays = nextDays;
                card.dueMs = now + nextDays * DAY_MS;
            }
        }
    } else if (grade === 4) {
        // Easy
        if (card.state === 'review') {
            const nextDays = Math.max(1, Math.round(card.intervalDays * card.ease * INTERVAL_MOD * EASY_BONUS * fuzz));
            card.intervalDays = nextDays;
            card.dueMs = now + nextDays * DAY_MS;
        } else {
            // Graduation directe avec bonus easy
            card.state = 'review';
            card.learningStepIndex = 0;
            const baseInit = 3; // graduation "easy" un peu plus longue
            const nextDays = Math.max(1, Math.round(baseInit * card.ease * EASY_BONUS * fuzz));
            card.intervalDays = nextDays;
            card.dueMs = now + nextDays * DAY_MS;
        }
    }

    card.reps += 1;
    card.lastAnswer = typedAnswer;
    card.lastScore = App.session.lastScore;

    // Bury léger: on évite de revoir la même carte avant 1 minute (évite doublons dans la session)
    card.buriedUntil = now + 60 * 1000;

    saveCards();

    // Files d'attente: cette carte ne doit pas réapparaître maintenant
    // On la sort des queues (au cas où)
    removeFromQueues(card.id);

    // Feedback minimal
    if (showFeedback) {
        let label = '';
        if (grade === 1) label = 'Encore';
        if (grade === 2) label = 'Difficile';
        if (grade === 3) label = 'Bien';
        if (grade === 4) label = 'Facile';
        flashMessage(`Auto: ${label}`, false); // <- CORRIGÉ: Template literal
    }

    // Stats + streak
    App.session.studiedCount += 1;
    updateProgress();
    bumpDailyStats(grade);
    updateStreakOnGrade(grade);

    // après notation auto, on attend Entrée pour passer (pendingNext)
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
    // La carte revient plus tard (sans modifier son état)
    const id = App.session.currentCardId;
    if (!id) return;
    App.session.skipBuffer.push(id); // réinjection ultérieure
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
        // trigger reflow
        void els.flashcardContainer.offsetWidth;
        els.flashcardContainer.classList.add('flash-error');
    }
}

/* =========================
Recherche
========================= */
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
                // On insère cette carte en tête de la file
                jumpToCard(card.id);
                closeMenu();
            });
            cont.appendChild(div);
        }
    });
}
function jumpToCard(id) {
    // Injecter cette carte comme prochaine
    removeFromQueues(id);
    App.session.queueLearning.unshift(id);
    loadNextCard();
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
    flashMessage('Sélection réinitialisée ✅');
    rebuildQueuesAndMaybeReload();
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
        savePrefs();
        const txt = App.prefs.reverseMode ? '⇄ EN → FR' : '⇄ FR → EN';
        els.reverseModeButton.textContent = txt;
        if (App.session.currentCardId) {
            const c = App.cards.get(App.session.currentCardId);
            renderCard(c);
        }
    });
    const txt = App.prefs.reverseMode ? '⇄ EN → FR' : '⇄ FR → EN';
    els.reverseModeButton.textContent = txt;
}
function setupReset() {
    els.resetButton.addEventListener('click', resetSelection);
}
function setupCardInteractions() {
    // Clic sur la carte
    els.flashcardContainer.addEventListener('click', () => {
        if (!App.session.revealed) {
            revealAnswer('click');
            App.session.pendingNext = true; // on veut forcer un passage ensuite
        } else {
            // carte déjà révélée => passer à la suivante
            App.session.pendingNext = false;
            loadNextCard();
        }
    });

    // Bouton "Valider" (évalue et auto-note)
    els.submitAnswerButton.addEventListener('click', () => {
        if (!App.session.revealed) evaluateAnswer();
    });

    // Boutons de note
    const onGradeBtn = (g) => {
        const card = App.cards.get(App.session.currentCardId);
        if (!card) return;

        if (!App.session.revealed) revealAnswer('gradeclick');

        // Si on a déjà auto-noté (après Entrée), on ne réapplique pas une 2e note.
        if (App.session.autoGraded) {
            loadNextCard();
            return;
        }

        applyGrade(card, g, { auto: false, showFeedback: false });
        App.session.lastGrade = g;
        // Passer immédiatement à la carte suivante
        loadNextCard();
    };
    els.btnAgain.addEventListener('click', () => onGradeBtn(1));
    els.btnHard.addEventListener('click', () => onGradeBtn(2));
    els.btnGood.addEventListener('click', () => onGradeBtn(3));
    els.btnEasy.addEventListener('click', () => onGradeBtn(4));

    // Clavier global
    document.addEventListener('keydown', (e) => {
        const targetTag = (e.target && e.target.tagName) || '';
        const isTyping = targetTag === 'INPUT' || targetTag === 'TEXTAREA';
        const inputEmpty = els.answerInput.value.trim().length === 0;

        // Désactiver Espace pour révéler (évite les "spoils" involontaires)
        if (e.key === KEYCODES.SPACE) {
            if (!isTyping) e.preventDefault();
            return;
        }

        if (e.key === KEYCODES.ENTER) {
            e.preventDefault();
            if (!App.session.revealed) {
                if (!inputEmpty) {
                    // Entrée avec texte -> on évalue et auto-note
                    evaluateAnswer();
                } else {
                    // Entrée sans texte -> on révèle et on forcera le passage
                    revealAnswer('enter');
                    App.session.pendingNext = true;
                }
            } else {
                // Déjà révélée -> Enter = prochaine carte (toujours)
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
    renderChaptersMenu();
    setupReset();
    setupSearch();
    renderStats();

    rebuildQueues();
    loadNextCard();
    startTimer();
    setupCardInteractions(); // <- CORRIGÉ: Appel à cette fonction ajouté.
}

init();
