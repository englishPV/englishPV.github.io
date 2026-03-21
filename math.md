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



# Suites et fonctions de la variable réelle

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Étudier une suite récurrente u_{n+1} = f(u_n)

**RECTO :** Méthode pour étudier la convergence de u_{n+1} = f(u_n) ?

**VERSO :**
→ Étape 1 : Trouver les **points fixes** (résoudre f(ℓ) = ℓ)
→ Étape 2 : Trouver un **intervalle stable** I avec f(I) ⊂ I, montrer u_n ∈ I par récurrence
→ Étape 3 : Montrer la **monotonie** de (u_n) (signe de u_{n+1} − u_n, ou f(x) − x)
→ Étape 4 : Conclure par le **théorème de la limite monotone** : (u_n) bornée monotone ⟹ converge
→ Étape 5 : La limite est un point fixe de f (par continuité de f)
Utilisation typique : « Soit u_0 ∈ [0,2] et u_{n+1} = √(2 + u_n). Montrer que (u_n) converge. »

---

### Carte 2 [M] — Vitesse de convergence d'une suite récurrente

**RECTO :** Comment déterminer la vitesse de convergence de u_{n+1} = f(u_n) vers son point fixe ℓ ?

**VERSO :**
→ Étape 1 : Calculer f'(ℓ)
→ Étape 2 : Si **|f'(ℓ)| < 1** : convergence **géométrique**, u_n − ℓ = O(|f'(ℓ)|^n)
→ Étape 3 : Si **f'(ℓ) = 0** : convergence **quadratique** (méthode de Newton), regarder f''(ℓ)
→ Étape 4 : Si **|f'(ℓ)| = 1** : convergence lente, faire un DL de f au voisinage de ℓ
Poser e_n = u_n − ℓ et écrire e_{n+1} = f(ℓ + e_n) − ℓ ≈ f'(ℓ)e_n + f''(ℓ)e_n²/2.
Utilisation typique : montrer |u_n − ℓ| ≤ C·k^n avec k = |f'(ℓ)| < 1, ou méthode de Newton.

---

### Carte 3 [M] — Montrer qu'une suite converge (boîte à outils)

**RECTO :** Quels outils pour montrer qu'une suite (u_n) converge ?

**VERSO :**
→ **Monotone bornée** : la méthode reine (montrer croissante + majorée, ou décroissante + minorée)
→ **Adjacentes** : (u_n) croissante, (v_n) décroissante, u_n − v_n → 0
→ **Contraction** : |u_{n+1} − u_n| ≤ k|u_n − u_{n-1}| avec k < 1 ⟹ Cauchy ⟹ cv
→ **Bolzano-Weierstrass** : extraire une sous-suite convergente, puis unicité de la valeur d'adhérence
→ **Suite de Cauchy** : dans ℝ complet, Cauchy ⟺ convergente
→ **Domination** : |u_n − ℓ| ≤ v_n → 0
Utilisation typique : choisir l'outil adapté selon la forme de la suite.

---

### Carte 4 [M] — Étude d'une suite définie par u_{n+1} = f(u_n) avec f contractante

**RECTO :** Comment conclure rapidement si f est k-lipschitzienne avec k < 1 ?

**VERSO :**
→ Étape 1 : Montrer **|f(x) − f(y)| ≤ k|x − y|** avec **k < 1** sur l'intervalle stable I
→ Étape 2 : f admet un **unique point fixe** ℓ dans I
→ Étape 3 : |u_n − ℓ| ≤ k^n |u_0 − ℓ| → 0 (convergence géométrique)
→ En pratique : si f est C^1 et **|f'(x)| ≤ k < 1** sur I, c'est une contraction (IAF)
Utilisation typique : montrer la convergence + estimer la vitesse en une seule étape.

---

### Carte 5 [M] — Développement asymptotique d'une suite

**RECTO :** Méthode pour obtenir un développement asymptotique de u_n définie par récurrence ?

**VERSO :**
→ Étape 1 : Trouver le **terme dominant** (équivalent de u_n)
→ Étape 2 : Poser u_n = terme dominant + v_n, injecter dans la récurrence
→ Étape 3 : Déterminer v_n (nouveau terme), itérer
**Cas fréquent** : u_{n+1} = u_n + g(u_n) avec u_n → 0. Comparer à l'ED x' = g(x), puis Cesàro ou série télescopique.
**Cas u_{n+1} − u_n = f(n)** : u_n = u_0 + Σ_{k=0}^{n-1} f(k), ramené à comparaison série-intégrale.
Utilisation typique : « Donner un équivalent de u_n défini par u_{n+1} = u_n − u_n²/n. »

---

### Carte 6 [M] — Montrer qu'une fonction est de classe C^k

**RECTO :** Méthodes pour montrer que f est C^k sur un intervalle ?

**VERSO :**
→ **Méthode 1 :** Montrer que f est C^k par opérations (somme, produit, composée, quotient de C^k)
→ **Méthode 2 :** Si f est C^k par morceaux, vérifier le **recollement** : f^{(j)} admet des limites à gauche et à droite égales en chaque point de raccord, pour j = 0, …, k−1, puis f^{(k-1)} dérivable avec dérivée continue
→ **Méthode 3 :** Théorème de la limite de la dérivée (voir carte 7)
→ **Méthode 4 :** Série de fonctions C^k avec CVU des dérivées
Utilisation typique : f définie par morceaux, étudier la régularité en 0.

---

### Carte 7 [M] — Prolongement C^1 par le théorème de la limite de la dérivée

**RECTO :** Comment montrer qu'une fonction est dérivable en un point a où la formule change ?

**VERSO :**
→ Étape 1 : Vérifier la **continuité** de f en a (limites à gauche et à droite égales = f(a))
→ Étape 2 : Vérifier que f est **C^1 sur I \ {a}**
→ Étape 3 : Montrer que **f'(x) → ℓ quand x → a**
→ Conclure : f est **dérivable en a**, f'(a) = ℓ, et f' est continue en a (donc f ∈ C^1)
C'est le **théorème de la limite de la dérivée**.
Utilisation typique : f(x) = x² sin(1/x) prolongée par 0 ; fonctions définies par morceaux.

---

### Carte 8 [M] — Étude de fonction : plan type pour le concours

**RECTO :** Plan type pour une étude de fonction aux concours ?

**VERSO :**
→ Étape 1 : **Domaine** de définition, symétries (parité, périodicité), réduction du domaine
→ Étape 2 : **Continuité**, prolongement éventuel aux bords
→ Étape 3 : **Dérivabilité**, calcul de f', signe de f' (tableau de variations)
→ Étape 4 : **Limites** aux bords, **branches infinies** (asymptotes, DL)
→ Étape 5 : **Convexité** (signe de f'') si demandé
→ Étape 6 : Courbe
Utilisation typique : exercice d'analyse classique « étudier f(x) = … ».

---

### Carte 9 [M] — Appliquer le théorème de Rolle ou le TAF

**RECTO :** On me demande de montrer l'existence d'un zéro de f' ou d'une relation f(b) − f(a) = … Quelle méthode ?

