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






# Suites et séries de fonctions

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Montrer la convergence uniforme de f_n → f

**RECTO :** Méthode pour montrer que f_n converge uniformément vers f sur I ?

**VERSO :**
→ Étape 1 : Poser g_n(x) = f_n(x) − f(x)
→ Étape 2 : Calculer M_n = sup_{x∈I} |g_n(x)| (dériver g_n, trouver le max, évaluer aux bords)
→ Étape 3 : Si M_n → 0, alors CVU sur I
Raccourci : si |f_n(x) − f(x)| ≤ α_n pour tout x ∈ I, avec α_n → 0, c'est terminé.
Utilisation typique : f_n(x) = x^n(1−x) sur [0,1], on dérive pour trouver le max ∼ 1/(e(n+1)) → 0.

---

### Carte 2 [M] — Montrer la non-convergence uniforme

**RECTO :** Méthode pour montrer que f_n ne converge PAS uniformément vers f sur I ?

**VERSO :**
**Méthode 1 (directe) :** Exhiber x_n ∈ I tel que |f_n(x_n) − f(x_n)| ↛ 0.
**Méthode 2 (contraposée) :** f_n continues et f discontinue ⟹ pas de CVU.
**Méthode 3 :** Si ∫_I |f_n − f| ↛ 0 (sur un segment), pas de CVU.
Astuce pour x_n : prendre le max de |f_n − f|, ou essayer x_n = 1/n, n, 1 − 1/n…
Utilisation typique : x^n sur [0,1] → f discontinue en 1, donc pas de CVU.

---

### Carte 3 [M] — Convergence normale d'une série de fonctions

**RECTO :** Méthode pour montrer la convergence normale de Σ f_n sur I ?

**VERSO :**
→ Étape 1 : Majorer ‖f_n‖_∞ = sup_{x∈I} |f_n(x)| ≤ M_n
→ Étape 2 : Montrer que la série numérique Σ M_n converge
→ Conclure : CVN sur I ⟹ CVU sur I
Majorations utiles : |sin u| ≤ min(1, |u|), |cos u| ≤ 1, |x^n| ≤ r^n sur [−r, r] avec r < 1.
Utilisation typique : Σ sin(nx)/n² sur ℝ, majorer par 1/n², Riemann α = 2 > 1.

---

### Carte 4 [M] — Justifier l'interversion Σ/∫ (ou lim/∫)

**RECTO :** Comment justifier ∫_a^b [Σ f_n(x)] dx = Σ ∫_a^b f_n(x) dx ?

**VERSO :**
→ Étape 1 : Vérifier que **[a,b] est un segment** (borné, fermé)
→ Étape 2 : Vérifier chaque f_n **continue** sur [a,b]
→ Étape 3 : Montrer Σ f_n **CVU** sur [a,b] (la CVN suffit)
→ Conclure par le théorème d'intégration terme à terme
Idem pour les suites : CVU sur [a,b] ⟹ lim ∫ f_n = ∫ lim f_n.
Utilisation typique : ∫_0^r [Σ x^n] dx = Σ r^{n+1}/(n+1) pour r < 1.

---

### Carte 5 [M] — Justifier la dérivation terme à terme

**RECTO :** Comment justifier que S(x) = Σ f_n(x) est C^1 et que S' = Σ f'_n ?

**VERSO :**
→ Étape 1 : Vérifier chaque f_n de **classe C^1** sur I (intervalle)
→ Étape 2 : Vérifier **Σ f_n CVS** en au moins un point de I
→ Étape 3 : Montrer **Σ f'_n CVU** sur tout segment de I (souvent via CVN)
→ Conclure : S ∈ C^1 et S' = Σ f'_n
Pour C^k : itérer (CVU de Σ f_n^{(j)} pour j = 1, …, k).
Utilisation typique : dériver Σ e^{−nx}/n pour x > 0.

---

### Carte 6 [M] — Plan d'étude complet d'une suite de fonctions

**RECTO :** Plan type pour étudier complètement une suite (f_n) sur un domaine I ?

