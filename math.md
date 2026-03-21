const RAW_MATH = String.raw`



# Séries numériques

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Stratégie générale pour la nature d'une série

**RECTO :** Méthode générale : on me donne $\sum u_n$, quelle stratégie pour déterminer sa nature ?

**VERSO :**
→ Étape 1 : Vérifier $u_n \to 0$ (sinon divergence grossière)
→ Étape 2 : Si $u_n \ge 0$ (SATP), chercher un équivalent et comparer (Riemann, géométrique)
→ Étape 3 : Si $u_n$ alterne en signe, tenter le critère de Leibniz
→ Étape 4 : Sinon, tenter la convergence absolue (majorer $|u_n|$)
→ Étape 5 : En dernier recours : critère d'Abel, sommation par parties
Utilisation typique : premier réflexe face à tout exercice « déterminer la nature de $\sum u_n$ ».

---

### Carte 2 [M] — DL / équivalent pour nature d'une série à termes positifs

**RECTO :** Méthode : comment utiliser un DL pour déterminer la nature d'une série $\sum u_n$ à termes positifs ?

**VERSO :**
→ Étape 1 : Poser $x = 1/n$, réécrire $u_n = g(x)$ avec $x \to 0^+$
→ Étape 2 : Faire le DL de $g(x)$ en $0$ à l'ordre suffisant
→ Étape 3 : Identifier le terme dominant : $u_n \sim \frac{C}{n^\alpha}$
→ Étape 4 : Comparer à Riemann : cv si $\alpha > 1$, dv si $\alpha \le 1$ (et $C > 0$)
→ Si le premier terme donne $\alpha = 1$, pousser le DL plus loin
Utilisation typique : nature de $\sum (1 - \cos(1/n))$, $\sum (1/n - \sin(1/n))$, $\sum (\sqrt{n^2+1} - n)$.

---

### Carte 3 [M] — Reconnaître et calculer une série télescopique

**RECTO :** Méthode : comment reconnaître et calculer une série télescopique ?

**VERSO :**
→ Étape 1 : Écrire $u_n = v_{n+1} - v_n$ (ou $v_n - v_{n+1}$) pour une suite $(v_n)$ bien choisie
→ Étape 2 : Calculer la somme partielle :
$$S_n = \sum_{k=0}^{n} u_k = v_{n+1} - v_0$$
→ Étape 3 : $\sum u_n$ converge $\Leftrightarrow$ $(v_n)$ a une limite finie $\ell$, et la somme vaut $\ell - v_0$
Décomposition en éléments simples souvent utile pour obtenir la forme télescopique.
Utilisation typique : $\sum \frac{1}{n(n+1)}$, $\sum \ln\left(\frac{n}{n+1}\right)$, $\sum (\arctan(n+1) - \arctan(n))$.

---

### Carte 4 [M] — Montrer la convergence par convergence absolue

**RECTO :** On me demande de montrer que $\sum u_n$ converge, avec $u_n$ de signe quelconque (pas alternée). Quelle méthode ?

**VERSO :**
→ Étape 1 : Majorer $|u_n| \le v_n$ avec $v_n \ge 0$
→ Étape 2 : Montrer que $\sum v_n$ converge (comparaison, Riemann, etc.)
→ Étape 3 : Conclure : $\sum |u_n|$ cv $\Rightarrow \sum u_n$ cv
Majorations classiques : $|\sin(x)| \le 1$, $|\cos(x)| \le 1$, $|\sin(x)| \le |x|$.
Utilisation typique : $\sum \frac{\sin(n)}{n^2}$, $\sum \frac{\cos(n^2)}{n^{3/2}}$, $\sum \frac{(-1)^n}{n^2 + \sin(n)}$.

---

### Carte 5 [M] — Traiter une série alternée

**RECTO :** On me donne $\sum (-1)^n a_n$. Quelle méthode pour étudier sa nature ?

**VERSO :**
→ Étape 1 : Vérifier $a_n \ge 0$ (sinon ce n'est pas une série alternée)
→ Étape 2 : Montrer $(a_n)$ décroissante ($a_{n+1} \le a_n$, ou étudier $f'$ si $a_n = f(n)$)
→ Étape 3 : Vérifier $a_n \to 0$
→ Conclure par Leibniz : $\sum (-1)^n a_n$ converge, et $|R_n| \le a_{n+1}$
Si $(a_n)$ n'est pas décroissante, tenter la convergence absolue.
Utilisation typique : $\sum \frac{(-1)^n}{\sqrt{n}}$, $\sum \frac{(-1)^n \ln(n)}{n}$.

---

### Carte 6 [M] — Quand et comment utiliser la règle de d'Alembert

**RECTO :** Quand utiliser la règle de d'Alembert pour $\sum u_n$, et comment procéder ?

**VERSO :**
Réflexe : utiliser d'Alembert quand $u_n$ contient des **factorielles** ou des $a^n$.
→ Étape 1 : Calculer $\left|\frac{u_{n+1}}{u_n}\right|$ et simplifier
→ Étape 2 : Trouver la limite $\ell$
→ Étape 3 : $\ell < 1 \Rightarrow$ cv absolue ; $\ell > 1 \Rightarrow$ dv grossière ; **$\ell = 1 \Rightarrow$ on ne conclut pas**
Utilisation typique : $\sum \frac{n!}{n^n}$, $\sum \frac{2^n \cdot n!}{(2n)!}$, $\sum n^\alpha x^n$ (rayon de convergence).

---

### Carte 7 [M] — Comparaison série-intégrale en pratique

**RECTO :** Méthode : comment utiliser la comparaison série-intégrale pour étudier $\sum f(n)$ ?

**VERSO :**
→ Étape 1 : Identifier $f$ **continue, positive, décroissante** sur $[N, +\infty[$
→ Étape 2 : Nature : $\sum f(n)$ cv $\Leftrightarrow \int_N^{+\infty} f(t) dt$ cv
→ Étape 3 : Cas divergent, équivalent de $S_n$ : $S_n \sim \int_1^n f(t) dt$
→ Étape 4 : Cas convergent, équivalent du reste : $R_n \sim \int_n^{+\infty} f(t) dt$
Utilisation typique : nature de $\sum \frac{1}{n \ln n}$, équivalent de $\sum_{k=1}^n \frac{1}{k} \sim \ln n$, encadrement de $R_n$ pour $\sum \frac{1}{k^2}$.

---

### Carte 8 [M] — Équivalent du reste d'une série convergente à termes positifs

**RECTO :** Comment obtenir un équivalent du reste $R_n = \sum_{k=n+1}^{+\infty} u_k$ d'une SATP convergente ?

**VERSO :**
→ Méthode 1 : Si $u_n \sim v_n$ (SATP cv), alors $R_n(u) \sim R_n(v)$
→ Méthode 2 : Comparaison série-intégrale : $R_n \sim \int_n^{+\infty} f(t) dt$
→ Méthode 3 : Si télescopique $u_k = v_k - v_{k+1}$, alors $R_n = v_{n+1}$
Exemple : $R_n$ de $\sum \frac{1}{k^2} \sim \int_n^\infty \frac{dt}{t^2} = \frac{1}{n}$. Plus généralement, $R_n$ de $\sum \frac{1}{k^\alpha} \sim \frac{1}{(\alpha-1)n^{\alpha-1}}$.
Utilisation typique : « donner un équivalent de $\sum_{k \ge n} \frac{1}{k^\alpha}$ » pour $\alpha > 1$.

---

## CARTES THÉORÈME

---

### Carte 9 [T] — Condition nécessaire de convergence

**RECTO :** Énoncer la condition nécessaire de convergence d'une série.

**VERSO :**
Si la série $\sum u_n$ converge, alors $u_n \to 0$.
Contraposée (divergence grossière) : si $u_n$ ne tend pas vers $0$, alors $\sum u_n$ diverge.
**Réciproque FAUSSE** : $\sum \frac{1}{n}$ diverge alors que $\frac{1}{n} \to 0$.
Utilisation typique : premier test rapide pour éliminer une série divergente (ex : $\sum \frac{n}{n+1}$ diverge car $u_n \to 1 \neq 0$).

---

### Carte 10 [T] — Comparaison des séries à termes positifs

**RECTO :** Énoncer le théorème de comparaison pour les séries à termes positifs.

**VERSO :**
**Hypothèse :** $0 \le u_n \le v_n$ **à partir d'un certain rang**.
→ Si $\sum v_n$ converge, alors $\sum u_n$ converge
→ Si $\sum u_n$ diverge, alors $\sum v_n$ diverge
Variante : $u_n = O(v_n)$ avec $v_n \ge 0$ et $\sum v_n$ cv $\Rightarrow \sum u_n$ cv.
Utilisation typique : $|\sin(1/n^2)| \le 1/n^2$ donc $\sum \sin(1/n^2)$ converge absolument.

---

### Carte 11 [T] — Équivalent pour les séries à termes positifs

**RECTO :** Énoncer le théorème de comparaison par équivalents pour les séries à termes positifs.

**VERSO :**
**Hypothèses :** $u_n, v_n > 0$ à partir d'un certain rang, $u_n \sim v_n$.
**Conclusion :** $\sum u_n$ et $\sum v_n$ sont de **même nature**.
De plus, en cas de convergence : $R_n(u) \sim R_n(v)$.
**Valable uniquement pour séries à termes positifs !**
Utilisation typique : $u_n \sim 3/n^2 \Rightarrow \sum u_n$ converge (même nature que $3 \cdot \sum \frac{1}{n^2}$).

---

### Carte 12 [T] — Convergence absolue $\Rightarrow$ convergence

**RECTO :** Énoncer le théorème liant convergence absolue et convergence.

**VERSO :**
Si $\sum |u_n|$ converge, alors $\sum u_n$ converge (dans $\mathbb{R}$, $\mathbb{C}$, ou tout evn **complet**).
On dit que $\sum u_n$ est absolument convergente. De plus :
$$\left|\sum_{n=0}^{+\infty} u_n\right| \le \sum_{n=0}^{+\infty} |u_n|$$
**Réciproque FAUSSE** : $\sum \frac{(-1)^n}{n}$ converge mais $\sum \frac{1}{n}$ diverge (semi-convergence).
Utilisation typique : montrer la convergence de $\sum u_n$ quand le signe de $u_n$ est compliqué.

---

### Carte 13 [T] — Critère spécial des séries alternées (Leibniz)

**RECTO :** Énoncer le critère spécial des séries alternées (théorème de Leibniz).

**VERSO :**
**Hypothèses :** $(a_n)$ suite réelle **positive**, **décroissante**, de **limite $0$**.
**Conclusion :** $\sum (-1)^n a_n$ converge.
De plus : le reste $R_n$ est du signe de son premier terme $(-1)^{n+1}a_{n+1}$, et $|R_n| \le a_{n+1}$.
Utilisation typique : convergence de $\sum \frac{(-1)^n}{n^\alpha}$ pour $\alpha > 0$, majoration d'erreur d'approximation.

---

### Carte 14 [T] — Règle de d'Alembert

**RECTO :** Énoncer la règle de d'Alembert pour les séries.

**VERSO :**
**Hypothèse :** $u_n \neq 0$ à partir d'un certain rang, $\left|\frac{u_{n+1}}{u_n}\right| \to \ell \in [0, +\infty]$.
→ Si $\ell < 1$ : $\sum u_n$ converge absolument
→ Si $\ell > 1$ (ou $+\infty$) : $|u_n| \to +\infty$, $\sum u_n$ diverge grossièrement
→ **Si $\ell = 1$ : on ne peut pas conclure** (ex : $\sum \frac{1}{n}$ et $\sum \frac{1}{n^2}$ donnent $\ell = 1$)
Utilisation typique : séries avec $n!$, $a^n$, ou pour le rayon de convergence d'une série entière.

---

### Carte 15 [T] — Comparaison série-intégrale

**RECTO :** Énoncer le théorème de comparaison série-intégrale.

**VERSO :**
**Hypothèse :** $f : [1, +\infty[ \to \mathbb{R}$ **continue**, **positive**, **décroissante**.
**Conclusion :**
$$\int_1^{N+1} f(t) dt \le \sum_{n=1}^{N} f(n) \le f(1) + \int_1^{N} f(t) dt$$
En particulier : $\sum f(n)$ cv $\Leftrightarrow \int_1^{+\infty} f(t) dt$ cv.
Reste : $\int_{n+1}^{+\infty} f(t) dt \le R_n \le \int_n^{+\infty} f(t) dt$.
Utilisation typique : nature de $\sum \frac{1}{n(\ln n)^\alpha}$, preuve que $H_n \sim \ln n$.

---

### Carte 16 [T] — Critère d'Abel (Dirichlet)

**RECTO :** Énoncer le critère d'Abel pour les séries.

**VERSO :**
**Hypothèses :**
→ $(a_n)$ suite réelle **monotone** tendant vers **0**
→ Les sommes partielles $B_n = \sum_{k=0}^{n} b_k$ sont **bornées**
**Conclusion :** $\sum a_n b_n$ converge.
Utilisation typique : convergence de $\sum \frac{\sin(n\theta)}{n}$ et $\sum \frac{\cos(n\theta)}{n}$ pour $\theta \notin 2\pi\mathbb{Z}$ (car $|\sum e^{ik\theta}|$ bornée).

---

## CARTES CALCUL

---

### Carte 17 [C] — Série géométrique

**RECTO :** Nature et somme de la série géométrique $\sum x^n$ ?

**VERSO :**
$\sum_{n=0}^{+\infty} x^n$ converge $\Leftrightarrow |x| < 1$, et dans ce cas :
$$\sum_{n=0}^{+\infty} x^n = \frac{1}{1-x}$$
Somme partielle : $\sum_{k=0}^{n} x^k = \frac{1 - x^{n+1}}{1 - x}$ pour $x \neq 1$.
Diverge si $|x| \ge 1$ (grossièrement si $|x| > 1$ car $|x^n| \to +\infty$).
Utilisation typique : série de référence pour d'Alembert, calcul de sommes, comparaisons.

---

### Carte 18 [C] — Séries de Riemann

**RECTO :** Nature de la série de Riemann $\sum \frac{1}{n^\alpha}$ selon $\alpha$ ?

**VERSO :**
$$\sum_{n=1}^{+\infty} \frac{1}{n^\alpha}$$
→ **Converge si $\alpha > 1$** (ex : $\sum \frac{1}{n^2} = \frac{\pi^2}{6}$)
→ **Diverge si $\alpha \le 1$** (ex : $\alpha = 1$, série harmonique)
Se démontre par comparaison série-intégrale avec $f(t) = \frac{1}{t^\alpha}$.
Utilisation typique : série de référence n°1. « $u_n \sim \frac{C}{n^\alpha}$ avec $C > 0 \Rightarrow$ même nature que Riemann. »

---

### Carte 19 [C] — Équivalent de la somme harmonique $H_n$

**RECTO :** Donner un équivalent de $H_n = \sum_{k=1}^{n} \frac{1}{k}$ quand $n \to +\infty$.

**VERSO :**
$H_n = \ln(n) + \gamma + o(1)$, où $\gamma \approx 0.5772$ est la constante d'Euler.
Donc **$H_n \sim \ln(n)$**.
Plus précisément : $H_n = \ln(n) + \gamma + \frac{1}{2n} + O\left(\frac{1}{n^2}\right)$.
Se démontre par comparaison série-intégrale avec $\int_1^n \frac{dt}{t} = \ln n$.
Utilisation typique : équivalent de sommes partielles, suites du type $u_n = \sum f(k) - g(n)$.

---

### Carte 20 [C] — Équivalents classiques pour l'étude de $\sum f(1/n)$

**RECTO :** Donner les équivalents en $0$ utiles pour déterminer la nature de $\sum f(1/n)$.

**VERSO :**
Quand $u \to 0$ :
→ $\sin(u) \sim u$, donc $\sin(1/n) \sim 1/n \Rightarrow$ **$\sum$ diverge**
→ $1 - \cos(u) \sim \frac{u^2}{2}$, donc $1 - \cos(1/n) \sim \frac{1}{2n^2} \Rightarrow$ **$\sum$ converge**
→ $\ln(1+u) \sim u$, donc $\ln(1+1/n^2) \sim 1/n^2 \Rightarrow$ **$\sum$ converge**
→ $e^u - 1 \sim u$, donc $e^{1/n} - 1 \sim 1/n \Rightarrow$ **$\sum$ diverge**
→ $(1+u)^\alpha - 1 \sim \alpha u$
Utilisation typique : nature de $\sum f(1/n)$ par équivalent puis comparaison à Riemann.

---

# Suites et séries de fonctions

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Montrer la convergence uniforme de $f_n \to f$

**RECTO :** Méthode pour montrer que $f_n$ converge uniformément vers $f$ sur $I$ ?

**VERSO :**
→ Étape 1 : Poser $g_n(x) = f_n(x) - f(x)$
→ Étape 2 : Calculer $M_n = \sup_{x \in I} |g_n(x)|$ (dériver $g_n$, trouver le max, évaluer aux bords)
→ Étape 3 : Si $M_n \to 0$, alors CVU sur $I$
Raccourci : si $|f_n(x) - f(x)| \le \alpha_n$ pour tout $x \in I$, avec $\alpha_n \to 0$, c'est terminé.
Utilisation typique : $f_n(x) = x^n(1-x)$ sur $[0, 1]$, on dérive pour trouver le max $\sim \frac{1}{e(n+1)} \to 0$.

---

### Carte 2 [M] — Montrer la non-convergence uniforme

**RECTO :** Méthode pour montrer que $f_n$ ne converge PAS uniformément vers $f$ sur $I$ ?

**VERSO :**
**Méthode 1 (directe) :** Exhiber $x_n \in I$ tel que $|f_n(x_n) - f(x_n)| \not\to 0$.
**Méthode 2 (contraposée) :** $f_n$ continues et $f$ discontinue $\Rightarrow$ pas de CVU.
**Méthode 3 :** Si $\int_I |f_n - f| \not\to 0$ (sur un segment), pas de CVU.
Astuce pour $x_n$ : prendre le max de $|f_n - f|$, ou essayer $x_n = 1/n, n, 1 - 1/n\dots$
Utilisation typique : $x^n$ sur $[0, 1] \to f$ discontinue en $1$, donc pas de CVU.

---

### Carte 3 [M] — Convergence normale d'une série de fonctions

**RECTO :** Méthode pour montrer la convergence normale de $\sum f_n$ sur $I$ ?

**VERSO :**
→ Étape 1 : Majorer $\|f_n\|_\infty = \sup_{x \in I} |f_n(x)| \le M_n$
→ Étape 2 : Montrer que la série numérique $\sum M_n$ converge
→ Conclure : CVN sur $I \Rightarrow$ CVU sur $I$
Majorations utiles : $|\sin u| \le \min(1, |u|)$, $|\cos u| \le 1$, $|x^n| \le r^n$ sur $[-r, r]$ avec $r < 1$.
Utilisation typique : $\sum \frac{\sin(nx)}{n^2}$ sur $\mathbb{R}$, majorer par $1/n^2$, Riemann $\alpha = 2 > 1$.

---

### Carte 4 [M] — Justifier l'interversion $\sum / \int$ (ou $\lim / \int$)

**RECTO :** Comment justifier $\int_a^b [\sum f_n(x)] dx = \sum \int_a^b f_n(x) dx$ ?

**VERSO :**
→ Étape 1 : Vérifier que $[a, b]$ est un **segment** (borné, fermé)
→ Étape 2 : Vérifier chaque $f_n$ **continue** sur $[a, b]$
→ Étape 3 : Montrer $\sum f_n$ **CVU** sur $[a, b]$ (la CVN suffit)
→ Conclure par le théorème d'intégration terme à terme
Idem pour les suites : CVU sur $[a, b] \Rightarrow \lim \int f_n = \int \lim f_n$.
Utilisation typique : $\int_0^r [\sum x^n] dx = \sum \frac{r^{n+1}}{n+1}$ pour $r < 1$.

---

### Carte 5 [M] — Justifier la dérivation terme à terme

**RECTO :** Comment justifier que $S(x) = \sum f_n(x)$ est $C^1$ et que $S' = \sum f'_n$ ?

**VERSO :**
→ Étape 1 : Vérifier chaque $f_n$ de **classe $C^1$** sur $I$ (intervalle)
→ Étape 2 : Vérifier **$\sum f_n$ CVS** en au moins un point de $I$
→ Étape 3 : Montrer **$\sum f'_n$ CVU** sur tout segment de $I$ (souvent via CVN)
→ Conclure : $S \in C^1$ et $S' = \sum f'_n$
Pour $C^k$ : itérer (CVU de $\sum f_n^{(j)}$ pour $j = 1, \dots, k$).
Utilisation typique : dériver $\sum \frac{e^{-nx}}{n}$ pour $x > 0$.

---

### Carte 6 [M] — Plan d'étude complet d'une suite de fonctions

**RECTO :** Plan type pour étudier complètement une suite $(f_n)$ sur un domaine $I$ ?

**VERSO :**
→ Étape 1 : **CVS** : fixer $x$, calculer $f(x) = \lim f_n(x)$, préciser le domaine
→ Étape 2 : **CVU** sur $I$ ? Calculer $\|f_n - f\|_\infty$. Sinon, tester CVU sur tout segment de $I$
→ Étape 3 : **Continuité** de $f$ (si CVU + $f_n$ continues)
→ Étape 4 : **Intégration** : intervertir $\lim / \int$ (si CVU sur un segment)
→ Étape 5 : **Dérivabilité** (si $f'_n$ CVU)
Utilisation typique : exercice « étudier $f_n(x) = nxe^{-nx}$ sur $[0, +\infty[$ ».

---

### Carte 7 [M] — CVU sur tout compact mais pas sur $I$

**RECTO :** Comment montrer la CVU sur tout compact de $I$, et à quoi cela sert-il ?

**VERSO :**
→ Étape 1 : Fixer un segment $[a, b] \subset I$ quelconque
→ Étape 2 : Majorer $\|f_n - f\|_{\infty, [a, b]}$ (la majoration peut dépendre de $a, b$)
→ Étape 3 : Montrer que cette borne $\to 0$
Cela suffit pour : continuité de $f$ sur $I$, interversion $\lim / \int$ sur tout segment, régularité.
Utilisation typique : $\sum x^n$ CVN sur $[-r, r]$ pour tout $r < 1$, mais pas CVU sur $]-1, 1[$.

---

## CARTES THÉORÈME

---

### Carte 8 [T] — Définition de la convergence uniforme (quantificateurs)

**RECTO :** Écrire la définition de la CVU avec les quantificateurs. Quelle différence avec la CVS ?

**VERSO :**
**CVU :** $\forall \epsilon > 0, \exists N \in \mathbb{N}, \forall n \ge N, \forall x \in I, |f_n(x) - f(x)| \le \epsilon$
**CVS :** $\forall \epsilon > 0, \forall x \in I, \exists N(x) \in \mathbb{N}, \forall n \ge N, |f_n(x) - f(x)| \le \epsilon$
Différence clé : en CVU, **$N$ ne dépend pas de $x$**. En CVS, $N$ peut dépendre de $x$.
Reformulation : CVU $\Leftrightarrow \|f_n - f\|_{\infty, I} \to 0$.
Utilisation typique : identifier si un problème requiert CVS ou CVU ; reformuler en terme de sup.

---

### Carte 9 [T] — Liens CVN $\Rightarrow$ CVU $\Rightarrow$ CVS

**RECTO :** Énoncer les implications entre convergence normale, uniforme et simple pour $\sum f_n$.

**VERSO :**
**CVN $\Rightarrow$ CVU $\Rightarrow$ CVS** (aucune réciproque en général)
**CVN** : la série numérique **$\sum \|f_n\|_\infty$ converge**
**CVU** : $\|R_N\|_\infty = \sup_I |\sum_{k > N} f_k(x)| \to 0$
**CVS** : pour tout $x$ fixé, $\sum f_n(x)$ converge
CVN $\Rightarrow$ convergence absolue en tout point. La CVN est le moyen le plus courant d'obtenir la CVU.

---

### Carte 10 [T] — Continuité de la limite uniforme (suites)

**RECTO :** Énoncer le théorème de continuité de la limite uniforme d'une suite de fonctions.

**VERSO :**
**Hypothèses :**
→ $f_n : I \to \mathbb{R}$, **continues** sur $I$, pour tout $n$
→ $f_n \to f$ **uniformément** sur $I$
**Conclusion :** $f$ est **continue** sur $I$.
**Contraposée** (très utile) : $f_n$ continues et $f$ discontinue $\Rightarrow$ pas de CVU.
Utilisation typique : prouver la continuité de $f = \lim f_n$ ; ou prouver la non-CVU par discontinuité de $f$.

---

### Carte 11 [T] — Continuité de la somme d'une série de fonctions

**RECTO :** Sous quelles hypothèses la somme $S(x) = \sum f_n(x)$ est-elle continue ?

**VERSO :**
**Hypothèses :**
→ $f_n : I \to \mathbb{R}$ **continues** sur $I$
→ $\sum f_n$ **CVU** sur $I$ (la CVN suffit)
**Conclusion :** $S = \sum f_n$ est **continue** sur $I$.
Variante : si CVU seulement sur tout compact de $I$, alors $S$ continue sur $I$.
Utilisation typique : $\sum \frac{\cos(nx)}{n^2}$ continue sur $\mathbb{R}$ (CVN car $\|\frac{\cos(nx)}{n^2}\|_\infty \le 1/n^2$).

---

### Carte 12 [T] — Interversion limite / intégrale (suites, segment)

**RECTO :** Énoncer le théorème d'interversion limite-intégrale pour une suite de fonctions.

**VERSO :**
**Hypothèses :**
→ $f_n : [a, b] \to \mathbb{R}$ **continues** (**segment** !)
→ $f_n \to f$ **uniformément** sur $[a, b]$
**Conclusion :**
$$\lim_{n \to \infty} \int_a^b f_n(t) dt = \int_a^b f(t) dt$$
Majoration : $|\int_a^b f_n - \int_a^b f| \le (b - a) \cdot \|f_n - f\|_\infty$.
Utilisation typique : calculer $\lim \int_0^1 f_n(t) dt$ en utilisant la CVU sur $[0, 1]$.

---

### Carte 13 [T] — Intégration terme à terme (séries, segment)

**RECTO :** Énoncer le théorème d'intégration terme à terme d'une série sur un segment.

**VERSO :**
**Hypothèses :**
→ $f_n : [a, b] \to \mathbb{R}$ **continues**
→ $\sum f_n$ **CVU** sur $[a, b]$ (la CVN suffit)
**Conclusion :**
$$\int_a^b \left[\sum_{n=0}^\infty f_n(t)\right] dt = \sum_{n=0}^\infty \int_a^b f_n(t) dt$$
On intervertit **$\sum$ et $\int$** sur un segment sous CVU.

---

### Carte 14 [T] — Dérivation sous la limite (suites)

**RECTO :** Énoncer le théorème de dérivation de la limite d'une suite de fonctions.

**VERSO :**
**Hypothèses :** $f_n : I \to \mathbb{R}$ de **classe $C^1$**, $I$ intervalle.
→ $\exists a \in I$ tel que $(f_n(a))$ converge
→ $(f'_n)$ CVU vers $g$ sur tout segment de $I$
**Conclusion :**
→ $(f_n)$ CVU vers $f$ sur tout segment de $I$, $f$ est $C^1$
→ $f' = g = \lim f'_n$ (on intervertit $\lim$ et $d/dx$)

---

### Carte 15 [T] — Dérivation terme à terme (séries)

**RECTO :** Énoncer le théorème de dérivation terme à terme d'une série de fonctions.

**VERSO :**
**Hypothèses :** $f_n : I \to \mathbb{R}$ de **classe $C^1$**, $I$ intervalle.
→ **$\sum f_n$ CVS** en au moins un point de $I$
→ **$\sum f'_n$ CVU** sur tout segment de $I$
**Conclusion :** $S = \sum f_n$ est **$C^1$** sur $I$, et **$S'(x) = \sum f'_n(x)$**.
En pratique, la CVN de $\sum f'_n$ suffit pour avoir la CVU.
Utilisation typique : justifier $(\sum \frac{x^n}{n!})' = \sum \frac{x^{n-1}}{(n-1)!} = e^x$.

---

### Carte 16 [T] — CSSA pour séries de fonctions (convergence uniforme)

**RECTO :** Quand le critère des séries alternées donne-t-il la convergence uniforme ?

**VERSO :**
**Hypothèses :** pour tout $x \in I$ et tout $n$ :
→ $a_n(x) \ge 0$, suite $(a_n(x))_n$ décroissante en $n$
→ $\|a_n\|_\infty = \sup_I a_n(x) \to 0$
**Conclusion :** $\sum (-1)^n a_n(x)$ **CVU** sur $I$, et $\|R_N\|_\infty \le \|a_{N+1}\|_\infty$.
Justification : $|R_N(x)| \le a_{N+1}(x) \le \|a_{N+1}\|_\infty \to 0$.
Utilisation typique : $\sum \frac{(-1)^n}{n+x}$ sur $[0, +\infty[$, avec $\sup \frac{1}{n+x} = \frac{1}{n} \to 0$.

---

### Carte 17 [T] — Théorème de la double limite

**RECTO :** Énoncer le théorème de la double limite.

**VERSO :**
**Hypothèses :** $f_n : I \to \mathbb{R}$, $a \in \bar{I}$ (adhérence de $I$, point ou extrémité).
→ $f_n \to f$ **uniformément** sur $I$
→ Pour tout $n$, $\lim_{x \to a} f_n(x) = \ell_n$ existe
**Conclusion :** $(\ell_n)$ converge vers $\ell$, et $\lim_{x \to a} f(x) = \ell$.
On peut **intervertir les deux limites** :
$$\lim_{x \to a} \lim_{n \to \infty} f_n(x) = \lim_{n \to \infty} \lim_{x \to a} f_n(x)$$

---

## CARTES CALCUL

---

### Carte 18 [C] — Trois sup classiques de référence

**RECTO :** Calculer $\sup_{[0, 1]} x^n(1-x)$, $\sup_{[0, +\infty[} nxe^{-nx}$ et $\sup_{[0, +\infty[} xe^{-nx}$.

**VERSO :**
→ $\sup_{[0, 1]} x^n(1-x)$ : max en $x = \frac{n}{n+1}$, valeur $\sim \frac{1}{e(n+1)} \to 0 \Rightarrow$ CVU ✓
→ $\sup_{[0, +\infty[} nxe^{-nx}$ : max en $x = 1/n$, valeur = $1/e \not\to 0 \Rightarrow$ pas CVU ✗
→ $\sup_{[0, +\infty[} xe^{-nx}$ : max en $x = 1/n$, valeur = $\frac{1}{ne} \to 0 \Rightarrow$ CVU ✓

---

### Carte 19 [C] — Série géométrique de fonctions : domaines de convergence

**RECTO :** Sur quels domaines $\sum x^n$ converge-t-elle simplement, uniformément, normalement ?

**VERSO :**
→ **CVS** sur $]-1, 1[$, somme $S(x) = \frac{1}{1-x}$
→ **CVN** sur $[-r, r]$ pour tout **$r < 1$** : $\|x^n\|_\infty = r^n$, $\sum r^n$ converge
→ **Pas de CVU** sur $]-1, 1[$ : $\sup_{]-1, 1[} |x^n| = 1 \not\to 0$
On dit : CVU **sur tout compact** de $]-1, 1[$, mais pas sur $]-1, 1[$ entier.

---

### Carte 20 [C] — Sommes par dérivation/intégration de la série géométrique

**RECTO :** Donner $\sum_{n \ge 1} nx^{n-1}$ et $\sum_{n \ge 1} \frac{x^n}{n}$ pour $|x| < 1$, avec justification.

**VERSO :**
→ $\sum_{n=1}^\infty nx^{n-1} = \frac{1}{(1-x)^2}$ (dérivation de $\sum x^n = \frac{1}{1-x}$)
→ $\sum_{n=1}^\infty \frac{x^n}{n} = -\ln(1-x)$ (intégration de $\sum x^{n-1}$ sur $[0, x]$)
Justification : CVN sur $[-r, r]$ pour tout $r < 1 \Rightarrow$ dérivation et intégration licites.

---

# Séries entières

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Déterminer le rayon de convergence

**RECTO :** Méthode générale pour déterminer le rayon de convergence $R$ de $\sum a_n x^n$ ?

**VERSO :**
→ Étape 1 : Tenter **d'Alembert** : si $|a_{n+1}/a_n| \to \ell$, alors $R = 1/\ell$
→ Étape 2 : Si d'Alembert échoue, essayer la **règle de Cauchy** : si $|a_n|^{1/n} \to \ell$, alors $R = 1/\ell$
→ Étape 3 : Si $a_n$ est compliquée, encadrer $a_n$ et utiliser **la comparaison** : $|a_n| \le C b_n \Rightarrow R_a \ge R_b$
→ Étape 4 : Si $a_n = 0$ sauf pour $n$ dans une sous-suite, revenir à la définition (nature de $\sum |a_n x^n|$)
Convention : $\ell = 0 \Rightarrow R = +\infty$ ; $\ell = +\infty \Rightarrow R = 0$.

---

### Carte 2 [M] — Rayon de convergence quand les indices ne sont pas tous les entiers

**RECTO :** Comment trouver $R$ de $\sum a_n x^{\phi(n)}$ (ex : $\sum a_n x^{2n}$, $\sum a_n x^{n^2}$) ?

**VERSO :**
→ Étape 1 : Poser **$t = x^k$** si $\phi(n) = kn$ (ex : $t = x^2$ pour $\sum a_n x^{2n}$)
→ Étape 2 : Trouver le rayon $R_t$ de $\sum a_n t^n$ par d'Alembert/Cauchy
→ Étape 3 : $R_x = R_t^{1/k}$ (car $|x^k| < R_t \Leftrightarrow |x| < R_t^{1/k}$)
Si $\phi(n)$ quelconque (ex : $n^2$) : revenir à la définition ou utiliser Hadamard.

---

### Carte 3 [M] — Étudier la convergence aux bornes $x = \pm R$

**RECTO :** Méthode pour étudier la convergence de $\sum a_n x^n$ en $x = R$ et $x = -R$ ?

**VERSO :**
→ Étape 1 : Substituer $x = R$ : étudier la série numérique **$\sum a_n R^n$** (Riemann...)
→ Étape 2 : Substituer $x = -R$ : étudier **$\sum a_n (-R)^n = \sum (-1)^n a_n R^n$** (Leibniz ?)
Chaque bord se traite indépendamment.
Résultats classiques : $\sum \frac{x^n}{n}$ cv en $-1$ (Leibniz), dv en $1$ (harmonique).

---

### Carte 4 [M] — Trouver la somme d'une série entière

**RECTO :** Méthodes pour calculer la somme $S(x) = \sum a_n x^n$ ?

**VERSO :**
→ **Méthode 1 :** Reconnaître une série connue (géom, exp, ln, $(1+x)^\alpha$...)
→ **Méthode 2 :** Dériver ou intégrer $S(x)$ pour simplifier $a_n$ (ex : $n a_n$ ou $\frac{a_n}{n+1}$)
→ **Méthode 3 :** Écrire une **équation différentielle** vérifiée par $S(x)$ et la résoudre
→ **Méthode 4 :** Décomposer $a_n$ (fractions partielles) puis sommer chaque morceau
Toujours vérifier la condition initiale : **$S(0) = a_0$**.

---

### Carte 5 [M] — Trouver $S(x)$ par équation différentielle

**RECTO :** Méthode pour trouver la somme $S(x) = \sum a_n x^n$ via une ED ?

**VERSO :**
→ Étape 1 : Calculer $S'(x) = \sum n a_n x^{n-1}$ (licite pour $|x| < R$)
→ Étape 2 : Exprimer une relation entre $S(x), S'(x)$ (éventuellement $S''(x)$) via la récurrence sur $a_n$
→ Étape 3 : Résoudre l'ED obtenue sur $]-R, R[$
→ Étape 4 : Déterminer la constante avec **$S(0) = a_0$**.
La récurrence $(n+1)a_{n+1} = f(n) \cdot a_n$ se traduit souvent en ED.

---

### Carte 6 [M] — Développer $f(x)$ en série entière

**RECTO :** Méthodes pour développer une fonction $f$ en série entière au voisinage de $0$ ?

**VERSO :**
→ **Méthode 1 :** Si $f$ est $C^\infty$, tenter $f(x) = \sum \frac{f^{(n)}(0)}{n!} x^n$ et prouver la convergence
→ **Méthode 2 :** Partir d'un DSE connu ($e^x$, $\frac{1}{1-x}$...) et composer, dériver, intégrer
→ **Méthode 3 :** Résoudre une ED vérifiée par $f$, chercher $S(x) = \sum a_n x^n$
Utilisation typique : DSE de $\arctan = \int \frac{1}{1+t^2} dt = \int \sum (-1)^n t^{2n} dt$.

---

## CARTES THÉORÈME

---

### Carte 8 [T] — Théorème de Cauchy-Hadamard

**RECTO :** Énoncer le comportement fondamental de $\sum a_n x^n$ selon le rayon $R$.

**VERSO :**
→ Si **$|x| < R$** : $\sum a_n x^n$ **converge absolument**
→ Si **$|x| > R$** : $\sum a_n x^n$ **diverge grossièrement** ($|a_n x^n| \not\to 0$)
→ Si $|x| = R$ : **aucune conclusion générale**
Le rayon est donné par $R = \sup \{ r \ge 0 \mid (a_n r^n) \text{ est bornée} \}$.

---

### Carte 9 [T] — Règle de d'Alembert pour le rayon

**RECTO :** Énoncer la règle de d'Alembert pour le rayon de convergence de $\sum a_n x^n$.

**VERSO :**
**Hypothèse :** $a_n \neq 0$ à partir d'un certain rang, $\left|\frac{a_{n+1}}{a_n}\right| \to \ell \in [0, +\infty]$.
**Conclusion :** $R = \frac{1}{\ell}$.
Conventions : $\ell = 0 \Rightarrow R = +\infty$ ; $\ell = +\infty \Rightarrow R = 0$.
Utilisation typique : $R$ de $\sum \frac{x^n}{n!} \Rightarrow |\frac{a_{n+1}}{a_n}| = \frac{1}{n+1} \to 0 \Rightarrow R = +\infty$.

---

### Carte 10 [T] — Régularité de la somme d'une série entière

**RECTO :** Quelle est la régularité de $S(x) = \sum_{n \ge 0} a_n x^n$ sur $]-R, R[$ ?

**VERSO :**
$S$ est de **classe $C^\infty$** sur $]-R, R[$, et pour tout $k \ge 0$ :
$$S^{(k)}(x) = \sum_{n=k}^{+\infty} n(n-1)\dots(n-k+1) a_n x^{n-k}$$
La série dérivée a le **même rayon de convergence $R$**.
En particulier : $a_n = \frac{S^{(n)}(0)}{n!}$ (unicité du DSE).

---

### Carte 11 [T] — Convergence normale sur tout compact

**RECTO :** Que peut-on dire de la convergence de $\sum a_n x^n$ sur $[-r, r]$ pour $r < R$ ?

**VERSO :**
Pour tout **$0 \le r < R$**, la série $\sum a_n x^n$ converge **normalement** sur $[-r, r]$.
Preuve : $\|a_n x^n\|_{\infty, [-r, r]} = |a_n| r^n$, et $\sum |a_n| r^n$ converge car $r < R$.
Conséquence : toutes les interversions ($\sum/\int$, $\sum/\lim$, $\sum/d$) sont licites sur tout segment inclus dans $]-R, R[$.

---

### Carte 12 [T] — Intégration terme à terme d'une série entière

**RECTO :** Énoncer le résultat d'intégration terme à terme de $\sum a_n x^n$.

**VERSO :**
Pour tout $|x| < R$ :
$$\int_0^x \left(\sum_{n=0}^{+\infty} a_n t^n\right) dt = \sum_{n=0}^{+\infty} \frac{a_n}{n+1} x^{n+1}$$
La série entière obtenue a le **même rayon $R$**.

---

### Carte 13 [T] — Unicité du développement en série entière

**RECTO :** Énoncer le théorème d'unicité du DSE.

**VERSO :**
Si $\sum a_n x^n = \sum b_n x^n$ pour tout $x$ dans un **voisinage de $0$**, alors **$a_n = b_n$ pour tout $n$**.
Conséquence : si $f(x) = \sum a_n x^n$, alors nécessairement $a_n = \frac{f^{(n)}(0)}{n!}$.

---

### Carte 14 [T] — Théorème d'Abel radial

**RECTO :** Énoncer le théorème d'Abel radial.

**VERSO :**
**Hypothèse :** $\sum a_n x^n$ a un rayon $R > 0$, et **$\sum a_n R^n$ converge**.
**Conclusion :** $S(x) = \sum a_n x^n \to \sum_{n=0}^{+\infty} a_n R^n$ quand **$x \to R^-$**.
Autrement dit : $\lim_{x \to R^-} S(x) = S(R)$ (continuité à gauche au bord).

---

### Carte 15 [T] — Produit de Cauchy de deux séries entières

**RECTO :** Énoncer la formule du produit de Cauchy pour les séries entières.

**VERSO :**
Si $A(x) = \sum a_n x^n$ et $B(x) = \sum b_n x^n$, alors :
$$A(x) \cdot B(x) = \sum_{n=0}^{+\infty} c_n x^n \quad \text{avec} \quad c_n = \sum_{k=0}^{n} a_k b_{n-k}$$
Le rayon du produit est $\ge \min(R_a, R_b)$.

---

### Carte 16 [T] — Série entière et parité

**RECTO :** Que peut-on dire du DSE de $f$ si $f$ est paire ? Si $f$ est impaire ?

**VERSO :**
→ **$f$ paire** $\Rightarrow a_n = 0$ pour $n$ impair : $f(x) = \sum a_{2n} x^{2n}$
→ **$f$ impaire** $\Rightarrow a_n = 0$ pour $n$ pair : $f(x) = \sum a_{2n+1} x^{2n+1}$
Preuve : unicité du DSE appliquée à $f(x) = \pm f(-x)$.

---

## CARTES CALCUL

---

### Carte 17 [C] — DSE de référence : exponentielle, géométrique

**RECTO :** DSE de $e^x$ et de $\frac{1}{1-x}$ avec rayon.

**VERSO :**
→ **$e^x = \sum_{n=0}^{+\infty} \frac{x^n}{n!}$**, $R = +\infty$
→ **$\frac{1}{1-x} = \sum_{n=0}^{+\infty} x^n$**, $R = 1$
Variante : $\frac{1}{1+x} = \sum_{n=0}^{+\infty} (-1)^n x^n$, $R = 1$.

---

### Carte 18 [C] — DSE de $\ln(1+x)$, $\arctan(x)$

**RECTO :** DSE de $\ln(1+x)$ et $\arctan(x)$ avec rayon et domaine de validité.

**VERSO :**
→ **$\ln(1+x) = \sum_{n=1}^{+\infty} \frac{(-1)^{n-1} x^n}{n}$**, $R = 1$, valide sur $]-1, 1]$
→ **$\arctan(x) = \sum_{n=0}^{+\infty} \frac{(-1)^n x^{2n+1}}{2n+1}$**, $R = 1$, valide sur $[-1, 1]$

---

### Carte 19 [C] — DSE de $(1+x)^\alpha$ (binôme généralisé)

**RECTO :** DSE de $(1+x)^\alpha$ pour $\alpha \in \mathbb{R}$ quelconque.

**VERSO :**
$$(1+x)^\alpha = \sum_{n=0}^{+\infty} \binom{\alpha}{n} x^n \quad \text{avec} \quad \binom{\alpha}{n} = \frac{\alpha(\alpha-1)\dots(\alpha-n+1)}{n!}$$
Rayon $R = 1$ (si $\alpha \notin \mathbb{N}$).
Cas particuliers : $\sqrt{1+x} = 1 + \frac{x}{2} - \frac{x^2}{8} + \dots$

---

### Carte 20 [C] — DSE de $\sin, \cos, \sinh, \cosh$

**RECTO :** DSE de $\sin x, \cos x, \sinh x, \cosh x$.

**VERSO :**
→ **$\sin x = \sum_{n=0}^{+\infty} \frac{(-1)^n x^{2n+1}}{(2n+1)!}$**, $R = +\infty$
→ **$\cos x = \sum_{n=0}^{+\infty} \frac{(-1)^n x^{2n}}{(2n)!}$**, $R = +\infty$
→ **$\sinh x = \sum_{n=0}^{+\infty} \frac{x^{2n+1}}{(2n+1)!}$**, $R = +\infty$
→ **$\cosh x = \sum_{n=0}^{+\infty} \frac{x^{2n}}{(2n)!}$**, $R = +\infty$

---

### Carte 23 [C] — Exponentielle de matrice et séries entières

**RECTO :** DSE de $\exp(A)$ pour $A$ matrice, et rayon ?

**VERSO :**
$$\exp(A) = \sum_{n=0}^{+\infty} \frac{A^n}{n!}$$
Converge pour **toute matrice $A$** ($R = +\infty$).
Propriétés : $\exp(0) = I$, $(\exp(tA))' = A \cdot \exp(tA)$, $\exp(A+B) = \exp(A)\exp(B)$ **si $AB = BA$**.
`
