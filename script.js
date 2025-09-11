import { flashcardData, CHAPTER_EMOJIS } from './data.js';

// ===================================================================================
// CONFIGURATION GLOBALE DE L'APPLICATION
// ===================================================================================

/**
 * Paramètres pour l'algorithme de répétition espacée (Spaced Repetition System).
 * Aligné sur Anki (SM-2 modifié) + mécanismes V3 (tri overdue relatif, fuzz, bury, limites).
 */
const parametresSRS = {
    // SM-2 (Anki)
    faciliteInitiale: 2.5,            // 2.50 (250 %)
    faciliteMin: 1.3,                 // plancher 130 %
    faciliteMax: 3.5,
    multiplicateurDifficile: 1.2,     // Hard interval
    bonusFacile: 1.3,                 // Easy bonus
    modificateurIntervalleGlobal: 1.0,

    // Ajustements d’ease (Anki)
    ajustementFacilite: {
        encore: -0.20,    // Again
        difficile: -0.15, // Hard
        bien: 0.00,       // Good
        facile: +0.15     // Easy
    },

    // Steps (recommandés < 1 jour)
    etapesApprentissageMinutes: [1, 10],
    etapesReapprentissageMinutes: [10, 1440], // 10m, 1 jour

    // Graduation / lapses
    intervalleInitialJours: 1,
    facteurOubliIntervalle: 0.5,      // réduction d’intervalle après oubli (lapse)

    // Leitner (limites d’UI/score)
    limitesBoitesLeitner: { // Intervalles en jours
        1: { min: 0.08, max: 1 },   // ~2h -> 1j
        2: { min: 2, max: 4 },
        3: { min: 5, max: 12 },
        4: { min: 15, max: 45 },
        5: { min: 45, max: 120 }
    },

    // V3 scheduling helpers
    triV3OverdueRelatif: true,
    fuzzPourcent: 0.05,              // ±5 %
    fuzzMinIntervalJours: 2,         // activer le fuzz à partir de 2 jours

    // Bury des sœurs (une carte par note par jour)
    burySoeurs: true,
    proprieteCleNote: 'nid',         // si dispo; sinon fallback french+english

    // Limites quotidiennes (affichage)
    limitesQuotidiennes: {
        nouvellesParJour: 20,
        reviewsParJour: 200
    }
};

const nomEvaluation = { 1: 'encore', 2: 'difficile', 3: 'bien', 4: 'facile' };
const SEUIL_FRAPPE_RAPIDE_MS = 180;
const DELAI_AVANCE_AUTO_MS = 120;

// ===================================================================================
// ÉTAT GLOBAL DE L'APPLICATION
// ===================================================================================

const etatApplication = {
    toutesLesCartes: [],
    paquetActuel: [],
    indexActuel: 0,
    chapitreActuel: 'Tout',
    chapitresDisponibles: ['Tout'],
    secondesEcoulees: 0,
    modeSombre: false,
    themeActuel: 'default',
    modeInverse: false,
    serieDeReponses: 0,
    serieMax: 0,
    debutReponseTimestamp: null,
    estRevelee: false,
    enAttenteEvaluation: false,
    enAttenteAvance: false,
    historiqueQuotidien: {},
    nouvellesCartesSession: 0,
    cartesVuesSession: 0,
    indexDeRecherche: [],
    planificateurAdaptatif: null, // Hook pour une IA optionnelle
    cycleParChapitre: {
        chapitre: 'Tout',
        vues: {} // { [idCarte]: true }
    },
    quotaDuJour: {
        date: dateISO(),
        nouvellesMontrees: 0,
        reviewsMontrees: 0
    }
};

// ===================================================================================
// RÉFÉRENCES AUX ÉLÉMENTS DU DOM
// ===================================================================================

const $ = id => document.getElementById(id);

const elementsDOM = {
    boutonMenu: $('burger-button'),
    menuLateral: $('sidebar-menu'),
    superpositionMenu: $('menu-overlay'),
    boutonFermerMenu: $('close-menu-button'),
    listeChapitresMenu: $('menu-chapters'),
    selecteurReset: $('reset-options'),
    boutonResetDonnees: $('reset-data-button'),
    barreRecherche: $('search-bar'),
    conteneurResultatsRecherche: $('search-results-container'),
    boutonModeInverse: $('reverse-mode-button'),
    boutonModeSombre: $('dark-mode-toggle'),
    selecteurTheme: $('theme-selector'),
    labelChapitreActuel: $('current-chapter-label'),
    conteneurFlashcard: $('flashcard-container'),
    motFrancais: $('card-french-word'),
    motAnglais: $('card-english-word'),
    scoreCarte: $('card-score'),
    zoneMessage: $('message-area'),
    champReponse: $('answer-input'),
    boutonSoumettre: $('submit-answer-button'),
    barreEvaluation: $('grade-bar'),
    minuteur: $('timer'),
    badgeSerie: $('streak-badge'),
    texteProgression: $('progress-text'),
    remplissageBarreProgression: $('progress-bar-fill'),
    pourcentageProgression: $('progress-percentage'),
    contenuStats: $('stats-content'),
    graphiqueActivite: $('sparkline'),
    cheminGraphique: $('sparkline-path'),
    remplissageGraphique: $('sparkline-fill'),
    dernierPointGraphique: $('sparkline-last'),
    legendeGraphique: $('chart-legend'),
    titreGraphique: $('chart-title')
};


// ===================================================================================
// FONCTIONS UTILITAIRES & AIDES UI
// ===================================================================================

const maintenantEnMs = () => Date.now();
const minutesEnMs = (m) => m * 60 * 1000;
const joursEnMs = (d) => d * 24 * 60 * 60 * 1000;
const clamp = (val, min, max) => Math.max(min, Math.min(val, max));
const dateISO = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const on = (element, event, handler) => element.addEventListener(event, handler);

function afficherMessage(texte, classeCss, duree = 1600) {
  elementsDOM.zoneMessage.textContent = texte;
  elementsDOM.zoneMessage.className = `w-full text-center h-6 text-sm font-medium ${classeCss || ''}`;
  if (duree) {
    setTimeout(() => {
      if (elementsDOM.zoneMessage.textContent === texte) elementsDOM.zoneMessage.textContent = '';
    }, duree);
  }
}

function mettreAJourMinuteur() {
  const s = etatApplication.secondesEcoulees;
  const h = String(Math.floor(s / 3600)).padStart(2, '0');
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const sec = String(s % 60).padStart(2, '0');
  elementsDOM.minuteur.textContent = `${h}:${m}:${sec}`;
}
function formaterIntervalle(ms) {
  if (ms < 60000) return `${Math.max(1, Math.round(ms / 10000) * 10)}s`;
  if (ms < 3600000) return `${Math.round(ms / 60000)}m`;
  if (ms < 86400000) return `${Math.round(ms / 3600000)}h`;
  const jours = Math.round(ms / 86400000);
  return jours < 30 ? `${jours}j` : `${Math.round(jours / 30)}mo`;
}

function mettreAJourBarreProgression() {
    const total = obtenirCartesDuChapitreActuel().length;
    const vuesDansLeCycle = total - filtrerCartesNonVuesDuCycle(obtenirCartesDuChapitreActuel()).length;
    const pourcentage = total ? Math.min(100, Math.round(vuesDansLeCycle * 100 / total)) : 0;

    elementsDOM.texteProgression.textContent = `Cycle: ${vuesDansLeCycle}/${total}`;
    elementsDOM.remplissageBarreProgression.style.width = `${pourcentage}%`;
    if (elementsDOM.pourcentageProgression) {
        elementsDOM.pourcentageProgression.textContent = `${pourcentage}%`;
    }
}

function basculerVisibilite(element, visible) {
    element.classList.toggle('hidden', !visible);
}

function activerModeSombre(actif) {
    etatApplication.modeSombre = !!actif;
    document.body.classList.toggle('dark-mode', etatApplication.modeSombre);
    document.body.classList.toggle('light-mode', !etatApplication.modeSombre);
    elementsDOM.boutonModeSombre.innerHTML = etatApplication.modeSombre ? '☀' : '🌙';
    elementsDOM.boutonModeSombre.setAttribute('aria-pressed', String(etatApplication.modeSombre));
    sauvegarderEtat();
}