**VERSO :**
→ Étape 1 : **CVS** : fixer x, calculer f(x) = lim f_n(x), préciser le domaine
→ Étape 2 : **CVU** sur I ? Calculer ‖f_n − f‖_∞. Sinon, tester CVU sur tout segment de I
→ Étape 3 : **Continuité** de f (si CVU + f_n continues)
→ Étape 4 : **Intégration** : intervertir lim/∫ (si CVU sur un segment)
→ Étape 5 : **Dérivabilité** (si f'_n CVU)
Utilisation typique : exercice « étudier f_n(x) = nxe^{−nx} sur [0, +∞[ ».

---

### Carte 7 [M] — CVU sur tout compact mais pas sur I

**RECTO :** Comment montrer la CVU sur tout compact de I, et à quoi cela sert-il ?

**VERSO :**
→ Étape 1 : Fixer un segment [a, b] ⊂ I quelconque
→ Étape 2 : Majorer ‖f_n − f‖_{∞,[a,b]} (la majoration peut dépendre de a, b)
→ Étape 3 : Montrer que cette borne → 0
Cela suffit pour : continuité de f sur I, interversion lim/∫ sur tout segment, régularité.
Utilisation typique : Σ x^n CVN sur [−r, r] pour tout r < 1, mais pas CVU sur ]−1, 1[.

---

## CARTES THÉORÈME

---

### Carte 8 [T] — Définition de la convergence uniforme (quantificateurs)

**RECTO :** Écrire la définition de la CVU avec les quantificateurs. Quelle différence avec la CVS ?

**VERSO :**
**CVU :** ∀ε > 0, ∃N ∈ ℕ, **∀n ≥ N, ∀x ∈ I**, |f_n(x) − f(x)| ≤ ε
**CVS :** ∀ε > 0, **∀x ∈ I**, ∃N(x) ∈ ℕ, ∀n ≥ N, |f_n(x) − f(x)| ≤ ε
Différence clé : en CVU, **N ne dépend pas de x**. En CVS, N peut dépendre de x.
Reformulation : CVU ⟺ ‖f_n − f‖_{∞,I} → 0.
Utilisation typique : identifier si un problème requiert CVS ou CVU ; reformuler en terme de sup.

---

### Carte 9 [T] — Liens CVN ⟹ CVU ⟹ CVS

**RECTO :** Énoncer les implications entre convergence normale, uniforme et simple pour Σ f_n.

**VERSO :**
**CVN ⟹ CVU ⟹ CVS** (aucune réciproque en général)
**CVN** : la série numérique **Σ ‖f_n‖_∞ converge**
**CVU** : ‖R_N‖_∞ = sup_I |Σ_{k>N} f_k(x)| → 0
**CVS** : pour tout x fixé, Σ f_n(x) converge
CVN ⟹ convergence absolue en tout point. La CVN est le moyen le plus courant d'obtenir la CVU.
Utilisation typique : pour les théorèmes (continuité, intégration…), la CVU suffit ; la CVN est l'outil pratique.

---

### Carte 10 [T] — Continuité de la limite uniforme (suites)

**RECTO :** Énoncer le théorème de continuité de la limite uniforme d'une suite de fonctions.

**VERSO :**
**Hypothèses :**
→ f_n : I → ℝ, **continues** sur I, pour tout n
→ f_n → f **uniformément** sur I
**Conclusion :** f est **continue** sur I.
**Contraposée** (très utile) : f_n continues et f discontinue ⟹ pas de CVU.
Utilisation typique : prouver la continuité de f = lim f_n ; ou prouver la non-CVU par discontinuité de f.

---

### Carte 11 [T] — Continuité de la somme d'une série de fonctions

**RECTO :** Sous quelles hypothèses la somme S(x) = Σ f_n(x) est-elle continue ?

**VERSO :**
**Hypothèses :**
→ f_n : I → ℝ **continues** sur I
→ Σ f_n **CVU** sur I (la CVN suffit)
**Conclusion :** S = Σ f_n est **continue** sur I.
Variante : si CVU seulement sur tout compact de I, alors S continue sur I.
Utilisation typique : Σ cos(nx)/n² continue sur ℝ (CVN car ‖cos(nx)/n²‖_∞ ≤ 1/n²).

---

### Carte 12 [T] — Interversion limite / intégrale (suites, segment)

**RECTO :** Énoncer le théorème d'interversion limite-intégrale pour une suite de fonctions.

**VERSO :**
**Hypothèses :**
→ f_n : **[a, b]** → ℝ **continues** (**segment** !)
→ f_n → f **uniformément** sur [a, b]
**Conclusion :** lim_{n→∞} ∫_a^b f_n(t) dt = ∫_a^b f(t) dt
Majoration : |∫_a^b f_n − ∫_a^b f| ≤ (b − a) · ‖f_n − f‖_∞.
Utilisation typique : calculer lim ∫_0^1 f_n(t) dt en utilisant la CVU sur [0, 1].

---

### Carte 13 [T] — Intégration terme à terme (séries, segment)

**RECTO :** Énoncer le théorème d'intégration terme à terme d'une série sur un segment.

**VERSO :**
**Hypothèses :**
→ f_n : **[a, b]** → ℝ **continues**
→ Σ f_n **CVU** sur **[a, b]** (la CVN suffit)
**Conclusion :** ∫_a^b [Σ_{n=0}^∞ f_n(t)] dt = Σ_{n=0}^∞ ∫_a^b f_n(t) dt
On intervertit **Σ et ∫** sur un segment sous CVU.
Utilisation typique : calcul d'intégrales en développant l'intégrande en série, ou calcul de sommes par intégration.

---

### Carte 14 [T] — Dérivation sous la limite (suites)

**RECTO :** Énoncer le théorème de dérivation de la limite d'une suite de fonctions.

**VERSO :**
**Hypothèses :** f_n : I → ℝ de **classe C^1**, I intervalle.
→ ∃ a ∈ I tel que **(f_n(a)) converge**
→ **(f'_n) CVU** vers g sur tout segment de I
**Conclusion :**
→ (f_n) CVU vers f sur tout segment de I, f **C^1**
→ **f' = g = lim f'_n** (on intervertit lim et d/dx)
Utilisation typique : montrer la dérivabilité de f = lim f_n en contrôlant la CVU des dérivées.

---

### Carte 15 [T] — Dérivation terme à terme (séries)

**RECTO :** Énoncer le théorème de dérivation terme à terme d'une série de fonctions.

**VERSO :**
**Hypothèses :** f_n : I → ℝ de **classe C^1**, I intervalle.
→ **Σ f_n CVS** en au moins un point de I
→ **Σ f'_n CVU** sur tout segment de I
**Conclusion :** S = Σ f_n est **C^1** sur I, et **S'(x) = Σ f'_n(x)**.
En pratique, la CVN de Σ f'_n suffit pour avoir la CVU.
Utilisation typique : justifier (Σ x^n/n!)' = Σ x^{n−1}/(n−1)! = eˣ.

---

### Carte 16 [T] — CSSA pour séries de fonctions (convergence uniforme)

**RECTO :** Quand le critère des séries alternées donne-t-il la convergence uniforme ?

**VERSO :**
**Hypothèses :** pour tout x ∈ I et tout n :
→ a_n(x) ≥ 0, suite **(a_n(x))_n décroissante** en n
→ **‖a_n‖_∞ = sup_I a_n(x) → 0**
**Conclusion :** Σ (−1)^n a_n(x) **CVU** sur I, et ‖R_N‖_∞ ≤ ‖a_{N+1}‖_∞.
Justification : |R_N(x)| ≤ a_{N+1}(x) (CSSA numérique) ≤ ‖a_{N+1}‖_∞ → 0.
Utilisation typique : Σ (−1)^n/(n+x) sur [0, +∞[, avec sup 1/(n+x) = 1/n → 0.

---

### Carte 17 [T] — Théorème de la double limite

**RECTO :** Énoncer le théorème de la double limite.

**VERSO :**
**Hypothèses :** f_n : I → ℝ, a ∈ I̅ (adhérence de I, point ou extrémité).
→ f_n → f **uniformément** sur I
→ Pour tout n, **lim_{x→a} f_n(x) = ℓ_n existe**
**Conclusion :** (ℓ_n) converge vers ℓ, et lim_{x→a} f(x) = ℓ.
On peut **intervertir les deux limites** : lim_{x→a} lim_n f_n = lim_n lim_{x→a} f_n.
Utilisation typique : prolongement par continuité de S(x) = Σ f_n(x) en un bord de l'intervalle.

---

## CARTES CALCUL

---

### Carte 18 [C] — Trois sup classiques de référence

**RECTO :** Calculer sup_{[0,1]} x^n(1−x), sup_{[0,+∞[} nxe^{−nx} et sup_{[0,+∞[} xe^{−nx}.

**VERSO :**
→ sup_{[0,1]} x^n(1−x) : max en x = n/(n+1), valeur ∼ **1/(e(n+1))** → 0 ⟹ CVU ✓
→ sup_{[0,+∞[} nxe^{−nx} : max en x = 1/n, valeur = **1/e** ↛ 0 ⟹ pas CVU ✗
→ sup_{[0,+∞[} xe^{−nx} : max en x = 1/n, valeur = **1/(ne)** → 0 ⟹ CVU ✓
Méthode : dériver en x, annuler la dérivée, évaluer au point critique et aux bords.
Utilisation typique : exemples de référence systématiques pour la CVU.

---

### Carte 19 [C] — Série géométrique de fonctions : domaines de convergence

**RECTO :** Sur quels domaines Σ x^n converge-t-elle simplement, uniformément, normalement ?

**VERSO :**
→ **CVS** sur ]−1, 1[, somme S(x) = 1/(1 − x)
→ **CVN** sur [−r, r] pour tout **r < 1** : ‖x^n‖_∞ = r^n, Σ r^n converge
→ **Pas de CVU** sur ]−1, 1[ : sup_{]−1,1[} |x^n| = 1 ↛ 0
On dit : CVU **sur tout compact** de ]−1, 1[, mais pas sur ]−1, 1[ entier.
Utilisation typique : justifier les interversions Σ/∫ ou Σ/dérivée sur [−r, r] puis faire r → 1.

---

### Carte 20 [C] — Sommes par dérivation/intégration de la série géométrique

**RECTO :** Donner Σ_{n≥1} nx^{n−1} et Σ_{n≥1} x^n/n pour |x| < 1, avec justification.

**VERSO :**
→ Σ_{n=1}^∞ nx^{n−1} = **1/(1−x)²** (dérivation terme à terme de Σ x^n = 1/(1−x))
→ Σ_{n=1}^∞ x^n/n = **−ln(1−x)** (intégration terme à terme de Σ x^{n−1} sur [0, x])
Justification : CVN sur [−r, r] pour tout r < 1 ⟹ dérivation et intégration licites.
Utilisation typique : calcul de sommes numériques en spécialisant x (ex : x = 1/2 pour Σ n/2^n = 4).
→ (1+u)^α − 1 ∼ αu
Utilisation typique : nature de Σ f(1/n) par équivalent puis comparaison à Riemann.






# Séries entières

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Déterminer le rayon de convergence

**RECTO :** Méthode générale pour déterminer le rayon de convergence R de Σ a_n x^n ?

**VERSO :**
→ Étape 1 : Tenter **d'Alembert** : si |a_{n+1}/a_n| → ℓ, alors R = 1/ℓ (le plus fréquent)
→ Étape 2 : Si d'Alembert échoue, essayer la **règle de Cauchy** : si |a_n|^{1/n} → ℓ, R = 1/ℓ
→ Étape 3 : Si a_n a une forme compliquée, encadrer a_n et utiliser **la comparaison** : |a_n| ≤ C b_n ⟹ R_a ≥ R_b
→ Étape 4 : Si a_n = 0 sauf pour n dans une sous-suite, revenir à la définition (nature de Σ |a_n x^n|)
Convention : ℓ = 0 ⟹ R = +∞ ; ℓ = +∞ ⟹ R = 0.
Utilisation typique : R de Σ x^n/n!, Σ n! x^n, Σ x^n/n^α, Σ x^{2n}/n.

---

### Carte 2 [M] — Rayon de convergence quand les indices ne sont pas tous les entiers

**RECTO :** Comment trouver R de Σ a_n x^{φ(n)} (ex : Σ a_n x^{2n}, Σ a_n x^{n²}) ?

**VERSO :**
→ Étape 1 : Poser **t = x^k** si φ(n) = kn (ex : t = x² pour Σ a_n x^{2n})
→ Étape 2 : Trouver le rayon R_t de Σ a_n t^n par d'Alembert/Cauchy
→ Étape 3 : R_x = R_t^{1/k} (car |x^k| < R_t ⟺ |x| < R_t^{1/k})
Si φ(n) quelconque (ex : n²) : revenir à la définition, souvent Hadamard.
Utilisation typique : Σ x^{2n}/n! → poser t = x², R_t = +∞, donc R_x = +∞.

---

### Carte 3 [M] — Étudier la convergence aux bornes x = ±R

**RECTO :** Méthode pour étudier la convergence de Σ a_n x^n en x = R et x = −R ?

**VERSO :**
→ Étape 1 : Substituer x = R : étudier la série numérique **Σ a_n R^n** (comparaison, Riemann…)
→ Étape 2 : Substituer x = −R : étudier **Σ a_n (−R)^n = Σ (−1)^n a_n R^n** (Leibniz ?)
→ Chaque bord se traite indépendamment, il n'y a pas de règle générale
Résultats classiques : Σ x^n/n : cv en −1 (Leibniz), dv en 1 (harmonique). Σ x^n/n² : cv aux deux bords.
Utilisation typique : préciser le domaine de convergence exact (intervalle ouvert, semi-ouvert, fermé).

---

### Carte 4 [M] — Trouver la somme d'une série entière

**RECTO :** Méthodes pour calculer la somme S(x) = Σ a_n x^n ?

**VERSO :**
→ **Méthode 1 :** Reconnaître une série connue (géom, exp, ln, (1+x)^α…)
→ **Méthode 2 :** Dériver ou intégrer S(x) pour simplifier a_n (transformer na_n, a_n/(n+1)…)
→ **Méthode 3 :** Écrire une **équation différentielle** vérifiée par S(x) et la résoudre
→ **Méthode 4 :** Décomposer a_n (fractions partielles sur a_n) puis sommer chaque morceau
Toujours vérifier la condition initiale : **S(0) = a_0**.
Utilisation typique : Σ n²x^n → dériver deux fois x·Σ x^n ; Σ x^n/(n(n+1)) → décomposer en éléments simples.

---

### Carte 5 [M] — Trouver S(x) par équation différentielle

**RECTO :** Méthode pour trouver la somme S(x) = Σ a_n x^n via une ED ?

**VERSO :**
→ Étape 1 : Calculer S'(x) = Σ n a_n x^{n−1} (licite pour |x| < R)
→ Étape 2 : Exprimer une relation entre S(x), S'(x) (éventuellement S''(x)) en utilisant la récurrence sur a_n
→ Étape 3 : Résoudre l'ED obtenue sur ]−R, R[
→ Étape 4 : Déterminer la constante avec **S(0) = a_0** (et S'(0) = a_1 si ED d'ordre 2)
La relation de récurrence a_{n+1} = f(n)·a_n se traduit souvent en ED.
Utilisation typique : Σ a_n x^n avec (n+1)a_{n+1} = α a_n → S' = αS → S(x) = a_0 e^{αx}.

---

### Carte 6 [M] — Développer f(x) en série entière

**RECTO :** Méthodes pour développer une fonction f en série entière au voisinage de 0 ?

**VERSO :**
→ **Méthode 1 :** Si f est C^∞, tenter f(x) = Σ f^{(n)}(0)/n! · x^n et prouver la convergence
→ **Méthode 2 :** Partir d'un DSE connu (e^x, 1/(1−x), ln(1+x)…) et composer, dériver, intégrer
→ **Méthode 3 :** Résoudre une ED vérifiée par f, chercher S(x) = Σ a_n x^n (identification)
→ **Méthode 4 :** Formule de Taylor avec reste intégral pour justifier que le reste → 0
La méthode 2 est la plus rapide et la plus fréquente aux concours.
Utilisation typique : DSE de arctan = intégrale de 1/(1+t²) = intégrale de Σ(−1)^n t^{2n}.

---

### Carte 7 [M] — Intervertir Σ et ∫ pour calculer une somme ou une intégrale

**RECTO :** Méthode pour calculer ∫_0^1 f(x) dx quand f est somme d'une série entière, ou Σ a_n quand a_n = ∫ g_n(x) dx ?

**VERSO :**
**Sens 1 :** ∫_0^r [Σ a_n x^n] dx = Σ a_n ∫_0^r x^n dx = Σ a_n r^{n+1}/(n+1) (si r < R, ou r = R avec CVU sur [0,r])
**Sens 2 :** Σ ∫ g_n = ∫ Σ g_n si Σ g_n CVU sur le segment d'intégration
→ Justification : CVN sur [0, r] pour r < R (toujours vraie pour séries entières)
→ En r = R : il faut un argument supplémentaire (théorème d'Abel radial ou CVU)
Utilisation typique : Σ 1/(n·2^n) = −ln(1/2) = ln 2 via ∫_0^{1/2} Σ x^{n−1} dx.

---

## CARTES THÉORÈME

---

### Carte 8 [T] — Théorème de Cauchy-Hadamard (admis en pratique, résultat fondamental)

**RECTO :** Énoncer le théorème de Cauchy-Hadamard sur le rayon de convergence.

**VERSO :**
Le rayon de convergence de Σ a_n x^n est **R = 1 / lim sup |a_n|^{1/n}**.
Propriété fondamentale :
→ Si **|x| < R** : Σ a_n x^n **converge absolument**
→ Si **|x| > R** : Σ |a_n x^n| → +∞, la série **diverge grossièrement**
→ Si |x| = R : **aucune conclusion générale**
Utilisation typique : justifier le comportement d'une série entière à l'intérieur et à l'extérieur du disque.

---

### Carte 9 [T] — Règle de d'Alembert pour le rayon

**RECTO :** Énoncer la règle de d'Alembert pour le rayon de convergence de Σ a_n x^n.

**VERSO :**
**Hypothèse :** a_n ≠ 0 à partir d'un certain rang, **|a_{n+1}/a_n| → ℓ** ∈ [0, +∞].
**Conclusion :** R = **1/ℓ**.
Conventions : ℓ = 0 ⟹ R = +∞ ; ℓ = +∞ ⟹ R = 0.
**Ne s'applique que si la limite existe.** Sinon, Hadamard.
Utilisation typique : R de Σ x^n/n! → |a_{n+1}/a_n| = 1/(n+1) → 0, donc R = +∞.

---

### Carte 10 [T] — Régularité de la somme d'une série entière (théorème central)

**RECTO :** Quelle est la régularité de S(x) = Σ_{n≥0} a_n x^n sur ]−R, R[ ?

**VERSO :**
S est de **classe C^∞** sur ]−R, R[, et pour tout k ≥ 0 :
**S^{(k)}(x) = Σ_{n≥k} n(n−1)···(n−k+1) a_n x^{n−k}**
La série dérivée a le **même rayon de convergence R**.
On peut donc **dériver terme à terme autant de fois qu'on veut** à l'intérieur du disque.
En particulier : **a_n = S^{(n)}(0) / n!** (unicité du DSE).
Utilisation typique : justifier S' = Σ na_n x^{n−1} sans vérifier la CVU (c'est automatique pour |x| < R).

---

### Carte 11 [T] — Convergence normale sur tout compact (propriété clé)

**RECTO :** Que peut-on dire de la convergence de Σ a_n x^n sur [−r, r] pour r < R ?

**VERSO :**
Pour tout **0 ≤ r < R**, la série Σ a_n x^n converge **normalement** sur [−r, r].
Preuve : ‖a_n x^n‖_{∞,[−r,r]} = |a_n| r^n, et Σ |a_n| r^n converge car r < R.
Conséquence : toutes les interversions (Σ/∫, Σ/lim, Σ/d) sont licites **sur tout segment inclus dans ]−R, R[**.
Pas de CVN sur ]−R, R[ en général (le sup sur ]−R, R[ peut diverger).
Utilisation typique : justifier en une ligne toute interversion sur un segment [a, b] ⊂ ]−R, R[.

---

### Carte 12 [T] — Intégration terme à terme d'une série entière

**RECTO :** Énoncer le résultat d'intégration terme à terme de Σ a_n x^n.

**VERSO :**
Pour tout |x| < R :
**∫_0^x Σ a_n t^n dt = Σ a_n x^{n+1}/(n+1)**
La série entière obtenue a le **même rayon R**.
La justification est immédiate : CVN sur [0, x] ⊂ ]−R, R[.
L'intégration terme à terme ne change pas R mais **peut changer la convergence aux bords**.
Utilisation typique : DSE de arctan(x) = ∫_0^x 1/(1+t²) dt = Σ (−1)^n x^{2n+1}/(2n+1).

---

### Carte 13 [T] — Unicité du développement en série entière

**RECTO :** Énoncer le théorème d'unicité du DSE.

**VERSO :**
Si Σ a_n x^n = Σ b_n x^n pour tout x dans un **voisinage de 0**, alors **a_n = b_n pour tout n**.
Conséquence : si f(x) = Σ a_n x^n, alors nécessairement **a_n = f^{(n)}(0)/n!**.
Méthode d'identification : si on trouve un DSE de f par n'importe quel moyen, c'est LE DSE de f.
Utilisation typique : après avoir résolu une ED, identifier les coefficients du DSE par unicité.

---

### Carte 14 [T] — Théorème d'Abel radial

**RECTO :** Énoncer le théorème d'Abel radial.

**VERSO :**
**Hypothèse :** Σ a_n x^n a un rayon R > 0, et **Σ a_n R^n converge**.
**Conclusion :** S(x) = Σ a_n x^n → Σ a_n R^n quand **x → R⁻**.
Autrement dit : **lim_{x→R⁻} S(x) = S(R)** (continuité à gauche au bord).
Idem en x → (−R)⁺ si Σ a_n (−R)^n converge.
Utilisation typique : ln(2) = Σ (−1)^{n+1}/n obtenu comme lim_{x→1⁻} de −ln(1−x) ? Non : comme lim_{x→1⁻} de Σ (−1)^{n+1} x^n/n = ln(1+x) en x = 1.

---

### Carte 15 [T] — Produit de Cauchy de deux séries entières

**RECTO :** Énoncer la formule du produit de Cauchy pour les séries entières.

**VERSO :**
Si A(x) = Σ a_n x^n (rayon R_a) et B(x) = Σ b_n x^n (rayon R_b), alors :
**A(x) · B(x) = Σ c_n x^n** avec **c_n = Σ_{k=0}^{n} a_k b_{n−k}**
Le rayon du produit est ≥ **min(R_a, R_b)**, et l'égalité vaut pour |x| < min(R_a, R_b).
Le produit de Cauchy de deux séries absolument convergentes est absolument convergent.
Utilisation typique : e^x · e^x = e^{2x}, ou identifier les coefficients de f(x)·g(x).

---

### Carte 16 [T] — Série entière et parité

**RECTO :** Que peut-on dire du DSE de f si f est paire ? Si f est impaire ?

**VERSO :**
→ **f paire** (f(−x) = f(x)) ⟹ **a_n = 0 pour n impair** : f(x) = Σ a_{2n} x^{2n}
→ **f impaire** (f(−x) = −f(x)) ⟹ **a_n = 0 pour n pair** : f(x) = Σ a_{2n+1} x^{2n+1}
Preuve : unicité du DSE appliquée à f(x) = ±f(−x).
Utilisation typique : DSE de cos (paire → que des x^{2n}), sin (impaire → que des x^{2n+1}), 1/(1+x²) (paire).

---

## CARTES CALCUL

---

### Carte 17 [C] — DSE de référence : exponentielle, géométrique

**RECTO :** DSE de e^x et de 1/(1−x) avec rayon.

**VERSO :**
→ **e^x = Σ_{n≥0} x^n/n!**, R = **+∞**
→ **1/(1−x) = Σ_{n≥0} x^n**, R = **1**
Variantes immédiates :
→ e^{αx} = Σ (αx)^n/n! = Σ α^n x^n/n!, R = +∞
→ 1/(1+x) = Σ (−1)^n x^n, R = 1
→ 1/(1−x)² = Σ (n+1) x^n (dérivation de 1/(1−x)), R = 1
Utilisation typique : briques de base pour tous les calculs de DSE par composition, dérivation, intégration.

---

### Carte 18 [C] — DSE de ln(1+x), arctan(x)

**RECTO :** DSE de ln(1+x) et arctan(x) avec rayon et domaine de validité.

**VERSO :**
→ **ln(1+x) = Σ_{n≥1} (−1)^{n−1} x^n/n**, R = 1, valide sur **]−1, 1]**
(obtenu par intégration de 1/(1+t) = Σ (−1)^n t^n)
→ **arctan(x) = Σ_{n≥0} (−1)^n x^{2n+1}/(2n+1)**, R = 1, valide sur **[−1, 1]**
(obtenu par intégration de 1/(1+t²) = Σ (−1)^n t^{2n})
Valeur classique : arctan(1) = π/4, d'où **π/4 = Σ (−1)^n/(2n+1)** (Leibniz-Gregory).
Utilisation typique : DSE de f composée avec ln ou arctan, calcul de sommes en spécialisant x.

---

### Carte 19 [C] — DSE de (1+x)^α (formule du binôme généralisé)

**RECTO :** DSE de (1+x)^α pour α ∈ ℝ quelconque.

**VERSO :**
**(1+x)^α = Σ_{n≥0} C(α,n) x^n** avec **C(α,n) = α(α−1)···(α−n+1)/n!**
R = 1 (si α ∉ ℕ ; si α ∈ ℕ, polynôme, R = +∞).
Cas particuliers :
→ α = −1 : 1/(1+x) = Σ (−1)^n x^n
→ α = 1/2 : √(1+x) = 1 + x/2 − x²/8 + …
→ α = −1/2 : 1/√(1+x) = 1 − x/2 + 3x²/8 − …
Utilisation typique : DSE de √(1+x), (1+x)^{−2}, ou toute puissance non entière.

---

### Carte 20 [C] — DSE de sin, cos, sh, ch

**RECTO :** DSE de sin x, cos x, sh x, ch x.

**VERSO :**
→ **sin x = Σ_{n≥0} (−1)^n x^{2n+1}/(2n+1)!**, R = +∞
→ **cos x = Σ_{n≥0} (−1)^n x^{2n}/(2n)!**, R = +∞
→ **sh x = Σ_{n≥0} x^{2n+1}/(2n+1)!**, R = +∞
→ **ch x = Σ_{n≥0} x^{2n}/(2n)!**, R = +∞
Mnémo : sh et ch = mêmes formules que sin et cos **sans les (−1)^n**.
Utilisation typique : briques de base, composition (sin(x²) = Σ (−1)^n x^{4n+2}/(2n+1)!).

---

### Carte 21 [C] — Opérations sur le rayon de convergence

**RECTO :** Rayon de Σ a_n x^n ± Σ b_n x^n, de Σ a_n (cx)^n, de Σ n^k a_n x^n, de Σ a_n x^n/(n+1) ?

**VERSO :**
→ **Somme** Σ(a_n ± b_n)x^n : R ≥ min(R_a, R_b) (égalité si R_a ≠ R_b)
→ **Dilatation** Σ a_n (cx)^n = Σ (a_n c^n) x^n : R' = **R/|c|**
→ **Dérivation** (Σ na_n x^{n−1}) : **même rayon R**
→ **Intégration** (Σ a_n x^{n+1}/(n+1)) : **même rayon R**
→ **Multiplication par n^k** (Σ n^k a_n x^n) : **même rayon R**
Utilisation typique : « la série Σ n² a_n x^n a le même rayon que Σ a_n x^n ».

---

### Carte 22 [C] — DSE classiques à retrouver par ED

**RECTO :** Retrouver le DSE de e^x par la méthode de l'équation différentielle.

**VERSO :**
On cherche S(x) = Σ a_n x^n vérifiant S' = S, S(0) = 1.
→ S'(x) = Σ (n+1)a_{n+1} x^n
→ S' = S ⟹ (n+1)a_{n+1} = a_n ⟹ **a_{n+1} = a_n/(n+1)**
→ Avec a_0 = S(0) = 1 : a_n = 1/n!
→ Vérification : R = +∞ (d'Alembert : 1/(n+1) → 0).
Même méthode pour sin, cos (S'' = −S), sh, ch (S'' = S), (1+x)^α ((1+x)S' = αS).
Utilisation typique : retrouver un DSE oublié ; ou trouver le DSE d'une solution d'ED.

---

### Carte 23 [C] — Exponentielle de matrice et séries entières

**RECTO :** DSE de exp(A) pour A matrice, et rayon ?

**VERSO :**
**exp(A) = Σ_{n≥0} A^n/n!**
Converge pour **toute matrice A** (rayon R = +∞ pour la série entière Σ x^n/n! sous-jacente).
Convergence au sens de la norme matricielle : Σ ‖A‖^n/n! = e^{‖A‖} < +∞.
Propriétés : exp(0) = I, (exp(tA))' = A·exp(tA), exp(A+B) = exp(A)exp(B) **si AB = BA**.
Utilisation typique : résolution de X' = AX ⟹ X(t) = exp(tA)X_0.

`
