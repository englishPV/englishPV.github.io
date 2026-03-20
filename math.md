const RAW_MATH = String.raw`



# Séries numériques

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Stratégie générale pour la nature d'une série

**RECTO :** Méthode générale : on me donne Σ u_n, quelle stratégie pour déterminer sa nature ?

**VERSO :**
→ Étape 1 : Vérifier u_n → 0 (sinon divergence grossière)
→ Étape 2 : Si u_n ≥ 0 (SATP), chercher un équivalent et comparer (Riemann, géométrique)
→ Étape 3 : Si u_n alterne en signe, tenter le critère de Leibniz
→ Étape 4 : Sinon, tenter la convergence absolue (majorer |u_n|)
→ Étape 5 : En dernier recours : critère d'Abel, sommation par parties
Utilisation typique : premier réflexe face à tout exercice « déterminer la nature de Σ u_n ».

---

### Carte 2 [M] — DL / équivalent pour nature d'une série à termes positifs

**RECTO :** Méthode : comment utiliser un DL pour déterminer la nature d'une série Σ u_n à termes positifs ?

**VERSO :**
→ Étape 1 : Poser x = 1/n, réécrire u_n = g(x) avec x → 0⁺
→ Étape 2 : Faire le DL de g(x) en 0 à l'ordre suffisant
→ Étape 3 : Identifier le terme dominant : u_n ∼ C/n^α
→ Étape 4 : Comparer à Riemann : cv si α > 1, dv si α ≤ 1 (et C > 0)
→ Si le premier terme donne α = 1, pousser le DL plus loin
Utilisation typique : nature de Σ(1 − cos(1/n)), Σ(1/n − sin(1/n)), Σ(√(n²+1) − n).

---

### Carte 3 [M] — Reconnaître et calculer une série télescopique

**RECTO :** Méthode : comment reconnaître et calculer une série télescopique ?

**VERSO :**
→ Étape 1 : Écrire u_n = v_{n+1} − v_n (ou v_n − v_{n+1}) pour une suite (v_n) bien choisie
→ Étape 2 : Calculer S_n = Σ_{k=0}^{n} u_k = v_{n+1} − v_0
→ Étape 3 : Σ u_n converge ⟺ (v_n) a une limite finie ℓ, et la somme vaut ℓ − v_0
Décomposition en éléments simples souvent utile pour obtenir la forme télescopique.
Utilisation typique : Σ 1/(n(n+1)), Σ ln(n/(n+1)), Σ(arctan(n+1) − arctan(n)).

---

### Carte 4 [M] — Montrer la convergence par convergence absolue

**RECTO :** On me demande de montrer que Σ u_n converge, avec u_n de signe quelconque (pas alternée). Quelle méthode ?

**VERSO :**
→ Étape 1 : Majorer |u_n| ≤ v_n avec v_n ≥ 0
→ Étape 2 : Montrer que Σ v_n converge (comparaison, Riemann, etc.)
→ Étape 3 : Conclure : Σ |u_n| cv (convergence absolue) ⟹ Σ u_n cv
Majorations classiques : |sin(x)| ≤ 1, |cos(x)| ≤ 1, |sin(x)| ≤ |x|.
Utilisation typique : Σ sin(n)/n², Σ cos(n²)/n^{3/2}, Σ (−1)^n/(n² + sin(n)).

---

### Carte 5 [M] — Traiter une série alternée

**RECTO :** On me donne Σ (−1)^n a_n. Quelle méthode pour étudier sa nature ?

**VERSO :**
→ Étape 1 : Vérifier a_n ≥ 0 (sinon ce n'est pas une série alternée)
→ Étape 2 : Montrer (a_n) décroissante (a_{n+1} ≤ a_n, ou étudier f' si a_n = f(n))
→ Étape 3 : Vérifier a_n → 0
→ Conclure par Leibniz : Σ (−1)^n a_n converge, et |R_n| ≤ a_{n+1}
Si (a_n) n'est pas décroissante, tenter la convergence absolue.
Utilisation typique : Σ (−1)^n/√n, Σ (−1)^n ln(n)/n.

---

### Carte 6 [M] — Quand et comment utiliser la règle de d'Alembert

**RECTO :** Quand utiliser la règle de d'Alembert pour Σ u_n, et comment procéder ?

**VERSO :**
Réflexe : utiliser d'Alembert quand u_n contient des **factorielles** ou des **a^n**.
→ Étape 1 : Calculer |u_{n+1}/u_n| et simplifier
→ Étape 2 : Trouver la limite ℓ
→ Étape 3 : ℓ < 1 ⟹ cv absolue ; ℓ > 1 ⟹ dv grossière ; **ℓ = 1 ⟹ on ne conclut pas**
Utilisation typique : Σ n!/nⁿ, Σ 2ⁿ·n!/(2n)!, Σ n^α xⁿ (rayon de convergence).

---

### Carte 7 [M] — Comparaison série-intégrale en pratique

**RECTO :** Méthode : comment utiliser la comparaison série-intégrale pour étudier Σ f(n) ?

**VERSO :**
→ Étape 1 : Identifier f **continue, positive, décroissante** sur [N,+∞[
→ Étape 2 : Nature : Σ f(n) cv ⟺ ∫_N^{+∞} f(t) dt cv
→ Étape 3 : Cas divergent, équivalent de S_n : S_n ∼ ∫_1^n f(t) dt
→ Étape 4 : Cas convergent, équivalent du reste : R_n ∼ ∫_n^{+∞} f(t) dt
Utilisation typique : nature de Σ 1/(n ln n), équivalent de Σ_{k=1}^n 1/k ∼ ln n, encadrement de R_n pour Σ 1/k².

---

### Carte 8 [M] — Équivalent du reste d'une série convergente à termes positifs

**RECTO :** Comment obtenir un équivalent du reste R_n = Σ_{k=n+1}^{+∞} u_k d'une SATP convergente ?

**VERSO :**
→ Méthode 1 : Si u_n ∼ v_n (SATP cv), alors R_n(u) ∼ R_n(v)
→ Méthode 2 : Comparaison série-intégrale : R_n ∼ ∫_n^{+∞} f(t) dt
→ Méthode 3 : Si télescopique u_k = v_k − v_{k+1}, alors R_n = v_{n+1}
Exemple : R_n de Σ 1/k² ∼ ∫_n^∞ dt/t² = 1/n. Plus généralement, R_n de Σ 1/k^α ∼ 1/((α−1)n^{α−1}).
Utilisation typique : « donner un équivalent de Σ_{k≥n} 1/k^α » pour α > 1.

---

## CARTES THÉORÈME

---

### Carte 9 [T] — Condition nécessaire de convergence

**RECTO :** Énoncer la condition nécessaire de convergence d'une série.

**VERSO :**
Si la série Σ u_n converge, alors **u_n → 0**.
Contraposée (divergence grossière) : si u_n ne tend pas vers 0, alors Σ u_n diverge.
**Réciproque FAUSSE** : Σ 1/n diverge alors que 1/n → 0.
Utilisation typique : premier test rapide pour éliminer une série divergente (ex : Σ n/(n+1) diverge car u_n → 1 ≠ 0).

---

### Carte 10 [T] — Comparaison des séries à termes positifs

**RECTO :** Énoncer le théorème de comparaison pour les séries à termes positifs.

**VERSO :**
**Hypothèse :** 0 ≤ u_n ≤ v_n **à partir d'un certain rang**.
→ Si Σ v_n converge, alors Σ u_n converge
→ Si Σ u_n diverge, alors Σ v_n diverge
Variante : u_n = O(v_n) avec v_n ≥ 0 et Σ v_n cv ⟹ Σ u_n cv.
Utilisation typique : |sin(1/n²)| ≤ 1/n² donc Σ sin(1/n²) converge absolument.

---

### Carte 11 [T] — Équivalent pour les séries à termes positifs

**RECTO :** Énoncer le théorème de comparaison par équivalents pour les séries à termes positifs.

**VERSO :**
**Hypothèses :** u_n, v_n > 0 à partir d'un certain rang, **u_n ∼ v_n**.
**Conclusion :** Σ u_n et Σ v_n sont de **même nature**.
De plus, en cas de convergence : R_n(u) ∼ R_n(v).
**Valable uniquement pour séries à termes positifs !**
Utilisation typique : u_n ∼ 3/n² ⟹ Σ u_n converge (même nature que 3·Σ 1/n²).

---

### Carte 12 [T] — Convergence absolue ⟹ convergence

**RECTO :** Énoncer le théorème liant convergence absolue et convergence.

**VERSO :**
Si Σ |u_n| converge, alors Σ u_n converge (dans ℝ, ℂ, ou tout evn **complet**).
On dit que Σ u_n est absolument convergente. De plus |Σ u_n| ≤ Σ |u_n|.
**Réciproque FAUSSE** : Σ (−1)^n/n converge mais Σ 1/n diverge (semi-convergence).
Utilisation typique : montrer la convergence de Σ u_n quand le signe de u_n est compliqué.

---

### Carte 13 [T] — Critère spécial des séries alternées (Leibniz)

**RECTO :** Énoncer le critère spécial des séries alternées (théorème de Leibniz).

**VERSO :**
**Hypothèses :** (a_n) suite réelle **positive**, **décroissante**, de **limite 0**.
**Conclusion :** Σ (−1)^n a_n converge.
De plus : le reste R_n est du signe de son premier terme (−1)^{n+1}a_{n+1}, et **|R_n| ≤ a_{n+1}**.
Utilisation typique : convergence de Σ (−1)^n/n^α pour α > 0, majoration d'erreur d'approximation.

---

### Carte 14 [T] — Règle de d'Alembert

**RECTO :** Énoncer la règle de d'Alembert pour les séries.

**VERSO :**
**Hypothèse :** u_n ≠ 0 à partir d'un certain rang, **|u_{n+1}/u_n| → ℓ** ∈ [0, +∞].
→ Si ℓ < 1 : Σ u_n converge absolument
→ Si ℓ > 1 (ou +∞) : |u_n| → +∞, Σ u_n diverge grossièrement
→ **Si ℓ = 1 : on ne peut pas conclure** (ex : Σ 1/n et Σ 1/n² donnent ℓ = 1)
Utilisation typique : séries avec n!, a^n, ou pour le rayon de convergence d'une série entière.

---

### Carte 15 [T] — Comparaison série-intégrale

**RECTO :** Énoncer le théorème de comparaison série-intégrale.

**VERSO :**
**Hypothèse :** f : [1,+∞[ → ℝ **continue**, **positive**, **décroissante**.
**Conclusion :** ∫_1^{N+1} f(t) dt ≤ Σ_{n=1}^{N} f(n) ≤ f(1) + ∫_1^{N} f(t) dt.
En particulier : **Σ f(n) cv ⟺ ∫_1^{+∞} f(t) dt cv**.
Reste : ∫_{n+1}^{+∞} f(t) dt ≤ R_n ≤ ∫_n^{+∞} f(t) dt.
Utilisation typique : nature de Σ 1/(n(ln n)^α), preuve que H_n ∼ ln n.

---

### Carte 16 [T] — Critère d'Abel (Dirichlet)

**RECTO :** Énoncer le critère d'Abel pour les séries.

**VERSO :**
**Hypothèses :**
→ (a_n) suite réelle **monotone** tendant vers **0**
→ Les sommes partielles B_n = Σ_{k=0}^{n} b_k sont **bornées**
**Conclusion :** Σ a_n b_n converge.
Utilisation typique : convergence de Σ sin(nθ)/n et Σ cos(nθ)/n pour θ ∉ 2πℤ (car |Σ e^{ikθ}| bornée).

---

## CARTES CALCUL

---

### Carte 17 [C] — Série géométrique

**RECTO :** Nature et somme de la série géométrique Σ x^n ?

**VERSO :**
Σ_{n=0}^{+∞} x^n converge ⟺ **|x| < 1**, et dans ce cas Σ_{n=0}^{+∞} x^n = **1/(1−x)**.
Somme partielle : Σ_{k=0}^{n} x^k = (1 − x^{n+1})/(1 − x) pour x ≠ 1.
Diverge si |x| ≥ 1 (grossièrement si |x| > 1 car |x^n| → +∞).
Utilisation typique : série de référence pour d'Alembert, calcul de sommes, comparaisons.

---

### Carte 18 [C] — Séries de Riemann

**RECTO :** Nature de la série de Riemann Σ 1/n^α selon α ?

**VERSO :**
Σ_{n=1}^{+∞} 1/n^α :
→ **Converge si α > 1** (ex : Σ 1/n² = π²/6)
→ **Diverge si α ≤ 1** (ex : α = 1, série harmonique)
Se démontre par comparaison série-intégrale avec f(t) = 1/t^α.
Utilisation typique : série de référence n°1. « u_n ∼ C/n^α avec C > 0 ⟹ même nature que Riemann. »

---

### Carte 19 [C] — Équivalent de la somme harmonique H_n

**RECTO :** Donner un équivalent de H_n = Σ_{k=1}^{n} 1/k quand n → +∞.

**VERSO :**
H_n = ln(n) + γ + o(1), où γ ≈ 0.5772 est la constante d'Euler.
Donc **H_n ∼ ln(n)**.
Plus précisément : H_n = ln(n) + γ + 1/(2n) + O(1/n²).
Se démontre par comparaison série-intégrale avec ∫_1^n dt/t = ln n.
Utilisation typique : équivalent de sommes partielles, suites du type u_n = Σ f(k) − g(n).

---

### Carte 20 [C] — Équivalents classiques pour l'étude de Σ f(1/n)

**RECTO :** Donner les équivalents en 0 utiles pour déterminer la nature de Σ f(1/n).

**VERSO :**
Quand u → 0 :
→ sin(u) ∼ u, donc sin(1/n) ∼ 1/n → **Σ diverge**
→ 1 − cos(u) ∼ u²/2, donc 1−cos(1/n) ∼ 1/(2n²) → **Σ converge**
→ ln(1+u) ∼ u, donc ln(1+1/n²) ∼ 1/n² → **Σ converge**
→ e^u − 1 ∼ u, donc e^{1/n} − 1 ∼ 1/n → **Σ diverge**
→ (1+u)^α − 1 ∼ αu
Utilisation typique : nature de Σ f(1/n) par équivalent puis comparaison à Riemann.

`
