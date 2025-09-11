// Fichier : fsrs-helper.js

// La bibliothèque FSRS a été chargée par la balise <script> dans l'HTML.
// Elle est maintenant disponible globalement via l'objet `window.fsrs`.
const { FSRS, Rating } = window.fsrs;

// Paramètres FSRS par défaut, alignés sur votre recherche.
// La cible de rétention (request_retention) est le paramètre le plus important.
const fsrs_params = {
  request_retention: 0.9, // Cible une probabilité de rappel de 90%
  maximum_interval: 36500,
  w: [0.4, 0.6, 2.4, 5.8, 4.93, 0.94, 0.86, 0.01, 1.49, 0.14, 0.94, 2.18, 0.05, 0.34, 1.26, 0.29, 2.61],
};

const scheduler = new FSRS(fsrs_params);

/**
 * Calcule la probabilité de rappel actuelle d'une carte (Retrievability).
 * @param {object} card - La carte avec les propriétés FSRS (stability, last_review).
 * @returns {number} - Une probabilité entre 0 et 1.
 */
export function getRetrievability(card) {
  if (!card || card.state !== 2 /* Review */ || !card.stability || !card.last_review) {
    return 1.0; // Les nouvelles cartes ou cartes en apprentissage ont une R de 1
  }
  const now = new Date();
  const lastReviewDate = new Date(card.last_review);
  const elapsedDays = (now.getTime() - lastReviewDate.getTime()) / (1000 * 60 * 60 * 24);
  
  // Formule de la courbe d'oubli de FSRS
  const retrievability = Math.pow(1 + elapsedDays / (9 * card.stability), -1);
  return retrievability;
}

/**
 * Planifie la prochaine révision d'une carte en utilisant FSRS.
 * @param {object} card - La carte à planifier.
 * @param {number} rating - L'évaluation de l'utilisateur (1:Again, 2:Hard, 3:Good, 4:Easy).
 * @returns {object} - La carte mise à jour avec les nouvelles valeurs FSRS.
 */
export function scheduleCard(card, rating) {
    const now = new Date();
    // FSRS attend un objet 'Card' spécifique. Nous le créons à la volée.
    const fsrsCard = {
        due: card.due ? new Date(card.due) : now,
        stability: card.stability || 0,
        difficulty: card.difficulty || 0,
        elapsed_days: card.elapsed_days || 0,
        scheduled_days: card.scheduled_days || 0,
        reps: card.reps || 0,
        lapses: card.lapses || 0,
        state: card.state || 0, // 0:New, 1:Learning, 2:Review, 3:Relearning
        last_review: card.last_review ? new Date(card.last_review) : null,
    };

    // La magie de FSRS opère ici
    const scheduling_result = scheduler.repeat(fsrsCard, now);
    
    // FSRS retourne les états possibles pour chaque évaluation.
    // Nous sélectionnons celui qui correspond à l'évaluation de l'utilisateur.
    const ratingMap = { 1: Rating.Again, 2: Rating.Hard, 3: Rating.Good, 4: Rating.Easy };
    const selected_rating = ratingMap[rating];
    const new_card_state = scheduling_result[selected_rating];

    // Mettre à jour notre objet carte avec les nouvelles valeurs
    card.due = new_card_state.card.due;
    card.stability = new_card_state.card.stability;
    card.difficulty = new_card_state.card.difficulty;
    card.elapsed_days = new_card_state.card.elapsed_days;
    card.scheduled_days = new_card_state.card.scheduled_days;
    card.reps = new_card_state.card.reps;
    card.lapses = new_card_state.card.lapses;
    card.state = new_card_state.card.state;
    card.last_review = new_card_state.card.last_review;

    return card;
}
