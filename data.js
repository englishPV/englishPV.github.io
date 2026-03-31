/* --- CONSTANTS & CATEGORIES (ANGLAIS) --- */
const CD="Democracy", CG="Genetics", CI="Immigration", CIT="International Relations", CU="Labor", CR="Crime", PC="Capital Punishment", CF="Status of Women";
const HI="HEALTH ISSUES", IF="INDIVIDUAL FREEDOM", IDR="ILLEGAL DRUGS", VI="Verbes Irréguliers", CO="THE CORONAVIRUS CRISIS", ED="EATING DISORDERS";

// Constantes ajoutées pour couvrir les variables de la Map Emoji et la fin du texte brut
const EDU="Education", ECO="Economy", SPO="Sports", GUN="Gun Control", REL="Religion", ENV="Environment", TEC="Technology", MED="Media";
const THA="Thanksgiving", BUS="Business", POL="Politique" , WP="War & Peace", SLM="Sex Love Marriage";
const SSM="Same Sex Marriage";

// NOUVELLE CONSTANTE : SPACE
const SPA="Space";

/* --- MAPPING PHYSIQUE (ORDRE ET NOMS) --- */
const PHY_MAP = {
  // --- Électrocinétique ---
  "EL1": { title: "Electrocinetique Sup", emoji: "🔌" },

  // --- Mécanique ---
  "M1": { title: "M1 - Cinématique du point", emoji: "🚀" },
  "M2": { title: "M2 - Dynamique & Énergétique", emoji: "🎢" },
  "M3": { title: "M3 - Mouvement à force centrale", emoji: "🪐" },
  "M4": { title: "M4 - Mécanique du solide", emoji: "⛸️" },
  
  // --- Optique ---
  "O1": { title: "O1 - Optique Géométrique", emoji: "👓" },
  "O2": { title: "O2 - Intro Interférences", emoji: "〰️" },
  "O3": { title: "O3 - Interférences (Young)", emoji: "🌈" },
  "O4": { title: "O4 - Michelson", emoji: "🔬" },

  // --- Thermodynamique ---
  "THS": { title: "Thermo Sup", emoji: "🔥" },
  "T1": { title: "T1", emoji: "🌡️" },
  "T2": { title: "T2", emoji: "⚙️" },

  // --- Électromagnétisme ---
  "EM1": { title: "EM1 - Symétries & Invariances", emoji: "📐" },
  "EM2": { title: "EM2 - Champ & Potentiel", emoji: "⚡" },
  "EM 3, 4 et 5": { title: "EM3/4/5 - Théorème de Gauss", emoji: "∫" },
  "EM6": { title: "EM6 - Champ Magnétostatique", emoji: "🧲" },
  "EM8": { title: "EM8 - Dipôle Magnétostatique", emoji: "🧭" },
  "EM9": { title: "EM9 - Dipôle Électrostatique", emoji: "⚛️" },
  "EM10": { title: "EM10 - Équations de Maxwell", emoji: "📜" },
  "EM11": { title: "EM11 - Propagation (Vide)", emoji: "💨" },
  "EM12": { title: "EM12 - Énergétique & Poynting", emoji: "🔋" },
  "EM13": { title: "EM13 - Propagation (Conducteurs)", emoji: "🔌" },
  "EM14": { title: "EM14 - Plasmas", emoji: "☀️" },
  "EM15": { title: "EM15 - Rayonnement Dipolaire", emoji: "📡" },

  // --- Physique Moderne & Chimie ---
  "MQ1": { title: "MQ MPI", emoji: "🧩" },
  "CH1": { title: "Reaction Acide Base", emoji: "🧪" },
  
  // --- Divers ---
  "TD1": { title: "TD 02/03", emoji: "📝" }
};

// Fusion des Emojis
const C_EMOJIS = {
  [CD]:  '🗳️', 
  [CIT]: '🌐',   // International Relations
  [IF]:  '🗽',   // Individual Freedom
  [CR]:  '🚔',   // Crime
  [PC]:  '⚖️',   // Capital Punishment
  [GUN]: '🔫',   // Gun Control
  [REL]: '🛐',   // Religion
  [POL]: '🏛️',   // Politique
  [WP]:  '⚔️',
  [SLM]: '❤️',
  [SSM]: '🏳️‍🌈',  // Same Sex Marriage
  [SPA]: '🌌',   // Space (Nouvel Emoji)

  // --- Social & Économie ---
  [CI]:  '🧳',   // Immigration
  [CF]:  '♀️',    // Status of Women
  [CU]:  '💼',   // Labor
  [EDU]: '🎓',   // Education
  [ECO]: '📈',   // Economy
  [SPO]: '🏆',   // Sports
  [BUS]: '💼',   // Business
  [THA]: '🦃',   // Thanksgiving

  // --- Sciences, Santé & Tech ---
  [CG]:  '🧬',   // Genetics
  [HI]:  '🩺',   // Health Issues
  [CO]:  '🦠',   // Coronavirus
  [ED]:  '🍽️',   // Eating Disorders
  [IDR]: '💊',   // Illegal Drugs
  [ENV]: '🌱',   // Environment
  [TEC]: '💻',   // Technology
  [MED]: '📰',   // Media

  // --- Grammaire ---
  [VI]:  '📝'    // Verbes Irréguliers
};

// Ajout des chapitres de physique à l'objet emojis
Object.values(PHY_MAP).forEach(v => C_EMOJIS[v.title] = v.emoji);


const MATH_MAP = {};

// Emojis pour les nouveaux chapitres de maths — les clés doivent correspondre
// EXACTEMENT aux titres "# ..." dans RAW_MATH
const MATH_CHAPTER_EMOJIS = {
  "Espaces vectoriels normés": "🍩",
  "Suites et fonctions de la variable réelle": "📊",
  "Séries numériques": "⛓️",
  "Suites et séries de fonctions": "〰️",
  "Séries entières": "♾️",
  "Intégration sur un intervalle quelconque": "🧱",
  "Intégrales dépendant d'un paramètre": "🎛️",
  "Équations différentielles": "⚙️",
  "Calcul différentiel": "⛰️",
  "Structures algébriques, arithmétique et polynômes": "💍",
  "Algèbre linéaire": "↗️",
  "Réduction des endomorphismes": "↘️",
  "Espaces préhilbertiens et euclidiens": "📐",
  "Endomorphismes des espaces euclidiens": "🔄",
  "Espaces probabilisés": "🎲",
  "Variables aléatoires discrètes": "🎯",
  "Variables aléatoires à densité et variables générales": "📈",
  "Vecteurs aléatoires et théorèmes limites": "🔔"
};
Object.entries(MATH_CHAPTER_EMOJIS).forEach(([k,v]) => C_EMOJIS[k] = v);


/* --- RAW DATA CONTENT --- */

const RAW_MATH = String.raw`

# Séries entières

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Séries entières

**RECTO :** Méthode la plus rapide pour trouver le rayon de convergence de $\sum \frac{n!}{3^n} x^n$ ?

**VERSO :**
**Règle de d'Alembert sur le terme général complet $u_n(x)$.**
On étudie $\lim \left| \frac{u_{n+1}(x)}{u_n(x)} \right| = \lim \frac{n+1}{3} |x|$.
Pour $x \neq 0$, la limite est $+\infty > 1$. Donc $R = 0$.

---

### Carte 2 [M] — Séries entières

**RECTO :** On donne la série entière $\sum \cos(n) x^n$. Comment trouver son rayon de convergence $R$ de tête ?

**VERSO :**
**Encadrement ou "Grand O" + suites bornées.**
La suite $(\cos(n))$ est bornée, donc $R \geq 1$.
De plus, $\cos(n)$ ne tend pas vers 0, donc pour $|x|=1$ le terme général ne tend pas vers 0 (divergence grossière), donc $R \leq 1$. Bilan : $R=1$.

---

### Carte 3 [M] — Séries entières

**RECTO :** Équation différentielle : On cherche une solution DSE $y(x) = \sum a_n x^n$ à $y'' + xy' + y = 0$.
Quelle est la première étape technique après avoir injecté la somme ?

**VERSO :**
**Le changement d'indice** pour factoriser par $x^n$.
$y'' = \sum_{n=2}^{+\infty} n(n-1)a_n x^{n-2} \xrightarrow{k = n-2} \sum_{k=0}^{+\infty} (k+2)(k+1)a_{k+2} x^k$.
On regroupe ensuite tous les termes sous $\sum (\dots) x^n = 0$.

---

### Carte 4 [M] — Séries entières

**RECTO :** Soit $S(x) = \sum a_n x^n$ de rayon $R > 0$. On sait que la série converge en $x = R$.
Comment prouver que $\lim_{x \to R^-} S(x) = S(R)$ ?

**VERSO :**
Il faut justifier que $S$ est **continue** sur $[0, R]$.
On utilise le fait que $\sum a_n x^n$ converge **uniformément** sur $[0, R]$ (souvent démontrable via le Critère Spécial des Séries Alternées appliqué à $u_n(x)$).

---

### Carte 5 [M] — Séries entières

**RECTO :** Trigger : Comment trouver le DSE de la fraction rationnelle $f(x) = \frac{1}{x^2 - 3x + 2}$ ?

**VERSO :**
**Décomposition en éléments simples.**
$f(x) = \frac{1}{1-x} - \frac{1}{2-x} = \frac{1}{1-x} - \frac{1}{2} \frac{1}{1-x/2}$.
On utilise ensuite le DSE connu de $\frac{1}{1-X}$ sur chaque terme, et le rayon final est le minimum des rayons des deux séries.

---

### Carte 6 [M] — Séries entières

**RECTO :** On veut évaluer la somme numérique $\sum_{n=0}^{+\infty} \frac{1}{(2n)!}$. Quel est le réflexe ?

**VERSO :**
**Reconnaître un DSE classique évalué en un point.**
C'est le DSE de $\operatorname{ch}(x) = \sum_{n=0}^{+\infty} \frac{x^{2n}}{(2n)!}$ évalué en $x=1$.
La somme vaut donc $\operatorname{ch}(1)$.

---

### Carte 7 [M] — Séries entières

**RECTO :** On sait qu'une fonction $f$ développable en série entière sur $]-R, R[$ est **paire**. Que peut-on déduire sur ses coefficients $a_n$ ?

**VERSO :**
Tous les coefficients de rang **impair** sont nuls.
$a_{2k+1} = 0$ pour tout $k \in \mathbb{N}$.
La série ne contient que des puissances paires de $x$.

---

### Carte 8 [M] — Séries entières

**RECTO :** Comment trouver le rayon de $\sum \frac{\ln(n)}{n^2} x^n$ en utilisant la règle du $n^\alpha u_n$ ou des majorations simples ?

**VERSO :**
$0 \leq \frac{\ln(n)}{n^2} \leq 1$. Le terme général est borné, donc $R \geq 1$.
Ensuite, pour $x=1$, le terme général ne tend PAS vers 0 (faux, $\ln n/n^2 \to 0$, l'exemple est mauvais !).
*Bon réflexe* : $\frac{\ln(n)}{n^2} \sim \frac{\ln(n)}{n^2}$. Mieux : $\frac{1}{n^2} \leq \frac{\ln n}{n^2} \leq \frac{n}{n^2}$. Les séries associées à $1/n^2$ et $1/n$ ont rayon 1. Donc **$R=1$**.

---

## CARTES THÉORÈME

---

### Carte 9 [T] — Séries entières

**RECTO :** Lemme d'Abel : On sait que la suite numérique $(a_n 2^n)$ est **bornée**.
Que peut-on affirmer sur le rayon de convergence $R$ de $\sum a_n x^n$ et sur la convergence en $x=1$ ?

**VERSO :**
1. $R \geq 2$
2. Comme $1 \in ]-2, 2[$, la série $\sum a_n 1^n$ converge **absolument** (et donc converge).

---

### Carte 10 [T] — Séries entières

**RECTO :** Sur quel ensemble exact une série entière $\sum a_n x^n$ de rayon $R > 0$ converge-t-elle **normalement** ?

**VERSO :**
Sur **tout segment $[-r, r]$** inclus dans $]-R, R[$ (c'est-à-dire pour tout $0 \leq r < R$).
⚠️ *Il n'y a (en général) PAS de convergence normale sur $]-R, R[$ entier.*

---

### Carte 11 [T] — Séries entières

**RECTO :** On a $S(x) = \sum a_n x^n$ sur $]-R, R[$. Quel est le rayon de convergence de la série dérivée $\sum n a_n x^{n-1}$ ?

**VERSO :**
**Exactement le même rayon $R$.**
*(Rappel : on peut dériver terme à terme une infinité de fois à l'intérieur du disque de convergence).*

---

### Carte 12 [T] — Séries entières

**RECTO :** Formule de Taylor pour les Séries Entières.
Si $f(x) = \sum_{n=0}^{+\infty} a_n x^n$ sur $]-R, R[$, comment exprimer les coefficients $a_n$ en fonction de $f$ ?

**VERSO :**
$a_n = \frac{f^{(n)}(0)}{n!}$.
*Corollaire : L'unicité du DSE.*

---

### Carte 13 [T] — Séries entières

**RECTO :** Produit de Cauchy de deux séries entières $\sum a_n x^n$ et $\sum b_n x^n$.
Quelle est l'expression du coefficient $c_n$ de la série produit et que dire du rayon $R_c$ ?

**VERSO :**
$c_n = \sum_{k=0}^n a_k b_{n-k}$
Le rayon $R_c$ vérifie : $R_c \geq \min(R_a, R_b)$.

---

### Carte 14 [T] — Séries entières

**RECTO :** On étudie une série entière complexe $\sum a_n z^n$. Le point $z_0 = 3i$ fait converger la série.
Que peut-on en déduire pour le point $z_1 = -2+i$ ?

**VERSO :**
Par le Lemme d'Abel, comme $|z_0| = 3$, le rayon de convergence $R \geq 3$.
Comme $|z_1| = \sqrt{(-2)^2+1^2} = \sqrt{5} < 3$, la série converge **absolument** en $z_1$.

---

## CARTES CALCUL

---

### Carte 15 [C] — Séries entières

**RECTO :** Développement en Série Entière (DSE) de $(1+x)^\alpha$ ($\alpha \notin \mathbb{N}$) ? (Formule et Rayon)

**VERSO :**
$(1+x)^\alpha = 1 + \sum_{n=1}^{+\infty} \frac{\alpha(\alpha-1)\dots(\alpha-n+1)}{n!} x^n$
Rayon de convergence : **$R = 1$**.

---

### Carte 16 [C] — Séries entières

**RECTO :** Développement en Série Entière de $\ln(1+x)$ ? (Formule et Rayon)

**VERSO :**
$\ln(1+x) = \sum_{n=1}^{+\infty} \frac{(-1)^{n-1}}{n} x^n$
Rayon de convergence : **$R = 1$**.

---

### Carte 17 [C] — Séries entières

**RECTO :** Formule inverse : À quelle fonction correspond $\sum_{n=0}^{+\infty} \frac{(-1)^n x^{2n+1}}{2n+1}$ ? (Et pour quel $x$ ?)

**VERSO :**
C'est le DSE de **$\text{Arctan}(x)$**.
Valable pour $x \in ]-1, 1[$.

---

### Carte 18 [C] — Séries entières

**RECTO :** Reconnaissance de somme : À quelle fonction correspond la série $\sum_{n=1}^{+\infty} n x^n$ pour $|x|<1$ ?

**VERSO :**
On sort le $x$ : $x \sum_{n=1}^{+\infty} n x^{n-1}$.
On reconnaît la dérivée de $\frac{1}{1-x}$.
Résultat : $x \cdot \frac{1}{(1-x)^2} = \frac{x}{(1-x)^2}$.

---

### Carte 19 [C] — Séries entières

**RECTO :** Différence entre les DSE de $\cos(x)$ et $\operatorname{ch}(x)$ ? (Formules et Rayons)

**VERSO :**
- $\cos(x) = \sum_{n=0}^{+\infty} (-1)^n \frac{x^{2n}}{(2n)!}$
- $\operatorname{ch}(x) = \sum_{n=0}^{+\infty} \frac{x^{2n}}{(2n)!}$
Tous deux ont un rayon $R = +\infty$.

---

### Carte 20 [C] — Séries entières

**RECTO :** Formule de reconnaissance : Si on intègre le DSE de $\frac{1}{1+x^2}$, quelle fonction obtient-on ?

**VERSO :**
$\frac{1}{1+x^2} = \sum_{n=0}^{+\infty} (-1)^n x^{2n}$ ($R=1$).
En intégrant (terme à terme sur $]-1,1[$), on retrouve **$\text{Arctan}(x)$**.

---

## CARTES PIÈGE

---

### Carte 21 [P] — Séries entières

**RECTO :** VRAI ou FAUX ? (Erreur de calcul classique)
"Pour trouver le rayon de $\sum 3^n x^{2n}$, je fais d'Alembert sur $a_n = 3^n$. J'obtiens $1/R = 3$, donc $R = 1/3$."

**VERSO :**
**FAUX !** Il y a un piège (série lacunaire en $x^{2n}$).
Il faut appliquer d'Alembert sur $u_n(x) = 3^n x^{2n}$ :
$|u_{n+1}(x) / u_n(x)| = 3 |x|^2$. Il y a convergence si $3 |x|^2 < 1 \iff |x| < \frac{1}{\sqrt{3}}$. Le vrai rayon est $R = \frac{1}{\sqrt{3}}$.

---

### Carte 22 [P] — Séries entières

**RECTO :** VRAI ou FAUX ? (Rapport de jury CCINP)
"Si on sait que $a_n \sim \frac{1}{n}$, alors les séries $\sum a_n x^n$ et $\sum \frac{x^n}{n}$ ont même rayon de convergence ET même somme sur $]-1,1[$."

**VERSO :**
**FAUX !**
Elles ont le même rayon de convergence ($R=1$), c'est vrai. Mais leurs sommes sont **différentes** en général ! Un équivalent ne permet JAMAIS d'égaler des sommes de séries.

---

### Carte 23 [P] — Séries entières

**RECTO :** VRAI ou FAUX ? (Erreur CCINP classique)
"Si $a_n = O(b_n)$, alors le rayon de convergence de $\sum a_n x^n$ est inférieur ou égal à celui de $\sum b_n x^n$ ($R_a \leq R_b$)."

**VERSO :**
**FAUX ! C'est l'inverse ($R_a \geq R_b$).**
Puisque $a_n$ est "plus petit" que $b_n$, la série $\sum a_n x^n$ converge *plus facilement*, donc son domaine de convergence est plus grand (ou égal).

---

### Carte 24 [P] — Séries entières

**RECTO :** VRAI ou FAUX ?
"La série entière $\sum a_n x^n$ a pour rayon de convergence $R$. La série converge sur $]-R, R[$ et diverge sur $]-\infty, -R[ \cup ]R, +\infty[$. Il me reste juste à étudier la convergence en $x=R$ pour avoir l'ensemble de définition complet."

**VERSO :**
**FAUX !** (Oubli classique).
Il faut étudier les **DEUX bords** : $x = R$ et $x = -R$. Leurs natures peuvent être complètement indépendantes (ex: $\ln(1+x)$ converge en 1 mais diverge en -1).

---

### Carte 25 [P] — Séries entières

**RECTO :** VRAI ou FAUX ?
"$f$ est de classe $\mathcal{C}^\infty$ sur $]-R, R[$, donc d'après le théorème de Taylor, elle est développable en série entière."

**VERSO :**
**FAUX !** (Contre-exemple classique de Cauchy).
Être $\mathcal{C}^\infty$ est une condition nécessaire mais **pas suffisante**. Il faut que le reste de Taylor tende vers 0 (souvent prouvé via une majoration des dérivées successives).

---

# Intégration sur un intervalle quelconque

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Intégration

**RECTO :** Trigger : On doit justifier l'intégration terme à terme de $\sum e^{-n x^2}$ sur $]0, +\infty[$. Les fonctions sont **positives**. Quel argument ultra-rapide utiliser ?

**VERSO :**
**Le corollaire du TCM (Théorème de Convergence Monotone) pour les séries.**
Si les $f_n$ sont **positives** (et continues par morceaux), on a le droit d'écrire $\int \sum f_n = \sum \int f_n$. (Si la série diverge, l'intégrale vaut $+\infty$).

---

### Carte 2 [M] — Intégration

**RECTO :** Nature de l'intégrale impropre $\int_1^{+\infty} \frac{t^2 - t + 1}{t^4 + \ln t} dt$ ?

**VERSO :**
**Équivalent + Positivité.**
$f(t) \sim_{+\infty} \frac{t^2}{t^4} = \frac{1}{t^2} > 0$.
Par le critère d'équivalence pour les fonctions de **signe constant**, l'intégrale a la même nature que $\int_1^{+\infty} \frac{1}{t^2} dt$, qui converge (Riemann $\alpha=2 > 1$).

---

### Carte 3 [M] — Intégration

**RECTO :** On étudie $F(x) = \int_0^{+\infty} e^{-xt} dt$ sur $]0, +\infty[$.
Comment trouver une fonction de domination pour la continuité ? (Le sup sur $]0, +\infty[$ ne marche pas).

**VERSO :**
**Domination sur TOUT segment $[a,b] \subset ]0, +\infty[$.**
Soit $[a,b] \subset ]0, +\infty[$. Pour tout $x \in [a,b]$, on a $|e^{-xt}| \leq e^{-at} = \varphi(t)$.
La fonction $\varphi$ est intégrable sur $]0, +\infty[$ (car $a > 0$). Donc $F$ est continue sur tout segment, donc sur $]0, +\infty[$.

---

### Carte 4 [M] — Intégration

**RECTO :** Intégration par parties (IPP) pour calculer $\int_0^{+\infty} t e^{-t} dt$.
Quelle est la seule rédaction rigoureuse autorisée au concours ?

**VERSO :**
**Faire l'IPP sur un segment $[0, X]$ PUIS passer à la limite.**
$\int_0^X t e^{-t} dt = \left[-t e^{-t}\right]_0^X - \int_0^X (-e^{-t}) dt$.
Ensuite on fait tendre $X \to +\infty$ en justifiant l'existence des limites.
*(Écrire les crochets $\infty$ directement est lourdement sanctionné si non justifié)*.

---

### Carte 5 [M] — Intégration

**RECTO :** Convergence de $\int_1^{+\infty} \frac{\sin(t)}{t^2} dt$ ? (Trigger : "Fonction qui oscille + décroissance forte").

**VERSO :**
**Majoration et absolue convergence.**
$|\frac{\sin(t)}{t^2}| \leq \frac{1}{t^2}$.
Or $\int_1^{+\infty} \frac{1}{t^2} dt$ converge (Riemann, $\alpha=2 > 1$). L'intégrale est absolument convergente, donc convergente.

---

### Carte 6 [M] — Intégration

**RECTO :** Trigger : Face à l'intégrale de Dirichlet $\int_1^{+\infty} \frac{\sin(t)}{t} dt$ (qui ne converge pas absolument). Quel est le réflexe ?

**VERSO :**
**Intégration par parties.**
On intègre $\sin(t)$ et on dérive $1/t$.
On obtient un crochet convergent et une intégrale en $\int \frac{\cos(t)}{t^2} dt$ qui converge absolument (majorée par $1/t^2$).

---

### Carte 7 [M] — Intégration

**RECTO :** Comment dériver une intégrale à bornes variables $F(x) = \int_0^{x^2} \sin(t^2) dt$ ?

**VERSO :**
**Utiliser le Théorème Fondamental de l'Analyse et les fonctions composées.**
Soit $G$ une primitive de $t \mapsto \sin(t^2)$.
$F(x) = G(x^2) - G(0)$.
On dérive : $F'(x) = 2x G'(x^2) = 2x \sin(x^4)$.

---

### Carte 8 [M] — Intégration

**RECTO :** Changement de variable dans une intégrale impropre : $u = \varphi(t)$.
Quelles sont les 2 conditions requises sur $\varphi$ ?

**VERSO :**
La fonction $\varphi$ doit être :
1. De classe $\mathcal{C}^1$.
2. **Strictement monotone** (c'est-à-dire une bijection) sur l'intervalle d'intégration.

---

## CARTES THÉORÈME

---

### Carte 9 [T] — Intégration

**RECTO :** Quelles sont les **3 hypothèses** du Théorème de Convergence Dominée (TCD) pour une suite de fonctions $(f_n)$ sur un intervalle $I$ ?

**VERSO :**
1. Les $f_n$ sont continues par morceaux sur $I$.
2. $(f_n)$ converge simplement vers une fonction $f$ (Cpm sur $I$).
3. **Domination** : Il existe $\varphi$ **intégrable, positive et indépendante de $n$** telle que $\forall n, \forall x \in I, |f_n(x)| \leq \varphi(x)$.

---

### Carte 10 [T] — Intégration

**RECTO :** Que conclut le Théorème de Convergence Dominée (TCD) si ses hypothèses sont vérifiées ?

**VERSO :**
1. La limite $f$ est **intégrable** sur $I$.
2. On peut intervertir limite et intégrale : $\lim_{n \to +\infty} \int_I f_n(t) dt = \int_I f(t) dt$.

---

### Carte 11 [T] — Intégration

**RECTO :** Intégration terme à terme pour $\sum f_n$ (ITT). Quelle est l'hypothèse cruciale (en plus de la continuité par morceaux de $f_n$ et de la CVS) ?

**VERSO :**
La série des intégrales des valeurs absolues **converge** :
$\sum \left( \int_I |f_n(t)| dt \right) < +\infty$
*(Remarque : Sur EVN, on utilise l'intégrale de la norme $\|f_n(t)\|$).*

---

### Carte 12 [T] — Intégration

**RECTO :** Continuité d'une intégrale à paramètre $F(x) = \int_I f(x,t) dt$ sur un intervalle $J$.
Quelles sont les 3 hypothèses sur $f$ ?

**VERSO :**
1. $\forall x \in J, t \mapsto f(x,t)$ est continue par morceaux sur $I$.
2. $\forall t \in I, x \mapsto f(x,t)$ est continue sur $J$.
3. **Domination** : $\exists \varphi$ **intégrable sur $I$** telle que $\forall (x,t) \in J \times I, |f(x,t)| \leq \varphi(t)$.

---

### Carte 13 [T] — Intégration

**RECTO :** Dérivation sous le signe somme (Leibniz) : Quelles hypothèses pour que $F(x) = \int_I f(x,t) dt$ soit de classe $\mathcal{C}^1$ sur $J$ ?

**VERSO :**
1. $t \mapsto f(x,t)$ intégrable sur $I$
2. $x \mapsto f(x,t)$ de classe $\mathcal{C}^1$ sur $J$
3. $t \mapsto \frac{\partial f}{\partial x}(x,t)$ Cpm sur $I$
4. **Domination locale de la dérivée** : $|\frac{\partial f}{\partial x}(x,t)| \leq \varphi(t)$ intégrable sur $I$.

---

### Carte 14 [T] — Intégration

**RECTO :** Théorème de Fubini pour l'interversion de deux séries / intégrales : que suffit-il de vérifier pour l'appliquer sans calculer les deux sommes ?

**VERSO :**
Que l'intégrale/somme double de la **VALEUR ABSOLUE** converge.
*Ex: $\int (\int |f(x,y)| dx) dy < +\infty$ ou $\sum (\int |f_n(x)| dx) < +\infty$.*
Si c'est le cas, on peut intervertir l'ordre d'intégration/sommation sur la fonction sans valeur absolue.

---

## CARTES CALCUL

---

### Carte 15 [C] — Intégration

**RECTO :** Critère de Riemann en l'infini : À quelle condition l'intégrale $\int_1^{+\infty} \frac{1}{t^\alpha} dt$ converge-t-elle ?

**VERSO :**
Converge si et seulement si **$\alpha > 1$**.

---

### Carte 16 [C] — Intégration

**RECTO :** Critère de Riemann en ZÉRO : À quelle condition l'intégrale $\int_0^1 \frac{1}{t^\alpha} dt$ converge-t-elle ?

**VERSO :**
Converge si et seulement si **$\alpha < 1$**.
*(Astuce mnémotechnique : en 0, le problème est "petit", donc $\alpha$ doit être "petit" c-à-d < 1).*

---

### Carte 17 [C] — Intégration

**RECTO :** Qu'est-ce que la fonction Gamma ($\Gamma$) et quelle est sa valeur pour $n \in \mathbb{N}^*$ ?

**VERSO :**
$\Gamma(x) = \int_0^{+\infty} t^{x-1} e^{-t} dt$ (définie pour $x > 0$).
Pour un entier $n \geq 1$ : **$\Gamma(n) = (n-1)!$**
*(Corollaire : $\int_0^{+\infty} t^n e^{-t} dt = n!$)*

---

### Carte 18 [C] — Intégration

**RECTO :** Valeur de l'intégrale de Gauss $\int_{-\infty}^{+\infty} e^{-t^2} dt$ ?

**VERSO :**
**$\sqrt{\pi}$**
*(Note : l'intégrale sur $[0, +\infty[$ vaut $\frac{\sqrt{\pi}}{2}$ par parité).*

---

### Carte 19 [C] — Intégration

**RECTO :** Comparaison avec un Grand $O$ pour les intégrales.
Si $f(t) = O(g(t))$ en $+\infty$, quelles sont les 2 hypothèses sur $g$ pour conclure que $\int f$ est absolument convergente ?

**VERSO :**
1. $g$ doit être de **signe constant** (souvent $g \geq 0$).
2. L'intégrale $\int g(t) dt$ doit être **convergente**.

---

## CARTES PIÈGE

---

### Carte 20 [P] — Intégration

**RECTO :** VRAI ou FAUX ?
"Pour appliquer le TCD à $f_n(x) = e^{-nx}$ sur $]0, +\infty[$, je majore par $\varphi_n(x) = e^{-x}$. C'est intégrable, donc je conclus."

**VERSO :**
**FAUX !**
La fonction de domination $\varphi$ doit IMPÉRATIVEMENT être **indépendante de $n$**. (Ici, on garde juste $\varphi(x) = e^{-x}$ car $\forall n \geq 1, e^{-nx} \leq e^{-x}$).

---

### Carte 21 [P] — Intégration

**RECTO :** VRAI ou FAUX ? (Rapport de jury CCINP : "trouver un résultat absurde sans esprit critique")
"On calcule l'intégrale $\int_{-1}^1 \frac{1}{x^2} dx = \left[-\frac{1}{x}\right]_{-1}^1 = -1 - 1 = -2$."

**VERSO :**
**FAUX !**
La fonction $\frac{1}{x^2}$ est **positive**, son intégrale ne peut pas être strictement négative.
*Erreur* : La fonction n'est pas continue en 0. C'est une intégrale impropre divergente en 0. On ne peut pas "primitiver" brutalement.

---

### Carte 22 [P] — Intégration

**RECTO :** VRAI ou FAUX ?
"$f(t) = \frac{\sin t}{t} \sim_0 1$. Donc par équivalence avec une constante, l'intégrale diverge en 0."

**VERSO :**
**FAUX !** (Erreur grossière).
$f$ est prolongeable par continuité en 0. C'est donc une **fausse intégrale impropre** en 0 : elle converge (c'est une intégrale de Riemann classique sur un segment).

---

### Carte 23 [P] — Intégration

**RECTO :** VRAI ou FAUX ? (Erreur rapport CCINP sur les limites)
"On sait que $f \geq 0$ et on a montré que $\int_0^x f(t)dt \leq M$. Donc par le théorème des gendarmes, $\lim_{x \to +\infty} \int_0^x f(t) dt$ existe."

**VERSO :**
**FAUX !** (Manque l'argument de monotonie).
*Bonne rédaction* : Soit $F(x) = \int_0^x f(t)dt$. Comme $f \geq 0$, $F$ est **croissante**. De plus $F$ est **majorée** par $M$. D'après le théorème de la limite monotone, $F$ admet une limite finie en $+\infty$.

---

### Carte 24 [P] — Intégration

**RECTO :** VRAI ou FAUX ?
"Si $f$ est intégrable sur $[0, +\infty[$, alors on a nécessairement $\lim_{x \to +\infty} f(x) = 0$."

**VERSO :**
**FAUX !** (Piège très classique).
L'intégrabilité n'implique **aucune** limite en $+\infty$.
*(Contre-exemple : une fonction nulle partout sauf des pics triangulaires de hauteur 1 et de base $1/n^2$ sur chaque entier $n$)*.

---

### Carte 25 [P] — Intégration

**RECTO :** VRAI ou FAUX ?
"Si $\int_0^{+\infty} f(t) dt$ converge, et si $f$ admet une limite $\ell$ en $+\infty$, alors $\ell$ peut valoir $2$."

**VERSO :**
**FAUX !**
Si l'intégrale converge ET si $f$ admet une limite en l'infini, alors cette limite est **obligatoirement nulle** ($\ell = 0$). Sinon, $f(t) \sim \ell$ et l'intégrale divergerait.

---

# Structures algébriques, arithmétique et polynômes

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Structures algébriques

**RECTO :** Trigger : On te demande de prouver que $E = \{a + b\sqrt{2} \mid a,b \in \mathbb{Z}\}$ muni de $+$ et $\times$ est un anneau. Quel est le réflexe absolu ?

**VERSO :**
**Ne jamais vérifier les 8 axiomes d'un anneau !**
On montre que $E$ est un **sous-anneau** d'un anneau connu de référence (ici $\mathbb{R}$ ou $\mathbb{C}$).

---

### Carte 2 [M] — Structures algébriques

**RECTO :** Soit $f : (G, *) \to (G', \star)$ un morphisme de groupes. Comment prouver que $f$ est **injectif** de manière optimale ?

**VERSO :**
On montre que son **noyau est réduit à l'élément neutre** de $G$ :
$\ker(f) = \{ e_G \}$.
*(Rappel : $\ker(f) = \{ x \in G \mid f(x) = e_{G'} \}$)*.

---

### Carte 3 [M] — Structures algébriques

**RECTO :** Comment prouver de façon abstraite qu'un anneau $A$ est **intègre** ?

**VERSO :**
On prend deux éléments $a,b \in A$ tels que $ab = 0_A$.
On suppose que $a \neq 0_A$, et on démontre rigoureusement que $b = 0_A$.

---

### Carte 4 [M] — Structures algébriques

**RECTO :** Trigger : Résoudre l'équation $5x \equiv 1 \pmod 7$ dans $\mathbb{Z}$.

**VERSO :**
**Utiliser Bézout.**
5 et 7 sont premiers entre eux. On cherche une relation $5u + 7v = 1$.
Évident : $5 \times 3 - 7 \times 2 = 1 \implies 5 \times 3 = 1 + 7 \times 2 \implies 5 \times 3 \equiv 1 \pmod 7$.
Donc $x \equiv 3 \pmod 7$.

---

### Carte 5 [M] — Structures algébriques

**RECTO :** Quel est le sous-groupe engendré par $12$ et $18$ dans $\mathbb{Z}$ (c-à-d $12\mathbb{Z} + 18\mathbb{Z}$) ?

**VERSO :**
L'ensemble $a\mathbb{Z} + b\mathbb{Z}$ est égal à **$\operatorname{pgcd}(a,b)\mathbb{Z}$**.
Ici, $\operatorname{pgcd}(12, 18) = 6$, donc le sous-groupe est **$6\mathbb{Z}$**.

---

### Carte 6 [M] — Structures algébriques

**RECTO :** Comment justifier rapidement que $(\mathbb{Z}/17\mathbb{Z}, +, \times)$ est un corps ?

**VERSO :**
$\mathbb{Z}/n\mathbb{Z}$ est un corps si et seulement si **$n$ est un nombre premier**.
Comme 17 est premier, c'est un corps (tout élément non nul est inversible).

---

## CARTES THÉORÈME

---

### Carte 7 [T] — Structures algébriques

**RECTO :** Quelles sont les **3 conditions exactes** pour montrer que $A$ est un sous-anneau d'un anneau $(B, +, \times)$ ?

**VERSO :**
1. $1_B \in A$ (Le neutre multiplicatif est dedans).
2. Stabilité par soustraction : $\forall x,y \in A, x - y \in A$.
3. Stabilité par produit : $\forall x,y \in A, x \times y \in A$.

---

### Carte 8 [T] — Structures algébriques

**RECTO :** Quelles sont les conditions pour qu'une partie $I$ soit un **idéal** (à gauche) d'un anneau $(A, +, \times)$ ?

**VERSO :**
1. $I$ est un sous-groupe de $(A, +)$ (c-à-d $0_A \in I$ et $\forall x,y \in I, x-y \in I$).
2. **Propriété absorbante** : $\forall a \in A, \forall x \in I, a \times x \in I$.

---

### Carte 9 [T] — Structures algébriques

**RECTO :** Qu'énonce le théorème de Bézout pour deux entiers $a$ et $b$ ? (Hypothèse et conclusion exactes).

**VERSO :**
Les entiers $a$ et $b$ sont **premiers entre eux** ($\operatorname{pgcd}(a,b) = 1$)
$\iff$
Il existe $(u,v) \in \mathbb{Z}^2$ tels que **$au + bv = 1$**.

---

### Carte 10 [T] — Structures algébriques

**RECTO :** Qu'énonce le théorème de Gauss pour trois entiers $a, b, c$ ?

**VERSO :**
Si $a$ divise $bc$ **ET** $a$ est premier avec $b$ ($\operatorname{pgcd}(a,b)=1$),
**ALORS** $a$ divise $c$.

---

### Carte 11 [T] — Structures algébriques

**RECTO :** Que dit le lemme d'Euclide pour un nombre premier $p$ et deux entiers $a, b$ ?

**VERSO :**
Si $p$ est un nombre premier et si $p$ divise le produit $ab$,
alors $p$ divise $a$ **OU** $p$ divise $b$.

---

### Carte 12 [T] — Structures algébriques

**RECTO :** Comment caractérise-t-on TOUS les sous-groupes de $(\mathbb{Z}, +)$ ?

**VERSO :**
Ce sont exactement les ensembles de la forme **$n\mathbb{Z}$** (l'ensemble des multiples de $n$), pour $n \in \mathbb{N}$.

---

### Carte 13 [T] — Structures algébriques

**RECTO :** Théorème de Lagrange : Soit $G$ un groupe fini et $H$ un sous-groupe de $G$. Quel lien y a-t-il entre le cardinal de $H$ et celui de $G$ ?

**VERSO :**
Le cardinal de $H$ **divise** le cardinal de $G$.
*Corollaire : Pour tout élément $x \in G$, l'ordre de $x$ divise le cardinal de $G$.*

---

## CARTES CALCUL

---

### Carte 14 [C] — Structures algébriques

**RECTO :** On écrit la division euclidienne de $a$ par $b \neq 0$ dans $\mathbb{Z}$ : $a = bq + r$.
Quelle est la condition STRICTE sur le reste $r$ ?

**VERSO :**
**$0 \leq r < |b|$**

---

### Carte 15 [C] — Structures algébriques

**RECTO :** Que dit le Petit Théorème de Fermat pour un nombre premier $p$ et un entier $a$ ? (2 formulations).

**VERSO :**
1. Pour tout entier $a$ : $a^p \equiv a \pmod p$.
2. Si $a$ n'est pas un multiple de $p$ (c-à-d $p$ ne divise pas $a$) : $a^{p-1} \equiv 1 \pmod p$.

---

### Carte 16 [C] — Structures algébriques

**RECTO :** Dans l'ensemble $\mathbb{Z}/n\mathbb{Z}$, à quelle condition stricte une classe $\overline{k}$ est-elle inversible pour la multiplication ?

**VERSO :**
$\overline{k}$ est inversible si et seulement si **$k$ et $n$ sont premiers entre eux** ($\operatorname{pgcd}(k,n) = 1$).

---

### Carte 17 [C] — Structures algébriques

**RECTO :** Formule de simplification du PGCD : si $\operatorname{pgcd}(a,b) = 1$, que vaut $\operatorname{pgcd}(a^n, b^m)$ pour $n,m \in \mathbb{N}^*$ ?

**VERSO :**
**Il vaut 1.**
(C'est une conséquence du théorème de Bézout : si $a$ et $b$ n'ont aucun facteur premier commun, aucune de leurs puissances n'en aura).

---

## CARTES PIÈGE

---

### Carte 18 [P] — Structures algébriques

**RECTO :** VRAI ou FAUX ? (Rapport de jury)
"Pour prouver que $H$ est un sous-groupe de $(G, *)$, je prends $x,y \in H$ et je montre que $x * y^{-1} \in H$."

**VERSO :**
**FAUX ! (Il manque une condition vitale).**
L'oubli de montrer que **$H$ est non vide** (en justifiant généralement que l'élément neutre $e \in H$) est lourdement sanctionné.

---

### Carte 19 [P] — Structures algébriques

**RECTO :** VRAI ou FAUX ?
"$I$ est un idéal de l'anneau $A$. Comme c'est un sous-anneau particulier, on a $1_A \in I$."

**VERSO :**
**FAUX !**
Si un idéal contient $1_A$, la propriété absorbante implique que pour tout $a \in A$, $a \times 1_A = a \in I$. Donc **$I = A$ tout entier**. (Un idéal strict ne contient JAMAIS $1_A$).

---

### Carte 20 [P] — Structures algébriques

**RECTO :** VRAI ou FAUX ?
"Dans l'anneau $\mathbb{Z}/6\mathbb{Z}$, on a $2x = 2y \implies x = y$ en simplifiant par 2."

**VERSO :**
**FAUX !**
On ne peut simplifier que par un élément **régulier** (qui n'est pas un diviseur de zéro). Or dans $\mathbb{Z}/6\mathbb{Z}$, $2 \times 3 = 0$.
*Contre-exemple : $2 \times 3 = 2 \times 0$ mais $3 \neq 0$.*

---

### Carte 21 [P] — Structures algébriques

**RECTO :** VRAI ou FAUX ? (Erreur très classique)
"J'ai trouvé $u,v \in \mathbb{Z}$ tels que $3u + 6v = 3$. D'après Bézout, on en déduit que $\operatorname{pgcd}(3,6) = 3$."

**VERSO :**
**FAUX !** (La rédaction est fausse).
L'égalité $au+bv = d$ implique seulement que le pgcd **divise** $d$.
*L'équivalence avec le pgcd n'est vraie que si l'égalité vaut 1.* (Ici on sait juste que le pgcd divise 3).

---

### Carte 22 [P] — Structures algébriques

**RECTO :** VRAI ou FAUX ?
"La division euclidienne de $-17$ par $5$ donne un quotient de $-3$ et un reste de $-2$, car $-17 = 5 \times (-3) - 2$."

**VERSO :**
**FAUX !**
Le reste doit obligatoirement être positif ou nul.
La bonne division euclidienne est : $-17 = 5 \times (-4) + 3$ (quotient $-4$, reste $3$).

---

# Espaces préhilbertiens et euclidiens

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Espaces euclidiens

**RECTO :** Comment démontrer rigoureusement la propriété "définie" d'un produit scalaire comme $\langle f, f \rangle = \int_0^1 f(t)^2 dt = 0 \implies f = 0$ pour $f$ continue ?

**VERSO :**
**Théorème de positivité de l'intégrale.**
L'intégrale d'une fonction **continue**, **positive** ($f(t)^2 \geq 0$), qui est nulle, implique que la fonction est identiquement nulle sur $[0,1]$.

---

### Carte 2 [M] — Espaces euclidiens

**RECTO :** Trigger : On te demande de calculer $\inf_{(a,b) \in \mathbb{R}^2} \int_0^1 (t^2 - at - b)^2 dt$. Quel est le réflexe absolu ?

**VERSO :**
**Distance à un sous-espace vectoriel !**
On cherche le carré de la distance entre la fonction $f(t) = t^2$ et le sous-espace $F = \text{Vect}(t \mapsto t, t \mapsto 1)$.
La solution est donnée par la projection orthogonale de $f$ sur $F$.

---

### Carte 3 [M] — Espaces euclidiens

**RECTO :** Algorithme de Gram-Schmidt : On a $(e_1, e_2)$ libre. On pose $\varepsilon_1 = e_1$.
Quelle est la formule brute pour construire un vecteur $u_2$ orthogonal à $\varepsilon_1$ ?

**VERSO :**
On soustrait à $e_2$ sa projection orthogonale sur $\varepsilon_1$ :
$u_2 = e_2 - \frac{\langle e_2, \varepsilon_1 \rangle}{\|\varepsilon_1\|^2} \varepsilon_1$.
*(Il suffira ensuite de normaliser $u_2$ pour avoir la BON).*

---

### Carte 4 [M] — Espaces euclidiens

**RECTO :** Comment démontrer matriciellement que des sous-espaces propres d'une matrice symétrique réelle sont orthogonaux ?

**VERSO :**
On prend $X \in E_\lambda$ et $Y \in E_\mu$ (avec $\lambda \neq \mu$).
On calcule $X^T S Y$ de deux manières :
$X^T (S Y) = \mu X^T Y$ et $(X^T S) Y = (S X)^T Y = \lambda X^T Y$.
Donc $(\lambda - \mu) X^T Y = 0 \implies X^T Y = 0$.

---

### Carte 5 [M] — Espaces euclidiens

**RECTO :** On a une matrice symétrique $S$. Comment prouver qu'elle est définie positive (SDP) en utilisant ses valeurs propres ?

**VERSO :**
Une matrice symétrique est Définie Positive $\iff$ **Toutes ses valeurs propres sont strictement positives ($\lambda_i > 0$).**

---

### Carte 6 [M] — Espaces euclidiens

**RECTO :** Trigger : Comment vérifier très rapidement qu'une matrice $3 \times 3$ sans paramètres appartient à $\mathcal{O}_3(\mathbb{R})$ ?

**VERSO :**
On vérifie que **la norme de chaque colonne vaut 1**, et que les **produits scalaires croisés** entre les colonnes font **0**. (Les colonnes forment une BON).

---

### Carte 7 [M] — Espaces euclidiens

**RECTO :** On a un endomorphisme $u$ défini par sa matrice $A$ dans une base **orthonormale**. Comment s'écrit la matrice de l'adjoint $u^*$ dans cette même base ?

**VERSO :**
C'est la **transposée** : $\text{Mat}(u^*) = A^T$.
*(Attention : cela n'est vrai QUE parce que la base est orthonormale).*

---

## CARTES THÉORÈME

---

### Carte 8 [T] — Espaces euclidiens

**RECTO :** Inégalité de Cauchy-Schwarz : Que peut-on écrire pour l'intégrale $\left( \int_a^b f(t)g(t) dt \right)^2$ ?

**VERSO :**
$\left( \int_a^b f(t)g(t) dt \right)^2 \leq \left( \int_a^b f(t)^2 dt \right) \times \left( \int_a^b g(t)^2 dt \right)$.
*(En notation abstraite : $|\langle x, y \rangle| \leq \|x\| \cdot \|y\|$).*

---

### Carte 9 [T] — Espaces euclidiens

**RECTO :** À quelle condition stricte a-t-on l'ÉGALITÉ dans l'inégalité de Cauchy-Schwarz $|\langle x, y \rangle| = \|x\| \cdot \|y\|$ ?

**VERSO :**
Si et seulement si les vecteurs $x$ et $y$ sont **colinéaires**.

---

### Carte 10 [T] — Espaces euclidiens

**RECTO :** Définition d'un endomorphisme symétrique $u \in \mathcal{L}(E)$ via le produit scalaire ?

**VERSO :**
Pour tous vecteurs $x, y \in E$ :
**$\langle u(x), y \rangle = \langle x, u(y) \rangle$**

---

### Carte 11 [T] — Espaces euclidiens

**RECTO :** Théorème Spectral (version matricielle) : Que peut-on dire de toute matrice symétrique RÉELLE $S \in \mathcal{S}_n(\mathbb{R})$ ?

**VERSO :**
Elle est **diagonalisable** dans une base **orthonormale**.
Il existe $P \in \mathcal{O}_n(\mathbb{R})$ (matrice orthogonale) et $D$ diagonale telles que $S = P D P^T$.

---

### Carte 12 [T] — Espaces euclidiens

**RECTO :** Quelles sont les deux caractérisations d'une matrice orthogonale $M \in \mathcal{O}_n(\mathbb{R})$ ?

**VERSO :**
1. $M^T M = I_n$ (ou $M M^T = I_n$).
2. Les colonnes (ou lignes) de $M$ forment une **Base OrthoNormale** (BON) de $\mathbb{R}^n$.

---

### Carte 13 [T] — Espaces euclidiens

**RECTO :** Qu'est-ce qu'une **isométrie vectorielle** (ou automorphisme orthogonal) $f \in \mathcal{L}(E)$ ?

**VERSO :**
C'est un endomorphisme qui **conserve la norme** :
$\forall x \in E, \|f(x)\| = \|x\|$.
*(Conséquence : il conserve aussi le produit scalaire $\langle f(x), f(y) \rangle = \langle x, y \rangle$)*.

---

### Carte 14 [T] — Espaces euclidiens

**RECTO :** Polynômes orthogonaux (classique CCINP) : Soit $(P_n)$ une famille de polynômes orthogonaux pour un produit scalaire du type $\int_a^b P(t)Q(t)w(t)dt$.
Que sait-on des racines de $P_n$ ?

**VERSO :**
$P_n$ admet exactement **$n$ racines réelles, distinctes**, et toutes situées **dans l'intervalle $]a,b[$**.

---

### Carte 15 [T] — Espaces euclidiens

**RECTO :** Identité de polarisation : Comment retrouver le produit scalaire $\langle x, y \rangle$ uniquement à l'aide de la norme euclidienne $\|\cdot\|$ ?

**VERSO :**
$\langle x, y \rangle = \frac{1}{2} \left( \|x+y\|^2 - \|x\|^2 - \|y\|^2 \right)$.
*(Utile pour prouver qu'une isométrie conserve le produit scalaire).*

---

## CARTES CALCUL

---

### Carte 16 [C] — Espaces euclidiens

**RECTO :** Formule de la projection orthogonale $p_F(x)$ sur un sous-espace $F$, sachant qu'on possède une Base OrthoNormale (BON) $(e_1, \dots, e_k)$ de $F$ ?

**VERSO :**
$p_F(x) = \sum_{i=1}^k \langle x, e_i \rangle e_i$
⚠️ *Attention : La base doit IMPÉRATIVEMENT être orthonormale (ou au moins orthogonale en divisant par $\|e_i\|^2$).*

---

### Carte 17 [C] — Espaces euclidiens

**RECTO :** Soit $p_F(x)$ la projection orthogonale de $x$ sur $F$.
Quelle est la formule du théorème de Pythagore reliant $x$, $p_F(x)$ et la distance $d(x, F)$ ?

**VERSO :**
$\|x\|^2 = \|p_F(x)\|^2 + \|x - p_F(x)\|^2$
Sachant que $d(x,F) = \|x - p_F(x)\|$, on obtient :
**$d(x, F)^2 = \|x\|^2 - \|p_F(x)\|^2$.**

---

### Carte 18 [C] — Espaces euclidiens

**RECTO :** Si $M$ est une matrice orthogonale ($M \in \mathcal{O}_n(\mathbb{R})$), quelle est l'expression immédiate de son inverse $M^{-1}$ ?

**VERSO :**
**$M^{-1} = M^T$**.
*(C'est le gain de temps principal lié aux matrices orthogonales !)*

---

### Carte 19 [C] — Espaces euclidiens

**RECTO :** Si $M \in \mathcal{O}_n(\mathbb{R})$ (matrice orthogonale), que peut valoir son déterminant ?

**VERSO :**
$\det(M) = 1$ ou $\det(M) = -1$.
*(Car $M^T M = I_n \implies \det(M)^2 = 1$). Si c'est 1, on dit que $M \in \mathcal{SO}_n(\mathbb{R})$ (matrice de rotation).*

---

### Carte 20 [C] — Espaces euclidiens

**RECTO :** Quel est le produit scalaire canonique $\langle A, B \rangle$ de deux matrices dans $\mathcal{M}_{n,p}(\mathbb{R})$ ?

**VERSO :**
**$\langle A, B \rangle = \operatorname{Tr}(A^T B)$**

---

### Carte 21 [C] — Espaces euclidiens

**RECTO :** Avec le produit scalaire canonique $\langle A, B \rangle = \operatorname{Tr}(A^T B)$, que vaut la norme au carré $\|A\|^2$ d'une matrice $A = (a_{i,j})$ ?

**VERSO :**
$\|A\|^2 = \operatorname{Tr}(A^T A) = \sum_{i,j} a_{i,j}^2$.
*(C'est simplement la somme des carrés de TOUS les coefficients de la matrice).*

---

## CARTES PIÈGE

---

### Carte 22 [P] — Espaces euclidiens

**RECTO :** VRAI ou FAUX ? (Rapport de jury CCINP)
"Pour montrer que $\varphi(P,Q) = \int_0^1 P(t)Q(t)dt$ est un produit scalaire, j'ai vérifié qu'elle est bilinéaire, positive ($\varphi(P,P) \geq 0$) et définie ($\varphi(P,P)=0 \implies P=0$). J'ai donc tous les points."

**VERSO :**
**FAUX !**
Il manque cruellement la **SYMÉTRIE** ($\varphi(P,Q) = \varphi(Q,P)$). Le jury sanctionne très lourdement cet oubli pour les produits scalaires et les matrices symétriques définies positives.

---

### Carte 23 [P] — Espaces euclidiens

**RECTO :** VRAI ou FAUX ?
"Soit $F$ un sous-espace vectoriel d'un espace préhilbertien $E$. On a toujours $E = F \oplus F^\perp$."

**VERSO :**
**FAUX !** (Très gros piège CCINP).
C'est vrai uniquement si $F$ est de **dimension finie** (ou $E$ euclidien). En dimension infinie, on a juste la somme directe, mais elle peut ne pas engendrer $E$ entier.

---

### Carte 24 [P] — Espaces euclidiens

**RECTO :** VRAI ou FAUX ?
"Si $p$ est un projecteur ($p^2 = p$), alors $p$ est un projecteur orthogonal."

**VERSO :**
**FAUX !**
Un projecteur est orthogonal si et seulement si $\ker(p) \perp \operatorname{Im}(p)$, ce qui équivaut à dire que $p$ est un **endomorphisme symétrique** ($p^* = p$).

---

### Carte 25 [P] — Espaces euclidiens

**RECTO :** VRAI ou FAUX ?
"Toute matrice symétrique à coefficients COMPLEXES est diagonalisable."

**VERSO :**
**FAUX !** (Erreur fréquente).
Le théorème spectral exige des matrices symétriques **réelles**.
*Contre-exemple* : $\begin{pmatrix} 1 & i \\ i & -1 \end{pmatrix}$ est symétrique complexe, non nulle, mais son polynôme caractéristique est $X^2$, elle n'est pas diagonalisable.

---

# Suites et séries de fonctions

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Suites et séries de fonctions

**RECTO :** Soit $f_n(x) = x^n$ sur $[0,1]$. Quel est le premier réflexe pour prouver qu'il n'y a **pas** de Convergence Uniforme (CVU) ?

**VERSO :**
**Utiliser la contraposée du théorème de continuité.**
Ici, $f_n$ CVS vers $f(x) = 0$ si $x \in [0,1[$ et $f(1)=1$. Les $f_n$ sont continues, mais la limite $f$ est **discontinue** en 1. Donc la CV n'est pas uniforme.

---

### Carte 2 [M] — Suites et séries de fonctions

**RECTO :** Méthode la plus rapide pour prouver la Convergence Normale (CVN) de $\sum \frac{\cos(nx)}{n^2}$ sur $\mathbb{R}$ ?

**VERSO :**
**Majorer par une suite indépendante de $x$.**
$|\frac{\cos(nx)}{n^2}| \leq \frac{1}{n^2}$.
La majorant est indépendant de $x$ et la série $\sum \frac{1}{n^2}$ converge (Riemann $\alpha=2$). Donc CVN sur $\mathbb{R}$.

---

### Carte 3 [M] — Suites et séries de fonctions

**RECTO :** On a $f_n(x) = e^{-nx}$ sur $]0, +\infty[$. La série $\sum f_n$ y converge-t-elle normalement ?

**VERSO :**
**Non.**
$\sup_{x>0} |e^{-nx}| = 1$. Le sup ne tend pas vers 0, la série des normes diverge.
*Réflexe : Se placer sur un segment $[a, +\infty[$ avec $a > 0$. Le sup devient $e^{-na}$ qui est le terme général d'une série géométrique convergente.*

---

### Carte 4 [M] — Suites et séries de fonctions

**RECTO :** Comment prouver la CVU de la série alternée $S(x) = \sum \frac{(-1)^n}{x^2 + n}$ sur $\mathbb{R}$ sachant qu'il n'y a pas de CVN ?

**VERSO :**
**Majoration uniforme du reste via le CSSA.**
Pour tout $x$, le CSSA s'applique. Donc $|R_n(x)| \leq |f_{n+1}(x)| = \frac{1}{x^2 + n + 1} \leq \frac{1}{n+1}$.
Ce majorant est indépendant de $x$ et tend vers 0, donc $\sup |R_n(x)| \to 0$ : c'est une CVU.

---

### Carte 5 [M] — Suites et séries de fonctions

**RECTO :** On veut calculer $\lim_{x \to 0} \sum_{n=1}^{+\infty} \frac{1}{n^2 + x^2}$. Quel est le réflexe (Trigger $\to$ Action) ?

**VERSO :**
**Théorème d'interversion limite-somme (ou continuité).**
1. CVN de $\sum \frac{1}{n^2+x^2}$ sur $\mathbb{R}$ (majorée par $1/n^2$).
2. Limite de $f_n(x)$ en 0 est $1/n^2$.
Conclusion : La limite est $\sum \frac{1}{n^2} = \frac{\pi^2}{6}$.

---

### Carte 6 [M] — Suites et séries de fonctions

**RECTO :** Comment prouver rigoureusement l'absence de CVU d'une suite de fonctions $(f_n)$ vers $f$ sur un intervalle $I$ sans dériver ?

**VERSO :**
**Trouver une suite de points bien choisie.**
Exhiber une suite $(x_n) \in I$ telle que $|f_n(x_n) - f(x_n)|$ ne tend **pas** vers 0.
*(Ex: si $f_n(x) = x^n$ sur $[0,1[$, prendre $x_n = 1 - 1/n$. On a $f_n(x_n) \to 1/e \neq 0$)*.

---

### Carte 7 [M] — Suites et séries de fonctions

**RECTO :** Face à la suite $f_n(x) = \left(1 + \frac{x}{n}\right)^n$, quel est l'équivalent / la limite simple (CVS) à connaître par cœur ?

**VERSO :**
$f_n(x) = \exp\left(n \ln\left(1 + \frac{x}{n}\right)\right)$.
En faisant un DL : $n \left(\frac{x}{n} + o(1/n)\right) \to x$.
Donc $f_n(x)$ **converge simplement vers $e^x$**.

---

### Carte 8 [M] — Suites et séries de fonctions

**RECTO :** Comment démontrer qu'une fonction $S(x) = \sum f_n(x)$ est de classe $\mathcal{C}^\infty$ sur $I$ ?

**VERSO :**
Il faut montrer par récurrence que pour **tout $k \in \mathbb{N}$** :
La série des dérivées $\sum f_n^{(k)}$ converge **uniformément sur tout segment** de $I$.

---

### Carte 9 [M] — Suites et séries de fonctions

**RECTO :** Comment justifier que "la convergence normale sur tout segment $[-A, A]$" suffit pour l'étude de la continuité sur $\mathbb{R}$ ?

**VERSO :**
**Argument de localisation.**
La continuité est une propriété **locale**. Si une fonction est continue sur tout segment de $\mathbb{R}$, alors elle est continue sur $\mathbb{R}$ entier.
*(Il faut absolument écrire cette phrase type au CCINP).*

---

### Carte 10 [M] — Suites et séries de fonctions

**RECTO :** Trigger : On te demande de prouver que la suite $f_n(x) = \frac{\sin(nx)}{\sqrt{n}}$ converge uniformément sur $\mathbb{R}$.

**VERSO :**
On calcule le sup !
$|f_n(x)| \leq \frac{1}{\sqrt{n}}$ pour tout $x$.
Ce majorant (indépendant de $x$) tend vers 0. Donc $\|f_n\|_\infty \to 0$. Il y a bien **CVU** (mais attention, la série $\sum f_n$ ne serait pas CVN !).

---

## CARTES THÉORÈME

---

### Carte 11 [T] — Suites et séries de fonctions

**RECTO :** Quelles sont les **3 hypothèses** pour montrer que la somme $S(x) = \sum f_n(x)$ est de classe $\mathcal{C}^1$ sur un intervalle $I$ ?

**VERSO :**
1. Les $f_n$ sont de classe $\mathcal{C}^1$ sur $I$.
2. $\sum f_n$ converge simplement au moins en **un point** $x_0 \in I$.
3. $\sum f_n'$ converge **uniformément** (ou uniformément sur tout segment) sur $I$.

---

### Carte 12 [T] — Suites et séries de fonctions

**RECTO :** Quelles sont les **2 hypothèses** du théorème d'intégration terme à terme pour une série de fonctions $\sum f_n$ sur un **segment** $[a,b]$ ?

**VERSO :**
1. Les $f_n$ sont continues (ou Cpm) sur $[a,b]$.
2. $\sum f_n$ converge **uniformément** sur $[a,b]$.
*Conclusion : $\int_a^b \sum f_n(x) dx = \sum \int_a^b f_n(x) dx$*

---

### Carte 13 [T] — Suites et séries de fonctions

**RECTO :** Quelles sont les hypothèses pour affirmer que la somme $S(x) = \sum f_n(x)$ est **continue** sur un intervalle $I$ ?

**VERSO :**
1. Les fonctions $f_n$ sont **continues** sur $I$.
2. La série $\sum f_n$ converge **uniformément** sur tout segment de $I$ (ou sur $I$ entier).

---

### Carte 14 [T] — Suites et séries de fonctions

**RECTO :** Que dit le théorème d'approximation de Weierstrass sur un segment $[a,b]$ ?

**VERSO :**
Toute fonction continue sur un segment $[a,b]$ à valeurs dans $\mathbb{R}$ ou $\mathbb{C}$ est limite **uniforme** d'une suite de **polynômes**.

---

### Carte 15 [T] — Suites et séries de fonctions

**RECTO :** Théorème de la double limite en un point $a$ pour une suite de fonctions $(f_n)$. Quelles sont les hypothèses ?

**VERSO :**
1. $(f_n)$ converge uniformément vers $f$ sur $I$.
2. Pour tout $n$, $\lim_{x \to a} f_n(x) = \ell_n$ existe.
*Conclusion : $(\ell_n)$ converge, $f$ a une limite en $a$, et $\lim_{x \to a} f(x) = \lim_{n \to \infty} \ell_n$.*

---

### Carte 16 [T] — Suites et séries de fonctions

**RECTO :** Pour appliquer le théorème de dérivation terme à terme à $\sum f_n$, il faut justifier que la série CVS "au moins en un point $x_0$".
Pourquoi une telle hypothèse ?

**VERSO :**
Car la CVU des dérivées $\sum f_n'$ garantit seulement que les fonctions convergent **à une constante près**. Fixer la convergence en un point "ancre" la fonction.

---

## CARTES CALCUL

---

### Carte 17 [C] — Suites et séries de fonctions

**RECTO :** Formule de la norme uniforme $\|f\|_{\infty, I}$ ?

**VERSO :**
$\|f\|_{\infty, I} = \sup_{x \in I} |f(x)|$.
*Réflexe pratique : On l'obtient souvent en étudiant les variations de $f$ (dérivée, tableau de signes).*

---

### Carte 18 [C] — Suites et séries de fonctions

**RECTO :** On étudie $f_n(x) = \frac{nx}{1 + n^2 x^2}$ sur $\mathbb{R}^+$. Où est atteint le maximum pour calculer $\|f_n\|_\infty$ ?

**VERSO :**
**Étude de fonction.**
La dérivée s'annule en $x = \frac{1}{n}$.
$\|f_n\|_\infty = f_n(1/n) = \frac{1}{1+1} = \frac{1}{2}$. (Pas de CVU de la suite vers 0 car $1/2 \not\to 0$).

---

### Carte 19 [C] — Suites et séries de fonctions

**RECTO :** Calculer la somme de la série de fonctions $\sum_{n=0}^{+\infty} x^n (1-x)$ sur $[0,1[$.

**VERSO :**
C'est $(1-x) \sum_{n=0}^{+\infty} x^n$.
Comme $x \in [0,1[$, $\sum x^n = \frac{1}{1-x}$.
La somme vaut $(1-x) \times \frac{1}{1-x} = 1$.

---

## CARTES PIÈGE

---

### Carte 20 [P] — Suites et séries de fonctions

**RECTO :** VRAI ou FAUX ? (Erreur de jury)
"$f_n(x) = \frac{x}{n}$. Pour tout $x \in \mathbb{R}$, $f_n(x) \to 0$. Donc $f_n$ converge uniformément vers la fonction nulle sur $\mathbb{R}$."

**VERSO :**
**FAUX !**
$\sup_{x \in \mathbb{R}} |f_n(x) - 0| = +\infty \not\to 0$. Il n'y a pas de CVU sur $\mathbb{R}$.
*Bonne rédaction* : Il y a CVU **sur tout segment** $[-A, A]$ car le sup vaut $A/n \to 0$.

---

### Carte 21 [P] — Suites et séries de fonctions

**RECTO :** VRAI ou FAUX ? (Très sanctionné à CCINP)
"La série de fonctions $\sum f_n$ converge uniformément sur $\mathbb{R}$, donc on peut la dériver terme à terme : $S'(x) = \sum f_n'(x)$."

**VERSO :**
**FAUX !**
C'est la convergence uniforme de la série des **dérivées** $\sum f_n'$ qu'il faut vérifier, pas celle des fonctions $f_n$ !

---

### Carte 22 [P] — Suites et séries de fonctions

**RECTO :** VRAI ou FAUX ?
"La série $\sum f_n$ converge uniformément sur $[0, +\infty[$, donc $\int_0^{+\infty} \sum f_n = \sum \int_0^{+\infty} f_n$."

**VERSO :**
**FAUX !**
Sur un intervalle non borné, la CVU ne suffit pas ! Il faut utiliser le **Théorème de Convergence Dominée** (TCD) ou d'intégration terme à terme (Chapitre Intégration).

---

### Carte 23 [P] — Suites et séries de fonctions

**RECTO :** VRAI ou FAUX ?
"Si $\sum f_n$ converge normalement sur $I$, alors elle converge uniformément sur $I$."

**VERSO :**
**VRAI.**
La Convergence Normale implique la Convergence Uniforme (qui elle-même implique la Convergence Simple). C'est le théorème fondamental du chapitre.

---

### Carte 24 [P] — Suites et séries de fonctions

**RECTO :** VRAI ou FAUX ?
"On montre que $\|f_n'\|_\infty \to 0$, donc on en déduit que $(f_n)$ converge uniformément."

**VERSO :**
**FAUX.**
Contre-exemple : $f_n(x) = n$. On a $f_n'(x) = 0$, donc la norme infinie de la dérivée vaut 0, mais $f_n$ ne converge même pas simplement ! Il manque une information sur un point.

---

### Carte 25 [P] — Suites et séries de fonctions

**RECTO :** Reprise de la carte précédente : $S(x) = \sum_{n=0}^{+\infty} x^n (1-x)$ sur $[0,1]$. Y a-t-il CVU ?

**VERSO :**
**Non.**
Les fonctions $f_n$ sont continues. En $x=1$, $f_n(1)=0$ donc $S(1)=0$. Sur $[0,1[$, $S(x)=1$.
La limite simple $S$ est discontinue en 1. D'après la contraposée de la continuité, pas de CVU sur $[0,1]$.

---

# Séries numériques

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Séries numériques

**RECTO :** Face à $\sum \frac{3^n}{n!}$ ou $\sum \frac{n^2}{2^n}$, quel est le réflexe immédiat ?

**VERSO :**
**Règle de d'Alembert** (présence de factorielles ou puissances $n$-ièmes).
On calcule $\lim \left| \frac{u_{n+1}}{u_n} \right|$. Si $< 1$, la série converge absolument.

---

### Carte 2 [M] — Séries numériques

**RECTO :** Premier réflexe absolu avant d'étudier la nature d'une série complexe comme $\sum \left(1 + \frac{1}{n}\right)^n$ ?

**VERSO :**
**Vérifier si le terme général tend vers 0.**
Ici, $\left(1 + \frac{1}{n}\right)^n \to e \neq 0$. La série **diverge grossièrement**.

---

### Carte 3 [M] — Séries numériques

**RECTO :** Nature de $\sum \frac{2n^2 + 3}{n^4 - n + 1}$ ? (Méthode + résultat)

**VERSO :**
**Fractions rationnelles $\to$ Équivalent au voisinage de $+\infty$.**
$u_n \sim \frac{2n^2}{n^4} = \frac{2}{n^2} > 0$.
Par comparaison à une série de Riemann ($\alpha = 2 > 1$), la série converge.

---

### Carte 4 [M] — Séries numériques

**RECTO :** Quel est le réflexe face à une série avec un log type $\sum \ln\left(1 + \frac{1}{n^2}\right)$ ?

**VERSO :**
**Équivalent via Développement Limité (DL).**
Ici $1/n^2 \to 0$, donc $\ln\left(1 + \frac{1}{n^2}\right) \sim \frac{1}{n^2} > 0$.
Par comparaison (Riemann $\alpha=2$), la série converge.

---

### Carte 5 [M] — Séries numériques

**RECTO :** Nature de $\sum \frac{\cos(n)}{n^2}$ ? (Trigger $\to$ Action)

**VERSO :**
**Signe quelconque sans CSSA $\to$ Convergence Absolue.**
$\left| \frac{\cos(n)}{n^2} \right| \leq \frac{1}{n^2}$.
La série converge absolument par majoration (termes positifs), donc elle converge.

---

### Carte 6 [M] — Séries numériques

**RECTO :** Face à $u_n = \sqrt{n^2 + n} - n$, comment trouver la nature de $\sum u_n$ ?

**VERSO :**
**Factoriser par le terme dominant puis DL.**
$u_n = n \left( \sqrt{1 + \frac{1}{n}} - 1 \right) = n \left( 1 + \frac{1}{2n} + o(1/n) - 1 \right) \sim \frac{1}{2} \neq 0$.
Divergence grossière.

---

### Carte 7 [M] — Séries numériques

**RECTO :** Comment étudier la nature de $\sum \frac{\sin(n\theta)}{n}$ (avec $\theta \not\equiv 0 [\pi]$) ?

**VERSO :**
**Transformation d'Abel** (hors programme en MP direct, mais classique en exo/problème CCINP).
On écrit $u_n = a_n b_n$ avec $a_n = 1/n$ (décroît vers 0) et $b_n = \sin(n\theta)$ dont les sommes partielles sont bornées.

---

## CARTES THÉORÈME

---

### Carte 8 [T] — Séries numériques

**RECTO :** Quelles sont les **3 hypothèses exactes** du Critère Spécial des Séries Alternées (CSSA) ?

**VERSO :**
Pour $\sum u_n$ :
1. $u_n$ est de la forme $(-1)^n a_n$ (alternée)
2. $(a_n)$ est **décroissante** (à partir d'un certain rang)
3. $\lim_{n \to +\infty} a_n = 0$

---

### Carte 9 [T] — Séries numériques

**RECTO :** Que conclut le CSSA sur le **reste** $R_n = \sum_{k=n+1}^{+\infty} u_k$ d'une série alternée convergente ? (2 points)

**VERSO :**
1. $|R_n| \leq |u_{n+1}|$ (majoré par la valeur absolue du premier terme négligé)
2. $R_n$ est du **signe** de $u_{n+1}$

---

### Carte 10 [T] — Séries numériques

**RECTO :** Quelles sont les **3 hypothèses** pour utiliser le théorème de comparaison Série-Intégrale sur $f(n)$ ?
*(Attention : une erreur classique est souvent ciblée par le jury CCINP ici)*

**VERSO :**
La fonction $f$ doit être sur $[a, +\infty[$ :
1. Continue (par morceaux)
2. Positive
3. **Décroissante** ⚠️ *(L'oubli de la monotonie est lourdement sanctionné)*

---

### Carte 11 [T] — Séries numériques

**RECTO :** Comparaison avec un Grand O : Quelles sont les hypothèses pour affirmer que $\sum u_n$ converge absolument si $u_n = O(v_n)$ ?

**VERSO :**
1. $v_n$ garde un **signe constant** (souvent $v_n \geq 0$)
2. La série $\sum v_n$ **converge**

---

### Carte 12 [T] — Séries numériques

**RECTO :** Lien entre suite $(u_n)$ et la série $\sum (u_{n+1} - u_n)$ ?

**VERSO :**
La suite $(u_n)$ et la série $\sum (u_{n+1} - u_n)$ sont de **même nature**.
*(Preuve : $\sum_{k=0}^{n-1} (u_{k+1} - u_k) = u_n - u_0$. Le terme de droite admet une limite ssi $(u_n)$ converge).*

---

## CARTES CALCUL

---

### Carte 13 [C] — Séries numériques

**RECTO :** Convergence de la série de Riemann $\sum \frac{1}{n^\alpha}$ ?

**VERSO :**
- **Converge** si $\alpha > 1$
- **Diverge** si $\alpha \leq 1$

---

### Carte 14 [C] — Séries numériques

**RECTO :** Convergence des séries de Bertrand $\sum \frac{1}{n^\alpha (\ln n)^\beta}$ ?

**VERSO :**
- Converge si $\alpha > 1$ (peu importe $\beta$)
- Converge si $\alpha = 1$ **ET** $\beta > 1$
- Diverge sinon.

---

### Carte 15 [C] — Séries numériques

**RECTO :** Formule de la somme d'une **série télescopique** $\sum_{n=0}^{+\infty} (u_{n+1} - u_n)$ ?

**VERSO :**
Si la suite $(u_n)$ converge vers $\ell$ :
$\sum_{n=0}^{+\infty} (u_{n+1} - u_n) = \lim_{n \to +\infty} u_{n+1} - u_0 = \ell - u_0$.

---

### Carte 16 [C] — Séries numériques

**RECTO :** Somme de la série géométrique $\sum_{n=2}^{+\infty} \left(\frac{1}{3}\right)^n$ ?

**VERSO :**
Premier terme / $(1 - \text{raison})$
Ici : $\frac{(1/3)^2}{1 - 1/3} = \frac{1/9}{2/3} = \frac{1}{6}$.

---

### Carte 17 [C] — Séries numériques

**RECTO :** Équivalent classique de la série harmonique $H_n = \sum_{k=1}^n \frac{1}{k} \sim ?$

**VERSO :**
$H_n \sim \ln(n)$ au voisinage de $+\infty$.
*(Rappel : $H_n = \ln(n) + \gamma + o(1)$ où $\gamma$ est la constante d'Euler)*

---

### Carte 18 [C] — Séries numériques

**RECTO :** Formule de Stirling (équivalent de $n!$) ?
*(Très utile pour les séries non traitables par d'Alembert)*

**VERSO :**
$n! \sim \left(\frac{n}{e}\right)^n \sqrt{2\pi n}$

---

## CARTES PIÈGE

---

### Carte 19 [P] — Séries numériques

**RECTO :** VRAI ou FAUX ?
$u_n = \frac{(-1)^n}{\sqrt{n} + (-1)^n} \sim \frac{(-1)^n}{\sqrt{n}}$. La série $\sum \frac{(-1)^n}{\sqrt{n}}$ converge (CSSA), donc $\sum u_n$ converge.

**VERSO :**
**FAUX !** (Erreur classique).
Le théorème d'équivalence exige des termes de **SIGNE CONSTANT**.
*Réflexe* : faire un développement asymptotique de $u_n$ à l'ordre 2 pour séparer une partie alternée et une partie de signe constant.

---

### Carte 20 [P] — Séries numériques

**RECTO :** VRAI ou FAUX ?
"On a $u_n \leq \frac{1}{n^2}$. Comme $\sum \frac{1}{n^2}$ converge, $\sum u_n$ converge."

**VERSO :**
**FAUX !**
Il manque l'hypothèse vitale de **positivité** : $0 \leq u_n \leq v_n$.
*(Si $u_n = -n$, l'inégalité est vraie mais la série diverge grossièrement !)*

---

### Carte 21 [P] — Séries numériques

**RECTO :** Le jury CCINP sanctionne souvent le cas $\alpha=1$ de Bertrand : $\sum \frac{1}{n (\ln n)^2}$.
Comment retrouver rigoureusement sa nature sans citer le théorème de Bertrand ?

**VERSO :**
**Comparaison série-intégrale.**
La fonction $t \mapsto \frac{1}{t(\ln t)^2}$ est continue, positive, décroissante. On intègre :
$\int_2^X \frac{1}{t(\ln t)^2} dt = \left[ -\frac{1}{\ln t} \right]_2^X \xrightarrow[X \to +\infty]{} \frac{1}{\ln 2}$. L'intégrale converge $\iff$ la série converge.

---

### Carte 22 [P] — Séries numériques

**RECTO :** VRAI ou FAUX ? (Rapport de jury CCINP)
"On a l'encadrement $\frac{1}{n} \leq u_n \leq \frac{1}{n} + \frac{1}{n^2}$, donc on peut en déduire que $u_n \sim \frac{1}{n}$."

**VERSO :**
**VRAI en pratique ici, mais la justification est FAUSSE.**
Un encadrement ne justifie pas directement un équivalent !
*Bonne rédaction* : On divise tout par $\frac{1}{n}$ : $1 \leq n u_n \leq 1 + \frac{1}{n}$. Par le théorème des gendarmes, $\lim n u_n = 1$, donc $u_n \sim \frac{1}{n}$.

---

### Carte 23 [P] — Séries numériques

**RECTO :** VRAI ou FAUX ?
Si $u_n = O\left(\frac{1}{n}\right)$, alors la série $\sum u_n$ converge.

**VERSO :**
**FAUX.**
Contre-exemple : $u_n = \frac{1}{n}$. On a bien $\frac{1}{n} = O\left(\frac{1}{n}\right)$, mais la série harmonique diverge.
*Rappel* : Il faut $u_n = O(1/n^\alpha)$ avec $\alpha > 1$.

---

### Carte 24 [P] — Séries numériques

**RECTO :** VRAI ou FAUX ?
"Si $\sum u_n$ converge, alors $n u_n \to 0$."

**VERSO :**
**FAUX.**
Contre-exemple : $u_n = \frac{1}{n}$ si $n$ est un carré, $0$ sinon.
La série converge ($\sum 1/k^2$), mais pour $n=k^2$, $n u_n = k^2 (1/k^2) = 1 \not\to 0$.
*(Vrai uniquement si $(u_n)$ est décroissante).*

---

### Carte 25 [P] — Séries numériques

**RECTO :** VRAI ou FAUX ?
"Pour prouver que $\lim u_n = \ell$, je peux montrer que la série $\sum (u_{n+1} - u_n)$ converge vers $\ell$."

**VERSO :**
**FAUX.**
Si $\sum_{k=0}^{+\infty} (u_{k+1} - u_k) = S$, alors $\lim_{n \to +\infty} u_n = u_0 + S$.
Ne pas oublier de rajouter le premier terme $u_0$ !

---

# Réduction des endomorphismes

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Réduction

**RECTO :** Trigger : On te donne la matrice $A$ de taille $n \times n$ remplie uniquement de "1". Comment trouver ses valeurs propres SANS calculer $\chi_A$ ? (Méthode exigée par le jury)

**VERSO :**
**Réflexe "Matrice de rang 1".**
$\operatorname{rg}(A) = 1$, donc $\ker(A)$ est de dimension $n-1$.
**$0$ est valeur propre de multiplicité $\geq n-1$.**
La somme des valeurs propres vaut $\operatorname{Tr}(A) = n$. Donc la dernière valeur propre est $n$.

---

### Carte 2 [M] — Réduction

**RECTO :** On sait qu'une matrice $3 \times 3$ a pour valeurs propres $\lambda_1, \lambda_2, \lambda_3$. Comment déduire le signe de ces valeurs propres sans les calculer explicitement ?

**VERSO :**
**Utiliser la Trace et le Déterminant !** (Très attendu par le jury).
$\lambda_1 + \lambda_2 + \lambda_3 = \operatorname{Tr}(A)$
$\lambda_1 \times \lambda_2 \times \lambda_3 = \det(A)$
L'étude de leurs signes permet souvent de conclure (ex: si det > 0 et Tr > 0, et valeurs propres réelles, etc.).

---

### Carte 3 [M] — Réduction

**RECTO :** Trigger : On te donne $A^3 - 3A^2 + 2I = 0$. Quelles sont les valeurs propres *possibles* de $A$ ?

**VERSO :**
**Les racines du polynôme annulateur.**
$P(X) = X^3 - 3X^2 + 2$ annule $A$.
Les valeurs propres de $A$ sont **incluses** dans les racines de $P$ (ici 1, $1-\sqrt{3}$, $1+\sqrt{3}$).

---

### Carte 4 [M] — Réduction

**RECTO :** On a $P(A) = 0$ avec $P(X) = (X-1)(X-2)^2$. Que peut-on dire de la diagonalisabilité de $A$ ?

**VERSO :**
**Rien avec certitude !**
Un polynôme annulateur a une racine double (le 2). Ça ne prouve pas que $A$ n'est pas diagonalisable.
*(Par contre, s'il y a un polynôme annulateur scindé à racines simples, ALORS elle est diagonalisable).*

---

### Carte 5 [M] — Réduction

**RECTO :** Trigger : Face à une matrice $A$ dont la **somme de chaque ligne** fait la même constante $c$. Quel est le réflexe ?

**VERSO :**
Le vecteur colonne $U = (1, 1, \dots, 1)^T$ est **vecteur propre** associé à la valeur propre $c$.
*(Rappel : si c'est la somme des colonnes, alors $c$ est valeur propre, mais pour un vecteur propre à gauche / de $A^T$).*

---

### Carte 6 [M] — Réduction

**RECTO :** Comment trigonaliser facilement une matrice $2 \times 2$ qui a une valeur propre double $\lambda$ mais n'est pas diagonale ?

**VERSO :**
1. Trouver un vecteur propre $u_1$ pour $\lambda$.
2. Compléter en une base $(u_1, u_2)$ de $\mathbb{R}^2$.
La matrice dans cette nouvelle base sera triangulaire supérieure $\begin{pmatrix} \lambda & * \\ 0 & \lambda \end{pmatrix}$.

---

### Carte 7 [M] — Réduction

**RECTO :** Soient $u$ et $v$ deux endomorphismes qui **commutent** ($u \circ v = v \circ u$). Quelle propriété fondamentale lie $v$ aux sous-espaces propres de $u$ ?

**VERSO :**
Les sous-espaces propres de $u$ sont **stables** par $v$.
*(Indispensable pour la diagonalisation simultanée).*

---

### Carte 8 [M] — Réduction

**RECTO :** Trigger : On sait que $X$ est un vecteur propre de $A$ associé à $\lambda$. On te demande de calculer $A^k X$ ou $P(A)X$. Action ?

**VERSO :**
Remplacer la matrice par la valeur propre !
$A^k X = \lambda^k X$
$P(A)X = P(\lambda)X$.

---

### Carte 9 [M] — Réduction

**RECTO :** On donne l'équation $A^3 + 2A^2 - A - 5I = 0$. Comment déduire que $A$ est inversible et exprimer $A^{-1}$ ?

**VERSO :**
On isole l'Identité et on factorise par $A$ :
$A(A^2 + 2A - I) = 5I \implies A \times \frac{1}{5}(A^2 + 2A - I) = I$.
Donc $A$ est inversible et $A^{-1} = \frac{1}{5}(A^2 + 2A - I)$.

---

### Carte 10 [M] — Réduction

**RECTO :** Soit $p$ un endomorphisme tel que $p^2 = p$ (un projecteur). Quels sont ses éléments de réduction (valeurs propres et sous-espaces propres) ?

**VERSO :**
- Valeurs propres possibles : **$0$ et $1$**.
- $E_1 = \ker(p - id) = \operatorname{Im}(p)$
- $E_0 = \ker(p)$
(Et $\ker(p) \oplus \operatorname{Im}(p) = E$, donc $p$ est diagonalisable).

---

### Carte 11 [M] — Réduction

**RECTO :** Soit $s$ un endomorphisme tel que $s^2 = id$ (une symétrie). Quels sont ses éléments de réduction (valeurs propres et sous-espaces propres) ?

**VERSO :**
- Valeurs propres possibles : **$1$ et $-1$**.
- $E_1 = \ker(s - id)$
- $E_{-1} = \ker(s + id)$
(Et $E_1 \oplus E_{-1} = E$, donc $s$ est diagonalisable).

---

## CARTES THÉORÈME

---

### Carte 12 [T] — Réduction

**RECTO :** Quelle est la Condition Nécessaire et Suffisante (CNS) générale pour qu'un endomorphisme $u$ soit diagonalisable ? (Liée aux dimensions).

**VERSO :**
1. Son polynôme caractéristique $\chi_u$ est **scindé**.
2. Pour chaque valeur propre $\lambda$, **$\dim(E_\lambda)$ = multiplicité de $\lambda$** dans $\chi_u$.

---

### Carte 13 [T] — Réduction

**RECTO :** Que conclut le théorème de Cayley-Hamilton pour une matrice $A \in \mathcal{M}_n(\mathbb{K})$ ?

**VERSO :**
Le polynôme caractéristique de $A$ annule $A$.
**$\chi_A(A) = 0$**.

---

### Carte 14 [T] — Réduction

**RECTO :** Quel est le critère pour qu'une matrice soit **trigonalisable** (dans $\mathcal{M}_n(\mathbb{K})$) ?

**VERSO :**
Il faut et il suffit que son polynôme caractéristique $\chi_A$ soit **scindé** sur $\mathbb{K}$.
*(Corollaire : Toute matrice à coefficients complexes est trigonalisable !)*

---

### Carte 15 [T] — Réduction

**RECTO :** Que dit le Théorème Spectral pour une matrice $A \in \mathcal{M}_n(\mathbb{R})$ ?

**VERSO :**
Si $A$ est **symétrique réelle**, alors elle est **diagonalisable** dans une base **orthonormale**.

---

### Carte 16 [T] — Réduction

**RECTO :** Que dit le Lemme des noyaux pour deux polynômes $P$ et $Q$ qui annulent partiellement ou totalement un endomorphisme $u$ ?

**VERSO :**
Si $P$ et $Q$ sont **premiers entre eux** ($P \wedge Q = 1$), alors :
$\ker((PQ)(u)) = \ker(P(u)) \oplus \ker(Q(u))$.

---

## CARTES CALCUL

---

### Carte 17 [C] — Réduction

**RECTO :** Formule magique du polynôme caractéristique $\chi_A(\lambda)$ pour une matrice $2 \times 2$ quelconque ?

**VERSO :**
$\chi_A(X) = X^2 - \operatorname{Tr}(A)X + \det(A)$.
*(Gain de temps immense aux écrits, à connaître par cœur).*

---

### Carte 18 [C] — Réduction

**RECTO :** Encadrement classique : Quelle est la relation entre la dimension d'un sous-espace propre $E_\lambda$ et la multiplicité algébrique $m_\lambda$ de la valeur propre $\lambda$ ?

**VERSO :**
**$1 \leq \dim(E_\lambda) \leq m_\lambda$**
*(Conséquence : si $m_\lambda = 1$, alors $\dim(E_\lambda) = 1$ obligatoirement).*

---

### Carte 19 [C] — Réduction

**RECTO :** À quelle condition stricte $0$ est-il valeur propre d'une matrice $A$ ?

**VERSO :**
$0$ est valeur propre $\iff \ker(A) \neq \{0\} \iff A$ n'est **pas inversible** $\iff \det(A) = 0$.

---

### Carte 20 [C] — Réduction

**RECTO :** Comment trouver la matrice de passage $P$ pour diagonaliser $A$ (tel que $A = P D P^{-1}$) ? Que contiennent ses colonnes ?

**VERSO :**
La matrice $P$ est formée en mettant en **colonnes** les **vecteurs propres** de $A$.
*(L'ordre des colonnes doit correspondre à l'ordre des valeurs propres choisies dans la matrice diagonale $D$).*

---

## CARTES PIÈGE

---

### Carte 21 [P] — Réduction

**RECTO :** VRAI ou FAUX ? (Rapport de jury CCINP)
"Pour que la matrice $A$ soit diagonalisable, il est nécessaire et suffisant que son polynôme caractéristique soit scindé à racines simples."

**VERSO :**
**FAUX !**
C'est une Condition **Suffisante** (CS) mais pas Nécessaire (CN).
*Contre-exemple* : La matrice identité $I_n$ est parfaitement diagonalisable, pourtant son polynôme caractéristique $(X-1)^n$ a une racine multiple !

---

### Carte 22 [P] — Réduction

**RECTO :** VRAI ou FAUX ? (Erreur très classique pointée par le jury)
"Le polynôme caractéristique $\chi_A$ et le polynôme minimal $\pi_A$ d'une matrice $A$ ont exactement les mêmes racines avec les mêmes multiplicités."

**VERSO :**
**FAUX !**
Ils ont les **mêmes racines** (qui sont les valeurs propres de $A$), mais en général **PAS les mêmes multiplicités**.
*(Le polynôme minimal divise le polynôme caractéristique : $\pi_A \mid \chi_A$).*

---

### Carte 23 [P] — Réduction

**RECTO :** VRAI ou FAUX ? (Rapport de jury CCINP, Algèbre)
"On a montré que pour tout vecteur colonne $X$, $X^T A X > 0$. On peut donc affirmer que $A$ est une matrice symétrique définie positive."

**VERSO :**
**FAUX !**
Il manque la vérification de la **SYMÉTRIE** ($A^T = A$). La stricte positivité de la forme quadratique ne garantit pas la symétrie de la matrice !

---

### Carte 24 [P] — Réduction

**RECTO :** VRAI ou FAUX ?
"Les sous-espaces propres d'un endomorphisme quelconque $u$ sont toujours supplémentaires dans $E$ : $E = \bigoplus E_{\lambda_i}$."

**VERSO :**
**FAUX !**
Ceci n'est vrai que si $u$ est **diagonalisable**.
Sinon, la somme des sous-espaces propres est toujours directe, mais n'engendre pas tout l'espace $E$.

---

### Carte 25 [P] — Réduction

**RECTO :** VRAI ou FAUX ? (Rapport de jury : Oubli de cas particulier).
"La matrice nulle $0_n$ est diagonalisable."

**VERSO :**
**VRAI !**
Elle est déjà diagonale. Ses valeurs propres sont toutes 0 (de multiplicité $n$), et l'espace propre associé $E_0$ est $\mathbb{R}^n$ entier.
*(Même logique pour l'Identité $I_n$).*

---

# Espaces vectoriels normés

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Topologie des EVN

**RECTO :** Comment démontrer que deux normes $N_1$ et $N_2$ ne sont **PAS** équivalentes sur $E$ (dimension infinie) ?

**VERSO :**
Il faut exhiber une suite de vecteurs $(x_n) \in E$ telle que :
$N_1(x_n) \to 0$ mais $N_2(x_n) \not\to 0$.
*(Ou montrer que le ratio $N_1(x_n)/N_2(x_n)$ n'est pas borné).*

---

### Carte 2 [M] — Topologie des EVN

**RECTO :** Trigger : Prouver que $\mathcal{O}_n(\mathbb{R})$ (matrices orthogonales) est un **fermé** de $\mathcal{M}_n(\mathbb{R})$.

**VERSO :**
**Image réciproque d'un fermé par une application continue.**
L'application $f : M \mapsto M^T M$ est continue (polynomiale en les coefficients).
$\mathcal{O}_n(\mathbb{R}) = f^{-1}(\{I_n\})$. Or le singleton $\{I_n\}$ est fermé, donc $\mathcal{O}_n(\mathbb{R})$ est fermé.

---

### Carte 3 [M] — Topologie des EVN

**RECTO :** Trigger : Prouver que $\mathcal{GL}_n(\mathbb{R})$ (matrices inversibles) est un **ouvert**.

**VERSO :**
**Image réciproque d'un ouvert par une application continue.**
L'application $\det : \mathcal{M}_n(\mathbb{R}) \to \mathbb{R}$ est continue.
$\mathcal{GL}_n(\mathbb{R}) = \det^{-1}(\mathbb{R}^*)$. Or $\mathbb{R}^* = ]-\infty, 0[ \cup ]0, +\infty[$ est un ouvert de $\mathbb{R}$, donc $\mathcal{GL}_n(\mathbb{R})$ est ouvert.

---

### Carte 4 [M] — Topologie des EVN

**RECTO :** Trigger : On te demande de prouver qu'un ensemble $A$ n'est **PAS fermé**.

**VERSO :**
**Exhiber une suite qui "sort" de l'ensemble.**
Construire une suite $(x_n)$ d'éléments de $A$ qui converge, mais dont la limite $\ell$ n'appartient pas à $A$.

---

### Carte 5 [M] — Topologie des EVN

**RECTO :** Trigger : Justifier que la fonction $M \mapsto \operatorname{Tr}(M^3)$ atteint un maximum global sur $\mathcal{O}_n(\mathbb{R})$.

**VERSO :**
1. $\mathcal{O}_n(\mathbb{R})$ est un **compact** (fermé et borné en dimension finie).
2. La fonction est **continue** (polynomiale).
3. Une fonction continue sur un compact à valeurs réelles atteint ses bornes.

---

### Carte 6 [M] — Topologie des EVN

**RECTO :** Comment calculer en pratique la norme subordonnée $\|u\|$ d'un endomorphisme continu ? (2 étapes).

**VERSO :**
1. **Majorer** : Prouver que pour tout $x$, $\|u(x)\| \leq K\|x\|$. (Donc $\|u\| \leq K$).
2. **Cas d'égalité** : Exhiber UN vecteur $x_0 \neq 0$ tel que $\|u(x_0)\| = K\|x_0\|$. (Donc $\|u\| = K$).

---

### Carte 7 [M] — Topologie des EVN

**RECTO :** Trigger : Prouver que $\lim_{(x,y) \to (0,0)} \frac{x^2 y}{x^2 + y^2} = 0$.

**VERSO :**
**Majoration de la valeur absolue.**
$|x^2| \leq x^2 + y^2 \implies \frac{x^2}{x^2 + y^2} \leq 1$.
Donc $\left| \frac{x^2 y}{x^2 + y^2} \right| \leq 1 \times |y| = |y|$.
Comme $|y| \to 0$, par le théorème des gendarmes, la limite est $0$.

---

### Carte 8 [M] — Topologie des EVN

**RECTO :** Comment caractériser que la partie $A$ est **dense** dans l'espace vectoriel normé $E$ (par les suites) ?

**VERSO :**
Pour tout vecteur $x \in E$, il existe une suite $(a_n)$ d'éléments de **$A$** qui converge vers **$x$**.
*(En termes de topologie : l'adhérence $\bar{A} = E$).*

---

### Carte 9 [M] — Topologie des EVN

**RECTO :** Trigger : Montrer que $\mathcal{S}_n^{++}(\mathbb{R})$ (matrices symétriques définies positives) est un **ouvert** de $\mathcal{S}_n(\mathbb{R})$.

**VERSO :**
**Continuité des valeurs propres.**
Pour une matrice symétrique, $\mathcal{S}_n^{++}$ équivaut à avoir $\lambda_{min} > 0$.
L'application $M \mapsto \min(\operatorname{Sp}(M))$ est continue sur $\mathcal{S}_n(\mathbb{R})$. L'image réciproque de l'ouvert $]0, +\infty[$ par cette application est un ouvert.

---

## CARTES THÉORÈME

---

### Carte 10 [T] — Topologie des EVN

**RECTO :** Que peut-on affirmer sur toutes les normes d'un espace vectoriel $E$ de **dimension finie** ?

**VERSO :**
Elles sont toutes **équivalentes**.
*(Conséquence : elles définissent la même topologie, les mêmes suites convergentes, les mêmes ouverts/fermés).*

---

### Carte 11 [T] — Topologie des EVN

**RECTO :** Caractérisation séquentielle d'un **fermé** $F$ : que faut-il vérifier pour toute suite $(x_n)$ ?

**VERSO :**
Si une suite $(x_n)$ d'éléments de $F$ converge vers une limite $\ell \in E$, alors la limite appartient à $F$ (**$\ell \in F$**).

---

### Carte 12 [T] — Topologie des EVN

**RECTO :** Qu'affirme le théorème de Bolzano-Weierstrass dans un $\mathbb{R}$-espace vectoriel de dimension finie ?

**VERSO :**
De toute suite **bornée**, on peut extraire une sous-suite **convergente**.

---

### Carte 13 [T] — Topologie des EVN

**RECTO :** Soit $f : E \to F$ une application continue. Que peut-on dire de l'image $f(K)$ d'un ensemble **compact** $K \subset E$ ?

**VERSO :**
$f(K)$ est un **compact** de $F$.
*(Corollaire fondamental : Si $f$ est à valeurs réelles, elle est bornée sur $K$ et **atteint ses bornes**).*

---

### Carte 14 [T] — Topologie des EVN

**RECTO :** Quelle est la Condition Nécessaire et Suffisante (CNS) pour qu'une application linéaire $u \in \mathcal{L}(E,F)$ soit **continue** ?

**VERSO :**
Il faut qu'elle soit **bornée sur la sphère unité** :
$\exists K > 0, \forall x \in E, \|u(x)\|_F \leq K \|x\|_E$.

---

### Carte 15 [T] — Topologie des EVN

**RECTO :** Si un sous-espace vectoriel $F$ est de **dimension finie** dans un EVN $E$, que peut-on dire de sa topologie (fermé / ouvert) ?

**VERSO :**
Tout sous-espace vectoriel de dimension finie est **fermé**.
*(Très utile dans $\mathcal{C}([a,b])$ pour montrer que $\mathbb{R}_n[X]$ est fermé).*

---

### Carte 16 [T] — Topologie des EVN

**RECTO :** Qu'est-ce qu'un espace de **Banach** ?

**VERSO :**
C'est un espace vectoriel normé **complet**.
(C'est-à-dire un EVN dans lequel toute suite de Cauchy est convergente).

---

### Carte 17 [T] — Topologie des EVN

**RECTO :** Quel est le lien entre dimension finie et espace de Banach sur $\mathbb{R}$ ou $\mathbb{C}$ ?

**VERSO :**
Tout espace vectoriel normé de **dimension finie** sur $\mathbb{R}$ ou $\mathbb{C}$ est **complet** (donc c'est un Banach).

---

### Carte 18 [T] — Topologie des EVN

**RECTO :** Que dit le théorème de **Heine** pour une fonction $f : X \to Y$ ?

**VERSO :**
Toute fonction **continue** sur un **compact** $X$ est **uniformément continue** sur $X$.

---

### Carte 19 [T] — Topologie des EVN

**RECTO :** Soient $N_1$ et $N_2$ deux normes. Quelle inégalité prouve que $N_1$ est **plus fine** que $N_2$ ?

**VERSO :**
Il existe une constante $K > 0$ telle que :
$\forall x \in E, N_2(x) \leq K N_1(x)$.
*(Toute suite convergeant pour $N_1$ convergera aussi pour $N_2$).*

---

## CARTES CALCUL

---

### Carte 20 [C] — Topologie des EVN

**RECTO :** Formule de définition de la norme subordonnée (norme d'opérateur) $\|u\|$ pour un endomorphisme continu $u$ ?

**VERSO :**
$\|u\| = \sup_{x \neq 0} \frac{\|u(x)\|}{\|x\|} = \sup_{\|x\|=1} \|u(x)\|$.

---

### Carte 21 [C] — Topologie des EVN

**RECTO :** Quelle est la définition mathématique stricte pour que $f : E \to F$ soit **k-lipschitzienne** ?

**VERSO :**
$\exists k \geq 0, \forall x, y \in E, \|f(x) - f(y)\|_F \leq k \|x - y\|_E$.
*(Corollaire : Toute application lipschitzienne est uniformément continue, donc continue).*

---

## CARTES PIÈGE

---

### Carte 22 [P] — Topologie des EVN

**RECTO :** VRAI ou FAUX ?
"Dans l'espace vectoriel des polynômes $\mathbb{R}[X]$, la boule fermée unité $B_f(0,1)$ est un compact car elle est fermée et bornée."

**VERSO :**
**FAUX !** (Erreur fatale très sanctionnée).
Le théorème de Borel-Lebesgue (fermé + borné $\implies$ compact) n'est valable **QUE** dans un espace de **dimension finie**. Ici, $\dim(\mathbb{R}[X]) = +\infty$.

---

### Carte 23 [P] — Topologie des EVN

**RECTO :** VRAI ou FAUX ?
"Soit $u : \mathcal{C}^1([0,1]) \to \mathcal{C}^0([0,1])$ définie par $u(f) = f'$. $u$ est linéaire, donc elle est continue."

**VERSO :**
**FAUX !** (Attention à la dimension).
La continuité automatique des applications linéaires n'est vraie qu'au départ d'un espace de **dimension finie**. Ici l'espace est de dimension infinie, la dérivation n'y est pas continue pour la norme $\|\cdot\|_\infty$.

---

### Carte 24 [P] — Topologie des EVN

**RECTO :** VRAI ou FAUX ? (Rapport CCINP - Fonctions de 2 variables)
"Si on montre que $\lim_{t \to 0} f(t, at) = 0$ pour n'importe quelle pente $a \in \mathbb{R}$, alors on peut affirmer que $\lim_{(x,y) \to (0,0)} f(x,y) = 0$."

**VERSO :**
**FAUX !** (Piège mortel).
Avoir la limite le long de toutes les DROITES ne suffit pas. Il faut avoir la limite sur **tous les chemins possibles** (parabolique $y=x^2$, etc.).
*Réflexe* : Majorer $|f(x,y)|$ ou passer en coordonnées polaires.

---

### Carte 25 [P] — Topologie des EVN

**RECTO :** VRAI ou FAUX ?
"L'ensemble $\mathcal{GL}_n(\mathbb{R})$ est ouvert. Comme un sous-espace ne peut pas être à la fois ouvert et dense, il n'est pas dense dans $\mathcal{M}_n(\mathbb{R})$."

**VERSO :**
**FAUX !** (Confusion avec ouvert/fermé).
Un ensemble peut tout à fait être **à la fois ouvert et dense**.
C'est le cas de $\mathcal{GL}_n(\mathbb{R})$ ! (La suite $M - \frac{1}{k} I_n$ permet d'approcher toute matrice par une matrice inversible).

---

# Fonctions vectorielles d'une variable réelle

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Fonctions vectorielles

**RECTO :** Trigger : On étudie une fonction à valeurs dans un espace euclidien $f : \mathbb{R} \to E$ dérivable. Comment dériver la fonction scalaire $g(t) = \|f(t)\|^2$ ?

**VERSO :**
**Passer par le produit scalaire.**
$g(t) = \langle f(t), f(t) \rangle$.
Par bilinéarité (et symétrie), la dérivée est : **$g'(t) = 2 \langle f'(t), f(t) \rangle$**.

---

### Carte 2 [M] — Fonctions vectorielles

**RECTO :** Comment dériver une fonction matricielle qui est un déterminant de $n$ vecteurs colonnes : $D(t) = \det(C_1(t), \dots, C_n(t))$ ?

**VERSO :**
On dérive les colonnes **une par une** et on somme les $n$ déterminants obtenus :
$D'(t) = \det(C_1'(t), C_2(t) \dots) + \dots + \det(C_1(t), \dots, C_n'(t))$.

---

### Carte 3 [M] — Fonctions vectorielles

**RECTO :** Cinématique / Arcs paramétrés : Soit $f(t)$ la position. Quelle est la condition pour que le point $f(t_0)$ soit dit **régulier** ? Quel est alors le vecteur directeur de sa tangente ?

**VERSO :**
Le point est régulier si le vecteur dérivé est non nul : **$f'(t_0) \neq \vec{0}$**.
La tangente au point $f(t_0)$ est alors dirigée par **$f'(t_0)$**.

---

### Carte 4 [M] — Fonctions vectorielles

**RECTO :** Arcs paramétrés : Le point $f(t_0)$ est **singulier** (c'est-à-dire $f'(t_0) = \vec{0}$). Comment trouver la direction de la tangente en ce point si $f$ est $\mathcal{C}^\infty$ ?

**VERSO :**
La tangente est dirigée par le **premier vecteur dérivé non nul** évalué en $t_0$.
S'il existe un entier $p \geq 2$ tel que $f^{(p)}(t_0) \neq \vec{0}$ et les dérivées précédentes sont nulles, la tangente est dirigée par $f^{(p)}(t_0)$.

---

### Carte 5 [M] — Fonctions vectorielles

**RECTO :** Trigger : On étudie une matrice $A(t)$ inversible pour tout $t$, et dérivable. Comment calculer la dérivée de la fonction matricielle $M(t) = A(t)^{-1}$ ?

**VERSO :**
On dérive la relation $A(t) A(t)^{-1} = I_n$.
$A'(t)A(t)^{-1} + A(t)(A^{-1})'(t) = 0$.
En isolant, on obtient : **$(A^{-1})'(t) = - A(t)^{-1} A'(t) A(t)^{-1}$**.
⚠️ *(Attention, l'ordre des matrices est crucial !)*

---

### Carte 6 [M] — Fonctions vectorielles

**RECTO :** Trigger : $f$ est $\mathcal{C}^1$ sur $]0, 1]$ et continue en $0$. On veut prouver que $f$ est de classe $\mathcal{C}^1$ sur $[0, 1]$ entier. Action ?

**VERSO :**
**Théorème du prolongement de la dérivée (ou prolongement $\mathcal{C}^1$).**
Il suffit de vérifier que $f'(t)$ admet une **limite finie** $\ell$ quand $t \to 0^+$.
Alors $f$ sera dérivable en $0$, on aura $f'(0) = \ell$, et $f'$ sera continue en $0$.

---

### Carte 7 [M] — Fonctions vectorielles

**RECTO :** Points d'inflexion : Soit $f(t_0)$ un point régulier. Comment déterminer algébriquement si c'est un point d'**inflexion** ?

**VERSO :**
On cherche le premier entier $q \geq 2$ tel que le vecteur dérivé $f^{(q)}(t_0)$ forme une **famille libre** avec $f'(t_0)$.
Si $q$ est **impair** (ex: $q=3$), alors la courbe traverse sa tangente : c'est un point d'inflexion.

---

### Carte 8 [M] — Fonctions vectorielles

**RECTO :** Trigger : Intégrer la relation matricielle différentielle $X'(t) = A X(t)$ où $A$ est une matrice constante diagonalisable.

**VERSO :**
**Passer dans la base de diagonalisation.**
Si $A = P D P^{-1}$, on pose $Y(t) = P^{-1} X(t)$.
On obtient le système découplé $Y'(t) = D Y(t)$, dont la solution est immédiate ligne par ligne ($y_k(t) = C_k e^{\lambda_k t}$), puis on revient à $X(t) = P Y(t)$.

---

## CARTES THÉORÈME

---

### Carte 9 [T] — Fonctions vectorielles

**RECTO :** Soit $f : I \to \mathbb{R}^p$ avec $f(t) = (f_1(t), \dots, f_p(t))$. Quelle est la condition nécessaire et suffisante pour que $\lim_{t \to t_0} f(t) = L = (\ell_1, \dots, \ell_p)$ ?

**VERSO :**
Il faut et il suffit que **chaque composante** converge vers sa limite respective :
$\forall k \in \{1, \dots, p\}, \lim_{t \to t_0} f_k(t) = \ell_k$.
*(Même chose pour la dérivabilité et l'intégration).*

---

### Carte 10 [T] — Fonctions vectorielles

**RECTO :** Quelle est la version valide du théorème des Accroissements Finis pour une fonction vectorielle $f : [a,b] \to E$ de classe $\mathcal{C}^1$ ?

**VERSO :**
**L'Inégalité des Accroissements Finis (IAF).**
$\|f(b) - f(a)\|_E \leq (b-a) \sup_{t \in [a,b]} \|f'(t)\|_E$.
*(Plus généralement : si $\|f'(t)\| \leq M$ sur $]a,b[$, alors $\|f(b)-f(a)\| \leq M|b-a|$).*

---

### Carte 11 [T] — Fonctions vectorielles

**RECTO :** Écrire la formule de Taylor avec reste intégral pour $f : I \to E$ de classe $\mathcal{C}^{n+1}$ entre $a$ et $b$.

**VERSO :**
$f(b) = \sum_{k=0}^n \frac{(b-a)^k}{k!} f^{(k)}(a) + \int_a^b \frac{(b-t)^n}{n!} f^{(n+1)}(t) dt$.

---

### Carte 12 [T] — Fonctions vectorielles

**RECTO :** Quelle est la définition exacte pour qu'une fonction vectorielle $f : I \to E$ soit qualifiée de classe $\mathcal{C}^k$ ?

**VERSO :**
1. $f$ est $k$ fois dérivable sur l'intervalle $I$.
2. **ET** sa dérivée $k$-ième $f^{(k)}$ est **continue** sur $I$.

---

### Carte 13 [T] — Fonctions vectorielles

**RECTO :** Formule de Taylor-Young à l'ordre $n$ en $t_0$ pour une fonction $f$ : quelle est l'hypothèse minimale requise ?

**VERSO :**
Il suffit que $f$ soit **$n$ fois dérivable au point $t_0$**.
(La continuité locale des dérivées n'est pas requise, contrairement à Taylor-Lagrange).
$f(t) = \sum_{k=0}^n \frac{(t-t_0)^k}{k!} f^{(k)}(t_0) + o((t-t_0)^n)$.

---

### Carte 14 [T] — Fonctions vectorielles

**RECTO :** Théorème Fondamental de l'Analyse : que peut-on dire de la fonction $F(x) = \int_a^x f(t) dt$ si $f : I \to E$ est **continue** ?

**VERSO :**
$F$ est l'unique **primitive** de $f$ sur $I$ qui s'annule en $a$.
$F$ est de classe **$\mathcal{C}^1$** sur $I$ et pour tout $x \in I$, $F'(x) = f(x)$.

---

## CARTES CALCUL

---

### Carte 15 [C] — Fonctions vectorielles

**RECTO :** Inégalité de Taylor-Lagrange : Comment majorer rigoureusement la différence $\| f(b) - T_n(f, a)(b) \|$ pour $f \in \mathcal{C}^{n+1}$ ?

**VERSO :**
Si on a la majoration $\|f^{(n+1)}(t)\| \leq M$ pour tout $t \in [a,b]$, alors :
$\left\| f(b) - \sum_{k=0}^n \frac{(b-a)^k}{k!} f^{(k)}(a) \right\| \leq M \frac{|b-a|^{n+1}}{(n+1)!}$.

---

### Carte 16 [C] — Fonctions vectorielles

**RECTO :** Formule pour calculer la **longueur** (abscisse curviligne) d'un arc paramétré $\gamma$ défini par $f(t) = (x(t), y(t))$ de classe $\mathcal{C}^1$ sur le segment $[a,b]$ ?

**VERSO :**
$L(\gamma) = \int_a^b \|f'(t)\| dt = \int_a^b \sqrt{x'(t)^2 + y'(t)^2} dt$.

---

### Carte 17 [C] — Fonctions vectorielles

**RECTO :** Calcul pratique : On étudie l'application bilinéaire $B(X,Y)$. Comment dériver la fonction composée $t \mapsto B(U(t), V(t))$ ?

**VERSO :**
Par analogie avec le produit de dérivées :
$B(U(t), V(t))' = B(U'(t), V(t)) + B(U(t), V'(t))$.
*(Valable pour le produit scalaire, produit vectoriel, produit matriciel).*

---

## CARTES PIÈGE

---

### Carte 18 [P] — Fonctions vectorielles

**RECTO :** VRAI ou FAUX ? (Erreur de géométrie classique)
"Soit $f : \mathbb{R} \to \mathbb{R}^n$ dérivable. Si sa norme euclidienne $\|f(t)\|$ est constante pour tout $t$, alors la dérivée est nulle : $f'(t) = 0$."

**VERSO :**
**FAUX !**
La fonction se déplace sur une sphère. La seule conclusion correcte est que le vecteur vitesse $f'(t)$ est **orthogonal** au vecteur position $f(t)$ (car $2\langle f'(t), f(t) \rangle = 0$).

---

### Carte 19 [P] — Fonctions vectorielles

**RECTO :** VRAI ou FAUX ? (Extrêmement sanctionné au CCINP)
"Soit $f : [a,b] \to \mathbb{R}^2$ continue et dérivable sur $]a,b[$. Par le Théorème des Accroissements Finis (TAF), il existe $c \in ]a,b[$ tel que $f(b) - f(a) = (b-a)f'(c)$."

**VERSO :**
**FAUX !**
L'ÉGALITÉ des Accroissements Finis (et le théorème de Rolle) est **fausse** pour les fonctions à valeurs vectorielles ou complexes.
*(Contre-exemple : $f(t) = (\cos t, \sin t)$ sur $[0, 2\pi]$. On a $f(2\pi)-f(0)=0$, mais $f'(t)$ n'est jamais nul).*

---

### Carte 20 [P] — Fonctions vectorielles

**RECTO :** VRAI ou FAUX ? (Rapport de jury)
"Soit $f : [a,b] \to \mathbb{R}^n$ continue. D'après l'inégalité triangulaire, on a $\left| \int_a^b f(t) dt \right| \leq \int_a^b |f(t)| dt$."

**VERSO :**
**FAUX !** (Écriture absurde).
La valeur absolue n'a pas de sens pour un vecteur. Il faut utiliser la **norme** de l'espace d'arrivée :
$\left\| \int_a^b f(t) dt \right\| \leq \int_a^b \|f(t)\| dt$.

---

### Carte 21 [P] — Fonctions vectorielles

**RECTO :** VRAI ou FAUX ?
"Si $f$ est dérivable au point $0$, alors on est certain que $\lim_{t \to 0} f'(t)$ existe et vaut $f'(0)$."

**VERSO :**
**FAUX !**
Une fonction peut être dérivable en un point sans que sa dérivée y soit continue. 
*(Contre-exemple redoutable : $f(t) = t^2 \sin(1/t)$ pour $t \neq 0$ et $f(0)=0$. On a $f'(0)=0$ mais $f'(t)$ n'a pas de limite en 0).*

---

### Carte 22 [P] — Fonctions vectorielles

**RECTO :** VRAI ou FAUX ? (Oubli classique)
"Si deux arcs paramétrés réguliers ont le même support géométrique (le même tracé), alors ils ont les mêmes vecteurs vitesses en tout point de ce support."

**VERSO :**
**FAUX !**
La vitesse dépend du paramétrage (le "temps" $t$). Les vecteurs vitesses seront **colinéaires** (ils définissent la même tangente géométrique), mais leurs normes dépendent de la vitesse de parcours.

---

# Équations différentielles

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Équations différentielles

**RECTO :** Raccordement : On trouve $y_1(t) = 1 + \frac{C_1}{t}$ sur $]0, +\infty[$ et $y_2(t) = 1 + \frac{C_2}{t}$ sur $]-\infty, 0[$. Comment raccorder en $0$ pour avoir une solution sur $\mathbb{R}$ ?

**VERSO :**
Une solution sur $\mathbb{R}$ doit être **continue en 0**.
Il faut que $\lim_{t \to 0^+} y_1(t)$ et $\lim_{t \to 0^-} y_2(t)$ soient **finies**.
Ici, cela impose $C_1 = 0$ et $C_2 = 0$. L'unique solution prolongeable est $y(t) = 1$.

---

### Carte 2 [M] — Équations différentielles

**RECTO :** Trigger : Comment rédiger parfaitement la **variation de la constante** pour $y' + a(t)y = b(t)$ ?

**VERSO :**
"On cherche une solution particulière sous la forme $y_p(t) = c(t) y_H(t)$ où $y_H$ est une solution homogène non nulle."
On injecte : on obtient **$c'(t) y_H(t) = b(t)$**. On intègre pour trouver $c(t)$.

---

### Carte 3 [M] — Équations différentielles

**RECTO :** Équation $ay'' + by' + cy = 0$. Le polynôme caractéristique a un discriminant $\Delta < 0$, de racines $\alpha \pm i\beta$.
Formule des solutions RÉELLES ?

**VERSO :**
$y(t) = e^{\alpha t} \left( A \cos(\beta t) + B \sin(\beta t) \right)$ avec $(A,B) \in \mathbb{R}^2$.

---

### Carte 4 [M] — Équations différentielles

**RECTO :** Trigger : Méthode de variation des constantes pour une EDL d'ordre 2 $y'' + a(t)y' + b(t)y = c(t)$ de base $(y_1, y_2)$. Système à résoudre ?

**VERSO :**
On cherche $y_p = \lambda_1 y_1 + \lambda_2 y_2$. On résout le système :
$\begin{cases} \lambda_1' y_1 + \lambda_2' y_2 = 0 \\ \lambda_1' y_1' + \lambda_2' y_2' = c(t) \end{cases}$
Puis on intègre $\lambda_1'$ et $\lambda_2'$.

---

### Carte 5 [M] — Équations différentielles

**RECTO :** Principe de superposition : comment trouver une solution particulière de $y' + y = t^2 + \cos(t)$ ?

**VERSO :**
On cherche $y_{p1}$ solution de $y' + y = t^2$.
On cherche $y_{p2}$ solution de $y' + y = \cos(t)$.
La solution particulière globale est **$y_p = y_{p1} + y_{p2}$**.

---

### Carte 6 [M] — Équations différentielles

**RECTO :** Trigger : Résoudre le système $X'(t) = A X(t)$ avec $A \in \mathcal{M}_n(\mathbb{R})$ diagonalisable ($A = P D P^{-1}$).

**VERSO :**
**Changement de fonction inconnue.**
On pose **$Y(t) = P^{-1} X(t)$**.
Le système devient $Y'(t) = D Y(t)$, ce qui se résout ligne par ligne ($y_k(t) = C_k e^{\lambda_k t}$).
Enfin, $X(t) = P Y(t)$.

---

### Carte 7 [M] — Équations différentielles

**RECTO :** Calcul de $e^{tA}$ : Comment faire si $A = \lambda I_n + N$ avec $N$ nilpotente ?

**VERSO :**
Les matrices $\lambda I_n$ et $N$ **commutent**.
Donc $e^{tA} = e^{t\lambda I_n} e^{tN} = e^{\lambda t} e^{tN}$.
Comme $N$ est nilpotente, la série $e^{tN} = I + tN + \frac{t^2}{2}N^2 + \dots$ s'arrête à un rang fini.

---

### Carte 8 [M] — Équations différentielles

**RECTO :** Trigger : Solution particulière de $y'' + 2y' + y = \sin(\omega t)$ ?

**VERSO :**
**Passage au complexe.**
On cherche une solution complexe $z_p(t)$ à $z'' + 2z' + z = e^{i\omega t}$.
La solution réelle sera $y_p(t) = \operatorname{Im}(z_p(t))$.

---

### Carte 9 [M] — Équations différentielles

**RECTO :** Trigger : On cherche une solution particulière de $y'' - 5y' + 6y = e^{2t}$. Réflexe ?

**VERSO :**
Le second membre est $P(t)e^{mt}$ avec $m=2$.
Or 2 est **racine simple** de l'équation caractéristique ($r^2 - 5r + 6 = 0$).
On cherche la solution sous la forme $y_p(t) = A \mathbf{t} e^{2t}$. (Le "t" évite de retomber sur la solution homogène).

---

### Carte 10 [M] — Équations différentielles

**RECTO :** Trigger : Résoudre $t^2 y'' - 2y = 0$ pour $t > 0$ avec l'indication "Poser $t = e^x$".

**VERSO :**
**Changement de variable.**
On pose $z(x) = y(e^x)$.
On dérive avec la règle de la chaîne : $y'(t) = z'(x)e^{-x}$ et $y''(t) = (z''(x) - z'(x))e^{-2x}$.
L'équation en $z$ sera à coefficients **constants**.

---

### Carte 11 [M] — Équations différentielles

**RECTO :** Trigger : Recherche de solution de $ty'' + y' + ty = 0$ développable en série entière (DSE).

**VERSO :**
On pose $y(t) = \sum_{n=0}^{+\infty} a_n t^n$.
On dérive terme à terme, on injecte.
On opère un **décalage d'indices** pour tout regrouper sous $\sum (\dots) t^n = 0$, et on obtient une relation de récurrence sur la suite $(a_n)$.

---

### Carte 12 [M] — Équations différentielles

**RECTO :** Trigger : Trouver une solution particulière à $y'' + 3y' + 2y = t^2 + t$.

**VERSO :**
Le second membre est un **polynôme de degré 2**.
Or $0$ n'est PAS racine de l'équation caractéristique ($2 \neq 0$).
On cherche une solution sous la forme d'un polynôme de même degré : $y_p(t) = at^2 + bt + c$.

---

## CARTES THÉORÈME

---

### Carte 13 [T] — Équations différentielles

**RECTO :** Théorème de Cauchy-Lipschitz linéaire : quelles sont les **2 hypothèses** pour le problème de Cauchy $y' = A(t)y + B(t)$ avec $y(t_0) = y_0$ sur un intervalle $I$ ?

**VERSO :**
1. La fonction matricielle $A : I \to \mathcal{M}_n(\mathbb{R})$ est **continue** sur $I$.
2. Le second membre $B : I \to \mathbb{R}^n$ est **continu** sur $I$.

---

### Carte 14 [T] — Équations différentielles

**RECTO :** Que conclut le théorème de Cauchy-Lipschitz **linéaire** sur un intervalle $I$ ?

**VERSO :**
Il affirme l'**existence et l'unicité** d'une solution globale définie **sur tout l'intervalle $I$**.
*(C'est une différence majeure avec le C-L non linéaire qui ne donne qu'une solution maximale locale).*

---

### Carte 15 [T] — Équations différentielles

**RECTO :** Quelle est la structure de l'ensemble des solutions de l'équation homogène $y'' + a(t)y' + b(t)y = 0$ sur un intervalle $I$ ?

**VERSO :**
C'est un $\mathbb{R}$-espace vectoriel de **dimension 2**.
*(Toute base de cet espace est appelée un Système Fondamental de Solutions).*

---

### Carte 16 [T] — Équations différentielles

**RECTO :** Quel est le lien entre le Wronskien $W(t)$ et le fait que $(y_1, y_2)$ soit un Système Fondamental de Solutions sur $I$ ?

**VERSO :**
$(y_1, y_2)$ est une base de solutions $\iff$ Il existe un point $t_0 \in I$ tel que **$W(t_0) \neq 0$**.
*(S'il est non nul en un point, il est non nul partout sur $I$).*

---

### Carte 17 [T] — Équations différentielles

**RECTO :** Qu'est-ce qu'une "matrice fondamentale" (ou résolvante) d'un système $X'(t) = A(t) X(t)$ de taille $n$ ?

**VERSO :**
C'est une matrice carrée $M(t)$ inversible dont les **colonnes** forment une **base de solutions** du système.
Elle vérifie $M'(t) = A(t) M(t)$.

---

## CARTES CALCUL

---

### Carte 18 [C] — Équations différentielles

**RECTO :** Formule de la solution générale de l'équation homogène $y' + a(t)y = 0$ ?

**VERSO :**
$y(t) = C \exp\left(-\int a(t) dt\right)$ avec $C \in \mathbb{R}$.
⚠️ *Ne pas oublier le signe MOINS !*

---

### Carte 19 [C] — Équations différentielles

**RECTO :** Formule du **Wronskien** $W(t)$ de deux solutions $y_1, y_2$ d'une EDL d'ordre 2 ?

**VERSO :**
$W(t) = \det \begin{pmatrix} y_1(t) & y_2(t) \\ y_1'(t) & y_2'(t) \end{pmatrix} = y_1(t)y_2'(t) - y_1'(t)y_2(t)$.

---

### Carte 20 [C] — Équations différentielles

**RECTO :** Quelle équation différentielle d'ordre 1 vérifie le Wronskien $W(t)$ des solutions de $y'' + a(t)y' + b(t)y = 0$ ?

**VERSO :**
**$W'(t) = -a(t) W(t)$**
*(Ce qui donne $W(t) = W(t_0) \exp(-\int_{t_0}^t a(s)ds)$, prouvant qu'il ne s'annule jamais s'il est non nul en $t_0$).*

---

### Carte 21 [C] — Équations différentielles

**RECTO :** Formule de la solution du système différentiel $X'(t) = A X(t)$ avec la condition initiale $X(t_0) = X_0$ ?

**VERSO :**
**$X(t) = \exp((t-t_0)A) X_0$**

---

### Carte 22 [C] — Équations différentielles

**RECTO :** Dans l'espace euclidien des solutions de $X' = AX$, comment s'exprime la solution au problème de Cauchy $X(t_0) = X_0$ à partir de la matrice fondamentale $M(t)$ ?

**VERSO :**
$X(t) = M(t) M(t_0)^{-1} X_0$.
*(Remarque : la matrice $R(t, t_0) = M(t) M(t_0)^{-1}$ est appelée résolvante, elle vaut $\exp((t-t_0)A)$ dans le cas de coefficients constants).*

---

## CARTES PIÈGE

---

### Carte 23 [P] — Équations différentielles

**RECTO :** VRAI ou FAUX ? (Le piège n°1 du jury CCINP)
"Pour résoudre $(t^2-1)y' + y = t$ sur $\mathbb{R}$, je divise tout par $(t^2-1)$ puis j'applique la variation de la constante."

**VERSO :**
**FAUX !** (Zéro à la question).
On ne peut diviser que si le coefficient ne s'annule pas !
Il faut d'abord résoudre sur les intervalles $]-\infty, -1[$, $]-1, 1[$ et $]1, +\infty[$, **puis** faire un raccordement (étude des limites en $\pm 1$).

---

### Carte 24 [P] — Équations différentielles

**RECTO :** VRAI ou FAUX ? (Rapport de jury : lourdement sanctionné)
"Pour calculer l'exponentielle matricielle, je peux écrire $e^{A+B} = e^A e^B$."

**VERSO :**
**FAUX !**
Ceci est vrai **SI ET SEULEMENT SI les matrices $A$ et $B$ commutent** ($AB = BA$).
Il faut IMPÉRATIVEMENT écrire "Or $A$ et $B$ commutent, donc..." sur la copie.

---

### Carte 25 [P] — Équations différentielles

**RECTO :** VRAI ou FAUX ?
"Toute équation différentielle d'ordre 1 non linéaire $y' = f(t,y)$ admet des solutions globales définies sur $\mathbb{R}$."

**VERSO :**
**FAUX.**
Le théorème de Cauchy-Lipschitz donne des solutions **maximales** qui peuvent "exploser" en temps fini (ex: $y' = y^2 \implies y(t) = \frac{-1}{t-C}$ qui a une asymptote verticale).

---

# Calcul différentiel

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Calcul différentiel

**RECTO :** Trigger : Prouver que $\lim_{(x,y) \to (0,0)} \frac{x^3 + y^3}{x^2 + y^2} = 0$. Quel est le réflexe quasi-systématique ?

**VERSO :**
**Passer en coordonnées polaires.**
On pose $x = r\cos\theta$ et $y = r\sin\theta$.
$f(r,\theta) = \frac{r^3(\cos^3\theta + \sin^3\theta)}{r^2} = r(\cos^3\theta + \sin^3\theta)$.
$|f(r,\theta)| \leq r \times 2$. Comme $2r \xrightarrow{r \to 0} 0$, la limite est bien $0$.

---

### Carte 2 [M] — Calcul différentiel

**RECTO :** Trigger : On donne $h(t) = f(x(t), y(t))$ avec $f \in \mathcal{C}^1$. Formule de la dérivée $h'(t)$ (Règle de la chaîne) ?

**VERSO :**
**$h'(t) = x'(t) \frac{\partial f}{\partial x}(x(t), y(t)) + y'(t) \frac{\partial f}{\partial y}(x(t), y(t))$**.
*(C'est le produit scalaire entre le gradient de $f$ et le vecteur vitesse).*

---

### Carte 3 [M] — Calcul différentiel

**RECTO :** Trigger : Changement de variables dans une EDP. On pose $f(x,y) = g(u, v)$ avec $u = x+y$ et $v = x-y$.
Exprimer $\frac{\partial f}{\partial x}$ en fonction des dérivées de $g$.

**VERSO :**
On applique la règle de la chaîne :
$\frac{\partial f}{\partial x} = \frac{\partial u}{\partial x} \frac{\partial g}{\partial u} + \frac{\partial v}{\partial x} \frac{\partial g}{\partial v} = 1 \cdot \frac{\partial g}{\partial u} + 1 \cdot \frac{\partial g}{\partial v} = \frac{\partial g}{\partial u} + \frac{\partial g}{\partial v}$.

---

### Carte 4 [M] — Calcul différentiel

**RECTO :** Suite de Monge : Au point critique $A$, on trouve $\Delta = rt - s^2 > 0$ et $r > 0$. Conclusion ?

**VERSO :**
C'est un **Minimum local**.
*(Astuce : $\Delta > 0$ veut dire "vrai extremum", et $r > 0$ indique une concavité vers le haut en $X$, comme une parabole, donc un minimum).*

---

### Carte 5 [M] — Calcul différentiel

**RECTO :** Suite de Monge : Au point critique $A$, on trouve $\Delta = rt - s^2 < 0$. Conclusion ?

**VERSO :**
C'est un **Point col** (ou point selle). Pas d'extremum local.

---

### Carte 6 [M] — Calcul différentiel

**RECTO :** Trigger : Que faire pour étudier un extremum de $f(x,y)$ sous la **contrainte** géométrique $y = 2x + 1$ ?

**VERSO :**
**Paramétrer la contrainte.**
On remplace $y$ par $2x+1$ dans $f$, et on étudie la fonction d'**une seule variable** $g(x) = f(x, 2x+1)$ avec les outils de $\mathbb{R}$ (calcul de $g'(x)$, tableau de signes).

---

### Carte 7 [M] — Calcul différentiel

**RECTO :** Différentiabilité hors classe $\mathcal{C}^1$. Comment prouver que $f$ est différentiable en $(0,0)$ si ses dérivées partielles n'y sont pas continues ?

**VERSO :**
On calcule $\partial_x f(0,0)$ et $\partial_y f(0,0)$ (à la main, via le taux d'accroissement).
On forme : $\Delta(x,y) = f(x,y) - f(0,0) - x\partial_x f(0,0) - y\partial_y f(0,0)$.
On prouve en majorant que $\frac{|\Delta(x,y)|}{\sqrt{x^2+y^2}} \xrightarrow{(x,y)\to(0,0)} 0$.

---

### Carte 8 [M] — Calcul différentiel

**RECTO :** Trigger : Tu dois calculer $\frac{\partial^2 f}{\partial x \partial y}$. Comment limiter les risques d'erreurs de calcul ?

**VERSO :**
Calculer les deux dérivées : $\partial_x(\partial_y f)$ ET $\partial_y(\partial_x f)$ séparément.
D'après le **Théorème de Schwarz**, elles doivent être égales. C'est un excellent **moyen d'autocontrôle** sur sa copie.

---

## CARTES THÉORÈME

---

### Carte 9 [T] — Calcul différentiel

**RECTO :** Quelle est la définition exacte pour qu'une fonction $f : U \subset \mathbb{R}^2 \to \mathbb{R}$ soit de classe $\mathcal{C}^1$ sur l'ouvert $U$ ?

**VERSO :**
1. Les dérivées partielles $\partial_x f$ et $\partial_y f$ **existent** en tout point de $U$.
2. Ces dérivées partielles sont **continues** sur $U$.
*(Si c'est le cas, alors $f$ est différentiable et continue).*

---

### Carte 10 [T] — Calcul différentiel

**RECTO :** Théorème de Schwarz : Quelle est l'hypothèse et quelle est la conclusion concernant les dérivées secondes croisées ?

**VERSO :**
**Hypothèse :** $f$ est de classe **$\mathcal{C}^2$** sur un ouvert $U$.
**Conclusion :** L'ordre de dérivation n'importe pas :
$\frac{\partial^2 f}{\partial x \partial y} = \frac{\partial^2 f}{\partial y \partial x}$.

---

### Carte 11 [T] — Calcul différentiel

**RECTO :** Condition Nécessaire (CN) pour qu'une fonction $f$ de classe $\mathcal{C}^1$ admette un **extremum local** en un point $A$ d'un OUVERT $U$ ?

**VERSO :**
Le point $A$ doit être un **point critique**, c'est-à-dire :
**$\nabla f(A) = \vec{0}$** (Toutes les dérivées partielles s'y annulent).

---

### Carte 12 [T] — Calcul différentiel

**RECTO :** Lien entre point critique et Matrice Hessienne $H_A(f)$ : comment conclure que $A$ est un minimum local avec le spectre de $H_A(f)$ ?

**VERSO :**
Si les **deux valeurs propres** de la matrice Hessienne sont **strictement positives** ($\text{Sp} \subset \mathbb{R}_+^*$), alors c'est un **minimum local**.
*(Matrice symétrique définie positive).*

---

### Carte 13 [T] — Calcul différentiel

**RECTO :** Justification de l'existence : Pourquoi la fonction $f(x,y) = x^2y - e^{xy}$ admet-elle forcément un minimum et un maximum global sur le carré $[-1, 1] \times [-1, 1]$ ?

**VERSO :**
Car la fonction $f$ est **continue** et le carré est un **compact** de $\mathbb{R}^2$ (fermé et borné).
Toute fonction continue sur un compact atteint ses bornes.

---

### Carte 14 [T] — Calcul différentiel

**RECTO :** Règle de la chaîne matricielle : Si on a la composition $h = g \circ f$, quelle est la formule reliant leurs matrices Jacobiennes en un point $A$ ?

**VERSO :**
$J_{g \circ f}(A) = J_g(f(A)) \times J_f(A)$.
*(Produit matriciel : attention à l'ordre et au point d'évaluation de $g$ !)*

---

## CARTES CALCUL

---

### Carte 15 [C] — Calcul différentiel

**RECTO :** Formule de la dérivée directionnelle $D_v f(a)$ de $f$ (de classe $\mathcal{C}^1$) au point $a \in \mathbb{R}^n$ dans la direction du vecteur $v$ ?

**VERSO :**
$D_v f(a) = \langle \nabla f(a) , v \rangle$
*(Où $\nabla f(a)$ est le gradient de $f$ évalué au point $a$).*

---

### Carte 16 [C] — Calcul différentiel

**RECTO :** Notations de Monge : Face à un point critique $A$, on calcule $r, s, t$. Que valent-ils et quelle quantité $\Delta$ (déterminant hessien) faut-il évaluer ?

**VERSO :**
$r = \frac{\partial^2 f}{\partial x^2}(A)$, $s = \frac{\partial^2 f}{\partial x \partial y}(A)$, $t = \frac{\partial^2 f}{\partial y^2}(A)$.
On étudie le signe de **$\Delta = rt - s^2$**.

---

### Carte 17 [C] — Calcul différentiel

**RECTO :** Formule de Taylor-Young à l'ordre 1 (ou développement limité d'ordre 1) pour $f : \mathbb{R}^2 \to \mathbb{R}$ en un point $A=(a,b)$ ?

**VERSO :**
$f(a+h, b+k) = f(a,b) + h \frac{\partial f}{\partial x}(A) + k \frac{\partial f}{\partial y}(A) + o(\sqrt{h^2+k^2})$.
*(Peut aussi s'écrire $f(A+H) = f(A) + \langle \nabla f(A), H \rangle + o(\|H\|)$).*

---

### Carte 18 [C] — Calcul différentiel

**RECTO :** Matrice Jacobienne $J_f(a)$ : Si $f(x,y) = (u(x,y), v(x,y))$, quelle est la structure de sa matrice jacobienne de taille $2 \times 2$ ?

**VERSO :**
$J_f(a) = \begin{pmatrix} \frac{\partial u}{\partial x} & \frac{\partial u}{\partial y} \\ \frac{\partial v}{\partial x} & \frac{\partial v}{\partial y} \end{pmatrix}$.
*(Moyen mnémotechnique : Chaque LIGNE correspond à une composante de la fonction, chaque COLONNE à une variable dérivée).*

---

### Carte 19 [C] — Calcul différentiel

**RECTO :** Équation du plan tangent au graphe d'une fonction $f(x,y)$ (surface d'équation $z = f(x,y)$) au point $A=(x_0, y_0)$ ?

**VERSO :**
$z = f(x_0, y_0) + (x-x_0) \frac{\partial f}{\partial x}(A) + (y-y_0) \frac{\partial f}{\partial y}(A)$.

---

## CARTES PIÈGE

---

### Carte 20 [P] — Calcul différentiel

**RECTO :** VRAI ou FAUX ? (Le piège n°1 du calcul diff)
"Pour $f(x,y) = \frac{xy}{x^2+y^2}$, j'ai $\lim_{x \to 0} f(x, mx) = \frac{m}{1+m^2}$. La limite dépend de la droite choisie, donc $f$ n'a pas de limite en $(0,0)$."

**VERSO :**
**VRAI en pratique, mais la rédaction est dangereuse si on l'inverse.**
*Rappel vital* : Prouver que la limite est la même sur TOUTES les droites $y=mx$ **ne prouve pas** que la limite existe (il faudrait aussi vérifier $y=x^2$, etc.). Mais trouver deux chemins avec des limites **différentes** prouve qu'elle n'existe pas.

---

### Carte 21 [P] — Calcul différentiel

**RECTO :** VRAI ou FAUX ?
"Si les deux dérivées partielles $\frac{\partial f}{\partial x}(0,0)$ et $\frac{\partial f}{\partial y}(0,0)$ existent, alors $f$ est continue en $(0,0)$."

**VERSO :**
**FAUX !** (Erreur très lourdement sanctionnée).
L'existence des dérivées partielles signifie juste que $f$ a des tangentes selon l'axe X et l'axe Y. Cela n'implique **absolument pas** la continuité (ni la différentiabilité). Il faut que $f$ soit de classe $\mathcal{C}^1$.

---

### Carte 22 [P] — Calcul différentiel

**RECTO :** VRAI ou FAUX ?
"J'ai calculé $\nabla f(A) = 0$. Je peux donc conclure que $f$ admet un extremum local au point $A$."

**VERSO :**
**FAUX !** (Erreur fatale).
Un point critique peut être un extremum (min/max) OU un **point col** (point selle).
*(Exemple : $f(x,y) = x^2 - y^2$. Le point $(0,0)$ est un point critique mais c'est un col).*
Il faut utiliser les dérivées secondes (Notations de Monge ou Hessienne) pour conclure.

---

### Carte 23 [P] — Calcul différentiel

**RECTO :** VRAI ou FAUX ?
"Au point critique $A$, j'obtiens $\Delta = rt - s^2 = 0$. Cela signifie que la fonction est plate, c'est donc un point col."

**VERSO :**
**FAUX !**
Si $\Delta = 0$, **ON NE PEUT PAS CONCLURE** avec cette méthode.
Il faut faire une étude locale (souvent en étudiant le signe de $f(x,y) - f(A)$ autour du point).

---

### Carte 24 [P] — Calcul différentiel

**RECTO :** VRAI ou FAUX ? (Oubli classique sur les extrema globaux)
"Pour trouver le maximum global de $f(x,y)$ sur le disque FERMÉ $D = \{x^2+y^2 \leq 1\}$, il suffit de calculer la valeur de $f$ aux points critiques où $\nabla f = 0$."

**VERSO :**
**FAUX !**
Le gradient nul n'est une condition nécessaire que sur un **OUVERT**. Le maximum peut se situer sur le **BORD** du disque (le cercle), où le gradient n'est pas nul !
Il faut étudier $f$ sur le bord séparément (en posant $x=\cos t, y=\sin t$).

---

### Carte 25 [P] — Calcul différentiel

**RECTO :** VRAI ou FAUX ?
"Je cherche un extremum de $f(x,y) = \sin(x^2 + y^2)$ sur $\mathbb{R}^2$. Je trouve une infinité de points critiques (les cercles de rayon $\sqrt{k\pi/2}$). La matrice Hessienne est inutile ici."

**VERSO :**
**VRAI ! (Esprit critique CCINP).**
Calculer $r, s, t$ serait un cauchemar.
*Réflexe* : Remarquer que $\sin(Z) \in [-1, 1]$. Les points où $\sin(x^2+y^2) = 1$ sont des maxima globaux évidents, pas besoin de dérivées secondes !

---

# Espaces probabilisés

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Espaces probabilisés

**RECTO :** Trigger : On étudie une suite d'événements $(A_n)$ tels que $A_n \subset A_{n+1}$. On te demande de calculer la probabilité de leur union infinie $A = \bigcup_{n=0}^{+\infty} A_n$.

**VERSO :**
**Théorème de la continuité croissante.**
Puisque la suite est croissante pour l'inclusion, on a :
$\mathbb{P}\left(\bigcup_{n=0}^{+\infty} A_n\right) = \lim_{n \to +\infty} \mathbb{P}(A_n)$.

---

### Carte 2 [M] — Espaces probabilisés

**RECTO :** Trigger : On te demande la probabilité que TOUS les événements d'une suite infinie $(B_n)$ se réalisent, sachant que $B_{n+1} \subset B_n$.

**VERSO :**
**Théorème de la continuité décroissante.**
L'événement est l'intersection infinie $\bigcap_{n=0}^{+\infty} B_n$.
Comme la suite est décroissante, $\mathbb{P}\left(\bigcap_{n=0}^{+\infty} B_n\right) = \lim_{n \to +\infty} \mathbb{P}(B_n)$.

---

### Carte 3 [M] — Espaces probabilisés

**RECTO :** Trigger : On choisit une urne parmi trois ($U_1, U_2, U_3$) puis on tire une boule. Comment rédiger rigoureusement le calcul de la probabilité d'obtenir une boule Rouge ($R$) ?

**VERSO :**
**Formule des Probabilités Totales (FPT).**
"Les événements $(U_1, U_2, U_3)$ forment un **Système Complet d'Événements (SCE)** de probabilités non nulles. D'après la FPT :"
$\mathbb{P}(R) = \mathbb{P}(U_1)\mathbb{P}_{U_1}(R) + \mathbb{P}(U_2)\mathbb{P}_{U_2}(R) + \mathbb{P}(U_3)\mathbb{P}_{U_3}(R)$.

---

### Carte 4 [M] — Espaces probabilisés

**RECTO :** Trigger : On connaît $\mathbb{P}(M|M_T)$ (probabilité d'avoir le symptôme sachant qu'on est malade) et on te demande $\mathbb{P}(M_T|M)$ (probabilité d'être malade sachant qu'on a le symptôme).

**VERSO :**
**Formule de Bayes.**
$\mathbb{P}_M(M_T) = \frac{\mathbb{P}(M_T \cap M)}{\mathbb{P}(M)} = \frac{\mathbb{P}(M_T) \times \mathbb{P}_{M_T}(M)}{\mathbb{P}(M)}$
*(Le dénominateur $\mathbb{P}(M)$ se calcule souvent avec la FPT).*

---

### Carte 5 [M] — Espaces probabilisés

**RECTO :** Trigger : On sait que $\mathbb{P}(A) = 1$ et $\mathbb{P}(B) = 1$. Comment prouver rigoureusement que $\mathbb{P}(A \cap B) = 1$ ?

**VERSO :**
**Passer au complémentaire.**
$\mathbb{P}(\overline{A \cap B}) = \mathbb{P}(\bar{A} \cup \bar{B})$.
Par sous-additivité : $\mathbb{P}(\bar{A} \cup \bar{B}) \leq \mathbb{P}(\bar{A}) + \mathbb{P}(\bar{B}) = 0 + 0 = 0$.
Donc $\mathbb{P}(\overline{A \cap B}) = 0$, ce qui prouve $\mathbb{P}(A \cap B) = 1$.

---

### Carte 6 [M] — Espaces probabilisés

**RECTO :** Que signifie que deux événements $A$ et $B$ sont "presque sûrement égaux", et comment le prouver ?

**VERSO :**
Cela signifie que $\mathbb{P}(A) = \mathbb{P}(B) = \mathbb{P}(A \cap B)$.
On le prouve souvent en montrant que l'événement différence symétrique est négligeable : **$\mathbb{P}(A \Delta B) = 0$**.

---

### Carte 7 [M] — Espaces probabilisés

**RECTO :** Comment justifier que l'application $A \mapsto \mathbb{P}_B(A)$ (probabilité conditionnellement à $B$) est une probabilité sur $\Omega$ ?

**VERSO :**
C'est un résultat du cours.
*(Conséquence très utile : toutes les règles des probabilités (FPT, cribles, continuités) s'appliquent à l'identique avec $\mathbb{P}_B$ !)*

---

### Carte 8 [M] — Espaces probabilisés

**RECTO :** Trigger : On joue à une infinité de lancers. $F_n$ = "Face au $n$-ième lancer". Événement $F$ = "Obtenir Face au moins une fois". Comment écrire $F$ avec des ensembles ?

**VERSO :**
C'est l'union de tous les succès possibles :
$F = \bigcup_{n=1}^{+\infty} F_n$
*(Souvent plus simple de passer par le complémentaire : $\bar{F} = \bigcap_{n=1}^{+\infty} \bar{F_n}$, "n'obtenir que des Piles").*

---

### Carte 9 [M] — Espaces probabilisés

**RECTO :** Suite de la carte précédente. Comment calculer $\mathbb{P}\left(\bigcap_{n=1}^{+\infty} \bar{F_n}\right)$ sachant que les lancers sont indépendants avec $\mathbb{P}(\bar{F_n}) = 1-p$ ?

**VERSO :**
On utilise la **Continuité décroissante** sur $E_N = \bigcap_{n=1}^N \bar{F_n}$.
$\mathbb{P}(E_N) = (1-p)^N$ (par indépendance mutuelle).
Puis on passe à la limite : $\mathbb{P} = \lim_{N \to \infty} (1-p)^N = 0$ (si $p>0$).

---

## CARTES THÉORÈME

---

### Carte 10 [T] — Espaces probabilisés

**RECTO :** Quelles sont les **3 conditions** pour qu'un ensemble $\mathcal{A}$ de parties de $\Omega$ soit une **tribu** (ou $\sigma$-algèbre) ?

**VERSO :**
1. $\Omega \in \mathcal{A}$
2. Stabilité par passage au **complémentaire** : $A \in \mathcal{A} \implies \bar{A} \in \mathcal{A}$
3. Stabilité par **union dénombrable** : $(A_n) \in \mathcal{A}^\mathbb{N} \implies \bigcup_{n=0}^{+\infty} A_n \in \mathcal{A}$.

---

### Carte 11 [T] — Espaces probabilisés

**RECTO :** Indépendance et complémentaire : Si $A$ et $B$ sont indépendants, quels autres couples d'événements le sont automatiquement ?

**VERSO :**
Les couples :
- $A$ et $\bar{B}$
- $\bar{A}$ et $B$
- $\bar{A}$ et $\bar{B}$

---

### Carte 12 [T] — Espaces probabilisés

**RECTO :** Définition de l'événement $\limsup A_n$ (limite supérieure) ? (Formule mathématique et signification en français).

**VERSO :**
$\limsup A_n = \bigcap_{n=0}^{+\infty} \bigcup_{k=n}^{+\infty} A_k$
Cela correspond à l'événement : **"Une infinité d'événements $A_n$ se réalisent."**

---

### Carte 13 [T] — Espaces probabilisés

**RECTO :** Premier Lemme de Borel-Cantelli : Quelle est l'hypothèse sur la série $\sum \mathbb{P}(A_n)$ et que conclut-il sur $\mathbb{P}(\limsup A_n)$ ?

**VERSO :**
**Hypothèse :** La série $\sum \mathbb{P}(A_n)$ **converge**.
**Conclusion :** $\mathbb{P}(\limsup A_n) = 0$.
*(La probabilité qu'une infinité d'événements se réalisent est nulle).*

---

### Carte 14 [T] — Espaces probabilisés

**RECTO :** Second Lemme de Borel-Cantelli : Quelles sont les **deux** hypothèses pour conclure que $\mathbb{P}(\limsup A_n) = 1$ ?

**VERSO :**
1. La série $\sum \mathbb{P}(A_n)$ **diverge** ($= +\infty$).
2. Les événements $(A_n)$ sont **mutuellement indépendants**. *(Oubli fréquent !)*

---

## CARTES CALCUL

---

### Carte 15 [C] — Espaces probabilisés

**RECTO :** Formule des **probabilités composées** : On pioche 3 cartes l'une après l'autre. Comment écrire $\mathbb{P}(A_1 \cap A_2 \cap A_3)$ ?

**VERSO :**
$\mathbb{P}(A_1 \cap A_2 \cap A_3) = \mathbb{P}(A_1) \times \mathbb{P}_{A_1}(A_2) \times \mathbb{P}_{A_1 \cap A_2}(A_3)$
*(À condition que les événements conditionnants soient de probabilité non nulle).*

---

### Carte 16 [C] — Espaces probabilisés

**RECTO :** Formule du crible (Inclusion-Exclusion) pour $\mathbb{P}(A \cup B)$ ?

**VERSO :**
$\mathbb{P}(A \cup B) = \mathbb{P}(A) + \mathbb{P}(B) - \mathbb{P}(A \cap B)$

---

### Carte 17 [C] — Espaces probabilisés

**RECTO :** On a $n$ urnes. La probabilité de tirer une boule rouge dans l'urne $k$ est $p_k$. On choisit une urne au hasard (uniformément). Formule de $\mathbb{P}(R)$ ?

**VERSO :**
On utilise la FPT avec le SCE $U_k$ ("choisir l'urne $k$"), avec $\mathbb{P}(U_k) = \frac{1}{n}$.
$\mathbb{P}(R) = \sum_{k=1}^n \mathbb{P}(U_k)\mathbb{P}_{U_k}(R) = \frac{1}{n} \sum_{k=1}^n p_k$.

---

### Carte 18 [C] — Espaces probabilisés

**RECTO :** Si $(A_n)_{n \in \mathbb{N}^*}$ est une suite d'événements mutuellement indépendants, comment calculer $\mathbb{P}\left(\bigcap_{k=1}^n A_k\right)$ ?

**VERSO :**
**C'est le produit des probabilités.**
$\mathbb{P}\left(\bigcap_{k=1}^n A_k\right) = \prod_{k=1}^n \mathbb{P}(A_k)$
*(C'est la définition même de l'indépendance mutuelle).*

---

### Carte 19 [C] — Espaces probabilisés

**RECTO :** Probabilité conditionnelle : Quelle est la définition de $\mathbb{P}_A(B)$ (ou $\mathbb{P}(B|A)$) sachant $\mathbb{P}(A) > 0$ ?

**VERSO :**
$\mathbb{P}_A(B) = \frac{\mathbb{P}(A \cap B)}{\mathbb{P}(A)}$

---

## CARTES PIÈGE

---

### Carte 20 [P] — Espaces probabilisés

**RECTO :** VRAI ou FAUX ? (Oubli classique)
"Si je dispose d'une suite d'événements $(A_n)_{n \in \mathbb{N}}$, alors $\mathbb{P}\left(\bigcup_{n=0}^{+\infty} A_n\right) = \sum_{n=0}^{+\infty} \mathbb{P}(A_n)$."

**VERSO :**
**FAUX !**
C'est vrai **SI ET SEULEMENT SI** les événements $A_n$ sont **deux à deux incompatibles** (disjoints). Sans cette hypothèse, on a seulement la sous-additivité : $\mathbb{P}(\cup A_n) \leq \sum \mathbb{P}(A_n)$.

---

### Carte 21 [P] — Espaces probabilisés

**RECTO :** VRAI ou FAUX ? (Rapport de jury)
"Pour appliquer la FPT avec une suite $(A_n)_{n \in \mathbb{N}}$, il suffit de dire que les $A_n$ forment une partition de $\Omega$."

**VERSO :**
**FAUX !** (Sanctionné à l'écrit).
Il faut écrire que c'est un **Système Complet d'Événements (SCE)** ET vérifier que **$\mathbb{P}(A_n) > 0$** pour pouvoir utiliser les probabilités conditionnelles $\mathbb{P}_{A_n}(B)$ dans la somme !

---

### Carte 22 [P] — Espaces probabilisés

**RECTO :** VRAI ou FAUX ?
"J'ai prouvé que $\mathbb{P}(A \cap B) = \mathbb{P}(A)\mathbb{P}(B)$, $\mathbb{P}(A \cap C) = \mathbb{P}(A)\mathbb{P}(C)$ et $\mathbb{P}(B \cap C) = \mathbb{P}(B)\mathbb{P}(C)$. Les trois événements sont donc mutuellement indépendants."

**VERSO :**
**FAUX !** (Piège incontournable).
Ils sont seulement **indépendants deux à deux**.
Pour l'indépendance mutuelle, il MANQUE la condition globale : $\mathbb{P}(A \cap B \cap C) = \mathbb{P}(A)\mathbb{P}(B)\mathbb{P}(C)$.

---

### Carte 23 [P] — Espaces probabilisés

**RECTO :** VRAI ou FAUX ?
"On me dit que les événements $A$ et $B$ sont **incompatibles** ($A \cap B = \emptyset$) et de probabilités non nulles. Je peux donc dire qu'ils sont **indépendants**."

**VERSO :**
**FAUX !** (C'est même l'inverse !).
S'ils sont incompatibles, $\mathbb{P}(A \cap B) = 0$.
S'ils ont des probabilités non nulles, $\mathbb{P}(A)\mathbb{P}(B) > 0$.
Donc $\mathbb{P}(A \cap B) \neq \mathbb{P}(A)\mathbb{P}(B)$, ils ne sont **jamais** indépendants.

---

### Carte 24 [P] — Espaces probabilisés

**RECTO :** VRAI ou FAUX ?
"Si $\mathbb{P}(A) = 0$, alors l'événement $A$ est l'événement impossible ($A = \emptyset$)."

**VERSO :**
**FAUX !**
C'est vrai dans un univers fini, mais faux dans un univers infini.
On dit que $A$ est **presque sûrement** impossible (ou négligeable).
*(Exemple : tirer exactement 0,5 au hasard uniformément sur $[0,1]$ a une proba 0, mais n'est pas impossible).*

---

### Carte 25 [P] — Espaces probabilisés

**RECTO :** VRAI ou FAUX ?
"Pour montrer qu'une famille $(A_i)_{i \in I}$ forme un Système Complet d'Événements, il suffit de prouver que les événements sont deux à deux incompatibles ($A_i \cap A_j = \emptyset$)."

**VERSO :**
**FAUX !**
Il faut AUSSI prouver qu'ils recouvrent tout l'univers, c'est-à-dire que **$\bigcup_{i \in I} A_i = \Omega$** (ou de manière équivalente, que $\sum \mathbb{P}(A_i) = 1$).

---

# Variables aléatoires discrètes

---

## CARTES MÉTHODE

---

### Carte 1 [M] — VA Discrètes

**RECTO :** Trigger : On donne la loi de $X$ (ex: $X \sim \mathcal{P}(\lambda)$) et on te demande de calculer l'espérance de $Y = \frac{1}{X+1}$. Quelle est la rédaction/formule exigée ?

**VERSO :**
**Le Théorème de transfert.**
Sous réserve de convergence (absolue), $\mathbb{E}\left(\frac{1}{X+1}\right) = \sum_{k \in X(\Omega)} \frac{1}{k+1} \mathbb{P}(X=k)$.

---

### Carte 2 [M] — VA Discrètes

**RECTO :** Trigger : "On lance un dé de manière indépendante jusqu'à obtenir le premier 6. $X$ est le nombre de lancers nécessaires." Quelle est la loi de $X$ ?

**VERSO :**
**Loi Géométrique** $\mathcal{G}(p)$ avec $p = 1/6$.
*Justification attendue* : $X$ modélise le temps d'attente du premier succès lors d'une succession d'épreuves de Bernoulli indépendantes et identiquement distribuées.

---

### Carte 3 [M] — VA Discrètes

**RECTO :** Trigger : On cherche la loi du minimum de deux variables $Z = \min(X, Y)$ avec $X, Y$ indépendantes à valeurs dans $\mathbb{N}$. Quel est l'outil optimal ?

**VERSO :**
**Passer par la probabilité de l'événement contraire (queue de distribution).**
On calcule $\mathbb{P}(Z > k) = \mathbb{P}(X > k \cap Y > k) = \mathbb{P}(X > k)\mathbb{P}(Y > k)$ (grâce à l'indépendance).
Puis on en déduit $\mathbb{P}(Z=k) = \mathbb{P}(Z > k-1) - \mathbb{P}(Z > k)$.

---

### Carte 4 [M] — VA Discrètes

**RECTO :** Comment calculer l'espérance $\mathbb{E}(X)$ à partir de la fonction génératrice $G_X(t)$ ?

**VERSO :**
$\mathbb{E}(X) = G_X'(1)$.
*(On dérive $G_X$, puis on évalue en $t=1$. C'est très souvent plus rapide que de calculer la somme classique $\sum k P(X=k)$).*

---

### Carte 5 [M] — VA Discrètes

**RECTO :** Formule pour calculer la variance $\mathbb{V}(X)$ à partir de la fonction génératrice $G_X(t)$ ?

**VERSO :**
$\mathbb{V}(X) = G_X''(1) + G_X'(1) - (G_X'(1))^2$.
*(Se démontre en utilisant le fait que $G_X''(1) = \mathbb{E}(X(X-1)) = \mathbb{E}(X^2) - \mathbb{E}(X)$).*

---

### Carte 6 [M] — VA Discrètes

**RECTO :** Trigger : $X$ et $Y$ sont **indépendantes**. On demande de trouver la loi de la somme $Z = X+Y$. Quelle méthode utiliser si les lois sont connues (ex: deux lois de Poisson) ?

**VERSO :**
**Le produit des fonctions génératrices.**
Si $X$ et $Y$ sont indépendantes, alors $G_{X+Y}(t) = G_X(t) \times G_Y(t)$.
On calcule ce produit, on reconnaît une fonction génératrice du cours, et par unicité du DSE, on conclut sur la loi de $Z$.

---

### Carte 7 [M] — VA Discrètes

**RECTO :** Trigger : On a $X \sim \mathcal{U}(\llbracket -2, 2 \rrbracket)$. On pose $Y = X^2$. Comment déterminer la loi de $Y$ (sans formule toute faite) ?

**VERSO :**
**Écrire l'événement $\{Y = y\}$ en fonction de $X$.**
$Y(\Omega) = \{0, 1, 4\}$.
Exemple : $\mathbb{P}(Y = 4) = \mathbb{P}(X^2 = 4) = \mathbb{P}(X = 2 \cup X = -2) = \mathbb{P}(X=2) + \mathbb{P}(X=-2)$.

---

## CARTES THÉORÈME

---

### Carte 8 [T] — VA Discrètes

**RECTO :** Quelle est la condition mathématique stricte pour que l'espérance $\mathbb{E}(X)$ d'une variable aléatoire $X$ à valeurs dans $\mathbb{Z}$ existe ?

**VERSO :**
La série $\sum_{n \in \mathbb{Z}} n \mathbb{P}(X=n)$ doit converger **ABSOLUMENT** (c'est-à-dire $\sum |n| \mathbb{P}(X=n) < +\infty$).
*(Si la convergence n'est pas absolue, l'espérance n'existe pas).*

---

### Carte 9 [T] — VA Discrètes

**RECTO :** Formule générale de $\mathbb{V}(X+Y)$ ? À quelle condition stricte a-t-on $\mathbb{V}(X+Y) = \mathbb{V}(X) + \mathbb{V}(Y)$ ?

**VERSO :**
$\mathbb{V}(X+Y) = \mathbb{V}(X) + \mathbb{V}(Y) + 2\text{Cov}(X,Y)$.
L'égalité est vraie si et seulement si $X$ et $Y$ sont **non corrélées** (ce qui est vrai si elles sont indépendantes).

---

### Carte 10 [T] — VA Discrètes

**RECTO :** Que peut-on affirmer sur le rayon de convergence $R$ de la série entière définissant $G_X(t)$ ?

**VERSO :**
Le rayon de convergence vérifie toujours **$R \geq 1$**.
*(Car pour $t=1$, on a $\sum \mathbb{P}(X=k) = 1$, la série converge donc absolument).*

---

### Carte 11 [T] — VA Discrètes

**RECTO :** Soit $X$ une V.A. positive d'espérance finie. Que dit l'inégalité de Markov pour $a > 0$ ?

**VERSO :**
$\mathbb{P}(X \geq a) \leq \frac{\mathbb{E}(X)}{a}$.

---

### Carte 12 [T] — VA Discrètes

**RECTO :** Soit $X$ une V.A. admettant une variance $\mathbb{V}(X)$. Que dit l'inégalité de Bienaymé-Tchebychev pour $\varepsilon > 0$ ?

**VERSO :**
$\mathbb{P}(|X - \mathbb{E}(X)| \geq \varepsilon) \leq \frac{\mathbb{V}(X)}{\varepsilon^2}$.
*(Très utile pour borner la probabilité d'un écart à la moyenne).*

---

### Carte 13 [T] — VA Discrètes

**RECTO :** Stabilité de la loi de Poisson : Quelle est la loi de la somme $X+Y$ si $X \sim \mathcal{P}(\lambda)$ et $Y \sim \mathcal{P}(\mu)$ sont **indépendantes** ?

**VERSO :**
$X+Y \sim \mathcal{P}(\lambda + \mu)$.

---

## CARTES CALCUL

---

### Carte 14 [C] — VA Discrètes

**RECTO :** Soit $X \sim \mathcal{B}(n,p)$ (Loi Binomiale). Formule de $\mathbb{P}(X=k)$ et support $X(\Omega)$ ?

**VERSO :**
$X(\Omega) = \llbracket 0, n \rrbracket$.
Pour $k \in \llbracket 0, n \rrbracket$ : $\mathbb{P}(X=k) = \binom{n}{k} p^k (1-p)^{n-k}$.

---

### Carte 15 [C] — VA Discrètes

**RECTO :** Espérance et Variance de $X \sim \mathcal{B}(n,p)$ ?

**VERSO :**
$\mathbb{E}(X) = np$ 
$\mathbb{V}(X) = np(1-p)$.

---

### Carte 16 [C] — VA Discrètes

**RECTO :** Soit $X \sim \mathcal{G}(p)$ (Loi Géométrique). Formule de $\mathbb{P}(X=k)$ et support $X(\Omega)$ ?

**VERSO :**
$X(\Omega) = \mathbb{N}^*$ (On lance au moins 1 fois !).
Pour $k \geq 1$ : $\mathbb{P}(X=k) = p(1-p)^{k-1}$.

---

### Carte 17 [C] — VA Discrètes

**RECTO :** Espérance et Variance de $X \sim \mathcal{G}(p)$ ?

**VERSO :**
$\mathbb{E}(X) = \frac{1}{p}$ 
$\mathbb{V}(X) = \frac{1-p}{p^2}$.

---

### Carte 18 [C] — VA Discrètes

**RECTO :** Soit $X \sim \mathcal{P}(\lambda)$ (Loi de Poisson avec $\lambda > 0$). Formule de $\mathbb{P}(X=k)$ et support $X(\Omega)$ ?

**VERSO :**
$X(\Omega) = \mathbb{N}$.
Pour $k \geq 0$ : $\mathbb{P}(X=k) = e^{-\lambda} \frac{\lambda^k}{k!}$.

---

### Carte 19 [C] — VA Discrètes

**RECTO :** Espérance et Variance de $X \sim \mathcal{P}(\lambda)$ ?

**VERSO :**
$\mathbb{E}(X) = \lambda$ 
$\mathbb{V}(X) = \lambda$.
*(Moyen mnémotechnique : E et V sont égales pour Poisson).*

---

### Carte 20 [C] — VA Discrètes

**RECTO :** Formule de Koenig-Huygens pour calculer la covariance $\text{Cov}(X,Y)$ ?

**VERSO :**
$\text{Cov}(X,Y) = \mathbb{E}(XY) - \mathbb{E}(X)\mathbb{E}(Y)$.
*(Utile pour le calcul pratique, notamment si $\text{Cov}(X,Y)=0 \iff \mathbb{E}(XY)=\mathbb{E}(X)\mathbb{E}(Y)$).*

---

### Carte 21 [C] — VA Discrètes

**RECTO :** Définition (série entière) de la fonction génératrice $G_X(t)$ pour une variable aléatoire $X$ à valeurs dans $\mathbb{N}$ ?

**VERSO :**
$G_X(t) = \mathbb{E}(t^X) = \sum_{k=0}^{+\infty} \mathbb{P}(X=k) t^k$.

---

### Carte 22 [C] — VA Discrètes

**RECTO :** Propriété "d'absence de mémoire" : Quelle est la formule exacte qui caractérise la loi géométrique pour $n, k \in \mathbb{N}^*$ ?

**VERSO :**
$\mathbb{P}_{(X > n)}(X > n+k) = \mathbb{P}(X > k)$.
*(Le fait d'avoir attendu $n$ échecs ne modifie pas la probabilité d'attendre encore $k$ échecs supplémentaires).*

---

## CARTES PIÈGE

---

### Carte 23 [P] — VA Discrètes

**RECTO :** VRAI ou FAUX ? (Rapport de jury CCINP : justification sanctionnée)
"L'expérience compte $n$ succès ou échecs, avec probabilité $p$ de succès. Donc $X$ suit une loi binomiale $\mathcal{B}(n,p)$."

**VERSO :**
**FAUX !** (La justification vaut 0).
Il manque le point essentiel : il faut écrire en toutes lettres que l'expérience est constituée de $n$ épreuves de Bernoulli **INDÉPENDANTES** et **IDENTIQUEMENT DISTRIBUÉES**.

---

### Carte 24 [P] — VA Discrètes

**RECTO :** VRAI ou FAUX ? (Erreur fatale sur les propriétés de la variance)
"On a $\mathbb{V}(-2X + 3) = -2\mathbb{V}(X) + 3$."

**VERSO :**
**FAUX !**
La variance n'est **PAS** linéaire. Les constantes additives disparaissent, et les facteurs multiplicatifs sortent au **CARRÉ**.
$\mathbb{V}(aX+b) = a^2 \mathbb{V}(X)$. Ici, $\mathbb{V}(-2X+3) = 4\mathbb{V}(X)$.

---

### Carte 25 [P] — VA Discrètes

**RECTO :** VRAI ou FAUX ? (Confusion classique ciblée par les jurys)
"J'ai calculé $\text{Cov}(X,Y) = 0$. Je peux donc affirmer que $X$ et $Y$ sont indépendantes."

**VERSO :**
**FAUX !**
Elles sont seulement **non corrélées**. 
L'indépendance implique une covariance nulle, mais la réciproque est FAUSSE en général.

---

# Variables aléatoires à densité et variables générales

---

## CARTES MÉTHODE

---

### Carte 1 [M] — VA à densité

**RECTO :** Trigger : On donne $X \sim \mathcal{E}(\lambda)$. On demande de calculer l'espérance de $Y = e^{-X}$. Réflexe absolu ?

**VERSO :**
**Le Théorème de Transfert.**
Sous réserve de convergence absolue, $\mathbb{E}(e^{-X}) = \int_{-\infty}^{+\infty} e^{-t} f_X(t) dt = \int_0^{+\infty} e^{-t} \lambda e^{-\lambda t} dt$.

---

### Carte 2 [M] — VA à densité

**RECTO :** Trigger : On connaît la densité $f_X$ de $X \sim \mathcal{U}([0,1])$. On pose $Y = -\ln(X)$. Comment trouver la densité $f_Y$ de $Y$ ? (Méthode de la muette).

**VERSO :**
**Passer par la fonction de répartition !**
1. On écrit : $F_Y(y) = \mathbb{P}(-\ln(X) \le y) = \mathbb{P}(X \ge e^{-y}) = 1 - F_X(e^{-y})$.
2. On dérive $F_Y$ pour obtenir la densité $f_Y(y) = e^{-y} f_X(e^{-y})$.

---

### Carte 3 [M] — VA à densité

**RECTO :** Trigger : $X \sim \mathcal{N}(2, 9)$. Comment calculer rigoureusement $\mathbb{P}(X \le 5)$ en fonction de $\Phi$ (Fonction de répartition de $\mathcal{N}(0,1)$) ?

**VERSO :**
**Centrer et Réduire !** (Ici $\mu=2, \sigma^2=9 \implies \sigma=3$).
On pose $Z = \frac{X - 2}{3} \sim \mathcal{N}(0,1)$.
$\mathbb{P}(X \le 5) = \mathbb{P}\left(\frac{X-2}{3} \le \frac{5-2}{3}\right) = \mathbb{P}(Z \le 1) = \Phi(1)$.

---

### Carte 4 [M] — VA à densité

**RECTO :** Trigger : On étudie le système avec deux composants en série. Leur durée de vie est $Z = \min(X, Y)$ avec $X, Y$ indépendantes. Comment trouver $F_Z(z)$ ?

**VERSO :**
**Passer par l'événement contraire.**
$\mathbb{P}(Z > z) = \mathbb{P}(X > z \cap Y > z) = \mathbb{P}(X > z)\mathbb{P}(Y > z)$ (par indépendance).
Puis on en déduit $F_Z(z) = 1 - \mathbb{P}(Z > z)$.

---

### Carte 5 [M] — VA à densité

**RECTO :** Trigger : On étudie le système avec deux composants en parallèle. Leur durée de vie est $Z = \max(X, Y)$ avec $X,Y$ indépendantes. Comment trouver $F_Z(z)$ ?

**VERSO :**
**Utiliser directement la fonction de répartition.**
$F_Z(z) = \mathbb{P}(\max(X,Y) \le z) = \mathbb{P}(X \le z \cap Y \le z) = F_X(z) \times F_Y(z)$.

---

### Carte 6 [M] — VA à densité

**RECTO :** Trigger : On sait que $X \sim \mathcal{N}(0,1)$. Que vaut immédiatement $\mathbb{E}(X^3)$ (et plus généralement $\mathbb{E}(X^{2k+1})$) ?

**VERSO :**
**Zéro.**
La fonction $x \mapsto x^3 \varphi(x)$ est **impaire**. Sous réserve de convergence (qui est assurée par l'exponentielle écrasant le polynôme), l'intégrale sur $\mathbb{R}$ est nulle.

---

### Carte 7 [M] — VA à densité

**RECTO :** Trigger (Informatique & Probas) : On dispose de $U \sim \mathcal{U}(]0,1[)$ via `rd.random()`. Quelle variable poser pour simuler un tirage de loi $\mathcal{E}(\lambda)$ ?

**VERSO :**
**Méthode d'inversion de la fonction de répartition.**
On pose $X = -\frac{1}{\lambda} \ln(1-U)$ (ou $X = -\frac{1}{\lambda} \ln(U)$ car $U$ et $1-U$ ont la même loi).

---

## CARTES THÉORÈME

---

### Carte 8 [T] — VA à densité

**RECTO :** Quelles sont les **3 propriétés** pour qu'une fonction $f : \mathbb{R} \to \mathbb{R}$ soit une **densité de probabilité** ?

**VERSO :**
1. $f$ est **positive** ($f \ge 0$ sur $\mathbb{R}$).
2. $f$ est **continue par morceaux** sur $\mathbb{R}$.
3. L'intégrale $\int_{-\infty}^{+\infty} f(t) dt$ converge et **vaut 1**.

---

### Carte 9 [T] — VA à densité

**RECTO :** Lien entre fonction de répartition $F_X(x)$ et densité $f$ ? (Formule)

**VERSO :**
$F_X(x) = \mathbb{P}(X \le x) = \int_{-\infty}^x f(t) dt$.
*(Corollaire : En tout point $x$ où $f$ est continue, $F_X$ est dérivable et $F_X'(x) = f(x)$).*

---

### Carte 10 [T] — VA à densité

**RECTO :** Quelle est la condition mathématique **stricte** pour que l'espérance $\mathbb{E}(X)$ d'une variable à densité $f$ existe ?

**VERSO :**
L'intégrale $\int_{-\infty}^{+\infty} t f(t) dt$ doit être **ABSOLUMENT convergente**.
*(Le jury sanctionne l'oubli du mot "absolument" ou l'oubli de la vérification de l'intégrabilité de $|t|f(t)$).*

---

### Carte 11 [T] — VA à densité

**RECTO :** Stabilité affine de la loi normale : Si $X \sim \mathcal{N}(\mu, \sigma^2)$, quelle est la loi de $Y = aX + b$ (avec $a \neq 0$) ?

**VERSO :**
$Y \sim \mathcal{N}(a\mu + b, a^2\sigma^2)$.
*(Attention : c'est bien $a^2$ qui multiplie la variance !)*

---

### Carte 12 [T] — VA à densité

**RECTO :** Stabilité de la loi normale par somme : Si $X \sim \mathcal{N}(\mu_1, \sigma_1^2)$ et $Y \sim \mathcal{N}(\mu_2, \sigma_2^2)$ sont **indépendantes**, quelle est la loi de $X+Y$ ?

**VERSO :**
$X+Y \sim \mathcal{N}(\mu_1 + \mu_2, \sigma_1^2 + \sigma_2^2)$.
*(Attention : il FAUT l'indépendance pour sommer les variances).*

---

### Carte 13 [T] — VA à densité

**RECTO :** Propriété "d'absence de mémoire" pour les variables à densité. Quelle est la formule et quelle est la SEULE loi continue vérifiant cette propriété ?

**VERSO :**
Formule : $\mathbb{P}_{(X > t)}(X > t+s) = \mathbb{P}(X > s)$.
C'est la caractérisation unique de la **loi Exponentielle** $\mathcal{E}(\lambda)$.

---

## CARTES CALCUL

---

### Carte 14 [C] — VA à densité

**RECTO :** Loi uniforme $\mathcal{U}([a,b])$ : Densité $f(x)$ et Fonction de répartition $F(x)$ sur $[a,b]$ ?

**VERSO :**
- Densité : $f(x) = \frac{1}{b-a}$ sur $[a,b]$ (0 ailleurs).
- Fonction de répartition : $F(x) = \frac{x-a}{b-a}$ pour $x \in [a,b]$.

---

### Carte 15 [C] — VA à densité

**RECTO :** Espérance et Variance de $X \sim \mathcal{U}([a,b])$ ?

**VERSO :**
$\mathbb{E}(X) = \frac{a+b}{2}$ 
$\mathbb{V}(X) = \frac{(b-a)^2}{12}$.

---

### Carte 16 [C] — VA à densité

**RECTO :** Loi Exponentielle $X \sim \mathcal{E}(\lambda)$ (avec $\lambda > 0$) : Densité $f(x)$ et Fonction de répartition $F(x)$ pour $x \ge 0$ ?

**VERSO :**
- Densité : $f(x) = \lambda e^{-\lambda x}$ sur $[0, +\infty[$ (0 ailleurs).
- Fonction de répartition : $F(x) = 1 - e^{-\lambda x}$.

---

### Carte 17 [C] — VA à densité

**RECTO :** Espérance et Variance de la loi Exponentielle $X \sim \mathcal{E}(\lambda)$ ?

**VERSO :**
$\mathbb{E}(X) = \frac{1}{\lambda}$
$\mathbb{V}(X) = \frac{1}{\lambda^2}$.

---

### Carte 18 [C] — VA à densité

**RECTO :** Loi Normale Centrée Réduite $X \sim \mathcal{N}(0,1)$ : Formule de la densité $\varphi(x)$ ?

**VERSO :**
$\varphi(x) = \frac{1}{\sqrt{2\pi}} e^{-\frac{x^2}{2}}$ définie sur $\mathbb{R}$.

---

### Carte 19 [C] — VA à densité

**RECTO :** Symétrie de la loi normale : Comment exprimer $\Phi(-x)$ en fonction de $\Phi(x)$ pour tout réel $x$ ?

**VERSO :**
$\Phi(-x) = 1 - \Phi(x)$.
*(Conséquence directe du fait que la densité $\varphi$ de la loi normale centrée est paire).*

---

## CARTES PIÈGE

---

### Carte 20 [P] — VA à densité

**RECTO :** VRAI ou FAUX ? (Rapport de jury)
"La densité $f_X$ de la loi uniforme $\mathcal{U}([0,1])$ est discontinue en 0 et en 1. Donc la fonction de répartition $F_X$ est discontinue en 0 et en 1."

**VERSO :**
**FAUX !** (Erreur fatale).
La fonction de répartition $F_X$ d'une variable à densité est **TOUJOURS continue sur $\mathbb{R}$ tout entier**, même aux points de discontinuité de la densité.

---

### Carte 21 [P] — VA à densité

**RECTO :** VRAI ou FAUX ?
"Pour une variable aléatoire à densité, les probabilités $\mathbb{P}(X \ge a)$ et $\mathbb{P}(X > a)$ sont toujours égales."

**VERSO :**
**VRAI.**
Pour une VA à densité, la probabilité d'un point isolé est toujours nulle : $\mathbb{P}(X = a) = \int_a^a f(t)dt = 0$. On peut donc inclure ou exclure les bornes sans changer la probabilité.

---

### Carte 22 [P] — VA à densité

**RECTO :** VRAI ou FAUX ? (Erreur de calcul classique)
"Soit $X \sim \mathcal{E}(3)$. Alors sa variance vaut $\mathbb{V}(X) = \frac{1}{3}$."

**VERSO :**
**FAUX !**
La variance est en $1/\lambda^2$. Donc $\mathbb{V}(X) = \frac{1}{9}$. 
*(Le jury note que cette erreur absurde est extrêmement fréquente).*

---

### Carte 23 [P] — VA à densité

**RECTO :** VRAI ou FAUX ?
"Je sais que $f$ est une densité, donc l'intégrale $\int_{-\infty}^{+\infty} f(x) dx$ vaut 1. J'en déduis nécessairement que $\lim_{x \to +\infty} f(x) = 0$."

**VERSO :**
**FAUX !** (Même piège qu'au chapitre intégration).
Une fonction intégrable n'a pas nécessairement de limite en $+\infty$. Elle peut avoir des "pics" arbitrairement hauts mais de plus en plus fins.

---

### Carte 24 [P] — VA à densité

**RECTO :** VRAI ou FAUX ?
"Dans la loi uniforme sur $[a,b]$, l'espérance est $(a+b)/2$, c'est-à-dire le milieu de l'intervalle. Donc dans la loi exponentielle $\mathcal{E}(\lambda)$ sur $[0, +\infty[$, la médiane est égale à l'espérance $1/\lambda$."

**VERSO :**
**FAUX.**
La loi exponentielle est très asymétrique. La médiane $m$ vérifie $1 - e^{-\lambda m} = 0.5 \implies m = \frac{\ln(2)}{\lambda}$, ce qui est strictement inférieur à l'espérance $1/\lambda$.

---

### Carte 25 [P] — VA à densité

**RECTO :** VRAI ou FAUX ?
"Soit $X \sim \mathcal{N}(0,1)$. On veut la densité de $Y = X^2$. Comme $Y = X^2$, par la formule de dérivation, $f_Y(y) = 2x f_X(x)$."

**VERSO :**
**FAUX ! Absurde !**
On ne transforme PAS les densités en dérivant la variable ! Il faut **toujours** passer par la fonction de répartition $F_Y(y) = \mathbb{P}(X^2 \le y) = \mathbb{P}(-\sqrt{y} \le X \le \sqrt{y})$, puis dériver par rapport à $y$.

---

# Convergences d'une suite de variables aléatoires

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Convergences

**RECTO :** Trigger : On te demande de prouver que la suite $X_n$ converge en probabilité vers une **constante** $c$. Tu connais l'espérance et la variance de $X_n$. Réflexe ?

**VERSO :**
**Inégalité de Bienaymé-Tchebychev.**
$\mathbb{P}(|X_n - c| \ge \varepsilon) \le \frac{\mathbb{V}(X_n)}{\varepsilon^2}$ (à condition que $\mathbb{E}(X_n) = c$).
Si on prouve que $\lim_{n \to \infty} \mathbb{V}(X_n) = 0$, c'est gagné !

---

### Carte 2 [M] — Convergences

**RECTO :** Trigger : Approximation de la loi binomiale. Soit $X_n \sim \mathcal{B}(n, p)$. On te demande de trouver la limite de $\mathbb{P}(X_n \le np)$. Outil ?

**VERSO :**
**Le TCL (Théorème Central Limite).**
On écrit $X_n$ comme la somme de $n$ variables de Bernoulli i.i.d $\sim \mathcal{B}(p)$.
$\mathbb{P}\left(\frac{X_n - np}{\sqrt{np(1-p)}} \le 0\right) \to \mathbb{P}(Z \le 0) = \frac{1}{2}$ avec $Z \sim \mathcal{N}(0,1)$.

---

### Carte 3 [M] — Convergences

**RECTO :** Trigger : On étudie une suite de variables discrètes à valeurs dans $\mathbb{N}$. Comment montrer plus simplement que $X_n \xrightarrow{\mathcal{L}} X$ sans passer par $F_X(x)$ ?

**VERSO :**
Pour des V.A. discrètes à valeurs dans $\mathbb{N}$, il suffit de prouver que pour tout entier $k \in \mathbb{N}$ :
$\lim_{n \to \infty} \mathbb{P}(X_n = k) = \mathbb{P}(X = k)$.

---

### Carte 4 [M] — Convergences

**RECTO :** Trigger : Loi des extrêmes. $X_1, \dots, X_n \sim \mathcal{U}([0, 1])$. Soit le maximum $M_n = \max(X_1, \dots, X_n)$. Montrer que $M_n \xrightarrow{\mathbb{P}} 1$.

**VERSO :**
Soit $\varepsilon > 0$. $\mathbb{P}(|M_n - 1| \ge \varepsilon) = \mathbb{P}(M_n \le 1 - \varepsilon)$ (car $M_n \le 1$).
Par indépendance : $\mathbb{P}(X_1 \le 1 - \varepsilon \cap \dots) = \mathbb{P}(X_1 \le 1-\varepsilon)^n = (1-\varepsilon)^n$.
Or $0 < 1-\varepsilon < 1$, donc la limite est $0$.

---

### Carte 5 [M] — Convergences

**RECTO :** Trigger : On a $X_n \sim \mathcal{P}(n)$. Comment trouver la limite en loi de $Z_n = \frac{X_n - n}{\sqrt{n}}$ sans utiliser les probabilités cumulées difficiles ?

**VERSO :**
**Astuce : voir Poisson comme une somme !**
Si on a $n$ variables $Y_i \sim \mathcal{P}(1)$ i.i.d, alors $\sum_{i=1}^n Y_i \sim \mathcal{P}(n)$.
Donc $X_n$ peut être vue comme une somme. Par le **TCL**, $Z_n$ (somme centrée réduite) converge en loi vers $\mathcal{N}(0,1)$.

---

### Carte 6 [M] — Convergences

**RECTO :** Trigger : Approximation d'Hypergéométrique. On tire sans remise $n$ boules dans une urne qui contient une proportion $p$ de succès. Le nombre total de boules $N \to +\infty$.

**VERSO :**
**Convergence en loi vers la Binomiale.**
La loi hypergéométrique $\mathcal{H}(N, n, p)$ converge en loi vers la loi binomiale $\mathcal{B}(n, p)$ lorsque $N \to +\infty$. (Les tirages "sans remise" deviennent asymptotiquement "avec remise" car $N$ est immense face à $n$).

---

### Carte 7 [M] — Convergences

**RECTO :** Trigger : Approximation de Binomiale. On a $X_n \sim \mathcal{B}(n, \frac{\lambda}{n})$. Vers quoi converge $X_n$ en loi quand $n \to +\infty$ ?

**VERSO :**
**Convergence vers la loi de Poisson.**
$X_n \xrightarrow{\mathcal{L}} \mathcal{P}(\lambda)$.
*(Loi des événements rares : $n$ est grand, la probabilité $p = \lambda/n$ est très petite).*

---

## CARTES THÉORÈME

---

### Carte 8 [T] — Convergences

**RECTO :** Définition mathématique exacte de la **convergence en probabilité** : $X_n \xrightarrow{\mathbb{P}} X$ ?

**VERSO :**
Pour tout $\varepsilon > 0$ :
$\lim_{n \to +\infty} \mathbb{P}(|X_n - X| \ge \varepsilon) = 0$.
*(Ou de manière équivalente : $\lim_{n \to +\infty} \mathbb{P}(|X_n - X| < \varepsilon) = 1$).*

---

### Carte 9 [T] — Convergences

**RECTO :** Définition de la **convergence en loi** : $X_n \xrightarrow{\mathcal{L}} X$ à l'aide des fonctions de répartition $F_{X_n}$ et $F_X$ ?

**VERSO :**
$\lim_{n \to +\infty} F_{X_n}(x) = F_X(x)$ en **TOUT point $x$ où $F_X$ est CONTINUE**.
*(Le jury retire tous les points si la mention de continuité est omise).*

---

### Carte 10 [T] — Convergences

**RECTO :** Loi Faible des Grands Nombres (LFGN) : Quelles sont les **3 hypothèses** sur la suite $(X_n)$ ?

**VERSO :**
1. Variables **mutuellement indépendantes**.
2. **Identiquement distribuées** (même espérance $m$, même variance $\sigma^2$).
3. Elles admettent un **moment d'ordre 2** (une variance finie).

---

### Carte 11 [T] — Convergences

**RECTO :** Loi Faible des Grands Nombres (LFGN) : Quelle est la conclusion exacte sur la moyenne empirique $\overline{X}_n = \frac{1}{n} \sum_{i=1}^n X_i$ ?

**VERSO :**
La moyenne empirique converge **en probabilité** vers l'espérance $m$ :
$\overline{X}_n \xrightarrow{\mathbb{P}} m$.

---

### Carte 12 [T] — Convergences

**RECTO :** Théorème Central Limite (TCL) : Quelles sont les hypothèses sur la suite $(X_n)$ ?

**VERSO :**
1. Suite de V.A. **i.i.d.** (indépendantes et identiquement distribuées).
2. Elles admettent une variance finie et **STRICTEMENT POSITIVE** ($\sigma^2 > 0$).

---

### Carte 13 [T] — Convergences

**RECTO :** Formule de conclusion du Théorème Central Limite (TCL) pour la somme $S_n = X_1 + \dots + X_n$ (espérance $m$, variance $\sigma^2$) ?

**VERSO :**
La somme **centrée et réduite** converge en loi vers la loi normale centrée réduite :
$Z_n = \frac{S_n - nm}{\sigma \sqrt{n}} \xrightarrow{\mathcal{L}} \mathcal{N}(0,1)$.

---

### Carte 14 [T] — Convergences

**RECTO :** Continuité et Convergence : Si $X_n \xrightarrow{\mathbb{P}} X$ et $f$ est une fonction **continue**. Que peut-on dire de la suite $f(X_n)$ ?

**VERSO :**
$f(X_n) \xrightarrow{\mathbb{P}} f(X)$.
*(Le théorème est également exact pour la convergence en loi : $X_n \xrightarrow{\mathcal{L}} X \implies f(X_n) \xrightarrow{\mathcal{L}} f(X)$).*

---

### Carte 15 [T] — Convergences

**RECTO :** Théorème de Slutsky (Version CCINP) : Si $X_n \xrightarrow{\mathcal{L}} X$ et $Y_n \xrightarrow{\mathbb{P}} c$ (une constante), que peut-on dire de $X_n + Y_n$ et $X_n Y_n$ ?

**VERSO :**
$X_n + Y_n \xrightarrow{\mathcal{L}} X + c$
$X_n Y_n \xrightarrow{\mathcal{L}} c X$
*(Crucial : la limite de $Y_n$ DOIT être une constante pour que ça marche).*

---

### Carte 16 [T] — Convergences

**RECTO :** Que dit l'inégalité de Markov pour une variable aléatoire $X$ **positive** (admettant une espérance) et un réel $a > 0$ ?

**VERSO :**
$\mathbb{P}(X \ge a) \le \frac{\mathbb{E}(X)}{a}$.
*(Moins précise que Bienaymé-Tchebychev, mais ne nécessite pas de variance).*

---

## CARTES CALCUL

---

### Carte 17 [C] — Convergences

**RECTO :** Comment écrire la variable centrée réduite $Z_n$ du TCL en utilisant la **moyenne empirique** $\overline{X}_n$ au lieu de la somme $S_n$ ?

**VERSO :**
$Z_n = \frac{\overline{X}_n - m}{\sigma / \sqrt{n}} = \sqrt{n} \frac{\overline{X}_n - m}{\sigma}$.

---

### Carte 18 [C] — Convergences

**RECTO :** Formule de la variance de la moyenne empirique $\mathbb{V}(\overline{X}_n)$ pour des variables $X_i$ mutuellement indépendantes de même variance $\sigma^2$ ?

**VERSO :**
$\mathbb{V}(\overline{X}_n) = \frac{\sigma^2}{n}$.
*(C'est ce qui garantit que la variance tend vers 0 et qui fait fonctionner la preuve de la LFGN).*

---

### Carte 19 [C] — Convergences

**RECTO :** Quelle est la limite de l'intégrale $I_n = \int_0^n \frac{t^{n-1}}{(n-1)!} e^{-t} dt$ quand $n \to +\infty$ en utilisant un résultat de probabilités ?

**VERSO :**
$I_n = \mathbb{P}(X_n \le n)$ où $X_n \sim \Gamma(n, 1)$ (ou somme de $n$ lois $\mathcal{E}(1)$ i.i.d.).
On a $\mathbb{E}(X_n) = n$ et $\mathbb{V}(X_n) = n$.
Par le TCL : $\mathbb{P}\left(\frac{X_n - n}{\sqrt{n}} \le 0\right) \to \mathbb{P}(Z \le 0) = \frac{1}{2}$.
La limite est **$1/2$**.

---

## CARTES PIÈGE

---

### Carte 20 [P] — Convergences

**RECTO :** VRAI ou FAUX ? (Piège classique sur la cv en loi)
"Soit $X_n \sim \mathcal{U}([0, 1/n])$. Alors $X_n \xrightarrow{\mathcal{L}} 0$. On en déduit que $\lim_{n \to \infty} F_{X_n}(0) = F_0(0) = 1$."

**VERSO :**
**FAUX !**
La limite est la variable certaine $0$. Sa fonction de répartition $F_0$ vaut $0$ sur $\mathbb{R}_-^*$ et $1$ sur $\mathbb{R}_+$. Elle est **discontinue en 0** ! Le théorème de convergence en loi ne s'applique donc pas au point $x=0$.

---

### Carte 21 [P] — Convergences

**RECTO :** VRAI ou FAUX ?
"Si $X_n \xrightarrow{\mathcal{L}} X$ et $Y_n \xrightarrow{\mathcal{L}} Y$, alors $X_n + Y_n \xrightarrow{\mathcal{L}} X + Y$."

**VERSO :**
**FAUX !** (Erreur très grave).
La convergence en loi ne se conserve pas par la somme (la dépendance entre les variables peut tout changer).
*Vrai uniquement avec le théorème de Slutsky si l'une des limites est une CONSTANTE.*

---

### Carte 22 [P] — Convergences

**RECTO :** VRAI ou FAUX ? (Rapport de jury CCINP)
"D'après le TCL, on a $\lim_{n \to \infty} \mathbb{P}(S_n \le x) = \mathbb{P}(Z \le x)$ en posant $Z \sim \mathcal{N}(nm, n\sigma^2)$."

**VERSO :**
**FAUX !** (Zéro à la question).
Il est interdit d'écrire une limite de probabilité où la variable limite $Z$ dépend de $n$ !
*Bonne rédaction* : On centre et on réduit D'ABORD : $\mathbb{P}\left(\frac{S_n - nm}{\sigma\sqrt{n}} \le \frac{x - nm}{\sigma\sqrt{n}}\right)$, puis on utilise $\mathcal{N}(0,1)$.

---

### Carte 23 [P] — Convergences

**RECTO :** VRAI ou FAUX ?
"La convergence en probabilité implique la convergence en loi, et la réciproque est généralement vraie."

**VERSO :**
**FAUX.**
$\xrightarrow{\mathbb{P}} \implies \xrightarrow{\mathcal{L}}$ est VRAI.
La réciproque est **FAUSSE**. (Exception unique : si la convergence en loi se fait vers une **constante** certaine, alors la réciproque est vraie).

---

### Carte 24 [P] — Convergences

**RECTO :** VRAI ou FAUX ?
"L'inégalité de Bienaymé-Tchebychev permet de borner $\mathbb{P}(|X - m| < \varepsilon)$ par $\frac{\mathbb{V}(X)}{\varepsilon^2}$."

**VERSO :**
**FAUX !** (Erreur de sens usuelle).
BT majore la probabilité d'être **LOIN** de la moyenne : $\mathbb{P}(|X - m| \ge \varepsilon) \le \frac{\mathbb{V}(X)}{\varepsilon^2}$.
Pour l'événement $<$, on prend l'événement contraire : $\mathbb{P}(|X - m| < \varepsilon) \ge 1 - \frac{\mathbb{V}(X)}{\varepsilon^2}$.

---

### Carte 25 [P] — Convergences

**RECTO :** VRAI ou FAUX ?
"La suite $X_n$ vaut $n$ avec probabilité $1/n$ et $0$ avec probabilité $1 - 1/n$. $X_n$ converge en probabilité vers 0. Donc $\mathbb{E}(X_n)$ converge vers $\mathbb{E}(0) = 0$."

**VERSO :**
**FAUX !**
La convergence en probabilité (ou en loi) **N'IMPLIQUE PAS** la convergence des espérances.
Ici $\mathbb{E}(X_n) = n \times (1/n) = 1$, qui ne tend pas vers 0 !

---
`;




const RAW_EN = String.raw`
0|monarchie|monarchy|${CD}
1|monarque de droit divin|a monarch by divine right|${CD}
2|souverain|sovereign|${CD}
3|aristocratie|aristocracy|${CD}
4|oligarchie|oligarchy|${CD}
5|dictateur|a dictator|${CD}
6|dictature|dictatorship|${CD}
7|autoritaire|authoritarian|${CD}
8|autoritarisme|authoritarianism|${CD}
9|totalitaire|totalitarian|${CD}
10|totalitarisme|totalitarianism|${CD}
11|homme fort|a strongman|${CD}
12|tyran|a tyrant, an autocrat|${CD}
13|despote|a despot|${CD}
14|despote éclairé|an enlightened despot|${CD}
15|junte militaire|a military junta|${CD}
16|coup d'État|a coup, a coup d'état|${CD}
17|gouvernement autoritaire|a regime|${CD}
18|régime de Vichy / de Pinochet|the Vichy / Pinochet regime|${CD}
19|régime répressif|a repressive regime|${CD}
20|régime politique|a political system|${CD}
21|se démocratiser|to become more democratic|${CD}
22|prendre le pouvoir|to take, seize power|${CD}
23|arriver au pouvoir|to come to power|${CD}
24|arriver au pouvoir (démocratiquement)|to come into office|${CD}
25|être au pouvoir|to be in power|${CD}
26|rester au pouvoir|to remain, stay in power|${CD}
27|s'accrocher au pouvoir|to cling to power|${CD}
28|bonne gouvernance|good governance|${CD}
29|mal administrer, mal gérer|to misrule, mismanage|${CD}
30|mauvaise administration|misrule|${CD}
31|mauvaise gestion|mismanagement|${CD}
32|tenir un dirigeant pour responsable|to hold a leader to account|${CD}
33|être responsable devant les électeurs|to be accountable to the electorate|${CD}
34|responsabilité|accountability|${CD}
35|corruption|corruption, sleaze, bribery|${CD}
36|corrompu|corrupt|${CD}
37|pot-de-vin|a bribe|${CD}
38|acheter, soudoyer qn|to bribe sb|${CD}
39|état de droit, règne de la loi|the rule of law|${CD}
40|multipartisme|multi-party system|${CD}
41|système de parti unique|single-party system|${CD}
42|élections libres et régulières|free and fair elections|${CD}
43|fraude électorale|vote rigging, ballot rigging, electoral fraud|${CD}
44|l'élection était truquée|the election was rigged|${CD}
45|opposant politique|a political opponent|${CD}
46|dissident|a dissident|${CD}
47|bâillonner / museler la presse / l'opposition|to gag / muzzle the press / the opposition|${CD}
48|déclarer l'état d'urgence|to declare a state of emergency|${CD}
49|bafouer la constitution|to trample the constitution|${CD}
50|censurer|to censor|${CD}
51|censure|censorship|${CD}
52|bloquer / restreindre l'accès à internet|to block / restrict internet access|${CD}
53|contourner la censure|to circumvent, bypass censorship|${CD}
54|droits de l'homme|human rights|${CD}
55|atteintes aux droits de l'homme|human rights abuses, violations|${CD}
56|crime contre l'humanité|a crime against humanity|${CD}
57|devoir d'ingérence|the duty to interfere, to intervene|${CD}
58|association de défense des droits de l'homme|human Rights lobby|${CD}
59|passé de la Chine en matière de droits de l'homme|China's human rights record|${CD}
60|mécontentement, malaise|discontent|${CD}
61|provoquer des troubles|to spark unrest|${CD}
62|agitation|turmoil|${CD}
63|bouleversement|an upheaval|${CD}
64|fomenter des troubles|to stir up trouble|${CD}
65|insurgé|an insurgent|${CD}
66|insurrection|an insurgency|${CD}
67|manifestation|a demonstration, a protest march|${CD}
68|manifestant|a demonstrator, a protester|${CD}
69|organiser / participer à un rassemblement|to hold / attend a rally|${CD}
70|émeute|a riot|${CD}
71|émeutier, casseur|a rioter|${CD}
72|des émeutes ont éclaté|riots broke out|${CD}
73|CRS|anti-riot police|${CD}
74|cocktail Molotov|a petrol bomb, a Molotov cocktail|${CD}
75|gaz lacrymogène|tear gas|${CD}
76|heurt, affrontement|a clash|${CD}
77|échauffourée|a skirmish|${CD}
78|complot|a plot|${CD}
79|comploteur|a plotter|${CD}
80|se révolter|to revolt|${CD}
81|se rebeller|to rebel|${CD}
82|rebelle|a rebel|${CD}
83|rébellion, révolte|a rebellion|${CD}
84|déjouer les autorités|to defy the authorities|${CD}
85|soulèvement|an uprising|${CD}
86|se soulever contre|to rise up against|${CD}
87|renverser un dictateur|to overthrow, to topple a dictator|${CD}
88|évincer un dictateur|to oust a dictator|${CD}
89|renversement d'un dictateur|the overthrow of a dictator|${CD}
90|déposer un dirigeant|to depose a ruler|${CD}
91|s'effondrer|to collapse|${CD}
92|restaurer la démocratie|to restore democracy|${CD}
93|chute d'un gouvernement|the downfall of a government|${CD}
94|répression brutale|ruthless repression|${CD}
95|réprimer une rébellion|to put down, to suppress a rebellion|${CD}
96|réprimer, étouffer la contestation|to quell the protests|${CD}
97|mesures de répression|crackdown, clampdown|${CD}
98|mettre les gens en prison|to send people to prison|${CD}
99|passer qn à tabac|to beat sb up|${CD}
100|gène|a gene|${CG}
101|cellule|a cell|${CG}
102|cellules-souches|stem cells|${CG}
103|recherche sur les cellules souches|stem-cell research|${CG}
104|génome humain|the human genome|${CG}
105|cartographie du génome|genome mapping|${CG}
106|carte génétique|gene map, genetic map|${CG}
107|séquence génétique|gene sequence|${CG}
108|séquençage|sequencing|${CG}
109|épissage du gène|gene splicing|${CG}
110|patrimoine héréditaire|gene pool|${CG}
111|généticien|a geneticist|${CG}
112|eugénisme|eugenics|${CG}
113|eugéniste, partisan de l'eugénisme|a eugenicist|${CG}
114|ADN|DNA|${CG}
115|test génétique|a DNA test|${CG}
116|empreinte génétique|a DNA print, genetic print|${CG}
117|analyse ADN|DNA analysis|${CG}
118|prélèvement d'ADN|a DNA sample|${CG}
119|profil génétique|genetic make-up, genetic profile|${CG}
120|analyse de l'empreinte génétique|genetic profiling, DNA fingerprinting|${CG}
121|dépistage génétique|genetic screening|${CG}
122|subir un prélèvement d'ADN|to be DNA-swabbed|${CG}
123|manipulations génétiques, génie génétique|genetic engineering|${CG}
124|transgénique|transgenic|${CG}
125|organisme génétiquement modifié|a genetically modified organism|${CG}
126|OGM|GMOs|${CG}
127|aliments contenant des OGM|GM food|${CG}
128|pommes de terres génétiquement modifiées|GM potatoes|${CG}
129|produits transgéniques|biotech products|${CG}
130|semence, graines|seed|${CG}
131|soja|soyabeans|${CG}
132|colza|rapeseed|${CG}
133|maïs|maize (GB), corn (US)|${CG}
134|blé|wheat|${CG}
135|culture, récolte|a crop|${CG}
136|essais sur le terrain|field trials, crop trials|${CG}
137|culture OGM|a GM crop|${CG}
138|rendement|yield|${CG}
139|filière agroalimentaire|agribusiness|${CG}
140|augmenter, améliorer les rendements|to improve yields|${CG}
141|résistant aux maladies|resistant to disease|${CG}
142|insecticide / pesticide / herbicide|insecticide / pesticide / herbicide|${CG}
143|polliniser|to pollinate|${CG}
144|pollinisation croisée|cross-pollination|${CG}
145|contaminer|to contaminate|${CG}
146|contamination|contamination|${CG}
147|maladie génétique|a genetic disease|${CG}
148|gène défectueux|a faulty gene|${CG}
149|gène manquant|a missing gene|${CG}
150|héréditaire|hereditary|${CG}
151|chromosome X / Y|an X / Y chromosome|${CG}
152|clonage|cloning|${CG}
153|conseil génétique|genetic counselling|${CG}
154|entreprise pharmaceutique|a pharmaceutical company|${CG}
155|thérapie génique|gene therapy|${CG}
156|traitement génique|genetic treatment|${CG}
157|à des fins thérapeutiques|for therapeutic purposes|${CG}
158|agriculture au service de la médecine|pharming|${CG}
159|jouer à l'apprenti-sorcier|to play God|${CG}
160|toucher à la nature|to tamper with nature|${CG}
161|principe de précaution|the precautionary principle, the safety-first principle|${CG}
162|étiquette|a label|${CG}
163|étiquetter|to label|${CG}
164|étiquetage|labelling|${CG}
165|avertir|to warn|${CG}
166|avertissement|a warning|${CG}
167|dont l'origine peut être établie|traceable|${CG}
168|traçabilité|traceability|${CG}
169|effets à long terme|long-term effects|${CG}
170|chaîne alimentaire|the food chain|${CG}
171|sécurité alimentaire|food security|${CG}
172|lobby OGM|the pro-GM lobby|${CG}
173|militants contre les OGM|anti-GM activists|${CG}
174|campagne contre les OGM|an anti-GM campaign|${CG}
175|étranger|a foreigner|${CI}
176|inconnu|a stranger|${CI}
177|nationalité|nationality|${CI}
178|ressortissant étranger|a foreign national|${CI}
179|personnes de nationalité française|French citizens|${CI}
180|émigrer en Nouvelle-Zélande|to emigrate to New Zealand|${CI}
181|immigrer en France|to immigrate to France|${CI}
182|vague d'immigration|a wave of immigration|${CI}
183|immigration à grande échelle / de masse|large-scale / mass immigration|${CI}
184|exode|an exodus|${CI}
185|nouvel arrivant|a newcomer|${CI}
186|pays natal, pays d'origine|native country, home country|${CI}
187|patrie|homeland|${CI}
188|pays d'accueil|a host country|${CI}
189|pays d'adoption|an adoptive country, a country of adoption|${CI}
190|accueillir|to welcome|${CI}
191|accueillant|welcoming|${CI}
192|politique migratoire|immigration policy|${CI}
193|immigration choisie|selective immigration, controlled immigration|${CI}
194|flux migratoires|migration flows|${CI}
195|passager clandestin|a stowaway|${CI}
196|immigration clandestine, irrégulière|illegal immigration|${CI}
197|immigration sauvage|uncontrolled immigration|${CI}
198|immigrant clandestin, sans-papiers|an illegal immigrant, an illegal alien, an undocumented alien|${CI}
199|il est en situation irrégulière|his papers are not in order|${CI}
200|frontière|a border, a frontier|${CI}
201|fermer ses frontières|to close one's borders|${CI}
202|contrôles aux frontières|border controls|${CI}
203|contrôles d'identité|identity checks|${CI}
204|centre de rétention (administrative)|a holding centre, a detention facility|${CI}
205|passeport|a passport|${CI}
206|carte d'identité|an identity card|${CI}
207|visa|a visa|${CI}
208|réfugié|a refugee|${CI}
209|personne déplacée|a displaced person|${CI}
210|apatride|a stateless person|${CI}
211|se réfugier|to take refuge, take shelter|${CI}
212|demander l'asile politique|to seek political asylum|${CI}
213|demandeur d'asile|an asylum-seeker|${CI}
214|fuir la persécution / la misère|to flee persecution / destitution|${CI}
215|échapper à la pauvreté|to escape poverty|${CI}
216|chercher de meilleures conditions de vie|to be in search of better living conditions|${CI}
217|trafic des êtres humains|human trafficking|${CI}
218|contrebandier, passeur|a smuggler|${CI}
219|passeurs d'immigrants clandestins|people-smugglers|${CI}
220|réseau de passeurs|a smuggling ring|${CI}
221|faux passeport|a fake passport|${CI}
222|reconduire qn à la frontière|to escort sb back to the border|${CI}
223|renvoyer un immigrant dans son pays d'origine|to send an immigrant back to his native country|${CI}
224|expulser qn|to deport sb|${CI}
225|être refoulé à la frontière|to be turned away at the border|${CI}
226|être expulsé|to be ordered out of the country|${CI}
227|s'exiler|to go into exile|${CI}
228|exilé|an exile|${CI}
229|exiler, bannir qn|to exile, banish sb|${CI}
230|s'expatrier|to expatriate oneself|${CI}
231|expatrié|an expatriate, an expat|${CI}
232|passer à l'Ouest / à l'ennemi|to defect to the West / to the enemy|${CI}
233|fuite des cerveaux / afflux des cerveaux|brain drain / brain gain|${CI}
234|partir de rien|to start from scratch|${CI}
235|travail au noir|moonlighting|${CI}
236|atelier clandestin|a sweatshop|${CI}
237|exploiter les travailleurs immigrés|to exploit migrant workers|${CI}
238|permis de travail, carte de travail|a work permit|${CI}
239|permis de séjour, carte de séjour|a residence permit, a resident permit|${CI}
240|travailleur migrant|a migrant worker|${CI}
241|travailleur invité (disposant d'un visa temporaire)|a guest worker|${CI}
242|s'intégrer|to become integrated|${CI}
243|bien s'intégrer dans une société|to integrate well into a society|${CI}
244|insertion sociale|social integration|${CI}
245|régulariser la situation des clandestins|to regularise the status of illegal immigrants|${CI}
246|régularisation|regularisation|${CI}
247|se faire naturaliser britannique, être naturalisé britannique, obtenir la nationalité britannique|to be granted British citizenship, to become a British citizen|${CI}
248|quota|a quota|${CI}
249|regroupement familial|family reunion, reunification|${CI}
250|qn qui abuse du système des prestations sociales|a benefit cheat|${CI}
251|fraude aux prestations sociales|benefit fraud|${CI}
252|parasite|a freeloader|${CI}
253|mariage blanc|a sham marriage, a marriage of convenience|${CI}
254|inonder|to flood|${CI}
255|être envahi par les étrangers|to be swamped with foreigners|${CI}
256|arrivée massive, afflux de travailleurs|the influx of workers|${CI}
257|endiguer l'afflux d'immigrés|to stem the flow of immigrants|${CI}
258|limiter / freiner l'immigration|to restrict / curb immigration|${CI}
259|parti d'extrême-droite|a far-right party|${CI}
260|faire fuir les immigrants|to scare immigrants away|${CI}
261|empêcher les indésirables d'entrer|to keep out undesirables|${CI}
262|xénophobie|xenophobia|${CI}
263|xénophobe|xenophobic|${CI}
264|avoir un grand-père né à l'étranger|to have a foreign-born grandfather|${CI}
265|jeunes gens d'origine asiatique / portugaise|young men of Asian / Portuguese descent|${CI}
266|Français de naissance|a native of France|${CI}
267|New Yorkais de souche|a born and bred New Yorker|${CI}
268|il est français de souche|he's of French origin, of French extraction|${CI}
269|Maghreb|North Africa|${CI}
270|Maghrébins|North Africans|${CI}
271|pakistanais / du Bangladesh|Pakistani / Bangladeshi|${CI}
272|hispanophone / parlant le Hindi|Spanish-speaking / Hindi-speaking|${CI}
273|diaspora|diaspora|${CI}
274|affaires étrangères|foreign affairs|${CIT}
275|relations extérieures|foreign relations|${CIT}
276|communauté internationale|the international community|${CIT}
277|problème mondial, planétaire|a global issue|${CIT}
278|État souverain|a sovereign state|${CIT}
279|souveraineté|sovereignty|${CIT}
280|État-nation|a nation-state|${CIT}
281|frontière|a border, a frontier|${CIT}
282|droit international|international law|${CIT}
283|géopolitique|geopolitics|${CIT}
284|scène internationale|the international stage, the international scene, the world stage|${CIT}
285|jouer un rôle dans qch|to play a role, a part in sth|${CIT}
286|occidental / oriental|western / eastern|${CIT}
287|politique étrangère, extérieure|foreign policy|${CIT}
288|ambassadeur|an ambassador|${CIT}
289|ambassade|an embassy|${CIT}
290|attaché culturel / commercial / militaire|a cultural / commercial / military attaché|${CIT}
291|envoyé, émissaire|an envoy, an emissary|${CIT}
292|diplomate|a diplomat|${CIT}
293|diplomatie|diplomacy|${CIT}
294|rompre / reprendre les relations|to break off / resume diplomatic relations|${CIT}
295|relations tendues|tense, strained relations|${CIT}
296|réchauffement|a thaw|${CIT}
297|refroidissement|a chill, a cooling off|${CIT}
298|rappeler un ambassadeur|to recall an ambassador|${CIT}
299|normaliser les relations|to normalize relations|${CIT}
300|grande puissance|a great power|${CIT}
301|superpuissance / hyperpuissance|a superpower / a hyperpower|${CIT}
302|hégémonie|hegemony|${CIT}
303|impérialisme|imperialism|${CIT}
304|impérialiste|imperialistic|${CIT}
305|expansionisme|expansionism|${CIT}
306|unilatéralisme / multilatéralisme|unilateralism / multilateralism|${CIT}
307|bilatéral / multilatéral|bilateral / multilateral|${CIT}
308|bipolaire / multipolaire|bipolar / multipolar|${CIT}
309|bloc|a bloc|${CIT}
310|équilibre des forces|balance of power|${CIT}
311|système onusien|the UN system|${CIT}
312|État-membre, pays membre|a member state|${CIT}
313|membre fondateur|a founding member, founder member|${CIT}
314|cotisation|a contribution|${CIT}
315|discuter / voter une résolution|to debate / to pass a resolution|${CIT}
316|appliquer une résolution|to implement, enforce a resolution|${CIT}
317|autoriser l'usage de la force|to authorize the use of force|${CIT}
318|embargo|an embargo|${CIT}
319|majorité des deux-tiers|a two-thirds majority|${CIT}
320|maintenir la paix|to maintain peace|${CIT}
321|opération de maintien de la paix|a peace-keeping operation|${CIT}
322|soldat de la paix|a peacekeeper|${CIT}
323|casque bleu|a blue helmet|${CIT}
324|devoir d'ingérence|the duty to interfere, to intervene|${CIT}
325|intervention militaire|military intervention|${CIT}
326|OTAN|NATO, the North Atlantic Treaty Organization|${CIT}
327|négocier|to negotiate|${CIT}
328|négociations, pourparlers, discussions|negotiations, talks|${CIT}
329|table des négociations|negotiating table|${CIT}
330|table ronde|a round table|${CIT}
331|faire une déclaration|to make, issue, deliver a statement|${CIT}
332|communiqué|a communiqué|${CIT}
333|sous l'égide de|under the aegis of|${CIT}
334|réunion au sommet, sommet|a summit (meeting)|${CIT}
335|porte-parole|a spokesman, spokeswoman, spokesperson|${CIT}
336|homologue|a counterpart, an opposite number|${CIT}
337|impasse|a stalemate, a deadlock, a standoff, an impasse|${CIT}
338|aboutir à une impasse|to reach a stalemate|${CIT}
339|sortir d'une impasse|to break a stalemate|${CIT}
340|ultimatum|an ultimatum|${CIT}
341|médiateur|a mediator|${CIT}
342|négocier un accord|to broker an agreement|${CIT}
343|surmonter un obstacle|to overcome an obstacle|${CIT}
344|volonté politique|political will|${CIT}
345|compromis|a compromise|${CIT}
346|transiger|to compromise|${CIT}
347|faire une concession|to make a concession|${CIT}
348|s'engager à faire qch|to commit oneself to doing sth|${CIT}
349|promettre de faire, s'engager à faire qch|to pledge to do sth|${CIT}
350|signer / ratifier un traité|to sign / ratify a treaty|${CIT}
351|protocole|a protocol|${CIT}
352|accord|an agreement, an accord|${CIT}
353|conclure un accord|to reach a settlement|${CIT}
354|stipuler|to stipulate|${CIT}
355|parvenir à un consensus|to reach a consensus|${CIT}
356|interdire|to prohibit, to ban|${CIT}
357|mettre son véto à une décision|to veto a decision|${CIT}
358|Union Européenne, l'UE|the European Union, the EU|${CIT}
359|directive européenne|an EU directive|${CIT}
360|adhérer à l'UE|to join the EU|${CIT}
361|demander son adhésion à l'UE|to apply to join the EU, to apply for EU membership|${CIT}
362|pourparlers d'adhésion|membership negotiations|${CIT}
363|organisation non-gouvernementale, ONG|a non-governmental organization, an NGO|${CIT}
364|droits de l'homme|human rights|${CIT}
365|violations des droits de l'homme|human rights abuses, violations|${CIT}
366|faire respecter un principe|to uphold a principle|${CIT}
367|passé de la Chine en matière de droits de l'homme|China's human Rights record|${CIT}
368|décolonisation|decolonization|${CIT}
369|obtenir l'indépendance, devenir indépendant|to achieve, gain, attain independence|${CIT}
370|ancienne colonie|a former colony|${CIT}
371|puissance coloniale|a colonial power|${CIT}
372|du travail|work|${CU}
373|un travail, un emploi|a job|${CU}
374|une profession, une activité professionnelle|an occupation|${CU}
375|les professions libérales|the professions|${CU}
376|une carrière|a career|${CU}
377|le monde du travail|the world of work|${CU}
378|être au travail|to be at work|${CU}
379|le lieu de travail|the workplace|${CU}
380|travailler chez soi|to work from home|${CU}
381|travailler à temps partiel OU à mi-temps|to work part time|${CU}
382|travailler à plein temps|to work full time|${CU}
383|la classe ouvrière|the working class|${CU}
384|la population active|the working population|${CU}
385|la vie active|the working life|${CU}
386|conditions de travail|working conditions|${CU}
387|atelier|a workshop|${CU}
388|usine|a factory, a plant|${CU}
389|atelier clandestin (où la main d'œuvre est exploitée)|a sweatshop|${CU}
390|travailler beaucoup|to work hard|${CU}
391|être travailleur|to be hard-working|${CU}
392|travailleur acharné, bourreau de travail|a hard worker, a workaholic|${CU}
393|permis de travail|a work permit|${CU}
394|être / ne pas être de service OU de garde|to be on duty / off duty|${CU}
395|chômage|unemployment, joblessness|${CU}
396|être au chômage|to be unemployed, jobless, out of work|${CU}
397|taux de chômage|unemployment rate, jobless rate|${CU}
398|chômeurs|the unemployed, the jobless|${CU}
399|chômage de longue durée|long-term unemployment|${CU}
400|chômage des jeunes|youth unemployment|${CU}
401|allocation chômage|unemployment benefit|${CU}
402|toucher le chômage|to be on the dole (GB), to be on welfare (US)|${CU}
403|marché du travail, de l'emploi|job market, labour market|${CU}
404|contrat à durée déterminée, CDD|a fixed-term contract|${CU}
405|contrat à durée indéterminée, CDI|an open-ended contract|${CU}
406|flexibilité de l'emploi|job flexibility|${CU}
407|avoir des horaires flexibles|work flexitime (GB) flextime (US)|${CU}
408|sécurité / précarité de l'emploi|job security / insecurity|${CU}
409|stage|an internship, a work placement|${CU}
410|stagiaire|an intern, a trainee|${CU}
411|travailleur précaire|a casual worker|${CU}
412|petit boulot|an odd job, a casual job|${CU}
413|boulot d'été|a summer job|${CU}
414|intérimaire|a temporary worker|${CU}
415|faire de l'intérim|to temp, to work as a temp|${CU}
416|employer|to employ|${CU}
417|employeur|an employer|${CU}
418|employé|an employee|${CU}
419|changer de travail|to change jobs|${CU}
420|embaucher un travailleur|to hire, to take on a worker|${CU}
421|recruter|to recruit|${CU}
422|période d'essai|a trial period|${CU}
423|poste|a post, a position|${CU}
424|nommer qn à un poste|to appoint sb to a post|${CU}
425|muter qn|to transfer sb|${CU}
426|poste à responsabilité(s)|a responsible job|${CU}
427|emploi subalterne|a menial job|${CU}
428|demandeur d'emploi|a job-seeker|${CU}
429|agence Pôle emploi|a Jobcenter (GB)|${CU}
430|CV, curriculum vitae|a curriculum vitae, a CV, a résumé (US)|${CU}
431|expérience professionnelle|work experience|${CU}
432|compétences|skills|${CU}
433|être candidat à un emploi, faire une demande d'emploi|to apply for a job|${CU}
434|candidat à un poste|an applicant|${CU}
435|entretien d'embauche|a job interview|${CU}
436|offre d'emploi|a job offer, a job vacancy, a job opportunity|${CU}
437|travail OU main d'œuvre|labour|${CU}
438|main d'œuvre féminine / travail des enfants|female labour / child labour|${CU}
439|normes en matière d'emploi|labour standards|${CU}
440|main d'œuvre|manpower, workforce|${CU}
441|personnel|staff, personnel|${CU}
442|collègue, camarade de travail|a colleague, a co-worker, a workmate|${CU}
443|ressources humaines|human resources|${CU}
444|travail qualifié / peu qualifié / non qualifié|a skilled / low-skilled / an unskilled job|${CU}
445|ouvrier spécialisé, OS|an unskilled worker|${CU}
446|ouvrier|a blue-collar worker|${CU}
447|employé de bureau|a white-collar worker|${CU}
448|fonctionnaire|a state employee, a civil servant|${CU}
449|salarié du secteur public|a public-sector employee|${CU}
450|haut fonctionnaire|a high-ranking civil servant|${CU}
451|être indépendant, travailler à son compte|to be self-employed|${CU}
452|travailleurs indépendants|the self-employed|${CU}
453|honoraires|fees|${CU}
454|paie, paye|pay|${CU}
455|salaire|salary|${CU}
456|salaire (d'ouvrier)|wages|${CU}
457|gagner de l'argent|to earn money, to make money|${CU}
458|gagner sa vie|to earn a living, to earn one's living, to make a living|${CU}
459|Que fait-il dans la vie ?|What does he do for a living?|${CU}
460|travail mal payé|a badly-paid job, a low-paid job|${CU}
461|travail bien payé|a well-paid job, a highly-paid job|${CU}
462|salarié|a wage-earner|${CU}
463|prime|a bonus|${CU}
464|avantage (en nature), avantage annexe|a perk, a fringe benefit|${CU}
465|voiture de fonction|a company car|${CU}
466|salaire au rendement|performance-related pay|${CU}
467|être employé par une entreprise|to be on a company's payroll|${CU}
468|vacances|holiday, vacation (US)|${CU}
469|congés payés|paid holiday|${CU}
470|être en vacances|to be on holiday|${CU}
471|jour férié|a bank holiday|${CU}
472|être en congé maladie|to be on sick leave|${CU}
473|prendre deux jours de congé|to take two days off|${CU}
474|réduction du temps de travail, RTT|reduction of working hours|${CU}
475|les 35 heures, la semaine de 35 heures|the 35-hour working week|${CU}
476|supprimer des emplois|to cut jobs|${CU}
477|faire des coupes sombres, claires dans la main d'œuvre|to slash, to axe jobs|${CU}
478|pertes d'emploi, suppressions d'emploi|job losses|${CU}
479|rationaliser|to streamline|${CU}
480|dégraisser ses effectifs|to downsize|${CU}
481|licencier des salariés|to lay off workers, to make workers redundant|${CU}
482|licenciement (économique)|a redundancy|${CU}
483|départ volontaire|a voluntary redundancy|${CU}
484|plan social|a redundancy plan|${CU}
485|indemnité de licenciement, prime de départ|redundancy payment, severance pay, severance package|${CU}
486|parachute doré|a golden parachute, a golden handshake|${CU}
487|renvoyer, licencier, congédier qn|to dismiss sb|${CU}
488|mettre à la porte, renvoyer, virer|to fire, to sack, to give sb the sack|${CU}
489|être renvoyé|to get the sack|${CU}
490|conflit social|an industrial dispute|${CU}
491|se mettre / être en grève|to go on strike / be on strike|${CU}
492|gréviste|a striker|${CU}
493|direction et les salariés|management and workers|${CU}
494|délégué syndical|a shop steward|${CU}
495|syndicat|a (trade) union|${CU}
496|revendication|a claim|${CU}
497|revendications salariales|wage claims, wage demands|${CU}
498|augmentation de salaire|a payrise (GB), a payraise (US)|${CU}
499|reprendre le travail|to resume work|${CU}
500|prendre sa retraite|to retire|${CU}
501|démissionner|to resign, to step down|${CU}
502|retraité|a pensioner, an old age pensioner, a retiree (US)|${CU}
503|retraite|retirement|${CU}
504|partir en pré-retraite|to take early retirement|${CU}
505|âge de la retraite|retirement age|${CU}
506|bien réussir à l'école|to do well at school|${EDU}
507|lire l'anglais couramment|to read English fluently|${EDU}
508|être bon en sport|to be good at sports|${EDU}
509|faire l'école buissonnière|to play truant|${EDU}
510|absentéisme|truancy|${EDU}
511|suivre un cours d'anglais|to take a class in English|${EDU}
512|donner du travail à la maison|to set homework|${EDU}
513|rendre un travail|to hand in a piece of work|${EDU}
514|les subtilités de la langue anglaise|the intricacies of the English language|${EDU}
515|se lancer|to get started|${EDU}
516|se conformer à une règle|to obey a rule|${EDU}
517|obéir à (qqn)|to obey (sone)|${EDU}
518|avoir des difficultés en maths|to have difficulty with maths|${EDU}
519|donner un coup de main à (qqn)|to give (sone) a hand|${EDU}
520|obtenir un diplôme|to graduate|${EDU}
521|une salle de classe|a classroom|${EDU}
522|une leçon|a class|${EDU}
523|rattraper un cours loupé|to catch up a missed lesson|${EDU}
524|évaluer|to assess, appraise|${EDU}
525|le programme scolaire|the school curriculum|${EDU}
526|étudiant de premier cycle|undergraduate|${EDU}
527|indiscipliné|unruly|${EDU}
528|incontrôlable|unmanageable|${EDU}
529|bâcler ses devoirs|to dash off one's work|${EDU}
530|obtenir une bonne note|to get a good mark|${EDU}
531|tricher sur son voisin|to eye over one's neighbour's work|${EDU}
532|principal, directeur (école)|headmaster|${EDU}
533|élève doué|gifted pupil|${EDU}
534|réussir un examen haut la main|to pass a test with flying colors|${EDU}
535|une matière (scolaire)|a (school) subject|${EDU}
536|une pause de 20 minutes|a 20-minute break|${EDU}
537|une heure de cours|a teaching-hour|${EDU}
538|passer dans la classe supérieure|to pass the next grade|${EDU}
539|travail de paperasse|paperwork|${EDU}
540|passer un examen|to take an exam|${EDU}
541|examen blanc|mock exam|${EDU}
542|se préparer à un examen|to prepare for an exam|${EDU}
543|échouer à un examen|to flunk a test|${EDU}
544|recaler (qqn)|to flunk (sone)|${EDU}
545|être reçu à un examen avec mention|to pass a degree with distinction|${EDU}
546|abandonner l'école|to drop out of school|${EDU}
547|un élève décrocheur|a dropout|${EDU}
548|obtenir une bourse|to get a scholarship|${EDU}
549|entrer en fac de médecine|to go to a medical school|${EDU}
550|faire des études de médecine|to study medicine|${EDU}
551|remettre un évènement à plus tard|to put off an event|${EDU}
552|sortie scolaire|school trip|${EDU}
553|faire des recherches sur (qqch)|to do research on (sthg)|${EDU}
554|cour d'école|schoolyard|${EDU}
555|un élève de terminale|[UK] a sixth-former|${EDU}
556|méticuleux|painstaking|${EDU}
557|sécher un cours|to skip a lesson|${EDU}
558|se voir accorder la possibilité de [...]|to be provided with an opportunity to [...]|${EDU}
559|tricher|to cheat|${EDU}
560|un tricheur|a cheater|${EDU}
561|être renvoyé|to be expelled|${EDU}
562|rouler sur un examen|to sail through an exam|${EDU}
563|sauce (tomate)|dressing|${THA}
564|chuckle|laughter|${THA}
565|to gather|to get together|${THA}
566|a feast|a banquet|${THA}
567|to reach accross|to make efforts to join|${THA}
568|one another|each other|${THA}
569|to winnow away|to filter out and remove|${THA}
570|widely viewed as|largely regarded as|${THA}
571|twice|two times|${THA}
572|to provide|to give|${THA}
573|the bulk of|the biggest part of|${THA}
574|to depict|to describe|${THA}
575|to feature|to represent, show|${THA}
576|subservient|submissive, docile|${THA}
577|pilgrims|migrants arriving in America from England in 17th|${THA}
578|to outnumber|to surpass in number|${THA}
579|to crouch|almost to sit on the floor|${THA}
580|a harvest|a crop|${THA}
581|likely|probably|${THA}
582|a deed|an [bad] action|${THA}
583|settlers|colons|${THA}
584|in retaliation for|in revenge for|${THA}
585|to broker|to organize, negotiate|${THA}
586|to grab|to seize|${THA}
587|gauzy|transparent|${THA}
588|willfully|deliberately|${THA}
589|How [s.one] would have it|What [s.one] would like to believe|${THA}
590|druthers|inclination, penchant|${THA}
591|blissfully|ecstatically|${THA}
592|bleached out|washed out|${THA}
593|to abid|to respect|${THA}
594|altérer|alter|${THA}
595|apprentissage en continu|lifelong learning|${THA}
596|malaise|general feeling of discomfort|${BUS}
597|stagflation|period of slow economic growth and high unemployment|${BUS}
598|aftermath|the consequences of a significant unpleasant event|${BUS}
599|hyperinflation|extremely high and accelerating inflation|${BUS}
600|third-world countries|countries with lower economic development|${BUS}
601|martial law|military control over civilian functions of government|${BUS}
602|gleaming|shining brightly, describe something polished or new|${BUS}
603|suburban area|residential area on the outskirts of the a city|${BUS}
604|stagnation|lack of activity, growth, and development|${BUS}
605|dispirited|having lost emthusiasm and hope|${BUS}
606|fatalistic|believing that events are inevitable|${BUS}
607|hollowed out|destroyed or weakened from within|${BUS}
608|brimming|filled to the point of overflowing (with positive emotions and energy)|${BUS}
609|rabais, ristourne|discount|${BUS}
610|chaîne de montage|assembly line|${BUS}
611|payer comptant|to pay cash|${BUS}
612|pénurie de main d'oeuvre|labor shortage|${BUS}
613|productivité|productivity|${BUS}
614|soumettre sa candidature|to apply|${BUS}
615|racheter|to buy out|${BUS}
616|licencier|to lay off|${BUS}
617|se mettre en grève|to go on strike|${BUS}
618|service client|customer service|${BUS}
619|représentant syndical|union representative|${BUS}
620|commerćant|shopkeeper|${BUS}
621|virer, mettre à la porte|to fire|${BUS}
622|se mettre à son compte|to set up one's business|${BUS}
623|démissionner|to resign|${BUS}
624|en sureffectif|overstaffed|${BUS}
625|contrat à durée indéterminée|permanent contract|${BUS}
626|équipe de nuit|night shift|${BUS}
627|service, département|department|${BUS}
628|refondre, réorganiser|to revamp|${BUS}
629|concurrent|competitor|${BUS}
630|fusion|merger|${BUS}
631|faire faillite|to go bankrupt, bust|${BUS}
632|embaucher|to hire, take on|${BUS}
633|fiche de paie|pay slip|${BUS}
634|faire des heures supplémentaires|work overtime|${BUS}
635|mettre la clé sous la porte|to go out of business, close up shop|${BUS}
636|fait main|handmade|${BUS}
637|artisan|craftsman|${BUS}
638|ouvrier qualifié|skilled worker|${BUS}
639|entreprise|business|${BUS}
640|plein emploi|full employment|${BUS}
641|un maire|a mayor|${POL}
642|homme politique|politician|${POL}
643|s'assurer une majorité|to secure a majority|${POL}
644|déclencher des élections anticipées|to call an early election|${POL}
645|(UK) les éléctions législatives|(UK) the general election|${POL}
646|(US) les éléctions présidentielles|(US) the general election|${POL}
647|les grands partis|mainstream parties|${POL}
648|premier ministre|Prime Minister|${POL}
649|le ministre de l'économie et des finances|(UK) the Chancellor of the Exchequer|${POL}
650|remaniement ministériel|Cabinet reshuffle|${POL}
651|ministre des Affaires étrangères|Foreign minister|${POL}
652|pronncer un discours|to deliver a speech|${POL}
653|une dictature|a dictatorship|${POL}
654|museler, baîlloner|to gag, muzzle|${POL}
655|société civile|civil society|${POL}
656|(UK) syndicats|(UK) trade unions|${POL}
657|(US) syndicats|(US) labor unions|${POL}
658|élections de mi-mandat|mid-term elections|${POL}
659|minisre "frondeur"|rebellious minister|${POL}
660|démissionner|resign, step down|${POL}
661|officier en tant que|to serve as|${POL}
662|opposer son veto à (qqch)|to veto (sthg)|${POL}
663|un projet de loi|a bill|${POL}
664|un groupe de réflexion|a think-tank|${POL}
665|(UK) un ministre|(UK) a Cabinet member|${POL}
666|un directeur de cabinet|a chief of staff|${POL}
667|impôts locaux|local taxes|${POL}
668|cote de popularité|approval ratings|${POL}
669|se présenter à une éléction|to run for election [office]|${POL}
670|prêter serment|to take the oath, be sworn in|${POL}
671|rendre homage à (qqn)|to pay tribute to (sone)|${POL}
672|dirigeant|political leader|${POL}
673|élection truquée|rigged election|${POL}
674|les allocations|social benefits|${POL}
675|revaloriser|to scale up, raise, increase|${POL}
676|l'allocation familliale|the family allowance|${POL}
677|le gel de la production|the production freeze|${POL}
678|un bras de fer|a tug of war|${POL}
679|chancelant|teetering, wavering|${POL}
680|tailored|customized|${POL}
681|rote memorisation|repetition-based learning|${POL}
682|impoverished|cash-strapped|${POL}
683|unencumbered|unburdened|${POL}
684|inquisitiveness|interest, curiosity|${POL}
685|substantially|notably, significatly|${POL}
686|authoritarian|dictatorial, strict|${POL}
687|minimally supervised|lightly monitored|${POL}
688|crime, criminality|la criminalité|${CR}
689|the crime rate|le taux de criminalité|${CR}
690|organized crime|la criminalité organisée, le grand banditisme|${CR}
691|white-collar crime|la criminalité en col blanc|${CR}
692|juvenile delinquency|la délinquance juvénile|${CR}
693|a juvenile delinquent, a young offender|un délinquant juvénile|${CR}
694|petty crime|la petite délinquance|${CR}
695|a crime, a felony|un crime|${CR}
696|to commit a crime|commettre un crime|${CR}
697|a criminal, a felon|un criminel|${CR}
698|a criminal record|un casier judiciaire|${CR}
699|an offense|un délit, une infraction|${CR}
700|a misdemeanour|une infraction (GB), un délit (US)|${CR}
701|an offender|un délinquant, un contrevenant|${CR}
702|a repeat offender, a recidivist|un récidiviste|${CR}
703|murder|le meurtre|${CR}
704|a murderer|un meurtrier|${CR}
705|manslaughter|homicide|${CR}
706|a serial killer|un tueur en série|${CR}
707|theft|le vol|${CR}
708|a thief, a robber|un voleur|${CR}
709|to steal a watch|voler une montre|${CR}
710|to rob sb of sth|voler qch à qn|${CR}
711|rape|le viol|${CR}
712|armed robbery|vol à main armée|${CR}
713|a burglary|un cambriolage|${CR}
714|to mug sb, to attack sb|agresser qn|${CR}
715|money-laundering|le blanchiment d’argent|${CR}
716|to break a law|enfreindre une loi|${CR}
717|lawful / unlawful|légal / illégal|${CR}
718|a lawbreaker|un délinquant, une personne qui enfreint la loi|${CR}
719|wrongdoing|des méfaits|${CR}
720|a wrongdoer|un malfaiteur|${CR}
721|to flout the law|se moquer de la loi|${CR}
722|a no-go area|une zone de non-droit|${CR}
723|to obey the law|obéir à la loi|${CR}
724|to abide by the law|respecter la loi|${CR}
725|a law-abiding citizen|un citoyen respectueux des lois|${CR}
726|the justice system|la justice|${CR}
727|a court, a court of law|un tribunal|${CR}
728|a judge|un juge|${CR}
729|a lawyer, a barrister (GB), an attorney (US)|un avocat|${CR}
730|the jury|le jury|${CR}
731|to prosecute sb|poursuivre qn (en justice)|${CR}
732|to bring a lawsuit against sb, sue sb|intenter un procès à qn, engager des poursuites contre qn|${CR}
733|the prosecutor|le procureur|${CR}
734|a suspect|un suspect|${CR}
735|to charge sb with murder|accuser, inculper qn de meurtre|${CR}
736|a charge|une accusation, un chef d’inculpation|${CR}
737|to confess to a crime|avouer un crime|${CR}
738|to confess to embezzling money|avouer avoir détourné de l’argent|${CR}
739|confession|un aveu|${CR}
740|a defendant|un accusé, un prévenu|${CR}
741|a witness / an eye witness|un témoin / un témoin oculaire|${CR}
742|a case|une affaire|${CR}
743|a trial|un procès|${CR}
744|to be tried, stand trial|passer en jugement, être jugé|${CR}
745|to await trial|être en attente de jugement|${CR}
746|the principle that a defendant is innocent until proven guilty|la présomption d’innocence|${CR}
747|forensic evidence|preuves relevées lors d’une expertise|${CR}
748|a culprit|un coupable|${CR}
749|to acquit sb|acquitter qn|${CR}
750|acquittal|acquittement|${CR}
751|to find sb guilty|condamner qn, reconnaître qn coupable|${CR}
752|to convict sb of rape, murder|reconnaître qn coupable de viol, meurtre|${CR}
753|a conviction|une condamnation|${CR}
754|a fine|une amende|${CR}
755|to fine sb for sth|condamner qn à une amende pour qch|${CR}
756|to be sentenced to five years’ imprisonment, five years in jail|être condamné à cinq ans de prison|${CR}
757|a death sentence|une condamnation à mort|${CR}
758|a life sentence|une condamnation à perpétuité|${CR}
759|a suspended sentence|une condamnation avec sursis|${CR}
760|to be sent to prison|être mis en prison|${CR}
761|to incarcerate, to imprison sb|incarcérer qn|${CR}
762|the incarceration rate|le taux d’incarcération|${CR}
763|a cell|une cellule|${CR}
764|a prisoner, an inmate, a detainee|un détenu, un prisonnier|${CR}
765|a prison officer, a prison warder (GB)|un gardien de prison|${CR}
766|a high-security prison|une prison de haute sécurité|${CR}
767|solitary confinement|l’isolement carcéral|${CR}
768|prison overcrowding|la surpopulation carcérale|${CR}
769|a miscarriage of justice|une erreur judiciaire|${CR}
770|to fabricate evidence|fabriquer des preuves|${CR}
771|to be proved innocent, to be exonerated|être innocenté|${CR}
772|to free, to release a prisoner|libérer, relâcher un prisonnier|${CR}
773|to pardon a convict|grâcier un condamné|${CR}
774|to parole sb|mettre qn en liberté conditionnelle|${CR}
775|to be on parole|être en liberté conditionnelle|${CR}
776|to report to the police|se présenter à la police|${CR}
777|an electronic tag|un bracelet de surveillance électronique|${CR}
778|contre la peine de mort|against the death penalty|${PC}
779|le meurtre|murder|${PC}
780|être coupable de meurtre|to be guilty of murder|${PC}
781|un meurtrier|a murderer|${PC}
782|le viol|rape|${PC}
783|un violeur|a rapist|${PC}
784|un délinquant sexuel|a sex offender|${PC}
785|un récidiviste|a repeat offender, a recidivist|${PC}
786|la culpabilité|guilt|${PC}
787|appliquer la loi du talion|to demand an eye for an eye|${PC}
788|déclarer qn coupable, condamner qn|to convict sb, to find sb guilty|${PC}
789|une condamnation|a conviction|${PC}
790|une condamnation à tort|a wrongful conviction|${PC}
791|condamner qn à mort|to sentence sb to death|${PC}
792|condamner qn à 25 ans de prison|to sentence sb to 25 years imprisonment|${PC}
793|un coupable|a culprit|${PC}
794|dissuader qn de faire qch|to deter sb from doing sth|${PC}
795|avoir un effet dissuasif|to act as a deterrent|${PC}
796|une condamnation à mort|a death sentence|${PC}
797|une condamnation à perpétuité|a life sentence|${PC}
798|perpétuité sans possibilité de remise de peine|life without parole|${PC}
799|mettre qn en prison|to jail, imprison sb|${PC}
800|un détenu, un prisonnier|a prisoner, an inmate, a detainee|${PC}
801|être dans les couloirs de la mort|to be on death row|${PC}
802|une cellule|a cell|${PC}
803|un avocat|a lawyer|${PC}
804|un appel|an appeal|${PC}
805|faire appel d’une décision|to appeal against a decision|${PC}
806|casser une décision (de justice)|to quash, to overturn a decision|${PC}
807|commuer une condamnation à mort en réclusion à perpétuité|to commute a death sentence to life|${PC}
808|surseoir à l’exécution d’un condamné|to grant a convict a stay of execution, a reprieve|${PC}
809|gracier un criminel|to pardon a criminal|${PC}
810|executer un condamné|to execute a convict|${PC}
811|mettre qn à mort|to put sb to death|${PC}
812|un bourreau|an executioner|${PC}
813|une piqûre mortelle|a lethal injection|${PC}
814|faire une piqûre mortelle à qn|to inject sb with a lethal substance|${PC}
815|pendre qn|to hang sb|${PC}
816|la guillotine|the guillotine|${PC}
817|guillotiner qn|to guillotine sb|${PC}
818|électrocuter qn|to electrocute sb|${PC}
819|la chaise électrique|the electric chair|${PC}
820|lapider qn, tuer qn à coups de pierre|to stone sb to death|${PC}
821|abolir|to abolish, to do away with|${PC}
822|rétablir la peine de mort|to reinstate, to reintroduce, to restore the death penalty|${PC}
823|appliquer la peine de mort|to apply, to enforce the death penalty|${PC}
824|une erreur judiciaire|a miscarriage of justice|${PC}
825|les tests ADN|DNA analysis, DNA testing|${PC}
826|innocenter qn|to prove sb innocent, to exonerate sb|${PC}
827|être innocenté grâce à l’ADN|to be cleared by DNA|${PC}
828|un problème controversé|a controversial, contentious issue|${PC}
829|un problème sensible, qui suscite de vives réactions|a hot-button issue|${PC}
830|partisans de la peine de mort|advocates, supporters, proponents of the death penalty|${PC}
831|opposants à, adversaires de la peine de mort|critics, opponents of the death penalty|${PC}
832|être contre la peine de mort|to oppose the death penalty, to be opposed to the death penalty|${PC}
833|un abolitionniste|an abolitionist|${PC}
834|du sexe féminin|female|${CF}
835|le statut, la position, la place des femmes dans la société|women’s status in society|${CF}
836|le déséquilibre entre les sexes|gender imbalance|${CF}
837|les inégalités entre les hommes et les femmes|gender inequalities|${CF}
838|la guerre entre les sexes|gender war|${CF}
839|un phallocrate, un machiste|a (male) chauvinist|${CF}
840|le machisme|machismo|${CF}
841|la misogynie|misogyny|${CF}
842|un misogyne|a misogynist|${CF}
843|le sexisme|sexism|${CF}
844|des préjugés sexistes|sexist prejudices|${CF}
845|le féminisme|feminism|${CF}
846|le mouvement des femmes, le mouvement pour les droits de la femme|the Women’s Movement, the women’s rights movement|${CF}
847|s’émanciper|to become emancipated|${CF}
848|rendre les femmes autonomes|to empower women|${CF}
849|un mariage forcé / arrangé|a forced marriage / an arranged marriage|${CF}
850|un mariage blanc|a sham marriage, a marriage of convenience|${CF}
851|une dot|a dowry|${CF}
852|la polygamie|polygamy|${CF}
853|polygame|polygamous|${CF}
854|l’excision|female circumcision, female genital mutilation|${CF}
855|une femme battue|a battered wife|${CF}
856|violence conjugale, familiale|domestic violence|${CF}
857|être privé du droit de vote|to be disenfranchised|${CF}
858|le droit de vote|the right to vote|${CF}
859|tomber enceinte|to become pregnant|${CF}
860|les femmes en âge d’avoir des enfants|women of childbearing age|${CF}
861|la pilule (contraceptive)|the (contraceptive) pill|${CF}
862|prendre la pilule|to be on the pill|${CF}
863|partir en congé maternité|to go on maternity leave|${CF}
864|congé parental|parental leave, career break|${CF}
865|s’occuper de ses enfants|to look after one’s children|${CF}
866|élever un enfant|to bring up, to raise a child|${CF}
867|l’éducation des enfants|the upbringing of children, child rearing, parenting|${CF}
868|des enfants d’âge scolaire|school-age children|${CF}
869|une femme au foyer, une ménagère|a housewife|${CF}
870|faire le ménage|to do the housework|${CF}
871|faire la cuisine / la lessive / la vaisselle / les courses|to do the cooking / washing / washing-up / shopping|${CF}
872|passer l’aspirateur|to do the vacuuming / to vacuum|${CF}
873|les appareils ménagers|domestic appliances|${CF}
874|les tâches ménagères|household chores|${CF}
875|être confronté à un dilemme|to be faced with a dilemma|${CF}
876|une crèche, une garderie|a nursery, a day-care centre (GB), a child-care center|${CF}
877|une nounou, une nourrice|a nanny|${CF}
878|une assistante maternelle, une nourrice|a childminder|${CF}
879|trouver un équilibre entre travail et famille|to balance, combine work and family|${CF}
880|jongler pour concilier carrière et famille|to juggle a career and a family|${CF}
881|concilier|to reconcile|${CF}
882|les responsabilités familiales|family responsibilities|${CF}
883|être dépendant financièrement de qn|to be financially dependent on sb|${CF}
884|gagner sa vie|to earn a living, to make a living|${CF}
885|subvenir aux besoins de sa famille|to support one’s family|${CF}
886|nourrir ses enfants|to feed one’s children|${CF}
887|être celui qui fait vivre la famille|to be the breadwinner|${CF}
888|c’est elle qui fait vivre sa famille|she is the family wage earner|${CF}
889|faire bouillir la marmite|to bring home the bacon|${CF}
890|la main d’œuvre féminine|female labour|${CF}
891|l’emploi des femmes|female employment|${CF}
892|les femmes représentent x % de la main d’œuvre|women make up x% of the workforce|${CF}
893|faire carrière|to have a career|${CF}
894|être une femme qui travaille|to be a working woman|${CF}
895|une femme qui fait carrière|a career woman|${CF}
896|travailler à temps partiel OU à mi-temps|to work part time|${CF}
897|travailler à plein temps|to work full time|${CF}
898|l’égalité des salaires|equal pay|${CF}
899|le différentiel de salaire entre les sexes|the gender pay gap, the gender wage gap|${CF}
900|nommer qn à un poste|to appoint sb to a post|${CF}
901|être en concurrence avec les hommes|to compete with men|${CF}
902|un poste à responsabilités|a responsible job|${CF}
903|un poste de haut niveau|a top job|${CF}
904|un emploi subalterne|a menial job|${CF}
905|réussir sa carrière|to have a successful career|${CF}
906|les obstacles à la promotion des femmes|barriers to female advancement|${CF}
907|une chasse gardée pour les hommes|a male preserve|${CF}
908|introduire une discrimination contre qn|to discriminate against sb|${CF}
909|être victime de discrimination|to be discriminated against|${CF}
910|le harcèlement|harassment|${CF}
911|le harcèlement sexuel|sexual harassment|${CF}
912|la parité|parity|${CF}
913|sous-représenté|under-represented|${CF}
914|instaurer des quotas|to introduce quotas|${CF}
915|l’instauration de quotas|the introduction of quotas|${CF}
916|la discrimination positive|affirmative action|${CF}
917|l’égalité des chances|equal opportunity|${CF}
918|égalitaire|egalitarian|${CF}
919|l’égalitarisme|egalitarianism|${CF}
920|atteindre l’égalité avec les hommes|to achieve equality with men|${CF}
921|une maladie|a disease, an illness, a sickness|${HI}
922|souffrir d’une maladie|to suffer from a disease|${HI}
923|mourir d’une maladie|to die of, to die from a disease|${HI}
924|une maladie grave|a serious disease|${HI}
925|être dans un état critique|to be critically ill|${HI}
926|un microbe, un germe|a germ|${HI}
927|des bactéries|bacteria|${HI}
928|attraper la grippe|to go down with the flu|${HI}
929|un danger pour la santé|a health hazard|${HI}
930|un fléau|a curse, a plague, a scourge|${HI}
931|le cancer du poumon / du sein / de la peau|lung / breast / skin cancer|${HI}
932|cancérigène|carcinogenic|${HI}
933|le diabète|diabetes|${HI}
934|l’hépatite|hepatitis|${HI}
935|la malaria, le paludisme|malaria|${HI}
936|une maladie sexuellement transmissible (MST)|a sexually transmitted disease (STD), a venereal disease (VD)|${HI}
937|avoir une maladie cardiaque|to have a heart condition|${HI}
938|la maladie d’Alzheimer / de Parkison|Alzeihemer’s / Parkinson’s disease|${HI}
939|une maladie neurodégénérative|a neurodegenerative disease|${HI}
940|un symptôme|a symptom|${HI}
941|affecter, toucher un pays|to affect a country|${HI}
942|toucher 20 % de la population|to afflict 20% of the population|${HI}
943|la zone la plus durement touchée|the hardest-hit area|${HI}
944|éradiquer|to eradicate|${HI}
945|endémique|endemic|${HI}
946|le SIDA|AIDS, acquired immune deficiency syndrome|${HI}
947|contracter le SIDA|to develop AIDS|${HI}
948|un malade du SIDA|an AIDS sufferer, an AIDS patient|${HI}
949|séropositif|HIV-positive|${HI}
950|faire passer un test de dépistage du SIDA à qn|to screen sb for AIDS|${HI}
951|un centre de dépistage du SIDA|an HIV screening centre|${HI}
952|un test de dépistage|a screening test|${HI}
953|le sperme|sperm, semen|${HI}
954|avoir des rapports non protégés|to have unprotected sex|${HI}
955|un préservatif|a condom|${HI}
956|l’abstinence|abstinence|${HI}
957|la fidélité|faithfulness|${HI}
958|une aiguille|a needle|${HI}
959|les anti-rétroviraux|anti-retroviral drugs|${HI}
960|la trithérapie|triple therapy, combination therapy|${HI}
961|un traitement médical|medical treatment|${HI}
962|secret médical|medical confidentiality|${HI}
963|une infection nosocomiale|a hospital-acquired infection|${HI}
964|MRSA, un staphylocoque résistant à la méthicilline|MRSA|${HI}
965|une bactérie multi-résistante|a superbug|${HI}
966|prescrire|to prescribe|${HI}
967|une ordonnance|a prescription|${HI}
968|un médecin généraliste|a general practitioner, a GP|${HI}
969|un chirurgien|a surgeon|${HI}
970|se faire opérer|to have surgery, go through surgery, have an operation|${HI}
971|diagnostiquer|to diagnose|${HI}
972|un diagnostic|a diagnosis|${HI}
973|guérir un patient|to cure a patient|${HI}
974|un remède|a remedy, a cure|${HI}
975|un médicament|a drug, a medicine, a medication|${HI}
976|un médicament générique|a generic drug|${HI}
977|un antalgique, analgésique|a painkiller|${HI}
978|un effet secondaire|a side effect|${HI}
979|une piqûre|an injection, a shot|${HI}
980|prendre des antibiotiques|to be on antibiotics|${HI}
981|un laboratoire pharmaceutique|a pharmaceutical laboratory|${HI}
982|des produits pharmaceutiques|pharmaceuticals|${HI}
983|un vaccin|a vaccine|${HI}
984|vacciner|to vaccinate|${HI}
985|une campagne de vaccination|a vaccination campaign|${HI}
986|se rétablir, guérir|to recover|${HI}
987|guérison, rétablissement|recovery|${HI}
988|rechuter|to relapse|${HI}
989|une alerte à l’intoxication alimentaire|a food scare|${HI}
990|un péril sanitaire, une alerte sanitaire|a health scare|${HI}
991|épizootie|an epizootic disease|${HI}
992|la fièvre aphteuse|food-and-mouth disease|${HI}
993|l’encéphalopathie bovine spongiforme, l’ESB|bovine spongiform encephalopathy, BSE|${HI}
994|la maladie de la vache folle|mad-cow disease|${HI}
995|la maladie de Creutzfeldt Jacob (MCJ)|Creutzfeldt-Jacob Disease (CJD)|${HI}
996|une maladie à prions|a prion disease|${HI}
997|la dioxine|dioxin|${HI}
998|le scandale du poulet à la dioxine|the dioxin chicken scandal|${HI}
999|la traçabilité|traceability|${HI}
1000|les soins médicaux / les services de santé|health care|${HI}
1001|la santé publique|public health|${HI}
1002|les responsables de la santé publique|public health officials|${HI}
1003|les autorités sanitaires|the health authorities|${HI}
1004|le système de santé|the health care system, the health system|${HI}
1005|les services de santé|health services|${HI}
1006|les dépenses de santé|health expenses|${HI}

// === NOUVEAU CHAPITRE : INDIVIDUAL FREEDOM ===
1007|la liberté d’expression, de parole|freedom of speech, free speech, freedom of expression|${IF}
1008|la liberté de la presse|freedom of the press|${IF}
1009|une presse libre|a free press|${IF}
1010|la liberté de culte, la liberté religieuse|freedom of worship|${IF}
1011|le pouvoir arbitraire|arbitrary power|${IF}
1012|une lettre de cachet|a lettre de cachet|${IF}
1013|empiéter sur les droits des gens|to infringe (on) people’s rights|${IF}
1014|une atteinte, une entorse aux droits de qn|an infringement on sb’s rights|${IF}
1015|empiéter sur les libertés fondamentales|to encroach on basic liberties|${IF}
1016|un empiètement de l’État|an encroachment of the state|${IF}
1017|restreindre, limiter la liberté d’expression|to restrict free speech|${IF}
1018|rogner sur les libertés individuelles|to erode individual freedoms|${IF}
1019|détenir un suspect sans l’inculper|to detain a suspect without charge|${IF}
1020|être détenu sans être inculpé|to be held without charge|${IF}
1021|placer qn en détention provisoire|to remand sb in custody|${IF}
1022|emprisonner qn|to jail sb, to imprison sb|${IF}
1023|le droit de vote|the right to vote|${IF}
1024|les droits fondamentaux|basic rights|${IF}
1025|les libertés fondamentales / individuelles|basic / individual liberties|${IF}
1026|être garanti par la constitution|to be enshrined in the constitution|${IF}
1027|les libertés civiques|civil liberties|${IF}
1028|censurer|to censor|${IF}
1029|la censure|censorship|${IF}
1030|la surveillance|surveillance|${IF}
1031|une société surveillée|a surveillance society|${IF}
1032|un État policier|a police state|${IF}
1033|la police, les forces de l’ordre|the police force|${IF}
1034|interpeller et fouiller|to stop and search|${IF}
1035|arrêter qn|to arrest sb|${IF}
1036|(le droit à) la vie privée, l’intimité|privacy|${IF}
1037|la vie privée de qn|sb’s private life|${IF}
1038|violer la vie privée de qn|to breach, to violate sb’s privacy|${IF}
1039|une atteinte à, une violation de la vie privée|a breach of privacy, an invasion of privacy, a privacy violation|${IF}
1040|porter atteinte à la vie privée de qn|to intrude upon sb’s privacy|${IF}
1041|la vidéosurveillance|video surveillance|${IF}
1042|télévision en circuit fermé|CCTV, closed circuit television|${IF}
1043|enregistrer|to record|${IF}
1044|suivre de près les mouvements de qn|to monitor sb’s movements|${IF}
1045|avoir qn à l’œil|to keep tabs on sb, to keep an eye on sb|${IF}
1046|espionner qn|to spy on sb, to snoop on sb|${IF}
1047|suivre la trace de qn|to track sb|${IF}
1048|surveiller une frontière / le courrier de qn|to monitor a border / sb’s mail|${IF}
1049|un micro caché|a bug|${IF}
1050|placer des micros dans une pièce|to bug a room|${IF}
1051|mettre qn sur écoute téléphonique|to (wire)tap sb’s phone|${IF}
1052|les écoutes téléphoniques|phone tapping, wiretapping|${IF}
1053|écouter les conversations téléphoniques de qn|to eavesdrop on sb’s phone conversations|${IF}
1054|mettre son nez dans la vie personnelle de qn|to pry into sb’s personal life|${IF}
1055|des données, des informations|data|${IF}
1056|des informations personnelles|personal data, personal details|${IF}
1057|les coordonnées de qn|sb’s contact details|${IF}
1058|des données biométriques|biometric data|${IF}
1059|les informations bancaires de qn|sb’s banking details|${IF}
1060|un dossier médical / scolaire|a medical record / a school record|${IF}
1061|un casier judiciaire|a criminal record|${IF}
1062|un relevé de téléphone|a telephone bill|${IF}
1063|un relevé bancaire|a bank statement|${IF}
1064|rassembler, recueillir des informations|to collect, gather data|${IF}
1065|glaner des informations|to glean infomation|${IF}
1066|enregistrer, conserver des données|to record, store, retain data|${IF}
1067|rechercher et extraire des données|to retrieve data|${IF}
1068|ficher un suspect|to put a suspect on file|${IF}
1069|une base de données|a database|${IF}
1070|une base de données ADN|a DNA database|${IF}
1071|une empreinte génétique|a DNA print, genetic print|${IF}
1072|subir un test ADN|to be DNA-swabbed|${IF}
1073|tirer la sonnette d’alarme|to sound, to ring the alarm bell|${IF}
1074|dénoncer qn|to blow the whistle on sb|${IF}
1075|un lanceur d’alerte|a whistleblower|${IF}
1076|la drogue|drugs|${IDR}
1077|une drogue douce / dure|a soft / hard drug|${IDR}
1078|les stupéfiants|narcotics|${IDR}
1079|la dope, la came|dope|${IDR}
1080|le cannabis|cannabis|${IDR}
1081|la marijuana|marijuana|${IDR}
1082|les amphétamines|amphetamines|${IDR}
1083|l’héroïne|heroin|${IDR}
1084|inhaler, sniffer de la coke|to sniff, snort cocaine|${IDR}
1085|une aiguille|a needle|${IDR}
1086|une seringue|a syringe|${IDR}
1087|une drogue à usage récréatif occasionnel|a recreational drug|${IDR}
1088|une drogue de synthèse|a designer drug, a synthetic drug|${IDR}
1089|un psychotrope|a psychoactive, psychotropic substance|${IDR}
1090|se banaliser|to become commonplace|${IDR}
1091|la banalisation du crack|the spreading use of crack|${IDR}
1092|un fléau|a plague, a curse, a scourge|${IDR}
1093|le trafic de drogue|drug-trafficking|${IDR}
1094|un trafiquant de drogue, un narcotrafiquant|a drug trafficker|${IDR}
1095|un réseau de trafiquants|a drug ring, a drug cartel|${IDR}
1096|un baron de la drogue|a drug baron, a drug lord, a drug kingpin|${IDR}
1097|un passeur, une mule|a mule|${IDR}
1098|faire entrer de la drogue dans un pays|to smuggle drugs into a country|${IDR}
1099|un revendeur de drogues|a drug pusher, a drug peddler, a drug dealer|${IDR}
1100|la criminalité due à la drogue|drug-related crime|${IDR}
1101|consommer, prendre de la drogue, se droguer|to use drugs, to take drugs|${IDR}
1102|la consommation de drogue|drug use|${IDR}
1103|la toxicomanie|drug abuse, substance abuse, drug addiction|${IDR}
1104|un usager de drogue, un drogué|a drug-user|${IDR}
1105|un consommateur occasionnel / un gros consommateur|a casual / heavy user|${IDR}
1106|un consommateur de cannabis|a cannabis user|${IDR}
1107|être accro à qch|to be addicted to sth|${IDR}
1108|être accro à la cocaïne|to be hooked on cocaine|${IDR}
1109|avoir besoin d’une dose|to need a fix|${IDR}
1110|avoir un besoin maladif de qch|to crave sth|${IDR}
1111|l’accoutumance (à qch), la dépendance|addiction (to sth), dependency (on sth)|${IDR}
1112|qui crée une accoutumance, addictogène|addictive|${IDR}
1113|un drogué, un toxicomane|a drug addict, a drug abuser|${IDR}
1114|un drogué, un camé, un toxico|a junkie, a druggie|${IDR}
1115|faire une overdose, une surdose|to take an overdose, to OD|${IDR}
1116|essayer l’héroïne|to experiment with heroin|${IDR}
1117|un joint|a joint, a reefer|${IDR}
1118|avaler, inhaler la fumée|to inhale smoke|${IDR}
1119|planer, être défoncé|to be high, to be spaced out|${IDR}
1120|la prévention|prevention|${IDR}
1121|sensibiliser le public aux dangers du cannabis|to make people aware of the dangers of cannabis|${IDR}
1122|une campagne de sensibilisation|an awareness(-raising) campaign|${IDR}
1123|légaliser la consommation de cannabis|to legalize cannabis use|${IDR}
1124|dépénaliser, décriminaliser|to decriminalize|${IDR}
1125|les arguments pour et contre la légalisation|the pros and cons of legalization|${IDR}
1126|le traitement|treatment|${IDR}
1127|demander à être soigné|to seek treatment|${IDR}
1128|décrocher|to kick the habit|${IDR}
1129|un centre de désintoxication|a rehabilitation center|${IDR}
1130|entreprendre une cure de désintoxication|to go into rehab|${IDR}
1131|désintoxication|detoxification, detoxication|${IDR}
1132|un centre de désintoxication|a detoxi(fi)cation centre|${IDR}
1133|une cure de désintoxication|a detoxi(fi)cation programme|${IDR}
1134|être en cure de désintoxication|to be in detox|${IDR}
1135|éliminer qch progressivement|to phase sth out|${IDR}
1136|les symptômes de (l’état de) manque|withdrawal symptoms|${IDR}
1137|la méthadone|methadone|${IDR}
1138|rechuter|to relapse|${IDR}
1139|réprimer la consommation de drogues|to clamp down on, to crack down on drug abuse|${IDR}
1140|la répression|repression|${IDR}
1141|pénaliser la possession de drogues|to impose penalties for drug possession|${IDR}
1142|une amende|a fine|${IDR}
1143|condamner qn à une amende|to fine sb|${IDR}
1144|le responsable de la lutte contre la drogue|the drug czar, the drug tsar|${IDR}
1145|un virus|a virus|${CO}
1146|muter|to mutate|${CO}
1147|contagieux, infectieux|contagious, catching, infectious|${CO}
1148|contaminer|to contaminate|${CO}
1149|être contaminé par un virus|to be infected with a virus|${CO}
1150|un symptôme|a symptom|${CO}
1151|asymptomatique|asymptomatic|${CO}
1152|tousser|to cough|${CO}
1153|éternuer|to sneeze|${CO}
1154|inhaler des goutelettes en suspension dans l’air|to inhale airborne droplets|${CO}
1155|avoir le nez qui coule|to have a runny nose|${CO}
1156|avoir mal à la gorge|to have a sore throat|${CO}
1157|fatigue|tiredness, fatigue|${CO}
1158|mal de tête|headache|${CO}
1159|la diarrhée|diarrhoea, diarrhea (US)|${CO}
1160|avoir du mal à respirer|to have difficulty / trouble breathing|${CO}
1161|être essouflé, avoir le souffle court|to be short of breath, out of breath|${CO}
1162|avoir de la température|to have a temperature|${CO}
1163|avoir de la fièvre|to have a fever, to run a fever|${CO}
1164|être testé positif (pour le virus)|to test positive (for the virus)|${CO}
1165|être porteur d’un virus|to carry a virus|${CO}
1166|un porteur|a carrier|${CO}
1167|le système immunitaire|the immune system|${CO}
1168|immunité de groupe|herd immunity|${CO}
1169|la peste|plague|${CO}
1170|le choléra|cholera|${CO}
1171|la variole|smallpox|${CO}
1172|un fléau|a curse, a plague, a scourge|${CO}
1173|une catastrophe|a disaster|${CO}
1174|inattendu|unexpected|${CO}
1175|imprévisible|unpredictable, unforeseeable|${CO}
1176|se propager|to spread|${CO}
1177|la propagation d’un virus|the spread of a virus|${CO}
1178|une épidemie|an epidemic|${CO}
1179|une pandémie|a pandemic|${CO}
1180|un épicentre|an epicentre|${CO}
1181|éclater, se déclarer|to break out|${CO}
1182|le début d’une épidémie|an outbreak|${CO}
1183|l’ampleur, l’étendue de l’épidémie|the scope, the extent of the epidemic|${CO}
1184|affecter, toucher un pays|to affect a country|${CO}
1185|la zone la plus durement touchée|the hardest-hit area|${CO}
1186|endiguer une épidémie|to stem, halt an outbreak|${CO}
1187|enrayer une épidémie|to check an epidemic|${CO}
1188|éradiquer|to eradicate|${CO}
1189|endémique|endemic|${CO}
1190|la grippe|flu, influenza|${CO}
1191|syndrome respiratoire aigu sévère (SRAS)|Severe Acute Respiratory Syndrome (SARS)|${CO}
1192|le virus de la grippe A|the H1N1 virus|${CO}
1193|la grippe porcine|swine flu, pig flu, H1N1 flu|${CO}
1194|la grippe aviaire|bird flu, avian flu, avian influenza H5N1|${CO}
1195|une souche de grippe|a flu strain|${CO}
1196|un cas de grippe aviaire|a case of avian flu|${CO}
1197|un foyer de grippe aviaire|an outbreak of avian flu|${CO}
1198|mortel|lethal|${CO}
1199|létalité|lethality|${CO}
1200|le nombre de victimes|the death toll|${CO}
1201|les personnes âgées|the elderly|${CO}
1202|une maison de retraite|a care home, a nursing home, a retirement home|${CO}
1203|hospitaliser qn|to hospitalize sb|${CO}
1204|être en réanimation|to be in intensive care|${CO}
1205|un ventilateur|a ventilator|${CO}
1206|les (personnels) soignants|health workers, medical staff|${CO}
1207|une infirmière|a nurse|${CO}
1208|une aide-soignante|an assistant nurse|${CO}
1209|un héros|a hero|${CO}
1210|applaudir|to clap|${CO}
1211|être solidaire de qn|show solidarity with sb|${CO}
1212|lutter contre le virus|to combat the virus|${CO}
1213|état d’urgence|state of emergency|${CO}
1214|aplatir la courbe|to flatten the curve|${CO}
1215|les gestes barrières|preventative measures, health precautions|${CO}
1216|un mouchoir en papier|a tissue|${CO}
1217|la distanciation sociale|social distancing|${CO}
1218|se laver les mains|to wash your hands|${CO}
1219|saluer qn|to greet sb|${CO}
1220|se serrer la main|to shake hands|${CO}
1221|faire la bise à qn|to kiss sb|${CO}
1222|porter un masque|to wear a (face) mask|${CO}
1223|fournitures médicales|medical supplies|${CO}
1224|stocker|to stockpile|${CO}
1225|ne plus avoir d’équipements de protection|to run out of protective equipment|${CO}
1226|manquer de masques|to be short of masks|${CO}
1227|une pénurie|a shortage|${CO}
1228|des gants|gloves|${CO}
1229|s’isoler|to self-isolate|${CO}
1230|l’eau de javel|bleach|${CO}
1231|désinfecter les lieux publics|to disinfect public areas|${CO}
1232|antibiotiques|antibiotics|${CO}
1233|un vaccin|a vaccine|${CO}
1234|se faire vacciner|to get vaccinated|${CO}
1235|mettre qn en quarantaine|to quarantine sb|${CO}
1236|mettre / être en quarantaine|to put / be under quarantine|${CO}
1237|interdiction de voyager|travel ban|${CO}
1238|limitations de déplacement|travel restrictions|${CO}
1239|ordonner le confinement|to issue a stay-at-home order|${CO}
1240|confinement|lockdown, confinement|${CO}
1241|télétravailler|to work from / at home|${CO}
1242|une visioconférence|a videoconference|${CO}
1243|mettre qn en chômage partiel|to furlough sb|${CO}
1244|achats (sous l’emprise de la) panique|panic buying|${CO}
1245|la nourriture|food|${ED}
1246|les denrées alimentaires, les aliments|foodstuffs|${ED}
1247|se nourrir de qch|to feed oneself on sth|${ED}
1248|cuisiner|to cook|${ED}
1249|faire la cuisine|to do the cooking|${ED}
1250|les habitudes alimentaires|eating habits, eating patterns|${ED}
1251|la consommation de fruits et de légumes|fruit and vegetable intake|${ED}
1252|la consommation quotidienne de sel|daily salt intake|${ED}
1253|le poids|weight|${ED}
1254|se peser|to weigh oneself|${ED}
1255|peser 55 kg|to weigh 55 kg|${ED}
1256|prendre du poids|to put on, gain weight|${ED}
1257|être trop gros, en surpoids|to be overweight|${ED}
1258|avoir dix kilos de trop|to be ten kilos overweight|${ED}
1259|le surpoids, la surcharge pondérale|overweight|${ED}
1260|gros, gras|fat|${ED}
1261|obèse|obese|${ED}
1262|l’obésité|obesity|${ED}
1263|l’obésité des enfants|childhood obesity|${ED}
1264|grassouillet, dodu|plump|${ED}
1265|corpulent|stout, corpulent|${ED}
1266|le tour de taille|the waistline|${ED}
1267|la graisse superflue|flab|${ED}
1268|une bedaine, une panse|a paunch|${ED}
1269|la boulimie|bulimia|${ED}
1270|boulimique|bulimic|${ED}
1271|ne pas pouvoir s’empêcher de manger|to be a compulsive eater|${ED}
1272|s’empiffrer de chocolat|to binge on chocolate|${ED}
1273|les excès de nourriture|binge eating|${ED}
1274|les excès de boisson|binge drinking|${ED}
1275|faire des excès (de nourriture, de boisson)|to go on a binge|${ED}
1276|résister à la tentation|to resist temptation|${ED}
1277|céder à la tentation|to give in to temptation|${ED}
1278|un fast food|a fast food restaurant|${ED}
1279|manger des cochonneries|to eat junk food|${ED}
1280|les aliments préparés|processed foods|${ED}
1281|les aliments riches en graisses|fatty foods|${ED}
1282|les féculents|starch, starchy foods|${ED}
1283|les légumes|vegetables|${ED}
1284|les fruits|fruit|${ED}
1285|les légumes verts|green vegetables, greens|${ED}
1286|les boissons gazeuses|sodas, fizzy drinks|${ED}
1287|une barre chocolatée|a chocolate bar|${ED}
1288|un accro au chocolat|a chocaholic, a chocoholic|${ED}
1289|être accro à qch|to be addicted to sth|${ED}
1290|l’accoutumance, la dépendance|addiction|${ED}
1291|qui crée une accoutumance, addictogène|addictive|${ED}
1292|maigre|thin|${ED}
1293|maigrelet, maigrichon|skinny, scrawny|${ED}
1294|être mince et musclé|to be lean and muscular|${ED}
1295|anguleux, décharné|bony|${ED}
1296|mince, svelte|slim, slender, svelte|${ED}
1297|être trop maigre, ne pas peser assez|to be underweight|${ED}
1298|l’anorexie|anorexia|${ED}
1299|anorexique|anorexic|${ED}
1300|devenir anorexique|to develop anorexia|${ED}
1301|être diagnostiqué anorexique|to be diagnosed with anorexia|${ED}
1302|se laisser mourir de faim|to starve oneself to death|${ED}
1303|commencer / faire un régime|to go on / be on a diet|${ED}
1304|un régime amaigrissant|a slimming diet|${ED}
1305|une alimentation saine|a healthy diet|${ED}
1306|une alimentation équilibrée / mal équilibrée|balanced / unbalanced diet|${ED}
1307|les aliments basses calories|diet foods|${ED}
1308|les aliments diététiques|health foods|${ED}
1309|un magasin de produits diététiques|a health food shop|${ED}
1310|la nourriture biologique, les aliments bio|organic food|${ED}
1311|un restaurant diététique|an organic restaurant|${ED}
1312|végétarien|vegetarian|${ED}
1313|un nutritionniste|a nutritionist|${ED}
1314|un diététicien|a dietician, a dietitian|${ED}
1315|sédentaire|sedentary|${ED}
1316|un mode de vie sédentaire, la sédentarité|a sedentary lifestyle|${ED}
1317|perdre du poids|to lose weight|${ED}
1318|être en forme, en bonne santé|to be fit|${ED}
1319|surveiller sa ligne / garder la ligne|to watch / keep one’s figure|${ED}
1320|l’exercice physique|physical exercise|${ED}
1321|faire de la gymnastique|to do (physical) exercises|${ED}
1322|faire de l’exercice|to take exercise|${ED}
1323|faire du sport|to do sport|${ED}
1324|pratiquer un sport|to practise a sport|${ED}
1325|la santé, la forme|fitness|${ED}
1326|un mordu de culture physique|a fitness freak, a fitness fanatic|${ED}
1327|aller dans une salle de gym|to go to the gym|${ED}
1328|faire de la musculation|to work out|${ED}
1329|faites l’amour, pas la guerre|make love, not war|${WP}
1330|conflit, litige, contentieux|a dispute|${WP}
1331|un litige frontalier|a border dispute|${WP}
1332|un conflit armé|an armed conflict|${WP}
1333|être mêlé à un conflit|be embroiled in a conflict|${WP}
1334|ennemi|enemy|${WP}
1335|un désaccord, une dispute, une querelle|disagreement, row|${WP}
1336|une épreuve de force, un bras de fer|a showdown|${WP}
1337|militaire / civil|military / civilian|${WP}
1338|les militaires|the military|${WP}
1339|un belliciste|a warmonger|${WP}
1340|la propagande belliciste|warmongering|${WP}
1341|un militariste|a militarist|${WP}
1342|militariste|militaristic|${WP}
1343|être en guerre / en paix|to be at war / at peace|${WP}
1344|déclarer la guerre à un pays|to declare war on a country|${WP}
1345|faire la guerre à un ennemi|to wage war on an enemy, against an enemy|${WP}
1346|un allié|an ally|${WP}
1347|éclater|to break out|${WP}
1348|se battre|to fight|${WP}
1349|attaquer / défendre|to attack / to defend|${WP}
1350|conquérir|to conquer|${WP}
1351|la conquête|conquest|${WP}
1352|envahir|to invade|${WP}
1353|assiéger|to besiege|${WP}
1354|les forces armées|armed forces|${WP}
1355|un corps expéditionnaire|a task force|${WP}
1356|les troupes|troops|${WP}
1357|les forces aéronavales|air and sea forces|${WP}
1358|une campagne militaire|a military campaign|${WP}
1359|le champ de bataille|the battlefield|${WP}
1360|déployer|to deploy|${WP}
1361|le déploiement|deployment|${WP}
1362|retirer des troupes d’un endroit|to withdraw troops from a place|${WP}
1363|le retrait|withdrawal|${WP}
1364|un blocus|a blockade|${WP}
1365|vaincre un adversaire|to defeat an adversary|${WP}
1366|un revers|a setback|${WP}
1367|des représailles|reprisals, retaliation|${WP}
1368|user de représailles envers qn|to retaliate against sb|${WP}
1369|un vainqueur|a victor|${WP}
1370|un militaire, un soldat|a serviceman, a soldier|${WP}
1371|un militaire de carrière|a professional soldier, a career soldier|${WP}
1372|s’engager, s’enrôler dans l’armée de l’air|to join the Air Force, to enlist in the Air Force|${WP}
1373|recruter|to recruit|${WP}
1374|une recrue|a recruit|${WP}
1375|un officier|an officer|${WP}
1376|un objecteur de conscience|a conscientious objector|${WP}
1377|déserter|to desert|${WP}
1378|un déserteur|a deserter|${WP}
1379|des armes|weapons, arms|${WP}
1380|des armes de destruction massive|weapons of mass destruction, WMDs|${WP}
1381|un arsenal|an arsenal|${WP}
1382|des munitions|ammunition, munitions|${WP}
1383|une bombe|a bomb|${WP}
1384|bombarder|to bomb|${WP}
1385|un bombardement|a bombing, a bombardment|${WP}
1386|un bombardier|a bomber|${WP}
1387|des armes intelligentes|smart weapons|${WP}
1388|une frappe, une intervention aérienne|an air strike|${WP}
1389|une frappe chirurgicale|a surgical strike|${WP}
1390|un bombardier furtif|a stealth bomber|${WP}
1391|un porte-avions|an aircraft carrier|${WP}
1392|un avion de chasse, un chasseur|a fighter (plane)|${WP}
1393|un drone, un avion téléguidé|a drone, an unmanned aerial vehicle (UAV)|${WP}
1394|un missile|a missile|${WP}
1395|la guerre des nerfs / d’usure|war of nerves / of attrition|${WP}
1396|la guerre nucléaire / biologique / chimique|nuclear / biological / chemical warfare|${WP}
1397|massacre|massacre, slaughter|${WP}
1398|effusion de sang, carnage, boucherie|bloodshed|${WP}
1399|les blessés|the wounded|${WP}
1400|les morts et les blessés|the casualties|${WP}
1401|bilan des victimes|death toll|${WP}
1402|le renseignement|intelligence|${WP}
1403|espionner un ennemi|to spy on an enemy|${WP}
1404|satellite-espion|a spy satellite, a surveillance satellite|${WP}
1405|un crime de guerre|a war crime|${WP}
1406|un criminel de guerre|a war criminal|${WP}
1407|un crime contre l’humanité|a crime against humanity|${WP}
1408|un génocide|a genocide|${WP}
1409|purification ethnique|ethnic cleansing|${WP}
1410|exterminer|to exterminate|${WP}
1411|un cessez-le-feu|a ceasefire|${WP}
1412|une trêve|a truce|${WP}
1413|se rendre|to surrender|${WP}
1414|un armistice|an armistice|${WP}
1415|le désarmement|disarmament|${WP}
1416|un pacifiste|a peace campaigner, a pacifist, a peacenik|${WP}
1417|un bourbier|a quagmire|${WP}
1418|l’enlisement|stalemate|${WP}
1419|des pourparlers de paix|peace talks|${WP}
1420|le processus de paix|the peace process|${WP}
1421|un accord de paix|a peace agreement, a peace accord, a peace settlement|${WP}
1422|un traité de paix|a peace treaty|${WP}
1423|le dividende de la paix|the peace dividend|${WP}
1424|un prisonnier de guerre|a prisoner of war, a POW|${WP}
1425|être porté disparu|to be reported missing|${WP}
1426|s’absenter sans permission, manquer à l’appel|to be absent without leave, AWOL|${WP}
1427|un ancien combattant|a veteran, a vet|${WP}
1428|un amputé|an amputee|${WP}
1429|être estropié, mutilé pour la vie|be maimed for life|${WP}
1430|névrose post-traumatique|Post Traumatic Stress Disorder, PTSD|${WP}
1431|avoir des rapports (sexuels) avec qn|to have sex, sexual intercourse, sexual relations with sb|${SLM}
1432|un partenaire sexuel|a sex partner|${SLM}
1433|le désir|desire|${SLM}
1434|le désir sexuel|lust|${SLM}
1435|l’érotisme|eroticism|${SLM}
1436|être excité sexuellement|to be sexually aroused|${SLM}
1437|caresser|to fondle, to caress|${SLM}
1438|les préliminaires amoureux|foreplay|${SLM}
1439|un orgasme|an orgasm|${SLM}
1440|jouir|to come|${SLM}
1441|la sodomie|anal sex, sodomy|${SLM}
1442|rapports bucco-génitaux|oral sex|${SLM}
1443|chaste|chaste|${SLM}
1444|un(e) vierge|a virgin|${SLM}
1445|l’amour platonique|platonic love|${SLM}
1446|être frustré sexuellement|to be sex-starved|${SLM}
1447|les organes génitaux|genitals|${SLM}
1448|le sperme|sperm, semen|${SLM}
1449|le nombre de spermatozoïdes|sperm count|${SLM}
1450|une maladie sexuellement transmissible (MST), une maladie vénérienne|a sexually-transmitted disease (STD), a venereal disease (VD)|${SLM}
1451|le SIDA (le syndrome d’immunodéficience acquise)|AIDS (acquired immune deficiency syndrome)|${SLM}
1452|la blennorragie|gonorrhea|${SLM}
1453|un préservatif|a condom|${SLM}
1454|des rapports protégés / non protégés|safe sex, protected sex / unprotected sex|${SLM}
1455|l’industrie du sexe|the sex industry|${SLM}
1456|une maison close, un bordel|a brothel|${SLM}
1457|un travailleur sexuel|a sex worker|${SLM}
1458|le tourisme sexuel|sex tourism|${SLM}
1459|une prostituée|a prostitute, a hustler|${SLM}
1460|un prostitué|a rent boy (GB)|${SLM}
1461|un proxénète, un souteneur, un maquereau|a procurer, a pimp|${SLM}
1462|un gigolo|a gigolo, a toy boy (GB)|${SLM}
1463|la pornographie|pornography|${SLM}
1464|une revue porno|a porn magazine, a skin magazine (US)|${SLM}
1465|un film porno|a porn film, a blue movie|${SLM}
1466|le harcèlement sexuel|sexual harassment|${SLM}
1467|être harcelé sexuellement par qn|to be sexually harassed by sb|${SLM}
1468|un objet sexuel|a sex object|${SLM}
1469|violer|to rape|${SLM}
1470|un violeur|a rapist|${SLM}
1471|violence conjugale, familiale|domestic violence|${SLM}
1472|les sévices sexuels, abus sexuel|sexual abuse|${SLM}
1473|faire subir des abus sexuels à qn|to abuse sb sexually|${SLM}
1474|être violenté, agressé sexuellement|to be sexually assaulted|${SLM}
1475|un pédophile|a paedophile (GB), a pedophile (US)|${SLM}
1476|la pédophilie|paedophilia (GB), pedophilia (US)|${SLM}
1477|un réseau pédophile|a paedophile ring|${SLM}
1478|se livrer à des attouchements sur un enfant|to interfere with a child|${SLM}
1479|auteur de sévices sexuels sur enfant|a child molester|${SLM}
1480|les sévices sexuels infligés à des enfants|child abuse|${SLM}
1481|un auteur de sévices|an abuser|${SLM}
1482|l’inceste|incest|${SLM}
1483|une relation incestueuse|an incestuous relationship|${SLM}
1484|un pervers (sexuel), une pervertie sexuelle|a pervert|${SLM}
1485|avoir l’esprit mal tourné|to have a dirty mind|${SLM}
1486|être obsédé|to have a one-track mind, to be sex-mad|${SLM}
1487|un obsédé sexuel|a sex maniac, a sexaholic|${SLM}
1488|une nymphomane|a nymphomaniac|${SLM}
1489|un délinquant sexuel|a sex offender|${SLM}
1490|la castration chimique|chemical castration|${SLM}
1491|séduisant|attractive|${SLM}
1492|une bombe sexuelle|a sex goddess|${SLM}
1493|être attiré par qn|to be attracted to sb|${SLM}
1494|le coup de foudre|love at first sight|${SLM}
1495|faire la cour à qn|to woo, to court sb|${SLM}
1496|flirter avec qn|to flirt with sb|${SLM}
1497|draguer qn|to try and pick up sb, to chat sb up|${SLM}
1498|faire des avances à qn|to make a pass at sb|${SLM}
1499|faire de l’œil à qn|to make eyes at sb|${SLM}
1500|faire du pied à qn|to play footsie with sb|${SLM}
1501|tomber amoureux de qn|to fall in love with sb, to fall for sb|${SLM}
1502|avoir le béguin pour qn|have a crush on sb|${SLM}
1503|s’enticher de qn|to become infatuated, besotted with sb|${SLM}
1504|vivre un grand amour|to be deeply in love|${SLM}
1505|avoir une aventure avec qn|to have an affair with sb|${SLM}
1506|une idylle|a romance|${SLM}
1507|une liaison sans lendemain|a one-night stand|${SLM}
1508|coucher avec qn|to sleep with sb, to go to bed with sb|${SLM}
1509|coucher avec n’importe qui|to sleep around|${SLM}
1510|changer souvent de partenaire|to be promiscuous|${SLM}
1511|un petit ami / une petite amie|a boyfriend / a girlfriend|${SLM}
1512|un rendez-vous avec un amoureux OU un(e) petit(e) ami(e)|a date|${SLM}
1513|sortir avec qn|to date sb|${SLM}
1514|un site de rencontres|a dating site|${SLM}
1515|le mariage|marriage|${SLM}
1516|un mariage forcé / arrangé|a forced / arranged marriage|${SLM}
1517|un mariage blanc|a sham marriage, a marriage of convenience|${SLM}
1518|se marier avec qn|to marry sb, to get married to sb|${SLM}
1519|(cérémonie du) mariage|a wedding|${SLM}
1520|demander qn en mariage|to propose to sb|${SLM}
1521|avoir qn dans sa vie|to be in a relationship|${SLM}
1522|sortir OU vivre avec qn depuis longtemps|to be in a long-term relationship with sb|${SLM}
1523|se mettre en ménage avec qn|to move in with sb, to set up house with sb|${SLM}
1524|un compagnon OU une compagne|a (live-in) partner|${SLM}
1525|vivre en concubinage|to live together|${SLM}
1526|la fidélité (concept)|fidelity|${SLM}
1527|les relations sexuelles hors mariage|extramarital sex|${SLM}
1528|être infidèle à qn|to cheat on sb, to be unfaithful to sb|${SLM}
1529|la fidélité (fait d'être fidèle)|faithfulness|${SLM}
1530|l’adultère|adultery|${SLM}
1531|un coureur de jupons|a womanizer, a philanderer|${SLM}
1532|cesser d’aimer qn|to fall out of love|${SLM}
1533|rompre avec qn|to split up with sb, break up with sb|${SLM}
1534|se séparer de qn|to separate from sb|${SLM}
1536|homosexuel|homosexual|${SSM}
1537|l’homosexualité|homosexuality|${SSM}
1538|l’orientation sexuelle|sexual orientation|${SSM}
1539|la majorité sexuelle|the age of consent|${SSM}
1540|la communauté gay|the gay community|${SSM}
1541|une lesbienne|a lesbian|${SSM}
1542|le mouvement des lesbiennes et des gays|the lesbian and gay movement|${SSM}
1543|bisexuel|bisexual|${SSM}
1544|un(e) transsexuel(le)|a transexual|${SSM}
1545|un travesti|a transvestite|${SSM}
1546|transgenre, transsexuel|transgender|${SSM}
1547|se déclarer ouvertement homosexuel|to come out (of the closet)|${SSM}
1548|révéler l’homosexualité de qn (sans son consentement)|to out sb|${SSM}
1549|les droits des homosexuels|gay rights|${SSM}
1550|favorable aux homosexuels|gay-friendly|${SSM}
1551|un hôtel où les homosexuels sont bienvenus|a gay-friendly hotel|${SSM}
1552|se marier avec qn, épouser qn|to marry sb|${SSM}
1553|être marié / se marier avec qn|to be / get married to sb|${SSM}
1554|convoler, se passer la bague au doigt|to tie the knot, to get hitched|${SSM}
1555|le mariage (institution)|marriage|${SSM}
1556|un mariage (cérémonie)|a wedding|${SSM}
1557|un PACS, une union civile|a civil partnership, a civil union, a domestic partnership|${SSM}
1558|un couple gay|a gay couple|${SSM}
1559|un compagnon OU une compagne|a partner|${SSM}
1560|un(e) petit(e) amie(e) avec qui l’on vit|a live-in boyfriend / girlfriend|${SSM}
1561|s’installer avec qn|to move in with sb|${SSM}
1562|se mettre en ménage avec qn|to set up house with sb|${SSM}
1563|une famille homoparentale|same-sex parents, LGBT parents|${SSM}
1564|l’homoparentalité|same-sex parenting|${SSM}
1565|légaliser / interdire le mariage homosexuel|to legalize / ban gay marriage|${SSM}
1566|avoir des opinions progressistes|to have liberal views|${SSM}
1567|une question controversée, un problème sensible|a hot-button issue|${SSM}
1568|un problème controversé|a controversial, contentious issue|${SSM}
1569|être contre le mariage homosexuel|to oppose gay marriage, to be opposed to gay marriage|${SSM}
1570|les opposants au mariage homosexuel|opponents, critics of gay marriage|${SSM}
1571|être pour le mariage homosexuel / favorable au mariage homosexuel|to support gay marriage|${SSM}
1572|les partisans du mariage homosexuel|advocates, supporters, proponents of gay marriage|${SSM}
1573|les valeurs conservatrices|conservative values|${SSM}
1574|un préjugé|a prejudice, a bias|${SSM}
1575|avoir des préjugés contre qch|be prejudiced, biased against sth|${SSM}
1576|traditionaliste|traditionalist|${SSM}
1577|un homophobe|a homophobe|${SSM}
1578|l’homophobie|homophobia|${SSM}
1579|des remarques homophobes|homophobic remarks|${SSM}
1580|être inflexible au sujet du mariage gay|to take a tough line on gay marriage|${SSM}
1582|l’univers|the universe|${SPA}
1583|le système solaire|the solar system|${SPA}
1584|une galaxie|a galaxy|${SPA}
1585|l’espace|outer space|${SPA}
1586|une année-lumière|a light year|${SPA}
1587|une planète|a planet|${SPA}
1588|une comète|a comet|${SPA}
1589|un astéroïde|an asteroid|${SPA}
1590|un trou noir|a black hole|${SPA}
1591|un météorite|a meteorite|${SPA}
1592|un monolithe|a monolith|${SPA}
1593|un mégalithe|a megalith|${SPA}
1594|l’astronomie|astronomy|${SPA}
1595|un astronome|an astronomer|${SPA}
1596|un fana de l’espace|a space buff|${SPA}
1597|la NASA|NASA|${SPA}
1598|l’Agence spatiale européenne|the ESA (European Space Agency)|${SPA}
1599|la conquête de l’espace|the conquest of space|${SPA}
1600|l’ère spatiale|the space age|${SPA}
1601|la course dans l’espace|the space race|${SPA}
1602|un vol dans l’espace|a space flight|${SPA}
1603|l’astronautique|astronautics|${SPA}
1604|l’avionique|avionics|${SPA}
1605|l’espace aérien|airspace|${SPA}
1606|l’industrie aérospatiale|the aerospace industry|${SPA}
1607|une mission sur Mars|a mission to Mars|${SPA}
1608|explorer|to explore|${SPA}
1609|un explorateur|an explorer|${SPA}
1610|un vol habité|a manned flight|${SPA}
1611|un vol inhabité|a unmanned flight|${SPA}
1612|une combinaison spatiale|a space suit|${SPA}
1613|un casque d’astronaute|a space helmet|${SPA}
1614|un équipage|a crew|${SPA}
1615|un astronaute|an astronaut|${SPA}
1616|un cosmonaute|a cosmonaut|${SPA}
1617|un taïkonaute|a taïkonaut|${SPA}
1618|voyageur de l'espace|spaceman / spacewoman / space traveller|${SPA}
1619|astronaute stagiaire|space cadet|${SPA}
1620|une fusée|a rocket|${SPA}
1621|une rétrofusée|a retrorocket|${SPA}
1622|un téléscope|a telescope|${SPA}
1623|une sonde|a probe|${SPA}
1624|un vaisseau spatial|a spaceship / a rocket ship / spacecraft|${SPA}
1625|le carburant|fuel|${SPA}
1626|une navette|a shuttle|${SPA}
1627|une station spatiale|a space station|${SPA}
1628|un véhicule spatial|a lander|${SPA}
1629|un véhicule lunaire|a lunar rover|${SPA}
1630|lancer|to launch|${SPA}
1631|être mis à feu|to blast off|${SPA}
1632|un lanceur de satellites|a satellite launcher|${SPA}
1633|une rampe de lancement, pas de tir|a launch pad|${SPA}
1634|le compte à rebours|the countdown|${SPA}
1635|l’envol|lift-off|${SPA}
1636|un moteur|an engine|${SPA}
1637|propulseur de fusée, moteur-fusée|a rocket engine|${SPA}
1638|propulser|to propel|${SPA}
1639|le combustible pour fusée, le propergol|propellant|${SPA}
1640|kérosène (de fusée)|rocket fuel|${SPA}
1641|une fusée de lancement|a launch vehicle / a booster / a booster rocket|${SPA}
1642|une fusée interplanétaire|a space rocket|${SPA}
1643|une fusée à étages|a multi-stage rocket|${SPA}
1644|un sas|an airlock|${SPA}
1645|ce n’est pas sorcier !|it’s not rocket science!|${SPA}
1646|un missile|a missile|${SPA}
1647|un satellite de télécommunications|a communications satellite|${SPA}
1648|un satellite météorologique|a weather satellite|${SPA}
1649|un satellite espion|a surveillance satellite|${SPA}
1650|télécommandé|remote-controlled|${SPA}
1651|être en orbite / se mettre en orbite|to be in orbit / go into orbit|${SPA}
1652|mettre, placer un satellite en orbite|to put a satellite in(to) orbit|${SPA}
1653|atterrir|to land / to touch down|${SPA}
1654|atterrissage / amerissage / alunissage|touchdown|${SPA}
1655|alunir|to land on the moon|${SPA}
1656|amerrir|to splash down|${SPA}
1657|amerissage|splashdown|${SPA}
1658|l’apesanteur|weightlessness / zero gravity|${SPA}
1659|la micro-gravité|microgravity|${SPA}
1660|le tourisme dans l’espace|space tourism|${SPA}
1661|recherches aérospatiales|space research / rocket research|${SPA}
1662|un laboratoire spatial|a space lab|${SPA}
1663|la spatiologie|space science|${SPA}
1664|une retombée|a spin-off|${SPA}
1665|le GPS|satnav / global positioning system / GPS|${SPA}
1666|une soucoupe volante|a flying saucer|${SPA}
1667|un OVNI|an unidentified flying object / a UFO|${SPA}
1668|un extra-terrestre|an alien / an alien being|${SPA}
1669|un martien|a Martian|${SPA}

8000|supporter/porter/naître|bear / bore / borne/born|${VI}
8001|battre|beat / beat / beaten|${VI}
8002|devenir|become / became / become|${VI}
8003|commencer|begin / began / begun|${VI}
8004|plier, se courber|bend / bent / bent|${VI}
8005|parier|bet / bet / bet|${VI}
8006|lier, relier|bind / bound / bound|${VI}
8007|mordre|bite / bit / bitten|${VI}
8008|saigner|bleed / bled / bled|${VI}
8009|souffler|blow / blew / blown|${VI}
8010|casser|break / broke / broken|${VI}
8011|apporter|bring / brought / brought|${VI}
8012|construire|build / built / built|${VI}
8013|brûler|burn / burnt / burnt|${VI}
8014|éclater|burst / burst / burst|${VI}
8015|acheter|buy / bought / bought|${VI}
8016|jeter (un sort), distribuer des rôles|cast / cast / cast|${VI}
8017|attraper|catch / caught / caught|${VI}
8018|choisir|choose / chose / chosen|${VI}
8019|s’accrocher, adhérer|cling / clung / clung|${VI}
8020|venir|come / came / come|${VI}
8021|coûter|cost / cost / cost|${VI}
8022|ramper, grimper|creep / crept / crept|${VI}
8023|couper|cut / cut / cut|${VI}
8024|distribuer|deal / dealt / dealt|${VI}
8025|creuser|dig / dug / dug|${VI}
8026|plonger|dive / dived / dived/dove(USA)|${VI}
8027|faire|do / did / done|${VI}
8028|dessiner|draw / drew / drawn|${VI}
8029|rêver|dream / dreamt / dreamt|${VI}
8030|boire|drink / drank / drunk|${VI}
8031|conduire|drive / drove / driven|${VI}
8032|manger|eat / ate / eaten|${VI}
8033|tomber|fall / fell / fallen|${VI}
8034|nourrir|feed / fed / fed|${VI}
8035|sentir, éprouver|feel / felt / felt|${VI}
8036|se battre, combattre|fight / fought / fought|${VI}
8037|trouver|find / found / found|${VI}
8038|s’enfuir|flee / fled / fled|${VI}
8039|voler (avion)|fly / flew / flown|${VI}
8040|interdire|forbid / forbade / forbidden|${VI}
8041|oublier|forget / forgot / forgotten|${VI}
8042|pardonner|forgive / forgave / forgiven|${VI}
8043|geler|freeze / froze / frozen|${VI}
8044|obtenir|get / got / got|${VI}
8045|donner|give / gave / given|${VI}
8046|aller|go / went / gone|${VI}
8047|grandir|grow / grew / grown|${VI}
8048|pendre, tenir, accrocher|hang / hung / hung|${VI}
8049|avoir|have / had / had|${VI}
8050|entendre|hear / heard / heard|${VI}
8051|(se) cacher|hide / hid / hidden|${VI}
8052|frapper, atteindre, toucher|hit / hit / hit|${VI}
8053|tenir|hold / held / held|${VI}
8054|blesser|hurt / hurt / hurt|${VI}
8055|garder|keep / kept / kept|${VI}
8056|s’agenouiller|kneel / knelt / knelt|${VI}
8057|savoir, connaître|know / knew / known|${VI}
8058|mener|lead / led / led|${VI}
8059|s’appuyer|lean / leant / leant|${VI}
8060|apprendre|learn / learnt / learnt|${VI}
8061|laisser, quitter|leave / left / left|${VI}
8062|prêter|lend / lent / lent|${VI}
8063|permettre|let / let / let|${VI}
8064|allumer|light / lit / lit|${VI}
8065|perdre|lose / lost / lost|${VI}
8066|fabriquer, faire|make / made / made|${VI}
8067|signifier, vouloir dire|mean / meant / meant|${VI}
8068|(se) rencontrer|meet / met / met|${VI}
8069|mettre|put / put / put|${VI}
8070|cesser (de)|quit / quit / quit|${VI}
8071|lire|read / read / read|${VI}
8072|chevaucher|ride / rode / ridden|${VI}
8073|sonner|ring / rang / rung|${VI}
8074|s’élever, se lever|rise / rose / risen|${VI}
8075|courir|run / ran / run|${VI}
8076|scier|saw / sawed / sawn|${VI}
8077|dire|say / said / said|${VI}
8078|voir|see / saw / seen|${VI}
8079|chercher|seek / sought / sought|${VI}
8080|vendre|sell / sold / sold|${VI}
8081|envoyer|send / sent / sent|${VI}
8082|fixer|set / set / set|${VI}
8083|secouer|shake / shook / shaken|${VI}
8084|briller|shine / shone / shone|${VI}
8085|tirer/tuer par balle/filmer|shoot / shot / shot|${VI}
8086|montrer|show / showed / shown|${VI}
8087|rétrécir|shrink / shrank / shrunk|${VI}
8088|fermer|shut / shut / shut|${VI}
8089|chanter|sing / sang / sung|${VI}
8090|couler|sink / sank / sunk|${VI}
8091|être assis|sit / sat / sat|${VI}
8092|dormir|sleep / slept / slept|${VI}
8093|glisser|slide / slid / slid|${VI}
8094|sentir|smell / smelt / smelt|${VI}
8095|parler|speak / spoke / spoken|${VI}
8096|accélérer|speed / sped / sped|${VI}
8097|dépenser|spend / spent / spent|${VI}
8098|fendre|split / split / split|${VI}
8099|gâcher|spoil / spoilt / spoilt|${VI}
8100|répandre|spread / spread / spread|${VI}
8101|jaillir, bondir|spring / sprang / sprung|${VI}
8102|être debout|stand / stood / stood|${VI}
8103|voler quelque chose, dérober|steal / stole / stolen|${VI}
8104|coller|stick / stuck / stuck|${VI}
8105|piquer|sting / stung / stung|${VI}
8106|frapper|strike / struck / struck|${VI}
8107|jurer|swear / swore / sworn|${VI}
8108|enfler|swell / swelled / swollen|${VI}
8109|nager|swim / swam / swum|${VI}
8110|se balancer|swing / swung / swung|${VI}
8111|prendre|take / took / taken|${VI}
8112|enseigner|teach / taught / taught|${VI}
8113|déchirer|tear / tore / torn|${VI}
8114|dire, raconter|tell / told / told|${VI}
8115|penser|think / thought / thought|${VI}
8116|jeter|throw / threw / thrown|${VI}
8117|comprendre|understand / understood / understood|${VI}
8118|bouleverser|upset / upset / upset|${VI}
8119|(se) réveiller|wake / woke / woken|${VI}
8120|porter (des vêtements)|wear / wore / worn|${VI}
8121|mouiller|wet / wet / wet|${VI}
8122|gagner|win / won / won|${VI}
8123|enrouler|wind / wound / wound|${VI}
8124|(se) retirer, retirer de l’argent|withdraw / withdrew / withdrawn|${VI}
8125|écrire|write / wrote / written|${VI}

`.trim();



// C'EST ICI QUE LA CORRECTION EST IMPORTANTE : Ajout de String.raw`...`
const RAW_PHY = String.raw`

==================================================
DECK : EM1
==================================================

Q: (INC)
Énoncer le principe de Curie
R: Les éléments d'invariance et de symétrie des causes doivent se retrouver dans les effets produits.
--------------------
Q: (INC)
Quelles sont les dimensions de la densité volumique/surfacique/linéique de charge ?
R: densité volumique de charge ρ homogène à une charge divisée par un volume
unité: [$]C.m^{-3}[/$]
densité surfacique de charge [$]\sigma[/$] homogène à une charge divisée par une surface
unité: [$]C.m^{-2}[/$]
densité linéique de charge [$]\lambda[/$] homogène à une charge divisée par une longueur
unité: [$]C.m^{-1}[/$]
--------------------
Q: (INC)
Quelle est la charge d'un volume élémentaire dV? d'une surface élémentaire dS? d'une longueur élémentaire dl?
R: La charge d'un volume élémentaire est [latex]$dq = \rho.dV$[/latex].
La charge d'une surface élémentaire est [latex]$dq = \sigma.dS$[/latex].
La charge d'une longueur élémentaire est [latex]$dq = \lambda.dl$[/latex].
--------------------
Q: (INC)
Quelle condition est nécessaire pour qu'une distribution de charges soit invariante par rotation autour d'un axe Δ ?
R: Il faut que pour tout point M appartenant à cette distribution, sa densité de charge vérifie ρ(M′) = ρ(M) (cas volumique) avec M′ l'image de M par rotation d'un angle quelconque autour de Δ.
--------------------
Q: (INC)
Quelle condition est nécessaire pour qu'une distribution de charges illimitée dans la direction d'un axe Δ soit invariante par translation suivant Δ ?
R: Il faut que pour tout point M appartenant à cette distribution et son translaté M', sa densité de charge vérifie : ρ(M') = ρ(M) (cas volumique)
--------------------
Q: (INC)
Quel choix de coordonnées est adapté à une invariance par translation ? Puis par rotation ?
R: • Invariances par translation → coordonnées cartésiennes ou cylindriques.
• Invariances par rotation → coordonnées cylindriques ou sphériques.
--------------------
Q: (INC)
Que dire du champ électrostatique en un point P' symétrique de P par rapport à un plan d’antisymétrie
d’une distribution de charges ? (n’appartenant pas forcément à cette distribution de charges)
R: Le champ électrostatique en P' est l’opposé du symétrique de celui en P par rapport au
plan d’antisymétrie de la distribution de charges.
--------------------
Q: (INC)
Que dire du champ électrostatique en P', point symétrique de P par rapport à un plan de symétrie
d’une distribution de charges ?
R: Le champ électrostatique en P' est le symétrique de celui en P par rapport au plan de symétrie de la distribution de charge.
--------------------
Q: (INC)
Que dire du champ électrostatique d'un point M d'un plan de symétrie d’une distribution de charges ?
R: Le champ électrostatique créé en un point M d’un plan de symétrie d’une distribution de charges appartient à ce plan.
--------------------
Q: (INC)
Que dire d'un champ [$]\vec{E}[/$] créé par une distribution volumique de charge ?  (Domaine de définition et continuité?)
R: Le champ [$]\vec{E}[/$] créé par une distribution volumique de charge est défini et continu en tout point de l’espace.
--------------------
Q: (INC)
Que dire d'un champ [$]\vec{E}[/$] créé par une distribution surfacique de charge ?  (Domaine de définition et continuité?)
R: Le champ [$]\vec{E}[/$] créé par une distribution surfacique de charge est défini et continu en tout point de l’espace, sauf au niveau des points de la distribution. Il est donc discontinu à la traversée de la surface chargée.
--------------------
Q: (INC)
Que dire d'un champ [$]\vec{E}[/$] créé par un ensemble de charges ponctuelles ? (Domaine de définition et continuité?)
R: Le champ [$]\vec{E}[/$] créé par un ensemble de charges ponctuelles est défini et continu en tout point de
l’espace, sauf sur les charges.
--------------------
Q: (INC)
Qu'est-ce qu'un plan de symétrie d'une distribution de charges ?
R: Un plan de symétrie d'une distribution de charges est un plan tel que la distribution de charges obtenue en déplaçant les charges selon une symétrie par rapport à ce plan est identique à la
distribution initiale.
--------------------
Q: (INC)
Qu'est-ce qu'un plan d'antisymétrie d'une distribution de charges ?
R: On appelle plan d’antisymétrie d'une distribution de charges un plan tel que la distribution de charges obtenue en déplaçant les charges selon une symétrie par rapport à ce plan est opposée (changement de signe) à la distribution initiale.
--------------------
Q: (INC)
Donner la loi de Coulomb qui s'exerce entre deux charges ponctuelles q1 et q2 séparées d'une distance r.
R: \(\vec{F}_{2 \rightarrow 1} = - \vec{F}_{1 \rightarrow 2} = \frac{1}{4 \pi \epsilon _0} \frac{q_1 q_2}{r^2} \vec{u}_{2 \rightarrow 1}\)
--------------------
Q: (INC)
Comment est décrite la répartition de la charge d'une distribution volumique/ surfacique/ linéique de charges ?
R: [latex]Elle est décrite par une fonction scalaire appelée densité volumique/ surfacique/ linéique de charge  $\rho$/ $\sigma$/$\lambda$, qui dépend des coordonnées (x', y', z') des points de la distribution de charges.[/latex]
--------------------
Q: (INC)
Comment calcule-t-on le champ électrique total en un point en utilisant le principe de superposition ?
R: Le champ électrique total en un point est calculé en faisant la somme vectorielle des champs électriques créés par chaque charge prise individuellement.
--------------------
Q: (INC)
Comment calcule-t-on la force totale exercée sur une charge de la part d'un ensemble de charges ponctuelles?
R: On utilise le théorème de superposition en sommant la contribution de chaque charge ponctuelle prise séparément.
--------------------
Q: (INC)\(\text{Donner le champ électrostatique crée en un point P par une charge ponctuelle q située en S}\)
R: \(\vec{E} (P) = \frac{q}{4 \pi \epsilon _0} \frac{\vec{u}_r}{r^2} = \frac{q}{4 \pi \epsilon _0}  \frac{\vec{SP}}{SP^3}\)
--------------------
Q: (INC)
\(\text{Donner la direction de } \vec{E} \text{ dans le cas où } q >0 \)
R: \(\text{le champ } \vec{E} \text{ créé par une charge ponctuelle positive part de la charge. Il diverge à partir de la charge}\)
>>> [IMAGE_ID: paste-c1726407b90adfa409f559a158eb8b1a740d476c.jpg] <<<
--------------------
Q: (INC)
\(\text{Donner la direction de } \vec{E} \text{ dans le cas où } q <0 \)
R: \(\text{Le champ } \vec{E} \text{ créé par une charge ponctuelle négative se dirige vers la charge. Il converge vers la charge}\)
>>> [IMAGE_ID: paste-001a83783b8dd4b04bb9bb0d44ca862c9303f523.jpg] <<<
--------------------
Q: (INC)\(\text{Deux charges } q_1, q_2 \text{ qui sont de signe différent intéragissent entre elles. Est-ce-qu'elles se repoussent ou est-ce-qu'elles s'attirent ? Pourquoi ? }\)
R: \(\text{Elles s'attirent. En effet, } q_1 q_2 < 0, \text{ donc la force d'intéraction électrostatique est attractive.}\)
--------------------
Q: (INC)\(\text{Deux charges } q_1, q_2 \text{ qui sont de même signe intéragissent entre elles. Est-ce-qu'elles se repoussent ou est-ce-qu'elles s'attirent ? Pourquoi ? }\)
R: \(\text{Elles se repoussent. En effet, } q_1 q_2 > 0, \text{ donc la force d'intéraction électrostatique est répulsive.}\)
--------------------
Q: (INC)\(\text{Comment s'appelle la constante } \epsilon _0 \text{ dans la loi de Coulomb ?}\)
R: C'est la permittivité du vide
--------------------
Q: (INC) Quand peut-on considérer une distribution de charges comme surfacique ?
R: Une distribution de charges peut être considérée comme surfacique lorsque l'une de ses dimensions spatiales est beaucoup plus petite que les deux autres dimensions.
--------------------
Q: (INC) Quand peut-on considérer une distribution de charges comme linéique ?
R: Une distribution de charges peut être considérée comme linéique lorsque deux de ses dimensions spatiales sont beaucoup plus petites que la troisième dimension.
--------------------
Q: >>> [IMAGE_ID: paste-de3005b71b3b26e6cbfb7bc7e487288057e44965.jpg] <<<
R: >>> [IMAGE_ID: paste-4e5b864acd14971b75ee4cfa20de066c86177c58.jpg] <<<
--------------------
Q: >>> [IMAGE_ID: paste-036e005e8785d46a0d662e7e88fa5533bfe23c98.jpg] <<<
R: >>> [IMAGE_ID: paste-75d5efd4f249c0e30de16f6754802351a3a09811.jpg] <<<
--------------------

==================================================
DECK : EM2
==================================================

Q: (A.R) Quelle est la définition de la circulation du champ électrostatique \(\vec E\) de \(A\) à \(B\) le long de \((\Gamma)\) ?
Dépend-elle du chemin suivi \((\Gamma)\) pour aller de A à B?
R: \[C_{A \to B(\Gamma)}=\int_{A(\Gamma)}^{B}{\vec E \ldotp \vec{dl} }\]Cette circulation est indépendante du chemin suivi car elle peut s'écrire sous la forme de la variation d'une fonction qui est le potentiel électrostatique:
\(C_{A \to B}=\int_{A}^{B}{\vec E \ldotp \vec{dl} }=-(V_B-V_A)\)
--------------------
Q: (A.R) Que vaut la circulation du champ électrostatique le long d'un contour fermé? Justifier.
R: La circulation du champ électrostatique entre le point \(A\) et \(B\) est indépendante du chemin parcouru.
Si le chemin est fermé: B et A sont confonds donc \(V_A=V_B\) et donc la circulation du champ est nulle\[C_{A \to B=A} = \oint \vec E \ldotp \vec{dl} =-(V_B -V_A )=-(V_A -V_A)= 0\]
--------------------
Q: (A.R) Quelle est la formule donnant le potentiel électrostatique créé en un point \(P\) par une charge source \(q\) ?
R: Potentiel électrostatique : 
\[V(P) = {{1}\over{4\pi \varepsilon_0}}{q \over r} + K\]\(r\) : distance du point \(P\) par rapport à la charge source
\(q\) : charge source
K: une constante
--------------------
Q: (A.R) Quelle est la forme des surfaces équipotentielles d'une charge ponctuelle.
R: Ce sont des sphères dont le centre est la position de la charge ponctuelle.
--------------------
Q: (A.R) Comment évolue le potentiel électrostatique à mesure que l'on s'éloigne d'une charge ponctuelle ? Comment oriente-t-on les flèches du champ électrostatique sur un schéma ?
R: Selon le signe de \(q\):
- Si \(q > 0\) le potentiel décroît lorsque l'on s'éloigne de la charge
- Si \(q < 0\) le potentiel croît lorsque l'on s'éloigne de la charge
Le champ électrostatique est orienté dans le sens des potentiels décroissants. 
Mnémotechnique : \(q > 0 \text{ devient } q \rightarrow 0 \)  et \(q < 0 \text{ devient } q \leftarrow 0 \)
--------------------
Q: (A.R) Quelle formule donne le potentiel électrostatique créé par plusieurs charges ponctuelles en un point \(P\) ?
R: \[V(P) = {1 \over {4 \pi \varepsilon_0}}\sum_i {q_i \over r_i}\]
\(q_i\) : charge en Coulomb (C) portée par la \(i\)-ème charge
\(r_i\) : distance entre la \(i\)-ème charge et le point \(P\)
On a choisi \(V=0\) quand \(\forall i \; r_i\rightarrow \infty\)
--------------------
Q: (L.L) Dans le repère orthonormé \((0, \vec{\mathbf{u}}_x, \vec{\mathbf{u}}_y, \vec{\mathbf{u}}_z)\), donnez \({d} f\) puis \(\vec{grad}f\) et enfin la relation entre les deux.
R: df = \(\left(\frac{\partial f}{\partial x}\right)dx + \left(\frac{\partial f}{\partial y}\right)dy + \left(\frac{\partial f}{\partial z}\right)dz\)
\(\vec{grad}f=\left(\frac{\partial f}{\partial x}\right)\vec{u}_x + \left(\frac{\partial f}{\partial y}\right)\vec{u}_y + \left(\frac{\partial f}{\partial z}\right)\vec{u}_z\) 
\(df=\vec{grad}f.\vec{dl}\)
--------------------
Q: (L.L) \(\vec{grad}f\) est normal à quelle surface ?
R: \(\vec{grad}f\) est normal à la surface d'équation f(x,y,z) = cst
--------------------
Q: (L.L) Quelle est la relation intégrale liant le champ électrostatique et le potentiel électrostatique?
R: \(C_{A \to B}=\int_{A}^{B} \vec{E} \cdot d\vec{l}=- \int_{A}^{B} dV=(V_A -V_B)\)
--------------------
Q: (L.L) Quelle est la relation locale liant le champ électrostatique et le potentiel électrostatique?
R: \(\vec{E} = -\vec{grad} V\)
--------------------
Q: (L.L) Comment retrouver la relation locale 
\(\vec{E} = -\vec{grad} V\) à l'aide de la relation intégrale associée ?
R: On a \(\int_{A}^{B} \vec{E} \cdot d\vec{l}\) = - (\(V_B - V_A\)) or \(V_B - V_A\) = \(\int_{A}^{B} dV\) donc \(\vec{E} \cdot d\vec{l} = -dV\)
enfin \(dV = \vec{grad}V \cdot \vec{dl}\) donc \(\vec{E}.\vec{dl} = -\vec{grad}V.\vec{dl}\) ainsi \(\vec{E} = -\vec{grad} V\)
--------------------
Q: (C.J) L'énergie potentielle électrostatique Ep d'une charge q0 placée dans un champ extérieur \(\vec E\) tel que \(\vec E\)= \(- \vec{ grad} V\) vérifie la relation :
R: \(E_p = q_0V\)
--------------------
Q: (C.J) Comment passer de la relation \(\vec{E} = -\vec {grad} V\) à la relation\(\vec{F} = -\vec {grad} E_p\)
R: En multipliant par \(q_0\) car 
\(\vec{F} = q_0 \vec{E}\) et \(E_p=q_0 V\)
--------------------
Q: (C.J) Quelle est l'unité du potentiel électrostatique ?
R: Le volt (V)
--------------------
Q: (C.J) Quelle est l'unité du champ \(\vec E\)
R: C'est \(V\ldotp m^{-1}\)
--------------------
Q: (C.J) Dans quel sens sont orientées les lignes du champ électrostatique ?
R: Dans le sens des potentiels décroissants
--------------------
Q: (C.J) Comment sont orientés les lignes du champ électrostatique par rapport aux surfaces équipotentielles ?
R: Orthogonalement
--------------------

==================================================
DECK : EM6
==================================================

Q: V.Iulian
>>> [IMAGE_ID: img7045909058837530815.jpg] <<<
R: >>> [IMAGE_ID: paste-b98860cd7c1b407c918bcc5209c0a68b396e8223.jpg] >> [IMAGE_ID: paste-e349a260a12b99bdc732b3868f7f557cb6dda0ea.jpg] <<<
--------------------
Q: V.Iulian 
>>> [IMAGE_ID: img2498669175369567868.jpg] <<<
R: 1)
>>> [IMAGE_ID: paste-ee06f45381f644b5348501214aa8bf553c0ae70b.jpg] >> [IMAGE_ID: paste-911334ecc07bc5a2c3f229921025f3087e0a090f.jpg] >> [IMAGE_ID: paste-41ed89d5aace0dfa0fd4142e6295a2fc8c00ca46.jpg] <<<
Et pour les symétries :
Le plan parallèle aux spires et équidistant des deux est un plan d’antisymétrie. Les lignes de champ sont symé-triques de part et d’autre de ce plan et en un point de ce plan lui appartiennent.
--------------------
Q: (A.P) 
>>> [IMAGE_ID: 20231127_205031.jpg] <<<
R: 1) Les lignes du champ B sont des cercles concentriques contenus dans le plan orthogonal au fil.
>>> [IMAGE_ID: paste-929588aa3d6f7ca46e3907765deffbcc31ebe543.jpg] >> [IMAGE_ID: paste-8c5f8f95d90ce3a0ee2536285b9588e66db63e68.jpg] <<<
--------------------
Q: (M.W) Commenter les symétries dans le cas d'une distribution de courant.
R: C'est à dire que pour un plan de symétrie d'une distribution de courant, ce même plan sera un plan d'antisymétrie pour le champ magnétique.
csq: Soit M et M' deux points symétriques l'un de l'autre par rapport à un plan de symétrie de la distribution de courant. ALors le champ 
\(\vec B(M')\) est l'opposé du symétrique du champ 
\(\vec B(M)\). csq: en un point M de ce plan de symétrie de la distribution de courant, le champ \(\vec B(M)\)sera normal au plan.
De même un plan d'antisymétrie d'une distribution de courant sera un plan de symétrie pour le champ magnétique.
csq: Soit M et M' deux points symétriques l'un de l'autre par rapport à un plan d'anti symatrie de la distribution de courant. ALors le champ
\(\vec B(M')\) est le symétrique du champ\(\vec B(M)\). csq: en un point M de ce plan d'anti symétrie de la distribution de courant, le champ \(\vec B(M)\)sera contenu dans le plan.
--------------------
Q: (M.W) Interpréter le cas où les lignes d'un champ magnétique se resserrent.
R: Là où les lignes de champs se resserrent, le champ magnétique est plus intense.
--------------------
Q: (BM) Soit \(\Gamma\) une courbe fermée et orientée (choix arbitraire) et \(\vec{dl}\) un vecteur déplacement élémentaire le long de \(\Gamma \)(orienté dans le même sens).
Donner l'expression de la circulation du champ \(\vec{B}\) le long du contour \(\Gamma\) fermé.
R: C = \(\oint_{\Gamma}\vec{B}.\vec{dl}\)
--------------------
Q: (BM) Donner l'énoncé du théorème d'Ampère.
R: La circulation du champ \(\vec{B}\) le long d'un contour fermé orienté \(\Gamma\) (contour d'Ampère) est égale au produit de \(\mu_{0}\) par l'intensité \(I_{e}\) enlacée, intensité qui traverse une surface S orientée s'appuyant sur \(\Gamma\):\(C = \oint_{\Gamma}\vec{B}.\vec{dl} = \mu_{0}I_{e}\)
--------------------
Q: (BM) Quelle est l'expression de l'intensité enlacée (du théorème d'ampère) pour une distribution volumique de courant (préciser les orientations).
R: \(I_{e} = \int\int_{S}\vec{j}.\vec{dS}\) avec S une surface reposant sur 
\(\Gamma\) et \(\vec{dS}\) orienté suivant l'orientation de \(\Gamma\) (règle du tire bouchon ou de la main droite).
--------------------
Q: (BM) Quelle est l'expression de I enlacée (du théorème d'ampère) dans le cas de courants filiformes.
R: \(I_e =\sum_{k}\epsilon_{k}I_{k}\) 
avec:
\(I_k\) les intensités des courants qui traversent \(\Gamma\)
\(\epsilon_{k} = 1 \) si \(I_{k}\) dans le sens de \(\vec{n}\) (vecteur unitaire orienté à partir de \(\Gamma\)) sinon \(\epsilon_{k} = -1\)
--------------------
Q: (BM) Enoncer les différentes étapes de la méthode de calcul de \(\vec{B}(M)\) par le théorème d'Ampère.
R: 1) Etude des symétires et invariances de \(\vec{B}(M)\) : Choix du système de coordonnées
2) Choix contour d'Ampère (ligne fermé \(\Gamma\)) tel que:
          a) \(\vec{B}   // \vec{dl}\) (ie ligne de champ)
          b) \(||\vec B ||\) constant le long du contour
3) Si la ligne n'est pas fermée alors la compléter par des portions de lignes telles que \(\vec{B}   \perp  \vec{dl}\) ou telles que \(\vec B=\vec 0\)
4) Rerpésenter \(\Gamma\) et l'orienter sur le schéma.
5) Calcul de \(\oint\vec{B} \cdot\vec{dl}\) le long de \(\Gamma\).
6) Calcul de \(\mu_{0}I_{e}\) (potentiellement plusieurs cas à traiter)
7) Appliquer le théorème d'Ampère.
--------------------
Q: (BM) Que vaut la valeur du flux du champ magnétique à travers une surface fermée ?
R: Il est nul. (ce résultat est admis)
Soit C = \(\Phi = \unicode{x222F}_{\mathscr{S}_g} \vec{B } \cdot  \vec{dS}  =0\)
On dit que le champ\( \vec{B } \) est à flux conservatif car cela implique que le flux du champ \( \vec{B } \) est le même à travers n'importe quelle section d'un tube de champ \( \vec{B } \) .
--------------------
Q: (BM) Donner l'ordre de grandeur du champ magnétique terrestre à la surface de la Terre.
R: \(5.10^{-5}T\)
--------------------
Q: (BM) Donner l'ordre de grandeur du champ à 1cm d’un fil rectiligne parcouru par un courant d’intensité 10A
R: \(2.10^{-4} T\)
--------------------
Q: (BM) Donner l'ordre de grandeur du champ à 1mm d’un aimant permanent au néodyme
R: 0,1 à 1 T
--------------------
Q: (BM) Donner l'ordre de grandeur du champ magnétique d'un élécrtoaimant.
R: 10 à 100 T
--------------------
Q: (S.E)
>>> [IMAGE_ID: paste-214e83666ae763236aea7c77a43581a64232fe68.jpg] <<<
On supposera le fil infini.
R: >>> [IMAGE_ID: paste-7edb2b9f50f23eac4176399c3ea5d9a799a4afd8.jpg] <<<
--------------------
Q: (S.E) 
>>> [IMAGE_ID: paste-fa84d71882fccd01306a9563169c424e60dbdf56.jpg] <<<
R: >>> [IMAGE_ID: paste-ed68266b1711dc9559d0ae00bb0133c98c544ddd.jpg] <<<
--------------------

==================================================
DECK : EM8
==================================================

Q: (M.B.T.) Exprimer la formule du moment magnétique d'un circuit filiforme plan bouclé et parcouru par un courant d'intensité \(I\) en expliquant les termes. Donner l'unité du moment magnétique.
R: Soit un circuit filiforme plan bouclé parcouru par un courant d'intensité \(I\).
Le moment magnétique \(\vec{\mathcal{M}}\) du courant est défini par:
\[\vec{\mathcal{M}} = I\vec{S} = IS\vec{n}\]
où :
•    \(S\) désigne l'aire de la surface délimitée par la boucle de courant
•    \(\vec{n}\) désigne le vecteur unitaire orthogonal au plan contenant le circuit et orienté suivant la règle de la main droite.
>>> [IMAGE_ID: IMG_825B15755F55-1.jpeg] <<<
Le moment s'exprime en \(A\cdot m^2\)
--------------------
Q: (M.B.T) Dans quelles conditions peut-on parler d'un dipôle magnétique pour une source de champ magnétique?
R: Une source de champ magnétique constitue un dipôle magnétique si :
- elle peut être modélisée par une boucle de courant de moment magnétique non nul \(\vec{\mathcal{M}}\)
- son extension spatiale de taille caracteristique \(a\) est très petite devant les autres dimensions caractéristiques (approximation dipolaire : \(OM \gg a \))
--------------------
Q: (A.R.) Représenter les lignes de champs d'un dipôle magnétique sur un schéma dans le plan.
R: >>> [IMAGE_ID: cartechamps-1.png] <<<
--------------------
Q: (A.R) Décrire qualitativement l'action d'un champ magnétique extérieur (uniforme / non uniforme) sur un dipôle magnétique.
R: Cas champ magnétique uniforme: le dipôle magnétique s'oriente selon les lignes de champ du champ magnétique extérieur.
Cas champ magnétique extérieur non unforme: idem et en plus le dipôle est attiré vers les zones de champ magnétique extérieur intense.
--------------------
Q: Quelle est l'expression de l'énergie potentielle d'un dipôle de moment magnétique \(\overrightarrow{m}\) situé en O et placé dans un champ mégnétique extérieur \(\overrightarrow {B_{ext}}(O)\)?
R: \(E_p=-\overrightarrow{m} . \overrightarrow{B_{ext}} (O)\)
--------------------
Q: Si d'un point de vue magnétique on assimile la Terre à un dipôle magnétique situé en son centre, quel est alors l'orientation de son moment magnétique? Quelle est l'orientation des lignes de champ magnétique terrestre au niveau des pôles?
R: \(\overrightarrow{m}\) est dirigé du nord géographique vers le sud géographique.
Les lignes de champ magnétique terrestre "sortent" du pôle sud et "entrent" au pôle nord.
--------------------

==================================================
DECK : EM9
==================================================

Q: Ylan / Qu'est-ce qu'un doublet de charges ?
R: Un doublet de charges est composé de deux charges opposées \(+q >0\) au point P et \(-q\) au point N séparées d'une distance \(a = PN\).
Il est caractérisé par son moment dipolaire: \(\overrightarrow {p}=q\overrightarrow {NP}\)
--------------------
Q: Ylan / Définition du moment dipolaire et unité ?
R: \(\text{Le moment dipolaire est } \vec{p} = q\vec{NP} \) 
Avec N (resp. P) le barycentre des charges négatives (resp. Positives) et q la somme des charges positives de la distribution.\(\text{Ce vecteur est dirigé de la charge négative vers la positive et son unité est le C.m ou le Debye symbole D}\)
--------------------
Q: Ylan / Cadre de l'approximation dipolaire ?
R: >>> [IMAGE_ID: Capture d] <<<
L'approximation dipolaire correspond à étudier les propriétés du dipôle électrostatique "loin" de ce dernier (r=OM >> a avec a=NP).
--------------------
Q: Victor \ Energie potentielle \(E_{p}\) d'un dipôle électirique rigide de moment dipolaire \(\vec{p}\) situé au point O et placé dans un champ extérieur \(\overrightarrow{E_{ext}}(O)\)?
R: \({E_{p}} = -\vec{p} .\vec{E}_{ext}(O) \)
--------------------
Q: Ylan / Le potentiel décroît-t-il plus vite ou moins vite avec un dipôle ou avec une unique charge ponctuelle ? Même question avec le champ électrostatique
R: Dans les deux cas, il décroît plus vite avec un dipôle car l'expression du potentiel V(M) varie en \(1/r²\) pour un dipôle alors qu'il varie en \(1/r\) pour une charge ponctuelle et pour le champ, E(M) varie en \(1/r^3\)pour un dipôle alors qu'il varie en \(1/r²\) pour une charge ponctuelle
--------------------
Q: Ylan / Retrouver l'expression du potentiel créé par un dipôle électrostatique dans le cas d'un doublet de charges ?
R: On commence par exprimer le potentiel en M en appliquant le théorème de superposition \(V(M)=V_P (M) + V_N (M)=\frac{q}{4\pi \epsilon_0}(\frac{1}{PM} - \frac{1}{NM})\) (somme des potentiels créés par 2 charges ponctuelles)
Puis on utilise la relation de Chasles pour exprimer \(\overrightarrow{PM}=\overrightarrow{PO}+\overrightarrow{OM}\) et \(\overrightarrow{NM}=\overrightarrow{NO}+\overrightarrow{OM}\) et en déduire les distances PM et NM:
De même \(NM =\sqrt{(a/2)^2+r^2+a\ r\ cos(\theta)}\)
Et on finit par effectuer un DL à l'ordre 1 en \(a/r\) pour exprimer \(PM^{-1}\) et \(NM^{-1}\) avec a=NP:
\(\frac{1}{PM}=\frac{1}{r} (1+\frac{a}{2r} cos(\theta))\)
De même:  \(\frac{1}{NM}=\frac{1}{r} (1-\frac{a}{2r} cos(\theta))\)
On injecte les expression de PM et NP dans V(M):
\(V(M)=\frac{q}{4\pi \epsilon_0 r^2} cos(\theta)=\frac{p\ cos\theta }{4\pi\epsilon_0r^2}\)
Autre notation: \(V(M)=\frac{\overrightarrow{p}.\overrightarrow{OM}}{4\pi\epsilon_0 OM^3}\)
(car \(\overrightarrow{p}=p\cos\theta  \overrightarrow{u_r}-p\sin\theta  \overrightarrow{u_\theta } \) et \(\overrightarrow{OM}=r \overrightarrow{u_r}\))
>>> [IMAGE_ID: Capture d] <<<
--------------------
Q: Victor \ Qu'est-ce qu'un dipôle électrostatique rigide ?
R: La norme de son moment dipolaire est constante.
--------------------
Q: Victor Que vaut la résultante des forces subies par un dipôle dans un champ électrostatique extérieur \(\vec{E}_{ext}\) uniforme ?
R: La résultante des forces est nulle. Il s'agit d'un couple de forces.
--------------------
Q: Ylan / Etablir le champ électrostatique créé par un dipôle électrostatique dans le cas d'un doublet de charges sachant que le potentiel créé par ce doublet de charge en est:
\(V(M)=\frac{p\ cos\theta }{4\pi\epsilon_0r^2}=\frac{\overrightarrow{p}.\overrightarrow{OM}}{4\pi\epsilon_0 OM^3}\)
Donnée: en coordonnées sphériques:
\(\overrightarrow{grad} f= \frac{\partial {f}}{\partial r} \overrightarrow{u_r}+\frac{1}{r}\frac{\partial {f}}{\partial \theta} \overrightarrow{u_\theta}+\frac{1}{r sin\theta}\frac{\partial {f}}{\partial \varphi } \overrightarrow{u_\varphi}\)
R: Utiliser la relation locale \(\vec{E}=-\vec{grad}(V)\)
\(\overrightarrow{E}=- \frac{\partial {V}}{\partial r} \overrightarrow{u_r}-\frac{1}{r}\frac{\partial {V}}{\partial \theta} \overrightarrow{u_\theta}=\frac{p}{4\pi\epsilon_0r^3} (2 cos\theta \ \overrightarrow{u_r}+sin\theta \ \overrightarrow{u_\theta})\)
Autre notation: 
\(\overrightarrow{E}=\frac{1}{4\pi\epsilon_0OM^5} (3\ (\overrightarrow{p}.\overrightarrow{OM})\ \overrightarrow{OM} - OM^2  \ \overrightarrow{p} \  \ )\)
(car \(\overrightarrow{p}=p\cos\theta  \overrightarrow{u_r}-p\sin\theta  \overrightarrow{u_\theta } \) et \(\overrightarrow{OM}=r \overrightarrow{u_r}\))
>>> [IMAGE_ID: Capture d] <<<
--------------------
Q: Victor \
Comment agit un champ électrostatique extérieur uniforme sur un dipôle électrostatique?
R: Le dipôle s'oriente (direction et sens) suivant les lignes de champ de \(\vec{E}_{ext}\) .
--------------------
Q: Ylan / Représenter les lignes de champ et les courbes équipotentielles du champ créé par un dipôle électrostatique
R: >>> [IMAGE_ID: paste-f94a6b6040693dd84af9aa136b7c19529ad0bf87.jpg] Courbes non orientées : équipotentielles
Courbes orientées : ligne de champ
--------------------
Q: (Yuye) A quoi correspond un moment dipôlaire moléculaire ?
R: Les molécules, bien que globalement neutres, peuvent présenter un moment dipolaire non nul. En effet, la disposition spatiale des atomes et leur différence de propriétés (électronégativité) peuvent les rendre dissymétriques. Le barycentre des charges positives et celui des charges négatives peuvent ne pas être confondus. Dans ce cas, la molécule présente un moment dipolaire permanent.
>>> [IMAGE_ID: 0.png] <<<
--------------------
Q: Victor \
Comment agit un champ électrostatique non uniforme sur un dipôle électrostatique?
R: Effet d'orientation: Le dipôle s'oriente (direction et sens) suivant les lignes de champ de \(\vec{E}_{ext}\) .
Effet de déplacement: Le dipôle est attiré vers les zones de champ \(\vec{E}_{ext}\) intense.
--------------------
Q: (Yuye) Quelle est l'expression de la force exercée par un ion \(Na^+\) sur le dipôle que constitue une molécule d'eau placée en M à une distance z de l'ion.
Donnée: Résultante des forces subit par un dipôle placé dans un champ extérieur: \(\overrightarrow{F}=\overrightarrow{grad} (\vec{p}.\overrightarrow{E_{ext}})(O)\)
R: Le champ électrostatique créé par l’ion \(Na^+\) au point M où se situe le dipôle est \(\vec E_{ext}(M) = \frac {e} {4 \pi \epsilon_0 z^2} \vec u_z\).
Effet d’orientation→Le dipôle s’oriente suivant \(\vec u_z\) (\(\vec p = p \vec u_z\))
Le dipôle subit la force \(\vec F = p \frac {dE_{ext}}{dz}(z)\vec u_z = - \frac {2pe}{4 \pi \epsilon_0 z^3 } \vec u_z\), orientée dans le sens des intensités croissantes du champ électrostatique. 
La molécule d’eau est attirée par l’ion → Effet de déplacement
>>> [IMAGE_ID: 0-067d29de6397b7932ac10e579ca73727b1f13e21.png] <<<
--------------------
Q: (Yuye) Qu'est-ce le dipôle induit?
R: En présence d'un champ électrique extérieur il s'exerce des forces de sens contraire sur les charges + et − d'un atome ou d'une molécule. Il apparaît une séparation des barycentres des charges > 0 et < 0.
L'atome ou la molécule sont alors dits polarisables et nous avons un moment dipolaire "induit" par la présence du champ électrique.
--------------------
Q: Etablir l'expression du moment résultant du couple de force subi par un doublet de charges dans un champ électrostatique extérieur \(\overrightarrow{E_{ext}}\) uniforme ?
R: \(\overrightarrow{\Gamma}=\overrightarrow {M}_O(\overrightarrow{F_P})+\overrightarrow {M}_O(\overrightarrow{F_N})\)
\(\overrightarrow{\Gamma}=\overrightarrow {OP}\wedge(q \ \overrightarrow{ E_{ext}})+\overrightarrow {ON}\wedge(-q \ \overrightarrow{ E_{ext}})\)
\(\overrightarrow{\Gamma}=q (\overrightarrow {OP}-\overrightarrow {ON})\wedge \overrightarrow{ E_{ext}}\)
\(\overrightarrow{\Gamma}=q \ \overrightarrow {NP}\wedge\overrightarrow{ E_{ext}}\)
\(\overrightarrow{\Gamma}=\overrightarrow {p}\wedge \overrightarrow{ E_{ext}}\)
--------------------

==================================================
DECK : EM10
==================================================

Q: (Daouda Cisse) Quelle est la forme générale des équations de Maxwell ?
R: >>> [IMAGE_ID: e1.PNG] <<<
--------------------
Q: (Daouda Cisse) Rappelez l'expression, dans le cas général, de l'équation de conservation de la charge?
R: >>> [IMAGE_ID: e2.PNG] <<<
--------------------
Q: (Daouda Cisse) Démontrez, dans le cas unidimensionnel, l'équation de conservation de la charge
>>> [IMAGE_ID: e3.PNG] <<<
R: >>> [IMAGE_ID: e4.PNG] >> [IMAGE_ID: e5.PNG] >> [IMAGE_ID: e6.PNG] <<<
--------------------
Q: (Oceane Arabi) Quelle est la relation entre la permittivité diélectrique du vide, la perméabilité magnétique du vide et la vitesse de la lumière ?
R: >>> [IMAGE_ID: e7.PNG] <<<
--------------------
Q: (Daouda Cisse) Quelle est la forme intégrale de l'équation de Maxwell-Gauss ?
R: Il s'agit du théorème de Gauss
\(\Phi_{E}=\unicode{x222F}_{\mathscr{S}_g} \vec{E}(M)d\vec{S}_M=\frac{Q_{int}}{\varepsilon_0}\)
--------------------
Q: (Marion Vincent) Quelle est la relation intégrale associée à la relation de Maxwell - flux
R: Il s'agit de la propriété selon laquelle le champ magnétique a un flux nul à travers toute surface fermée (flux conservatif)
>>> [IMAGE_ID: e9.PNG] <<<
Soit \(\unicode{x222F}_{\mathscr{S}} \vec{B}(M)d\vec{S}_M=0\)
--------------------
Q: (Marion Vincent) Quelle est la relation intégrale de l'équation de Maxwell - Faraday ?
R: Il s'agit de la loi de Faraday ( de l'induction )
\( \oint_{\Gamma} \vec{E}.\overrightarrow{dl}=- \frac{d\Phi_B}{dt} \)
Avec
\(\Phi _B =\int\int_{S}  \vec{B}(M)d\vec{S}_M\)
Avec \(S\) une surface qui repose sur \(\Gamma\).
--------------------
Q: (Oceane Arabi) Quelle est la relation intégrale de l'équation de Maxwell - Ampere ?
R: Il s'agit de la circulation du champ magnétique le long d'un contour fermé orienté. C'est le théorème d'Ampère généralisé: \(\oint_{\Gamma} \overrightarrow{B} . \overrightarrow{dl}=µ_0 I_{enlacé}+\epsilon_0 µ_0 \int\int_{\mathscr{S_{\Gamma}}} \frac{\partial  \vec {E}}{\partial t}.\vec{dS}\) avec \(\mathscr{S_{\Gamma}}\) une surface qui repose sur le contour fermé \(\Gamma\).
--------------------
Q: (Oceane Arabi) Dans une région vide de charge et de courant, que deviennent les équations de Maxwell ?
R: >>> [IMAGE_ID: e12.PNG] <<<
--------------------
Q: (Marion Vincent) Dans le cas du régime stationnaire, que deviennent les équations de Maxwell?
R: >>> [IMAGE_ID: e13.PNG] <<<
--------------------
Q: (Daouda Cisse) Comment retrouve-t-on l'équation de d'Alembert , dans une région vide de charge et de courant?
R: >>> [IMAGE_ID: e14.PNG] <<<
\(\overrightarrow {rot}(\overrightarrow {rot}\overrightarrow {E})-\overrightarrow {grad}(div(\overrightarrow {E}))=-\Delta \overrightarrow {E}\)
Or, la divergence du champ électrique est nulle dans une région vide de charge donc, en égalisant on a : 
\(\Delta \overrightarrow {E}-\frac{1}{c^2 } \frac{\partial^2  \vec{E}}{\partial t^2 }=\vec 0\) avec \(\epsilon_0 µ_0 c^ 2 =1\)
--------------------
Q: (Oceane Arabi) Quelle est l'équation de Poisson (régime stationnaire) et comment la retrouve-t-on?
R: \(div \ \vec{E}= \frac{\rho}{\epsilon_0}\)
\(\vec{E}=- \overrightarrow{grad} \ V\)
\(div ({- \overrightarrow{grad} \ V})= \frac{\rho}{\epsilon_0}\)
Or \(div(\overrightarrow{grad}V)=\Delta V\)
Donc \(-\Delta V=\frac{\rho}{\epsilon_0}\)
Soit 
>>> [IMAGE_ID: e18.PNG] <<<
 (Equation de Poisson de l'electrostatique)
--------------------
Q: (Vincent Marion) Que devient l'équation de Poisson dans une zone vide de charge (en régime stationnaire) ?
R: >>> [IMAGE_ID: e19.PNG] <<<
 équation de Laplace
--------------------
Q: Qu'est-ce que le vecteur densité volumique de courant de déplacement? Le courant de déplacement.
R: >>> [IMAGE_ID: paste-7efdc90615fbdb5476fdd210e9e5635b9591785b.jpg] <<<
--------------------
Q: 1. Comment s'écrit la loi de conservation de la charge en régime stationnaire?
2. Quelle est la relation intégrale associée? Quelle loi d'électrocinétique traduit-elle?
R: 1. \(div(\vec{j})=0\)
2. \(\unicode{x222F}_{\mathscr{S}} \vec{j}(M)d\vec{S}_M=0\) . Loi des noeuds.
--------------------

==================================================
DECK : EM11
==================================================

Q: \(\textcolor{ORANGE}{(M.A)}\) Que deviennent \(\vec \nabla\) et \(\frac{\partial }{\partial t}\) lorsque \(\vec  {\underline{E}}=\vec  {\underline{E_0}}exp(j(wt+\vec k.\vec r))\) et \(\vec  {\underline{E}}=\vec  {\underline{E_0}}exp(j(-wt+\vec k.\vec r))\) ?
R: Pour \(\vec  {\underline{E}}=\vec  {\underline{E_0}}exp(j(wt+\vec k.\vec r))\) , \(\vec \nabla = j.\vec k\) et \(\frac{\partial }{\partial t} \longleftrightarrow jw\)
Pour \(\vec  {\underline{E}}=\vec  {\underline{E_0}}exp(j(-wt+\vec k.\vec r))\), \(\vec \nabla = j.\vec k\) et \(\frac{\partial }{\partial t} \longleftrightarrow -jw\)
--------------------
Q: \(\textcolor{orange}{(M.A)}\)Quelle est la solution générale de l'équation de d'Alembert unidimensionnelle (équation d'onde) : \(\frac{\partial ² E_x}{\partial x²}- \frac{1}{c²}\frac{\partial ² E_x}{\partial t²}=0\)
R: \(E_x(x,t)=f(x-ct)+g(x+ct)\)
--------------------
Q: \(\textcolor{orange}{(M.A)}\)Que représentent les signaux f(x-vt) et g(x+vt)?
R: f(x-vt) représente un signal qui se propage, sans se déformer, à la vitesse v le long de l’axe \(O_x\) dans le sens des x croissants.
g(x+vt) représente un signal qui se propage, sans se déformer, à la vitesse v le long de l’axe \(O_x\) dans le sens des x décroissants.
--------------------
Q: M.W
On pose \(\vec{E}(x,t) = E_{0y}cos(\omega t-kx)\vec{e_y}+E_{0z}cos(\omega t-kx-\phi)\vec{e_z}\)
Quelle est la direction et le sens de propagation de cette onde ?
Les plans d'onde sont-ils bien orthogonaux à la direction de propagation de l'onde ?
Quelle est l'expression du vecteur d'onde \(\vec{k}\) ?
La composante de \(\vec{E}\) suivant \(\vec{e_x}\) est toujours nulle. Pourquoi ?
Déterminer l'expression du champ \(\vec{B}\) correspondant.
R: L'onde se propage sur l'axe (Ox) selon les x croissants.
Les plans d'onde (d'équation x=cste, plans parallèle au plan \((O,\overrightarrow{e_y},\overrightarrow{e_z}\)) ) sont bien orthogonaux à la direction de propagation de l'onde donnée par  \(+ \vec{e_x}\) .
\(\vec{k}=k \overrightarrow{e_x}=\frac{\omega}{c} \overrightarrow{e_x}\)
La composante selon \(\vec{e_x}\)est nulle car dans le vide le champ \(\vec{E}\) d'une OPP est transverse (orthogonal à la direction de propagation)
\(\vec{B} = \frac{\vec{k}\wedge\vec{E}}{w} = \frac{1}{c}(-E_z\vec{e_y} + E_y \vec{e_z})\)
--------------------
Q: \(\textcolor{orange}{(M.A)}\)Que dire des champs \(\vec E\) et \(\vec B\) d'une OPP dans le vide?
R: Ils sont orthogonaux entre eux et orthogonaux à la direction de propagation de l'onde.
Ils vérifient la relation: \(\vec{B}=\frac{\vec{u} \wedge \vec{E}}{c}\) avec \(\vec{u}\) un vecteur unitaire de la direction de propagation de l'OPP.
--------------------
Q: \(\textcolor{orange}{(M.A)}\) Si on note \(\vec u\) un vecteur unitaire de la direction de propagation, quelle relation permet de déterminer le champ \(\vec B\) d'une OPP dans le vide connaissant le champ \(\vec E\)?
R: \(\vec B= \frac 1 c \vec u \wedge \vec E\)
--------------------
Q: \(\textcolor{orange}{(M.A)}\) Qu'est ce qu'une onde plane progressive monochromatique (OPPM) se propageant le long de l'axe Ox dans le sens des x croissants ?
R: Une OPPM est une OPP dont la dépendance en \(x - ct\) (ou \(t-\frac x c\)) est de type sinusoïdal.
--------------------
Q: M.W
Proposer l'expression d'un champ \(\vec{E}\) se propageant suivant \(+\vec{u_x}\) et de polarisation circulaire gauche (sens trigonométrique). Faire de même pour une polarisation circulaire droite (sens horaire).
R: Pour un champ en polarisation circulaire gauche: \(\vec{E}(x,t) = E_{0}cos(\omega t-kx)\vec{e_y}+E_{0}sin(\omega t-kx)\vec{e_z}\)
Pour un champ en polarisation circulaire droite: \(\vec{E}(x,t) = E_{0}cos(\omega t-kx)\vec{e_y}-E_{0}sin(\omega t-kx)\vec{e_z}\)
--------------------
Q: M.W
Proposer l'expression d'un champ \(\vec{E}\) se propageant suivant \(+\vec{u_x}\) et polarisé rectilignement.
R: \(\vec{E} = \vec{E_0}cos(\omega t-kx - \phi)\)
avec \(\vec{E_0} = E_{0y}\vec{e_y} \) polarisation rectiligne suivant \(\overrightarrow{e_y}\)
ou \(\vec{E_0} =E_{0z}\vec{e_z}\) polarisation rectiligne suivant \(\overrightarrow{e_z}\)
ou encore \(\vec{E_0} = \frac{E_0} {\sqrt{2}}\vec{e_y} + \frac{E_0} {\sqrt{2}}\vec{e_z}\) polarisation rectiligne suivant \(\overrightarrow{e_y}+\overrightarrow{e_z}\)
...
--------------------
Q: \(\textcolor{orange}{(M.A)}\)On considère une onde plane progressive monochromatique se propageant dans le vide le long de l'axe Ox dans le sens des x croissants et \(\omega\) la pulsation temportelle. Quelle est l'expression du champ \(\vec E\)?
R: On a \(\vec E:(0,E_{0y}cos(\omega t - \omega \frac x c + \phi_y),E_{0z}cos(\omega t - \omega \frac x c + \phi_z))\)
soit: 
\(\vec E:(0,E_{0y}cos(\omega t - kx + \phi_y),E_{0z}cos(\omega t - kx + \phi_z))\)
--------------------
Q: \(\textcolor{orange}{(M.A)}\)Quel est l'expression du vecteur d'onde \(\vec k\) d'une OPPM se propageant dans le vide dans la direction donnée par le vecteur unitaire \( \vec u\)?
R: \(\vec k =\frac w c \vec u=\frac {2\pi}\lambda \vec u\)
--------------------
Q: (BM) Donner l'équation de d'Alembert tridimensionnelle pour \(\vec{E}\) .
R: \(\Delta\vec{E} - \frac{1}{c²}\frac{\partial²\vec{E}}{\partial t²} = \vec{0}\) avec \(\frac{1}{c²} = \epsilon_{0}\mu_{0} \)
--------------------

==================================================
DECK : EM12
==================================================

Q: (A.P) Donner l' expression, l'unité et le sens physique du vecteur de Poynting.
R: >>> [IMAGE_ID: 20240125_203524.jpg] <<<
--------------------
Q: (A.P) Que dire du vecteur de Poynting d'une OPP dans le vide ?
R: >>> [IMAGE_ID: img3435061267687801303.jpg] <<<
--------------------
Q: (V.I) Donner la densité volumique d’énergie magnétique et son unité
R: \(u_{_M}= \frac{1}{2\mu_0}||B||^2\) en \(J.m^{-3}\)
--------------------
Q: (V.I) Donner la densité volumique d’énergie électromagnétique en un point de l’espace où règne un champ électromagnétique \((\vec E , \vec B)\)
R: \(u_{_{em}}=\frac{1}{2}\epsilon_0||E||^2 +\frac{1}{2\mu_0}||B||^2\) 
unité  \(J.m^{-3}\)
--------------------
Q: (V.I) Donner le rapport entre le temps de propagation  \(\tau\) et  la période du signal \(T \)  puis entre la longueur du circuit L et la longueur d'onde \(\lambda\) dans le cadre de l'ARQS ou ARQP "magnétique"
R: - ARQS - Approximation des Régimes Quasi-Stationnaire
- ARQP - Approximation de Régimes Quasi Permanents
\(\tau << T\)
\(L<<\lambda\)
--------------------
Q: (V.I) Donner les Équations de Maxwell dans l’ARQS "magnétique"
R: ARQS - Approximation des Régimes Quasi-Stationnaire
\(div\vec E(M,t) =\frac{\rho(M,t)}{\epsilon_0}\)
\(\vec{rot}\vec E(M,t) = -\frac{\partial \vec B(M,t)}{\partial t}\)
\(div\vec B(M,t) = 0\)
\(\vec rot\vec B(M,t) = \mu_0 \vec j(M,t)\)
--------------------
Q: (V.I) Donner la densité volumique d’énergie électrique \(u_E\) , magnétique \(u_B\), électromagnétique \(u_{em}\) pour une OPP dans le vide
R: \( u_B=u_E=\frac{1}{2}\epsilon_0||E||^2\)  et \(u_{em}=\epsilon_0||E||^2\)
--------------------
Q: Puissance fournie par le champ électromagnétique à une charge q de vitesse v.(E-S)
R: >>> [IMAGE_ID: IMG_6162.jpg] <<<
Où F est la force de Lorenz
--------------------
Q: (V.I) Donner la loi d’Ohm « intégrale » puis la loi d’Ohm locale.
R: Loi integrale : \(u = Ri\)
Loi locale : \(\vec j = \gamma\vec E\)
\(\gamma\) la conductivité du matériau (\(S.m^{−1}\))
--------------------
Q: (V.I) Definir un conducteur.et un conducteur Ohmique
R: - Conducteur - milieu possédant des porteurs de charges mobiles.
- Conducteur Ohmique - c'est un Conducteur ou on a une relation de proportionalite entre  \(\vec j\) et \(\vec E\)   (\(\vec j = \gamma \vec E\))
porteurs de charges mobiles - des particules chargées susceptibles de se déplacer, par exemple des électrons dans un métal
--------------------
Q: (V.I) Retrouver l'expression de la densité volumique d'énergie électrique \(u_{em}\) dans le cas particulier dun condensateur plan.
R: - électrostatique: \(||\vec E|| = \frac{\sigma}{\epsilon_0}=\frac{Q}{\epsilon_0 S}\)
- électrocinétique: \(U_E =\frac{1}{2}CU^2 = \frac{Q^2}{2C}\)
- donc \(U_E = \frac{||\vec E||^2}{2C}(S \epsilon_0)^2 =\frac{||\vec E||^2 e}{2 \epsilon_0 S}  (S\epsilon_0)^2 = \frac{1}{2}\epsilon_0||\vec E||^2 Se\)
- Or \(Se=V\) donc \(u_E=\frac{U_E}{V}=\frac{1}{2} \epsilon_0 ||\vec E||^2\)
- S - surface des armatures
- e - distance entre armatures
- C - capacité du condensateur
- \(\sigma\) - densité surfacique de charge
- Q - la valeur absolue de la charge portée par les armatures
- \(U\) - la tension aux bornes du condensateur
--------------------
Q: Connaître et determiner la puissance volumique fournie par le champ électromagnétique aux porteurs de charges. (E-S)
R: >>> [IMAGE_ID: IMG_6164.jpg] <<<
--------------------
Q: Bilan d'energie sous forme intégrale.(E-S)
R: >>> [IMAGE_ID: IMG_6166.jpg] <<<
--------------------
Q: Bilan d'énergie sous forme locale.(E-S)
R: >>> [IMAGE_ID: paste-99d771ded1438c4d97b496e50d4f1c3d318344c6.jpg] <<<
--------------------

==================================================
DECK : EM13
==================================================

Q: (O.M) Dans une cavité de longueur \(a\) ou règne un champ \(\overrightarrow{E}\). Quelle sont les conditions que celui-ci doit vérifier ?
>>> [IMAGE_ID: paste-d13b668f511ce3dc30a786d7467c62ae5210dd48.jpg] <<<
R: -Le champ dans la cavité est nulle en \(x=0\) et en \(x=a\) à tout instant (car continuité de la composante tangentielle de \(\overrightarrow{E}\) à l'interface vide / conducteur parfait+ champ E tangent à l'inteface vide/ conducteur parfait). On a alors [$] E(x=0,t) = E(x=a,t) = 0[/$]
-L'equation de d'Alembert doit être aussi verifiée donc
[$] \Delta \overrightarrow{E} - \frac{1}{c^{2}} \frac{\delta  \overrightarrow{E}^2}{\delta t^2} = \overrightarrow{0}[/$]
--------------------
Q: (O.M) 
Quelle est la forme mathématique du champ \(\overrightarrow{E} (x,t)=f(x)g(t) \overrightarrow{u_z}\)  règnant dans la cavité.
>>> [IMAGE_ID: paste-d13b668f511ce3dc30a786d7467c62ae5210dd48.jpg] <<<
R: \(\overrightarrow{E} (x,t)=f(x)g(t) \overrightarrow{u_z}\) vérifie l'équation de d'Alembert.
Soit: \(\Delta E_z - \frac{1}{c^2} \frac{\partial^ 2 E_z}{\partial t^ 2}=0 \)
on a alors \(g(t) \frac{d^2 f}{dx^2} - \frac{1}{c^2} f(x) \frac{d^2 g }{dt^2} = 0\)
donc
\(\frac{1}{f(x)}\frac{d^2 f}{dx^2} = \frac{1}{c^2} \frac{1}{g(t)}\frac{d^2 g}{dt^2} = K\)
on a l'égalité avec une constante K car chaque coté de l'équation est indépendant de l'autre (d'un côté on a le temps tandis que de l'autre il s'agit de la position) ainsi on a 2 équations différentielles:
\( \frac{d^2 f}{dx^2}  - Kf(x) =  0\)
\(\frac{d^2 g}{dt^2} - K{c^2} g(t)= 0\)
La résolution de ces deux équa diff (les résoudre comme des equa diff normales, seules les solutions périodiques sont acceptables)
Donc \(g(t)=A cos(\omega t+\phi)\) avec \(\omega =\sqrt{-Kc^2}\)
et \(f(x)=A' cos(\frac{\omega}{c} t+\phi')\)
Donc \(\overrightarrow{E}=E_0 cos(\frac{\omega}{c} x)+cos(\omega t+\phi'') \overrightarrow{u_z}\)
--------------------
Q: (O.M)
\(\overrightarrow{E}=E_0 cos(\frac{\omega}{c} x+\phi)+cos(\omega t+\phi') \overrightarrow{u_z}\)
>>> [IMAGE_ID: paste-d13b668f511ce3dc30a786d7467c62ae5210dd48.jpg] <<<
Qu'implique les conditions aux limites sur l'expression de \(\overrightarrow{E}\)?
R: La condition aux limites: 
\(E(x=0,t) = 0\) pour tout \(t\) implique: 
\(cos(\phi)=0\) soit \(\phi=-\frac{\pi}{2}\)par exemple
Donc \(\overrightarrow{E}=E_0 cos(\frac{\omega}{c} x-\frac{\pi}{2})+cos(\omega t+\phi') \overrightarrow{u_z}=E_0 sin(\frac{\omega}{c} x)+cos(\omega t+\phi') \overrightarrow{u_z}\)
La condition aux limites: 
\(E(x=a,t) = 0\) pour tout \(t\) implique: 
\(sin(\frac{\omega}{c} a)=0\) soit \(a=p \frac{\pi c}{\omega}\)
Et donc \(\frac{\omega}{c}=p\frac{\pi}{a}\) et \(\omega =p\frac{\pi c}{a}\)
Soit \(\overrightarrow{E}=E_0 sin(p\frac{\pi}{a}x)+cos(p\frac{\pi c}{a} t+\phi') \overrightarrow{u_z}\)
--------------------
Q: (O.M) le champ [$] \overrightarrow{E} [/$] dans une cavité s'exprime de la sorte : [$] \overrightarrow{E}  = E_0 sin(p \pi \frac{x}{a})cos(p \pi \frac{ct}{a}+ \Phi) \overrightarrow{u_z} [/$] avec p un entier naturel non nul.
Que siginfie p.
>>> [IMAGE_ID: paste-d13b668f511ce3dc30a786d7467c62ae5210dd48.jpg] <<<
R: A chaque valeur de p correspond un mode propre de vibration de la cavité de fréquence \(f_p =p \frac{c}{2a}\)et de longueur d'onde \(\lambda_p =\frac{2a}{p}\)
>>> [IMAGE_ID: paste-dee508805d69e2a4da947748c97fedcf4ae7a97d.jpg] <<<
--------------------
Q: (L.S) Localiser les ventres et les noeuds de \(\vec{E}\) et \(\vec{B}\) dans la représentaion suivante :
>>> [IMAGE_ID: bleh.PNG] 0i sin(kz) sin(wt) \(\vec{u}_{x}\)
R: >>> [IMAGE_ID: Ajouter des lignes dans le corps du texte.png] En rouge ventres de \(\vec{B}\) et noeuds de \(\vec{E}\)
En bleu ventres de \(\vec{E}\) et noeuds de \(\vec{B}\)
Noeuds de \(\vec{E}\) :
\(\vec{E}\) = \(\vec{0}\) ⇐⇒ 2 E0i sin(kz) sin(wt) = 0
⇐⇒ sin(kz) = 0 
⇐⇒ kz = nπ où n ∈ Z
⇐⇒ z = nπ/k où n ∈ Z
Ventres de \(\vec{E}\):
|sin(kz)| = 1 ⇐⇒ z = nπ/k + π/2k où n ∈ Z
--------------------
Q: (L.S) Cas de la réléxion sur un conducteur parfait d'une onde arrivant sous incidence normale.
On a \(\underline{\vec{E}_{i}}\) = E0i exp(j(kz-wt)) \(\vec{u}_{x}\) . Donner l'expression de \(\underline{\vec{E}_{r}}\) .
>>> [IMAGE_ID: paste-19049a52659cbc68fe9fc14d3fdba63fb6d0d43f.jpg] <<<
R: L'onde incidente se réfléchie sur elle même car alle arrive sous incidence normale. On cherche donc une onde réfléchie du type OPPM se propageant suivant \(- \overrightarrow{u_z}\): \(\underline{\vec{E}_{r}}=\underline{\overrightarrow{E_{0r}}} \ exp(j(-k_rz+\omega_r t))\)
Utilisation de la condition de continuité de la composante tangencielle de \(\vec{E}\) à l'interface (z=0):
La composante tangentielle de \(\vec{E}\) est nulle en \(z=0^+\)car \(\vec{E} =\vec {0}\) est toujours nulle dans un conducteur parfait.
La composante tangentielle de \(\vec{E}\) en 
\(z=0^-\)est: \({\vec{E}_{i}}(z=0,t)+{\vec{E}_{r}}(z=0,t)\)car\({\vec{E}_{i}}\) et 
\({\vec{E}_{r}}\) sont tangents à l'interface car ils se propgagent suivant \(\pm \overrightarrow{u_z}\) et sont transverses (propagation dans le vide).
Donc \(E_{0i}exp(-j\omega t) \overrightarrow{u_x}+\overrightarrow{E_{0r}} exp(-j\omega_r t)=0 \) pour tout \(t\).
Soit pour \(t=0\) ce qui implique \(\underline{\overrightarrow{E_{0r}}}=-E_{0i} \overrightarrow{u_x}\) puis \(E_{0i}exp(-j\omega t) \overrightarrow{u_x}- E_{0i}\overrightarrow{u_x} exp(-j\omega_r t)=0 \) valable pour tout \(t\). Ce qui implique \(\omega_r=\omega \) et donc \(k_r=k=\frac{\omega}{c}\).
Bilan: \(\underline{\overrightarrow{E_r}}=-E_{0i}exp(j(-kz-\omega t))\overrightarrow{u_x}\) et à l'interface: \(\overrightarrow{E_r}(z=0^- ,t)=-\overrightarrow{E_i}(z=0^-,t) \)
--------------------
Q: (L.S) 
Cas de la réléxion sur un conducteur parfait d'une onde arrivant sous incidence normale.
>>> [IMAGE_ID: paste-19049a52659cbc68fe9fc14d3fdba63fb6d0d43f.jpg] <<<
On a \(\underline{\overrightarrow{E_i}}=E_{0i}\ exp(j(kz-\omega t))\overrightarrow{u_x}\)  et \(\underline{\overrightarrow{E_r}}=-E_{0i}exp(j(-kz-\omega t))\overrightarrow{u_x}\).
 Déterminer  \(\vec{B}_{r}\) et \(\vec{B}_{i}\).
R: \(\underline{\vec{B}}\) = \(\frac{\underline{\vec{k}} ∧ \underline{\vec{E}}}{ω}\) on ramène cette formule aux réels, on obtient 
\(\underline{\vec{k}_{i}}=\vec{k}_{i}\) = k\(\vec{u}_{z}\) réel donc \(\overrightarrow{B_i}=\frac{{\vec{k_i}} ∧ {\vec{E_i}}}{ω}\)
\(\underline{\vec{k}_{r}}=\vec{k}_{r}\) =- k\(\vec{u}_{z}\) réel donc \(\overrightarrow{B_r}=\frac{{\vec{k_r}} ∧ {\vec{E_r}}}{ω}\)
Avec \(\vec{E}_{i}\) = E0i cos(kz-wt) \(\vec{u}_{x}\) et \(\vec{E}_{r}\) = - E0i cos(-kz-wt) \(\vec{u}_{x}\)
Après calcul on obtient
\(\vec{B}_{i}\) = \(\frac{kE_{0i}}{ω}\) cos(kz - wt) \(\vec{u}_{y}\)
\(\vec{B}_{r}\) = \(\frac{kE_{0i}}{ω}\) cos(-kz - wt) \(\vec{u}_{y}\)
--------------------
Q: le champ [$] \overrightarrow{E} [/$] dans une cavité s'exprime de la sorte : [$] \overrightarrow{E}(x,t)  = f(x) g(t)  \overrightarrow{u_z} [/$]
>>> [IMAGE_ID: paste-d13b668f511ce3dc30a786d7467c62ae5210dd48.jpg] <<<
Quelle est la nature cette onde? Pourquoi chercher une onde de ce type?
R: C'est une onde stationnaire (i.e. qui ne se propage pas).
On cherche une onde de ce type car l'onde qui existe dans la cavité peut être vu comme la superposition de deux OPPM qui se propagent en sens inverse et qui (comme nous l'avons vu dans le cas de la réflexion sur un conducteur parfait) donne lieu à une onde stationnaire.
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-51401275d15bbf37d7e168a56c64ee7635c23923.jpg] <<<
R: >>> [IMAGE_ID: paste-b1d8356e3e5a085afb59e2d76355ab2195bb7a80.jpg] <<<
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-8e1bfb99783c1fd684cd404ef15d5918094dfd01.jpg] <<<
Rappel: \(\Delta \overrightarrow{E} -µ_0 \gamma \ \frac{\partial \overrightarrow{E}}{\partial t}=\overrightarrow{0}\)
R: >>> [IMAGE_ID: paste-354ec4f941ffbcf92ed82f4736d592d5dc834cd0.jpg] <<<
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-273417994be21d50ab9ebc2db9a945b92cd6125d.jpg] <<<
R: >>> [IMAGE_ID: paste-09120748084d1ae45fcad52f4c680d5acf2fcae0.jpg] <<<
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-c9b6cc0e85a1d927c0f8736cd0a0e5f9c82b0c6e.jpg] <<<
R: >>> [IMAGE_ID: paste-712a3d4adda06ec3afbc29daa1e49fb999781d0c.jpg] <<<
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-b3926ac7c755977d76ea5d1125d4e30871c32236.jpg] <<<
Donner les caractéristiques de l'onde obtenue.
R: >>> [IMAGE_ID: paste-56a8e1c02a5f64fb84e5a49278d65bf0cae2dd88.jpg] <<<
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-e82daa53e473b6987630d3777e94cee8955f83b5.jpg] <<<
Les champ électrique et magnétique sont-ils en phase dans un conducteur ohmique?
R: >>> [IMAGE_ID: paste-ac3a319a2a2e4552da79e1368bf7fffa02f18347.jpg] >> [IMAGE_ID: paste-c565a9ffdc44c1ff22e571ff9f17419b38d4a93f.jpg] >> [IMAGE_ID: paste-d7d1a56baa7de129a328e8758b53bbd357ba7b7a.jpg] <<<
Donc \(\overrightarrow{E}\) et \(\overrightarrow{B}\) sont déphasés de \(\pi/4\) rad dans le conducteur ohmique.
--------------------
Q: (MAG)
Qu'est-ce qu'un conducteur parfait.
En déduire de manière qualitative des valeurs de E, B, j dans le conducteur parfait.
R: Un
conducteur parfait est défini comme un milieu ayant une conductivité \(\gamma \rightarrow +\infty\).
Remarque: Le conducteur parfait est un modèle qui permet de représenter le comportement des métaux en hautes fréquences, dans la limite des faibles épaisseurs de peau (ie δ faible devant la dimension caractéristique du conducteur).
Conducteur parfait:  \(\gamma \rightarrow +\infty\) => \(\delta \rightarrow 0\) donc l'épaisseur sur laquelle l'amplitude des champs est non nulle tend vers zéro. On en déduit que \(\overrightarrow{E}=\overrightarrow{0}\),\(\overrightarrow{B}=\overrightarrow{0}\) et \(\overrightarrow{j}=\gamma \overrightarrow{E}=\overrightarrow{0}\) dans le conducteur parfait.
--------------------
Q: Cas de la réléxion sur un conducteur parfait d'une onde arrivant sous incidence normale.
On a \(\underline{\overrightarrow{E_i}}=E_{0i}\ exp(j(kz-\omega t))\overrightarrow{u_x}\)  . Donner directement l'expression de \(\overrightarrow{E_r}(z=0^- ,t)\)  à l'interface conducteur/vide. 
>>> [IMAGE_ID: paste-19049a52659cbc68fe9fc14d3fdba63fb6d0d43f.jpg] <<<
R: \(\overrightarrow{E_r}(z=0^- ,t)=-\overrightarrow{E_i}(z=0^-,t)=-E_{0i}cos(-\omega t)\overrightarrow{u_x}\)
--------------------
Q: Cas de la réléxion sur un conducteur parfait d'une onde arrivant sous incidence normale.
>>> [IMAGE_ID: paste-19049a52659cbc68fe9fc14d3fdba63fb6d0d43f.jpg] 0i cos(kz-wt) \(\vec{u}_{x}\)
\(\vec{E}_{r}\) = - E0i cos(-kz-wt) \(\vec{u}_{x}\)
\(\vec{B}_{i}\) = \(\frac{kE_{0i}}{ω}\) cos(kz - wt) \(\vec{u}_{y}\)
\(\vec{B}_{r}\) = \(\frac{kE_{0i}}{ω}\) cos(-kz - wt) \(\vec{u}_{y}\)
Déterminer \(\overrightarrow{E}\) et \(\overrightarrow{B}\) (dans le vide).
Quelle est la nature de cette onde.
Que vaut la moyenne temporelle du vecteur de Poynting de cette onde?
R: Après calcul avec cos(-kz-wt)=cos(kz+wt) et cos(a+b)+cos(a-b)=2cos(a)cos(b) ainsi que cos(a-b)-cos(a+b)=2sin(a)sin(b), on obtient:
\(\overrightarrow{E}=2 E_{0i}sin(kz)sin(\omega t) \overrightarrow{u_x}\)
\(\overrightarrow{B}=2 \frac{k}{\omega} E_{0i}cos(kz)cos(\omega t) \overrightarrow{u_y}\)
Nature: onde stationnaire.
Donc la valeur moyenne temporelle du vecteur de Poynting de cette onde est nulle.
--------------------
Q: Que vaut la densité surfacique de charge à la surface d'un conducteur parfait?
R: Elle est nulle
--------------------
Q: Déterminer
l’expression de la densité de courants surfaciques à la surface du conducteur
parfait.
Rappel : \(\overrightarrow{B}=2 \frac{k}{\omega} E_{0i}cos(kz)cos(\omega t) \overrightarrow{u_y}\)
Donnée: relation de passage:
>>> [IMAGE_ID: clip_image002.gif] >> [IMAGE_ID: paste-19049a52659cbc68fe9fc14d3fdba63fb6d0d43f.jpg] <<<
R: \(\overrightarrow{B_{(2)}}=\vec{0}\), 
\(\overrightarrow{B_{(1)}}=2 \frac{k}{\omega} E_{0i}cos(\omega t) \overrightarrow{u_y}\)
\(\overrightarrow{n}_{(1->2)}=\vec{u_z}\)
Après calcul on obtient: \(\vec{j_s}=2 \frac{k}{\omega µ_0} E_{0i}cos(\omega t) \overrightarrow{u_x}\)
--------------------
Q: Quelle explication qualitative peut-on donner à l'existence d'un champ réfléchi lors de l'arrivée d'une onde électromagnétique sur un conducteur parfait?
R: L’onde
incidente met en mouvement les électrons à la surface du conducteur, cela engendre des courants à la surface du conducteur. Ces
courants, créés par le champ incident, sont à leur tour une source de champ
électromagnétique : ce sont eux qui sont à l’origine du champ réfléchi.
--------------------

==================================================
DECK : EM14
==================================================

Q: (LPB) Déterminer la relation de dispersion d'un plasma de conductivité complexe \(\underline{\gamma}=-i \frac {n_0\ e^2}{\omega \ m_e}\) où règne un champ\(\underline{\overrightarrow{E}}=\underline{\overrightarrow{E_0}} exp(i(\omega \ t-\underline{k}\ z))\).
Rappel équation de "propagation" du plasma: \(\Delta \underline{\overrightarrow{E}} - \frac{1}{c} \frac{\partial^2\underline{\overrightarrow{E}}}{\partial t^2} = \mu_0\underline{\gamma} \frac{\partial\underline{\overrightarrow{E}}}{\partial t}\)
R: \(k^2 (\omega) = {\frac{\omega^2 - \omega_p^2}{c^2}}\)    avec   \(\omega_p = \sqrt{\frac{n_0e^2}{\varepsilon_0m_e}}\)
où \(n_0\) est la densité d'électrons du plasma
\(m_e\) est la masse d'un électron
\(\omega_p\) est la pulsation plasma. 
Méthode: Remplacer \(\underline{\overrightarrow{E}}\) et \(\underline{\gamma}\) par leurs expressions dans l'équation de "propagation" du plasma: \(\Delta \underline{\overrightarrow{E}} - \frac{1}{c} \frac{\partial^2\underline{\overrightarrow{E}}}{\partial t^2} = \mu_0\underline{\gamma} \frac{\partial\underline{\overrightarrow{E}}}{\partial t}\)
--------------------
Q: (TS) Qu'est-ce qu'un plasma ? Donner un exemple.
R: Un plasma est un milieu gazeux partiellement ou totalement ionisé, globalement neutre, constitué d'ions, d'électrons et d'atomes ou molécules neutres.
Exemple : Ionosphère partiellement ionisée par les rayonnements UV et X du Soleil.
--------------------
Q: (LPB) Donner les équations de Maxwell dans le plasma et leurs conséquences.
R: div(\(\vec{E}\))=0 (car on considère une onde transverse électrique).
Conséquence: \(\rho\)=0 : le passage de l'onde ne perturbe pas la densité volumique de charge qui reste nulle
div(\(\vec{B}\))=0
Conséquence: l'onde est aussi transverse magétique
\(\vec{rot}\)(\(\vec{E}\))=-\(\frac{\partial \vec B}{\partial t}\)
Conséquence:  Relation de structure: \(\underline{\overrightarrow{B}} = \frac{\underline{\overrightarrow{k}}\wedge \underline{\overrightarrow{E}}}{\omega}\)
\(\vec{rot}\)(\(\vec{B}\))=\(\mu_0\)\(\vec j\)+\(\epsilon_0\)\(\mu_0\)\(\frac{\partial \vec E}{\partial t}\)avec \(\underline{\overrightarrow{j}}=\underline{\gamma }\underline{\overrightarrow{E}}\)
--------------------
Q: (TS) Appliquer le PFD à un électron (non relativiste) du plasma pour déterminer sa vitesse dans le cas d'une OPPM incidente  \(\underline {\vec E}=\underline {\vec E_0} exp(i(\omega \ t-\underline{k} \ z))\) arrivant sur le plasma sous incidence normale.
R: Bilan des forces :
•Force de Lorentz : \(\vec F\) = \(-e\)(\(\vec E\)  + \(\vec v\) \(\wedge\) \(\vec B\))
Le terme magnétique est négligeable devant le terme électrique car \(\lVert \vec B \rVert\) = \(\frac{\lVert \vec E \rVert}{v_\varphi}\) avec \(v_\varphi\) > \(c>v\)
•Poids : \(\vec P\) = \(m_e\)\(\vec g\) négligeable devant \(\vec F\) = -\(e\)\(\vec E\)
Le PFD donne :
\(m_e\)\(\frac{d\vec v}{dt}\) = -\(e\)\(\vec E\)
Nous sommes en RSF donc \(\underline {\vec v}=\underline {\vec v_0} exp(i\omega \ t)\):
En complexe \(m_e \frac{d\vec v}{dt}=-e \vec {E}\) devient \(i\omega\)\(m_e\underline {\vec v}\) = -\(e\)\(\underline{\vec E}\) 
Donc \(\underline {\vec v}\) = - \(\frac{e}{i\omega m_e}\)\(\underline{\vec E}\)
--------------------
Q: (TS) Exprimer le vecteur densité volumique de courant complexe \(\underline{\vec j}\) dans un plasma où règne un champ \(\underline{\vec E}\) et où les électrons sont présents avec une densité volumique \(n_0\)et ont une vitesse \(\underline {\vec v}\) = - \(\frac{e}{i\omega m_e}\)\(\underline{\vec E}\).
En déduire la conductivité complexe du plasma \(\underline{\gamma}\) par analogie avec la loi d'Ohm.
R: \(\vec j\) = \(n_0\) (-\(e\)) \(\vec v\)
Donc \(\underline{\vec j}\) = \(\frac{n_0  e²}{i\omega m_e}\)\(\underline{\vec E}\) = \(\underline{\gamma}\) \(\underline{\vec E}\)
et donc la conductivité complexe du plasma est : \(\underline{\gamma}=-i \frac{n_0 e^2}{\omega \ m_e}\)
--------------------
Q: (TS) Donner la puissance volumique moyenne cédée par le champ électromagnétique à un plasma de conductivité complexe \(\underline{\gamma}=-i \frac{n_0 e^2}{\omega \ m_e}\).
R: <\(\vec j.\vec E\)> = \(\frac{1}{2}\)\(Re(\underline{\vec j}.\underline{\vec E^*} )\) = \(\frac{1}{2}\)\(Re(\underline{\gamma}\underline{ \vec E}.\underline{\vec E^*} )\) = \(\frac{1}{2}\)\(Re(\underline{\gamma}|\underline{ \vec E}|^2)\) = 0 ( car \(\gamma\) est imaginaire pur)
--------------------
Q: (B.R.) Donner l'équation de propagation d'une O.P.P.M. dans un plasma.
R: Sachant que les éq de Maxwell dans le plasma s'écrivent:
div(\(\vec{E}\))=0 (car on considère une onde transverse)
div(\(\vec{B}\))=0
\(\vec{rot}\)(\(\vec{E}\))=-\(\frac{\partial \vec B}{\partial t}\)
\(\vec{rot}\)(\(\vec{B}\))=\(\mu_0\)\(\vec j\)+\(\epsilon_0\)\(\mu_0\)\(\frac{\partial \vec E}{\partial t}\)avec \(\underline{\overrightarrow{j}}=\underline{\gamma }\underline{\overrightarrow{E}}\)
Avec \(\overrightarrow{rot} (\overrightarrow{rot}\overrightarrow{E}) - \overrightarrow{grad}(div\overrightarrow{E})=-\Delta \overrightarrow{E}\), on obtient:
\(\Delta \underline{\overrightarrow{E}} - \frac{1}{c} \frac{\partial^2\underline{\overrightarrow{E}}}{\partial t^2} = \mu_0\underline{\gamma} \frac{\partial\underline{\overrightarrow{E}}}{\partial t}\)
--------------------
Q: (B.R.) Bilan 1/2 : dans un plasma dilué, les O.P.P.M. de \(\omega > \omega_p\)
R: se propagent sans atténuation dans le plasma.
à une vitesse\(v_{\varphi}=\frac{\omega }{k}=\frac{\omega }{\sqrt\frac{\omega^2 - \omega_p^ 2}{c^2 }}=\frac{c}{\sqrt{1-(\omega_p/\omega)^2 }}>c\)
\(v_{\varphi}\) dépend de \(\omega\) donc le milieu est dispersif
\(v_{\varphi} \rightarrow c \) lorsque \(\omega \rightarrow +\infty\)
\(||\overrightarrow{B}||=\frac{||\overrightarrow{E}||}{v_\varphi}\)
\(\overrightarrow {B}\) et \(\overrightarrow {E}\) sont en phase car \(k^2>0 \) donc \(k\) est réel.
--------------------
Q: (B.R.) Bilan 2/2 : Dans un plasma dilué, les O.P.P.M. de \(\omega < \omega_p\) :
R: ne peuvent pas se propager dans le plasma et sont totalement réfléchies par le plasma.
Elles donnent dans le plasma, une onde stationnaire d'amplitude décroissante appelée onde évanescente.
La distance caractéristique de pénétration de l'onde dans le plasma est \(\delta=\frac{c}{\sqrt{\omega_p^2 -\omega^2 }}\)qui dépend de \(\omega \).
\(\overrightarrow {B}\) et \(\overrightarrow {E}\) sont déphasés de \( \pi/2\) car 
\(\underline{\overrightarrow{B}} = \frac{\underline{\overrightarrow{k}}\wedge \underline{\overrightarrow{E}}}{\omega}\)et que\(k^2=\frac{\omega^2-\omega_p^2}{c^2}<0 \) donc \(\underline{\overrightarrow{k}}\) est imaginaire pur.
--------------------

==================================================
DECK : EM15
==================================================

Q: Définir le dipole oscillant.
R: >>> [IMAGE_ID: paste-eb2c6fd00e3b25d364dc61ba7017cf4dd65d9990.jpg] <<<
--------------------
Q: (F.H) Représenter l'indicatrice de rayonnement :
R: >>> [IMAGE_ID: paste-1c03ac8bb67ec008b75f62d57a7cc2c181de2dad.jpg] >> [IMAGE_ID: paste-4916eec46c60d4430b71a9afe98595aa130044bd.jpg] >> [IMAGE_ID: paste-63b4fdc36be49d8390c5adc4e721a62990b428b7.jpg] <<<
--------------------
Q: (F.H) Définir la zone de rayonnement d'un dipôle
R: >>> [IMAGE_ID: paste-39f01c3e9e7291d506d17d40165d29f2b130efc6.jpg] <<<
--------------------
Q: Donner la signification de l'approximation \(a \ll \lambda\)
R: Lorsqu'on fait l'approximation \(a\ll\lambda \) on néglige le retard lié à la propagation au sein même de la distribution. Cela revient à considérer qu’un point \(M\) éloigné du dipôle reçoit au même instant \(t \) des informations qui ont été émises en même temps à \(t -\frac{r}{c}\) (avec \(r= OM\) ) par les différents points sources de la distribution.
On peut aussi interpreter l'approximation comme ceci : les mouvements des charges sont non relativistes.
--------------------
Q: Donner la signification de l'approximation \(a\ll r\) .
R: On se situe dans l'approximation dipolaire.
--------------------
Q: (Y.Z) Dans la zone de rayonnement, quelle est la structure du champ électromagnétique ?
R: \[\text{ Dans la zone de rayonnement, le champ électromagnétique a localement la structure d'une OPP se propageant selon le vecteur }\vec{u}_r.\]
--------------------
Q: \[\text (Y.Z) {<}\vec{\pi}\text{>} \text{ est proportionnel à } \sin^2 \theta , \text {que peut on dire alors de l'émission dipolaire ?}\]
R: \[\text{Elle est anisotrope.}\]
>>> [IMAGE_ID: paste-18fee75962840b4f99af169dc2f01ec022847b92.jpg] <<<
--------------------
Q: (Y.Z.) Comment interpréter le fait que la puissance moyenne rayonnée à travers une sphère de centre O et de rayon R (\(<P_{ray}>\)) est indépendante de R?
R: >>> [IMAGE_ID: paste-c72c9182f9f87b963549dd7649a13753d092847d.jpg] <<<
--------------------

==================================================
DECK : EM 3, 4 et 5
==================================================

Q: (T.B.)Quelles sont les 5 étapes pour appliquer le théorème de Gauss ?
R: 1. Etude des invariances \(\rightarrow\)choix du système de coordonnées et variables dont dépend la norme de \(\vec{E}\)
Etude des symétries\(\rightarrow\)direction de\(\vec{E}\)
2. Choix de la surface de Gauss qui doit être fermée (essayer une surface telle que \(||\vec{E}||=cste\) et si besoin la complétée avec des surfaces orthogonales à  \(\vec{E}\)
3. Calcul du flux de \(\vec{E}\) à travers la surface de Gauss choisie (Une seule expression à cherchée)
4. Calcul de \(Q_{int}\) la charge située à l'intérieure de la surface de Gauss. (plusieurs cas peuvent être à considérer)
5. Appliquer le théorème de Gauss
--------------------
Q: Ylan / 
\[\text{Soit une charge ponctuelle } q, \text{ une surface fermée } S \text{ (Sphere de rayon } R, \text{ centrée sur la charge } q)\]\[\text{Déterminer le flux du champ } \vec{E} \text{ créé par la charge q à travers la surface fermée S}\]
R: \[\vec{E}(M \in S) = \frac{q}{4\pi\varepsilon_0R²}\vec{u_r}\]\[\phi = \unicode{x222F}_{\mathscr{S}} \vec{E } \cdot  \vec{dS}= \unicode{x222F}_{\mathscr{S}}  \frac{q}{4\pi\varepsilon_0R²}.\vec{u_r}. dS.\vec{u_r}=\frac{q}{4\pi\varepsilon_0R²}\iint_SdS=\frac{q}{\varepsilon_0}\]
--------------------
Q: Ylan/\(\text{Etablir l’expression du champ } \vec{E} \text{ créé en un point quelconque M de l’espace par une distribution linéique de charges de densité λ uniformément répartie le long d’un fil rectiligne infini.}\)
R: \[\text{On a : } \lambda = cste\]
\[\text{Etude des invariances : } ||\vec{E}||(r,\cancel\theta,\cancel{z})\]
\[\text{Etude des symétries :} \vec{E} \ \text{suivant}\  \vec{u_r}\]
\[\text{Bilan : } \vec{E}(M) = E(r)\vec{u_r}\]\[\text{On choisit comme surface de Gauss un cylindre de rayon r et de hauteur h fermée par deux disques}\]
>>> [IMAGE_ID: Capture d] \[\phi  =\unicode{x222F}_{\mathscr{S}_g} E(r) \vec{u_r } \cdot  dS\vec{u_r}= E(r)2\pi rh\]\(Q_{int} = \int_C\lambda dl = \lambda h \text{ car C est la portion du fil dans }S_g\)
\[\text{On applique maintenant le théorème de Gauss : }
2\pi rhE(r) = \frac{\lambda h}{ \varepsilon_0}\]
\[\text{Finalement, on obtient : } \vec{E} =\frac{\lambda }{2\pi r\varepsilon_0} \vec{u_r} \]
--------------------
Q: (Yuye) Comment définir le vecteur \(d\overrightarrow{S_M}\) ?
R: \(d\overrightarrow{S_M}\) est un vecteur \(\bot\) à la surface élémentaire \(dS_M\) centrée sur le point M.
>>> [IMAGE_ID: IMG_20231115_205047.jpg] 2e cas: Soit S est une surface fermée, alors \(d\overrightarrow{S_M}\) est orienté vers l'extérieur de la surface fermée.
--------------------
Q: (Yuye) Théorème de Gauss pour une surface fermée quelconque
R: Le théorème de Gauss s'écrit :
\[\Phi=\unicode{x222F}_{\mathscr{S}_g} \vec{E}(M)d\vec{S}_M=\frac{Q_{int}}{\varepsilon_0}\]où :
\(S_g\) est une surface fermée quelconque.
\(M\) est un point sur cette surface.
\(\Phi\) est le flux du champ électrosatique à travers cette surface.
\(\vec{E}(M)\) est le champ électrique en M.
\(d\vec{S}_M\) est le vecteur \(\bot\) à la surface élémentaire \(dS_M\) centrée sur M, dirigé vers l'extérieur de \({\mathscr{S}_g}\)
\(Q_{int}\) est la charge totale que contient \(S_g\).
\(\varepsilon_0\) est la permittivité.
--------------------
Q: (Yuye) Établir le champ créé par un cylindre à base circulaire de rayon de \(R\) et de hauteur considérée comme infini et uniformément chargé en volume avec une densité volumique de charge [$]\rho[/$].
R: >>> [IMAGE_ID: IMG_20231115_205047-9a9355bb58d3059ca8f62b4d7ffd956dab49ccab.jpg] 
- Symétries: \((M,\overrightarrow{u_z}, \overrightarrow{u_r})\) , \((M,\overrightarrow{u_r}, \overrightarrow{u_\theta})\)deux plans de symétries de la distribution de charges passant par M \(\Rightarrow\) \(\vec{E}\) suivant \(\overrightarrow{u_r}\) .
- Bilan: \(\vec{E}(M)=E_r(r)\overrightarrow{u_r}\) .
- Suface de Gauss: cylindre à base circulaire de rayon \(r\) et de hauteur \(h\) fermé (cf schéma): \(S_g = S_1 \cup S_2 \cup S_3\) . 
- Calcul de \(\Phi\) : \(\Phi=\unicode{x222F}_{\mathscr{S}_g} \vec{E}.d\vec{S} \)
    \(=\iint_{M\in{S_1}}\vec{E}(M)d\vec{S}+\iint_{M\in{S_2}}\vec{E}(M)d\vec{S}+\iint_{M\in{S_3}}\vec{E}(M)d\vec{S}\)
    \(=\iint_{M\in{S_1}}\vec{E}(M)d\vec{S}\)
    \(=\iint_{M\in{S_1}}E_r(r)\overrightarrow{u_r}.(dS\overrightarrow{u_r})\)
    \(=E_r(r)\iint_{M\in{S_1}}dS\)
    \(=E_r(r)2{\pi}rh\)
- Calcul de \(Q_{int}\) :1er cas: \(r < R\)
\(Q_{int}=\rho \pi r^2h\) 
2e cas: \(r > R\)
\(Q_{int}=\rho \pi R^2h\)
- Théorème de Gauss:1er cas: \(r < R\)
\(E_r(r)2{\pi}rh=\frac{\rho\pi{r^2}h}{\varepsilon_0}\) \(\Rightarrow\) \(E_r(r)=\frac{\rho r}{2\varepsilon_0}\) \(\Rightarrow\) \(E_r(r)=\frac{\rho r}{2\varepsilon_0}\overrightarrow{u_r}\)
2e cas: \(r > R\)
\(E_r(r)2{\pi}rh=\frac{\rho\pi{R^2}h}{\varepsilon_0}\)\(\Rightarrow\)\(E_r(r)=\frac{\rho R^2}{2\varepsilon_0 r}\)\(\Rightarrow E_r(r)=\frac{\rho R^2}{2\varepsilon_0 r}\overrightarrow{u_r}\)
- Évolution du champ électrique \(E_r(r) \) en fonction de\(r\) :
>>> [IMAGE_ID: IMG_20231115_221031.jpg] <<<
--------------------
Q: (Arthur) Quel est le champ électrostatique à l'extérieur (de l'espace interarmature) d'un condensateur plan?
R: \[\vec{E} = \vec{0}\]
--------------------
Q: (Manuel) Quelle est la norme du champ électrostatique entre les deux armatures d'un condensateur plan?
R: \[||\vec{E}|| = \frac{\sigma}{\varepsilon_{0}} = \frac{Q}{S\varepsilon_{0}}\]Avec :
•  \(\sigma = \frac{Q}{S}\) la valeur absolue de la densité surfacique de charge des armatures et \(Q\) la valeur absolue de leur charge.
•  \(\varepsilon_{0}\) la permittivité du vide
--------------------
Q: Victor / Déterminer l’expression du champ électrostatique créé en un point M par une distribution surfacique de
charges de densité σ uniformément réparties sur un plan infiniment étendu.
>>> [IMAGE_ID: plan-b84c87801652a62f616c58fbe3773f90809cb387.png] <<<
R: Invariances 
Invariance par translation selon x et selon y  \(=> \vec{E}(M) = E_x(\cancel{x},\cancel{y},z)\vec{u_x} + E_y(\cancel{x},\cancel{y},z)\vec{u_y} + E_z(\cancel{x},\cancel{y},z)\vec{u_z} \)
Symétries
Les plans orthogonaux au plan infini sont des plans de symétries de la distribution de charges 
\((M,\vec{u_x},\vec{u_z})\) et aussi le plan \((M,\vec{u_y},\vec{u_z})\)
donc \(=> E_y  = 0\) et \(E_x = 0 \)
Bilan
\(\vec{E}(M) = E_z(z)\vec{u_z}\)
Surface de Gauss 
On choisit un parallépipède à base carré de côté a et symétrique par rapport au plan chargé.
\(\mathscr{S}_g = \mathscr{S}_h \cup \mathscr{S}_b \cup \mathscr{S}_1 \cup \mathscr{S}_2 \cup \mathscr{S}_3 \cup \mathscr{S}_4\)
>>> [IMAGE_ID: plan-e73174d5f9184eeeafc3dd30474a2ce6087c52f2.png] Flux
\(\Phi = \unicode{x222F}_{\mathscr{S}_g} \vec{E } \cdot  \vec{dS}  = \iint\limits_{\mathscr{S}_h}\vec{E } \cdot  \vec{dS}  + \iint\limits_{\mathscr{S}_b}\vec{E } \cdot  \vec{dS}\)
Le flux de \(\vec{E}\) est nul à travers \(\mathscr{S}_1 , \mathscr{S}_2 , \mathscr{S}_3 \ et \  \mathscr{S}_4 \)
\(\Phi = \iint\limits_{\mathscr{S}_b}E_z(z)\vec{u_z} \cdot  dS\vec{u_z} +\iint\limits_{\mathscr{S}_b}E_z(-z)\vec{u_z} \cdot  (-dS\vec{u_z})\)
\( \Phi = 2\iint\limits_{\mathscr{S}_h}E_z(z)\cdot  dS = 2 E_z(z)\iint\limits_{\mathscr{S}_h}dS = 2 a² Ez(z)\)
Qint
\(Q_{int}  = \sigma a²\)
Théorème de Gauss
\(2a²Ez(z) = {\sigma a² \over \epsilon_0}\)
\(E_z(z) = {\sigma \over 2 \epsilon_0}\)
On trouve alors : 
\(\vec{E}(M) = {\sigma \over 2 \epsilon_0} \vec{u_z}\) pour z >0
\(\vec{E}(M) = -{\sigma \over 2 \epsilon_0} \vec{u_z}\) pour z >0
--------------------
Q: (Ilyass) On considère un condensateur cylindrique. Montrer que le champ électrostatique en un point quelconque est de la forme \(\vec{E}(M) = E(r)\vec{e_r}\).
R: On a une invariance par rotation autour de l'axe \(Oz\) et une invariance par translation selon \(\vec{u_z}\) donc la norme de \(\vec{E}\) ne dépend que de \(r\).
Puis les plans \((M,\vec{e_r},\vec{e_z})\) et \((M,\vec{e_r}, \vec{e_\theta})\) sont des plans de symétrie de la distribution de charge donc \(\vec{E}(M)\) est selon \(\vec{e_r}\).
Ainsi, \[\vec{E}(M) = E(r) \vec{e_r}\]
--------------------
Q: Victor / On s'intéresse ici au cas d'un condensateur constitué de deux armatures planes métalliques en
regard l'une de l'autre (aire de chaque armature : S), parallèles, distantes de e. Les armatures portent respectivement les densités surfaciques uniformes de charge −σ et +σ. On considèrera les dimensions des armatures beaucoup plus grandes que e, ce qui permet d'utiliser le modèle du condensateur plan illimité.
>>> [IMAGE_ID: Capture d’écran 2023-11-16 225353.jpg] <<<
Déterrminer le champ \(\vec{E}(M)\) .
R: On utilise le théorème de superposition : 
\(\vec{E}(M) = \vec{E_h(}M) + \vec{E_b(}M)\)
avec \(\vec{E_h(}M)\) le champ \(\vec{E}\) crée en M par le plan du haut 
avec \(\vec{E_b(}M)\) le champ \(\vec{E}\) crée en M par le plan du bas
D'après l'expression du champ créé par un plan infini uniformément chargé en surface : 
\(\vec{E_h(}M) = {\sigma \over 2\epsilon_0} \vec{u_z} \)   si \(z > e \) (1)  | \(\vec{E_b(}M) = -{\sigma \over 2\epsilon_0} \vec{u_z} \) si \(z > 0 \) (3)
\(\vec{E_h(}M) = -{\sigma \over 2\epsilon_0} \vec{u_z} \) si \(z < e \) (2)  | \(\vec{E_b(}M) = {\sigma \over 2\epsilon_0} \vec{u_z}\) si \(z < 0 \) (4) 
Alors :
\(z>e\)        : \(\vec{E}(M) = \vec{0} \)             en faisant \((1)+(3)\)
\(0<z<e\) : \(\vec{E}(M) = -{\sigma \over \epsilon_0} \vec{u_z}\)    en faisant \((2) + (3)\)
\(z<0\)        : \(\vec{E}(M) = \vec{0} \)             en faisant \((2) + (4)\)
--------------------
Q: Victor / On s'intéresse ici au cas d'un condensateur constitué de deux armatures planes métalliques en
regard l'une de l'autre (aire de chaque armature : S), parallèles, distantes de e. Les armatures portent respectivement les densités surfaciques uniformes de charge \(−σ\) et \(+σ\). On considèrera les dimensions des armatures beaucoup plus grandes que e, ce qui permet d'utiliser le modèle du condensateur plan illimité.
>>> [IMAGE_ID: Capture d’écran 2023-11-16 225353.jpg] <<<
Déterminer l’expression du potentiel électrostatique \(V(M)\) (on considèrera que \(V = 0\) sur l'armature de densité surfacique négative).
R: \(\vec{E}(M) = -\vec {grad}(V) = -\frac{\partial V}{\partial x}\vec{u_x} - \frac{\partial V}{\partial y}\vec{u_y} - \frac{\partial V}{\partial z}\vec{u_z}\)
pour \(z > e \) :
\(\vec{E} = \vec {0} =>\frac{\partial V}{\partial x}\ =\frac{\partial V}{\partial y} =\frac{\partial V}{\partial z}= 0  => V = cste\)    notons \(V = A\)
pour \(z<0\) :
\(\vec{E} = \vec{0} => V = cste \)      notons \(V = B\)
pour \(0<z<e \):
\(\vec{E} = -{\sigma \over \epsilon_0}\vec{u_z} \) donc \(\frac{\partial V}{\partial x} = \frac{\partial V}{\partial y}= 0 \) donc \(V(z) = {dV\over dz} = {\sigma \over \epsilon_0}\)
soit \(V(x) = {\sigma \over \epsilon_0} z + C \) \((cst)\)
Déterminons \(A,B,C\) sachant que \(V(z)\) est une fonction continue et que \(V(z=0) = 0\) :
\(V(z=0)={\sigma \over \epsilon_0} * 0 + C = C  = 0 \)   
\(V(z=0)=B=0\)       
\(V(z=e) = {\sigma \over \epsilon_0} e=A\)
 Alors \(A ={\sigma \over \epsilon_0} e\)
Bilan : 
pour   \(z<0 \)  : \(V =0\)
pour   \(0<z<e \)  : \(V = {\sigma \over \epsilon_0} z\)
pour   \(z>e\) : \(V(z) = {\sigma \over \epsilon_0}e \)
--------------------
Q: (Océane) Cette figure représente les lignes équipotentielles d'une distribution de charges contituée de deux charges ponctuelles. 
Donner l'allure des lignes de champs 
>>> [IMAGE_ID: im3.jpg] <<<
R: >>> [IMAGE_ID: im1.jpg] <<<
--------------------
Q: (Daouda) Démontrer l'égalité suivante dans un tube de champ: E1S1=E2S2 .
En déduire que dans une zone vide de charge, là où les lignes de champ se reserrent, le champ est plus intense.
R: >>> [IMAGE_ID: paste-c8c9585695c583cd76823e76b283fed4d0b34b2c.jpg] <<<
\(\Phi_1 =\iint_{S_1}  \vec E_1.\overrightarrow dS_1=-E_1 S_1\)
\(\Phi_2 =\iint_{S_2}  \vec E_2.\overrightarrow dS_2=E_2 S_2\)
\(\Phi_3 =\iint_{S_3}  \vec E_3.\overrightarrow dS_3=0\) car en tout point de \(S_3\): \(\vec E \perp \overrightarrow dS_3\) car il sagit de la surface latérale d'un tube de champ constituée de lignes en tout point tangentes au champ.
Donc \(\phi=\phi_1+\phi_2+\Phi_3=-E_1 S_1 + E_2 S_2 \)
De plus \( \unicode{x222F}_{{S}} \vec{E } \cdot  \vec{dS}  =0\) car il n'y a pas de charge à l'intérieur de S
Donc \(E_1 S_1 = E_2 S_2 \)
Et donc si \(S_1 <S_2\) alors \(E_1 >E_2\). Ce qui signifie que là où les lignes de champ se resserent, le champ est plus intense.
--------------------
Q: (Vincent) Ecrire le tableau des analogies entre gravitation et électrostatique.
R: >>> [IMAGE_ID: paste-8274af54e4ef8158c9147e47a8c1d6073f3a1f0a.jpg] <<<
--------------------

==================================================
DECK : M1
==================================================

Q: Yuye / Exemple de mouvement en translation
R: - Translation rectiligne: ascenseur, train sur une voie rectiligne par rapport au sol, ...
- Translation circulaire: nacelle d'une grande roue, ...
- Translation elliptique: référentiel géocentrique par rapport au référentiel héliocentrique, ...
--------------------
Q: Ylan / Définition d'un référentiel R' en translation par rapport à R
R: R' est en translation par rapport à R si les axes liés à R' gardent toujours une direction constante par rapport à ceux liés à R et on peut ensuite choisir les axes liés à R' parallèles à ceux liés à R par exemple: \[\vec{e_x}=\vec{e_{x'}} \text{ , }\vec{e_y}=\vec{e_{y'}} \text{ et }\vec{e_z}=\vec{e_{z'}}\]
--------------------
Q: (INC) Donner la loi de composition des accélérations dans le cas d'une translation de R' par rapport à R
R: \(\)On note O' n'importe quel point fixe dans R': \(\vec { a_{a}}= \vec{a_{r}}+\vec{a_{e}} \) avec \(\vec{a_{c}}=\vec 0\) , \(\vec{a_{e}}= {(\frac {d²\vec{OO'}} {dt²})}_{R}\) ; \(\vec{a_{r}}= {(\frac {d²\vec{O'M}} {dt²})}_{R'}\) et \(\vec{a_{a}}= {(\frac {d²\vec{OM}} {dt²})}_{R}\)
--------------------
Q: Yuye / Dérivée d'un vecteur dans \(\mathcal R\) dans le cas général
R: - Pour un scalaire a(t), quelque soit le mouvement de \(\mathcal R'\) par rapport à \(\mathcal R\):    \(\left(\frac{da}{dt}\right)_\mathcal R = \left(\frac{da}{dt}\right)_\mathcal {R'}\)
       On note alors \(\frac {da}{dt}\) ou \(\dot a\).
- Soient \(x(t)\), \(y(t)\), \(z(t)\) trois scalaires et \(\vec u\), \(\vec v\), \(\vec w\) trois vecteurs. Alors:    \(\left(\frac{d}{dt}(x(t)\vec u + y(t)\vec v + z(t)\vec w)\right)_\mathcal R\)
\(=\left(\frac{d}{dt}x(t)\vec u\right)_\mathcal R+\left(\frac{d}{dt}y(t)\vec v\right)_\mathcal R+\left(\frac{d}{dt}z(t)\vec w\right)_\mathcal R\)
\(=\frac{dx}{dt}\vec u + x(t)\left(\frac{d\vec u}{dt}\right)_\mathcal R + \frac{dy}{dt}\vec v + y(t)\left(\frac{d\vec v}{dt}\right)_\mathcal R + \frac{dz}{dt}\vec w + z(t)\left(\frac{d\vec w}{dt}\right)_\mathcal R\)
--------------------
Q: Ylan / Soit R' un référentiel en translation par rapport à R , \(\vec{u}=a\vec{e_{x'}}+b\vec{e_{y'}}+c\vec{e_{z'}}\), donner la relation qui lie \({( \frac{d\vec{u}}{dt} )}_R \ et \ {(\frac{d\vec{u}}{dt})}_{R'} \)
R: On a que \({( \frac{d\vec{u}}{dt} )}_R ={(\frac{d\vec{u}}{dt})}_{R'} = \dot{a}\vec{e_x}+\dot{b}\vec{e_y}+\dot{c}\vec{e_z}\)car lorsqu'on dérive les axes liés à R' dans R', leur dérivée est nulle et on a que \(\vec{e_x}=\vec{e_{x'}} \text{ , }\vec{e_y}=\vec{e_{y'}} \text{ et }\vec{e_z}=\vec{e_{z'}}\)
Cela signifie donc que lorsque R' est en translation par rapport à R, l'opération de dérivation d'un vecteur est insensible au référentiel.
--------------------
Q: Ylan /
>>> [IMAGE_ID: Capture d'écran 2023-09-24 144519.png] <<<
R: 1. Il est en mouvement de translation rectiligne uniforme 
2. C'est une droite
3. Il la voit se déplacer à une vitesse \(\vec{V}=v\vec e_x\)
4. Il voit la balle comme un point de vitesse nulle
5. \(\vec v_r= \vec 0\)
--------------------
Q: (Arthur) Donner la loi de composition des accélérations dans le cas d'une rotation uniforme de R' autour d'un axe fixe dans R' et dans R
R: [$]\vec{a_a} = \vec{a_r} +  \vec{a_e} +  \vec{a_c} ~[/$] avec :
[$]\\ \cdot~\vec{a_a}=(\frac{d\vec{v}_{M/R}}{dt})_{R} [/$] l'accélération absolue (de M dans R)
[$]\\ \cdot~\vec{a_r}= (\frac{d\vec{v}_{M/R'}}{dt})_{R'}[/$] l'accélération relative (de M dans R')
[$]\\ \cdot~\vec{a_e} [/$] l'accélération d'entrainement
[$]\vec{a_e} = \vec{\Omega}_{R'/R}
 \wedge(\vec{\Omega}_{R'/R} \wedge\vec{O'M})= - {\Omega ^2}_{R'/R} \ \overrightarrow{HM}[/$]
Avec H le projeté orthogonal de M sur l'axe de rotation et O' appartenant à l'axe de rotation.
[$]\cdot~\vec{a_c}[/$] l'accélération de Coriolis 
[$]\vec{a_c} = 2 ~\vec{\Omega}_{R'/R} \wedge\vec{v}_{M/R'}[/$]
--------------------
Q: (Manuel) Laquelle de ces deux figures représente un mouvement de rotation ?
>>> [IMAGE_ID: IMG_0804.JPG] <<<
R: La figure de droite
--------------------
Q: Victor /
Rappler la définition d'un référentiel.
R: Pour étuider le mouvement d'un corps, il est nécessaire de préciser par rapport à quoi nous raisonnons. On se fixe dans un référentiel d'étude. 
On étudie le mouvement de ce corps par rapport à un objet de référence (immobile dans le référentiel d'étude).
--------------------
Q: Victor /
Rappeler la définition d'un repère.
R: On a besoin d'un repère pour donner la position d'un point dans un référentiel.
Un repère est défini par un point (origine) et une base (qui en physique sera orthonormée directe).
--------------------
Q: Victor / 
Soit R et R' deux référentiels. Lorsque R' est en translation par rapport à R, que pouvez-vous dire des vitesses et des accélérations des points fixes de R' dans R? Prouvez-le.
R: Lorsque R' est en translation par rapport à R, tous les points fixes de R' ont à chaque instant même vitesse et même accélération dans R.
Preuve: 
Soit A,B 2 points fixes dans R'.
Comme A,B fixes dans R' , \(\vec{AB}\) est un vecteur constant dans R'
\(=> ({d \vec{AB} \over dt}) _{R'} =\vec{0}\)
Rappel: \(({d \vec{AB} \over dt})_R = ({d \vec{AB} \over dt})_{R'} \) car R' est en translation par rapport à R
Donc  \(({d \vec{AB} \over dt})_R = \vec{0} \) 
Or \(\vec{AB} = \vec{AO} +\vec{OB}\)
\(({d \vec{AB} \over dt})_R = ({d \vec{AO} \over dt})_R+ ({d \vec{OB} \over dt})_{R} = \vec{0}\)
\(({d \vec{OB} \over dt})_R = ({d \vec{OA} \over dt})_{R}\)
\(=> \vec{v_{B/R}} = \vec{v_{A/R}}\)
--------------------
Q: (Manuel) Exprimer \(\overrightarrow{e_{x'}}\) et \(\overrightarrow{e_{y'}}\) en fonction de \(\overrightarrow{e_{x}}, \overrightarrow{e_{y}}\) et \(\theta\). Puis, exprimer \(\left(\frac{\mbox{d}\overrightarrow{e_{x'}}}{\mbox{d}t}\right)_{R}\)et \(\left(\frac{\mbox{d}\overrightarrow{e_{y'}}}{\mbox{d}t}\right)_{R}\)dans ce cas là.
>>> [IMAGE_ID: IMG_EEFB83B295DE-1.jpeg] <<<
R: \[\begin{align}\overrightarrow{e_{x'}} &= \cos(\theta)\overrightarrow{e_{x}} + \sin(\theta)\overrightarrow{e_{y}} 
\\
\overrightarrow{e_{y'}}&= -\sin(\theta)\overrightarrow{e_{x}} + \cos(\theta)\overrightarrow{e_{y}} 
\\
\text{Ensuite}
\\
\left(\frac{\mbox{d}\overrightarrow{e_{x'}}}{\mbox{d}t}\right)_{R} &= \overrightarrow{\Omega}_{R'/R} \wedge \overrightarrow{e_{x'}}=\dot{\theta}   \overrightarrow{e_{y'}}
\\
\left(\frac{\mbox{d}\overrightarrow{e_{y'}}}{\mbox{d}t}\right)_{R} &= \overrightarrow{\Omega}_{R'/R} \wedge \overrightarrow{e_{y'}}=-\dot{\theta}   \overrightarrow{e_{x'}}
\end{align}\]
--------------------
Q: (INC) Citez la loi de composition des vitesses (avec un système M, un réferentiel absolu R et un réferentiel relatif R').
R: [latex]$\vec{v_a} = \vec{v_r} + \vec{v_e}$[/latex]
[latex]\scriptsize{Avec:\begin{itemize}
\item $\vec{v_a}=\overrightarrow {v_{M/R}} $ la vitesse absolue
\item $\vec{v_r}=\overrightarrow {v_{M/R'}}$ la vitesse relative
\item $\vec{v_e}$ la vitesse d'entraînement (vitesse absolue du point coïcident).\newline \end{itemize}[/latex]
Soit: [$]\overrightarrow {v_{M/R}} = \overrightarrow {v_{M/R'}} + \overrightarrow {v_e} [/$]
--------------------
Q: (INC) Pour un réferentiel R' en translation par rapport à un réferentiel R, citez la formule de la vitesse d'entraînement (vitesse absolue du point coïncident).
R: [latex]$\vec{v}_e = {(\frac{d\overrightarrow{OO'}} {dt})}_{R} = \vec{v}_{O'/R}$[/latex]
[latex]\scriptsize{Avec:\begin{itemize}
\item $O$ l'origine du repère de R
\item $O'$ un point fixe quelconque dans R'
\newline\end{itemize}
On dérive par rapport à R !!![/latex]
--------------------
Q: (INC) Pour un réferentiel R' en rotation autour d'un axe fixe dans R (et dans R') avec O et O' confondus et appartenant à l'axe de rotation, donner la vitesse d'entraînement (vitesse absolue du point coïncident).
R: [latex]$\vec{v_e} = \vec{\Omega}_{(R'/R)} \wedge \vec{O'M} = \vec{\Omega}_{(R'/R)} \wedge \vec{HM}$[/latex]
[latex]\scriptsize{Avec:\begin{itemize}
\item $\vec{v_e}$ la vitesse d'entraînement
\item $\vec{\Omega}_{(R'/R)}$ la vitesse angulaire de rotation de R' par rapport à R
\item $H$ le projeté orthogonal de M sur l'axe fixe.\newline\end{itemize} }[/latex]
--------------------

==================================================
DECK : M2
==================================================

Q: (Shems) Qu'est-ce qu'un referentiel galiléen?
R: Un référentiel galiléen est un référentiel dans lequel le principe d'inertie est vérifiée, à savoir que tout objet isolé ou pseudiisolé est soit immobile soit en mouvement rectiligne uniforme dans ce référentiel .
--------------------
Q: V.Iulian 
Tout référentiel [...] rapport à un référentiel galiléen est galiléen
R: en translation rectiligne et uniforme par--------------------
Q: V.Iulian
Si la translation de R' par rapport a R galiléen n’est pas rectiligne ou pas uniforme, R′[...]
R: n’est pas galiléen--------------------
Q: V.Iulian 
Un référentiel en rotation autour d’un axe fixe d’un référentiel galiléen [...]
R: n’est jamais galiléen.--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-9cd3560a5f9a5c4100721b04ab4c28ceaaaf93e5.jpg] <<<
R: >>> [IMAGE_ID: paste-5a57528bd9551b29f65139e8d4887065d643d4ac.jpg] <<<
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-d77f3722e5a6b97cce4097de2c62d12a8d197b00.jpg] <<<
R: >>> [IMAGE_ID: paste-94c2181742a47574197e38c01becf17fe5e14056.jpg] <<<
Avec O' un point fixe de R'
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-cb677b12d3a6508a44f3f9b492a67a4a71774fca.jpg] <<<
R: Cas de R' en translation par rapport à R: [$]\vec{f_{ic}}=\vec{0}[/$] donc [$]P(\vec{f_{ic}})=0[/$]
Cas de R' en rotation par rapport à R: [$]P(\vec{f_ic}) = (-2m \vec{\Omega}_{R'/R} \wedge \vec{v}_{M/R'} ). \vec{v}_{M/R'}=0[/$]
TPC: [$]\frac{dEc_{/R'}}{dt}=\sum_i P(\vec{F_i})/R'+P(\vec{f_{ie}})/R' [/$]
--------------------
Q: (MAG)Justifier que fic ne travaille pas et exprimer le TEC dans R' non gal.
R: [$]P(\vec{f_ic}) = 0[/$]
En effet lorsque R' est en translation par rapport à R [$]\vec{f_{ic}}=\vec{0}[/$] donc [$]P(\vec{f_{ic}})=0[/$]
et lorsque R' en rotation par rapport à R: [$]P(\vec{f_ic}) = (-2m \vec{\Omega}_{R'/R} \wedge \vec{v}_{M/R'} ). \vec{v}_{M/R'}=0[/$]
csq1: [$]W(\vec{f_{ic}})=\int P(\vec{f_{ic}}).dt=0[/$] i.e. [$]\vec{f_{ic}}[/$] ne travaille pas.
csq2: TEC dans R': [$]\Delta Ec_{/R'}=\sum_i W(\vec{F_i})/R'+W(\vec{f_{ie}})/R' [/$][/$]
--------------------
Q: (MAG) sur l'expl d'un manège avec sièges suspendus à des chaînes:
>>> [IMAGE_ID: paste-a933d76dcbeef4f62508fa32bd894eade0892cea.jpg] >> [IMAGE_ID: paste-162500c424b12166f0f9f7c8345e074e19a42672.jpg] <<<
R: >>> [IMAGE_ID: paste-7d986b294569fcc662beb25c0076c304bcdbb34e.jpg] <<<
--------------------
Q: (Orlan M) Exprimer la force d'inertie de Coriolis et la force d'inertie d'entrainement dans le cas d'une rotation de R' par rapport à R
R: [$]\vec{f_ic} = -2m \vec{\Omega}_{R'/R} \wedge \vec{v}_{M/R'} [/$]
et
[$]\vec{f_ie} = m \Omega^2 \overrightarrow{HM} [/$]
--------------------
Q: (INC) TEM dans R' repère non galiléen
R: [latex] Si $\vec{f_{ie}} $ est conservative, $\vec{f_{ie}}$ dérive d'une énergie potentielle $E_{p,f_{ie}}$ qui est contenue dans $E_m$ et qui est tq: $W(\vec{f_{ie}})=-\Delta E_{p,f_{ie}}$ \newline
Alors TEM: $\Delta Em_{/R'}=\sum_i W(\vec{F}_{iNC/R'}) $ \newline
Si $\vec{f}_{ie}$ est non conservative \newline
TEM: $\Delta Em_{/R'}=\sum_i W(\vec{F}_{iNC/R'})+W(\vec{f}_{ie/R'}) $[/latex]
--------------------
Q: (Orlan M) En partant du PFD écrit dans un référentiel galiléen R, établir l'expression du PFD dans un réfrentiel R' non galileen.
R: On part de la loi de composition des vitesses [$]m \vec{a}_{M/R} = m \vec{a}_{M/R'} + \vec{a_c} + \vec{a_e}  [/$]
de plus [$]m \vec{a}_{M/R} = \sum_i \vec{F_i} [/$]
En réarrangant les termes on a[$]m \vec{a}_{M/R'} = \sum_i \vec{F_i} -m \vec{a_c} - m \vec{a_e} [/$]
avec [$] - m \vec{a_e} [/$] qui est la force d'inertie d'entrainement et [$] - m \vec{a_c} [/$] qui est la force d'inertie de coriolis
--------------------
Q: (Orlan M) Exprimer [$] \vec{f_{ic}} [/$] et [$] \vec{f_{ie}} [/$] dans le cas d'une translation de R' par rapport à R
R: [$] \vec{f_{ic}} = \vec{0} [/$] et  [$] \vec{a_c} = \vec{0} [/$] dans ce cas
et
[$] \vec{f_{ie}} = -m(\frac{d^2 \vec{OO'}}{dt^2})_R [/$]
--------------------

==================================================
DECK : M3
==================================================

Q: (LPB) Comment est défini réellement le poids?
R: On def le poids d'un corps M de masse m de manière expérimentale: C'est la force opposée à la tension d'un fil au bout duquel est accroché le corps, ce dernier étant en équilibre dans le référentiel terrestre (\(\vec{P} = \vec{F_G}+\vec{f_{ie}}\) )
--------------------
Q: (LPB)Donner un exemple de manifestation du caractère non galiléen du référentiel géocentrique
R: L'existence de deux marées hautes et deux marées basses par jour sur Terre
>>> [IMAGE_ID: Capture d’écran 2023-10-07 161935.png] <<<
--------------------
Q: (TS) Donner des exemples qui mettent en évidence le caractère non galiléen du référentiel terrestre.
R: La déviation vers l'est,
Le sens de rotation des cyclones,
Le pendule de Foucault
--------------------
Q: (TS) Donner la vitesse angulaire de rotation du référentiel terrestre par rapport au référentiel géocentrique
R: \(\omega\)= \(\frac{2\pi}{24×3600}\)rad/s=7.3×10\(^{-5}\) rad/s
--------------------
Q: (TS) Donner la vitesse angulaire caractérisant la translation elliptique du référentiel géocentrique par rapport au référentiel de Copernic
R: \(\Omega\)=\(\frac{2\pi}{365×24×3600}\)rad/s=2.0×10\(^{-7}\) rad/s
--------------------
Q: (TS) Quelles forces fera apparaitre le PFD dans RT non galiléen
R: Le poids (qui contient [$] \overrightarrow {f_{ie}}[/$])
La force d'inertie de Cariolis [$] \overrightarrow {f_{ic}}[/$]
D'éventuelles autres forces
--------------------
Q: (B.K.)
>>> [IMAGE_ID: paste-1baa446cfecd2e569059adbdf3a1b56a2baa1f9d.jpg] <<<
Qu'est-ce qui est à l'origine de cette déviation vers l'Est?
Dans l'hémisphère Sud, cette déviation se ferait-elle également vers l'Est?
R: C'est la force d'inertie de Coriolis qui est responsable de cette déviation vers l'Est.
La déviation se ferait également vers l'Est dans l'hémisphère sud.
--------------------
Q: (enzo m) Contexte : Appli 3 Pendule de Foucault
On a les deux équations suivantes :
  \(\begin{cases} \ddot x +\omega_0^2 x \approx 2\Omega sin(\lambda)\dot y \space\space\space\space\space\space\space\space(1)\\  \ddot y +\omega_0^2 y \approx  -2\Omega sin(\lambda)\dot x\space\space\space\space\space(2)  \end{cases}\)
Quelle est la méthode afin d'obtenir une équation différentielle selon Z = x+jy où j2 = -1 ?
R: Méthode : il faut faire (1)+j(2) 
Ce qui nous donne \(\underline {\ddot Z} + \omega_0^2\underline{Z} = -2j\Omega sin(\lambda)\underline{\dot Z}\)
Après avoir résolu cette équation différentielle, on peut trouver x et y avec x=Re(Z) et y=Im(Z).
--------------------
Q: (enzo m) Contexte : Appli 3 Pendule de Foucault 
>>> [IMAGE_ID: paste-bbc6e2689d77ff19edb0d95f4b86e2d6c46539ea.jpg] 0 propre des oscillations ?
R: On a \(T = \left|\frac{2\pi}{\Omega sin\lambda}\right|\) <-- période de rotation du plan d'oscillation
et \(T = \frac{2\pi}{\omega_0}\) <-- période propre des oscillations.
--------------------
Q: >>> [IMAGE_ID: anki appli 2.png] Ziad SABRI
>>> [IMAGE_ID: paste-bf200bd2295b0763724fe5a90ee2df44dbf94cbc.jpg] <<<
Donner en fonction de \(\lambda \) l'expression de l'intensité de pesanteur (\(\vec{g}\)) en un point à la surface de la Terre situé à la latitude \(\lambda\). A quel endroit \(g\) est-elle max? min?
Référentiel terrestre: non gal
Référentiel géocentrique: gal
Vitesse angulaire de rotation de la Terre autour de l'axe des pôle:  \(\Omega\)
Masse et rayon de la Terre: \(m_T\) et \(R_T\)
R: Poids d'un objet de masse \(m\) à la surface de la Terre:
Donc \(\vec{g}=-G \frac{ m_T}{R_T^2} \vec{e_{z_{P}}}-\vec{a_e}=-G \frac{ m_T}{R_T^2} \vec{e_{z_{P}}}+\Omega^2\overrightarrow{HM}\)
Or \(HM=R_T \ cos(\lambda)\) et \(\frac {\overrightarrow{HM}}{HM}=cos(\lambda)\overrightarrow{e_{z_{P}}}-sin(\lambda)\overrightarrow{e_{y_{P}}}\)
Donc \(\vec{g}=-G \frac{ m_T}{R_T^2} \vec{e_{z_{P}}}+\Omega^2 \ R_T \ cos(\lambda) (cos(\lambda)\overrightarrow{e_{z_{P}}}-sin(\lambda)\overrightarrow{e_{y_{P}}})\)
\(g\) est max au pôle sud et min à l'équateur.
--------------------
Q: (B.K.) Quelle force d'inertie permet d'expliquer l'existence de deux marées océaniques hautes par jour sur Terre?
R: C'est la force d'inertie d'entrainement due au fait que le référentiel géocentrique (en translation elliptique dans le réf. Héliocentrique) est considéré comme non galiléen (en considérant le réf. Héliocentrique galiléen).
--------------------
Q: (B.K.) Quelle force d'inertie permet d'expliquer le sens de rotation des cyclones?
Dans quel sens tourne les cyclones dans l'hémisphère Nord? Sud? Expliquer par un schéma.
R: C'est la force d'inertie de Coriolis (en considérant le ref. Terrestre non galiléen et le réf géocentrique galiléen).
Dans le Nord: rotation dans le sens trigo.
Dans le Sud: Rotation dans le sens horaire
>>> [IMAGE_ID: paste-71cc5358ce5c51ce02d2e1d9d2e63300dba80598.jpg] <<<
--------------------

==================================================
DECK : M4
==================================================

Q: \[(F.H)~Valeur~de~\vec{v}_gs_2/s_1~dans~le~cas~de~non~glissement (i.e. cas~de~l'adhérence) :\]
R: \[On~a :\vec{v}_gs_2/s_1 = \vec{0}\]
--------------------
Q: (FH) Loi de Coulomb dans le cas d'un non-glissement :
R: \[\|\vec{T}\| \le fs \|\vec{N}\|~avec~fs~le~coefficient~de~frottement ~statique \]
--------------------
Q: (FH) Loi de Coulomb pour le cas d'un glissement :
R: \[\|\vec{T}\| = fd \|\vec{N}\|~avec~fd~le~coefficient~de~frottement ~dynamique\]
--------------------
Q: (Yannick) Les forces de frottement sont elles conservatives ?
R: Non elles ne sont en général pas conservatives.
--------------------
Q: (Yannick) Quel peut-être le signe de la puissance d'une force de contact ?
R: [latex]Généralement négatif : cas où la réaction tangentielle / force de frottement est une force de freinage \newline
Parfois positif : cas où la force de frottement est motrice. Par expl cas d'un solide S2 fixe par rapport à un solide S1 (adhérence) et que S1, mis en mouvement, met S2 en mouvement.[/latex]
>>> [IMAGE_ID: paste-4636b8c49be9f7c06e3c704079ee7d896489694e.jpg] <<<
--------------------
Q: [latex] Que dire sur la puissance totale ( $P(\vec{R}_{1\rightarrow 2})_{/R}+P(\vec{R}_{2\rightarrow 1})_{/R}$) des forces mises en jeu dans un contact entre 2 solides ? [/latex]
R: [latex]
$P(\vec{R}_{1\rightarrow 2})_{/R}+P(\vec{R}_{2\rightarrow 1})_{/R})=\vec{T}_{1 \rightarrow 2} . \vec{v_g}_{2/1} \leq 0$ \newline
Elle est nulle s'il y a adhérence des 2 solides ($\vec{v_g}_{2/1} =0$) ou si le glissement se fait sans frottement ($\vec{T}_{1 \rightarrow 2}=0$).\newline
Elle est négative s'il y a glissement avec frottement.[/latex]
--------------------
Q: (Yannick) On modélise l'action de contact de S1 sur S2 par une force [$]\overrightarrow {R_{1->2}}[/$] appliqué en un point I de la région de contact, comment se décompose [$]\overrightarrow {R_{1->2}}[/$] ?
R: [$]\overrightarrow {R_{1->2}}[/$] se décompose en :
- Une composante orthogonale au plan tangent π commun aux 2 solides, dirigée de S1 vers S2, notée [$]\overrightarrow {N}[/$] et appelée réaction normale.
- Une composante appartenant au plan π, notée [$]\overrightarrow {T}[/$] et appelée réaction tangentielle ou force de frottement. En absence de frottements:  [$]\overrightarrow {T}=\overrightarrow{0}[/$]
--------------------
Q: (INC) Qu’est-ce que la vitesse de glissement ?
R: La vitesse de glissement de \(S_2 / S_1 \) s'écrit : \(\vec{v_g}_{S_2/S_1} = \vec{v_{I_2}} - \vec{v_{I_1}} \)
(avec \(I\) le point de contact entre les deux solides et \(I_1 \) (resp. \(I_2\)) le point de \(S_1\) (resp. \(S_2\)) confondu avec \(I \) a l'instant \(t\) )
Rem: Elle ne dépend par du référentiel du moment que \(\vec{v_{I_2}}\) et \( \vec{v_{I_1}}\)sont exprimés dans le même référentiel.
--------------------
Q: (Ali H.)
>>> [IMAGE_ID: paste-15e45e099744e7f013048018acad29cb70089200.jpg] <<<
R: >>> [IMAGE_ID: paste-df8555d46ddffcf14f908e9ecc0196305be18f9e.jpg] >> [IMAGE_ID: paste-f7648fa01530ee8a53f75a02aa6d59e2d1197dcc.jpg] <<<
--------------------
Q: (Ali H.)
>>> [IMAGE_ID: paste-82a4bf897e6c97251d4e1891621f532604b33fce.jpg] <<<
R: >>> [IMAGE_ID: paste-2381b673878f19aca319c7abd804505aff2d4a55.jpg] <<<
--------------------

==================================================
DECK : O1
==================================================

Q: (O.M) Quel est le domaine des longueurs d'onde du visible ?
R: Le domaine des longueurs d'onde du visible est entre 400nm (lumière bleu) et 800nm(lumière rouge).
En dessous on a les Ultra Violet
Et au dessus les infrarouges
--------------------
Q: (O.M) Rappeler les loi de Snell-Descartes de la réfraction.
>>> [IMAGE_ID: paste-c7bf83916ccaa57839ec7f7820070209eeb04b43.png] <<<
R: - Le rayon réfracté est dans le plan d'incidence (plan formé par le rayon lumineux incident et la normale au dioptre)
- [$] n_1 \sin (i_1) = n_2 \sin (n_2) [/$]
--------------------
Q: (O.M) Définir les notions de surface d'ondes, onde sphérique et onde plane.
R: Une surface d'onde est l'ensemble des points M tels que: (SM)=cste
avec S est une source ponctuelle.
Une onde sphérique est une onde dont les surfaces d'onde sont des sphères.
Une onde plane est une onde dont les surfaces d'onde sont des plans parallèles entre eux.
--------------------
Q: (O.M) Enoncer le théorème de Malus
R: Les rayons lumineux sont orthogonaux aux surfaces d'ondes
--------------------
Q: (O.M)Comment créer une onde plane à l'aide d'une lentille convergente?
R: Il faut placer une source ponctuelle dans le plan focal objet de la lentille.
>>> [IMAGE_ID: paste-48a3478626e3577356a1c4dabb89e948360635df.jpg] <<<
--------------------
Q: (O.M)
>>> [IMAGE_ID: paste-6880d97333b2c73cc8f6a00f175f3edd591b0df6.jpg] <<<
R: >>> [IMAGE_ID: paste-b2c57ac01cf3c781af9cafb014b0e736004e73b1.jpg] <<<
avec le schema ci contre on a le chemin de la lumière en vert qui se reflechi sur le premier dioptre (AIr/verre) et en bleu le second qui se féfléchit sur le deuxième dioptre (Verre/air).
Le déphasage est dû au fait que le chemin bleu est plus long que le chemin vert. La différence de chemin optique (i.e. la différence de marche) est donc: \(\delta=2\ n_v \ e\) ("chemin bleu moins chemin vert")
A cette différence de marche correspond le déphasage \(\Delta \phi=\frac{2\pi}{\lambda_0} \ \delta=\frac{2\pi}{\lambda_0} \ 2 \ n_v \ e\) ("chemin vert moins chemin bleu" car "le vert est en avance sur le bleu")
A ce déphasage s'ajoute le déphasage dû à la réflexion sur le dioptre Air/Verre. Le déphasage devient
\(\Delta \phi'=\frac{2\pi}{\lambda_0} \ 2 \ n_v \ e +\pi\) ("chemin vert moins chemin bleu")
A ce déphasage correspond la différence de marche:
\(\delta'=\frac{\lambda_0}{2\pi}\Delta\Phi'=2 \ n_v \ e + \frac{\lambda_0}{2\pi}\pi=2 \ n_v \ e +\frac{\lambda_0}{2}\)("chemin optique bleu moins chemin optique vert") remarque: un déphasage de \(\pi \) correspond à une différence de marche de \(\frac{\lambda_0}{2}\).
--------------------
Q: (L.S)
Formule du chemin optique (SM) dans le cas particulier d'un milieu homogène d'indice n.
R: Cas particulier d'un milieu homogène d'indice n:
n=cste et la lumière se propage en ligne droite donc (SM) = n x SM 
avec SM: la distance entre S et M (i.e: la longueur du segment [SM])
--------------------
Q: (O.M)
>>> [IMAGE_ID: paste-0f0c81aa98bc40398c2ebf1c0d23fc8fc47630bb.jpg] <<<
R: 1) nous avons des plans d'angles différents avant et apres la lentille tous les deux etant perpendiculaires aux rayons lumineux
>>> [IMAGE_ID: paste-908f7e57933ff5d07f43f39f477bd0caa338c168.jpg] >> [IMAGE_ID: paste-8a11fcee90ee06a971c4f301f24c39bfe95fe339.jpg] <<<
Nous savons que les chemins optiques (HB) et (AJ) sont égaux.
En effet: \(\varphi(B)=\varphi(H)-\frac{2\pi}{\lambda_0}(HB)\) et \(\varphi(J)=\varphi(A)-\frac{2\pi}{\lambda_0}(AJ)\)
Avec \(\varphi(H)=\varphi(A)\) et \(\varphi(B)=\varphi(J)\) car A et H sont sur la même surface d'onde de même que J et B sont sur la même surface d'onde.
On en déduit bien que (HB)=(AJ)
Or (HB)=n HB et (AJ)=n' AJ (car deux milieux homgènes)
De plus l'angle formé par HAB est \(\theta\) donc \(HB=AB \sin \theta\) et de même l'angle formé par JBA est \(\theta'\)donc \(AJ=AB \sin \theta'\)
Bilan: \((HB)=(AJ)\) implique \(n\ AB\ sin\theta =n'\ AB\ sin\theta'\) soit 
\(n\  sin\theta =n'\  sin\theta'\)
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-238a7158d0fbb60d39022fd285b56f918dd29e0d.jpg] <<<
R: >>> [IMAGE_ID: paste-1a5c9e434fc7fba5cee47a88b0c5589fdd2023f6.jpg] <<<
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-1fbffd340ad708be06cde27faac42463c5d01824.jpg] <<<
R: >>> [IMAGE_ID: paste-f34dd382a3eb1540065c45ad246b2e942af5a970.jpg] <<<
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-abf29704c23478669ebd5039478a6523c111b79c.jpg] <<<
Que vaut l'indice du vide?
Que peut-on dire de l'indice d'un milieu homogène autre que le vide?
R: \(n(P)=\frac{c}{v(P)} \) avec \(c=3.10^8 m.s^{-1}\) la vitesse de la lumière dans le vide et \(v(P)\) la vitesse de la lumière en un point P où l'indice optique est \(n(P)\).
L'indice optique du vide vaut 1.
Pour un milieu homogène qui n'est pas le vide, l'indice optique est constant et >1
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-4a3b3502893e774b283a2676369d0093cb0e0f86.jpg] <<<
Exprimer le temps mis par la lumière pour aller de S à M noté \(t_{SM} \)
En déduire l'expression du chemin optique (SM).
Donner sa signification physique.
R: >>> [IMAGE_ID: paste-4f568a91e39081548c0270f83ae524311324eb5a.jpg] SM que la lumière à mis pour aller de S à M dans un milieu qui a priori n'est pas le vide.
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-6873a781cb1192efdf16baf4eec431a40cb2af19.jpg] <<<
R: D'après le principe du retour inverse de la lumière. S'il y avait une source ponctuelle en M, la lumière suivrait le même trajet mais en sens inverse.Alors d'après le théorème de Malus, les points A, A' et A'' seraient sur la même surface d'onde. ALors par définition d'une surface d'onde on aurait (MA)=(MA')=(MA").
Conclusion: (AM)=A'M)=(A"M)
>>> [IMAGE_ID: paste-9faa5012850c6ad9639e25a0613e7b83e2dc8127.jpg] <<<
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-8fd2d6224be55d861eaf41b65cd9d79c32b0f366.jpg] <<<
R: Selon les x croissants pour 1 et 4.
Selon les x décroissants pour 2 et 3.
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-390cb59c26a1294587ee88e68cae62913c043f95.jpg] <<<
R: >>> [IMAGE_ID: paste-ec7e86b684f990ff7afa6167e99cfbfdfaffdee8.jpg] <<<
--------------------
Q: (L.S) __Exercice 6.1__
Sur le schéma ci-dessous, construire la position du point A′ image de A par la lentille. Tracer ensuite l’allure des surfaces d’onde, en supposant que le point A agit comme une source ponctuelle.
>>> [IMAGE_ID: 6.1.PNG] <<<
R: >>> [IMAGE_ID: paste-73a055b197e1d292b6d4db07cc3d139ebebc4320.jpg] <<<
--------------------
Q: (L.S) __Exercice 6.2__
Sur le schéma ci-dessous, construire la position du point A′ image de A par la lentille. Tracer ensuite l’allure des surfaces d’onde, en supposant que le point A agit comme une source ponctuelle.
>>> [IMAGE_ID: 6.2.PNG] <<<
R: >>> [IMAGE_ID: paste-f063776cbb7c0576250e5ab8e21e2b6f3d706359.jpg] <<<
--------------------
Q: (L.S) __Exercice 6.3__
Sur le schéma ci-dessous, construire la position du point A′ image de A par la lentille. Tracer ensuite l’allure des surfaces d’onde, en supposant que le point A agit comme une source ponctuelle.
>>> [IMAGE_ID: 6.3.PNG] <<<
R: >>> [IMAGE_ID: paste-3574f56ff02dc7444f84ead0c013a0c3870f9199.jpg] <<<
--------------------
Q: (L.S) __Exercice 6.4__
Sur le schéma ci-dessous, construire la position du point A′ image de A par la lentille. Tracer ensuite l’allure des surfaces d’onde, en supposant que le point A agit comme une source ponctuelle monochromatique.
>>> [IMAGE_ID: 6.4.PNG] <<<
R: >>> [IMAGE_ID: paste-1f7e79eb3eae3a9f6fa526e2156258251e313b9b.jpg] <<<
--------------------
Q: (S.D.S) Une onde plane arrive à incidence normale sur une lame de verre :
>>> [IMAGE_ID: paste-61357fd753bc69fb69b279a50ab605b256f24f74.jpg]
R: D'après la loi de Snell-Descartes (\(n_1 \sin i_1 =n_2 \sin i_2\)), on en déduit que les rayons incidents ne sont pas déviés (car \(i_1=0\) donc \(i_2=0\) cas incidence normale)
Les surfaces d'ondes sont perpendiculaires aux rayons lumineux, mais après la lame, celle des rayons passant par le défaut de la lame est plus proche que celle des autres rayons. Car l'épaiseur \(\Delta e\) induit un retard de phase et qu'une surface d'onde est une surface équiphase. 
>>> [IMAGE_ID: WhatsApp Image 2023-12-10 à 15.48.49_ce6bc42e.jpg]
--------------------
Q: (S.D.S) 
Déphasage entre A et A' ? entre B et B' ? (en fonction de \(e\), \(\Delta e\), \(n_v\)(indice de la lame de verre en gris)  et \(x = AA' = BB'\))
Différence de phase entre A' et B' ?
>>> [IMAGE_ID: paste-59542684149954daa7ee8ef603ab41b7d315ff58.jpg]
R: Déphasage entre A et A' :\(\varphi(A')-\varphi(A)=\frac{-2\pi}{\lambda_0}(AA')=\frac{-2\pi}{\lambda_0}n_VAA_i-\frac{2\pi}{\lambda_0}n_{air}A_iA'\)
  \(\varphi(A')-\varphi(A)=\frac{-2\pi}{\lambda_0}(n_V \ e+n_{air}(x-e))\)
Déphasage entre B et B' :
\(\varphi(B')-\varphi(B)=\frac{-2\pi}{\lambda_0}(BB')=\frac{-2\pi}{\lambda_0}n_VBB_i-\frac{2\pi}{\lambda_0}n_{air}B_iB'\)
\(\varphi(B')-\varphi(B)=\frac{-2\pi}{\lambda_0}(n_V(e+\Delta e)+n_{air}(x-e-\Delta e))\)
Différence de phase entre A' et B' ?
A et B sont sur la même surface d'onde donc 
\(\varphi(A)=\varphi(B)\). Ainsi, après simplification des termes, on obtient :
\(\varphi(B')-\varphi(A')=\frac{-2\pi}{\lambda_0}\Delta e(n_V-n_{air})\)
--------------------

==================================================
DECK : O2
==================================================

Q: (B.R.) Ordre de grandeur de la période temporelle d'une onde lumineuse ?
R: [latex]
$10^{-15}\text{s}$
[/latex]
--------------------
Q: (B.R.) Temps de réponse des detecteurs de lumière ?
R: [latex]
\begin{itemize}
\item oeil : $\tau_r \approx 0,1\text{s}$
\item capteur CCD : $\tau_r \approx 10^{-4}\text{s}$
\end{itemize}
[/latex]
--------------------
Q: (T.S) Décrire le modèle des trains d'onde
R: Une onde lumineuse émise par une source de fréquence \(f_0\) (respectivement \(\lambda_0\) ou \(\omega_0\)) et de largeur \(\Delta f\) (respectivement \(\Delta \lambda\) ou \(\Delta \omega\)) en S est modélisée par une succession de trains d'onde, tous de même durée \(\tau_c \approx \frac{1}{\Delta f} \)pendant lesquels l'onde est parfaitement sinusoïdale de fréquence \(f_0\).
Soit \(a(S,t)=A cos(\omega_0 t+\varphi(S))\) 
Avec \(A\) et \(\omega_0\) des constantes.
Et \(\varphi(S)\) qui reste constant pendant une durée \(\tau_c\) puis l'émission est suspendue et reprend avec une phase 
\(\varphi(S)\)différente et aléatoire.
--------------------
Q: (T.S) un signal dont le spectre a une largeur ∆f va être limité dans le temps d'une durée ∆t telle que :
R: ∆f×∆t\(\approx\)1
--------------------
Q: (T.S) Définir la longueur de cohérence temporelle d'une source, et sa relation avec \(\delta\)(M) pour qu'il y ait des interférences
R: Longeur de cohérence temporelle: \(L_c=c\ \tau_c\)
Pour pouvoir observer des interférences, il faut que:\(\delta(M)<L_c\)
--------------------
Q: (T.S) Citer les ordres de grandeur de Lc dans les cas suivants :
-Lumière blanche
-Lampe à vapeur de mercure
-Laser He-Ne
R: -Lumière blanche\(L_c\approx 0,9\ µm\)
-Lampe à vapeur de mercure\(L_c\approx 0,3 \ mm\)
-Laser He-Ne: \(L_c\approx 400 \ m\)
--------------------
Q: (T.S) Citer les 2 types de systèmes interférentiels + des exemples de ces systèmes
R: Systèmes par division de front d'onde. Exemple: Trous d'Young.
Systèmes par division d'amplitude. Exemple: Interféromètre de Michelson éclairé par une source étendue
--------------------
Q: (LPB) Quelle valeurs particulières prennent l'ordre d'interférences, le déphasage et la différence de marche en M, si M est situé sur une frange brillante ? sur une frange sombre?
R: Sur une frange brillante: l'ordre d'interférence est un entier relatif, le déphasage est un multiple de \(2\pi \) et la différence de marche est un multiple de \(\lambda_0\)
Sur une frange sombre: l'ordre d'interférence \(p(M)=\frac{1}{2}+q\) , le déphasage \(\Phi=\pi +2q\pi\) et la différence de marche \(\delta(M)=\frac{\lambda_0}{2} + q\lambda_0\) avec \(q\in \mathbf{Z}\)
--------------------
Q: (LPB) Définition du contraste?
R: On définit le contraste par la relation \(C = \frac{I_{max} - I_{min}}{I_{max} + I_{min}}\) où \(I_{max}\) et \(I_{min}\) représentent l’intensité lumineuse maximale et minimale sur zone d’observation.
--------------------
Q: (LPB) Formule de Fresnel? Définir le déphasage, l'ordre d'interférence et la différence de marche.
R: >>> [IMAGE_ID: Capture d] <<<
--------------------
Q: Z.S   [latex]{\scriptsize Déterminer\:l'ordre\:de\:grandeur\:de\:$\tau_c$ (durée d'un train d'onde)\:pour\:la\:raie\:verte\:de\:mercure\:(de\:longueur\:d'onde\:moyenne\:$\lambda_0 = 546 nm$\: et de largeur\:$\Delta \lambda=1 nm$)\\.}[/latex]
R: [latex]
{\scriptsize 
Faire\:le\:lien\:entre\:$\Delta \lambda$ et $\tau_c$ 
\\ \\ $\rightarrow$} 
{\tiny 
$f = \cfrac{c}{\lambda}$
} \\ \\
{\scriptsize 
$\rightarrow$ Exprimer\:la\:variation\:de\:f\:quand\:$\lambda$\:varie\:de\:$\Delta \lambda$
} \\ \\
{\tiny 
$\hspace*{6mm}$ $\cfrac{df}{d\lambda} = -\cfrac{c}{\lambda^2}$ \\ 
$\hspace*{4mm}$ $\Rightarrow df = -\cfrac{c}{\lambda^2}\, d\lambda$ \\
$\hspace*{4mm}$ $\Rightarrow \Delta f = -\cfrac{c}{\lambda^2}\, \Delta\lambda$ \\
$\hspace*{4mm}$ $\Rightarrow \tau_c \approx \cfrac{1}{\cfrac{c}{\lambda^2} \, \Delta\lambda} \approx \cfrac{\lambda^2}{c \, \Delta\lambda}$  \; car \;
$\tau_c \approx \cfrac{1}{\Delta f}$ \\ \\ \\
}
{\scriptsize 
A.N : $\cfrac{(546,1 \times 10^{-9})^{-2}}{3 \times 10^{8-9}} \approx 10^{-13}$ \\ \\
$\hspace*{7.5mm}$ $\tau_c \approx 10^{-12}$
[/latex]
--------------------
Q: Critère de cohérence: Quand est-ce que deux ondes sont susceptibles d'interférer en un point M de l'espace? Quelle est alors l'expression de l'intensité lumineuse en M? 
Quelle est l'expression de l'intensité lumineuse en un point M de l'espace où deux ondes se superposent sans interférer?
R: Pour que deux ondes
puissent interférer en un point M où elles se superposent, il faut
qu’elles soient issues d’une même source par division de l’onde,
qu’elles aient même longueur d’onde et que la différence de marche
en M , notée \(\delta(M)\) soit inférieure à la longueur de cohérence
temporelle \(L_c\) de la source.
Alors \(I(M)=I_1(M)+I_2(M)+2\sqrt{I_2 I_2}\ cos(\frac{2\pi}{\lambda_0}\delta(M)) \)
 Si un de ces critères
n’est pas vérifié, les ondes ne peuvent pas interférer. Alors: \(I(M)=I_1 (M)+I_2(M)\)
--------------------
Q: Calcul de l'intensité lumineuse en notation complexe?
R: \(I=\frac{1}{2} K \underline{a}\ \underline{a^*}\)
Avec \(\underline{a}\) le complexe associé à l'amplitude de vibration \(a\) et \(\underline{a^*}\) sont complexe conjugué.
Rappel: avec les grandeurs réelles: \(I=K<a^2 (M,t)>\)
--------------------

==================================================
DECK : O3
==================================================

Q: (Y)
1) Représenter le dispositif des trous d'Young éclairé par une source ponctuelle à distance finie et un écran d'observation à grande distance finie. Tracer les rayons lumineux. 
2) Exprimer la différence de marche et l'intensité lumineuse en un point de l'écran d'observation
R: 1)
>>> [IMAGE_ID: paste-b443fcf093a3ca4302e5e76ea046eb563521e601.jpg] 
D'où :
         \(δ(M) = n (S_2M - S_1M)\)
Ensuite, déterminons l'expression de \( (S_2M - S_1M)\) :
. Coordonnées :   
                          \(M = (x,y,0)\)
                          \(S_1 = (\frac {a}{2},0,-D)\)
                         \(S_2 = (\frac {-a}{2},0,-D)\)
puis \(S_1M = \) \(\sqrt{\left(x - \frac{a}{2}\right)^2 + y^2 + D^2}\)
et \(S_2M =\) \(\sqrt{\left(x + \frac{a}{2}\right)^2 + y^2 + D^2}\)
Puisque \(D >> a, D >> x \space et \space D >> y,\) on va effectuer un développement limité de la forme \((1 + \epsilon)^{\alpha} \approx 1 + \alpha \epsilon\)
d'où :
\(S_1M = \) \(\sqrt{D^2 \left(1 + \frac{(x - \frac{a}{2})^2 + y^2}{D^2}\right)}\)  = \(D \sqrt{1 + \frac{(x - \frac{a}{2})^2 + y^2}{D^2}} \approx D \left(1 + \frac{(x - \frac{a}{2})^2 + y^2}{2D^2}\right)\)
\(S_2M = \) \(D \left(1 + \frac{(x + \frac{a}{2})^2 + y^2}{2D^2}\right)\)
puis : 
         \(\delta(M) = n \cdot \left[ D \left(1 + \frac{(x + \frac{a}{2})^2 + y^2}{2D^2}\right) - D \left(1 + \frac{(x - \frac{a}{2})^2 + y^2}{2D^2}\right) \right]\)
Finalement : 
         \(\boxed{\delta(M) = n \cdot \frac{ax}{D}}\)
Déterminons maintenant l'intensité lumineuse :
D'après la formule de Fresnel :
   \(I = 2I_0 \left(1 + \cos\left(\frac{2\pi}{\lambda_0} \delta(M)\right)\right)\)
d'où 
 \(\boxed{I = 2I_0 \left(1 + \cos\left(\frac{2\pi}{\lambda_0} \cdot n \cdot \frac{ax}{D}\right)\right)}\)
--------------------
Q: Quand dit-on que les interférences sont non localisées ? Donner un exemple.
R: Lorsque les interférences sont visibles et bien contrastées quelque soit la position de l’écran
dans le champ d’interférence, ont dit que les interférences sont non localisées. (Exemple: interférences obtenues avec les trous d'Young)
--------------------
Q: Pour une source centrée ou excentrée donner l'interfrange  \(i \) dans le cas du montage des trous d'Young sans lentilles.
R: L'interfrange \(i\) s'exprime : \(i = \frac{\lambda _0 D}{n_{air}\ a}\)
--------------------
Q: \((F.H)~Déterminer~la~différence~de~marche~pour~le~dispositif~ci-dessous : \)
>>> [IMAGE_ID: imgfh1.jpg] <<<
R: \(\delta(M) =(SM)_2-(SM)_1 = n_{air}(SS_2+S_2M-SS_1-S_1M)\)
\(= n_{air}(SS_2-SS_1) + n_{air}(S_2M-S_1M)\)
\(Or~S_2M-S_1M = \frac{ax}{D}~(Trous~de~Young~classique)~et~par~analogie,~ SS_2-SS_1 = -\frac{ab}{l} \)\(On~a~alors~\delta(M) = n_{air}(\frac{ax}{D}-\frac{ab}{l})\)
--------------------
Q: (F.H) Réaliser le schéma du montage avec 2 lentilles :
R: >>> [IMAGE_ID: paste-9a60a5058a996c2a13547706b58d971c86f71533.jpg] <<<
Faire uniquement le tracer des rayons rouges.
--------------------
Q: \((F.H)~Déterminer~la~différence~de~marche~pour~le~dispositif~ci-dessous : \)
>>> [IMAGE_ID: imgfh3.jpg] <<<
R: Imaginons qu'il y ait en M une source ponctuelle. Dans ce cas, d'après le principe du retour inverse de la lumière le trajet suivi par la lumière serait le même mais en sens inverse. Alors d'après le théorème de Malus, dans ce cas, \(S_1\) et \(H\) seraient sur le même plan d'onde. Nous en déduisons que \((S_1 M)=(HM)\)
\(\delta(M)=(SM)_2-(SM)_1=(SS_2)+(S_2M)-(SS_1)-(S_1M)\)
Or \(S_1\) et \(S_2\) sont sur le même plan d'onde donc \((SS_1)=(SS_2)\)
et donc
\(\delta(M)=(S_2M)-(S_1M)=(S_2H)+(HM)-(S_1M)=(S_2H)\)
Or \((S_2 H)=a sin \theta\) et dans les condition de Gauss
\(sin\theta\approx tan\theta=x/f'_2\)
Donc \((S_2 H)\approx \frac{ax}{f'_2}\)et \(\delta(M)=\frac{n_{air} a x}{f'_2}\)
--------------------
Q: \((F.H)~Exprimer~la~différence~de~phase~\Delta\phi(M)~dans\ le\ cas \ où\ ~\delta(M)=\frac{ax}{f'_2}\)
R: \(\begin{align}On~a~\Delta\phi(M)&=\frac{2\pi}{\lambda_0}\delta(M)\\ &= \frac{2\pi ax}{\lambda_0 f'_2}     \end{align}\)
--------------------
Q: (F.H) Expression de l'interfrange pour un montage des trous d'Young avec une lentille convergente après les trous d'Young et un écran dans le plan focal image de cette lentille:
R: \(On~a:~i=\frac{\lambda_0f'_2}{n_{air} a}\)
--------------------
Q: (Y)
Sachant que l'intensité lumineuse de la figure d'interférences obtenue avec le montage ci-dessous s'écrit:\(\boxed{I = 2I_0 \left(1 + \cos\left(\frac{2\pi}{\lambda_0} \cdot n \cdot \frac{ax}{D}\right)\right)}\)
>>> [IMAGE_ID: paste-b443fcf093a3ca4302e5e76ea046eb563521e601.jpg] <<<
Déterminer l'allure des franges d'interférences.
Donner l'expression de l'interfrange.
Donner les positions de franges brillantes et de franges sombres.
R: On remarque que \(I\) ne dépend que de x : les points sur l'écran qui ont même intensité lumineuse ont la même coordonnée x. Les franges d'interférences sont donc des droites d'équation \(x = cst\) perpendiculaires à la direction de \([S_1S_2]\)
L'interfrange correspond à la période spatiale de la fonction \(I(x)\) soit \(i=\frac{2\pi}{\frac{2\pi}{\lambda_0} \frac{na}{D}}=\frac{\lambda_0 D}{na}\)
Positions des franges brillantes : 
(On considère ici n = 1)
Soit \(q\) un entier relatif
     \( \boxed { p(M) = \frac{\delta(M)}{\lambda_0} =\frac{\ a\ x}{\lambda_0D}} \ =q\ \Leftrightarrow \ \frac{ax}{D} = q\lambda_0 \Leftrightarrow\boxed {x_{franges brillantes} =  q \left(\frac{D \lambda_0}{a}\right)}\)
Positions des franges sombres :
\(\frac{\delta(M)}{\lambda_0}  = q + \frac{1}{2} \Leftrightarrow  \frac{ax}{D} =\lambda_0 (q + \frac{1}{2})\ \Leftrightarrow  \boxed {x_{frangessombres}
 =  (q+\frac{1}{2}) \left(\frac{D \lambda_0}{a}\right)}\)
--------------------

==================================================
DECK : O4
==================================================

Q: (M.S) Quels sont les éléments constitutifs de l'interféromètre de Michelson ?
R: Deux miroirs M1 et M2, une séparatrice (SP), une compensatrice (C), des vis de rotation (rapide et lente) et une vis de chariotage.
--------------------
Q: (M.S) Comment sont positionnés les miroirs M1 et M2 l'un par rapport à l'autre ?
R: Ils sont presque perpendiculaires.
--------------------
Q: (M.S) Quel est l'angle approximatif formé par la séparatrice avec les miroirs ?
R: Environ 45°.
--------------------
Q: (M.S) À quoi servent les vis de rotation rapide et lente ?
R: À modifier l'angle entre les deux miroirs
--------------------
Q: (M.S) Quelle est la fonction de la lame semi-réfléchissante appelée séparatrice (SP) ?
R: Elle réfléchit une partie de la lumière et en transmet une autre partie.
Cela permet d'effectuer une division de l'onde et de faire de superposer deux rayons lumineux issus d'une même source mais ayant suivi des chemins différents.
--------------------
Q: (M.S) Quelle est la fonction de la vis de chariotage ?
R: Elle permet de translater le miroir M1.
--------------------
Q: (M.S) Quel est le rôle du VAC (verre anticalorique) à l'entrée du Michelson ?
R: Filtrer le rayonnement infrarouge source d'échauffement et d'endommagement des éléments optiques
--------------------
Q: (M.S) À quel angle d'incidence arrive le faisceau lumineux sur la séparatrice du Michelson ?
R: Environ 45°
--------------------
Q: (M.S) Comment peut-on modifier la différence de marche entre les deux rayons lumineux dans le Michelson ?
R: En faisant tourner les miroirs ou en chariotant pour translater le miroir qui peut l'être.
--------------------
Q: (M.S) Qu'est-ce qu'une source secondaire dans l'interféromètre de Michelson ?
R: Ce sont les points d'où semblent provenir les rayons lumineux après réflexion sur les miroirs M1 et M2 et sur la séparatrice.
--------------------
Q: >>> [IMAGE_ID: paste-c17d437c97f3bbf3f4ed711c99e018069921b86b.jpg] >> [IMAGE_ID: paste-8a64e728b34680870d0170f9fe9c2e51a6fa1d44.jpg] <<<
R: 1.
\(\space \delta(M) = 2n_{air} \alpha x\)
\(\begin{align}I(M) &= 2I_0(1+\cos(\frac{2\pi}{\lambda_0}\delta(M)))\\ &=2I_0(1+\cos(\frac{2\pi}{\lambda_0}2n_{air} \alpha x))\\ &=2I_0(1+\cos(\frac{4\pi}{\lambda_0}n_{air} \alpha x(M)))\\  \end{align}\)
\(I(M) \text{ constante} \implies x(M)\text{ constante}\)
Équation d'une frange, les franges sont des droites parallèles à l'arête de coin d'air
2.
\(p(M) = \frac{\delta(M)}{\lambda_0} = \frac{2n_{air}\alpha x}{\lambda_0}\)
3.
\(2n_{air}\alpha x_q = q\lambda_0\) avec \(q\in \mathbb{Z}\)
\(\begin{align}i &= x_{q+1} - x_q\\ &= \frac{\lambda_0}{2n_{air}\alpha}\end{align}\)
4.
\(\delta = 2 n_{air} e(x)\)
D'une frange brillante à la suivante \(\delta\) varie de \(\lambda_0\) donc \(e \text{ varie de } \frac{\lambda_0}{2n_{air}}\approx \frac{\lambda_0}{2}\)c'est bien ce qui figure sur le schéma.
5.
 Diminuer l'angle du coin d'air permet de se rapprocher du contact optique.
6.
 Lorsqu'on se rapproche du contact optique l'interfrange augmente.
7.
 Lorsque l'on translate \(M_1\), le montage reste un montage coin d'air. Les franges restent rectilignes, l'interfrange n'est pas modifiée. Les franges vont défiler dans le sens du glissement de l'arête du coin d'air.
--------------------
Q: (M.S) Qu'est-ce qu'un schéma équivalent de l'interféromètre de Michelson ?
R: Un schéma où la séparatrice et le miroir M2 sont remplacés par un miroir virtuel M'2 (Le miroir virtuel est le symétrique de M2 par rapport à la séparatrice.).
>>> [IMAGE_ID: paste-d07d84a1f13b8af6982560be0ba3e124ca557624.jpg] <<<
--------------------
Q: (M.S) Quelle figure d'interférences est observée dans la configuration du coin d'air , dans la configuration de la lame d'air et  dans la configuration du contact optique ?
R: Dans la configuration du coin d'air, on observe des franges rectilignes appelées franges d'égale épaisseur.
>>> [IMAGE_ID: paste-a3d5a705a818368d1da37f0122ff6c7d746e1f15.jpg] >> [IMAGE_ID: paste-4223f67d2af5c4eb29fa2b09005fbbf651ba46bb.jpg] >> [IMAGE_ID: paste-47c013e3cf015048cca208a22e792ce8bb1282c6.jpg] <<<
--------------------
Q: (C.E.) Condition d’éclairage pour un interféromètre de Michelson réglé en lame d’air :
R: Ce qui différencie un anneau d’un autre est l’angle d’incidence 𝑖. Pour observer des anneaux concentriques de rayons variables il faut donc que la source lumineuse émette un faisceau constitué de rayons d’angles variables pour que ces rayons arrivent sous des incidences variables sur la lame d’air.
Dans la pratique il faut faire converger la lumière sur les miroirs en utilisant un condenseur (lentille de très courte focale).
Remarque : faire converger la lumière sur les miroirs permet également d’augmenter la luminosité de la figure d’interférences.
--------------------
Q: (C E) Condition d’observation pour un interféromètre de Michelson réglé en lame d’air :
R: Les interférences étant localisées à l’infini, on peut les observer en projetant l’image sur un écran placé au foyer image d’une lentille convergente.
Rem: On peut aussi les observer à l’œil nu (pas dans le cas 
d’une source laser), en regardant le miroir 𝑀2, mais sans accomoder et en plaçant une feuille de papier entre 
la source et le condenseur pour ne pas être ébloui (et pour que la feuille absorbe les UV de la lampe à vapeur 
de mercure)
--------------------
Q: (C.E.) Conditions d’éclairage et d’observation pour un interféromètre de Michelson réglé en coin d’air :
R: Éclairage par un faisceau de lumière quasi parallèle sous incidence quasi normale pour que 𝛿 ≈ 2 e(𝑀) (avec e(M) l'épaisseur locale du coin d'air)
Observation : Les interférences étant localisées au voisinage des miroirs, on peut les observer en faisant l’image du miroir 𝑀2 sur l’écran à l’aide d’une lentille convergente
Rem: On peut aussi les observer à l’œil nu (pas dans le cas d’une source laser), en regardant le miroir 𝑀2, et en plaçant une feuille de papier entre la source et le condenseur pour ne pas être ébloui (et pour que la feuille absorbe les UV de la lampe à vapeur de mercure).
--------------------
Q: Quelle est l'espression de la différence de marche dans le cas d'un Michelson réglé en coin d'air? Où sont localisées les interférences?
R: Différence de marche: \(\delta(M)\approx 2 n_{air} e(M)\)
Les interférences sont localisées au voisinage des miroirs.
--------------------
Q: Etablir l'expression de la différence de marche dans le cas d'un Michelson réglé en lame d'air. Où sont localisées les interférences?
R: Les interférences sont localisées à l'infini.
>>> [IMAGE_ID: paste-07ac48dd5b6af09d4fbe94e765ffc7d4bec2e7fb.jpg] <<<
e
\(\delta(M)=(SM)_2 -(SM)_1=[(SI)+(IJ)+(JK)+(KM)]-[(SI)+(IM)]\)
Or \((IJ)=(JK)\) donc \(\delta(M)=2(IJ)+(KM)]-(IM)\)
De plus d'après le principe du retour inverse de la lumière + le théorème de Malus \((LM)=(KM)\)
Donc \(\delta(M)=2(IJ)+(KM)]-(IL)-(LM)=2(IJ)-(IL)=n_{air} (2 \ IJ - IL)\)
Or \(cos(i)=\frac {e}{IJ}\) donc \(IJ=\frac{e}{cos(i)}\)
De plus \(sin(i)=\frac{IL}{IK}\) donc \(IL=IK \ sin(i)\)
et comme \(tan(i)=\frac{IK/2}{e}\) soit \(IK=2\ e \ tan(i)\)
On obtient : \(IL=2\ e\ tan(i) \ sin(i)=2\ e\ \frac{sin^2 (i)}{cos(i)} \)
Finalement: \(2\ IJ - IL=\frac{2\ e}{cos(i)}-2\ e \frac{sin^2 (i)}{cos(i)}= \frac {2e}{cos(i)} \ (1-sin^2 (i))=2e\cos(i)\)
Bilan: \(\delta(M)=2\ n_{air} \ e \ cos(i)\)
--------------------
Q: (C.J)
>>> [IMAGE_ID: schémaexo2optique4.PNG] max et pmin ?
2) Que se passe t'il quant au nombre d'anneaux si θmax augmente ?
R: 1) On a alors  \(p(M)=\frac{2e cos(i)}{\lambda_0}\)p est maximal au centre de la figure d'interférence (centre des anneaux) lorsque i = 0. Donc \(p_{max}=\frac{2e}{\lambda_0}\) 
p diminue lorsqu'on s'éloigne du centre de la figure d'interférence, ainsi comme imax = θmax  on a  
\(p_{min}=\frac{2e cos(\theta_{max})}{\lambda_0}\)
2)Si θmax augmente alors pmin diminue et on voit plus d'anneaux
--------------------
Q: (L.L) Comment annuler l'angle \(\alpha\) du coin d'air dans un interféromètre de Michelson ?
R: Pour annuler \(\alpha\), il faut faire tourner un des deux miroirs dans le sens qui augmente l'interfrange jusqu'à ce que l'on ne voit plus qu'un champ uniforme sur l'écran.
--------------------
Q: (L.L) Qu'observe-t-on au contact optique dans un interféromètre de Michelson?
R: Au contact optique, l'épaisseur de la lame d'air et l'angle du coin d'air sont nuls. La différence de marche devient donc nulle pour tout rayon incident sur la surface des miroirs. L'éclairement sur l'écran devient uniforme, et aucune frange n'est visible.
--------------------
Q: (A.R) Dans un Michelson en lame d'air, quelle est l'expression de la différence de marche \(\delta(M)\) en fonction de l'épaisseur \(e\) de la lame et de l'angle d'incidence \(i\)
R: \(\delta(M) = 2\ n_{air}\ e\cdot cos(i)\)
--------------------
Q: (A.R) Quelle est l'allure de la figure d'interférence en lame d'air ? en coin d'air ? Justifier
R: - En lame d'air, l'intensité lumineuse en un point de l'écran ne dépend que de l'angle d'incidence donc les franges sont circulaires.
- En coin d'air, l'intensité lumineuse en un point de l'écran dépend de l'épaisseur d'air traversée dans le coin d'air, on a donc des franges qui sont des droites parallèles à l'arête du coin d'air.
--------------------
Q: (A.R) En lame d'air, comment évolue la figure d'interférence lorsque l'on diminue l'épaisseur de la lame d'air ? Quel est le cas limite ?
R: Lorsque l'on diminue l'épaisseur de la lame d'air, on diminue le rayon des anneaux de la figure d'interférence.
On fait rentrer les anneaux. On voit de moins en moins d'anneaux.
Le cas limite est appelé contact optique. On observe alors une seule couleur unie sur tout l'écran appelée teinte plate.
--------------------
==================================================
DECK : Electrocinetique Sup
==================================================

Q: <span style="color: rgb(0, 255, 0);">Enzo M. : Rappeler la loi des noeuds (ou 1ère loi de KIRCHHOFF)
R: La somme des intensités entrantes au niveau d'un noeuds est la même que la somme des intensités sortantes.
>>> [IMAGE_ID: paste-a875116a7e9cde9cfbf5e0ccac0068dba8cc26e8.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(ALI) Donner les impédances complexes d'une résistance, d'un condensateur et d'une bobine
R: [latex]
\begin{itemize}
\item Pour une résistance : $\underline{Z_R} = R$
\item Pour un condensateur : $\underline{Z_C} = \frac{1}{jC\omega}$
\item Pour une bobine: $\underline{Z_L} = jL\omega$
\end{itemize}
[/latex]
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Thomas S) Donner le temps caractéristique d'un circuit RC série.
R: \(\tau\) = RC
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Thomas S) Quelles sont les 5 étapes de résolution d'une équation différentielle ?
R: - Résolution de l'équation homogène
- Trouver la solution particulière
- Exprimer la solution générale
- Utilisation des conditions initiales (si eq. diff. de t) ou conditions les conditions aux limites (si éq. diff. d'une coordonnée de l'espace)
- Exprimer la solution
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Thomas S) Exprimer le temps caractéristique d'un circuit RL série
R: \(\tau\) = L / R
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Thomas S) Donner la méthode générale pour faire un bilan d'énergie dans un circuit électrique
R: On multiplie la loi des mailles par i.
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Thomas S) Donner 3 méthodes graphiques pour déterminer \(\tau\)
R: - Tracer la tangente en 0, l'intersection entre la tangente et l'asymptote se fait en t= \(\tau\)
- On multiplie le max (resp. la tension initiale) par 0.63 (resp. par 0.37). Cette valeur est atteinte en \(\tau\)
- Le temps de réponse à 5% est égal à 3 \(\tau\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">Thomas B. : 
>>> [IMAGE_ID: Resistance_serie.jpg] <<<
Que vaut R<sub>eq</sub> dans cette situation ?
R: R<sub>eq</sub> = R<sub>1</sub> + R<sub>2</sub>
--------------------
Q: <span style="color: rgb(0, 255, 0);">Thomas B. :
>>> [IMAGE_ID: Resistance_derivation.jpg] <<<
Quelle relation est vérifiée par R<sub>eq</sub> ?
R: 1/R<sub>eq</sub> = 1/R<sub>1</sub> + 1/R<sub>2</sub>
--------------------
Q: <span style="color: rgb(0, 255, 0);">Thomas B. :
>>> [IMAGE_ID: Pont_diviseur_tension.jpg] <<<
Donner la relation vérifiée par U<sub>1</sub>.
R: >>> [IMAGE_ID: Reponse.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Yannick) En régime stationnaire, que deviennent le condensateur et la bobine ?
R: Condensateur : interrupteur ouvert
Bobine : fil
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Yannick) Que peut on dire au sujet de la tension aux bornes d'un condensateur et de l'intensité du courant à travers une bobine ?
R: Ces deux gandeurs sont continues.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Yannick) Dans un circuit du premier ordre, quel est la durée du régime transitoire ?
R: 5𝜏 (système à environ 1% de son régime permanent)
3𝜏 (Le système à environ 5% de son régime permanent)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Yannick) Donner l'expression de l'énergie stockée pour un condensateur et pour une bobine
R: Condensateur : 1/2 Cu²
Bobine : 1/2 Li²
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Polynôme caractéristique de l'équation différentielle linéaire d'ordre 2 d'un oscillateur amorti?
R: \[r^2+\frac{\omega_0}{Q}r+\omega_0^2=0\]
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Ylan.M) 
Etablir l'équation différentielle d'un circuit LC série en fonction de la tension aux bornes du condensateur et donner l'expression de la pulsation propre.
>>> [IMAGE_ID: circuit_lc.png] <<<
R: <div style="text-align: center;">
\[\begin{align*}
\quad & E = U_L + U_C \quad \text{(loi des mailles)}\\
\quad & E = L\frac{di(t)}{dt} + U_C(t)\quad \text{(loi de comportement de la bobine)}  \\
 \quad & \frac{E}{LC} = \frac{d^2U_C(t)}{dt^2} + \frac{U_C}{LC} \quad \text{(loi de comportement du condensateur)} \\ 
\quad & {\omega_0^2 E} = \frac{d^2U_C(t)}{dt^2} +{\omega_0^2 U_C}
\end{align*}\]
\[\text{avec } \omega_0 = \frac{1}{\sqrt{LC}}  \]<div style="text-align: center;">
<div style="text-align: center;">\[\text{On a également la période propre } T_0=\frac{2\pi}{\omega_0}  \]
--------------------
Q: <span style="color: rgb(0, 255, 0);">(MAG) Définition d'un signal périodique
R: Un signal s est périodique s'il existe une période T tel que, pour tout instant t, s(t + T) = s(t)
--------------------
Q: <span style="color: rgb(255, 170, 0);">(MAG) Définition de la valeur moyenne d'un signal périodique
R: La valeur moyenne d'un signal s(t) de période T est définie par :
>>> [IMAGE_ID: paste-56aebc31db44e9d93c215d00112bf878c4a56ce5.jpg] <<<
avec t0 une valeur arbitraire de t.
--------------------
Q: <span style="color: rgb(0, 255, 0);">(MAG) 
>>> [IMAGE_ID: paste-743958c0904d925a12665b574b91a2cc9b47492c.jpg] <<<
R: >>> [IMAGE_ID: paste-20774f5297ef4a9db5493c39c01414d95b01ab1a.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(MAG) 
>>> [IMAGE_ID: paste-4614d20ae09b3d2e954a251b660db8e509ef7fc0.jpg] <<<
R: >>> [IMAGE_ID: paste-a9fade0521a66e2190b0f3bd077583d74186cd96.jpg] <<<
--------------------
Q: <span style="color: rgb(255, 170, 0);">(MAG) 
>>> [IMAGE_ID: paste-a1b33d92be280d5327038721267a3ce75b498c39.jpg] <<<
R: >>> [IMAGE_ID: paste-a5de9621785538ff1a8bd34e0b9c8c5e12065ae5.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Adrien) Etablir l'équation differentielle verifié par la tension aux bornes d'un condensateur pour un circuit RC série.
R: On obtient :
\(\frac{dUc}{dt} + \frac{1}{\tau} Uc = \frac {E}{\tau}\)
Avec:
-\(\tau = RC\)
-\(Uc\) la tension aux bornes du condensateur
-\(E \) la tension aux bornes du generateur (\(E=0\) si il n'y a pas de generateur)
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Ylan)
\[\text{Etablir l'équation différentielle d'un circuit RLC série en fonction de } U_C(t) \text{ et donner l'expression de la pulsation propre }\omega_0 \text{ et du facteur de qualité Q}\]<div style="text-align: center;">
>>> [IMAGE_ID: circuit_rlc.png] <<<
R: <div style="text-align: center;">Pour un circuit RLC série, on a :<div style="text-align: center;">
\[\begin{align*}
E &= U_R + U_L + U_C \quad  \\
E &= Ri(t) + L\frac{di(t)}{dt} + U_C\text{ (loi de comportement de la résistance et de la bobine)} \\
E &= RC\frac{dU_C(t)}{dt} + LC\frac{d^2U_C(t)}{dt^2} + U_C\text{ (loi de comportement du condensateur)} \\
\frac{E}{LC} &= \frac{d^2U_C(t)}{dt^2} + \frac{R}{L}\frac{dU_C(t)}{dt} + \frac{U_C}{LC} \\
{\omega_0^2 E } &= \frac{d^2U_C(t)}{dt^2} + \frac{\omega_0}{Q}\frac{dU_C(t)}{dt} + {\omega_0^2 U_C}
\end{align*}\]\[\text{avec } \omega_0 = \frac{1}{\sqrt{LC}} \text{ et } Q=\frac{1}{R}\sqrt{\frac{L}{C}}\]\[\text{On a également la période propre } T_0=\frac{2\pi}{\omega_0}  \]
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Adrien) Etablir l'equation differentielle vérifiée par l'intensité du courant traversant une bobine dans un circuit RL série.
R: On obtient :
\(\frac{di}{dt} + \frac{i}{\tau} = \frac{E}{L}\)
Avec:
-\(\tau = \frac{L}{R}\)
-\(i\) l'intensité du courant traversant la bobine
-\(E\) la tension aux bornes du générateur (\(E = 0\) si il n'y a pas de generateur)
--------------------
Q: <span style="color: rgb(0, 255, 0);">Victor /
Rappler les racines du polynôme caractéristique pour un oscillateur amorti dans un circuit RLC pour un facteur de qualité \(Q <\) \(1 \over 2\)
R: Le polynômes admet 2 racines réeles \(r_\pm\) : 
\(r_\pm  = - {\omega_0 \over 2Q} \pm {\omega_0 \over 2Q} {\sqrt{1-4Q^2}}\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">Victor /
Rappler les racines du polynôme caractéristique pour un oscillateur amorti dans un circuit RLC pour un facteur de qualité \(Q = {1 \over 2}\)
R: Le polynôme admet une racine double \(r \) :
\(r = -{\omega_0 \over 2Q} = -\omega_0 \)
--------------------
Q: <span style="color: rgb(0, 255, 0);">Victor /
Rappler les racines du polynôme caractéristique pour un oscillateur amorti dans un circuit RLC pour un facteur de qualité \(Q > {1 \over 2}\)
R: Le polynôme admet deux racines complexes \(r _ \pm\) :
\(r_\pm = -\mu \pm j\Omega = - {\omega_0 \over 2Q} \pm j\omega_0 \sqrt{1-{1\over 4Q^2}}\)
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Fabien) Montrer que dans un circuit RC série, l'énergie  Eg fournie par le générateur lors de la charge complète du condensateur est égale à [$]\Delta Eg = C*E^2[/$]
R: >>> [IMAGE_ID: IMG_3659.jpg] <<<
--------------------
Q: <span style="color: rgb(255, 170, 0);">(MAG) 
>>> [IMAGE_ID: paste-5c580b54ddcbcda3567244ebc5af86fe324dfefb.jpg] <<<
R: >>> [IMAGE_ID: paste-54e6f7af394dbf01d43255f48b46884890c3c498.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(MAG) 
>>> [IMAGE_ID: paste-7daead3eabe97baa10a9badbd45a8ba413b1056a.jpg] <<<
R: >>> [IMAGE_ID: paste-d39adeb88745a3553b98945ae6b81101a138c7b5.jpg] <<<
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Que signifient régime transitoire et régime permanent?
R: Le régime permanent désigne l'état du circuit dans lequel toutes les grandeurs (tensions, courants, ...) ont la même forme que celle imposée par le générateur (parfois absent alors les grandeurs sont constantes).
Le régime transitoire est l'état du circuit entre deux régimes permanents.
--------------------
Q: <span style="color: rgb(0, 255, 0);">(MAG) 
>>> [IMAGE_ID: paste-c7506d0c9ea7ea333e9711a7220077602ceada38.jpg] <<<
R: >>> [IMAGE_ID: paste-01b9b3b01a7c056184bedec16e2186431a05c7c7.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(MAG) 
>>> [IMAGE_ID: paste-6ffb549f053d20b3edf276c81961358393584927.jpg] <<<
R: >>> [IMAGE_ID: paste-83a1d539943ae0259a6ab113e94371972fd973e5.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(MAG) 
>>> [IMAGE_ID: paste-8da3d9322669ec0fea282482a257199d5f0a7822.jpg] <<<
R: >>> [IMAGE_ID: paste-5012b3a89fead189350f6b727c41fe47add60629.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(MAG) 
>>> [IMAGE_ID: paste-d810e793d4ca64fb16b3eb4a4c03eaa8b9cda1c6.jpg] <<<
R: >>> [IMAGE_ID: paste-633360169cefe5a7ec5f43411c4802cd209a3045.jpg] <<<
--------------------
Q: <span style="color: rgb(255, 170, 0);">(MAG) 
>>> [IMAGE_ID: paste-93aefadadfcbbd4ba98185e6adc003b9ce323085.jpg] <<<
R: Le gain en dB augmente de 20 dB
--------------------
Q: <span style="color: rgb(0, 255, 0);">(MAG) 
>>> [IMAGE_ID: paste-1f762087a245a059c1607e01a888a3be883519aa.jpg] <<<
R: >>> [IMAGE_ID: paste-28369efd4e03afaf7f085f3e1cd2503d5eef290d.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(MAG) 
>>> [IMAGE_ID: paste-9365e88f44c99dcded4f17ec25c9f94af0e9e6ec.jpg] <<<
R: >>> [IMAGE_ID: paste-fbb7ee4524ac441a40d4738f748679dcd47a11cd.jpg] <<<
--------------------
Q: >>> [IMAGE_ID: Circuit.jpg] <<<
<span style="color: rgb(0, 255, 0);">(Lenny) Le condensateur est initialement chargé, de tension E.
qu'elle est l'expression de u(t) pour t > 0 (avec τ = RC)
R: u(t) = E*e^(-t/τ)
On a u(t = 0) = E et le condensateur se décharge dans la résistance.
--------------------
Q: <span style="color: rgb(0, 255, 0);">Vlas.I
Le gain en dB est défini par:
R: >>> [IMAGE_ID: img7718006153195699032.jpg] <<<
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Lenny) La tension u vérifie l'équation différentielle suivante :
>>> [IMAGE_ID: équation.jpg] <<<
Qu'elle est la solution en régime permanent ?
R: >>> [IMAGE_ID: solution.jpg] <<<
En régime permanent on a u = cste. Donc du/dt = 0 puis on isole u.
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Vincent M.) A quelle condition sur l'amplitude du signal découvre-t-on la résonance?
R: Lorsque l'amplitude du signal passe un maximum pour une certaine pulsation, nommée pulsation de résonance.
--------------------
Q: <span style="color: rgb(0, 255, 0);">Victor /
Réaliser un bilan d'énergie sur le circuit RLC 
>>> [IMAGE_ID: Circuit RLC-63531ab1913debd4b8c81857268740d95d937fdd.png] <<<
et expliquer chaque terme.
R: La loi de mailles donne :
\(e = u_R + u_L + u_c \)
On multiplie la loi des mailles par l'intensité du courant : 
\(ei = u_Ri + u_Li + u_c i\)
\(=>P_g = P_j +  {dE_L\over dt} + {dE_c\over dt} \)
\(=> P_g = P_j +  {d \over dt}(E_L+E_c)\)
avec \(P_g\) : puissance fournie par le générateur
       \(P_j \)  : puissance dissipée par effet Joule 
         \(E_L\) : énergie emmaganisée par la bobine
         \(E_c\) : énergie stockée par le condensateur
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Balthazar) 
Solution homogène d'une équation différentielle dde la forme: 
[latex]\scriptsize $\frac{\text{d}x}{\text{d}t} + \frac{x}{\tau} = 0$ [/latex] ?
R: [latex]\scriptsize $x_h(t) = Ae^{-t/\tau}$. [/latex]
avec [latex]\scriptsize $A \in \mathbb{R}$. [/latex] :
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Manuel BT.) Donner l'impédance équivalente [latex]$\underline{Z_{\text{éq}}}$[/latex] dans ce circuit 
>>> [IMAGE_ID: IMG_0C8AE9F25B52-1.jpeg] <<<
R: [latex]$\underline{Z_{\text{éq}}} = R + \frac{R - RLC\omega^2}{1+jRC\omega - LC\omega^2}$[/latex]
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Balthazar) Solution particulière d'une équation différentielle de la forme: 
[latex]\scriptsize $\frac{\text{d}x}{\text{d}t} + \frac{x}{\tau} = \frac{X_1}{\tau}$, [/latex]
R: On pose, pour [latex]\scriptsize $B \in \mathbb{R}$ [/latex], la solution constante : 
[latex]\scriptsize $x_p(t) = B$.[/latex]
On obtient alors en injectant dans l'équation :
[latex]\scriptsize $0 + \frac{B}{\tau} = \frac{X_1}{\tau}$. [/latex]
Ainsi 
[latex]\scriptsize $x_p(t) = B = X_1$.[/latex]
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Manuel BT.) Dans un circuit RLC série en régime sinusoïdal forcé, le courant le parcourant est d'amplitude complexe :
[latex]
$\underline{I_{m}} = \frac{I_{0}}{1+jQ\left( \frac{\omega}{\omega_{0}} - \frac{\omega_{0}}{\omega}\right)}$ 
[/latex]
Donner alors l'équivalent de son amplitude réelle [latex]$|\underline{I_{m}}|$[/latex] en BF et en HF et la fréquence [latex]$\omega$[/latex] où [latex]$|\underline{I_{m}}|$[/latex] est au maximum.
R: [latex]\begin{itemize}
\item En BF : $|\underline{I_{m}}| \underset{\text{BF}}{\longrightarrow} 0$
\item En HF : $|\underline{I_{m}}| \underset{\text{HF}}{\longrightarrow} 0$
\item Amplitude max : $|\underline{I_{m}}| = I_{0}$ (lorsque $\omega = \omega_{0}$)
\end{itemize}
[/latex]
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Océane A.) En quoi la bobine est-elle équivalente en basses fréquences? en hautes fréquences?
R: • BF  → un fil
• HF → un interrupteur ouvert
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Océane A.) Donner l'expression de l'amplitude complexe de u(t) avec :
[latex]$u(t) = U_{0} \cos \left(\omega t + \frac{\pi}{4}\right)$[/latex]
R: [latex]$\underline{U_{0}} = U_{0}e^{j\frac{\pi}{4}} = \frac{U_{0}}{\sqrt{2}}(1+j)$[/latex]
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Océane A.) En quoi le condensateur est-il équivalent en basses fréquences? en hautes fréquences?
R: • En BF → un interrupteur ouvert
• En HF → un fil
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Océane A.) En régime sinusoïdal forcé à la pulsation [latex]$\omega$[/latex], à quoi les opérations de dérivation et d'intégration sont-elles équivalentes?
R: [latex]\begin{itemize}
\item Dériver $\Longleftrightarrow \times j\omega$
\item Intégrer $\Longleftrightarrow \times \frac{1}{j\omega}$
\end{itemize}[/latex]
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Daouda C.) Donner la relation entre le facteur de qualité ([latex]$Q$[/latex]), la pulsation de résonance ([latex]$\omega_{0}$[/latex]) et la bande passante à -3dB ([latex]$\Delta\omega$[/latex]) d'un filtre passe bande d'ordre 2. Comment varie la largeur de la bande passante selon le facteur de qualité ([latex]$Q$[/latex]) ?
R: [latex]$Q = \frac{\omega_{0}}{\Delta\omega}$[/latex]
 Plus Q est grand, plus le pic de résonance est étroit i.e. plus la largeur de la bande passante est faible i.e. plus [latex]$\Delta\omega$[/latex] est faible.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Quelle est la forme d'une équation différentielle d'un oscillateur harmonique ? (cas d'un circuit LC pour la pulsation propre)
R: \(\frac{d^{2}\alpha }{dt^{2}}+ \omega_{0}^{2}\alpha = cste\) avec \(\omega_{0} = \frac{1}{\sqrt{LC}}\)
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Quelle est la forme de la solution homogène d'un OH ?
R: \(s_{h}(t) = A*\cos{(\omega_{0}t)} + B*\sin{(\omega_{0}t)}=C*\cos{(\omega_0 t + \Phi)}=D*\sin{(\omega_0 t + \Phi')}\) 
avec A et B ou C et \(\Phi\) ou encore D et \(\Phi'\) à determier grâce aux C.I. .
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Quelle est la relation entre la periode propre et la pulsation propre des oscillations de l'OH ?
R: \(T_0 = \frac{2\pi}{\omega_{0}}\)
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Quel est le circuit étudié en tant que modèle de l'OH ?
R: Circuit LC série
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Dans un circuit LC sans source, l'énergie est elle conservée ?
R: Oui, on a \(P_{C} + P_{L} = 0\)
Donc \(dE/dt=0\) soit \(E=cste\)
avec :
\(P_{C}\) la puissance reçue par le condensateur
\(P_{L}\) la puissance stockée par la bobine.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Mohammed S.) Comment peut-on exprimer l'amplitude complexe de la tension aux bornes d'un condensateur dans un circuit RLC ?
R: [latex]$\underline{U_c} = \frac {E_0}{1-\frac{\omega^2}{\omega_0^2}+ j \times \frac{\omega}{\omega_0 \times Q }}$[/latex]
<div style="text-align: center;">[$]Q = \frac{1}{R} \sqrt{\frac{L}{C}}[/$]
<div style="text-align: center;">[$]\omega_0 = \frac{1}{\sqrt{LC}} [/$]
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Determiner la fonction transfert d un filtre passe bas d ordre 1 dans un circuit RC :
R: Avec un pont diviseur de tension on obtient :
\(\underline{H} (j\omega)=\frac{\underline{u_s}}{\underline{u_e}}=\frac{1}{1+jRC\omega}\)
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Determiner la fonction transfert d'un filtre passe haut d ordre 1 dans un circuit RC.
R: Avec un pont diviseur de tension on a :
\(\underline{H} (j\omega)=\frac{\underline{u_s}}{\underline{u_e}}=\frac{jRC\omega}{1+jRC\omega}\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">Leo S./Cyril J. : Exprimez la charge q d'un condensateur en fonction de sa capacité C et de la tension à ses bornes U
R: \[q = C \cdot U\]
\(q\) en coulomb (C)
\(C\), la charge du condensateur en Farat (F)
\(U\) en Volt (V)
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Mohammed S.) Quelle est l'expression de l'amplitude complexe associé à l'intensité du courant dans le circuit RLC série en RSF ?
R: [$]\underline{I} = \frac{I_0}{1+jQ(\frac{\omega}{\omega_0}-\frac{\omega_0}{\omega})}[/$]
avec 
<div style="text-align: center;">[$]I_0 = \frac{e}{R}[/$]
<div style="text-align: center;">[$]Q = \frac{1}{R} \sqrt{\frac{L}{C}}[/$]
<div style="text-align: center;">[$]\omega_0 = \frac{1}{\sqrt{LC}} [/$]
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Mohammed S.) Que peut-on dire de la résonance en intensité dans le circuit RLC série
R: <div style="text-align: left;">[$]\underline{I} = \frac{I_0}{1+jQ(\frac{\omega}{\omega_0}-\frac{\omega_0}{\omega})}[/$]<div style="text-align: left;">donc [$]|\underline{I}|[/$] est maximal, quand le dénominateur est minimal.
<div style="text-align: left;">ie lorsque [$]\omega = \omega_0[/$] et donc il y'a toujours résonance lorsque [$]\omega = \omega_0[/$] quelque soit la valeur de Q.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Mohammed S.) Quel est le lien entre la bande passante et le facteur de qualité ?
C'est quoi la bande passante à -3dB?
R: <div style="text-align: center;">[$]Q = \frac{\omega_0}{\Delta\omega}=\frac{f_0}{\Delta f}[/$]<div style="text-align: center;">
>>> [IMAGE_ID: bande_passante.jpg] <<<
<div style="text-align: left;">La bande passant à - 3dB est la plage de fréquence sur laquelle  [$]Amplitude\geqslant \frac{Amplitude_{max}}{\sqrt{2}}=\frac{Amplitude (\omega=\omega_0)}{\sqrt{2}}[/$]
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Soit \(Q < \frac{1}{2}\) ou \(\Delta > 0\), donner la forme de la solution de l'équation différentielle homogène dans ce cas.
R: Pour \(Q < \frac{1}{2}\), on a alors \(\alpha_h(t)= Ae^{r_+t}+Be^{r_-t}\) avec \(A \) et \(B\) deux constantes à déterminer avec les CI et \(r_{\pm}\) les racines du polynôme caractéristique. Ce système est en régime apériodique.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Soit \(Q = \frac{1}{2}\) ou \(\Delta = 0\), donner la forme de la solution de l'équation différentielle homogène dans ce cas.
R: Pour \(Q = \frac{1}{2}\), on a alors \(\alpha_h(t) = (At + B)e^{r_0t}\) avec A et B deux constantes à déterminer avec les CI et \(r_0\) la racine double du polynôme caractéristique. Ce système est en régime critique.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Soit \(Q> \frac{1}{2}\) ou \(\Delta<0\), donner la forme de la solution de l'équation différentielle homogène dans ce cas.
R: Pour \(Q> \frac{1}{2}\), on a alors \(\alpha_h(t) = e^{-\mu t} (Acos(\Omega t) + B sin(\Omega t)=Ce^{-\mu t} cos(\Omega t+\Phi)=De^{-\mu t} sin(\Omega t+\Phi')\)avec A et B ou C et \(\Phi\) ou encore D et \(\Phi'\) à determier grâce aux C.I. , et avec \(-\mu \pm j \Omega\) les racines du polynôme caractéristique. Ce système est en régime pseudo-périodique.
--------------------
Q: <span style="color: rgb(0, 255, 0);">Alexis R. : Qu'est-ce qu'un conducteur ohmique ?
R: Il s'agit d'un conducteur qui vérifie la loi d'Ohm :\[U = R \cdot I\]Les résistances sont des conducteurs ohmiques.
--------------------
Q: <span style="color: rgb(0, 255, 0);">Alexis R. : Quelle est l'influence de la convention choisie sur un dipôle.
R: La convention choisie (générateur ou récepteur) n'influence pas les résultats. Les changements apportés par un changement de convention s'annulent toujours.
--------------------
Q: <span style="color: rgb(0, 255, 0);">Alexis R. : Quelle est la formule mettant en relation la puissance et l'énergie ? Quelle est la formule de la puissance pour un circuit électrique
R: Puissance et énergie : \[P = \frac {d\varepsilon} {dt}\]Puissance dans un circuit électrique : \[P = U \cdot I\]L'interprétation dépend de la convention choisie.
--------------------
Q: <span style="color: rgb(255, 170, 0);">Alexis R. : Donnez la définition de la tension.
R: La tension entre deux points du circuit est définie comme la différence de potentiel entre ces deux points. 
NB : Le potentiel électrique est défini à une constante additive près.
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-8b53223b85c32cebddf51d33474919cb08cb5f51.jpg] <<<
R: >>> [IMAGE_ID: paste-512e14081d84d08894df5446eb66a7dcf352acbf.jpg] <<<
--------------------
Q: <span style="color: rgb(255, 170, 0);">(MAG)
>>> [IMAGE_ID: paste-01da042bbe0dde84885ab703c5c7e5c3d02a88f4.jpg] <<<
R: >>> [IMAGE_ID: paste-7a794527c9322c97ab32307d02da3b2d26c52a31.jpg] <<<
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-c8470044d81547260799d88c9a7ed866d58ef226.jpg] <<<
R: >>> [IMAGE_ID: paste-3039a51ec61bcc1d4c2d34d296376f287a4d0f8d.jpg] <<<
--------------------
Q: <span style="color: rgb(255, 170, 0);">(MAG)
>>> [IMAGE_ID: paste-37de55c62dd770061713d705b70e5962561d2145.jpg] <<<
R: >>> [IMAGE_ID: paste-aa07df7df60e8b1ef18471915ce6f54b1d742344.jpg] <<<
--------------------





==================================================
DECK : MQ MPI
==================================================

Q: Comment détermine-t-on la densité de probabilité de présence d’une particule ?
R: La densité de probabilité de présence de la particule au point \(M\) à l’instant \(t\) est : 
\(|\Psi(M,t)|^2 = \Psi(M,t)\Psi(M,t)^\ast\).
--------------------
Q: Comment s’écrit l’équation de Schrödinger à une dimension ?
R: \(i\hbar \frac{\partial \Psi(x,t)}{\partial t} = - \frac{\hbar^2}{2m} \frac{\partial^2 \Psi(x,t)}{\partial x^2} + V(x)\Psi(x,t)\)
où \(\hbar\) est la constante de Planck réduite : \(\hbar = \frac{h}{2 \pi} =1,05.10^{-34}J\cdot s^{-1}\)
--------------------
Q: Comment s’écrit l’équation de Schrödinger indépendante du temps ?
R: \(- \frac{\hbar^2}{2m} \frac{d^2 \varphi(x)}{dx^2}+V(x) \varphi (x)=E \varphi(x) \)
--------------------
Q: Comment s’écrit la fonction d’onde d’un état stationnaire ?
R: \(\Psi(x,t) = f(t) \cdot  \varphi(x)\) avec \(f(t) = exp (-i\frac{E}{\hbar} t)\)
Où \(f(t)\) et \(\varphi(x)\) sont des fonctions à valeurs complexes.
Considérons une particule qui ne peut se manifester sur l’axe \((Ox)\) et qui est soumise à un potentiel \(V(x)\) qui ne dépend pas du temps.
Une telle particule possède des états pour lesquels son énergie est bien définie (indépendante du temps) : on les appelle états stationnaires.
La partie spatiale de la fonction d’onde \(\varphi(x)\) vérifie l’équation de Schrödinger
indépendante du temps : 
\(- \frac{\hbar^2}{2m} \frac{d^2 \varphi(x)}{dx^2}+V(x) \varphi (x)=E \varphi(x) \)
--------------------
Q: Comment s’écrit la relation de Planck-Einstein ?
R: \(E = h\nu = \hbar \omega\)
--------------------
Q: Comment s’écrit la relation de De Broglie ?
R: \(p = \hbar k\)
--------------------
Q: Quelles sont les formules de \(E\), \(p\) et \(k\) valable pour une onde de matière et/ou pour un photon dans le vide ?
R: pour une onde de matière et un photon dans le vide:
\(E = \hbar \omega\)
\(p = \hbar k = \frac{h}{\lambda}\) 
Pour un photon dans le vide uniquement:
\(k = \frac{\omega}{c}\) 
\(E = \frac{hc}{\lambda}\)
--------------------
Q: Qu’est-ce qu’un paquet d’onde ?
R: Un paquet d’ondes, superposition d’ondes de De Broglie de vecteur d’onde moyen \(k_0\) et dont les
vecteurs d’onde sont dans l’intervalle étroit de largeur \(\Delta k\) autour de \(k_0\), décrit un état de la particule
localisée sur une distance \(\Delta x\) telle que :
\(\Delta x \cdot \Delta k \approx 1\)
se déplaçant à la vitesse : \(vg = \frac{\hbar k_0}{m}\)
égale à la vitesse de la particule quand sa quantité de mouvement est
\(p_0 = \hbar k_0\)
--------------------
Q: Comment s’écrit l’inégalité d’Heisenberg spatiale ? Comment s’interprète cette inégalité?
R: \(\Delta p \cdot \Delta x \geqslant \frac{\hbar}{2}\)
\(\Delta x\) est l’incertitude sur la position de la particule (i.e. l’extension spatiale du paquet d’ondes)
\(\Delta p\) est l’incertitude sur la quantité de mouvement de la particule.
--------------------
Q: Qu'est-ce qu'une particule libre?
R: [latex]Une particule qui évolue sans subir d'interaction: $\forall x \in]-\infty,+\infty[,V(x)=0$[/latex]
--------------------
Q: Quelles sont les conditions de continuité de la fonction d'onde ?
R: Dans le cas où le potentiel subi par une particule est discontinu en \(x = x_0\) :
- Si la discontinuité est finie, \(\varphi(x)\) et \(\frac{d\varphi}{dx}(x)\) sont continues en \(x_0\) :
\(\varphi(x_0^-) = \varphi(x_0^+)\) et \(\varphi'(x_0^-) = \varphi'(x_0^+)\)
- Si \(x_0\) sépare une région de potentiel fini d'une région de potentiel positif infini :
\(\varphi(x_0^-) = \varphi(x_0^+) = 0\) et il n'y a pas de condition sur \(\frac{d\varphi}{dx}(x)\)
--------------------
Q: Les solutions de l'équation de Schrödinger dans le cas d'états stationnaires d'une particule de masse m dans un puits de potentiel infini de largeur a? Leurs énergies? L'énergie de confinement?
R: \(\psi_n(x,t) = A_n \sin(k_n x) \exp(-i \omega_n t)\) Avec \(k_n = n \frac{\pi}{a}\), \(n \in \mathbb{N}^*\)
et \(E_n = \frac{1}{2m}(\hbar k_n)^2 = n^2 \frac{\pi^2 \hbar^2}{2 m a^2}\)
Energie de confinement: \(E_{min} = E_1 = \frac{\pi^2 \hbar^2}{2 m a^2}\)
--------------------
Q: Montrer, en prenant l'exemple simple du cours, qu'une superposition de deux états stationnaires (caractérisé par les fonctions d'onde d'énergie respectivement Er et Es) engendre une évolution au cours du temps de l'état de la particule.
R: \(\psi(x,t) = \frac{1}{\sqrt{2}} e^{-i \frac{E_r}{\hbar} t} \varphi_r(x) + \frac{1}{\sqrt{2}} e^{-i \frac{E_s}{\hbar} t} \varphi_s(x)\)

Après calcul du module carré de la fonction d'onde, on obtient que la densité de probabilité de présence associée à cet état de la particule s'écrit :
\(|\psi(x,t)|^2 = \frac{1}{2} (|\varphi_r(x)|^2 + |\varphi_s(x)|^2 + 2 \varphi_r(x) \varphi_s(x) \cos(\frac{E_s - E_r}{\hbar} t))\)

On remarque que la densité de probabilité de présence dépend explicitement du temps : l'état de la particule n'est donc pas stationnaire, il évolue au cours du temps.
--------------------
Q: Qu'est-ce que l'effet tunnel ? Citer des applications
R: Dans le cas de l'étude d'une barrière de potentiel : Si la décroissance de la fonction d'onde dans la barrière de potentiel est suffisamment lente, on peut s'attendre à ce que la probabilité de présence soit non nulle de l'autre côté de la barrière (une particule quantique a donc la possibilité de traverser la barrière de potentiel) : c'est l'effet tunnel.
Applications : microscope à effet tunnel, radioactivité alpha
--------------------
Q: Quel est l'influence de la largeur et de la hauteur de la barrière de potentiel sur l'effet tunnel ?
R: La probabilité de transmission diminue très rapidement lorsque :
- la largeur de la barrière augmente,
- la hauteur de la barrière vue par la particule soit \(V_0 - E\) augmente
--------------------
Q: Comment établir les solutions de l'équation de Schrödinger indépendante du temps dans le cas d'une particule incidente sur une marche de potentiel ? Exploiter les conditions de continuité de la fonction d'onde.
R: Le potentiel est constant par morceaux égal à \(V_0\) pour \(x > 0\) et nul pour \(x < 0\).
L'équation de Schrödinger s'écrit:

\(\frac{d^2\varphi}{dx^2} + \frac{2m(E-V_0)}{\hbar^2}\varphi(x) = 0\) pour \(x > 0\)
et \(\frac{d^2\varphi}{dx^2} + \frac{2mE}{\hbar^2}\varphi(x) = 0\) pour \(x < 0\)

Dans le cas où \(E > V_0\) :

Dans la région 1 (\(x<0\)), la solution de l'équation de Schrödinger est de la forme
\(\varphi_1(x) = A_1 \exp(i k_1 x) + B_1 \exp(-i k_1 x)\) avec \(k_1 = \frac{\sqrt{2mE}}{\hbar}\)
Dans la région 2 (\(x>0\)) :
\(\varphi_2(x) = A_2 \exp(i k_2 x) + B_2 \exp(-i k_2 x)\) avec \(k_2 = \frac{\sqrt{2m(E-V_0)}}{\hbar}\)

Puis on sait que \(\psi(x) = f(t)\varphi(x)\) avec \(f(t) = \exp(-i\frac{E}{\hbar}t) = \exp(-i\omega t)\) donc
\(\psi_1(x) = A_1 \exp(-i(\omega t - k_1 x)) + B_1 \exp(-i(\omega t + k_1 x))\)
\(\psi_2(x) = A_2 \exp(-i(\omega t - k_2 x))\)

Rem : le terme \(B_2 \exp(-i(\omega t + k_1 x))\) est impossible car c'est une onde qui se propage selon \(-u_x\) alors qu'il n'existe aucune source qui peut être à l'origine de cette onde ni aucun obstacle de potentiel.

Maintenant on va exploiter les conditions de continuité de la fonction d'onde
\(\varphi_1(x=0) = \varphi_2(x=0) \rightarrow A_1 + B_1 = A_2\)
\(\varphi'_1(x=0) = \varphi'_2(x=0) \rightarrow A_1 - B_1 = \frac{k_2}{k_1} A_2\)

on trouve alors
\(A_2 = \frac{2k_1}{k_1+k_2} A_1\)
\(B_1 = \frac{k_1-k_2}{k_1+k_2} A_1\)

on choisit \(A_1 = 1\) et on retrouve
\(\psi(x,t) = \begin{cases} A_1 e^{-i\frac{E}{\hbar}t} \left( e^{i k_1 x} + \frac{k_1 - k_2}{k_1 + k_2} e^{-i k_1 x} \right) & \text{si } x < 0 \text{ : zone I} \\ A_1 e^{-i\frac{E}{\hbar}t} \frac{2 k_1}{k_1 + k_2} e^{i k_2 x} & \text{si } x > 0 \text{ : zone II} \end{cases}\)

Dans le cas où \(E < V_0\) :

Dans la zone 1 (\(x<0\)), la solution de l'équation de Schrödinger est de la forme :
\(\varphi_1(x) = A_1 \exp(i k_1 x) + B_1 \exp(-i k_1 x)\) avec \(k_1 = \frac{\sqrt{2mE}}{\hbar}\)
Dans la zone 2 (\(x>0\)) :
\(\varphi_2(x) = B_2 \exp(-q x)\) avec \(q = \frac{\sqrt{2m(V_0-E)}}{\hbar}\)

Rem: Pas de terme en \(B_1 \exp(qx)\) qui diverge quand \(x \rightarrow +\infty\)
par analogie avec ce qu'on a trouvé dans le cas \(E > V_0\) (en remplaçant donc \(i k_2\) par \(-q\) soit \(k_2\) par \(i q\)), on trouve
\(\psi(x,t) = \begin{cases} A_1 e^{-i\frac{E}{\hbar}t} \left( e^{i k_1 x} + \frac{k_1 - i q}{k_1 + i q} e^{-i k_1 x} \right) & \text{si } x < 0 \text{ : zone I} \\ A_1 e^{-i\frac{E}{\hbar}t} \frac{2 k_1}{k_1 + i q} e^{-q x} & \text{si } x > 0 \text{ : zone II} \end{cases}\)
--------------------
Q: Comment se comporte une particule quantique lorsqu'elle rencontre la marche de potentiel ?
R: Pour \(E > V_0\) :
Dans la zone I, la fonction d'onde est la superposition d'une OPPM incidente et d'une OPPM réfléchie.
Dans la zone II, il s'agit d'une OPPM transmise. Contrairement à la particule classique, la particule quantique a une probabilité non nulle de se réfléchir sur la marche, et cette probabilité est d'autant plus importante que l'énergie de E est proche de V0.

Pour \(0 < E < V_0\) :
Dans la zone I, la fonction d'onde est la superposition d'une OPPM incidente et d'une OPPM réfléchie.
Dans la zone II, il s'agit d'une onde évanescente, et la densité de probabilité de présence dans la zone II n'est donc pas rigoureusement nulle au-delà de la marche. Cela signifie que la mesure de la position de la particule peut conduire à une valeur positive de son abscisse, contrairement aux prévisions classiques.
--------------------


==================================================
DECK : Reaction Acide Base
==================================================

Q: Qu'est-ce qu'un acide fort?
R: Un acide fort est un acide qui réagit totalement avec l'eau suivant la réaction d'équation:
\(AH+ H_2O_{(l)} \rightarrow A^{-} + H_3O^{+}_{(aq)}\)
Un acide fort dans l'eau se convertit totalement en \(H_3O^{+}\).
--------------------
Q: Qu'est-ce que la constante d'acidité (
\(K_A\)) d'un couple acide/base (noté \(AH/A^ {-}\)). Son expression?
R: C'est la constante d'équilibre de la réaction de l'acide du couple avec l'eau d'équation:
\(AH+H_2O_{(l)} \rightarrow A^{-} + H_3O^ {+}_{(aq)}\)
Son expression est \(K_A=\frac{[A^{-}]_{éq}[H_3O^{+}]_{éq}}{[AH]_{éq} C°}\)
--------------------
Q: Qu'est-ce qu'un acide?
Qu'est-ce qu'une base?
R: Un acide est une entité chimique pouvant céder un proton \(H^{+}\). On le note \(AH\).
Une base est une entité chimique pouvant capter un proton \(H^{+}\). On la note \(A^{-}\).
--------------------
Q: Donner les couples de l'eau et leur \(pK_A\).
R: L'eau est la base dans le couple \(H_3O^{+}/H_2O\) de \(pK_A=0\).
L'eau est l'acide dans le couple \(H_2O/HO^{-}\) de \(pK_A=14\).
--------------------
Q: Qu'est-ce que le produit ionique de l'eau? Quelle est sa valeur? son expression?
R: C'est la constante d'équilibre de la réaction d'autoprotolyse de l'eau d'éq:
\(2H_2O_{(l)}=H_30^{+}_{(aq)} +HO^{-}_{(aq)}\)
Il est noté \(K_e=\frac{[H_3O^{+}]_{éq}[HO^{-}]_{éq}}{C°^2}=10^{-14}\) à \(25°C\).
--------------------
Q: Quelle est la définition du pH d'une solution?
R: \(pH=-log\frac{[H_3O^{+}]}{C°}\)
--------------------
Q: Comment calculer \([H_30^{+}]\) et 
\([H0^{-}]\) quand on connait le pH de la solution?
R: \([H_30^{+}]=10^{-pH}\) et \([H0^{-}]=10^{pH-14}\)
--------------------
Q: Comment calculer un \(K_A\) quand on connait \(pK_A\)et inversement?
R: \(pK_A=-log K_A\) et \(K_A=10^{-pK_A}\)
--------------------
Q: Donner la relation qui lie le pH d'une solution avec le \(pK_A\) d'un couple \(AH/A^{-}\) qui y est présent.
R: \(pH=pK_A+log\frac{[A^-]_{éq} }{[AH]_{éq}}\)
--------------------
Q: Quelle est la forme du couple qui domine lorsque \(pH>pK_A\)? \(pH<pK_A\)? \(pH=pK_A\)?
R: Lorsque \(pH<pK_A\): C'est la forme acide qui domine: \([AH]>[A^-]\)
Lorsque  \(pH>pK_A\): C'est la forme basique qui domine: \([AH]<[A^-]\)
Lorsque  \(pH=pK_A\): Aucune des deux formes ne domine: \([AH]=[A^-]\)
--------------------
Q: On mélange dans l'eau, les deux membres du couple \(CH_3COOH/CH_3COO^{-}\) de \(pK_A=4,8\) ainsi que les deux membres du couple \(NH_4^{+}/NH_3\) de \(pK_A=9,2\).
Quelles réactions peuvent se produire? Que valent leurs constantes d'équilibre? Quelle est celle qui se fera dans les plus grandes proportions (qui aura le plus grand avancement à l'équilibre)?
R: \(NH_{3(aq)} + CH_3COOH_{(aq)}\rightarrow CH_3COO^{-}_{(aq)}+NH_{4(aq)}^{+}\) ;  \(K°=10^{9,2-4,8}=10^{4,4}\) réaction que l'on peut considérer comme totale (qui aura le plus grand avancement à l'équilibre).
\( CH_3COO^{-}_{(aq)}+NH_{4(aq)}^{+} \rightarrow NH_{3(aq)} + CH_3COOH_{(aq)}\) ;  \(K°=10^{4,8-9,2}=10^{-4,4}\)réaction qui ne se fait presque pas
\(H_20_{(l)}+CH_3COO^{-}_{(aq)} \rightarrow CH_3COOH_{(aq)}+HO^{-}_{(aq)}\) ; \(K°=10^{4,8-14}=10^{-9,2}\) réaction qui se fait encore moins.
\(2H_2O_{(l)} \rightarrow H_3O^{+}_{(aq)}+HO^{-}_{(aq)}\); \(K°=10^{-14}\) réaction qui se fait encore moins.
--------------------


==================================================
DECK : T1
==================================================

Q: <span style="color: rgb(255, 170, 0);">(E.M) Quels sont les 3 modes de transferts d'énergie thermique ?
R: La conduction (aussi appelée diffusion thermique), la convection et le rayonnement.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(E.M) Qu'est ce que la conduction thermique ?
R: C'est un transport d'énergie thermique à travers un milieu matériel (solide ou fluide) sans déplacement macroscopique de matière.
La conduction thermique est présente partout où il y a de la matière dont la température n'est pas uniforme.
--------------------
Q: <span style="color: rgb(0, 255, 0);">(E.M) Définition de la puissance thermique/flux thermique \(\phi\) et son unité ?
R: >>> [IMAGE_ID: paste-25188068b698be55467f25e4252bcf0a0fa3a135.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(E.M) Dans quelle direction se font les transferts thermiques ?
R: Des zones chaudes vers les zones froides.
--------------------
Q: <span style="color: rgb(0, 255, 0);">(E.M) Donner la loi de Fourier.
R: >>> [IMAGE_ID: paste-6bb5e882e6c73155c5dff2e491dde6d1ea5a27f1.jpg] <<<
avec 
. \(\vec j_{th}\) le vecteur densité de flux thermique/de courant thermique
. λ est la conductivité thermique, c'est une grandeur positive caractéristique du matériau dans lequel a lieu le transfert thermique. Unité : W. m<sup>-1</sup>.K<sup>-1</sup>.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(E.M.) Quelle est l'expression, en fonction de j<sub>th</sub>,<sub> </sub>du transfert thermique δQ à travers une surface S, dans le sens indiqué par \(\vec {dS}\), pendant dt ?
R: >>> [IMAGE_ID: paste-62e583638ff04222da7b2bf3553df5515750e080.jpg] <<<
avec j<sub>th</sub> en W.m<sup>-2</sup>
--------------------
Q: <span style="color: rgb(0, 255, 0);">(E.M) Donner l'expression du flux thermique \(\phi \) à travers une surface S en fonction du vecteur densité de flux thermique \(\vec {j_{th}}(M, t)\) ?
R: On a :  \(\phi = \int\int _{M\in S} \vec j_{th}.\overrightarrow dS\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(E.M) Dans quels cas la loi de fourier n'est-elle pas valable ?
R: - lorsque le gradient de température \(\overrightarrow{grad} \space T\) varie trop rapidement dans le temps par rapport au temps d'établissement du flux thermique
- lorsque le gradient de température \(\overrightarrow{grad} \space T\) est trop grand
--------------------
Q: <span style="color: rgb(255, 170, 0);">(E.M) Donner l'unité de la conductivité λ et son ordre de grandeur pour :
- un métal bon conducteur (Ag, Cu)
- du verre
- l'air
R: Unité : W.m<sup>-1</sup>.K<sup>-1
</sup>- acier : 50 W.m<sup>-1</sup>.K<sup>-1</sup>
- du verre : 1 W.m<sup>-1</sup>.K<sup>-1</sup>
- l'air : 0.03 W.m<sup>-1</sup>.K<sup>-1
</sup>- eau liquide (P et T usuelles): 0,6 W.m<sup>-1</sup>.K<sup>-1</sup>
--------------------
Q: <span style="color: rgb(255, 170, 0);">(S.D.) Analogie entre Conduction thermique et électrique
R: >>> [IMAGE_ID: paste-95bd659b9be99e7c9c5963100bb46f59593aa905.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(S.D.)
>>> [IMAGE_ID: paste-014ad9b052028d394823d5ae894648df45012490.jpg] <<<
R: 1. Il s'agit bien d'une association en série car le flux thermique est le même à travers chacun des matériaux.
>>> [IMAGE_ID: ex1.jpeg] <<<
2. Vitrage simple : \(R_{th_{SV}}=\frac{3e}{\lambda_v S}\)
Vitrage double : \(R_{th_{DV}}=R_{th_1}+R_{th_2}+R_{th_3} = \frac{e}{\lambda_v S} + \frac{e}{\lambda_a S} + \frac{e}{\lambda_v S} = \frac{e}{S}\big(\frac{2}{\lambda_v}+\frac{1}{\lambda_a}\big)\)
On fait le rapport avec les données de l'énoncé : \(\frac{R_{th_{DV}}}{R_{th_ {SV}}} = 11,7\)
3. Les pertes thermiques en hiver sont en fait les flux thermiques allant de l'intérieur vers l'exterieur.
On rappelle : \(T_{int} - T_{ext} = R_{th}\phi_{int \rightarrow ext}\)
D'où : \(\phi_{SV} = \frac{T_{int} - T_{ext}}{R_{th_{SV}}}\) et \(\phi_{DV} = \frac{T_{int} - T_{ext}}{R_{th_{DV}}}\)
On fait le rapport : \(\frac{\phi_{DV}}{\phi_{SV}} = \frac{R_{th_{SV}}}{R_{th_{DV}}} = \frac{1}{11,7}\)
On a donc \(\phi_{SV} = 11,7\phi_{DV}\)
--------------------
Q: <span style="color: rgb(255, 170, 0);">[Z.S] Conduction thermique dans une barre - problème unidimensionnel en coordonnées cartésiennes
>>> [IMAGE_ID: paste-5bc4bdf6dd1615bfe2f6fdfb42b08d6fffb77cb2.jpg] <<<
Etablir une relation différentielle entre la température et le vecteur densité de flux thermique. Puis l'équation de la diffusion thermique.
R: Réponse: \(µ c \frac{\partial T}{\partial t}+\frac{\partial j_{th}}{\partial x}=0\) et \(\frac{\partial^2 T}{\partial  x^2}- \frac{1}{D}\frac{\partial T}{\partial t}=0\)
Démonstation:
Choix du système étudié: Portion de barre: cylindre de section S et de largeur dx
Expression de dH: \(dH=C dT=cµS \ dx (T(x,t+dt)-T(x,t)=cµS \ dx\ \frac{\partial T}{\partial t}\)
Expression de \(\delta Q\) (transfert thermique algébriquement reçu par le système pendant dt):
\(\delta Q=\delta Q_1 + \delta Q_2\)
avec \(\delta Q_1\): le transfert thermique qui entre dans le système par la face situé en \(x\) pendant dt
\(\delta Q_2\): le transfert thermique qui entre dans le système par la face situé en \(x+dx\) pendant dt
En notant \(\phi (x,t)\) le flux thermique dans le sens \(+\overrightarrow{u_x}\) : \(\delta Q_1=\phi (x,t) dt\) et \(\delta Q_2=- \phi (x+dx,t) dt\)
Donc \(\delta Q=\phi (x,t) dt-\phi (x=dx,t) dt=- \frac {\partial \phi}{\partial x} dx \ dt\)
1er principe (évolution isobare): \(dH=\delta Q\) donne \(c \ µ \ S \ dx \ \frac{\partial T}{\partial t} dt=- \frac {\partial \phi}{\partial x} dx \ dt\) soit \(c \ µ \ S \frac{\partial T}{\partial t}+ \frac {\partial \phi}{\partial x} =0\)
Or \(\phi (x,t)=\iint _S \overrightarrow{j_{th}} .\overrightarrow{dS}=j_{th} S\) Donc \(c \ µ \frac{\partial T}{\partial t}+ \frac {\partial j_{th}}{\partial x} =0\)
Deplus \(j_{th} S= -\lambda S \frac{\partial T}{\partial x}\)donc \(c \ µ \ S \frac{\partial T}{\partial t}-\lambda S \frac {\partial ^2 T}{\partial ^2 x} =0\)Soit \(\frac {\partial ^2 T}{\partial ^2 x}- \frac{cµ}{\lambda} \frac {\partial T}{\partial t}=0\) ou \(\frac {\partial ^2 T}{\partial ^2 x}- \frac{1}{D} \frac {\partial T}{\partial t}=0\) avec D le coefficient de diffusion thermique de la barre.
--------------------
Q: <span style="color: rgb(255, 170, 0);">[Z.S] Que peut-on dire du flux thermique en régime stationnaire?
R: En régime stationnaire et en l’absence de source, le flux thermique entrant est égal au flux thermique sortant de n’importe quel système.
On dit qu’il y a conservation du flux thermique ou que le flux thermique est conservatif.
--------------------
Q: <span style="color: rgb(255, 170, 0);">[Z.S] Conduction thermique dans une barre - problème unidimensionnel en coordonnées cartésiennes
>>> [IMAGE_ID: paste-5bc4bdf6dd1615bfe2f6fdfb42b08d6fffb77cb2.jpg] <<<
Déterminer l'expression de la température T(x) de la barre en régime stationnaire en fonction de T<sub>1</sub> , T<sub>2</sub> , x , et L.
R: Méthode 1:
Simplifier l'équation de la diffusion thermique dans le cas d'un régime stationnaire. 
\(\frac{\partial^2 T}{\partial  x^2}- \frac{1}{D}\frac{\partial T}{\partial t}=0\) devient \(\frac{\partial^2 T}{\partial  x^2}=0\) en régime stationnaire
Intégrer deux fois l'équation obtenue.
\(T=Ax+B\)
Déterminer les constantes d'intégration à l'aide des conditions aux limites.
Les conditions aux limites: \(T(x=0)=T_1\) et \(T(x=L)=T_2\)
Donc \(A=\frac{T_2 -T_1}{L}\)et \(B=T_1\)
Soit \(T=\frac{T_2 -T_1}{L} x+T_1\)
Méthode 2:
Utiliser le fait qu'en régime stationnaire le flux thermique se conserve:
\(\Phi=cste\)
Exprimer \(\phi\) en fonction de \(j_{th}\) puis en fonction de T à l'aide de la loi de Fourier.
\(\phi = -\lambda \frac{ dT}{dx} S\) dans le sens \(T_1\) vers \(T_2\) (i.e. suivant \(+\overrightarrow{u_x}\))
Donc \(\frac{dT}{dx}=A=cste\)
Intégrer une fois l'équation obtenue et déterminer les constantes d'intégration à l'aide des conditions aux limites.
idem méthode 1
A retenir : Dans un milieu homogène, en régime stationnaire T(x) suit une loi affine.
--------------------
Q: Donner la relation différentielle entre la température et le vecteur densité de flux thermique, puis l'équation de la diffusion thermique. 
Dans le cas le plus général (3D) avec terme de source.
R: Avec terme de source (\(P_v\): la puissance thermique volumique dela source)
\(µ c \frac{\partial T}{\partial t}+div \overrightarrow{ j_{th}}=P_v\)
\(\Delta {T}- \frac{1}{D}\frac{\partial T}{\partial t}=- \frac{P_v}{\lambda}\)
--------------------
Q: Définir la résistance thermique
R: En régime stationnaire, on définit la résistance thermique \(R_{th}=\frac{T_1-T_2}{\Phi_{1 \rightarrow 2}}\)
--------------------


==================================================
DECK : T2
==================================================

Q: (Y.Z) Qu'est ce qu'un corps noir ?
R: Un corps noir est un corps qui absorbe intégralement tout le rayonnement qu’il reçoit (quelle que soit sa fréquence (longueur d’onde)).
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Y.Z) 
>>> [IMAGE_ID: paste-f6b9f90f8cf02c41f23d6ea12614cdd2e115cc05.jpg] <<<
R: C'est le flux surfacique émis par un corps noir à la température T
--------------------
Q: <span style="color: rgb(255, 170, 0);">(F.H) Quelle est l’expression de la puissance totale rayonnée par le soleil \(P_s\) en fonction de σ, \(T_s\) et \(R_S\) ? (Loi de Stefan : \(\varphi(t) = \sigma T^4\))
R: On a : \(P_s = \sigma T_s^44\pi R_s^2 \) avec \(Rs \) le rayon du soleil
--------------------
Q: <span style="color: rgb(255, 170, 0);">(FH) Déterminer la température à la surface du soleil Ts sachant que le maximum du spectre qu’il émet se situe à \(\lambda_m =  500nm\).
Loi de Wien : \(\lambda_mT= 2898 \mu m.K\)
R: Donc \(T_s = \dfrac{2898}{\lambda_m}\) avec \(\lambda =0,500 \ µm\)
AN : \(T_s = 5796 K\)
--------------------


==================================================
DECK : TD 02/03
==================================================

Q: <span style="color: rgb(255, 170, 0);">(T.B) Dans le cas du montage avec lentilles, déterminer l'expression de la différence de marche en un point M quelconque de l'écran ?
>>> [IMAGE_ID: Montage_lentille_schema.jpg] <<<
R: \(\delta(M)=(SS_2)-(SS_1)+(S_2 M) - (S_1 M)\)
\(S_1\) et \(S_2 \) sont sur la même surface d'onde donc \((SS_2)=(SS_1)\)
Donc: \(\delta(M)=(S_2 M) - (S_1 M)\)
D'après le principe du retour inverse de la lumière + le théorème de Malus: \((HM)=(S_1 M)\)
Donc: \(\delta(M)=(S_2 M) - (S_1 M)=(S_2 H)+(HM)-(S_1 M)=(S_2 H)=n_{air}\ S_2 H=n_{air} \ a \ sin(\theta)\)En se plaçant dans les condion de Gauss (\(\theta\) petit): \(tan(\theta)\approx sin(\theta)\approx \frac{x}{f'_2}\)
Bilan: \(\delta(M)\approx n_{air} \frac {ax}{f'_2}\)
--------------------
Q: >>> [IMAGE_ID: IMG_20231216_160858.jpg] <<<
<span style="color: rgb(0, 255, 0);">(T.B) Comment varie l'interfrange lorsque l'on translate S comme sur le schéma ?
Et la figure d'interférences ?
R: L'interfrange ne varie pas, mais la figure d'interférences est translatée :
- vers le haut si la source est décalée vers le bas
- vers le bas si la source est décalée vers le haut
--------------------
Q: >>> [IMAGE_ID: Source centree schema.jpg] <<<
<span style="color: rgb(255, 170, 0);">(T.B) Quelle est l'expression de la différence de marche dans la configuration basique des trous d'Young ? Méthode (en bref) pour l'obtenir ?
R: ẟ(M) = n<sub>air</sub>×ax / D
Méthode:
- Définir la diff de marche:\(\delta(M)=(S_2 M)-(S_1 M)=n_{air} (S_2 M-S_1 M)\)
- Exprimer les distances \(S_2 M\) et \(S_1 M\) en exprimant les corrdonnes de chaque points / les coordonnées des vecteurs / la norme des vecteurs)
- Effctier une DL grâce à l'hypothèse D>>a,x,y pour obtenir \(S_2 M-S_1 M \approx \frac{ax}{D}\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(E.B) Dans le cas suivant faire le tracé de deux rayon lumineux qui arrivent en un point M quelconque et qui interfèrent
>>> [IMAGE_ID: 20231218_210637-5143f6bde5b28f4dffc961d9364abd84289e1911.jpg] <<<
R: >>> [IMAGE_ID: 20231218_211228.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(E.B) Dans ce cas là tracer deux rayon lumineux issus de S<sub>0</sub> qui interfèrent en M
^
>>> [IMAGE_ID: 20231218_212428.jpg] <<<
R: >>> [IMAGE_ID: 20231218_212438.jpg] <<<
--------------------
Q: <span style="color: rgb(255, 170, 0);">(A.H.) 
>>> [IMAGE_ID: paste-d760f1bd44dd9b39b34e74b94e06f1e00ad3f4ed.jpg] <<<
[latex]\footnotesize{On se place dans le cas où $\delta$ ne dépend pas de $\lambda$. \newline
\footnotesize{Si la lampe émettait un rayonnement monochromatique de longueur d'onde $\lambda$, quelle serait, en fonction de la différence de marche $\delta$, l'expression de l'intensité résultante ?}\newline
Dans le cas du spectre bichromatique (à deux raies), exprimer l'intensité reçue en fonction de $\lambda_1$, $\lambda_2$, $I_0$ et $\delta$.
\scriptsize{Avec $I_0$ l'intensité reçue si une seule des deux ondes parvient sur le détecteur, $I_0$ est une valeur commune aux deux ondes.}}[/latex]
R: Cas monochromatique:\(I = 2I_0[1 + cos(\frac{2\pi}{\lambda}\delta)]\)
Cas bichromatique:\(I = I_1 + I_2 = 2I_0[1+cos(\frac{2\pi}{\lambda_1}\delta)] + 2I_0[1+cos(\frac{2\pi}{\lambda_2}\delta)]\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(A.H.)
>>> [IMAGE_ID: paste-9c0a6a8a3cf09546fb3fac93eb68f4d3aa3dcf01.jpg] <<<
[latex]
\footnotesize{On consdère que les deux longueurs du doublet sont très proches et on définit : 
\begin{itemize}
\item{$\lambda_0$ la valeur moyenne de $\lambda_1$ et $\lambda_2$}
\item{$\Delta\lambda$ la largeur du doublet, différence entre $\lambda_2$ et $\lambda_1$ ($\lambda_2 > \lambda_1$)}
\end{itemize}
Mettre l'expression de $I(\delta)$ sous la forme :}
\begin{center}
\normalsize{$I(\delta) = I'[1+v(\delta)cos(\frac{2\pi\delta}{\lambda_0})]$}
\end{center}
\footnotesize{où $v(\delta)$ est la fonction de visibilité que l'on exprimera en fonction de $\Delta\lambda$.}
\\\\
\footnotesize{On admettra que : $I = I_1 + I_2 = 2I_0[1+cos(\frac{2\pi}{\lambda_1}\delta)] + 2I_0[1+cos(\frac{2\pi}{\lambda_2}\delta)]$}
[/latex]
R: [latex]
\footnotesize{On a : $\lambda_0 = \frac{\lambda_1 + \lambda_2}{2}$ et $\Delta\lambda = \lambda_2 - \lambda_1$ ($\lambda_2 > \lambda_1$).
De plus, $\lambda_1$ et $\lambda_2$ sont proches, on approxime $\lambda_1\lambda_2 \simeq \lambda_0^2$. On a alors :}
\begin{align}
I(\delta) & = 2I_0[1+cos(\frac{2\pi}{\lambda_1}\delta)] + 2I_0[1+cos(\frac{2\pi}{\lambda_2}\delta)] \\
& = 2I_0[2 + cos(\frac{2\pi}{\lambda_1}\delta) + cos(\frac{2\pi}{\lambda_2}\delta)] \\
& = 2I_0[2 + 2cos(\frac{2\pi\delta}{2}(\frac{1}{\lambda_1}+\frac{1}{\lambda_2}))cos(\frac{2\pi\delta}{2}(\frac{1}{\lambda_1}-\frac{1}{\lambda_2}))] \\
& \simeq 4I_0[1 + cos(\frac{2\pi\delta}{2}(\frac{\lambda_1 + \lambda_2}{\lambda_0^2}))cos(\frac{2\pi\delta}{2}(\frac{\Delta\lambda}{\lambda_0^2}))] \\
& = 4I_0[1 + cos(\frac{2\pi}{\lambda_0}\delta)cos(\frac{\pi\Delta\lambda}{\lambda_0^2}\delta) \\
I(\delta) & = I'[1 + v(\delta)cos(\frac{2\pi}{\lambda_0}\delta)]
\end{align}
avec $I' = 4I_0$ et $v(\delta) = cos(\frac{\pi\Delta\lambda}{\lambda_0^2}\delta)$.
[/latex]
--------------------


==================================================
DECK : Thermo Sup
==================================================

Q: <span style="color: rgb(0, 255, 0);">(C.J.) Gaz Parfait Monoatomique : C<span style="font-size:x-small">v = ? C<span style="font-size:x-small">p = ?
R: GPM : \(C_v = \frac{3}{2}nR\)
\(C_p = \frac{5}{2} nR\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(C.J.) Gaz Parfait Diatomique : C<span style="font-size:x-small">v = ? C<span style="font-size:x-small">p = ?
R: GPD : \(C_v = \frac 5 2 nR\)
\(C_p = \frac 7 2 nR\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(C.E.) Un système thermodynamique est fermé si
R: il n'échange pas de matière avec l'extérieur (mais peut échanger énergie)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(C.E.) Un système thermoynamique est isolé si
R: Il n'échange ni matière ni énergie avec l'extérieur
--------------------
Q: <span style="color: rgb(255, 170, 0);">(C.E.) Un système thermodynamique est ouvert si
R: Il échange matière avec le milieu extérieur
--------------------
Q: <span style="color: rgb(0, 255, 0);">(C.E) Le quotient de 2 grandeurs extensives donne
R: Une grandeur intensive (ex : masse volumique)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(TS)Donner la formule du premier principe (dans le cas où il n'y a pas de variations d'énergie cinétique et pas de variation d'énergie potentielle macroscopique) :
R: \(\Delta U = W + Q\)
Avec W: travail algébriquement reçu par le système
Q: transfert thermique algébriquement reçu par le système
Condition d'application: système fermé
--------------------
Q: <span style="color: rgb(0, 255, 0);">(TS)Citer la première loi de Joule et en déduire une égalité :
R: L'énergie interne d'un gaz parfait ne dépend que de sa température. On a alors :
\[\Delta U =  \text{C}_\text{v}\Delta T\]
--------------------
Q: <span style="color: rgb(0, 255, 0);">(TS)Donner l'expression de l'enthalpie :
R: <div style="text-align: justify;"> \(H = U + PV \)<div style="text-align: left;">H et U en J<div style="text-align: left;">P en Pa<div style="text-align: left;">V en m^3
--------------------
Q: (TS) Donner l'expression du premier principe sur l'enthalpie. Quelles sont les conditions de validité?
R: <div style="text-align: left;">
<div style="text-align: left;">\[\Delta H =  \text{W}_\text{u} + Q\]<div style="text-align: left;">Avec \(W_u\) le travail autre que celui des forces ext de pression.<span style="color: black; font-family: Arial; font-size: 20px; display: inline !important; float: none;">
<div style="text-align: left;">Conditions de validité:<div style="text-align: left;">Evolution isobare (Le travail des forces de pression devient -<span style="white-space: pre-wrap;">Δ(PV) lorsque la transformation est isobare)<div style="text-align: left;">ou monobare avec équilibre mécanique à l'état initial et à l'état final: Pi = Pf = Pext.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(T.B.) Qu'est-ce qu'une grandeur intensive? extensive? Donner des exemples.
R: Intensive si sa valeur ne dépend pas de la taille du système (expl: T, P)
Extensive si sa valeur dépend de la taille du système (expl: V, n)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(A.S) Que dit la première loi de Joule ?
R: L'énergie interne d'un Gaz Parfait ne dépend que de sa température.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(A.R. et T.B.) Comment s'exprime la variation d'énergie interne d'une PCII ?
R: [$]\Delta U=C \Delta T[/$]
--------------------
Q: <span style="color: rgb(0, 255, 0);">(T.B.) Que vaut la force de pression lorsque la pression est constante et s'exerce sur une surface S plane ?
R: >>> [IMAGE_ID: Pression.jpg] <<<
avec \(\vec{n}\) (comme \(\vec{F}\)) dirigé du fluide vers la surface.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(BR/LPB) Comment s'écrit le travail élémentaire et le travail des forces extérieures de pression?
R: Travail élémentaire: \(\delta W = -P_\text{ext}dV\\\)
Travail lorsque V varie de \(V_i\) à \(V_f\): \(W = -\int_{V_i}^{V_f} P_\text{ext}dV\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(BR/LPB)Pour les capacités thermiques d'une PCII, on a :
R: \(C_P\approx C_V\) noté \(C\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(BR/LPB)On définit le coefficient isentropique \(\gamma\) comme le rapport :
R: \(\gamma = \frac{C_\text{p}}{C_\text{v}} = \frac{C_\text{p, m}}{C_\text{v, m}} = \frac{c_\text{p}}{c_\text{v}} \)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(BR/LPB)Citer la deuxième loi de Joule :
R: L'enthalpie d'un GP ne dépend que de la température \(T\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(INC) Enoncer le deuxième principe
R: <div style="text-align: justify;">Pour un système fermé qui subit une transformation entre un état 1 et un état 2, la variation d'entropie <span style="text-align: left;"> <span style="text-align: left;"> \({\Delta}S=S_2-S_1\)<span style="text-align: left;"> s'exprime: \({\Delta}S=S_{creee}+S_{ech}\)<div style="text-align: justify;"><span style="color: black; font-family: Arial; font-size: 20px; text-align: justify; display: inline !important; float: none;"><span style="text-align: left;">
<div style="text-align: justify;">où \(S_{créée}\) est <span style="text-align: left;">l'entropie créée au sein du système, <span style="text-align: left;"> <div style="text-align: left;">\(S_{éch}\) est l'entropie échangée, reçu de l'extérieur par le système.
--------------------
Q: <span style="color: rgb(0, 255, 0);">(INC) Comment calculer l'entropie échangée?
R: Si au cours d'une transformation , le système reçoit des transferts thermiques \(Q_i\) de différents thermostats de températures \(T_{ext,i}\), on a:\[S_{ech}=\sum_i \frac{Q_i}{T_{ext,i}}\]où \(T_{ext,i}\) est la température du <span style="color: rgb(255, 0, 0);">thermostat: elle est a priori <span style="color: rgb(0, 0, 0);">différente de cellle du système.
--------------------
Q: <span style="color: rgb(0, 255, 0);">(INC) Quelle est la caractérisique d'une fonction d'état?
R: Les variations d'une fonciton d'état ne dépendent pas du chemin suivi, seulement des états initiaux et finaux des transformations.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(BR/LPB)Sur ce diagramme de Clapeyron, le travail algébriquement reçu par le système est : 
>>> [IMAGE_ID: Capture d’écran 2023-09-09 155229.png] <<<
R: \(W = \mathcal{A}>0\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(A.P) Inégalité de Clausius ?
R: Pour un cycle ditherme:
>>> [IMAGE_ID: Screenshot_20230910_115252_DuckDuckGo.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(INC) Citer les conditions d'application de la loi de Laplace, citer la loi puis l'établir à l'aide de l'entropie d'un gaz parfait :\[S(P,V) = \frac{nR}{{\gamma}-1}ln(\frac{P}{P_0})+\frac{nR{\gamma}}{{\gamma}-1}ln(\frac{V}{V_0})) + S_0\]
R: Un gaz parfait qui subit une transformation isentropique (notée isoS et aussi nommée adiabatique réversible) suit la loi de Laplace :
\[ PV^{\gamma} = \text{cste} \]
Pour l'établir, on sait que la transformation entre l'état 1 \((P_1,V_1,T_1)\) et l'état 2 \((P_2,V_2,T_2)\) est adiabatique réversible. On a donc :
\[ \Delta S = S_2 - S_1 = 0 \]
On a que l'entropie est constante, donc :
\[ \Delta S = \frac{nR}{\gamma -1} \ln\left(\frac{P_2}{P_1}\right) + \frac{nR\gamma}{\gamma -1} \ln\left(\frac{V_2}{V_1}\right) \]
\[ = \frac{nR}{\gamma -1} \ln\left(\frac{P_2}{P_1}\left(\frac{V_2}{V_1}\right)^{\gamma}\right) = 0 \]
Donc,
\[ P_1 V_1^{\gamma} = P_2 V_2^{\gamma} \]
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Citer la loi de Laplace et l'exprimer en fonction de P et T et en fonction de T et V
R: La loi de Laplace en fonction de P et V s'exprime :
\[PV^{\gamma} = \text{cste}\]<span style="white-space: pre-wrap;">
o<span style="white-space: pre-wrap;">ù \[ {\gamma}=c_p/c_v \]
En fonction de \(P\) et \(T\): 
\[P\left(\frac{nRT}{P}\right)^{\gamma} = \text{cste}\]
donc on obtient:
\[P^{1-\gamma}T^{\gamma} = \frac{\text{cste}}{(nR)^{\gamma}} = \text{cste}'\]
Pour \(T\) et \(V\):
\[TV^{\gamma - 1} = \frac{\text{cste}}{nR} = \text{cste}''\]
--------------------
Q: <span style="color: rgb(255, 170, 0);">(E.B.) Faire un schéma de la détente de Joule - Gay-Lussac
Exprimer T<sub>f</sub> et V<sub>f </sub>(température et volume finale) en fontcion de T<sub>0</sub> et V<sub>0</sub> (température et volume Initial).
Donner l'entropie créée.
Qu'en deduire sur la transformation?
Donnée: \(\Delta S_{GP}=C_v ln (T_f/T_i) +nR ln (V_f/V_i)\)
R: >>> [IMAGE_ID: paste-869b85dbe1c56a1cd010e47ed61ca635c720c15c.jpg] <<<
Syst: Tout le gaz+ le vide (système fermé)
1er pp: \(\Delta U=W+Q\) 
évolution adiabatique: Q=0
G.P.: \(\Delta U=\Delta U _{GP} + \Delta U_{vide} =C_V \Delta T\) car \(\Delta U_{vide}=0\)
Or W=0 car V=cste
Donc 1er pp: \(C_V\  \Delta T=0\) soit \(\Delta T=0\)
Bilan: \(V_f = 2V_0\) ; \(T_f = T_0\)
2nd pp: \(\Delta S=S_{créée}+S_{éch}\)
\(\Delta S=\Delta S_{GP} +\Delta S_{vide}=\Delta S_{GP}=nR\ ln(2)\)
\(S_{ech}=0\) car Q=0
Donc \(Scréée = ΔS_{GP} = nRln(2)>0\) La transformation est irréversible
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Comment différencier une adiabatique réversible et une isotherme dans un diagramme de Clapeyron ?
R: En un point M du diagramme, l'adiabatique réversible est plus raide qu'une isothèrme.
>>> [IMAGE_ID: Screenshot_20230910_142255_Samsung_Notes.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(O.M) Efficacité et efficacité maximum d'une pompe à chaleur utilisée comme chauffage/
R: [$] e = \frac{-Q_c}{W} [/$]
et  [$] e \le \frac{T_c}{T_c-T_f} [/$]
--------------------
Q: <span style="color: rgb(0, 255, 0);">(O.M) Efficacité et efficacité maximal d'un frigo
R: [$] e = \frac{Q_f}{W} [/$]
et  [$] e \le \frac{T_f}{T_c-T_f} [/$]
--------------------
Q: <span style="color: rgb(0, 255, 0);">(INC) Comment appelle-t-on une transformation dont la variation d'entropie est nulle ?
R: On dit qu'elle est isentropique.
--------------------
Q: (FH)Déf isochore, isobare, monobare, isotherme, monotherme, reversible
R: isochore : volume syst constant
isobare : pression syst constante + \(P=P_{ext}\)
monobare pression ext constante
isotherme : temp syst constante +\(P=P_{ext}\)
monotherme : temp ext constante 
reversible : perturbation lente, et à tout moment on a temp et pression du système égales à la temp et pression de l'ext (\(P=P_{ext}\) et \(T=T_{ext}\))
--------------------
Q: <span style="color: rgb(0, 255, 0);">(FH)Travail pour une transfo isochore :
R: W = 0
--------------------
Q: <span style="color: rgb(255, 170, 0);">(FH)Travail pour une transfo monobare :
R: [$]W = -Pext  \Delta V[/$]
--------------------
Q: <span style="color: rgb(255, 170, 0);">(FH)Def adiabatique :
R: systeme n'échange aucun transfert thermique avec le milieu extérieur.
--------------------
Q: <span style="color: rgb(0, 255, 0);">(ADC)La capacité thermique massique c de l'eau est (avec les unités) :
R: 4,18 J.g<sup>-1</sup>.K<sup>-1</sup>
--------------------
Q: <span style="color: rgb(255, 170, 0);">(FH)Variation d'enthalpie d'un GP ou d'une phase condensée incompressible et indilatable.
R: Gaz parfait: \(\Delta H=C_p\ \Delta T\)
Phase condensé incompressible indilatable: \(\Delta H=C\ \Delta T\)
--------------------
Q: <span style="color: rgb(255, 170, 0);">INC
>>> [IMAGE_ID: Capture d’écran 2023-09-10 170551.png] <<<
Indiquer la signification des différents éléments et échanges.
R: (1) système étudié: fluide frigorigène
(2) Système mécanique ou électrique
(3) Source chaude à Tc
(4) Source froide à Tf
(A) Travail W algébriquement reçu par le système
(B) Transfert thermique Qc algébriquement reçu par le système
(C) Transfert thermique Qf algébriquement reçu par le système
--------------------
Q: <span style="color: rgb(255, 170, 0);">(A.R) On considère une <span style="color: rgb(255, 0, 0);">masse m d'eau de <span style="color: rgb(255, 0, 0);">capacité th. massique c<sub>m</sub>, initialement à la température<span style="color: rgb(255, 0, 0);"> T<sub>i</sub> = 20°C, dans un calorimètre dont on néglige la valeur en eau. 
On plonge une résistance <span style="color: rgb(255, 0, 0);">R = 5 <span style="background-color: rgb(255, 255, 255);"><span style="color: rgb(255, 0, 0);">Ω<span style="color: rgb(32, 33, 34);"> (de capacité th. négligeable) parcourue par un courant d'intensité <span style="color: rgb(255, 0, 0);">I = 1 A pendant <span style="color: rgb(255, 0, 0);">τ <span style="color: rgb(255, 0, 0);">= 1 minute dans l'eau.
Calculer la température finale <span style="color: rgb(255, 0, 0);">T<sub>f</sub> de l'eau. La transformation est-elle réversible ? 
Donnée:\(\Delta S_{PCII}=C\  ln (T_f/T_i)\)
R: 1)  Système : { eau + résistance }
On applique le 1<sup>er</sup> principe sur l'enthalpie :
ΔH = W<sub>u</sub> = W<sub>élec
</sub>Or ΔH = m c<sub>m </sub>(T<sub>f</sub> - T<sub>i</sub>) donc mc<sub>m</sub>(T<sub>f</sub> - T<sub>i</sub>) = RI<sup>2</sup><span style="color: rgb(0, 0, 0);">τ
<span style="color: rgb(255, 0, 0);">T<sub>f</sub> = T<sub>i</sub> + RI<sup>2</sup>τ / mc<sub>m</sub>
2) Toujours pour le système { eau + résistance }
S<sub>e</sub> = 0 car la transformation est adiabatique
ΔS = ΔS<sub><span style="font-size: 16.6667px;">eau</sub> + ΔS<sub>résistance</sub> (additivité de l'enthalpie). Or ΔS<sub>résistance</sub> = 0
ΔS = m c<sub>m</sub> * ln(T<sub>f</sub> / T<sub>i</sub>) > 0 car T<sub>f</sub> > T<sub>i
</sub>On applique le 2<sup><span style="font-size: 16.6667px;">ème</sup> principe :
ΔS<sub>c </sub>= ΔS > 0 donc la transformation est irréversible !
--------------------
Q: <span style="color: rgb(0, 255, 0);">(L.L) Au cours d'une transformation adiabatique la température est-elle constante ?
R: Non pas forcément car on peut chauffer un système en lui apportant du travail sans sans lui apporter de transfert thermique . (Un gaz quelconque qui est comprimé chauffe)
--------------------
Q: <span style="color: rgb(255, 170, 0);">(L.L)L'enthalpie de vaporisation est positive ou négative ? De même pour celle de solidification ?
R: Changement d'état isobare: [$]\Delta H=Q[/$]
La vaporisation consomme de l'énergie donc [$]Q>0[/$]  et donc l'enthalpie de vaporisation: [$]\Delta H>0[/$].
Pour la solidification c'est l'inverse.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Définition de la capacité thermique à volume constant \(C_v\)
R: Si U ne dépend que de T: \(C_v= \frac {dU} {dT}\)
\(C_v\) en \(J \cdot K^{-1}\)
\(dU\) en \(J\)
\(dT\) en \(K\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(INC) Rappeler les propriétés de l'entropie créee.
R: L'entropie créee est toujours positive ou nulle. On a aussi
S<sub>créee</sub> > 0  pour une transformation irréversible. 
S<sub>créee </sub>= 0  pour une transformation réversible.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(YZ) A l'aide de la relation de Mayer, établir et exprimer les capacités thermiques molaires à volume constant Cv,m et à pression constante Cp,m d'un gaz parfait en fonction du coefficient isentropique γ et de la constante des gaz parfaits R
R: <div style="text-align: justify;">Cp,m =Cv,m +R<div style="text-align: justify;">γ=Cp,m / Cv,m <div style="text-align: justify;">Donc γ=1+R/Cv,m <div style="text-align: justify;">Soit Cv,m = R/(γ-1) et Cp,m = γCv,m = γR/(γ-1)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(INC)<span style="color: rgb(0, 0, 0);"> Application : calcul d'entropie créee
Un morceau de fer m = 2kg à la température T<sub>i</sub> = 880 K est jeté dans un lac à T<sub>0</sub> = 5°C. On donne c<sub>fer</sub> = 400 J Kg<sup>-1</sup> K<sup>-1</sup> et entropie massqiue c : s(T) = c ln(T/T<sub>0</sub>) + s<sub>0</sub>
Exprimer l'entropie créee.
R: On applique le 2nd principe : \(ΔS = Scrée + Séch\)
d'où \(Scrée = ΔS - Séch\)
De plus \(ΔS = m(s(T₀) - s(Ti))= m\ c \ ln\frac{T₀}{Ti}\)
D'autre part : \(Séch = Q/T₀\)
Avec Q qui s'obtient avec le premier principe :
  \(ΔH = Wu + Q\) avec \(Wu = 0\)
  \(Q = m\ c\ (T₀ - Ti)\)
Finalement :
  \(Scréee = m\ c\ ln(T₀/Ti) - m\ c\ (1-(Ti/T₀))\)
--------------------






`.trim();