function ouvrirMenuLateral(ouvert) {
    elementsDOM.menuLateral.classList.toggle('menu-slide-in', ouvert);
    elementsDOM.menuLateral.classList.toggle('menu-slide-out', !ouvert);
    document.body.classList.toggle('menu-open', ouvert);
    elementsDOM.superpositionMenu.setAttribute('aria-hidden', String(!ouvert));
    elementsDOM.menuLateral.setAttribute('aria-hidden', String(!ouvert));
    elementsDOM.boutonMenu.setAttribute('aria-expanded', String(!!ouvert));
}

// V3 helpers: fuzz, overdueness relative, clé de note, quotas
function appliquerFuzzDueDate(baseMs, intervalDays) {
    const pct = parametresSRS.fuzzPourcent || 0;
    const minDays = parametresSRS.fuzzMinIntervalJours || 2;
    if (!pct || (intervalDays || 0) < minDays) return baseMs;
    const amplitudeJours = (intervalDays || 0) * pct;
    const deltaJours = (Math.random() * 2 - 1) * amplitudeJours; // [-amp, +amp]
    return baseMs + joursEnMs(deltaJours);
}

function calculerOverduenessRelative(carte, maintenant) {
    const due = (carte.nextDue || 0);
    if (due > maintenant) return -Infinity; // pas due
    const overdueJours = (maintenant - due) / 86400000;
    const interval = Math.max(1, carte.intervalDays || 1);
    return overdueJours / interval; // plus grand => plus prioritaire
}

function obtenirCleNote(carte) {
  if (parametresSRS.proprieteCleNote && carte[parametresSRS.proprieteCleNote]) {
    return String(carte[parametresSRS.proprieteCleNote]);
  }
  return `${(carte.french || '').toLowerCase()}::${(carte.english || '').toLowerCase()}`;
}

function finDeJourneeMs() {
    const d = new Date();
    d.setHours(23, 59, 59, 999);
    return d.getTime();
}

function assurerQuotaJourActuel() {
    const today = dateISO();
    if (!etatApplication.quotaDuJour || etatApplication.quotaDuJour.date !== today) {
        etatApplication.quotaDuJour = { date: today, nouvellesMontrees: 0, reviewsMontrees: 0 };
    }
}


// ===================================================================================
// LOGIQUE DU SYSTÈME LEITNER & SCORE DE MAÎTRISE
// ===================================================================================

function limiterIntervalleParBoite(intervalleJours, boite) {
    const limites = parametresSRS.limitesBoitesLeitner[clamp(boite, 1, 5)];
    return limites ? clamp(intervalleJours, limites.min, limites.max) : intervalleJours;
}

function mettreAJourBoite(boitePrecedente, nomEval) {
    const delta = nomEval === 'encore' ? -1 : nomEval === 'difficile' ? 0 : nomEval === 'bien' ? 1 : 2;
    return clamp((boitePrecedente || 1) + delta, 1, 5);
}

function calculerScoreMaitrise(carte) {
    const boite = Number.isFinite(carte.box) ? carte.box : 1;
    const repetitions = Number.isFinite(carte.reps) ? carte.reps : 0;
    const oublis = Number.isFinite(carte.lapses) ? carte.lapses : 0;
    const base = 20 * boite + 10 * Math.min(repetitions, 5) - 15 * oublis;
    return clamp(Math.round(base), 0, 100);
}

function obtenirCategorieMaitrise(score) {
    if (score < 50) return 'À revoir souvent';
    if (score < 80) return 'En progression';
    return 'Maîtrisé';
}


// ===================================================================================
// MODÈLE DE CARTE & PLANIFICATEUR DE RÉVISION (SRS)
// ===================================================================================

function initialiserProprietesCarte(carteBrute) {
    const carte = { ...carteBrute };
    carte.ef = Number.isFinite(carte.ef) ? carte.ef : parametresSRS.faciliteInitiale;
    carte.box = Number.isFinite(carte.box) ? carte.box : 1;
    carte.reps = Number.isFinite(carte.reps) ? carte.reps : 0;
    carte.lapses = Number.isFinite(carte.lapses) ? carte.lapses : 0;
    carte.intervalDays = Number.isFinite(carte.intervalDays) ? carte.intervalDays : 0;
    carte.state = carte.state || 'new';
    carte.stepIndex = Number.isFinite(carte.stepIndex) ? carte.stepIndex : 0;
    carte.revCount = Number.isFinite(carte.revCount) ? carte.revCount : 0;
    carte.okCount = Number.isFinite(carte.okCount) ? carte.okCount : 0;
    carte.totalTimeMs = Number.isFinite(carte.totalTimeMs) ? carte.totalTimeMs : 0;
    carte.lastScorePct = Number.isFinite(carte.lastScorePct) ? carte.lastScorePct : null;
    carte.lastGrade = Number.isFinite(carte.lastGrade) ? carte.lastGrade : null;
    carte.lastSeen = Number.isFinite(carte.lastSeen) ? carte.lastSeen : 0;
    carte.nextDue = Number.isFinite(carte.nextDue) ? carte.nextDue : 0;
    carte.lastLatency = Number.isFinite(carte.lastLatency) ? carte.lastLatency : 0;
    carte.masteryScore = Number.isFinite(carte.masteryScore) ? carte.masteryScore : calculerScoreMaitrise(carte);
    carte.buriedUntil = Number.isFinite(carte.buriedUntil) ? carte.buriedUntil : 0;
    return carte;
}

function calculerProchainIntervalleJours(carte, nomEval) {
    const precedent = Math.max(carte.intervalDays || 1, 0.04);
    const ef = carte.ef || parametresSRS.faciliteInitiale;
    const mod = parametresSRS.modificateurIntervalleGlobal || 1;

    if (nomEval === 'difficile') return Math.max(1, Math.round(precedent * parametresSRS.multiplicateurDifficile));
    if (nomEval === 'bien') return Math.round(precedent * ef * mod);
    if (nomEval === 'facile') return Math.round(precedent * ef * mod * parametresSRS.bonusFacile);
    return 0.25; // 'encore' géré via steps de (ré)apprentissage
}