**VERSO :**
**Pour un zéro de f' :**
→ Trouver a < b avec f(a) = f(b), puis **Rolle** : ∃ c ∈ ]a,b[, f'(c) = 0
→ Variante : Rolle généralisé (itérer pour f'', f'''…)

**Pour une relation de type inégalité :**
→ **TAF** : f(b) − f(a) = f'(c)(b − a) pour un c ∈ ]a, b[
→ **IAF** : si m ≤ f' ≤ M sur [a,b], alors m(b−a) ≤ f(b)−f(a) ≤ M(b−a)
Utilisation typique : montrer ∃ c, g(c) = 0 en construisant une fonction auxiliaire h telle que h' = g.

---

### Carte 10 [M] — Utiliser le théorème du point fixe de Banach (version suites)

**RECTO :** Comment appliquer le théorème du point fixe pour résoudre une équation f(x) = x ?

**VERSO :**
→ Étape 1 : Trouver un intervalle fermé **I stable** par f : f(I) ⊂ I
→ Étape 2 : Montrer f **contractante** sur I : |f(x) − f(y)| ≤ k|x − y|, **k < 1**
→ Étape 3 : Conclure : f admet un **unique** point fixe ℓ ∈ I, et pour tout u_0 ∈ I, u_{n+1} = f(u_n) → ℓ
En pratique : IAF avec **sup_I |f'| = k < 1**.
Utilisation typique : existence et unicité de solution de x = cos(x)/3 sur [0, 1].

---

## CARTES THÉORÈME

---

### Carte 11 [T] — Théorème de la limite monotone

**RECTO :** Énoncer le théorème de la limite monotone (convergence monotone pour les suites).

**VERSO :**
**Hypothèse :** (u_n) suite réelle **monotone** et **bornée**.
**Conclusion :** (u_n) **converge**.
→ Si (u_n) croissante majorée : lim u_n = **sup** u_n
→ Si (u_n) décroissante minorée : lim u_n = **inf** u_n
Si (u_n) croissante non majorée : u_n → +∞.
Utilisation typique : convergence d'une suite récurrente après avoir montré monotonie + bornitude.

---

### Carte 12 [T] — Théorème de Bolzano-Weierstrass

**RECTO :** Énoncer le théorème de Bolzano-Weierstrass.

**VERSO :**
De toute suite **bornée** de réels, on peut extraire une **sous-suite convergente**.
Variante : toute suite bornée admet au moins une **valeur d'adhérence**.
**Application** pour montrer la convergence : si (u_n) bornée et admet une **unique** valeur d'adhérence ℓ, alors u_n → ℓ.
Utilisation typique : montrer qu'une suite converge quand on ne peut pas montrer la monotonie directement.

---

### Carte 13 [T] — Suites adjacentes

**RECTO :** Énoncer le théorème des suites adjacentes.

**VERSO :**
**Hypothèses :**
→ (u_n) **croissante**, (v_n) **décroissante**
→ **v_n − u_n → 0**
**Conclusion :** (u_n) et (v_n) convergent vers la **même limite** ℓ, avec u_n ≤ ℓ ≤ v_n pour tout n.
Conséquence : encadrement de ℓ avec précision v_n − u_n.
Utilisation typique : dichotomie, encadrement d'une intégrale, sommes de Darboux.

---

### Carte 14 [T] — Théorème de Cesàro

**RECTO :** Énoncer le théorème de Cesàro.

**VERSO :**
**Hypothèse :** u_n → ℓ ∈ ℝ (ou ±∞).
**Conclusion :** La moyenne de Cesàro **σ_n = (u_0 + u_1 + … + u_n)/(n+1) → ℓ**.
**Réciproque FAUSSE** : u_n = (−1)^n → pas de limite, mais σ_n → 0.
Variante multiplicative : si u_n > 0 et u_n → ℓ > 0, alors (u_0 · u_1 ··· u_n)^{1/(n+1)} → ℓ.
Utilisation typique : « montrer que (1/n) Σ_{k=1}^{n} f(k/n) → ℓ » (Cesàro ou somme de Riemann).

---

### Carte 15 [T] — Théorème des valeurs intermédiaires (TVI)

**RECTO :** Énoncer le TVI et sa version bijective.

**VERSO :**
**TVI :** f : [a,b] → ℝ **continue**, pour tout y entre f(a) et f(b), ∃ c ∈ [a,b] tel que f(c) = y.
**Version bijective :** f : I → ℝ **continue strictement monotone** sur un intervalle I, alors f réalise une **bijection** de I sur f(I) = J (intervalle), et **f⁻¹ : J → I est continue strictement monotone** de même sens.
Corollaire : f continue sur [a,b] ⟹ f([a,b]) = [min f, max f] (image d'un segment = segment).
Utilisation typique : existence de solutions de f(x) = 0, inversion d'une fonction monotone.

---

### Carte 16 [T] — Théorème de Rolle

**RECTO :** Énoncer le théorème de Rolle avec ses hypothèses exactes.

**VERSO :**
**Hypothèses :**
→ f **continue** sur **[a, b]**
→ f **dérivable** sur **]a, b[**
→ **f(a) = f(b)**
**Conclusion :** ∃ c ∈ **]a, b[** tel que **f'(c) = 0**.
Les trois hypothèses sont indispensables (contre-exemples classiques sinon).
Utilisation typique : montrer qu'un polynôme dérivé a une racine entre deux racines consécutives ; construire une fonction auxiliaire g avec g(a) = g(b) pour appliquer Rolle.

---

### Carte 17 [T] — Théorème des accroissements finis (TAF) et inégalité (IAF)

**RECTO :** Énoncer le TAF et l'IAF.

**VERSO :**
**TAF :** f continue sur [a,b], dérivable sur ]a,b[. Alors ∃ c ∈ ]a,b[ :
**f(b) − f(a) = f'(c)(b − a)**

**IAF :** Si de plus **m ≤ f'(x) ≤ M** sur ]a,b[, alors :
**m(b − a) ≤ f(b) − f(a) ≤ M(b − a)**

Forme la plus utilisée : si **|f'| ≤ M**, alors **|f(b) − f(a)| ≤ M|b − a|**.
Utilisation typique : majorer |u_{n+1} − ℓ| = |f(u_n) − f(ℓ)| ≤ k|u_n − ℓ| (contraction).

---

### Carte 18 [T] — Caractérisation de la convexité

**RECTO :** Donner les caractérisations de la convexité d'une fonction f.

**VERSO :**
f : I → ℝ est **convexe** ⟺ (au choix) :
→ ∀ x, y ∈ I, ∀ t ∈ [0,1] : f(tx + (1−t)y) ≤ tf(x) + (1−t)f(y) (définition)
→ Si f dérivable : **f' est croissante** sur I
→ Si f dérivable : la courbe est **au-dessus de chaque tangente** : f(y) ≥ f(x) + f'(x)(y−x)
→ Si f deux fois dérivable : **f'' ≥ 0** sur I
**Inégalité de Jensen :** f convexe ⟹ f(Σ λ_i x_i) ≤ Σ λ_i f(x_i) pour Σ λ_i = 1, λ_i ≥ 0.
Utilisation typique : inégalités AM-GM, Jensen ; montrer une inégalité en étudiant la convexité.

---

### Carte 19 [T] — Formule de Taylor avec reste intégral

**RECTO :** Énoncer la formule de Taylor avec reste intégral.

**VERSO :**
**Hypothèse :** f de classe **C^{n+1}** sur un intervalle contenant a et x.
**Conclusion :**
**f(x) = Σ_{k=0}^{n} f^{(k)}(a)/k! · (x−a)^k + ∫_a^x (x−t)^n/n! · f^{(n+1)}(t) dt**
Le reste R_n(x) = ∫_a^x (x−t)^n/n! · f^{(n+1)}(t) dt.
Majoration : |R_n(x)| ≤ **M_{n+1} |x−a|^{n+1}/(n+1)!** où M_{n+1} = sup |f^{(n+1)}|.
Utilisation typique : justifier qu'une fonction est DSE (montrer R_n → 0), obtenir des majorations fines.

---

### Carte 20 [T] — Formule de Taylor-Young

**RECTO :** Énoncer la formule de Taylor-Young.

**VERSO :**
**Hypothèse :** f de classe **C^n** au voisinage de a.
**Conclusion :**
**f(x) = Σ_{k=0}^{n} f^{(k)}(a)/k! · (x−a)^k + o((x−a)^n)** quand x → a
**Pas de forme explicite du reste** (juste un o). Ne donne pas de majoration.
Différence avec Taylor-reste intégral : ici on n'a besoin que de C^n (pas C^{n+1}).
Utilisation typique : obtenir un DL de f en a ; déterminer un équivalent, une tangente, position par rapport à la tangente.

---

## CARTES CALCUL

---

### Carte 21 [C] — Développements limités classiques en 0

**RECTO :** DL en 0 de e^x, sin x, cos x, 1/(1−x), (1+x)^α, ln(1+x), à l'ordre n.

**VERSO :**
→ e^x = 1 + x + x²/2! + … + x^n/n! + o(x^n)
→ sin x = x − x³/3! + x⁵/5! − … + (−1)^n x^{2n+1}/(2n+1)! + o(x^{2n+2})
→ cos x = 1 − x²/2! + x⁴/4! − … + (−1)^n x^{2n}/(2n)! + o(x^{2n+1})
→ 1/(1−x) = 1 + x + x² + … + x^n + o(x^n)
→ (1+x)^α = 1 + αx + α(α−1)x²/2! + … + o(x^n)
→ ln(1+x) = x − x²/2 + x³/3 − … + (−1)^{n−1}x^n/n + o(x^n)
Utilisation typique : tout exercice nécessitant un DL, limites, équivalents, études locales.

---

### Carte 22 [C] — DL de tan x et arctan x en 0

**RECTO :** DL de tan x et arctan x en 0 aux premiers ordres utiles.

**VERSO :**
→ **tan x = x + x³/3 + 2x⁵/15 + o(x⁶)**
(obtenu par division de DL : sin x / cos x, ou par identification tan' = 1 + tan²)

→ **arctan x = x − x³/3 + x⁵/5 − … + (−1)^n x^{2n+1}/(2n+1) + o(x^{2n+2})**
(intégration de 1/(1+t²) = Σ (−1)^n t^{2n})

Utilisation typique : équivalent de arctan(1/n), DL de tan au voisinage de 0, limites.

---

### Carte 23 [C] — Formule de Stirling (équivalent de n!)

**RECTO :** Donner l'équivalent de n! (formule de Stirling).

**VERSO :**
**n! ∼ √(2πn) · (n/e)^n** quand n → +∞.
Version simplifiée (souvent suffisante) : **ln(n!) = n ln n − n + O(ln n)**.
Se démontre par comparaison série-intégrale de Σ ln k ∼ ∫_1^n ln t dt = n ln n − n + 1.
Utilisation typique : rayon de convergence de Σ n! x^n, Σ (2n)!/(n!)² x^n, équivalent de C(2n,n).

---

### Carte 24 [C] — Équivalent de C(2n, n)

**RECTO :** Donner un équivalent du coefficient binomial central C(2n, n).

**VERSO :**
Par Stirling : (2n)! ∼ √(4πn) · (2n/e)^{2n} et (n!)² ∼ 2πn · (n/e)^{2n}.
**C(2n, n) = (2n)! / (n!)² ∼ 4^n / √(πn)**
Conséquence : C(2n,n) · x^{2n} ∼ (4x²)^n / √(πn), ce qui donne des rayons R liés à 1/4.
Utilisation typique : rayon de Σ C(2n,n) x^n → R = 1/4.

---

### Carte 25 [C] — Formule de comparaison série-intégrale pour Σ f(k)

**RECTO :** Donner l'équivalent de Σ_{k=1}^n 1/k^α pour 0 < α < 1 et pour α = 1.

**VERSO :**
Par comparaison série-intégrale avec f(t) = 1/t^α, continue positive décroissante :
→ **α = 1 :** Σ_{k=1}^n 1/k = **ln n + γ + o(1)** ∼ ln n
→ **0 < α < 1 :** Σ_{k=1}^n 1/k^α ∼ ∫_1^n dt/t^α = **n^{1−α}/(1−α)**
→ **α > 1 :** Σ_{k=1}^n 1/k^α → ζ(α) (converge), reste R_n ∼ **1/((α−1)n^{α−1})**
Utilisation typique : équivalent de sommes partielles, suites définies par u_n = Σ f(k) − g(n).



# Espaces vectoriels normés

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Montrer qu'une application est une norme

**RECTO :** Méthode pour montrer que N : E → ℝ est une norme ?

**VERSO :**
Vérifier les **trois axiomes** :
→ Étape 1 : **Séparation** : N(x) = 0 ⟹ x = 0 (et N(x) ≥ 0, souvent évident)
→ Étape 2 : **Homogénéité** : N(λx) = |λ| N(x) pour tout λ ∈ 𝕂, x ∈ E
→ Étape 3 : **Inégalité triangulaire** : N(x + y) ≤ N(x) + N(y) (c'est souvent le point dur)
Pour l'inégalité triangulaire, outils classiques : Cauchy-Schwarz, Minkowski, convexité, majoration directe.
Utilisation typique : montrer que ‖f‖₁ = ∫|f|, ‖f‖_∞ = sup|f|, ou ‖x‖_p sont des normes.

---

### Carte 2 [M] — Montrer que deux normes sont équivalentes

**RECTO :** Méthode pour montrer que deux normes N₁ et N₂ sont équivalentes sur E ?

**VERSO :**
→ Étape 1 : Trouver **α > 0** tel que N₁(x) ≤ α N₂(x) pour tout x
→ Étape 2 : Trouver **β > 0** tel que N₂(x) ≤ β N₁(x) pour tout x
→ Conclure : **α⁻¹ N₂ ≤ N₁ ≤ α N₂** (ou équivalent)
**Raccourci en dimension finie** : toutes les normes sont équivalentes (pas de preuve nécessaire, citer le théorème).
En dimension infinie : exhiber un contre-exemple (suite x_n avec N₁(x_n)/N₂(x_n) → +∞).
Utilisation typique : justifier qu'on peut utiliser n'importe quelle norme en dimension finie ; montrer que ‖·‖₁ et ‖·‖_∞ ne sont pas équivalentes sur C([0,1]).

---

### Carte 3 [M] — Montrer qu'une partie est ouverte ou fermée

**RECTO :** Méthodes pour montrer qu'une partie A d'un evn est ouverte ? fermée ?

**VERSO :**
**Ouverte :**
→ Méthode 1 : ∀ x ∈ A, ∃ r > 0, B(x, r) ⊂ A (définition)
→ Méthode 2 : A = f⁻¹(O) avec f continue et O ouvert (image réciproque)
→ Méthode 3 : A est réunion d'ouverts, ou intersection **finie** d'ouverts

**Fermée :**
→ Méthode 1 : Toute suite (x_n) ⊂ A convergente a sa limite dans A (caractérisation séquentielle)
→ Méthode 2 : A = f⁻¹(F) avec f continue et F fermé
→ Méthode 3 : Le complémentaire de A est ouvert
Utilisation typique : {x : ‖x‖ < 1} ouvert, {x : ‖x‖ ≤ 1} fermé, GL_n(ℝ) ouvert.

---

### Carte 4 [M] — Montrer qu'une application linéaire est continue

**RECTO :** Méthodes pour montrer qu'une application linéaire f : E → F est continue ?

**VERSO :**
Quatre caractérisations équivalentes (montrer l'une d'entre elles) :
→ **Méthode 1 :** f est **bornée** sur la boule unité : ∃ C, ‖f(x)‖ ≤ C‖x‖ pour tout x (la plus utilisée)
→ **Méthode 2 :** f est **lipschitzienne** (automatique si linéaire bornée)
→ **Méthode 3 :** f est continue **en 0** (suffit pour une application linéaire)
→ **Méthode 4 :** En **dimension finie**, toute application linéaire est continue (rien à vérifier !)
En dimension infinie, exhiber C explicitement par majoration.
Utilisation typique : montrer la continuité d'une forme linéaire φ(f) = ∫₀¹ f(t)dt sur (C([0,1]), ‖·‖_∞).

---

### Carte 5 [M] — Calculer la norme d'opérateur |||u|||

**RECTO :** Méthode pour calculer la norme subordonnée |||u||| d'une application linéaire continue u ?

**VERSO :**
→ Étape 1 : Majorer : trouver C tel que ‖u(x)‖ ≤ C‖x‖ pour tout x, donc **|||u||| ≤ C**
→ Étape 2 : Minorer : exhiber **x₀ ≠ 0** tel que ‖u(x₀)‖/‖x₀‖ = C, donc **|||u||| ≥ C**
→ Conclure : |||u||| = C
Rappel : |||u||| = sup_{‖x‖=1} ‖u(x)‖ = sup_{x≠0} ‖u(x)‖/‖x‖.
Utilisation typique : norme de la forme linéaire f ↦ f(0) sur (C([0,1]), ‖·‖_∞) : |||φ||| = 1.

---

### Carte 6 [M] — Montrer qu'une partie est compacte

**RECTO :** Méthodes pour montrer qu'une partie K d'un evn est compacte ?

**VERSO :**
→ **En dimension finie** : K compact ⟺ K **fermé et borné** (Borel-Lebesgue, la plus utilisée)
→ **En dimension quelconque** : toute suite de K admet une sous-suite qui converge **dans K** (caractérisation séquentielle)
→ K compact ⟹ K fermé et borné (toujours vrai), mais la réciproque est **fausse en dimension infinie**
Contre-exemple classique : la boule unité fermée de (C([0,1]), ‖·‖_∞) n'est pas compacte.
Utilisation typique : la sphère S^{n-1}, le cube [0,1]^n sont compacts ; optimisation sur un compact.

---

### Carte 7 [M] — Montrer qu'un espace est complet

**RECTO :** Méthode pour montrer qu'un sous-espace F d'un espace de Banach E est complet ?

**VERSO :**
→ **Méthode 1 :** Montrer que F est **fermé** dans E (car sous-espace fermé d'un Banach = Banach)
→ **Méthode 2 :** Prendre une suite de Cauchy (x_n) de F, montrer qu'elle converge dans F
→ **Méthode 3 :** Montrer que toute **série absolument convergente** dans F converge dans F (caractérisation)
Pour montrer que F est fermé : caractérisation séquentielle (toute suite de F qui converge dans E a sa limite dans F).
Utilisation typique : (C([0,1]), ‖·‖_∞) est complet ; (C([0,1]), ‖·‖₁) ne l'est pas.

---

### Carte 8 [M] — Utiliser le théorème du point fixe de Banach

**RECTO :** Comment appliquer le théorème du point fixe de Banach (Picard) dans un evn ?

**VERSO :**
→ Étape 1 : Identifier l'espace **(E, d)** métrique **complet** (souvent un fermé d'un Banach)
→ Étape 2 : Identifier la partie **F fermée** (donc complète) **stable** par φ
→ Étape 3 : Montrer φ **contractante** : ‖φ(x) − φ(y)‖ ≤ **k**‖x − y‖ avec **k < 1**
→ Conclure : φ admet un **unique** point fixe dans F, et pour tout x₀ ∈ F, φⁿ(x₀) → point fixe
Vitesse : ‖x_n − ℓ‖ ≤ kⁿ/(1−k) · ‖x₁ − x₀‖.
Utilisation typique : Cauchy-Lipschitz (existence/unicité), résolution d'équations intégrales.

---

### Carte 9 [M] — Montrer qu'une partie est dense

**RECTO :** Méthode pour montrer que D est dense dans E ?

**VERSO :**
→ **Méthode 1 (définition) :** ∀ x ∈ E, ∀ ε > 0, ∃ d ∈ D, ‖x − d‖ < ε
→ **Méthode 2 (séquentielle) :** ∀ x ∈ E, ∃ (d_n) ⊂ D, d_n → x
→ **Méthode 3 :** Montrer que D̄ = E (adhérence de D = E entier)
→ **Méthode 4 :** Montrer que le seul fermé contenant D est E
Résultats classiques : ℚ dense dans ℝ ; polynômes denses dans (C([a,b]), ‖·‖_∞) (Weierstrass).
Utilisation typique : approximation, prolongement d'une application uniformément continue.

---

## CARTES THÉORÈME

---

### Carte 10 [T] — Équivalence des normes en dimension finie

**RECTO :** Énoncer le théorème d'équivalence des normes en dimension finie.

**VERSO :**
Sur un espace vectoriel de **dimension finie**, toutes les normes sont **équivalentes** :
pour toutes normes N₁, N₂, ∃ α, β > 0 : α N₁(x) ≤ N₂(x) ≤ β N₁(x), ∀x.
Conséquences fondamentales :
→ Les notions de convergence, continuité, ouverts, fermés **ne dépendent pas de la norme**
→ Toute application linéaire est **continue**
→ Fermé borné ⟺ compact (Borel-Lebesgue)
Utilisation typique : « en dimension finie, on peut choisir la norme qui arrange » ; passer de ‖·‖₂ à ‖·‖_∞.

---

### Carte 11 [T] — Caractérisation séquentielle des fermés

**RECTO :** Énoncer la caractérisation séquentielle des fermés dans un evn.

**VERSO :**
F partie d'un evn E. **F est fermé ⟺ toute suite (x_n) d'éléments de F qui converge dans E a sa limite dans F.**
Autrement dit : x_n ∈ F et x_n → ℓ ⟹ ℓ ∈ F.
Reformulation : F fermé ⟺ F = F̄ (F contient tous ses points limites).
Utilisation typique : montrer que Ker(f) est fermé (f linéaire continue), montrer qu'un sous-espace est fermé.

---

### Carte 12 [T] — Caractérisation séquentielle de la continuité

**RECTO :** Énoncer la caractérisation séquentielle de la continuité dans un evn.

**VERSO :**
f : E → F entre deux evn. **f continue en a ⟺ pour toute suite (x_n) telle que x_n → a, on a f(x_n) → f(a).**
Corollaire : f continue sur E ⟺ pour tout ouvert O de F, f⁻¹(O) est ouvert dans E.
Pour une application **linéaire** : continue en 0 ⟺ continue partout.
Utilisation typique : montrer la continuité ou la discontinuité (exhiber une suite x_n → a avec f(x_n) ↛ f(a)).

---

### Carte 13 [T] — Image continue d'un compact

**RECTO :** Énoncer le théorème de l'image d'un compact par une application continue.

**VERSO :**
**Hypothèse :** f : E → F **continue**, K ⊂ E **compact**.
**Conclusion :** f(K) est **compact** dans F.
Conséquences immédiates :
→ f continue sur un compact **est bornée et atteint ses bornes**
→ f continue sur un compact à valeurs dans ℝ : ∃ x_min, x_max ∈ K, f(x_min) = inf f, f(x_max) = sup f
Utilisation typique : optimisation sous contrainte (min/max de f sur la sphère unité).

---

### Carte 14 [T] — Théorème de Heine (continue sur un compact ⟹ uniformément continue)

**RECTO :** Énoncer le théorème de Heine.

**VERSO :**
**Hypothèse :** f : K → F **continue**, K **compact**.
**Conclusion :** f est **uniformément continue** sur K.
Rappel : uniformément continue signifie ∀ε > 0, ∃δ > 0, **∀x, y ∈ K**, ‖x−y‖ < δ ⟹ ‖f(x)−f(y)‖ < ε.
(Le δ ne dépend **pas** du point, contrairement à la continuité simple.)
Utilisation typique : f continue sur [a,b] est uniformément continue ; approximation uniforme.

---

### Carte 15 [T] — Continuité des applications linéaires (dimension finie)

**RECTO :** Énoncer le théorème de continuité automatique en dimension finie.

**VERSO :**
Si E est de **dimension finie**, alors toute application linéaire u : E → F (F evn quelconque) est **continue**.
Plus généralement : toute application **multilinéaire** de E₁ × … × E_k → F est continue si chaque E_i est de dimension finie.
Conséquence : le déterminant, le produit matriciel, la trace sont continus.
Utilisation typique : justifier sans calcul la continuité d'une forme linéaire, d'un produit scalaire, du déterminant.

---

### Carte 16 [T] — Caractérisation des applications linéaires continues (dimension quelconque)

**RECTO :** Donner les caractérisations équivalentes de la continuité d'une application linéaire u : E → F.

**VERSO :**
Pour u **linéaire**, les assertions suivantes sont **équivalentes** :
→ u est **continue** (sur E)
→ u est continue **en 0**
→ u est **lipschitzienne**
→ u est **bornée sur la boule unité** : ∃ C > 0, ‖u(x)‖ ≤ C‖x‖ pour tout x
→ u envoie les suites bornées sur des suites bornées
On note |||u||| = inf{C : ‖u(x)‖ ≤ C‖x‖} la **norme d'opérateur**.
Utilisation typique : pour montrer u continue en dimension infinie, majorer ‖u(x)‖ par C‖x‖.

---

### Carte 17 [T] — Complétude de ℝ et espaces de Banach classiques

**RECTO :** Quels sont les espaces de Banach classiques au programme ?

**VERSO :**
→ **(ℝⁿ, ‖·‖_p)** pour p ∈ {1, 2, +∞} : complet (dimension finie)
→ **(C([a,b], ℝ), ‖·‖_∞)** : **complet** (Banach). Critère : CVU sur [a,b]
→ **(C([a,b], ℝ), ‖·‖₁)** : **non complet** (contre-exemple classique avec fonctions en escalier)
→ **(𝓛(E,F), |||·|||)** : complet si F est complet
→ **(ℓ^p, ‖·‖_p)** : complet
Un evn complet = **espace de Banach**.
Utilisation typique : pour appliquer le point fixe de Banach, vérifier la complétude.

---

### Carte 18 [T] — Propriété de Bolzano-Weierstrass (compact séquentiel)

**RECTO :** Énoncer la caractérisation séquentielle de la compacité dans un evn.

**VERSO :**
K partie d'un evn E. K est **compact** ⟺ de toute suite d'éléments de K, on peut extraire une sous-suite **convergente dans K**.
En **dimension finie** : K compact ⟺ K **fermé** et **borné**.
En **dimension infinie** : fermé borné ⟹/ compact (la boule unité fermée n'est pas compacte).
Utilisation typique : optimisation (existence d'un minimum), extraction de sous-suite convergente.

---

### Carte 19 [T] — Norme d'opérateur et sous-multiplicativité

**RECTO :** Énoncer les propriétés de la norme d'opérateur (norme subordonnée).

**VERSO :**
Pour u ∈ 𝓛(E, F) :
**|||u||| = sup_{‖x‖≤1} ‖u(x)‖ = sup_{‖x‖=1} ‖u(x)‖ = sup_{x≠0} ‖u(x)‖/‖x‖**
Propriétés :
→ ‖u(x)‖ ≤ |||u||| · ‖x‖ pour tout x (inégalité fondamentale)
→ **Sous-multiplicativité** : |||v ∘ u||| ≤ |||v||| · |||u|||
→ En particulier pour les matrices : |||AB||| ≤ |||A||| · |||B|||
Utilisation typique : majorer ‖Aⁿx‖ ≤ |||A|||ⁿ ‖x‖, convergence de Σ Aⁿ/n!.

---

## CARTES CALCUL

---

### Carte 20 [C] — Normes classiques sur ℝⁿ

**RECTO :** Définir ‖x‖₁, ‖x‖₂, ‖x‖_∞ sur ℝⁿ et donner les inégalités de comparaison.

**VERSO :**
Pour x = (x₁, …, x_n) ∈ ℝⁿ :
→ ‖x‖₁ = Σ |x_i|
→ ‖x‖₂ = √(Σ x_i²) (norme euclidienne)
→ ‖x‖_∞ = max |x_i|
Comparaisons :
**‖x‖_∞ ≤ ‖x‖₂ ≤ ‖x‖₁ ≤ n ‖x‖_∞**
et ‖x‖₁ ≤ √n ‖x‖₂ (Cauchy-Schwarz).
Utilisation typique : passer d'une norme à l'autre pour simplifier un calcul ou une majoration.

---

### Carte 21 [C] — Normes classiques sur C([a,b])

**RECTO :** Définir ‖f‖_∞ et ‖f‖₁ sur C([a,b]) et leurs propriétés.

**VERSO :**
→ **‖f‖_∞ = sup_{t∈[a,b]} |f(t)|** = max |f(t)| (atteint car f continue sur compact)
→ **‖f‖₁ = ∫_a^b |f(t)| dt**
Propriétés :
→ ‖f‖₁ ≤ (b−a) ‖f‖_∞ (mais pas de réciproque avec constante uniforme)
→ (C([a,b]), ‖·‖_∞) est **complet** ; (C([a,b]), ‖·‖₁) **n'est pas complet**
→ CVU de f_n → f ⟺ ‖f_n − f‖_∞ → 0
Utilisation typique : convergence uniforme reformulée en norme infinie ; justifier la complétude.

---

### Carte 22 [C] — Boules ouvertes et fermées dans les normes classiques de ℝ²

**RECTO :** Dessiner/décrire la boule unité {‖x‖ ≤ 1} de ℝ² pour ‖·‖₁, ‖·‖₂, ‖·‖_∞.

**VERSO :**
→ **‖·‖₁** : losange (carré tourné à 45°) de sommets (±1, 0), (0, ±1)
→ **‖·‖₂** : disque usuel (cercle de rayon 1)
→ **‖·‖_∞** : carré [−1, 1]² (côtés parallèles aux axes)
Inclusion : B_∞ ⊂ B₂ ⊂ B₁ (la boule ‖·‖_∞ est la plus petite, ‖·‖₁ la plus grande).
Toute norme sur ℝ² a une boule unité **convexe, symétrique, bornée contenant 0**.
Utilisation typique : visualiser l'effet de la norme, comprendre les inégalités de comparaison.

---

### Carte 23 [C] — Ouverts et fermés fondamentaux

**RECTO :** La boule ouverte est-elle ouverte ? La sphère est-elle fermée ? GL_n(ℝ) ?

**VERSO :**
→ **B(a, r) = {x : ‖x−a‖ < r}** est **ouverte** (par définition de la topologie)
→ **B̄(a, r) = {x : ‖x−a‖ ≤ r}** est **fermée** (image réciproque de [0, r] par x ↦ ‖x−a‖ continue)
→ **S(a, r) = {x : ‖x−a‖ = r}** est **fermée** (image réciproque de {r})
→ **GL_n(ℝ) = det⁻¹(ℝ*)** est **ouvert** (image réciproque de ℝ* ouvert par det continue)
→ GL_n(ℝ) est **dense** dans M_n(ℝ) (perturber par εI)
Utilisation typique : vérifications rapides de topologie, justifier l'ouverture de GL_n(ℝ).

---

### Carte 24 [C] — Parties denses et connexes classiques

**RECTO :** Donner des exemples classiques de parties denses et de parties connexes par arcs.

**VERSO :**
**Parties denses :**
→ ℚ dense dans ℝ ; ℝ \ ℚ dense dans ℝ
→ Polynômes denses dans (C([a,b]), ‖·‖_∞) (Weierstrass)
→ GL_n(ℝ) dense dans M_n(ℝ)

**Parties connexes par arcs :**
→ Tout evn est connexe par arcs (relier par le segment [x, y])
→ Tout convexe est connexe par arcs
→ GL_n(ℂ) est connexe par arcs ; GL_n(ℝ) **ne l'est pas** (deux composantes : det > 0 et det < 0)
Utilisation typique : prolongement par densité, passage à la limite dans une égalité, raisonnement par connexité.



# Intégration sur un intervalle quelconque

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Stratégie générale pour la nature d'une intégrale impropre

**RECTO :** On me donne ∫_a^b f(t) dt avec a ou b problématique (±∞ ou f non bornée). Quelle stratégie ?

**VERSO :**
→ Étape 1 : Identifier les **bornes problématiques** (singularités de f et/ou bornes infinies)
→ Étape 2 : Si f ≥ 0 (FATP), chercher un **équivalent** de f au voisinage de chaque borne et comparer (Riemann)
→ Étape 3 : Si f change de signe, tenter la **convergence absolue** (majorer |f| et comparer)
→ Étape 4 : Si CV absolue échoue, tenter **Abel/intégration par parties** (semi-convergence)
→ Étape 5 : Découper l'intégrale en plusieurs morceaux si plusieurs singularités
Utilisation typique : premier réflexe face à « nature de ∫_0^{+∞} f(t) dt ».

---

### Carte 2 [M] — Équivalent au voisinage de la borne pour une intégrale de fonction positive

**RECTO :** Méthode pour déterminer la nature de ∫_a^{+∞} f(t) dt avec f ≥ 0 par équivalent ?

**VERSO :**
→ Étape 1 : Trouver l'**équivalent** de f(t) quand t → +∞ (DL, simplification)
→ Étape 2 : Comparer aux **intégrales de Riemann** :
  • ∫_1^{+∞} dt/t^α : **cv si α > 1**, dv si α ≤ 1
→ Étape 3 : Si f(t) ∼ C/t^α avec C > 0 : même nature que Riemann (car f ≥ 0)
Même méthode en 0⁺ : ∫_0^1 dt/t^α : **cv si α < 1**, dv si α ≥ 1.
Utilisation typique : ∫_1^{+∞} dt/(t² + t) ∼ ∫ dt/t² → cv ; ∫_0^1 dt/√t ∼ 1/t^{1/2} → cv (α = 1/2 < 1).

---

### Carte 3 [M] — Intégrale impropre avec singularité en une borne finie

**RECTO :** Méthode pour ∫_a^b f(t) dt quand f explose en b⁻ (ou en a⁺) ?

**VERSO :**
→ Étape 1 : Poser l'intégrale comme **lim_{ε→0⁺} ∫_a^{b−ε} f(t) dt**
→ Étape 2 : Si f ≥ 0, trouver l'**équivalent** de f(t) quand t → b⁻
→ Étape 3 : Comparer à **1/(b−t)^α** :
  • ∫_a^b dt/(b−t)^α cv ⟺ **α < 1**
→ Étape 4 : Si f(t) ∼ C/(b−t)^α avec C > 0 : même nature
Changement de variable u = b − t souvent utile pour se ramener à ∫_0 du/u^α.
Utilisation typique : ∫_0^1 dt/√(1−t²) → en t = 1⁻ : 1/√(1−t²) ∼ 1/√(2(1−t)) = 1/√2 · 1/(1−t)^{1/2}, α = 1/2 < 1 → cv.

---

### Carte 4 [M] — Convergence absolue d'une intégrale impropre

**RECTO :** Méthode pour montrer la convergence absolue de ∫_a^{+∞} f(t) dt ?

**VERSO :**
→ Étape 1 : Majorer **|f(t)| ≤ g(t)** avec g ≥ 0 intégrable sur [a, +∞[
→ Étape 2 : Montrer que ∫_a^{+∞} g(t) dt converge (comparaison, Riemann, équivalent)
→ Étape 3 : Conclure : ∫ |f| cv ⟹ ∫ f cv (convergence absolue ⟹ convergence)
Majorations classiques : |sin t| ≤ 1, |cos t| ≤ 1, |sin t| ≤ |t|, |e^{it}| = 1.
Utilisation typique : ∫_1^{+∞} sin(t)/t² dt : |sin(t)/t²| ≤ 1/t², Riemann α = 2 > 1 → CVA.

---

### Carte 5 [M] — Intégrale semi-convergente par IPP ou Abel

**RECTO :** Méthode pour montrer la convergence d'une intégrale qui ne converge PAS absolument ?

**VERSO :**
→ **Méthode 1 (IPP) :** Écrire ∫ u·v' = [uv] − ∫ u'·v, montrer que [uv] a une limite finie et ∫ u'v converge (absolument)
→ **Méthode 2 (Abel) :** f(t) = a(t)b(t) avec a monotone → 0 et **∫ b(t) dt bornée** (primitive bornée)
Exemples typiques de semi-convergentes :
  • ∫_1^{+∞} sin(t)/t dt (Abel : a = 1/t ↘ 0, ∫ sin t borné)
  • ∫_1^{+∞} cos(t)/t^α dt pour α > 0
Utilisation typique : montrer cv sans cv absolue → « intégrale semi-convergente ».

---

### Carte 6 [M] — Intervertir ∫ et Σ

**RECTO :** Méthode pour justifier ∫ [Σ f_n(t)] dt = Σ ∫ f_n(t) dt sur un intervalle quelconque ?

**VERSO :**
**Cas segment [a,b] :** CVU de Σ f_n sur [a,b] suffit (théorème classique)
**Cas intervalle quelconque :** utiliser le **théorème de convergence dominée** (ou monotone) :
→ Étape 1 : Σ f_n CVS sur I, chaque f_n continue par morceaux
→ Étape 2 : Trouver **φ ≥ 0 intégrable** sur I telle que |Σ_{k=0}^{N} f_k(t)| ≤ φ(t) pour tout N, t (**domination**)
→ Étape 3 : Conclure par convergence dominée
Alternative (cas positif) : théorème de convergence monotone (Beppo Levi) → toujours licite si f_n ≥ 0.
Utilisation typique : ∫_0^{+∞} [Σ e^{−nt}] dt = Σ 1/n (attention, justifier !).

---

### Carte 7 [M] — Intervertir ∫ et lim (ou ∫ et dérivée sous le signe ∫)

**RECTO :** Méthode pour justifier lim_{n→∞} ∫_I f_n(t) dt = ∫_I lim f_n(t) dt ?

**VERSO :**
→ Étape 1 : Vérifier la **convergence simple** f_n(t) → f(t) pour tout t ∈ I
→ Étape 2 : Trouver une **fonction dominante** φ ≥ 0 intégrable sur I : |f_n(t)| ≤ φ(t) pour tout n, t
→ Étape 3 : Appliquer le **théorème de convergence dominée** de Lebesgue
**Pour la dérivée sous ∫ :** F(x) = ∫_I f(x,t) dt, on veut F'(x) = ∫_I ∂f/∂x(x,t) dt :
→ f(x,·) intégrable, ∂f/∂x existe, |∂f/∂x(x,t)| ≤ φ(t) intégrable **pour tout x** au voisinage
Utilisation typique : Γ'(x) = ∫_0^{+∞} ln(t) t^{x-1} e^{-t} dt (dérivation sous le signe ∫ de la fonction Gamma).

---

### Carte 8 [M] — Calcul d'intégrales par les séries (et réciproquement)

**RECTO :** Méthode pour calculer ∫_0^1 f(t) dt en développant f en série ?

**VERSO :**
→ Étape 1 : Écrire f(t) = Σ a_n g_n(t) (souvent série entière ou série géométrique)
→ Étape 2 : Justifier l'interversion (CVU sur [0,1], ou CVN, ou convergence dominée)
→ Étape 3 : ∫_0^1 f(t) dt = Σ a_n ∫_0^1 g_n(t) dt
→ Étape 4 : Calculer chaque ∫_0^1 g_n(t) dt explicitement
Sens inverse : pour calculer Σ a_n, chercher a_n = ∫ g_n(t) dt et sommer sous l'intégrale.
Utilisation typique : ∫_0^1 ln(1−t)/t dt = −Σ 1/n² = −π²/6 ; ∫_0^1 t^n ln(t) dt = −1/(n+1)².

---

## CARTES THÉORÈME

---

### Carte 9 [T] — Critère de convergence pour les intégrales de fonctions positives

**RECTO :** Énoncer le critère de convergence par comparaison pour ∫_a^{+∞} f(t) dt, f ≥ 0.

**VERSO :**
**Hypothèse :** 0 ≤ f(t) ≤ g(t) pour t assez grand, f, g continues par morceaux.
→ Si ∫_a^{+∞} g(t) dt **converge**, alors ∫_a^{+∞} f(t) dt **converge**
→ Si ∫_a^{+∞} f(t) dt **diverge**, alors ∫_a^{+∞} g(t) dt **diverge**
Variante : si f(t) ∼ g(t) avec f, g > 0 au voisinage de +∞, alors **même nature**.
Utilisation typique : comparer à 1/t^α, e^{−t}, e^{−t²}…

---

### Carte 10 [T] — Convergence absolue ⟹ convergence (intégrales)

**RECTO :** Énoncer le théorème liant convergence absolue et convergence pour les intégrales.

**VERSO :**
Si ∫_a^{+∞} **|f(t)|** dt converge, alors ∫_a^{+∞} f(t) dt converge.
On dit que l'intégrale est **absolument convergente**.
De plus : |∫_a^{+∞} f(t) dt| ≤ ∫_a^{+∞} |f(t)| dt.
**Réciproque FAUSSE** : ∫_1^{+∞} sin(t)/t dt converge mais ∫_1^{+∞} |sin(t)/t| dt diverge (semi-convergence).
Utilisation typique : premier outil pour les fonctions de signe variable.

---

### Carte 11 [T] — Intégrales de Riemann (référence)

**RECTO :** Nature de ∫_1^{+∞} dt/t^α et de ∫_0^1 dt/t^α selon α ?

**VERSO :**
**En +∞ :** ∫_1^{+∞} dt/t^α :
→ **Converge si α > 1** (valeur : 1/(α−1))
→ **Diverge si α ≤ 1**

**En 0⁺ :** ∫_0^1 dt/t^α :
→ **Converge si α < 1** (valeur : 1/(1−α))
→ **Diverge si α ≥ 1**

Mnémo : en +∞ il faut décroître **vite** (α > 1) ; en 0⁺ il faut exploser **doucement** (α < 1).
Utilisation typique : intégrales de référence n°1, comparaison systématique.

---

### Carte 12 [T] — Critère d'Abel pour les intégrales

**RECTO :** Énoncer le critère d'Abel (ou de Dirichlet) pour les intégrales impropres.

**VERSO :**
**Hypothèses (Dirichlet) :**
→ a : [c, +∞[ → ℝ de **classe C^1**, **monotone**, tendant vers **0**
→ b : [c, +∞[ → ℝ **continue par morceaux**, de **primitive bornée** (∫_c^x b(t) dt bornée)
**Conclusion :** ∫_c^{+∞} a(t)b(t) dt **converge**.

**Abel** (variante) : a monotone bornée, ∫ b(t) dt convergente ⟹ ∫ a(t)b(t) dt converge.
Utilisation typique : ∫_1^{+∞} sin(t)/t^α dt pour α > 0 (a = 1/t^α ↘ 0, ∫ sin t bornée).

---

### Carte 13 [T] — Théorème de convergence dominée (Lebesgue)

**RECTO :** Énoncer le théorème de convergence dominée.

**VERSO :**
**Hypothèses :**
→ f_n : I → ℝ (ou ℂ) continues par morceaux, **f_n(t) → f(t)** pour tout t ∈ I (CVS)
→ **Domination** : ∃ φ : I → ℝ⁺ **intégrable** sur I, |f_n(t)| ≤ φ(t) pour tout n, t
**Conclusion :**
→ f est intégrable sur I
→ **lim ∫_I f_n(t) dt = ∫_I f(t) dt** (interversion lim/∫)
→ ∫_I |f_n − f| → 0
Utilisation typique : justifier toute interversion lim/∫ ou Σ/∫ sur un intervalle non borné.

---

### Carte 14 [T] — Théorème de convergence monotone (Beppo Levi)

**RECTO :** Énoncer le théorème de convergence monotone pour les intégrales.

**VERSO :**
**Hypothèses :**
→ f_n : I → ℝ continues par morceaux, **f_n ≥ 0**
→ **(f_n) croissante** : f_n(t) ≤ f_{n+1}(t) pour tout t
→ f_n(t) → f(t) pour tout t
**Conclusion :** lim ∫_I f_n(t) dt = ∫_I f(t) dt ∈ [0, +∞].
(La limite peut être +∞ si f n'est pas intégrable.)
Corollaire : si f_n ≥ 0, **Σ ∫ f_n = ∫ Σ f_n** (toujours vrai pour des fonctions positives !)
Utilisation typique : interversion Σ/∫ pour f_n ≥ 0 sans chercher de domination.

---

### Carte 15 [T] — Dérivation sous le signe intégral (théorème de Leibniz)

**RECTO :** Énoncer le théorème de dérivation sous le signe ∫ pour F(x) = ∫_I f(x,t) dt.

**VERSO :**
**Hypothèses :**
→ f(x, t) définie sur J × I, J intervalle ouvert
→ Pour tout x ∈ J, t ↦ f(x, t) **intégrable** sur I
→ Pour tout t, x ↦ f(x, t) de **classe C^1** sur J
→ **Domination** : ∃ φ intégrable sur I, |∂f/∂x(x, t)| ≤ φ(t) **pour tout x ∈ J, t ∈ I**
**Conclusion :** F est **C^1** sur J et **F'(x) = ∫_I ∂f/∂x(x, t) dt**.
Utilisation typique : F(x) = ∫_0^{+∞} e^{-xt} g(t) dt → F'(x) = −∫_0^{+∞} t e^{-xt} g(t) dt.

---

### Carte 16 [T] — Intégrabilité et limite en +∞

**RECTO :** Si f est continue positive et ∫_0^{+∞} f(t) dt converge, a-t-on f(t) → 0 ?

**VERSO :**
**NON en général !** f intégrable ⟹/ f(t) → 0.
Contre-exemple : f avec des « pics » de hauteur 1 et largeur 1/n² (aire totale finie mais f ↛ 0).
**Résultat vrai avec hypothèse supplémentaire :**
→ Si f est **uniformément continue** et intégrable, alors **f(t) → 0** (lemme de Barbalat)
→ Si f est **monotone** et intégrable, alors f(t) → 0 (car f monotone ⟹ UC sur [a, +∞[)
Utilisation typique : piège classique aux concours ; le résultat f → 0 nécessite une hypothèse de régularité.

---

## CARTES CALCUL

---

### Carte 17 [C] — Intégrales de référence

**RECTO :** Donner les valeurs/convergences des intégrales de référence classiques.

**VERSO :**
→ ∫_0^{+∞} e^{-t} dt = **1** ; ∫_0^{+∞} t^n e^{-t} dt = **n!** (fonction Gamma)
→ ∫_0^{+∞} e^{-t²} dt = **√π/2** (intégrale de Gauss)
→ ∫_0^{+∞} e^{-αt} dt = **1/α** pour α > 0
→ ∫_0^1 t^α dt = **1/(α+1)** pour α > −1
→ ∫_0^1 |ln t|^n dt = **n!** (changement t = e^{-u})
→ ∫_0^{π/2} sin^n t dt = ∫_0^{π/2} cos^n t dt = **intégrales de Wallis** (voir carte 18)
Utilisation typique : calculs directs, fonctions de domination, valeurs de référence pour comparaison.

---

### Carte 18 [C] — Intégrales de Wallis

**RECTO :** Donner la formule de récurrence et l'équivalent des intégrales de Wallis W_n = ∫_0^{π/2} sin^n t dt.

**VERSO :**
Récurrence : **W_n = (n−1)/n · W_{n−2}** (par IPP), avec W_0 = π/2, W_1 = 1.
Valeurs :
→ W_{2p} = π/2 · (2p)! / (2^p · p!)² = π/2 · C(2p,p) / 4^p
→ W_{2p+1} = 2^p · p! · 2^p · p! / (2p+1)!
Équivalent : **W_n ∼ √(π/(2n))** quand n → +∞.
Produit : W_n · W_{n+1} = π/(2(n+1)), d'où la formule de Wallis pour π.
Utilisation typique : équivalent de C(2n,n), formule de Stirling, calcul de ∫ sin^n.

---

### Carte 19 [C] — Fonction Gamma : définition et propriétés

**RECTO :** Définir Γ(x) et donner ses propriétés essentielles.

**VERSO :**
**Γ(x) = ∫_0^{+∞} t^{x−1} e^{-t} dt**, définie pour **x > 0**.
Propriétés :
→ **Γ(x+1) = x Γ(x)** (IPP) → relation fonctionnelle
→ **Γ(n+1) = n!** pour n ∈ ℕ (prolonge la factorielle)
→ **Γ(1/2) = √π** (lien avec l'intégrale de Gauss)
→ Γ est **C^∞** sur ]0, +∞[ (dérivation sous le signe ∫)
→ Γ est **log-convexe**
Utilisation typique : calcul de ∫_0^{+∞} t^α e^{-t} dt, changement de variable pour se ramener à Γ.

---

### Carte 20 [C] — Changements de variable classiques pour les intégrales impropres

**RECTO :** Quels changements de variable classiques pour les intégrales impropres ?

**VERSO :**
→ **t = 1/u** : transforme ∫_1^{+∞} en ∫_0^1, dt = −du/u²
→ **t = e^u** : transforme ∫_0^{+∞} en ∫_{-∞}^{+∞}, dt = e^u du
→ **t = u²** : pour ∫ avec √t, dt = 2u du
→ **t = −ln u** (ou u = e^{-t}) : transforme ∫_0^{+∞} en ∫_0^1, utile pour Γ
→ **t = a + (b−a)u** : ramène ∫_a^b à ∫_0^1
→ **Passage en polaires** : pour ∫∫ e^{-(x²+y²)}, donne l'intégrale de Gauss
Utilisation typique : ∫_0^1 (−ln t)^n dt → u = −ln t → ∫_0^{+∞} u^n e^{-u} du = Γ(n+1) = n!.

---

### Carte 21 [C] — Intégrale de Gauss et variantes

**RECTO :** Valeur de ∫_0^{+∞} e^{-t²} dt et de ∫_{-∞}^{+∞} e^{-t²} dt ?

**VERSO :**
→ **∫_0^{+∞} e^{-t²} dt = √π / 2**
→ **∫_{-∞}^{+∞} e^{-t²} dt = √π** (par parité)
→ ∫_{-∞}^{+∞} e^{-αt²} dt = **√(π/α)** pour α > 0 (changement u = √α · t)
→ ∫_0^{+∞} t^{2n} e^{-t²} dt = **(2n)! √π / (4^n n! · 2)** (IPP ou Γ(n+1/2))
Preuve classique : (∫ e^{-t²})² = ∫∫ e^{-(x²+y²)} dx dy → polaires → π/4 · 2 = π.
Utilisation typique : probabilités (loi normale), domination par e^{-t²}, intégrales de Laplace.

---

### Carte 22 [C] — Dominations classiques pour les intégrales impropres

**RECTO :** Donner les dominations classiques en +∞ et en 0⁺ pour les intégrales.

**VERSO :**
**En +∞ :** pour tout α, β > 0 :
→ **e^{-αt} ≪ 1/t^β** : l'exponentielle décroît plus vite que toute puissance
→ Plus précisément : t^n e^{-αt} → 0 pour tout n
→ Donc : ∫ P(t) e^{-αt} dt toujours convergente

**En 0⁺ :** pour tout α > 0 :
→ **|ln t|^β ≪ 1/t^α** : le log explose moins vite que toute puissance
→ ∫_0^1 |ln t|^β t^α dt converge dès que α > −1

Utilisation typique : domination pour convergence dominée, montrer la convergence d'une intégrale.

---

### Carte 23 [C] — Transformée de Laplace : exemples classiques

**RECTO :** Donner la transformée de Laplace de quelques fonctions classiques.

**VERSO :**
Pour p > 0 (ou p > seuil) :
→ **ℒ(1)(p) = ∫_0^{+∞} e^{-pt} dt = 1/p**
→ **ℒ(t^n)(p) = n!/p^{n+1}**
→ **ℒ(e^{at})(p) = 1/(p−a)** pour p > a
→ **ℒ(cos(ωt))(p) = p/(p²+ω²)**
→ **ℒ(sin(ωt))(p) = ω/(p²+ω²)**
Propriété : ℒ(f')(p) = p·ℒ(f)(p) − f(0) (dérivation → multiplication par p).
Utilisation typique : résolution d'ED linéaires à coefficients constants, calcul d'intégrales paramétriques.



# Flashcards Anki — Intégrales dépendant d'un paramètre (MP/MP*)

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Plan d'étude d'une fonction F(x) = ∫_I f(x,t) dt

**RECTO :** On me donne F(x) = ∫_I f(x,t) dt. Quel plan d'étude systématique ?

**VERSO :**
→ Étape 1 : **Domaine** : pour quels x l'intégrale converge-t-elle ? (fixer x, étudier t ↦ f(x,t))
→ Étape 2 : **Continuité** de F : théorème de continuité sous ∫ (domination)
→ Étape 3 : **Classe C^1** : théorème de dérivation sous ∫ (domination de ∂f/∂x)
→ Étape 4 : **Limites** de F(x) aux bords du domaine (convergence dominée ou interversion lim/∫)
→ Étape 5 : Si besoin, **classe C^k** (itérer la dérivation sous ∫)
Le cœur du travail est toujours de **trouver la fonction dominante** φ(t) intégrable.
Utilisation typique : « Étudier F(x) = ∫_0^{+∞} e^{-xt}/(1+t²) dt pour x > 0. »

---

### Carte 2 [M] — Trouver une domination pour la continuité sous ∫

**RECTO :** Comment trouver la fonction dominante φ(t) pour appliquer le théorème de continuité ?

**VERSO :**
→ Étape 1 : Fixer un **segment** [a,b] ⊂ domaine de x (on montre la continuité sur tout segment)
→ Étape 2 : Majorer |f(x,t)| pour **x ∈ [a,b]** : remplacer x par la borne qui donne le max
→ Étape 3 : Obtenir |f(x,t)| ≤ **φ(t)** indépendant de x, avec ∫_I φ(t) dt < +∞
Majorations types :
  • e^{-xt} ≤ e^{-at} pour x ≥ a > 0
  • |t^{x-1}| = t^{x-1} ≤ t^{a-1} en 0⁺ si x ≥ a ; ≤ t^{b-1} en +∞ si x ≤ b
Utilisation typique : continuité de Γ(x) = ∫_0^{+∞} t^{x-1}e^{-t} dt sur ]0, +∞[.

---

### Carte 3 [M] — Trouver une domination pour la dérivation sous ∫

**RECTO :** Comment justifier F'(x) = ∫_I ∂f/∂x(x,t) dt en pratique ?

**VERSO :**
→ Étape 1 : Calculer **∂f/∂x(x,t)** explicitement
→ Étape 2 : Fixer un segment [a,b] ⊂ domaine, majorer |∂f/∂x(x,t)| ≤ **ψ(t)** pour tout x ∈ [a,b]
→ Étape 3 : Vérifier ∫_I ψ(t) dt < +∞
→ Étape 4 : Les autres hypothèses (continuité de ∂f/∂x, intégrabilité de f(x,·)) sont souvent évidentes
→ Conclure : F ∈ C^1 et F'(x) = ∫_I ∂f/∂x(x,t) dt
Pour C^k : itérer avec ∂^k f/∂x^k, dominer chaque dérivée partielle.
Utilisation typique : montrer Γ ∈ C^∞ en dominant |t^{x-1}(ln t)^k e^{-t}| sur tout segment [a,b].

---

### Carte 4 [M] — Calcul d'une intégrale paramétrique par dérivation sous ∫

**RECTO :** Méthode pour calculer F(x) = ∫_I f(x,t) dt quand le calcul direct est impossible ?

**VERSO :**
→ Étape 1 : Calculer **F'(x) = ∫_I ∂f/∂x(x,t) dt** (justifier la dérivation sous ∫)
→ Étape 2 : Calculer F'(x) **explicitement** (l'intégrale de la dérivée est souvent plus simple)
→ Étape 3 : Intégrer F'(x) en x pour retrouver F(x) = ∫ F'(x) dx + C
→ Étape 4 : Déterminer la **constante C** par une valeur connue (F(0), F(+∞), lim…)
Parfois, dériver **deux fois** ou introduire un paramètre supplémentaire.
Utilisation typique : ∫_0^{+∞} (e^{-at} − e^{-bt})/t dt = ln(b/a) (intégrale de Frullani par F'(a)).

---

### Carte 5 [M] — Intervertir ∫∫ (Fubini en pratique)

**RECTO :** Méthode pour justifier l'interversion ∫_I [∫_J f(x,t) dt] dx = ∫_J [∫_I f(x,t) dx] dt ?

**VERSO :**
→ **Condition suffisante (Fubini-Tonelli) :** si ∫_I ∫_J |f(x,t)| dt dx < +∞ (intégrabilité de |f| sur le produit), alors on peut intervertir
→ En pratique : montrer que ∫∫ |f| < +∞ en calculant l'un des deux itérés de |f|
→ **Cas positif :** si f ≥ 0, l'interversion est **toujours licite** (même si l'intégrale vaut +∞)
Variante courante : ∫_0^{+∞} [∫_0^{+∞} …] = ∫_0^{+∞} [∫_0^{+∞} …] après Fubini.
Utilisation typique : calcul de ∫_0^{+∞} (e^{-at}−e^{-bt})/t dt en écrivant (e^{-at}−e^{-bt})/t = ∫_a^b e^{-ut} du.

---

### Carte 6 [M] — Calculer une intégrale par introduction d'un paramètre

**RECTO :** Comment calculer une intégrale « sèche » ∫_I g(t) dt en introduisant un paramètre ?

**VERSO :**
→ Étape 1 : Trouver une famille f(x,t) telle que pour une valeur x₀ particulière, f(x₀,t) = g(t)
→ Étape 2 : Poser F(x) = ∫_I f(x,t) dt
→ Étape 3 : Calculer F par dérivation/intégration sous ∫, ou par une autre astuce
→ Étape 4 : Évaluer F(x₀)
Exemples classiques d'introduction :
  • Multiplier par e^{-xt} ou t^x pour « paramétrer »
  • Écrire 1/t = ∫_0^{+∞} e^{-tu} du (Fubini)
Utilisation typique : ∫_0^{+∞} sin(t)/t dt = π/2 par F(x) = ∫_0^{+∞} e^{-xt} sin(t)/t dt puis F'(x).

---

### Carte 7 [M] — Comportement asymptotique d'une intégrale paramétrique

**RECTO :** Comment obtenir un équivalent de F(x) = ∫_I f(x,t) dt quand x → x₀ (bord du domaine) ?

**VERSO :**
→ **Méthode 1 (convergence dominée) :** si f(x,t) → g(t) et |f(x,t)| ≤ φ(t) intégrable, alors F(x) → ∫ g(t) dt
→ **Méthode 2 (découpage) :** séparer ∫_I = ∫_{I₁} + ∫_{I₂}, étudier chaque morceau
→ **Méthode 3 (changement de variable):** u = xt ou u = t/x pour se ramener à une forme connue
→ **Méthode 4 (Laplace) :** ∫ e^{xφ(t)} g(t) dt ∼ contribution du max de φ (méthode de Laplace/col)
Utilisation typique : ∫_0^{+∞} e^{-t}/(1+t/x) dt quand x → +∞ ; ∫_0^1 t^n f(t) dt quand n → +∞.

---

## CARTES THÉORÈME

---

### Carte 8 [T] — Continuité sous le signe ∫ (cas segment)

**RECTO :** Énoncer le théorème de continuité de F(x) = ∫_a^b f(x,t) dt (bornes fixes, segment).

**VERSO :**
**Hypothèses :**
→ f : A × **[a,b]** → ℝ, A partie d'un evn
→ Pour tout x, t ↦ f(x,t) **continue par morceaux** sur [a,b]
→ Pour tout t, x ↦ f(x,t) **continue** en x₀ (ou sur A)
→ **Domination** : |f(x,t)| ≤ **φ(t)** intégrable sur [a,b], **pour tout x au voisinage de x₀**
**Conclusion :** F est **continue** en x₀ (ou sur A).
Sur un **segment** [a,b], la domination est automatique si f est continue sur A × [a,b] (compact).
Utilisation typique : F(x) = ∫_0^1 f(x,t) dt continue si f est continue sur A × [0,1].

---

### Carte 9 [T] — Continuité sous le signe ∫ (cas intervalle quelconque)

**RECTO :** Énoncer le théorème de continuité de F(x) = ∫_I f(x,t) dt sur un intervalle quelconque I.

**VERSO :**
**Hypothèses :**
→ f : A × I → ℝ, I intervalle quelconque (éventuellement non borné)
→ Pour tout x ∈ A, t ↦ f(x,t) **continue par morceaux** et **intégrable** sur I
→ Pour tout t ∈ I, x ↦ f(x,t) **continue** sur A
→ **Hypothèse de domination** : ∃ φ : I → ℝ⁺ **intégrable** sur I, |f(x,t)| ≤ φ(t), **∀x ∈ A, ∀t ∈ I**
**Conclusion :** F est **continue** sur A.
En pratique, domination sur **tout segment** [a,b] ⊂ A suffit pour continuité sur A.
Utilisation typique : continuité de F(x) = ∫_0^{+∞} e^{-xt} g(t) dt sur ]0, +∞[.

---

### Carte 10 [T] — Dérivation sous le signe ∫ (théorème de Leibniz)

**RECTO :** Énoncer le théorème de dérivation sous le signe intégral.

**VERSO :**
**Hypothèses :** f : J × I → ℝ, J intervalle ouvert de ℝ, I intervalle quelconque.
→ Pour tout x ∈ J, t ↦ f(x,t) **continue par morceaux**, **intégrable** sur I
→ **∂f/∂x(x,t) existe** pour tout (x,t), et est continue par morceaux en t
→ **Domination de la dérivée** : ∃ ψ : I → ℝ⁺ intégrable sur I, **|∂f/∂x(x,t)| ≤ ψ(t)** pour tout x ∈ J, t ∈ I
**Conclusion :** F est **C^1** sur J et :
**F'(x) = ∫_I ∂f/∂x(x,t) dt**
Utilisation typique : Γ'(x) = ∫_0^{+∞} t^{x-1} ln(t) e^{-t} dt ; F(x) = ∫_0^{+∞} e^{-xt} sin(t)/t dt.

---

### Carte 11 [T] — Classe C^k sous le signe ∫

**RECTO :** Comment montrer que F(x) = ∫_I f(x,t) dt est C^k ?

**VERSO :**
**Hypothèses :** pour j = 0, 1, …, k :
→ ∂^j f/∂x^j (x,t) existe, est continue en x et continue par morceaux en t
→ t ↦ ∂^j f/∂x^j(x,t) intégrable sur I pour tout x
→ **Domination** : |∂^j f/∂x^j(x,t)| ≤ φ_j(t) intégrable, pour tout x ∈ J (ou sur tout compact de J)
**Conclusion :** F ∈ **C^k**(J) et F^{(j)}(x) = ∫_I ∂^j f/∂x^j(x,t) dt pour j = 0, …, k.
Pour C^∞ : vérifier pour tout k.
Utilisation typique : Γ ∈ C^∞ sur ]0,+∞[, la transformée de Laplace est C^∞.

---

### Carte 12 [T] — Interversion lim / ∫ (convergence dominée)

**RECTO :** Énoncer le théorème permettant d'intervertir lim_{x→x₀} et ∫_I.

**VERSO :**
**Hypothèses :**
→ f(x,t) → g(t) quand x → x₀, **pour tout t ∈ I** (convergence simple)
→ **Domination** : |f(x,t)| ≤ φ(t) intégrable sur I, pour tout x au voisinage de x₀
**Conclusion :** g est intégrable et **lim_{x→x₀} ∫_I f(x,t) dt = ∫_I g(t) dt**.
C'est une application directe du théorème de convergence dominée (avec x au lieu de n).
Utilisation typique : lim_{x→0⁺} ∫_0^{+∞} e^{-xt} sin(t)/t dt = ∫_0^{+∞} sin(t)/t dt = π/2.

---

### Carte 13 [T] — Théorème de Fubini (interversion ∫∫)

**RECTO :** Énoncer le théorème de Fubini pour les intégrales paramétriques.

**VERSO :**
**Hypothèse :** f : I × J → ℝ continue par morceaux.
→ ∫_I [∫_J |f(x,t)| dt] dx < +∞ (**intégrabilité sur le produit**)
**Conclusion :**
**∫_I [∫_J f(x,t) dt] dx = ∫_J [∫_I f(x,t) dx] dt**
**Cas f ≥ 0 (Tonelli) :** l'interversion est toujours valable, même si l'intégrale vaut +∞.
Vérification en pratique : calculer l'un des deux itérés de |f|, s'il est fini c'est bon.
Utilisation typique : ∫_0^∞ (e^{-at}−e^{-bt})/t dt = ∫_0^∞ [∫_a^b e^{-ut} du] dt = ∫_a^b 1/u du = ln(b/a).

---

### Carte 14 [T] — Continuité de F(x) = ∫_{a(x)}^{b(x)} f(x,t) dt (bornes variables)

**RECTO :** Que se passe-t-il quand les bornes d'intégration dépendent de x ?

**VERSO :**
Si F(x) = ∫_{a(x)}^{b(x)} f(x,t) dt avec a, b de classe C^1 et f, ∂f/∂x continues :
**F'(x) = ∫_{a(x)}^{b(x)} ∂f/∂x(x,t) dt + f(x, b(x))·b'(x) − f(x, a(x))·a'(x)**
C'est la **règle de Leibniz avec bornes variables** = dérivation sous ∫ + formule de la dérivée composée.
Cas particulier : F(x) = ∫_0^x f(x,t) dt → F'(x) = f(x,x) + ∫_0^x ∂f/∂x(x,t) dt.
Utilisation typique : F(x) = ∫_0^x e^{x-t} g(t) dt, dérivée de convolution.

---

## CARTES CALCUL

---

### Carte 15 [C] — Intégrale de Frullani

**RECTO :** Calculer ∫_0^{+∞} (f(at) − f(bt))/t dt (formule de Frullani).

**VERSO :**
**Hypothèse :** f continue, f(0) et f(+∞) existent (limites finies), a, b > 0.
**∫_0^{+∞} (f(at) − f(bt))/t dt = (f(0) − f(+∞)) · ln(b/a)**
Démonstration type : écrire (f(at)−f(bt))/t = ∫_b^a f'(ut) du, intervertir par Fubini, ou dériver F(x) = ∫_0^{+∞} e^{-xt} f(t)/t dt.
Cas classique : f(t) = e^{-t} → ∫_0^{+∞} (e^{-at} − e^{-bt})/t dt = **ln(b/a)**.
Utilisation typique : exercice classique de concours, application directe de Fubini.

---

### Carte 16 [C] — Intégrale de Dirichlet : ∫_0^{+∞} sin(t)/t dt = π/2

**RECTO :** Calculer ∫_0^{+∞} sin(t)/t dt et donner la méthode.

**VERSO :**
**∫_0^{+∞} sin(t)/t dt = π/2**
Méthode par paramètre :
→ Poser F(x) = ∫_0^{+∞} e^{-xt} sin(t)/t dt pour x > 0
→ Justifier la dérivation : F'(x) = −∫_0^{+∞} e^{-xt} sin(t) dt = **−1/(1+x²)** (calcul par IPP ou parties imaginaires)
→ F'(x) = −1/(1+x²) ⟹ F(x) = −arctan(x) + C
→ F(x) → 0 quand x → +∞ ⟹ C = π/2, donc F(x) = π/2 − arctan(x)
→ Conclure par **lim_{x→0⁺} F(x) = π/2** (convergence dominée pour justifier la continuité en 0)
Utilisation typique : grand classique de concours, modèle de la méthode « dérivation sous ∫ ».

---

### Carte 17 [C] — Transformée de Laplace et dérivation

**RECTO :** Propriétés utiles de la transformée de Laplace ℒ(f)(p) = ∫_0^{+∞} e^{-pt} f(t) dt ?

**VERSO :**
→ ℒ(f) est **C^∞** sur ]s₀, +∞[ (s₀ = abscisse de convergence), par dérivation sous ∫
→ **ℒ(f)^{(n)}(p) = ∫_0^{+∞} (−t)^n e^{-pt} f(t) dt** = ℒ((−t)^n f)(p)
→ **ℒ(f')(p) = p·ℒ(f)(p) − f(0⁺)** (dérivation → multiplication)
→ **ℒ(∫_0^t f)(p) = ℒ(f)(p)/p** (intégration → division)
→ ℒ(f)(p) → 0 quand p → +∞ (Riemann-Lebesgue)
Utilisation typique : résolution d'ED, calcul d'intégrales paramétriques, exemple phare de dérivation sous ∫.

---

### Carte 18 [C] — ∫_0^{+∞} e^{-xt} sin(t) dt et ∫_0^{+∞} e^{-xt} cos(t) dt

**RECTO :** Calculer ∫_0^{+∞} e^{-xt} sin(t) dt et ∫_0^{+∞} e^{-xt} cos(t) dt pour x > 0.

**VERSO :**
Méthode : calculer ∫_0^{+∞} e^{(-x+i)t} dt = 1/(x − i) = (x + i)/(x² + 1), puis séparer parties réelle et imaginaire.
→ **∫_0^{+∞} e^{-xt} cos(t) dt = x/(x² + 1)**
→ **∫_0^{+∞} e^{-xt} sin(t) dt = 1/(x² + 1)**
Vérification : en x = 0, ∫ sin(t) dt diverge (oscillation), cohérent avec la formule 1/(0+1) = 1 mais l'intégrale ne converge pas en x = 0 (semi-convergence seulement).
Utilisation typique : brique de base pour l'intégrale de Dirichlet, transformées de Laplace de sin/cos.

---

### Carte 19 [C] — Fonction Γ : calculs par dérivation sous ∫

**RECTO :** Donner Γ(x), Γ'(x), et la relation Γ(x+1) = xΓ(x) avec les justifications clés.

**VERSO :**
→ **Γ(x) = ∫_0^{+∞} t^{x-1} e^{-t} dt**, définie pour x > 0
→ **Γ(x+1) = xΓ(x)** (IPP : [−t^x e^{-t}]_0^∞ + x∫ t^{x-1}e^{-t} dt)
→ **Γ ∈ C^∞** : domination de ∂^k/∂x^k (t^{x-1} e^{-t}) = t^{x-1}(ln t)^k e^{-t} par φ(t) = t^{a-1}|ln t|^k e^{-t/2} sur tout [a,b] ⊂ ]0,+∞[
→ **Γ'(x) = ∫_0^{+∞} t^{x-1} ln(t) e^{-t} dt**
→ Γ(1) = 1, Γ(1/2) = √π, Γ(n+1) = n!
Utilisation typique : modèle complet de l'étude d'une intégrale paramétrique (domaine, continuité, C^∞, limites).

---

### Carte 20 [C] — Intégrales classiques par Fubini

**RECTO :** Calculer ∫_0^{+∞} (e^{-at} − e^{-bt})/t dt par Fubini (a, b > 0).

**VERSO :**
→ Écrire : (e^{-at} − e^{-bt})/t = ∫_a^b e^{-ut} du (car ∫_a^b e^{-ut} du = [−e^{-ut}/t]_a^b)
→ Fubini (f ≥ 0 pour a < b, ou justifier intégrabilité sur le produit) :
∫_0^{+∞} [∫_a^b e^{-ut} du] dt = ∫_a^b [∫_0^{+∞} e^{-ut} dt] du = ∫_a^b 1/u du = **ln(b/a)**
→ Résultat : **∫_0^{+∞} (e^{-at} − e^{-bt})/t dt = ln(b/a)**
Méthode universelle : « écrire la différence comme une intégrale en un paramètre, puis Fubini ».
Utilisation typique : intégrales de Frullani, intégrales avec (f(at) − f(bt))/t.

---

### Carte 21 [C] — Dominations classiques pour les intégrales paramétriques

**RECTO :** Donner les dominations types pour justifier continuité/dérivabilité sous ∫.

**VERSO :**
Pour x ∈ [a, b] avec a > 0 :
→ **e^{-xt} ≤ e^{-at}** pour t ≥ 0 (domination en +∞)
→ **t^{x-1} ≤ t^{a-1}** pour t ∈ ]0,1] (domination en 0⁺, si a ≤ x)
→ **t^{x-1} ≤ t^{b-1}** pour t ≥ 1 (domination en +∞, si x ≤ b)
→ **t^{x-1} |ln t|^k ≤ C_{a,b} · (t^{a/2 - 1} + t^{b-1} e^{-t/2})** (domination pour les dérivées k-ièmes)
→ Produit : t^{x-1} e^{-t} se domine par t^{a-1} e^{-t} (en 0⁺) et t^{b-1} e^{-t} (en +∞), les deux intégrables.
Utilisation typique : justifier les hypothèses des théorèmes de continuité/dérivation pour Γ, Laplace, etc.



# Équations différentielles

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Résoudre une EDL d'ordre 1 : y' + a(x)y = b(x)

**RECTO :** Méthode pour résoudre y' + a(x)y = b(x) sur un intervalle I ?

**VERSO :**
→ Étape 1 : **Résoudre l'homogène** y' + a(x)y = 0 → y_h(x) = λ e^{−A(x)} où A = ∫ a
→ Étape 2 : **Variation de la constante** : chercher y_p = λ(x) e^{−A(x)}
→ Étape 3 : Injecter : λ'(x) = b(x) e^{A(x)}, donc λ(x) = ∫ b(x) e^{A(x)} dx
→ Étape 4 : Solution générale : **y = (C + ∫ b·e^A) e^{−A}**
→ Étape 5 : Déterminer C avec la condition initiale y(x₀) = y₀
Utilisation typique : toute EDL1, y compris avec coefficients non constants. C'est la base.

---

### Carte 2 [M] — Résoudre une EDL d'ordre 2 à coefficients constants

**RECTO :** Méthode pour résoudre ay'' + by' + cy = f(x) avec a, b, c constants ?

**VERSO :**
→ Étape 1 : **Équation caractéristique** ar² + br + c = 0, trouver r₁, r₂
→ Étape 2 : **Solution homogène** :
  • Δ > 0 : y_h = C₁e^{r₁x} + C₂e^{r₂x}
  • Δ = 0 : y_h = (C₁ + C₂x)e^{r₀x}
  • Δ < 0 : r = α ± iβ, y_h = e^{αx}(C₁cos βx + C₂sin βx)
→ Étape 3 : **Solution particulière** de ay'' + by' + cy = f(x) (voir cartes 3 et 4)
→ Étape 4 : y = y_h + y_p, fixer C₁, C₂ avec les CI
Utilisation typique : la majorité des ED aux concours CCINP/Mines.

---

### Carte 3 [M] — Trouver une solution particulière : second membre classique

**RECTO :** Comment trouver y_p pour ay'' + by' + cy = f(x) selon la forme de f ?

**VERSO :**
→ **f(x) = P(x)e^{αx}** : chercher y_p = x^m Q(x)e^{αx}, deg Q = deg P, où **m = multiplicité de α comme racine** de l'éq. caract. (0, 1 ou 2)
→ **f(x) = e^{αx}cos(βx)** ou sin : passer en **complexes**, résoudre pour e^{(α+iβ)x}, prendre Re ou Im
→ **f(x) quelconque** : **variation des constantes** (méthode universelle, carte 4)
Principe de superposition : si f = f₁ + f₂, trouver y_{p1} et y_{p2} séparément.
Utilisation typique : y'' + y = xe^x → α = 1 non racine → y_p = (ax+b)e^x.

---

### Carte 4 [M] — Variation des constantes pour une EDL2

**RECTO :** Méthode de variation des constantes pour ay'' + by' + cy = f(x) ?

**VERSO :**
Soit {y₁, y₂} base de solutions de l'homogène. Chercher y_p = λ₁(x)y₁ + λ₂(x)y₂.
→ Étape 1 : Imposer **λ'₁y₁ + λ'₂y₂ = 0** (condition de simplification)
→ Étape 2 : Dériver et injecter dans l'ED : **λ'₁y'₁ + λ'₂y'₂ = f/a**
→ Étape 3 : Résoudre le **système de Cramer** en (λ'₁, λ'₂) (déterminant = Wronskien ≠ 0)
→ Étape 4 : Intégrer λ'₁ et λ'₂
Utilisation typique : méthode universelle quand le second membre n'est pas de la forme P(x)e^{αx}.

---

### Carte 5 [M] — Résoudre un système X' = AX (A constante)

**RECTO :** Méthode pour résoudre X'(t) = AX(t) avec A ∈ M_n(ℝ) constante ?

**VERSO :**
→ **Méthode 1 (exponentielle) :** X(t) = **e^{tA}** X₀ (si on sait calculer e^{tA})
→ **Méthode 2 (diagonalisation) :** si A = PDP⁻¹, poser Y = P⁻¹X, alors Y' = DY → y_i(t) = c_i e^{λ_i t}
→ **Méthode 3 (trigonalisation) :** si A = P(D+N)P⁻¹ avec N nilpotente, e^{tA} = Pe^{tD}e^{tN}P⁻¹
→ **Méthode 4 (Cayley-Hamilton / polynôme annulateur) :** réduire e^{tA} via le polynôme minimal
→ **Méthode 5 (dimension 2) :** écrire le système comme une ED2 scalaire
Utilisation typique : X' = AX avec A 2×2 ou 3×3 diagonalisable ou trigonalisable.

---

### Carte 6 [M] — Résoudre X' = AX + B(t) (système avec second membre)

**RECTO :** Méthode pour résoudre X'(t) = AX(t) + B(t) ?

**VERSO :**
→ Étape 1 : Résoudre l'homogène X' = AX → X_h(t) = e^{tA} C
→ Étape 2 : **Variation de la constante** : chercher X_p(t) = e^{tA} C(t)
→ Étape 3 : Injecter : C'(t) = e^{−tA} B(t)
→ Étape 4 : Intégrer : C(t) = ∫ e^{−sA} B(s) ds
→ Étape 5 : **Solution générale** : X(t) = e^{tA}(X₀ + ∫₀ᵗ e^{−sA}B(s) ds) (formule de Duhamel)
Utilisation typique : système linéaire non homogène, convolution avec l'exponentielle de matrice.

---

### Carte 7 [M] — ED à variables séparables

**RECTO :** Méthode pour résoudre y' = g(x)h(y) (variables séparables) ?

**VERSO :**
→ Étape 1 : Chercher les **solutions constantes** : h(y₀) = 0 ⟹ y(x) = y₀
→ Étape 2 : Si h(y) ≠ 0, séparer : **dy/h(y) = g(x) dx**
→ Étape 3 : Intégrer : ∫ dy/h(y) = ∫ g(x) dx + C → **H(y) = G(x) + C**
→ Étape 4 : Inverser H si possible pour obtenir y = H⁻¹(G(x) + C)
→ Étape 5 : Vérifier le **recollement** avec les solutions constantes (unicité de Cauchy-Lipschitz)
Utilisation typique : y' = y², y' = y(1−y), y' = x/y, ED de Bernoulli après changement.

---

### Carte 8 [M] — ED de Bernoulli : y' + a(x)y = b(x)y^α

**RECTO :** Méthode pour résoudre l'équation de Bernoulli y' + a(x)y = b(x)y^α avec α ≠ 0, 1 ?

**VERSO :**
→ Étape 1 : **Solution y = 0** (si α > 0)
→ Étape 2 : Pour y ≠ 0, poser **z = y^{1−α}**
→ Étape 3 : Calculer z' = (1−α)y^{−α}y' = (1−α)(−a(x)z + b(x))
→ Étape 4 : On obtient une **EDL1 en z** : z' + (1−α)a(x)z = (1−α)b(x)
→ Étape 5 : Résoudre en z, puis revenir à y = z^{1/(1−α)}
Utilisation typique : y' + y = y², y' = y − y³ (logistique).

---

### Carte 9 [M] — Étude qualitative : comportement des solutions

**RECTO :** On me demande le comportement de y(t) quand t → +∞ sans résoudre l'ED. Quels outils ?

**VERSO :**
→ **Bornes a priori** : si y' ≤ −αy (α > 0), alors y(t) ≤ y(0)e^{−αt} (Grönwall)
→ **Monotonie** : signe de y'(t) → y croissante/décroissante → limite monotone
→ **Fonctions de Lyapunov** : trouver V(y) telle que dV/dt ≤ 0 le long des solutions
→ **Barrières** : si φ'(t) ≥ f(t, φ(t)) et y' = f(t,y), y(0) ≤ φ(0), alors y(t) ≤ φ(t)
→ **Linéarisation** : y = ℓ + ε, linéariser → stabilité si les valeurs propres sont à partie réelle < 0
Utilisation typique : « montrer que y(t) → 0 quand t → +∞ » sans résolution explicite.

---

### Carte 10 [M] — Trouver la solution maximale / explosion en temps fini

**RECTO :** Comment déterminer l'intervalle maximal de définition d'une solution ?

**VERSO :**
→ Étape 1 : Résoudre l'ED (ou au moins obtenir une relation implicite)
→ Étape 2 : Déterminer l'intervalle maximal contenant t₀ sur lequel la solution reste définie
→ Étape 3 : Si la solution **explose** (|y(t)| → +∞) en temps fini T, la solution maximale est définie sur ]T⁻, T⁺[
**Critère d'explosion :** si la solution maximale est définie sur ]a, b[ avec **b < +∞**, alors **|y(t)| → +∞** quand t → b⁻
Exemple : y' = y², y(0) = 1 → y = 1/(1−t), explose en t = 1 → solution maximale sur ]−∞, 1[.
Utilisation typique : « déterminer le domaine maximal de la solution ».

---

## CARTES THÉORÈME

---

### Carte 11 [T] — Cauchy-Lipschitz linéaire

**RECTO :** Énoncer le théorème de Cauchy-Lipschitz linéaire.

**VERSO :**
**Hypothèses :** a₁, …, a_n, b : I → ℝ (ou ℂ) **continues** sur un intervalle **I**, t₀ ∈ I, y₀, …, y₀^{(n-1)} données.
**ED :** y^{(n)} + a₁(t)y^{(n−1)} + … + a_n(t)y = b(t)
**Conclusion :** Il existe une **unique** solution définie sur **I tout entier** vérifiant les conditions initiales.
Points clés :
→ **Existence et unicité globale** (sur tout I, pas seulement locale)
→ Pas de risque d'explosion en temps fini (contrairement au cas non linéaire)
Utilisation typique : justifier en une ligne l'existence et l'unicité pour toute EDL.

---

### Carte 12 [T] — Structure des solutions d'une EDL

**RECTO :** Quelle est la structure de l'ensemble des solutions de y^{(n)} + a₁y^{(n−1)} + … + a_n y = b(t) ?

**VERSO :**
→ L'ensemble **S_H** des solutions de l'**homogène** (b = 0) est un **espace vectoriel de dimension n**
→ L'ensemble **S** des solutions de l'**ED complète** est un **espace affine** : S = y_p + S_H
→ Solution générale = **une solution particulière + solution générale de l'homogène**
→ Une base de S_H est déterminée par n solutions **linéairement indépendantes** (Wronskien ≠ 0)
Utilisation typique : justifier la forme de la solution générale, compter les constantes.

---

### Carte 13 [T] — Cauchy-Lipschitz non linéaire (existence et unicité locale)

**RECTO :** Énoncer le théorème de Cauchy-Lipschitz pour y' = f(t, y).

**VERSO :**
**Hypothèses :** f : U → ℝⁿ, U ouvert de ℝ × ℝⁿ :
→ f **continue** sur U
→ f **localement lipschitzienne en y** : pour tout compact K ⊂ U, ∃L, |f(t,y₁) − f(t,y₂)| ≤ L|y₁ − y₂|
**Conclusion :** Pour tout (t₀, y₀) ∈ U, il existe une **unique solution maximale** de y' = f(t,y), y(t₀) = y₀.
En pratique : f de **classe C^1** en y ⟹ localement lipschitzienne (condition suffisante la plus utilisée).
Utilisation typique : justifier l'existence/unicité pour y' = y², y' = √y (attention : √y non lipschitzienne en 0 !).

---

### Carte 14 [T] — Wronskien : définition et propriétés

**RECTO :** Définir le Wronskien de n solutions d'une EDL d'ordre n et énoncer ses propriétés.

**VERSO :**
Pour y₁, …, y_n solutions de l'homogène d'ordre n :
**W(t) = det(y_i^{(j-1)}(t))_{1≤i,j≤n}** (matrice des y_i et de leurs dérivées)
Propriétés :
→ **W(t) ≠ 0 pour tout t ∈ I ⟺ W(t₀) ≠ 0 pour un t₀** ⟺ (y₁, …, y_n) **base de solutions**
→ **Formule d'Abel** (ordre 2) : W(t) = W(t₀) exp(−∫_{t₀}^t a₁(s) ds)
→ Le Wronskien **ne s'annule jamais ou est identiquement nul**
Utilisation typique : vérifier que deux solutions sont indépendantes, construire la variation des constantes.

---

### Carte 15 [T] — Lemme de Grönwall

**RECTO :** Énoncer le lemme de Grönwall.

**VERSO :**
**Hypothèses :** u, α : [t₀, T] → ℝ⁺ continues, β ≥ 0 constant.
→ u(t) ≤ α(t) + β ∫_{t₀}^t u(s) ds pour tout t ∈ [t₀, T]
**Conclusion :** **u(t) ≤ α(t) + β ∫_{t₀}^t α(s) e^{β(t−s)} ds**
**Cas particulier** (le plus utilisé) : si α(t) = C constant :
→ **u(t) ≤ C e^{β(t−t₀)}**
Utilisation typique : unicité des solutions d'une ED (estimer |y₁ − y₂|), majoration de croissance.

---

### Carte 16 [T] — Théorème de sortie de tout compact

**RECTO :** Énoncer le théorème de sortie de tout compact (explosion en temps fini).

**VERSO :**
**Hypothèse :** y : ]a, b[ → ℝⁿ **solution maximale** de y' = f(t, y), avec f ∈ C^1.
**Conclusion :** si **b < +∞**, alors pour tout compact K ⊂ U, le graphe (t, y(t)) **finit par sortir de K**.
En pratique (U = ℝ × ℝⁿ) : b < +∞ ⟹ **‖y(t)‖ → +∞** quand t → b⁻.
**Contraposée** (très utile) : si la solution **reste bornée** pour t → b⁻, alors **b = +∞** (solution globale).
Utilisation typique : montrer qu'une solution est globale en montrant qu'elle reste bornée.

---

### Carte 17 [T] — Exponentielle de matrice et systèmes

**RECTO :** Énoncer le lien entre e^{tA} et le système X' = AX.

**VERSO :**
→ **e^{tA} = Σ_{n≥0} (tA)^n/n!**, converge pour tout t ∈ ℝ et toute matrice A
→ t ↦ e^{tA} est l'**unique** solution matricielle de **M'(t) = AM(t)**, M(0) = I_n
→ La solution de X' = AX, X(t₀) = X₀ est **X(t) = e^{(t−t₀)A} X₀**
→ Les **colonnes de e^{tA}** forment une base de solutions
Propriétés : (e^{tA})⁻¹ = e^{−tA}, det(e^{tA}) = e^{t·tr(A)}, e^{t(A+B)} = e^{tA}e^{tB} **ssi AB = BA**.
Utilisation typique : résolution explicite d'un système linéaire à coefficients constants.

---

## CARTES CALCUL

---

### Carte 18 [C] — Solutions des ED classiques d'ordre 1

**RECTO :** Donner les solutions des ED classiques d'ordre 1.

**VERSO :**
→ **y' = ay** → y = Ce^{at}
→ **y' = a(t)y** → y = C exp(∫ a(t) dt)
→ **y' = y²** → y = 0 ou y = −1/(t − C) (explose en temps fini)
→ **y' = y(1 − y)** (logistique) → y = 1/(1 + Ce^{−t}) (y → 1 si y₀ > 0)
→ **y' = −y + b(t)** → y = Ce^{−t} + e^{−t}∫ e^t b(t) dt
Utilisation typique : résolution directe, reconnaître une ED classique sous une forme déguisée.

---

### Carte 19 [C] — Solutions des EDL2 à coefficients constants classiques

**RECTO :** Solutions des ED y'' + ω²y = 0, y'' − ω²y = 0, y'' + 2αy' + ω²y = 0 ?

**VERSO :**
→ **y'' + ω²y = 0** : y = A cos(ωt) + B sin(ωt) (oscillateur harmonique)
→ **y'' − ω²y = 0** : y = A e^{ωt} + B e^{−ωt} = C ch(ωt) + D sh(ωt)
→ **y'' + 2αy' + ω²y = 0** (amortissement) :
  • α² > ω² : deux racines réelles, y = Ae^{r₁t} + Be^{r₂t}
  • α² = ω² : racine double r = −α, y = (A + Bt)e^{−αt}
  • α² < ω² : y = e^{−αt}(A cos βt + B sin βt), β = √(ω² − α²)
Utilisation typique : oscillateurs, circuits RLC, mécanique.

---

### Carte 20 [C] — Calcul de e^{tA} pour A matrice 2×2

**RECTO :** Comment calculer e^{tA} pour une matrice 2×2 ?

**VERSO :**
**Cas 1 : A diagonalisable**, A = PDP⁻¹ → **e^{tA} = P diag(e^{tλ₁}, e^{tλ₂}) P⁻¹**
**Cas 2 : A non diagonalisable**, A = PTP⁻¹ avec T = (λ, 1; 0, λ) →
  e^{tT} = e^{λt}(I + t(T − λI)) = e^{λt} **⎛1  t⎞**
                                              **⎝0  1⎠**
  puis e^{tA} = P e^{tT} P⁻¹
**Cas 3 : Cayley-Hamilton** : A² = αA + βI → e^{tA} = a(t)A + b(t)I, identifier a, b avec e^{tλ₁}, e^{tλ₂}.
Utilisation typique : résolution de X' = AX en dimension 2, question classique aux concours.

---

### Carte 21 [C] — e^{tA} pour A nilpotente

**RECTO :** Calculer e^{tA} quand A est nilpotente d'ordre p (A^p = 0).

**VERSO :**
**e^{tA} = I + tA + t²A²/2! + … + t^{p−1}A^{p−1}/(p−1)!**
(somme finie car A^k = 0 pour k ≥ p)
Exemple : A = **⎛0 1 0⎞**, A² = **⎛0 0 1⎞**, A³ = 0.
              **⎝0 0 1⎠**       **⎝0 0 0⎠**
              **⎝0 0 0⎠**       **⎝0 0 0⎠**
e^{tA} = I + tA + t²A²/2 = **⎛1  t  t²/2⎞**
                              **⎝0  1    t ⎠**
                              **⎝0  0    1 ⎠**
Utilisation typique : bloc nilpotent dans la réduction, calcul de e^{t(D+N)} = e^{tD}·e^{tN}.

---

### Carte 22 [C] — Second membre de la forme e^{αt}P(t) : détermination rapide de y_p

**RECTO :** Donner directement la forme de y_p pour y'' + by' + cy = e^{αt}P(t) (deg P = d).

**VERSO :**
Chercher **y_p(t) = t^m · Q(t) · e^{αt}** avec deg Q = d et :
→ **m = 0** si α **n'est pas** racine de l'équation caractéristique
→ **m = 1** si α est racine **simple**
→ **m = 2** si α est racine **double**
Pour le trouver : injecter y_p dans l'ED et identifier les coefficients de Q.
Cas sin/cos : écrire cos(βt) = Re(e^{iβt}), résoudre avec α = iβ, prendre la partie réelle.
Utilisation typique : y'' + y = te^{2t} → α = 2, non racine de r²+1=0 → y_p = (at+b)e^{2t}.

---

### Carte 23 [C] — Formule de Duhamel

**RECTO :** Énoncer la formule de Duhamel pour X' = AX + B(t), X(0) = X₀.

**VERSO :**
**X(t) = e^{tA} X₀ + ∫_0^t e^{(t−s)A} B(s) ds**
C'est la formule de **variation de la constante** pour les systèmes.
Cas scalaire (y' = ay + b(t)) : y(t) = e^{at} y₀ + ∫_0^t e^{a(t−s)} b(s) ds.
Interprétation : solution homogène + convolution de la réponse impulsionnelle e^{tA} avec le second membre.
Utilisation typique : expression explicite de la solution d'un système non homogène, résolution d'ED intégrales.

---

### Carte 24 [C] — Abaissement d'ordre

**RECTO :** Comment résoudre une EDL2 quand on connaît déjà une solution y₁ de l'homogène ?

**VERSO :**
→ Poser **y = y₁ · z** (changement de fonction inconnue)
→ Injecter dans l'ED : on obtient une ED en **z'** d'**ordre 1** (l'ordre a baissé)
→ Résoudre cette EDL1 en z', puis intégrer pour obtenir z, puis y = y₁z
Explication : y₁z'' + (2y'₁ + a₁y₁)z' = second membre / a₀ → poser w = z', EDL1 en w.
Alternative : utiliser le **Wronskien** W = y₁y'₂ − y'₁y₂ et la formule d'Abel.
Utilisation typique : ED d'Euler t²y'' + ty' + y = 0 où on devine y₁ = cos(ln t), puis on abaisse.

---

### Carte 25 [C] — ED d'Euler : t²y'' + aty' + by = 0

**RECTO :** Méthode pour résoudre l'ED d'Euler t²y'' + αty' + βy = 0 sur ]0, +∞[ ?

**VERSO :**
→ Changement de variable : **t = e^u** (ou u = ln t), x(u) = y(e^u)
→ On obtient : x''(u) + (α − 1)x'(u) + βx(u) = 0 (**EDL2 à coefficients constants**)
→ Résoudre en x(u), puis revenir à y(t) = x(ln t)
Alternativement : chercher directement y = t^r → **r(r−1) + αr + β = 0** (équation indicielle).
  • Deux racines distinctes r₁, r₂ : y = C₁t^{r₁} + C₂t^{r₂}
  • Racine double r₀ : y = (C₁ + C₂ ln t)t^{r₀}
Utilisation typique : ED d'Euler classique aux concours, exercice de changement de variable.




# Calcul différentiel

---

## CARTES MÉTHODE

---

### Carte 1 [M] — Montrer qu'une fonction est différentiable en a

**RECTO :** Méthode pour montrer que f : ℝⁿ → ℝᵖ est différentiable en a ?

**VERSO :**
→ Étape 1 : **Candidat** : calculer les dérivées partielles ∂f/∂xᵢ(a), former la matrice jacobienne J_f(a)
→ Étape 2 : **Vérifier** : montrer que f(a+h) − f(a) − J_f(a)·h = **o(‖h‖)** quand h → 0
→ En pratique : majorer |f(a+h) − f(a) − L(h)| / ‖h‖ → 0
**Raccourci :** si f est **C^1** (dérivées partielles continues), alors f est différentiable (pas besoin de vérifier le o(‖h‖)).
C'est le raccourci le plus utilisé aux concours.
Utilisation typique : montrer que f(x,y) = x²y + sin(xy) est différentiable (f est C^1, terminé).

---

### Carte 2 [M] — Calculer la différentielle d'une fonction composée

**RECTO :** Comment calculer la différentielle de g ∘ f en pratique (chain rule) ?

**VERSO :**
→ Étape 1 : Identifier f : ℝⁿ → ℝᵐ et g : ℝᵐ → ℝᵖ, les deux différentiables
→ Étape 2 : **d(g ∘ f)(a) = dg(f(a)) ∘ df(a)** (composition des applications linéaires)
→ Étape 3 : En matrices : **J_{g∘f}(a) = J_g(f(a)) · J_f(a)** (produit matriciel)
Cas fréquent : h(t) = f(x(t), y(t)) → **h'(t) = ∂f/∂x · x'(t) + ∂f/∂y · y'(t)**
Utilisation typique : dériver f(u(t), v(t)), passage en polaires, changement de variables dans une EDP.

---

### Carte 3 [M] — Trouver les extrema locaux d'une fonction f : ℝ² → ℝ (sans contrainte)

**RECTO :** Méthode pour trouver les extrema locaux de f(x,y) sans contrainte ?

**VERSO :**
→ Étape 1 : **Points critiques** : résoudre **∇f = 0** (∂f/∂x = 0 et ∂f/∂y = 0)
→ Étape 2 : En chaque point critique a, calculer la **matrice hessienne** H_f(a) :
  H = ⎛r  s⎞ avec r = f''_{xx}, s = f''_{xy}, t = f''_{yy}
      ⎝s  t⎠
→ Étape 3 : Calculer **Δ = rt − s²** (déterminant de H) :
  • **Δ > 0 et r > 0** : minimum local
  • **Δ > 0 et r < 0** : maximum local
  • **Δ < 0** : point selle
  • **Δ = 0** : on ne conclut pas (étude directe nécessaire)
Utilisation typique : « trouver les extrema de f(x,y) = x³ + y³ − 3xy ».

---

### Carte 4 [M] — Optimisation sous contrainte : multiplicateurs de Lagrange

**RECTO :** Méthode des multiplicateurs de Lagrange pour optimiser f sous la contrainte g(x) = 0 ?

**VERSO :**
→ Étape 1 : Vérifier que g est C^1 et **∇g(a) ≠ 0** sur la surface de contrainte (condition de régularité)
→ Étape 2 : Si f admet un extremum en a sur {g = 0}, alors **∃λ ∈ ℝ** :
  **∇f(a) = λ ∇g(a)** (les gradients sont colinéaires)
→ Étape 3 : Résoudre le système : ∂f/∂xᵢ = λ ∂g/∂xᵢ (i = 1,…,n) et g(x) = 0 → (n+1) équations, (n+1) inconnues
→ Étape 4 : Parmi les points critiques, **identifier min/max** (par comparaison des valeurs, ou argument de compacité)
Utilisation typique : « maximiser x+y+z sous la contrainte x²+y²+z² = 1 ».

---

### Carte 5 [M] — Appliquer le théorème des fonctions implicites

**RECTO :** On me donne F(x, y) = 0. Comment montrer que y = φ(x) localement et calculer φ' ?

**VERSO :**
→ Étape 1 : Vérifier F(a, b) = 0 (le point de départ)
→ Étape 2 : Vérifier F de classe **C^1** au voisinage de (a, b)
→ Étape 3 : Vérifier **∂F/∂y(a, b) ≠ 0** (condition clé !)
→ Étape 4 : Conclure : ∃ φ de classe C^1, définie au voisinage de a, avec φ(a) = b et F(x, φ(x)) = 0
→ Étape 5 : Dériver F(x, φ(x)) = 0 : **φ'(x) = −(∂F/∂x) / (∂F/∂y)**
Pour les dérivées d'ordre supérieur : dériver la relation à nouveau.
Utilisation typique : « montrer que l'équation e^y + xy = 1 définit implicitement y(x) au voisinage de (0,0) ».

---

### Carte 6 [M] — Appliquer le théorème d'inversion locale

**RECTO :** Comment montrer qu'une application f : ℝⁿ → ℝⁿ est un difféomorphisme local ?

**VERSO :**
→ Étape 1 : Vérifier f de **classe C^1** au voisinage de a
→ Étape 2 : Calculer la **jacobienne** J_f(a) et vérifier **det J_f(a) ≠ 0**
→ Étape 3 : Conclure : f est un **C^1-difféomorphisme** d'un voisinage de a sur un voisinage de f(a)
→ Étape 4 : La différentielle de l'inverse est **J_{f⁻¹}(f(a)) = [J_f(a)]⁻¹**
Si f est C^k, alors f⁻¹ est C^k (même régularité).
Utilisation typique : passage en polaires (x,y) = (r cos θ, r sin θ) → jacobien = r ≠ 0 si r > 0 → diffeo local.

---

### Carte 7 [M] — Vérifier qu'un changement de variables est un difféomorphisme

**RECTO :** Comment justifier proprement un changement de variables (polaires, cylindriques, sphériques…) ?

**VERSO :**
→ Étape 1 : Définir φ : U → V (préciser les ouverts de départ et d'arrivée)
→ Étape 2 : Montrer φ de classe **C^1** (voire C^∞)
→ Étape 3 : Calculer le **jacobien** det J_φ et vérifier qu'il **ne s'annule pas** sur U
→ Étape 4 : Montrer que φ est **bijective** de U sur V (inversion locale + injectivité globale)
→ Conclure : φ est un C^k-difféomorphisme de U sur V
Pour polaires : U = ]0,+∞[ × ]0,2π[, V = ℝ²\demi-axe, jacobien = r > 0 → difféo.
Utilisation typique : changement de variables dans une intégrale multiple, EDP en coordonnées polaires.

---

### Carte 8 [M] — Utiliser la formule de Taylor à l'ordre 2

**RECTO :** Comment utiliser la formule de Taylor à l'ordre 2 pour f : ℝ² → ℝ ?

**VERSO :**
→ f(a + h) = f(a) + df(a)·h + **½ d²f(a)·(h,h)** + o(‖h‖²)
→ En coordonnées, avec h = (h₁, h₂) :
  f(a+h) = f(a) + f'_x h₁ + f'_y h₂ + ½(**f''_{xx} h₁² + 2f''_{xy} h₁h₂ + f''_{yy} h₂²**) + o(‖h‖²)
→ Le terme quadratique = **½ ᵗh · H_f(a) · h** (forme quadratique associée à la hessienne)
Applications :
  • Nature d'un point critique : signe de la forme quadratique (définie positive/négative ?)
  • DL à l'ordre 2 d'une fonction de plusieurs variables
Utilisation typique : classification des points critiques, développement de f(x₀+h, y₀+k).

---

### Carte 9 [M] — Gradient et direction de plus grande pente

**RECTO :** Comment interpréter le gradient ∇f(a) géométriquement ?

**VERSO :**
→ **∇f(a)** est le vecteur des dérivées partielles : ∇f = (∂f/∂x₁, …, ∂f/∂xₙ)
→ La **dérivée directionnelle** dans la direction u (‖u‖ = 1) est : D_u f(a) = **⟨∇f(a), u⟩**
→ ∇f(a) pointe dans la **direction de plus grande pente** (croissance maximale)
→ ‖∇f(a)‖ = taux de croissance maximal
→ **∇f(a) ⊥ lignes de niveau** {f = f(a)} (orthogonalité fondamentale)
→ ∇f(a) = 0 ⟺ a est **point critique**
Utilisation typique : Lagrange (∇f ∥ ∇g aux extrema contraints), direction de descente, interprétation géométrique.

---

## CARTES THÉORÈME

---

### Carte 10 [T] — Définition de la différentiabilité

**RECTO :** Définir « f : U ⊂ ℝⁿ → ℝᵖ est différentiable en a ».

**VERSO :**
f est **différentiable en a** s'il existe une application **linéaire** L : ℝⁿ → ℝᵖ telle que :
**f(a + h) = f(a) + L(h) + o(‖h‖)** quand h → 0
L est unique, notée **df(a)** (la différentielle de f en a). Sa matrice est la **jacobienne** J_f(a).
→ Différentiable ⟹ continue (mais pas la réciproque)
→ Différentiable ⟹ admet des dérivées partielles (mais la réciproque est **fausse** !)
→ **C^1 ⟹ différentiable** (réciproque fausse)
Utilisation typique : justifier qu'on peut linéariser f au voisinage de a.

---

### Carte 11 [T] — Condition suffisante de différentiabilité (C^1)

**RECTO :** Quelle condition suffisante simple garantit la différentiabilité ?

**VERSO :**
**Hypothèse :** f : U → ℝᵖ possède des **dérivées partielles** ∂f/∂xᵢ qui existent et sont **continues** sur U.
**Conclusion :** f est de **classe C^1** sur U, donc **différentiable** en tout point de U.
La différentielle est donnée par : df(a)·h = Σᵢ ∂f/∂xᵢ(a) hᵢ = J_f(a)·h.
C'est le critère le plus utilisé en pratique : « les dérivées partielles existent et sont continues, donc f est C^1 ».
Utilisation typique : vérification rapide que f(x,y) = x²e^y est différentiable (C^∞ donc a fortiori C^1).

---

### Carte 12 [T] — Théorème de Schwarz

**RECTO :** Énoncer le théorème de Schwarz (symétrie des dérivées partielles croisées).

**VERSO :**
**Hypothèse :** f : U ⊂ ℝⁿ → ℝ de **classe C^2** sur U.
**Conclusion :** pour tous i, j :
**∂²f/∂xᵢ∂xⱼ = ∂²f/∂xⱼ∂xᵢ** (les dérivées croisées commutent)
Plus généralement : si f ∈ C^k, l'**ordre de dérivation** n'importe pas (jusqu'à l'ordre k).
Utilisation typique : simplifier le calcul de la hessienne (seule la moitié des termes à calculer), vérifier une EDP.

---

### Carte 13 [T] — Formule de Taylor à l'ordre 1 (inégalité des accroissements finis)

**RECTO :** Énoncer l'IAF en dimension supérieure (version utile pour les fonctions de ℝⁿ dans ℝ).

**VERSO :**
**Hypothèse :** f : U ⊂ ℝⁿ → ℝ de classe C^1, U **convexe** ouvert.
→ Si ‖∇f(x)‖ ≤ M pour tout x ∈ U :
**|f(b) − f(a)| ≤ M ‖b − a‖** pour tous a, b ∈ U
Version vectorielle (f : ℝⁿ → ℝᵖ) : **‖f(b) − f(a)‖ ≤ M ‖b − a‖** avec M = sup |||df(x)|||.
**Attention :** pas de TAF avec égalité en dimension > 1 (pas de c entre a et b).
Utilisation typique : montrer qu'une application est lipschitzienne, contractante → point fixe.

---

### Carte 14 [T] — Condition nécessaire d'extremum local

**RECTO :** Énoncer la condition nécessaire d'extremum local pour f : ℝⁿ → ℝ.

**VERSO :**
**Hypothèse :** f différentiable en a, f admet un **extremum local** en a.
**Conclusion :** **df(a) = 0**, i.e. **∇f(a) = 0** (toutes les dérivées partielles s'annulent).
a est alors appelé **point critique** (ou point stationnaire).
**Réciproque FAUSSE** : f(x,y) = x² − y² a un point critique en (0,0) mais c'est un point selle.
Utilisation typique : première étape de toute recherche d'extrema.

---

### Carte 15 [T] — Condition suffisante d'extremum local (Hessienne)

**RECTO :** Énoncer la condition suffisante d'extremum local en dimension 2 via la hessienne.

**VERSO :**
**Hypothèse :** f : ℝ² → ℝ de classe C^2, **∇f(a) = 0** (point critique), H = H_f(a).
Notons r = f''_{xx}(a), s = f''_{xy}(a), t = f''_{yy}(a), et **Δ = rt − s²** = det(H).
→ **Δ > 0 et r > 0** : f admet un **minimum local** en a
→ **Δ > 0 et r < 0** : f admet un **maximum local** en a
→ **Δ < 0** : a est un **point selle** (pas d'extremum)
→ **Δ = 0** : **on ne peut pas conclure**
En dimension n : H définie positive → min, définie négative → max.
Utilisation typique : classifier chaque point critique trouvé à l'étape 1.

---

### Carte 16 [T] — Théorème des fonctions implicites

**RECTO :** Énoncer le théorème des fonctions implicites.

**VERSO :**
**Hypothèse :** F : ℝⁿ × ℝᵖ → ℝᵖ de classe **C^k** (k ≥ 1), F(a, b) = 0.
→ La **différentielle partielle** d_y F(a,b) : ℝᵖ → ℝᵖ est **inversible** (det ∂F/∂y ≠ 0)
**Conclusion :** ∃ voisinages U de a, V de b, et **φ : U → V de classe C^k** telle que :
  F(x, y) = 0, (x,y) ∈ U×V ⟺ **y = φ(x)**
De plus : **dφ(x) = −[d_y F(x,φ(x))]⁻¹ ∘ d_x F(x,φ(x))**
Utilisation typique : montrer qu'une équation F(x,y) = 0 définit y = φ(x), et calculer φ'.

---

### Carte 17 [T] — Théorème d'inversion locale

**RECTO :** Énoncer le théorème d'inversion locale.

**VERSO :**
**Hypothèse :** f : U ⊂ ℝⁿ → ℝⁿ de classe **C^k** (k ≥ 1), a ∈ U.
→ **df(a) inversible** (det J_f(a) ≠ 0)
**Conclusion :** f est un **C^k-difféomorphisme** d'un voisinage V de a sur un voisinage W de f(a).
→ f⁻¹ : W → V est de classe C^k
→ **d(f⁻¹)(f(a)) = [df(a)]⁻¹** (la différentielle de l'inverse est l'inverse de la différentielle)
**C'est un résultat local** : f peut ne pas être globalement injective.
Utilisation typique : montrer qu'un changement de variables est localement inversible.

---

### Carte 18 [T] — Multiplicateurs de Lagrange (théorème)

**RECTO :** Énoncer le théorème des multiplicateurs de Lagrange pour une contrainte.

**VERSO :**
**Hypothèses :** f, g : ℝⁿ → ℝ de classe C^1.
→ f admet un **extremum local** en a sur la surface S = {x : g(x) = 0}
→ **∇g(a) ≠ 0** (a est un point **régulier** de la contrainte)
**Conclusion :** ∃ λ ∈ ℝ (multiplicateur de Lagrange) tel que :
**∇f(a) = λ ∇g(a)**
Avec k contraintes g₁ = … = g_k = 0 : **∇f(a) = Σ λᵢ ∇gᵢ(a)** (si les ∇gᵢ(a) sont linéairement indépendants).
Utilisation typique : optimisation sur une sphère, un plan, une courbe de niveau.

---

### Carte 19 [T] — Difféomorphisme : définition

**RECTO :** Définir un C^k-difféomorphisme.

**VERSO :**
f : U → V (U, V ouverts de ℝⁿ) est un **C^k-difféomorphisme** si :
→ f est **bijective** de U sur V
→ f est de **classe C^k**
→ **f⁻¹** est de **classe C^k**
Conséquence : df(a) est **inversible** en tout point a ∈ U (nécessairement).
Réciproque partielle (inversion globale) : f C^1, bijective, df(a) inversible partout ⟹ f⁻¹ est C^1 (pas besoin de vérifier la régularité de f⁻¹ séparément).
Utilisation typique : changement de variables dans une intégrale (jacobien ≠ 0 + bijectivité).

---

## CARTES CALCUL

---

### Carte 20 [C] — Jacobienne des changements de variables classiques

**RECTO :** Donner la jacobienne et le jacobien des coordonnées polaires, cylindriques et sphériques.

**VERSO :**
**Polaires** (x = r cos θ, y = r sin θ) :
  J = ⎛cos θ  −r sin θ⎞, det J = **r**
      ⎝sin θ   r cos θ⎠

**Cylindriques** (x = r cos θ, y = r sin θ, z = z) : det J = **r**

**Sphériques** (x = r sin φ cos θ, y = r sin φ sin θ, z = r cos φ) : det J = **r² sin φ**
Utilisation typique : intégrales multiples, changement de variables dans les EDP (laplacien en polaires).

---

### Carte 21 [C] — Gradient, divergence, laplacien en coordonnées cartésiennes

**RECTO :** Donner les formules de ∇f, div(F), Δf en coordonnées cartésiennes.

**VERSO :**
Pour f : ℝⁿ → ℝ, F = (F₁, …, Fₙ) : ℝⁿ → ℝⁿ :
→ **Gradient** : ∇f = (∂f/∂x₁, …, ∂f/∂xₙ)
→ **Divergence** : div(F) = ∂F₁/∂x₁ + … + ∂Fₙ/∂xₙ
→ **Laplacien** : Δf = ∂²f/∂x₁² + … + ∂²f/∂xₙ² = div(∇f)
En dimension 2 : Δf = f''_{xx} + f''_{yy}
En polaires : **Δf = ∂²f/∂r² + (1/r)∂f/∂r + (1/r²)∂²f/∂θ²**
Utilisation typique : EDP (Laplace, chaleur, ondes), formules de Green, fonctions harmoniques.

---

### Carte 22 [C] — Différentielles d'applications classiques

**RECTO :** Donner la différentielle de det, de A ↦ A⁻¹, de A ↦ A², et de (A,B) ↦ AB.

**VERSO :**
→ **d(det)(A)·H = det(A) · tr(A⁻¹H)** (si A inversible). En I_n : d(det)(I)·H = **tr(H)**
→ **d(inv)(A)·H = −A⁻¹ H A⁻¹** (différentielle de A ↦ A⁻¹)
→ **d(carré)(A)·H = AH + HA** (différentielle de A ↦ A²)
→ **d(produit)(A,B)·(H,K) = HB + AK** (différentielle de (A,B) ↦ AB, application bilinéaire)
→ **d(tr)(A)·H = tr(H)** (la trace est linéaire, donc égale à sa différentielle)
Utilisation typique : montrer que GL_n est ouvert (det est C^1), calculer la différentielle d'une application matricielle.

---

### Carte 23 [C] — Hessienne de fonctions classiques en dimension 2

**RECTO :** Calculer la hessienne de f(x,y) = ax² + bxy + cy² + dx + ey + f et de g(x,y) = x³ − 3xy.

**VERSO :**
→ **f(x,y) = ax² + bxy + cy² + …** (forme quadratique + affine) :
  H_f = **⎛2a  b⎞** (constante, ne dépend pas du point)
        **⎝b  2c⎠**
  Δ = 4ac − b², nature dépend du signe de Δ et de a.

→ **g(x,y) = x³ − 3xy** : ∇g = (3x² − 3y, −3x). Points critiques : (0,0) et (1,1) (à vérifier).
  H_g(x,y) = **⎛6x  −3⎞**
              **⎝−3   0⎠**
  En (0,0) : Δ = 0 − 9 = −9 < 0 → **point selle**. En (1,1) : Δ = 0−9 < 0 → **point selle**.
Utilisation typique : exercice type de classification des points critiques.

---

### Carte 24 [C] — Formule de Taylor ordre 1 : approximation affine

**RECTO :** Écrire l'approximation affine (Taylor ordre 1) de f(x,y) au voisinage de (a,b).

**VERSO :**
**f(a+h, b+k) ≈ f(a,b) + h·∂f/∂x(a,b) + k·∂f/∂y(a,b)**
Forme vectorielle : f(a+h) ≈ f(a) + ⟨∇f(a), h⟩
Forme exacte (avec reste) : f(a+h) = f(a) + df(a)·h + o(‖h‖)
**Plan tangent** au graphe de f en (a,b) : z = f(a,b) + ∂f/∂x(a,b)(x−a) + ∂f/∂y(a,b)(y−b)
Utilisation typique : linéarisation, approximation numérique, équation du plan tangent.

---

### Carte 25 [C] — Dérivée directionnelle et lien avec la différentielle

**RECTO :** Définir la dérivée directionnelle D_v f(a) et son lien avec df(a).

**VERSO :**
**D_v f(a) = lim_{t→0} [f(a + tv) − f(a)] / t** = d/dt f(a+tv)|_{t=0}
Si f est **différentiable** en a : **D_v f(a) = df(a)·v = ⟨∇f(a), v⟩** (pour f à valeurs réelles)
Attention : l'existence de toutes les dérivées directionnelles **n'implique pas** la différentiabilité !
(Contre-exemple classique : f(x,y) = x²y/(x⁴+y²) si (x,y) ≠ 0, 0 sinon → toutes les D_v f(0) existent mais f non continue en 0.)
Utilisation typique : calculer une dérivée dans une direction donnée, interpréter le gradient.









`




