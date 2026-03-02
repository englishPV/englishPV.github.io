

const RAW_MATH = String.raw`
**Convention typographique :** $\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$, $E$ désigne un espace vectoriel normé (evn), sauf mention contraire. Toutes les hypothèses sont nécessaires sauf mention explicite.

---

# CHAPITRE 1 — Suites, fonctions de la variable réelle

## FLASHCARD 1 — Théorème de Bolzano-Weierstrass

### RECTO
**Théorème 1 — Bolzano-Weierstrass**

**Contexte :** Soit $(u_n)_{n \in \mathbb{N}}$ une suite de réels (ou de $\mathbb{R}^d$).

Énoncer le théorème de Bolzano-Weierstrass avec ses hypothèses exactes et sa conclusion.

### VERSO
**Hypothèses complètes :**

*   $(u_n)_{n \in \mathbb{N}}$ est une suite bornée de $\mathbb{R}^d$ (ou de $\mathbb{R}$), $d \ge 1$ fixé.
*   ($\mathbb{R}^d$ est de dimension finie, muni d'une norme quelconque — toutes équivalentes.)

**Énoncé formel :**

$$ \forall (u_n)_{n \in \mathbb{N}} \in (\mathbb{R}^d)^{\mathbb{N}}, \quad (u_n) \text{ bornée} \implies \exists \varphi : \mathbb{N} \to \mathbb{N} \text{ strictement croissante}, \exists \ell \in \mathbb{R}^d, \quad u_{\varphi(n)} \xrightarrow[n \to +\infty]{} \ell $$

**Démonstration (Esquisse) :**

*   **Cas $d=1$ :** Construction par dichotomie — on encadre la suite dans $[a_n, b_n]$ avec $b_n - a_n \to 0$, en choisissant à chaque étape le demi-intervalle contenant une infinité de termes. Le théorème des suites adjacentes (ou des intervalles emboîtés) donne la limite $\ell$.
*   **Cas $d \ge 2$ :** Extraction diagonale — on extrait d'abord une sous-suite convergente pour la première coordonnée, puis une sous-sous-suite pour la deuxième, etc. (procédé diagonal, voir À connaître 1).
*   **Outil clé :** Complétude de $\mathbb{R}$ + caractérisation des compacts de $\mathbb{R}^d$ (fermés bornés).

### 
**Subtilités :**

*   Le théorème est faux en dimension infinie : dans un evn de dimension infinie, la boule unité fermée n'est pas compacte (théorème de Riesz). La suite $(e_n)$ des vecteurs de base dans $\ell^2(\mathbb{N})$ est bornée mais n'admet aucune sous-suite convergente.
*   La borne est indispensable : $(u_n) = n$ est non bornée et n'admet aucune sous-suite convergente dans $\mathbb{R}$.
*   La limite $\ell$ n'est pas nécessairement unique (la suite peut avoir plusieurs valeurs d'adhérence) ; le théorème affirme l'existence d'une valeur d'adhérence.
*   **Valeurs d'adhérence :** L'ensemble des limites de sous-suites extraites de $(u_n)$ est un fermé borné non vide de $\mathbb{R}^d$.

**Extensions :**

*   Valable dans tout espace métrique compact (c'est même une caractérisation équivalente de la compacité séquentielle).
*   En dimension infinie, il faut remplacer par la compacité faible (théorème de Banach-Alaoglu), hors programme MP*.
*   Dans $\mathbb{C}^d \simeq \mathbb{R}^{2d}$ : le théorème s'applique directement.

**Pièges classiques :**
*   ❌ Confondre « bornée » et « convergente » : une suite bornée n'est pas nécessairement convergente (ex : $u_n = (-1)^n$).
*   ❌ Oublier que l'extraction $\varphi$ doit être strictement croissante (définition de sous-suite).
*   ❌ Appliquer ce théorème dans un evn de dimension infinie sans vérification de compacité.
*   ❌ Confondre « admet une sous-suite convergente » et « est de Cauchy ».

---

## FLASHCARD 2 — À connaître 1 : Procédé diagonal

### RECTO
**À connaître 1 — Procédé diagonal de Cantor**

**Contexte :** On dispose d'une suite $(u_n)_{n \in \mathbb{N}}$ et d'une famille dénombrable de propriétés $\mathcal{P}_k$, $k \in \mathbb{N}$.

Énoncer le procédé d'extraction diagonale et son utilité principale.

### VERSO
**Hypothèses complètes :**

*   $(u_n)_{n \in \mathbb{N}}$ est une suite dans un ensemble $X$.
*   Pour chaque $k \in \mathbb{N}$, il existe une extractrice $\varphi_k : \mathbb{N} \to \mathbb{N}$ strictement croissante telle que la sous-suite $(u_{\varphi_k(n)})_n$ vérifie la propriété $\mathcal{P}_k$.

**Énoncé formel :**

On construit par récurrence une suite d'extractrices emboîtées :
$$ \varphi_0, \quad \varphi_1 = \psi_1 \circ \varphi_0, \quad \varphi_2 = \psi_2 \circ \varphi_1, \dots $$
telles que $(u_{\varphi_k(n)})_n$ vérifie $\mathcal{P}_0, \mathcal{P}_1, \dots, \mathcal{P}_k$ simultanément.

La suite diagonale est définie par :
$$ \sigma(n) = \varphi_n(n), \quad n \in \mathbb{N}. $$
Alors $\sigma$ est strictement croissante et $(u_{\sigma(n)})_{n \in \mathbb{N}}$ vérifie simultanément toutes les propriétés $\mathcal{P}_k$, $k \in \mathbb{N}$.

**Démonstration (Esquisse) :**

*   **Construction :** $\varphi_0$ extrait une sous-suite vérifiant $\mathcal{P}_0$ ; $\varphi_1$ extrait de $\varphi_0$ une sous-suite vérifiant $\mathcal{P}_1$ (elle vérifie encore $\mathcal{P}_0$ par sous-extraction), etc.
*   **Diagonale :** Pour $n \ge k$, $\sigma(n) = \varphi_n(n)$ est une extraction de $\varphi_k$, donc vérifie $\mathcal{P}_k$. Ainsi $(u_{\sigma(n)})_{n \ge k}$ vérifie $\mathcal{P}_k$, ce qui est suffisant pour les propriétés asymptotiques.
*   **Stricte croissance de $\sigma$ :** Se vérifie par construction emboîtée.

### 
**Subtilités :**

*   La propriété $\mathcal{P}_k$ n'est vérifiée par la suite diagonale qu'à partir du rang $k$ — suffisant pour les limites.
*   Le procédé nécessite une famille dénombrable de propriétés. Pour une famille indénombrable, il échoue en général.
*   **Usage typique :** Bolzano-Weierstrass en dimension $d$ (extraction coordonnée par coordonnée), compacité séquentielle, normalité des familles de fonctions (Arzelà-Ascoli, hors programme).

**Extensions :**

*   Fondamental en analyse fonctionnelle (extraction d'une sous-suite faiblement convergente).
*   Utilisé dans la preuve du théorème d'Arzelà-Ascoli.

**Pièges classiques :**
*   ❌ Croire que la suite diagonale vérifie $\mathcal{P}_k$ dès $n=0$ — elle ne le vérifie que pour $n \ge k$.
*   ❌ Oublier de vérifier que $\sigma$ est bien strictement croissante.
*   ❌ Appliquer le procédé à une famille non dénombrable.

---

## FLASHCARD 3 — Théorème 2 : Limite monotone

### RECTO
**Théorème 2 — Théorème de la limite monotone**

**Contexte :** Soit $(u_n)_{n \in \mathbb{N}}$ une suite réelle.

Énoncer le théorème de la limite monotone dans ses deux cas, avec conclusion précise sur la valeur de la limite.

### VERSO
**Hypothèses complètes :**

*   $(u_n)_{n \in \mathbb{N}} \in \mathbb{R}^{\mathbb{N}}$, suite de réels.
*   $(u_n)$ est monotone (croissante ou décroissante au sens large).

**Énoncé formel :**

Si $(u_n)$ est croissante :
$$ u_n \xrightarrow[n \to +\infty]{} \sup_{n \in \mathbb{N}} u_n \in \mathbb{R} \cup \{+\infty\}. $$

Si $(u_n)$ est décroissante :
$$ u_n \xrightarrow[n \to +\infty]{} \inf_{n \in \mathbb{N}} u_n \in \mathbb{R} \cup \{-\infty\}. $$

Plus précisément :

*   Si $(u_n)$ est croissante et majorée, alors $(u_n)$ converge dans $\mathbb{R}$ vers $\sup_n u_n$.
*   Si $(u_n)$ est croissante et non majorée, alors $u_n \to +\infty$.

**Démonstration (Esquisse) :**

Soit $\ell = \sup_n u_n \in \mathbb{R} \cup \{+\infty\}$.
*   Si $\ell \in \mathbb{R}$ : par définition du supremum, $\forall \varepsilon > 0, \exists N, u_N > \ell - \varepsilon$. Par croissance, $\forall n \ge N, \ell - \varepsilon < u_N \le u_n \le \ell$, donc $|u_n - \ell| < \varepsilon$.
*   Si $\ell = +\infty$ : $\forall M > 0, \exists N, u_N > M$, donc $\forall n \ge N, u_n \ge u_N > M$.

### 
**Subtilités :**

*   Ce théorème est une conséquence directe de la propriété de la borne supérieure de $\mathbb{R}$ (complétude archimédienne) — c'est même quasi-équivalent.
*   Monotonie au sens large suffit (pas besoin de stricte).
*   Le théorème est faux dans $\mathbb{Q}$ : une suite croissante bornée de rationnels peut converger vers un irrationnel (donc pas de limite dans $\mathbb{Q}$).

**Extensions :**

*   Analogue pour les fonctions monotones : Toute fonction $f : \mathbb{R} \to \mathbb{R}$ monotone admet des limites à gauche et à droite en tout point (théorème de la limite monotone pour les fonctions).
*   Pas d'analogue direct en dimension $\ge 2$ (la notion d'ordre total disparaît).

**Pièges classiques :**
*   ❌ Oublier que la limite peut être $+\infty$ ou $-\infty$ (la suite converge dans $\overline{\mathbb{R}}$ toujours).
*   ❌ Confondre la limite avec la valeur atteinte : $\sup_n u_n$ peut ne pas être atteint.
*   ❌ Utiliser ce théorème sans vérifier la monotonie (une suite bornée non monotone n'est pas nécessairement convergente).

---

## FLASHCARD 4 — Théorème 3 : Limite par encadrement / minoration / majoration

### RECTO
**Théorème 3 — Limite par encadrement, minoration, majoration (Gendarmes)**

**Contexte :** Soient $(u_n), (v_n), (w_n)$ des suites réelles.

Énoncer les trois versions du théorème des gendarmes (encadrement, minoration vers $+\infty$, majoration vers $-\infty$) avec hypothèses exactes.

### VERSO
**Hypothèses et énoncé formel :**

**Version 1 — Encadrement (convergence) :**
$$ (\exists N_0 \in \mathbb{N}, \forall n \ge N_0, v_n \le u_n \le w_n) \text{ et } (v_n \to \ell \text{ et } w_n \to \ell, \ell \in \mathbb{R}) \implies u_n \to \ell. $$

**Version 2 — Minoration (limite $+\infty$) :**
$$ (\exists N_0 \in \mathbb{N}, \forall n \ge N_0, u_n \ge v_n) \text{ et } (v_n \to +\infty) \implies u_n \to +\infty. $$

**Version 3 — Majoration (limite $-\infty$) :**
$$ (\exists N_0 \in \mathbb{N}, \forall n \ge N_0, u_n \le w_n) \text{ et } (w_n \to -\infty) \implies u_n \to -\infty. $$

**Démonstration (Esquisse) :**

*   **Version 1 :** $|u_n - \ell| \le \max(|v_n - \ell|, |w_n - \ell|) \to 0$ (car $v_n \le u_n \le w_n$ et $v_n, w_n \to \ell$).
*   **Version 2 :** $\forall M > 0, \exists N_1$ tel que $n \ge N_1 \implies v_n > M$, donc $u_n \ge v_n > M$ pour $n \ge \max(N_0, N_1)$.

### 
**Subtilités :**

*   L'encadrement n'est requis qu'à partir d'un certain rang $N_0$ (condition asymptotique).
*   Les limites de $v_n$ et $w_n$ doivent être égales (même valeur $\ell \in \mathbb{R}$) pour la version convergence. Si $v_n \to \ell_1 \neq \ell_2 \leftarrow w_n$, on ne peut rien conclure.
*   **Version vectorielle :** Le théorème d'encadrement n'existe pas directement en dimension $\ge 2$ (pas d'ordre total), mais on peut l'appliquer coordonnée par coordonnée ou via la norme : si $\|u_n - \ell\| \le w_n \to 0$, alors $u_n \to \ell$.

**Extensions :**

*   Analogue pour les fonctions : si $v(x) \le f(x) \le w(x)$ au voisinage de $a$ et $v(x), w(x) \to \ell$, alors $f(x) \to \ell$.
*   Utilisé massivement pour prouver $n^{1/n} \to 1$, $\frac{\ln n}{n} \to 0$, etc.

**Pièges classiques :**
*   ❌ Appliquer l'encadrement avec $v_n \to \ell_1$ et $w_n \to \ell_2$ avec $\ell_1 \neq \ell_2$ — invalide.
*   ❌ Oublier que la conclusion ne donne pas $v_n \le u_n \le w_n$ pour tout $n$, seulement pour $n$ assez grand.
*   ❌ Confondre avec le théorème de comparaison (qui ne donne qu'une inégalité sur les limites, pas une égalité).

---

## FLASHCARD 5 — Théorème 4 : Valeurs intermédiaires

### RECTO
**Théorème 4 — Théorème des valeurs intermédiaires (TVI)**

**Contexte :** Soit $f : I \to \mathbb{R}$ une fonction définie sur un intervalle $I \subseteq \mathbb{R}$.

Énoncer le TVI avec hypothèses exactes. Donner également la version avec $f(a) \cdot f(b) < 0$.

### VERSO
**Hypothèses complètes :**

*   $I \subseteq \mathbb{R}$ est un intervalle (connexe par arcs dans $\mathbb{R}$).
*   $f : I \to \mathbb{R}$ est continue sur $I$.
*   $a, b \in I$ avec $a < b$.

**Énoncé formel :**

$$ \forall \gamma \text{ compris entre } f(a) \text{ et } f(b), \quad \exists c \in [a, b], \quad f(c) = \gamma. $$

Formellement : si $f(a) \le f(b)$,
$$ \forall \gamma \in [f(a), f(b)], \quad \exists c \in [a, b], \quad f(c) = \gamma. $$

**Corollaire immédiat (annulation) :**
$$ f(a) \cdot f(b) < 0 \implies \exists c \in ]a, b[, \quad f(c) = 0. $$

**Démonstration (Esquisse) :**

*   **Méthode de la borne supérieure :** Poser $c = \sup \{x \in [a, b] \mid f(x) \le \gamma\}$. Par continuité de $f$ et définition du supremum, $f(c) = \gamma$.
*   **Alternative (dichotomie) :** Construire des suites adjacentes par dichotomie ; par complétude de $\mathbb{R}$ et continuité de $f$, la limite commune vérifie $f(c) = \gamma$.
*   **Clé :** Connexité par arcs de $[a, b]$ + continuité $\implies$ l'image est un intervalle.

### 
**Subtilités :**

*   $c$ n'est pas nécessairement unique (peut y en avoir plusieurs).
*   L'intervalle est indispensable : sur $\mathbb{Q}$ (non connexe), le TVI est faux (ex : $f(x) = x^2$ sur $\mathbb{Q}$, $\gamma = 2$, pas d'antécédent rationnel).
*   Le TVI garantit l'existence mais pas la constructivité de $c$ (en général).
*   Dans le corollaire : on peut affirmer $c \in ]a, b[$ (ouvert) car $f(a)$ et $f(b)$ sont de signes strictement opposés, donc $f(c) = 0 \neq f(a)$ et $\neq f(b)$.

**Extensions :**

*   **Version vectorielle :** Le TVI se généralise : si $f : [a, b] \to \mathbb{R}^d$ est continue, l'image $f([a, b])$ est un connexe par arcs de $\mathbb{R}^d$ (mais pas nécessairement un intervalle en dimension $\ge 2$).
*   **Version topologique :** L'image continue d'un connexe est connexe.
*   Le TVI est à la base des méthodes de dichotomie numérique.

**Pièges classiques :**
*   ❌ Appliquer le TVI à une fonction définie sur une réunion d'intervalles disjoints (pas un intervalle).
*   ❌ Conclure à l'unicité de $c$ sans hypothèse supplémentaire (stricte monotonie).
*   ❌ Oublier la continuité — une fonction discontinue peut ne pas prendre toutes les valeurs intermédiaires.
*   ❌ Écrire $c \in [a, b]$ alors que $f(a) \cdot f(b) < 0$ assure $c \in ]a, b[$.

---

## FLASHCARD 6 — Corollaire 1

### RECTO
**Corollaire 1 — Image d'un intervalle par une fonction continue**

**Contexte :** Soit $f : I \to \mathbb{R}$ continue sur un intervalle $I$.

Énoncer le corollaire sur l'image d'un intervalle par une fonction continue. Traiter le cas compact séparément.

### VERSO
**Hypothèses complètes :**

*   $I \subseteq \mathbb{R}$ est un intervalle (quelconque : ouvert, fermé, borné, non borné).
*   $f : I \to \mathbb{R}$ est continue sur $I$.

**Énoncé formel :**

$$ f(I) \text{ est un intervalle de } \mathbb{R}. $$

**Cas particulier fondamental (compact) :**

Si de plus $I = [a, b]$ est un segment ($a < b$, $a, b \in \mathbb{R}$), alors :
$$ f([a, b]) = [m, M] \quad \text{avec } m = \min_{[a, b]} f \in \mathbb{R}, \quad M = \max_{[a, b]} f \in \mathbb{R}. $$
En particulier, $f$ est bornée et atteint ses bornes sur $[a, b]$.

**Démonstration (Esquisse) :**

*   **$f(I)$ est un intervalle :** Découle directement du TVI (toute valeur entre $f(a)$ et $f(b)$ est atteinte, pour tous $a<b$ dans $I$).
*   **Cas compact :** $f([a, b])$ est une partie compacte de $\mathbb{R}$ (image continue d'un compact), donc fermée et bornée, donc de la forme $[m, M]$.

### 
**Subtilités :**

*   Sur un intervalle ouvert ou non borné, $f$ continue n'est pas nécessairement bornée ni n'atteint ses bornes : ex. $f(x) = x$ sur $]0, 1[$, $f(x) = 1/x$ sur $]0, 1]$.
*   L'image est un intervalle mais pas nécessairement fermé/borné.
*   Le fait que $m$ et $M$ soient atteints (et non seulement des bornes infimales) est crucial — c'est le **théorème de Weierstrass**.

**Extensions :**

*   En dimension $\ge 2$ : l'image d'un connexe par arcs est un connexe par arcs ; l'image d'un compact est un compact.

**Pièges classiques :**
*   ❌ Conclure que $f$ est bornée sur un intervalle quelconque sans hypothèse de compacité.
*   ❌ Confondre « $f(I)$ est un intervalle » et « $f$ est injective ».

---

## FLASHCARD 7 — Proposition 1

### RECTO
**Proposition 1 — Continuité des fonctions monotones, réciproque d'une bijection continue**

**Contexte :** Soit $f : I \to \mathbb{R}$ définie sur un intervalle $I \subseteq \mathbb{R}$.

Énoncer la proposition sur la continuité d'une fonction monotone sur un intervalle et le théorème de la bijection réciproque.

### VERSO
**Hypothèses et énoncé :**

**Partie 1 — Discontinuités d'une fonction monotone :**

$f : I \to \mathbb{R}$ monotone. Alors $f$ admet en tout point $x_0 \in I$ des limites à gauche et à droite (dans $\overline{\mathbb{R}}$), et l'ensemble des points de discontinuité de $f$ est au plus dénombrable.

**Partie 2 — Théorème de la bijection :**

$$ f : [a, b] \to \mathbb{R} \text{ continue et strictement monotone} \implies f \text{ est un homéomorphisme de } [a, b] \text{ sur } [f(a), f(b)] \text{ (ou } [f(b), f(a)]). $$

Plus précisément :

*   $f$ est bijective de $[a, b]$ sur $f([a, b]) = [\min(f(a), f(b)), \max(f(a), f(b))]$.
*   La réciproque $f^{-1}$ est continue et strictement monotone (même sens de variation).

**Démonstration (Esquisse) :**

*   **Injectivité :** Stricte monotonie $\implies$ injectivité immédiate.
*   **Surjectivité :** TVI donne que l'image est un intervalle ; la stricte monotonie identifie cet intervalle à $[f(a), f(b)]$.
*   **Continuité de $f^{-1}$ :** Image d'un compact par $f$ est un compact ; $f$ est un homéomorphisme (image d'un ouvert relatif = ouverte relative, car $f$ strictement monotone sur un intervalle).

### 
**Subtilités :**

*   La continuité de $f^{-1}$ est automatique ici (pas besoin de la vérifier séparément) car $[a, b]$ est compact — c'est une propriété générale : une bijection continue d'un compact dans un séparé est un homéomorphisme.
*   Sur un intervalle ouvert ou non compact, la réciproque d'une bijection continue peut ne pas être continue (contre-exemple non trivial hors programme).
*   L'hypothèse « strictement monotone » est indispensable pour l'injectivité.

**Extensions :**

*   En dimension $\ge 2$, le théorème de la fonction inverse (Cauchy-Lipschitz différentiel) généralise ce résultat.

**Pièges classiques :**
*   ❌ Confondre monotonie (au sens large) et stricte monotonie pour la bijectivité.
*   ❌ Oublier de préciser l'intervalle d'arrivée exact.

---

## FLASHCARD 8 — Théorème 5 : Continuité uniforme (Heine)

### RECTO
**Théorème 5 — Théorème de Heine (continuité uniforme sur un segment)**

**Contexte :** Soit $f : [a, b] \to E$ une fonction définie sur un segment.

Énoncer le théorème de Heine avec hypothèses exactes, en précisant l'espace d'arrivée.

### VERSO
**Hypothèses complètes :**

*   $a < b$, $a, b \in \mathbb{R}$ (segment $[a, b]$ compact).
*   $E$ est un espace métrique (ou evn) quelconque (pas nécessairement de dimension finie).
*   $f : [a, b] \to E$ est continue sur $[a, b]$.

**Énoncé formel :**

$f$ est **uniformément continue** sur $[a, b]$ :
$$ \forall \varepsilon > 0, \exists \delta > 0, \forall x, y \in [a, b], \quad |x - y| < \delta \implies d(f(x), f(y)) < \varepsilon. $$

**Démonstration (Esquisse) :**

*   **Par l'absurde :** Si $f$ n'est pas uniformément continue, $\exists \varepsilon_0 > 0, \exists (x_n), (y_n) \in [a, b]$ avec $|x_n - y_n| < 1/n$ et $d(f(x_n), f(y_n)) \ge \varepsilon_0$.
*   **Bolzano-Weierstrass :** $(x_n)$ bornée, on extrait $x_{\varphi(n)} \to c \in [a, b]$. Alors $y_{\varphi(n)} \to c$ aussi.
*   **Continuité de $f$ en $c$ :** $d(f(x_{\varphi(n)}), f(y_{\varphi(n)})) \le d(f(x_{\varphi(n)}), f(c)) + d(f(c), f(y_{\varphi(n)})) \to 0$ — contradiction.

### 
**Subtilités :**

*   La compacité de $[a, b]$ est essentielle : $f(x) = 1/x$ est continue sur $]0, 1]$ mais pas uniformément continue.
*   Le théorème s'étend à tout espace métrique compact (pas seulement $[a, b]$).
*   L'espace d'arrivée $E$ peut être un evn quelconque (de dimension finie ou infinie) — la preuve ne l'utilise que comme espace métrique.

**Extensions :**

*   **Caractérisation :** Sur $]a, b[$, $f$ est uniformément continue $\iff f$ se prolonge par continuité en $a$ et en $b$.
*   L'uniforme continuité implique : $f$ transforme les suites de Cauchy en suites de Cauchy, permettant le prolongement aux complétés.

**Pièges classiques :**
*   ❌ Confondre continuité et continuité uniforme : la continuité uniforme est plus forte et est une propriété globale.
*   ❌ Oublier que $\delta$ ne dépend pas du point $x$ (uniformité).
*   ❌ Appliquer Heine sur un intervalle ouvert ou non borné.

---

## FLASHCARD 9 — Théorème 6 : CNS d'extremum local (point intérieur)

### RECTO
**Théorème 6 — Condition nécessaire d'extremum local en un point intérieur (scalaire)**

**Contexte :** Soit $f : I \to \mathbb{R}$ dérivable sur un intervalle ouvert $I$.

Énoncer la condition nécessaire d'extremum local pour une fonction dérivable en un point intérieur.

### VERSO
**Hypothèses complètes :**

*   $I \subseteq \mathbb{R}$ est un intervalle ouvert.
*   $f : I \to \mathbb{R}$ est dérivable en $x_0 \in I$.
*   $x_0$ est un extremum local de $f$ (maximum ou minimum local).

**Énoncé formel :**

$$ f'(x_0) = 0. $$

**Démonstration (Esquisse) :**

Si $x_0$ est un minimum local : $\forall h > 0$ assez petit, $\frac{f(x_0+h)-f(x_0)}{h} \ge 0$ et $\frac{f(x_0-h)-f(x_0)}{-h} \le 0$. En passant à la limite, $f'(x_0) \ge 0$ et $f'(x_0) \le 0$, donc $f'(x_0) = 0$.

### 
**Subtilités :**

*   C'est une condition nécessaire, non suffisante : $f(x) = x^3$ en $x_0=0$ vérifie $f'(0)=0$ sans être un extremum local.
*   Le point doit être **intérieur** : en un point frontière (ex : $x_0=a$ dans $[a, b]$), $f'(a)=0$ n'est pas nécessaire pour un extremum.
*   La dérivabilité est indispensable : $f(x) = |x|$ admet un minimum en $0$ sans être dérivable en $0$.
*   Les points où $f'(x_0)=0$ s'appellent **points critiques** (ou stationnaires).

**Extensions :**

*   Condition suffisante d'ordre 2 : Si $f''(x_0) > 0$, alors $x_0$ est un minimum local strict (voir Thm 45).
*   En dimension $\ge 2$ : CNS $\implies df(x_0) = 0$ (différentielle nulle), voir Thm 42.

**Pièges classiques :**
*   ❌ Confondre CNS et condition suffisante.
*   ❌ Oublier de vérifier que $x_0$ est intérieur à $I$.
*   ❌ Conclure à un extremum dès que $f'(x_0)=0$.

---

## FLASHCARD 10 — Théorème 7 : Rolle

### RECTO
**Théorème 7 — Théorème de Rolle**

**Contexte :** Soit $f : [a, b] \to \mathbb{R}$, avec $a < b$.

Énoncer le théorème de Rolle avec toutes ses hypothèses et sa conclusion précise.

### VERSO
**Hypothèses complètes :**

*   $-\infty < a < b < +\infty$ (segment borné).
*   $f : [a, b] \to \mathbb{R}$ est continue sur $[a, b]$.
*   $f$ est dérivable sur $]a, b[$ (ouvert strict).
*   $f(a) = f(b)$.

**Énoncé formel :**

$$ \exists c \in ]a, b[, \quad f'(c) = 0. $$

**Démonstration (Esquisse) :**

Par le théorème de Weierstrass, $f$ atteint son maximum $M$ et son minimum $m$ sur $[a, b]$.
*   **Cas trivial :** Si $M=m$, $f$ est constante, $f' \equiv 0$ et tout $c \in ]a, b[$ convient.
*   **Cas non trivial :** $M \neq m$. L'un au moins (disons $M$) est atteint en un $c \in ]a, b[$ (car $f(a)=f(b)$, si $M=f(a)$ alors $m$ est atteint à l'intérieur). Par le Théorème 6, $f'(c)=0$.

### 
**Subtilités :**

*   $c \in ]a, b[$ : l'intervalle est ouvert — la conclusion ne dit rien sur les bords.
*   Les trois hypothèses sont indispensables : continuité sur $[a, b]$, dérivabilité sur $]a, b[$, et $f(a)=f(b)$.
*   Contre-exemple si $f$ non continue en $a$ ou $b$ : $f(x) = \begin{cases} x & x \in ]0, 1[ \\ 0 & x=0, 1 \end{cases}$.
*   Contre-exemple si $f$ non dérivable en un point : $f(x) = |x - 1/2|$ sur $[0, 1]$.

**Extensions :**

*   Rôle central : sert à démontrer le théorème des accroissements finis (TAF), Taylor-Lagrange, inégalité de TAF.
*   **Rolle et zéros :** Si $P$ est un polynôme de degré $n$, $P'$ a au moins $n-1$ zéros réels (si $P$ a $n$ zéros réels distincts). Application : $P$ a au plus $n$ zéros.
*   Pas de généralisation vectorielle directe : si $f : [a, b] \to \mathbb{R}^d$ avec $d \ge 2$, Rolle est faux en général (ex : $f(t) = (\cos 2\pi t, \sin 2\pi t)$, $f(0)=f(1)$ mais $f'(t) \neq 0$ pour tout $t$).

**Pièges classiques :**
*   ❌ Appliquer Rolle à $f : [a, b] \to \mathbb{R}^d$ avec $d \ge 2$ — invalide.
*   ❌ Oublier que la dérivabilité n'est requise que sur $]a, b[$ (ouvert), pas en $a$ et $b$.
*   ❌ Confondre Rolle et TAF (TAF ne demande pas $f(a)=f(b)$).

---

## FLASHCARD 11 — Théorème 8 : Accroissements finis

### RECTO
**Théorème 8 — Théorème des accroissements finis (TAF)**

**Contexte :** Soit $f : [a, b] \to \mathbb{R}$, avec $a < b$.

Énoncer le TAF (version égalité) avec hypothèses exactes. Préciser l'ouverture de l'intervalle où vit $c$.

### VERSO
**Hypothèses complètes :**

*   $-\infty < a < b < +\infty$.
*   $f : [a, b] \to \mathbb{R}$ continue sur $[a, b]$.
*   $f$ dérivable sur $]a, b[$.

**Énoncé formel :**

$$ \exists c \in ]a, b[, \quad f(b) - f(a) = f'(c)(b - a). $$

**Démonstration (Esquisse) :**
Appliquer le théorème de Rolle à la fonction auxiliaire :
$$ g(x) = f(x) - \frac{f(b)-f(a)}{b-a}(x-a). $$
On vérifie $g(a) = f(a) = g(b)$ (en développant), $g$ est continue sur $[a, b]$ et dérivable sur $]a, b[$. Rolle donne $c \in ]a, b[$ avec $g'(c)=0$, i.e., $f'(c) = \frac{f(b)-f(a)}{b-a}$.

### 
**Subtilités :**

*   $c \in ]a, b[$ strict — jamais en $a$ ou $b$.
*   **Pas de généralisation en dimension $\ge 2$ (version égalité) :** si $f : [a, b] \to \mathbb{R}^d$, il n'existe pas nécessairement de $c$ tel que $f(b) - f(a) = f'(c)(b - a)$ (contre-exemple : courbe de Rolle). C'est pourquoi l'inégalité des accroissements finis (Thm 9) est fondamentale.
*   Le TAF (version égalité) est strictement réel-scalaire.

**Extensions :**

*   Donne immédiatement : si $f' \ge 0$ sur $]a, b[$, alors $f$ est croissante sur $[a, b]$.
*   Utilisé pour l'unicité dans Cauchy-Lipschitz.

**Pièges classiques :**
*   ❌ Appliquer le TAF (version égalité) à des fonctions à valeurs vectorielles.
*   ❌ Oublier la continuité sur $[a, b]$ (fermé) et ne garder que la dérivabilité sur $]a, b[$.
*   ❌ Confondre TAF et Rolle.

---

## FLASHCARD 12 — Théorème 9 : Inégalité des accroissements finis

### RECTO
**Théorème 9 — Inégalité des accroissements finis (IAF)**

**Contexte :** Soit $f : [a, b] \to E$ où $E$ est un espace vectoriel normé.

Énoncer l'inégalité des accroissements finis dans le cadre vectoriel, avec hypothèses exactes.

### VERSO
**Hypothèses complètes :**

*   $-\infty < a < b < +\infty$.
*   $E$ est un espace vectoriel normé quelconque (dimension finie ou infinie).
*   $f : [a, b] \to E$ est continue sur $[a, b]$ et dérivable sur $]a, b[$.
*   Il existe $M \ge 0$ tel que $\forall t \in ]a, b[, \|f'(t)\| \le M$.

**Énoncé formel :**

$$ \|f(b) - f(a)\| \le M(b - a). $$

**Démonstration (Esquisse) :**

*   Appliquer le TAF réel à la fonction réelle $\varphi(t) = \|\cdot\| \circ f$ ne fonctionne pas directement (la norme n'est pas dérivable en général).
*   **Méthode correcte :** Pour tout $\xi \in E^*$ avec $\|\xi\| \le 1$, la fonction $t \mapsto \xi(f(t))$ est réelle, continue sur $[a, b]$, dérivable sur $]a, b[$, avec $|\xi(f(t))'| = |\xi(f'(t))| \le \|\xi\|\|f'(t)\| \le M$. Le TAF scalaire donne $|\xi(f(b)) - \xi(f(a))| \le M(b-a)$. On conclut par $\|f(b) - f(a)\| = \sup_{\|\xi\| \le 1} |\xi(f(b) - f(a))|$ (Hahn-Banach ou caractérisation de la norme).
*   **Alternative en dimension finie :** Taylor reste intégral donne $f(b) - f(a) = \int_a^b f'(t) dt$ et $\|f(b) - f(a)\| \le \int_a^b \|f'(t)\| dt \le M(b-a)$.

### 
**Subtilités :**

*   C'est le **bon énoncé vectoriel** : contrairement au TAF (version égalité), l'IAF est valable pour $f$ à valeurs dans un evn quelconque, y compris dimension infinie.
*   La borne $M$ doit majorer $\|f'(t)\|$ sur tout $]a, b[$.
*   **Inégalité stricte :** Si $\|f'(t)\| < M$ sur $]a, b[$, on peut avoir égalité dans l'IAF (ex : $f$ linéaire).

**Extensions :**

*   Utilisé massivement : unicité Cauchy-Lipschitz, majoration d'erreurs, continuité lipschitzienne.
*   Corollaire : Si $f' \equiv 0$ sur $]a, b[$, alors $f$ est constante sur $[a, b]$ (prendre $M=0$).
*   **Version intégrale :** $\|f(b) - f(a)\| \le \int_a^b \|f'(t)\| dt$ (plus précis, cf. Taylor reste intégral).

**Pièges classiques :**
*   ❌ Utiliser le TAF (version égalité) pour les fonctions vectorielles.
*   ❌ Majorer $\|f'(t)\|$ seulement en certains points — la borne doit être uniforme.
*   ❌ Oublier que l'IAF nécessite quand même la continuité sur $[a, b]$ et la dérivabilité sur $]a, b[$.

---

## FLASHCARD 13 — Théorème 10 : Limite de la dérivée, prolongement $C^1$

### RECTO
**Théorème 10 — Théorème de la limite de la dérivée / Prolongement $C^1$**

**Contexte :** Soit $f : ]a, b[ \to E$ (ou $f : [a, b[ \to E$) dérivable.

Énoncer le théorème de la limite de la dérivée et le théorème de prolongement $C^1$.

### VERSO
**Hypothèses complètes :**

*   $E$ est un espace vectoriel normé complet (de Banach) — dimension quelconque.
*   $f : ]a, b[ \to E$ (ou $[a, b[$) est dérivable sur $]a, b[$ (resp. $]a, b[$).
*   $f$ est continue en $a$ (si on traite $[a, b[$, sinon on suppose $f$ prolongeable par continuité en $a$).
*   $f'$ admet une limite $\ell \in E$ en $a^+$ : $\lim_{t \to a^+} f'(t) = \ell$.

**Énoncé formel (prolongement $C^1$) :**

On définit $\tilde{f}(a) = \lim_{t \to a^+} f(t) \in E$ (limite qui existe par IAF).
Alors $\tilde{f}$ est dérivable en $a$ à droite et $\tilde{f}'(a) = \ell$.

En particulier, si $f$ est continue sur $[a, b]$, dérivable sur $]a, b[$, et si $f'$ admet une limite $\ell$ en $a^+$ (resp. $b^-$), alors :
$f$ est dérivable en $a$ (resp. $b$) et $f'(a) = \ell$ (resp. $f'(b) = \ell$).

**Corollaire (critère $C^1$) :**

Si $f : [a, b] \to E$ est continue sur $[a, b]$, dérivable sur $]a, b[$, et si $f'$ se prolonge par continuité sur $[a, b]$, alors $f \in C^1([a, b], E)$.

**Démonstration (Esquisse) :**

Pour $x > a$, $\frac{f(x) - f(a)}{x - a} = \frac{1}{x-a} \int_a^x f'(t) dt \to \ell$ par le lemme de la moyenne (si $f' \to \ell$ uniformément, on peut intervertir limite et intégrale).
Alternativement : IAF appliqué à $f(x) - f(a) - \ell(x-a)$ donne $\|f(x) - f(a) - \ell(x-a)\| \le \sup_{]a, x[} \|f'(t) - \ell\| \cdot (x-a) = o(x-a)$.

### 
**Subtilités :**

*   La complétude de $E$ est utilisée pour garantir l'existence de la limite $\lim_{t \to a^+} f(t)$ via l'IAF (suite de Cauchy).
*   Ce théorème est fondamental pour vérifier la régularité $C^1$ en pratique : on dérive, on regarde la limite de la dérivée.
*   **Attention :** La limite de $f'$ en $a$ implique la dérivabilité de $f$ en $a$ et $f'(a) = \lim f'$ — mais on a besoin de la continuité de $f$ en $a$ ou de l'existence de la limite de $f$ en $a$.

**Extensions :**

*   Généralisation aux fonctions $C^k$ : si $f^{(k)}$ admet une limite continue, alors $f \in C^k$.
*   Utilisé pour prouver la régularité des séries de fonctions et des intégrales à paramètre.

**Pièges classiques :**
*   ❌ Oublier de vérifier la continuité de $f$ en $a$ (ou l'existence de $\lim_{t \to a^+} f(t)$).
*   ❌ Appliquer à $E$ non complet (alors la limite de $f$ en $a$ peut ne pas exister dans $E$).
*   ❌ Confondre « $f'$ admet une limite » et « $f'$ est continue » — ce sont des propriétés équivalentes ici (c'est le cœur du théorème).

---

## FLASHCARD 14 — Théorème 11 : Taylor reste intégral

### RECTO
**Théorème 11 — Formule de Taylor avec reste intégral**

**Contexte :** Soit $f : I \to E$, $I$ intervalle de $\mathbb{R}$, $E$ evn.

Énoncer la formule de Taylor avec reste intégral, en précisant la régularité requise, la nature de l'intervalle, et l'espace d'arrivée.

### VERSO
**Hypothèses complètes :**

*   $I \subseteq \mathbb{R}$ intervalle, $a, b \in I$.
*   $E$ est un espace vectoriel normé (dimension quelconque, mais $E$ doit permettre l'intégration — e.g., $E$ de Banach).
*   $f \in C^{n+1}(I, E)$ : $f$ est $(n+1)$ fois continûment dérivable sur $I$.

**Énoncé formel :**

$$ f(b) = \sum_{k=0}^n \frac{(b-a)^k}{k!} f^{(k)}(a) + \int_a^b \frac{(b-t)^n}{n!} f^{(n+1)}(t) dt. $$

Le terme $R_n(b) = \int_a^b \frac{(b-t)^n}{n!} f^{(n+1)}(t) dt$ est le reste intégral d'ordre $n$.

**Démonstration (Esquisse) :**
Récurrence sur $n$, en appliquant une intégration par parties au reste :
$$ \int_a^b \frac{(b-t)^n}{n!} f^{(n+1)}(t) dt = \left[ - \frac{(b-t)^{n+1}}{(n+1)!} f^{(n+1)}(t) \right]_a^b + \int_a^b \frac{(b-t)^{n+1}}{(n+1)!} f^{(n+2)}(t) dt $$
Le terme évalué donne $\frac{(b-a)^{n+1}}{(n+1)!} f^{(n+1)}(a)$ et le reste se déplace à l'ordre $n+1$.

### 
**Subtilités :**

*   La régularité requise est $f \in C^{n+1}$ (pas seulement $C^n$) — la dérivée d'ordre $n+1$ doit exister et être continue.
*   Formule valable pour $E$ evn quelconque (vectoriel) — c'est l'un des grands avantages du reste intégral sur le reste de Lagrange.
*   Le reste intégral donne une majoration immédiate : $\|R_n(b)\| \le \frac{|b-a|^{n+1}}{(n+1)!} \sup_{t \in [a, b]} \|f^{(n+1)}(t)\|$ (Thm 12).

**Extensions :**

*   **Formule de Taylor-Lagrange (Thm 12) :** inégalité déduite du reste intégral par majoration.
*   **Taylor-Young (Thm 13) :** formule asymptotique avec reste en $o((b-a)^n)$, ne requiert que $C^n$ (ou $n$ fois dérivable).
*   La formule s'étend aux fonctions de plusieurs variables (Taylor en dimension $d$, Prop 29).

**Pièges classiques :**
*   ❌ Confondre les ordres : Taylor reste intégral à l'ordre $n$ nécessite $f \in C^{n+1}$, pas $C^n$.
*   ❌ Penser que le reste de Lagrange (scalaire) s'applique au cas vectoriel — faux, seul le reste intégral fonctionne en général.
*   ❌ Oublier le facteur $\frac{(b-t)^n}{n!}$ (et non $\frac{(b-t)^{n+1}}{(n+1)!}$) dans l'intégrant.

---

## FLASHCARD 15 — Théorème 12 : Inégalité de Taylor-Lagrange

### RECTO
**Théorème 12 — Inégalité de Taylor-Lagrange**

**Contexte :** Soit $f : I \to E$, $E$ evn.

Énoncer l'inégalité de Taylor-Lagrange avec hypothèses exactes. Préciser la nature de $E$.

### VERSO
**Hypothèses complètes :**

*   $I \subseteq \mathbb{R}$ intervalle, $a, b \in I$ (avec $a \le b$ ou $b \le a$ — la formule est symétrique en $|b-a|$).
*   $E$ espace vectoriel normé.
*   $f \in C^{n+1}(I, E)$.
*   $M_{n+1} = \sup_{t \in [a, b]} \|f^{(n+1)}(t)\| < +\infty$ (borne bien définie par continuité sur le compact $[a, b]$ si $I$ contient $[a, b]$).

**Énoncé formel :**

$$ \left\| f(b) - \sum_{k=0}^n \frac{(b-a)^k}{k!} f^{(k)}(a) \right\| \le \frac{|b-a|^{n+1}}{(n+1)!} \cdot M_{n+1}. $$

**Démonstration (Esquisse) :**
Majorer le reste intégral (Thm 11) :
$$ \|R_n(b)\| = \left\| \int_a^b \frac{(b-t)^n}{n!} f^{(n+1)}(t) dt \right\| \le \int_a^b \frac{|b-t|^n}{n!} \|f^{(n+1)}(t)\| dt $$
$$ \le M_{n+1} \int_a^b \frac{(b-t)^n}{n!} dt = \frac{|b-a|^{n+1}}{(n+1)!} M_{n+1}. $$

### 
**Subtilités :**

*   La majoration est valable dans tout evn $E$ (vectoriel, dimension quelconque).
*   La constante $(n+1)!$ au dénominateur est cruciale pour les estimations de convergence de séries entières.
*   Si $M_{n+1} \to 0$ quand $n \to \infty$ (à $b-a$ fixé), la série de Taylor converge vers $f$.

**Extensions :**

*   Cas $n=0$ : $\|f(b) - f(a)\| \le M_1 |b-a|$ — c'est l'IAF.
*   Donne des bornes d'erreur explicites pour l'approximation polynomiale.

**Pièges classiques :**
*   ❌ Oublier le facteur $(n+1)!$ (et non $n!$).
*   ❌ Utiliser cette inégalité sans avoir vérifié que $\sup \|f^{(n+1)}\| < +\infty$ sur $[a, b]$.

---

## FLASHCARD 16 — Théorème 13 : Taylor-Young

### RECTO
**Théorème 13 — Formule de Taylor-Young**

**Contexte :** Soit $f : I \to \mathbb{R}$ (ou $f : I \to E$, $E$ evn) de classe $C^n$ (ou seulement $n$ fois dérivable en $a$).

Énoncer la formule de Taylor-Young à l'ordre $n$ en $a$, avec la régularité minimale requise et la précision du reste.

### VERSO
**Hypothèses complètes :**

*   $I \subseteq \mathbb{R}$ intervalle ouvert, $a \in I$.
*   $f : I \to E$ est $n$ fois dérivable en $a$ (condition plus faible que $C^n$).

**Énoncé formel :**

$$ f(a+h) = \sum_{k=0}^n \frac{h^k}{k!} f^{(k)}(a) + o(h^n) \quad \text{quand } h \to 0. $$

Autrement dit :
$$ f(x) = \sum_{k=0}^n \frac{(x-a)^k}{k!} f^{(k)}(a) + o((x-a)^n) \quad \text{quand } x \to a. $$

**Démonstration (Esquisse) :**
Par récurrence sur $n$, en utilisant la règle de L'Hôpital ou une récurrence sur le reste. La clé est :
$$ r_n(h) = f(a+h) - \sum_{k=0}^n \frac{h^k}{k!} f^{(k)}(a), \quad \lim_{h \to 0} \frac{r_n(h)}{h^n} = 0. $$
On prouve cela par récurrence : $r_n'(h) = r_{n-1}'(h) - \frac{h^n}{n!} f^{(n)}(a)$ n'est pas correct.
Correction : $r_n'(h) = f'(a+h) - \sum_{k=1}^n \frac{h^{k-1}}{(k-1)!} f^{(k)}(a)$. Le terme de degré $n$ de la somme dérivée devient le terme de degré $n-1$ de la dérivée. Et $r_{n-1}(h) = o(h^{n-1})$ par hypothèse de récurrence.

### 
**Subtilités :**

*   **Régularité minimale :** Il suffit que $f$ soit $n$ fois dérivable en $a$ (pas nécessairement $C^n$ au voisinage de $a$). C'est plus faible que Taylor reste intégral (qui demande $C^{n+1}$).
*   Le reste est $o(h^n)$ et non $O(h^{n+1})$ — si $f \in C^{n+1}$, on peut préciser $O(h^{n+1})$ via l'inégalité de Taylor-Lagrange.
*   **Unicité du DL :** Le polynôme de Taylor $\sum_{k=0}^n \frac{(x-a)^k}{k!} f^{(k)}(a)$ est l'unique polynôme $P$ de degré $\le n$ tel que $f(x) = P(x) + o((x-a)^n)$.
*   **Cas vectoriel :** La formule est valable pour $f : I \to E$ si $f$ est $n$ fois dérivable en $a$ (avec $E$ evn quelconque).

**Extensions :**

*   **DL composés, produits, quotients :** Toutes les opérations sur les DL sont licites à l'ordre $n$.
*   **Lien avec les séries entières :** Si $f$ est développable en série entière au voisinage de $a$, le DL coïncide avec la série entière.

**Pièges classiques :**
*   ❌ Écrire $o(h^n)$ quand on a prouvé seulement $O(h^n)$ (pas pareil).
*   ❌ Confondre Taylor-Young ($o(h^n)$, faible régularité) et Taylor reste intégral ($C^{n+1}$, reste explicite).
*   ❌ Oublier que le DL est unique — on peut identifier les coefficients terme à terme.
*   ❌ Dériver terme à terme un DL sans justification (on ne peut dériver un DL que si la fonction est $C^{n+1}$, sinon c'est faux en général).

---

# CHAPITRE 2 — Suites et séries, familles sommables

## FLASHCARD 17 — Proposition 2 : Formule de Stirling

### RECTO
**Proposition 2 — Formule de Stirling**

Énoncer la formule de Stirling avec l'équivalent exact et le développement asymptotique.

### VERSO
**Énoncé formel :**

$$ n! \underset{n \to +\infty}{\sim} \sqrt{2\pi n} \left( \frac{n}{e} \right)^n. $$

Plus précisément, il existe un développement asymptotique :
$$ n! = \sqrt{2\pi n} \left( \frac{n}{e} \right)^n \exp\left( \frac{1}{12n} + O\left(\frac{1}{n^2}\right) \right). $$

**Démonstration (Esquisse, idée principale) :**

*   Poser $u_n = \frac{n!}{n^n e^{-n} \sqrt{n}}$. Montrer que $\ln u_n$ converge (calcul via $\sum \ln k - \int \ln$, ou via la formule de Wallis).
*   La constante $\sqrt{2\pi}$ est déterminée en utilisant l'intégrale de Wallis :
    $$ \frac{\pi}{2} = \lim_{n \to \infty} \frac{[(2n)!!]^2}{[(2n-1)!!]^2 \cdot (2n+1)}, \text{ combiné à Stirling.} $$

### 
**Subtilités :**

*   La constante $\sqrt{2\pi}$ n'est pas triviale — c'est la même que dans la densité gaussienne.
*   **Utilisations fréquentes :**
    *   $\binom{2n}{n} \sim \frac{4^n}{\sqrt{\pi n}}$
    *   $\frac{1}{\sqrt{n}} \binom{n}{k}$ pour le TCL discret
    *   Rayon de convergence de séries entières via la règle de d'Alembert.
*   Logarithme : $\ln(n!) = n \ln n - n + \frac{1}{2} \ln(2\pi n) + O(1/n)$.

**Pièges classiques :**
*   ❌ Oublier le facteur $\sqrt{2\pi n}$ (et écrire seulement $(n/e)^n$).
*   ❌ Utiliser Stirling sans préciser qu'on travaille avec un équivalent (et non une égalité).

---

## FLASHCARD 18 — À connaître 2 : Développement asymptotique de $H_n$

### RECTO
**À connaître 2 — Développement asymptotique de la série harmonique $H_n$**

Donner le développement asymptotique de $H_n = \sum_{k=1}^n \frac{1}{k}$ quand $n \to +\infty$, en précisant la constante d'Euler-Mascheroni.

### VERSO
**Énoncé formel :**

$$ H_n = \sum_{k=1}^n \frac{1}{k} = \ln n + \gamma + \frac{1}{2n} - \frac{1}{12n^2} + O\left(\frac{1}{n^4}\right), $$

où $\gamma$ est la constante d'Euler-Mascheroni :
$$ \gamma = \lim_{n \to +\infty} (H_n - \ln n) \approx 0,5772\dots $$

**À connaître impérativement :**
$$ H_n = \ln n + \gamma + o(1) \quad (n \to +\infty), $$
$$ H_n - \ln n \xrightarrow[n \to +\infty]{} \gamma > 0. $$

**Démonstration (Esquisse) :**
Par comparaison série-intégrale (Proposition 3) : $\sum_{k=1}^n \frac{1}{k} - \int_1^n \frac{dt}{t}$ est une suite croissante bornée (ou décroissante selon l'ordre), donc converge vers $\gamma$.

### 
**Subtilités :**

*   $\gamma$ est une constante transcendante (conjecture) — on ne sait toujours pas si elle est irrationnelle.
*   $H_n \to +\infty$ (la série harmonique diverge), mais très lentement : $H_n \sim \ln n$.
*   Utilisations : convergence de séries, équivalents, développements asymptotiques de sommes.

**Pièges classiques :**
*   ❌ Penser que $H_n$ converge.
*   ❌ Confondre $\gamma$ avec $e$ ou $\pi$ — c'est une constante distincte.

---

## FLASHCARD 19 — Théorème 14 : Critère des séries alternées (Leibniz)

### RECTO
**Théorème 14 — Critère des séries alternées (Leibniz)**

**Contexte :** Soit $\sum (-1)^n a_n$ une série alternée.

Énoncer le critère des séries alternées avec hypothèses exactes et conclure sur la convergence et la qualité des restes.

### VERSO
**Hypothèses complètes :**

*   $(a_n)_{n \ge 0}$ est une suite de réels positifs : $a_n \ge 0$ pour tout $n$.
*   $(a_n)$ est décroissante (au sens large) : $a_{n+1} \le a_n$ pour tout $n$.
*   $a_n \xrightarrow[n \to +\infty]{} 0$.

**Énoncé formel :**

La série $\sum_{n \ge 0} (-1)^n a_n$ est convergente.

De plus, si $S = \sum_{n=0}^{+\infty} (-1)^n a_n$ et $S_N = \sum_{n=0}^N (-1)^n a_n$, alors :
$$ \forall N \in \mathbb{N}, \quad |S - S_N| \le a_{N+1}. $$
Et le reste $S - S_N$ est du signe de $(-1)^{N+1} a_{N+1}$ (signe du premier terme négligé).

**Démonstration (Esquisse) :**

Les suites des sommes partielles d'indices pairs $(S_{2p})$ et impairs $(S_{2p+1})$ sont respectivement croissante et décroissante, et encadrent $S$. Elles sont adjacentes (leur différence $a_{2p+1} \to 0$), donc convergent vers la même limite $S$.
$$ |S - S_N| \le |S_{N+1} - S_N| = a_{N+1}. $$

### 
**Subtilités :**

*   Les trois conditions (positivité, décroissance, limite nulle) sont toutes nécessaires : la décroissance seule ne suffit pas si $a_n \not\to 0$.
*   La décroissance n'est requise qu'à partir d'un certain rang (condition asymptotique).
*   Le critère de Leibniz ne donne que la convergence, pas la convergence absolue : $\sum (-1)^n / n$ converge mais $\sum 1/n$ diverge.
*   **Majoration du reste :** $|S - S_N| \le a_{N+1}$ est une majoration effective et simple — très utilisée en pratique.

**Extensions :**

*   **Critère de Dirichlet (généralisation) :** $\sum a_n b_n$ converge si $(a_n)$ décroît vers $0$ et les sommes partielles de $(b_n)$ sont bornées.
*   Le critère de Leibniz est un cas particulier de Dirichlet avec $b_n = (-1)^n$.

**Pièges classiques :**
*   ❌ Oublier la condition de positivité ($a_n \ge 0$).
*   ❌ Confondre convergence et convergence absolue.
*   ❌ Oublier que la majoration du reste est $a_{N+1}$ (le premier terme non inclus dans $S_N$).

---

## FLASHCARD 20 — Théorème 15 : Comparaison à une série absolument convergente, séries de Riemann

### RECTO
**Théorème 15 — Comparaison à une série absolument convergente / Séries de Riemann**

**Contexte :** Soit $\sum u_n$ une série de termes réels ou complexes.

Énoncer le critère de comparaison pour les séries à termes positifs et les séries de Riemann $\sum 1/n^\alpha$.

### VERSO
**Hypothèses et énoncé :**

**Partie 1 — Critère de comparaison (termes positifs) :**

Soient $(u_n), (v_n)$ des suites de réels positifs avec $0 \le u_n \le v_n$ à partir d'un certain rang.

*   $\sum v_n \text{ converge} \implies \sum u_n \text{ converge.}$
*   $\sum u_n \text{ diverge} \implies \sum v_n \text{ diverge.}$

**Partie 2 — Règle de comparaison (équivalents, $\sim$) :**

Si $u_n \sim v_n$ ($u_n, v_n > 0$) :
$\sum u_n$ et $\sum v_n$ ont même nature.

**Partie 3 — Séries de Riemann :**

$$ \sum_{n=1}^{+\infty} \frac{1}{n^\alpha} \begin{cases} \text{converge} & \text{si } \alpha > 1 \\ \text{diverge} & \text{si } \alpha \le 1. \end{cases} $$

**Démonstration (Riemann, esquisse) :**
Par comparaison série-intégrale (Prop 3) : $\int_1^{+\infty} t^{-\alpha} dt$ converge $\iff \alpha > 1$.

### 
**Subtilités :**

*   Le critère de comparaison requiert des termes positifs (ou l'application à $|u_n|$ pour la convergence absolue).
*   Pour $\alpha = 1$ : $\sum 1/n$ diverge (série harmonique) — cas limite souvent piégeux.
*   Si $u_n = O(v_n)$ avec $\sum v_n$ convergente $\implies \sum u_n$ absolument convergente.
*   Si $u_n \sim v_n$ mais que $u_n$ change de signe, la comparaison n'implique pas la même nature pour les séries.

**Extensions :**

*   **Séries de Bertrand (À connaître 3) :** cas limite $\alpha=1$ avec logarithmes.

**Pièges classiques :**
*   ❌ Appliquer la comparaison à des séries de signe quelconque.
*   ❌ Oublier le cas $\alpha=1$ (série harmonique diverge).
*   ❌ Confondre $u_n = O(v_n)$ et $u_n \le v_n$.

---

## FLASHCARD 21 — À connaître 3 : Séries de Bertrand

### RECTO
**À connaître 3 — Séries de Bertrand**

Énoncer la condition de convergence des séries de Bertrand $\sum \frac{1}{n^\alpha (\ln n)^\beta}$.

### VERSO
**Énoncé formel :**

$$ \sum_{n=2}^{+\infty} \frac{1}{n^\alpha (\ln n)^\beta} \begin{cases} \text{converge} & \text{si } \alpha > 1, \text{ ou si } \alpha = 1 \text{ et } \beta > 1, \\ \text{diverge} & \text{si } \alpha < 1, \text{ ou si } \alpha = 1 \text{ et } \beta \le 1. \end{cases} $$

**Démonstration (Esquisse) :**

*   $\alpha \neq 1$ : comparaison aux séries de Riemann.
*   $\alpha = 1$ : comparaison série-intégrale avec $\int_2^{+\infty} \frac{dt}{t (\ln t)^\beta}$, qui converge $\iff \beta > 1$ (changement de variable $u = \ln t$, intégrale de Riemann en $u$).

### 
**Subtilités :**

*   La somme commence à $n=2$ car $\ln 1 = 0$.
*   Cas $\alpha=1, \beta=1$ : $\sum \frac{1}{n \ln n}$ diverge (par comparaison avec $\int \frac{dt}{t \ln t} = \ln(\ln t) \to +\infty$).

**Pièges classiques :**
*   ❌ Oublier la restriction au cas $\alpha=1$ pour la distinction par $\beta$.
*   ❌ Commencer la somme à $n=1$ (division par $\ln 1 = 0$).

---

## FLASHCARD 22 — Théorème 16 : Sommation des relations de comparaison

### RECTO
**Théorème 16 — Sommation des relations de comparaison**

**Contexte :** Soient $\sum u_n$ et $\sum v_n$ des séries à termes positifs.

Énoncer le théorème de sommation des relations de comparaison ($u_n = O(v_n), u_n = o(v_n), u_n \sim v_n$) en termes de restes ou de sommes partielles.

### VERSO
**Hypothèses :** $(u_n), (v_n)$ suites de réels strictement positifs à partir d'un certain rang.

**Énoncé formel :**

Notons $U_n = \sum_{k=0}^n u_k$, $V_n = \sum_{k=0}^n v_k$, $R_n = \sum_{k=n+1}^{+\infty} u_k$ (reste si $\sum u_k < +\infty$).

**Cas $\sum v_n$ diverge :**
*   $u_n \underset{n \to \infty}{\sim} v_n \implies U_n \underset{n \to \infty}{\sim} V_n$.
*   $u_n = o(v_n) \implies U_n = o(V_n)$.

**Cas $\sum v_n$ converge (et $\sum u_n$ converge aussi) :**
*   $u_n \underset{n \to \infty}{\sim} v_n \implies R_n^u \underset{n \to \infty}{\sim} R_n^v$ (restes équivalents).
*   $u_n = o(v_n) \implies R_n^u = o(R_n^v)$.

**Démonstration (Esquisse) :**
Théorème de Cesàro ou lemme de Stolz-Cesàro : si $u_n/v_n \to \ell$, alors $U_n/V_n \to \ell$ (sous $V_n \to +\infty$).

### 
**Subtilités :**

*   Les deux cas (convergent/divergent) donnent des résultats différents — il faut distinguer.
*   La positivité des termes est cruciale (pour les restes et la monotonie des sommes partielles).
*   Ce théorème est très utilisé pour trouver des équivalents de sommes partielles ou de restes.

**Pièges classiques :**
*   ❌ Appliquer à des séries de signe quelconque.
*   ❌ Confondre le cas divergent et le cas convergent.

---

## FLASHCARD 23 — À connaître 4 : Croissance sur/sous-géométrique

### RECTO
**À connaître 4 — Croissance sur-géométrique et sous-géométrique**

Énoncer les critères de croissance sur-géométrique et sous-géométrique d'une suite $(u_n)$ en termes de $u_{n+1}/u_n$, et en déduire la nature de la série $\sum u_n$.

### VERSO
**Énoncé formel :**

Soit $(u_n)$ une suite de réels strictement positifs.

**Sous-géométrique (convergence) :**
$$ \exists q \in [0, 1[, \exists N \in \mathbb{N}, \forall n \ge N, \frac{u_{n+1}}{u_n} \le q \implies \sum u_n \text{ converge}. $$

Plus généralement (règle de d'Alembert) :
$$ \limsup_{n \to \infty} \frac{u_{n+1}}{u_n} < 1 \implies \sum u_n \text{ converge absolument}. $$

**Sur-géométrique (divergence) :**
$$ \exists q > 1, \exists N \in \mathbb{N}, \forall n \ge N, \frac{u_{n+1}}{u_n} \ge q \implies u_n \not\to 0 \implies \sum u_n \text{ diverge}. $$

Plus généralement :
$$ \liminf_{n \to \infty} \frac{u_{n+1}}{u_n} > 1 \implies \sum u_n \text{ diverge}. $$

### 
**Subtilités :**

*   Si $u_{n+1}/u_n \to 1$ : aucune conclusion possible avec ce critère seul.
*   La règle de d'Alembert est stricte : limite strictement $<1$ ou $>1$.
*   **Règle de la racine (Cauchy) :** $\limsup (u_n)^{1/n} < 1 \implies$ convergence ; $> 1 \implies$ divergence (plus puissante que d'Alembert).

**Pièges classiques :**
*   ❌ Conclure sur la nature de $\sum u_n$ quand $u_{n+1}/u_n \to 1$.
*   ❌ Oublier que ces critères supposent $u_n > 0$.

---

## FLASHCARD 24 — Proposition 3 : Comparaison série-intégrale

### RECTO
**Proposition 3 — Comparaison série-intégrale**

**Contexte :** Soit $f : [1, +\infty[ \to \mathbb{R}$ une fonction.

Énoncer la proposition de comparaison série-intégrale, avec hypothèses exactes et double inégalité.

### VERSO
**Hypothèses complètes :**

*   $f : [1, +\infty[ \to \mathbb{R}_+$ est positive, continue (ou localement intégrable) et décroissante sur $[1, +\infty[$.

**Énoncé formel :**

Pour tout $n \ge 1$ :
$$ \int_1^{n+1} f(t) dt \le \sum_{k=1}^n f(k) \le f(1) + \int_1^n f(t) dt. $$

**Conséquence — nature de la série :**
$$ \sum_{n \ge 1} f(n) \text{ converge} \iff \int_1^{+\infty} f(t) dt \text{ converge}. $$

**Démonstration (Esquisse) :**
Par décroissance de $f$ : sur $[k, k+1]$, $f(k+1) \le f(t) \le f(k)$. Intégrer sur $[k, k+1]$ donne $f(k+1) \le \int_k^{k+1} f(t) dt \le f(k)$. Sommer pour $k=1, \dots, n$.

### 
**Subtilités :**

*   La décroissance est essentielle. Pour $f$ non monotone, le résultat peut être faux.
*   La comparaison donne aussi des équivalents : si $\int_1^n f(t) dt \sim g(n)$ et $f$ décroissante, alors $\sum_{k=1}^n f(k) \sim g(n)$.
*   **Applications :** Séries de Riemann ($f(t) = t^{-\alpha}$), $H_n \sim \ln n$.

**Pièges classiques :**
*   ❌ Appliquer à une fonction non monotone.
*   ❌ Oublier que les inégalités sont $\le$ (pas strictes).
*   ❌ Confondre les bornes de la double inégalité.

---

## FLASHCARD 25 — Proposition 4 : Sommation par paquets, somme double

### RECTO
**Proposition 4 — Sommation par paquets et somme double**

**Contexte :** Familles sommables de réels positifs.

Énoncer la proposition de Fubini-Tonelli discrète (permutation des sommations pour des termes positifs) et le théorème de sommation par paquets.

### VERSO
**Partie 1 — Sommation par paquets :**

Soit $\sum u_n$ une série à termes réels. Soit $(I_k)_{k \in \mathbb{N}}$ une partition de $\mathbb{N}$ en intervalles entiers consécutifs $I_k = \{n_k, n_k+1, \dots, n_{k+1}-1\}$.

$$ \sum_{n=0}^{+\infty} u_n \text{ converge} \implies \sum_{k=0}^{+\infty} \left( \sum_{n \in I_k} u_n \right) \text{ converge et vaut } \sum_{n=0}^{+\infty} u_n. $$

Réciproque : vraie si les $u_n$ sont de signe constant sur chaque $I_k$ (ou termes positifs).

**Partie 2 — Fubini discret (termes positifs) :**

Soit $(a_{i,j})_{(i,j) \in \mathbb{N}^2}$ une famille de réels positifs.

$$ \sum_{(i,j) \in \mathbb{N}^2} a_{i,j} = \sum_{i=0}^{+\infty} \left( \sum_{j=0}^{+\infty} a_{i,j} \right) = \sum_{j=0}^{+\infty} \left( \sum_{i=0}^{+\infty} a_{i,j} \right) \in [0, +\infty]. $$

Si l'une de ces sommes est finie, elles sont toutes égales et finies (famille sommable).

Pour des termes quelconques : la permutation est licite si la famille est absolument sommable : $\sum_{i,j} |a_{i,j}| < +\infty$.

### 
**Subtilités :**

*   Pour les termes de signe quelconque, la permutation des sommations peut être fausse si la famille n'est pas absolument sommable (contre-exemple : $a_{i,j} = 1_{i=j} - 1_{i=j+1}$).
*   La sommation par paquets est une opération sur une série qui regroupe des termes — licite si la série converge absolument, ou si les paquets sont consécutifs et la série converge (par définition de la convergence).

**Pièges classiques :**
*   ❌ Permuter les sommes sans vérifier l'absolue sommabilité.
*   ❌ Oublier que la sommation par paquets est licite dans un sens mais pas nécessairement dans l'autre pour des séries conditionnellement convergentes.

---

## FLASHCARD 26 — À connaître 5 : Théorème de convergence dominée sur les séries

### RECTO
**À connaître 5 — Théorème de convergence dominée discret (séries)**

**Contexte :** Soit $(u_n(x))_{n \in \mathbb{N}}$ une famille de fonctions.

Énoncer le théorème de convergence dominée dans le cadre discret (séries), avec hypothèses exactes.

### VERSO
**Hypothèses complètes :**

*   $X$ est un ensemble (typiquement un intervalle ou $\mathbb{N}$).
*   Pour chaque $n \in \mathbb{N}$, $u_n : X \to \mathbb{R}$ (ou $\mathbb{C}$).
*   **Convergence ponctuelle :** $\forall x \in X, u_n(x) \xrightarrow[n \to \infty]{} \ell(x)$.
*   **Domination :** $\exists (v_n)_{n \in \mathbb{N}}$ suite de réels positifs telle que $\forall x \in X, \forall n \in \mathbb{N}, |u_n(x)| \le v_n$, et $\sum_n v_n < +\infty$.

**Énoncé formel :**

$\sum_{n=0}^{+\infty} u_n(x)$ converge absolument et normalement en $x \in X$,
et
$$ \sum_{n=0}^{+\infty} \ell(x) = \lim_{N \to \infty} \sum_{n=0}^N \ell(x). $$

Plus précisément :
$$ \lim_{N \to \infty} \sum_{n=0}^N u_n(x) = \sum_{n=0}^{+\infty} u_n(x) \quad \text{uniformément en } x \in X. $$

Et : $\sum_{n=0}^{+\infty} u_n(x) \xrightarrow{?} \sum_{n=0}^{+\infty} \ell(x)$ (permutation limite et série possible sous hypothèses supplémentaires).

### 
**Subtilités :**

*   La domination $|u_n(x)| \le v_n$ avec $\sum v_n < +\infty$ garantit la convergence normale de la série $\sum u_n$.
*   Ce résultat est la version discrète du théorème de convergence dominée de Lebesgue (Thm 31).

**Pièges classiques :**
*   ❌ Oublier que la suite dominante $(v_n)$ doit être indépendante de $x$.
*   ❌ Confondre convergence normale et convergence uniforme.

---

# CHAPITRE 3 — Intégration

## FLASHCARD 27 — Proposition 5 : Convergence des sommes de Riemann

### RECTO
**Proposition 5 — Convergence des sommes de Riemann**

**Contexte :** Soit $f : [a, b] \to \mathbb{R}$ (ou $\mathbb{C}$).

Énoncer la proposition sur la convergence des sommes de Riemann vers l'intégrale, avec hypothèses minimales.

### VERSO
**Hypothèses complètes :**

*   $f : [a, b] \to \mathbb{R}$ est continue sur $[a, b]$ (ou, plus généralement, Riemann-intégrable).

**Énoncé formel :**

$$ \frac{b-a}{n} \sum_{k=0}^{n-1} f\left(a + k \frac{b-a}{n}\right) \xrightarrow[n \to +\infty]{} \int_a^b f(t) dt. $$

Plus généralement, pour une subdivision $a = x_0 < x_1 < \dots < x_n = b$ de pas $\delta_n = \max_k (x_{k+1} - x_k) \to 0$ :
$$ \sum_{k=0}^{n-1} f(\xi_k)(x_{k+1} - x_k) \xrightarrow[n \to +\infty]{} \int_a^b f(t) dt, $$
pour tout choix de $\xi_k \in [x_k, x_{k+1}]$.

**Démonstration (Esquisse) :**
Par uniforme continuité de $f$ sur $[a, b]$ (Heine), pour $\varepsilon > 0$, $\exists \delta > 0$ tel que $|x-y| < \delta \implies |f(x) - f(y)| < \varepsilon$. Si le pas $\delta_n < \delta$, alors la somme de Riemann est à distance $< \varepsilon(b-a)$ de $\int_a^b f$.

### 
**Subtilités :**

*   La continuité n'est pas indispensable : $f$ Riemann-intégrable suffit (mais MP* traite surtout $C^0$).
*   La vitesse de convergence est $O(1/n)$ si $f \in C^1$ (par Euler-Maclaurin).
*   **Application :** Calculer $\lim_{n \to \infty} \frac{1}{n} \sum_{k=1}^n f(k/n) = \int_0^1 f(t) dt$ — technique classique de concours.

**Pièges classiques :**
*   ❌ Appliquer à une fonction non bornée.
*   ❌ Oublier d'identifier la somme comme une somme de Riemann (erreur de cadrage).

---

## FLASHCARD 28 — Théorème 17 : Comparaison à une fonction intégrable, intégrales de Riemann

### RECTO
**Théorème 17 — Comparaison à une fonction intégrable / Intégrales de Riemann**

**Contexte :** Soit $f : [a, +\infty[ \to \mathbb{R}$ (intégrale impropre).

Énoncer le critère de comparaison pour les intégrales impropres et donner la nature des intégrales de Riemann $\int_1^{+\infty} t^{-\alpha} dt$.

### VERSO
**Partie 1 — Critère de comparaison :**

Soient $f, g : [a, +\infty[ \to \mathbb{R}_+$ continues (ou localement intégrables), avec $0 \le f(t) \le g(t)$ au voisinage de $+\infty$.

*   $\int_a^{+\infty} g(t) dt \text{ converge} \implies \int_a^{+\infty} f(t) dt \text{ converge.}$
*   $\int_a^{+\infty} f(t) dt \text{ diverge} \implies \int_a^{+\infty} g(t) dt \text{ diverge.}$

Si $f(t) \sim g(t)$ en $+\infty$ ($f, g > 0$) : même nature.

**Partie 2 — Intégrales de Riemann :**

$$ \int_1^{+\infty} \frac{dt}{t^\alpha} \begin{cases} \text{converge} & \text{si } \alpha > 1, \\ \text{diverge} & \text{si } \alpha \le 1. \end{cases} $$

$$ \int_0^1 \frac{dt}{t^\alpha} \begin{cases} \text{converge} & \text{si } \alpha < 1, \\ \text{diverge} & \text{si } \alpha \ge 1. \end{cases} $$

### 
**Subtilités :**

*   Intégrale en $0^+$ et en $+\infty$ : Les conditions de convergence sont opposées ($\alpha < 1$ vs $\alpha > 1$). Ne pas confondre.
*   La comparaison s'applique au voisinage de la singularité (pas nécessairement sur tout $[a, +\infty[$).

**Pièges classiques :**
*   ❌ Inverser les conditions pour $0^+$ et $+\infty$.
*   ❌ Appliquer la comparaison à des fonctions de signe quelconque.

---

## FLASHCARD 29 — À connaître 6 : Intégrales de Bertrand

### RECTO
**À connaître 6 — Intégrales de Bertrand**

Donner la condition de convergence de $\int_2^{+\infty} \frac{dt}{t^\alpha (\ln t)^\beta}$ et de $\int_a^b \frac{dt}{(t-a)^\alpha |\ln(t-a)|^\beta}$ (ou analogue en $0^+$).

### VERSO
**Énoncé formel :**

$$ \int_2^{+\infty} \frac{dt}{t^\alpha (\ln t)^\beta} \begin{cases} \text{converge} & \text{si } \alpha > 1, \text{ ou } \alpha = 1 \text{ et } \beta > 1, \\ \text{diverge} & \text{si } \alpha < 1, \text{ ou } \alpha = 1 \text{ et } \beta \le 1. \end{cases} $$

$$ \int_e^{+\infty} \frac{dt}{t (\ln t)^\beta} \begin{cases} \text{converge} & \text{si } \beta > 1, \\ \text{diverge} & \text{si } \beta \le 1. \end{cases} $$

**Analogie avec les séries de Bertrand :** Même condition que pour $\sum \frac{1}{n^\alpha (\ln n)^\beta}$.

**Démonstration :** Comparaison série-intégrale / calcul direct par changement de variable $u = \ln t$.

### 
**Subtilités :**

*   La borne inférieure doit être choisie pour que $\ln t > 0$ (d'où $t > 1$, et en pratique on prend $t \ge 2$ ou $t \ge e$).

**Pièges classiques :**
*   ❌ Oublier que la borne doit être $> 1$ pour que $\ln t$ soit défini et positif.

---

## FLASHCARD 30 — Proposition 6 : Intégration des relations de comparaison

### RECTO
**Proposition 6 — Intégration des relations de comparaison**

**Contexte :** Soit $f, g : [a, +\infty[ \to \mathbb{R}_+$ continues.

Énoncer la proposition permettant de déduire des équivalents d'intégrales à partir d'équivalents de fonctions.

### VERSO
**Hypothèses :** $f, g > 0$ sur $[a, +\infty[$, continues.

**Énoncé formel :**

**Cas divergent :** Si $\int_a^x f(t) dt \xrightarrow[x \to +\infty]{} +\infty$ et $f(t) \underset{t \to +\infty}{\sim} g(t)$, alors :
$$ \int_a^x f(t) dt \underset{x \to +\infty}{\sim} \int_a^x g(t) dt. $$

**Cas convergent :** Si $\int_a^{+\infty} g(t) dt < +\infty$ et $f(t) \underset{t \to +\infty}{\sim} g(t)$, alors $\int_a^{+\infty} f(t) dt < +\infty$ et :
$$ \int_x^{+\infty} f(t) dt \underset{x \to +\infty}{\sim} \int_x^{+\infty} g(t) dt. $$

### 
**Subtilités :**

*   Strictement analogue à la sommation des relations de comparaison pour les séries.
*   La positivité est indispensable pour la transitivité des équivalents.

**Pièges classiques :**
*   ❌ Oublier que l'équivalence $f \sim g$ doit être au voisinage de la singularité (pas n'importe où).
*   ❌ Appliquer à des fonctions de signe quelconque.

---

## FLASHCARD 31 — Proposition 7 : Critère de Cauchy pour les intégrales impropres

### RECTO
**Proposition 7 — Critère de Cauchy pour les intégrales impropres**

**Contexte :** Soit $f : [a, +\infty[ \to E$ ($E$ evn complet) localement intégrable.

Énoncer le critère de Cauchy pour la convergence d'une intégrale impropre.

### VERSO
**Hypothèses :**

*   $f : [a, +\infty[ \to E$ ($E$ de Banach) est localement intégrable (intégrable sur tout $[a, X]$).

**Énoncé formel :**

$$ \int_a^{+\infty} f(t) dt \text{ converge} \iff \forall \varepsilon > 0, \exists X_0 \ge a, \forall X, Y \ge X_0, \left\| \int_X^Y f(t) dt \right\| \le \varepsilon. $$

**Démonstration :** Caractérisation de Cauchy dans $E$ complet, appliquée à la fonction $F(X) = \int_a^X f(t) dt$.

### 
**Subtilités :**

*   Nécessite la complétude de $E$ (critère de Cauchy dans un espace complet).
*   Utile pour prouver la convergence d'intégrales à paramètre.

**Pièges classiques :**
*   ❌ Oublier que $X_0$ ne dépend pas de $X, Y$ (c'est un critère uniforme en $(X, Y)$).

---

## FLASHCARD 32 — Proposition 8 : Intégration par parties

### RECTO
**Proposition 8 — Intégration par parties (IPP) pour les intégrales impropres**

**Contexte :** Soit $f, g : [a, b] \to \mathbb{R}$ (ou $[a, +\infty[$) de classe $C^1$.

Énoncer la formule d'intégration par parties pour les intégrales impropres, avec les hypothèses de convergence.

### VERSO
**Hypothèses complètes :**

*   $f, g : [a, +\infty[ \to \mathbb{R}$ de classe $C^1$ sur $[a, +\infty[$.
*   L'intégrale $\int_a^{+\infty} f'(t) g(t) dt$ converge.
*   $f(t)g(t)$ admet une limite finie en $+\infty$ : $\lim_{t \to +\infty} f(t)g(t) = \ell \in \mathbb{R}$.

**Énoncé formel :**

$$ \int_a^{+\infty} f'(t) g(t) dt = [\ell - f(a)g(a)] - \int_a^{+\infty} f(t) g'(t) dt, $$

i.e., $\int_a^{+\infty} f'(t) g(t) dt = [f(t)g(t)]_a^{+\infty} - \int_a^{+\infty} f(t) g'(t) dt$,

à condition que $\int_a^{+\infty} f(t) g'(t) dt$ converge (ou équivalence des deux convergences).

**Cas du segment $[a, b]$ :** Toujours valable sans condition supplémentaire :
$$ \int_a^b f'(t) g(t) dt = [f(t)g(t)]_a^b - \int_a^b f(t) g'(t) dt. $$

### 
**Subtilités :**

*   Pour les intégrales impropres, il faut vérifier la convergence du terme $[fg]_a^{+\infty}$ (existence de la limite) ET d'une des deux intégrales.
*   La convergence de l'une n'implique pas l'autre en général — les deux doivent être étudiées conjointement.

**Pièges classiques :**
*   ❌ Appliquer IPP à des intégrales impropres sans vérifier la convergence du crochet.
*   ❌ Oublier le signe $-$ devant la seconde intégrale.

---

## FLASHCARD 33 — Théorème 18 : Changement de variable

### RECTO
**Théorème 18 — Changement de variable dans une intégrale**

**Contexte :** Soit $\varphi : [\alpha, \beta] \to \mathbb{R}$ et $f$ définie sur $\varphi([\alpha, \beta])$.

Énoncer le théorème de changement de variable pour les intégrales (cas $C^1$), en précisant les hypothèses sur $\varphi$ et $f$.

### VERSO
**Hypothèses complètes :**

*   $\varphi : [\alpha, \beta] \to \mathbb{R}$ est de classe $C^1$ sur $[\alpha, \beta]$ (pas nécessairement injective, pas nécessairement monotone).
*   $f : I \to \mathbb{R}$ est continue sur $I$, où $I$ est un intervalle contenant $\varphi([\alpha, \beta])$.

**Énoncé formel :**

$$ \int_\alpha^\beta f(\varphi(t)) \varphi'(t) dt = \int_{\varphi(\alpha)}^{\varphi(\beta)} f(u) du. $$

**Cas de la variable impropre :**

Si $\varphi : [\alpha, +\infty[ \to \mathbb{R}$ est $C^1$, $\varphi(t) \to L$ quand $t \to +\infty$, et l'intégrale converge :
$$ \int_\alpha^{+\infty} f(\varphi(t)) \varphi'(t) dt = \int_{\varphi(\alpha)}^L f(u) du. $$

**Démonstration (Esquisse) :**
Soit $F$ une primitive de $f$. Alors $\frac{d}{dt} [F(\varphi(t))] = F'(\varphi(t))\varphi'(t) = f(\varphi(t))\varphi'(t)$. Intégrer de $\alpha$ à $\beta$ donne le résultat par le théorème fondamental du calcul.

### 
**Subtilités :**

*   $\varphi$ n'a pas besoin d'être bijective pour le théorème : si $\varphi$ n'est pas injective, l'intégrale de droite est bien $\int_{\varphi(\alpha)}^{\varphi(\beta)} f$ avec les bornes algébriques.
*   Si $\varphi$ est une bijection $C^1$ à dérivée non nulle, le changement de variable est réversible.
*   La continuité de $f$ est suffisante (pas besoin de $C^1$).
*   **Attention :** $\int_{\varphi(\alpha)}^{\varphi(\beta)}$ est une intégrale de Riemann avec bornes orientées (algébriques) — si $\varphi(\beta) < \varphi(\alpha)$, l'intégrale est négative.

**Extensions :**

*   Valable pour $f : I \to E$ ($E$ evn), en remplaçant $f$ par une fonction vectorielle continue.

**Pièges classiques :**
*   ❌ Oublier $\varphi'(t)$ dans l'intégrande.
*   ❌ Confondre les bornes : ce sont $\varphi(\alpha)$ et $\varphi(\beta)$ (pas $\alpha$ et $\beta$).
*   ❌ Exiger la bijectivité de $\varphi$ — inutile pour la formule.

---

## FLASHCARD 34 — À connaître 7 : Inégalité de Cauchy-Schwarz intégrale

### RECTO
**À connaître 7 — Inégalité de Cauchy-Schwarz pour les intégrales**

**Contexte :** Soient $f, g : [a, b] \to \mathbb{R}$ (ou $\mathbb{C}$).

Énoncer l'inégalité de Cauchy-Schwarz intégrale avec condition d'égalité.

### VERSO
**Hypothèses :** $f, g : [a, b] \to \mathbb{R}$ (ou $\mathbb{C}$) continues (ou de carré intégrable).

**Énoncé formel :**

$$ \left| \int_a^b f(t) \overline{g(t)} dt \right|^2 \le \left( \int_a^b |f(t)|^2 dt \right) \left( \int_a^b |g(t)|^2 dt \right). $$

**Condition d'égalité :** Égalité si et seulement si $f$ et $g$ sont colinéaires au sens $L^2$ : $\exists (\lambda, \mu) \neq (0, 0), \lambda f = \mu g$ p.p. (i.e., $f$ et $g$ sont proportionnelles).

**Démonstration (Esquisse) :**
Considérer le discriminant du polynôme $\lambda \mapsto \int_a^b |f(t) + \lambda g(t)|^2 dt \ge 0$. Ce trinôme en $\lambda$ (réel) est $\ge 0$ pour tout $\lambda$, donc son discriminant est $\le 0$.

### 
**Subtilités :**

*   C'est l'inégalité de Cauchy-Schwarz dans l'espace de Hilbert $L^2([a, b])$.
*   La condition d'égalité est souvent demandée en concours.

**Pièges classiques :**
*   ❌ Oublier les valeurs absolues dans le membre de gauche.
*   ❌ Oublier que $|f|^2$ (et non $f^2$) dans le cas complexe.

---

## FLASHCARD 35 — À connaître 8 : Intégrale et valeur absolue / positivité

### RECTO
**À connaître 8 — Inégalité triangulaire intégrale et positivité**

Énoncer l'inégalité triangulaire pour les intégrales et la propriété de positivité.

### VERSO
**Énoncés :**

**Positivité :**
$$ f : [a, b] \to \mathbb{R} \text{ continue}, f \ge 0, \int_a^b f(t) dt \ge 0. $$
Si de plus $f \ge 0$ et $\int_a^b f(t) dt = 0 \implies f \equiv 0$ sur $[a, b]$.

**Inégalité triangulaire :**

Pour $f : [a, b] \to E$ ($E$ evn) continue :
$$ \left\| \int_a^b f(t) dt \right\| \le \int_a^b \|f(t)\| dt \le (b-a) \sup_{t \in [a, b]} \|f(t)\|. $$

### 
**Subtilités :**

*   La positivité avec égalité nécessite la continuité : sans elle, on peut avoir $f \ge 0$ non nulle et $\int f = 0$ (pour des fonctions non mesurables, hors programme).
*   L'inégalité triangulaire est valable en dimension infinie.

**Pièges classiques :**
*   ❌ Conclure $f \equiv 0$ depuis $\int f = 0$ sans hypothèse de continuité et de positivité.

---

## FLASHCARD 36 — À connaître 9 : Lemme de Riemann-Lebesgue

### RECTO
**À connaître 9 — Lemme de Riemann-Lebesgue**

**Contexte :** Soit $f : [a, b] \to \mathbb{R}$ (ou $f : \mathbb{R} \to \mathbb{R}$ intégrable).

Énoncer le lemme de Riemann-Lebesgue et ses deux formes usuelles (segment et droite réelle).

### VERSO
**Hypothèses :**

*   **Cas du segment :** $f : [a, b] \to \mathbb{R}$ continue (ou Riemann-intégrable).
*   **Cas de la droite :** $f : \mathbb{R} \to \mathbb{R}$ intégrable ($\int_{-\infty}^{+\infty} |f(t)| dt < +\infty$).

**Énoncé formel :**

**Cas du segment :**
$$ \int_a^b f(t) e^{i\lambda t} dt \xrightarrow[\lambda \to \pm\infty]{} 0. $$

Équivalent : $\int_a^b f(t) \cos(\lambda t) dt \to 0$ et $\int_a^b f(t) \sin(\lambda t) dt \to 0$ quand $\lambda \to \pm\infty$.

**Cas de la droite ($f \in L^1(\mathbb{R})$) :**
$$ \hat{f}(\lambda) = \int_{-\infty}^{+\infty} f(t) e^{-i\lambda t} dt \xrightarrow[|\lambda| \to +\infty]{} 0. $$

**Démonstration (Esquisse, cas $C^1$) :**
IPP : $\int_a^b f(t) e^{i\lambda t} dt = \left[ \frac{f(t)e^{i\lambda t}}{i\lambda} \right]_a^b - \frac{1}{i\lambda} \int_a^b f'(t) e^{i\lambda t} dt = O(1/\lambda) \to 0$.

Cas général (Riemann-intégrable) : Approximation par des fonctions en escaliers + passage à la limite.

### 
**Subtilités :**

*   La vitesse de convergence vers $0$ dépend de la régularité de $f$ : si $f \in C^k$, alors $\hat{f}(\lambda) = O(\lambda^{-k})$.
*   Le lemme de Riemann-Lebesgue est fondamental en analyse de Fourier.
*   La réciproque est fausse : $\hat{f}(\lambda) \to 0$ n'implique pas $f \in L^1$.

**Pièges classiques :**
*   ❌ Penser que la convergence est vers $0$ avec une vitesse universelle — elle dépend de $f$.
*   ❌ Confondre avec la convergence de la transformée de Fourier (qui est un résultat différent).

---

# CHAPITRE 4 — Suites de fonctions, approximation

## FLASHCARD 37 — Théorème 19 : Continuité de la limite uniforme

### RECTO
**Théorème 19 — Continuité de la limite uniforme**

**Contexte :** Soit $(f_n)$ une suite de fonctions $f_n : X \to E$.

Énoncer le théorème de continuité de la limite uniforme, avec hypothèses exactes sur $X$, $E$, la suite $(f_n)$.

### VERSO
**Hypothèses complètes :**

*   $X$ est un espace métrique (ou topologique), $E$ est un espace métrique complet (evn).
*   Pour tout $n \in \mathbb{N}$, $f_n : X \to E$ est continue sur $X$.
*   $(f_n)$ converge uniformément vers $f$ sur $X$ :
    $$ \sup_{x \in X} d(f_n(x), f(x)) \xrightarrow[n \to \infty]{} 0. $$

**Énoncé formel :**

$$ f : X \to E \text{ est continue sur } X. $$

**Démonstration (Esquisse) :**
Soit $x_0 \in X$ et $\varepsilon > 0$. Choisir $N$ tel que $\sup_x d(f_n(x), f(x)) < \varepsilon/3$ pour $n \ge N$. Par continuité de $f_N$ en $x_0$, $\exists \delta > 0$ tel que $d(x, x_0) < \delta \implies d(f_N(x), f_N(x_0)) < \varepsilon/3$. Alors :
$$ d(f(x), f(x_0)) \le d(f(x), f_N(x)) + d(f_N(x), f_N(x_0)) + d(f_N(x_0), f(x_0)) < \varepsilon. $$

### 
**Subtilités :**

*   La convergence uniforme est indispensable : la limite d'une suite de fonctions continues convergent simplement peut ne pas être continue (ex : $f_n(x) = x^n$ sur $[0, 1]$, limite = $1_{\{x=1\}}$, discontinue).
*   La complétude de $E$ n'est pas nécessaire pour la continuité de la limite (seulement pour l'existence de la limite dans $E$, si $E$ est de Banach).
*   Le théorème est valable sur tout espace métrique $X$ (pas seulement des intervalles).

**Extensions :**

*   Si chaque $f_n \in C^k$, la convergence uniforme ne garantit pas que $f \in C^k$ (il faut la convergence uniforme des dérivées — voir Thm 22).
*   **Convergence uniforme sur les compacts :** si la convergence est seulement locale uniforme, la limite est quand même continue.

**Pièges classiques :**
*   ❌ Conclure à la continuité depuis la convergence simple.
*   ❌ Oublier de vérifier l'uniformité de la convergence (erreur la plus fréquente en concours).
*   ❌ Confondre convergence uniforme sur $X$ et convergence uniforme sur tout compact de $X$.

---

## FLASHCARD 38 — Théorème 20 : Double limite

### RECTO
**Théorème 20 — Théorème de la double limite**

**Contexte :** Soit $f_n : X \to E$, $x_0$ point adhérent à $X$.

Énoncer le théorème de la double limite (permutation de la limite en $x$ et de la limite en $n$), avec toutes les hypothèses.

### VERSO
**Hypothèses complètes :**

*   $X$ espace métrique, $x_0$ point adhérent à $X$ (ou $x_0 \in \overline{X}$), $E$ espace métrique complet.
*   Pour tout $n \in \mathbb{N}$, $\lim_{x \to x_0} f_n(x) = \ell_n \in E$ (limite de $f_n$ en $x_0$).
*   $(f_n)$ converge uniformément vers $f$ sur $X \setminus \{x_0\}$ (ou sur $X$) : $\sup_{x \in X} d(f_n(x), f(x)) \to 0$.

**Énoncé formel :**

$$ \lim_{n \to \infty} \ell_n = \ell \in E \quad \text{et} \quad \lim_{x \to x_0} f(x) = \ell. $$

Autrement dit :
$$ \lim_{n \to \infty} \left( \lim_{x \to x_0} f_n(x) \right) = \lim_{x \to x_0} \left( \lim_{n \to \infty} f_n(x) \right) = \lim_{x \to x_0} f(x) = \ell. $$

**Démonstration (Esquisse) :**
$d(\ell_m, \ell_n) \le d(\ell_m, f_m(x)) + d(f_m(x), f_n(x)) + d(f_n(x), \ell_n)$ — pour $x$ proche de $x_0$ et $m, n$ grands, chaque terme est petit par uniforme convergence et existence de $\ell_n$.

### 
**Subtilités :**

*   L'uniforme convergence est la clé permettant de permuter les deux limites.
*   Sans uniforme convergence, la double limite peut ne pas exister ou donner deux valeurs différentes selon l'ordre (contre-exemple : $f_n(x) = x^n$ sur $[0, 1[$, $\lim_n \lim_{x \to 1^-} f_n(x) = 1$ mais $\lim_{x \to 1^-} \lim_n f_n(x) = 0$).

**Extensions :**

*   Analogue pour les séries : si $\sum f_n$ converge uniformément et chaque $f_n$ admet une limite en $x_0$, alors $\lim_{x \to x_0} \sum f_n(x) = \sum \lim_{x \to x_0} f_n(x)$.

**Pièges classiques :**
*   ❌ Permuter les limites sans uniforme convergence.
*   ❌ Oublier de vérifier l'existence de chaque $\ell_n$.

---

## FLASHCARD 39 — Théorème 21 : Permutation limite-intégrale (convergence uniforme sur un segment)

### RECTO
**Théorème 21 — Permutation limite-intégrale (convergence uniforme sur un segment)**

⚠️ THÉORÈME « DANGEREUX » : les hypothèses sont strictes.

**Contexte :** Soit $(f_n)$ une suite de fonctions sur $[a, b]$.

Énoncer le théorème de permutation limite-intégrale par convergence uniforme, avec hypothèses exactes. Identifier pourquoi il est qualifié de « dangereux ».

### VERSO
**Hypothèses complètes :**

*   $[a, b]$ est un segment (compact, $a < b$, $a, b \in \mathbb{R}$).
*   Pour tout $n \in \mathbb{N}$, $f_n : [a, b] \to E$ est continue (ou Riemann-intégrable) sur $[a, b]$.
*   $(f_n)$ converge uniformément vers $f$ sur $[a, b]$.

**Énoncé formel :**

$$ \int_a^b f_n(t) dt \xrightarrow[n \to \infty]{} \int_a^b f(t) dt. $$

Autrement dit :
$$ \lim_{n \to \infty} \int_a^b f_n(t) dt = \int_a^b \lim_{n \to \infty} f_n(t) dt. $$

**Majoration :**
$$ \left| \int_a^b f_n(t) dt - \int_a^b f(t) dt \right| \le (b-a) \sup_{t \in [a, b]} |f_n(t) - f(t)| \to 0. $$

**Démonstration (Esquisse) :**
Inégalité triangulaire + uniforme convergence : $\|\int_a^b (f_n - f)\| \le (b-a) \sup |f_n - f| \to 0$.

### 
**Subtilités :**

*   **Pourquoi « dangereux » ?** Car sur un segment, la convergence simple ne suffit pas : ex. $f_n(x) = nxe^{-nx}$ sur $[0, 1]$, $f_n \to 0$ simplement mais $\int_0^1 f_n = 1 - e^{-n} \to 1 \neq 0$.
*   La convergence uniforme sur tout $[a, b]$ est requise — pas seulement sur un compact inclus dans $]a, b[$.
*   Pour les intégrales impropres, la convergence uniforme sur $[a, b]$ ne suffit pas : il faut une domination uniforme (théorème de convergence dominée, Thm 31) ou la convergence normale.
*   Segment borné fermé : la borne $(b-a)$ est finie — crucial pour la majoration.

**Extensions :**

*   Sur un intervalle non compact : ce théorème ne s'applique pas directement ; utiliser le TCD (Thm 31) ou la convergence normale.

**Pièges classiques :**
*   ❌ Permuter limite et intégrale avec seulement la convergence simple.
*   ❌ Appliquer sur un intervalle ouvert ou non borné sans vérification complémentaire.
*   ❌ Oublier le facteur $(b-a)$ dans la majoration (qui peut être grand).

---

## FLASHCARD 40 — Théorème 22 : Régularité $C^1$ d'une suite de fonctions

### RECTO
**Théorème 22 — Régularité $C^1$ de la limite d'une suite de fonctions**

**Contexte :** Soit $(f_n)$ une suite de fonctions de classe $C^1$ sur un intervalle $I$.

Énoncer le théorème de régularité $C^1$ pour les suites de fonctions, en précisant les deux hypothèses de convergence distinctes.

### VERSO
**Hypothèses complètes :**

*   $I \subseteq \mathbb{R}$ intervalle (ouvert ou fermé, borné ou non).
*   Pour tout $n \in \mathbb{N}$, $f_n \in C^1(I, E)$ ($E$ evn de Banach).
*   **Hypothèse 1 :** $(f_n)$ converge simplement (ou en un point $x_0 \in I$) vers une fonction $f$.
*   **Hypothèse 2 :** $(f_n')$ converge uniformément sur tout segment $[a, b] \subset I$ vers une fonction $g : I \to E$.

**Énoncé formel :**

$$ f \in C^1(I, E) \quad \text{et} \quad f' = g. $$

Autrement dit : $(f_n)$ converge uniformément sur tout compact de $I$ vers $f$, et $f' = \lim_n f_n'$ (uniformément sur les compacts).

**Démonstration (Esquisse) :**
Pour $x, x_0 \in I$ :
$$ f_n(x) - f_n(x_0) = \int_{x_0}^x f_n'(t) dt. $$
Par convergence uniforme de $(f_n')$ vers $g$, on peut passer à la limite (Thm 21) :
$$ f(x) - f(x_0) = \int_{x_0}^x g(t) dt. $$
Donc $f$ est dérivable et $f' = g \in C^0$ (limite uniforme de $C^0$), donc $f \in C^1$.

### 
**Subtilités :**

*   Les deux conditions sont indépendantes et toutes deux nécessaires :
    *   $(f_n)$ converge simplement : pour fixer la limite (sans quoi $f$ n'est pas déterminée).
    *   $(f_n')$ converge uniformément sur les compacts : pour passer la dérivée sous la limite.
*   La convergence simple de $(f_n)$ suffit (pas besoin de convergence uniforme de $(f_n)$) — elle est automatiquement uniforme sur les compacts une fois qu'on a la convergence simple + convergence uniforme des dérivées.
*   Si $I$ est non compact, la convergence de $(f_n')$ doit être uniforme sur tout segment $[a, b] \subset I$ (convergence localement uniforme), pas nécessairement sur $I$ entier.

**Extensions :**

*   **Thm 23 :** version $C^k$ (par récurrence sur $k$).
*   Analogue pour les séries (Thm 29).

**Pièges classiques :**
*   ❌ Exiger la convergence uniforme de $(f_n)$ au lieu de la convergence simple (condition trop forte et inutile).
*   ❌ Oublier que la convergence de $(f_n')$ doit être uniforme (pas simple) sur les compacts.
*   ❌ Confondre « convergence simple de $f_n$ » et « convergence uniforme de $f_n$ ».

---

## FLASHCARD 41 — Théorème 23 : Régularité $C^k$

### RECTO
**Théorème 23 — Régularité $C^k$ de la limite d'une suite de fonctions**

**Contexte :** Soit $(f_n)$ une suite de fonctions de classe $C^k$.

Énoncer le théorème de régularité $C^k$, en précisant les hypothèses pour chaque ordre de dérivation.

### VERSO
**Hypothèses complètes :**

*   $I \subseteq \mathbb{R}$ intervalle, $E$ evn de Banach, $k \ge 1$.
*   Pour tout $n \in \mathbb{N}$, $f_n \in C^k(I, E)$.
*   Pour $j=1, \dots, k$ : $(f_n^{(j)})$ converge uniformément sur tout segment $[a, b] \subset I$.
*   Pour $j=0$ : $(f_n)$ converge simplement sur $I$ (ou en un point de $I$).

**Énoncé formel :**

$$ f = \lim_n f_n \in C^k(I, E) \quad \text{et} \quad \forall j \in \{0, 1, \dots, k\}, \quad f^{(j)} = \lim_n f_n^{(j)}. $$

(Les limites $\lim_n f_n^{(j)}$ sont localement uniformes sur $I$.)

**Démonstration (Esquisse) :** Récurrence sur $k$ en appliquant le Thm 22 à chaque étape.

### 
**Subtilités :**

*   La condition de convergence uniforme des dérivées jusqu'à l'ordre $k$ est nécessaire — la convergence simple de $f_n^{(k)}$ ne suffit pas.
*   La convergence de $f_n$ elle-même peut être seulement simple (ou en un point).

**Extensions :**

*   Cas $k=+\infty$ ($C^\infty$) : si les hypothèses valent pour tout $k$, alors $f \in C^\infty$.

**Pièges classiques :**
*   ❌ Oublier de vérifier la convergence uniforme de toutes les dérivées jusqu'à l'ordre $k$.

---

## FLASHCARD 42 — Théorème 24 : Approximation par des fonctions en escalier

### RECTO
**Théorème 24 — Approximation par des fonctions en escalier**

**Contexte :** Soit $f : [a, b] \to \mathbb{R}$ continue.

Énoncer le théorème d'approximation d'une fonction continue par des fonctions en escalier au sens de la norme uniforme.

### VERSO
**Hypothèses :**

*   $f : [a, b] \to \mathbb{R}$ est continue sur le segment $[a, b]$.

**Énoncé formel :**

$$ \forall \varepsilon > 0, \exists \varphi : [a, b] \to \mathbb{R} \text{ en escalier}, \quad \|f - \varphi\|_\infty = \sup_{[a, b]} |f - \varphi| \le \varepsilon. $$

**Démonstration (Esquisse) :**
Par le théorème de Heine, $f$ est uniformément continue. Pour $\varepsilon > 0$, prendre $\delta > 0$ associé. Subdiviser $[a, b]$ en sous-intervalles de longueur $< \delta$, et définir $\varphi$ constante (valeur de $f$ en un point de chaque sous-intervalle).

### 
**Subtilités :**

*   Ce théorème utilise Heine (uniforme continuité) de manière essentielle.
*   L'espace des fonctions en escalier est dense dans $(C^0([a, b]), \|\cdot\|_\infty)$.
*   Fondement de la théorie de l'intégrale de Riemann.

**Pièges classiques :**
*   ❌ Appliquer sans hypothèse de compacité (intervalle non borné : faux en général).

---

## FLASHCARD 43 — Théorème 25 : Théorème de Weierstrass (approximation polynomiale)

### RECTO
**Théorème 25 — Théorème d'approximation de Weierstrass**

**Contexte :** Soit $f : [a, b] \to \mathbb{R}$ continue.

Énoncer le théorème de Weierstrass sur l'approximation uniforme par des polynômes.

### VERSO
**Hypothèses :**

*   $f : [a, b] \to \mathbb{R}$ est continue sur $[a, b]$ ($a < b$, $a, b \in \mathbb{R}$).

**Énoncé formel :**

$$ \forall \varepsilon > 0, \exists P \in \mathbb{R}[X] \text{ (polynôme)}, \quad \sup_{t \in [a, b]} |f(t) - P(t)| \le \varepsilon. $$

Autrement dit, l'espace $\mathbb{R}[X]|_{[a, b]}$ est dense dans $(C^0([a, b]), \|\cdot\|_\infty)$.

**Démonstration (Esquisse — via polynômes de Bernstein, voir À connaître 11) :**
Pour $f : [0, 1] \to \mathbb{R}$, poser $B_n(f)(x) = \sum_{k=0}^n f(k/n) \binom{n}{k} x^k (1-x)^{n-k}$. Montrer $\|B_n(f) - f\|_\infty \to 0$ en utilisant la loi des grands nombres probabiliste (ou un calcul direct).

### 
**Subtilités :**

*   Le degré du polynôme approximant n'est pas borné a priori — on ne peut pas approcher uniformément par des polynômes de degré fixé.
*   Faux sur $\mathbb{R}$ entier : $e^x$ ne peut pas être approchée uniformément sur $\mathbb{R}$ par des polynômes.
*   **Weierstrass trigonométrique (À connaître 13) :** les polynômes trigonométriques sont denses dans $C_{2\pi}^0$.
*   Le résultat est un cas particulier du théorème de Stone-Weierstrass (algèbre de fonctions séparant les points).

**Extensions :**

*   **Stone-Weierstrass :** Sur tout espace compact $K$, toute sous-algèbre de $C^0(K, \mathbb{R})$ contenant les constantes et séparant les points est dense.

**Pièges classiques :**
*   ❌ Croire qu'on peut approcher $f$ par un polynôme de degré fixé.
*   ❌ Étendre le résultat à $\mathbb{R}$ entier sans condition de croissance.

---

## FLASHCARD 44 — À connaître 10 : Moments

### RECTO
**À connaître 10 — Problème des moments**

**Contexte :** Approximation de Weierstrass et identification de mesures par leurs moments.

Énoncer la propriété de densité liée aux moments : si $\int_0^1 f(t) t^n dt = 0$ pour tout $n$, que peut-on conclure ?

### VERSO
**Énoncé formel :**

Soit $f \in C^0([0, 1], \mathbb{R})$ (ou $f$ Riemann-intégrable).

$$ \forall n \in \mathbb{N}, \quad \int_0^1 f(t) t^n dt = 0 \implies f \equiv 0 \text{ sur } [0, 1]. $$

**Démonstration (Esquisse) :**
Par linéarité, $\int_0^1 f(t) P(t) dt = 0$ pour tout polynôme $P$. Par Weierstrass, $\forall \varepsilon > 0, \exists P$ tel que $\|f - P\|_\infty \le \varepsilon$. Alors :
$$ \int_0^1 f(t)^2 dt = \int_0^1 f(t)(f(t) - P(t)) dt + \int_0^1 f(t)P(t) dt \le \|f\|_\infty \cdot \varepsilon \cdot 1 + 0. $$
Donc $\int_0^1 f^2 = 0$, donc $f \equiv 0$ (par continuité et positivité).

### 
**Subtilités :**

*   Ce résultat montre que les moments caractérisent les fonctions continues sur $[0, 1]$.
*   **Généralisation :** Sur $[a, b]$, si $\int_a^b f(t) t^n dt = 0$ pour tout $n \ge 0$, alors $f \equiv 0$.
*   Utilisé pour : montrer l'injectivité de la transformée de Laplace, identifier des lois de probabilité par leurs moments.

**Pièges classiques :**
*   ❌ Oublier que le résultat nécessite la continuité de $f$ (ou au moins l'intégrabilité au carré) pour conclure $f \equiv 0$.

---

## FLASHCARD 45 — À connaître 11 : Weierstrass via Bernstein

### RECTO
**À connaître 11 — Polynômes de Bernstein et preuve de Weierstrass**

Définir les polynômes de Bernstein $B_n(f)$ et expliquer pourquoi $B_n(f) \to f$ uniformément sur $[0, 1]$.

### VERSO
**Définition :**

Pour $f : [0, 1] \to \mathbb{R}$, le $n$-ième polynôme de Bernstein est :
$$ B_n(f)(x) = \sum_{k=0}^n f\left(\frac{k}{n}\right) \binom{n}{k} x^k (1-x)^{n-k}, \quad x \in [0, 1]. $$

**Propriété :**

$$ \|B_n(f) - f\|_\infty \xrightarrow[n \to \infty]{} 0 \quad \text{pour tout } f \in C^0([0, 1]). $$

**Démonstration (Idée) :**
Si $X_1, \dots, X_n \sim \text{Bernoulli}(x)$ i.i.d., alors $B_n(f)(x) = \mathbb{E}[f(\bar{X}_n)]$ où $\bar{X}_n = \frac{1}{n} \sum X_i$. Par la LGN et la continuité uniforme de $f$ (Heine), $\mathbb{E}[f(\bar{X}_n)] \to f(x)$ uniformément.

### 
**Subtilités :**

*   $B_n(f)$ est un polynôme de degré $\le n$.
*   $B_n$ est un opérateur positif et linéaire : $f \ge 0 \implies B_n(f) \ge 0$.
*   La preuve via la LGN est probabiliste et très élégante.

**Pièges classiques :**
*   ❌ Croire que $B_n(f)(k/n) = f(k/n)$ — faux en général (les polynômes de Bernstein n'interpolent pas $f$).

---

## FLASHCARD 46 — À connaître 12 : Weierstrass par convolution

### RECTO
**À connaître 12 — Approximation de l'identité et Weierstrass par convolution**

Énoncer la méthode de convolution pour approcher une fonction continue par des fonctions régulières, et son lien avec Weierstrass.

### VERSO
**Idée centrale — Approximation de l'identité :**

Soit $(\rho_n)$ une suite de fonctions positives sur $\mathbb{R}$ telles que :
*   $\int_{-\infty}^{+\infty} \rho_n(t) dt = 1$,
*   $\forall \delta > 0, \int_{|t| \ge \delta} \rho_n(t) dt \to 0$ (concentration au voisinage de $0$).

Pour $f : \mathbb{R} \to \mathbb{R}$ continue et bornée, le produit de convolution :
$$ (f \star \rho_n)(x) = \int_{-\infty}^{+\infty} f(x-t)\rho_n(t) dt $$
converge uniformément vers $f$ sur tout compact.

**Lien avec Weierstrass :** Prendre $\rho_n$ polynomiale (ex : $\rho_n(t) = c_n(1-t^2)^n$ sur $[-1, 1]$) — la convolution de $f$ avec $\rho_n$ est un polynôme.

### 
**Subtilités :**

*   La régularité de $f \star \rho_n$ est celle de $\rho_n$ (si $\rho_n \in C^\infty$, alors $f \star \rho_n \in C^\infty$).
*   Fondement des fonctions test en analyse fonctionnelle.
*   **Weierstrass trigonométrique :** même principe avec le noyau de Fejér.

**Pièges classiques :**
*   ❌ Oublier que la régularité de la convolution est donnée par le terme le plus régulier.

---

## FLASHCARD 47 — À connaître 13 : Théorème de Weierstrass trigonométrique

### RECTO
**À connaître 13 — Théorème de Weierstrass trigonométrique**

**Contexte :** Fonctions continues et $2\pi$-périodiques.

Énoncer le théorème de Weierstrass trigonométrique : densité des polynômes trigonométriques dans $(C_{2\pi}^0, \|\cdot\|_\infty)$.

### VERSO
**Hypothèses :**

*   $f : \mathbb{R} \to \mathbb{R}$ (ou $\mathbb{C}$) continue et $2\pi$-périodique.

**Énoncé formel :**

$$ \forall \varepsilon > 0, \exists T \text{ polynôme trigonométrique}, \quad \sup_{t \in \mathbb{R}} |f(t) - T(t)| \le \varepsilon. $$

Où un polynôme trigonométrique est une combinaison linéaire finie de $t \mapsto e^{ikt}$, $k \in \mathbb{Z}$ (ou $\cos(kt), \sin(kt), k \in \mathbb{N}$).

**Démonstration (Esquisse) :**
Via le noyau de Fejér (moyennes de Cesàro des sommes partielles de Fourier) : les moyennes de Cesàro $\sigma_n(f)$ sont des polynômes trigonométriques convergeant uniformément vers $f$. Ceci utilise des propriétés du noyau de Fejér (positif, intégrale 1, concentré en 0).

### 
**Subtilités :**

*   Les sommes partielles de Fourier $S_n(f)$ ne convergent pas nécessairement uniformément (phénomène de Gibbs) — il faut les moyennes de Cesàro ($\sigma_n(f)$).
*   Ce théorème est la base de l'analyse de Fourier : les séries de Fourier approchent les fonctions continues en moyenne, et les polynômes trigonométriques en norme uniforme (via Cesàro).

**Pièges classiques :**
*   ❌ Confondre convergence des sommes de Fourier (conditionnelle) et densité des polynômes trigonométriques (uniforme, via Cesàro).

---

# CHAPITRE 5 — Séries de fonctions

## FLASHCARD 48 — Théorème 26 : Convergence normale implique uniforme

### RECTO
**Théorème 26 — Convergence normale implique convergence uniforme**

**Contexte :** Soit $\sum f_n$ une série de fonctions $f_n : X \to E$.

Définir la convergence normale et énoncer l'implication vers la convergence uniforme.

### VERSO
**Définition — Convergence normale :**

La série $\sum f_n$ converge normalement sur $X$ si :
$$ \sum_{n=0}^{+\infty} \sup_{x \in X} \|f_n(x)\| < +\infty. $$

**Énoncé formel :**

$$ \sum f_n \text{ converge normalement sur } X \implies \sum f_n \text{ converge absolument et uniformément sur } X. $$

C'est-à-dire : $\forall x \in X, \sum \|f_n(x)\| < +\infty$, et $\sup_{x \in X} \left\| \sum_{n > N} f_n(x) \right\| \to 0$.

**Démonstration :**
$$ \sup_{x \in X} \left\| \sum_{n=N+1}^M f_n(x) \right\| \le \sum_{n=N+1}^M \sup_{x \in X} \|f_n(x)\| \to 0 \quad (M, N \to \infty) $$
par convergence de $\sum \sup_x \|f_n(x)\|$.

### 
**Subtilités :**

*   Convergence normale $\implies$ convergence uniforme $\implies$ convergence absolue ponctuelle (toutes les implications sont strictes).
*   **Réciproque fausse :** $\sum f_n$ peut converger uniformément sans converger normalement (ex : séries alternées).
*   La convergence normale est une propriété très forte — elle s'applique facilement avec les séries entières (dans le disque de convergence strict) et les intégrales à paramètre.

**Pièges classiques :**
*   ❌ Confondre convergence normale et convergence uniforme.
*   ❌ Vérifier la convergence uniforme via la convergence normale quand cette dernière n'est pas valable.

---

## FLASHCARD 49 — Théorème 27 : Double limite pour les séries

### RECTO
**Théorème 27 — Théorème de la double limite pour les séries de fonctions**

**Contexte :** Soit $\sum_{n \ge 0} f_n$ une série de fonctions $f_n : X \to E$.

Énoncer le théorème de la double limite pour une série de fonctions convergeant uniformément.

### VERSO
**Hypothèses :**

*   Pour tout $n \in \mathbb{N}$, $f_n : X \to E$ admet une limite $\ell_n = \lim_{x \to x_0} f_n(x)$.
*   La série $\sum f_n$ converge uniformément sur $X$ (ou au voisinage de $x_0$).

**Énoncé formel :**

$$ \lim_{x \to x_0} \sum_{n=0}^{+\infty} f_n(x) = \sum_{n=0}^{+\infty} \ell_n = \sum_{n=0}^{+\infty} \lim_{x \to x_0} f_n(x). $$

(Les deux membres sont bien définis et égaux.)

**Démonstration :** Analogue au Thm 20 — utiliser l'uniforme convergence pour permuter la limite et la somme.

### 
**Subtilités et pièges :**

*   Strictement analogue au Thm 20 pour les suites.
*   ❌ Permuter sans vérifier la convergence uniforme.

---

## FLASHCARD 50 — Théorème 28 : Permutation série-intégrale (convergence uniforme sur un segment)

### RECTO
**Théorème 28 — Permutation série-intégrale (convergence uniforme sur un segment)**

⚠️ THÉORÈME « DANGEREUX »

**Contexte :** Soit $\sum f_n$ une série de fonctions sur $[a, b]$.

Énoncer le théorème de permutation série-intégrale sous hypothèse de convergence uniforme.

### VERSO
**Hypothèses complètes :**

*   $[a, b]$ segment compact ($a < b$).
*   Pour tout $n$, $f_n : [a, b] \to E$ continue (ou Riemann-intégrable).
*   $\sum f_n$ converge uniformément sur $[a, b]$.

**Énoncé formel :**

$$ \int_a^b \left( \sum_{n=0}^{+\infty} f_n(t) \right) dt = \sum_{n=0}^{+\infty} \int_a^b f_n(t) dt. $$

**Démonstration :** Application du Thm 21 aux sommes partielles $S_N = \sum_{n=0}^N f_n$ qui convergent uniformément vers $\sum f_n$.

### 
**Subtilités :**

*   **Pourquoi « dangereux » ?** Car on ne peut pas permuter sur un intervalle non compact sans hypothèse supplémentaire (convergence dominée ou normale).
*   La convergence normale (À connaître 14) suffit et est plus facile à vérifier.

**Pièges classiques :**
*   ❌ Permuter sur un intervalle non borné avec seulement la convergence uniforme.
*   ❌ Oublier de vérifier la convergence uniforme (et non seulement ponctuelle).

---

## FLASHCARD 51 — Théorème 29 : Régularité $C^1$ d'une série de fonctions

### RECTO
**Théorème 29 — Régularité $C^1$ d'une série de fonctions**

**Contexte :** Soit $\sum f_n$ une série de fonctions $C^1$.

Énoncer le théorème de régularité $C^1$ pour les séries de fonctions, avec hypothèses exactes.

### VERSO
**Hypothèses complètes :**

*   $I \subseteq \mathbb{R}$ intervalle, $E$ evn de Banach.
*   Pour tout $n$, $f_n \in C^1(I, E)$.
*   **H1 :** $\sum f_n$ converge simplement sur $I$ (ou en un point).
*   **H2 :** $\sum f_n'$ converge uniformément sur tout segment $[a, b] \subset I$.

**Énoncé formel :**

$$ f = \sum_{n=0}^{+\infty} f_n \in C^1(I, E) \quad \text{et} \quad f' = \sum_{n=0}^{+\infty} f_n'. $$

**Démonstration :** Application du Thm 22 aux sommes partielles.

### 
**Subtilités :**

*   H1 porte sur $\sum f_n$, H2 porte sur $\sum f_n'$ : deux conditions sur deux séries différentes.
*   La convergence uniforme de $\sum f_n$ sur les compacts est une conséquence, pas une hypothèse.
*   **Pratique :** En général, on vérifie H2 par convergence normale de $\sum f_n'$.

**Pièges classiques :**
*   ❌ Exiger la convergence uniforme de $\sum f_n$ au lieu de la simple convergence.
*   ❌ Oublier de vérifier la convergence de $\sum f_n$ (même simple) séparément de celle de $\sum f_n'$.
*   ❌ Ne pas vérifier H2 sur les segments et se contenter de la convergence simple de $\sum f_n'$.

---

## FLASHCARD 52 — Théorème 30 : Régularité $C^k$ d'une série de fonctions

### RECTO
**Théorème 30 — Régularité $C^k$ d'une série de fonctions**

Énoncer le théorème de régularité $C^k$ pour les séries de fonctions.

### VERSO
**Hypothèses complètes :**

*   $I$ intervalle, $E$ Banach, $k \ge 1$.
*   Pour tout $n$, $f_n \in C^k(I, E)$.
*   Pour $j=1, \dots, k$ : $\sum f_n^{(j)}$ converge uniformément sur tout segment de $I$.
*   Pour $j=0$ : $\sum f_n$ converge simplement (ou en un point).

**Énoncé formel :**

$$ \sum f_n \in C^k(I, E) \quad \text{et} \quad \forall j \le k, \left( \sum f_n \right)^{(j)} = \sum f_n^{(j)}. $$

**Démonstration :** Récurrence sur $k$ via le Thm 29.

### 
**Pièges classiques :**
*   ❌ Oublier de vérifier la convergence uniforme sur les compacts de toutes les séries dérivées $\sum f_n^{(j)}$ jusqu'à l'ordre $k$.

---

# CHAPITRE 6 — Séries entières

## FLASHCARD 53 — Lemme 1 : Lemme d'Abel

### RECTO
**Lemme 1 — Lemme d'Abel (séries entières)**

**Contexte :** Soit $\sum a_n z^n$ une série entière.

Énoncer le lemme d'Abel : que peut-on déduire de la convergence (ou du caractère borné) de $\sum a_n z_0^n$ pour les $z$ avec $|z| < |z_0|$ ?

### VERSO
**Hypothèses et énoncé formel :**

Soit $\sum a_n z^n$ une série entière ($a_n \in \mathbb{C}$, ou dans un evn de Banach).

**Version 1 (convergence) :**
$$ \sum a_n z_0^n \text{ converge} \implies \forall z \text{ avec } |z| < |z_0|, \quad \sum a_n z^n \text{ converge absolument.} $$

**Version 2 (termes bornés) :**
$$ \exists M > 0, \forall n \in \mathbb{N}, |a_n z_0^n| \le M \implies \forall z \text{ avec } |z| < |z_0|, \quad \sum a_n z^n \text{ converge absolument.} $$

**Démonstration (Esquisse — version 2) :**
$$ |a_n z^n| = |a_n z_0^n| \cdot \left| \frac{z}{z_0} \right|^n \le M \cdot r^n, \quad r = \frac{|z|}{|z_0|} < 1. $$
La série $\sum M r^n$ est convergente (géométrique).

### 
**Subtilités :**

*   Le lemme d'Abel justifie l'existence d'un rayon de convergence $R \in [0, +\infty]$ tel que :
    *   $|z| < R$ : convergence absolue.
    *   $|z| > R$ : divergence.
    *   $|z| = R$ : pas de conclusion générale.
*   Convergence normale sur tout disque fermé $\bar{D}(0, r)$ avec $r < R$.

**Extensions :**

*   Le rayon de convergence est donné par $R = \frac{1}{\limsup_{n \to \infty} |a_n|^{1/n}}$ (formule de Hadamard).

**Pièges classiques :**
*   ❌ Conclure sur la convergence sur le cercle $|z| = |z_0|$ — le lemme ne dit rien.
*   ❌ Oublier que la convergence absolue est garantie, pas seulement simple.

---

## FLASHCARD 54 — Proposition 9 : Règle de d'Alembert pour les séries entières

### RECTO
**Proposition 9 — Règle de d'Alembert pour les séries entières**

**Contexte :** Soit $\sum a_n z^n$ une série entière à coefficients $a_n \in \mathbb{C}$, de rayon de convergence $R$.

**Question :** Énoncer la règle de d'Alembert pour les séries entières : si le rapport $|a_{n+1}|/|a_n|$ converge, que peut-on conclure sur $R$ ?

### VERSO
**Hypothèses complètes**
*   $\sum a_n z^n$ est une série entière à coefficients dans $\mathbb{C}$.
*   Les coefficients $a_n$ sont non nuls à partir d'un certain rang (pour que le rapport soit défini).
*   La limite $\ell = \lim_{n \to +\infty} \frac{|a_{n+1}|}{|a_n|}$ existe dans $[0, +\infty]$.

**Énoncé formel**
Si $\ell = \lim_{n \to +\infty} \frac{|a_{n+1}|}{|a_n|} \in [0, +\infty]$, alors $R = \frac{1}{\ell}$
avec les conventions $\frac{1}{0} = +\infty$ et $\frac{1}{+\infty} = 0$.

**Précision sur la convergence :**

$$ \forall z \in \mathbb{C}, \quad \left| \frac{a_{n+1} z^{n+1}}{a_n z^n} \right| = \frac{|a_{n+1}|}{|a_n|} \cdot |z| \xrightarrow[n \to +\infty]{} \ell |z| $$

*   Si $\ell |z| < 1$, i.e. $|z| < \frac{1}{\ell} = R$ : la série $\sum a_n z^n$ est absolument convergente (règle de d'Alembert pour les séries numériques).
*   Si $\ell |z| > 1$, i.e. $|z| > R$ : le terme général ne tend pas vers $0$, donc la série diverge grossièrement.
*   Si $\ell |z| = 1$, i.e. $|z| = R$ : aucune conclusion générale.

**Démonstration (Esquisse)**
*   **Réduction à d'Alembert numérique :** Pour $z$ fixé, on pose $u_n = a_n z^n$. On calcule $\left| \frac{u_{n+1}}{u_n} \right| = \frac{|a_{n+1}|}{|a_n|} \cdot |z| \to \ell |z|$.
*   **Application de la règle de d'Alembert pour les séries numériques :** Si $\ell |z| < 1$, alors $\sum |u_n|$ converge ; si $\ell |z| > 1$, alors $|u_n| \to +\infty$.
*   **Identification avec $R$ :** Par définition de $R = \sup \{|z| : \sum a_n z^n \text{ converge}\}$ (formule de Hadamard : $1/R = \limsup |a_n|^{1/n}$), et comme $\limsup |a_n|^{1/n} = \lim |a_n|^{1/n}$ lorsque $\lim |a_{n+1}|/|a_n|$ existe (et vaut la même limite), on conclut $R = 1/\ell$.

### 
**Subtilités**
*   La règle de d'Alembert ne donne que $R$, pas le comportement sur le cercle $|z| = R$. Le cercle de convergence est toujours à traiter à part, et c'est souvent là que se joue la finesse du problème de concours.
*   **La limite doit exister.** Si $\frac{|a_{n+1}|}{|a_n|}$ n'a pas de limite (par exemple si les $a_n$ oscillent), la règle de d'Alembert ne s'applique pas, et il faut recourir à la formule de Hadamard : $1/R = \limsup_{n \to +\infty} |a_n|^{1/n}$, qui est toujours valide.
*   **Condition « non nuls à partir d'un certain rang » :** Si $a_n = 0$ infiniment souvent (e.g. séries entières en $z^2$), le rapport $|a_{n+1}|/|a_n|$ n'est pas défini. Il faut alors utiliser Hadamard ou traiter directement la série avec le changement $w = z^2$.
*   **Cas $\ell = 0$ :** $R = +\infty$, la série entière est une fonction entière (ex : $e^z$, $\sin z$).
*   **Cas $\ell = +\infty$ :** $R = 0$, la série ne converge qu'en $z=0$.

**Extensions**
*   Validité pour $a_n \in \mathbb{C}$ : Oui, totalement. La règle s'applique en toute généralité dans $\mathbb{C}$.
*   Lien avec la formule de Hadamard : La formule de Hadamard $1/R = \limsup |a_n|^{1/n}$ est toujours vraie (sans hypothèse sur la convergence du rapport). D'Alembert est un cas particulier (corollaire) de Hadamard, valable uniquement lorsque la limite du rapport existe, car :
    $$ \lim_{n \to +\infty} \frac{|a_{n+1}|}{|a_n|} = \ell \implies \lim_{n \to +\infty} |a_n|^{1/n} = \ell $$
    (lemme classique : si $u_{n+1}/u_n \to \ell$ alors $u_n^{1/n} \to \ell$).
*   Ne pas confondre avec la règle de d'Alembert pour les séries numériques $\sum u_n$ : ici on calcule le rayon, et on retrouve ensuite d'Alembert numérique pour chaque $z$ fixé.

**Pièges classiques**
*   ❌ Oublier de vérifier le cercle $|z| = R$ : Écrire « la série converge pour $|z| \le R$ » est faux en général. La règle de d'Alembert ne dit rien sur $|z| = R$.
*   ❌ Confondre $R$ et $1/R$ : Très fréquent sous pression. Mémoriser : $R = 1/\ell$, donc si $|a_{n+1}/a_n| \to 2$, alors $R = 1/2$, pas $2$.
*   ❌ Appliquer la règle quand la limite n'existe pas : Si $a_n = 1 + (-1)^n$, le rapport oscille. Il faut impérativement passer à Hadamard.
*   ❌ Oublier la convention $1/0 = +\infty$ : Si $\ell = 0$ (coefficients décroissant très vite), la série converge partout. Si $\ell = +\infty$, elle ne converge qu'en $0$.
*   ❌ Croire que d'Alembert est équivalent à Hadamard : D'Alembert est une condition suffisante pour calculer $R$ (elle implique Hadamard), mais Hadamard est toujours applicable. D'Alembert est un outil pratique, pas un outil universel.

---

## FLASHCARD 55 — Proposition 10 : Produit de Cauchy de deux séries entières

### RECTO
**Proposition 10 — Produit de Cauchy de deux séries entières**

**Contexte :** Soient $\sum a_n z^n$ et $\sum b_n z^n$ deux séries entières à coefficients complexes, de rayons de convergence $R_1$ et $R_2$ respectivement.

**Question :** Énoncer la proposition sur le produit de Cauchy de deux séries entières : définition des coefficients, rayon de convergence du produit, et égalité des sommes.

### VERSO
**Hypothèses complètes**
*   $\sum_{n=0}^{+\infty} a_n z^n$ série entière de rayon $R_1 \in (0, +\infty]$.
*   $\sum_{n=0}^{+\infty} b_n z^n$ série entière de rayon $R_2 \in (0, +\infty]$.
*   $a_n, b_n \in \mathbb{C}$ pour tout $n \in \mathbb{N}$.

**Énoncé formel**
On définit les coefficients du produit de Cauchy par :
$$ \forall n \in \mathbb{N}, \quad c_n = \sum_{k=0}^n a_k b_{n-k} $$

Alors la série entière $\sum c_n z^n$ vérifie :
$$ R_{\text{produit}} \ge \min(R_1, R_2) $$

et pour tout $z \in \mathbb{C}$ avec $|z| < \min(R_1, R_2)$ :
$$ \left( \sum_{n=0}^{+\infty} a_n z^n \right) \cdot \left( \sum_{n=0}^{+\infty} b_n z^n \right) = \sum_{n=0}^{+\infty} c_n z^n $$

**Cas d'égalité du rayon :** Si $R_1 \neq R_2$, alors $R_{\text{produit}} = \min(R_1, R_2)$.

**Démonstration (Esquisse)**
*   **Convergence absolue :** Pour $|z| < \min(R_1, R_2)$, les deux séries $\sum a_n z^n$ et $\sum b_n z^n$ convergent absolument. C'est la condition requise pour le produit de Cauchy de séries numériques.
*   **Produit de Cauchy de séries absolument convergentes :** Si $\sum \alpha_n$ et $\sum \beta_n$ convergent absolument, leur produit de Cauchy $\sum \gamma_n$ (avec $\gamma_n = \sum_{k=0}^n \alpha_k \beta_{n-k}$) converge absolument, et sa somme est $(\sum \alpha_n)(\sum \beta_n)$.
*   **Application :** On pose $\alpha_n = a_n z^n$, $\beta_n = b_n z^n$, $\gamma_n = c_n z^n$, d'où le résultat pour tout $|z| < \min(R_1, R_2)$, ce qui donne $R_{\text{produit}} \ge \min(R_1, R_2)$.

### 
**Subtilités**
*   **Inégalité et non égalité du rayon :** En général, $R_{\text{produit}} \ge \min(R_1, R_2)$. Il peut être strictement plus grand : si $R_1 = R_2 = R$ et que les singularités des deux séries se « compensent », le produit peut avoir un rayon plus grand. Exemple classique : $\sum (-1)^n z^n$ (rayon 1) fois $\sum (-1)^n z^n$ (rayon 1) donne $\sum c_n z^n$ où le rayon peut dépasser 1.
*   **Si $R_1 \neq R_2$ :** Le rayon du produit vaut exactement $\min(R_1, R_2)$, car la singularité de la série de plus petit rayon ne peut pas être annulée par l'autre.
*   **Condition d'application :** L'égalité des sommes $(\sum a_n z^n)(\sum b_n z^n) = \sum c_n z^n$ nécessite la convergence absolue de l'une des deux séries (ou des deux). Pour les séries numériques, le produit de Cauchy de deux séries simplement convergentes peut diverger (contre-exemple de Cauchy lui-même).

**Extensions**
*   **Produit de Cauchy en série entière vs série numérique :** La situation est plus favorable pour les séries entières que pour les séries numériques générales, car dans le disque ouvert de convergence, les séries entières convergent absolument, ce qui rend le produit de Cauchy licite automatiquement.
*   **Application importante :** On utilise ce résultat pour multiplier des développements en séries entières : $(e^z)^2 = e^{2z}$, ou pour calculer $\tan z$ à partir des séries de $\sin z$ et $\cos z$ (division formelle).

**Pièges classiques**
*   ❌ Écrire $R_{\text{produit}} = \min(R_1, R_2)$ sans justification : C'est vrai si $R_1 \neq R_2$, mais c'est une inégalité large si $R_1 = R_2$. Ne pas affirmer l'égalité dans le cas $R_1 = R_2$ sans argument supplémentaire.
*   ❌ Confondre produit de Cauchy et produit terme à terme : $c_n = \sum_{k=0}^n a_k b_{n-k}$ est une convolution, pas $a_n b_n$.
*   ❌ Oublier la convergence absolue comme prérequis : Le produit de Cauchy de deux séries simplement convergentes peut ne pas converger. C'est la convergence absolue (garantie dans le disque ouvert pour les séries entières) qui sauve la situation.
*   **Sens de l'application :** Le produit de Cauchy donne la série entière du produit des sommes. Pour diviser deux séries entières (e.g. $\tan z = \sin z / \cos z$), il faut résoudre $\sum c_n z^n \cdot \sum b_n z^n = \sum a_n z^n$ par identification des coefficients — ce n'est pas immédiat.

---

## FLASHCARD 56 — Proposition 11 : Régularité de la somme d'une série entière

### RECTO
**Proposition 11 — Régularité de la somme d'une série entière**

**Contexte :** Soit $f(z) = \sum_{n=0}^{+\infty} a_n z^n$ une série entière à coefficients $a_n \in \mathbb{C}$, de rayon de convergence $R > 0$.

**Question :** Énoncer les propriétés de régularité (continuité, dérivabilité, classe $C^\infty$, formule des coefficients) de la somme $f$ sur son disque ouvert de convergence.

### VERSO
**Hypothèses complètes**
*   $\sum_{n=0}^{+\infty} a_n z^n$ série entière à coefficients $a_n \in \mathbb{C}$, de rayon de convergence $R \in (0, +\infty]$.
*   On note $D = \{z \in \mathbb{C} : |z| < R\}$ le disque ouvert de convergence (ou $I = (-R, R)$ si on se restreint aux réels).

**Énoncé formel**
1.  **Convergence normale sur tout compact :**
    $$ \forall r \in (0, R), \sum_{n=0}^{+\infty} a_n z^n \text{ converge normalement sur } \{|z| \le r\} $$
    car $\sum |a_n| r^n < +\infty$ pour $r < R$.

2.  **Continuité :**
    $f : z \mapsto \sum_{n=0}^{+\infty} a_n z^n$ est continue sur $D$.

3.  **Dérivabilité terme à terme (cas réel ou complexe) :**
    La série dérivée $\sum_{n=1}^{+\infty} n a_n z^{n-1}$ a le même rayon de convergence $R$, et :
    $$ \forall z \in D, \quad f'(z) = \sum_{n=1}^{+\infty} n a_n z^{n-1} = \sum_{n=0}^{+\infty} (n+1) a_{n+1} z^n $$

4.  **Régularité $C^\infty$ :**
    $$ f \in C^\infty(D, \mathbb{C}) \quad (\text{ou } C^\infty((-R, R), \mathbb{C}) \text{ sur } \mathbb{R}) $$
    et $\forall k \in \mathbb{N}$ :
    $$ f^{(k)}(z) = \sum_{n=k}^{+\infty} \frac{n!}{(n-k)!} a_n z^{n-k} $$

5.  **Formule des coefficients (identification) :**
    $$ \forall n \in \mathbb{N}, \quad a_n = \frac{f^{(n)}(0)}{n!} $$

**Démonstration (Esquisse)**
*   **Convergence normale sur $|z| \le r < R$ :** Pour $r < R$, $r$ est dans le disque de convergence, donc $\sum |a_n| r^n < +\infty$, et $\sup_{|z| \le r} |a_n z^n| \le |a_n| r^n$. La série des majorants converge, d'où la convergence normale.
*   **Continuité :** Conséquence directe de la convergence uniforme sur tout compact (limite uniforme de fonctions continues est continue).
*   **Dérivabilité :** On montre que la série dérivée $\sum n a_n z^{n-1}$ a le même rayon $R$ (car $\limsup |n a_n|^{1/n} = \limsup |a_n|^{1/n}$ puisque $n^{1/n} \to 1$). On applique le théorème de dérivation terme à terme (convergence normale sur tout compact $\implies$ permutation dérivée/somme).
*   **Itération :** En itérant la dérivation, on obtient $C^\infty$ et la formule des coefficients en évaluant en $0$.

### 
**Subtilités**
*   **Le rayon de la série dérivée est exactement $R$ :** C'est un point crucial. La dérivation ne change pas le rayon de convergence. La preuve repose sur $\lim n^{1/n} = 1$, donc $\limsup |n a_n|^{1/n} = \limsup |a_n|^{1/n}$. Mais attention : le comportement sur le cercle $|z| = R$ peut changer (une série peut converger en un point du cercle, mais sa dérivée non).
*   **Convergence normale vs uniforme :** La convergence est normale (donc uniforme) sur tout compact inclus dans $D$, mais pas uniforme sur $D$ tout entier en général (sauf si $R=+\infty$).
*   **La formule $a_n = f^{(n)}(0)/n!$ est fondamentale :** Elle signifie que si deux séries entières coïncident sur un voisinage de $0$, elles ont les mêmes coefficients (unicité du développement en série entière).
*   **Dérivabilité complexe (holomorphie) :** Dans $\mathbb{C}$, $f$ est non seulement $C^\infty$ au sens réel mais holomorphe (analytique complexe) sur $D$. C'est un résultat bien plus fort que la simple régularité réelle.

**Extensions**
*   **Primitivation terme à terme :** De même, $\sum \frac{a_n}{n+1} z^{n+1}$ est une primitive de $f$ sur $D$, avec le même rayon $R$.
*   Une fonction $C^\infty$ réelle n'est pas nécessairement développable en série entière (exemple : $e^{-1/x^2}$ prolongée par $0$ en $0$). La proposition 11 va dans l'autre sens : une série entière est toujours $C^\infty$.
*   **En dimension infinie :** Ces résultats restent valables pour des séries entières à valeurs dans un espace de Banach $E$ (avec $|a_n|$ remplacé par $\|a_n\|$), pourvu que la notion de dérivabilité soit bien définie.

**Pièges classiques**
*   ❌ Croire que la dérivation peut changer le rayon : Non. $R_{\text{dérivée}} = R_{\text{originale}}$. Ce qui peut changer, c'est la convergence sur le cercle $|z| = R$.
*   ❌ Confondre convergence uniforme sur $D$ et sur les compacts de $D$ : La convergence est uniforme sur tout compact, pas sur $D$ ouvert en général.
*   ❌ Oublier la formule des coefficients : En concours, quand on demande de prouver que deux développements coïncident ou d'identifier une série entière, la formule $a_n = f^{(n)}(0)/n!$ est l'outil décisif.
*   ❌ Dériver sans vérifier le rayon : Avant de dériver terme à terme, il faut s'assurer qu'on est bien dans le disque ouvert de convergence. Le résultat ne s'applique pas directement sur le bord.

---

## FLASHCARD 57 — Proposition 12 : Développements en série entière au programme

### RECTO
**Proposition 12 — Développements en série entière au programme**

**Contexte :** On considère les fonctions usuelles définies sur $\mathbb{R}$ ou $\mathbb{C}$.

**Question :** Donner les développements en série entière au programme (exponentielle, sinus, cosinus, logarithme, puissance, géométrique), avec les rayons de convergence exacts et les domaines de validité.

### VERSO
**Énoncé formel — Développements au programme**

1.  **Exponentielle :**
    $$ \forall z \in \mathbb{C}, \quad e^z = \sum_{n=0}^{+\infty} \frac{z^n}{n!}, \quad R = +\infty $$

2.  **Cosinus et Sinus :**
    $$ \forall z \in \mathbb{C}, \quad \cos z = \sum_{n=0}^{+\infty} (-1)^n \frac{z^{2n}}{(2n)!}, \quad R = +\infty $$
    $$ \forall z \in \mathbb{C}, \quad \sin z = \sum_{n=0}^{+\infty} (-1)^n \frac{z^{2n+1}}{(2n+1)!}, \quad R = +\infty $$

3.  **Cosinus hyperbolique et Sinus hyperbolique :**
    $$ \forall z \in \mathbb{C}, \quad \cosh z = \sum_{n=0}^{+\infty} \frac{z^{2n}}{(2n)!}, \quad R = +\infty $$
    $$ \forall z \in \mathbb{C}, \quad \sinh z = \sum_{n=0}^{+\infty} \frac{z^{2n+1}}{(2n+1)!}, \quad R = +\infty $$

4.  **Série géométrique :**
    $$ \forall z \in \mathbb{C}, \ |z| < 1, \quad \frac{1}{1-z} = \sum_{n=0}^{+\infty} z^n, \quad R = 1 $$

5.  **Logarithme :**
    $$ \forall x \in (-1, 1], \quad \ln(1+x) = \sum_{n=1}^{+\infty} (-1)^{n-1} \frac{x^n}{n} = x - \frac{x^2}{2} + \frac{x^3}{3} - \dots, \quad R = 1 $$
    (Valide en $x=1$ par le théorème d'Abel, non valide en $x=-1$.)

6.  **Puissance $(1+x)^\alpha$ pour $\alpha \in \mathbb{R}$ :**
    $$ \forall x \in (-1, 1), \quad (1+x)^\alpha = \sum_{n=0}^{+\infty} \binom{\alpha}{n} x^n, \quad R = 1 $$
    où $\binom{\alpha}{n} = \frac{\alpha(\alpha-1)\dots(\alpha-n+1)}{n!}$ (coefficient binomial généralisé).
    (En $x=\pm 1$ : dépend de $\alpha$, cas particuliers.)

7.  **Arctangente :**
    $$ \forall x \in [-1, 1], \quad \arctan x = \sum_{n=0}^{+\infty} (-1)^n \frac{x^{2n+1}}{2n+1}, \quad R = 1 $$
    (Valide aux deux bornes $\pm 1$ par Abel.)

### 
**Subtilités**
*   **Domaine de $\ln(1+x)$ :** La série converge pour $x \in (-1, 1]$. En $x=1$ : convergence (série alternée) vers $\ln 2$. En $x=-1$ : divergence (série harmonique). Ne jamais écrire $|x| \le 1$ sans préciser $x \neq -1$.
*   **Domaine de $(1+x)^\alpha$ aux bornes :**
    *   $x=1$ : converge si $\alpha > -1$, diverge si $\alpha \le -1$.
    *   $x=-1$ : converge si $\alpha > 0$, diverge sinon.
    Ces cas limites sont hors programme strict mais peuvent apparaître en oral X/ENS.
*   **Série géométrique :** Valide pour $|z| < 1$ dans $\mathbb{C}$. En $|z|=1$, la série diverge (terme général ne tend pas vers $0$).
*   **Développement de $\arctan$ en $\pm 1$ :** Valide par le théorème d'Abel. En $x=1$ : $\arctan 1 = \pi/4 = \sum \frac{(-1)^n}{2n+1}$ (formule de Leibniz).

**Extensions**
*   **Développements dérivés :** On peut dériver terme à terme dans $(-1, 1)$ pour retrouver :
    $$ \frac{1}{1+x} = \sum_{n=0}^{+\infty} (-1)^n x^n, \quad \frac{1}{(1-x)^2} = \sum_{n=1}^{+\infty} n x^{n-1} $$
*   **Fonctions trigonométriques inverses :** $\arcsin x = \sum_{n=0}^{+\infty} \binom{2n}{n} \frac{x^{2n+1}}{4^n(2n+1)}$ pour $|x| < 1$, obtenu en intégrant $1/\sqrt{1-x^2}$.

**Pièges classiques**
*   ❌ **Indice de départ :** $\sum_{n=0}$ pour $e^z, \cos, \cosh, \frac{1}{1-z}$. $\sum_{n=1}$ pour $\ln(1+x)$ (premier terme est $n=1$). Confondre les indices fait perdre des points.
*   ❌ **Signe dans $\ln(1+x)$ :** $(-1)^{n-1}/n$ et non $(-1)^n/n$. Vérifier en $n=1$ : $+x$. ✓
*   ❌ **Domaine de validité du logarithme :** Écrire $|x| < 1$ sans inclure $x=1$ est incomplet (la convergence en $x=1$ est un résultat non trivial).
*   ❌ **Coefficient binomial généralisé :** $\binom{\alpha}{0} = 1, \binom{\alpha}{1} = \alpha, \binom{\alpha}{2} = \frac{\alpha(\alpha-1)}{2}$. Pour $\alpha=-1$ : $\binom{-1}{n} = (-1)^n$, d'où $\frac{1}{1+x} = \sum (-1)^n x^n$. Vérifier la cohérence avec la série géométrique.
*   ❌ **Oublier qu'on développe en puissances de $x$, pas de $x-a$ :** Ces développements sont centrés en $0$. Si on veut développer $f$ au voisinage de $a \neq 0$, il faut écrire $f(a+h)$ et développer en $h$.

---

## FLASHCARD 58 — À connaître 14 : Convergence normale d'une série entière

### RECTO
**À connaître 14 — Convergence normale d'une série entière**

**Contexte :** Soit $\sum a_n z^n$ une série entière à coefficients $a_n \in \mathbb{C}$, de rayon de convergence $R > 0$.

**Question :** Sur quel type de domaine la série entière converge-t-elle normalement ? Énoncer précisément le résultat avec les bonnes quantifications.

### VERSO
**Hypothèses complètes**
*   $\sum a_n z^n$ série entière, $a_n \in \mathbb{C}$, rayon de convergence $R \in (0, +\infty]$.
*   $r \in \mathbb{R}$ avec $0 \le r < R$.

**Énoncé formel**
$$ \forall r \in [0, R), \quad \sum_{n=0}^{+\infty} \sup_{|z| \le r} |a_n z^n| = \sum_{n=0}^{+\infty} |a_n| r^n < +\infty $$

**Autrement dit :**

La série entière $\sum a_n z^n$ converge normalement sur tout disque fermé $\overline{D}(0, r) = \{z \in \mathbb{C} : |z| \le r\}$ pour tout $r < R$.

**Conséquences immédiates :**

*   Convergence uniforme sur $\overline{D}(0, r)$ pour tout $r < R$.
*   La somme $f(z) = \sum_{n=0}^{+\infty} a_n z^n$ est continue sur $D(0, R)$.
*   La convergence n'est pas normale sur $D(0, R)$ ouvert en général.

**Démonstration (Esquisse)**
*   **Choix de $r' \in (r, R)$ :** Puisque $r < R$, il existe $r' \in (r, R)$ tel que $\sum |a_n| (r')^n < +\infty$.
*   **Majoration :** $|a_n| r^n = |a_n| (r')^n \cdot \left( \frac{r}{r'} \right)^n \le |a_n| (r')^n$ puisque $r/r' < 1$.
*   **Convergence de la série majorante :** $\sum |a_n| r^n \le \sum |a_n| (r')^n < +\infty$.

### 
**Subtilités**
*   **Convergence normale sur $\overline{D}(0, r)$ mais pas sur $D(0, R)$ :** C'est la distinction fondamentale. L'ouvert $D(0, R)$ est recouvert par une famille croissante de fermés $\overline{D}(0, r)$ pour $r \to R^-$. La convergence est uniforme sur chacun, mais pas globalement sur l'ouvert.
*   **"Compact" vs "disque fermé" :** En pratique, on dit que la série converge normalement sur tout compact inclus dans $D(0, R)$. Tout compact de $\mathbb{C}$ inclus dans $D(0, R)$ est contenu dans un $\overline{D}(0, r)$ pour un certain $r < R$.
*   **Sur le cercle $|z| = R$ :** La convergence doit être étudiée au cas par cas (Abel, critère des séries alternées, etc.). La convergence normale ne s'étend pas automatiquement.

**Extensions**
*   **Analogue pour les séries de fonctions :** Ce résultat est l'analogue exact, pour les séries entières, du théorème de régularité $C^k$ des séries de fonctions : convergence normale sur tout compact $\implies$ permutation limite/dérivée.
*   **Intégration terme à terme :** La convergence normale sur $\overline{D}(0, r)$ permet d'intégrer terme à terme sur tout chemin inclus dans $D(0, R)$.

**Pièges classiques**
*   ❌ **Affirmer la convergence normale sur $D(0, R)$ ouvert :** Faux en général. Exemple : $\sum z^n$ converge normalement sur $\overline{D}(0, r)$ pour $r < 1$, mais $\sum \sup_{|z|<1} |z^n| = \sum 1 = +\infty$.
*   ❌ **Oublier que $r < R$ est strict :** La convergence de $\sum |a_n| r^n$ pour $r < R$ est garantie par définition de $R$, mais peut diverger pour $r=R$.
*   ❌ **Confondre convergence normale et convergence absolue :** La convergence absolue est en un point ; la convergence normale est uniforme sur un ensemble (et implique la convergence absolue en chaque point).

---

## FLASHCARD 59 — Proposition 13 : Lemme d'Abel radial (Théorème d'Abel)

### RECTO
**Proposition 13 — Lemme d'Abel radial**

**Contexte :** Soit $\sum_{n=0}^{+\infty} a_n$ une série à coefficients $a_n \in \mathbb{C}$, supposée convergente (de somme $S$). On considère la série entière réelle $f(x) = \sum_{n=0}^{+\infty} a_n x^n$, de rayon de convergence $R \ge 1$.

**Question :** Énoncer le lemme d'Abel radial : que peut-on dire du comportement de $f(x)$ quand $x \to 1^-$ ?

### VERSO
**Hypothèses complètes**
*   $\sum_{n=0}^{+\infty} a_n$ est une série convergente (au sens usuel des séries numériques dans $\mathbb{C}$), de somme $S = \sum_{n=0}^{+\infty} a_n$.
*   La série entière $f(x) = \sum_{n=0}^{+\infty} a_n x^n$ a un rayon de convergence $R \ge 1$ (garanti par la convergence de $\sum a_n$).

**Énoncé formel**
$$ \lim_{\substack{x \to 1 \\ x < 1}} f(x) = \lim_{x \to 1^-} \sum_{n=0}^{+\infty} a_n x^n = \sum_{n=0}^{+\infty} a_n = S $$

Autrement dit : on peut permuter la limite $x \to 1^-$ et la sommation, et la somme de la série entière en $x=1$ coïncide avec la limite radiale.

**Formulation équivalente :** Si $f : [0, 1) \to \mathbb{C}$ est définie par $f(x) = \sum_{n \ge 0} a_n x^n$ et si $\sum a_n$ converge, alors $f$ est prolongeable par continuité en $x=1$ et $f(1^-) = \sum_{n \ge 0} a_n$.

**Démonstration (Esquisse)**
*   **Transformation d'Abel (sommation par parties) :** On pose $S_N = \sum_{n=0}^N a_n$ et $S_{-1} = 0$. On écrit :
    $$ f(x) = \sum_{n=0}^N a_n x^n + R_N(x) = \sum_{n=0}^N (S_n - S_{n-1}) x^n + R_N(x) $$
    En sommant par parties, on obtient une expression faisant apparaître $(1-x) \sum S_n x^n$.
*   **Convergence de $S_n \to S$ :** On décompose $f(x) - S = (1-x) \sum_{n=0}^{+\infty} (S_n - S) x^n$ et on montre que cette expression tend vers $0$ quand $x \to 1^-$, en utilisant que $S_n - S \to 0$ et que $(1-x) \sum x^n = 1$.
*   **Conclusion :** $|f(x) - S| \le \varepsilon$ pour $x$ assez proche de $1$, d'où la limite.

### 
**Subtilités**
*   **La réciproque est fausse :** Si $\lim_{x \to 1^-} f(x) = L$, on ne peut pas conclure que $\sum a_n$ converge et vaut $L$. Contre-exemple classique : $\sum (-1)^n x^n = \frac{1}{1+x} \to 1/2$ quand $x \to 1^-$, alors que $\sum (-1)^n$ diverge. On dit que $\sum (-1)^n$ est somme d'Abel $1/2$.
*   **Sens de la limite :** radial (le long de l'axe réel). Le lemme d'Abel radial ne dit rien de la limite selon d'autres directions dans $\mathbb{C}$. La version plus forte (lemme d'Abel non tangentiel) est plus délicate.
*   **Rayon $R \ge 1$ est automatique :** Si $\sum a_n$ converge, alors $a_n \to 0$, donc $(a_n)$ est bornée, donc $\limsup |a_n|^{1/n} \le 1$, donc $R \ge 1$. La convergence de $\sum a_n$ garantit que le point $x=1$ est au moins sur le cercle de convergence.
*   **Application principale :** prolongement par continuité. Si on connaît la série entière sur $(-1, 1)$ et que la série $\sum a_n$ converge, on peut calculer la valeur en $x=1$ par continuité radiale.

**Extensions**
*   **Théorème de Tauber (réciproque partielle) :** Si $f(x) \to L$ quand $x \to 1^-$ ET si $n a_n \to 0$, alors $\sum a_n$ converge et vaut $L$. C'est un résultat profond (hors programme, mais connu des meilleurs élèves).
*   **Lemme d'Abel sur le cercle $|z| = R$ :** Plus généralement, si $\sum a_n z_0^n$ converge pour $|z_0| = R$, alors $f(r z_0) \to \sum a_n z_0^n$ quand $r \to 1^-$ (en approchant radialement $z_0$).

**Applications classiques :**
*   $\ln 2 = \sum_{n=1}^{+\infty} \frac{(-1)^{n-1}}{n}$ (Abel sur $\ln(1+x)$ en $x=1$).
*   $\frac{\pi}{4} = \sum_{n=0}^{+\infty} \frac{(-1)^n}{2n+1}$ (formule de Leibniz, Abel sur $\arctan$ en $x=1$).

**Pièges classiques**
*   ❌ **Appliquer Abel sans vérifier la convergence de $\sum a_n$ :** C'est l'hypothèse clé. Si $\sum a_n$ diverge, on ne peut pas conclure sur $\lim_{x \to 1^-} f(x)$ via Abel.
*   ❌ **Confondre « la série converge en $x=1$ » et « la limite radiale existe » :** Ce sont deux choses différentes. Abel dit : convergence de $\sum a_n \implies$ limite radiale = $\sum a_n$. Mais la limite radiale peut exister sans que la série converge en $1$ (exemple $\sum (-1)^n x^n$).
*   ❌ **Oublier que la limite est unilatérale $x \to 1^-$ :** On approche $1$ par valeurs inférieures (dans le disque de convergence). Ce n'est pas une limite bilatérale.
*   ❌ **Tenter d'appliquer Abel à une série divergente pour « sommer » une série divergente :** La somme d'Abel est un procédé de sommation régulier, pas une somme ordinaire. Les confondre est une faute grave.

---

## FLASHCARD 60 — À connaître 15 : Formule intégrale de Cauchy

### RECTO
**À connaître 15 — Formule intégrale de Cauchy**

**Contexte :** Soit $f : U \to \mathbb{C}$ une fonction holomorphe sur un ouvert $U$ de $\mathbb{C}$. Soit $\gamma$ un lacet (chemin fermé) inclus dans $U$, de classe $C^1$ par morceaux, d'indice $\text{Ind}(\gamma, a) = 1$ autour d'un point $a \in U \setminus \gamma$.

**Question :** Énoncer la formule intégrale de Cauchy (pour $f(a)$ et pour les dérivées $f^{(n)}(a)$).

### VERSO
**Hypothèses complètes**
*   $U \subset \mathbb{C}$ ouvert.
*   $f : U \to \mathbb{C}$ holomorphe sur $U$ (i.e., $\mathbb{C}$-différentiable en tout point de $U$).
*   $\gamma : [0, 1] \to U$ lacet de classe $C^1$ par morceaux, à valeurs dans $U$, tel que $a \notin \gamma([0, 1])$ et $\text{Ind}(\gamma, a) = \frac{1}{2\pi i} \int_\gamma \frac{dz}{z-a} = 1$.
*   (Cas pratique le plus courant : $\gamma$ est le cercle $\gamma(t) = a + r e^{2\pi i t}$, $t \in [0, 1]$, parcouru une fois dans le sens direct, avec $\overline{D}(a, r) \subset U$.)

**Énoncé formel**
**Formule de Cauchy pour $f(a)$ :**
$$ f(a) = \frac{1}{2\pi i} \int_\gamma \frac{f(z)}{z-a} dz $$

**Formule de Cauchy pour les dérivées :**
$$ \forall n \in \mathbb{N}, \quad f^{(n)}(a) = \frac{n!}{2\pi i} \int_\gamma \frac{f(z)}{(z-a)^{n+1}} dz $$

**Inégalités de Cauchy :** Si $|f(z)| \le M$ sur $\gamma =$ cercle de rayon $r$ centré en $a$ :
$$ |f^{(n)}(a)| \le \frac{n! M}{r^n} $$

**Démonstration (Esquisse)**
*   **Pour $f(a)$ :** On écrit $\frac{f(z)}{z-a} = \frac{f(z)-f(a)}{z-a} + \frac{f(a)}{z-a}$. L'holomorphie assure que $\frac{f(z)-f(a)}{z-a}$ se prolonge en une fonction holomorphe, dont l'intégrale sur $\gamma$ est nulle (théorème de Cauchy). L'intégrale de $\frac{f(a)}{z-a}$ vaut $f(a) \cdot 2\pi i$ (calcul direct ou indice).
*   **Pour $f^{(n)}(a)$ :** On dérive sous le signe intégrale $n$ fois par rapport à $a$ (licite car la convergence est uniforme en $z$ sur $\gamma$) : $\frac{d^n}{da^n} \frac{1}{z-a} = \frac{n!}{(z-a)^{n+1}}$.
*   **Inégalités de Cauchy :** Majoration directe : $|f^{(n)}(a)| \le \frac{n!}{2\pi} \cdot \frac{M}{r^{n+1}} \cdot 2\pi r = \frac{n! M}{r^n}$.

### 
**Subtilités**
*   **Holomorphie est indispensable :** La formule est fausse pour une simple fonction $C^\infty$ réelle. Elle repose fondamentalement sur la $\mathbb{C}$-différentiabilité.
*   **L'indice doit valoir 1 :** Si $\text{Ind}(\gamma, a) = k$, la formule devient $f(a) = \frac{1}{2\pi i k} \int_\gamma \frac{f(z)}{z-a} dz$... ou plus précisément $\int_\gamma \frac{f(z)}{z-a} dz = 2\pi i \cdot \text{Ind}(\gamma, a) \cdot f(a)$.
*   **Conséquence majeure :** toute fonction holomorphe est analytique. La formule de Cauchy permet de développer $f$ en série entière autour de $a$ (en développant $\frac{1}{z-a}$ en série de $\frac{z_0-a}{z-a}$), ce qui démontre que holomorphe $\iff$ analytique en analyse complexe.
*   **Inégalités de Cauchy :** Elles permettent de prouver le théorème de Liouville : toute fonction holomorphe bornée sur $\mathbb{C}$ est constante (en faisant $r \to +\infty$, on obtient $|f^{(1)}(a)| \le M/r \to 0$).

**Extensions**
*   **Formule de Cauchy et calcul de résidus :** Si $f$ a un pôle d'ordre $n+1$ en $a$, on peut relier les résidus à la formule de Cauchy pour les dérivées.
*   **Développement en série de Laurent :** La formule intégrale de Cauchy sert de base à la théorie des séries de Laurent pour les fonctions méromorphes.
*   **Hors programme mais connu en oral ENS :** La formule de représentation intégrale est la base de la théorie $H^p$ des espaces de Hardy et de nombreux résultats d'approximation.

**Pièges classiques**
*   ❌ **Oublier le $n!$ dans la formule pour $f^{(n)}$ :** C'est $\frac{n!}{2\pi i}$, pas $\frac{1}{2\pi i}$.
*   ❌ **Confondre $(z-a)^{n+1}$ et $(z-a)^n$ :** Pour $f^{(n)}$, le dénominateur est $(z-a)^{n+1}$ (exposant $n+1$, non $n$).
*   ❌ **Croire que la formule s'applique à $C^\infty$ réel :** Elle est spécifique à l'analyse complexe. Une fonction $C^\infty$ réelle ne satisfait pas une telle formule intégrale.
*   ❌ **Oublier la condition $\overline{D}(a, r) \subset U$ :** La formule nécessite que le disque fermé soit entièrement dans le domaine d'holomorphie.

---

## FLASHCARD 61 — À connaître 16 : Équivalent d'une série entière à partir des coefficients

### RECTO
**À connaître 16 — Équivalent d'une série entière à partir des coefficients**

**Contexte :** Soit $f(x) = \sum_{n=0}^{+\infty} a_n x^n$ une série entière réelle de rayon de convergence $R > 0$. On suppose que le premier coefficient non nul est $a_N$ (i.e., $a_0 = a_1 = \dots = a_{N-1} = 0$ et $a_N \neq 0$).

**Question :** Donner l'équivalent de $f(x)$ au voisinage de $0$, et l'équivalent de $f(x)$ au voisinage du bord $x \to R^-$ lorsque $a_n \sim c \cdot r^{-n}$ pour un certain $r < R$.

### VERSO
**Énoncé formel**
1.  **Équivalent en $0$ (ordre du zéro) :**
    Si $a_0 = \dots = a_{N-1} = 0$ et $a_N \neq 0$, alors :
    $$ f(x) \underset{x \to 0}{=} a_N x^N + o(x^N), \quad \text{i.e., } f(x) \underset{x \to 0}{\sim} a_N x^N $$
    C'est une conséquence directe de la continuité et de la formule $a_n = f^{(n)}(0)/n!$.

2.  **Équivalent en $x \to R^-$ (singularité dominante) :**
    Si les coefficients satisfont $a_n \sim c \cdot \rho^{-n}$ quand $n \to +\infty$ (avec $\rho = R$, i.e., $\rho^{-1} = R^{-1}$ est le rayon), alors le comportement de $f(x)$ près de $x=R$ est dicté par la singularité dominante. Cas typique :
    *   Si $a_n \sim \frac{c}{R^n}$ (tous les $a_n$ du même signe, positifs), alors $f(x) \to +\infty$ quand $x \to R^-$ et :
        $$ f(x) \underset{x \to R^-}{\sim} \frac{c}{1 - x/R} \cdot \frac{1}{R^n} \dots $$
        (Le comportement exact dépend de la nature de la singularité.)
    *   **Cas particulier fondamental :** Si $a_n \sim \frac{C}{n^\alpha R^n}$ pour $\alpha > 0$, alors
        $$ f(x) \sim C \cdot \frac{(-\ln(1-x/R))^{\alpha-1}}{(\alpha-1)!} $$
        (lié aux séries de Bertrand au bord).

3.  **Lemme de transfert (cas élémentaire) :**
    Si $f(x) = \sum_{n=0}^{+\infty} a_n x^n$ avec $a_n \ge 0$ et $a_n \sim \frac{c}{R^n}$ quand $n \to \infty$, alors :
    $$ f(x) \underset{x \to R^-}{\sim} \frac{c R}{R-x} $$
    car $\sum_{n \ge 0} x^n / R^n = \frac{R}{R-x} \to +\infty$.

**Démonstration (Esquisse)**
*   **Pour l'équivalent en $0$ :** Développement de Taylor à l'ordre $N$ : $f(x) = a_N x^N + a_{N+1} x^{N+1} + \dots = a_N x^N(1 + O(x))$.
*   **Pour l'équivalent au bord :** On utilise la comparaison $\sum a_n x^n \sim c \sum (x/R)^n \cdot \dots$ (somme géométrique) lorsque $a_n$ est équivalent à un terme géométrique, et le résultat de sommation des équivalents de séries à termes positifs.

### 
**Subtilités**
*   L'équivalent en $0$ est immédiat mais l'équivalent au bord est subtil et dépend du type de singularité (pôle simple $\leftrightarrow \frac{c}{R-x}$, singularité logarithmique $\leftrightarrow \ln \frac{1}{R-x}$, etc.).
*   La « singularité dominante » est la singularité de $f$ la plus proche de $0$ dans $\mathbb{C}$. Pour une série entière réelle, c'est généralement le point $x=R$ ou $x=-R$ (ou un point du cercle $|z|=R$).
*   **Attention aux séries entières lacunaires :** Si $f(x) = \sum a_{2n} x^{2n}$ (série en $x^2$), l'équivalent en $0$ commence au premier terme non nul, et la singularité est à $|z|=R$ mais peut être atteinte pour $x=R$ et $x=-R$ (ou $iz = \pm R$).

**Extensions**
*   **Théorie de Darboux / méthode des singularités (combinatoire analytique) :** Dans le cadre de la combinatoire analytique (Flajolet-Sedgewick), on extrait des équivalents des coefficients $a_n$ à partir du type de singularité de $f$. C'est une généralisation systématique de ces idées.
*   **Séries génératrices :** En combinatoire, $f(x) = \sum a_n x^n$ où $a_n$ compte des structures de taille $n$. L'équivalent de $a_n$ (comportement asymptotique du nombre de structures) est déduit du type de singularité de $f$.

**Pièges classiques**
*   ❌ **Confondre « rayon de convergence » et « singularité » :** La singularité de $f$ est au rayon $R$, mais $f$ peut être analytique en certains points du cercle et singulière en d'autres.
*   ❌ **Sommation abusive des équivalents :** Pour passer de $a_n \sim b_n$ à $\sum a_n x^n \sim \sum b_n x^n$, il faut des hypothèses (termes de même signe, ou convergence dominée). Ce n'est pas automatique pour des séries alternées.
*   ❌ **Oublier que l'équivalent en $0$ est $a_N x^N$ et non $a_N x^N + a_{N+1} x^{N+1}$ :** L'équivalent est le terme dominant. Le suivant est un $o$.

---

## FLASHCARD 62 — Théorème 31 : Théorème de convergence dominée (mesure de Lebesgue)

### RECTO
**Théorème 31 — Théorème de convergence dominée**

**Contexte :** Soit $(f_n)_{n \in \mathbb{N}}$ une suite de fonctions mesurables sur un espace mesuré $(\Omega, \mathcal{A}, \mu)$ (en pratique : $\Omega \subset \mathbb{R}$, $\mu = \text{mesure de Lebesgue}$ ou mesure de comptage).

**Question :** Énoncer le théorème de convergence dominée (TCD) avec ses hypothèses exactes et ses conclusions (convergence de l'intégrale, permutation limite-intégrale, convergence $L^1$).

### VERSO
**Hypothèses complètes**
*   $(\Omega, \mathcal{A}, \mu)$ espace mesuré ($\Omega$ intervalle de $\mathbb{R}$, $\mu = \text{mesure de Lebesgue}$, ou $\Omega = \mathbb{N}$, $\mu = \text{mesure de comptage}$).
*   $(f_n)_{n \in \mathbb{N}}$ suite de fonctions mesurables $f_n : \Omega \to \mathbb{R}$ (ou $\mathbb{C}$).
*   **Convergence presque partout :** $f_n \xrightarrow[n \to +\infty]{} f$ p.p. sur $\Omega$ (i.e., $\mu$-presque partout).
*   **Domination :** $\exists g : \Omega \to [0, +\infty]$ intégrable (i.e., $\int_\Omega g d\mu < +\infty$) telle que :
    $$ \forall n \in \mathbb{N}, \quad |f_n| \le g \quad \mu\text{-p.p.} $$

**Énoncé formel**
Sous ces hypothèses :

1.  $f$ est intégrable : $f \in L^1(\Omega, \mu)$.
2.  **Convergence $L^1$ :**
    $$ \lim_{n \to +\infty} \int_\Omega |f_n - f| d\mu = 0 $$
3.  **Permutation limite-intégrale :**
    $$ \lim_{n \to +\infty} \int_\Omega f_n d\mu = \int_\Omega f d\mu = \int_\Omega \lim_{n \to +\infty} f_n d\mu $$

**Démonstration (Esquisse)**
*   **Lemme de Fatou :** Pour des fonctions positives mesurables $(h_n) \ge 0$ : $\int \liminf h_n \le \liminf \int h_n$.
*   **Application à $g - f_n \ge 0$ et $g + f_n \ge 0$ :** On applique Fatou à ces deux suites positives (qui convergent p.p. vers $g-f$ et $g+f$) pour obtenir des inégalités dans les deux sens.
*   **Conclusion :** On déduit $\limsup \int f_n \le \int f \le \liminf \int f_n$, donc $\int f_n \to \int f$. La convergence $L^1$ s'obtient en appliquant le même raisonnement à $|f_n - f| \le 2g$.

### 
**Subtilités**
*   **La domination doit être par une fonction $g$ intégrable, pas seulement bornée.** Si $\Omega = \mathbb{R}$ et $|f_n| \le 1$, on ne peut pas appliquer TCD directement car la fonction constante 1 n'est pas intégrable sur $\mathbb{R}$ (mais elle l'est sur un segment $[a, b]$).
*   **Convergence p.p. et non convergence partout :** Il suffit que $f_n \to f$ hors d'un ensemble de mesure nulle. En pratique, si on a la convergence partout, c'est encore mieux.
*   La limite $f$ est bien mesurable (limite p.p. de fonctions mesurables est mesurable).
*   **TCD sur $\mathbb{N}$ (mesure de comptage) :** Le TCD appliqué à $\Omega = \mathbb{N}$, $\mu = \text{mesure de comptage}$ donne : si $u_{n,k} \to v_k$ pour tout $k$ et $|u_{n,k}| \le w_k$ avec $\sum w_k < +\infty$, alors $\sum_k u_{n,k} \to \sum_k v_k$. C'est le théorème de convergence dominée pour les séries (À connaître 5).
*   **Pas d'hypothèse de monotonie :** Contrairement au théorème de convergence monotone (TCM), TCD n'exige pas la monotonie des $f_n$.

**Extensions**
*   **Cas $L^p$ :** Si $|f_n|^p \le g \in L^1$, on obtient $f_n \to f$ dans $L^p$.
*   **TCD à paramètre continu :** Si $f_n$ est remplacée par $f_t$ avec $t \to t_0$ continu, l'analogue du TCD (Théorème 32) s'applique avec les mêmes hypothèses (convergence p.p. remplacée par convergence p.p. pour $t \to t_0$, et domination uniforme en $t$).
*   **Relation avec l'intégrale de Riemann :** Pour les fonctions Riemann-intégrables sur $[a, b]$, le TCD (dans sa version Lebesgue) est plus puissant. Les théorèmes 21 et 28 (convergence uniforme sur un segment) sont des cas particuliers où la domination est triviale (borne uniforme sur un compact).

**Pièges classiques**
*   ❌ **Oublier de vérifier l'intégrabilité de $g$ :** La dominante doit être intégrable. Une dominante bornée ne suffit pas sur un domaine non borné.
*   ❌ **Confondre convergence p.p. et convergence uniforme :** TCD n'exige pas la convergence uniforme (c'est son avantage sur les théorèmes du chapitre 4). La convergence p.p. suffit.
*   ❌ **Appliquer TCD sans dominante :** Si on ne peut pas exhiber de dominante intégrable, TCD ne s'applique pas. Il faut chercher une autre méthode (TCM, Fatou, intégration par parties, etc.).
*   ❌ **Oublier que la conclusion inclut la convergence $L^1$** (pas seulement la permutation limite-intégrale). En concours, on peut demander les deux.
*   ❌ **Ne pas vérifier la mesurabilité de $f_n$ :** TCD s'applique aux fonctions mesurables. En pratique, les fonctions continues, continues par morceaux, ou limites de telles fonctions sont mesurables — mais il faut le mentionner.

---

## FLASHCARD 63 — Théorème 32 : TCD à paramètre continu

### RECTO
**Théorème 32 — Théorème de convergence dominée à paramètre continu**

**Contexte :** Soit $f : \Omega \times I \to \mathbb{R}$ (ou $\mathbb{C}$) où $(\Omega, \mathcal{A}, \mu)$ est un espace mesuré et $I$ est un intervalle de $\mathbb{R}$ (ou un espace métrique). On pose $F(t) = \int_\Omega f(x, t) d\mu(x)$.

**Question :** Énoncer le théorème de convergence dominée à paramètre continu (continuité de $F$ et permutation limite-intégrale).

### VERSO
**Hypothèses complètes**
1.  **Continuité en $t$ :** Pour $\mu$-presque tout $x \in \Omega$, la fonction $t \mapsto f(x, t)$ est continue en $t_0 \in I$ (ou sur $I$).
2.  **Domination uniforme en $t$ :** $\exists g \in L^1(\Omega, \mu)$, $g \ge 0$, telle que :
    $$ \forall t \in I, \quad |f(x, t)| \le g(x) \quad \mu\text{-p.p. en } x $$
3.  Pour tout $t \in I$, $x \mapsto f(x, t)$ est mesurable.

**Énoncé formel**
**Continuité de $F$ en $t_0$ :**
$$ F(t) = \int_\Omega f(x, t) d\mu(x) \xrightarrow[t \to t_0]{} \int_\Omega f(x, t_0) d\mu(x) = F(t_0) $$

Autrement dit, on peut permuter la limite et l'intégrale :
$$ \lim_{t \to t_0} \int_\Omega f(x, t) d\mu(x) = \int_\Omega \lim_{t \to t_0} f(x, t) d\mu(x) $$

Si de plus la continuité en $t_0$ est valable pour tout $t_0 \in I$, alors $F$ est continue sur $I$.

**Démonstration (Esquisse)**
*   **Réduction à TCD discret :** Pour toute suite $t_n \to t_0$, on pose $f_n(x) = f(x, t_n)$. Alors $f_n(x) \to f(x, t_0)$ p.p. (par hypothèse de continuité p.p.) et $|f_n(x)| \le g(x)$ p.p.
*   **Application du TCD (discret, Théorème 31) :** On conclut $\int f_n d\mu \to \int f(\cdot, t_0) d\mu$, i.e., $F(t_n) \to F(t_0)$.
*   **Caractérisation séquentielle de la continuité :** Comme toute suite $t_n \to t_0$ donne $F(t_n) \to F(t_0)$, $F$ est continue en $t_0$.

### 
**Subtilités**
*   **La domination doit être uniforme en $t$ :** $|f(x, t)| \le g(x)$ pour tous les $t \in I$. Si la domination n'est uniforme que sur un voisinage de $t_0$, c'est suffisant pour la continuité en $t_0$.
*   **Continuité p.p. et non partout :** Il suffit que $t \mapsto f(x, t)$ soit continue en $t_0$ pour $\mu$-presque tout $x$. En pratique, souvent continue partout.
*   **Lien avec le Théorème 36 (continuité des intégrales à paramètre) :** Le Théorème 36 du chapitre 8 est précisément ce résultat dans le cadre des intégrales à paramètre (éventuellement impropres). Le Théorème 32 est la version abstraite (mesure quelconque).

**Extensions**
*   **Version pour la dérivabilité :** C'est l'objet du Théorème 37. On remplace la continuité en $t$ par la dérivabilité en $t$, et on ajoute une domination de $\partial_t f$.
*   **Paramètre dans $\mathbb{R}^d$ :** Le théorème s'étend à $t \in U \subset \mathbb{R}^d$ (ou espace métrique quelconque) avec la même preuve (caractérisation séquentielle).

**Pièges classiques**
*   ❌ **Domination locale vs globale :** Pour la continuité en $t_0$, une domination locale (sur un voisinage de $t_0$) suffit. Pour la continuité sur tout $I$, il faut une domination globale uniforme sur $I$.
*   ❌ **Oublier de vérifier la mesurabilité :** $x \mapsto f(x, t)$ doit être mesurable pour chaque $t$. C'est souvent évident (fonctions continues, etc.) mais doit être mentionné.
*   ❌ **Confondre ce théorème avec le théorème de régularité $C^1$ :** Ce théorème donne la continuité de $F$. Pour la dérivabilité, il faut le Théorème 37 avec des hypothèses supplémentaires sur $\partial_t f$.

---

## FLASHCARD 64 — Théorème 33 : TCD appliqué aux sommes partielles (permutation série-intégrale)

### RECTO
**Théorème 33 — Théorème de convergence dominée appliqué aux sommes partielles**

**Contexte :** Soit $(u_n)_{n \in \mathbb{N}}$ une suite de fonctions mesurables sur $(\Omega, \mathcal{A}, \mu)$.

**Question :** Énoncer le théorème permettant de permuter une somme de série et une intégrale, en précisant les hypothèses exactes (convergence p.p., domination intégrable de la somme partielle).

### VERSO
**Hypothèses complètes**
*   $u_n : \Omega \to \mathbb{R}$ (ou $\mathbb{C}$) mesurables pour tout $n \in \mathbb{N}$.
*   La série $\sum_{n=0}^{+\infty} u_n(x)$ converge p.p. sur $\Omega$.
*   **Domination (convergence dominée) :** $\exists g \in L^1(\Omega, \mu)$, $g \ge 0$, telle que :
    $$ \forall N \in \mathbb{N}, \quad \left| \sum_{n=0}^N u_n(x) \right| \le g(x) \quad \mu\text{-p.p.} $$
    (En pratique : il suffit que $\sum_{n=0}^{+\infty} |u_n(x)| \le g(x)$ p.p., ce qui est une condition suffisante.)

**Énoncé formel**
Sous ces hypothèses :

$$ \int_\Omega \sum_{n=0}^{+\infty} u_n(x) d\mu(x) = \sum_{n=0}^{+\infty} \int_\Omega u_n(x) d\mu(x) $$

De plus, chaque $u_n$ est intégrable et la série $\sum \int_\Omega u_n d\mu$ converge absolument.

**Condition suffisante pratique (domination par la somme des valeurs absolues) :**

Si $\sum_{n=0}^{+\infty} \int_\Omega |u_n(x)| d\mu(x) < +\infty$, alors les hypothèses du théorème sont satisfaites et la permutation est licite.

**Démonstration (Esquisse)**
*   **Application du TCD aux sommes partielles :** On pose $F_N(x) = \sum_{n=0}^N u_n(x)$. Par hypothèse, $F_N(x) \to F(x) = \sum_{n=0}^{+\infty} u_n(x)$ p.p., et $|F_N(x)| \le g(x) \in L^1$.
*   **TCD (Théorème 31) :** $\int F_N d\mu \to \int F d\mu$, i.e., $\sum_{n=0}^N \int u_n d\mu \to \int \sum_{n=0}^{+\infty} u_n d\mu$.
*   **Condition suffisante :** Si $\sum \int |u_n| < +\infty$, on peut prendre $g(x) = \sum_{n=0}^{+\infty} |u_n(x)|$ (intégrable par Beppo-Levi / TCM), et la domination est satisfaite.

### 
**Subtilités**
*   La condition pratique $\sum \int |u_n| < +\infty$ est suffisante mais pas nécessaire. La condition nécessaire est la domination des sommes partielles par une fonction intégrable.
*   **Lien avec le Théorème 35 (sommation $L^1$) :** Le Théorème 35 (Fubini-Tonelli pour les séries) est précisément l'application de ce résultat dans un cadre productif.
*   **Lien avec les Théorèmes 26-30 (séries de fonctions) :** La convergence normale d'une série de fonctions sur $[a, b]$ implique la domination par $\sum \|u_n\|_\infty \le M < +\infty$ (intégrable sur $[a, b]$), donc la permutation est licite — c'est la preuve sous-jacente du Théorème 28.

**Pièges classiques**
*   ❌ **Permuter série et intégrale sans vérifier la domination :** C'est la faute la plus commune. Sans domination, la permutation peut être fausse.
*   ❌ **Confondre $\sum \int |u_n| < +\infty$ et $\int \sum |u_n| < +\infty$ :** Par Beppo-Levi (TCM), ces deux conditions sont équivalentes (lorsque $u_n \ge 0$), mais il faut le justifier.
*   ❌ **Oublier que chaque $\int u_n$ doit exister** (i.e., $u_n \in L^1$) : c'est garanti par la domination $|u_n| \le g \in L^1$.

---

## FLASHCARD 65 — Théorème 34 : Théorème de convergence monotone (Beppo-Levi)

### RECTO
**Théorème 34 — Théorème de convergence monotone (Beppo-Levi)**

**Contexte :** Soit $(f_n)_{n \in \mathbb{N}}$ une suite de fonctions mesurables positives sur $(\Omega, \mathcal{A}, \mu)$.

**Question :** Énoncer le théorème de convergence monotone avec ses hypothèses exactes et sa conclusion (sans hypothèse d'intégrabilité de la dominante).

### VERSO
**Hypothèses complètes**
*   $(f_n)_{n \in \mathbb{N}}$ suite de fonctions mesurables et positives ($f_n : \Omega \to [0, +\infty]$).
*   **Monotonie croissante :** $f_n \le f_{n+1}$ $\mu$-p.p. pour tout $n \in \mathbb{N}$.
*   **Convergence p.p. :** $f_n \xrightarrow[n \to +\infty]{} f$ p.p. (avec $f = \sup_n f_n$).

**Énoncé formel**
$$ \lim_{n \to +\infty} \int_\Omega f_n d\mu = \int_\Omega \lim_{n \to +\infty} f_n d\mu = \int_\Omega f d\mu $$

Les deux membres peuvent valoir $+\infty$ simultanément. En particulier :
$$ \int_\Omega \sup_n f_n d\mu = \sup_n \int_\Omega f_n d\mu $$

**Corollaire (Beppo-Levi pour les séries) :** Si $u_n \ge 0$ mesurables, alors :
$$ \int_\Omega \sum_{n=0}^{+\infty} u_n d\mu = \sum_{n=0}^{+\infty} \int_\Omega u_n d\mu $$
(même si les deux membres valent $+\infty$).

**Démonstration (Esquisse)**
*   **Inégalité $\le$ :** Puisque $f_n \le f$ p.p., $\int f_n \le \int f$, donc $\lim \int f_n \le \int f$.
*   **Inégalité $\ge$ (via fonctions étagées) :** Pour toute fonction étagée $\phi \le f$ et tout $\alpha \in (0, 1)$, les ensembles $A_n = \{f_n \ge \alpha \phi\}$ croissent vers $\Omega$. On montre $\int f_n \ge \alpha \int_{A_n} \phi \to \alpha \int \phi$. En faisant $\alpha \to 1$ et en prenant le sup sur $\phi$, on obtient $\lim \int f_n \ge \int f$.

### 
**Subtilités**
*   **Positivité indispensable :** Le TCM exige $f_n \ge 0$. Pour des suites non positives, on utilise TCD (avec domination intégrable).
*   **Pas besoin d'intégrabilité :** Contrairement à TCD, le TCM ne suppose pas $f \in L^1$. Si $\int f = +\infty$, le théorème dit simplement $\int f_n \to +\infty$.
*   **TCM vs TCD :** TCD est plus fort (s'applique sans monotonie) mais exige une domination intégrable. TCM est plus faible (monotonie requise) mais sans condition d'intégrabilité.

**Pièges classiques**
*   ❌ **Appliquer TCM à des fonctions non positives :** Exemple classique où ça échoue : $f_n = -1/n \cdot 1_{[0, n]}$ est croissante (vers $0$), négative. TCM ne s'applique pas directement.
*   ❌ **Confondre TCM et TCD :** TCM ne donne aucun résultat de convergence $L^1$ ; il donne seulement la permutation limite-intégrale (avec possibilité de $+\infty$).
*   ❌ **Négliger le corollaire de Beppo-Levi :** La permutation série-intégrale pour des fonctions positives est toujours licite (sans aucune hypothèse supplémentaire), ce qui est très puissant.

---

## FLASHCARD 66 — Théorème 35 : Théorème de sommation $L^1$ (Fubini-Tonelli pour les séries)

### RECTO
**Théorème 35 — Théorème de sommation $L^1$**

**Contexte :** Soit $(u_{n, k})_{n, k \in \mathbb{N}}$ un tableau de réels (ou complexes). On veut intervertir l'ordre de deux sommes $\sum_n \sum_k$ et $\sum_k \sum_n$.

**Question :** Énoncer le théorème de Fubini-Tonelli pour les séries doubles (sommation $L^1$) : sous quelle condition peut-on intervertir les deux signes $\sum$ ?

### VERSO
**Hypothèses complètes**
*   $(u_{n, k})_{n, k \in \mathbb{N}}$ famille de complexes.
*   **Condition de sommabilité absolue :**
    $$ \sum_{n=0}^{+\infty} \sum_{k=0}^{+\infty} |u_{n, k}| < +\infty \quad (\text{ou équivalemment : } \sum_k \sum_n |u_{n, k}| < +\infty) $$

**Énoncé formel**
Si $\sum_{n, k} |u_{n, k}| < +\infty$ (sommabilité absolue), alors :

$$ \sum_{n=0}^{+\infty} \sum_{k=0}^{+\infty} u_{n, k} = \sum_{k=0}^{+\infty} \sum_{n=0}^{+\infty} u_{n, k} $$

De plus, toutes les sommes partielles, itérées et doubles, convergent absolument, et la famille $(u_{n, k})_{n, k}$ est sommable.

**Version avec intégrale (Fubini-Tonelli) :** Sur $(\Omega_1 \times \Omega_2, \mu_1 \otimes \mu_2)$, si $\iint |f| d\mu_1 d\mu_2 < +\infty$, alors on peut intervertir les deux intégrales.

**Démonstration (Esquisse)**
*   **TCM (Beppo-Levi) :** On applique Beppo-Levi à $\sum_{n, k} |u_{n, k}|$ pour garantir la sommabilité absolue.
*   **TCD :** La domination $|\sum_k u_{n, k}| \le \sum_k |u_{n, k}|$ et la convergence de $\sum_n \sum_k |u_{n, k}|$ permettent d'appliquer TCD.
*   **Interversion :** On conclut que l'ordre de sommation est indifférent.

### 
**Subtilités**
*   **La condition est la sommabilité absolue, pas la convergence des séries itérées.** Il existe des exemples de séries doublement convergentes (pour lesquelles $\sum_n \sum_k u_{n, k}$ et $\sum_k \sum_n u_{n, k}$ convergent toutes deux) mais donnant des valeurs différentes, si $\sum_{n, k} |u_{n, k}| = +\infty$.
*   **Exemple classique de non-interversion :** $u_{n, k} = \begin{cases} 1 & \text{si } k=n \\ -1 & \text{si } k=n+1 \\ 0 & \text{sinon} \end{cases}$. Alors $\sum_n \sum_k u_{n, k} = 0$ mais $\sum_k \sum_n u_{n, k} = -1$ (en supposant les séries bien définies). Cela montre la nécessité de la sommabilité absolue.

**Pièges classiques**
*   ❌ **Intervertir deux $\sum$ sans vérification :** C'est la faute la plus grave et la plus fréquente. Il faut toujours vérifier $\sum_{n, k} |u_{n, k}| < +\infty$ avant d'intervertir.
*   ❌ **Confondre avec la Proposition 4 (sommation par paquets) :** La Proposition 4 traite du regroupement de termes d'une seule série. Ici, on traite d'une double série.
*   ❌ **Oublier la version Fubini pour les intégrales :** La condition d'intégrabilité de $|f|$ est l'analogue exact de la sommabilité absolue pour les séries.

---

## FLASHCARD 67 — Théorème 36 : Continuité des intégrales à paramètre

### RECTO
**Théorème 36 — Continuité des intégrales à paramètre**

**Contexte :** Soit $f : \Omega \times I \to \mathbb{R}$ (ou $\mathbb{C}$), où $\Omega$ est un espace mesuré et $I$ un intervalle de $\mathbb{R}$. On pose $F(t) = \int_\Omega f(x, t) d\mu(x)$.

**Question :** Énoncer le théorème de continuité de $F$ en un point $t_0 \in I$, avec les hypothèses exactes.

### VERSO
**Hypothèses complètes**
*   **(H1) Continuité en $t$ :** Pour $\mu$-presque tout $x \in \Omega$, la fonction $t \mapsto f(x, t)$ est continue en $t_0$.
*   **(H2) Intégrabilité pour chaque $t$ :** Pour tout $t \in I$, $x \mapsto f(x, t)$ est mesurable et $\int_\Omega |f(x, t)| d\mu(x) < +\infty$.
*   **(H3) Domination intégrable :** $\exists g \in L^1(\Omega, \mu)$, $g \ge 0$, telle que pour tout $t$ dans un voisinage $V$ de $t_0$ dans $I$ :
    $$ |f(x, t)| \le g(x) \quad \mu\text{-p.p. en } x $$

**Énoncé formel**
Sous (H1), (H2), (H3) :

$F$ est continue en $t_0$, i.e.,
$$ \lim_{t \to t_0} \int_\Omega f(x, t) d\mu(x) = \int_\Omega f(x, t_0) d\mu(x) $$

**Cas pratique — Intégrale sur un segment $[a, b]$ :**

Si $f : [a, b] \times I \to \mathbb{R}$ est continue (condition plus forte que (H1)), alors (H3) est automatiquement satisfaite avec $g(x) = \sup_{t \in K} |f(x, t)|$ pour tout compact $K \subset I$ (par continuité, $f$ est bornée sur $[a, b] \times K$). Donc $F$ est continue sur $I$.

**Démonstration (Esquisse)**
Application directe du Théorème 32 (TCD à paramètre continu) :
Pour toute suite $t_n \to t_0$ dans $I$, $f(x, t_n) \to f(x, t_0)$ p.p. (par (H1)) et $|f(x, t_n)| \le g(x)$ p.p. (par (H3)). Donc par TCD : $F(t_n) \to F(t_0)$. D'où la continuité par caractérisation séquentielle.

### 
**Subtilités**
*   **La domination peut être locale** (sur un voisinage de $t_0$) : Pour la continuité en $t_0$, il suffit que (H3) tienne sur un voisinage de $t_0$, pas nécessairement sur tout $I$.
*   **Cas de l'intégrale impropre :** Si $\Omega = [a, +\infty[$ et l'intégrale est impropre, la domination $|f(x, t)| \le g(x)$ avec $g \in L^1([a, +\infty[)$ est la condition clé. Sans cette domination, il faut étudier soigneusement la convergence uniforme en $t$ de l'intégrale impropre.
*   **Exemple type :** $F(t) = \int_0^{+\infty} e^{-tx} \frac{\sin x}{x} dx$. Pour étudier la continuité en $t_0 > 0$, on cherche $g(x) = e^{-t_0 x/2}/|x|$ (par exemple) intégrable sur $(0, +\infty)$.

**Pièges classiques**
*   ❌ **Appliquer le théorème sans vérifier la domination :** Toujours exhiber explicitement $g$ et vérifier $g \in L^1$.
*   ❌ **Confondre continuité en $t_0$ (domination locale) et continuité sur $I$ (domination globale) :** Pour la continuité sur tout $I$, il faut une domination uniforme sur tout $I$ (ou travailler sur des compacts de $I$).
*   ❌ **Négliger la mesurabilité de $x \mapsto f(x, t)$ :** Hypothèse nécessaire mais souvent implicite (fonctions continues, etc.).

---

## FLASHCARD 68 — Théorème 37 : Régularité $C^1$ des intégrales à paramètre

### RECTO
**Théorème 37 — Régularité $C^1$ des intégrales à paramètre**

**Contexte :** Soit $f : \Omega \times I \to \mathbb{R}$, $F(t) = \int_\Omega f(x, t) d\mu(x)$, où $I$ est un intervalle ouvert de $\mathbb{R}$.

**Question :** Énoncer le théorème de dérivabilité de $F$ sous le signe intégrale, avec les hypothèses exactes sur $f$ et $\partial_t f$.

### VERSO
**Hypothèses complètes**
*   **(H1) Intégrabilité initiale :** Pour tout $t \in I$, $x \mapsto f(x, t) \in L^1(\Omega, \mu)$.
*   **(H2) Dérivabilité en $t$ :** Pour $\mu$-presque tout $x \in \Omega$, $t \mapsto f(x, t)$ est dérivable sur $I$, et la dérivée partielle $\frac{\partial f}{\partial t}(x, t)$ est mesurable en $x$ pour tout $t$.
*   **(H3) Domination de la dérivée :** $\exists g \in L^1(\Omega, \mu)$, $g \ge 0$, telle que :
    $$ \forall t \in I, \quad \left| \frac{\partial f}{\partial t}(x, t) \right| \le g(x) \quad \mu\text{-p.p. en } x $$

**Énoncé formel**
Sous (H1), (H2), (H3) :

$F$ est dérivable sur $I$.

**Dérivation sous le signe intégrale :**
$$ \forall t \in I, \quad F'(t) = \int_\Omega \frac{\partial f}{\partial t}(x, t) d\mu(x) $$

$F \in C^1(I)$ si de plus $t \mapsto \frac{\partial f}{\partial t}(x, t)$ est continue en tout $t \in I$ p.p. en $x$ (ce qui assure la continuité de $F'$ par le Théorème 36).

**Démonstration (Esquisse)**
*   **Taux d'accroissement :** Pour $t, t+h \in I$, $h \neq 0$ :
    $$ \frac{F(t+h) - F(t)}{h} = \int_\Omega \frac{f(x, t+h) - f(x, t)}{h} d\mu(x) $$
*   **Théorème des accroissements finis :** $\left| \frac{f(x, t+h) - f(x, t)}{h} \right| \le \sup_{s \in I} \left| \frac{\partial f}{\partial t}(x, s) \right| \le g(x)$.
*   **TCD (Théorème 31) :** Quand $h \to 0$, $\frac{f(x, t+h) - f(x, t)}{h} \to \frac{\partial f}{\partial t}(x, t)$ p.p., dominé par $g \in L^1$. Donc $\frac{F(t+h) - F(t)}{h} \to \int \frac{\partial f}{\partial t}(x, t) d\mu(x)$.

### 
**Subtilités**
*   **La domination porte sur $\partial_t f$, pas sur $f$ elle-même.** Pour la dérivabilité, c'est la dérivée partielle qui doit être dominée. Pour la continuité (Théorème 36), c'est $f$ elle-même.
*   **$F \in C^1$ si $\partial_t f$ est continue en $t$ p.p. :** On applique le Théorème 36 à $\partial_t f$ pour obtenir la continuité de $F' = \int \partial_t f$.
*   **Itération :** En itérant (Théorème 38), si $\partial_t^k f$ est dominée pour tout $k \le n$, alors $F \in C^n(I)$ et $F^{(k)}(t) = \int \partial_t^k f(x, t) d\mu$.
*   **Cas de l'intégrale sur un segment $[a, b]$ :** Si $f \in C^1([a, b] \times I)$, alors $\partial_t f$ est continue sur le compact $[a, b] \times [t_0 - \varepsilon, t_0 + \varepsilon]$, donc bornée, donc la domination (H3) est automatique. $F \in C^1(I)$.

**Pièges classiques**
*   ❌ **Oublier de vérifier la domination de $\partial_t f$ (et non de $f$) :** L'erreur la plus fréquente. On vérifie la domination de la mauvaise fonction.
*   ❌ **Confondre dérivabilité et $C^1$ :** La dérivabilité de $F$ est donnée par (H1)+(H2)+(H3). La classe $C^1$ nécessite en plus la continuité de $F'$, qui demande une hypothèse supplémentaire sur la continuité de $\partial_t f$ en $t$.
*   ❌ **Oublier l'hypothèse (H1) :** $F(t)$ doit exister (i.e., $f(\cdot, t) \in L^1$) pour que la dérivée ait un sens.
*   ❌ **TAF dans la démonstration :** On utilise le TAF (accroissements finis) pour majorer le taux d'accroissement par la dérivée. Ne pas utiliser TCD directement sur le taux d'accroissement sans cette majoration.

---

## FLASHCARD 69 — Théorème 38 : Régularité $C^k$ des intégrales à paramètre

### RECTO
**Théorème 38 — Régularité $C^k$ des intégrales à paramètre**

**Contexte :** Soit $f : \Omega \times I \to \mathbb{R}$, $F(t) = \int_\Omega f(x, t) d\mu(x)$, $I$ intervalle ouvert.

**Question :** Énoncer le théorème de régularité $C^k$ de $F$, en précisant les hypothèses sur les dérivées partielles d'ordre $\le k$.

### VERSO
**Hypothèses complètes**
Pour un entier $k \ge 1$ :

*   **(H1)** Pour tout $t \in I$ et tout $j \in \{0, 1, \dots, k\}$, $x \mapsto \frac{\partial^j f}{\partial t^j}(x, t)$ est mesurable et intégrable.
*   **(H2)** Pour $\mu$-p.p. $x$, $t \mapsto f(x, t)$ est de classe $C^k$ sur $I$.
*   **(H3) Domination :** $\forall j \in \{0, 1, \dots, k\}$, $\exists g_j \in L^1(\Omega, \mu)$, $g_j \ge 0$, telle que :
    $$ \forall t \in I, \quad \left| \frac{\partial^j f}{\partial t^j}(x, t) \right| \le g_j(x) \quad \mu\text{-p.p.} $$
    (En pratique, on n'a besoin de dominer que la dérivée d'ordre $k$ : si $\partial_t^k f$ est dominée et continue en $t$ p.p., on peut se ramener par itération.)

**Énoncé formel**
Sous (H1), (H2), (H3) :

$$ F \in C^k(I) \quad \text{et} \quad \forall j \in \{1, \dots, k\}, \quad F^{(j)}(t) = \int_\Omega \frac{\partial^j f}{\partial t^j}(x, t) d\mu(x) $$

**Démonstration (Esquisse)**
Par récurrence sur $k$ en appliquant le Théorème 37 à chaque étape : on montre que $F' = \int \partial_t f$, puis que $F'' = (F')' = \int \partial_t^2 f$, etc.

### 
**Subtilités**
*   En pratique, on vérifie les hypothèses au rang $k$ seulement, et on prouve par récurrence que $F \in C^k$.
*   **Le cas $k=+\infty$ :** Si pour tout $j \in \mathbb{N}$, $\partial_t^j f$ est dominée par une fonction intégrable (uniforme en $t$), alors $F \in C^\infty(I)$. C'est le cas typique pour les fonctions de Laplace, Fourier, Gamma, etc.
*   **Exemple fondamental — Fonction Gamma :** $\Gamma(s) = \int_0^{+\infty} x^{s-1} e^{-x} dx$ est de classe $C^\infty$ sur $(0, +\infty)$, car $\partial_s^k (x^{s-1} e^{-x}) = (\ln x)^k x^{s-1} e^{-x}$, qui est intégrable sur $(0, +\infty)$ pour $s > 0$ (domination par $x^{s_0/2-1} e^{-x/2}$ sur un voisinage compact de $s_0$).

**Pièges classiques**
*   ❌ **Négliger la vérification pour chaque ordre de dérivation :** Il faut vérifier la domination pour toutes les dérivées d'ordre $0$ à $k$, pas seulement pour la dérivée d'ordre $k$.
*   ❌ **Oublier que le domaine de définition de $F$ peut changer :** Si $f(x, t)$ n'est intégrable que pour $t \in (a, b)$, alors $F$ n'est définie (et $C^k$) que sur $(a, b)$.
*   ❌ **Confondre $C^k$ en $t$ de $f$ et $C^k$ de $F$ :** Ce sont deux choses différentes. La régularité de $F$ est une conséquence de la régularité de $f$ en $t$ combinée à la domination, mais elle n'est pas évidente a priori.

---

# CHAPITRE 8 — Topologie

## FLASHCARD 70 — Proposition 14 : Caractérisation des ouverts et fermés (topologie des espaces métriques)

### RECTO
**Proposition 14 — Caractérisation des ouverts et fermés dans un espace métrique**

**Contexte :** Soit $(E, d)$ un espace métrique. Soit $A \subset E$.

**Question :** Donner les caractérisations équivalentes des ouverts et des fermés (en termes de boules, d'intérieur, d'adhérence, de complémentaire, et de suites).

### VERSO
**Énoncé formel**

**Caractérisation des ouverts :**
$A$ est ouvert si et seulement si l'une des conditions équivalentes suivantes est satisfaite :
*   $\forall x \in A, \exists r > 0, B(x, r) \subset A$ (toute boule ouverte centrée en $x$ est incluse dans $A$).
*   $A = \mathring{A}$ (l'intérieur de $A$ est $A$ lui-même).
*   $E \setminus A$ est fermé.

**Caractérisation des fermés :**
$F$ est fermé si et seulement si :
*   $E \setminus F$ est ouvert.
*   $F = \bar{F}$ (l'adhérence de $F$ est $F$ lui-même).
*   **Caractérisation séquentielle :** Toute suite $(x_n)$ d'éléments de $F$ qui converge dans $E$ a sa limite dans $F$ :
    $$ [(x_n) \subset F \text{ et } x_n \to \ell \in E] \implies \ell \in F $$

**Rappels :**
*   $\mathring{A} = \{x \in A : \exists r > 0, B(x, r) \subset A\}$ (intérieur).
*   $\bar{A} = \{x \in E : \forall r > 0, B(x, r) \cap A \neq \emptyset\}$ (adhérence).
*   $\partial A = \bar{A} \setminus \mathring{A}$ (frontière).

### 
**Subtilités**
*   La caractérisation séquentielle des fermés est valable dans les espaces métriques (et plus généralement dans les espaces à base dénombrable de voisinages). Dans un espace topologique général (non métrique), il faut utiliser les filtres ou les nets.
*   $\emptyset$ et $E$ sont à la fois ouverts et fermés (clopen). Dans $\mathbb{R}$, ce sont les seuls, mais dans un espace non connexe, il peut y en avoir d'autres.
*   L'intérieur est le plus grand ouvert inclus dans $A$ ; l'adhérence est le plus petit fermé contenant $A$.

**Pièges classiques**
*   ❌ **"Ni ouvert ni fermé" vs "ouvert et fermé" :** $[a, b)$ dans $\mathbb{R}$ est ni ouvert ni fermé. Ne pas confondre les deux situations.
*   ❌ **En dimension infinie**, les boules fermées ne sont pas compactes (Riesz) — mais elles restent fermées au sens topologique.
*   ❌ **Caractérisation séquentielle :** Elle s'applique aux espaces métriques mais pas aux espaces topologiques généraux. En concours, toujours préciser qu'on est dans un espace métrique.

---

## FLASHCARD 71 — Proposition 15 : Propriétés des ouverts et fermés (stabilité)

### RECTO
**Proposition 15 — Stabilité par opérations des ouverts et fermés**

**Contexte :** $(E, d)$ espace métrique. $(U_i)_{i \in I}$ famille d'ouverts, $(F_j)_{j \in J}$ famille de fermés.

**Question :** Énoncer les règles de stabilité des ouverts et fermés par unions et intersections (finie, dénombrable, quelconque), en précisant les cas où la stabilité est perdue.

### VERSO
**Énoncé formel**

**Pour les ouverts :**
*   **Union quelconque d'ouverts est ouverte :**
    $$ \bigcup_{i \in I} U_i \text{ est ouvert} $$
    (sans restriction sur la cardinalité de $I$).
*   **Intersection finie d'ouverts est ouverte :**
    $$ U_1 \cap U_2 \cap \dots \cap U_n \text{ est ouvert} $$
*   **Intersection infinie d'ouverts peut ne pas être ouverte :**
    $\bigcap_{n=1}^{+\infty} (-1/n, 1/n) = \{0\}$, qui est fermé.

**Pour les fermés :**
*   **Intersection quelconque de fermés est fermée :**
    $$ \bigcap_{j \in J} F_j \text{ est fermé} $$
*   **Union finie de fermés est fermée :**
    $$ F_1 \cup F_2 \cup \dots \cup F_n \text{ est fermé} $$
*   **Union infinie de fermés peut ne pas être fermée :**
    $\bigcup_{n=1}^{+\infty} [1/n, 1] = (0, 1]$, qui n'est pas fermé dans $\mathbb{R}$.

### 
**Subtilités**
*   La règle mnémotechnique : "Union quelconque d'ouverts, intersection finie d'ouverts. Intersection quelconque de fermés, union finie de fermés."
*   Les contre-exemples sont fondamentaux : $\bigcap_{n \ge 1} (-1/n, 1/n) = \{0\}$ (intersection infinie d'ouverts = fermé) et $\bigcup_{n \ge 1} [1/n, 1] = (0, 1]$ (union infinie de fermés = ni ouvert ni fermé).

**Pièges classiques**
*   ❌ Croire que l'intersection dénombrable d'ouverts est ouverte : Faux. C'est une confusion très fréquente.
*   ❌ Croire que l'union dénombrable de fermés est fermée : Faux. (Cf. contre-exemple.)
*   ❌ Confondre les règles pour ouverts et fermés : Elles sont "duales" (complémentaire d'un ouvert = fermé), donc les règles se correspondent par passage au complémentaire.

---

## FLASHCARD 72 — Proposition 16 : Caractérisation séquentielle (continuité, limite, adhérence)

### RECTO
**Proposition 16 — Caractérisation séquentielle dans les espaces métriques**

**Contexte :** $(E, d_E)$ et $(F, d_F)$ deux espaces métriques, $f : E \to F$, $A \subset E$, $a \in E$.

**Question :** Énoncer les caractérisations séquentielles de : (1) l'adhérence d'une partie, (2) la continuité d'une fonction en un point, (3) la limite d'une fonction.

### VERSO
**Énoncé formel**

1.  **Caractérisation séquentielle de l'adhérence :**
    $$ x \in \bar{A} \iff \exists (a_n)_{n \in \mathbb{N}} \subset A, \quad a_n \xrightarrow[n \to +\infty]{} x $$

2.  **Caractérisation séquentielle de la continuité en $a$ :**
    $$ f \text{ est continue en } a \iff \forall (x_n) \subset E, \quad x_n \to a \implies f(x_n) \to f(a) $$

3.  **Caractérisation séquentielle de la limite :**
    $$ \lim_{x \to a} f(x) = \ell \iff \forall (x_n) \subset E \setminus \{a\}, \quad x_n \to a \implies f(x_n) \to \ell $$
    (La condition $x_n \neq a$ est essentielle dans la définition de la limite, mais pas dans celle de la continuité si $f(a) = \ell$.)

### 
**Subtilités**
*   Ces caractérisations sont propres aux espaces métriques (et plus généralement aux espaces à base dénombrable de voisinages, i.e., les espaces "à topologie séquentielle"). Dans un espace topologique général, elles peuvent être fausses.
*   **Utilisation clé :** Ces caractérisations permettent de ramener des propriétés topologiques à des propriétés de suites, ce qui est souvent plus maniable en analyse.
*   **Continuité séquentielle $\neq$ continuité en général :** Dans un espace non métrique, la continuité séquentielle (image de toute suite convergente est convergente) n'implique pas la continuité. Dans un espace métrique, les deux sont équivalentes.

**Pièges classiques**
*   ❌ **Oublier $x_n \neq a$ dans la limite :** La limite de $f$ en $a$ ne suppose pas que $f$ est définie en $a$ ni que $f(a) = \ell$.
*   ❌ **Confondre limite et continuité :** $f$ est continue en $a$ si $f(a)$ est définie et $\lim_{x \to a} f(x) = f(a)$.
*   ❌ **Appliquer la caractérisation séquentielle hors du cadre métrique :** En topologie générale, la caractérisation séquentielle peut être mise en défaut.

---

## FLASHCARD 73 — Proposition 17 : Équivalence des normes en dimension finie

### RECTO
**Proposition 17 — Équivalence des normes en dimension finie**

**Contexte :** Soit $E$ un espace vectoriel sur $\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$, de dimension finie $n \ge 1$, muni de deux normes $\|\cdot\|_a$ et $\|\cdot\|_b$.

**Question :** Énoncer la proposition d'équivalence des normes en dimension finie, avec ses hypothèses exactes et sa conclusion.

### VERSO
**Hypothèses complètes**
*   $\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$
*   $E$ est un $\mathbb{K}$-espace vectoriel de dimension finie $n \in \mathbb{N}^*$
*   $\|\cdot\|_a$ et $\|\cdot\|_b$ sont deux normes quelconques sur $E$

**Énoncé formel**
$$ \exists \alpha, \beta \in \mathbb{R}_{>0}, \forall x \in E, \quad \alpha \|x\|_a \le \|x\|_b \le \beta \|x\|_a $$

Autrement dit, toutes les normes sur un espace vectoriel de dimension finie sont équivalentes : elles définissent la même topologie (mêmes ouverts, mêmes suites convergentes, mêmes suites de Cauchy).

**Démonstration (Esquisse)**
1.  **Réduction à la norme canonique.** Il suffit de montrer que toute norme $\|\cdot\|$ sur $E$ est équivalente à la norme $\|\cdot\|_1$ (ou $\|\cdot\|_\infty$) associée à une base fixée $(e_1, \dots, e_n)$. L'équivalence est alors une relation d'équivalence, ce qui conclut par transitivité.
2.  **Majoration (continuité).** Si $x = \sum_{i=1}^n x_i e_i$, par l'inégalité triangulaire et l'homogénéité :
    $$ \|x\| \le \sum_{i=1}^n |x_i| \|e_i\| \le (\max_i \|e_i\|) \cdot \|x\|_1 $$
    ce qui donne $\|x\| \le \beta \|x\|_1$ avec $\beta = \sum_{i=1}^n \|e_i\|$. Cela établit la continuité de $\|\cdot\|$ pour la topologie de $\|\cdot\|_1$.
3.  **Minoration (compacité).** La sphère unité $S = \{x \in E : \|x\|_1 = 1\}$ est compacte pour $\|\cdot\|_1$ (fermée et bornée en dimension finie, par Bolzano-Weierstrass). La fonction $x \mapsto \|x\|$ est continue (d'après l'étape 2) et strictement positive sur $S$ (car $\|x\|=0 \implies x=0 \notin S$). Par le théorème des bornes atteintes sur un compact, elle atteint son minimum $\alpha > 0$ sur $S$ :
    $$ \forall x \in S, \|x\| \ge \alpha > 0 $$
    Par homogénéité, $\forall x \in E, \|x\| \ge \alpha \|x\|_1$.

### 
**Subtilités**
*   **La dimension finie est absolument indispensable.** En dimension infinie, deux normes peuvent être non équivalentes, même sur le même espace : sur $C([0, 1], \mathbb{R})$, les normes $\|\cdot\|_\infty$ et $\|\cdot\|_1 = \int_0^1 |f|$ ne sont pas équivalentes (on peut construire des suites convergeant pour $\|\cdot\|_1$ mais pas pour $\|\cdot\|_\infty$).
*   L'argument de compacité de la sphère unité est le cœur de la preuve. Cette compacité repose elle-même sur le théorème de Bolzano-Weierstrass (ou sur le fait que $(\mathbb{K}^n, \|\cdot\|_\infty)$ est complet et que la boule fermée est compacte).
*   **Conséquences topologiques exactes :** deux normes équivalentes définissent :
    *   les mêmes ouverts et fermés,
    *   les mêmes suites convergentes (avec la même limite),
    *   les mêmes suites de Cauchy,
    *   les mêmes ensembles bornés,
    *   les mêmes parties compactes.
*   **Attention à la constante :** $\alpha$ et $\beta$ dépendent en général de $n$ et de la base choisie. Lorsque $n \to \infty$, les constantes peuvent dégénérer, ce qui explique l'échec en dimension infinie.

**Extensions**
*   **En dimension infinie :** faux en général. Le théorème de Riesz (À connaître 18) montre que la boule unité fermée d'un evn de dimension infinie n'est jamais compacte, ce qui bloque précisément l'argument de minoration.
*   **Corollaire fondamental :** Tout sous-espace vectoriel de dimension finie d'un evn est fermé (car il est complet pour la norme induite, et une suite convergente dans l'evn ambiant qui est dans le sous-espace converge dans le sous-espace).
*   **Corollaire :** En dimension finie, toute application linéaire est continue (quel que soit le choix de normes sur l'espace de départ et d'arrivée, pourvu qu'ils soient de dimension finie).

**Pièges classiques**
*   ⚠️ **Oublier que $\alpha > 0$ grâce à la compacité.** Sans la compacité, on ne peut pas garantir que le minimum sur la sphère est atteint (et a fortiori qu'il est $> 0$). Ne pas écrire $\inf_S \|x\| > 0$ sans justifier que cet inf est un min atteint.
*   ⚠️ Confondre équivalence de normes et égalité. Deux normes équivalentes ne sont pas nécessairement proportionnelles.
*   ⚠️ Croire que le résultat s'applique à un evn quelconque parce que l'espace « ressemble » à $\mathbb{R}^n$. La dimension finie doit être vérifiée explicitement.
*   ⚠️ Omettre la transitivité dans la démonstration : on montre l'équivalence avec $\|\cdot\|_1$, et on conclut pour deux normes quelconques par transitivité. Ne pas oublier de le mentionner explicitement en copie.

---

## FLASHCARD 74 — ### RECTO
**Proposition 18 — Caractérisation des parties compactes en dimension finie (Heine-Borel-Lebesgue)**

**Contexte :** Soit $(E, \|\cdot\|)$ un espace vectoriel normé sur $\mathbb{K}$, de dimension finie $n \ge 1$.

**Question :** Énoncer la caractérisation des parties compactes en dimension finie, avec ses hypothèses exactes et sa conclusion.

### VERSO
**Hypothèses complètes**
*   $\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$
*   $E$ est un $\mathbb{K}$-evn de dimension finie $n \in \mathbb{N}^*$
*   $A \subseteq E$ une partie quelconque

**Énoncé formel**
$$ A \text{ est compacte} \iff A \text{ est fermée et bornée} $$

Plus précisément :
*   **$A$ est bornée :** $\exists M > 0, \forall x \in A, \|x\| \le M$
*   **$A$ est fermée :** $A$ est fermée dans $(E, \|\cdot\|)$
*   **$A$ est compacte :** de toute suite $(x_n)_{n \ge 0}$ à valeurs dans $A$, on peut extraire une sous-suite convergente dans $A$ (compacité séquentielle)

**Démonstration (Esquisse)**
*   $(\Rightarrow)$ Compact $\implies$ fermé et borné. Tout compact est fermé (dans un espace métrique séparé) et borné (recouvert par des boules finies).
*   $(\Leftarrow)$ Fermé et borné $\implies$ compact.
    *   Par équivalence des normes (Proposition 17), on se ramène à $(\mathbb{K}^n, \|\cdot\|_\infty)$.
    *   $A$ bornée : $\exists M > 0, A \subseteq [-M, M]^n$ (en considérant les coordonnées dans une base).
    *   On applique le théorème de Bolzano-Weierstrass par un procédé diagonal : toute suite de $[-M, M]^n$ admet une sous-suite convergente dans $[-M, M]^n$.
    *   Comme $A$ est fermée, la limite est dans $A$.

### 
**Subtilités**
*   **Ce résultat est faux en dimension infinie.** La boule unité fermée $\bar{B}(0, 1)$ d'un evn de dimension infinie n'est jamais compacte (théorème de Riesz, À connaître 18). Exemple : dans $\ell^2(\mathbb{N})$, la suite $(e_n)$ des vecteurs de base est dans $\bar{B}(0, 1)$ mais n'admet aucune sous-suite convergente (car $\|e_n - e_m\|_2 = \sqrt{2}$ pour $n \neq m$).
*   **Équivalence des normes est cruciale :** la propriété « fermée et bornée » dépend a priori de la norme choisie, mais comme toutes les normes sont équivalentes en dimension finie, cette notion ne dépend que de la structure vectorielle de dimension finie.
*   **Compacité séquentielle = compacité** dans les espaces métriques. Ne pas confondre avec la compacité par recouvrements ouverts (ces deux notions coïncident dans les espaces métriques).

**Extensions**
*   En dimension infinie, les parties compactes sont fermées et bornées mais la réciproque est strictement fausse.
*   Dans $\mathbb{R}^n$ muni de $\|\cdot\|_2$ (ou toute norme équivalente), on retrouve le théorème de Heine-Borel classique.

**Pièges classiques**
*   ⚠️ **Appliquer ce théorème en dimension infinie :** erreur rédhibitoire. Toujours vérifier que l'espace est bien de dimension finie.
*   ⚠️ **Oublier la fermeture :** un ensemble borné non fermé n'est pas compact ($]0, 1[$ dans $\mathbb{R}$ est borné mais non compact).
*   ⚠️ **Confondre « borné » et « compact » dans un raisonnement :** une suite bornée en dimension finie admet une sous-suite convergente (Bolzano-Weierstrass), mais la limite n'appartient à l'ensemble que si celui-ci est fermé.

---

## FLASHCARD 75 — Théorème 39 : Compacité (théorème des bornes atteintes et de Heine)

### RECTO
**Théorème 39 — Compacité : théorème des bornes atteintes et théorème de Heine**

**Contexte :** Soit $(E, d_E)$ et $(F, d_F)$ deux espaces métriques, $K \subseteq E$ un compact non vide, et $f : K \to F$ une application continue.

**Question :** Énoncer les deux grandes conséquences de la compacité pour les fonctions continues (bornes atteintes, continuité uniforme), avec les hypothèses exactes et les conclusions.

### VERSO
**Hypothèses complètes**
*   $(E, d_E)$ espace métrique, $K \subseteq E$ compact non vide
*   $(F, d_F)$ espace métrique
*   $f : K \to F$ continue sur $K$

**Énoncé formel**
1.  **L'image d'un compact est compacte :**
    $$ f(K) \text{ est un compact de } F $$

2.  **Théorème des bornes atteintes (cas $F = \mathbb{R}$) :**
    Si $f : K \to \mathbb{R}$ est continue, alors :
    $$ \exists x_{\min} \in K, \exists x_{\max} \in K, \quad f(x_{\min}) = \min_{x \in K} f(x) \text{ et } f(x_{\max}) = \max_{x \in K} f(x) $$
    En particulier, $f$ est bornée sur $K$ et atteint ses bornes.

3.  **Théorème de Heine (continuité uniforme) :**
    $$ f \text{ est uniformément continue sur } K $$
    c'est-à-dire :
    $$ \forall \varepsilon > 0, \exists \delta > 0, \forall x, y \in K, \quad d_E(x, y) < \delta \implies d_F(f(x), f(y)) < \varepsilon $$

**Démonstration (Esquisse)**
*   **Pour 1 :** Soit $(y_n)$ une suite dans $f(K)$ ; écrire $y_n = f(x_n)$ avec $x_n \in K$. Par compacité de $K$, extraire $(x_{\varphi(n)})$ convergeant vers $\ell \in K$. Par continuité, $y_{\varphi(n)} = f(x_{\varphi(n)}) \to f(\ell) \in f(K)$.
*   **Pour 2 :** $f(K)$ est un compact de $\mathbb{R}$, donc fermé et borné, donc il admet un min et un max (atteints car $f(K)$ est fermé).
*   **Pour 3 (Heine) :** Par l'absurde. Si $f$ n'est pas uniformément continue :
    $\exists \varepsilon_0 > 0, \forall n \in \mathbb{N}^*, \exists x_n, y_n \in K, d_E(x_n, y_n) < 1/n \text{ et } d_F(f(x_n), f(y_n)) \ge \varepsilon_0$.
    Par compacité, extraire $x_{\varphi(n)} \to \ell \in K$. Alors $y_{\varphi(n)} \to \ell$ aussi. Par continuité : $d_F(f(x_{\varphi(n)}), f(y_{\varphi(n)})) \to 0$, contradiction.

### 
**Subtilités**
*   $K$ doit être **compact**, pas seulement fermé ou borné. En dimension infinie, fermé et borné ne suffit pas. Le théorème de Heine requiert explicitement la compacité.
*   Le théorème des bornes atteintes nécessite $F = \mathbb{R}$ (ou $\mathbb{R} \cup \{-\infty, +\infty\}$) et $f$ continue. La borne supérieure d'une fonction continue sur un compact est un **maximum** (pas seulement un sup).
*   **Heine :** $\delta$ ne dépend pas de $x, y$. C'est la différence fondamentale entre continuité simple et uniforme. Sur $]0, 1[$, $x \mapsto 1/x$ est continue mais pas uniformément continue.
*   Heine nécessite la compacité et pas seulement la continuité uniforme locale. Une fonction continue sur $\mathbb{R}$ n'est pas nécessairement uniformément continue (ex : $x \mapsto x^2$).

**Extensions**
*   **Théorème de Heine en dimension finie :** Si $f : A \subseteq \mathbb{R}^n \to \mathbb{R}^m$ est continue sur $A$ fermé borné (compact), alors $f$ est uniformément continue.
*   **En dimension infinie :** Le même énoncé reste valable à condition que $K$ soit compact (au sens séquentiel/topologique). Mais les compacts sont plus rares.
*   **Fonctions à valeurs vectorielles :** Le théorème des bornes atteintes ne s'applique directement qu'à $F = \mathbb{R}$. Pour $F=E$ evn, on peut dire que $x \mapsto \|f(x)\|$ atteint son maximum.

**Pièges classiques**
*   ⚠️ Utiliser le théorème des bornes atteintes sur un intervalle ouvert $]a, b[$, qui n'est pas compact : grave erreur. Vérifier que le domaine est bien fermé et borné (en dimension finie) ou compact.
*   ⚠️ Confondre « $f$ atteint sa borne sup » et « $\sup f < +\infty$ » : sur un compact, les deux sont vrais et liés, mais ce n'est pas immédiat sur un ensemble non compact.
*   ⚠️ Oublier que $f(K)$ est fermé (et pas seulement borné) : ce point est utilisé pour affirmer que le sup est atteint.
*   ⚠️ Invoquer Heine pour justifier qu'une intégrale à paramètre est continue sans avoir vérifié la compacité du domaine d'intégration.

---

## FLASHCARD 76 — À connaître 17 : Caractérisation séquentielle de la compacité et exemples

### RECTO
**À connaître 17 — Caractérisation séquentielle de la compacité dans un espace métrique**

**Contexte :** Soit $(E, d)$ un espace métrique et $K \subseteq E$.

**Question :** Donner la caractérisation séquentielle de la compacité dans un espace métrique, et lister les exemples fondamentaux de compacts à connaître en MP*.

### VERSO
**Hypothèses complètes**
*   $(E, d)$ espace métrique
*   $K \subseteq E$ une partie

**Énoncé formel**
Dans un espace métrique, les trois propriétés suivantes sont équivalentes :

(i) **$K$ est compact** (tout recouvrement ouvert de $K$ admet un sous-recouvrement fini)

(ii) **$K$ est séquentiellement compact :**
$$ \forall (x_n)_{n \ge 0} \in K^{\mathbb{N}}, \exists \varphi : \mathbb{N} \to \mathbb{N} \text{ strictement croissante}, x_{\varphi(n)} \xrightarrow[n \to +\infty]{} \ell \in K $$

(iii) **$K$ est précompact et complet :**
*   **Précompact :** $\forall \varepsilon > 0$, $K$ peut être recouvert par un nombre fini de boules ouvertes de rayon $\varepsilon$
*   **Complet :** toute suite de Cauchy dans $K$ converge dans $K$

**Exemples fondamentaux de compacts**
*   **$\mathbb{R}^n$ (ou $\mathbb{C}^n$) :** Fermés bornés
*   **$C([a, b], \mathbb{R})$ :** Caractérisés par Arzelà-Ascoli (équicontinuité + bornement uniforme)
*   **Tout evn de dimension finie :** Fermés bornés
*   **$\mathbb{K}^{\mathbb{N}}$ :** Produits de compacts (Tychonov)

**Démonstration (Esquisse)**
L'équivalence (i) $\iff$ (ii) dans les espaces métriques :
*   (i) $\Rightarrow$ (ii) : si $(x_n)$ n'a pas de valeur d'adhérence dans $K$, chaque $x \in K$ a un voisinage contenant au plus finiment des $x_n$, formant un recouvrement ouvert sans sous-recouvrement fini.
*   (ii) $\Rightarrow$ (i) : par l'absurde, un recouvrement sans sous-recouvrement fini permet de construire une suite sans valeur d'adhérence.

### 
**Subtilités**
*   Dans un espace métrique, compacité et compacité séquentielle sont équivalentes. Ce n'est plus vrai dans un espace topologique général.
*   La complétude seule ne suffit pas pour la compacité (exemple : $\mathbb{R}$ est complet mais non compact).
*   La précompacité seule ne suffit pas : $]0, 1[$ est précompact (dans $\mathbb{R}$) mais non compact (non complet).

**Extensions**
*   **Théorème d'Arzelà-Ascoli :** donne une caractérisation des compacts de $(C([a, b], \mathbb{R}), \|\cdot\|_\infty)$ (équicontinuité uniforme + bornement uniforme). Indispensable en analyse fonctionnelle.
*   **Théorème de Tychonov :** un produit quelconque de compacts est compact (pour la topologie produit). En dimension finie, cela donne que $[a_1, b_1] \times \dots \times [a_n, b_n]$ est compact dans $\mathbb{R}^n$.

**Pièges classiques**
*   ⚠️ **Oublier que la limite de la sous-suite doit être dans $K$ :** la compacité séquentielle exige $\ell \in K$, pas seulement $\ell \in E$.
*   ⚠️ Confondre précompact et compact dans un espace de dimension infinie.
*   ⚠️ Croire qu'un fermé dans un compact est compact : c'est vrai ! (un fermé d'un compact est compact), mais un fermé dans un espace non compact peut très bien ne pas être compact.

---

## FLASHCARD 77 — Proposition 20 : Continuité et compacité, applications

### RECTO
**Proposition 20 — Image d'un compact par une application continue ; homéomorphisme sur un compact**

**Contexte :** Soit $(E, d_E)$ et $(F, d_F)$ deux espaces métriques, $K \subseteq E$ un compact non vide, $f : K \to F$ continue et bijective.

**Question :** Énoncer la proposition sur l'image d'un compact par une application continue et la proposition sur les homéomorphismes définis sur un compact.

### VERSO
**Hypothèses complètes**
*   $(E, d_E)$, $(F, d_F)$ espaces métriques
*   $K \subseteq E$ compact non vide
*   $f : K \to F$ continue

**Énoncé formel**
**Proposition A :** L'image d'un compact par une application continue est compacte :
$$ f \text{ continue}, K \text{ compact} \implies f(K) \text{ compact} $$

**Proposition B (Homéomorphisme sur un compact) :**
Si de plus $f : K \to f(K)$ est bijective, alors :
$$ f^{-1} : f(K) \to K \text{ est continue} $$
autrement dit, $f$ est un homéomorphisme de $K$ sur $f(K)$.

**Démonstration (Esquisse)**
*   **Prop. A :** Déjà esquissée (Théorème 39, flashcard 75).
*   **Prop. B :** Soit $(y_n)$ une suite dans $f(K)$ convergeant vers $y \in f(K)$. Écrire $y_n = f(x_n)$ et $y = f(x)$ avec $x_n, x \in K$. Supposons par l'absurde que $f^{-1}(y_n) = x_n \not\to x$. Alors il existe $\varepsilon_0 > 0$ et une sous-suite $(x_{\varphi(n)})$ avec $d_E(x_{\varphi(n)}, x) \ge \varepsilon_0$. Par compacité de $K$, extraire $(x_{\varphi \circ \psi(n)})$ convergeant vers $\ell \in K$. Par continuité de $f$ : $f(x_{\varphi \circ \psi(n)}) \to f(\ell) = y$. Comme $f$ est injective, $\ell = x$, contradiction avec $d_E(x_{\varphi(n)}, x) \ge \varepsilon_0$.

### 
**Subtilités**
*   **La compacité est essentielle pour Prop. B.** Sans elle, une bijection continue peut ne pas être un homéomorphisme. Exemple classique : $\theta \mapsto e^{i\theta}$ de $[0, 2\pi[$ sur $\mathbb{U}$ est continue et bijective, mais son inverse n'est pas continue (en $1 = e^{i \cdot 0}$). Ici $[0, 2\pi[$ n'est pas compact.
*   **Prop. B :** pas de structure supplémentaire requise sur $F$. On n'a pas besoin de $F$ de dimension finie, juste que $f(K)$ soit compact (ce qui découle de Prop. A).

**Extensions**
*   **En dimension finie :** toute bijection linéaire continue entre evn de même dimension finie est un homéomorphisme linéaire (son inverse est automatiquement continue, car toute application linéaire en dimension finie est continue).
*   **Application en pratique :** pour montrer qu'une bijection continue $f : K \to L$ entre deux compacts est un homéomorphisme, il suffit de vérifier la continuité de $f$ (pas de $f^{-1}$ séparément).

**Pièges classiques**
*   ⚠️ Appliquer Prop. B sans vérifier la bijectivité ou sans vérifier que le domaine est compact.
*   ⚠️ Confondre homéomorphisme et isométrie : un homéomorphisme préserve la topologie mais pas nécessairement les distances.
*   ⚠️ Croire que la continuité de $f^{-1}$ est automatique sans compacité : contre-exemple ci-dessus à connaître par cœur.

---

## FLASHCARD 78 — À connaître 18 : Théorème de Riesz (non-compacité de la boule en dimension infinie)

### RECTO
**À connaître 18 — Théorème de Riesz : la boule unité fermée d'un evn est compacte si et seulement si l'espace est de dimension finie**

**Contexte :** Soit $(E, \|\cdot\|)$ un espace vectoriel normé sur $\mathbb{K}$.

**Question :** Énoncer le théorème de Riesz sur la compacité de la boule unité fermée, avec ses hypothèses exactes et sa conclusion.

### VERSO
**Hypothèses complètes**
*   $(E, \|\cdot\|)$ un $\mathbb{K}$-espace vectoriel normé ($\mathbb{K} = \mathbb{R}$ ou $\mathbb{C}$), de dimension quelconque (finie ou infinie)
*   $\bar{B}(0, 1) = \{x \in E : \|x\| \le 1\}$ la boule unité fermée

**Énoncé formel**
$$ \bar{B}(0, 1) \text{ est compacte dans } E \iff \dim E < +\infty $$

**Lemme de Riesz (utilisé pour la direction $\Leftarrow$ en dimension infinie) :**
$$ \forall F \subsetneq E \text{ sous-espace fermé strict de } E, \forall \varepsilon \in ]0, 1[, \exists x_\varepsilon \in E, \|x_\varepsilon\| = 1 \text{ et } d(x_\varepsilon, F) \ge 1 - \varepsilon $$

**Démonstration (Esquisse)**
*   $(\Rightarrow)$ dim finie $\implies$ boule compacte : Heine-Borel en dimension finie (fermé et borné $\implies$ compact).
*   $(\Leftarrow)$ dim infinie $\implies$ boule non compacte : On construit inductivement une suite $(x_n)_{n \ge 1}$ dans $\bar{B}(0, 1)$ telle que $\|x_n - x_m\| \ge 1/2$ pour tout $n \neq m$.
    *   Prendre $x_1 \in \bar{B}(0, 1)$ quelconque, $\|x_1\| = 1$.
    *   Supposant $x_1, \dots, x_n$ construits, poser $F_n = \text{Vect}(x_1, \dots, x_n)$ (fermé car dimension finie). Par lemme de Riesz avec $\varepsilon = 1/2$, $\exists x_{n+1}$ avec $\|x_{n+1}\| = 1$ et $d(x_{n+1}, F_n) \ge 1/2$.
    *   Ainsi $\|x_{n+1} - x_k\| \ge 1/2$ pour tout $k \le n$.
    *   La suite $(x_n)$ est dans $\bar{B}(0, 1)$ mais n'admet aucune sous-suite de Cauchy, donc aucune sous-suite convergente.

### 
**Subtilités**
*   Le lemme de Riesz n'atteint pas $\varepsilon = 0$ en général. En dimension finie, on peut atteindre exactement la distance (car le minimum est atteint sur le compact $F \cap \bar{B}$), mais en dimension infinie, seule l'approximation à $1-\varepsilon$ est garantie.
*   **Exception remarquable :** Dans un espace de Hilbert (evn complet à produit scalaire), si $F$ est un sous-espace fermé, la projection orthogonale réalise exactement la distance, mais cela ne contredit pas Riesz (la boule reste non compacte en dimension infinie).
*   **Conséquence fondamentale :** En dimension infinie, les boules fermées ne sont pas compactes. Cela implique qu'on ne peut pas directement utiliser les théorèmes de type « suite bornée $\implies$ sous-suite convergente » (Bolzano-Weierstrass), sauf dans des cadres fonctionnels spécifiques (compacité faible, Arzelà-Ascoli, etc.).

**Extensions**
*   En dimension infinie, il existe des notions de compacité plus faibles : compacité faible (topologie faible $\sigma(E, E')$), compacité relative. Ces notions sont au cœur de l'analyse fonctionnelle.
*   Le théorème de Riesz est la raison pour laquelle les équations intégrales et les EDP nécessitent des arguments spécifiques (théorème de Lax-Milgram, théorème spectral en dimension infinie, etc.).

**Pièges classiques**
*   ⚠️ **Utiliser un argument de « suite bornée admet une sous-suite convergente »** dans un evn de dimension infinie sans précaution : faux en général.
*   ⚠️ **Confondre le lemme de Riesz avec le théorème de représentation de Riesz** (qui concerne les formes linéaires continues dans un Hilbert — Théorème 58 dans ce cours). Ce sont deux résultats distincts portant le même nom.
*   ⚠️ **Oublier que le lemme de Riesz requiert $\varepsilon \in ]0, 1[$ strictement :** on ne peut pas prendre $\varepsilon = 0$ en général.

---

## FLASHCARD 79 — Proposition 21 : Parties denses, approximation

### RECTO
**Proposition 21 — Caractérisation d'une partie dense dans un espace métrique**

**Contexte :** Soit $(E, d)$ un espace métrique et $D \subseteq E$.

**Question :** Énoncer la proposition de caractérisation d'une partie dense, avec plusieurs caractérisations équivalentes.

### VERSO
**Hypothèses complètes**
*   $(E, d)$ espace métrique
*   $D \subseteq E$ une partie

**Énoncé formel — Caractérisations équivalentes de « $D$ est dense dans $E$ »**
Les propriétés suivantes sont équivalentes :

(i) **$\bar{D} = E$** (l'adhérence de $D$ est $E$ entier)

(ii) **$\forall x \in E, \forall \varepsilon > 0, \exists d \in D, d(x, d) < \varepsilon$** (tout point de $E$ est approché arbitrairement par des éléments de $D$)

(iii) **$\forall x \in E, \exists (d_n)_{n \ge 0} \in D^{\mathbb{N}}, d_n \xrightarrow[n \to +\infty]{} x$** (tout point de $E$ est limite d'une suite de $D$)

(iv) **Tout ouvert non vide de $E$ rencontre $D$ :**
    $$ \forall U \text{ ouvert de } E, U \neq \emptyset \implies U \cap D \neq \emptyset $$

**Exemples fondamentaux à connaître**
*   $(\mathbb{R}, |\cdot|) \quad \mathbb{Q}$
*   $(C([a, b], \mathbb{R}), \|\cdot\|_\infty) \quad \text{Polynômes (Weierstrass), fonctions en escalier}$
*   $(C_{2\pi}^0, \|\cdot\|_\infty) \quad \text{Polynômes trigonométriques (Weierstrass trig.)}$
*   $L^2([a, b]) \quad C([a, b], \mathbb{R}), \text{ polynômes}$

### 
**Subtilités**
*   La densité dépend de la topologie (donc de la norme ou de la distance). $\mathbb{Q}$ est dense dans $\mathbb{R}$ pour $|\cdot|$, mais ce n'est pas une notion algébrique.
*   **Densité $\neq$ égalité :** $D$ dense dans $E$ ne signifie pas $D=E$ (exemple : $\mathbb{Q} \neq \mathbb{R}$).
*   La composée de densités : si $D_1$ est dense dans $D_2$ et $D_2$ est dense dans $E$, alors $D_1$ est dense dans $E$.

**Extensions**
*   **Séparabilité :** Un espace métrique est dit séparable s'il admet une partie dense dénombrable. Exemple : $\mathbb{R}^n$ est séparable ($\mathbb{Q}^n$ dense), $C([a, b])$ est séparable (polynômes à coefficients rationnels).
*   **Importance en approximation :** La densité est le fondement des théorèmes d'approximation (Weierstrass, Fourier) : on approche une fonction continue par des objets plus simples (polynômes, polynômes trig.).

**Pièges classiques**
*   ⚠️ Confondre « dense » et « ouvert dense » (notion plus forte, liée au théorème de Baire).
*   ⚠️ Utiliser la densité sans préciser la topologie (la norme par rapport à laquelle on parle de densité).
*   ⚠️ Oublier de vérifier la densité avant d'invoquer un théorème d'approximation (ex : Weierstrass) pour passer d'une propriété sur les polynômes à une propriété sur $C([a, b])$.

---

## FLASHCARD 80 — À connaître 19 : Espaces complets, théorème de Baire

### RECTO
**À connaître 19 — Espaces complets (espaces de Banach) et théorème de Baire**

**Contexte :** Soit $(E, d)$ un espace métrique complet (espace de Banach si $E$ est un evn complet).

**Question :** Énoncer le théorème de Baire et ses principales conséquences en analyse.

### VERSO
**Hypothèses complètes**
*   $(E, d)$ espace métrique complet (ou espace localement compact)
*   $(U_n)_{n \ge 0}$ une suite d'ouverts denses de $E$

**Énoncé formel — Théorème de Baire**
$$ \bigcap_{n=0}^{+\infty} U_n \text{ est dense dans } E $$

**Reformulation (en termes de fermés) :** Si $(F_n)_{n \ge 0}$ est une suite de fermés d'intérieur vide ($\mathring{F_n} = \emptyset$) dans $E$ complet, alors :
$$ \left( \bigcup_{n=0}^{+\infty} F_n \right)^\circ = \emptyset $$
(l'union dénombrable de fermés d'intérieur vide a un intérieur vide)

**Conséquence négative :** Un espace de Banach non réduit à $\{0\}$ ne peut pas être réunion dénombrable de fermés d'intérieur vide.

**Exemples d'applications**
*   **$\mathbb{R}$ n'est pas dénombrable :** Si $\mathbb{R} = \bigcup_n \{x_n\}$, chaque $\{x_n\}$ est fermé d'intérieur vide, mais leur union est $\mathbb{R}$ qui est d'intérieur non vide : contradiction.
*   Il existe des fonctions continues nulle part dérivables (par un argument de Baire sur $C([0, 1])$).
*   Théorème de Banach-Steinhaus (principe d'uniforme bornitude) utilise Baire.

**Démonstration (Esquisse)**
Soit $x_0 \in E$ et $\varepsilon_0 > 0$. On construit inductivement une suite de Cauchy restant dans $\bigcap_n U_n$ :
*   $U_0$ dense et ouvert : $\exists x_1 \in U_0, \bar{B}(x_1, r_1) \subseteq U_0 \cap B(x_0, \varepsilon_0)$ avec $r_1 \le 1$.
*   $U_1$ dense et ouvert : $\exists x_2 \in U_1, \bar{B}(x_2, r_2) \subseteq U_1 \cap B(x_1, r_1)$ avec $r_2 \le 1/2$.
*   Par complétude, $(x_n)$ converge vers $\ell \in \bigcap_n U_n \cap B(x_0, \varepsilon_0)$.

### 
**Subtilités**
*   **Baire requiert la complétude** (ou la compacité locale) : le théorème est faux pour $\mathbb{Q}$ (qui est un espace métrique non complet). En effet, $\mathbb{Q} = \bigcup_{q \in \mathbb{Q}} \{q\}$, union dénombrable de fermés d'intérieur vide.
*   Baire est un outil d'existence, non constructif. Il prouve l'existence d'un point dans l'intersection, mais ne le construit pas explicitement.
*   **Union dénombrable seulement :** Le théorème porte sur des unions dénombrables. Une union non dénombrable de fermés d'intérieur vide peut très bien couvrir $E$.

**Extensions**
*   **Espaces de Banach :** $C([a, b], \mathbb{R})$ muni de $\|\cdot\|_\infty$ est un espace de Banach (complet) ; Baire y est applicable.
*   **Théorème de Banach-Steinhaus :** Si $(T_n)$ est une suite d'applications linéaires continues $E \to F$ (Banach) telle que $\sup_n \|T_n(x)\| < +\infty$ pour tout $x \in E$, alors $\sup_n \|T_n\| < +\infty$. Preuve par Baire.
*   **Théorème du graphe fermé et théorème de l'application ouverte :** deux autres grands théorèmes de l'analyse fonctionnelle reposant sur Baire.

**Pièges classiques**
*   ⚠️ **Appliquer Baire à $\mathbb{Q}$ ou à un espace non complet :** erreur.
*   ⚠️ **Confondre « fermé d'intérieur vide » et « fermé » :** un fermé peut très bien avoir un intérieur non vide (exemple : $[0, 1] \subseteq \mathbb{R}$).
*   ⚠️ **Croire que Baire donne une conclusion sur une union finie :** le résultat est spécifique aux unions dénombrables infinies.

---

## FLASHCARD 81 — À connaître 20 : Espaces de Banach et exemples fondamentaux

### RECTO
**À connaître 20 — Espaces de Banach : définition et exemples fondamentaux**

**Contexte :** Soit $(E, \|\cdot\|)$ un espace vectoriel normé sur $\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$.

**Question :** Définir un espace de Banach et lister les espaces de Banach fondamentaux à connaître en MP*, avec leurs normes.

### VERSO
**Définition**
$(E, \|\cdot\|)$ est un espace de Banach si et seulement si il est complet : toute suite de Cauchy converge dans $E$.

$$ \forall (x_n)_{n \ge 0} \in E^{\mathbb{N}}, \quad (\forall \varepsilon > 0, \exists N \in \mathbb{N}, \forall p, q \ge N, \|x_p - x_q\| < \varepsilon) \implies \exists \ell \in E, x_n \to \ell $$

**Exemples fondamentaux**
*   $\mathbb{K}^n$, toute norme : **Oui**
*   $C([a, b], \mathbb{K})$, $\|\cdot\|_\infty$ : **Oui**
*   $C([a, b], \mathbb{K})$, $\|\cdot\|_1 = \int_a^b \|f\|$ : **Non** (non complet)
*   $C^k([a, b], \mathbb{K})$, $\sum_{j=0}^k \|f^{(j)}\|_\infty$ : **Oui**
*   $\ell^p(\mathbb{N})$, $p \in [1, +\infty]$, $\|\cdot\|_p$ : **Oui**
*   $L^p([a, b])$, $p \in [1, +\infty]$, $\|\cdot\|_p$ : **Oui** (Riesz-Fischer)
*   Polynômes $\mathbb{K}[X]$, $\|\cdot\|_\infty$ sur $[a, b]$ : **Non** (non complet)

**Critère de complétude pratique**
$(E, \|\cdot\|)$ est complet $\iff$ toute série absolument convergente est convergente :
$$ \sum_{n=0}^{+\infty} \|u_n\| < +\infty \implies \sum_{n=0}^{+\infty} u_n \text{ converge dans } E $$

### 
**Subtilités**
*   $(C([a, b]), \|\cdot\|_1)$ n'est pas complet : on peut approcher en norme $L^1$ des fonctions discontinues par des fonctions continues (penser à des fonctions « créneau »). La complétion de $(C([a, b]), \|\cdot\|_1)$ est $L^1([a, b])$.
*   $\mathbb{K}[X]$ n'est pas complet pour aucune norme naturelle : la série $\sum x^n/n!$ converge (vers $e^x$) mais $e^x \notin \mathbb{K}[X]$.
*   Le critère de complétude par les séries est très utile en pratique pour montrer qu'un espace est de Banach (notamment pour $\ell^p$ et $L^p$).

**Extensions**
*   **Espace de Hilbert :** Banach avec une norme issue d'un produit scalaire. Exemples : $\mathbb{K}^n, L^2([a, b]), \ell^2(\mathbb{N})$.
*   **Complétion :** Tout evn admet une complétion unique (à isométrie isomorphe près), qui est un espace de Banach.

**Pièges classiques**
*   ⚠️ **Confondre « suite bornée » et « suite de Cauchy » :** une suite de Cauchy est bornée, mais une suite bornée n'est pas nécessairement de Cauchy.
*   ⚠️ **Croire que $(C([a, b]), \|\cdot\|_2)$ est complet :** faux, la complétion est $L^2([a, b])$.
*   ⚠️ Oublier de vérifier la complétude avant d'appliquer Baire, Banach-Steinhaus ou le théorème du point fixe de Banach.

---

## FLASHCARD 82 — À connaître 21 : Théorème du point fixe de Banach (applications contractantes)

### RECTO
**À connaître 21 — Théorème du point fixe de Banach (ou de Picard)**

**Contexte :** Soit $(E, d)$ un espace métrique complet et $f : E \to E$ une application.

**Question :** Énoncer le théorème du point fixe de Banach avec ses hypothèses exactes et ses conclusions (existence, unicité, convergence des itérées).

### VERSO
**Hypothèses complètes**
*   $(E, d)$ espace métrique complet
*   $f : E \to E$ contractante : $\exists k \in [0, 1[$ tel que :
    $$ \forall x, y \in E, \quad d(f(x), f(y)) \le k \cdot d(x, y) $$

**Énoncé formel**
1.  **Existence et unicité :**
    $$ \exists ! x^* \in E, \quad f(x^*) = x^* $$
2.  **Convergence des itérées :** Pour tout $x_0 \in E$, la suite définie par $x_{n+1} = f(x_n)$ converge vers $x^*$ :
    $$ x_n \xrightarrow[n \to +\infty]{} x^* $$
3.  **Estimation de l'erreur :**
    $$ d(x_n, x^*) \le \frac{k^n}{1-k} d(x_1, x_0) $$

**Démonstration (Esquisse)**
*   **La suite $(x_n)$ est de Cauchy :** Pour $p \ge 1$,
    $$ d(x_{n+p}, x_n) \le \frac{k^n(1-k^p)}{1-k} d(x_1, x_0) \xrightarrow[n \to +\infty]{} 0 $$
    par la raison géométrique et $k < 1$.
*   **Convergence :** Par complétude, $x_n \to x^* \in E$.
*   **$x^*$ est point fixe :** $f(x^*) = f(\lim x_n) = \lim f(x_n) = \lim x_{n+1} = x^*$ (continuité de $f$, qui est lipschitzienne).
*   **Unicité :** Si $f(y) = y$ et $f(x^*) = x^*$, alors $d(x^*, y) = d(f(x^*), f(y)) \le k \cdot d(x^*, y)$, donc $(1-k) d(x^*, y) \le 0$, d'où $d(x^*, y) = 0$ et $x^* = y$.

### 
**Subtilités**
*   **$k < 1$ est indispensable.** Une contraction non stricte ($k=1$, i.e., application 1-lipschitzienne) peut ne pas avoir de point fixe : $f : \mathbb{R} \to \mathbb{R}, f(x) = x+1$ est isométrique mais sans point fixe.
*   **La complétude est indispensable.** Sur $]0, 1[$ (non complet), $f(x) = x/2$ est contractante ($k=1/2$) mais le point fixe $0 \notin ]0, 1[$.
*   Pas besoin que $E$ soit un espace vectoriel : le théorème s'applique dans tout espace métrique complet.
*   Le choix de $x_0$ est arbitraire : la convergence vers $x^*$ est indépendante du point de départ.

**Extensions**
*   **Application à Cauchy-Lipschitz :** Le théorème de Cauchy-Lipschitz (Théorème 40) repose sur le théorème du point fixe de Banach appliqué à l'opérateur intégral de Picard dans l'espace $(C([t_0-\delta, t_0+\delta], E), \|\cdot\|_\infty)$ (qui est un Banach).
*   **Contractions sur une boule fermée :** Si $f : \bar{B}(x_0, r) \to \bar{B}(x_0, r)$ est contractante et $\bar{B}(x_0, r)$ est complet (fermée dans un Banach), le théorème s'applique.
*   **Théorème de Brouwer :** Généralisation topologique (toute application continue d'un compact convexe dans lui-même a un point fixe), mais sans taux de convergence.

**Pièges classiques**
*   ⚠️ **Confondre contractante ($k < 1$) et lipschitzienne ($k$ quelconque) :** une application lipschitzienne de constante $\ge 1$ n'est pas contractante.
*   ⚠️ **Oublier que $k$ doit être uniforme** (la même constante pour tous $x, y$) : une contraction locale (contractante au voisinage du point fixe) ne suffit pas en général.
*   ⚠️ **Ne pas vérifier que $f$ envoie l'espace dans lui-même** avant d'appliquer le théorème.
*   ⚠️ **Confondre la vitesse de convergence :** la convergence est géométrique de raison $k$, ce qui est très rapide en pratique.

---

## FLASHCARD 83 — Proposition 22 : Connexité par arcs, connexité

### RECTO
**Proposition 22 — Connexité et connexité par arcs**

**Contexte :** Soit $(E, d)$ un espace métrique (ou un espace topologique) et $A \subseteq E$.

**Question :** Définir la connexité et la connexité par arcs, énoncer le lien entre ces deux notions, et donner les exemples et contre-exemples fondamentaux.

### VERSO
**Définitions**
*   **Connexité par arcs :** $A$ est connexe par arcs si :
    $$ \forall x, y \in A, \exists \gamma : [0, 1] \to A \text{ continue}, \gamma(0) = x \text{ et } \gamma(1) = y $$
*   **Connexité :** $A$ est connexe si $A$ ne peut pas être partitionné en deux ouverts non vides disjoints de $A$ :
    $$ A = U \sqcup V, U, V \text{ ouverts de } A, U \cap V = \emptyset \implies U = \emptyset \text{ ou } V = \emptyset $$

**Énoncé formel — Lien entre les deux notions**
$$ A \text{ connexe par arcs} \implies A \text{ connexe} $$

La réciproque est fausse en général. Contre-exemple classique : le peigne du topologiste (ou la réunion du graphe de $\sin(1/x)$ sur $]0, 1]$ et du segment $\{0\} \times [-1, 1]$) est connexe mais non connexe par arcs.

**Dans les evn (cas pratique en MP*)**
Dans un espace vectoriel normé, les parties connexes par arcs sont exactement les parties connexes pour les ouverts :
$$ U \subseteq E \text{ ouvert, connexe} \iff U \text{ ouvert, connexe par arcs} $$

**Exemples fondamentaux**
*   **Connexes par arcs :** tout convexe, toute boule ouverte ou fermée, $\mathbb{K}^n$, $GL_n(\mathbb{C})$.
*   **Non connexes :** $\mathbb{R} \setminus \{0\}$, $GL_n(\mathbb{R})$ (deux composantes connexes : $\det > 0$ et $\det < 0$).

**Théorème fondamental**
L'image d'un connexe (resp. connexe par arcs) par une application continue est connexe (resp. connexe par arcs) :
$$ f : A \to F \text{ continue}, A \text{ connexe} \implies f(A) \text{ connexe} $$

### 
**Subtilités**
*   Dans $\mathbb{R}$, les parties connexes sont exactement les intervalles (finis ou infinis, ouverts, fermés ou semi-ouverts). Cela donne le théorème des valeurs intermédiaires comme conséquence de la connexité.
*   $GL_n(\mathbb{R})$ n'est pas connexe ($n \ge 1$) : les matrices de déterminant $> 0$ et celles de déterminant $< 0$ forment deux composantes connexes. En revanche, $GL_n(\mathbb{C})$ est connexe par arcs.
*   $GL_n^+(\mathbb{R}) = \{M \in GL_n(\mathbb{R}) : \det M > 0\}$ est connexe par arcs (tout élément peut être joint à l'identité par un chemin continu dans $GL_n^+(\mathbb{R})$, par exemple via la décomposition polaire ou la triangularisation).

**Extensions**
*   **Composantes connexes :** tout espace métrique est partitionné en composantes connexes (les plus grandes parties connexes), qui sont fermées.
*   **Convexité $\implies$ connexité par arcs :** tout convexe (même en dimension infinie) est connexe par arcs (l'arc est le segment $\gamma(t) = (1-t)x + ty$).

**Pièges classiques**
*   ⚠️ **Croire que connexe $\implies$ connexe par arcs en général :** faux (contre-exemple du peigne).
*   ⚠️ **Oublier de vérifier que l'image d'un connexe est dans l'espace d'arrivée** avant d'invoquer la connexité de l'image.
*   ⚠️ **Confondre « $A$ connexe » et « $A$ convexe » :** la convexité est une propriété plus forte et plus maniable, mais n'est définie que dans un espace vectoriel.

---

## FLASHCARD 84 — Proposition 23 : Théorème des valeurs intermédiaires (version topologique)

### RECTO
**Proposition 23 — Théorème des valeurs intermédiaires (version topologique générale)**

**Contexte :** Soit $(E, d)$ un espace métrique, $A \subseteq E$ une partie connexe, et $f : A \to \mathbb{R}$ une application continue.

**Question :** Énoncer le théorème des valeurs intermédiaires dans sa version topologique générale, avec ses hypothèses exactes et sa conclusion.

### VERSO
**Hypothèses complètes**
*   $(E, d)$ espace métrique
*   $A \subseteq E$ connexe (non vide)
*   $f : A \to \mathbb{R}$ continue

**Énoncé formel**
$$ \forall x, y \in A, \forall \lambda \in \mathbb{R}, \quad f(x) \le \lambda \le f(y) \implies \exists z \in A, f(z) = \lambda $$

Autrement dit : $f(A)$ est un intervalle de $\mathbb{R}$ (l'image d'un connexe par une application continue à valeurs réelles est un intervalle).

**Cas particulier fondamental (le plus utilisé en MP*)**
Théorème des valeurs intermédiaires classique :

Soit $f : [a, b] \to \mathbb{R}$ continue ($[a, b]$ est connexe par arcs, donc connexe). Alors :
$$ \forall \lambda \in [f(a), f(b)] \text{ (ou } [\min(f(a), f(b)), \max(f(a), f(b))]), \quad \exists c \in [a, b], f(c) = \lambda $$

**Démonstration (Esquisse)**
$f(A)$ est l'image d'un connexe par $f$ continue, donc $f(A)$ est connexe dans $\mathbb{R}$. Or, les connexes de $\mathbb{R}$ sont exactement les intervalles. Donc $f(A)$ est un intervalle. Toute valeur entre $f(x)$ et $f(y)$ appartient à $f(A)$, ce qui donne l'existence de $z$.

### 
**Subtilités**
*   **La connexité de $A$ est indispensable.** Si $A$ n'est pas connexe, le TVI peut échouer. Exemple : $f : \{-1\} \cup \{1\} \to \mathbb{R}$, $f(-1) = -1, f(1) = 1$, $f$ continue sur son domaine non connexe ; $0$ n'est pas atteint.
*   Le TVI ne donne pas l'unicité de $z$. Il garantit l'existence d'un $z$, mais peut y en avoir plusieurs.
*   **Version quantitative (pour les épreuves) :** Si $f$ est continue sur $[a, b]$, $f(a) \cdot f(b) < 0$, alors $\exists c \in ]a, b[, f(c) = 0$. (Le zéro est dans l'intérieur si les signes sont strictement opposés.)
*   La conclusion « $f(A)$ est un intervalle » est la formulation la plus puissante. Elle s'applique même si $A$ n'est pas un intervalle de $\mathbb{R}$ (ex : $A \subseteq \mathbb{R}^n$ connexe).

**Extensions**
*   **Fonctions à valeurs vectorielles :** Le TVI ne s'étend pas directement à $f : A \to \mathbb{R}^n$ pour $n \ge 2$ (on ne peut pas définir une relation d'ordre total sur $\mathbb{R}^n$).
*   **TVI + compacité :** Si $f : [a, b] \to \mathbb{R}$ est continue, alors $f([a, b]) = [\min f, \max f]$ (image exactement un segment, par compacité + connexité).
*   **Application topologique :** Le TVI permet de montrer que $[0, 1]$ et $[0, 1[$ ne sont pas homéomorphes (en retirant un point intérieur, l'un reste connexe, l'autre non).

**Pièges classiques**
*   ⚠️ **Invoquer le TVI sans vérifier la continuité de $f$** sur tout l'intervalle $[a, b]$ (pas seulement aux extrémités).
*   ⚠️ **Confondre TVI et théorème du point fixe de Brouwer :** le TVI est plus élémentaire et spécifique à $\mathbb{R}$.
*   ⚠️ **Oublier que le TVI donne une existence, pas une construction :** pour trouver numériquement $c$, il faut la dichotomie ou la méthode de Newton.
*   ⚠️ **Appliquer le TVI à une fonction définie sur un ensemble non connexe :** vérifier toujours que le domaine est un intervalle (ou au moins connexe).

---

## FLASHCARD 85 — À connaître 22 : Lemme de Gronwall

### RECTO
**Lemme de Gronwall (versions intégrale et différentielle)**

Soit $I = [a, b]$ un segment de $\mathbb{R}$, et $u, v : I \to \mathbb{R}$ des fonctions continues, avec $v \ge 0$.

**Question :** Énoncer le lemme de Gronwall sous sa forme intégrale. En déduire la version différentielle.

### VERSO
**Hypothèses (forme intégrale) :**
*   $a, b \in \mathbb{R}, a < b$
*   $u, v : [a, b] \to \mathbb{R}$ continues
*   $v \ge 0$ sur $[a, b]$
*   $C \in \mathbb{R}$ (constante)
    $$ \forall t \in [a, b], \quad u(t) \le C + \int_a^t v(s) u(s) ds $$

**Conclusion :**
$$ \forall t \in [a, b], \quad u(t) \le C \exp \left( \int_a^t v(s) ds \right) $$

**Forme différentielle :**
*   $u$ de classe $C^1$ sur $[a, b]$, $\alpha \in \mathbb{R}, \beta \ge 0$
    $$ \forall t \in [a, b], \quad u'(t) \le \beta u(t) + \alpha $$

**Alors :**
$$ \forall t \in [a, b], \quad u(t) \le \left( u(a) + \frac{\alpha}{\beta} \right) e^{\beta(t-a)} - \frac{\alpha}{\beta} $$
(si $\beta > 0$; si $\beta = 0$, $u(t) \le u(a) + \alpha(t-a)$).

**Démonstration (esquisse) :**
Poser $\varphi(t) = C + \int_a^t v(s) u(s) ds$. Alors $\varphi' = v \cdot u \le v \cdot \varphi$.
Multiplier par le facteur intégrant $e^{-\int_a^t v}$ : on montre que $t \mapsto \varphi(t) e^{-\int_a^t v(s) ds}$ est décroissante.
D'où $\varphi(t) \le \varphi(a) e^{\int_a^t v} = C e^{\int_a^t v}$, et $u \le \varphi$ donne la conclusion.

### 
**Subtilités :**
*   L'hypothèse $v \ge 0$ est cruciale : sans elle, le facteur intégrant ne donne pas le bon sens de monotonie.
*   La constante $C$ peut être négative : le lemme reste vrai.
*   Sur un intervalle non borné $[a, +\infty[$, le lemme reste valable pour tout $t$ fixé (on l'applique sur $[a, t]$).

**Extensions :**
*   Valable pour $u, v$ seulement continues par morceaux (voire $L^1_{loc}$), ce qui est utile en EDO.
*   S'applique aux fonctions à valeurs dans un evn via $\|y(t)\|$ (on majore la norme, qui est une fonction réelle).

**Pièges classiques :**
*   Oublier $v \ge 0$ et appliquer aveuglément.
*   Confondre le sens de l'inégalité : le lemme donne une majoration.
*   En concours, le lemme sert le plus souvent à prouver l'unicité des solutions d'un problème de Cauchy : si $y_1, y_2$ sont deux solutions, on montre $\|y_1 - y_2\|$ vérifie une inégalité de Gronwall avec $C=0$, d'où $y_1 = y_2$.

---

## FLASHCARD 86 — Lemme 2 : Forme intégrale d'un problème de Cauchy

### RECTO
**Forme intégrale d'un problème de Cauchy**

Soit $I$ un intervalle de $\mathbb{R}$, $t_0 \in I$, $y_0 \in E$ (espace vectoriel normé de dimension finie), et $f : I \times E \to E$.

**Question :** Énoncer l'équivalence entre le problème de Cauchy $y' = f(t, y), y(t_0) = y_0$ et sa formulation intégrale.

### VERSO
**Hypothèses :**
*   $I$ intervalle de $\mathbb{R}$, $t_0 \in I$
*   $E = \mathbb{R}^n$ (ou $E$ evn de dimension finie)
*   $f : I \times E \to E$ continue
*   $y : J \to E$ avec $J \subset I$ intervalle contenant $t_0$

**Énoncé :**
$y$ est de classe $C^1$ sur $J$ et vérifie :
$$ \begin{cases} y'(t) = f(t, y(t)) \\ y(t_0) = y_0 \end{cases} \quad \forall t \in J $$
si et seulement si $y$ est continue sur $J$ et :
$$ \forall t \in J, \quad y(t) = y_0 + \int_{t_0}^t f(s, y(s)) ds $$

**Démonstration (esquisse) :**
*   $(\Rightarrow)$ : Intégrer $y' = f(\cdot, y(\cdot))$ entre $t_0$ et $t$, utiliser $y(t_0) = y_0$.
*   $(\Leftarrow)$ : Si $y$ continue, $s \mapsto f(s, y(s))$ est continue (composée), donc $y$ est $C^1$ par le théorème fondamental de l'analyse, et $y'(t) = f(t, y(t))$. Évaluer en $t_0$ donne $y(t_0) = y_0$.

### 
**Subtilités :**
*   La continuité de $f$ en les deux variables est nécessaire pour que $s \mapsto f(s, y(s))$ soit intégrable.
*   La formulation intégrale ne requiert que la continuité de $y$, pas sa dérivabilité a priori : c'est la formulation intégrale qui produit la régularité $C^1$.
*   Ce lemme est la pierre angulaire de la démonstration du théorème de Cauchy-Lipschitz (méthode du point fixe de Picard).

**Extensions :**
*   Valable en dimension infinie si $E$ est un espace de Banach (hors programme MP, mais utile conceptuellement).

**Pièges classiques :**
*   Oublier de vérifier que $f$ est continue (et pas seulement en $t$ ou en $y$ séparément).
*   Confondre « solution au sens classique » ($C^1$) et « solution au sens intégral » (continue) : ici elles coïncident grâce à la continuité de $f$.

---

## FLASHCARD 87 — Théorème 40 : Cauchy-Lipschitz linéaire

### RECTO
**Théorème de Cauchy-Lipschitz linéaire**

Soit $I$ un intervalle ouvert de $\mathbb{R}$, $A : I \to M_n(\mathbb{K})$ et $B : I \to \mathbb{K}^n$ continues, avec $\mathbb{K} = \mathbb{R}$ ou $\mathbb{C}$.

**Question :** Énoncer le théorème de Cauchy-Lipschitz pour le système différentiel linéaire $Y' = A(t)Y + B(t), Y(t_0) = Y_0$.

### VERSO
**Hypothèses :**
*   $I$ intervalle (ouvert, fermé, ou quelconque) de $\mathbb{R}$
*   $A : I \to M_n(\mathbb{K})$ continue
*   $B : I \to \mathbb{K}^n$ continue
*   $t_0 \in I, Y_0 \in \mathbb{K}^n$

**Conclusion :**
Le problème de Cauchy :
$$ \begin{cases} Y'(t) = A(t)Y(t) + B(t) \\ Y(t_0) = Y_0 \end{cases} $$
admet une unique solution $Y : I \to \mathbb{K}^n$ de classe $C^1$, définie sur $I$ tout entier (solution globale).

**Conséquences :**
*   L'ensemble des solutions de l'équation homogène $Y' = A(t)Y$ est un sous-espace vectoriel de dimension $n$ de $C^1(I, \mathbb{K}^n)$.
*   L'ensemble des solutions de $Y' = A(t)Y + B(t)$ est un sous-espace affine de dimension $n$, dirigé par le précédent.

**Démonstration (esquisse) :**
Reformulation intégrale : $Y(t) = Y_0 + \int_{t_0}^t [A(s)Y(s) + B(s)] ds$.
On définit l'opérateur $\Phi(Y)(t) = Y_0 + \int_{t_0}^t [A(s)Y(s) + B(s)] ds$.
On montre que $\Phi^k$ est contractante pour la norme $\|\cdot\|_\infty$ sur tout segment $[t_0-\delta, t_0+\delta] \subset I$ (ou via le lemme de Gronwall pour l'unicité).
Le caractère global vient de la linéarité : $f(t, Y) = A(t)Y + B(t)$ est lipschitzienne en $Y$ sur tout segment, ce qui empêche l'explosion en temps fini.

### 
**Subtilités :**
*   Le résultat essentiel est le caractère global : la solution est définie sur $I$ tout entier, pas seulement localement. C'est une propriété spécifique aux EDO linéaires.
*   $I$ n'a pas besoin d'être ouvert : le théorème vaut sur tout intervalle (segment, semi-ouvert…), avec dérivée à droite/gauche aux bords si nécessaire.
*   Le théorème est valable pour $\mathbb{K} = \mathbb{R}$ ou $\mathbb{C}$ indifféremment.

**Extensions :**
*   En dimension infinie ($E$ espace de Banach), le théorème reste vrai si $A(t) \in \mathcal{L}(E)$ et $t \mapsto A(t)$ est continue pour la topologie de la norme d'opérateur (hors programme MP strict).

**Pièges classiques :**
*   Oublier que la dimension de l'espace des solutions de l'homogène est $n$ (et non $n+1$ ou autre).
*   Confondre avec le Cauchy-Lipschitz non linéaire où la solution n'est que locale.
*   Ne pas vérifier la continuité de $A$ et $B$ (si elles ne sont que continues par morceaux, il faut recoller).
*   Attention : pour une équation scalaire d'ordre $n$, on se ramène à un système de dimension $n$, et l'espace des solutions de l'homogène est de dimension $n$.

---

## FLASHCARD 88 — Théorème 41 : Cauchy-Lipschitz pour les EDL d'ordre $n$

### RECTO
**Théorème de Cauchy-Lipschitz pour les équations différentielles linéaires scalaires d'ordre $n$**

Soit $I$ un intervalle de $\mathbb{R}$, $a_0, \dots, a_{n-1}, b : I \to \mathbb{K}$ continues.

**Question :** Énoncer le théorème d'existence et d'unicité pour l'équation :
$$ y^{(n)} + a_{n-1}(t) y^{(n-1)} + \dots + a_0(t) y = b(t) $$
avec conditions initiales prescrites.

### VERSO
**Hypothèses :**
*   $I$ intervalle de $\mathbb{R}$, $\mathbb{K} = \mathbb{R}$ ou $\mathbb{C}$
*   $a_0, \dots, a_{n-1} : I \to \mathbb{K}$ continues
*   $b : I \to \mathbb{K}$ continue
*   $t_0 \in I, (y_0, y_1, \dots, y_{n-1}) \in \mathbb{K}^n$

**Conclusion :**
Le problème de Cauchy :
$$ \begin{cases} y^{(n)}(t) + a_{n-1}(t) y^{(n-1)}(t) + \dots + a_0(t) y(t) = b(t) \\ y(t_0) = y_0, \quad y'(t_0) = y_1, \quad \dots, \quad y^{(n-1)}(t_0) = y_{n-1} \end{cases} $$
admet une unique solution $y : I \to \mathbb{K}$ de classe $C^n$, définie sur $I$ tout entier.

L'espace des solutions de l'équation homogène est un $\mathbb{K}$-espace vectoriel de dimension $n$.

**Démonstration (esquisse) :**
Se ramener au théorème précédent (Théorème 40) en posant $Y = (y, y', \dots, y^{(n-1)})^T \in \mathbb{K}^n$, ce qui donne $Y' = A(t)Y + B(t)$ avec $A(t)$ la matrice compagnon associée.

### 
**Subtilités :**
*   Le coefficient dominant doit être normalisé à 1 (ou non nul). Si l'équation est $a_n(t) y^{(n)} + \dots = b(t)$ avec $a_n$ pouvant s'annuler, le théorème ne s'applique pas directement : il faut travailler sur les intervalles où $a_n \neq 0$.
*   Le wronskien des solutions de l'homogène est soit identiquement nul, soit jamais nul sur $I$ (caractérise si les solutions forment une base ou non).

**Pièges classiques :**
*   Diviser par $a_n(t)$ sans vérifier que $a_n$ ne s'annule pas sur $I$.
*   Oublier qu'il faut $n$ conditions initiales (et non $n-1$ ou $n+1$).
*   Sur un problème concret, oublier de vérifier que les $a_k$ sont bien continues sur l'intervalle considéré (ex : $1/t$ non continue en $0$).

---

## FLASHCARD 89 — À connaître 23 : Wronskien et structure des solutions

### RECTO
**Wronskien et structure des solutions d'une EDL d'ordre $n$**

Soit $y_1, \dots, y_n$ des solutions de l'équation homogène $y^{(n)} + a_{n-1}(t) y^{(n-1)} + \dots + a_0(t) y = 0$ sur un intervalle $I$.

**Question :** Définir le wronskien de $(y_1, \dots, y_n)$. Énoncer la caractérisation d'un système fondamental de solutions via le wronskien. Donner la formule de Liouville (ou d'Abel).

### VERSO
**Définition :**
$$ W(t) = \det \begin{pmatrix} y_1(t) & \dots & y_n(t) \\ y_1'(t) & \dots & y_n'(t) \\ \vdots & & \vdots \\ y_1^{(n-1)}(t) & \dots & y_n^{(n-1)}(t) \end{pmatrix} $$

**Caractérisation :**
$(y_1, \dots, y_n)$ est un système fondamental de solutions (i.e. une base de l'espace des solutions) si et seulement si $W(t_0) \neq 0$ pour un (et alors tout) $t_0 \in I$.

**Alternative de wronskien :** $W$ est soit identiquement nul sur $I$, soit ne s'annule jamais sur $I$.

**Formule d'Abel–Liouville :**
$$ \forall t \in I, \quad W(t) = W(t_0) \exp \left( - \int_{t_0}^t a_{n-1}(s) ds \right) $$

**Démonstration (esquisse) :**
On dérive $W$ : par multilinéarité du déterminant, seule la ligne des dérivées d'ordre maximal contribue, ce qui donne $W'(t) = - a_{n-1}(t) W(t)$.
EDL d'ordre 1 en $W \to$ formule exponentielle.

### 
**Subtilités :**
*   L'alternative du wronskien est spécifique aux solutions d'une même EDL. Pour des fonctions quelconques, le wronskien peut s'annuler en certains points sans être identiquement nul.
*   La formule d'Abel ne fait intervenir que $a_{n-1}$ (coefficient de $y^{(n-1)}$), pas les autres.

**Pièges classiques :**
*   Calculer un wronskien de fonctions qui ne sont pas solutions d'une même EDL et en tirer des conclusions fausses.
*   Confondre « famille libre de $C^n(I)$ » et « système fondamental » : une famille de solutions peut être libre sans être un SFS si elle ne comporte pas $n$ éléments.

---

## FLASHCARD 90 — Proposition 24 : Variation des constantes (équation scalaire d'ordre 2)

### RECTO
**Variation des constantes pour une équation scalaire d'ordre 2**

Soit l'équation $y'' + a(t)y' + b(t)y = c(t)$ sur un intervalle $I$, avec $a, b, c : I \to \mathbb{K}$ continues, et $(y_1, y_2)$ un système fondamental de solutions de l'homogène.

**Question :** Énoncer la méthode de variation des constantes : sous quelle forme cherche-t-on une solution particulière ? Quel système vérifient les fonctions inconnues ?

### VERSO
**Hypothèses :**
*   $I$ intervalle de $\mathbb{R}$, $\mathbb{K} = \mathbb{R}$ ou $\mathbb{C}$
*   $a, b, c : I \to \mathbb{K}$ continues
*   $(y_1, y_2)$ système fondamental de solutions de $y'' + ay' + by = 0$
*   $W = y_1 y_2' - y_1' y_2$ le wronskien (ne s'annule jamais)

**Méthode :**
On cherche une solution particulière sous la forme :
$$ y_p(t) = \lambda_1(t) y_1(t) + \lambda_2(t) y_2(t) $$
avec $\lambda_1, \lambda_2 : I \to \mathbb{K}$ de classe $C^1$.

**Système de Cramer :**
$$ \begin{cases} \lambda_1'(t) y_1(t) + \lambda_2'(t) y_2(t) = 0 \\ \lambda_1'(t) y_1'(t) + \lambda_2'(t) y_2'(t) = c(t) \end{cases} $$

**Solution :**
$$ \lambda_1'(t) = \frac{-y_2(t) c(t)}{W(t)}, \quad \lambda_2'(t) = \frac{y_1(t) c(t)}{W(t)} $$
Puis on intègre pour obtenir $\lambda_1$ et $\lambda_2$.

**Démonstration (esquisse) :**
On pose la contrainte de jauge $\lambda_1' y_1 + \lambda_2' y_2 = 0$ pour que $y_p' = \lambda_1 y_1' + \lambda_2 y_2'$ (simplification).
On dérive une seconde fois et on injecte dans l'équation : les termes en $\lambda_1, \lambda_2$ (sans prime) disparaissent car $y_1, y_2$ sont solutions de l'homogène.
Il reste $\lambda_1' y_1' + \lambda_2' y_2' = c$, et le système est inversible car $W \neq 0$.

### 
**Subtilités :**
*   La première équation $\lambda_1' y_1 + \lambda_2' y_2 = 0$ est une convention de calcul (condition de jauge), pas une conséquence de l'équation. Elle simplifie $y_p''$.
*   La méthode se généralise à l'ordre $n$ : on a $n$ inconnues $\lambda_k'$ et $n$ équations, dont $n-1$ conditions de jauge et la dernière vient de l'EDL.

**Pièges classiques :**
*   Oublier de normaliser l'équation (le coefficient de $y''$ doit être 1, sinon le second membre est $c(t)/a_2(t)$).
*   Se tromper de signe dans les formules de Cramer.
*   Oublier que la solution générale est $y = y_p + \alpha y_1 + \beta y_2$, pas juste $y_p$.

---

## FLASHCARD 91 — À connaître 24 : Zéros isolés des solutions d'EDL

### RECTO
**Zéros isolés des solutions d'une EDL d'ordre $n$**

Soit $y$ une solution non identiquement nulle de l'EDL homogène $y^{(n)} + a_{n-1}(t) y^{(n-1)} + \dots + a_0(t) y = 0$ sur un intervalle $I$, avec $a_k$ continues.

**Question :** Que peut-on dire des zéros de $y$ ?

### VERSO
**Hypothèses :**
*   $I$ intervalle de $\mathbb{R}$
*   $a_0, \dots, a_{n-1} : I \to \mathbb{K}$ continues
*   $y : I \to \mathbb{K}$ solution de l'EDL homogène, $y \not\equiv 0$

**Conclusion :**
Les zéros de $y$ sont isolés : pour tout $t_0 \in I$ tel que $y(t_0) = 0$, il existe $\varepsilon > 0$ tel que $y$ ne s'annule pas sur $]t_0 - \varepsilon, t_0 + \varepsilon[ \setminus \{t_0\}$.

En particulier, $y$ n'a qu'un nombre fini de zéros sur tout segment $[a, b] \subset I$.

**Démonstration (esquisse) :**
Si $y(t_0) = 0$, poser $Y(t_0) = (y(t_0), y'(t_0), \dots, y^{(n-1)}(t_0))$.
Comme $y \not\equiv 0$, par unicité de Cauchy-Lipschitz, $Y(t_0) \neq 0$, donc il existe $k \in \{0, \dots, n-1\}$ tel que $y^{(k)}(t_0) \neq 0$.
Soit $k_0$ le plus petit tel indice. Si $k_0 = 0$, $y(t_0) \neq 0$, contradiction. Sinon $y(t_0) = y'(t_0) = \dots = y^{(k_0-1)}(t_0) = 0$ et $y^{(k_0)}(t_0) \neq 0$.
Par Taylor (ou par continuité de $y^{(k_0)}$), $y(t) \sim \frac{y^{(k_0)}(t_0)}{k_0!} (t-t_0)^{k_0}$ au voisinage de $t_0$, donc $y$ ne s'annule pas au voisinage de $t_0$ (sauf en $t_0$ lui-même).
Nombre fini sur un segment : l'ensemble des zéros est fermé et discret dans $I$, donc fini sur tout compact.

### 
**Subtilités :**
*   Le résultat est faux pour des fonctions quelconques : $t \mapsto t^2 \sin(1/t)$ a des zéros non isolés.
*   C'est aussi faux pour les EDL à coefficients discontinus.
*   Pour $\mathbb{K} = \mathbb{C}$, les zéros sont encore isolés, mais on ne peut pas parler de « signe ».

**Extensions :**
*   Pour les EDL d'ordre 2 à coefficients réels, on peut dire beaucoup plus : les zéros de deux solutions linéairement indépendantes s'entrelacent (théorème de Sturm).

**Pièges classiques :**
*   Écrire « les zéros sont en nombre fini sur $I$ » sans préciser « sur tout segment » : sur $I = \mathbb{R}$, $\sin(t)$ (solution de $y''+y=0$) a une infinité de zéros, mais ils sont isolés.
*   Confondre « isolés » et « en nombre fini ».

---

## FLASHCARD 92 — À connaître 25 : Théorème de Sturm-Liouville (théorème de comparaison de Sturm)

### RECTO
**Théorème de comparaison de Sturm**

Soient $q_1, q_2 : [a, b] \to \mathbb{R}$ continues avec $q_1 \le q_2$ sur $[a, b]$. Soit $y_1$ (resp. $y_2$) une solution non triviale de $y'' + q_1(t)y = 0$ (resp. $y'' + q_2(t)y = 0$).

**Question :** Énoncer le théorème de comparaison de Sturm reliant les zéros de $y_1$ et $y_2$.

### VERSO
**Hypothèses :**
*   $[a, b]$ segment de $\mathbb{R}$
*   $q_1, q_2 : [a, b] \to \mathbb{R}$ continues, $q_1(t) \le q_2(t)$ pour tout $t \in [a, b]$
*   $y_1$ solution non triviale de $y_1'' + q_1(t) y_1 = 0$
*   $y_2$ solution non triviale de $y_2'' + q_2(t) y_2 = 0$

**Conclusion :**
Entre deux zéros consécutifs de $y_1$, il y a au moins un zéro de $y_2$ (à condition que $q_1 \not\equiv q_2$ sur cet intervalle, sinon $y_2$ peut ne pas s'annuler).

Plus précisément : si $\alpha < \beta$ sont deux zéros consécutifs de $y_1$ et $q_1 \le q_2$ avec $q_1 \not\equiv q_2$, alors $y_2$ s'annule au moins une fois dans $]\alpha, \beta[$.

**Démonstration (esquisse) :**
On peut supposer $y_1 > 0$ sur $]\alpha, \beta[$ (quitte à changer de signe).
On suppose par l'absurde que $y_2 > 0$ sur $]\alpha, \beta[$.
On considère l'identité de Picone ou on calcule $\frac{d}{dt}[y_1 y_2' - y_1' y_2]$ :
$$ \frac{d}{dt}(y_1 y_2' - y_1' y_2) = (q_1 - q_2) y_1 y_2 $$
On intègre sur $[\alpha, \beta]$ : le membre de gauche se calcule aux bornes ($y_1(\alpha) = y_1(\beta) = 0$), le membre de droite est $\le 0$ (car $q_1 \le q_2$ et $y_1, y_2 > 0$), ce qui mène à une contradiction si $q_1 \not\equiv q_2$.

### 
**Subtilités :**
*   Le théorème est spécifique à l'ordre 2 et aux coefficients réels.
*   Si $q_1 = q_2$, on retrouve l'entrelacement des zéros de deux solutions linéairement indépendantes d'une même EDL d'ordre 2 (théorème de Sturm).
*   L'hypothèse est $q_1 \le q_2$ : plus le « potentiel » $q$ est grand, plus les solutions oscillent rapidement.

**Applications classiques :**
*   Comparer les zéros de $y'' + t y = 0$ (Airy) à ceux de $\sin$ ou $\cos$ (solutions de $y'' + y = 0$).
*   Montrer qu'une solution a une infinité de zéros si $q(t) \to +\infty$.

**Pièges classiques :**
*   Appliquer Sturm à des équations qui ne sont pas sous forme $y'' + q(t) y = 0$ : il faut d'abord se ramener à cette forme (ou adapter l'énoncé si le coefficient de $y'$ n'est pas nul).
*   Oublier la condition $q_1 \not\equiv q_2$.

---

## FLASHCARD 93 — Théorème 42 : Condition nécessaire d'extremum local en un point intérieur (calcul différentiel)

### RECTO
**Condition nécessaire d'extremum local en un point intérieur (fonctions de plusieurs variables)**

Soit $U$ un ouvert de $\mathbb{R}^n$, $f : U \to \mathbb{R}$ différentiable en $a \in U$.

**Question :** Énoncer la condition nécessaire d'extremum local de $f$ en $a$.

### VERSO
**Hypothèses :**
*   $U$ ouvert de $\mathbb{R}^n$
*   $f : U \to \mathbb{R}$
*   $f$ différentiable en $a \in U$
*   $f$ admet un extremum local en $a$

**Conclusion :**
$$ df(a) = 0 \quad \text{i.e.} \quad \forall h \in \mathbb{R}^n, df(a) \cdot h = 0 $$
Autrement dit, $\nabla f(a) = 0$ (toutes les dérivées partielles s'annulent en $a$) :
$$ \frac{\partial f}{\partial x_i}(a) = 0 \quad \forall i \in \{1, \dots, n\} $$

**Démonstration (esquisse) :**
Pour tout $h \in \mathbb{R}^n$, la fonction $\varphi : t \mapsto f(a + th)$ est définie au voisinage de $0$, différentiable en $0$, et admet un extremum local en $0$. Par le cas réel unidimensionnel : $\varphi'(0) = df(a) \cdot h = 0$.

### 
**Subtilités :**
*   Le point $a$ doit être intérieur au domaine. Si $a$ est sur le bord, la condition n'est plus nécessaire (cf. optimisation sous contrainte).
*   La condition est nécessaire mais pas suffisante : $f(x, y) = x^3$ en $(0, 0)$ a $df(0) = 0$ mais pas d'extremum.
*   $f$ doit être à valeurs réelles. Pour $f : U \to \mathbb{R}^p$ avec $p \ge 2$, la notion d'extremum n'a pas de sens (pas d'ordre sur $\mathbb{R}^p$).

**Pièges classiques :**
*   Confondre « $f$ admet toutes ses dérivées partielles nulles en $a$ » (condition plus faible si $f$ n'est pas différentiable) et « $df(a) = 0$ ».
*   Oublier de vérifier la différentiabilité (l'existence des dérivées partielles ne suffit pas).

---

## FLASHCARD 94 — Proposition 25 : Règle de la chaîne

### RECTO
**Règle de la chaîne (chain rule)**

Soient $U \subset \mathbb{R}^n$ ouvert, $V \subset \mathbb{R}^p$ ouvert, $f : U \to V$ et $g : V \to \mathbb{R}^q$.

**Question :** Sous quelles hypothèses $g \circ f$ est-elle différentiable en $a \in U$, et quelle est sa différentielle ?

### VERSO
**Hypothèses :**
*   $U$ ouvert de $\mathbb{R}^n$, $V$ ouvert de $\mathbb{R}^p$
*   $f : U \to \mathbb{R}^p$ différentiable en $a \in U$, avec $f(U) \subset V$
*   $g : V \to \mathbb{R}^q$ différentiable en $b = f(a) \in V$

**Conclusion :**
$g \circ f$ est différentiable en $a$ et :
$$ d(g \circ f)(a) = dg(f(a)) \circ df(a) $$

En termes de matrices jacobiennes :
$$ J_{g \circ f}(a) = J_g(f(a)) \cdot J_f(a) $$

**Démonstration (esquisse) :**
*   Écrire $f(a+h) = f(a) + df(a) \cdot h + o(\|h\|)$.
*   Écrire $g(f(a)+k) = g(f(a)) + dg(f(a)) \cdot k + o(\|k\|)$ avec $k = df(a) \cdot h + o(\|h\|)$.
*   Composer : $g(f(a+h)) = g(f(a)) + dg(f(a)) \cdot df(a) \cdot h + o(\|h\|)$.
*   Vérifier que les restes sont bien des $o(\|h\|)$ en utilisant que $\|k\| = O(\|h\|)$.

### 
**Subtilités :**
*   La règle de la chaîne donne la composition des applications linéaires (et non leur somme ou produit terme à terme).
*   En coordonnées : $\frac{\partial (g \circ f)}{\partial x_j}(a) = \sum_{i=1}^p \frac{\partial g}{\partial y_i}(f(a)) \frac{\partial f_i}{\partial x_j}(a)$.
*   L'hypothèse « $f(U) \subset V$ » est parfois oubliée mais nécessaire pour que $g \circ f$ ait un sens.

**Extensions :**
*   Valable en dimension infinie entre espaces de Banach (même démonstration).
*   Si $f$ est $C^1$ et $g$ est $C^1$, alors $g \circ f$ est $C^1$ (et la formule est valable en tout point).

**Pièges classiques :**
*   Inverser l'ordre dans la composition : $dg(f(a)) \circ df(a)$ et non $df(a) \circ dg(f(a))$.
*   Évaluer $dg$ en $a$ au lieu de $f(a)$.
*   Oublier que la différentiabilité de $f$ en $a$ implique la continuité de $f$ en $a$ (nécessaire pour que $f(a+h)$ reste dans $V$).

---

## FLASHCARD 95 — Proposition 26 : Intégration le long d'un arc (chemin)

### RECTO
**Intégration le long d'un chemin**

Soit $U$ un ouvert de $\mathbb{R}^n$, $f : U \to \mathbb{R}$ de classe $C^1$, et $\gamma : [a, b] \to U$ un chemin de classe $C^1$.

**Question :** Exprimer $f(\gamma(b)) - f(\gamma(a))$ à l'aide d'une intégrale.

### VERSO
**Hypothèses :**
*   $U$ ouvert de $\mathbb{R}^n$
*   $f : U \to \mathbb{R}$ de classe $C^1$
*   $\gamma : [a, b] \to U$ de classe $C^1$ (ou $C^1$ par morceaux)

**Conclusion :**
$$ f(\gamma(b)) - f(\gamma(a)) = \int_a^b df(\gamma(t)) \cdot \gamma'(t) dt = \int_a^b \langle \nabla f(\gamma(t)), \gamma'(t) \rangle dt $$

En coordonnées : si $\gamma(t) = (\gamma_1(t), \dots, \gamma_n(t))$ :
$$ f(\gamma(b)) - f(\gamma(a)) = \int_a^b \sum_{i=1}^n \frac{\partial f}{\partial x_i}(\gamma(t)) \gamma_i'(t) dt $$

**Démonstration :**
Poser $\varphi(t) = f(\gamma(t))$. Par la règle de la chaîne, $\varphi'(t) = df(\gamma(t)) \cdot \gamma'(t)$. Puis $\varphi(b) - \varphi(a) = \int_a^b \varphi'(t) dt$.

### 
**Subtilités :**
*   C'est essentiellement le théorème fondamental de l'analyse appliqué à $\varphi = f \circ \gamma$.
*   Cela fournit une version de l'inégalité des accroissements finis en dimension $n$ : en prenant $\gamma(t) = a + t(b-a)$ et en majorant la norme de $\nabla f$.

**Extensions :**
*   C'est le point de départ de la théorie des formes différentielles et des intégrales curvilignes.

**Pièges classiques :**
*   La formule nécessite que l'image de $\gamma$ soit dans $U$ (important si $U$ n'est pas convexe : le segment $[a, b]$ dans $\mathbb{R}^n$ peut sortir de $U$).
*   Oublier le produit scalaire : c'est $\nabla f \cdot \gamma'$ et non $\nabla f \cdot \gamma$.

---

## FLASHCARD 96 — À connaître 26 : Inégalité des accroissements finis en dimension quelconque

### RECTO
**Inégalité des accroissements finis (fonctions de plusieurs variables, ou à valeurs vectorielles)**

Soit $U$ un ouvert convexe de $\mathbb{R}^n$, $f : U \to \mathbb{R}^p$ de classe $C^1$.

**Question :** Énoncer l'inégalité des accroissements finis pour $f$ entre deux points $a, b \in U$.

### VERSO
**Hypothèses :**
*   $U$ ouvert convexe de $\mathbb{R}^n$ (ou plus généralement : le segment $[a, b] \subset U$)
*   $f : U \to \mathbb{R}^p$ de classe $C^1$
*   $a, b \in U$

**Conclusion :**
$$ \|f(b) - f(a)\| \le \sup_{t \in [0, 1]} \|df(a + t(b-a))\|_{\mathcal{L}(\mathbb{R}^n, \mathbb{R}^p)} \cdot \|b-a\| $$

Si $M = \sup_{x \in [a, b]} \|\|df(x)\|\|$ (norme d'opérateur de la différentielle) :
$$ \|f(b) - f(a)\| \le M \|b-a\| $$

**Cas $p=1$ (réel) :** On a en fait l'égalité de la moyenne $f(b) - f(a) = df(c) \cdot (b-a)$ pour un certain $c$ sur le segment $[a, b]$ (seulement pour $f$ à valeurs réelles et $n=1$).

**Démonstration (esquisse) :**
Poser $\varphi(t) = f(a + t(b-a))$. Alors $\varphi'(t) = df(a + t(b-a)) \cdot (b-a)$.
$f(b) - f(a) = \varphi(1) - \varphi(0) = \int_0^1 \varphi'(t) dt$.
Majorer en norme : $\|f(b) - f(a)\| \le \int_0^1 \|\varphi'(t)\| dt \le \sup_t \|df(\dots)\| \cdot \|b-a\|$.

### 
**Subtilités :**
*   La convexité de $U$ (ou l'inclusion du segment $[a, b]$ dans $U$) est cruciale. Sur un ouvert non convexe, le chemin rectiligne peut sortir du domaine.
*   L'égalité des accroissements finis ($\exists c, f(b) - f(a) = f'(c)(b-a)$) est fausse pour $f$ à valeurs vectorielles : considérer $f(t) = e^{it}$ sur $[0, 2\pi]$.
*   En revanche, l'inégalité reste vraie pour $f : U \subset \mathbb{R}^n \to E$ avec $E$ evn quelconque (même de dimension infinie).

**Pièges classiques :**
*   Appliquer le TAF (égalité) à une fonction à valeurs vectorielles.
*   Oublier que la norme de la différentielle est une norme d'opérateur.

---

## FLASHCARD 97 — Proposition 27 : Caractérisation des fonctions constantes

### RECTO
**Caractérisation des fonctions constantes sur un connexe**

Soit $U$ un ouvert connexe de $\mathbb{R}^n$ et $f : U \to \mathbb{R}^p$ de classe $C^1$.

**Question :** Énoncer la caractérisation de la constance de $f$ par sa différentielle.

### VERSO
**Hypothèses :**
*   $U$ ouvert connexe de $\mathbb{R}^n$ (connexe par arcs revient au même pour un ouvert)
*   $f : U \to \mathbb{R}^p$ de classe $C^1$

**Conclusion :**
$$ f \text{ est constante sur } U \iff \forall x \in U, df(x) = 0 $$
(i.e. toutes les dérivées partielles de toutes les composantes sont nulles sur $U$)

**Démonstration (esquisse) :**
*   $(\Rightarrow)$ : trivial.
*   $(\Leftarrow)$ : Soit $a \in U$ fixé. L'ensemble $\{x \in U : f(x) = f(a)\}$ est fermé (par continuité) et ouvert (car si $df=0$, par l'IAF, $f$ est localement constante). Comme $U$ est connexe et cet ensemble est non vide (contient $a$), il est égal à $U$.
*   Alternative (sur un ouvert convexe) : on utilise directement l'IAF avec $M=0$.

### 
**Subtilités :**
*   La connexité est essentielle : sur $U = ]-2, -1[ \cup ]1, 2[$, la fonction valant $0$ sur la première composante et $1$ sur la seconde a $df=0$ mais n'est pas constante.
*   Pour un ouvert de $\mathbb{R}^n$, connexe $\iff$ connexe par arcs.

**Extensions :**
*   Deux fonctions $C^1$ ayant la même différentielle sur un ouvert connexe diffèrent d'une constante.

**Pièges classiques :**
*   Oublier l'hypothèse de connexité.
*   Confondre « toutes les dérivées partielles nulles » et « la différentielle nulle » : c'est la même chose si $f$ est différentiable, mais l'existence des dérivées partielles seule ne suffit pas.

---

## FLASHCARD 98 — Proposition 28 : Difféomorphisme et inverse local

### RECTO
**Différentielle d'un difféomorphisme et condition nécessaire**

Soit $U, V$ ouverts de $\mathbb{R}^n$, et $f : U \to V$ un difféomorphisme de classe $C^1$.

**Question :** Que peut-on dire de $df(a)$ pour tout $a \in U$ ? Donner la formule de la différentielle de $f^{-1}$.

### VERSO
**Hypothèses :**
*   $U, V$ ouverts de $\mathbb{R}^n$
*   $f : U \to V$ bijection de classe $C^1$, $f^{-1} : V \to U$ de classe $C^1$ (i.e. $f$ est un $C^1$-difféomorphisme)

**Conclusion :**
Pour tout $a \in U$, $df(a) \in \mathcal{L}(\mathbb{R}^n)$ est un isomorphisme (i.e. $\det J_f(a) \neq 0$), et :
$$ d(f^{-1})(f(a)) = [df(a)]^{-1} $$

En termes de matrices jacobiennes :
$$ J_{f^{-1}}(f(a)) = [J_f(a)]^{-1} $$

**Démonstration :**
Appliquer la règle de la chaîne à $f^{-1} \circ f = Id_U$ :
$$ d(f^{-1})(f(a)) \circ df(a) = Id_{\mathbb{R}^n} $$
De même avec $f \circ f^{-1} = Id_V$. Donc $df(a)$ est inversible.

### 
**Subtilités :**
*   C'est une condition nécessaire. La réciproque (théorème d'inversion locale) affirme que si $f$ est $C^1$ et $df(a)$ est inversible, alors $f$ est un $C^1$-difféomorphisme local au voisinage de $a$. (Ce théorème est selon les programmes hors programme en MP, mais l'énoncé est à connaître.)
*   Si $f$ est $C^k$, alors $f^{-1}$ est aussi $C^k$.

**Pièges classiques :**
*   Croire que $df(a)$ inversible implique que $f$ est un difféomorphisme global : c'est faux ($\exp : \mathbb{R} \to \mathbb{R}_+^*$ est un difféomorphisme global, mais $t \mapsto e^{it}$ de $\mathbb{R}$ dans $S^1$ ne l'est pas).
*   Oublier que le théorème d'inversion locale ne donne qu'un résultat local.

---

## FLASHCARD 99 — Théorème 43 : Optimisation sous contrainte (multiplicateurs de Lagrange)

### RECTO
**Théorème des multiplicateurs de Lagrange**

Soit $U$ un ouvert de $\mathbb{R}^n$, $f : U \to \mathbb{R}$ et $g_1, \dots, g_p : U \to \mathbb{R}$ de classe $C^1$, avec $p < n$.

**Question :** Énoncer la condition nécessaire d'extremum local de $f$ sous les contraintes $g_1 = \dots = g_p = 0$.

### VERSO
**Hypothèses :**
*   $U$ ouvert de $\mathbb{R}^n$, $\mathbb{K} = \mathbb{R}$
*   $f, g_1, \dots, g_p : U \to \mathbb{R}$ de classe $C^1$, avec $p < n$
*   $a \in U$ tel que $g_1(a) = \dots = g_p(a) = 0$
*   **Condition de qualification :** les formes linéaires $dg_1(a), \dots, dg_p(a)$ sont linéairement indépendantes (i.e. la matrice jacobienne $(\nabla g_1(a) \mid \dots \mid \nabla g_p(a))$ est de rang $p$)
*   $f$ admet un extremum local en $a$ sur l'ensemble $\Gamma = \{x \in U : g_1(x) = \dots = g_p(x) = 0\}$

**Conclusion :**
Il existe des scalaires $\lambda_1, \dots, \lambda_p \in \mathbb{R}$ (les multiplicateurs de Lagrange) tels que :
$$ df(a) = \lambda_1 dg_1(a) + \dots + \lambda_p dg_p(a) $$
Autrement dit :
$$ \nabla f(a) = \lambda_1 \nabla g_1(a) + \dots + \lambda_p \nabla g_p(a) $$

On a donc $n+p$ équations (les $n$ composantes de la relation ci-dessus, plus les $p$ contraintes $g_k(a) = 0$) pour $n+p$ inconnues ($a_1, \dots, a_n, \lambda_1, \dots, \lambda_p$).

**Démonstration (esquisse) :**
Par le théorème des fonctions implicites (ou un argument de rang), la contrainte $\Gamma$ est localement une sous-variété de dimension $n-p$, et le noyau $\ker(dg_1(a), \dots, dg_p(a))$ est l'espace tangent à $\Gamma$ en $a$.
Pour tout vecteur $h$ tangent à $\Gamma$ en $a$, on a $df(a) \cdot h = 0$ (condition nécessaire d'extremum sur $\Gamma$).
Donc $df(a)$ s'annule sur $\ker(dg_1(a), \dots, dg_p(a))$, ce qui signifie que $df(a) \in \text{Vect}(dg_1(a), \dots, dg_p(a))$.

### 
**Subtilités :**
*   La condition de qualification (indépendance des $dg_k(a)$) est indispensable. Sans elle, la conclusion peut être fausse.
*   Le théorème donne une condition nécessaire, pas suffisante. Un point vérifiant les conditions de Lagrange est un point critique mais pas nécessairement un extremum.
*   Les multiplicateurs $\lambda_k$ sont uniques (grâce à l'indépendance des $dg_k(a)$).

**Extensions :**
*   On peut ajouter des contraintes d'inégalité : conditions de Karush-Kuhn-Tucker (hors programme MP).
*   Pour une seule contrainte ($p=1$), la condition se réduit à $\nabla f(a) = \lambda \nabla g(a)$, c'est-à-dire que les lignes de niveau de $f$ et $g$ sont tangentes en $a$.

**Pièges classiques :**
*   Oublier la condition de qualification et perdre tous les points.
*   Oublier de vérifier que le point trouvé est bien un extremum (et pas un col).
*   Se tromper dans le comptage : $p$ contraintes, $p$ multiplicateurs, et il faut $p < n$.
*   Confondre « les gradients sont colinéaires » (cas $p=1$) et « les gradients sont égaux ».

---

## FLASHCARD 100 — Théorème 44 : Théorème de Schwarz

### RECTO
**Théorème de Schwarz**

Soit $U$ un ouvert de $\mathbb{R}^n$ et $f : U \to \mathbb{R}$.

**Question :** Sous quelles hypothèses les dérivées partielles croisées de $f$ commutent-elles ? Énoncer le théorème.

### VERSO
**Hypothèses :**
*   $U$ ouvert de $\mathbb{R}^n$
*   $f : U \to \mathbb{R}$ (ou plus généralement $f : U \to \mathbb{R}^p$, composante par composante)
*   $f$ est de classe $C^2$ sur $U$ (il suffit que les dérivées partielles secondes $\frac{\partial^2 f}{\partial x_i \partial x_j}$ et $\frac{\partial^2 f}{\partial x_j \partial x_i}$ existent et soient continues sur $U$)

**Conclusion :**
$$ \forall a \in U, \forall (i, j) \in \{1, \dots, n\}^2, \quad \frac{\partial^2 f}{\partial x_i \partial x_j}(a) = \frac{\partial^2 f}{\partial x_j \partial x_i}(a) $$

Plus généralement, si $f$ est $C^k$, les dérivées partielles d'ordre $\le k$ ne dépendent pas de l'ordre de dérivation.

**Démonstration (esquisse, cas $n=2$) :**
Considérer $\Delta(s, t) = f(a_1+s, a_2+t) - f(a_1+s, a_2) - f(a_1, a_2+t) + f(a_1, a_2)$.
Appliquer le TAF en $s$ puis en $t$ (ou inversement) : on obtient $\Delta(s, t) = st \frac{\partial^2 f}{\partial x_1 \partial x_2}(c_1)$ d'un côté, et $\Delta(s, t) = st \frac{\partial^2 f}{\partial x_2 \partial x_1}(c_2)$ de l'autre.
Passer à la limite $(s, t) \to (0, 0)$ en utilisant la continuité des dérivées secondes.

### 
**Subtilités :**
*   L'hypothèse minimale classique est : les deux dérivées partielles secondes croisées existent au voisinage de $a$ et l'une d'elles est continue en $a$. Alors elles sont égales en $a$. En pratique, en MP, on travaille avec des fonctions $C^2$, ce qui est plus confortable.
*   Le théorème est faux sans hypothèse de continuité des dérivées secondes : il existe un contre-exemple classique.
*   **Contre-exemple :** $f(x, y) = \frac{xy(x^2-y^2)}{x^2+y^2}$ si $(x, y) \neq (0, 0)$ et $0$ sinon. On a $\frac{\partial^2 f}{\partial x \partial y}(0, 0) = 1 \neq -1 = \frac{\partial^2 f}{\partial y \partial x}(0, 0)$.

**Pièges classiques :**
*   Appliquer Schwarz sans vérifier la régularité $C^2$.
*   En concours, Schwarz est souvent utilisé implicitement : attention à bien le mentionner.

---

## FLASHCARD 101 — Proposition 29 : Formule de Taylor-Young à l'ordre 2 (plusieurs variables)

### RECTO
**Formule de Taylor-Young à l'ordre 2 (fonctions de plusieurs variables)**

Soit $U$ un ouvert de $\mathbb{R}^n$, $f : U \to \mathbb{R}$ de classe $C^2$, $a \in U$.

**Question :** Énoncer le développement de Taylor-Young de $f$ à l'ordre 2 en $a$.

### VERSO
**Hypothèses :**
*   $U$ ouvert de $\mathbb{R}^n$
*   $f : U \to \mathbb{R}$ de classe $C^2$
*   $a \in U$, $h = (h_1, \dots, h_n) \in \mathbb{R}^n$

**Conclusion :**
$$ f(a+h) = f(a) + \sum_{i=1}^n \frac{\partial f}{\partial x_i}(a) h_i + \frac{1}{2} \sum_{i=1}^n \sum_{j=1}^n \frac{\partial^2 f}{\partial x_i \partial x_j}(a) h_i h_j + o(\|h\|^2) $$

Soit, en notation compacte :
$$ f(a+h) = f(a) + df(a) \cdot h + \frac{1}{2} d^2f(a) \cdot (h, h) + o(\|h\|^2) $$

où $d^2f(a)$ est la forme bilinéaire symétrique (par Schwarz) de matrice la hessienne :
$$ H_f(a) = \left( \frac{\partial^2 f}{\partial x_i \partial x_j}(a) \right)_{1 \le i, j \le n} $$

**Démonstration (esquisse) :**
Appliquer Taylor-Young en une variable à $\varphi(t) = f(a+th)$, qui est $C^2$ au voisinage de $0$ :
$\varphi(1) = \varphi(0) + \varphi'(0) + \frac{1}{2} \varphi''(0) + o(1)$
puis exprimer $\varphi'(0)$ et $\varphi''(0)$ en termes des dérivées partielles de $f$ (règle de la chaîne).

### 
**Subtilités :**
*   La hessienne est symétrique par le théorème de Schwarz.
*   Le terme quadratique $\frac{1}{2} d^2f(a) \cdot (h, h) = \frac{1}{2} {}^t h H_f(a) h$ est la forme quadratique associée à la hessienne.
*   La formule est un DL à l'ordre 2, avec un reste en $o(\|h\|^2)$, quelle que soit la norme choisie.

**Pièges classiques :**
*   Oublier le facteur $1/2$ devant le terme quadratique.
*   Confondre $d^2f(a) \cdot (h, h)$ (forme bilinéaire évaluée en $(h, h)$) avec $d^2f(a) \cdot h$ (qui n'a pas de sens : $d^2f(a)$ est bilinéaire, pas linéaire).
*   Écrire le développement sans préciser que $h \to 0$ dans $\mathbb{R}^n$.

---

## FLASHCARD 102 — Théorème 45 : Condition d'extremum local d'ordre 2

### RECTO
**Condition suffisante d'extremum local d'ordre 2 (fonctions de plusieurs variables)**

Soit $U$ ouvert de $\mathbb{R}^n$, $f : U \to \mathbb{R}$ de classe $C^2$, $a \in U$ un point critique ($df(a) = 0$).

**Question :** Énoncer les conditions suffisantes de minimum local, maximum local, et la condition de point selle, en termes de la hessienne $H_f(a)$.

### VERSO
**Hypothèses :**
*   $U$ ouvert de $\mathbb{R}^n$, $f : U \to \mathbb{R}$ de classe $C^2$
*   $a \in U$, $df(a) = 0$ (point critique)
*   $H_f(a) = (\frac{\partial^2 f}{\partial x_i \partial x_j}(a))$ la matrice hessienne

**Conclusions :**
*   Si $H_f(a)$ est **définie positive** ($\forall h \neq 0, {}^t h H_f(a) h > 0$) : $f$ admet un **minimum local strict** en $a$.
*   Si $H_f(a)$ est **définie négative** : $f$ admet un **maximum local strict** en $a$.
*   Si $H_f(a)$ est **non dégénérée et indéfinie** (a des valeurs propres de signes différents) : $a$ est un **point selle** (pas d'extremum local).
*   Si $H_f(a)$ est semi-définie (positive ou négative) mais pas définie : on ne peut pas conclure (le terme d'ordre 2 ne suffit pas).

**Démonstration (esquisse) :**
Par Taylor-Young : $f(a+h) - f(a) = \frac{1}{2} {}^t h H_f(a) h + o(\|h\|^2)$.
Si $H_f(a) \succ 0$ : par compacité de la sphère unité, $\min_{\|h\|=1} {}^t h H_f(a) h = \alpha > 0$, donc ${}^t h H_f(a) h \ge \alpha \|h\|^2$, et pour $\|h\|$ assez petit, $f(a+h) - f(a) \ge \frac{\alpha}{4} \|h\|^2 > 0$.

### 
**Subtilités :**
*   En dimension $n=2$, $H_f(a) = \begin{pmatrix} r & s \\ s & t \end{pmatrix}$ : définie positive $\iff r > 0$ et $rt - s^2 > 0$. Point selle $\iff rt - s^2 < 0$.
*   Le cas $rt - s^2 = 0$ est dégénéré : il faut aller à l'ordre supérieur.
*   Le critère utilise que la hessienne est symétrique (par Schwarz), donc elle est diagonalisable à valeurs propres réelles.

**Pièges classiques :**
*   Oublier de vérifier $df(a) = 0$ avant d'utiliser le critère d'ordre 2.
*   Confondre « semi-définie positive » (on ne conclut pas) et « définie positive » (minimum local).
*   En dimension $n=2$, ne vérifier que $rt - s^2 > 0$ sans vérifier le signe de $r$ (ou $t$).
*   Croire que $H_f(a) \succ 0$ implique un minimum global : c'est faux (seulement local).

---

# CHAPITRE 10 — Arithmétique

## FLASHCARD 103 — À connaître 27 : Arithmétique dans $\mathbb{Z}$ (division euclidienne, PGCD, Bézout)

### RECTO
**Arithmétique fondamentale dans $\mathbb{Z}$**

**Question :** Rappeler la division euclidienne dans $\mathbb{Z}$, la notion de PGCD, et le théorème de Bézout dans $\mathbb{Z}$.

### VERSO
**Division euclidienne dans $\mathbb{Z}$ :**
$\forall (a, b) \in \mathbb{Z} \times \mathbb{Z}^*, \exists! (q, r) \in \mathbb{Z}^2$ tel que :
$$ a = bq + r, \quad 0 \le r < |b| $$

**PGCD :**
Pour $a, b \in \mathbb{Z}$ non tous deux nuls, $\text{pgcd}(a, b)$ est le plus grand diviseur commun (positif) de $a$ et $b$. On le calcule par l'algorithme d'Euclide.
On a : $\text{pgcd}(a, b) = \text{pgcd}(b, a \pmod b)$.

**Théorème de Bézout :**
$$ \text{pgcd}(a, b) = d \iff \exists (u, v) \in \mathbb{Z}^2, au + bv = d $$
En particulier, $a$ et $b$ sont premiers entre eux ($\text{pgcd}(a, b) = 1$) si et seulement si $\exists (u, v) \in \mathbb{Z}^2, au + bv = 1$.

**Lemme de Gauss :**
Si $a \mid bc$ et $\text{pgcd}(a, b) = 1$, alors $a \mid c$.

### 
**Subtilités :**
*   Le PGCD est défini comme un entier $\ge 0$ par convention.
*   Bézout donne des coefficients $u, v$ qui ne sont pas uniques.
*   L'algorithme d'Euclide étendu fournit explicitement les coefficients de Bézout.

**Pièges classiques :**
*   Confondre « $a \mid b$ et $a \mid c$ » avec « $a \mid bc$ » (la seconde est plus faible).
*   Oublier la condition « non tous deux nuls » pour le PGCD.

---

## FLASHCARD 104 — Théorème 46 : Petit théorème de Fermat

### RECTO
**Petit théorème de Fermat**

Soit $p$ un nombre premier et $a \in \mathbb{Z}$.

**Question :** Énoncer le petit théorème de Fermat (deux versions).

### VERSO
**Hypothèses :**
*   $p$ premier
*   $a \in \mathbb{Z}$

**Version 1 :**
$$ a^p \equiv a \pmod p $$

**Version 2 (si $p \nmid a$) :**
$$ a^{p-1} \equiv 1 \pmod p $$

**Démonstration (esquisse) :**
$\mathbb{Z}/p\mathbb{Z}$ est un corps (car $p$ premier), donc $(\mathbb{Z}/p\mathbb{Z})^* = \mathbb{Z}/p\mathbb{Z} \setminus \{0\}$ est un groupe de cardinal $p-1$.
Par le théorème de Lagrange (pour les groupes finis) : l'ordre de tout élément divise $p-1$, donc $\bar{a}^{p-1} = \bar{1}$ pour $\bar{a} \neq \bar{0}$.
Alternative : Par récurrence sur $a$ en utilisant $(a+1)^p \equiv a^p + 1 \pmod p$ (les coefficients binomiaux $\binom{p}{k}$ sont divisibles par $p$ pour $1 \le k \le p-1$).

### 
**Subtilités :**
*   La version 1 est valable même si $p \mid a$ (les deux côtés sont congrus à 0).
*   La réciproque est fausse : il existe des nombres composés $n$ tels que $a^n \equiv a \pmod n$ pour tout $a$ (nombres de Carmichael).
*   Fermat permet de calculer des inverses dans $\mathbb{Z}/p\mathbb{Z}$ : $a^{-1} \equiv a^{p-2} \pmod p$.

**Pièges classiques :**
*   Appliquer Fermat avec un exposant $p$ alors que le module n'est pas premier.
*   Oublier l'hypothèse $p \nmid a$ dans la version 2.

---

## FLASHCARD 105 — Théorème 47 : Isomorphisme chinois (théorème des restes chinois)

### RECTO
**Théorème des restes chinois (isomorphisme chinois)**

Soient $n_1, \dots, n_k \in \mathbb{N}^*$ deux à deux premiers entre eux, et $N = n_1 \dots n_k$.

**Question :** Énoncer l'isomorphisme chinois dans $\mathbb{Z}/N\mathbb{Z}$.

### VERSO
**Hypothèses :**
*   $n_1, \dots, n_k \in \mathbb{N}_{\ge 2}$, deux à deux premiers entre eux ($\forall i \neq j, \text{pgcd}(n_i, n_j) = 1$)
*   $N = n_1 n_2 \dots n_k$

**Conclusion :**
L'application :
$$ \varphi : \mathbb{Z}/N\mathbb{Z} \to \mathbb{Z}/n_1\mathbb{Z} \times \dots \times \mathbb{Z}/n_k\mathbb{Z} $$
$$ \bar{x} \mapsto (\bar{x}_1, \dots, \bar{x}_k) \quad (\text{réductions modulo } n_i) $$
est un isomorphisme d'anneaux.

**Conséquences :**
*   Pour tout $(a_1, \dots, a_k) \in \mathbb{Z}^k$, le système $x \equiv a_i \pmod{n_i}$ pour $i=1, \dots, k$ admet une solution, unique modulo $N$.
*   Isomorphisme de groupes multiplicatifs : $(\mathbb{Z}/N\mathbb{Z})^* \cong (\mathbb{Z}/n_1\mathbb{Z})^* \times \dots \times (\mathbb{Z}/n_k\mathbb{Z})^*$.
*   En particulier : $\varphi(N) = \varphi(n_1) \dots \varphi(n_k)$ (multiplicativité de l'indicatrice d'Euler).

**Démonstration (esquisse) :**
*   $\varphi$ est un morphisme d'anneaux (évident).
*   $\ker \varphi = \{x \in \mathbb{Z}/N\mathbb{Z} : n_i \mid x \ \forall i\} = \{0\}$ car les $n_i$ sont premiers entre eux deux à deux, donc $N \mid x$.
*   $|\mathbb{Z}/N\mathbb{Z}| = N = n_1 \dots n_k = |\prod \mathbb{Z}/n_i\mathbb{Z}|$, donc $\varphi$ est bijectif.

### 
**Subtilités :**
*   L'hypothèse « deux à deux premiers entre eux » est strictement plus forte que « de PGCD global 1 ». Exemple : 6, 10, 15 ont $\text{pgcd}(6, 10, 15)=1$ mais ne sont pas deux à deux premiers entre eux.
*   Le CRT s'applique aussi dans des anneaux principaux (ex : $K[X]$) : si $P_1, \dots, P_k$ sont deux à deux premiers entre eux, $K[X]/(P_1 \dots P_k) \cong \prod K[X]/(P_i)$.

**Pièges classiques :**
*   Oublier la condition « deux à deux premiers entre eux ».
*   Confondre isomorphisme d'anneaux et isomorphisme de groupes.
*   Oublier que l'isomorphisme donne aussi la multiplicativité de $\varphi$ d'Euler.

---

## FLASHCARD 106 — Proposition 30 : Indicatrice d'Euler

### RECTO
**Indicatrice d'Euler**

**Question :** Définir l'indicatrice d'Euler $\varphi(n)$. Donner sa formule en fonction de la décomposition en facteurs premiers. Énoncer sa propriété de multiplicativité.

### VERSO
**Définition :**
Pour $n \ge 1$ :
$$ \varphi(n) = \#\{k \in \{1, \dots, n\} : \text{pgcd}(k, n) = 1\} = |(\mathbb{Z}/n\mathbb{Z})^*| $$

**Formule :**
Si $n = p_1^{\alpha_1} \dots p_r^{\alpha_r}$ est la décomposition en facteurs premiers :
$$ \varphi(n) = n \prod_{i=1}^r \left( 1 - \frac{1}{p_i} \right) = \prod_{i=1}^r p_i^{\alpha_i - 1} (p_i - 1) $$

**Multiplicité :**
Si $\text{pgcd}(m, n) = 1$, alors $\varphi(mn) = \varphi(m) \varphi(n)$.
(C'est une conséquence directe du CRT.)

**Formule de sommation :**
$$ \sum_{d \mid n} \varphi(d) = n $$

**Cas particuliers :**
$\varphi(1) = 1$, $\varphi(p) = p-1$, $\varphi(p^k) = p^{k-1}(p-1)$ pour $p$ premier.

### 
**Subtilités :**
*   La multiplicativité de $\varphi$ n'est valable que pour des entiers premiers entre eux. $\varphi$ n'est pas complètement multiplicative.
*   La formule $\sum_{d \mid n} \varphi(d) = n$ se démontre en partitionnant $\{1, \dots, n\}$ selon $\text{pgcd}(k, n)$.

**Pièges classiques :**
*   Écrire $\varphi(mn) = \varphi(m)\varphi(n)$ sans vérifier $\text{pgcd}(m, n) = 1$.
*   Confondre $\varphi(p^k) = p^{k-1}(p-1)$ avec $p^k-1$.

---

## FLASHCARD 107 — Théorème 48 : Théorème d'Euler

### RECTO
**Théorème d'Euler**

Soit $n \ge 2$ un entier et $a \in \mathbb{Z}$ tel que $\text{pgcd}(a, n) = 1$.

**Question :** Énoncer le théorème d'Euler.

### VERSO
**Hypothèses :**
*   $n \ge 2$ entier
*   $a \in \mathbb{Z}$, $\text{pgcd}(a, n) = 1$

**Conclusion :**
$$ a^{\varphi(n)} \equiv 1 \pmod n $$

**Démonstration :**
$(\mathbb{Z}/n\mathbb{Z})^*$ est un groupe multiplicatif de cardinal $\varphi(n)$. Par le théorème de Lagrange, l'ordre de $\bar{a}$ divise $\varphi(n)$, donc $\bar{a}^{\varphi(n)} = \bar{1}$.

### 
**Subtilités :**
*   Le petit théorème de Fermat est le cas particulier $n=p$ premier (et $\varphi(p) = p-1$).
*   L'exposant $\varphi(n)$ n'est en général pas le plus petit exposant universel. Le plus petit $\lambda$ tel que $a^\lambda \equiv 1 \pmod n$ pour tout $a$ premier à $n$ est la fonction de Carmichael $\lambda(n)$, qui divise $\varphi(n)$.

**Pièges classiques :**
*   Appliquer le théorème d'Euler sans vérifier $\text{pgcd}(a, n) = 1$.
*   Confondre l'ordre d'un élément avec $\varphi(n)$ : $\varphi(n)$ est un multiple de l'ordre, pas nécessairement l'ordre lui-même.

---

## FLASHCARD 108 — À connaître 28 : Existence et nombre de racines primitives

### RECTO
**Racines primitives modulo $n$**

**Question :** Pour quels entiers $n \ge 2$ le groupe $(\mathbb{Z}/n\mathbb{Z})^*$ est-il cyclique ? Qu'appelle-t-on alors une racine primitive ?

### VERSO
**Définition :**
Un élément $g \in (\mathbb{Z}/n\mathbb{Z})^*$ est une racine primitive modulo $n$ si $g$ engendre $(\mathbb{Z}/n\mathbb{Z})^*$, i.e. $\text{ord}(g) = \varphi(n)$.

**Théorème :**
$(\mathbb{Z}/n\mathbb{Z})^*$ est cyclique si et seulement si $n \in \{1, 2, 4, p^k, 2p^k\}$ où $p$ est un premier impair et $k \ge 1$.

**Nombre de racines primitives :**
Quand $(\mathbb{Z}/n\mathbb{Z})^*$ est cyclique, il y a exactement $\varphi(\varphi(n))$ racines primitives modulo $n$.

### 
**Subtilités :**
*   $(\mathbb{Z}/8\mathbb{Z})^* \cong \mathbb{Z}/2\mathbb{Z} \times \mathbb{Z}/2\mathbb{Z}$ n'est pas cyclique.
*   $(\mathbb{Z}/p\mathbb{Z})^*$ est toujours cyclique pour $p$ premier : c'est le cas le plus important en MP.
*   La preuve que $(\mathbb{Z}/p\mathbb{Z})^*$ est cyclique repose sur le fait que dans un corps, un polynôme de degré $d$ a au plus $d$ racines, et on compte les éléments d'ordre $d$ pour chaque $d \mid p-1$.

**Pièges classiques :**
*   Croire que $(\mathbb{Z}/n\mathbb{Z})^*$ est toujours cyclique.
*   Confondre « il existe un élément d'ordre $\varphi(n)$ » (racine primitive) avec « tout élément est d'ordre $\varphi(n)$ ».

---

## FLASHCARD 109 — À connaître 29 : Formule de Legendre

### RECTO
**Formule de Legendre (valuation $p$-adique de $n!$)**

Soit $p$ un nombre premier et $n \in \mathbb{N}^*$.

**Question :** Donner la formule de Legendre pour $v_p(n!)$ (la valuation $p$-adique de $n!$).

### VERSO
**Formule :**
$$ v_p(n!) = \sum_{k=1}^{+\infty} \left\lfloor \frac{n}{p^k} \right\rfloor $$
La somme est finie (les termes sont nuls dès que $p^k > n$).

**Formule alternative :**
$$ v_p(n!) = \frac{n - s_p(n)}{p-1} $$
où $s_p(n)$ est la somme des chiffres de $n$ en base $p$.

**Démonstration (esquisse) :**
$v_p(n!) = \sum_{j=1}^n v_p(j)$. Pour chaque $k \ge 1$, le nombre d'entiers $j \in \{1, \dots, n\}$ divisibles par $p^k$ est $\lfloor n/p^k \rfloor$. En échangeant les sommations, on obtient la formule.

### 
**Subtilités :**
*   La formule alternative avec $s_p(n)$ est parfois plus pratique pour des estimations asymptotiques.
*   Utile pour déterminer si $\binom{n}{k}$ est divisible par $p$ : $v_p(\binom{n}{k}) = \frac{s_p(k) + s_p(n-k) - s_p(n)}{p-1}$ (théorème de Kummer).

**Applications classiques :**
*   Montrer que $\binom{2n}{n}$ est pair pour $n \ge 1$.
*   Calculer la puissance exacte de $p$ divisant $\binom{n}{k}$.

**Pièges classiques :**
*   Oublier que la somme est finie.
*   Confondre $\lfloor n/p^k \rfloor$ avec $n/p^k$ (oublier la partie entière).

---

## FLASHCARD 110 — Proposition 31 : Groupes monogènes / cycliques

### RECTO
**Classification des groupes monogènes**

**Question :** Rappeler la classification des groupes monogènes (engendrés par un seul élément). Distinguer le cas fini et le cas infini.

### VERSO
**Définition :**
Un groupe $G$ est monogène s'il existe $g \in G$ tel que $G = \langle g \rangle = \{g^n : n \in \mathbb{Z}\}$ (notation multiplicative). Si $G$ est monogène et fini, on dit que $G$ est cyclique.

**Classification :**
*   Si $G$ est monogène infini : $G \cong (\mathbb{Z}, +)$.
*   Si $G$ est monogène fini de cardinal $n$ : $G \cong (\mathbb{Z}/n\mathbb{Z}, +)$.

**Propriétés des groupes cycliques $\mathbb{Z}/n\mathbb{Z}$ :**
*   Les sous-groupes de $\mathbb{Z}/n\mathbb{Z}$ sont les $\langle \bar{d} \rangle$ pour $d \mid n$, isomorphes à $\mathbb{Z}/(n/d)\mathbb{Z}$. Il y a exactement un sous-groupe d'ordre $d$ pour chaque diviseur $d$ de $n$.
*   Les générateurs de $\mathbb{Z}/n\mathbb{Z}$ sont les $\bar{k}$ avec $\text{pgcd}(k, n) = 1$, au nombre de $\varphi(n)$.

### 
**Subtilités :**
*   Un sous-groupe d'un groupe cyclique est cyclique.
*   Un quotient d'un groupe cyclique est cyclique.
*   Tout groupe d'ordre premier est cyclique (par Lagrange).

**Pièges classiques :**
*   Confondre « monogène » et « cyclique » (le second est le cas fini du premier, selon la convention la plus courante en France).
*   Oublier l'unicité du sous-groupe d'ordre $d$ pour $d \mid n$.

---

## FLASHCARD 111 — À connaître 30 : Structure des groupes abéliens finis (programme MP — version simplifiée)

### RECTO
**Structure des groupes abéliens finis — cas au programme**

**Question :** Énoncer le résultat de décomposition d'un groupe abélien fini en produit de groupes cycliques d'ordres premiers entre eux (conséquence du CRT). Rappeler la condition pour qu'un produit de cycliques soit cyclique.

### VERSO
**Résultat :**
Soit $G$ un groupe abélien fini d'ordre $n = p_1^{\alpha_1} \dots p_r^{\alpha_r}$. Alors :
$$ G \cong G_{p_1} \times \dots \times G_{p_r} $$
où $G_{p_i}$ est le $p_i$-Sylow de $G$ (sous-groupe des éléments d'ordre une puissance de $p_i$), et $|G_{p_i}| = p_i^{\alpha_i}$.

**Condition pour qu'un produit soit cyclique :**
$$ \mathbb{Z}/m\mathbb{Z} \times \mathbb{Z}/n\mathbb{Z} \cong \mathbb{Z}/mn\mathbb{Z} \iff \text{pgcd}(m, n) = 1. $$

### 
**Pièges classiques :**
*   Croire que tout groupe abélien fini est cyclique : $\mathbb{Z}/2\mathbb{Z} \times \mathbb{Z}/2\mathbb{Z}$ est abélien d'ordre 4 mais non cyclique.
*   Le théorème complet de classification (facteurs invariants / décomposition primaire) est hors programme MP mais peut être utile conceptuellement.

---

## FLASHCARD 112 — Proposition 32 : Ordre d'un élément dans un groupe fini

### RECTO
**Ordre d'un élément dans un groupe fini**

Soit $G$ un groupe fini et $g \in G$.

**Question :** Définir l'ordre de $g$. Énoncer les propriétés fondamentales de l'ordre.

### VERSO
**Définition :**
L'ordre de $g$, noté $\text{ord}(g)$ ou $|g|$, est le plus petit entier $n \ge 1$ tel que $g^n = e$ (neutre).

**Propriétés :**
*   $g^k = e \iff \text{ord}(g) \mid k$.
*   $\text{ord}(g)$ divise $|G|$ (théorème de Lagrange).
*   $\text{ord}(g^k) = \frac{\text{ord}(g)}{\text{pgcd}(k, \text{ord}(g))}$.
*   Si $g$ et $h$ commutent et $\text{pgcd}(\text{ord}(g), \text{ord}(h)) = 1$, alors $\text{ord}(gh) = \text{ord}(g) \cdot \text{ord}(h)$.

### 
**Subtilités :**
*   La propriété 4 nécessite la commutativité et la coprimalité. Sans coprimalité, on a seulement $\text{ord}(gh) \mid \text{ppcm}(\text{ord}(g), \text{ord}(h))$.
*   En lien avec la réduction : si $A \in M_n(\mathbb{K})$ et $A^m = I_n$, alors le polynôme minimal de $A$ divise $X^m - 1$.

**Pièges classiques :**
*   Oublier la condition de commutativité dans la propriété 4.
*   Confondre « $g^k = e$ » avec « $\text{ord}(g) = k$ » : le premier dit seulement que $\text{ord}(g) \mid k$.

---

## FLASHCARD 113 — À connaître 31 : Théorème de Lagrange

### RECTO
**Théorème de Lagrange (pour les groupes finis)**

Soit $G$ un groupe fini et $H$ un sous-groupe de $G$.

**Question :** Énoncer le théorème de Lagrange.

### VERSO
**Hypothèses :**
*   $G$ groupe fini
*   $H$ sous-groupe de $G$

**Conclusion :**
$$ |H| \text{ divise } |G| $$
Plus précisément, l'indice $[G : H] = |G|/|H|$ est le nombre de classes à gauche (ou à droite) de $H$ dans $G$.

**Démonstration (esquisse) :**
Les classes à gauche $gH$ forment une partition de $G$, et chaque classe a le même cardinal $|H|$ (par bijectivité de $x \mapsto gx$). Donc $|G| = [G : H] \cdot |H|$.

**Corollaires :**
*   L'ordre de tout élément de $G$ divise $|G|$.
*   $\forall g \in G, g^{|G|} = e$.
*   Tout groupe d'ordre premier est cyclique.

### 
**Subtilités :**
*   La réciproque est fausse : si $d \mid |G|$, il n'existe pas nécessairement de sous-groupe d'ordre $d$ (contre-exemple : $\mathfrak{A}_4$ d'ordre 12 n'a pas de sous-groupe d'ordre 6). (La réciproque est vraie si $d$ est premier : théorème de Cauchy, hors programme strict MP mais bon à savoir.)

**Pièges classiques :**
*   Croire que Lagrange donne l'existence de sous-groupes de tout ordre divisant $|G|$.
*   Confondre « $|H|$ divise $|G|$ » avec « $H$ est distingué dans $G$ » (pas de lien).

---

## FLASHCARD 114 — Proposition 33 : Morphismes de groupes — propriétés fondamentales

### RECTO
**Morphismes de groupes**

Soit $\phi : G \to H$ un morphisme de groupes.

**Question :** Rappeler les propriétés fondamentales (image du neutre, image des inverses, image et noyau).

### VERSO
**Propriétés :**
*   $\phi(e_G) = e_H$.
*   $\forall g \in G, \phi(g^{-1}) = \phi(g)^{-1}$.
*   $\ker \phi = \{g \in G : \phi(g) = e_H\}$ est un sous-groupe distingué de $G$.
*   $\text{Im}(\phi) = \phi(G)$ est un sous-groupe de $H$.
*   $\phi$ est injectif $\iff \ker \phi = \{e_G\}$.
*   Si $G$ est fini : $|G| = |\ker \phi| \cdot |\text{Im}(\phi)|$ (formule analogue au théorème du rang).

**Premier théorème d'isomorphisme :**
$$ G/\ker \phi \cong \text{Im}(\phi) $$

### 
**Subtilités :**
*   Le noyau est distingué (invariant par conjugaison). L'image n'est en général pas distinguée dans $H$.
*   Le premier théorème d'isomorphisme est l'analogue du théorème du rang en algèbre linéaire.

**Pièges classiques :**
*   Écrire « $\phi$ bijectif $\iff \ker \phi = \{e\}$ et $\text{Im}\phi = H$ » : c'est vrai, mais en pratique on oublie souvent la surjectivité.
*   Pour les groupes non abéliens, $\ker \phi$ est distingué mais tout sous-groupe distingué n'est pas nécessairement un noyau... (en fait si, par la projection canonique).

---

## FLASHCARD 115 — Lemme 3 : Lemme de Gauss (arithmétique)

### RECTO
**Lemme de Gauss**

Soient $a, b, c \in \mathbb{Z}$.

**Question :** Énoncer le lemme de Gauss.

### VERSO
**Hypothèses :**
*   $a, b, c \in \mathbb{Z}$
*   $a \mid bc$
*   $\text{pgcd}(a, b) = 1$

**Conclusion :**
$$ a \mid c $$

**Démonstration :**
Par Bézout, $\exists u, v \in \mathbb{Z}, au + bv = 1$. Multiplier par $c$ : $acu + bcv = c$. Comme $a \mid acu$ et $a \mid bcv$ (car $a \mid bc$), on obtient $a \mid c$.

### 
**Subtilités :**
*   Le lemme de Gauss se généralise aux anneaux principaux (polynômes, entiers de Gauss...).
*   L'hypothèse $\text{pgcd}(a, b) = 1$ est essentielle : $6 \mid 4 \times 3$ mais $6 \nmid 4$ et $6 \nmid 3$.

**Applications :**
*   Preuve de l'unicité de la décomposition en facteurs premiers.
*   Critère d'irréductibilité.

**Pièges classiques :**
*   Oublier de vérifier la coprimalité.

---

## FLASHCARD 116 — Proposition 34 : Identité de Bézout dans $\mathbb{Z}$

### RECTO
**Théorème de Bézout (dans $\mathbb{Z}$)**

Soient $a, b \in \mathbb{Z}$ non tous deux nuls.

**Question :** Énoncer le théorème de Bézout (caractérisation du PGCD via combinaisons linéaires).

### VERSO
**Hypothèses :**
*   $a, b \in \mathbb{Z}, (a, b) \neq (0, 0)$
*   $d = \text{pgcd}(a, b)$

**Conclusion :**
$$ \exists (u, v) \in \mathbb{Z}^2, \quad au + bv = d $$

**Corollaire (Bézout pour la coprimalité) :**
$$ \text{pgcd}(a, b) = 1 \iff \exists (u, v) \in \mathbb{Z}^2, au + bv = 1 $$

**Démonstration :**
L'idéal $a\mathbb{Z} + b\mathbb{Z} = \{au + bv : (u, v) \in \mathbb{Z}^2\}$ est un idéal de $\mathbb{Z}$, donc principal : $a\mathbb{Z} + b\mathbb{Z} = d\mathbb{Z}$, où $d$ est le plus petit élément strictement positif.

### 
**Subtilités :**
*   Les coefficients de Bézout $(u, v)$ ne sont pas uniques.
*   Le théorème est constructif via l'algorithme d'Euclide étendu.

**Pièges classiques :**
*   Confondre « $d \mid a$ et $d \mid b$ » (définition de diviseur commun) avec « $d = au + bv$ » (Bézout) : le PGCD vérifie les deux.

---

## FLASHCARD 117 — Proposition 35 : Bézout dans $K[X]$

### RECTO
**Théorème de Bézout dans $K[X]$**

Soient $A, B \in K[X]$, non tous deux nuls.

**Question :** Énoncer le théorème de Bézout dans $K[X]$.

### VERSO
**Hypothèses :**
*   $K$ corps
*   $A, B \in K[X], (A, B) \neq (0, 0)$
*   $D = \text{pgcd}(A, B)$ (unitaire, par convention)

**Conclusion :**
$$ \exists (U, V) \in K[X]^2, \quad AU + BV = D $$

**Corollaire :**
$A$ et $B$ sont premiers entre eux si et seulement si $\exists (U, V) \in K[X]^2, AU + BV = 1$.

On peut de plus imposer $\deg U < \deg B$ et $\deg V < \deg A$ (unicité dans ce cas).

**Démonstration :**
$K[X]$ est un anneau principal (euclidien), donc l'idéal $(A) + (B)$ est principal, engendré par $D$.

### 
**Subtilités :**
*   $K[X]$ est euclidien (pour le degré), donc principal, donc Bézout y est valable.
*   Attention : $\mathbb{Z}[X]$ n'est pas principal, et Bézout sous cette forme n'y est pas valable.

**Pièges classiques :**
*   Oublier que le PGCD est défini à une constante multiplicative près, et que par convention on le prend unitaire.
*   Confondre les corps : sur $\mathbb{Q}[X]$, $\mathbb{R}[X]$, $\mathbb{C}[X]$, les PGCD peuvent différer si l'on change de corps.

---

## FLASHCARD 118 — Théorème 49 : Division euclidienne dans $K[X]$

### RECTO
**Division euclidienne dans $K[X]$**

Soient $A, B \in K[X]$ avec $B \neq 0$.

**Question :** Énoncer le théorème de division euclidienne.

### VERSO
**Hypothèses :**
*   $K$ corps
*   $A \in K[X], B \in K[X] \setminus \{0\}$

**Conclusion :**
$$ \exists! (Q, R) \in K[X]^2, \quad A = BQ + R, \quad \deg R < \deg B $$
(avec la convention $\deg 0 = -\infty$)

**Démonstration (esquisse) :**
Par récurrence (forte) sur $\deg A$ :
*   Si $\deg A < \deg B$ : $Q=0, R=A$.
*   Sinon : poser $A_1 = A - \frac{a_n}{b_m} X^{n-m} B$ (le terme dominant de $A_1$ est de degré $< n$), puis appliquer l'hypothèse de récurrence à $A_1$.

### 
**Subtilités :**
*   L'existence et l'unicité requièrent que $K$ soit un corps (ou au moins que le coefficient dominant de $B$ soit inversible). Sur $\mathbb{Z}[X]$, la division euclidienne n'est pas toujours possible.
*   La division euclidienne fait de $K[X]$ un anneau euclidien pour le stathme $\deg$.

**Pièges classiques :**
*   Oublier la condition $\deg R < \deg B$ (et non $\le$).
*   Sur $\mathbb{Z}[X]$ : tenter de diviser alors que le coefficient dominant de $B$ n'est pas inversible.

---

## FLASHCARD 119 — À connaître 32 : Racines et factorisation

### RECTO
**Racines et factorisation dans $K[X]$**

Soit $P \in K[X]$ de degré $n \ge 1$.

**Question :** Rappeler le lien entre racines et divisibilité. Combien de racines $P$ peut-il avoir au maximum ?

### VERSO
**Propriété fondamentale :**
$\alpha \in K$ est racine de $P$ si et seulement si $(X - \alpha) \mid P$ dans $K[X]$.

**Nombre de racines :**
$P$ a au plus $\deg P$ racines dans $K$ (comptées avec multiplicité).

**Multiplicité :**
$\alpha$ est racine de multiplicité $m$ si $(X - \alpha)^m \mid P$ et $(X - \alpha)^{m+1} \nmid P$.

Si $P$ est scindé sur $K$ :
$$ P = a \prod_{i=1}^r (X - \alpha_i)^{m_i}, \quad \sum m_i = \deg P $$

**Formules de Viète :**
Les fonctions symétriques élémentaires des racines s'expriment en termes des coefficients de $P$.

### 
**Subtilités :**
*   Le résultat « au plus $\deg P$ racines » est valable sur un corps. Sur un anneau non intègre (ex : $\mathbb{Z}/6\mathbb{Z}$), c'est faux : $X^2 - 1$ a 4 racines dans $\mathbb{Z}/8\mathbb{Z}$.
*   En corollaire : si $P, Q \in K[X]$, $\deg P, \deg Q \le n$, et $P$ et $Q$ coïncident en $n+1$ points, alors $P=Q$.

**Pièges classiques :**
*   Appliquer le résultat sur un anneau non intègre.
*   Oublier le « comptées avec multiplicité ».

---

## FLASHCARD 120 — À connaître 33 : Irréductibles de $\mathbb{R}[X]$ et $\mathbb{C}[X]$

### RECTO
**Polynômes irréductibles de $\mathbb{R}[X]$ et $\mathbb{C}[X]$**

**Question :** Décrire les polynômes irréductibles sur $\mathbb{C}$ puis sur $\mathbb{R}$.

### VERSO
**Sur $\mathbb{C}[X]$ :**
Les irréductibles sont exactement les polynômes de degré 1 : $aX + b$ avec $a \neq 0$.
(Conséquence du théorème de d'Alembert-Gauss.)

**Sur $\mathbb{R}[X]$ :**
Les irréductibles sont :
*   Les polynômes de degré 1 : $aX + b, a \neq 0$.
*   Les polynômes de degré 2 à discriminant strictement négatif : $aX^2 + bX + c$ avec $a \neq 0$ et $b^2 - 4ac < 0$.

**Factorisation dans $\mathbb{R}[X]$ :**
Tout $P \in \mathbb{R}[X]$ de degré $\ge 1$ s'écrit de manière unique (à l'ordre et aux constantes près) comme produit de polynômes de degré 1 et de polynômes de degré 2 à discriminant négatif.

### 
**Subtilités :**
*   Les racines complexes non réelles de $P \in \mathbb{R}[X]$ viennent par paires conjuguées : si $\alpha$ est racine, $\bar{\alpha}$ aussi, avec la même multiplicité. Le produit $(X-\alpha)(X-\bar{\alpha}) = X^2 - 2\text{Re}(\alpha)X + |\alpha|^2$ est le facteur irréductible de degré 2.

**Pièges classiques :**
*   Oublier qu'il n'y a pas d'irréductible de degré $\ge 3$ sur $\mathbb{R}$ : tout polynôme de degré impair $\ge 3$ a une racine réelle.
*   Confondre « irréductible sur $\mathbb{R}$ » et « irréductible sur $\mathbb{Q}$ ».

---

## FLASHCARD 121 — Théorème 50 : Théorème de d'Alembert-Gauss

### RECTO
**Théorème de d'Alembert-Gauss (théorème fondamental de l'algèbre)**

**Question :** Énoncer le théorème de d'Alembert-Gauss.

### VERSO
**Énoncé :**
Tout polynôme $P \in \mathbb{C}[X]$ de degré $n \ge 1$ possède exactement $n$ racines dans $\mathbb{C}$ (comptées avec multiplicité).

De manière équivalente : $\mathbb{C}$ est algébriquement clos, i.e. tout polynôme non constant à coefficients complexes admet au moins une racine dans $\mathbb{C}$.

De manière encore équivalente : tout $P \in \mathbb{C}[X]$ de degré $n \ge 1$ se factorise :
$$ P = a_n \prod_{i=1}^n (X - z_i), \quad z_i \in \mathbb{C} $$

**Démonstration :** Admise en MP. (Les preuves connues utilisent l'analyse : topologie de $\mathbb{C}$, théorie de Liouville, ou l'argument du minimum du module.)

### 
**Subtilités :**
*   $\mathbb{R}$ n'est pas algébriquement clos ($X^2 + 1$ n'a pas de racine réelle).
*   $\mathbb{Q}$ n'est pas algébriquement clos ($X^2 - 2$ n'a pas de racine rationnelle).
*   Le théorème ne donne pas de méthode pour calculer les racines (pas de formule générale en degré $\ge 5$, par Abel-Ruffini).

**Applications en algèbre linéaire :**
*   Tout endomorphisme d'un $\mathbb{C}$-espace vectoriel de dimension finie admet au moins une valeur propre.
*   Tout endomorphisme sur $\mathbb{C}$ est trigonalisable (car son polynôme caractéristique est scindé).

**Pièges classiques :**
*   Oublier « comptées avec multiplicité ».
*   Croire que le théorème donne un algorithme de calcul.

---

## FLASHCARD 122 — Proposition 36 : Caractérisation de la multiplicité d'une racine

### RECTO
**Caractérisation de la multiplicité d'une racine par les dérivées**

Soit $P \in K[X]$ et $\alpha \in K$.

**Question :** Caractériser la multiplicité de $\alpha$ comme racine de $P$ en termes des dérivées successives de $P$.

### VERSO
**Hypothèses :**
*   $K$ corps de caractéristique zéro (en pratique $\mathbb{Q}, \mathbb{R}$ ou $\mathbb{C}$)
*   $P \in K[X], \alpha \in K, m \ge 1$

**Conclusion :**
$\alpha$ est racine de multiplicité au moins $m$ de $P$ si et seulement si :
$$ P(\alpha) = P'(\alpha) = P''(\alpha) = \dots = P^{(m-1)}(\alpha) = 0 $$

$\alpha$ est racine de multiplicité exactement $m$ si de plus $P^{(m)}(\alpha) \neq 0$.

**Démonstration (esquisse) :**
Écrire $P(X) = (X - \alpha)^k Q(X)$ avec $Q(\alpha) \neq 0$. Par la formule de Leibniz :
$$ P^{(j)}(\alpha) = j! \binom{k}{j} Q(\alpha) \cdot [\text{si } j < k, \text{ alors } 0; \text{ si } j=k, \text{ alors } k! Q(\alpha)] $$
Plus rigoureusement, par la formule de Taylor pour les polynômes : $P(X) = \sum_{j=0}^n \frac{P^{(j)}(\alpha)}{j!} (X - \alpha)^j$.

### 
**Subtilités :**
*   L'hypothèse de caractéristique zéro est cruciale. En caractéristique $p$, $P(X) = X^p$ a $0$ comme racine de multiplicité $p$ mais $P'(X) = 0$ identiquement.
*   La formule de Taylor pour les polynômes est purement algébrique (pas de convergence à vérifier) et valide en toute caractéristique, mais la division par $j!$ requiert la caractéristique zéro.

**Pièges classiques :**
*   Oublier de vérifier la caractéristique du corps (peu probable en MP, mais important conceptuellement).
*   Confondre « $P^{(m)}(\alpha) = 0$ » avec « $\alpha$ est racine de $P^{(m)}$ de multiplicité $\ge 1$ ».

---

## FLASHCARD 123 — À connaître 34 : Critère de divisibilité (Eisenstein, ou autres)

### RECTO
**Critère d'irréductibilité d'Eisenstein**

Soit $P = a_n X^n + \dots + a_1 X + a_0 \in \mathbb{Z}[X]$.

**Question :** Énoncer le critère d'Eisenstein. Quand permet-il de conclure à l'irréductibilité sur $\mathbb{Q}$ ?

### VERSO
**Hypothèses :**
*   $P = a_n X^n + a_{n-1} X^{n-1} + \dots + a_0 \in \mathbb{Z}[X], n \ge 1$
*   Il existe un nombre premier $p$ tel que :
    *   $p \nmid a_n$ (le coefficient dominant n'est pas divisible par $p$)
    *   $p \mid a_i$ pour tout $i \in \{0, 1, \dots, n-1\}$
    *   $p^2 \nmid a_0$

**Conclusion :**
$P$ est irréductible dans $\mathbb{Q}[X]$ (et donc dans $\mathbb{Z}[X]$ par le lemme de Gauss sur le contenu).

**Démonstration (esquisse) :**
Supposer $P = QR$ dans $\mathbb{Z}[X]$ avec $\deg Q, \deg R \ge 1$. Réduire modulo $p$ : $\bar{P} = \bar{a}_n X^n$ dans $\mathbb{F}_p[X]$, donc $\bar{Q} = \bar{b}_s X^s$ et $\bar{R} = \bar{c}_r X^r$ (car $\mathbb{F}_p[X]$ est intègre). Cela force $p \mid q_0$ et $p \mid r_0$, donc $p^2 \mid a_0 = q_0 r_0$, contradiction avec l'hypothèse 3.

### 
**Subtilités :**
*   Eisenstein ne s'applique pas directement à tout polynôme. Parfois un changement de variable $X \leftarrow X+a$ rend le critère applicable (exemple classique : les polynômes cyclotomiques $\Phi_p(X) = \frac{X^p-1}{X-1}$, irréductibles via le changement $X \leftarrow X+1$).
*   Le lemme de Gauss (contenu) assure qu'un polynôme primitif de $\mathbb{Z}[X]$ irréductible dans $\mathbb{Z}[X]$ l'est dans $\mathbb{Q}[X]$.

**Applications classiques :**
*   $X^n - p$ est irréductible sur $\mathbb{Q}$ (Eisenstein avec $p$).
*   Polynômes cyclotomiques $\Phi_p$.

**Pièges classiques :**
*   Vérifier les trois conditions. Oublier $p^2 \nmid a_0$ est l'erreur la plus fréquente.
*   Eisenstein donne l'irréductibilité sur $\mathbb{Q}$, pas nécessairement sur $\mathbb{R}$ ou $\mathbb{C}$.

---

## FLASHCARD 124 — À connaître 35 : Relations coefficients-racines (Viète)

### RECTO
**Formules de Viète (relations coefficients-racines)**

Soit $P = a_n X^n + a_{n-1} X^{n-1} + \dots + a_0 \in K[X]$ scindé sur $K$, de racines $\alpha_1, \dots, \alpha_n$ (comptées avec multiplicité).

**Question :** Exprimer les fonctions symétriques élémentaires des racines en fonction des coefficients.

### VERSO
**Hypothèses :**
*   $P = a_n (X - \alpha_1)(X - \alpha_2) \dots (X - \alpha_n)$

**Formules de Viète :**
$$ \sigma_k := \sum_{1 \le i_1 < \dots < i_k \le n} \alpha_{i_1} \dots \alpha_{i_k} = (-1)^k \frac{a_{n-k}}{a_n} $$

En particulier :
*   $\alpha_1 + \dots + \alpha_n = -\frac{a_{n-1}}{a_n}$
*   $\sum_{i < j} \alpha_i \alpha_j = \frac{a_{n-2}}{a_n}$
*   $\alpha_1 \dots \alpha_n = (-1)^n \frac{a_0}{a_n}$

### 
**Subtilités :**
*   Les formules de Viète ne nécessitent pas de connaître les racines individuellement.
*   Les formules de Newton relient les sommes de puissances $p_k = \sum \alpha_i^k$ aux $\sigma_k$.
*   Viète est valable sur tout corps (pas besoin de caractéristique zéro).

**Pièges classiques :**
*   Oublier le facteur $(-1)^k$ ou la normalisation par $a_n$.
*   Appliquer Viète à un polynôme non scindé (les racines n'existent pas toutes dans $K$).

---

## FLASHCARD 125 — Proposition 37 : Polynôme dérivé et racines multiples

### RECTO
**Polynôme dérivé et racines multiples — polynôme sans racine multiple**

Soit $P \in K[X]$, $K$ de caractéristique zéro.

**Question :** Caractériser le fait que $P$ n'a que des racines simples (dans une clôture algébrique) en termes de $\text{pgcd}(P, P')$.

### VERSO
**Hypothèses :**
*   $K$ corps de caractéristique zéro
*   $P \in K[X], \deg P \ge 1$

**Conclusion :**
$P$ n'a que des racines simples (dans $\bar{K}$) si et seulement si :
$$ \text{pgcd}(P, P') = 1 $$

Plus généralement : les racines multiples de $P$ sont exactement les racines communes à $P$ et $P'$.

Si $P = \prod (X - \alpha_i)^{m_i}$, alors $\text{pgcd}(P, P') = \prod (X - \alpha_i)^{m_i - 1}$ (à une constante près).

Le polynôme séparable associé $P/\text{pgcd}(P, P')$ a les mêmes racines que $P$, toutes simples.

### 
**Subtilités :**
*   En caractéristique $p$, $P' = 0$ n'implique pas $P$ constant (ex : $P = X^p$). La caractérisation par le PGCD reste valable mais le calcul de $P'$ change.
*   Le calcul de $\text{pgcd}(P, P')$ se fait par l'algorithme d'Euclide, sans avoir besoin de factoriser $P$.

**Pièges classiques :**
*   Écrire $P' = 0 \implies P$ constant (faux en caractéristique $p > 0$, vrai en caractéristique zéro).
*   Oublier que le PGCD est défini à une constante multiplicative près.

---

## FLASHCARD 126 — Proposition 38 : Interpolation de Lagrange

### RECTO
**Interpolation de Lagrange**

Soient $x_0, \dots, x_n \in K$ deux à deux distincts, et $y_0, \dots, y_n \in K$.

**Question :** Énoncer le théorème d'interpolation de Lagrange (existence, unicité, formule explicite).

### VERSO
**Hypothèses :**
*   $K$ corps
*   $x_0, \dots, x_n \in K$ deux à deux distincts
*   $y_0, \dots, y_n \in K$

**Conclusion :**
Il existe un unique polynôme $P \in K_n[X]$ (de degré $\le n$) tel que :
$$ \forall i \in \{0, \dots, n\}, \quad P(x_i) = y_i $$

**Formule explicite :**
$$ P(X) = \sum_{i=0}^n y_i \prod_{j \neq i} \frac{X - x_j}{x_i - x_j} $$

Les polynômes de base de Lagrange sont :
$$ L_i(X) = \prod_{j \neq i} \frac{X - x_j}{x_i - x_j}, \quad L_i(x_j) = \delta_{ij} $$

**Démonstration :**
*   **Unicité :** si $P$ et $Q$ conviennent, $P-Q$ est de degré $\le n$ et s'annule en $n+1$ points, donc $P-Q=0$.
*   **Existence :** la formule de Lagrange donne explicitement un $P$ de degré $\le n$ vérifiant les conditions.

**Interprétation linéaire :**
L'application « évaluation » $ev : K_n[X] \to K^{n+1}, P \mapsto (P(x_0), \dots, P(x_n))$ est un isomorphisme (les deux espaces sont de dimension $n+1$, et $ev$ est injective par l'argument d'unicité).

### 
**Subtilités :**
*   Les $L_i$ forment une base de $K_n[X]$, appelée base de Lagrange associée aux nœuds $x_0, \dots, x_n$.
*   La formule est valable sur tout corps, et même sur tout anneau intègre (avec $n+1$ éléments distincts).
*   La matrice de Vandermonde $V = (x_i^j)_{0 \le i, j \le n}$ est inversible $\iff$ les $x_j$ sont distincts, et l'interpolation revient à inverser ce système.

**Pièges classiques :**
*   Confondre degré $\le n$ et degré $= n$ : le polynôme interpolateur peut être de degré strictement inférieur à $n$.
*   Oublier la condition « deux à deux distincts ».

---

## FLASHCARD 127 — À connaître 36 : Polynômes de Tchebychev

### RECTO
**Polynômes de Tchebychev**

**Question :** Définir les polynômes de Tchebychev de première espèce $T_n$. Donner leurs propriétés fondamentales (relation de récurrence, racines, propriété de minimax).

### VERSO
**Définition :**
Le polynôme de Tchebychev de première espèce $T_n$ est l'unique polynôme de degré $n$ tel que :
$$ \forall \theta \in \mathbb{R}, \quad T_n(\cos \theta) = \cos(n\theta) $$

**Relation de récurrence :**
$$ T_0(X) = 1, \quad T_1(X) = X, \quad T_{n+1}(X) = 2X T_n(X) - T_{n-1}(X) $$

**Propriétés :**
*   $T_n$ est de degré $n$, de coefficient dominant $2^{n-1}$ (pour $n \ge 1$).
*   **Racines :** $T_n$ a $n$ racines réelles simples dans $[-1, 1]$ :
    $$ x_k = \cos \left( \frac{(2k-1)\pi}{2n} \right), \quad k=1, \dots, n $$
*   $|T_n(x)| \le 1$ pour tout $x \in [-1, 1]$.
*   **Propriété de minimax :** Parmi tous les polynômes unitaires de degré $n$, $\frac{T_n}{2^{n-1}}$ est celui dont la norme $\|\cdot\|_\infty$ sur $[-1, 1]$ est minimale, et ce minimum vaut $\frac{1}{2^{n-1}}$.

**Orthogonalité :**
Les $T_n$ sont orthogonaux pour le produit scalaire :
$$ \langle f, g \rangle = \int_{-1}^1 \frac{f(x)g(x)}{\sqrt{1-x^2}} dx $$

### 
**Subtilités :**
*   La propriété de minimax est fondamentale en approximation numérique (choix optimal des nœuds d'interpolation pour minimiser l'erreur : nœuds de Tchebychev).
*   Les polynômes de Tchebychev de seconde espèce $U_n$ vérifient $U_n(\cos \theta) = \frac{\sin((n+1)\theta)}{\sin \theta}$.

**Pièges classiques :**
*   Confondre $T_n$ et $U_n$.
*   Oublier le coefficient dominant $2^{n-1}$ : $T_n$ n'est pas unitaire pour $n \ge 2$.

---

# CHAPITRE 11 — Algèbre linéaire

## FLASHCARD 128 — À connaître 37 : Lemme de Gauss (algèbre linéaire — pivot de Gauss)

### RECTO
**Algorithme du pivot de Gauss**

**Question :** Énoncer le principe de l'élimination de Gauss. Quels problèmes résout-il ?

### VERSO
**Principe :**
Toute matrice $A \in M_{n, p}(K)$ peut être réduite par opérations élémentaires sur les lignes (et/ou les colonnes) à une forme échelonnée en lignes (ou échelonnée réduite, sous forme de Gauss-Jordan).

**Opérations élémentaires sur les lignes :**
*   $L_i \leftrightarrow L_j$ (échange de deux lignes)
*   $L_i \leftarrow \lambda L_i$, $\lambda \neq 0$ (multiplication d'une ligne par un scalaire non nul)
*   $L_i \leftarrow L_i + \mu L_j$, $i \neq j$ (transvection : ajouter un multiple d'une ligne à une autre)

**Applications :**
*   Calcul du rang d'une matrice
*   Résolution de systèmes linéaires $AX = B$
*   Calcul de l'inverse d'une matrice (méthode $[A \mid I_n] \to [I_n \mid A^{-1}]$)
*   Calcul du déterminant

**Complexité :** $O(n^3)$ opérations pour une matrice $n \times n$.

### 
**Subtilités :**
*   Les opérations sur les lignes correspondent à la multiplication à gauche par des matrices inversibles (transvections, dilatations, permutations).
*   Les opérations sur les colonnes correspondent à la multiplication à droite.
*   La forme échelonnée réduite (Gauss-Jordan) est unique ; la forme échelonnée non réduite ne l'est pas.

**Pièges classiques :**
*   Mélanger opérations sur les lignes et sur les colonnes dans un même calcul (sauf si on cherche des matrices $P, Q$ telles que $PAQ$ soit sous forme canonique).
*   Oublier qu'une multiplication par $\lambda = 0$ n'est pas une opération élémentaire valide.

---

## FLASHCARD 129 — À connaître 38 : Caractérisation des homothéties

### RECTO
**Caractérisation des homothéties**

Soit $E$ un $K$-espace vectoriel et $u \in \mathcal{L}(E)$.

**Question :** Caractériser les endomorphismes qui commutent avec tous les endomorphismes de $E$ (ou qui stabilisent tout sous-espace vectoriel).

### VERSO
**Théorème :**
Soit $E$ un $K$-espace vectoriel de dimension $n \ge 1$.

Les assertions suivantes sont équivalentes :
1.  $u$ est une homothétie : $\exists \lambda \in K, u = \lambda Id_E$.
2.  $u$ commute avec tout endomorphisme de $E$ : $\forall v \in \mathcal{L}(E), u \circ v = v \circ u$.
3.  Tout sous-espace vectoriel de $E$ est stable par $u$.

**En termes matriciels :**
$M \in M_n(K)$ commute avec toute matrice si et seulement si $M = \lambda I_n$.

**Démonstration (esquisse de 2 $\Rightarrow$ 1) :**
Pour $v$ un projecteur sur une droite $Ke_i$, $u \circ v = v \circ u$ implique que $u(e_i) \in Ke_i$, donc les vecteurs de la base sont des vecteurs propres de $u$. En prenant $v$ une transvection, on montre que les valeurs propres sont toutes égales.

### 
**Subtilités :**
*   En dimension infinie, 2 $\Rightarrow$ 1 reste vrai, mais 3 $\Rightarrow$ 1 peut être plus délicat à établir.
*   La condition « commute avec tout endomorphisme » peut être remplacée par « commute avec tout élément d'un sous-ensemble engendrant $\mathcal{L}(E)$ comme algèbre ».

**Pièges classiques :**
*   Confondre « commute avec une matrice particulière » et « commute avec toute matrice ». Le commutant d'une matrice quelconque peut être bien plus grand que les homothéties.

---

## FLASHCARD 130 — Théorème 51 : Théorème de la base incomplète

### RECTO
**Théorème de la base incomplète**

Soit $E$ un $K$-espace vectoriel de dimension finie $n$.

**Question :** Énoncer le théorème de la base incomplète (deux versions : compléter une famille libre, extraire d'une famille génératrice).

### VERSO
**Version 1 (compléter une famille libre) :**
*   Soit $(e_1, \dots, e_p)$ une famille libre de $E$ avec $p \le n$.
*   Alors on peut trouver $e_{p+1}, \dots, e_n \in E$ tels que $(e_1, \dots, e_n)$ soit une base de $E$.
*   De plus, si $(f_1, \dots, f_m)$ est une famille génératrice de $E$, on peut choisir les $e_{p+1}, \dots, e_n$ parmi les $f_j$.

**Version 2 (extraire d'une famille génératrice) :**
*   Soit $(f_1, \dots, f_m)$ une famille génératrice de $E$ avec $m \ge n$.
*   Alors on peut en extraire une base de $E$ (sous-famille de $n$ éléments).

**Démonstration (esquisse) :**
Algorithme glouton : on ajoute des vecteurs un par un en vérifiant qu'ils restent en dehors du sous-espace engendré par les précédents.

### 
**Subtilités :**
*   Le théorème est faux en dimension infinie en général (il faut l'axiome du choix / le lemme de Zorn pour l'existence de bases, via le théorème de la base de Zorn).
*   La version « on peut choisir les complémentaires parmi une famille génératrice donnée » est plus forte et très utile.

**Pièges classiques :**
*   Croire que le complément est unique : il ne l'est pas.
*   En dimension infinie, ne pas invoquer aveuglément le théorème de la base incomplète.

---

## FLASHCARD 131 — Proposition 39 : Formule de Grassmann

### RECTO
**Formule de Grassmann (dimension de la somme de deux sous-espaces)**

Soient $F$ et $G$ deux sous-espaces vectoriels d'un espace $E$ de dimension finie.

**Question :** Énoncer la formule de Grassmann.

### VERSO
**Hypothèses :**
*   $E$ espace vectoriel de dimension finie sur $K$
*   $F, G$ sous-espaces de $E$

**Formule :**
$$ \dim(F+G) = \dim F + \dim G - \dim(F \cap G) $$

**Démonstration (esquisse) :**
Choisir une base de $F \cap G$, la compléter en une base de $F$ et une base de $G$ (théorème de la base incomplète). Les réunions forment une famille génératrice de $F+G$, et on vérifie qu'elle est libre.

**Corollaire (somme directe) :**
$F+G$ est directe ($F \oplus G$) si et seulement si $F \cap G = \{0\}$, et dans ce cas $\dim(F \oplus G) = \dim F + \dim G$.

$F$ et $G$ sont supplémentaires dans $E$ si $E = F \oplus G$, i.e. $F \cap G = \{0\}$ et $\dim F + \dim G = \dim E$.

### 
**Subtilités :**
*   La formule est l'analogue vectoriel de la formule $|A \cup B| = |A| + |B| - |A \cap B|$ pour les ensembles finis.
*   Elle se généralise à $k$ sous-espaces via la formule du crible, mais c'est rarement utilisé (les intersections deviennent compliquées).

**Pièges classiques :**
*   Appliquer la formule en oubliant l'intersection : écrire $\dim(F+G) = \dim F + \dim G$ sans vérifier que $F \cap G = \{0\}$.
*   Confondre $F+G$ (somme de sous-espaces) et $F \cup G$ (qui n'est en général pas un sous-espace).

---

## FLASHCARD 132 — Proposition 40 : Existence de supplémentaires

### RECTO
**Existence de supplémentaires**

Soit $E$ un $K$-espace vectoriel de dimension finie et $F$ un sous-espace de $E$.

**Question :** Énoncer le théorème d'existence d'un supplémentaire.

### VERSO
**Hypothèses :**
*   $E$ espace vectoriel de dimension finie $n$ sur $K$
*   $F$ sous-espace de $E$

**Conclusion :**
Il existe un sous-espace $G$ de $E$ tel que $E = F \oplus G$.

On a alors $\dim G = \dim E - \dim F$.

**Démonstration :**
Choisir une base $(e_1, \dots, e_p)$ de $F$, la compléter en une base $(e_1, \dots, e_n)$ de $E$. Poser $G = \text{Vect}(e_{p+1}, \dots, e_n)$.

### 
**Subtilités :**
*   Le supplémentaire n'est pas unique (sauf si $F=\{0\}$ ou $F=E$).
*   En dimension infinie, un sous-espace fermé d'un espace de Hilbert admet un supplémentaire orthogonal (unique). Mais un sous-espace quelconque d'un evn de dimension infinie n'admet pas toujours de supplémentaire topologique.

**Pièges classiques :**
*   Croire que le supplémentaire est canonique ou unique.
*   Confondre supplémentaire algébrique et supplémentaire topologique en dimension infinie.

---

## FLASHCARD 133 — Théorème 52 : Théorème du rang

### RECTO
**Théorème du rang**

Soit $f : E \to F$ une application linéaire entre espaces vectoriels de dimension finie.

**Question :** Énoncer le théorème du rang.

### VERSO
**Hypothèses :**
*   $E, F$ espaces vectoriels sur $K$, $\dim E = n$ finie
*   $f \in \mathcal{L}(E, F)$

**Conclusion :**
$$ \dim E = \dim \ker f + \dim \text{Im} f = \dim \ker f + \text{rg } f $$

Autrement dit : $n = \dim \ker f + \text{rg } f$.

**Démonstration (esquisse) :**
Choisir une base $(e_1, \dots, e_p)$ de $\ker f$, la compléter en une base $(e_1, \dots, e_n)$ de $E$. Montrer que $(f(e_{p+1}), \dots, f(e_n))$ est une base de $\text{Im} f$. Donc $\text{rg } f = n - p$.

### 
**Subtilités :**
*   Le théorème nécessite que $\dim E$ soit finie. $\dim F$ peut être quelconque.
*   En termes matriciels : pour $A \in M_{m, n}(K)$, $\text{rg } A + \dim \ker A = n$ (nombre de colonnes).

**Corollaires :**
*   $f$ injective $\iff \ker f = \{0\} \iff \text{rg } f = \dim E$.
*   Si $\dim E = \dim F$ (dimension finie), alors : $f$ injective $\iff f$ surjective $\iff f$ bijective.
*   Existence de bases dans lesquelles la matrice de $f$ est $\begin{pmatrix} I_r & 0 \\ 0 & 0 \end{pmatrix}$ avec $r = \text{rg } f$.

**Pièges classiques :**
*   Appliquer le théorème du rang en prenant la dimension de $F$ au lieu de celle de $E$.
*   Oublier que le théorème du rang donne le lien entre noyau et image, pas entre noyau et conoyau.

---

## FLASHCARD 134 — À connaître 39 : Rang d'une composée

### RECTO
**Rang d'une composée**

Soient $f : E \to F$ et $g : F \to G$ linéaires, avec $E, F, G$ de dimension finie.

**Question :** Donner les inégalités reliant $\text{rg}(g \circ f)$, $\text{rg } f$ et $\text{rg } g$.

### VERSO
**Inégalités :**

$$ \text{rg}(g \circ f) \le \min(\text{rg } f, \text{rg } g) $$

**Inégalité de Sylvester (pour les endomorphismes ou les matrices) :**
Si $A \in M_{m, n}(K)$ et $B \in M_{n, p}(K)$ :
$$ \text{rg}(AB) \ge \text{rg } A + \text{rg } B - n $$

En particulier pour $f : E \to F$ et $g : F \to G$ :
$$ \text{rg}(g \circ f) \ge \text{rg } f + \text{rg } g - \dim F $$

*   Si $g$ est surjective : $\text{rg}(g \circ f) = \text{rg } f - \dim(\ker g \cap \text{Im } f)$.
*   Si $f$ est injective : $\text{rg}(g \circ f) = \text{rg}(g|_{\text{Im } f})$.

**Démonstration de 1 :**
$\text{Im}(g \circ f) = g(\text{Im } f) \subset \text{Im } g$, donc $\text{rg}(g \circ f) \le \text{rg } g$.
$\text{Im}(g \circ f) = g(f(E))$ et $g|_{\text{Im } f}$ est une application linéaire de $\text{Im } f$ dans $G$, donc par le théorème du rang, $\dim g(\text{Im } f) \le \dim \text{Im } f = \text{rg } f$.

### 
**Subtilités :**
*   L'inégalité de Sylvester est souvent utilisée sous la forme : si $A, B \in M_n(K)$, $\text{rg}(AB) \ge \text{rg } A + \text{rg } B - n$. Si le membre de droite est $\ge n$, alors $AB$ est inversible.
*   Cas d'égalité dans l'inégalité supérieure : $\text{rg}(g \circ f) = \text{rg } f$ ssi $\ker g \cap \text{Im } f = \{0\}$.

**Pièges classiques :**
*   Écrire $\text{rg}(AB) = \text{rg } A \cdot \text{rg } B$ (faux !).
*   Oublier la dimension de l'espace intermédiaire $F$ dans l'inégalité de Sylvester.

---

## FLASHCARD 135 — Proposition 41 : Rang d'une matrice

### RECTO
**Rang d'une matrice**

Soit $A \in M_{m, n}(K)$.

**Question :** Donner les différentes caractérisations du rang de $A$.

### VERSO
**Définition :**
$\text{rg}(A) = \text{rg}(f_A)$ où $f_A : K^n \to K^m, X \mapsto AX$.

**Caractérisations équivalentes :**
*   $\text{rg}(A) = \dim \text{Im}(f_A) = $ dimension de l'espace vectoriel engendré par les colonnes de $A$.
*   $\text{rg}(A) = $ dimension de l'espace vectoriel engendré par les lignes de $A$ (rang ligne = rang colonne).
*   $\text{rg}(A) = $ taille du plus grand mineur non nul de $A$ (sous-matrice carrée de déterminant non nul).
*   $\text{rg}(A) = n - \dim \ker(f_A)$ (théorème du rang).
*   $\text{rg}(A) = r$ ssi il existe $P \in GL_m(K), Q \in GL_n(K)$ tels que $PAQ = \begin{pmatrix} I_r & 0 \\ 0 & 0 \end{pmatrix}$.

**Invariance par opérations élémentaires :**
$\text{rg}(PAQ) = \text{rg}(A)$ pour $P, Q$ inversibles. Le rang est invariant par pivot de Gauss (sur les lignes ou les colonnes).

### 
**Subtilités :**
*   $\text{rg}(A) = \text{rg}({}^t A)$ (rang ligne = rang colonne). C'est un résultat non trivial.
*   $\text{rg}(A) = \text{rg}({}^t A A)$ (utile avec les matrices de Gram).

**Pièges classiques :**
*   Confondre rang de $A$ et rang de $A^2$ (ils peuvent différer).
*   Croire que le pivot de Gauss modifie le rang.

---

## FLASHCARD 136 — À connaître 40 : Matrice à diagonale strictement dominante (Hadamard)

### RECTO
**Lemme d'Hadamard (matrices à diagonale strictement dominante)**

Soit $A = (a_{ij}) \in M_n(K)$.

**Question :** Sous quelle condition de dominance diagonale la matrice $A$ est-elle inversible ?

### VERSO
**Hypothèses :**
$A = (a_{ij}) \in M_n(\mathbb{C})$ (ou $\mathbb{R}$) est à diagonale strictement dominante (par lignes) :
$$ \forall i \in \{1, \dots, n\}, \quad |a_{ii}| > \sum_{j \neq i} |a_{ij}| $$

**Conclusion :**
$A$ est inversible.

**Démonstration (esquisse) :**
Supposer $AX = 0$ avec $X \neq 0$. Soit $i_0$ l'indice tel que $|x_{i_0}| = \max_i |x_i| > 0$.
De la ligne $i_0$ : $a_{i_0 i_0} x_{i_0} = - \sum_{j \neq i_0} a_{i_0 j} x_j$.
En module : $|a_{i_0 i_0}| \cdot |x_{i_0}| \le \sum_{j \neq i_0} |a_{i_0 j}| \cdot |x_j| \le |x_{i_0}| \sum_{j \neq i_0} |a_{i_0 j}|$.
D'où $|a_{i_0 i_0}| \le \sum_{j \neq i_0} |a_{i_0 j}|$, contradiction.

### 
**Subtilités :**
*   On peut aussi définir la dominance diagonale par colonnes : $|a_{jj}| > \sum_{i \neq j} |a_{ij}|$. Le résultat reste vrai (appliquer le théorème à ${}^t A$).
*   Plus généralement, les valeurs propres de $A$ sont localisées dans les **disques de Gershgorin** : $\lambda \in \bigcup_{i=1}^n D(a_{ii}, R_i)$ avec $R_i = \sum_{j \neq i} |a_{ij}|$. La dominance diagonale assure que $0$ n'est dans aucun disque.

**Pièges classiques :**
*   Oublier le « strictement » : la dominance diagonale large ne suffit pas en général (il faut l'irréductibilité en plus).
*   Appliquer le critère en oubliant les valeurs absolues.

---

## FLASHCARD 137 — Proposition 42 : Matrice de Vandermonde

### RECTO
**Déterminant de Vandermonde**

Soient $x_0, \dots, x_{n-1} \in K$.

**Question :** Calculer le déterminant de la matrice de Vandermonde $V = (x_i^j)_{0 \le i, j \le n-1}$.

### VERSO
**Matrice de Vandermonde :**
$$ V = \begin{pmatrix} 1 & x_0 & x_0^2 & \dots & x_0^{n-1} \\ 1 & x_1 & x_1^2 & \dots & x_1^{n-1} \\ \vdots & \vdots & \vdots & & \vdots \\ 1 & x_{n-1} & x_{n-1}^2 & \dots & x_{n-1}^{n-1} \end{pmatrix} $$

**Formule :**
$$ \det V = \prod_{0 \le i < j \le n-1} (x_j - x_i) $$

**Corollaire :**
$V$ est inversible si et seulement si les $x_i$ sont deux à deux distincts.

**Démonstration (esquisse) :**
*   Voir $\det V$ comme un polynôme en $x_{n-1}$ (de degré $n-1$) : ses racines sont $x_0, \dots, x_{n-2}$.
*   Donc $\det V = c \prod_{j=0}^{n-2} (x_{n-1} - x_j)$, où $c$ est le cofacteur (qui est le Vandermonde d'ordre $n-1$).
*   Conclure par récurrence.

### 
**Subtilités :**
*   La formule est valable sur tout anneau commutatif (et a fortiori sur tout corps).
*   Le lien avec l'interpolation de Lagrange : la matrice de Vandermonde est la matrice de passage de la base canonique $(1, X, \dots, X^{n-1})$ à la base d'évaluation $(e_0, \dots, e_{n-1})$ (fonctionnelles d'évaluation aux points $x_i$).

**Pièges classiques :**
*   Se tromper dans l'ordre des indices : $x_j - x_i$ avec $i < j$ (et non $x_i - x_j$).
*   Il y a $\binom{n}{2}$ facteurs dans le produit.
*   Confondre la transposée de la matrice de Vandermonde (les deux conventions existent).

---

## FLASHCARD 138 — À connaître 41 : Transvections

### RECTO
**À connaître 41 : Transvections**

Soit $E$ un $K$-espace vectoriel de dimension finie $n$, et $B$ une base de $E$.

**Question :** Définir une transvection, donner sa matrice dans une base, et énoncer ses propriétés fondamentales (déterminant, inversibilité, lien avec les opérations élémentaires).

### VERSO
**Hypothèses / Contexte**
*   $K$ un corps (en pratique $\mathbb{R}$ ou $\mathbb{C}$)
*   $E$ un $K$-ev de dimension $n \ge 1$
*   $B = (e_1, \dots, e_n)$ base de $E$
*   $i \neq j \in [[1, n]], \lambda \in K$

**Définition formelle**
La transvection $T_{ij}(\lambda)$ est l'endomorphisme de $E$ défini par :
$$ T_{ij}(\lambda)(e_k) = \begin{cases} e_k + \lambda e_i & \text{si } k=j \\ e_k & \text{si } k \neq j \end{cases} $$

Sa matrice dans $B$ est $I_n + \lambda E_{ij}$, où $E_{ij}$ est la matrice élémentaire avec un $1$ en position $(i, j)$ et des $0$ ailleurs :
$$ \text{Mat}_B(T_{ij}(\lambda)) = \begin{pmatrix} 1 & & \lambda & \\ & 1 & & \\ & & 1 & \\ & & & 1 \end{pmatrix} $$
(la colonne $j$ voit apparaître $\lambda$ en ligne $i$, tout le reste est l'identité)

**Propriétés fondamentales**
*   **Déterminant :** $\det(T_{ij}(\lambda)) = 1$
*   **Inversibilité :** $T_{ij}(\lambda)$ est toujours inversible, d'inverse $T_{ij}(-\lambda)$
*   **Valeurs propres :** $1$ est l'unique valeur propre (multiplicité $n$)
*   **Nilpotence :** $T_{ij}(\lambda) - I_n = \lambda E_{ij}$ est nilpotente d'indice 2
*   **Opération élémentaire :** Correspond à $L_i \leftarrow L_i + \lambda L_j$ (ou $C_j \leftarrow C_j + \lambda C_i$)

**Théorème de génération**
Tout élément de $GL_n(K)$ (ou de $SL_n(K)$) est un produit fini de transvections.
En particulier, $SL_n(K)$ est engendré par les transvections.

**Idée de démonstration**
L'algorithme du pivot de Gauss décompose toute matrice inversible en produit d'opérations élémentaires (transvections + dilatations).
Une dilatation $D_i(\mu)$ ($\mu \neq 0$) se décompose en transvections et $\det = \mu$ ; pour rester dans $SL_n$, on absorbe le déterminant.
Récurrence sur $n$ par blocs.

### 
**Subtilités**
*   $i \neq j$ est impératif : si $i=j$, on obtiendrait $I + \lambda E_{ii}$ qui est une dilatation, pas une transvection.
*   La transvection n'est pas une symétrie : elle n'est pas involutive ($T_{ij}(\lambda)^2 \neq I$ en général si $\lambda \neq 0$).
*   Le déterminant vaut exactement 1 : les transvections sont dans $SL_n(K)$, ce qui est crucial pour le calcul de déterminants par pivot.
*   **Attention à la convention :** $T_{ij}(\lambda)$ agit sur la colonne $j$ (ajoute $\lambda$ fois la ligne/colonne $i$). La confusion ligne/colonne est une source d'erreur fréquente selon que l'on travaille sur les lignes ou les colonnes.

**Pièges classiques**
*   Confondre $E_{ij}$ et $E_{ji}$ : $I_n + \lambda E_{ij}$ ajoute $\lambda$ fois la colonne $i$ à la colonne $j$ quand on multiplie à droite, mais ajoute $\lambda$ fois la ligne $j$ à la ligne $i$ quand on multiplie à gauche. Il faut savoir quel côté on multiplie.
*   Oublier que $\lambda = 0$ donne l'identité : $T_{ij}(0) = I_n$, ce qui est licite mais trivial.
*   **En réduction :** une matrice triangulaire avec des 1 sur la diagonale est un produit de transvections — c'est le lien avec les matrices unipotentes.
*   **Calcul de déterminant :** $\det(I_n + \lambda E_{ij}) = 1$ (développer selon la colonne $j$, ou utiliser le fait que les valeurs propres sont toutes égales à 1).

**Extension / Programme MP**
*   Au programme MP : les transvections apparaissent dans la réduction des matrices et dans le pivot de Gauss.
*   Le résultat "tout élément de $GL_n$ est produit de transvections et d'une dilatation" est la justification théorique de la méthode de Gauss-Jordan.
*   Lien avec la décomposition LU : la matrice $L$ dans $PA=LU$ est un produit de transvections inférieures.

---

## FLASHCARD 139 — À connaître 42

### RECTO
**À connaître 42 : Formes des matrices selon leurs propriétés — Matrices équivalentes, semblables, rang**

Soit $K$ un corps, $A \in M_{n, p}(K)$.

**Question :** Énoncer le théorème de classification des matrices à équivalence près (forme canonique), rappeler la définition de matrices semblables, et les invariants associés.

### VERSO
**Définitions**
*   **Matrices équivalentes :** Deux matrices $A, B \in M_{n, p}(K)$ sont équivalentes s'il existe $P \in GL_n(K)$ et $Q \in GL_p(K)$ tels que :
    $$ B = PAQ $$
*   **Matrices semblables :** Deux matrices $A, B \in M_n(K)$ (carrées, même taille) sont semblables s'il existe $P \in GL_n(K)$ tel que :
    $$ B = P^{-1}AP $$

**Théorème : Forme canonique d'équivalence**
Toute matrice $A \in M_{n, p}(K)$ de rang $r$ est équivalente à la matrice :
$$ J_r = \begin{pmatrix} I_r & 0 \\ 0 & 0 \end{pmatrix} \in M_{n, p}(K) $$

**Corollaire :** Deux matrices $A, B \in M_{n, p}(K)$ sont équivalentes $\iff$ elles ont le même rang.

**Invariants**
*   **Équivalence :** Rang
*   **Similitude :** Valeurs propres (avec multiplicités), polynôme caractéristique, polynôme minimal, trace, déterminant

**Démonstration de la forme canonique**
Par le pivot de Gauss, on peut opérer des opérations élémentaires sur les lignes (multiplication à gauche par des transvections/dilatations) et sur les colonnes (multiplication à droite) pour mettre $A$ sous la forme $J_r$.
Ces opérations correspondent exactement à la multiplication par des matrices inversibles $P$ et $Q$.
Le rang est préservé car $P$ et $Q$ sont inversibles.

### 
**Subtilités**
*   Équivalence $\not\Rightarrow$ similitude : deux matrices équivalentes ont le même rang, mais pas nécessairement le même spectre. Exemple : $I_2$ et $\begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$ sont semblables à elles-mêmes, mais $I_2$ et $2I_2$ sont non semblables (spectre différent) mais ont même rang.
*   La similitude est plus fine que l'équivalence : si $A \sim B$ (semblables), alors $A \equiv B$ (équivalentes), mais la réciproque est fausse.
*   **Invariants de similitude :** trace et déterminant sont nécessaires mais non suffisants pour conclure à la similitude. Le polynôme minimal est un invariant plus fin.

**Pièges classiques**
*   Confondre "même polynôme caractéristique" et "semblables" : faux en général. Contre-exemple : $\begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}$ et $\begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix}$ ont des polynômes caractéristiques différents, mais... En fait l'exemple standard est deux matrices de Jordan de même polynôme caractéristique mais de polynômes minimaux différents.
*   **Taille différente :** l'équivalence est définie pour des matrices $n \times p$ avec $n \neq p$ possible ; la similitude est uniquement pour les matrices carrées de même taille.
*   Vérifier que $P$ est bien inversible avant d'affirmer la similitude.

**Application au programme MP**
*   Ces notions sont au cœur du chapitre Réduction : diagonaliser/trigonaliser $\iff$ trouver une matrice semblable diagonale/triangulaire.
*   La forme canonique d'équivalence justifie que le rang est le seul invariant pour l'équivalence — utile pour les applications linéaires.

---

## FLASHCARD 140 — Proposition 43

### RECTO
**Proposition 43 : Valeurs propres et sous-espaces propres**

Soit $E$ un $K$-espace vectoriel de dimension finie $n \ge 1$, et $f \in \mathcal{L}(E)$.

**Question :** Définir valeur propre, vecteur propre, sous-espace propre. Énoncer les propriétés de base : lien avec le polynôme caractéristique, caractérisation de la diagonalisabilité en termes de somme directe des sous-espaces propres.

### VERSO
**Définitions**
*   $\lambda \in K$ est valeur propre de $f$ s'il existe $x \neq 0$ tel que $f(x) = \lambda x$.
*   Un tel $x$ est appelé vecteur propre associé à $\lambda$.
*   Le sous-espace propre associé à $\lambda$ est :
    $$ E_\lambda(f) = \ker(f - \lambda id_E) $$
    C'est un sous-espace vectoriel de $E$, non réduit à $\{0\}$ si et seulement si $\lambda$ est valeur propre.

**Polynôme caractéristique**
$$ \chi_f(X) = \det(X \cdot id_E - f) \in K[X] $$
C'est un polynôme de degré $n$, de coefficient dominant 1.

**Propriété fondamentale :** $\lambda$ est valeur propre de $f \iff \chi_f(\lambda) = 0$.

**Multiplicités**
Pour $\lambda$ valeur propre :
*   **Multiplicité algébrique $m_a(\lambda)$ :** ordre de $\lambda$ comme racine de $\chi_f$.
*   **Multiplicité géométrique $m_g(\lambda) = \dim E_\lambda(f)$.**
*   **Inégalité fondamentale :**
    $$ 1 \le m_g(\lambda) \le m_a(\lambda) $$

**Indépendance des sous-espaces propres**
**Proposition :** Les sous-espaces propres associés à des valeurs propres distinctes sont en somme directe :
$$ \lambda_1, \dots, \lambda_k \text{ distincts} \implies E_{\lambda_1} + \dots + E_{\lambda_k} \text{ est directe} $$

**Démonstration :** Par récurrence sur $k$. Si $x_1 + \dots + x_k = 0$ avec $x_i \in E_{\lambda_i}$, appliquer $(f - \lambda_k id)$ et utiliser $\lambda_i \neq \lambda_k$.

**Caractérisation de la diagonalisabilité**
$f$ est diagonalisable
$\iff E = \bigoplus_{\lambda \in Sp(f)} E_\lambda(f)$
$\iff \sum_{\lambda \in Sp(f)} \dim E_\lambda(f) = n$
$\iff \forall \lambda \in Sp(f), m_g(\lambda) = m_a(\lambda)$

### 
**Subtilités**
*   $K$ doit contenir les valeurs propres : sur $\mathbb{R}$, une matrice peut ne pas avoir de valeurs propres réelles (ex : rotation d'angle $\pi/2$ en dimension 2). Sur $\mathbb{C}$, le polynôme caractéristique est scindé (d'Alembert-Gauss).
*   L'inégalité $m_g \le m_a$ est stricte en général : c'est le cas des blocs de Jordan non triviaux.
*   **Vecteur propre $\neq 0$ par définition :** ne jamais oublier cette condition dans les démonstrations.

**Pièges classiques**
*   Confondre multiplicité algébrique et géométrique : l'égalité $m_g = m_a$ pour toutes les valeurs propres est la condition de diagonalisabilité.
*   Calculer $\chi_f(\lambda) = \det(\lambda I - f)$ ou $\det(f - \lambda I)$ : les deux diffèrent d'un signe $(-1)^n$, donc les racines sont les mêmes, mais le coefficient dominant change. Convention à fixer.
*   Oublier de vérifier que le polynôme caractéristique est scindé sur $K$ avant de parler de diagonalisabilité sur $K$.

---

## FLASHCARD 141 — À connaître 43

### RECTO
**À connaître 43 : Polynôme minimal**

Soit $E$ un $K$-ev de dimension $n$, $f \in \mathcal{L}(E)$.

**Question :** Définir le polynôme minimal de $f$. Énoncer ses propriétés (existence, unicité, lien avec le polynôme caractéristique, lien avec la diagonalisabilité et la trigonalisabilité).

### VERSO
**Définition**
L'ensemble $\{P \in K[X] \mid P(f) = 0\}$ est un idéal de $K[X]$ (anneau principal), donc de la forme $(m_f)$ où $m_f$ est l'unique polynôme unitaire de plus petit degré annulant $f$.

Le polynôme minimal $m_f$ de $f$ est le générateur unitaire de l'idéal $\text{Ann}(f) = \{P \in K[X] \mid P(f) = 0_{\mathcal{L}(E)}\}$.

**Propriétés fondamentales**
*   **Divisibilité :** $P(f) = 0 \iff m_f \mid P$
*   **Lien avec $\chi_f$ (Cayley-Hamilton) :** $m_f \mid \chi_f$ (et $\chi_f \mid m_f^n$ dans un sens plus précis : mêmes racines)
*   **Mêmes racines :** $\lambda$ est valeur propre de $f \iff m_f(\lambda) = 0$
*   **Degré :** $1 \le \deg(m_f) \le n$

**Caractérisations**
*   $f$ diagonalisable sur $K \iff m_f$ est scindé à racines simples sur $K$
*   $f$ trigonalisable sur $K \iff m_f$ est scindé sur $K$
*   $f = \lambda id \iff m_f = X - \lambda$

**Calcul pratique**
*   Pour une matrice $A$ donnée, chercher le plus petit degré $d$ tel qu'il existe un polynôme unitaire de degré $d$ annulant $A$.
*   Si $\chi_f$ est scindé à racines simples $\Rightarrow m_f = \chi_f$.
*   Pour une matrice diagonale $\text{diag}(\lambda_1, \dots, \lambda_n)$ : $m_f = \prod_{\lambda \in Sp(f)} (X - \lambda)$ (produit sur les valeurs propres distinctes).

**Démonstration de l'existence**
$K[X]$ est un anneau principal. La famille $(f^0, f^1, \dots, f^{n^2})$ dans $\mathcal{L}(E) \simeq M_n(K)$ (dimension $n^2$) est liée, donc il existe une relation non triviale $\sum a_k f^k = 0$, i.e., un polynôme non nul annulant $f$. L'annulateur est donc non réduit à $\{0\}$, et son générateur unitaire est $m_f$.

### 
**Subtilités**
*   $m_f$ et $\chi_f$ ont les mêmes racines (dans $\bar{K}$) mais pas forcément les mêmes multiplicités. C'est le pont entre polynôme minimal et spectre.
*   Le fait que $m_f \mid \chi_f$ est une conséquence de Cayley-Hamilton ($\chi_f(f)=0$), mais la réciproque $\chi_f \mid m_f$ est fausse en général.
*   En dimension infinie, le polynôme minimal peut ne pas exister (plus d'annulateur de degré fini en général).

**Pièges classiques**
*   Confondre "$m_f$ scindé à racines simples" (diagonalisabilité) et "$m_f$ scindé" (trigonalisabilité).
*   Penser que $m_f = \chi_f$ toujours : faux. Pour $f = id$ : $\chi_f = (X-1)^n$ mais $m_f = X-1$.
*   Pour un endomorphisme d'un espace de dimension $n$ : $\deg(m_f) \le n$, pas $\le n^2$ (borne triviale). La borne $n$ vient de Cayley-Hamilton.

---

## FLASHCARD 142 — Théorème 53 : Condition suffisante de diagonalisabilité

### RECTO
**Théorème 53 : Condition suffisante de diagonalisabilité**

Soit $E$ un $K$-espace vectoriel de dimension $n \ge 1$, $f \in \mathcal{L}(E)$.

**Question :** Énoncer une condition suffisante simple de diagonalisabilité de $f$ faisant intervenir le nombre de valeurs propres distinctes. Énoncer également la condition suffisante via le polynôme minimal.

### VERSO
**Théorème (condition suffisante par le nombre de valeurs propres)**
Si $f$ admet $n$ valeurs propres distinctes dans $K$, alors $f$ est diagonalisable sur $K$.

**Démonstration :** Si $\lambda_1, \dots, \lambda_n$ sont $n$ valeurs propres distinctes, les sous-espaces propres $E_{\lambda_i}$ sont en somme directe (Prop. 43), chacun de dimension $\ge 1$. Donc $\sum \dim E_{\lambda_i} \ge n$. Comme $\dim E = n$, on a égalité et $E = \bigoplus_{i=1}^n E_{\lambda_i}$.

**Attention :** La réciproque est fausse : $f$ peut être diagonalisable avec des valeurs propres multiples (ex : $f=id$).

**Théorème (condition suffisante via le polynôme minimal)**
$f$ est diagonalisable sur $K \iff m_f$ est scindé à racines simples sur $K$.

C'est-à-dire : il existe $\lambda_1, \dots, \lambda_k \in K$ distincts tels que :
$$ m_f = (X - \lambda_1)(X - \lambda_2) \dots (X - \lambda_k) $$

**Condition nécessaire et suffisante complète (rappel)**
$f$ diagonalisable $\iff \forall \lambda \in Sp(f), m_g(\lambda) = m_a(\lambda) \iff \chi_f$ scindé et $m_g = m_a$ partout

**Stratégie pratique de diagonalisation**
1.  Calculer $\chi_f(X) = \det(X \cdot I - A)$.
2.  Vérifier que $\chi_f$ est scindé sur $K$.
3.  Pour chaque valeur propre $\lambda_i$ de multiplicité $m_a(\lambda_i)$, calculer $\dim \ker(f - \lambda_i id) = m_g(\lambda_i)$.
4.  Vérifier $m_g(\lambda_i) = m_a(\lambda_i)$ pour tout $i$.
5.  Construire une base de vecteurs propres.

### 
**Subtilités**
*   "$n$ valeurs propres distinctes" implique que $\chi_f$ est scindé à racines simples, donc $m_f = \chi_f$ dans ce cas.
*   Sur $\mathbb{C}$, $\chi_f$ est toujours scindé (d'Alembert), mais cela ne suffit pas pour la diagonalisabilité sur $\mathbb{C}$.
*   Condition nécessaire seule ne suffit pas : $\chi_f$ scindé $\not\Rightarrow$ diagonalisable. Il faut en plus $m_g = m_a$.

**Pièges classiques**
*   Croire que "polynôme caractéristique scindé $\implies$ diagonalisable" : faux. $\begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}$ a $\chi = X^2$ scindé mais n'est pas diagonalisable.
*   En dimension infinie, les notions de multiplicité algébrique/géométrique ne s'appliquent plus directement.
*   Ne pas vérifier que les valeurs propres sont dans $K$ (et non seulement dans $\bar{K}$) : une matrice réelle peut être diagonalisable sur $\mathbb{C}$ mais pas sur $\mathbb{R}$.

---

## FLASHCARD 143 — À connaître 44

### RECTO
**À connaître 44 : Polynôme d'endomorphisme, calcul fonctionnel**

Soit $E$ un $K$-ev de dimension $n$, $f \in \mathcal{L}(E)$, et $P = \sum_{k=0}^d a_k X^k \in K[X]$.

**Question :** Définir $P(f)$. Énoncer les propriétés algébriques fondamentales (morphisme d'algèbre). Énoncer le théorème de Cayley-Hamilton.

### VERSO
**Définition**
$$ P(f) = \sum_{k=0}^d a_k f^k \in \mathcal{L}(E) $$
avec la convention $f^0 = id_E$.

**Morphisme d'algèbre**
L'application $\varphi : K[X] \to \mathcal{L}(E), P \mapsto P(f)$ est un morphisme d'algèbres, i.e. :
$$ \forall P, Q \in K[X] : (P+Q)(f) = P(f) + Q(f), \quad (PQ)(f) = P(f) \circ Q(f) $$

En particulier, $P(f)$ et $Q(f)$ commutent : $P(f) \circ Q(f) = Q(f) \circ P(f)$.

**Conséquence importante :** Si $P = \prod_i (X - \lambda_i)^{n_i}$, alors $P(f) = \prod_i (f - \lambda_i id)^{n_i}$.

**Théorème de Cayley-Hamilton**
**Théorème :** $\chi_f(f) = 0_{\mathcal{L}(E)}$

i.e., tout endomorphisme est racine de son propre polynôme caractéristique.

**Conséquence :** $m_f \mid \chi_f$.

**Démonstration (esquisse)**
Méthode matricielle : En base $B$, $A = \text{Mat}_B(f)$. On calcule $\text{com}(XI_n - A)$ (matrice des cofacteurs transposée), et on utilise l'identité $(XI_n - A) \cdot \text{adj}(XI_n - A) = \det(XI_n - A) \cdot I_n = \chi_A(X) I_n$. En développant et en substituant $X=A$, on obtient $\chi_A(A) = 0$.

**Application : calcul de puissances et d'inverses**
*   Si $\chi_f = X^n + a_{n-1} X^{n-1} + \dots + a_0$, alors $f^n = -a_{n-1} f^{n-1} - \dots - a_0 id$.
*   Si $a_0 \neq 0$ : $f^{-1} = -\frac{1}{a_0}(f^{n-1} + \dots + a_1 id)$ (car $f$ est inversible ssi $a_0 = \chi_f(0) = (-1)^n \det(f) \neq 0$).

### 
**Subtilités**
*   La commutativité $P(f) \circ Q(f) = Q(f) \circ P(f)$ est spécifique aux polynômes en un même endomorphisme $f$. Elle est fausse en général pour $P(f) \circ Q(g)$ avec $f \neq g$.
*   Cayley-Hamilton dit $\chi_f(f) = 0$, pas $\chi_f(A) = 0$ pour n'importe quelle matrice $A$ : c'est spécifique à $f$.
*   L'erreur classique : "substituer $\lambda$ à $X$ dans $\chi_A(X) = \det(XI - A)$ et obtenir $\det(\lambda I - A) = 0$" ne prouve pas Cayley-Hamilton. Il faut substituer $A$ (une matrice), pas $\lambda$ (un scalaire).

**Pièges classiques**
*   Cayley-Hamilton $\not\Rightarrow m_f = \chi_f$ : on a seulement $m_f \mid \chi_f$.
*   En exam, on demande souvent d'utiliser Cayley-Hamilton pour calculer $A^{-1}$ ou des puissances élevées de $A$. La méthode : exprimer $A^n$ en fonction de $A^{n-1}, \dots, I$ grâce à $\chi_A(A)=0$.
*   Ne pas confondre $\chi_f(X) = \det(XI - f)$ et $\det(f - XI)$ : différence de signe $(-1)^n$.

---

## FLASHCARD 144 — Théorème 54

### RECTO
**Théorème 54 : Critère de diagonalisabilité par le polynôme minimal — version complète**

Soit $E$ un $K$-ev de dimension finie $n$, $f \in \mathcal{L}(E)$.

**Question :** Énoncer les équivalences complètes caractérisant la diagonalisabilité de $f$, en faisant intervenir le polynôme minimal, le polynôme caractéristique, et les multiplicités.

### VERSO
**Théorème (équivalences pour la diagonalisabilité)**
Les assertions suivantes sont équivalentes :

(i) $f$ est diagonalisable sur $K$ (il existe une base de $E$ formée de vecteurs propres de $f$).

(ii) $\chi_f$ est scindé sur $K$ et $\forall \lambda \in Sp(f), m_g(\lambda) = m_a(\lambda)$.

(iii) $m_f$ est scindé à racines simples sur $K$ : $m_f = \prod_{\lambda \in Sp(f)} (X - \lambda)$.

(iv) $E = \bigoplus_{\lambda \in Sp(f)} \ker(f - \lambda \cdot id_E)$.

(v) Il existe $P \in K[X]$ scindé à racines simples tel que $P(f) = 0$.

**Implications et logique**
(i) $\iff$ (ii) $\iff$ (iii) $\iff$ (iv) $\iff$ (v)

Pour (v) $\Rightarrow$ (iii) : $m_f \mid P$, et si $P$ est scindé à racines simples, alors $m_f$ l'est aussi.

**Condition suffisante rapide (pour les concours)**
*   Si $f$ vérifie $f^2 = f$ (projecteur) : $m_f \mid X(X-1)$, scindé à racines simples $\Rightarrow$ diagonalisable.
*   Si $f$ vérifie $f^k = id$ avec $\text{car}(K) \nmid k$ et $K$ contient les racines $k$-ièmes de l'unité : diagonalisable.

### 
**Subtilités**
*   La condition (iii) est souvent la plus rapide à vérifier en pratique : il suffit de trouver un polynôme annulateur scindé à racines simples.
*   En caractéristique nulle (sur $\mathbb{R}$ ou $\mathbb{C}$), les projecteurs ($f^2=f$) et les symétries ($f^2=id$) sont toujours diagonalisables.
*   La condition (v) donne une méthode : si on peut trouver $P$ annulateur scindé à racines simples sans calculer $m_f$, c'est suffisant.

**Pièges classiques**
*   $\chi_f$ scindé n'est pas suffisant — c'est l'erreur la plus fréquente en concours.
*   Sur $\mathbb{R}$ : une matrice peut avoir $\chi_f$ non scindé sur $\mathbb{R}$ (racines complexes non réelles), donc non diagonalisable sur $\mathbb{R}$ mais diagonalisable sur $\mathbb{C}$.
*   Confondre "polynôme annulateur" et "polynôme minimal" : tout polynôme annulateur est multiple du minimal, mais pas nécessairement égal.

---

## FLASHCARD 145 — Théorème 55 : Condition nécessaire et suffisante de trigonalisabilité

### RECTO
**Théorème 55 : Condition nécessaire et suffisante de trigonalisabilité**

Soit $E$ un $K$-espace vectoriel de dimension $n \ge 1$, $f \in \mathcal{L}(E)$.

**Question :** Énoncer le théorème caractérisant la trigonalisabilité de $f$, avec hypothèses exactes et conclusion. Préciser le cas $K = \mathbb{C}$.

### VERSO
**Théorème**
$f$ est trigonalisable sur $K$ (il existe une base de $E$ dans laquelle la matrice de $f$ est triangulaire supérieure) si et seulement si $\chi_f$ est scindé sur $K$.

i.e., $\exists \lambda_1, \dots, \lambda_n \in K$ (non nécessairement distincts) tels que :
$$ \chi_f(X) = \prod_{i=1}^n (X - \lambda_i) $$

**Corollaire immédiat**
Tout endomorphisme d'un $\mathbb{C}$-espace vectoriel de dimension finie est trigonalisable (sur $\mathbb{C}$).
(Car $\mathbb{C}$ est algébriquement clos, donc $\chi_f$ est scindé sur $\mathbb{C}$ — théorème de d'Alembert-Gauss.)

**Forme de la matrice trigonalisée**
Si $f$ est trigonalisable de valeurs propres $\lambda_1, \dots, \lambda_k$ (distinctes, de multiplicités $n_1, \dots, n_k$), il existe une base dans laquelle la matrice de $f$ est :
$$ T = \begin{pmatrix} \lambda_1 & \ast & \cdots & \ast \\ 0 & \lambda_2 & \cdots & \ast \\ \vdots & \ddots & \ddots & \vdots \\ 0 & 0 & \cdots & \lambda_n \end{pmatrix} $$
Les valeurs propres apparaissent sur la diagonale (avec multiplicités).

**Démonstration (esquisse)**
Par récurrence sur $n = \dim E$ :
*   $n=1$ : trivial.
*   Si $\chi_f$ est scindé, il admet une racine $\lambda_1 \in K$. Prendre $e_1$ vecteur propre associé.
*   Poser $F = E/\text{Vect}(e_1)$ (ou utiliser un supplémentaire), l'endomorphisme induit sur le quotient a un polynôme caractéristique qui est $\chi_f/(X-\lambda_1)$, encore scindé.
*   Appliquer l'hypothèse de récurrence.

### 
**Subtilités**
*   "Trigonalisable sur $K$" dépend du corps. Sur $\mathbb{R}$, une rotation d'angle $\pi/2$ en dimension 2 n'est pas trigonalisable (pas de valeur propre réelle). Sur $\mathbb{C}$, elle l'est.
*   La trigonalisabilité est strictement plus faible que la diagonalisabilité : $\chi_f$ scindé est nécessaire et suffisant pour trigonaliser, mais il faut en plus $m_f$ scindé à racines simples pour diagonaliser.
*   Un endomorphisme nilpotent (toutes les valeurs propres nulles) est trigonalisable, avec des 0 sur la diagonale, mais rarement diagonalisable (sauf si $f=0$).

**Pièges classiques**
*   Confondre trigonalisabilité et diagonalisabilité : $\chi_f$ scindé $\implies$ trigonalisable mais pas forcément diagonalisable.
*   Sur $\mathbb{R}$, $\chi_f$ est de degré $n$ et à coefficients réels. Il peut avoir des racines complexes non réelles, auquel cas $f$ n'est pas trigonalisable sur $\mathbb{R}$.
*   La démonstration par récurrence utilise souvent des quotients ou des supplémentaires — bien maîtriser la technique.

---

## FLASHCARD 146 — Corollaire 2

### RECTO
**Corollaire 2 : Trace et déterminant en termes des valeurs propres**

Soit $A \in M_n(K)$, et supposons $\chi_A$ scindé sur $K$ avec valeurs propres $\lambda_1, \dots, \lambda_n$ (comptées avec multiplicités).

**Question :** Exprimer $\text{tr}(A)$ et $\det(A)$ en termes des valeurs propres.

### VERSO
**Formules**
Si $\chi_A(X) = (X - \lambda_1)(X - \lambda_2) \dots (X - \lambda_n)$, alors :

$$ \text{tr}(A) = \sum_{i=1}^n \lambda_i $$

$$ \det(A) = \prod_{i=1}^n \lambda_i $$

**Démonstration**
En développant $\chi_A(X) = X^n - \text{tr}(A)X^{n-1} + \dots + (-1)^n \det(A)$, et en identifiant avec $\prod_{i=1}^n (X - \lambda_i) = X^n - (\sum \lambda_i) X^{n-1} + \dots + (-1)^n \prod \lambda_i$.

Plus précisément :
*   Coefficient de $X^{n-1}$ : $-\sum \lambda_i = -\text{tr}(A)$ donc $\text{tr}(A) = \sum \lambda_i$.
*   Terme constant : $(-1)^n \prod \lambda_i = (-1)^n \det(A)$ donc $\det(A) = \prod \lambda_i$.

**Généralisation (fonctions symétriques)**
Les coefficients de $\chi_A$ s'expriment par les polynômes symétriques élémentaires des valeurs propres :
$$ \chi_A(X) = \sum_{k=0}^n (-1)^k e_k(\lambda_1, \dots, \lambda_n) X^{n-k} $$
avec $e_k(\lambda_1, \dots, \lambda_n) = \sum_{i_1 < \dots < i_k} \lambda_{i_1} \dots \lambda_{i_k}$.

### 
**Subtilités**
*   Ces formules sont valables même si $\chi_A$ n'est pas scindé sur $K$, à condition de travailler sur $\bar{K}$ (clôture algébrique). La trace et le déterminant sont définis indépendamment.
*   En particulier : $\text{tr}(A)$ est le coefficient de $(-X^{n-1})$ dans $\chi_A$, et $\det(A) = (-1)^n \chi_A(0) = \chi_A(0) \cdot (-1)^n$.
*   **Matrice semblable :** trace et déterminant sont des invariants de similitude (ils ne dépendent que des valeurs propres).

**Pièges classiques**
*   **Signe de $\chi_A$ :** $\chi_A(X) = \det(XI - A)$, donc $\chi_A(0) = \det(-A) = (-1)^n \det(A)$. Attention au signe.
*   Sur $\mathbb{R}$, les valeurs propres complexes viennent par paires conjuguées, donc $\text{tr}(A) \in \mathbb{R}$ et $\det(A) \in \mathbb{R}$ — ce qui est cohérent.
*   Trace nulle $\not\Leftrightarrow$ déterminant nul (et vice-versa).

---

## FLASHCARD 147 — Corollaire 3 : Induit d'un trigonalisable

### RECTO
**Corollaire 3 : Induit d'un endomorphisme trigonalisable sur un sous-espace stable**

Soit $E$ un $K$-ev de dimension finie $n$, $f \in \mathcal{L}(E)$ trigonalisable sur $K$, et $F$ un sous-espace vectoriel de $E$ stable par $f$.

**Question :** Montrer que l'endomorphisme induit $f|_F$ est aussi trigonalisable sur $K$. Quelle propriété du spectre en découle ?

### VERSO
**Théorème**
Soit $F$ un sous-espace de $E$ stable par $f$ (i.e., $f(F) \subset F$). Si $f$ est trigonalisable sur $K$, alors $f|_F : F \to F$ est aussi trigonalisable sur $K$.

**Démonstration**
$f$ trigonalisable $\implies \chi_f$ scindé sur $K$. Il suffit de montrer que $\chi_{f|_F}$ divise $\chi_f$ et est donc aussi scindé.

**Méthode :** Compléter une base $(e_1, \dots, e_p)$ de $F$ en une base $(e_1, \dots, e_p, e_{p+1}, \dots, e_n)$ de $E$. Dans cette base, la matrice de $f$ est :
$$ \begin{pmatrix} A & B \\ 0 & C \end{pmatrix} $$
où $A = \text{Mat}(f|_F)$ et le bloc nul traduit la stabilité de $F$. Alors :
$$ \chi_f(X) = \det \begin{pmatrix} XI_p - A & -B \\ 0 & XI_{n-p} - C \end{pmatrix} = \chi_{f|_F}(X) \cdot \det(XI_{n-p} - C) $$
Donc $\chi_{f|_F} \mid \chi_f$, et comme $\chi_f$ est scindé, $\chi_{f|_F}$ l'est aussi.

**Corollaire sur le spectre**
$$ Sp(f|_F) \subset Sp(f) $$

### 
**Subtilités**
*   La stabilité de $F$ est essentielle : sans elle, $f$ ne définit pas d'endomorphisme de $F$.
*   La relation $\chi_{f|_F} \mid \chi_f$ est plus forte que la simple inclusion des spectres : elle donne une information sur les multiplicités.
*   En particulier, si $f$ est diagonalisable, $f|_F$ l'est aussi (même raisonnement avec $m_{f|_F} \mid m_f$, et $m_f$ scindé à racines simples).

**Pièges classiques**
*   Ne pas oublier que le sous-espace $F$ doit être stable : un sous-espace quelconque ne donne pas d'endomorphisme induit bien défini.
*   La relation en blocs $\begin{pmatrix} A & B \\ 0 & C \end{pmatrix}$ est le calcul à maîtriser parfaitement.

---

## FLASHCARD 148 — À connaître 45

### RECTO
**À connaître 45 : Endomorphismes qui commutent — propriétés**

Soit $E$ un $K$-ev de dimension finie, $f, g \in \mathcal{L}(E)$ tels que $f \circ g = g \circ f$.

**Question :** Énoncer les propriétés de stabilité des sous-espaces propres de $f$ par $g$. Quelle conséquence pour la codiagonalisabilité ?

### VERSO
**Propriété fondamentale**
Si $f \circ g = g \circ f$ et $\lambda$ est valeur propre de $f$, alors le sous-espace propre $E_\lambda(f) = \ker(f - \lambda id)$ est stable par $g$.

**Démonstration :** Soit $x \in E_\lambda(f)$, i.e., $f(x) = \lambda x$. Alors :
$$ f(g(x)) = g(f(x)) = g(\lambda x) = \lambda g(x) $$
Donc $g(x) \in E_\lambda(f)$. $\square$

**Plus généralement**
Les sous-espaces $\ker(f - \lambda id)^k$ (espaces caractéristiques) sont stables par $g$ si $f$ et $g$ commutent.

**Corollaire pour la codiagonalisabilité**
Si $f$ et $g$ commutent et sont tous deux diagonalisables, alors ils sont simultanément diagonalisables (il existe une base de $E$ dans laquelle les matrices de $f$ et de $g$ sont toutes deux diagonales).

**Démonstration :** Sur chaque $E_\lambda(f)$ (stable par $g$), l'endomorphisme $g|_{E_\lambda(f)}$ est diagonalisable (induit d'un diagonalisable sur un sous-espace stable). Diagonaliser $g$ sur chaque $E_\lambda(f)$ donne une base de vecteurs propres communs.

**Réciproque**
Si $f$ et $g$ sont simultanément diagonalisables, alors $f \circ g = g \circ f$.

### 
**Subtilités**
*   La condition "tous deux diagonalisables" est indispensable pour la codiagonalisabilité. Si l'un est seulement trigonalisable, on peut avoir cotrigonalisabilité, pas codiagonalisabilité.
*   La stabilité s'étend aux polynômes en $f$ et $g$ : si $f$ et $g$ commutent, alors $P(f)$ commute avec $Q(g)$ pour tous polynômes $P, Q$.

**Pièges classiques**
*   Le résultat de stabilité $E_\lambda(f)$ stable par $g$ est valable pour n'importe quels $f, g$ qui commutent, sans hypothèse de diagonalisabilité.
*   En exam, la stratégie standard est : identifier les sous-espaces stables communs, puis diagonaliser sur chacun.

---

## FLASHCARD 149 — Proposition 44 : Nilpotents

### RECTO
**Proposition 44 : Endomorphismes nilpotents**

Soit $E$ un $K$-ev de dimension $n \ge 1$, $f \in \mathcal{L}(E)$.

**Question :** Définir un endomorphisme nilpotent. Énoncer les équivalences caractérisant la nilpotence. Donner les propriétés fondamentales (spectre, polynôme caractéristique, polynomial minimal).

### VERSO
**Définition**
$f$ est nilpotent s'il existe $k \in \mathbb{N}^*$ tel que $f^k = 0$.
Le plus petit tel $k$ est l'indice de nilpotence de $f$ (noté $\nu(f)$).

**Équivalences**
Les assertions suivantes sont équivalentes :
(i) $f$ est nilpotent.
(ii) $\chi_f(X) = X^n$.
(iii) $Sp(f) = \{0\}$ (la seule valeur propre est $0$, si $K$ est algébriquement clos, ou $\chi_f = X^n$).
(iv) $m_f = X^\nu$ pour un certain $\nu \in \llbracket 1, n \rrbracket$.
(v) $f$ est trigonalisable avec $0$ sur toute la diagonale.

**Propriétés**
*   $\text{tr}(f) = 0$ (somme des valeurs propres toutes nulles)
*   $\det(f) = 0$ (produit des valeurs propres toutes nulles), donc $f$ n'est pas inversible (sauf si $E=\{0\}$)
*   $\nu(f) \le n$ (car $m_f \mid \chi_f = X^n$ et $\deg m_f \le n$)
*   Si $f^{n-1} \neq 0$ et $f^n = 0$ : $\nu(f) = n$, et $f$ est semblable à la matrice de Jordan nilpotente $J_n(0)$.

**Exemples canoniques**
*   Matrice $N = \begin{pmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ 0 & 0 & 0 \end{pmatrix}$ : nilpotente d'indice 3.
*   Toute matrice strictement triangulaire supérieure est nilpotente.

### 
**Subtilités**
*   L'équivalence (ii) $\iff$ (i) utilise Cayley-Hamilton : $f^n = 0$ si $\chi_f = X^n$ (car Cayley-Hamilton donne $\chi_f(f) = f^n = 0$).
*   La réciproque : si $f$ nilpotent, toutes les valeurs propres sont $0$, donc $\chi_f = X^n$ (si $\chi_f$ est scindé, ce qui est le cas sur $\mathbb{C}$ ou si l'endomorphisme est nilpotent il est trigonalisable avec des $0$).
*   Trace nulle $\not\Rightarrow$ nilpotent : contre-exemple $\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$.

**Pièges classiques**
*   Confondre "nilpotent" et "a $0$ comme valeur propre" : si $0$ est valeur propre mais pas la seule, $f$ n'est pas nilpotent. Ex : $\begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}$.
*   L'indice de nilpotence satisfait $\nu \le n$ mais peut être strictement plus petit que $n$. Ex : $\begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}$ dans $M_2$ a $\nu = 2 = n$.

---

## FLASHCARD 150 — Lemme 4

### RECTO
**Lemme 4 : Noyaux itérés d'un endomorphisme nilpotent**

Soit $E$ un $K$-ev de dimension finie $n$, $f \in \mathcal{L}(E)$ nilpotent d'indice $\nu$.

**Question :** Énoncer les propriétés des noyaux itérés $\ker(f^k)$ pour $k \ge 0$. Donner la suite des dimensions et sa stabilisation.

### VERSO
**Suite des noyaux itérés**
Posons $N_k = \ker(f^k)$ pour $k \ge 0$.

**Propriétés :**
*   $N_0 = \{0\} \subset N_1 \subset N_2 \subset \dots \subset N_\nu = E$
*   La suite $(\dim N_k)_{k \ge 0}$ est strictement croissante jusqu'à $k=\nu$, puis constante égale à $n$.
    $$ 0 = \dim N_0 < \dim N_1 < \dim N_2 < \dots < \dim N_\nu = n $$
*   Stabilisation : $N_k = N_{k+1} \iff f|_{N_{k+1}} = 0 \dots$ En fait : si $N_k = N_{k+1}$ alors $N_k = N_j$ pour tout $j \ge k$.

**Lemme des noyaux (propriété clé)**
*   Si $f^k = 0$ (i.e., $\nu \le k$), alors $N_k = E$.
*   Si $f^{k+1} = 0$ et $f^k \neq 0$, alors $\dim N_{k+1} > \dim N_k$.

**Conséquence sur l'indice**
$$ \nu(f) = \min \{k \ge 0 : f^k = 0\} \le n $$
Et $\nu(f) = n$ si et seulement si il existe $x \in E$ tel que $(x, f(x), \dots, f^{n-1}(x))$ est une base de $E$ (base cyclique ou de Jordan).

### 
**Subtilités**
*   La stricte croissance jusqu'à $\nu$ garantit que $\nu \le n$ : en effet, $n+1$ termes strictement croissants dans $\{0, 1, \dots, n\}$ est impossible.
*   La suite des sauts $d_k = \dim N_k - \dim N_{k-1}$ est décroissante : $d_1 \ge d_2 \ge \dots \ge d_\nu \ge 1$. C'est lié à la structure des blocs de Jordan.

**Pièges classiques**
*   Ne pas confondre "noyaux itérés de $f$" avec "noyaux itérés de $f - \lambda id$" (espaces caractéristiques), qui sont le bon outil pour la décomposition de Dunford.
*   La décroissance des sauts n'est pas à démontrer en concours mais est utile pour déterminer la forme de Jordan.

---

## FLASHCARD 151 — À connaître 46 : Codiagonalisation, cotrigonalisation

### RECTO
**À connaître 46 : Codiagonalisation et cotrigonalisation**

Soit $E$ un $K$-ev de dimension finie, et $f_1, \dots, f_p \in \mathcal{L}(E)$.

**Question :** Énoncer le théorème de codiagonalisation simultanée, et le théorème de cotrigonalisation. Donner les conditions nécessaires et suffisantes.

### VERSO
**Codiagonalisation simultanée**
**Théorème :** Les endomorphismes $f_1, \dots, f_p$ sont simultanément diagonalisables (il existe une base de $E$ dans laquelle toutes les matrices de $f_i$ sont diagonales) si et seulement si :
1.  Chaque $f_i$ est diagonalisable (sur $K$),
2.  Les $f_i$ commutent deux à deux : $\forall i \neq j, f_i \circ f_j = f_j \circ f_i$.

**Idée de preuve :** Par récurrence sur $p$ et sur $\dim E$, en utilisant la stabilité des sous-espaces propres de $f_1$ par les $f_j$ (qui commutent), puis en diagonalisant simultanément les induits.

**Cotrigonalisation simultanée**
**Théorème :** Les endomorphismes $f_1, \dots, f_p$ sont simultanément trigonalisables si et seulement si :
1.  Chaque $f_i$ est trigonalisable (sur $K$),
2.  Les $f_i$ commutent deux à deux.

**Application pratique**
Pour deux endomorphismes $f, g$ :
*   $f, g$ diagonalisables et $fg = gf \implies$ base commune de diagonalisation.
*   **En pratique :** diagonaliser $f$ d'abord, puis diagonaliser $g$ restreint à chaque sous-espace propre de $f$.

### 
**Subtilités**
*   La commutativité seule ne suffit pas (sans diagonalisabilité).
*   La diagonalisabilité seule ne suffit pas (sans commutativité) : deux rotations dans $\mathbb{R}^2$ (d'angles différents de $\pi$) ne commutent pas en général.
*   Sur $\mathbb{C}$ : tout endomorphisme est trigonalisable, donc pour la cotrigonalisation il suffit de la commutativité.

**Pièges classiques**
*   Oublier de vérifier la commutativité deux à deux (et pas seulement globale).
*   En dimension infinie, ces théorèmes ne s'appliquent plus directement.

---

## FLASHCARD 152 — À connaître 47 : Caractérisation des nilpotents par la trace

### RECTO
**À connaître 47 : Caractérisation des nilpotents par les traces des puissances**

Soit $K$ un corps de caractéristique $0$ (e.g., $K = \mathbb{R}$ ou $\mathbb{C}$), $E$ un $K$-ev de dimension finie $n$, $f \in \mathcal{L}(E)$.

**Question :** Énoncer la caractérisation des endomorphismes nilpotents en termes des traces de puissances.

### VERSO
**Théorème**
Supposons $\text{car}(K) = 0$. Alors :
$$ f \text{ nilpotent} \iff \forall k \in \{1, 2, \dots, n\}, \text{tr}(f^k) = 0 $$

**Démonstration**
*   $(\Rightarrow)$ : Si $f$ nilpotent, les valeurs propres sont toutes nulles (Prop. 44), donc $\text{tr}(f^k) = \sum_i \lambda_i^k = 0$.
*   $(\Leftarrow)$ : Notons $s_k = \text{tr}(f^k)$ et $\lambda_1, \dots, \lambda_n$ les valeurs propres (dans $\bar{K}$). Les relations de Newton relient les $s_k$ aux fonctions symétriques élémentaires $e_k$ des valeurs propres :
    $$ s_k - e_1 s_{k-1} + e_2 s_{k-2} - \dots + (-1)^{k-1} e_{k-1} s_1 + (-1)^k k e_k = 0 $$
    Si $s_1 = s_2 = \dots = s_n = 0$ et $\text{car}(K) = 0$ (donc $k \neq 0$ dans $K$), on déduit par récurrence $e_1 = e_2 = \dots = e_n = 0$, donc $\chi_f = X^n$, donc $f$ nilpotent.

**Remarque sur la caractéristique**
En caractéristique $p > 0$, le résultat est faux : par exemple sur $\mathbb{F}_p$, $\text{tr}(f^k) = 0$ pour tout $k$ ne garantit pas la nilpotence.

### 
**Subtilités**
*   La condition $\text{car}(K) = 0$ est essentielle : elle intervient dans les relations de Newton via les facteurs $k$.
*   Il suffit de vérifier les puissances $k = 1, \dots, n$ (pas toutes les puissances).
*   Ce résultat est utile pour prouver la nilpotence sans calculer explicitement les puissances de $f$.

**Pièges classiques**
*   Croire que $\text{tr}(f) = 0$ suffit pour conclure à la nilpotence : faux. Il faut $\text{tr}(f^k) = 0$ pour $k = 1, \dots, n$.
*   En caractéristique $p$, les relations de Newton dégénèrent pour $k=p$.

---

## FLASHCARD 153 — Lemme 5

### RECTO
**Lemme 5 : Lemme de décomposition (préliminaire à la décomposition de Dunford)**

Soit $E$ un $K$-ev de dimension finie $n$, $f \in \mathcal{L}(E)$, et $P, Q \in K[X]$ tels que $P$ et $Q$ sont premiers entre eux (i.e., $\text{pgcd}(P, Q) = 1$).

**Question :** Si $PQ(f) = 0$, que peut-on dire de $\ker(P(f))$ et $\ker(Q(f))$ ?

### VERSO
**Lemme**
Soient $P, Q \in K[X]$ avec $\text{pgcd}(P, Q) = 1$, et $f \in \mathcal{L}(E)$ tel que $PQ(f) = (PQ)(f) = 0$. Alors :
$$ E = \ker(P(f)) \oplus \ker(Q(f)) $$

**Démonstration**
Par Bézout : $\exists U, V \in K[X], UP + VQ = 1$. En évaluant en $f$ :
$$ U(f) \circ P(f) + V(f) \circ Q(f) = id_E $$
*   **Somme :** Tout $x \in E$ s'écrit $x = U(f)(P(f)(x)) + V(f)(Q(f)(x))$.
    Posons $y = V(f)(Q(f)(x))$. Alors $P(f)(y) = P(f) \circ V(f) \circ Q(f)(x) = V(f) \circ (PQ)(f)(x) = 0$, donc $y \in \ker(P(f))$.
    De même $U(f)(P(f)(x)) \in \ker(Q(f))$.
    Donc $E = \ker(P(f)) + \ker(Q(f))$.
*   **Directe :** Si $x \in \ker(P(f)) \cap \ker(Q(f))$, alors $x = U(f)(P(f)(x)) + V(f)(Q(f)(x)) = 0$.

**Généralisation : théorème de décomposition des noyaux**
Si $m_f = P_1^{n_1} \dots P_k^{n_k}$ (factorisation en irréductibles deux à deux premiers entre eux sur $K$), alors :
$$ E = \bigoplus_{i=1}^k \ker(P_i^{n_i}(f)) $$

### 
**Subtilités**
*   Le lemme s'applique sous la seule condition $PQ(f) = 0$ (pas nécessairement $m_f = PQ$) et $\text{pgcd}(P, Q) = 1$.
*   Les sous-espaces $\ker(P(f))$ et $\ker(Q(f))$ sont stables par $f$.
*   C'est le lemme fondamental pour la décomposition de Dunford et la réduction de Jordan.

**Pièges classiques**
*   Oublier la condition $\text{pgcd}(P, Q) = 1$ : sans cela, la somme n'est pas directe.
*   Appliquer le lemme avec $P = (X - \lambda)$ et $Q = \chi_f / (X - \lambda)^{m_a(\lambda)}$ pour isoler l'espace caractéristique.

---

## FLASHCARD 154 — Lemme 6 : Racines du polynôme minimal

### RECTO
**Lemme 6 : Racines du polynôme minimal**

Soit $E$ un $K$-ev de dimension finie $n$, $f \in \mathcal{L}(E)$.

**Question :** Montrer que $\lambda \in K$ est valeur propre de $f$ si et seulement si $\lambda$ est racine de $m_f$. Autrement dit : $Sp(f)$ est exactement l'ensemble des racines de $m_f$ dans $K$.

### VERSO
**Énoncé**
$$ \lambda \in Sp(f) \iff m_f(\lambda) = 0 $$
i.e., les racines de $m_f$ dans $K$ sont exactement les valeurs propres de $f$.

**Démonstration**
*   $(\Rightarrow)$ : Soit $\lambda$ valeur propre, $x \neq 0$ vecteur propre : $f(x) = \lambda x$. Alors $m_f(f)(x) = m_f(\lambda) x$ (car $f^k(x) = \lambda^k x$). Comme $m_f(f) = 0$ et $x \neq 0$, on a $m_f(\lambda) = 0$.
*   $(\Leftarrow)$ : Soit $\lambda$ racine de $m_f$. Écrivons $m_f(X) = (X - \lambda) Q(X)$ avec $Q \in K[X]$.
    Comme $m_f$ est le minimal, $Q(f) \neq 0$. Donc $\exists x \neq 0 : Q(f)(x) \neq 0$.
    Posons $y = Q(f)(x) \neq 0$. Alors :
    $$ (f - \lambda id)(y) = (f - \lambda id) \circ Q(f)(x) = m_f(f)(x) = 0 $$
    Donc $f(y) = \lambda y$ et $y \neq 0$ : $\lambda$ est valeur propre. $\square$

**Corollaire**
$m_f$ et $\chi_f$ ont les mêmes racines dans $K$ (les valeurs propres de $f$).

### 
**Subtilités**
*   Ce lemme est fondamental : il justifie pourquoi $m_f$ contient exactement les même facteurs linéaires que $\chi_f$, juste avec des multiplicités potentiellement plus petites.
*   La démonstration de $(\Leftarrow)$ utilise la minimalité de $m_f$ : si $(X - \lambda) \mid m_f$ mais $Q = m_f / (X - \lambda)$ n'annule pas $f$, c'est qu'on peut "fabriquer" un vecteur propre.

**Pièges classiques**
*   Ne pas confondre "racine de $m_f$" et "racine de $\chi_f$" : elles coïncident, mais les multiplicités diffèrent.
*   Ce lemme ne parle que des racines dans $K$, pas dans $\bar{K}$.

---

Voici la suite et fin de la réécriture de votre fichier, en reprenant à la **Flashcard 155**.

---

## FLASHCARD 155 — À connaître 48 : Matrice compagnon

### RECTO
**À connaître 48 : Matrice compagnon**

Soit $P(X) = X^n + a_{n-1} X^{n-1} + \dots + a_1 X + a_0 \in K[X]$ un polynôme unitaire de degré $n$.

**Question :** Définir la matrice compagnon de $P$. Quel est son polynôme caractéristique ? Son polynôme minimal ?

### VERSO
**Définition**
La matrice compagnon de $P$ est :
$$ C(P) = \begin{pmatrix} 0 & 0 & \dots & 0 & -a_0 \\ 1 & 0 & \dots & 0 & -a_1 \\ 0 & 1 & \dots & 0 & -a_2 \\ \vdots & \ddots & \ddots & \vdots & \vdots \\ 0 & 0 & \dots & 1 & -a_{n-1} \end{pmatrix} \in M_n(K) $$
(La dernière colonne contient les coefficients de $-P$ à partir du degré $0$.)

**Propriétés fondamentales**
**Théorème :** $\chi_{C(P)} = P$ et $m_{C(P)} = P$.

i.e., la matrice compagnon est un exemple canonique où polynôme minimal = polynôme caractéristique.

**Démonstration :**
*   $\chi_{C(P)} = P$ : par développement direct du déterminant $\det(XI_n - C(P))$ le long de la dernière colonne (récurrence).
*   $m_{C(P)} = P$ : puisque $\deg m_{C(P)} \le n = \deg \chi_{C(P)} = \deg P$ et $m_{C(P)} \mid \chi_{C(P)} = P$. De plus, si on note $(e_1, \dots, e_n)$ la base canonique, on a $C(P)e_k = e_{k+1}$ pour $k < n$. Ainsi la famille $(e_1, C(P)e_1, \dots, C(P)^{n-1}e_1)$ est libre (c'est la base canonique). Aucun polynôme de degré $< n$ ne peut annuler $C(P)$ (sinon il annulerait $e_1$ de façon non triviale). Donc $\deg m_{C(P)} = n$, d'où $m_{C(P)} = P$.

**Application**
Tout polynôme unitaire de degré $n$ est le polynôme minimal (et caractéristique) d'une matrice $n \times n$ : il suffit de prendre sa matrice compagnon.

### 
**Subtilités**
*   La matrice compagnon réalise l'isomorphisme $K[X]/(P) \simeq K^n$ comme $K[X]$-modules, où $X$ agit par $C(P)$.
*   Elle est utilisée dans la preuve du théorème de Cayley-Hamilton et dans la réduction des matrices.
*   $m_{C(P)} = \chi_{C(P)} = P$ : c'est l'un des rares cas où polynôme minimal et caractéristique coïncident de façon garantie.

**Pièges classiques**
*   La convention peut varier (lignes/colonnes) : bien préciser la convention utilisée.
*   Ne pas confondre "matrice compagnon de $P$" et "matrice d'un endomorphisme dont $P$ est un annulateur quelconque" : la matrice compagnon a $P$ comme polynôme minimal.

---

## FLASHCARD 156 — Théorème 56 : Cayley-Hamilton

### RECTO
**Théorème 56 : Théorème de Cayley-Hamilton**

Soit $K$ un corps, $E$ un $K$-espace vectoriel de dimension finie $n \ge 1$, $f \in \mathcal{L}(E)$ et $A = \text{Mat}_B(f)$ sa matrice dans une base $B$.

**Question :** Énoncer le théorème de Cayley-Hamilton avec hypothèses exactes et conclusion. Donner une esquisse de preuve rigoureuse.

### VERSO
**Hypothèses**
*   $K$ corps quelconque
*   $A \in M_n(K)$
*   $\chi_A(X) = \det(XI_n - A)$ le polynôme caractéristique de $A$

**Énoncé formel**
**Théorème de Cayley-Hamilton :**
$$ \chi_A(A) = 0_{M_n(K)} $$

i.e., toute matrice carrée est annulée par son propre polynôme caractéristique.

En termes d'endomorphismes : $\chi_f(f) = 0_{\mathcal{L}(E)}$.

**Corollaires immédiats**
*   $m_f \mid \chi_f$ (le polynôme minimal divise le polynôme caractéristique).
*   $\deg(m_f) \le n$.
*   $f^n$ est combinaison linéaire de $id, f, \dots, f^{n-1}$ (expression de Cayley-Hamilton pour le calcul de puissances).

**Démonstration rigoureuse (méthode de la matrice adjointe)**
Soit $B(X) = XI_n - A \in M_n(K[X])$. Considérons la matrice adjointe (transposée de la comatrice) :
$$ \text{adj}(B(X)) \in M_n(K[X]) $$

Par définition de l'adjointe : $B(X) \cdot \text{adj}(B(X)) = \det(B(X)) \cdot I_n = \chi_A(X) I_n$.

Les coefficients de $\text{adj}(B(X))$ sont des polynômes en $X$ de degré $\le n-1$ :
$$ \text{adj}(B(X)) = C_{n-1} X^{n-1} + C_{n-2} X^{n-2} + \dots + C_0 $$
avec $C_k \in M_n(K)$. En développant :
$$ (XI_n - A)(C_{n-1}X^{n-1} + \dots + C_0) = \chi_A(X) I_n $$

En identifiant les coefficients de $X^k$ des deux membres, on obtient $n+1$ relations matricielles. En multipliant la relation de $X^k$ par $A^k$ et en sommant, tout se télescope et donne $\chi_A(A) = 0$. $\square$

**Mise en garde :** La substitution naïve "$X=A$ dans $\det(XI - A) = 0$" est fausse : on substitue une matrice à une variable scalaire dans un déterminant scalaire, ce qui n'a pas de sens direct. La preuve ci-dessus est la seule correcte.

### 
**Subtilités**
*   L'erreur classique : "Puisque $\det(\lambda I - A) = \chi_A(\lambda) = 0$ pour $\lambda$ valeur propre, en mettant $A$ à la place de $\lambda$, on obtient $\chi_A(A) = 0$." Ce raisonnement est faux.
*   La preuve correcte travaille dans $M_n(K[X])$ (matrices à coefficients polynomiaux) et utilise l'identité de l'adjointe avant de spécialiser.
*   Sur un corps quelconque (même de caractéristique $p$), le théorème reste vrai.

**Pièges classiques**
*   Confondre $\chi_A(A) = 0$ (Cayley-Hamilton, vrai) avec $\chi_A(\lambda) = 0 \implies \lambda$ v.p. (définition des valeurs propres, différent).
*   Utiliser Cayley-Hamilton pour calculer $A^{-1}$ : si $\chi_A = X^n + a_{n-1}X^{n-1} + \dots + a_0$ avec $a_0 \neq 0$, alors $A^{-1} = -\frac{1}{a_0}(A^{n-1} + a_{n-1}A^{n-2} + \dots + a_1 I_n)$.
*   En dimension infinie, Cayley-Hamilton n'a pas d'analogue direct.

---

## FLASHCARD 157 — Lemme 7 : Décomposition des noyaux

### RECTO
**Lemme 7 (de décomposition des noyaux)**

Soit $E$ un $K$-ev de dimension finie, $f \in \mathcal{L}(E)$.

Soit $P_1, \dots, P_k \in K[X]$ des polynômes deux à deux premiers entre eux, et $P = P_1 \dots P_k$.

**Question :** Énoncer le lemme de décomposition des noyaux (théorème chinois des endomorphismes).

### VERSO
**Énoncé formel**
Si $P(f) = 0$ et $P = P_1 \dots P_k$ avec $\text{pgcd}(P_i, P_j) = 1$ pour $i \neq j$, alors :
$$ E = \bigoplus_{i=1}^k \ker(P_i(f)) $$

**Propriétés supplémentaires**
*   Chaque $F_i = \ker(P_i(f))$ est stable par $f$.
*   $f|_{F_i}$ a pour polynôme minimal $P_i^{n_i}$ où $P_i^{n_i} \mid P$ (à préciser selon le contexte).
*   La projection sur $F_i$ parallèlement à $\bigoplus_{j \neq i} F_j$ est un polynôme en $f$.

**Démonstration (récurrence sur $k$)**
Cas $k=2$ : Bézout donne $UP_1 + VP_2 = 1$ (avec $P_1P_2(f) = 0$). Alors $id = U(f)P_1(f) + V(f)P_2(f)$, ce qui donne la décomposition $E = \ker P_1(f) \oplus \ker P_2(f)$ (Lemme 5).

Récurrence : $P_1$ et $P_2 \dots P_k$ sont premiers entre eux (par Gauss), donc on décompose d'abord $E = \ker P_1(f) \oplus \ker(P_2 \dots P_k)(f)$, puis on applique l'hypothèse de récurrence à $\ker(P_2 \dots P_k)(f)$.

**Application : Décomposition de Dunford (esquisse)**
Si $\chi_f = \prod_{i=1}^k (X - \lambda_i)^{n_i}$ (scindé sur $K$), les polynômes $(X - \lambda_i)^{n_i}$ sont deux à deux premiers entre eux, d'où :
$$ E = \bigoplus_{i=1}^k \ker(f - \lambda_i id)^{n_i} $$
Ce sont les espaces caractéristiques de $f$.

### 
**Subtilités**
*   Il suffit que $P(f) = 0$ (pas nécessairement $P = m_f$) : n'importe quel annulateur scindé en facteurs premiers entre eux convient.
*   Les projections $\pi_i$ sur $\ker P_i(f)$ sont des polynômes en $f$ : $\pi_i = Q_i(f)$ où $Q_i$ est construit par Bézout.
*   Le lemme est la clef de la décomposition de Dunford et de la réduction de Jordan.

**Pièges classiques**
*   Oublier que les $P_i$ doivent être deux à deux premiers entre eux, pas seulement sans facteur commun global.
*   Si $P = m_f$, les $\ker P_i(f)$ sont exactement les espaces caractéristiques et leur décomposition est intrinsèque.

---

## FLASHCARD 158 — Proposition 45

### RECTO
**Proposition 45 : Sous-espaces caractéristiques — propriétés**

Soit $E$ un $K$-ev de dimension finie $n$, $f \in \mathcal{L}(E)$, $\chi_f$ scindé sur $K$ avec valeurs propres $\lambda_1, \dots, \lambda_k$ de multiplicités $n_1, \dots, n_k$.

**Question :** Définir les sous-espaces caractéristiques de $f$ et en énoncer les propriétés (dimension, lien avec $\chi_f$, lien avec les espaces propres).

### VERSO
**Définition**
Le sous-espace caractéristique associé à $\lambda_i$ est :
$$ C_{\lambda_i}(f) = \ker(f - \lambda_i id)^{n_i} = \ker(f - \lambda_i id)^n $$
(les deux définitions coïncident, et il suffit de prendre une puissance $\ge n_i$).

**Propriétés**
**Proposition :**
*   $\dim C_{\lambda_i}(f) = n_i$ (la multiplicité algébrique).
*   $C_{\lambda_i}(f)$ est stable par $f$.
*   $E_{\lambda_i}(f) = \ker(f - \lambda_i id) \subset C_{\lambda_i}(f)$ (l'espace propre est inclus dans le caractéristique).
*   $E = \bigoplus_{i=1}^k C_{\lambda_i}(f)$ (décomposition de Dunford des noyaux).
*   L'endomorphisme induit $(f - \lambda_i id)|_{C_{\lambda_i}(f)}$ est nilpotent d'indice $\le n_i$.

**Décomposition de Dunford**
**Conséquence :** Sur chaque $C_{\lambda_i}(f)$, on peut écrire $f = \lambda_i id + (f - \lambda_i id)$ comme somme d'un scalaire et d'un nilpotent. Globalement :
$$ f = D + N $$
où $D$ est diagonalisable, $N$ nilpotent, $D \circ N = N \circ D$ (décomposition de Dunford).

### 
**Subtilités**
*   $\dim C_{\lambda_i}(f) = n_i$ (multiplicité algébrique), tandis que $\dim E_{\lambda_i}(f) = m_g(\lambda_i) \le n_i$.
*   La décomposition $E = \bigoplus C_{\lambda_i}$ n'est possible que si $\chi_f$ est scindé sur $K$.
*   L'indice de nilpotence de $(f - \lambda_i id)|_{C_{\lambda_i}(f)}$ est lié à la taille des blocs de Jordan associés à $\lambda_i$.

**Pièges classiques**
*   Confondre espace propre ($\ker(f - \lambda id)$) et espace caractéristique ($\ker(f - \lambda id)^{n_i}$).
*   La décomposition $f = D + N$ de Dunford est unique sous les conditions de commutativité et de nilpotence/diagonalisabilité.

---

## FLASHCARD 159 — Théorème 57 : Théorème de Jordan (décomposition de Jordan)

### RECTO
**Théorème 57 : Décomposition de Jordan**

Soit $K$ un corps algébriquement clos (e.g., $K = \mathbb{C}$), $E$ un $K$-ev de dimension finie $n$, $f \in \mathcal{L}(E)$.

**Question :** Énoncer le théorème de réduction de Jordan : existence d'une base de Jordan, forme de la matrice de Jordan, unicité.

### VERSO
**Théorème**
Soit $K$ algébriquement clos. Tout endomorphisme $f \in \mathcal{L}(E)$ admet une base de Jordan, i.e., une base dans laquelle sa matrice est de la forme :
$$ J = \text{diag}(J_{n_1}(\lambda_1), J_{n_2}(\lambda_2), \dots, J_{n_r}(\lambda_r)) $$
où chaque bloc de Jordan est :
$$ J_k(\lambda) = \begin{pmatrix} \lambda & 1 & 0 & \cdots & 0 \\ 0 & \lambda & 1 & \cdots & 0 \\ \vdots & \ddots & \ddots & \ddots & \vdots \\ 0 & 0 & \cdots & \lambda & 1 \\ 0 & 0 & \cdots & 0 & \lambda \end{pmatrix} \in M_k(K) $$

**Unicité**
La forme de Jordan est unique à permutation des blocs près : les blocs $J_{n_i}(\lambda_i)$ sont déterminés uniquement (leurs tailles et valeurs propres).

**Lien avec les invariants**
*   Les valeurs propres $\lambda_i$ sont les racines de $\chi_f$ (avec multiplicités).
*   Le nombre de blocs de Jordan associés à $\lambda = \dim \ker(f - \lambda id) = m_g(\lambda)$.
*   La taille du plus grand bloc de Jordan associé à $\lambda =$ indice de nilpotence de $(f - \lambda id)|_{C_\lambda}$.
*   $f$ diagonalisable $\iff$ tous les blocs sont de taille 1.

**Structure des blocs**
Sur chaque bloc $J_k(\lambda)$ : la restriction de $f$ à l'espace correspondant vérifie $(f - \lambda id)^k = 0$ mais $(f - \lambda id)^{k-1} \neq 0$.

### 
**Subtilités**
*   $K$ algébriquement clos est nécessaire pour que $\chi_f$ soit scindé. Sur $\mathbb{R}$, la forme de Jordan n'existe pas toujours (mais il existe une forme réelle de Jordan avec des blocs $2 \times 2$ pour les valeurs propres complexes conjuguées).
*   L'unicité est un théorème non trivial. Elle se déduit des invariants : nombre de blocs de chaque taille pour chaque valeur propre.
*   La forme de Jordan est la "forme canonique" pour la similitude sur un corps algébriquement clos.

**Programme MP**
En MP, la forme de Jordan est au programme sur $\mathbb{C}$ (ou plus généralement sur un corps algébriquement clos). La démonstration complète de l'unicité est hors programme strict, mais l'énoncé et l'utilisation sont exigibles.
Utilisation pratique : calculer des puissances de matrices, résoudre des équations différentielles, étudier $e^{tA}$.

**Pièges classiques**
*   $f$ trigonalisable $\not\Rightarrow$ réductible en Jordan sur $\mathbb{R}$ (manque de valeurs propres réelles).
*   Confondre "nombre de blocs" ($= m_g$) et "taille des blocs" ($=$ ordre de nilpotence).
*   La forme de Jordan dépend de $K$ : sur $\mathbb{C}$ elle existe toujours, sur $\mathbb{R}$ pas forcément.

---

## FLASHCARD 160 — Proposition 46 : Induit d'un endomorphisme diagonalisable

### RECTO
**Proposition 46 : Induit d'un endomorphisme diagonalisable sur un sous-espace stable**

Soit $E$ un $K$-ev de dimension finie, $f \in \mathcal{L}(E)$ diagonalisable, et $F$ un sous-espace de $E$ stable par $f$.

**Question :** Montrer que l'endomorphisme induit $f|_F$ est diagonalisable.

### VERSO
**Énoncé**
Si $f$ est diagonalisable et $F$ est un sous-espace stable par $f$, alors $f|_F : F \to F$ est diagonalisable.

**Démonstration**
**Méthode 1 (via le polynôme minimal) :**
$f$ diagonalisable $\implies m_f$ est scindé à racines simples : $m_f = \prod_{i=1}^k (X - \lambda_i)$.
Comme $m_f(f) = 0$ et $F$ est stable par $f$ : $m_f(f|_F) = (m_f(f))|_F = 0$.
Donc $m_{f|_F} \mid m_f$, et comme $m_f$ est scindé à racines simples, $m_{f|_F}$ l'est aussi.
Donc $f|_F$ est diagonalisable. $\square$

**Méthode 2 (via les bases) :**
$f$ diagonalisable $\implies E = \bigoplus_\lambda E_\lambda(f)$. Chaque $E_\lambda(f)$ est stable par $f$ (car $f$ agit comme $\lambda \cdot id$ dessus). Donc $F = \bigoplus_\lambda (F \cap E_\lambda(f))$ (somme directe car $F$ est stable), et $F \cap E_\lambda(f) = E_\lambda(f|_F)$. Donc $F$ est somme directe de sous-espaces propres de $f|_F$.

### 
**Subtilités**
*   La méthode 1 est la plus élégante et générale : elle utilise que le polynôme minimal de l'induit divise celui de l'endomorphisme.
*   La méthode 2 donne plus d'informations : $Sp(f|_F) \subset Sp(f)$. En particulier, les valeurs propres de $f|_F$ sont parmi celles de $f$.

**Pièges classiques**
*   La réciproque est fausse : si $f|_F$ est diagonalisable pour tout sous-espace stable $F$, il n'en découle pas forcément que $f$ est diagonalisable.
*   Bien vérifier la stabilité de $F$ avant d'appliquer la proposition.

---

## FLASHCARD 161 — Proposition 47

### RECTO
**Proposition 47 : Caractérisation matricielle de la diagonalisabilité**

Soit $A \in M_n(K)$.

**Question :** Donner des conditions équivalentes pour que $A$ soit diagonalisable sur $K$. En particulier, énoncer la condition en termes de similitude et de matrice diagonale.

### VERSO
**Équivalences**
Les assertions suivantes sont équivalentes :

(i) $A$ est diagonalisable sur $K$ : $\exists P \in GL_n(K), P^{-1}AP = D$ diagonale.

(ii) Il existe une base de $K^n$ formée de vecteurs propres de $A$.

(iii) $\chi_A$ est scindé sur $K$ et $\forall \lambda \in Sp(A), m_g(\lambda) = m_a(\lambda)$.

(iv) $m_A$ est scindé à racines simples sur $K$.

**Procédé de diagonalisation**
1.  Calculer $\chi_A(X)$ et le factoriser sur $K$.
2.  Pour chaque valeur propre $\lambda_i$ : calculer une base de $\ker(A - \lambda_i I_n)$.
3.  Vérifier que $\sum \dim \ker(A - \lambda_i I) = n$.
4.  La matrice de passage $P$ a pour colonnes les vecteurs propres.
5.  $P^{-1}AP = \text{diag}(\lambda_1, \dots, \lambda_n)$ (avec répétitions selon les multiplicités).

**Résultats sur les puissances**
Si $A = P D P^{-1}$ avec $D = \text{diag}(d_1, \dots, d_n)$, alors :
$$ A^k = P D^k P^{-1}, \quad D^k = \text{diag}(d_1^k, \dots, d_n^k) $$

### 
**Subtilités**
*   La diagonalisation dépend du corps $K$ : une matrice réelle peut être diagonalisable sur $\mathbb{C}$ mais pas sur $\mathbb{R}$.
*   La matrice de passage $P$ n'est pas unique : elle dépend du choix des vecteurs propres (normalisation, ordre).

**Pièges classiques**
*   Confondre $P^{-1}AP = D$ et $PAP^{-1} = D$ : les deux définitions coexistent selon les auteurs.
*   Oublier de vérifier que les colonnes de $P$ forment bien une base (i.e., $P$ inversible).
*   En calcul : ne pas oublier de calculer $P^{-1}$ pour obtenir la décomposition complète.

---

## FLASHCARD 162 — À connaître 49 : Diagonalisation à $\varepsilon$-près

### RECTO
**À connaître 49 : Diagonalisation à $\varepsilon$-près (densité des matrices diagonalisables)**

Soit $K = \mathbb{C}$ (ou tout corps infini), $n \ge 1$.

**Question :** Énoncer le théorème de densité des matrices diagonalisables dans $M_n(\mathbb{C})$, et en donner une conséquence pratique (approximation).

### VERSO
**Théorème**
L'ensemble des matrices diagonalisables sur $\mathbb{C}$ est dense dans $M_n(\mathbb{C})$ (pour toute norme).

Autrement dit : pour toute $A \in M_n(\mathbb{C})$ et tout $\varepsilon > 0$, il existe $A_\varepsilon \in M_n(\mathbb{C})$ diagonalisable telle que $\|A - A_\varepsilon\| < \varepsilon$.

**Idée de construction**
Si $A$ est trigonalisable (ce qui est toujours le cas sur $\mathbb{C}$), on écrit $A = PTP^{-1}$ avec $T$ triangulaire supérieure. On perturbe légèrement les entrées diagonales de $T$ pour les rendre distinctes : $T_\varepsilon = T + \varepsilon' D$ avec $D$ choisie pour rendre les valeurs propres distinctes. Alors $A_\varepsilon = P T_\varepsilon P^{-1}$ est diagonalisable (valeurs propres distinctes) et $\|A - A_\varepsilon\| \to 0$.

**Conséquences pratiques**
*   **Identités polynomiales :** Si une identité $P(A) = 0$ est vérifiée pour toutes les matrices diagonalisables, elle est vraie pour toutes les matrices (par densité et continuité).
*   **det et tr :** Des formules prouvées sur les matrices diagonalisables s'étendent par densité/continuité.
*   **Commutant :** L'étude du commutant d'une matrice peut se ramener au cas diagonalisable par densité.

**Sur $\mathbb{R}$**
Sur $\mathbb{R}$, les matrices diagonalisables (sur $\mathbb{R}$) ne sont pas denses dans $M_n(\mathbb{R})$ en général (les matrices sans valeurs propres réelles forment un ouvert non vide pour $n \ge 2$). Mais les matrices diagonalisables sur $\mathbb{C}$ (= trigonalisables sur $\mathbb{C}$) restent denses.

### 
**Subtilités**
*   Ce résultat est utilisé pour transférer des propriétés du cas diagonalisable au cas général, par un argument de densité/continuité.
*   La densité est relative à la topologie de $M_n(\mathbb{C}) \simeq \mathbb{C}^{n^2}$ (toutes les normes sont équivalentes en dimension finie).
*   Sur $\mathbb{R}$, il faut être plus prudent : les matrices à spectre réel simple (diagonalisables sur $\mathbb{R}$) forment un sous-ensemble ouvert mais pas dense.

**Pièges classiques**
*   Ne pas confondre "dense sur $\mathbb{C}$" et "dense sur $\mathbb{R}$".
*   La perturbation doit être faite de façon à préserver la trigonalisabilité (sur $\mathbb{C}$, c'est automatique).
*   En utilisant la densité pour prouver une identité, vérifier que l'identité est continue en les coefficients de la matrice.

---

## FLASHCARD 163 — À connaître 50 : Décomposition de Dunford

### RECTO
**À connaître 50 : Décomposition de Dunford**

Soit $K$ un corps, $E$ un $K$-ev de dimension finie $n$, $f \in \mathcal{L}(E)$. On suppose $\chi_f$ scindé sur $K$.

**Question :** Énoncer le théorème de décomposition de Dunford de $f = D + N$. Préciser les propriétés de $D$ et $N$, leur commutativité, et leur expression en termes de polynômes en $f$.

### VERSO
**Théorème de Dunford**
Sous l'hypothèse que $\chi_f$ est scindé sur $K$, il existe un unique couple $(D, N)$ d'endomorphismes de $E$ tel que :

1.  $f = D + N$
2.  $D$ est diagonalisable (sur $K$)
3.  $N$ est nilpotent
4.  $D$ et $N$ commutent : $D \circ N = N \circ D$

De plus, $D$ et $N$ sont des polynômes en $f$ (i.e., $D = P(f)$ et $N = Q(f)$ pour certains $P, Q \in K[X]$).

**Construction**
Soit $\chi_f = \prod_{i=1}^k (X - \lambda_i)^{n_i}$ (valeurs propres distinctes $\lambda_1, \dots, \lambda_k$).

Par le lemme de décomposition des noyaux : $E = \bigoplus_{i=1}^k C_{\lambda_i}$ où $C_{\lambda_i} = \ker(f - \lambda_i id)^{n_i}$.

Notons $\pi_i$ la projection sur $C_{\lambda_i}$ parallèlement aux autres (polynôme en $f$). Alors :
$$ D = \sum_{i=1}^k \lambda_i \pi_i, \quad N = f - D = \sum_{i=1}^k (f - \lambda_i id) \circ \pi_i $$

$D$ est diagonalisable (agit comme $\lambda_i$ sur $C_{\lambda_i}$), $N$ est nilpotent (agit comme $(f - \lambda_i id)|_{C_{\lambda_i}}$ qui est nilpotent).

**Unicité**
Si $f = D' + N'$ avec $D'$ diagonalisable, $N'$ nilpotent, $D'N' = N'D'$ : alors $D' = D$ et $N' = N$.

### 
**Subtilités**
*   **Hypothèse clé :** $\chi_f$ scindé sur $K$ est indispensable. Sur $\mathbb{R}$, si $f$ a des valeurs propres complexes non réelles, la décomposition de Dunford n'existe pas sur $\mathbb{R}$.
*   $D$ et $N$ sont des polynômes en $f$ : cela implique qu'ils commutent avec tout endomorphisme qui commute avec $f$.
*   La décomposition de Dunford généralise la diagonalisation : si $f$ est déjà diagonalisable, $N=0$.

**Application**
*   Calcul de $f^k$ : $f^k = (D+N)^k = \sum_{j=0}^{\nu-1} \binom{k}{j} D^{k-j} N^j$ (car $D$ et $N$ commutent, et $N^\nu = 0$).
*   Exponentielle : $e^{tA} = e^{tD} e^{tN}$ où $e^{tN} = \sum_{j=0}^{\nu-1} \frac{t^j}{j!} N^j$ (série finie).

**Pièges classiques**
*   Confondre décomposition de Dunford (sur $K$ si $\chi_f$ scindé) et forme de Jordan (sur corps algébriquement clos, donne plus d'informations).
*   Oublier l'unicité : il n'y a qu'une seule décomposition de Dunford.
*   En exam : utiliser la décomposition de Dunford pour calculer des puissances ou des exponentielles de matrices.

---

## FLASHCARD 164 — Théorème 58 : Représentation des formes linéaires (espace euclidien)

### RECTO
**Théorème 58 : Théorème de représentation des formes linéaires (Riesz en dimension finie)**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace euclidien (resp. hermitien) de dimension finie $n \ge 1$.

**Question :** Énoncer le théorème de représentation des formes linéaires continues sur $E$ par un produit scalaire. Préciser les hypothèses et la conclusion.

### VERSO
**Hypothèses**
*   $(E, \langle \cdot, \cdot \rangle)$ espace euclidien ($\mathbb{R}$-ev de dimension finie muni d'un produit scalaire) ou hermitien ($\mathbb{C}$-ev de dimension finie muni d'un produit hermitien)
*   $\varphi : E \to \mathbb{K}$ forme linéaire (resp. semi-linéaire dans le cas hermitien)

**Énoncé formel**
**Théorème :** Il existe un unique vecteur $a \in E$ tel que :
$$ \forall x \in E, \quad \varphi(x) = \langle x, a \rangle $$

**Démonstration**
*   **Existence :** Soit $B = (e_1, \dots, e_n)$ une base orthonormée de $E$. Pour tout $x = \sum x_i e_i$ :
    $$ \varphi(x) = \sum_{i=1}^n x_i \varphi(e_i) $$
    Posons $a = \sum_{i=1}^n \overline{\varphi(e_i)} e_i$ (dans le cas hermitien, $\varphi(e_i)$ dans le cas réel). Alors $\langle x, a \rangle = \sum x_i \overline{\langle e_i, a \rangle}$... [calcul direct montre $\varphi(x) = \langle x, a \rangle$].
*   **Unicité :** Si $\langle x, a \rangle = \langle x, a' \rangle$ pour tout $x$, alors $\langle x, a - a' \rangle = 0$ pour tout $x$, donc $a = a'$.

**Isomorphisme**
L'application $\Phi : E \to E^*, a \mapsto (x \mapsto \langle x, a \rangle)$ est un isomorphisme ($\mathbb{R}$-linéaire dans le cas réel, $\mathbb{R}$-linéaire ou anti-linéaire dans le cas hermitien).

### 
**Subtilités**
*   En dimension finie, toutes les formes linéaires sont automatiquement continues, donc la continuité n'est pas une hypothèse supplémentaire.
*   **Dans le cas hermitien :** $\varphi(x) = \langle x, a \rangle$ est $\mathbb{C}$-linéaire en $x$ (si le produit hermitien est linéaire à gauche) ou $\mathbb{C}$-antilinéaire selon la convention. Bien préciser la convention.
*   Le théorème de Riesz en dimension infinie (espaces de Hilbert) est beaucoup plus profond et nécessite la complétude.

**Pièges classiques**
*   En dimension infinie : le théorème de Riesz pour les espaces de Hilbert nécessite l'hypothèse que $\varphi$ est continue (i.e., bornée). En dimension finie, c'est automatique.
*   Confusion dans le cas hermitien : $\varphi(x) = \langle x, a \rangle$ ou $\langle a, x \rangle$ selon la convention du produit hermitien (linéaire à gauche ou à droite).

---

## FLASHCARD 165 — Proposition 48 : Gram-Schmidt

### RECTO
**Proposition 48 : Procédé d'orthonormalisation de Gram-Schmidt**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace euclidien (ou hermitien) de dimension finie, et $(e_1, \dots, e_p)$ une famille libre de $E$.

**Question :** Énoncer le procédé de Gram-Schmidt. Donner les formules explicites et la propriété fondamentale.

### VERSO
**Énoncé**
Il existe une famille orthonormée $(f_1, \dots, f_p)$ telle que :
$$ \forall k \in \llbracket 1, p \rrbracket, \quad \text{Vect}(f_1, \dots, f_k) = \text{Vect}(e_1, \dots, e_k) $$

**Algorithme de Gram-Schmidt**
*   **Initialisation :** $u_1 = e_1$, $f_1 = \frac{u_1}{\|u_1\|}$.
*   **Récurrence :** Pour $k = 2, \dots, p$ :
    $$ u_k = e_k - \sum_{j=1}^{k-1} \langle e_k, f_j \rangle f_j $$
    $$ f_k = \frac{u_k}{\|u_k\|} $$
    (On soustrait la projection de $e_k$ sur $\text{Vect}(f_1, \dots, f_{k-1})$.)

**Justification que $u_k \neq 0$ :** Puisque $(e_1, \dots, e_k)$ est libre, $e_k \notin \text{Vect}(e_1, \dots, e_{k-1}) = \text{Vect}(f_1, \dots, f_{k-1})$, donc $u_k \neq 0$.

**Propriétés**
*   $(f_1, \dots, f_p)$ est orthonormée : $\langle f_i, f_j \rangle = \delta_{ij}$.
*   $\text{Vect}(f_1, \dots, f_k) = \text{Vect}(e_1, \dots, e_k)$ pour tout $k$.
*   La matrice de passage de $(e_i)$ à $(f_i)$ est triangulaire supérieure à diagonale strictement positive.

### 
**Subtilités**
*   Gram-Schmidt est constructif et donne une preuve de l'existence de bases orthonormées dans tout espace euclidien de dimension finie.
*   La matrice de passage triangulaire supérieure donne la décomposition QR : $A = QR$ où $Q$ est orthogonale et $R$ triangulaire supérieure.
*   Dans le cas hermitien, les formules sont identiques avec le produit hermitien.

**Pièges classiques**
*   Ne pas oublier de normaliser : $f_k = u_k / \|u_k\|$, ne pas arrêter à $u_k$.
*   Vérifier que $u_k \neq 0$ à chaque étape (condition de liberté).
*   L'ordre des vecteurs compte : deux ordres différents donnent des familles orthonormées différentes.

---

## FLASHCARD 166 — Proposition 49 : Projection orthogonale sur un sous-espace de dimension finie

### RECTO
**Proposition 49 : Projection orthogonale sur un sous-espace de dimension finie**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace euclidien (ou hermitien) de dimension finie, $F$ un sous-espace vectoriel de $E$.

**Question :** Définir la projection orthogonale sur $F$. Donner la décomposition $E = F \oplus F^\perp$, la formule de la projection, et ses propriétés.

### VERSO
**Définition et décomposition**
**Théorème :** $E = F \oplus F^\perp$ où $F^\perp = \{x \in E \mid \forall y \in F, \langle x, y \rangle = 0\}$.

En particulier : $\dim F + \dim F^\perp = \dim E$, et $(F^\perp)^\perp = F$.

**Projection orthogonale**
La projection orthogonale sur $F$ est le projecteur $p_F : E \to E$ tel que :
*   $p_F(x) \in F$ pour tout $x$
*   $x - p_F(x) \in F^\perp$ pour tout $x$

**Formule explicite (via une base orthonormée de $F$)**
Si $(e_1, \dots, e_k)$ est une base orthonormée de $F$ :
$$ p_F(x) = \sum_{i=1}^k \langle x, e_i \rangle e_i $$

**Propriétés fondamentales**
*   $p_F$ est linéaire, $p_F^2 = p_F$ (projecteur), $p_F = p_F^*$ (autoadjoint).
*   $\text{Im}(p_F) = F$, $\ker(p_F) = F^\perp$.
*   $\|p_F(x)\| \le \|x\|$ pour tout $x$ (projecteur de norme $\le 1$).
*   **Meilleure approximation :** $p_F(x)$ est l'élément de $F$ le plus proche de $x$ :
    $$ \forall y \in F, \quad \|x - p_F(x)\| \le \|x - y\| $$

### 
**Subtilités**
*   La décomposition $E = F \oplus F^\perp$ est propre à la géométrie euclidienne : elle nécessite un produit scalaire (pas seulement une structure d'ev).
*   En dimension infinie (espaces de Hilbert) : la décomposition $H = F \oplus F^\perp$ reste vraie si $F$ est fermé, mais pas pour n'importe quel sous-espace (un sous-espace dense non fermé a $F^\perp = \{0\}$).
*   La propriété de meilleure approximation caractérise $p_F(x)$ sans utiliser de base.

**Pièges classiques**
*   La formule $\sum \langle x, e_i \rangle e_i$ n'est valable que si $(e_i)$ est orthonormée (pas juste orthogonale).
*   En dimension finie, $F^{\perp\perp} = F$ toujours. En dimension infinie, $F^{\perp\perp} = \bar{F}$.
*   Ne pas confondre "projecteur orthogonal" (autoadjoint) et "projecteur" (idempotent non nécessairement autoadjoint).

---

## FLASHCARD 167 — Proposition 50

### RECTO
**Proposition 50 : Propriétés du complément orthogonal**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace euclidien de dimension finie, $F, G$ des sous-espaces de $E$.

**Question :** Énoncer les propriétés fondamentales du complément orthogonal : $\dim F^\perp$, $(F^\perp)^\perp$, $(F+G)^\perp$, $(F \cap G)^\perp$.

### VERSO
**Propriétés**
1.  $\dim F^\perp = \dim E - \dim F$
2.  $(F^\perp)^\perp = F$
3.  $(F + G)^\perp = F^\perp \cap G^\perp$
4.  $(F \cap G)^\perp = F^\perp + G^\perp$
5.  $F \subset G \implies G^\perp \subset F^\perp$

**Démonstrations**
*   1 et 2 : Découlent de $E = F \oplus F^\perp$ et $\dim E = \dim F + \dim F^\perp$. Puis $(F^\perp)^\perp \supset F$ (par définition), et $\dim (F^\perp)^\perp = \dim E - \dim F^\perp = \dim F$, donc $(F^\perp)^\perp = F$.
*   3 : $x \in (F+G)^\perp \iff \langle x, y+z \rangle = 0 \ \forall y \in F, z \in G \iff x \in F^\perp \cap G^\perp$.
*   4 : $(F \cap G)^\perp = ((F^\perp)^\perp \cap (G^\perp)^\perp)^\perp$... Utiliser $F \cap G = (F^\perp + G^\perp)^\perp$ (déduit de 3 par orthogonalisation) et prendre le perp.

### 
**Subtilités**
*   En dimension finie, ces formules sont toutes exactes. En dimension infinie, (4) devient $(F \cap G)^\perp = \overline{F^\perp + G^\perp}$ (la somme n'est pas nécessairement fermée).
*   La propriété (2) $(F^\perp)^\perp = F$ est spécifique à la dimension finie (ou aux sous-espaces fermés en Hilbert).

**Pièges classiques**
*   En dimension infinie, $F^\perp + G^\perp$ peut ne pas être fermé, donc $(F \cap G)^\perp \neq F^\perp + G^\perp$ en général.
*   Vérifier (3) et (4) : les deux identités sont duales l'une de l'autre (De Morgan orthogonal).

---

## FLASHCARD 168 — Théorème 59 : Distance à un sous-espace

### RECTO
**Théorème 59 : Distance à un sous-espace et projection orthogonale**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace euclidien de dimension finie, $F$ un sous-espace de $E$, $x \in E$.

**Question :** Définir $d(x, F)$ et montrer que cette distance est atteinte en un unique point, donner ce point explicitement.

### VERSO
**Définition**
$$ d(x, F) = \inf_{y \in F} \|x - y\| $$

**Théorème**
La distance $d(x, F)$ est atteinte en un unique point : la projection orthogonale $p_F(x)$.

$$ d(x, F) = \|x - p_F(x)\| $$

et
$$ \forall y \in F, \quad y \neq p_F(x) \implies \|x - y\| > \|x - p_F(x)\| $$

**Démonstration**
Pour $y \in F$ quelconque :
$$ \|x - y\|^2 = \|(x - p_F(x)) + (p_F(x) - y)\|^2 = \|x - p_F(x)\|^2 + 2\langle x - p_F(x), p_F(x) - y \rangle + \|p_F(x) - y\|^2 $$
Or $x - p_F(x) \in F^\perp$ et $p_F(x) - y \in F$, donc $\langle x - p_F(x), p_F(x) - y \rangle = 0$.
Donc $\|x - y\|^2 = \|x - p_F(x)\|^2 + \|p_F(x) - y\|^2 \ge \|x - p_F(x)\|^2$, avec égalité ssi $y = p_F(x)$. $\square$

**Formule explicite**
Si $(e_1, \dots, e_k)$ est une base orthonormée de $F$ :
$$ d(x, F)^2 = \|x\|^2 - \sum_{i=1}^k |\langle x, e_i \rangle|^2 $$

### 
**Subtilités**
*   Le caractère euclidien (produit scalaire) est essentiel : dans un espace normé quelconque, la distance à un sous-espace peut ne pas être atteinte ou ne pas être unique.
*   La formule $d(x, F)^2 = \|x\|^2 - \|p_F(x)\|^2$ est la relation de Pythagore : $\|x\|^2 = \|p_F(x)\|^2 + \|x - p_F(x)\|^2$.

**Pièges classiques**
*   Oublier l'unicité : dans un espace euclidien, le point le plus proche est toujours unique (contrairement aux espaces normés généraux).
*   La distance est exprimée par $\|x - p_F(x)\|$, pas $\|p_F(x)\|$.

---

## FLASHCARD 169 — À connaître 51 : Caractérisations des projecteurs orthogonaux

### RECTO
**À connaître 51 : Caractérisations des projecteurs orthogonaux**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace euclidien de dimension finie, $p \in \mathcal{L}(E)$.

**Question :** Donner des conditions équivalentes pour que $p$ soit un projecteur orthogonal.

### VERSO
**Équivalences**
Les assertions suivantes sont équivalentes :

(i) $p$ est la projection orthogonale sur $F = \text{Im}(p)$ (i.e., $p = p_F$ pour un certain sous-espace $F$).

(ii) $p$ est un projecteur ($p^2 = p$) et autoadjoint ($p^* = p$, i.e., $\langle p(x), y \rangle = \langle x, p(y) \rangle$ pour tout $x, y$).

(iii) $p$ est un projecteur et $\ker(p) = \text{Im}(p)^\perp$.

(iv) $p$ est un projecteur et $\|p\| \le 1$ (norme opérateur).

(v) $p$ est un projecteur et $\|p(x)\| \le \|x\|$ pour tout $x \in E$.

**Matrice d'un projecteur orthogonal**
Dans une base orthonormée, la matrice de $p_F$ est symétrique ($\mathbb{R}$) ou hermitienne ($\mathbb{C}$), idempotente, et ses valeurs propres sont dans $\{0, 1\}$.

**Décomposition spectrale**
$p_F$ a pour valeurs propres $1$ (sur $F$) et $0$ (sur $F^\perp$), donc est diagonalisable avec spectre $\{0, 1\}$.

### 
**Subtilités**
*   L'autoadjonction ($p = p^*$) est la condition qui distingue un projecteur orthogonal d'un projecteur oblique.
*   Dans une base non orthonormée, la matrice d'un projecteur orthogonal n'est pas nécessairement symétrique.
*   En dimension infinie, les conditions (iv) et (v) ne suffisent plus sans hypothèse de fermeture sur $\text{Im}(p)$.

**Pièges classiques**
*   Un projecteur ($p^2 = p$) n'est pas nécessairement orthogonal : il faut en plus $p = p^*$ (ou une condition équivalente).
*   Confondre "projecteur de norme 1" et "projecteur orthogonal" : tout projecteur orthogonal non nul a norme opérateur égale à 1, mais la réciproque n'est pas évidente.

---

## FLASHCARD 170 — À connaître 52 : Inégalité d'Hadamard

### RECTO
**À connaître 52 : Inégalité d'Hadamard**

Soit $A \in M_n(\mathbb{R})$ (ou $M_n(\mathbb{C})$), de colonnes $C_1, \dots, C_n \in \mathbb{R}^n$ (ou $\mathbb{C}^n$).

**Question :** Énoncer l'inégalité d'Hadamard sur le déterminant. Donner les conditions d'égalité.

### VERSO
**Énoncé formel**
**Inégalité d'Hadamard :**
$$ |\det(A)| \le \prod_{j=1}^n \|C_j\| $$
où $\|C_j\| = \sqrt{\sum_{i=1}^n |a_{ij}|^2}$ est la norme euclidienne de la $j$-ième colonne.

**Condition d'égalité**
$|\det(A)| = \prod_{j=1}^n \|C_j\|$ si et seulement si les colonnes $C_1, \dots, C_n$ sont orthogonales deux à deux (ou si l'une d'elles est nulle, auquel cas les deux membres sont nuls).

**Démonstration (esquisse)**
Appliquer Gram-Schmidt aux colonnes de $A$ : $A = QR$ où $Q$ est orthogonale et $R$ triangulaire supérieure. Alors $|\det A| = |\det R| = \prod |R_{ii}|$.
Par Gram-Schmidt, $R_{ii} = \|C_i - \text{proj sur prec.}\| \le \|C_i\|$.
Donc $|\det A| \le \prod \|C_i\|$. L'égalité a lieu si et seulement si chaque $C_i$ est orthogonal aux $C_1, \dots, C_{i-1}$.

**Autre démonstration :** Utiliser l'inégalité de Cauchy-Schwarz dans le développement de $\det$ par multilinéarité.

**Interprétation géométrique**
$|\det(A)|$ est le volume du parallélépipède engendré par les colonnes. Il est majoré par le produit des normes (volume du parallélépipède rectangle).

### 
**Subtilités**
*   L'inégalité est valable pour les colonnes ou les lignes (par transposition et $|\det A| = |\det A^T|$).
*   La condition d'égalité correspond exactement au cas où la matrice $A$ est à colonnes orthogonales (matrice orthogonale à une normalisation près).

**Pièges classiques**
*   Ne pas oublier que $\|C_j\|$ est la norme euclidienne, pas la norme infinie ou d'autres normes.
*   L'inégalité donne une borne supérieure sur $|\det A|$ — utile pour les estimations.

---

## FLASHCARD 171 — À connaître 53

### RECTO
**À connaître 53 : Adjoint d'un endomorphisme**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace euclidien (ou hermitien) de dimension finie, $f \in \mathcal{L}(E)$.

**Question :** Définir l'adjoint $f^*$ de $f$. Donner son existence, son unicité, sa matrice dans une base orthonormée, et ses propriétés algébriques.

### VERSO
**Définition et existence**
**Théorème :** Il existe un unique endomorphisme $f^* \in \mathcal{L}(E)$, appelé adjoint de $f$, tel que :
$$ \forall x, y \in E, \quad \langle f(x), y \rangle = \langle x, f^*(y) \rangle $$

**Existence :** Pour tout $y \in E$, l'application $x \mapsto \langle f(x), y \rangle$ est une forme linéaire sur $E$. Par le théorème de représentation de Riesz (dim. finie), il existe un unique $f^*(y)$ tel que $\langle f(x), y \rangle = \langle x, f^*(y) \rangle$.

**Matrice dans une base orthonormée**
Si $B$ est une base orthonormée de $E$ :
$$ \text{Mat}_B(f^*) = \overline{\text{Mat}_B(f)}^T = {}^t \bar{A} $$
(transposée conjuguée de la matrice de $f$). Dans le cas réel : $\text{Mat}(f^*) = {}^t A$.

**Propriétés algébriques**
*   **Involutivité :** $(f^*)^* = f$
*   **Linéarité :** $(\lambda f + \mu g)^* = \bar{\lambda} f^* + \bar{\mu} g^*$
*   **Composition :** $(f \circ g)^* = g^* \circ f^*$
*   **Déterminant :** $\det(f^*) = \overline{\det(f)}$
*   **Spectre :** $Sp(f^*) = \overline{Sp(f)}$

**Endomorphismes remarquables**
*   $f^* = f$ : Autoadjoint (symétrique si réel, hermitien si complexe)
*   $f^* = -f$ : Antisymétrique (antisymétrique/antihermitien)
*   $f^* \circ f = f \circ f^* = id$ : Orthogonal (isométrie si réel, unitaire si complexe)
*   $f^* \circ f = f \circ f^*$ : Normal

### 
**Subtilités**
*   La matrice de $f^*$ dans une base non orthonormée n'est pas simplement ${}^t A$ : il faut tenir compte de la matrice de Gram du produit scalaire.
*   Dans le cas hermitien : $(\lambda f)^* = \bar{\lambda} f^*$ (anti-linéarité en $\lambda$), pas $\lambda f^*$.
*   L'adjoint est défini par la structure euclidienne/hermitienne — sans produit scalaire, il n'y a pas d'adjoint canonique.

**Pièges classiques**
*   Dans une base non orthonormée : si $G$ est la matrice de Gram de $\langle \cdot, \cdot \rangle$, alors $\text{Mat}(f^*) = G^{-1} {}^t \bar{A} G$.
*   Confondre $f^*$ (adjoint) et $f^{-1}$ (inverse) : pour les isométries, $f^* = f^{-1}$, mais en général ce sont des objets distincts.
*   Ne pas oublier la conjugaison dans le cas hermitien.

---

## FLASHCARD 172 — À connaître 54 : Projection sur un convexe fermé

### RECTO
**À connaître 54 : Projection sur un convexe fermé (espace de Hilbert / espace euclidien)**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace de Hilbert réel (en particulier, un espace euclidien de dimension finie), $C \subset E$ un ensemble convexe fermé non vide.

**Question :** Énoncer le théorème d'existence et d'unicité de la projection sur $C$, et la caractérisation variationnelle.

### VERSO
**Théorème**
Soit $C$ un sous-ensemble convexe, fermé, non vide d'un espace de Hilbert réel $H$. Pour tout $x \in H$, il existe un unique $p_C(x) \in C$ tel que :
$$ \|x - p_C(x)\| = d(x, C) = \inf_{y \in C} \|x - y\| $$

**Caractérisation variationnelle**
$p = p_C(x)$ est l'unique élément de $C$ tel que :
$$ \forall y \in C, \quad \langle x - p, y - p \rangle \le 0 $$
(En dimension finie : le vecteur $x - p$ fait un angle obtus avec tout vecteur $y - p$ pour $y \in C$.)

**Cas particulier : $C = F$ sous-espace fermé**
Si $C = F$ est un sous-espace vectoriel fermé, la condition $\langle x - p_F(x), y \rangle \le 0$ pour tout $y \in F$ et $-y \in F$ donne $\langle x - p_F(x), y \rangle = 0$ pour tout $y \in F$, ce qui redonne la projection orthogonale.

**Application en dimension finie**
En dimension finie (espace euclidien), tout convexe fermé est automatiquement complet (fermé = compact si borné), et le théorème s'applique. L'unique point le plus proche de $x$ dans $C$ est $p_C(x)$.

### 
**Subtilités**
*   En dimension infinie, la complétude (Hilbert) est indispensable : dans un espace pré-hilbertien non complet, la projection peut ne pas exister.
*   La convexité est indispensable pour l'unicité : sans convexité, la distance peut être atteinte en plusieurs points.
*   La fermeture est indispensable pour l'existence : sans fermeture, la distance peut ne pas être atteinte.

**Pièges classiques**
*   Confondre "convexe fermé" (projection existe et est unique) et "sous-espace fermé" (projection orthogonale, cas linéaire).
*   La caractérisation $\langle x - p, y - p \rangle \le 0$ est une inégalité (pas une égalité) : c'est la différence fondamentale avec le cas linéaire.

---

## FLASHCARD 173 — À connaître 55 : Inégalité de Bessel, famille orthonormée totale

### RECTO
**À connaître 55 : Inégalité de Bessel et famille orthonormée totale**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace euclidien (ou de Hilbert), $(e_i)_{i \in I}$ une famille orthonormée (finie ou dénombrable) de $E$.

**Question :** Énoncer l'inégalité de Bessel. Définir une famille totale (base hilbertienne). Énoncer la relation de Parseval.

### VERSO
**Inégalité de Bessel**
Pour tout $x \in E$ et toute famille orthonormée $(e_1, \dots, e_n)$ :
$$ \sum_{i=1}^n |\langle x, e_i \rangle|^2 \le \|x\|^2 $$

**Démonstration :** $0 \le \|x - p_F(x)\|^2 = \|x\|^2 - \|p_F(x)\|^2 = \|x\|^2 - \sum |\langle x, e_i \rangle|^2$.

**Famille orthonormée totale (base hilbertienne)**
Une famille orthonormée $(e_i)$ est dite totale (ou base orthonormée) si :
$$ \forall x \in E, \quad x = \sum_i \langle x, e_i \rangle e_i $$
(en dimension finie, cela signifie que la famille est une base orthonormée de $E$).

**Relation de Parseval**
Si $(e_i)$ est une famille orthonormée totale :
$$ \forall x \in E, \quad \|x\|^2 = \sum_i |\langle x, e_i \rangle|^2 $$
C'est l'égalité dans l'inégalité de Bessel.

**Équivalences (totale $\iff$...)**
$(e_i)$ est totale
$\iff \forall x \in E, \|x\|^2 = \sum |\langle x, e_i \rangle|^2$
$\iff \forall x, \langle x, e_i \rangle = 0 \ \forall i \Rightarrow x = 0$
$\iff \text{Vect}(e_i)$ est dense dans $E$.

### 
**Subtilités**
*   En dimension finie, "famille orthonormée de cardinal $n = \dim E$" $\iff$ "totale" $\iff$ "base orthonormée".
*   En dimension infinie, une famille orthonormée peut être totale sans être une base au sens algébrique (combinaisons finies) : la convergence est au sens de la norme.
*   L'inégalité de Bessel est valable pour toute famille orthonormée, même non totale.

**Pièges classiques**
*   Oublier que Parseval est l'égalité de Bessel, valable uniquement pour les familles totales.
*   Confondre "base orthonormée" (totale) et "famille orthonormée" (Bessel mais pas nécessairement Parseval).

---

## FLASHCARD 174 — Proposition 51

### RECTO
**Proposition 51 : Matrice d'une isométrie dans une base orthonormée**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace euclidien de dimension finie $n$, $f \in \mathcal{L}(E)$, $B$ une base orthonormée de $E$, $A = \text{Mat}_B(f)$.

**Question :** Caractériser matriciellement les isométries (endomorphismes orthogonaux) et donner leurs propriétés fondamentales.

### VERSO
**Définition**
$f$ est une isométrie (endomorphisme orthogonal) si $\forall x \in E, \|f(x)\| = \|x\|$, ou de façon équivalente :
$$ \forall x, y \in E, \quad \langle f(x), f(y) \rangle = \langle x, y \rangle $$

**Caractérisation matricielle**
Dans une base orthonormée $B$ : $f$ est une isométrie $\iff A = \text{Mat}_B(f)$ est orthogonale, i.e., ${}^t A A = I_n$ (équivalent : $A {}^t A = I_n$, équivalent : $A^{-1} = {}^t A$).

On note $O_n(\mathbb{R}) = \{A \in M_n(\mathbb{R}) \mid {}^t A A = I_n\}$ le groupe orthogonal.

**Propriétés des matrices orthogonales**
*   $\det(A) = \pm 1$
*   Les colonnes de $A$ forment une base orthonormée de $\mathbb{R}^n$.
*   Les lignes de $A$ forment une base orthonormée de $\mathbb{R}^n$.
*   Les valeurs propres (réelles ou complexes) sont de module $1$.
*   $SO_n(\mathbb{R}) = \{A \in O_n \mid \det A = 1\}$ est le groupe spécial orthogonal (rotations).

### 
**Subtilités**
*   La caractérisation ${}^t A A = I_n$ dépend de la base choisie : elle est valable en base orthonormée uniquement.
*   Dans le cas hermitien : les isométries unitaires vérifient $A^* A = I_n$ ($A^* = {}^t \bar{A}$).
*   En dimension infinie : les isométries peuvent ne pas être surjectives (isométries partielles).

**Pièges classiques**
*   ${}^t A A = I_n \not\Rightarrow A {}^t A = I_n$ en général... si $A$ est carrée, les deux sont équivalents. Mais en dimension infinie ou pour des matrices rectangulaires, il faut préciser.
*   Vérifier que la base est orthonormée avant d'écrire ${}^t A A = I_n$.
*   Ne pas confondre $O_n$ (groupe orthogonal, $\det = \pm 1$) et $SO_n$ (rotations, $\det = 1$).

---

## FLASHCARD 175 — Lemme 8 : Lemme de stabilité

### RECTO
**Lemme 8 (Lemme de stabilité) : Stabilité du complément orthogonal par une isométrie**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace euclidien de dimension finie, $f \in \mathcal{L}(E)$ une isométrie, et $F$ un sous-espace de $E$ stable par $f$.

**Question :** Montrer que $F^\perp$ est aussi stable par $f$.

### VERSO
**Énoncé**
Si $f$ est une isométrie et $F$ est un sous-espace stable par $f$ (i.e., $f(F) \subset F$), alors $F^\perp$ est stable par $f$ (i.e., $f(F^\perp) \subset F^\perp$).

**Démonstration**
Soit $x \in F^\perp$ et $y \in F$. On veut montrer $\langle f(x), y \rangle = 0$.

Comme $f$ est une isométrie, $f$ est bijective. En particulier, $f(F) = F$ (car $f(F) \subset F$ et $f$ est injective, donc $\dim f(F) = \dim F$, et $f(F) \subset F$ implique $f(F) = F$).

Donc $y \in F$ implique $y = f(z)$ pour un certain $z \in F$.

$$ \langle f(x), y \rangle = \langle f(x), f(z) \rangle = \langle x, z \rangle = 0 $$

(car $f$ est une isométrie : $\langle f(x), f(z) \rangle = \langle x, z \rangle$, et $x \in F^\perp, z \in F$). $\square$

**Corollaire**
Si $f$ est une isométrie et $F$ est stable par $f$, alors l'endomorphisme induit $f|_F$ est une isométrie de $F$, et $f|_{F^\perp}$ est une isométrie de $F^\perp$.

### 
**Subtilités**
*   La bijectivité de $f$ (qui découle de l'isométrie en dimension finie) est essentielle pour avoir $f(F) = F$.
*   En dimension infinie, une isométrie peut être non surjective (décalage unilatéral), et le lemme peut tomber en défaut.
*   Ce lemme est la clé de la réduction des isométries (Prop. 52) : on peut orthogonaliser les sous-espaces stables.

**Pièges classiques**
*   Oublier que "$f(F) \subset F$ et $f$ injective" donne $f(F) = F$ (en dimension finie) — c'est nécessaire pour la démonstration.
*   Ne pas confondre "stable par $f$" ($f(F) \subset F$) et "stable par $f$ et $f^{-1}$" ($f(F) = F$) : en dimension finie, les deux sont équivalents pour $f$ inversible.

---

## FLASHCARD 176 — Proposition 52 : Réduction des isométries

### RECTO
**Proposition 52 : Réduction des isométries en dimension finie**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace euclidien réel de dimension finie $n$, $f \in \mathcal{L}(E)$ une isométrie.

**Question :** Énoncer le théorème de réduction des isométries : décomposition de $E$ en sous-espaces stables de dimension 1 ou 2, forme canonique de la matrice dans une base orthonormée adaptée.

### VERSO
**Théorème**
Toute isométrie $f$ de $E$ (réel, dimension finie) admet une base orthonormée dans laquelle sa matrice est bloc-diagonale de la forme :
$$ \begin{pmatrix} \pm 1 & & & & & \\ & \ddots & & & & \\ & & \pm 1 & & & \\ & & & R_{\theta_1} & & \\ & & & & \ddots & \\ & & & & & R_{\theta_k} \end{pmatrix} $$
où $R_\theta = \begin{pmatrix} \cos \theta & -\sin \theta \\ \sin \theta & \cos \theta \end{pmatrix}$ est une matrice de rotation d'angle $\theta \in (0, \pi)$.

**Description des blocs**
*   **Blocs $1 \times 1$ :** $+1$ (vecteurs propres pour $\lambda = 1$) ou $-1$ (vecteurs propres pour $\lambda = -1$).
*   **Blocs $2 \times 2$ :** rotations d'angle $\theta \in (0, \pi)$ (correspondant aux valeurs propres complexes $e^{\pm i \theta}$).

**Conséquence**
*   $f$ est une rotation ($\det f = 1$) $\iff$ le nombre de blocs $(-1)$ est pair.
*   $f$ est un retournement ($\det f = -1$) $\iff$ le nombre de blocs $(-1)$ est impair.

**Idée de démonstration**
Par récurrence sur $n$ :
1.  Chercher un sous-espace stable de dimension 1 ou 2 en étudiant les valeurs propres réelles ou les valeurs propres complexes par paires.
2.  Utiliser le Lemme 8 : $F^\perp$ est aussi stable, puis appliquer l'hypothèse de récurrence à $f|_{F^\perp}$.

### 
**Subtilités**
*   Cette réduction est spécifique aux espaces réels : sur $\mathbb{C}$, les isométries unitaires sont diagonalisables (valeurs propres sur le cercle unité).
*   Les angles $\theta \in (0, \pi)$ (pas $\{0, \pi\}$ qui donnent des blocs $1 \times 1$).
*   La forme bloc-diagonale est obtenue dans une base orthonormée : dans une base quelconque, la matrice n'a pas cette forme simple.

**Pièges classiques**
*   Sur $\mathbb{R}$ : une isométrie peut ne pas avoir de valeurs propres réelles (rotation en dimension 2 d'angle $\neq 0, \pi$). Donc "trigonalisable sur $\mathbb{R}$" ne s'applique pas en général.
*   Ne pas oublier les blocs $(-1)$ : une réflexion en dimension impaire est une isométrie avec un bloc $(-1)$.
*   En dimension 2 : les isométries directes sont des rotations, les isométries indirectes sont des réflexions — à connaître parfaitement.

---

## FLASHCARD 177 — À connaître 56

### RECTO
**À connaître 56 : Endomorphismes normaux**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace hermitien de dimension finie, $f \in \mathcal{L}(E)$.

**Question :** Définir un endomorphisme normal. Énoncer le théorème spectral pour les endomorphismes normaux en dimension finie sur $\mathbb{C}$.

### VERSO
**Définition**
$f$ est normal si $f \circ f^* = f^* \circ f$.

**Exemples d'endomorphismes normaux**
*   $f^* = f$ (Hermitien) : Oui
*   $f^* = -f$ (Antihermitien) : Oui
*   $f^* f = f f^* = id$ (Unitaire) : Oui
*   $f$ quelconque : Pas nécessairement

**Théorème spectral (cas normal, $\mathbb{C}$)**
**Théorème :** $f$ est normal (sur un espace hermitien de dimension finie sur $\mathbb{C}$) si et seulement si $f$ est unitairement diagonalisable : il existe une base orthonormée de $E$ formée de vecteurs propres de $f$.

**Propriétés des endomorphismes normaux**
*   $\ker(f) = \ker(f^*)$
*   $\|f(x)\| = \|f^*(x)\|$ pour tout $x$
*   Les espaces propres de $f$ associés à des valeurs propres distinctes sont orthogonaux.
*   $f$ est normal $\iff m_f$ est scindé à racines simples sur $\mathbb{C}$ (dans ce cas diagonalisable).

### 
**Subtilités**
*   Le théorème spectral pour les endomorphismes normaux est le résultat de diagonalisabilité le plus général en dimension finie sur $\mathbb{C}$ : tout normal est unitairement diagonalisable.
*   La base de diagonalisation est orthonormée, ce qui est plus fort que simplement "diagonalisable".
*   Sur $\mathbb{R}$ : les endomorphismes normaux (symétriques) sont diagonalisables orthogonalement (Théorème 60 spectral réel).

**Pièges classiques**
*   Confondre "diagonalisable" et "unitairement diagonalisable" : la différence est que la base doit être orthonormée pour le second.
*   Un endomorphisme hermitien est normal, mais un endomorphisme normal n'est pas nécessairement hermitien.

---

## FLASHCARD 178 — Théorème 60 : Théorème Spectral (réel)

### RECTO
**Théorème 60 — Théorème Spectral (réel)**

Soit $E$ un espace euclidien (de dimension finie $n$), et soit $u \in \mathcal{L}(E)$.

**Question :** Énoncer le théorème spectral pour les endomorphismes symétriques en dimension finie réelle, avec ses hypothèses exactes et sa conclusion complète.

### VERSO
**Hypothèses complètes**
*   $E$ est un espace euclidien : $\mathbb{R}$-espace vectoriel de dimension finie $n \ge 1$, muni d'un produit scalaire $\langle \cdot, \cdot \rangle$
*   $u \in \mathcal{L}(E)$ est un endomorphisme symétrique : $\forall x, y \in E, \langle u(x), y \rangle = \langle x, u(y) \rangle$

**Énoncé formel**
$$ u \text{ symétrique} \implies \exists B \text{ base orthonormée de } E \text{ formée de vecteurs propres de } u $$

Plus précisément :
$$ \exists \lambda_1, \dots, \lambda_n \in \mathbb{R}, \exists (e_1, \dots, e_n) \text{ BON de } E \text{ tels que } \forall i \in \llbracket 1, n \rrbracket, u(e_i) = \lambda_i e_i $$

Autrement dit, la matrice de $u$ dans $B = (e_1, \dots, e_n)$ est :
$$ \text{Mat}_B(u) = \text{diag}(\lambda_1, \dots, \lambda_n) \in M_n(\mathbb{R}) $$

**Traduction matricielle :** Toute matrice symétrique réelle $A \in S_n(\mathbb{R})$ est orthogonalement diagonalisable :
$$ \exists P \in O_n(\mathbb{R}), \exists D \in D_n(\mathbb{R}) \text{ telles que } A = P D P^{-1} = P D P^\top $$

**Propriétés spectrales garanties**
1.  Toutes les valeurs propres sont réelles : $Sp(u) \subset \mathbb{R}$
2.  Les sous-espaces propres sont deux à deux orthogonaux : $\lambda \neq \mu \implies E_\lambda(u) \perp E_\mu(u)$
3.  La somme des sous-espaces propres est directe et égale à $E$ : $E = \bigoplus_{\lambda \in Sp(u)} E_\lambda(u)$ (orthogonale)
4.  Le polynôme caractéristique est scindé à racines réelles sur $\mathbb{R}$

**Démonstration (Esquisse — 4 idées clés)**
1.  **Réalité des valeurs propres :** Si $\chi_u$ admet une racine complexe $\lambda = a+ib$, on travaille dans $\mathbb{C}^n$ par complexification et on montre via $\langle u(x), x \rangle = \langle x, u(x) \rangle$ que $\lambda \in \mathbb{R}$ (le produit scalaire hermitien révèle $b=0$).
2.  **Scindage du polynôme caractéristique :** Par récurrence sur $n$. Existence d'une valeur propre réelle (via le théorème de d'Alembert-Gauss appliqué à $\chi_u \in \mathbb{R}[X]$ et réalité des racines complexes par conjugaison + symétrie).
3.  **Stabilité de l'orthogonal :** Si $F$ est stable par $u$ (symétrique), alors $F^\perp$ est aussi stable par $u$.
4.  **Récurrence :** On prend $e_1$ vecteur propre unitaire, $F = \text{Vect}(e_1)^\perp$ est stable par $u$, et on applique l'hypothèse de récurrence à $u|_{F^\perp}$ qui est encore symétrique.

### 
**Subtilités**
*   **Dimension finie absolument nécessaire :** En dimension infinie (espace de Hilbert), un opérateur symétrique borné n'est pas nécessairement diagonalisable au sens classique — on dispose d'un théorème spectral mais avec une mesure spectrale, hors programme MP.
*   **$\mathbb{R}$ vs $\mathbb{C}$ :** Sur $\mathbb{C}$, le théorème analogue concerne les endomorphismes hermitiens ($u^* = u$) et les matrices hermitiennes $A^* = A$. Les matrices normales ($AA^* = A^*A$) sont unitairement diagonalisables sur $\mathbb{C}$ — mais ce résultat est hors programme MP strict.
*   **Orthogonal $\neq$ diagonalisable :** Une matrice orthogonale $P \in O_n(\mathbb{R})$ n'est pas nécessairement diagonalisable sur $\mathbb{R}$ (ex : rotation de $\pi/2$ en dim 2). Le théorème spectral ne s'applique pas aux matrices orthogonales en général.
*   **Les $\lambda_i$ ne sont pas nécessairement distincts :** Si $\lambda$ est valeur propre de multiplicité $k$, alors $\dim E_\lambda = k$ (le théorème garantit que la multiplicité géométrique = multiplicité algébrique pour les symétriques).
*   **La décomposition est orthogonale :** $E = E_{\lambda_1} \oplus^\perp \dots \oplus^\perp E_{\lambda_r}$.

**Extensions**
*   **Formes bilinéaires symétriques :** Le théorème spectral implique que toute forme quadratique sur un espace euclidien peut être diagonalisée dans une BON — lien direct avec la réduction des formes quadratiques.
*   **Endomorphismes symétriques positifs :** $u$ symétrique et $\forall x, \langle u(x), x \rangle \ge 0 \iff$ toutes les valeurs propres sont $\ge 0$ (voir Proposition 53).
*   **Décomposition spectrale (projecteurs) :** $u = \sum_{\lambda \in Sp(u)} \lambda \cdot p_\lambda$ où $p_\lambda$ est le projecteur orthogonal sur $E_\lambda(u)$.
*   **Fonctions de matrices :** Grâce au théorème spectral, on peut définir $f(u)$ pour toute fonction $f : Sp(u) \to \mathbb{R}$ par $f(u) = \sum \lambda f(\lambda) p_\lambda$, en particulier $\sqrt{u}$ pour $u$ symétrique positif.

**Pièges classiques**
*   **Confusion symétrique/orthogonal :** Appliquer le th. spectral à une matrice orthogonale. Seules les matrices symétriques $A^\top = A$ sont orthogonalement diagonalisables.
*   **Oublier l'orthogonalité de $P$ :** Écrire $A = PDP^{-1}$ sans préciser $P \in O_n(\mathbb{R})$. Il faut $P^\top P = I_n$, ce qui est la force du théorème.
*   **Multiplicité :** Croire que les valeurs propres sont toujours simples. Elles peuvent être multiples, mais $\dim E_\lambda =$ multiplicité algébrique.
*   **Corps de base :** Oublier que le théorème est faux pour $S_n(\mathbb{Q})$ ou en dimension infinie. Le théorème requiert $\mathbb{R}$ et dimension finie.
*   **Réciproque :** Croire que orthogonalement diagonalisable $\implies$ symétrique. C'est vrai ! La réciproque est vraie : $A = P D P^\top \implies A^\top = A$.

---

## FLASHCARD 179 — À connaître 57 : Endomorphismes symétriques — Caractérisation via la base

### RECTO
**À connaître 57 — Caractérisation matricielle des endomorphismes symétriques**

Soit $E$ un espace euclidien de dimension $n$, $B$ une base orthonormée de $E$, et $u \in \mathcal{L}(E)$.

**Question :** Quelle est la caractérisation matricielle de la symétrie de $u$ dans une BON ? Et comment varie la matrice si on change de BON ?

### VERSO
**Hypothèses complètes**
*   $E$ euclidien de dimension finie $n$
*   $B = (e_1, \dots, e_n)$ base orthonormée de $E$
*   $u \in \mathcal{L}(E)$, $A = \text{Mat}_B(u)$

**Énoncé formel**
$$ u \text{ symétrique} \iff A^\top = A \iff A \in S_n(\mathbb{R}) $$

**Attention :** Cette équivalence est valable uniquement si $B$ est orthonormée. Dans une base quelconque $C$, la matrice de $u$ n'est pas nécessairement symétrique même si $u$ l'est.

**Changement de BON :** Si $B'$ est une autre BON et $P$ la matrice de passage ($P \in O_n(\mathbb{R})$), alors :
$$ \text{Mat}_{B'}(u) = P^\top A P $$
qui est encore symétrique ($P^\top A P \in S_n(\mathbb{R})$).

**Démonstration (Esquisse)**
$\langle u(e_i), e_j \rangle = A_{ji}$ et $\langle e_i, u(e_j) \rangle = A_{ij}$. Donc $u$ symétrique $\iff A_{ij} = A_{ji} \ \forall i, j \iff A^\top = A$.

### 
**Subtilités**
*   **Dépendance à la base :** Dans une base non orthonormée $C$, $u$ symétrique $\iff \text{Mat}_C(u)$ est symétrique par rapport à la matrice de Gram $G = (\langle e_i, e_j \rangle)$, i.e. $G A = A^\top G$. Hors programme MP mais utile pour comprendre.
*   $S_n(\mathbb{R})$ est un sous-espace vectoriel de $M_n(\mathbb{R})$ de dimension $\frac{n(n+1)}{2}$.

**Pièges classiques**
*   Écrire $u$ symétrique $\iff$ sa matrice dans une base quelconque est symétrique : FAUX. Il faut une BON.
*   Confondre matrice symétrique et endomorphisme symétrique sans préciser la base.

---

## FLASHCARD 180 — À connaître 58 : Valeurs propres d'un symétrique — Extrema du quotient de Rayleigh

### RECTO
**À connaître 58 — Quotient de Rayleigh et valeurs propres extrémales**

Soit $E$ un espace euclidien de dimension $n$, $u \in \mathcal{L}(E)$ symétrique, de valeurs propres $\lambda_1 \le \lambda_2 \le \dots \le \lambda_n$ (comptées avec multiplicité).

**Question :** Exprimer $\lambda_1$ et $\lambda_n$ comme extrema du quotient de Rayleigh, et donner les caractérisations variationnelles associées.

### VERSO
**Hypothèses complètes**
*   $E$ euclidien de dimension $n \ge 1$
*   $u \in \mathcal{L}(E)$ symétrique
*   $\lambda_1 \le \dots \le \lambda_n$ valeurs propres réelles de $u$ (le théorème spectral garantit leur existence)
*   **Quotient de Rayleigh :** $R(x) = \frac{\langle u(x), x \rangle}{\langle x, x \rangle}$ pour $x \neq 0$

**Énoncé formel**
$$ \lambda_1 = \min_{x \neq 0} \frac{\langle u(x), x \rangle}{\|x\|^2} = \min_{\|x\|=1} \langle u(x), x \rangle $$

$$ \lambda_n = \max_{x \neq 0} \frac{\langle u(x), x \rangle}{\|x\|^2} = \max_{\|x\|=1} \langle u(x), x \rangle $$

Et plus généralement :
$$ \forall x \in E, \quad \lambda_1 \|x\|^2 \le \langle u(x), x \rangle \le \lambda_n \|x\|^2 $$

Les extrema sont atteints en les vecteurs propres associés à $\lambda_1$ et $\lambda_n$ respectivement.

**Démonstration (Esquisse)**
Dans la BON propre $(e_1, \dots, e_n)$, si $x = \sum \alpha_i e_i$ avec $\|x\|^2 = \sum \alpha_i^2 = 1$ :
$\langle u(x), x \rangle = \sum \lambda_i \alpha_i^2 \ge \lambda_1 \sum \alpha_i^2 = \lambda_1$.
Égalité si et seulement si $x \in E_{\lambda_1}(u)$.

### 
**Subtilités**
*   Le min est atteint (compacité de la sphère unité en dimension finie, $x \mapsto \langle u(x), x \rangle$ continue).
*   **Caractérisation sans calcul matriciel :** Les valeurs propres extrémales caractérisent la "taille" de l'endomorphisme dans un sens précis.
*   **Lien avec les normes :** $\|u\|_{op} = \max(|\lambda_1|, |\lambda_n|)$ pour $u$ symétrique (la norme d'opérateur est le rayon spectral).

**Extensions**
*   Le principe du minimax de Courant-Fischer (À connaître 59) généralise cette idée à toutes les valeurs propres intermédiaires $\lambda_k$.

**Pièges classiques**
*   Oublier que les extrema sont bien atteints (compacité de la sphère en dim finie).
*   Appliquer la formule sans vérifier que $u$ est symétrique.
*   Confondre $\|u\|_{op}$ avec $\lambda_n$ : si $\lambda_1 < 0$, alors $\|u\|_{op} = |\lambda_1|$ peut être plus grand que $\lambda_n$.

---

## FLASHCARD 181 — À connaître 59 : Principe du Minimax de Courant-Fischer

### RECTO
**À connaître 59 — Principe du Minimax de Courant-Fischer**

Soit $E$ un espace euclidien de dimension $n$, $u \in \mathcal{L}(E)$ symétrique, $\lambda_1 \le \dots \le \lambda_n$ ses valeurs propres.

**Question :** Énoncer le principe du minimax de Courant-Fischer donnant une caractérisation variationnelle de chaque valeur propre $\lambda_k$.

### VERSO
**Hypothèses complètes**
*   $E$ euclidien de dimension $n \ge 1$
*   $u \in \mathcal{L}(E)$ symétrique
*   $\lambda_1 \le \lambda_2 \le \dots \le \lambda_n \in \mathbb{R}$ valeurs propres (avec multiplicité)
*   $G_k(E)$ désigne l'ensemble des sous-espaces vectoriels de $E$ de dimension $k$

**Énoncé formel**
$$ \forall k \in \llbracket 1, n \rrbracket : \lambda_k = \min_{\substack{F \subset E \\ \dim F = k}} \max_{\substack{x \in F \\ x \neq 0}} \frac{\langle u(x), x \rangle}{\|x\|^2} $$

**Formulation équivalente (maximin) :**

$$ \lambda_k = \max_{\substack{F \subset E \\ \dim F = n-k+1}} \min_{\substack{x \in F \\ x \neq 0}} \frac{\langle u(x), x \rangle}{\|x\|^2} $$

**Cas particuliers :** $k=1$ donne $\lambda_1 = \min \frac{\langle u(x), x \rangle}{\|x\|^2}$, $k=n$ donne $\lambda_n = \max \frac{\langle u(x), x \rangle}{\|x\|^2}$.

**Démonstration (Esquisse)**
Dans la BON propre $(e_1, \dots, e_n)$ : pour $F = \text{Vect}(e_1, \dots, e_k)$, le max sur $F$ vaut $\lambda_k$. On montre ensuite que pour tout sous-espace $G$ de dimension $k$, $G \cap \text{Vect}(e_k, \dots, e_n) \neq \{0\}$ (par comptage de dimension : $k + (n-k+1) = n+1 > n$), ce qui fournit un vecteur sur lequel le quotient de Rayleigh est $\ge \lambda_k$.

### 
**Subtilités**
*   **Application directe :** Permet de comparer les valeurs propres de $u$ et $v$ (deux symétriques) si $u \le v$ au sens des formes quadratiques ($\langle u(x), x \rangle \le \langle v(x), x \rangle \ \forall x$) : alors $\lambda_k(u) \le \lambda_k(v)$.
*   **Monotonie par restriction :** Si $F$ est un sous-espace stable par $u$, les valeurs propres de $u|_F$ s'intercalent entre celles de $u$ (théorème d'entrelacement).

**Pièges classiques**
*   Confondre le min et le max dans la formule (mémoriser : on minimise sur les sous-espaces de dim $k$ le max du quotient de Rayleigh).
*   Croire que le théorème est au programme MP : il est au programme MP* — à maîtriser pour l'oral mais à utiliser avec précaution.

---

## FLASHCARD 182 — Proposition 53 : Endomorphismes symétriques positifs et définis positifs

### RECTO
**Proposition 53 — Endomorphismes symétriques positifs et définis positifs**

Soit $E$ un espace euclidien de dimension finie $n$, et $u \in \mathcal{L}(E)$ un endomorphisme symétrique.

**Question :** Donner les caractérisations équivalentes de "$u$ est symétrique positif" et "$u$ est symétrique défini positif", en termes de valeurs propres, de forme quadratique, et de décomposition.

### VERSO
**Définitions**
*   $u$ est **symétrique positif** (noté $u \succeq 0$) si : $u$ est symétrique et $\forall x \in E, \langle u(x), x \rangle \ge 0$.
*   $u$ est **symétrique défini positif** (noté $u \succ 0$) si : $u$ est symétrique et $\forall x \in E \setminus \{0\}, \langle u(x), x \rangle > 0$.

**Caractérisations équivalentes**
$u$ symétrique positif $\iff$ :
(a) $\forall x \in E, \langle u(x), x \rangle \ge 0$
$\iff$ (b) $Sp(u) \subset [0, +\infty[$
$\iff$ (c) $\exists v \in \mathcal{L}(E)$ symétrique, $u = v^2$

$u$ symétrique défini positif $\iff$ :
(a') $\forall x \neq 0, \langle u(x), x \rangle > 0$
$\iff$ (b') $Sp(u) \subset ]0, +\infty[$
$\iff$ (c') $u$ inversible et positif

**Traduction matricielle**
$A \in S_n(\mathbb{R})$ est définie positive $\iff$ toutes ses valeurs propres sont $>0$ $\iff$ tous ses mineurs principaux sont $>0$ (critère de Sylvester, hors programme MP mais utile).

**Ordre sur les symétriques**
On définit $u \preceq v \iff v - u \succeq 0$. C'est un ordre partiel sur les endomorphismes symétriques.

**Démonstration (Esquisse)**
Par le théorème spectral : dans la BON propre, $\langle u(x), x \rangle = \sum \lambda_i \alpha_i^2$. Ceci est $\ge 0$ pour tout $x \iff$ tous les $\lambda_i \ge 0$.
Pour (c) : si tous $\lambda_i \ge 0$, poser $v = \sum \sqrt{\lambda_i} p_i$ (racine carrée de $u$).

### 
**Subtilités**
*   $u \succeq 0$ n'implique pas $u$ inversible : Si $0 \in Sp(u)$, $u$ est positif mais non défini positif. Exemple : le projecteur orthogonal (valeurs propres 0 et 1).
*   **Produit scalaire induit :** Si $u \succ 0$, alors $(x, y) \mapsto \langle u(x), y \rangle$ est un nouveau produit scalaire sur $E$.
*   **Somme de symétriques positifs :** $u \succeq 0$ et $v \succeq 0 \implies u+v \succeq 0$. Si de plus $u \succ 0$, alors $u+v \succ 0$.
*   **Composition :** $u \succeq 0$ et $v \succeq 0$ n'implique pas $uv \succeq 0$ (sauf si $uv=vu$).

**Extensions**
*   **Racine carrée :** Si $u \succeq 0$, il existe un unique $v \succeq 0$ tel que $v^2 = u$ (voir À connaître 61). C'est la racine carrée de $u$, notée $\sqrt{u}$ ou $u^{1/2}$.
*   **Décomposition polaire (À connaître 62) :** tout endomorphisme $f$ s'écrit $f = s \circ r$ avec $r$ isométrie et $s$ symétrique positif.

**Pièges classiques**
*   Croire qu'une matrice à coefficients positifs est définie positive : FAUX.
*   Confondre $\langle u(x), x \rangle \ge 0$ et $u^2 \succeq 0$ : tout carré $u^2$ d'un symétrique est toujours $\succeq 0$ (valeurs propres $\lambda_i^2 \ge 0$).
*   Oublier que la caractérisation (b) requiert que $u$ soit symétrique d'abord (les valeurs propres d'un endomorphisme non symétrique peuvent ne pas être réelles).

---

## FLASHCARD 183 — À connaître 60 : Matrice de Gram

### RECTO
**À connaître 60 — Matrice de Gram**

Soit $E$ un espace euclidien et $(x_1, \dots, x_p) \in E^p$ une famille de $p$ vecteurs.

**Question :** Définir la matrice de Gram, exprimer son lien avec la liberté de la famille, et donner sa relation avec le déterminant (volume).

### VERSO
**Définition**
La matrice de Gram de la famille $(x_1, \dots, x_p)$ est :
$$ G = G(x_1, \dots, x_p) = (\langle x_i, x_j \rangle)_{1 \le i, j \le p} \in M_p(\mathbb{R}) $$

**Propriétés fondamentales**
1.  **Symétrie et positivité :**
    $G \in S_p(\mathbb{R})$ et $G \succeq 0$ (i.e. $G$ est symétrique positive).
    Preuve : $\forall \alpha \in \mathbb{R}^p, \alpha^\top G \alpha = \langle \sum_i \alpha_i x_i, \sum_j \alpha_j x_j \rangle = \|\sum_i \alpha_i x_i\|^2 \ge 0$.

2.  **Caractérisation de la liberté :**
    *   $\det G(x_1, \dots, x_p) > 0 \iff (x_1, \dots, x_p)$ est libre
    *   $\det G(x_1, \dots, x_p) = 0 \iff (x_1, \dots, x_p)$ est liée

3.  **Interprétation géométrique :** Si $p=n=\dim E$ et $A = \text{Mat}_B(x_1, \dots, x_n)$ dans une BON $B$ :
    $$ \det G = (\det A)^2 $$
    Et $\sqrt{\det G}$ est le volume du parallélépipède engendré par $(x_1, \dots, x_p)$.

**Formule explicite en dimension 2**
$G(x, y) = \begin{pmatrix} \|x\|^2 & \langle x, y \rangle \\ \langle x, y \rangle & \|y\|^2 \end{pmatrix}, \quad \det G = \|x\|^2 \|y\|^2 - \langle x, y \rangle^2$.
C'est exactement l'inégalité de Cauchy-Schwarz : $\det G \ge 0$ avec égalité ssi $(x, y)$ liée.

### 
**Subtilités**
*   $G \succ 0 \iff$ famille libre : La matrice de Gram est définie positive si et seulement si la famille est libre.
*   **Lien avec le produit scalaire :** Si $(e_1, \dots, e_n)$ est une base (non nécessairement orthonormée), la matrice de Gram est exactement la matrice du produit scalaire dans cette base.
*   Dans une BON : $G(e_1, \dots, e_n) = I_n$ (matrice identité).

**Extensions**
*   **Rang de $G$ :** $\text{rang}(G) = \text{rang}(x_1, \dots, x_p)$ (le rang de la famille). En particulier, $G$ est inversible $\iff$ famille libre.
*   **Formule de la distance :** $d(x, \text{Vect}(x_1, \dots, x_p))^2 = \frac{\det G(x_1, \dots, x_p, x)}{\det G(x_1, \dots, x_p)}$ (formule de la distance via Gram, utile pour les calculs de distance à un sous-espace).

**Pièges classiques**
*   Confondre $G \succeq 0$ (toujours vrai) et $G \succ 0$ (uniquement si famille libre).
*   Oublier que $\det G = (\det A)^2$ nécessite une BON pour écrire les colonnes.

---

## FLASHCARD 184 — À connaître 61 : Racine carrée d'un endomorphisme symétrique positif

### RECTO
**À connaître 61 — Racine carrée d'un endomorphisme symétrique positif**

Soit $E$ un espace euclidien de dimension finie $n$, et $u \in \mathcal{L}(E)$ un endomorphisme symétrique positif ($u \succeq 0$).

**Question :** Énoncer l'existence et l'unicité de la racine carrée de $u$, et préciser ses propriétés.

### VERSO
**Énoncé formel**
$$ \exists ! v \in \mathcal{L}(E) \text{ tel que } \begin{cases} v \text{ est symétrique positif} \\ v^2 = u \end{cases} $$

Cet unique $v$ est appelé la racine carrée de $u$ et noté $\sqrt{u}$ ou $u^{1/2}$.

**Construction explicite**
Par le théorème spectral : $u = \sum_{i=1}^n \lambda_i \langle \cdot, e_i \rangle e_i$ dans une BON propre $(e_1, \dots, e_n)$ avec $\lambda_i \ge 0$. On pose :
$$ \sqrt{u} = \sum_{i=1}^n \sqrt{\lambda_i} \langle \cdot, e_i \rangle e_i $$
c'est-à-dire $\sqrt{u}$ a les mêmes vecteurs propres que $u$, avec valeurs propres $\sqrt{\lambda_i} \ge 0$.

**Propriétés**
*   $\sqrt{u}$ est symétrique positive : $Sp(\sqrt{u}) = \{\sqrt{\lambda} : \lambda \in Sp(u)\} \subset [0, +\infty[$
*   $(\sqrt{u})^2 = u$
*   $\sqrt{u}$ commute avec tout endomorphisme qui commute avec $u$
*   $u \succ 0 \implies \sqrt{u} \succ 0$ et $\sqrt{u}$ est inversible
*   $\|\sqrt{u}\|_{op} = \sqrt{\|u\|_{op}}$

### 
**Subtilités**
*   **Unicité dans la classe "symétrique positif" :** Sans la contrainte de positivité, il peut exister plusieurs $v$ tels que $v^2 = u$ (par exemple $-\sqrt{u}$ vérifie aussi $(-\sqrt{u})^2 = u$ mais n'est pas positif si $u \neq 0$).
*   La racine carrée ne commute pas forcément avec les autres endomorphismes, sauf si ceux-ci commutent avec $u$.
*   $\sqrt{u \circ v} \neq \sqrt{u} \circ \sqrt{v}$ en général (si $u$ et $v$ ne commutent pas).

**Extensions**
*   **Puissances fractionnaires :** De même, on peut définir $u^\alpha$ pour tout $\alpha > 0$ par $u^\alpha = \sum \lambda_i^\alpha \langle \cdot, e_i \rangle e_i$.
*   **Application à la décomposition polaire (À connaître 62) :** pour tout $f \in \mathcal{L}(E)$, $f^* \circ f \succeq 0$ et on pose $s = \sqrt{f^* \circ f}$.

**Pièges classiques**
*   Croire que $\sqrt{u \circ v} = \sqrt{u} \circ \sqrt{v}$ : FAUX en général.
*   Oublier la condition $u \succeq 0$ pour l'existence (si $u$ a une valeur propre négative, $\sqrt{u}$ n'existe pas dans $\mathcal{L}(E)$ réel).

---

## FLASHCARD 185 — À connaître 62 : Décomposition polaire

### RECTO
**À connaître 62 — Décomposition polaire**

Soit $E$ un espace euclidien de dimension finie $n$, et $f \in \mathcal{L}(E)$.

**Question :** Énoncer le théorème de décomposition polaire de $f$, préciser l'unicité, et donner l'analogue matriciel.

### VERSO
**Hypothèses**
*   $E$ euclidien de dimension finie $n$
*   $f \in \mathcal{L}(E)$ quelconque (pas nécessairement inversible)

**Énoncé formel**
$$ \exists s \in \mathcal{L}(E) \text{ symétrique positive}, \exists r \in O(E) \text{ isométrie, tels que } f = s \circ r $$

**Unicité si $f$ est inversible :**
$f$ inversible $\implies \exists ! (s, r)$ avec $s \succ 0$ et $r \in O(E)$ tels que $f = s \circ r$

Construction : $s = \sqrt{f \circ f^*}$ (racine carrée de $f \circ f^* \succeq 0$), puis $r = s^{-1} \circ f$ (si $f$ inversible).

**Décomposition droite :** De même, $\exists r' \in O(E), \exists s' \succeq 0$ symétriques tels que $f = r' \circ s'$ (avec $s' = \sqrt{f^* \circ f}$).

**Traduction matricielle**
Toute matrice $A \in M_n(\mathbb{R})$ s'écrit :
$$ A = S \cdot R \quad \text{avec } S \in S_n^+(\mathbb{R}), R \in O_n(\mathbb{R}) $$
Si $A$ est inversible : décomposition unique avec $S \in S_n^{++}(\mathbb{R})$.

### 
**Subtilités**
*   **Analogie avec $\mathbb{C}$ :** En dimension 1, tout $z \in \mathbb{C}^*$ s'écrit $z = |z| \cdot e^{i\theta}$ (module $\times$ argument). La décomposition polaire en est la généralisation matricielle : $f = \underbrace{s}_{\text{"module"}} \circ \underbrace{r}_{\text{"rotation"}}$.
*   **$f$ non inversible :** La décomposition existe mais $s$ est seulement positive (pas définie positive) et $r$ n'est pas unique.
*   La décomposition gauche et droite donnent des $r$ différents en général ($r \neq r'$), mais $s$ et $s'$ ont les mêmes valeurs propres (valeurs singulières de $f$).

**Extensions**
*   **Valeurs singulières :** $Sp(s) = Sp(s') = \{\sigma_1 \ge \dots \ge \sigma_n \ge 0\}$ sont les valeurs singulières de $f$. Elles caractérisent $f$ à isométrie près.
*   **SVD (Singular Value Decomposition) :** $\exists$ BON $(e_1, \dots, e_n)$ et $(f_1, \dots, f_n)$ et $\sigma_1 \ge \dots \ge \sigma_n \ge 0$ tels que $f(e_i) = \sigma_i f_i$. Hors programme MP mais fondamental en pratique.

**Pièges classiques**
*   Confondre $s = \sqrt{f \circ f^*}$ et $s' = \sqrt{f^* \circ f}$ : ce sont deux symétriques positives différentes (isospectres mais de vecteurs propres différents).
*   Croire que la décomposition polaire implique $f$ normale ($f \circ f^* = f^* \circ f$) : non, la décomposition existe pour tout $f$.

---

## FLASHCARD 186 — À connaître 63 : Endomorphismes normaux (complément)

### RECTO
**À connaître 63 — Endomorphismes normaux en dimension finie réelle**

Soit $E$ un espace euclidien de dimension $n$, et $u \in \mathcal{L}(E)$.

**Question :** Définir un endomorphisme normal, donner des exemples importants, et énoncer la propriété de réduction des endomorphismes normaux sur $\mathbb{R}$.

### VERSO
**Définition**
$u$ est normal si $u$ commute avec son adjoint :
$$ u \circ u^* = u^* \circ u $$
où $u^*$ est l'adjoint de $u$ défini par $\forall x, y \in E : \langle u(x), y \rangle = \langle x, u^*(y) \rangle$.

**Exemples fondamentaux**
*   **Symétrique :** $u^* = u$ (Oui, $u \circ u = u \circ u$)
*   **Antisymétrique :** $u^* = -u$ (Oui, $(-u) \circ u = u \circ (-u)$)
*   **Isométrie :** $u^* = u^{-1}$ (Oui, $u^{-1} u = u u^{-1} = id$)
*   **Projecteur orthogonal :** $u^* = u, u^2 = u$ (Oui)

**Propriété de réduction (sur $\mathbb{R}$)**
Sur $\mathbb{R}$, $u$ normal ne se diagonalise pas forcément dans une BON (contrairement à $\mathbb{C}$). Mais :
$$ u \text{ normal} \implies E = \bigoplus_k F_k \quad (\text{somme orthogonale}) $$
où chaque $F_k$ est de dimension 1 (si $\lambda_k \in \mathbb{R}$) ou de dimension 2 (si $\lambda_k, \bar{\lambda}_k \in \mathbb{C} \setminus \mathbb{R}$), et $u|_{F_k}$ est une homothétie ou une similitude directe (rotation-homothétie).

**Traduction matricielle :** $u$ normal $\iff \exists P \in O_n(\mathbb{R})$ telle que $P^\top A P$ est bloc-diagonale avec blocs de taille 1 (réels) ou 2 (complexes conjugués).

### 
**Subtilités**
*   **Sur $\mathbb{C}$ :** Tout endomorphisme normal d'un espace hermitien est unitairement diagonalisable — c'est le théorème spectral complexe. Sur $\mathbb{R}$, on doit se contenter de blocs $1 \times 1$ et $2 \times 2$.
*   **Isométries :** Le résultat de la Proposition 52 (réduction des isométries) est un cas particulier de la réduction des normaux : les blocs de taille 2 correspondent à des rotations.
*   La normalité se teste via : $\|u(x)\| = \|u^*(x)\| \ \forall x$ (car $\langle u^*u(x), x \rangle = \langle uu^*(x), x \rangle$).

**Pièges classiques**
*   Croire que normal $\implies$ symétrique : FAUX (les isométries sont normales mais non symétriques en général).
*   Sur $\mathbb{R}$, croire qu'un endomorphisme normal est toujours orthogonalement diagonalisable : FAUX (une rotation d'angle $\neq 0, \pi$ en $\mathbb{R}^2$ est normale mais n'a pas de valeur propre réelle).

---

# CHAPITRE 12 — Probabilités

## FLASHCARD 187 — Proposition 54 : Continuité croissante et décroissante d'une probabilité

### RECTO
**Proposition 54 — Continuité croissante et décroissante d'une mesure de probabilité**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé.

**Question :** Énoncer les propriétés de continuité croissante et décroissante de $P$, avec les hypothèses exactes sur les suites d'événements.

### VERSO
**Hypothèses complètes**
*   $(\Omega, \mathcal{A}, P)$ espace probabilisé
*   $(A_n)_{n \ge 0}$ suite d'événements ($A_n \in \mathcal{A} \ \forall n$)

**Énoncé formel**
**Continuité croissante :**
$$ A_0 \subset A_1 \subset \dots \subset A_n \subset \dots \implies P\left(\bigcup_{n=0}^{+\infty} A_n\right) = \lim_{n \to +\infty} P(A_n) $$

**Continuité décroissante :**
$$ A_0 \supset A_1 \supset \dots \supset A_n \supset \dots \implies P\left(\bigcap_{n=0}^{+\infty} A_n\right) = \lim_{n \to +\infty} P(A_n) $$

**Démonstration (Esquisse)**
*   **Continuité croissante :** Poser $B_0 = A_0$ et $B_n = A_n \setminus A_{n-1}$ pour $n \ge 1$. Les $B_n$ sont deux à deux disjoints, $\bigcup_{k=0}^n B_k = A_n$, et $\bigcup_{n \ge 0} B_n = \bigcup_{n \ge 0} A_n$. Par $\sigma$-additivité :
    $$ P\left(\bigcup_n A_n\right) = \sum_{n=0}^{+\infty} P(B_n) = \lim_{N \to \infty} \sum_{n=0}^N P(B_n) = \lim_{N \to \infty} P(A_N) $$
*   **Continuité décroissante :** Par complémentarité : $B_n = A_n^c$ est croissante, appliquer la continuité croissante à $(B_n)$.

### 
**Subtilités**
*   **La $\sigma$-additivité est la clé :** Ces propriétés sont équivalentes à la $\sigma$-additivité (avec la finitude de $P(\Omega)=1$). Une mesure additive (non $\sigma$-additive) ne vérifie pas forcément ces continuités.
*   **Continuité décroissante sans hypothèse de finitude :** En théorie de la mesure générale, la continuité décroissante requiert que $P(A_0) < +\infty$. Ici, puisque $P(A_0) \le 1 < +\infty$, c'est automatique.
*   Ces résultats s'appliquent à toute mesure finie, pas seulement aux probabilités.

**Pièges classiques**
*   Oublier la condition de monotonie : sans $A_n \subset A_{n+1}$ (resp. $\supset$), le résultat est faux en général.
*   Confondre $\liminf A_n$, $\limsup A_n$, $\cup A_n$, $\cap A_n$ : la continuité concerne les suites monotones.
*   Contre-exemple pour la décroissante sans finitude : Sur $(\mathbb{N}, \mathcal{P}(\mathbb{N}), \#)$ (mesure de comptage), $A_n = \{k \ge n\}$ est décroissante, $\cap A_n = \emptyset$ mais $\#(A_n) = +\infty \ \forall n$.

---

## FLASHCARD 188 — À connaître 64 : Formule du crible (inclusion-exclusion)

### RECTO
**À connaître 64 — Formule du crible (Poincaré)**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé et $A_1, \dots, A_n \in \mathcal{A}$.

**Question :** Énoncer la formule du crible pour $P(A_1 \cup \dots \cup A_n)$.

### VERSO
**Énoncé formel**
$$ P\left(\bigcup_{i=1}^n A_i\right) = \sum_{k=1}^n (-1)^{k-1} \sum_{1 \le i_1 < \dots < i_k \le n} P(A_{i_1} \cap \dots \cap A_{i_k}) $$

**Développé pour $n=3$ :**
$P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C)$

**Formule complémentaire (événement contraire) :**
$$ P\left(\bigcap_{i=1}^n A_i^c\right) = 1 - P\left(\bigcup_{i=1}^n A_i\right) = \sum_{k=0}^n (-1)^k \sum_{|I|=k} P\left(\bigcap_{i \in I} A_i\right) $$

**Démonstration (Esquisse)**
Par récurrence sur $n$ : initialisation triviale. Hérédité via $P(A \cup B) = P(A) + P(B) - P(A \cap B)$ (additivité + complémentarité). Alternativement, via l'indicatrice : $1_{\cup A_i} = 1 - \prod_i (1 - 1_{A_i})$, développer et prendre l'espérance.

### 
**Subtilités**
*   **Formule du crible inégale (Bonferroni) :** Les troncatures donnent des inégalités alternées :
    $P(\cup A_i) \le \sum P(A_i)$ (union bound)
    $P(\cup A_i) \ge \sum P(A_i) - \sum_{i<j} P(A_i \cap A_j)$
*   **Nombre de termes :** La somme contient $2^n - 1$ termes au total.

**Pièges classiques**
*   Oublier les signes alternés : le terme d'ordre $k$ est de signe $(-1)^{k-1}$.
*   Erreur de comptage dans la somme sur les $\binom{n}{k}$ intersections.
*   Confondre avec la formule d'inclusion-exclusion ensembliste (même structure, mais avec des cardinaux).

---

## FLASHCARD 189 — À connaître 65 : Premier lemme de Borel-Cantelli

### RECTO
**À connaître 65 — Premier lemme de Borel-Cantelli**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé et $(A_n)_{n \ge 1}$ une suite d'événements.

**Question :** Énoncer le premier lemme de Borel-Cantelli, préciser la condition et la conclusion sur $P(\limsup A_n)$.

### VERSO
**Notation préliminaire**
$$ \limsup_{n \to +\infty} A_n = \bigcap_{n=1}^{+\infty} \bigcup_{k=n}^{+\infty} A_k = \{A_n \text{ i.o.}\} = \{\omega : \omega \in A_n \text{ pour une infinité de } n\} $$
("i.o." = infinitely often = infiniment souvent)

**Hypothèse**
$$ \sum_{n=1}^{+\infty} P(A_n) < +\infty $$

**Conclusion**
$$ P(\limsup_{n \to +\infty} A_n) = 0 $$

**Démonstration**
$$ P\left(\bigcap_{n=1}^\infty \bigcup_{k=n}^\infty A_k\right) \le P\left(\bigcup_{k=n}^\infty A_k\right) \le \sum_{k=n}^{+\infty} P(A_k) \xrightarrow[n \to +\infty]{} 0 $$
car $\sum P(A_n) < +\infty$ (reste d'une série convergente). Par continuité décroissante :
$$ P\left(\bigcap_{n \ge 1} \bigcup_{k \ge n} A_k\right) = \lim_{n \to +\infty} P\left(\bigcup_{k \ge n} A_k\right) = 0 $$

### 
**Subtilités**
*   **Aucune hypothèse d'indépendance !** Le premier lemme vaut pour des événements quelconques (pas besoin d'indépendance).
*   **La réciproque est fausse :** $\sum P(A_n) = +\infty$ n'implique pas $P(\limsup A_n) > 0$ en général (sans indépendance). Exemple : $A_n = A$ pour tout $n$, $P(A) > 0$, $\sum P(A_n) = +\infty$, mais $\limsup A_n = A$ et $P(A)$ peut être < 1.
*   **La réciproque avec indépendance :** C'est le second lemme de Borel-Cantelli (À connaître 66).

**Pièges classiques**
*   Croire qu'il faut l'indépendance pour le premier lemme : non, il est général.
*   Mal interpréter $\limsup A_n$ : c'est l'événement "infiniment souvent $A_n$", pas la limite de $A_n$.
*   Utiliser $\sigma$-sous-additivité ($P(\cup A_k) \le \sum P(A_k)$) sans la mentionner.

---

## FLASHCARD 190 — À connaître 66 : Second lemme de Borel-Cantelli

### RECTO
**À connaître 66 — Second lemme de Borel-Cantelli**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé et $(A_n)_{n \ge 1}$ une suite d'événements mutuellement indépendants.

**Question :** Énoncer le second lemme de Borel-Cantelli et sa conclusion sur $P(\limsup A_n)$.

### VERSO
**Hypothèses**
*   $(A_n)_{n \ge 1}$ suite d'événements mutuellement indépendants :
    $$ \forall k \ge 1, \forall 1 \le n_1 < \dots < n_k, \quad P(A_{n_1} \cap \dots \cap A_{n_k}) = \prod_{i=1}^k P(A_{n_i}) $$
*   $\sum_{n=1}^{+\infty} P(A_n) = +\infty$

**Conclusion**
$$ P(\limsup_{n \to +\infty} A_n) = 1 $$

**Démonstration (Esquisse)**
Il suffit de montrer $P(\liminf A_n^c) = 0$, i.e. $P(\bigcup_n \bigcap_{k \ge n} A_k^c) = 0$.

Pour $n \le k \le N$, par indépendance :
$$ P\left(\bigcap_{k=n}^N A_k^c\right) = \prod_{k=n}^N (1 - P(A_k)) \le \prod_{k=n}^N e^{-P(A_k)} = \exp\left(-\sum_{k=n}^N P(A_k)\right) \xrightarrow[N \to +\infty]{} 0 $$
car $\sum P(A_k) = +\infty$. Par continuité décroissante, $P(\bigcap_{k \ge n} A_k^c) = 0 \ \forall n$, donc $P(\bigcup_n \bigcap_{k \ge n} A_k^c) = 0$.

### 
**Subtilités**
*   **L'indépendance mutuelle est cruciale :** L'indépendance deux à deux ne suffit pas.
*   $\sum P(A_n) = +\infty$ + indépendance $\implies P(\limsup A_n) = 1$ : La loi du 0-1 de Kolmogorov affirme que $P(\limsup A_n) \in \{0, 1\}$ pour des événements indépendants (c'est un événement asymptotique "terminal").
*   L'inégalité $1-x \le e^{-x}$ est la clé de la preuve.

**Pièges classiques**
*   Confondre les deux lemmes de Borel-Cantelli : premier = convergence de la série $\implies$ proba nulle (sans indépendance) ; second = divergence + indépendance $\implies$ proba 1.
*   Oublier que l'indépendance deux à deux ne suffit pas pour le second lemme.

---

## FLASHCARD 191 — Proposition 55 : Formule des probabilités totales

### RECTO
**Proposition 55 — Formule des probabilités totales**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé.

**Question :** Énoncer la formule des probabilités totales dans le cadre d'un système complet d'événements, avec les hypothèses exactes.

### VERSO
**Définition préliminaire**
$(B_i)_{i \in I}$ (avec $I$ fini ou dénombrable) est un système complet d'événements (SCE) si :
*   Les $B_i$ sont deux à deux incompatibles : $\forall i \neq j, B_i \cap B_j = \emptyset$
*   Ils recouvrent $\Omega$ : $\bigsqcup_{i \in I} B_i = \Omega$
*   $\forall i \in I, P(B_i) > 0$ (hypothèse parfois requise pour conditionner)

**Énoncé formel**
Soit $(B_i)_{i \in I}$ un SCE avec $P(B_i) > 0 \ \forall i$, et $A \in \mathcal{A}$ :

$$ P(A) = \sum_{i \in I} P(A \mid B_i) P(B_i) $$

Version sans conditionnement (si certains $P(B_i) = 0$) :
$$ P(A) = \sum_{i \in I} P(A \cap B_i) $$
(toujours valide par $\sigma$-additivité car $A = \bigsqcup_i (A \cap B_i)$).

**Démonstration**
$A = A \cap \Omega = A \cap \bigsqcup_i B_i = \bigsqcup_i (A \cap B_i)$, disjoints. Par $\sigma$-additivité :
$$ P(A) = \sum_i P(A \cap B_i) = \sum_i P(A \mid B_i) P(B_i) $$

### 
**Subtilités**
*   **$I$ peut être infini dénombrable :** La formule reste valide par $\sigma$-additivité, à condition que $(B_i)$ soit bien un SCE dénombrable.
*   $P(B_i) > 0$ nécessaire pour écrire $P(A \mid B_i)$ : Si $P(B_i) = 0$, le terme $P(A \cap B_i) = 0$ donc on peut ignorer $B_i$ ou utiliser la version sans conditionnement.
*   Le cas $I = \{B, B^c\}$ : $P(A) = P(A \mid B)P(B) + P(A \mid B^c)P(B^c)$ (version la plus classique).

**Pièges classiques**
*   Oublier que les $B_i$ doivent partitionner tout $\Omega$, pas juste un sous-ensemble.
*   Appliquer la formule avec un $B_i$ de probabilité nulle sans précaution.
*   Confondre $P(A \mid B_i)P(B_i)$ avec $P(B_i \mid A)P(A)$ — c'est la formule de Bayes.

---

## FLASHCARD 192 — Proposition 56 : Formule de Bayes

### RECTO
**Proposition 56 — Formule de Bayes**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé, $(B_i)_{i \in I}$ un système complet d'événements avec $P(B_i) > 0$, et $A \in \mathcal{A}$ avec $P(A) > 0$.

**Question :** Énoncer la formule de Bayes permettant de calculer $P(B_j \mid A)$.

### VERSO
**Énoncé formel**
$$ \forall j \in I : \quad P(B_j \mid A) = \frac{P(A \mid B_j) P(B_j)}{\sum_{i \in I} P(A \mid B_i) P(B_i)} $$

**Démonstration**
Par définition de la probabilité conditionnelle et la formule des probabilités totales :
$$ P(B_j \mid A) = \frac{P(A \cap B_j)}{P(A)} = \frac{P(A \mid B_j) P(B_j)}{P(A)} = \frac{P(A \mid B_j) P(B_j)}{\sum_i P(A \mid B_i) P(B_i)} $$

**Terminologie probabiliste**
*   $P(B_j)$ : probabilité a priori (prior) de $B_j$
*   $P(A \mid B_j)$ : vraisemblance de $A$ sachant $B_j$
*   $P(B_j \mid A)$ : probabilité a posteriori (posterior) de $B_j$ sachant $A$

### 
**Subtilités**
*   $P(A) > 0$ est indispensable pour que $P(B_j \mid A)$ soit défini.
*   Bayes est une conséquence directe de la définition de la probabilité conditionnelle + formule des probabilités totales : ce n'est pas un axiome.
*   **Application classique :** Tests médicaux (sensibilité/spécificité), paradoxe de Monty Hall, etc.

**Pièges classiques**
*   **Inverser $P(A \mid B_j)$ et $P(B_j \mid A)$ :** c'est l'erreur de la transposition du conditionnel (fallacy of the transposed conditional), très fréquente.
*   Oublier de normaliser (le dénominateur est $P(A)$, pas 1).

---

## FLASHCARD 193 — Proposition 57 : Inégalité de Cauchy-Schwarz (probabiliste)

### RECTO
**Proposition 57 — Inégalité de Cauchy-Schwarz probabiliste**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé, et $X, Y$ deux variables aléatoires de carré intégrable ($X, Y \in L^2(\Omega)$).

**Question :** Énoncer l'inégalité de Cauchy-Schwarz dans ce cadre, avec la condition d'égalité.

### VERSO
**Hypothèses**
*   $X, Y : \Omega \to \mathbb{R}$ variables aléatoires
*   $E[X^2] < +\infty$ et $E[Y^2] < +\infty$ (i.e. $X, Y \in L^2$)

**Énoncé formel**
$$ |E[XY]|^2 \le E[X^2] E[Y^2] $$

**Condition d'égalité :**
$$ E[XY]^2 = E[X^2] E[Y^2] \iff \exists (\alpha, \beta) \neq (0, 0), \alpha X + \beta Y = 0 \text{ p.s.} $$
i.e. $X$ et $Y$ sont presque sûrement proportionnels.

**Corollaire (covariance)**
$$ |\text{Cov}(X, Y)|^2 \le \text{Var}(X) \text{Var}(Y) $$
$$ |\rho(X, Y)| \le 1 \quad \text{où } \rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sqrt{\text{Var}(X)} \sqrt{\text{Var}(Y)}} $$

**Démonstration (Esquisse)**
$(X, Y) \mapsto E[XY]$ est un produit scalaire sur $L^2$. Appliquer Cauchy-Schwarz dans cet espace de Hilbert : $\|XY\|_1 = |E[XY]| \le \|X\|_2 \|Y\|_2$. Formellement, discriminant de $t \mapsto E[(tX+Y)^2] = E[X^2]t^2 + 2E[XY]t + E[Y^2] \ge 0$.

### 
**Subtilités**
*   $L^2$ est requis : $E[XY]$ peut ne pas exister si $X \notin L^2$ ou $Y \notin L^2$ (l'inégalité de Hölder généralise).
*   **Corrélation :** $|\rho| = 1 \iff X$ et $Y$ affines p.s. ($Y = aX+b$ p.s.). La corrélation mesure la dépendance linéaire, non la dépendance tout court.

**Pièges classiques**
*   Confondre $E[XY]^2 \le E[X^2] E[Y^2]$ avec $(E[XY])^2 \le E[X^2] E[Y^2]$ : ce sont la même chose ($|E[XY]|^2$).
*   Croire que $\rho(X, Y) = 0$ implique l'indépendance : FAUX (corrélation nulle $\not\Rightarrow$ indépendance).

---

## FLASHCARD 194 — Proposition 58 : Variance d'une somme

### RECTO
**Proposition 58 — Variance d'une somme de variables aléatoires**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé et $X_1, \dots, X_n \in L^2(\Omega)$.

**Question :** Donner la formule de la variance d'une somme $S_n = X_1 + \dots + X_n$, en faisant apparaître les covariances. Donner le cas des variables deux à deux non corrélées.

### VERSO
**Énoncé formel — Formule générale**
$$ \text{Var}(X_1 + \dots + X_n) = \sum_{i=1}^n \text{Var}(X_i) + 2 \sum_{1 \le i < j \le n} \text{Cov}(X_i, X_j) $$

Ou de façon compacte :
$$ \text{Var}\left(\sum_{i=1}^n X_i\right) = \sum_{i=1}^n \sum_{j=1}^n \text{Cov}(X_i, X_j) $$
(en notant $\text{Cov}(X_i, X_i) = \text{Var}(X_i)$).

**Cas particuliers**
**Variables deux à deux non corrélées** ($\text{Cov}(X_i, X_j) = 0 \ \forall i \neq j$) :
$$ \text{Var}\left(\sum_{i=1}^n X_i\right) = \sum_{i=1}^n \text{Var}(X_i) $$

En particulier pour des v.a. indépendantes de $L^2$ : (indépendance $\implies$ non corrélées) :
$$ X_1, \dots, X_n \text{ indépendantes} \implies \text{Var}\left(\sum_{i=1}^n X_i\right) = \sum_{i=1}^n \text{Var}(X_i) $$

**Rappels**
*   $\text{Var}(X) = E[X^2] - (E[X])^2 = E[(X - E[X])^2]$
*   $\text{Cov}(X, Y) = E[XY] - E[X]E[Y]$
*   $\text{Var}(aX+b) = a^2 \text{Var}(X)$

### 
**Subtilités**
*   **Non corrélé $\not\Rightarrow$ indépendant :** Il existe des variables non corrélées mais dépendantes. La formule de la variance s'additionne pour les non corrélées, ce qui est plus faible que l'indépendance.
*   **Indépendant $\implies$ non corrélé :** Si $X, Y$ indépendantes et $\in L^2$, alors $E[XY] = E[X]E[Y]$ donc $\text{Cov}(X, Y) = 0$.
*   $n^2$ termes dans la double somme, dont $n$ termes diagonaux (variances) et $n(n-1)$ termes croisés (covariances, par paires = $n(n-1)/2$ termes distincts).

**Pièges classiques**
*   Oublier le facteur 2 devant $\sum_{i < j} \text{Cov}(X_i, X_j)$.
*   Confondre non corrélées et indépendantes.
*   Appliquer la formule $\text{Var}(\sum X_i) = \sum \text{Var}(X_i)$ sans vérifier la non-corrélation.

---

## FLASHCARD 195 — Proposition 59 : Variables aléatoires indépendantes

### RECTO
**Proposition 59 — Propriétés des variables aléatoires indépendantes**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé et $X_1, \dots, X_n$ des variables aléatoires mutuellement indépendantes.

**Question :** Énoncer les principales propriétés des variables aléatoires indépendantes : espérance du produit, fonctions, loi jointe.

### VERSO
**Définition (rappel)**
$X_1, \dots, X_n$ sont mutuellement indépendantes si :
$$ \forall B_1, \dots, B_n \in \mathcal{B}(\mathbb{R}) : P(X_1 \in B_1, \dots, X_n \in B_n) = \prod_{i=1}^n P(X_i \in B_i) $$

**Propriétés fondamentales**
1.  **Loi jointe = produit des lois marginales :**
    $$ P_{(X_1, \dots, X_n)} = P_{X_1} \otimes \dots \otimes P_{X_n} $$

2.  **Espérance du produit (si $X_i \in L^1$) :**
    $$ E\left[\prod_{i=1}^n X_i\right] = \prod_{i=1}^n E[X_i] $$

3.  **Stabilité par fonctions mesurables :** Si $f_1, \dots, f_n : \mathbb{R} \to \mathbb{R}$ sont mesurables, alors $f_1(X_1), \dots, f_n(X_n)$ sont mutuellement indépendantes.

4.  **Stabilité par regroupement :** Si $(I_1, \dots, I_k)$ est une partition de $\llbracket 1, n \rrbracket$ et $g_j$ mesurable, alors $g_1((X_i)_{i \in I_1}), \dots, g_k((X_i)_{i \in I_k})$ sont indépendantes.

5.  **Non corrélation :** $X_i, X_j \in L^2 \implies \text{Cov}(X_i, X_j) = 0$.

### 
**Subtilités**
*   **Indépendance mutuelle $\neq$ indépendance deux à deux :** Il existe des familles deux à deux indépendantes mais pas mutuellement indépendantes (contre-exemple classique : pile ou face avec 3 variables).
*   La réciproque de (2) est fausse : $E[XY] = E[X]E[Y]$ (non corrélées) n'implique pas l'indépendance.
*   Propriété (3) est extrêmement utile : Elle permet par exemple de déduire que $X^2$ et $Y^2$ sont indépendantes si $X$ et $Y$ le sont.

**Pièges classiques**
*   Confondre indépendance deux à deux et mutuelle : bien préciser dans les énoncés.
*   Oublier l'intégrabilité pour (2) : $X_i$ doivent être dans $L^1$ pour que $E[\prod X_i] = \prod E[X_i]$.

---

## FLASHCARD 196 — Proposition 60 : Espérance conditionnelle (cas discret)

### RECTO
**Proposition 60 — Espérance conditionnelle (cadre discret)**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé, $X$ une variable aléatoire réelle et $Y$ une variable aléatoire discrète (à valeurs dans un ensemble dénombrable $D$).

**Question :** Définir $E[X \mid Y]$ dans le cas discret, et énoncer ses propriétés fondamentales.

### VERSO
**Définition**
Si $X \in L^1(\Omega)$ et $Y$ discrète à valeurs dans $D$ :

$$ E[X \mid Y] : \omega \mapsto \sum_{y \in D} E[X \mid Y=y] \, 1_{Y(\omega)=y} $$

où $E[X \mid Y=y] = \frac{E[X \cdot 1_{Y=y}]}{P(Y=y)}$ si $P(Y=y) > 0$.

C'est une variable aléatoire (mesurable par rapport à $\sigma(Y)$).

**Propriétés fondamentales**
1.  **Linéarité :** $E[\alpha X + \beta Z \mid Y] = \alpha E[X \mid Y] + \beta E[Z \mid Y]$ p.s.
2.  **Espérance totale (tour de la tour — cas simple) :**
    $$ E[E[X \mid Y]] = E[X] $$
3.  **Extraction des facteurs mesurables :**
    $$ E[f(Y) \cdot X \mid Y] = f(Y) \cdot E[X \mid Y] \quad \text{p.s.} $$
4.  **Indépendance :**
    $$ X \perp Y \implies E[X \mid Y] = E[X] \quad \text{p.s.} $$
5.  **Positivité :** $X \ge 0$ p.s. $\implies E[X \mid Y] \ge 0$ p.s.

### 
**Subtilités**
*   $E[X \mid Y]$ est une variable aléatoire, pas un nombre : elle dépend de $\omega$ à travers $Y(\omega)$.
*   La formule des probabilités totales est le cas $X = 1_A$ : $P(A) = E[1_A] = E[E[1_A \mid Y]] = \sum_y P(A \mid Y=y)P(Y=y)$.
*   **En programme MP :** L'espérance conditionnelle complète (définie par le théorème de Radon-Nikodym) est hors programme ; on se limite au cas discret.

**Pièges classiques**
*   Confondre $E[X \mid Y=y]$ (un réel) et $E[X \mid Y]$ (une v.a.).
*   Oublier que $E[X \mid Y]$ est $\sigma(Y)$-mesurable, donc est une fonction de $Y$.

---

## FLASHCARD 197 — Lemme 9 : Lemme des coalitions

### RECTO
**Lemme 9 — Lemme des coalitions**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé et $(X_i)_{i \in I}$ une famille de variables aléatoires mutuellement indépendantes.

**Question :** Énoncer le lemme des coalitions, précisant comment on peut regrouper des variables indépendantes.

### VERSO
**Énoncé formel**
Soit $(X_1, \dots, X_n)$ des variables aléatoires mutuellement indépendantes. Soit $(I_1, \dots, I_k)$ une partition de $\llbracket 1, n \rrbracket$ (i.e. $I_1 \sqcup \dots \sqcup I_k = \llbracket 1, n \rrbracket$).

Soit pour chaque $j \in \llbracket 1, k \rrbracket$, $f_j : \mathbb{R}^{|I_j|} \to \mathbb{R}$ une fonction mesurable (borélienne).

Alors les variables aléatoires :
$$ Y_j = f_j((X_i)_{i \in I_j}), \quad j = 1, \dots, k $$
sont mutuellement indépendantes.

**Cas particulier important**
$$ X_1, \dots, X_n \text{ i.i.d.} \implies (X_1, \dots, X_p) \perp (X_{p+1}, \dots, X_n) $$

Et donc $f(X_1, \dots, X_p) \perp g(X_{p+1}, \dots, X_n)$ pour toutes fonctions mesurables $f, g$.

**Démonstration (Idée)**
Les $\sigma$-algèbres $\sigma(X_i, i \in I_j)$ pour $j = 1, \dots, k$ sont mutuellement indépendantes (par indépendance mutuelle des $X_i$). Comme $Y_j$ est mesurable par rapport à $\sigma(X_i, i \in I_j)$, les $Y_j$ sont indépendantes.

### 
**Subtilités**
*   Partition = recouvrement disjoint complet : Les groupes $I_j$ ne se chevauchent pas.
*   **Mesurabilité des $f_j$ indispensable :** Sans mesurabilité, $Y_j$ n'est pas une variable aléatoire.
*   Application typique : $S_p = X_1 + \dots + X_p$ et $T = X_{p+1} + \dots + X_n$ sont indépendantes si $(X_i)$ i.i.d.

**Pièges classiques**
*   Croire que ce lemme s'applique à des variables seulement deux à deux indépendantes : il faut l'indépendance mutuelle.
*   Confondre "les $X_i$ sont indépendants" avec "les $Y_j$ sont indépendants" sans préciser la partition.

---

## FLASHCARD 198 — Proposition 61 : Espérance d'un produit de variables indépendantes

### RECTO
**Proposition 61 — Espérance d'un produit de variables aléatoires indépendantes**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé, et $X_1, \dots, X_n$ des variables aléatoires mutuellement indépendantes et intégrables ($X_i \in L^1$).

**Question :** Montrer que $X_1 \dots X_n \in L^1$ et que $E[X_1 \dots X_n] = \prod_{i=1}^n E[X_i]$.

### VERSO
**Hypothèses**
*   $X_1, \dots, X_n$ mutuellement indépendantes
*   $\forall i, X_i \in L^1(\Omega)$ (i.e. $E[|X_i|] < +\infty$)

**Énoncé formel**
$$ X_1 \dots X_n \in L^1(\Omega) \quad \text{et} \quad E\left[\prod_{i=1}^n X_i\right] = \prod_{i=1}^n E[X_i] $$

**Démonstration (Esquisse)**
Cas $n=2$ : Par la formule de transfert et l'indépendance (loi jointe = produit des marginales) :
$$ E[XY] = \int_{\mathbb{R}^2} xy d(P_X \otimes P_Y)(x, y) = \int_\mathbb{R} x dP_X(x) \cdot \int_\mathbb{R} y dP_Y(y) = E[X] E[Y] $$
L'intégrabilité de $XY$ vient du théorème de Fubini : $E[|XY|] = E[|X|]E[|Y|] < +\infty$.

Cas général : Par récurrence et le lemme des coalitions.

### 
**Subtilités**
*   L'intégrabilité du produit n'est pas automatique pour des variables non indépendantes : $X$ et $Y$ intégrables n'implique pas $XY$ intégrable. Ici, l'indépendance + $L^1$ donne $E[|XY|] = E[|X|]E[|Y|] < +\infty$.
*   La réciproque est fausse : $E[XY] = E[X]E[Y]$ n'implique pas l'indépendance (seulement la non-corrélation si $X, Y \in L^2$).
*   Pour $X \in L^2$ : $E[XY] = E[X]E[Y]$ équivaut à $\text{Cov}(X, Y) = 0$.

**Pièges classiques**
*   Appliquer la formule $E[\prod X_i] = \prod E[X_i]$ à des variables corrélées.
*   Oublier de vérifier l'intégrabilité du produit avant d'invoquer la formule.

---

## FLASHCARD 199 — Proposition 62 : Formule de transfert

### RECTO
**Proposition 62 — Formule de transfert**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé, $X : \Omega \to E$ une variable aléatoire à valeurs dans un espace mesurable $(E, \mathcal{E})$, et $f : E \to \mathbb{R}$ une fonction mesurable.

**Question :** Énoncer la formule de transfert, donnant $E[f(X)]$ en fonction de la loi $P_X$ de $X$.

### VERSO
**Énoncé formel**
Si $f \ge 0$ ou $f(X) \in L^1(\Omega)$ :

$$ E[f(X)] = \int_E f(x) dP_X(x) $$

où $P_X = X^* P$ est la loi image (pushforward) de $P$ par $X$.

**Cas discret ($X$ à valeurs dans $D$ dénombrable)**
$$ E[f(X)] = \sum_{x \in D} f(x) P(X=x) $$

**Cas à densité ($X$ admet une densité $p_X$ par rapport à la mesure de Lebesgue)**
$$ E[f(X)] = \int_\mathbb{R} f(x) p_X(x) dx $$

**Démonstration (Idée)**
Par définition de l'intégrale par rapport à la mesure image : $\int_E f d(X^* P) = \int_\Omega f \circ X dP = E[f(X)]$.

### 
**Subtilités**
*   La formule de transfert est fondamentale : Elle permet de calculer $E[f(X)]$ à partir de la seule loi de $X$, sans revenir à $\Omega$.
*   **Condition d'applicabilité :** $f(X) \in L^1(\Omega) \iff \int_E |f| dP_X < +\infty$. Vérifier cela en pratique (via la densité ou la loi discrète).
*   **Généralisation :** Pour $(X_1, \dots, X_n)$ de loi jointe $P_{(X_1, \dots, X_n)}$ :
    $$ E[f(X_1, \dots, X_n)] = \int_{\mathbb{R}^n} f(x_1, \dots, x_n) dP_{(X_1, \dots, X_n)}(x_1, \dots, x_n) $$

**Pièges classiques**
*   Confondre la mesure de probabilité $P_X$ (définie sur $\mathbb{R}$) avec la densité $p_X$ (fonction). $P_X = p_X \cdot \lambda$ seulement si $X$ a une densité.
*   Oublier de vérifier l'intégrabilité de $f$ avant d'appliquer la formule.

---

## FLASHCARD 200 — Proposition 63 : Fonctions génératrices

### RECTO
**Proposition 63 — Fonctions génératrices des probabilités et des moments**

Soit $X$ une variable aléatoire à valeurs dans $\mathbb{N}$ (variable aléatoire discrète sur $\mathbb{N}$).

**Question :** Définir la fonction génératrice de $X$, son rayon de convergence minimal, et énoncer les propriétés permettant de retrouver la loi et les moments.

### VERSO
**Définition**
La fonction génératrice (des probabilités) de $X$ est :

$$ G_X : t \mapsto E[t^X] = \sum_{k=0}^{+\infty} P(X=k) t^k $$

**Domaine :** $G_X$ est définie et la série converge absolument au moins pour $t \in [-1, 1]$ (car $\sum P(X=k)|t|^k \le \sum P(X=k) = 1$ pour $|t| \le 1$).

**Propriétés fondamentales**
1.  **Détermination de la loi :**
    $$ P(X=k) = \frac{G_X^{(k)}(0)}{k!} \quad \forall k \in \mathbb{N} $$

2.  **Moments :**
    $$ E[X] = G_X'(1^-), \quad E[X(X-1)] = G_X''(1^-), \dots $$
    $$ E[X(X-1)\dots(X-k+1)] = G_X^{(k)}(1^-) $$

3.  **Indépendance :**
    $$ X \perp Y \implies G_{X+Y}(t) = G_X(t) \cdot G_Y(t) $$

4.  La suite $(G_X(t))_t$ caractérise la loi de $X$ (unicité de la décomposition en série entière).

**Fonctions génératrices classiques**
*   **$B(n, p)$ :** $(1-p+pt)^n$
*   **$P(\lambda)$ :** $e^{\lambda(t-1)}$
*   **$G(p)$ :** $\frac{p}{1-(1-p)t}$
*   **$B(1, p)$ :** $1-p+pt$

### 
**Subtilités**
*   $G_X(1) = 1$ toujours (conservation de la masse totale).
*   Rayon de convergence $\ge 1$ : $G_X$ est une série entière de rayon $R \ge 1$. Elle peut diverger pour $|t| > 1$.
*   Dérivées en $t=1$ : Les formules de moments utilisent les dérivées en $1^-$ (limite à gauche) car $G_X$ peut ne pas être définie pour $t > 1$.
*   Différence avec la fonction génératrice des moments : $M_X(t) = E[e^{tX}]$ (ne converge pas toujours), différente de $G_X$.

**Pièges classiques**
*   Confondre fonction génératrice (pour $\mathbb{N}$-valuées) et fonction caractéristique $\varphi_X(t) = E[e^{itX}]$ (toujours définie, pour toute v.a. réelle).
*   Oublier que $G_X$ ne s'applique qu'aux v.a. à valeurs dans $\mathbb{N}$.
*   Erreur dans la formule des moments : $E[X] = G_X'(1)$, pas $G_X'(0)$.

---

## FLASHCARD 201 — À connaître 67 : Fonction caractéristique

### RECTO
**À connaître 67 — Fonction caractéristique d'une variable aléatoire**

Soit $X$ une variable aléatoire réelle sur $(\Omega, \mathcal{A}, P)$.

**Question :** Définir la fonction caractéristique de $X$, donner ses propriétés fondamentales et les exemples classiques.

### VERSO
**Définition**
$$ \varphi_X : \mathbb{R} \to \mathbb{C}, \quad \varphi_X(t) = E[e^{itX}] = \int_\mathbb{R} e^{itx} dP_X(x) $$

**Remarque :** $|\varphi_X(t)| \le E[|e^{itX}|] = 1$, donc $\varphi_X$ est toujours définie et bornée.

**Propriétés fondamentales**
1.  **Valeur en 0 :** $\varphi_X(0) = 1$
2.  **Conjugaison :** $\varphi_X(-t) = \overline{\varphi_X(t)}$
3.  **Continuité :** $\varphi_X$ est continue sur $\mathbb{R}$
4.  **Caractérisation de la loi :** $\varphi_X = \varphi_Y \iff P_X = P_Y$ (injectivité)
5.  **Indépendance :** $X \perp Y \implies \varphi_{X+Y}(t) = \varphi_X(t) \cdot \varphi_Y(t)$
6.  **Lien avec les moments :** Si $E[|X|^k] < +\infty$, alors $\varphi_X$ est $k$ fois dérivable et :
    $$ \varphi_X^{(k)}(0) = i^k E[X^k] $$

**Fonctions caractéristiques classiques**
*   **$N(0, 1)$ :** $e^{-t^2/2}$
*   **$N(\mu, \sigma^2)$ :** $e^{i\mu t - \sigma^2 t^2/2}$
*   **$P(\lambda)$ :** $e^{\lambda(e^{it}-1)}$
*   **$U([a, b])$ :** $\frac{e^{ibt}-e^{iat}}{i(b-a)t}$
*   **$B(n, p)$ :** $(1-p+pe^{it})^n$

### 
**Subtilités**
*   Toujours définie, contrairement à la fonction génératrice des moments $M_X(t) = E[e^{tX}]$ qui peut diverger.
*   **Théorème de Paul Lévy :** $\varphi_{X_n} \to \varphi_X$ ponctuellement $\implies X_n \xrightarrow{\mathcal{L}} X$ (convergence en loi). C'est la base de la preuve du TCL via les fonctions caractéristiques.
*   **Formule d'inversion :** Si $\varphi_X \in L^1(\mathbb{R})$, alors $X$ a une densité $p_X(x) = \frac{1}{2\pi} \int_\mathbb{R} e^{-itx} \varphi_X(t) dt$.

**Pièges classiques**
*   Confondre $\varphi_X(t) = E[e^{itX}]$ (fonction caractéristique, $t$ réel) avec la transformée de Laplace $E[e^{tX}]$ ($t$ réel mais peut diverger) ou la transformée de Fourier.
*   Oublier le $i$ dans $e^{itX}$ : sans $i$, $E[e^{tX}]$ est la fonction génératrice des moments, qui peut ne pas exister.

---

## FLASHCARD 202 — Proposition 64 : Lois classiques

### RECTO
**Proposition 64 — Lois classiques et leurs caractéristiques**

**Question :** Donner le tableau des lois de probabilité classiques du programme MP, avec pour chacune : paramètres, support, espérance et variance.

### VERSO
**Lois discrètes**
*   **Bernoulli $B(p)$** : $p \in [0, 1]$, support $\{0, 1\}$, $E[X]=p$, $Var(X)=p(1-p)$.
*   **Binomiale $B(n, p)$** : $n \in \mathbb{N}^*, p \in [0, 1]$, support $\llbracket 0, n \rrbracket$, $E[X]=np$, $Var(X)=np(1-p)$.
*   **Poisson $P(\lambda)$** : $\lambda > 0$, support $\mathbb{N}$, $E[X]=\lambda$, $Var(X)=\lambda$.
*   **Géométrique $G(p)$** : $p \in ]0, 1]$, support $\mathbb{N}^*$, $E[X]=1/p$, $Var(X)=(1-p)/p^2$.
*   **Uniforme discrète $U(\llbracket a, b \rrbracket)$** : $a \le b \in \mathbb{Z}$, support $\llbracket a, b \rrbracket$, $E[X]=\frac{a+b}{2}$, $Var(X)=\frac{(b-a)(b-a+2)}{12}$.

**Lois continues (à densité)**
*   **Uniforme $U([a, b])$** : $a < b$, densité $\frac{1}{b-a} 1_{[a, b]}$, $E[X]=\frac{a+b}{2}$, $Var(X)=\frac{(b-a)^2}{12}$.
*   **Exponentielle $E(\lambda)$** : $\lambda > 0$, densité $\lambda e^{-\lambda x} 1_{x \ge 0}$, $E[X]=1/\lambda$, $Var(X)=1/\lambda^2$.
*   **Normale $N(\mu, \sigma^2)$** : $\mu \in \mathbb{R}, \sigma > 0$, densité $\frac{1}{\sigma \sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$, $E[X]=\mu$, $Var(X)=\sigma^2$.
*   **Gamma $\Gamma(a, \lambda)$** : $a, \lambda > 0$, densité $\frac{\lambda^a}{\Gamma(a)} x^{a-1} e^{-\lambda x} 1_{x>0}$, $E[X]=a/\lambda$, $Var(X)=a/\lambda^2$.
*   **Beta $B(a, b)$** : $a, b > 0$, densité $\frac{x^{a-1}(1-x)^{b-1}}{B(a, b)} 1_{(0, 1)}$, $E[X]=\frac{a}{a+b}$, $Var(X)=\frac{ab}{(a+b)^2(a+b+1)}$.

### 
**Subtilités et propriétés importantes**
*   **Stabilité de la loi normale :** Si $X \sim N(\mu_1, \sigma_1^2)$ et $Y \sim N(\mu_2, \sigma_2^2)$ indépendantes, $X+Y \sim N(\mu_1+\mu_2, \sigma_1^2+\sigma_2^2)$.
*   **Loi de Poisson comme limite de binomiales :** $B(n, \lambda/n) \xrightarrow{\mathcal{L}} P(\lambda)$ quand $n \to \infty$.
*   **Sans mémoire :** $G(p)$ et $E(\lambda)$ sont les seules lois sans mémoire (discrète et continue resp.).
*   $\chi^2(n) = \Gamma(n/2, 1/2)$ : Loi du chi-deux (hors programme mais utile à connaître).

**Pièges classiques**
*   Confondre $G(p)$ à support $\mathbb{N}^*$ (nombre d'essais avant le premier succès) et $G(p)$ à support $\mathbb{N}$ (nombre d'échecs avant le succès) — conventions différentes selon les ouvrages.
*   Pour $N(\mu, \sigma^2)$ : la variance est $\sigma^2$, l'écart-type est $\sigma$. Ne pas confondre.
*   $Var(U([a, b])) = \frac{(b-a)^2}{12}$ (ne pas confondre avec la variance discrète).

---

## FLASHCARD 203 — Proposition 65 : Inégalité de Markov

### RECTO
**Proposition 65 — Inégalité de Markov**

**Contexte :** Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé et $X$ une variable aléatoire positive ($X \ge 0$ p.s.) et intégrable ($X \in L^1$).

**Question :** Énoncer l'inégalité de Markov avec les hypothèses exactes.

### VERSO
**Hypothèses**
*   $X \ge 0$ p.s.
*   $E[X] < +\infty$

**Énoncé formel**
$$ \forall t > 0 : \quad P(X \ge t) \le \frac{E[X]}{t} $$

**Formulation équivalente :** Pour $f : \mathbb{R}_+ \to \mathbb{R}_+$ croissante avec $f(t) > 0$ :
$$ P(X \ge t) = P(f(X) \ge f(t)) \le \frac{E[f(X)]}{f(t)} $$

**Démonstration**
$E[X] = E[X 1_{X \ge t}] + E[X 1_{X < t}] \ge E[X 1_{X \ge t}] \ge t \cdot E[1_{X \ge t}] = t \cdot P(X \ge t)$
D'où $P(X \ge t) \le \frac{E[X]}{t}$.

### 
**Subtilités**
*   **$X \ge 0$ p.s. est nécessaire :** Pour $X$ quelconque, appliquer Markov à $|X|$ : $P(|X| \ge t) \le \frac{E[|X|]}{t}$.
*   **L'inégalité est optimale :** Pour $X = t \cdot 1_A$ avec $P(A) = p$, $E[X] = tp$ et $P(X \ge t) = p = \frac{E[X]}{t}$ : égalité.
*   **Généralisation :** $P(|X|^p \ge t^p) \le \frac{E[|X|^p]}{t^p}$ pour $p > 0$ (Markov appliqué à $|X|^p$).

**Pièges classiques**
*   Oublier la condition $X \ge 0$ p.s. et appliquer Markov directement à une v.a. signée.
*   Confondre Markov ($P(X \ge t) \le E[X]/t$) et Bienaymé-Tchebychev (qui utilise la variance).

---

## FLASHCARD 204 — Proposition 66 : Inégalité de Bienaymé-Tchebychev

### RECTO
**Proposition 66 — Inégalité de Bienaymé-Tchebychev**

Soit $X \in L^2(\Omega, \mathcal{A}, P)$ une variable aléatoire de carré intégrable.

**Question :** Énoncer l'inégalité de Bienaymé-Tchebychev, la relier à Markov, et donner l'application à la loi des grands nombres.

### VERSO
**Hypothèses**
*   $X \in L^2(\Omega)$ : $E[X^2] < +\infty$
*   $E[X] = \mu$, $\text{Var}(X) = \sigma^2 < +\infty$

**Énoncé formel**
$$ \forall \varepsilon > 0 : \quad P(|X - \mu| \ge \varepsilon) \le \frac{\sigma^2}{\varepsilon^2} = \frac{\text{Var}(X)}{\varepsilon^2} $$

**Démonstration**
Appliquer l'inégalité de Markov à la variable positive $(X - \mu)^2 \in L^1$ et au seuil $\varepsilon^2 > 0$ :
$$ P((X - \mu)^2 \ge \varepsilon^2) \le \frac{E[(X - \mu)^2]}{\varepsilon^2} = \frac{\text{Var}(X)}{\varepsilon^2} $$
Or $\{(X - \mu)^2 \ge \varepsilon^2\} = \{|X - \mu| \ge \varepsilon\}$.

**Application : Loi faible des grands nombres (version $L^2$)**
Soit $(X_n)$ i.i.d. de $L^2$, $\mu = E[X_1]$, $\sigma^2 = \text{Var}(X_1)$. Soit $\bar{X}_n = \frac{1}{n} \sum_{k=1}^n X_k$.

$$ P(|\bar{X}_n - \mu| \ge \varepsilon) \le \frac{\text{Var}(\bar{X}_n)}{\varepsilon^2} = \frac{\sigma^2}{n\varepsilon^2} \xrightarrow[n \to +\infty]{} 0 $$

Donc $\bar{X}_n \xrightarrow{P} \mu$.

### 
**Subtilités**
*   Bienaymé-Tchebychev est une conséquence de Markov (appliqué à $(X-\mu)^2$).
*   L'inégalité ne dépend que de la variance, pas de la forme de la loi : elle est universelle.
*   **Optimalité :** Pour $X$ prenant les valeurs $\mu \pm \varepsilon$ avec probabilités $\frac{\sigma^2}{2\varepsilon^2}$ et $\mu$ avec probabilité $1 - \frac{\sigma^2}{\varepsilon^2}$ (quand $\sigma^2 \le \varepsilon^2$), l'inégalité est une égalité.

**Pièges classiques**
*   Confondre $\varepsilon$ et $\varepsilon^2$ dans le dénominateur.
*   Appliquer B-T sans vérifier $X \in L^2$ (la variance doit être finie).
*   Utiliser B-T quand on connaît la loi explicite : dans ce cas, un calcul direct est plus précis.

---

## FLASHCARD 205 — Théorème 61 : Loi faible des grands nombres

### RECTO
**Théorème 61 — Loi faible des grands nombres (LFGN)**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé et $(X_n)_{n \ge 1}$ une suite de variables aléatoires réelles.

**Question :** Énoncer la loi faible des grands nombres dans sa version la plus générale au programme MP, préciser les hypothèses minimales et la conclusion.

### VERSO
**Hypothèses**
*   **Version $L^2$ (Bienaymé-Tchebychev) :**
    *   $(X_n)_{n \ge 1}$ deux à deux non corrélées (suffit pour cette version)
    *   $\forall n, X_n \in L^2$ avec $E[X_n] = \mu$ et $\text{Var}(X_n) \le C < +\infty$ (variance uniformément bornée)
*   **Version i.i.d. $L^1$ (version classique) :**
    *   $(X_n)_{n \ge 1}$ indépendantes et identiquement distribuées (i.i.d.)
    *   $X_1 \in L^1$ avec $E[X_1] = \mu$

**Énoncé formel**
Soit $\bar{X}_n = \frac{1}{n} \sum_{k=1}^n X_k$ la moyenne empirique.

$$ \bar{X}_n \xrightarrow[n \to +\infty]{P} \mu $$

c'est-à-dire : $\forall \varepsilon > 0, P(|\bar{X}_n - \mu| \ge \varepsilon) \xrightarrow[n \to +\infty]{} 0$.

**Démonstration (version $L^2$)**
$\text{Var}(\bar{X}_n) = \frac{1}{n^2} \sum_{k=1}^n \text{Var}(X_k) \le \frac{C}{n}$ (non-corrélation + variance bornée).
Par Bienaymé-Tchebychev :
$$ P(|\bar{X}_n - \mu| \ge \varepsilon) \le \frac{\text{Var}(\bar{X}_n)}{\varepsilon^2} \le \frac{C}{n\varepsilon^2} \to 0 $$

**Remarque sur la version $L^1$**
La version i.i.d. $L^1$ se démontre via la fonction caractéristique (théorème de Paul Lévy) :
$\varphi_{\bar{X}_n}(t) = (\varphi_{X_1}(t/n))^n \to e^{i\mu t}$ (car $\varphi_{X_1}(t/n) = 1 + i\mu \frac{t}{n} + o(1/n)$).

### 
**Subtilités**
*   **"Faible" = convergence en probabilité**, pas p.s. ni en $L^1$. La loi forte (convergence p.s.) requiert des hypothèses supplémentaires et est hors programme MP.
*   Version $L^2$ suffit en pratique au niveau MP et couvre la quasi-totalité des applications.
*   **Hypothèses minimales pour la version $L^2$ :** Non-corrélation (plus faible que l'indépendance) + $L^2$ + variance bornée.
*   **Hypothèses pour la version i.i.d. $L^1$ :** Strictement plus faible ($L^1$ suffit, pas besoin de $L^2$), mais la preuve utilise des outils plus avancés.

**Extensions**
*   **Loi forte des grands nombres (Kolmogorov) :** i.i.d. $L^1 \implies \bar{X}_n \xrightarrow{p.s.} \mu$. Hors programme MP mais connue des meilleurs candidats.
*   **Théorème central limite :** $\sqrt{n}(\bar{X}_n - \mu) \xrightarrow{\mathcal{L}} N(0, \sigma^2)$ pour i.i.d. $L^2$. Hors programme MP strict.

**Pièges classiques**
*   Confondre LFGN et loi forte : LFGN = convergence en probabilité ($\xrightarrow{P}$), loi forte = p.s.
*   Appliquer LFGN sans vérifier l'intégrabilité : Il faut $E[X_1]$ défini (i.e. $X_1 \in L^1$).
*   Croire que la variance doit être finie pour la version $L^1$ : Non, la version $L^1$ i.i.d. ne requiert pas $L^2$.
*   Oublier que la convergence est en probabilité : $\bar{X}_n(\omega) \to \mu$ pour presque tout $\omega$ est la loi forte, plus forte.
































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































---
# CHAPITRE 99 — Travail Février

## FLASHCARD 1 — Identité combinatoire binomiale

### RECTO
Montrer que $\displaystyle\binom{2n}{n} = \sum_{k=0}^{n} \binom{n}{k}^2$ avec une méthode de dénombrement et en développant $(1+x)^{2n} = (1+x)^n(1+x)^n$.

### VERSO
**Méthode 1 : Dénombrement**

Soit $E$ un ensemble à $2n$ éléments ($n$ rouges, $n$ noirs). $F$ = parties à $n$ éléments, $F_k$ = parties avec $k$ rouges et $n-k$ noirs.

$$F = \bigsqcup_{k=0}^{n} F_k \implies |F| = \sum_{k=0}^{n} |F_k| \implies \binom{2n}{n} = \sum_{k=0}^{n} \binom{n}{k}\binom{n}{n-k} = \sum_{k=0}^{n} \binom{n}{k}^2$$

**Méthode 2 : Développement**

$$(1+x)^{2n} = \sum_{k=0}^{2n} \binom{2n}{k} x^k$$

$$(1+x)^n(1+x)^n = \left(\sum_{k=0}^{n}\binom{n}{k}x^k\right)\left(\sum_{k=0}^{n}\binom{n}{k}x^k\right) = \sum_{i=0}^{n}\sum_{j=0}^{n}\binom{n}{i}\binom{n}{j}x^{i+j}$$

Termes de degré $n$ :

$$\binom{2n}{n} = \sum_{\substack{i+j=n}}\binom{n}{i}\binom{n}{j} = \sum_{i=0}^{n}\binom{n}{i}\binom{n}{n-i} = \sum_{i=0}^{n}\binom{n}{i}^2$$

---

## FLASHCARD 2 — Définition tribu et probabilité

### RECTO
Donner la définition d'une tribu et d'une probabilité.

### VERSO
**Tribu :** Soit $\Omega$ un univers et $\mathcal{A} \subset \mathcal{P}(\Omega)$. $\mathcal{A}$ est une **tribu** ssi :

* $\Omega \in \mathcal{A}$
* $\forall A \in \mathcal{A},\ \bar{A} \in \mathcal{A}$
* $\forall (A_n)_n \in \mathcal{A}^{\mathbb{N}},\ \displaystyle\bigcup_{n \in \mathbb{N}} A_n \in \mathcal{A}$

**Probabilité :** $P : \mathcal{A} \to [0,1]$ est une probabilité sur $(\Omega, \mathcal{A})$ ssi :

* $P(\Omega) = 1$
* $\forall A \in \mathcal{A},\ P(A) \geq 0$
* $\forall (A_n) \in \mathcal{A}^{\mathbb{N}}$ disjoints : $\displaystyle P\!\left(\bigcup_{n \in \mathbb{N}} A_n\right) = \sum_{n \in \mathbb{N}} P(A_n)$

---

## FLASHCARD 3 — Inégalité de Boole

### RECTO
Énoncer et démontrer l'inégalité de Boole.

### VERSO
**Énoncé :** Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé et $(A_n)_n \in \mathcal{A}^{\mathbb{N}}$.

$$P\!\left(\bigcup_{n \in \mathbb{N}} A_n\right) \leq \sum_{n \in \mathbb{N}} P(A_n)$$

**Preuve :** On pose $B_0 = A_0$ et $\forall n \in \mathbb{N}^*,\ B_n = A_n \setminus (A_{n-1} \cup \cdots \cup A_0) \in \mathcal{A}$.

$B_n \subset A_n$ donc $P(B_n) \leq P(A_n)$ et $\displaystyle\bigcup_{n} B_n \subset \bigcup_{n} A_n$.

Or $\forall n,\ A_n \subset \bigcup_{k=0}^{n} B_k$ donc $\displaystyle\bigcup_n A_n \subset \bigcup_n B_n$ donc $\displaystyle\bigcup_n A_n = \bigcup_n B_n$.

$$P\!\left(\bigcup_n A_n\right) = P\!\left(\bigcup_n B_n\right) = \sum_n P(B_n) \leq \sum_n P(A_n)$$

---

## FLASHCARD 4 — Continuité monotone

### RECTO
Énoncer la propriété de continuité monotone et son corollaire.

### VERSO
Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé.

**Continuité monotone :**

* $(A_n)$ **croissante** $\implies P(A_n) \to P\!\left(\bigcup_n A_n\right)$
* $(A_n)$ **décroissante** $\implies P(A_n) \to P\!\left(\bigcap_n A_n\right)$

**Corollaire :** Pour $(A_n) \in \mathcal{A}^{\mathbb{N}}$ quelconque :

* $\displaystyle P\!\left(\bigcup_{k=0}^{n} A_k\right) \xrightarrow{n \to +\infty} P\!\left(\bigcup_{n=0}^{\infty} A_n\right)$
* $\displaystyle P\!\left(\bigcap_{k=0}^{n} A_k\right) \xrightarrow{n \to +\infty} P\!\left(\bigcap_{n=0}^{\infty} A_n\right)$

---

## FLASHCARD 5 — Matrices stochastiques

### RECTO
Montrer que le produit de deux matrices stochastiques positives est stochastique positive, et que les valeurs propres d'une matrice stochastique sont dans la boule unité.

### VERSO
**Produit :** $U$ = colonne de $1$. $A$ stochastique positive $\iff AU = U$ et $a_{ij} \geq 0$.

$ABU = A(BU) = AU = U$ et $(AB)_{ij} = \sum_k a_{ik}b_{kj} \geq 0$. Donc $AB$ stochastique positive.

**Valeurs propres :** Soit $\lambda$ valeur propre, $X$ vecteur propre, $i_0$ tel que $|x_{i_0}| = \max|x_i| > 0$.

$$|\lambda||x_{i_0}| = \left|\sum_{i=1}^{n} a_{i_0,i}x_i\right| \leq \sum_{i=1}^{n} |a_{i_0,i}||x_i| \leq |x_{i_0}|\sum_{i=1}^{n} |a_{i_0,i}| = |x_{i_0}|$$

En divisant par $|x_{i_0}| > 0$ : $|\lambda| \leq 1$.

---

## FLASHCARD 6 — Ensemble dénombrable

### RECTO
Donner la définition d'un ensemble dénombrable et d'un ensemble au plus dénombrable.

### VERSO
Un ensemble est **dénombrable** s'il est en bijection avec $\mathbb{N}$.

Un ensemble est **au plus dénombrable** s'il est fini ou dénombrable.

---

## FLASHCARD 7 — Produit scalaire sur R[X]

### RECTO
Montrer que $\displaystyle\langle P, Q\rangle = \int_{-1}^{1} \frac{P(t)Q(t)}{\sqrt{1-t^2}}\,dt$ définit un produit scalaire sur $\mathbb{R}[X]$. Savoir poser $t = \cos u$.

### VERSO
**Convergence :** $f(t) = \frac{P(t)Q(t)}{\sqrt{1-t^2}}$, cpm sur $]-1,1[$.

En $-1$ : $f(t) = \frac{P(t)Q(t)}{\sqrt{1-t}\sqrt{1+t}} \underset{-1}{=} O\!\left(\frac{1}{\sqrt{1+t}}\right)$ intégrable.

En $1$ : $f(t) \underset{1}{=} O\!\left(\frac{1}{\sqrt{1-t}}\right)$ intégrable. Donc l'intégrale converge.

**Symétrique, bilinéaire :** Immédiat.

**Positive :** $\langle P,P\rangle$ est l'intégrale d'une fonction positive donc $\langle P,P\rangle \geq 0$.

**Définie :** Si $\langle P,P\rangle = 0$ alors $\forall t \in ]-1,1[,\ \frac{P^2(t)}{\sqrt{1-t^2}} = 0$ (fonction positive continue d'intégrale nulle), donc $P^2(t) = 0$ donc $P = 0$ (infinité de racines).

**Changement de variable :** $t = \cos u$, $C^1$ bijection de $[0,\pi]$ dans $[-1,1]$ :

$$\int_{-1}^{1}\frac{P(t)Q(t)}{\sqrt{1-t^2}}\,dt = -\int_{\pi}^{0}\frac{P(\cos u)Q(\cos u)}{|\sin u|}(-\sin u)\,du = \int_0^{\pi} P(\cos u)Q(\cos u)\,du$$

---

## FLASHCARD 8 — Famille orthogonale libre

### RECTO
Montrer qu'une famille finie de vecteurs non nuls, deux-à-deux orthogonaux d'un espace $E$ préhilbertien est libre.

### VERSO
Soient $(x_1,\ldots,x_n)$ non nuls deux-à-deux orthogonaux et $(\lambda_1,\ldots,\lambda_n) \in \mathbb{R}^n$ tels que $\sum_{i=1}^{n}\lambda_i x_i = 0$.

Soit $k \in [\![1,n]\!]$ :

$$0 = \langle 0, x_k\rangle = \left\langle\sum_{i=1}^{n}\lambda_i x_i, x_k\right\rangle = \sum_{i=1}^{n}\lambda_i\langle x_i, x_k\rangle = \lambda_k\|x_k\|^2$$

Comme $x_k \neq 0$, $\|x_k\|^2 > 0$ donc $\lambda_k = 0$.

$\forall k,\ \lambda_k = 0$ : la famille est libre.

---

## FLASHCARD 9 — Adjoint d'un endomorphisme

### RECTO
Donner la définition de l'adjoint de $u \in \mathcal{L}(E)$ et sa matrice dans une b.o.n. de $E$ euclidien.

### VERSO
L'adjoint de $u$ est l'unique endomorphisme $u^*$ de $E$ tel que :

$$\forall (x,y) \in E^2,\ \langle u(x), y\rangle = \langle x, u^*(y)\rangle$$

Dans une b.o.n. $\mathcal{B}$ de $E$ :

$$\mathrm{Mat}_{\mathcal{B}}(u^*) = \mathrm{Mat}_{\mathcal{B}}(u)^\top$$

---

## FLASHCARD 10 — Projeté orthogonal

### RECTO
Donner l'expression du projeté orthogonal sur une droite et sur un hyperplan.

### VERSO
**Droite :** $D = \mathrm{Vect}(u)$ :

$$p_D(x) = \frac{\langle x, u\rangle}{\|u\|^2}\,u$$

**Hyperplan :** $H$ hyperplan, $D = \mathrm{Vect}(u) = H^\perp$ :

$$p_H(x) = x - p_D(x) = x - \frac{\langle x, u\rangle}{\|u\|^2}\,u$$

---

## FLASHCARD 11 — Théorème spectral

### RECTO
Énoncer le théorème spectral pour les matrices et les endomorphismes (cas réel).

### VERSO
Pour $E$ **euclidien** (réel) :

* Soit $M$ une matrice **symétrique réelle**. Elle est **orthodiagonalisable** : $\exists P \in O_n(\mathbb{R}),\ M = PDP^\top$.

* Soit $u \in \mathcal{S}(E)$ (endomorphisme symétrique). Alors $\mathrm{Sp}(u) \subset \mathbb{R}$ et $u$ est diagonalisable dans une **b.o.n.** de ses vecteurs propres.

---

## FLASHCARD 12 — Orthodiagonalisation

### RECTO
Orthodiagonaliser $A = \begin{pmatrix} 2 & 1 & 0 \\ 1 & 2 & 1 \\ 0 & 1 & 2 \end{pmatrix}$.

### VERSO
$\chi_A = (\lambda-2)((\lambda-2)^2 - 2) = (X-2)(X-2-\sqrt{2})(X-2+\sqrt{2})$

Espaces propres :

* $E_2 = \mathrm{Vect}(1, 0, -1)$
* $E_{2+\sqrt{2}} = \mathrm{Vect}(1, \sqrt{2}, 1)$
* $E_{2-\sqrt{2}} = \mathrm{Vect}(1, -\sqrt{2}, 1)$

Après **orthonormalisation** :

$$P = \begin{pmatrix} \frac{1}{\sqrt{2}} & \frac{1}{2} & \frac{1}{2} \\ 0 & \frac{\sqrt{2}}{2} & -\frac{\sqrt{2}}{2} \\ -\frac{1}{\sqrt{2}} & \frac{1}{2} & \frac{1}{2} \end{pmatrix} \in O_3(\mathbb{R}),\quad D = \begin{pmatrix} 2 & 0 & 0 \\ 0 & 2+\sqrt{2} & 0 \\ 0 & 0 & 2-\sqrt{2} \end{pmatrix}$$

$A = PDP^\top$.

---

## FLASHCARD 13 — Orthogonalité Sn et An

### RECTO
Montrer que $S_n(\mathbb{R})$ et $A_n(\mathbb{R})$ sont orthogonaux pour le produit scalaire usuel sur $M_n(\mathbb{R})$.

### VERSO
On utilise $\mathrm{Tr}(AB) = \mathrm{Tr}(BA)$ et $\mathrm{Tr}((AB)^\top) = \mathrm{Tr}(B^\top A^\top)$.

Pour $S \in S_n(\mathbb{R})$ et $A \in A_n(\mathbb{R})$ :

$$\mathrm{Tr}(S^\top A) = \mathrm{Tr}(SA)$$

Mais aussi :

$$\mathrm{Tr}(S^\top A) = \mathrm{Tr}(A^\top S) = \mathrm{Tr}((-A)S) = -\mathrm{Tr}(AS) = -\mathrm{Tr}(SA)$$

Donc $\mathrm{Tr}(SA) = -\mathrm{Tr}(SA) = 0$. Donc $S_n(\mathbb{R}) \perp A_n(\mathbb{R})$.

---

## FLASHCARD 14 — On(R) groupe, det²=1

### RECTO
Montrer que $O_n(\mathbb{R})$ est un groupe multiplicatif, et que si $A \in O_n(\mathbb{R})$ alors $\det(A)^2 = 1$.

### VERSO
**Déterminant :** $AA^\top = I_n \implies \det(A)\det(A^\top) = \det(A)^2 = 1$.

**Groupe :** Montrons que $O_n(\mathbb{R})$ est un sous-groupe de $GL_n(\mathbb{R})$.

* $O_n(\mathbb{R}) \subset GL_n(\mathbb{R})$ car $\det(A)^2 = 1 \neq 0$.
* $I_n \in O_n(\mathbb{R})$ car $I_nI_n^\top = I_n$.
* $AB \in O_n(\mathbb{R})$ car $(AB)(AB)^\top = A(BB^\top)A^\top = AA^\top = I_n$.
* $A^{-1} \in O_n(\mathbb{R})$ car $A^{-1}(A^{-1})^\top = A^{-1}(A^\top)^{-1} = (A^\top A)^{-1} = I_n$.

Par caractérisation, c'est un sous-groupe de $GL_n(\mathbb{R})$.

---

## FLASHCARD 15 — Théorème de Riesz

### RECTO
Énoncer le théorème de représentation de Riesz.

### VERSO
Soit $(E, \langle\cdot,\cdot\rangle)$ un espace **euclidien** et $\varphi \in \mathcal{L}(E, \mathbb{R})$, alors :

$$\exists!\, a \in E,\ \forall x \in E,\ \varphi(x) = \langle a, x\rangle$$

---

## FLASHCARD 16 — Isométries équivalences

### RECTO
Donner la définition d'une isométrie et montrer les équivalences : conservation de la norme $\iff$ conservation du produit scalaire $\iff$ $u^* \circ u = \mathrm{Id}$.

### VERSO
$u \in \mathcal{L}(E)$ est une **isométrie** ssi $\forall x \in E,\ \|u(x)\| = \|x\|$.

**Norme $\implies$ produit scalaire :** $\|x+y\|^2 = \|u(x)+u(y)\|^2$ donne :

$$\|x\|^2 + 2\langle x,y\rangle + \|y\|^2 = \|u(x)\|^2 + 2\langle u(x),u(y)\rangle + \|u(y)\|^2$$

Donc $\langle x,y\rangle = \langle u(x),u(y)\rangle$.

**Produit scalaire $\implies$ norme :** Pour $x = y$ : $\|u(x)\|^2 = \|x\|^2$.

**Produit scalaire $\iff$ $u^*u = \mathrm{Id}$ :**

$$\langle u(x),u(y)\rangle = \langle x,y\rangle \iff \langle u^*u(x),y\rangle = \langle x,y\rangle \iff u^*u(x) = x \iff u^*u = \mathrm{Id}$$

---

## FLASHCARD 17 — SO2(R) commutatif

### RECTO
Donner la forme des matrices de $SO_2(\mathbb{R})$ et montrer que $SO_2(\mathbb{R})$ est un groupe commutatif.

### VERSO
$$SO_2(\mathbb{R}) = \left\{\begin{pmatrix}\cos\theta & -\sin\theta \\ \sin\theta & \cos\theta\end{pmatrix},\ \theta \in \mathbb{R}\right\}$$

**Sous-groupe de $O_2(\mathbb{R})$ :**

* $SO_2(\mathbb{R}) \subset O_2(\mathbb{R})$ avec $\det = 1$.
* $AB \in SO_2(\mathbb{R})$ car $\det(AB) = 1$.
* $A^{-1} \in SO_2(\mathbb{R})$ car $\det(A^{-1}) = 1$.

**Commutativité :** $R(\alpha)R(\beta) = R(\alpha+\beta) = R(\beta+\alpha) = R(\beta)R(\alpha)$.

---

## FLASHCARD 18 — Réduction des isométries

### RECTO
Énoncer le théorème de réduction des isométries.

### VERSO
Soit $E$ euclidien de dimension $n$ et $u \in O(E)$. Il existe une base $\mathcal{B}$ de $E$ telle que :

$$\mathrm{Mat}_{\mathcal{B}}(u) = \begin{pmatrix} R(\theta_1) & & (0) \\ & \ddots & \\ & & R(\theta_r) \\ & & & I_p \\ (0) & & & & -I_q \end{pmatrix}$$

avec $R(\theta) = \begin{pmatrix}\cos\theta & -\sin\theta \\ \sin\theta & \cos\theta\end{pmatrix}$ et $(r,p,q) \in \mathbb{N}^3$, $(\theta_1,\ldots,\theta_r) \in \mathbb{R}^r$.

---

## FLASHCARD 19 — Matrice symétrique complexe non diagonalisable

### RECTO
Donner un exemple de matrice symétrique complexe non diagonalisable.

### VERSO
$$A = \begin{pmatrix} 2 & i \\ i & 0 \end{pmatrix} \in M_2(\mathbb{C})$$

$\chi_A = X^2 - 2X + 1 = (X-1)^2$ et $E_1 = \mathrm{Vect}(1, i)$ de dimension $1$.

$A$ n'est **pas diagonalisable** (sous-espace propre de dimension $1 < 2$), mais est bien **symétrique complexe** ($A^\top = A$).

---

## FLASHCARD 20 — Matrice symétrique positive et forme quadratique

### RECTO
Soit $A \in S_n(\mathbb{R})$. Montrer : valeurs propres positives $\iff$ $\forall X \in M_{n,1}(\mathbb{R}),\ X^\top AX \geq 0$.

### VERSO
Par théorème spectral : $A = PDP^\top$ avec $P \in O_n(\mathbb{R})$, $D = \mathrm{Diag}(\lambda_i)$.

**$\implies$** Supposons $\mathrm{Sp}(A) \subset \mathbb{R}_+$. Soit $X \in M_{n,1}(\mathbb{R})$, posons $Y = P^\top X$ :

$$X^\top AX = Y^\top DY = \sum_{i=1}^{n}\lambda_i y_i^2 \geq 0$$

**$\impliedby$** Supposons $\forall X,\ X^\top AX \geq 0$. Pour $\lambda \in \mathrm{Sp}(A)$ et $X$ vecteur propre :

$$X^\top AX = \lambda X^\top X = \lambda\|X\|^2 \geq 0 \implies \lambda \geq 0$$

---

## FLASHCARD 21 — Inégalité de Cauchy-Schwarz

### RECTO
Énoncer et démontrer l'inégalité de Cauchy-Schwarz. Écrire les cas usuels pour $\mathbb{R}^n$, $M_n(\mathbb{R})$ et $\mathcal{C}^0([a,b])$.

### VERSO
**Énoncé :** Soit $(E,\langle\cdot,\cdot\rangle)$ préhilbertien réel. $\forall u,v \in E$ : $|\langle u,v\rangle| \leq \|u\|\cdot\|v\|$.

**Preuve :** $P(\lambda) = \langle x+\lambda y, x+\lambda y\rangle = \|x\|^2 + 2\lambda\langle x,y\rangle + \lambda^2\|y\|^2 \geq 0$.

$\Delta = 4(\langle x,y\rangle^2 - \|x\|^2\|y\|^2) \leq 0$ donc $|\langle x,y\rangle| \leq \|x\|\|y\|$.

**Cas usuels :**

$$\left(\sum_{i=1}^{n}x_iy_i\right)^2 \leq \left(\sum x_i^2\right)\left(\sum y_i^2\right)$$

$$\left(\sum_{i,j}[A]_{j,i}[B]_{j,i}\right)^2 \leq \left(\sum [A]_{j,i}^2\right)\left(\sum [B]_{j,i}^2\right)$$

$$\left(\int_a^b f(t)g(t)\,dt\right)^2 \leq \left(\int_a^b f^2\right)\left(\int_a^b g^2\right)$$

---

## FLASHCARD 22 — Caractérisations projections orthogonales

### RECTO
Donner deux caractérisations des projections orthogonales.

### VERSO
Soit $E$ euclidien et $p$ un projecteur de $E$. $p$ est orthogonal ssi l'une des deux :

* $\forall x \in E,\ \|p(x)\| \leq \|x\|$
* $p$ est **autoadjoint** ($p^* = p$)

---

## FLASHCARD 23 — Matrice de projection orthogonale

### RECTO
Comment reconnaître une matrice de projection et une matrice de projection orthogonale ?

### VERSO
$P \in M_n(\mathbb{R})$ est matrice d'une **projection** ssi $P^2 = P$.

De surcroît **orthogonale** ssi $P^\top = P$.

---

## FLASHCARD 24 — Inégalité exponentielle par Taylor

### RECTO
Montrer que $\forall x \geq 0,\ \forall n \in \mathbb{N},\ e^x \geq 1 + x + \cdots + \frac{x^n}{n!}$.

### VERSO
**Méthode DSE :**

$$e^x = \sum_{k=0}^{\infty}\frac{x^k}{k!} = \sum_{k=0}^{n}\frac{x^k}{k!} + \underbrace{\sum_{k=n+1}^{\infty}\frac{x^k}{k!}}_{\geq 0} \geq \sum_{k=0}^{n}\frac{x^k}{k!}$$

**Méthode Taylor avec reste intégral :** $\exp \in C^{n+1}([0,x],\mathbb{R})$ :

$$e^x = \sum_{k=0}^{n}\frac{x^k}{k!} + \underbrace{\int_0^x \frac{(x-t)^n}{n!}e^t\,dt}_{\geq 0} \geq \sum_{k=0}^{n}\frac{x^k}{k!}$$

---

## FLASHCARD 25 — Fonction convexe sur ses tangentes

### RECTO
Soit $f \in C^2(I)$ convexe. Montrer qu'elle est au-dessus de ses tangentes avec Taylor intégral.

### VERSO
Taylor avec reste intégral à l'ordre $2$ sur $I = [a,x]$ :

$$f(x) = f(a) + f'(a)(x-a) + \int_a^x (x-t)f''(t)\,dt$$

$f$ convexe $\implies f'' \geq 0$ donc $\int_a^x (x-t)f''(t)\,dt \geq 0$.

$$\forall x \in I,\ f(x) \geq f(a) + f'(a)(x-a)$$

C'est l'équation de la tangente en $a$.

---

## FLASHCARD 26 — Intégrale de ln

### RECTO
Justifier l'existence de $\displaystyle\int_0^1 \ln(t)\,dt$ et la calculer.

### VERSO
$\ln$ est cpm sur $]0,1]$, prolongeable par continuité en $0$ par $0 \cdot \ln 0 = 0$.

Pour $a \in ]0,1]$ :

$$\int_a^1 \ln(t)\,dt = [t\ln t - t]_a^1 = -1 - (a\ln a - a)= a - 1 - a\ln a$$

Par croissances comparées : $a\ln a \xrightarrow{a \to 0} 0$, donc :

$$\int_0^1 \ln(t)\,dt = -1$$

---

## FLASHCARD 27 — Convergence de sin(t)/t

### RECTO
Justifier la convergence de $\displaystyle\int_0^{+\infty}\frac{\sin t}{t}\,dt$.

### VERSO
$f : t \mapsto \frac{\sin t}{t}$, cpm sur $\mathbb{R}_+^*$.

**En $0$ :** prolongeable par continuité, $f(0) = 1$.

**En $+\infty$ :** IPP avec $u = -\cos t$, $v = \frac{1}{t}$, $u,v \in C^1([\frac{\pi}{2},+\infty[)$.

$[uv]_{\pi/2}^{+\infty} = 0$ donc $\displaystyle\int_{\pi/2}^{+\infty}\frac{\sin t}{t}\,dt$ est de même nature que $\displaystyle\int_{\pi/2}^{+\infty}\frac{\cos t}{t^2}\,dt$.

$\left|\frac{\cos t}{t^2}\right| \leq \frac{1}{t^2}$ : convergence par comparaison à une intégrale de Riemann.

---

## FLASHCARD 28 — Nature de trois intégrales avec ln

### RECTO
Déterminer la nature de $\displaystyle\int_2^{+\infty}\frac{\ln t}{t}\,dt$, $\displaystyle\int_2^{+\infty}\frac{\ln t}{t^2}\,dt$, $\displaystyle\int_2^{+\infty}\frac{1}{t\ln t}\,dt$.

### VERSO
**1.** $\frac{\ln t}{t} \geq \frac{1}{t}$ pour $t \geq e$ : **diverge** par comparaison.

**2.** Par croissances comparées : $\frac{\ln t}{t^2} = o\!\left(\frac{1}{t^{3/2}}\right)$ : **converge** par comparaison.

**3.** $\displaystyle\int_2^{+\infty}\frac{dt}{t\ln t} = [\ln(\ln t)]_2^{+\infty}$ : **diverge**.

---

## FLASHCARD 29 — Relation fonctionnelle Gamma

### RECTO
Montrer avec une IPP généralisée que $\forall x > 0,\ \Gamma(x+1) = x\,\Gamma(x)$.

### VERSO
$$\Gamma(x) = \int_0^{+\infty} t^{x-1}e^{-t}\,dt$$

IPP avec $u = t^x$, $u' = xt^{x-1}$, $v = -e^{-t}$, $v' = e^{-t}$, $u,v \in C^1(\mathbb{R}_+^*)$.

$[uv]_0^{+\infty} = [-t^x e^{-t}]_0^{+\infty} = 0$ par croissances comparées.

$$\Gamma(x+1) = \int_0^{+\infty}t^x e^{-t}\,dt = \left[-t^x e^{-t}\right]_0^{+\infty} + \int_0^{+\infty}xt^{x-1}e^{-t}\,dt = x\,\Gamma(x)$$

---

## FLASHCARD 30 — Théorème de convergence dominée

### RECTO
Énoncer le théorème de convergence dominée.

### VERSO
Soit $(f_n)_n$ une suite de fonctions cpm sur $I$.

Si $f_n \xrightarrow{\text{CS}} f$ cpm sur $I$ et $\forall n,\ |f_n| \leq \varphi$ avec $\varphi : I \to \mathbb{R}_+$ **intégrable** sur $I$, alors :

$$\int_I f_n \xrightarrow{n \to +\infty} \int_I f$$

---

## FLASHCARD 31 — Intégrale à paramètre F(λ)

### RECTO
Soit $F(\lambda) = \int_0^{+\infty}f(t)e^{-\lambda t}\,dt$ avec $f$ continue bornée sur $\mathbb{R}$. Montrer que $F$ est définie, continue et $C^1$ sur $\mathbb{R}_+^*$, puis que $\lim_{\lambda \to +\infty}F(\lambda) = 0$.

### VERSO
On pose $g(\lambda,t) = f(t)e^{-\lambda t}$, $|f| \leq M$.

**Définie :** $|g(\lambda,t)| \leq Me^{-\lambda t}$, intégrable car $\lambda > 0$.

**Continue :** $\forall \alpha > 0,\ \forall \lambda > \alpha$ : $|g(\lambda,t)| \leq Me^{-\alpha t}$ intégrable. Par théorème de continuité sous l'intégrale.

**$C^1$ :** $\frac{\partial g}{\partial\lambda} = -tf(t)e^{-\lambda t}$, $\forall \lambda > \alpha$ : $|\frac{\partial g}{\partial\lambda}| \leq tMe^{-\alpha t} = O(e^{-\alpha t/2})$ intégrable. Par théorème de dérivation sous l'intégrale.

**Limite :** $(\lambda_n) \to +\infty$, $g_n(t) = g(\lambda_n,t) \xrightarrow{\text{CS}} 0$, $|g_n| \leq Me^{-t}$ intégrable. Par TCD : $F(\lambda) \to 0$.

---

## FLASHCARD 32 — Théorème d'échange série-intégrale

### RECTO
Énoncer le théorème d'échange série-intégrale.

### VERSO
Soit $(f_n)_n$ une suite de fonctions cpm sur $I$.

Si $\sum f_n$ converge simplement vers une fonction cpm sur $I$ et $\displaystyle\sum_{n \in \mathbb{N}}\int_I |f_n|$ converge, alors :

$$\sum_{n \in \mathbb{N}}\int_I f_n = \int_I \sum_{n \in \mathbb{N}} f_n$$

---

## FLASHCARD 33 — Suite d'intégrales un

### RECTO
Pour $n \geq 1$, $u_n = \int_0^{+\infty}\frac{dt}{(1+t^2)^n}$. Montrer que $(u_n)$ décroît vers $0$, étudier $\sum u_n$ et $\sum(-1)^n u_n$.

### VERSO
**Décroissance :** $u_{n+1} - u_n = \int_0^{+\infty}\left(\frac{1}{(1+t^2)^{n+1}} - \frac{1}{(1+t^2)^n}\right)dt \leq 0$.

**Limite :** $f_n(t) = \frac{1}{(1+t^2)^n} \xrightarrow{\text{CS}} 0$, $|f_n| \leq \frac{1}{1+t^2}$ intégrable. Par TCD : $u_n \to 0$.

**$\sum(-1)^n u_n$ :** converge par CSSA.

**$\sum u_n$ :** $u_n \sim \frac{\sqrt{\pi}}{2\sqrt{n}}$ (par formule de Wallis), diverge par comparaison à série de Riemann.

---

## FLASHCARD 34 — Écriture en série de Ip

### RECTO
Écrire sous forme de série : $I_p = \int_0^{+\infty}\frac{t^p}{e^t - 1}\,dt$ pour $p \geq 2$.

### VERSO
**Convergence :** En $0$ : $\frac{t^p}{e^t-1} \sim t^{p-1}$, $p > 1$ ok. En $+\infty$ : $o(1/t^2)$ par croissances comparées.

**Développement :**

$$\frac{1}{e^t-1} = e^{-t}\sum_{n=0}^{\infty}e^{-nt} = \sum_{n=0}^{\infty}e^{-(n+1)t}$$

Changement de variable $u = (n+1)t$ :

$$\int_0^{+\infty}t^p e^{-(n+1)t}\,dt = \frac{1}{(n+1)^{p+1}}\int_0^{+\infty}u^p e^{-u}\,du = \frac{p!}{(n+1)^{p+1}}$$

Par **échange série-intégrale** (vérification des hypothèses) :

$$I_p = \sum_{n=0}^{\infty}\frac{p!}{(n+1)^{p+1}} = p!\sum_{k=1}^{\infty}\frac{1}{k^{p+1}}$$

---

## FLASHCARD 35 — Intégrale à paramètre F(x) avec cos

### RECTO
Soit $F(x) = \int_0^{+\infty}\frac{1-\cos(xt)}{t^2}e^{-t}\,dt$. Montrer que $F$ est définie sur $\mathbb{R}$, $C^2$, calculer $F''(x)$ puis $F(x)$.

### VERSO
**Domination :** $\frac{1-\cos(xt)}{t^2} = \frac{2\sin^2(xt/2)}{t^2} \leq \frac{x^2}{2}$, donc $|f(x,t)| \leq \frac{A^2}{2}e^{-t}$ sur $[0,A]$.

**Dérivées :** $\frac{\partial f}{\partial x} = \frac{\sin(xt)}{t}e^{-t}$, $\frac{\partial^2 f}{\partial x^2} = \cos(xt)e^{-t}$.

Dominations locales analogues $\implies F \in C^2(\mathbb{R})$.

**Calcul de $F''$ :**

$$F''(x) = \int_0^{+\infty}\cos(xt)e^{-t}\,dt = \mathrm{Re}\!\int_0^{+\infty}e^{(ix-1)t}\,dt = \mathrm{Re}\!\left(\frac{1}{1-ix}\right) = \frac{1}{1+x^2}$$

**Primitives :** $F'(x) = \arctan x + C$. $F$ paire $\implies F'$ impaire $\implies F'(0) = 0 \implies C = 0$.

$$F'(x) = \arctan x$$

IPP sur $\int\arctan$ : $F(x) = x\arctan x - \frac{1}{2}\ln(1+x^2) + \alpha$. $F(0) = 0 \implies \alpha = 0$.

$$\boxed{F(x) = x\arctan x - \frac{1}{2}\ln(1+x^2)}$$

---

## FLASHCARD 36 — Preuve de Riesz et existence de l'adjoint

### RECTO
Démontrer le théorème de Riesz puis l'existence et l'unicité de l'adjoint.

### VERSO
**Riesz :** On pose $\psi : a \mapsto (x \mapsto \langle a,x\rangle)$ de $E$ dans $\mathcal{L}(E,\mathbb{R})$.

* **Linéaire :** $\psi(a+\lambda b)(x) = \langle a,x\rangle + \lambda\langle b,x\rangle$.
* **Injective :** $\psi(a) = 0 \implies \langle a,a\rangle = 0 \implies a = 0$.
* $\dim\mathcal{L}(E,\mathbb{R}) = \dim E$ donc $\psi$ bijective.

Donc $\forall\varphi \in \mathcal{L}(E,\mathbb{R}),\ \exists!a,\ \varphi(x) = \langle a,x\rangle$.

**Adjoint :** Pour $x$ fixé, $\varphi_x : y \mapsto \langle u(y),x\rangle \in \mathcal{L}(E,\mathbb{R})$.

Par Riesz : $\exists!a_x,\ \varphi_x(y) = \langle a_x,y\rangle$. On pose $u^*(x) = a_x$.

$$\forall(x,y),\ \langle x, u(y)\rangle = \langle u^*(x), y\rangle$$

---

## FLASHCARD 37 — Ker(u*u) = Ker(u) et rg(A⊤A) = rg(A)

### RECTO
Montrer $\ker(u^* \circ u) = \ker(u)$ puis $\mathrm{rg}(A^\top A) = \mathrm{rg}(A)$.

### VERSO
$\ker u \subset \ker(u^*u)$ : trivial.

$\ker(u^*u) \subset \ker u$ : Soit $x \in \ker(u^*u)$ :

$$\|u(x)\|^2 = \langle u(x),u(x)\rangle = \langle x, u^*u(x)\rangle = 0 \implies u(x) = 0$$

**Rang :** $\mathrm{Mat}_\mathcal{B}(u^*u) = A^\top A$ donc $\ker(A^\top A) = \ker A$.

Par théorème du rang : $n = \mathrm{rg}(A^\top A) + \dim\ker(A^\top A) = \mathrm{rg}(A) + \dim\ker A$.

Donc $\mathrm{rg}(A^\top A) = \mathrm{rg}(A)$. De même $\mathrm{rg}(AA^\top) = \mathrm{rg}(A)$.

---

## FLASHCARD 38 — Matrice de passage de Schmidt triangulaire

### RECTO
Montrer que la matrice de passage d'une base à sa b.o.n. de Schmidt est triangulaire supérieure à diagonale strictement positive.

### VERSO
Soit $\mathcal{B} = (a_1,\ldots,a_n)$ base, $\mathcal{B}' = (e_1,\ldots,e_n)$ orthonormalisée de Schmidt.

$P^{-1}$ de $\mathcal{B}'$ à $\mathcal{B}$ : $(P^{-1})_{i,j} = \langle a_j, e_i\rangle$.

$\forall i,\ a_i \in \mathrm{Vect}(e_1,\ldots,e_i)$ donc $\langle a_j, e_i\rangle = 0$ pour $i > j$.

De plus $\langle a_i, e_i\rangle > 0$ (même demi-espace).

Donc $P^{-1}$ est **triangulaire supérieure à diagonale $> 0$**, et $P$ aussi.

---

## FLASHCARD 39 — On compact, GLn dense, SOn connexe, S+n fermé

### RECTO
Montrer que $O_n(\mathbb{R})$ est compact, $GL_n(\mathbb{R})$ dense dans $M_n(\mathbb{R})$, $SO_n(\mathbb{R})$ connexe par arcs et $S_n^+(\mathbb{R})$ fermé.

### VERSO
**$O_n$ borné :** $\|A\| = \sqrt{\mathrm{Tr}(A^\top A)} = \sqrt{n}$.

**$O_n$ fermé :** $A_k \to A$ avec $A_kA_k^\top = I_n$. $A^\top$ continue, donc $AA^\top = I_n$.

**$GL_n$ dense :** $A_p = A - \frac{1}{p}I_n \to A$. $\det(A_p) = (-1)^n\chi_A(\frac{1}{p}) \neq 0$ àpdcr.

**$SO_n$ connexe par arcs :** Par réduction, $A = P\,\mathrm{Diag}(R(\theta_i), I_p)\,P^{-1}$. Le chemin $\varphi(t) = P\,\mathrm{Diag}(R(t\theta_i), I_p)\,P^{-1}$ est continu, $\varphi(0) = I_n$, $\varphi(1) = A$.

**$S_n^+$ fermé :** $A_k \to A$, $X^\top A_k X \geq 0$, par continuité $X^\top AX \geq 0$.

---

## FLASHCARD 40 — Loi du 0/1 de Borel

### RECTO
Démontrer la loi du $0/1$ de Borel.

### VERSO
$A = \bigcap_p \bigcup_{n \geq p} A_n$ (événements réalisés infiniment souvent).

**Cas 1 : $\sum P(A_n) < \infty \implies P(A) = 0$.**

$B_p = \bigcup_{n \geq p}A_n$ décroissante. Par continuité monotone : $P(A) = \lim P(B_p)$.

Boole : $P(B_p) \leq \sum_{n \geq p}P(A_n) \to 0$ (reste de série convergente).

**Cas 2 : $\sum P(A_n) = \infty$ et $(A_n)$ mutuellement indépendante $\implies P(A) = 1$.**

$\overline{A} = \bigcup_p C_p$ avec $C_p = \bigcap_{n \geq p}\overline{A_n}$ croissante.

$(A_n)$ indépendants $\implies (\overline{A_n})$ indépendants.

$$P(C_p) = \lim_N P\!\left(\bigcap_{n=p}^{N}\overline{A_n}\right) = \lim_N \prod_{n=p}^{N}(1-P(A_n))$$

$1-x \leq e^{-x}$ donc $\prod(1-P(A_n)) \leq \exp(-\sum P(A_n)) \to 0$.

$P(\overline{A}) = \lim P(C_p) = 0$ donc $P(A) = 1$.

---

## FLASHCARD 41 — R non dénombrable

### RECTO
Montrer que $\mathbb{R}$ (ou $\{0,1\}^{\mathbb{N}}$) n'est pas dénombrable.

### VERSO
Supposons $[0,1[$ dénombrable : $\exists\varphi : \mathbb{N} \to [0,1[$ bijective.

Écriture décimale : $\varphi(n) = 0{,}x_0^n x_1^n \ldots$

On construit $y = 0{,}y_0 y_1 \ldots$ avec $y_n \neq x_n^n$ pour tout $n$.

$\forall n,\ \varphi(n) \neq y$ car $y_n \neq x_n^n$. Or $y \in [0,1[$ : $\varphi$ non surjective. **Absurde.**

Puis $\forall a < b$, $\lambda \mapsto \lambda a + (1-\lambda)b$ est bijective de $[0,1[$ dans $]a,b]$ donc $]a,b]$ indénombrable.

Donc $\mathbb{R}$ n'est pas dénombrable.

---

## FLASHCARD 42 — Réunion dénombrable d'ensembles dénombrables

### RECTO
Montrer qu'une réunion dénombrable d'ensembles dénombrables est dénombrable.

### VERSO
Soit $(A_i)_{i \in I}$ des ensembles dénombrables non vides ($I$ dénombrable).

$\forall i \in I$, $\exists f_i : \mathbb{N} \to A_i$ bijection (car $A_i$ dénombrable).

On définit $f : I \times \mathbb{N} \to \bigcup_i A_i$ par $f(i,n) = f_i(n)$, **surjective**.

$I \times \mathbb{N}$ est dénombrable (produit cartésien d'ensembles dénombrables).

Donc $\bigcup_i A_i$ est au plus dénombrable. Si infini, il est dénombrable.

---

## FLASHCARD 43 — Codiagonalisation dans une b.o.n.

### RECTO
Montrer que si $u$ et $v$ commutent et sont autoadjoints, alors ils sont codiagonalisables dans une b.o.n.

### VERSO
$u \in \mathcal{S}(E) \implies E = \bigoplus E_\lambda$ (espaces propres de $u$).

$uv = vu \implies \forall\lambda \in \mathrm{Sp}(u),\ v(E_\lambda) \subset E_\lambda$.

$v_\lambda = v|_{E_\lambda} \in \mathcal{S}(E_\lambda)$ (restriction d'un autoadjoint).

Par théorème spectral sur $E_\lambda$ : $\exists\mathcal{B}_\lambda$ b.o.n. de $E_\lambda$ de vecteurs propres de $v_\lambda$.

$\mathcal{B} = \bigcup_\lambda \mathcal{B}_\lambda$ est une b.o.n. de $E$, chaque vecteur est vecteur propre de $u$ **et** de $v$.

---

## FLASHCARD 44 — Projection orthogonale par la norme

### RECTO
Montrer que $p$ projecteur est orthogonal ssi $\forall x \in E,\ \|p(x)\| \leq \|x\|$.

### VERSO
$p$ projecteur sur $F = \mathrm{Im}(p)$, $G = \ker(p)$, $E = F \oplus G$.

**$\implies$** $p$ orthogonal : $x = p(x) + (x-p(x))$ avec $p(x) \perp (x-p(x))$.

$\|x\|^2 = \|p(x)\|^2 + \|x-p(x)\|^2 \geq \|p(x)\|^2$.

**$\impliedby$** Soit $x \in F$, $y \in G$, $\forall\lambda$ : $p(x+\lambda y) = x$ donc $\|x\| \leq \|x+\lambda y\|$.

$\|x\|^2 \leq \|x\|^2 + 2\lambda\langle x,y\rangle + \lambda^2\|y\|^2$, vrai $\forall\lambda$.

$\Delta = 4\langle x,y\rangle^2 \leq 0$, or $\langle x,y\rangle^2 \geq 0$ donc $\langle x,y\rangle = 0$.

Donc $F \perp G$ : $p$ est orthogonal.

---

## FLASHCARD 45 — Racine carrée d'une matrice S+n

### RECTO
Montrer que si $A \in S_n^+(\mathbb{R})$, alors $\exists!\, B \in S_n^+(\mathbb{R})$ telle que $A = B^2$.

### VERSO
**Existence :** Théorème spectral : $A = PDP^\top$, $D = \mathrm{Diag}(\lambda_i)$, $\lambda_i \geq 0$.

$\Delta = \mathrm{Diag}(\sqrt{\lambda_i})$, $B = P\Delta P^\top$. Alors $B^2 = P\Delta^2 P^\top = A$, $B^\top = B$, $\mathrm{Sp}(B) \subset \mathbb{R}_+$.

**Unicité :** Soit $B \in S_n^+$ avec $B^2 = A$.

$AB = B^2B = BB^2 = BA$ : $A$ et $B$ commutent et sont symétriques, donc **codiagonalisables**.

$A = P D P^\top$, $B = P\Delta P^\top$. $B^2 = A \iff \Delta^2 = D \iff \forall i,\ \mu_i^2 = \lambda_i$.

$\mu_i \geq 0$ donc $\mu_i = \sqrt{\lambda_i}$ : $B$ est unique.

---

## FLASHCARD 46 — Matrice de Gram symétrique positive

### RECTO
Montrer qu'une matrice de Gram est symétrique positive.

### VERSO
$\mathrm{Gram}(a_1,\ldots,a_n) \in S_n(\mathbb{R})$ par symétrie du produit scalaire : $\langle a_i,a_j\rangle = \langle a_j,a_i\rangle$.

Soit $X = (x_i) \in M_{n,1}(\mathbb{R})$ :

$$X^\top \mathrm{Gram}(a_1,\ldots,a_n)\, X = \sum_{i,j} x_i x_j \langle a_i, a_j\rangle = \left\langle\sum_i x_i a_i,\, \sum_j x_j a_j\right\rangle = \left\|\sum_i x_i a_i\right\|^2 \geq 0$$

Donc une matrice de Gram est **symétrique positive**.

---`;