async function planifierCarteApresEvaluation(carte, evaluation) {
    const maintenant = maintenantEnMs();
    const nomEval = nomEvaluation[evaluation] || 'bien';

    const ajustementFacilite = parametresSRS.ajustementFacilite[nomEval] ?? 0;
    carte.ef = clamp((carte.ef || parametresSRS.faciliteInitiale) + ajustementFacilite, parametresSRS.faciliteMin, parametresSRS.faciliteMax);
    carte.box = mettreAJourBoite(carte.box || 1, nomEval);

    if (nomEval === 'encore') {
        carte.reps = 0;
        carte.lapses = (carte.lapses || 0) + 1;
    } else if (nomEval === 'difficile') {
        carte.reps = Math.max(1, (carte.reps || 0));
    } else {
        carte.reps = (carte.reps || 0) + 1;
    }
    carte.lastSeen = maintenant;

    // Machine à états
    if (carte.state === 'new' || carte.state === 'learning') {
        if (nomEval === 'encore' || nomEval === 'difficile') {
            carte.state = 'learning';
            const indexEtape = (nomEval === 'encore') ? 0 : Math.max(0, carte.stepIndex | 0);
            carte.stepIndex = indexEtape;
            const etape = parametresSRS.etapesApprentissageMinutes[indexEtape] ?? parametresSRS.etapesApprentissageMinutes.at(-1);
            carte.nextDue = maintenant + minutesEnMs(etape);
        } else { // bien ou facile
            const prochainIndex = (carte.stepIndex | 0) + 1;
            if (prochainIndex < parametresSRS.etapesApprentissageMinutes.length) {
                carte.state = 'learning';
                carte.stepIndex = prochainIndex;
                carte.nextDue = maintenant + minutesEnMs(parametresSRS.etapesApprentissageMinutes[prochainIndex]);
            } else { // Graduation
                carte.state = 'review';
                let intervalle = (nomEval === 'facile')
                    ? Math.max(1, Math.round(parametresSRS.intervalleInitialJours * 3))
                    : parametresSRS.intervalleInitialJours;
                carte.intervalDays = limiterIntervalleParBoite(intervalle, carte.box);
                carte.nextDue = appliquerFuzzDueDate(maintenant + joursEnMs(carte.intervalDays), carte.intervalDays);
            }
        }
    } else if (carte.state === 'review') {
        if (nomEval === 'encore') { // Oubli
            carte.state = 'relearning';
            carte.stepIndex = 0;
            carte.nextDue = maintenant + minutesEnMs(parametresSRS.etapesReapprentissageMinutes[0]);
        } else { // Révision réussie
            let intervalle = calculerProchainIntervalleJours(carte, nomEval);
            intervalle = limiterIntervalleParBoite(intervalle, carte.box);
            carte.intervalDays = intervalle;
            carte.nextDue = appliquerFuzzDueDate(maintenant + joursEnMs(intervalle), intervalle);
        }
    } else if (carte.state === 'relearning') {
        if (nomEval === 'encore' || nomEval === 'difficile') {
            const indexEtape = (nomEval === 'encore') ? 0 : Math.max(0, carte.stepIndex | 0);
            carte.stepIndex = indexEtape;
            const etape = parametresSRS.etapesReapprentissageMinutes[indexEtape] ?? parametresSRS.etapesReapprentissageMinutes.at(-1);
            carte.nextDue = maintenant + minutesEnMs(etape);
        } else { // bien ou facile
            const prochainIndex = (carte.stepIndex | 0) + 1;
            if (prochainIndex < parametresSRS.etapesReapprentissageMinutes.length) {
                carte.stepIndex = prochainIndex;
                carte.nextDue = maintenant + minutesEnMs(parametresSRS.etapesReapprentissageMinutes[prochainIndex]);
            } else { // Fin du réapprentissage
                carte.state = 'review';
                const intervalleReduit = Math.max(1, Math.round((carte.intervalDays || 1) * parametresSRS.facteurOubliIntervalle));
                carte.intervalDays = limiterIntervalleParBoite(intervalleReduit, carte.box);
                carte.nextDue = appliquerFuzzDueDate(maintenant + joursEnMs(carte.intervalDays), carte.intervalDays);
            }
        }
    }

    carte.masteryScore = calculerScoreMaitrise(carte);
    return (carte.nextDue - maintenant);
}


// ===================================================================================
// ÉVALUATION DE LA RÉPONSE UTILISATEUR
// ===================================================================================

const ARTICLES_A_IGNORER = ['a', 'an', 'the', 'un', 'une', 'des', 'le', 'la', 'les', "l'"];
const DIACRITIQUES_REGEX = /[\u0300-\u036f]/g;

const normaliserReponse = (texte) => (texte || '').toLowerCase().normalize('NFD').replace(DIACRITIQUES_REGEX, '').replace(/[_-]/g, ' ').replace(/[^a-z' ]+/g, ' ').replace(/\s+/g, ' ').trim();
const sansArticles = (texte) => texte.split(' ').filter(mot => !ARTICLES_A_IGNORER.includes(mot)).join(' ');
const decomposerAlternatives = (texte) => String(texte).split(/[/,]/).map(x => x.trim()).filter(Boolean);

function levenshtein(a, b) {
    const n = a.length, m = b.length;
    if (!n) return m; if (!m) return n;
    const dp = Array(n + 1).fill(null).map(() => new Uint16Array(m + 1));
    for (let j = 0; j <= m; j++) dp[0][j] = j;
    for (let i = 1; i <= n; i++) {
        dp[i][0] = i;
        const charCodeA = a.charCodeAt(i - 1);
        for (let j = 1; j <= m; j++) {
            const cout = (charCodeA === b.charCodeAt(j - 1)) ? 0 : 1;
            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cout);
        }
    }
    return dp[n][m];
}

function trouverMeilleureSimilarite(entreeUtilisateurNormalisee, reponseCorrecte) {
    let meilleureSimilarite = 0, correspondanceExacte = false;
    for (const alternative of decomposerAlternatives(reponseCorrecte)) {
        const alternativeNormalisee = normaliserReponse(alternative);
        if (!alternativeNormalisee) continue;

        const entreeSansArticle = sansArticles(entreeUtilisateurNormalisee);
        const alternativeSansArticle = sansArticles(alternativeNormalisee);

        if (entreeSansArticle === alternativeSansArticle) {
            correspondanceExacte = true;
            meilleureSimilarite = 1;
            break;
        }

        const distance = levenshtein(entreeUtilisateurNormalisee, alternativeNormalisee);
        const similarite = 1 - distance / Math.max(1, entreeUtilisateurNormalisee.length, alternativeNormalisee.length);
        if (similarite > meilleureSimilarite) meilleureSimilarite = similarite;
    }
    return { meilleureSimilarite, correspondanceExacte };
}

function calculerScorePourcentage(evaluation, estExact, similarite, msParCaractere) {
    const base = { 1: 35, 2: 60, 3: 85, 4: 94 }[evaluation] || 85;
    let delta = 0;
    if (msParCaractere <= SEUIL_FRAPPE_RAPIDE_MS * 0.6) delta += 4;
    else if (msParCaractere <= SEUIL_FRAPPE_RAPIDE_MS) delta += 2;
    else delta -= 2;

    if (!estExact) {
        if (similarite < 0.40) delta -= 15;
        else if (similarite < 0.70) delta -= 8;
        else if (similarite < 0.85) delta -= 3;
        else if (similarite < 0.95) delta -= 1;
    }
    return clamp(Math.round(base + delta), 10, 98);
}

function evaluerReponseTapee(reponseUtilisateur, reponseCorrecte, latenceMs) {
    const reponseNormalisee = normaliserReponse(reponseUtilisateur);
    if (!reponseNormalisee) return { evaluation: 1, scorePourcentage: 35, estExacte: false };

    const { meilleureSimilarite, correspondanceExacte } = trouverMeilleureSimilarite(reponseNormalisee, reponseCorrecte);
    const nbCaracteres = reponseNormalisee.replace(/\s+/g, '').length || 1;
    const msParCaractere = latenceMs > 0 ? latenceMs / nbCaracteres : Infinity;

    if (correspondanceExacte) {
        const evaluation = (msParCaractere <= SEUIL_FRAPPE_RAPIDE_MS) ? 4 : 3;
        return { evaluation, scorePourcentage: calculerScorePourcentage(evaluation, true, 1, msParCaractere), estExacte: true };
    }

    if (meilleureSimilarite >= 0.90) {
        const evaluation = (msParCaractere <= SEUIL_FRAPPE_RAPIDE_MS) ? 4 : 3;
        return { evaluation, scorePourcentage: calculerScorePourcentage(evaluation, false, meilleureSimilarite, msParCaractere), estExacte: false };
    }
    if (meilleureSimilarite >= 0.70) return { evaluation: 3, scorePourcentage: calculerScorePourcentage(3, false, meilleureSimilarite, msParCaractere), estExacte: false };
    if (meilleureSimilarite >= 0.40) return { evaluation: 2, scorePourcentage: calculerScorePourcentage(2, false, meilleureSimilarite, msParCaractere), estExacte: false };
    return { evaluation: 1, scorePourcentage: calculerScorePourcentage(1, false, meilleureSimilarite, msParCaractere), estExacte: false };
}


// ===================================================================================
// GESTION DU PAQUET DE CARTES (DECK)
// ===================================================================================

function initialiserCyclePourChapitreActuel() {
    if (etatApplication.cycleParChapitre.chapitre !== etatApplication.chapitreActuel) {
        etatApplication.cycleParChapitre.chapitre = etatApplication.chapitreActuel;
        etatApplication.cycleParChapitre.vues = {};
    }
}

function reinitialiserCycleChapitreActuel() {
    etatApplication.cycleParChapitre.chapitre = etatApplication.chapitreActuel;
    etatApplication.cycleParChapitre.vues = {};
}

function filtrerCartesNonVuesDuCycle(listeDeBase) {
    return listeDeBase.filter(c => !etatApplication.cycleParChapitre.vues[String(c.id)]);
}

function construirePaquetDeRevision(listeDeCartes) {
    assurerQuotaJourActuel();
    initialiserCyclePourChapitreActuel();
    let base = [...listeDeCartes];
    let nonVues = filtrerCartesNonVuesDuCycle(base);
    let cycleReinitialise = false;

    if (nonVues.length === 0 && base.length > 0) {
        reinitialiserCycleChapitreActuel();
        nonVues = [...base];
        cycleReinitialise = true;
    }

    const maintenant = maintenantEnMs();
    const aRevoirApprentissage = [], aRevoirRevision = [], enAttenteApprentissage = [], enAttenteRevision = [], nouvellesCartes = [];

    for (const carte of nonVues) {
        // Skip si enterrée jusqu’à ce soir
        if ((carte.buriedUntil || 0) > maintenant) continue;

        if (carte.state === 'new') {
            nouvellesCartes.push(carte);
            continue;
        }
        const estDue = (carte.nextDue || 0) <= maintenant;
        if (carte.state === 'learning' || carte.state === 'relearning') {
            if (estDue) aRevoirApprentissage.push(carte);
            else enAttenteApprentissage.push(carte);
        } else { // review
            if (estDue) aRevoirRevision.push(carte);
            else enAttenteRevision.push(carte);
        }
    }

    // Priorités intra-files
    aRevoirApprentissage.sort((a, b) => (a.nextDue || 0) - (b.nextDue || 0));

    if (parametresSRS.triV3OverdueRelatif) {
        aRevoirRevision.sort((a, b) => {
            const ra = calculerOverduenessRelative(a, maintenant);
            const rb = calculerOverduenessRelative(b, maintenant);
            if (ra !== rb) return rb - ra; // plus “overdue” relatif d’abord
            return (a.nextDue || 0) - (b.nextDue || 0);
        });
    } else {
        aRevoirRevision.sort((a, b) => (a.nextDue || 0) - (b.nextDue || 0));
    }

    // Limites quotidiennes (les learning/relearning ne sont pas limités)
    const restantReviews = Math.max(0, (parametresSRS.limitesQuotidiennes.reviewsParJour ?? Infinity) - (etatApplication.quotaDuJour.reviewsMontrees || 0));
    const restantNouvelles = Math.max(0, (parametresSRS.limitesQuotidiennes.nouvellesParJour ?? Infinity) - (etatApplication.quotaDuJour.nouvellesMontrees || 0));

    const reviewsDuJour = aRevoirRevision.slice(0, restantReviews);
    const nouvellesDuJour = nouvellesCartes.slice(0, restantNouvelles);

    // Ordre final: learning due → review due (limitées) → autres (attente) → new (limitées)
    const autresCartes = [...enAttenteApprentissage, ...enAttenteRevision].sort((a, b) => {
        const scoreA = a.masteryScore || 0, scoreB = b.masteryScore || 0;
        if (scoreA !== scoreB) return scoreA - scoreB;
        return (a.nextDue || Infinity) - (b.nextDue || Infinity);
    });

    let paquet = [...aRevoirApprentissage, ...reviewsDuJour, ...autresCartes, ...nouvellesDuJour];

    // Bury des sœurs (une seule carte par note par jour)
    if (parametresSRS.burySoeurs) {
        const seen = new Set();
        const finJour = finDeJourneeMs();
        const filtrage = [];
        for (const c of paquet) {
            const k = obtenirCleNote(c);
            if (!seen.has(k)) {
                seen.add(k);
                filtrage.push(c);
            } else {
                c.buriedUntil = Math.max(c.buriedUntil || 0, finJour);
            }
        }
        paquet = filtrage;
    }

    if (cycleReinitialise) {
        afficherMessage('Nouveau cycle lancé', 'text-amber-500 dark:text-amber-400', 1400);
    }
    return paquet;
}

function obtenirCartesDuChapitreActuel() {
    return (etatApplication.chapitreActuel === 'Tout')
        ? [...etatApplication.toutesLesCartes]
        : etatApplication.toutesLesCartes.filter(c => c.chapter === etatApplication.chapitreActuel);
}

function reconstruireLePaquet() {
    etatApplication.paquetActuel = construirePaquetDeRevision(obtenirCartesDuChapitreActuel());
    etatApplication.indexActuel = 0;
}


// ===================================================================================
// GESTION DES CHAPITRES & DE L'INTERFACE
// ===================================================================================

function trouverTousLesChapitres() {
    const set = new Set(etatApplication.toutesLesCartes.map(c => c.chapter));
    etatApplication.chapitresDisponibles = ['Tout', ...Array.from(set).filter(Boolean).sort((a, b) => a.localeCompare(b))];
}

function afficherBoutonsChapitres() {
  const fragment = document.createDocumentFragment();
  for (const nom of etatApplication.chapitresDisponibles) {
    const bouton = document.createElement('button');
    bouton.dataset.chapter = nom;
    const emoji = nom === 'Tout' ? '📚' : (CHAPTER_EMOJIS[nom] || '📘');
    bouton.innerHTML = `${emoji} ${nom}`;
    bouton.className = 'p-2 sm:p-3 rounded-lg shadow font-medium text-xs sm:text-sm transition-all duration-200 ease-in-out hover:opacity-80 w-full truncate chapter-button-default';
    fragment.appendChild(bouton);
  }
  elementsDOM.listeChapitresMenu.innerHTML = '';
  elementsDOM.listeChapitresMenu.appendChild(fragment);
  mettreAJourBoutonsChapitreActif();
}

function mettreAJourBoutonsChapitreActif() {
    [...elementsDOM.listeChapitresMenu.children].forEach(btn => {
        btn.classList.remove('chapter-button-active', 'chapter-button-default');
        btn.classList.add(btn.dataset.chapter === etatApplication.chapitreActuel ? 'chapter-button-active' : 'chapter-button-default');
    });
}

function afficherOptionsDeReset() {
  elementsDOM.selecteurReset.innerHTML = etatApplication.chapitresDisponibles
    .map(n => `<option value="${n}">${n}</option>`)
    .join('');
}


// ===================================================================================
// AFFICHAGE DE LA CARTE & INTERACTION PRINCIPALE
// ===================================================================================

function mettreAJourScoreCarteUI(nouveauPct, ancienPct) {
  const aUnAncienScore = Number.isFinite(ancienPct);
  const delta = aUnAncienScore ? (nouveauPct - ancienPct) : null;
  const signe = (delta != null) ? (delta >= 0 ? '+' : '−') : '';
  const abs = (delta != null) ? Math.abs(delta) : null;
  elementsDOM.scoreCarte.textContent = aUnAncienScore
    ? `${nouveauPct}% (${signe}${abs})`
    : `${nouveauPct}%`;
}

function afficherCarte(mettreFocus = true) {
    afficherMessage('', '');
    elementsDOM.champReponse.value = '';
    etatApplication.debutReponseTimestamp = null;
    etatApplication.estRevelee = false;
    etatApplication.enAttenteEvaluation = false;
    etatApplication.enAttenteAvance = false;

    basculerVisibilite(elementsDOM.barreEvaluation, false);
    basculerVisibilite(elementsDOM.boutonSoumettre, true);
    elementsDOM.champReponse.disabled = false;
    elementsDOM.conteneurFlashcard.className = `flashcard-container ${etatApplication.modeSombre ? 'dark-mode-card-neutral' : 'light-mode-card-neutral'}`;


    if (!etatApplication.paquetActuel.length || etatApplication.indexActuel >= etatApplication.paquetActuel.length) {
        elementsDOM.motFrancais.textContent = 'Aucune carte à afficher.';
        elementsDOM.motAnglais.textContent = '';
        basculerVisibilite(elementsDOM.motAnglais, true);
        elementsDOM.scoreCarte.textContent = '--%';
        return;
    }

    const carte = etatApplication.paquetActuel[etatApplication.indexActuel];
    const elementQuestion = etatApplication.modeInverse ? elementsDOM.motAnglais : elementsDOM.motFrancais;
    const elementReponse = etatApplication.modeInverse ? elementsDOM.motFrancais : elementsDOM.motAnglais;

    elementsDOM.motFrancais.textContent = carte.french;
    elementsDOM.motAnglais.textContent = carte.english;

    basculerVisibilite(elementQuestion, true);
    basculerVisibilite(elementReponse, false);

    elementsDOM.scoreCarte.textContent = Number.isFinite(carte.lastScorePct) ? `${carte.lastScorePct}%` : '--%';
    const categorieMaitrise = obtenirCategorieMaitrise(carte.masteryScore || 0);
    elementsDOM.scoreCarte.title = `Maîtrise: ${carte.masteryScore || 0}% • Boîte: ${carte.box || 1} • Facilité: ${(carte.ef || parametresSRS.faciliteInitiale).toFixed(2)} • ${categorieMaitrise}`;

    if (mettreFocus) elementsDOM.champReponse.focus({ preventScroll: true });
    elementsDOM.labelChapitreActuel.textContent = etatApplication.chapitreActuel;
}

function revelerTraduction() {
    const elementReponse = etatApplication.modeInverse ? elementsDOM.motFrancais : elementsDOM.motAnglais;
    basculerVisibilite(elementReponse, true);
    etatApplication.estRevelee = true;
}


// ===================================================================================
// GESTION DES ÉVÉNEMENTS & ACTIONS UTILISATEUR
// ===================================================================================

function enregistrerResultat(carte, evaluation, scorePct, latenceMs) {
    carte.revCount = (carte.revCount || 0) + 1;
    if (evaluation >= 3) carte.okCount = (carte.okCount || 0) + 1;
    carte.totalTimeMs = (carte.totalTimeMs || 0) + (latenceMs || 0);
    carte.lastScorePct = clamp(Math.round(scorePct), 0, 100);
    carte.lastGrade = evaluation;
    carte.lastLatency = latenceMs || 0;

    if (evaluation >= 3) {
        etatApplication.serieDeReponses++;
        etatApplication.serieMax = Math.max(etatApplication.serieMax, etatApplication.serieDeReponses);
    } else {
        etatApplication.serieDeReponses = 0;
    }
    elementsDOM.badgeSerie.textContent = `🔥 ${etatApplication.serieDeReponses}`;

    const date = dateISO();
    const enregistrement = etatApplication.historiqueQuotidien[date] || { rev: 0, ok: 0, ms: 0 };
    enregistrement.rev += 1;
    if (evaluation >= 3) enregistrement.ok += 1;
    enregistrement.ms += (latenceMs || 0);
    etatApplication.historiqueQuotidien[date] = enregistrement;
}

async function traiterEvaluation(evaluation, options = {}) {
    if (!etatApplication.paquetActuel.length) return 0;
    assurerQuotaJourActuel();

    const carte = etatApplication.paquetActuel[etatApplication.indexActuel];
    const latence = options.latenceMs || 0;
    const ancienScore = Number.isFinite(carte.lastScorePct) ? carte.lastScorePct : null;
    const etatAvant = carte.state;

    const scorePct = Number.isFinite(options.scorePct) ? options.scorePct : ({ 1: 35, 2: 60, 3: 85, 4: 95 }[evaluation]);
    const prochainDelaiMs = await planifierCarteApresEvaluation(carte, evaluation);

    // Compteurs quotidiens new/review (comme Anki: incrément au moment de la réponse)
    if (etatAvant === 'new') {
        etatApplication.quotaDuJour.nouvellesMontrees++;
        etatApplication.nouvellesCartesSession++;
    } else if (etatAvant === 'review') {
        etatApplication.quotaDuJour.reviewsMontrees++;
    }

    enregistrerResultat(carte, evaluation, scorePct, latence);
    etatApplication.cycleParChapitre.vues[String(carte.id)] = true;

    mettreAJourScoreCarteUI(scorePct, ancienScore);

    const labels = { 1: 'Encore', 2: 'Difficile', 3: 'Bien', 4: 'Facile' };
    const estBonneReponse = evaluation >= 3;
    if (options.afficherFeedback !== false) {
        afficherMessage(
            `${labels[evaluation]} — ${formaterIntervalle(prochainDelaiMs)}`,
            estBonneReponse ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400',
            1200
        );
    }

    reconstruireLePaquet();
    afficherStatistiques();
    afficherGraphiqueActivite();
    mettreAJourBarreProgression();
    sauvegarderEtat();

    if (options.avanceAuto !== false) {
        setTimeout(carteSuivante, DELAI_AVANCE_AUTO_MS);
    } else {
        etatApplication.enAttenteAvance = true;
        setTimeout(() => {
            afficherMessage('ENTRER pour continuer', 'text-sky-500 dark:text-sky-400', 1400);
        }, 150);
    }

    return prochainDelaiMs;
}

function soumettreReponse() {
    if (elementsDOM.champReponse.disabled || !etatApplication.paquetActuel.length) return;

    const reponseUtilisateur = elementsDOM.champReponse.value.trim();
    const carteActuelle = etatApplication.paquetActuel[etatApplication.indexActuel];

    if (!reponseUtilisateur) {
        if (!etatApplication.estRevelee) {
            revelerTraduction();
            etatApplication.enAttenteEvaluation = true;
            basculerVisibilite(elementsDOM.barreEvaluation, true);
            basculerVisibilite(elementsDOM.boutonSoumettre, false);
            elementsDOM.champReponse.disabled = true;
            afficherMessage('Révélé — 1 Encore, 2 Diff., 3 Bien, 4 Facile', 'text-sky-500 dark:text-sky-400', 2000);
        } else {
            afficherMessage('1 Encore, 2 Diff., 3 Bien, 4 Facile', 'text-sky-500 dark:text-sky-400', 1200);
        }
        return;
    }

    const latence = etatApplication.debutReponseTimestamp ? (Date.now() - etatApplication.debutReponseTimestamp) : 0;
    revelerTraduction();

    const reponseCorrecte = (etatApplication.modeInverse ? carteActuelle.french : carteActuelle.english).trim();
    const { evaluation, scorePourcentage } = evaluerReponseTapee(reponseUtilisateur, reponseCorrecte, latence);

    const ancienScore = Number.isFinite(carteActuelle.lastScorePct) ? carteActuelle.lastScorePct : null;
    basculerVisibilite(elementsDOM.boutonSoumettre, false);
    elementsDOM.champReponse.disabled = true;
    basculerVisibilite(elementsDOM.barreEvaluation, false);

    traiterEvaluation(evaluation, { scorePct: scorePourcentage, latenceMs: latence, avanceAuto: false, afficherFeedback: false })
        .then(prochainDelaiMs => {
            const delta = (ancienScore != null) ? (scorePourcentage - ancienScore) : null;
            const texteDelta = (delta != null) ? ` (${delta >= 0 ? '+' : '−'}${Math.abs(delta)}%)` : '';
            const estBonneReponse = evaluation >= 3;
            const message = `${estBonneReponse ? 'Bonne réponse !' : 'Mauvaise réponse !'}${texteDelta}${prochainDelaiMs ? ` — ${formaterIntervalle(prochainDelaiMs)}` : ''}`;
            const classeCss = estBonneReponse ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400';

            afficherMessage(message, classeCss, 1600);
            etatApplication.enAttenteAvance = true;
        });
}

function carteSuivante() {
    etatApplication.cartesVuesSession++;
    if (!etatApplication.paquetActuel.length) {
        afficherCarte();
        return;
    }
    etatApplication.indexActuel = 0; // Le paquet est déjà reconstruit, on prend la première carte
    afficherCarte();
    mettreAJourBarreProgression();
    sauvegarderEtat();
}


// ===================================================================================
// SAUVEGARDE & SYNCHRONISATION DES DONNÉES
// ===================================================================================

function sauvegarderEtat() {
    try {
        const etatASauvegarder = {
            toutesLesCartes: etatApplication.toutesLesCartes,
            secondesEcoulees: etatApplication.secondesEcoulees,
            chapitreActuel: etatApplication.chapitreActuel,
            modeSombre: etatApplication.modeSombre,
            themeActuel: etatApplication.themeActuel,
            modeInverse: etatApplication.modeInverse,
            serieDeReponses: etatApplication.serieDeReponses,
            serieMax: etatApplication.serieMax,
            historiqueQuotidien: etatApplication.historiqueQuotidien,
            nouvellesCartesSession: etatApplication.nouvellesCartesSession,
            cartesVuesSession: etatApplication.cartesVuesSession,
            cycleParChapitre: {
                chapitre: etatApplication.cycleParChapitre.chapitre,
                vues: Object.keys(etatApplication.cycleParChapitre.vues || {})
            },
            quotaDuJour: etatApplication.quotaDuJour
        };
        localStorage.setItem('donneesFlashcards', JSON.stringify(etatASauvegarder));
    } catch (e) {
        console.error("Erreur lors de la sauvegarde des données:", e);
    }
}

function chargerEtSynchroniserDonnees() {
    const donneesSauvegardeesJSON = localStorage.getItem('donneesFlashcards');
    const donneesDeReference = flashcardData;
    let etatSauvegarde = null;
    let motsAjoutes = 0;

    try {
        if (donneesSauvegardeesJSON) etatSauvegarde = JSON.parse(donneesSauvegardeesJSON);
    } catch (e) {
        console.error("Erreur lors du parsing des données sauvegardées:", e);
    }

    if (!etatSauvegarde || !etatSauvegarde.toutesLesCartes || etatSauvegarde.toutesLesCartes.length === 0) {
        console.log("Aucune sauvegarde valide trouvée. Initialisation à partir de zéro.");
        etatApplication.toutesLesCartes = donneesDeReference.map(carteBrute => {
            const id = String(carteBrute.id ?? `${carteBrute.chapter}::${carteBrute.french ?? carteBrute.fr}`);
            return initialiserProprietesCarte({ ...carteBrute, id });
        });
        etatApplication.chapitreActuel = 'Tout';
    } else {
        console.log("Sauvegarde trouvée. Synchronisation avec le vocabulaire de base.");
        const mapCartesSauvegardees = new Map(etatSauvegarde.toutesLesCartes.map(c => [String(c.id), c]));
        const idsDeReference = new Set();
        const cartesFinales = [];

        for (const carteBrute of donneesDeReference) {
            const id = String(carteBrute.id ?? `${carteBrute.chapter}::${carteBrute.french ?? carteBrute.fr}`);
            idsDeReference.add(id);
            
            const carteSauvegardee = mapCartesSauvegardees.get(id);

            if (carteSauvegardee) {
                const carteMiseAJour = {
                    ...carteSauvegardee,
                    french: carteBrute.french ?? carteBrute.fr,
                    english: carteBrute.english ?? carteBrute.en,
                    chapter: carteBrute.chapter
                };
                cartesFinales.push(initialiserProprietesCarte(carteMiseAJour));
            } else {
                const nouvelleCarte = initialiserProprietesCarte({ ...carteBrute, id });
                cartesFinales.push(nouvelleCarte);
                motsAjoutes++;
            }
        }
        
        etatApplication.toutesLesCartes = cartesFinales.filter(c => idsDeReference.has(String(c.id)));
        
        // Restaurer le reste de l'état
        etatApplication.secondesEcoulees = etatSauvegarde.secondesEcoulees || 0;
        etatApplication.chapitreActuel = etatSauvegarde.chapitreActuel || 'Tout';
        etatApplication.modeSombre = !!etatSauvegarde.modeSombre;
        etatApplication.themeActuel = etatSauvegarde.themeActuel || 'default';
        etatApplication.modeInverse = !!etatSauvegarde.modeInverse;
        etatApplication.serieDeReponses = etatSauvegarde.serieDeReponses || 0;
        etatApplication.serieMax = etatSauvegarde.serieMax || 0;
        etatApplication.historiqueQuotidien = etatSauvegarde.historiqueQuotidien || {};
        etatApplication.nouvellesCartesSession = etatSauvegarde.nouvellesCartesSession || 0;
        etatApplication.cartesVuesSession = etatSauvegarde.cartesVuesSession || 0;
        etatApplication.quotaDuJour = etatSauvegarde.quotaDuJour || { date: dateISO(), nouvellesMontrees: 0, reviewsMontrees: 0 };
        
        const vuesDuCycle = (etatSauvegarde.cycleParChapitre && Array.isArray(etatSauvegarde.cycleParChapitre.vues)) ? etatSauvegarde.cycleParChapitre.vues : [];
        etatApplication.cycleParChapitre = {
            chapitre: (etatSauvegarde.cycleParChapitre?.chapitre) || etatApplication.chapitreActuel,
            vues: Object.fromEntries(vuesDuCycle.map(id => [String(id), true]))
        };
    }

    assurerQuotaJourActuel();

    if (motsAjoutes > 0) {
        afficherMessage(`${motsAjoutes} nouveau(x) mot(s) ajouté(s) ✨`, 'text-emerald-500 dark:text-emerald-400', 3500);
    }
    
    activerModeSombre(etatApplication.modeSombre); // Applique le mode sombre et met à jour l'UI
    if (elementsDOM.selecteurTheme) elementsDOM.selecteurTheme.value = etatApplication.themeActuel;

    construireIndexDeRecherche();
    initialiserInterfaceUtilisateur();
    sauvegarderEtat();
}


// ===================================================================================
// FONCTIONNALITÉ DE RECHERCHE
// ===================================================================================

function construireIndexDeRecherche() {
    etatApplication.indexDeRecherche = etatApplication.toutesLesCartes.map(c => ({
        id: c.id,
        french_lc: c.french.toLowerCase(),
        english_lc: c.english.toLowerCase(),
        chapter: c.chapter,
        ref: c
    }));
}

function mettreAJourResultatsRecherche(requete) {
    elementsDOM.conteneurResultatsRecherche.innerHTML = '';
    const reqNormalisee = (requete || '').trim().toLowerCase();
    if (!reqNormalisee) return;

    const resultats = [];
    for (const item of etatApplication.indexDeRecherche) {
        if (item.french_lc.includes(reqNormalisee) || item.english_lc.includes(reqNormalisee)) {
            resultats.push(item.ref);
            if (resultats.length >= 8) break;
        }
    }

    if (!resultats.length) {
        elementsDOM.conteneurResultatsRecherche.innerHTML = '<p class="p-2">Aucun résultat</p>';
        return;
    }

    const classeSurvol = etatApplication.modeSombre ? 'hover:bg-gray-700' : 'hover:bg-gray-200';
    elementsDOM.conteneurResultatsRecherche.innerHTML = resultats.map(carte =>
        `<div class="p-2 cursor-pointer rounded ${classeSurvol}" data-id="${carte.id}">
            ${carte.french} — ${carte.english} (${carte.chapter})
        </div>`
    ).join('');
}

function allerALaCarte(idCarte, options = {}) {
    const carte = etatApplication.toutesLesCartes.find(c => String(c.id) === String(idCarte));
    if (!carte) {
        afficherMessage('Carte introuvable', 'text-red-500', 1500);
        return;
    }
    
    if (options.changerDeChapitre !== false && etatApplication.chapitreActuel !== carte.chapter) {
        etatApplication.chapitreActuel = carte.chapter;
        reinitialiserCycleChapitreActuel();
        reconstruireLePaquet();
        mettreAJourBoutonsChapitreActif();
        elementsDOM.labelChapitreActuel.textContent = etatApplication.chapitreActuel;
    } else if (!etatApplication.paquetActuel.length) {
        reconstruireLePaquet();
    }
    
    // Si la carte a déjà été vue et qu'il reste des cartes non vues, informer l'utilisateur
    const nonVues = filtrerCartesNonVuesDuCycle(obtenirCartesDuChapitreActuel());
    if (etatApplication.cycleParChapitre.vues[String(carte.id)] && nonVues.length > 0) {
        afficherMessage('Cette carte a déjà été vue. Terminez le cycle pour la revoir.', 'text-amber-500 dark:text-amber-400', 2200);
        return;
    }
    
    // Placer la carte au début du paquet
    const idChaine = String(carte.id);
    const resteDuPaquet = etatApplication.paquetActuel.filter(c => String(c.id) !== idChaine);
    etatApplication.paquetActuel = [carte, ...resteDuPaquet];
    etatApplication.indexActuel = 0;
    
    afficherCarte(true);
    sauvegarderEtat();
}


// ===================================================================================
// ÉCOUTEURS D'ÉVÉNEMENTS
// ===================================================================================

function attacherEcouteursEvenements() {
    on(elementsDOM.boutonMenu, 'click', () => ouvrirMenuLateral(true));
    on(elementsDOM.superpositionMenu, 'click', () => ouvrirMenuLateral(false));
    on(elementsDOM.boutonFermerMenu, 'click', () => ouvrirMenuLateral(false));

    on(elementsDOM.listeChapitresMenu, 'click', e => {
        const bouton = e.target.closest('button[data-chapter]');
        if (!bouton) return;
        const chapitre = bouton.dataset.chapter;
        if (!chapitre || chapitre === etatApplication.chapitreActuel) {
            ouvrirMenuLateral(false);
            return;
        }
        etatApplication.chapitreActuel = chapitre;
        reinitialiserCycleChapitreActuel();
        etatApplication.nouvellesCartesSession = 0;
        etatApplication.cartesVuesSession = 0;
        reconstruireLePaquet();
        afficherCarte(false);
        mettreAJourBarreProgression();
        mettreAJourBoutonsChapitreActif();
        elementsDOM.labelChapitreActuel.textContent = etatApplication.chapitreActuel;
        sauvegarderEtat();
        ouvrirMenuLateral(false);
    });

    on(elementsDOM.boutonResetDonnees, 'click', () => {
        const chapitre = elementsDOM.selecteurReset.value || 'Tout';
        const reinitialiserCarte = c => Object.assign(c, initialiserProprietesCarte({ id: c.id, french: c.french, english: c.english, chapter: c.chapter }));
        
        etatApplication.toutesLesCartes.forEach(c => {
            if (chapitre === 'Tout' || c.chapter === chapitre) reinitialiserCarte(c);
        });

        if (chapitre === 'Tout') {
            Object.assign(etatApplication, { cartesVuesSession: 0, nouvellesCartesSession: 0, serieDeReponses: 0, serieMax: 0, historiqueQuotidien: {} });
            etatApplication.quotaDuJour = { date: dateISO(), nouvellesMontrees: 0, reviewsMontrees: 0 };
        }
        if (chapitre === 'Tout' || chapitre === etatApplication.chapitreActuel) {
            reinitialiserCycleChapitreActuel();
        }

        reconstruireLePaquet();
        afficherCarte(false);
        afficherStatistiques();
        afficherGraphiqueActivite();
        mettreAJourBarreProgression();
        sauvegarderEtat();
        afficherMessage('Progression réinitialisée', 'text-orange-500 dark:text-yellow-400', 1200);
    });

    on(elementsDOM.boutonModeSombre, 'click', () => activerModeSombre(!etatApplication.modeSombre));
    on(elementsDOM.boutonModeInverse, 'click', () => {
        etatApplication.modeInverse = !etatApplication.modeInverse;
        afficherCarte(false);
        sauvegarderEtat();
    });
    on(elementsDOM.selecteurTheme, 'change', () => {
        etatApplication.themeActuel = elementsDOM.selecteurTheme.value;
        sauvegarderEtat();
    });

    on(elementsDOM.barreRecherche, 'input', e => mettreAJourResultatsRecherche(e.target.value));
    on(elementsDOM.conteneurResultatsRecherche, 'click', e => {
        const item = e.target.closest('[data-id]');
        if (!item) return;
        allerALaCarte(item.dataset.id, { changerDeChapitre: true });
        elementsDOM.barreRecherche.value = '';
        elementsDOM.conteneurResultatsRecherche.innerHTML = '';
        ouvrirMenuLateral(false);
    });

    on(elementsDOM.barreRecherche, 'keydown', e => {
        if (e.key === 'Enter') {
            const premierResultat = elementsDOM.conteneurResultatsRecherche.querySelector('[data-id]');
            if (premierResultat) {
                allerALaCarte(premierResultat.getAttribute('data-id'), { changerDeChapitre: true });
                elementsDOM.barreRecherche.value = '';
                elementsDOM.conteneurResultatsRecherche.innerHTML = '';
                ouvrirMenuLateral(false);
                e.preventDefault();
            }
        }
    });

    on(elementsDOM.conteneurFlashcard, 'click', () => {
        if (!etatApplication.estRevelee && !elementsDOM.champReponse.value.trim()) {
            revelerTraduction();
            etatApplication.enAttenteEvaluation = true;
            basculerVisibilite(elementsDOM.barreEvaluation, true);
            basculerVisibilite(elementsDOM.boutonSoumettre, false);
            elementsDOM.champReponse.disabled = true;
            afficherMessage('Révélé — 1 Encore, 2 Diff., 3 Bien, 4 Facile', 'text-sky-500 dark:text-sky-400', 2000);
        } else if (etatApplication.enAttenteAvance) {
            carteSuivante();
        }
    });

    on(elementsDOM.boutonSoumettre, 'click', soumettreReponse);
    on(elementsDOM.champReponse, 'input', () => {
        if (!etatApplication.debutReponseTimestamp && elementsDOM.champReponse.value.trim().length > 0) {
            etatApplication.debutReponseTimestamp = Date.now();
        }
    });

    on(elementsDOM.barreEvaluation, 'click', e => {
        const bouton = e.target.closest('button[data-grade]');
        if (!bouton) return;
        const evaluation = parseInt(bouton.dataset.grade, 10);
        if (etatApplication.enAttenteEvaluation && etatApplication.paquetActuel.length) {
            traiterEvaluation(evaluation, { avanceAuto: true });
        }
    });

    on(document, 'keydown', e => {
        const estDansUnChamp = document.activeElement === elementsDOM.champReponse || document.activeElement === elementsDOM.barreRecherche;
        
        if (e.key === 'Enter') {
            e.preventDefault();
            if (etatApplication.enAttenteAvance) { carteSuivante(); } 
            else { soumettreReponse(); }
            return;
        }

        if (estDansUnChamp) return;

        if (e.key === ' ' && !etatApplication.estRevelee && !elementsDOM.champReponse.value.trim()) {
            e.preventDefault();
            revelerTraduction();
            etatApplication.enAttenteEvaluation = true;
            basculerVisibilite(elementsDOM.barreEvaluation, true);
            basculerVisibilite(elementsDOM.boutonSoumettre, false);
            elementsDOM.champReponse.disabled = true;
            afficherMessage('Révélé — 1 Encore, 2 Diff., 3 Bien, 4 Facile', 'text-sky-500 dark:text-sky-400', 2000);
        }

        if (['1', '2', '3', '4'].includes(e.key)) {
            e.preventDefault();
            if (etatApplication.enAttenteEvaluation && etatApplication.paquetActuel.length) {
                traiterEvaluation(parseInt(e.key, 10), { avanceAuto: true });
            }
        }
    });
}


// ===================================================================================
// STATISTIQUES & GRAPHIQUE D'ACTIVITÉ
// ===================================================================================

function afficherStatistiques() {
    const total = etatApplication.toutesLesCartes.length;
    const revues = etatApplication.toutesLesCartes.filter(c => (c.revCount || 0) > 0).length;
    const nouvellesRestantes = etatApplication.toutesLesCartes.filter(c => c.state === 'new').length;
    const duesMaintenant = etatApplication.toutesLesCartes.filter(c => (c.state !== 'new') && (c.nextDue || 0) <= maintenantEnMs()).length;
    
    const totalRevisions = Object.values(etatApplication.historiqueQuotidien).reduce((sum, rec) => sum + (rec.rev || 0), 0);
    const revisionsOk = Object.values(etatApplication.historiqueQuotidien).reduce((sum, rec) => sum + (rec.ok || 0), 0);
    const precision = totalRevisions ? Math.round(revisionsOk * 100 / totalRevisions) : 0;
    
    const tempsTotal = Object.values(etatApplication.historiqueQuotidien).reduce((sum, rec) => sum + (rec.ms || 0), 0);
    const latenceMoyenne = totalRevisions ? Math.round(tempsTotal / totalRevisions) : 0;
    
    const scores = etatApplication.toutesLesCartes.map(c => c.lastScorePct).filter(Number.isFinite);
    const scoreMoyen = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    
    const intervalles = etatApplication.toutesLesCartes.filter(c => c.state === 'review').map(c => c.intervalDays || 0);
    const intervalleMoyen = intervalles.length ? Math.round(intervalles.reduce((a, b) => a + b, 0) / intervalles.length) : 0;

    const facilites = etatApplication.toutesLesCartes.map(c => c.ef || parametresSRS.faciliteInitiale);
    const faciliteMoyenne = facilites.length ? (Math.round(facilites.reduce((a, b) => a + b, 0) / facilites.length * 100) / 100).toFixed(2) : 0;

    const aujourdhui = dateISO();
    const revisionsAujourdhui = (etatApplication.historiqueQuotidien[aujourdhui]?.rev) || 0;

    const categories = { faible: 0, moyen: 0, eleve: 0 };
    const boites = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const carte of etatApplication.toutesLesCartes) {
        const score = carte.masteryScore || 0;
        if (score < 50) categories.faible++;
        else if (score < 80) categories.moyen++;
        else categories.eleve++;
        boites[clamp(carte.box || 1, 1, 5)]++;
    }

    const formatMs = ms => ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;

    elementsDOM.contenuStats.innerHTML = `
        <div class="grid grid-cols-2 gap-y-1 gap-x-4">
            <div class="text-gray-500 dark:text-gray-400">Total de mots</div><div class="text-right font-semibold">${total}</div>
            <div class="text-gray-500 dark:text-gray-400">Mots revus</div><div class="text-right font-semibold">${revues}</div>
            <div class="text-gray-500 dark:text-gray-400">Nouvelles restantes</div><div class="text-right font-semibold">${nouvellesRestantes}</div>
            <div class="text-gray-500 dark:text-gray-400">À revoir maintenant</div><div class="text-right font-semibold">${duesMaintenant}</div>
            <div class="col-span-2 mt-2 border-t border-gray-200 dark:border-gray-700"></div>
            <div class="text-gray-500 dark:text-gray-400">Total révisions</div><div class="text-right font-semibold">${totalRevisions}</div>
            <div class="text-gray-500 dark:text-gray-400">Précision</div><div class="text-right font-semibold">${precision}%</div>
            <div class="text-gray-500 dark:text-gray-400">Temps moyen</div><div class="text-right font-semibold">${formatMs(latenceMoyenne)}</div>
            <div class="text-gray-500 dark:text-gray-400">Score moyen</div><div class="text-right font-semibold">${scoreMoyen}%</div>
            <div class="text-gray-500 dark:text-gray-400">Intervalle moyen</div><div class="text-right font-semibold">${intervalleMoyen}j</div>
            <div class="text-gray-500 dark:text-gray-400">Facilité moyenne</div><div class="text-right font-semibold">${faciliteMoyenne}</div>
             <div class="col-span-2 mt-2 border-t border-gray-200 dark:border-gray-700"></div>
            <div class="text-gray-500 dark:text-gray-400">Maîtrise faible (&lt;50)</div><div class="text-right font-semibold">${categories.faible}</div>
            <div class="text-gray-500 dark:text-gray-400">En progression (50–79)</div><div class="text-right font-semibold">${categories.moyen}</div>
            <div class="text-gray-500 dark:text-gray-400">Maîtrisés (≥80)</div><div class="text-right font-semibold">${categories.eleve}</div>
            <div class="col-span-2 mt-2 border-t border-gray-200 dark:border-gray-700"></div>
            <div class="text-gray-500 dark:text-gray-400">Boîte 1</div><div class="text-right font-semibold">${boites[1]}</div>
            <div class="text-gray-500 dark:text-gray-400">Boîte 2</div><div class="text-right font-semibold">${boites[2]}</div>
            <div class="text-gray-500 dark:text-gray-400">Boîte 3</div><div class="text-right font-semibold">${boites[3]}</div>
            <div class="text-gray-500 dark:text-gray-400">Boîte 4</div><div class="text-right font-semibold">${boites[4]}</div>
            <div class="text-gray-500 dark:text-gray-400">Boîte 5</div><div class="text-right font-semibold">${boites[5]}</div>
            <div class="col-span-2 mt-2 border-t border-gray-200 dark:border-gray-700"></div>
            <div class="text-gray-500 dark:text-gray-400">Révisions aujourd’hui</div><div class="text-right font-semibold">${revisionsAujourdhui}</div>
        </div>
    `;
}

function joursPrecedents(nbJours) {
    const dates = [], maintenant = new Date();
    for (let i = nbJours - 1; i >= 0; i--) {
        const d = new Date(maintenant);
        d.setDate(maintenant.getDate() - i);
        dates.push(dateISO(d));
    }
    return dates;
}

function afficherGraphiqueActivite() {
    const { graphiqueActivite, cheminGraphique, remplissageGraphique, dernierPointGraphique, legendeGraphique } = elementsDOM;
    if (!graphiqueActivite || !cheminGraphique) return;

    const largeur = graphiqueActivite.clientWidth || 260, hauteur = graphiqueActivite.clientHeight || 70, marge = 6;
    const jours = joursPrecedents(14);
    const valeurs = jours.map(d => (etatApplication.historiqueQuotidien[d]?.rev) || 0);
    const maxValeur = Math.max(1, ...valeurs);
    const pasHorizontal = (largeur - 2 * marge) / (valeurs.length - 1 || 1);

    const points = valeurs.map((v, i) => [
        marge + i * pasHorizontal,
        hauteur - marge - (v / maxValeur) * (hauteur - 2 * marge - 12)
    ]);

    if (!points.length) {
        cheminGraphique.setAttribute('d', '');
        remplissageGraphique.setAttribute('d', '');
        return;
    }

    const cheminData = 'M ' + points.map(p => p.join(',')).join(' L ');
    cheminGraphique.setAttribute('d', cheminData);

    const premierPoint = points[0], dernierPoint = points[points.length - 1];
    remplissageGraphique.setAttribute('d', `${cheminData} L ${dernierPoint[0]},${hauteur - marge} L ${premierPoint[0]},${hauteur - marge} Z`);
    dernierPointGraphique.setAttribute('cx', String(dernierPoint[0]));
    dernierPointGraphique.setAttribute('cy', String(dernierPoint[1]));

    const total14j = valeurs.reduce((a, b) => a + b, 0);
    const jours7 = jours.slice(-7);
    const rev7j = jours7.reduce((a, d) => a + ((etatApplication.historiqueQuotidien[d]?.rev) || 0), 0);
    const ok7j = jours7.reduce((a, d) => a + ((etatApplication.historiqueQuotidien[d]?.ok) || 0), 0);
    const precision7j = rev7j ? Math.round(ok7j * 100 / rev7j) : 0;
    
    legendeGraphique.textContent = `${total14j} révisions • ${precision7j}%/7j`;
}


// ===================================================================================
// INITIALISATION DE L'APPLICATION
// ===================================================================================

function initialiserInterfaceUtilisateur() {
    trouverTousLesChapitres();
    afficherBoutonsChapitres();
    afficherOptionsDeReset();
    reconstruireLePaquet();
    afficherCarte(false);
    mettreAJourBarreProgression();
    afficherStatistiques();
    afficherGraphiqueActivite();
    attacherEcouteursEvenements();
    
    setInterval(() => {
        etatApplication.secondesEcoulees++;
        mettreAJourMinuteur();
        if (etatApplication.secondesEcoulees % 15 === 0) sauvegarderEtat();
    }, 1000);
}

// Point d'entrée de l'application
chargerEtSynchroniserDonnees();
