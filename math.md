

const RAW_MATH = String.raw`
# CHAPITRE 1 - Suites, fonctions de la variable réelle

## FLASHCARD 1 - Bolzano-Weierstrass
### RECTO
Que peut-on affirmer concernant toute suite bornée de réels, ou d'un espace vectoriel normé de dimension finie (Théorème de Bolzano-Weierstrass) ?
### VERSO
On peut toujours en extraire une sous-suite convergente.

## FLASHCARD 2 - Procédé diagonal
### RECTO
Soit, pour $k \in \mathbb{N}^*$, une suite $u^k = (u_n^k)_{n \ge 0}$ d'éléments d'un espace métrique compact. Que garantit le procédé diagonal concernant ces suites ?
### VERSO
Il existe une extractrice $\psi : \mathbb{N} \to \mathbb{N}$ telle que, pour tout $k \in \mathbb{N}^*$, la suite extraite $(u_{\psi(n)}^k)_{n \ge 0}$ soit convergente (on pose typiquement $\psi(n) = \varphi_1 \circ \dots \circ \varphi_n(n)$).

## FLASHCARD 3 - Limite monotone
### RECTO
Que dit le théorème de la limite monotone pour une suite réelle $(u_n)$ croissante, puis pour une suite décroissante ?
### VERSO
Si $(u_n)$ est croissante, elle possède une limite $\ell \in \mathbb{R} \cup \{+\infty\}$. Si elle est décroissante, elle possède une limite $\ell \in \mathbb{R} \cup \{-\infty\}$.

## FLASHCARD 4 - Fonction croissante
### RECTO
Soit $f : ]a, b[ \to \mathbb{R}$ une fonction croissante. Que peut-on dire sur ses limites en $a$ et $b$ ?
### VERSO
$f$ possède une limite $\ell \in \mathbb{R} \cup \{+\infty\}$ en $b$, et une limite $\ell' \in \mathbb{R} \cup \{-\infty\}$ en $a$, avec l'inégalité $\ell' \le \ell$.

## FLASHCARD 5 - Théorème des gendarmes
### RECTO
Énoncer le théorème de la limite par encadrement (ou théorème des gendarmes) pour trois suites réelles.
### VERSO
Si à partir d'un certain rang on a $v_n \le u_n \le w_n$, et que $(v_n)$ et $(w_n)$ convergent vers la même limite $\ell \in \mathbb{R}$, alors $(u_n)$ converge et sa limite est $\ell$.

## FLASHCARD 6 - Comparaison limites
### RECTO
Soient $(u_n)$ et $(v_n)$ des suites réelles telles que $u_n \le v_n$ à partir d'un certain rang. Que peut-on déduire si $u_n \to +\infty$ ? Et si $v_n \to -\infty$ ?
### VERSO
Si $u_n \to +\infty$, alors $v_n \to +\infty$. Si $v_n \to -\infty$, alors $u_n \to -\infty$. (Le même résultat s'applique aux fonctions).

## FLASHCARD 7 - TVI
### RECTO
Énoncer le théorème des valeurs intermédiaires pour une fonction $f : [a, b] \to \mathbb{R}$ continue.
### VERSO
Pour tout $\gamma$ compris entre $f(a)$ et $f(b)$, il existe $c \in [a, b]$ tel que $f(c) = \gamma$.

## FLASHCARD 8 - Image intervalle
### RECTO
Quelle est la nature topologique de l'image d'un intervalle par une fonction continue à valeurs réelles ?
### VERSO
C'est toujours un intervalle.

## FLASHCARD 9 - Monotonie et injectivité
### RECTO
Que peut-on déduire quant à la monotonie d'une fonction $f$ continue et injective sur un intervalle, à valeurs réelles ?
### VERSO
Elle est strictement monotone.

## FLASHCARD 10 - Bornes atteintes
### RECTO
Quelles sont les propriétés de l'image d'un segment par une fonction continue à valeurs réelles (Théorème des bornes atteintes) ?
### VERSO
La fonction est bornée, elle atteint ses bornes, et l'image du segment est un segment.

## FLASHCARD 11 - Extremum local
### RECTO
Soit $f : I \to \mathbb{R}$ admettant un extremum local en un point $a$ *intérieur* à l'intervalle $I$. Si $f$ est dérivable en $a$, que vaut $f'(a)$ ?
### VERSO
$f'(a) = 0$.

## FLASHCARD 12 - Rolle
### RECTO
Énoncer le théorème de Rolle pour une fonction $f : [a, b] \to \mathbb{R}$.
### VERSO
Si $f$ est continue sur $[a, b]$, dérivable sur $]a, b[$ et que $f(a) = f(b)$, alors il existe $c \in ]a, b[$ tel que $f'(c) = 0$.

## FLASHCARD 13 - TAF Égalité
### RECTO
Énoncer le théorème des accroissements finis (version égalité) pour $f : [a, b] \to \mathbb{R}$.
### VERSO
Si $f$ est continue sur $[a, b]$ et dérivable sur $]a, b[$, il existe $c \in ]a, b[$ tel que $\frac{f(b) - f(a)}{b - a} = f'(c)$.

## FLASHCARD 14 - TAF Inégalité
### RECTO
Énoncer l'inégalité des accroissements finis pour une fonction $f : I \to \mathbb{K}$ (ou espace vectoriel normé de dimension finie) dérivable.
### VERSO
Si on suppose que $|f'(t)| \le M$ sur $I$, alors $f$ est $M$-lipschitzienne : $\forall (x, y) \in I^2, |f(x) - f(y)| \le M|x - y|$.

## FLASHCARD 15 - Limite de la dérivée
### RECTO
Soit $f$ continue sur un intervalle $I$ et dérivable sur $I \setminus \{a\}$. Si la dérivée $f'$ possède une limite $\ell$ en $a$, que peut-on dire de la dérivabilité de $f$ en $a$ ?
### VERSO
$f$ est dérivable en $a$ et sa dérivée en $a$ vaut $\ell$ : $f'(a) = \ell$. (Si de plus $f$ est $C^1$ sur $I \setminus \{a\}$, alors $f$ est $C^1$ sur $I$).

## FLASHCARD 16 - Taylor Reste Intégral
### RECTO
Donner la formule de Taylor avec reste intégral pour une fonction $f : I \to \mathbb{K}$ (ou evn de dim finie) de classe $C^{n+1}$.
### VERSO
$f(b) = \sum_{k=0}^n \frac{f^{(k)}(a)}{k!} (b-a)^k + \int_a^b \frac{(b-t)^n}{n!} f^{(n+1)}(t) dt$.

## FLASHCARD 17 - Taylor-Lagrange
### RECTO
Donner l'inégalité de Taylor-Lagrange pour une fonction $f$ de classe $C^{n+1}$ sur $I$.
### VERSO
$\left| f(b) - \sum_{k=0}^n \frac{f^{(k)}(a)}{k!} (b-a)^k \right| \le \|f^{(n+1)}\|_{\infty, [a, b]} \frac{|b-a|^{n+1}}{(n+1)!}$. (Il suffit que $f$ soit $n+1$ fois dérivable et sa dérivée bornée sur $[a, b]$).

## FLASHCARD 18 - Taylor-Young
### RECTO
Donner la formule du développement de Taylor-Young pour une fonction $f$ de classe $C^n$ au voisinage de $a$.
### VERSO
$f(a+h) = \sum_{k=0}^n \frac{f^{(k)}(a)}{k!} h^k + o(h^n)$ lorsque $h \to 0$.

# CHAPITRE 2 - Suites et séries, familles sommables

## FLASHCARD 19 - Stirling
### RECTO
Donner la formule de Stirling (équivalent de $n!$ et égalité avec le reste).
### VERSO
$n! \sim \left(\frac{n}{e}\right)^n \sqrt{2\pi n}$, c'est-à-dire $n! = \left(\frac{n}{e}\right)^n \sqrt{2\pi n} (1 + o(1))$.

## FLASHCARD 20 - Série harmonique
### RECTO
Quel est le développement asymptotique de la série harmonique $H_n = \sum_{k=1}^n \frac{1}{k}$ ?
### VERSO
$H_n = \ln n + \gamma + o(1)$, où la constante d'Euler $\gamma$ appartient à $]0, 1[$.

## FLASHCARD 21 - Critère séries alternées
### RECTO
Énoncer le critère des séries alternées pour une série de terme général $(-1)^n u_n$.
### VERSO
Si $(-1)^n u_n$ est de signe constant, et si la suite $(|u_n|)$ est décroissante et de limite nulle, alors la série converge. La somme est du signe du premier terme.

## FLASHCARD 22 - Reste séries alternées
### RECTO
Dans le cadre du critère des séries alternées, que sait-on sur le signe et la majoration du reste $R_n = \sum_{k=n+1}^{+\infty} u_k$ ?
### VERSO
Le reste $R_n$ est du signe du premier terme négligé $u_{n+1}$, et $|R_n| \le |u_{n+1}|$.

## FLASHCARD 23 - Séries de Riemann
### RECTO
À quelle condition la série de Riemann de terme général $\frac{1}{n^\alpha}$ converge-t-elle ?
### VERSO
Elle converge si $\alpha > 1$ et diverge si $\alpha \le 1$.

## FLASHCARD 24 - Comparaison O
### RECTO
Si une série $\sum v_n$ à termes réels positifs converge, et que $|u_n| = O(v_n)$ (ou $o(v_n)$, ou $\sim v_n$), que dire de la série $\sum u_n$ ?
### VERSO
La série $\sum u_n$ est absolument convergente.

## FLASHCARD 25 - Comparaison Riemann Div
### RECTO
Si une série à termes positifs $\sum u_n$ vérifie $1/n^\alpha = O(u_n)$ (ou $o(u_n)$, ou $\sim u_n$) avec $\alpha \le 1$, que dire de la série $\sum u_n$ ?
### VERSO
La série $\sum u_n$ est divergente.

## FLASHCARD 26 - Séries de Bertrand
### RECTO
Énoncer le critère de convergence pour les séries de Bertrand de terme général $\frac{1}{n^\alpha (\ln n)^\beta}$.
### VERSO
La série converge si et seulement si $\alpha > 1$, ou bien si ($\alpha = 1$ et $\beta > 1$).

## FLASHCARD 27 - Sommation équivalents div
### RECTO
Soient deux séries à termes positifs divergentes, avec $u_n \sim v_n$. Que dire de leurs sommes partielles $\sum_{k=0}^n u_k$ et $\sum_{k=0}^n v_k$ ?
### VERSO
$\sum_{k=0}^n u_k \sim \sum_{k=0}^n v_k$. (Même chose avec les relations $O$ et $o$).

## FLASHCARD 28 - Cesàro
### RECTO
Énoncer le lemme de Cesàro pour une suite $(u_n)$ convergeant vers $\ell$.
### VERSO
La suite des moyennes converge aussi vers $\ell$ : $\frac{1}{n+1} \sum_{k=0}^n u_k \to \ell$.

## FLASHCARD 29 - Sommation équivalents conv
### RECTO
Soient deux séries convergentes à termes positifs telles que $u_n \sim v_n$. Que dire de leurs restes $\sum_{k=n+1}^{+\infty} u_k$ et $\sum_{k=n+1}^{+\infty} v_k$ ?
### VERSO
Leurs restes sont équivalents : $\sum_{k=n+1}^{+\infty} u_k \sim \sum_{k=n+1}^{+\infty} v_k$. (Même chose avec les relations $O$ et $o$).

## FLASHCARD 30 - Croissance sur-géométrique
### RECTO
Soit une suite strictement positive. Que déduire si la limite de $\frac{u_{n+1}}{u_n}$ vaut $+\infty$ ?
### VERSO
(Croissance sur-géométrique). La série $\sum u_n$ diverge et la somme partielle $\sum_{k=0}^n u_k \sim u_n$.

## FLASHCARD 31 - Croissance sous-géométrique
### RECTO
Soit une suite strictement positive. Que déduire si la limite de $\frac{u_{n+1}}{u_n}$ vaut $0$ ?
### VERSO
(Croissance sous-géométrique). La série $\sum u_n$ converge et le reste $\sum_{k=n+1}^{+\infty} u_k \sim u_{n+1}$.

## FLASHCARD 32 - Comparaison série intégrale
### RECTO
Quel est le lien d'intégrabilité pour une fonction $f : \mathbb{R}^+ \to \mathbb{R}^+$ continue par morceaux et décroissante, et la série des $f(n)$ ?
### VERSO
La série de terme général $f(n)$ converge si et seulement si $f$ est intégrable sur $\mathbb{R}^+$.

## FLASHCARD 33 - Encadrement somme partielle
### RECTO
Pour une fonction $f : \mathbb{R}^+ \to \mathbb{R}$ continue par morceaux et décroissante, donner l'encadrement classique de la somme partielle $\sum_{k=0}^n f(k)$ par des intégrales.
### VERSO
$\int_0^n f(t) dt \le \sum_{k=0}^n f(k) \le f(0) + \int_0^n f(t) dt$.

## FLASHCARD 34 - Encadrement reste
### RECTO
Pour une fonction $f : \mathbb{R}^+ \to \mathbb{R}$ continue par morceaux, décroissante et intégrable, donner l'encadrement classique du reste $\sum_{k=n+1}^{+\infty} f(k)$.
### VERSO
$\int_{n+1}^{+\infty} f(t) dt \le \sum_{k=n+1}^{+\infty} f(k) \le \int_{n+1}^{+\infty} f(t) dt + f(n+1)$.

## FLASHCARD 35 - Encadrement f croissante
### RECTO
Pour une fonction $f : \mathbb{R}^+ \to \mathbb{R}$ continue par morceaux et *croissante*, donner l'encadrement de la somme partielle.
### VERSO
$\int_0^n f(t) dt \le \sum_{k=0}^n f(k) \le \int_0^n f(t) dt + f(n)$.

## FLASHCARD 36 - Familles sommables
### RECTO
Comment calcule-t-on la somme d'une famille sommable de réels positifs $(u_i)$ si on partitionne l'ensemble d'indices $I$ en sous-ensembles $I_n$ ?
### VERSO
On peut sommer par paquets : $\sum_{i \in I} u_i = \sum_{n=1}^{+\infty} \left( \sum_{i \in I_n} u_i \right)$. La sommabilité de la famille équivaut à la convergence de la série globale.

## FLASHCARD 37 - Fubini Séries
### RECTO
Que donne le théorème de Fubini pour les séries doubles sommables $(a_{n,m})$ ?
### VERSO
On peut inverser l'ordre des sommes : $\sum_{(n,m) \in \mathbb{N}^2} a_{n,m} = \sum_{n=0}^{+\infty} \left( \sum_{m=0}^{+\infty} a_{n,m} \right) = \sum_{m=0}^{+\infty} \left( \sum_{n=0}^{+\infty} a_{n,m} \right)$.

## FLASHCARD 38 - TCD Séries
### RECTO
Quelles sont les trois hypothèses du théorème de convergence dominée sur les séries (pour intervertir la limite $p \to \infty$ et la somme sur $n$) ?
### VERSO
1) La série dominatrice $\sum v_n$ converge. 2) Convergence simple : $\forall n, u_n^p \xrightarrow{p \to \infty} \ell_n$. 3) Domination : $\forall n, \forall p, |u_n^p| \le v_n$.

# CHAPITRE 3 - Intégration

## FLASHCARD 39 - Somme de Riemann
### RECTO
Vers quoi converge la somme de Riemann $\frac{b-a}{n} \sum_{k=0}^{n-1} f\left(a + k\frac{b-a}{n}\right)$ pour $f$ continue par morceaux sur $[a, b]$ ?
### VERSO
Elle converge vers l'intégrale $\int_a^b f(t) dt$ lorsque $n \to +\infty$.

## FLASHCARD 40 - Comparaison intégrales
### RECTO
Soient $f$ et $g$ à valeurs positives, continues par morceaux sur $[a, b[$. Si $g$ est intégrable et que $f = o(g)$ ou $O(g)$ ou $f \sim g$ en $b$, que dire de $f$ ?
### VERSO
$f$ est également intégrable sur $[a, b[$.

## FLASHCARD 41 - Riemann en 0
### RECTO
À quelle condition sur $\alpha$ l'intégrale $\int_0^1 \frac{dt}{t^\alpha}$ converge-t-elle ?
### VERSO
Elle converge si et seulement si $\alpha < 1$. (Même règle pour $\int_a^b \frac{dt}{|t-a|^\alpha}$).

## FLASHCARD 42 - Riemann en l'infini
### RECTO
À quelle condition sur $\alpha$ l'intégrale $\int_1^{+\infty} \frac{dt}{t^\alpha}$ converge-t-elle ?
### VERSO
Elle converge si et seulement si $\alpha > 1$.

## FLASHCARD 43 - Bertrand infini
### RECTO
Donner les conditions de convergence de l'intégrale de Bertrand $\int_2^{+\infty} \frac{dt}{x^\alpha (\ln x)^\beta}$.
### VERSO
Elle converge si et seulement si $\alpha > 1$, ou bien si ($\alpha = 1$ et $\beta > 1$).

## FLASHCARD 44 - Bertrand en 0
### RECTO
Donner les conditions de convergence de l'intégrale de Bertrand en $0$ : $\int_0^{1/2} \frac{dt}{x^\alpha |\ln x|^\beta}$.
### VERSO
Elle converge si et seulement si $\alpha < 1$, ou bien si ($\alpha = 1$ et $\beta > 1$).

## FLASHCARD 45 - Intégration équivalents div
### RECTO
Si $f \sim g$ en $b$ (avec des fonctions positives), que peut-on dire sur le comportement asymptotique de leurs intégrales $\int_a^x$ si $g$ est non intégrable sur $[a, b[$ ?
### VERSO
On intègre les équivalents (divergents) : $\int_a^x f \sim \int_a^x g$ quand $x \to b$. (Idem pour $o$ et $O$).

## FLASHCARD 46 - Intégration équivalents conv
### RECTO
Si $f \sim g$ en $b$ (avec des fonctions positives), que peut-on dire sur le comportement asymptotique de leurs intégrales (restes) si $g$ est intégrable sur $[a, b[$ ?
### VERSO
On intègre les équivalents (convergents) : $\int_x^b f \sim \int_x^b g$ quand $x \to b$. (Idem pour $o$ et $O$).

## FLASHCARD 47 - Absolue convergence
### RECTO
Si une fonction est intégrable (absolument convergente), que dire de son intégrale simple ?
### VERSO
Son intégrale est convergente.

## FLASHCARD 48 - IPP généralisée
### RECTO
Quelles conditions permettent de justifier une intégration par parties généralisée $\int_a^b f'g = [fg]_a^b - \int_a^b fg'$ sur un intervalle $]a, b[$ ?
### VERSO
Il faut que $f$ et $g$ soient $C^1$, et que la fonction $fg$ possède une limite finie en $a$ et en $b$. Alors $\int f'g$ et $\int fg'$ sont de même nature.

## FLASHCARD 49 - Changement de variable
### RECTO
Énoncer le théorème de changement de variable pour les intégrales (impropres).
### VERSO
Si $\varphi : ]\alpha, \beta[ \to ]a, b[$ est une bijection de classe $C^1$ strictement monotone et $f$ continue par morceaux, alors $\int_a^b f$ et $\int_\alpha^\beta (f \circ \varphi) |\varphi'|$ sont de même nature. Si CV, on a l'égalité $\int_{\varphi(\alpha)}^{\varphi(\beta)} f = \int_\alpha^\beta (f \circ \varphi) \varphi'$.

## FLASHCARD 50 - Cauchy-Schwarz L2
### RECTO
Énoncer l'inégalité de Cauchy-Schwarz pour les fonctions de carré intégrable ($L^2$) sur un intervalle $I$.
### VERSO
$(\int_I fg)^2 \le (\int_I f^2) (\int_I g^2)$. De plus, le produit $fg$ est intégrable ($L^1$).

## FLASHCARD 51 - Limite intégrable décroissante
### RECTO
Si $f : [a, +\infty[ \to \mathbb{R}^+$ est décroissante et intégrable, quelle est sa limite à l'infini (et même celle de $x f(x)$) ?
### VERSO
On a $x f(x) \xrightarrow{x \to +\infty} 0$.

## FLASHCARD 52 - Limite à l'infini
### RECTO
Si $f$ est intégrable sur $[a, +\infty[$ et possède une limite $\ell$ en $+\infty$, que vaut nécessairement cette limite ?
### VERSO
$\ell = 0$. (Attention : une fonction continue et intégrable peut ne pas avoir de limite).

## FLASHCARD 53 - Uniforme continuité intégrable
### RECTO
Si $f$ est uniformément continue sur $[a, +\infty[$ et intégrable en $+\infty$, quelle est la limite de $f$ en $+\infty$ ?
### VERSO
La limite est $0$.

## FLASHCARD 54 - Riemann-Lebesgue
### RECTO
Que stipule le lemme de Riemann-Lebesgue pour une fonction continue par morceaux sur $[a, b]$ ?
### VERSO
$\int_a^b f(t) \cos(nt) dt \xrightarrow{n \to +\infty} 0$. (Valable aussi en remplaçant le cosinus par toute fonction périodique de moyenne nulle).

# CHAPITRE 4 - Suites de fonctions, approximation

## FLASHCARD 55 - CVU et continuité
### RECTO
Si une suite de fonctions continues $(f_n)$ converge uniformément vers $f$ sur un espace métrique $A$, que dire de la continuité de $f$ ?
### VERSO
$f$ est continue sur $A$. (Le résultat reste vrai si la convergence est uniforme au voisinage de tout point de $A$).

## FLASHCARD 56 - Double limite
### RECTO
Que dit le théorème de la double limite pour une suite $(f_n)$ convergeant uniformément vers $f$ sur $A$, avec $f_n(x) \to \ell_n$ en un point adhérent $a$ ?
### VERSO
La suite $(\ell_n)$ admet une limite $\ell$, et on peut intervertir les limites : $f(x) \to \ell$ quand $x \to a$.

## FLASHCARD 57 - Intégration sur segment
### RECTO
Sous quelle condition peut-on permuter limite et intégrale sur un segment $[a, b]$ ($\int_a^b f_n \to \int_a^b f$) pour une suite de fonctions continues ?
### VERSO
Il suffit que la suite $(f_n)$ converge uniformément sur le segment $[a, b]$. (Attention, ce théorème d'intégration uniforme est dangereux car limité aux segments purs).

## FLASHCARD 58 - Dérivation suite
### RECTO
Quelles sont les hypothèses pour assurer que la limite simple $f$ d'une suite de fonctions $(f_n)$ de classe $C^1$ est de classe $C^1$ ?
### VERSO
Il faut que $(f_n)$ converge simplement vers $f$, et que la suite des dérivées $(f_n')$ converge uniformément (ou localement uniformément) vers une fonction $g$. On a alors $f' = g$ et $(f_n)$ converge localement uniformément vers $f$.

## FLASHCARD 59 - Dérivation suite Ck
### RECTO
Comment se généralise le théorème de régularité pour une suite de fonctions $C^k$ ?
### VERSO
$(f_n)$ converge simplement. Les dérivées $f_n^{(j)}$ (pour $j < k$) convergent simplement. La dérivée k-ième $f_n^{(k)}$ converge uniformément (ou sur tout segment) vers $g_k$. Alors $f$ est $C^k$ et $f^{(k)} = g_k$.

## FLASHCARD 60 - Approximation escalier
### RECTO
Quel théorème permet d'approcher toute fonction continue par morceaux sur un segment par une classe de fonctions simples ?
### VERSO
Le théorème d'approximation par des fonctions en escaliers : toute fonction continue par morceaux sur $[a, b]$ est limite uniforme de fonctions en escaliers.

## FLASHCARD 61 - Weierstrass
### RECTO
Que stipule le théorème d'approximation de Weierstrass pour une fonction continue sur un segment $[a, b]$ ?
### VERSO
L'espace des fonctions polynomiales est dense dans $C^0([a, b], \mathbb{K})$ pour la norme de la convergence uniforme $\|\cdot\|_\infty$.

## FLASHCARD 62 - Moments
### RECTO
Si une fonction $f$ continue sur $[a, b]$ vérifie $\forall n \in \mathbb{N}, \int_a^b f(t)t^n dt = 0$ (le problème des moments), que dire de $f$ ?
### VERSO
$f$ est nulle. (La preuve utilise le théorème de Weierstrass).

## FLASHCARD 63 - Bernstein
### RECTO
Comment sont définis les polynômes de Bernstein $B_n(f)(x)$ pour $f \in C^0([0, 1])$ ? Et que vérifie la suite $(B_n(f))$ ?
### VERSO
$B_n(f)(x) = \sum_{k=0}^n \binom{n}{k} (1-x)^{n-k} x^k f(k/n)$. La suite $(B_n(f))$ converge uniformément vers $f$ sur $[0, 1]$.

## FLASHCARD 64 - Weierstrass trigo
### RECTO
Que dit le théorème de Weierstrass trigonométrique ?
### VERSO
L'espace des polynômes trigonométriques est dense dans l'espace des fonctions continues et $2\pi$-périodiques sur $\mathbb{R}$, pour la norme $\|\cdot\|_\infty$.

# CHAPITRE 5 - Séries de fonctions

## FLASHCARD 65 - Continuité somme
### RECTO
Si une série de fonctions $\sum f_n$ (avec $f_n$ continues) converge uniformément sur $A$, que dire de la fonction somme $f = \sum f_n$ ?
### VERSO
La fonction somme $f$ est continue sur $A$. (Rappel : la convergence normale entraîne la convergence uniforme).

## FLASHCARD 66 - Double limite série
### RECTO
Que donne le théorème de la double limite pour une série de fonctions convergeant uniformément sur $A$, si $\lim_{x \to a} f_n(x) = \ell_n$ ?
### VERSO
La série $\sum \ell_n$ est convergente et on peut intervertir somme et limite : $\sum_{n=0}^{+\infty} f_n(x) \to \sum_{n=0}^{+\infty} \ell_n$ quand $x \to a$.

## FLASHCARD 67 - Intégration sur segment
### RECTO
Sous quelle condition peut-on permuter série et intégrale sur un segment $[a, b]$ : $\int_a^b \sum f_n = \sum \int_a^b f_n$ (pour des fonctions continues) ?
### VERSO
Il suffit que la série de fonctions $\sum f_n$ converge uniformément sur le segment $[a, b]$. (Attention, théorème dangereux, valable que sur segment).

## FLASHCARD 68 - Dérivation série C1
### RECTO
Sous quelles conditions la somme d'une série de fonctions $\sum f_n$ de classe $C^1$ est-elle de classe $C^1$ sur un intervalle $I$ ?
### VERSO
Si $\sum f_n$ converge simplement sur $I$, et si la série des dérivées $\sum f_n'$ converge uniformément sur tout segment de $I$. Alors $(\sum f_n)' = \sum f_n'$.

## FLASHCARD 69 - Dérivation série Ck
### RECTO
Sous quelles conditions la somme d'une série de fonctions $\sum f_n$ de classe $C^k$ est-elle de classe $C^k$ ?
### VERSO
Pour tout $j < k$, $\sum f_n^{(j)}$ converge simplement, et la série des dérivées d'ordre $k$, $\sum f_n^{(k)}$, converge uniformément sur tout segment de $I$. Les dérivées se calculent terme à terme.

# CHAPITRE 6 - Séries et séries entières

## FLASHCARD 70 - Lemme d'Abel
### RECTO
Énoncer le lemme d'Abel pour une série entière $\sum a_n z^n$.
### VERSO
Si la suite $(a_n r^n)$ est bornée, alors pour tout complexe $z$ tel que $|z| < r$, la série $\sum a_n z^n$ est absolument convergente. Le rayon de convergence est $R = \sup\{r \ge 0 \mid (a_n r^n) \text{ bornée}\}$.

## FLASHCARD 71 - D'Alembert Rayon
### RECTO
Comment appliquer la règle de d'Alembert pour trouver le rayon de convergence d'une série entière $\sum a_n z^n$ ?
### VERSO
Si $|a_{n+1}|/|a_n| \to \ell \in \mathbb{R}^+ \cup \{+\infty\}$, alors le rayon de convergence est $R = 1/\ell$ (avec $1/0 = +\infty$ et $1/+\infty = 0$).

## FLASHCARD 72 - Produit de Cauchy
### RECTO
Quel est le rayon de convergence de la série entière produit de Cauchy $\sum w_n z^n$ de deux séries entières de rayons $R$ et $R'$ ? (Où $w_n = \sum_{k=0}^n u_k v_{n-k}$).
### VERSO
Le rayon de convergence est supérieur ou égal à $\min(R, R')$, et sur ce disque, le produit des sommes est la somme de la série produit.

## FLASHCARD 73 - Régularité somme
### RECTO
Que peut-on dire de la régularité et des dérivées de la fonction $f(x) = \sum_{n=0}^{+\infty} a_n x^n$ sur son intervalle ouvert de convergence $]-R, R[$ ?
### VERSO
La fonction $f$ est de classe $C^\infty$ sur $]-R, R[$. Elle se dérive terme à terme, et on a la formule : $a_n = \frac{f^{(n)}(0)}{n!}$.

## FLASHCARD 74 - DSE Exp Cos Cosh
### RECTO
Donner les développements en série entière de $\exp(x)$, $\cos(x)$ et $\cosh(x)$, ainsi que leur rayon de convergence.
### VERSO
$\exp(x) = \sum_{n=0}^\infty \frac{x^n}{n!}$. $\cos(x) = \sum_{n=0}^\infty (-1)^n \frac{x^{2n}}{(2n)!}$. $\cosh(x) = \sum_{n=0}^\infty \frac{x^{2n}}{(2n)!}$. Le rayon de convergence est $R = +\infty$.

## FLASHCARD 75 - DSE Sin Sinh
### RECTO
Donner les développements en série entière de $\sin(x)$ et $\sinh(x)$, ainsi que leur rayon de convergence.
### VERSO
$\sin(x) = \sum_{n=0}^\infty (-1)^n \frac{x^{2n+1}}{(2n+1)!}$. $\sinh(x) = \sum_{n=0}^\infty \frac{x^{2n+1}}{(2n+1)!}$. Le rayon de convergence est $R = +\infty$.

## FLASHCARD 76 - DSE Arctan Ln
### RECTO
Donner les développements en série entière de $\text{Arctan}(x)$, $\ln(1+x)$ et $\ln(1-x)$, avec leur rayon.
### VERSO
$\text{Arctan}(x) = \sum_{n=0}^\infty (-1)^n \frac{x^{2n+1}}{2n+1}$. $\ln(1+x) = \sum_{n=1}^\infty (-1)^{n-1} \frac{x^n}{n}$. $\ln(1-x) = -\sum_{n=1}^\infty \frac{x^n}{n}$. Le rayon est $R = 1$.

## FLASHCARD 77 - DSE Binomial
### RECTO
Quel est le développement en série entière de $(1+x)^\alpha$ pour $\alpha \in \mathbb{R}$ ? Quel est son rayon ?
### VERSO
$(1+x)^\alpha = \sum_{n=0}^\infty \frac{\alpha(\alpha-1)\dots(\alpha-n+1)}{n!} x^n$. Son rayon est $R=1$.

## FLASHCARD 78 - Convergence normale
### RECTO
Que sait-on de la convergence normale d'une série entière $\sum a_n z^n$ de rayon $R > 0$ ?
### VERSO
Il y a convergence normale (donc uniforme et continue) sur tout disque fermé $\overline{D}(0, r)$ avec $r < R$. Si de plus $\sum |a_n| R^n$ converge, il y a convergence normale sur le disque fermé $\overline{D}(0, R)$.

## FLASHCARD 79 - Abel radial
### RECTO
Énoncer le lemme d'Abel radial pour une série entière réelle $f(x) = \sum a_n x^n$ de rayon $R>0$.
### VERSO
Si la série numérique $\sum a_n R^n$ converge, alors la fonction $f$ est prolongeable par continuité en $R$, c'est-à-dire qu'elle est continue sur $[0, R]$.

## FLASHCARD 80 - Coefficients Cauchy
### RECTO
Comment trouver les coefficients d'une série entière complexe de rayon $R>0$ à l'aide de la formule intégrale de Cauchy ?
### VERSO
Pour tout $r \in ]0, R[$, on a $a_p = \frac{1}{2\pi r^p} \int_0^{2\pi} f(r e^{it}) e^{-ipt} dt$.

## FLASHCARD 81 - Taubérien faible
### RECTO
Soient $f(x) = \sum a_n x^n$ de rayon $R$ tendant vers $+\infty$ en $R^-$, avec $a_n > 0$. Si $b_n \sim a_n$ (ou $b_n = o(a_n)$), que dire de $g(x) = \sum b_n x^n$ quand $x \to R^-$ ?
### VERSO
$g(x) \sim f(x)$ quand $x \to R^-$ (ou $g(x) = o(f(x))$ si $b_n = o(a_n)$).

# CHAPITRE 7 - Convergence dominée, permutation série-intégrale

## FLASHCARD 82 - TCD
### RECTO
Énoncer le théorème de convergence dominée pour une suite de fonctions $(f_n)$ sur un intervalle $I$.
### VERSO
Si $(f_n)$ converge simplement vers $f$ continue par morceaux sur $I$, et s'il existe une fonction $\varphi \ge 0$ intégrable sur $I$ telle que $\forall n, |f_n| \le \varphi$ (hypothèse de domination), alors les fonctions sont intégrables et $\int_I f_n \to \int_I f$.

## FLASHCARD 83 - TCD à paramètre
### RECTO
Quelles sont les conditions pour appliquer le théorème de convergence dominée à paramètre continu (famille $f_x(t)$ quand $x \to a$) ?
### VERSO
$f_x(t) \to f(t)$ simplement quand $x \to a$. Il existe une fonction $\varphi \ge 0$ intégrable telle que $\forall x, |f_x(t)| \le \varphi(t)$ (hypothèse de domination). Alors $\int_I f_x \to \int_I f$.

## FLASHCARD 84 - TCD Séries Intégrales
### RECTO
Quelles sont les conditions pour intervertir série et intégrale $\int_I \sum f_n = \sum \int_I f_n$ selon le théorème de convergence dominée appliqué aux sommes partielles ?
### VERSO
La série $\sum f_n$ converge, sa somme est continue par morceaux, et il y a domination des sommes partielles : $\forall n, \forall t \in I, |\sum_{k=0}^n f_k(t)| \le \varphi(t)$ avec $\varphi$ intégrable.

## FLASHCARD 85 - TCM
### RECTO
Que stipule le théorème de convergence monotone pour une série de fonctions $\sum f_n$ à valeurs POSITIVES ?
### VERSO
Si $\sum f_n$ converge simplement et sa somme est continue par morceaux, alors la somme $\int_I \sum f_n$ est intégrable si et seulement si la série numérique $\sum \int_I f_n$ converge. On a alors toujours l'égalité.

## FLASHCARD 86 - Intégration terme à terme
### RECTO
Quelle est l'hypothèse principale du théorème d'intégration terme à terme (sommation $L^1$) pour permuter intégrale et série sur un intervalle quelconque $I$ ?
### VERSO
Il faut que la série numérique des intégrales des valeurs absolues converge : $\sum \int_I |f_n| < +\infty$. On a alors $\int_I \sum f_n = \sum \int_I f_n$.

# CHAPITRE 8 - Intégrales à paramètre continu

## FLASHCARD 87 - Continuité sous intégrale
### RECTO
Quelles sont les trois conditions pour que l'intégrale à paramètre $F(x) = \int_I f(x, t) dt$ soit définie et continue sur $A$ ?
### VERSO
1) $\forall x, t \mapsto f(x, t)$ continue par morceaux. 2) $\forall t, x \mapsto f(x, t)$ continue. 3) Domination : il existe $\varphi \ge 0$ intégrable sur $I$ telle que $\forall x \in A, \forall t \in I, |f(x, t)| \le \varphi(t)$. (Une domination locale suffit).

## FLASHCARD 88 - Leibniz
### RECTO
Quelles sont les conditions pour que l'intégrale à paramètre $F(x) = \int_I f(x, t) dt$ soit de classe $C^1$ sur $J$ (dérivation sous le signe somme) ?
### VERSO
1) $\forall t, x \mapsto f(x, t)$ est $C^1$. 2) $t \mapsto f(x, t)$ est intégrable et $t \mapsto \frac{\partial f}{\partial x}$ est continue par morceaux. 3) Domination sur la dérivée partielle : il existe $\varphi \ge 0$ intégrable telle que $\forall x \in J, \forall t \in I, |\frac{\partial f}{\partial x}(x, t)| \le \varphi(t)$. On a alors $F'(x) = \int_I \frac{\partial f}{\partial x}(x, t) dt$.

## FLASHCARD 89 - Leibniz Ck
### RECTO
Quelles sont les conditions pour démontrer la régularité $C^k$ d'une intégrale à paramètre $F(x) = \int_I f(x, t) dt$ ?
### VERSO
Il faut que $x \mapsto f(x,t)$ soit $C^k$, que les dérivées partielles d'ordre $\le k-1$ soient intégrables, et surtout la condition de domination sur la dérivée k-ième : $\forall x \in J, |\frac{\partial^k f}{\partial x^k}(x,t)| \le \varphi(t)$ avec $\varphi$ intégrable.

# CHAPITRE 9 - Topologie

## FLASHCARD 90 - Valeurs d'adhérence
### RECTO
Que peut-on dire d'une suite ayant au moins deux valeurs d'adhérence distinctes ?
### VERSO
La suite diverge.

## FLASHCARD 91 - Bolzano unique
### RECTO
Dans un espace vectoriel normé de dimension finie, à quelle condition une suite bornée $(u_n)$ est-elle convergente ?
### VERSO
Si et seulement si elle possède une unique valeur d'adhérence.

## FLASHCARD 92 - Fermé séquentiel
### RECTO
Quelle est la caractérisation séquentielle d'une partie fermée $F$ dans un espace normé ?
### VERSO
$F$ est fermée si et seulement si toute suite convergente d'éléments de $F$ a sa limite dans $F$.

## FLASHCARD 93 - Ouvert séquentiel
### RECTO
Quelle est la caractérisation séquentielle d'un ouvert $\Omega$ dans un espace normé ?
### VERSO
$\Omega$ est ouvert si et seulement si, pour toute suite $u_n \to x \in \Omega$, on a à partir d'un certain rang $u_n \in \Omega$.

## FLASHCARD 94 - Adhérence
### RECTO
Comment caractériser topologiquement et séquentiellement qu'un point $b$ est adhérent à une partie $A$ ?
### VERSO
Topologiquement : $\forall \varepsilon > 0, \exists a \in A \cap B(b, \varepsilon)$. Séquentiellement : il existe une suite $(a_n)$ d'éléments de $A$ de limite $b$.

## FLASHCARD 95 - Dimension finie
### RECTO
Quelles sont les trois propriétés topologiques fondamentales valables spécifiquement en dimension finie ?
### VERSO
1) Toutes les normes sont équivalentes. 2) Les compacts sont les fermés bornés. 3) Les applications polynomiales, linéaires et multilinéaires sont toujours continues.

## FLASHCARD 96 - Image réciproque
### RECTO
Quelle est la propriété de l'image réciproque d'un ouvert (ou d'un fermé) par une application continue ?
### VERSO
L'image réciproque d'un ouvert est un ouvert ; l'image réciproque d'un fermé est un fermé.

## FLASHCARD 97 - Distance à une partie
### RECTO
Quelle est la propriété de l'application $x \mapsto d(x, A)$ pour une partie non vide $A$ ?
### VERSO
Elle est 1-lipschitzienne.

## FLASHCARD 98 - Image compact
### RECTO
Quelles sont les conséquences de la compacité pour l'image d'une fonction continue $f : K \to F$ ? Et si $F = \mathbb{R}$ ?
### VERSO
L'image $f(K)$ est un compact. Si $f$ est à valeurs réelles, elle est bornée et atteint ses bornes. $f$ est aussi uniformément continue sur $K$ (théorème de Heine).

## FLASHCARD 99 - Précompacité
### RECTO
Tout compact $K$ d'un espace vectoriel normé vérifie une propriété forte de recouvrement par des boules, laquelle ?
### VERSO
$K$ est précompact : pour tout $\varepsilon > 0$, il peut être recouvert par un nombre fini de boules de rayon $\varepsilon$.

## FLASHCARD 100 - SEV fermé
### RECTO
Quelle propriété de fermeture possède tout sous-espace de dimension finie d'un espace vectoriel normé ?
### VERSO
Il est toujours fermé.

## FLASHCARD 101 - Riesz
### RECTO
Que dit le théorème de Riesz concernant la boule unité d'un espace vectoriel normé ?
### VERSO
La boule unité est compacte si et seulement si l'espace est de dimension finie.

## FLASHCARD 102 - Image connexe
### RECTO
Quelle propriété possède l'image d'un ensemble connexe par arcs par une application continue ?
### VERSO
C'est un connexe par arcs (ce qui généralise le TVI).

## FLASHCARD 103 - Groupes topologiques
### RECTO
Les fonctions $M \mapsto \det M$ et $A \mapsto A^{-1}$ sont-elles continues ? Que dire de $GL_n(\mathbb{K})$, $O_n(\mathbb{R})$ et $SO_n(\mathbb{R})$ ?
### VERSO
Oui, $\det$ (polynomiale) et l'inversion (rationnelle) sont continues. $GL_n(\mathbb{K})$ est ouvert. $O_n(\mathbb{R})$ et $SO_n(\mathbb{R})$ sont compacts.

## FLASHCARD 104 - Connexité GLn
### RECTO
Quelle est la différence de connexité par arcs entre $GL_n(\mathbb{C})$ et $GL_n(\mathbb{R})$ ?
### VERSO
$GL_n(\mathbb{C})$ est connexe par arcs. $GL_n(\mathbb{R})$ a deux composantes connexes par arcs : $GL_n^+(\mathbb{R})$ et $GL_n^-(\mathbb{R})$.

## FLASHCARD 105 - Suite de puissances bornée
### RECTO
Si pour $u \in \mathcal{L}(E)$ en dimension finie sur $\mathbb{C}$, la suite des puissances $(u^k)$ est bornée, que dire de son spectre et de ses valeurs propres de module 1 ?
### VERSO
Le spectre est inclus dans le disque unité fermé. Toute valeur propre de module 1 est semi-simple (la partie nilpotente de l'induit sur l'espace caractéristique est nulle).

## FLASHCARD 106 - Continuité linéaire
### RECTO
À quelle condition de majoration un opérateur linéaire (ou multilinéaire) $u$ est-il continu ?
### VERSO
S'il existe une constante $C > 0$ telle que $\forall x \in E, \|u(x)\| \le C\|x\|$, ce qui équivaut à la finitude de sa norme d'opérateur.

# CHAPITRE 10 - Équations différentielles

## FLASHCARD 107 - Gronwall
### RECTO
Énoncer le lemme de Gronwall (majoration intégrale).
### VERSO
Si $u, v \ge 0$ sont continues et $u(t) \le C + \int_{t_0}^t u(s)v(s) ds$, alors $u(t) \le C \exp(\int_{t_0}^t v(s) ds)$.

## FLASHCARD 108 - Équation intégrale
### RECTO
À quelle équation intégrale le problème de Cauchy différentiel $x' = a(x) + b$ avec $x(t_0) = x_0$ est-il équivalent ?
### VERSO
Il équivaut à l'équation intégrale : $x(t) = x_0 + \int_{t_0}^t (a(x(s)) + b(s)) ds$ pour $x$ fonction continue.

## FLASHCARD 109 - Cauchy-Lipschitz linéaire
### RECTO
Que dit le théorème de Cauchy-Lipschitz linéaire pour $x' = a(x) + b, x(t_0)=x_0$ (où $a$ est continu de $I$ dans $\mathcal{L}(E)$) ?
### VERSO
Il y a existence et unicité de la solution, définie sur $I$ tout entier. L'espace des solutions de l'homogène est de dimension $n = \dim E$, et la solution générale est un espace affine dirigé par l'homogène.

## FLASHCARD 110 - Équa diff ordre n
### RECTO
Pour une équation différentielle linéaire scalaire d'ordre $n$, $y^{(n)} + c_{n-1}y^{(n-1)} + \dots + c_0 y = b$, que dit le théorème de Cauchy-Lipschitz ?
### VERSO
Il y a existence et unicité de la solution sur $I$ définie par $n$ conditions initiales ($y(t_0), \dots, y^{(n-1)}(t_0)$). L'espace des solutions de l'équation homogène est de dimension $n$.

## FLASHCARD 111 - Matrice résolvante
### RECTO
Comment utiliser une matrice résolvante $R(t)$ pour trouver une solution particulière du système $X' = AX + b$ ?
### VERSO
En cherchant $X = R Z$, on obtient la solution particulière $X(t) = R(t) \int_{t_0}^t R(s)^{-1} b(s) ds$. (Si $A$ est constante, $R(t) = e^{tA}$).

## FLASHCARD 112 - Variation constante
### RECTO
Comment appliquer la variation des constantes pour une équation d'ordre 2 : $y'' + ay' + by = c$, avec $(y_1, y_2)$ base de l'homogène ?
### VERSO
On cherche $y(t) = \lambda(t) y_1(t) + \mu(t) y_2(t)$ en posant le système : $\lambda' y_1 + \mu' y_2 = 0$ et $\lambda' y_1' + \mu' y_2' = c(t)$.

## FLASHCARD 113 - Zéros isolés
### RECTO
Que peut-on dire de la répartition des zéros d'une solution non nulle d'une équation différentielle linéaire homogène d'ordre $n$ ?
### VERSO
Ses zéros sont isolés.

## FLASHCARD 114 - Sturm-Liouville
### RECTO
Que stipule le théorème de Sturm-Liouville pour l'équation $y'' + f y = 0$ si on a deux fonctions $f_1 \le f_2$ ?
### VERSO
Entre deux zéros consécutifs d'une solution non nulle de $y'' + f_1 y = 0$, toute solution non nulle de $y'' + f_2 y = 0$ s'annule au moins une fois.

# CHAPITRE 11 - Calcul différentiel

## FLASHCARD 115 - Extremum diff nulle
### RECTO
Si une fonction $f$ définie sur un ouvert d'un evn admet un extremum local en un point intérieur $a$ et y est différentiable, que vaut la différentielle $df(a)$ ?
### VERSO
La différentielle est nulle : $df(a) = 0$ (dans un ev euclidien, le gradient est nul : $\nabla f(a) = 0$).

## FLASHCARD 116 - Règle de la chaîne
### RECTO
Quelle est la formule de la règle de la chaîne pour la différentielle de la composée $g \circ f$ en $a$ ?
### VERSO
$d(g \circ f)(a) = dg(f(a)) \circ df(a)$. Pour les dérivées partielles : $\frac{\partial(g \circ f)}{\partial x_i}(a) = \sum_{j} \frac{\partial g}{\partial y_j}(f(a)) \frac{\partial f_j}{\partial x_i}(a)$.

## FLASHCARD 117 - Formule intégrale diff
### RECTO
Comment exprime-t-on $f(b) - f(a)$ à l'aide d'une intégrale le long d'un arc $\gamma$ reliant $a$ à $b$ ? Et si le segment $[a,b]$ est inclus dans l'ouvert ?
### VERSO
$f(b) - f(a) = \int_0^1 df(\gamma(t)) \cdot \gamma'(t) dt$. Sur le segment : $f(b) - f(a) = \int_0^1 df(a + t(b-a)) \cdot (b-a) dt$ (ou avec le gradient et le produit scalaire euclidien).

## FLASHCARD 118 - Différentielle nulle
### RECTO
Si $f$ de classe $C^1$ sur un ouvert $\Omega$ connexe par arcs vérifie $df = 0$, que dire de $f$ ?
### VERSO
La fonction $f$ est constante sur $\Omega$.

## FLASHCARD 119 - Espace tangent niveau
### RECTO
Soit $S$ la ligne de niveau $g^{-1}(\alpha)$. Si $dg(x) \neq 0$, quel est l'espace tangent à $S$ au point $x$ ?
### VERSO
L'espace tangent à $S$ en $x$ est le noyau de la différentielle : $\ker(dg(x))$.

## FLASHCARD 120 - Lagrange
### RECTO
Énoncer le théorème d'optimisation sous contrainte (multiplicateurs de Lagrange) pour une fonction $f$ restreinte à $S = g^{-1}(\alpha)$.
### VERSO
Si la restriction de $f$ à $S$ admet un extremum local en $x$ et que $dg(x) \neq 0$, alors la différentielle $df(x)$ est colinéaire à $dg(x)$.

## FLASHCARD 121 - Schwarz
### RECTO
Que dit le théorème de Schwarz pour une fonction de classe $C^2$ de plusieurs variables ?
### VERSO
L'ordre de dérivation partielle importe peu : $\frac{\partial^2 f}{\partial x_i \partial x_j}(a) = \frac{\partial^2 f}{\partial x_j \partial x_i}(a)$.

## FLASHCARD 122 - Taylor-Young ordre 2
### RECTO
Donner la formule de Taylor-Young à l'ordre 2 pour une fonction de plusieurs variables.
### VERSO
$f(x+h) = f(x) + \langle \nabla f(x), h \rangle + \frac{1}{2} \langle H_f(x) h, h \rangle + o(\|h\|^2)$, où $H_f(x)$ est la matrice Hessienne.

## FLASHCARD 123 - Nature extremum Hessienne
### RECTO
Soit $x$ tel que $\nabla f(x) = 0$. Quelles sont les conditions sur la matrice Hessienne $H_f(x)$ pour caractériser la nature de l'extremum (minimum ou maximum local) ?
### VERSO
Si $H_f(x)$ est définie positive (resp. définie négative), $f$ admet un minimum local strict (resp. maximum local strict). Si $H_f$ est non définie et a des valeurs propres de signes opposés, c'est un point selle.

# CHAPITRE 12 - Algèbre générale

## FLASHCARD 124 - Nombres premiers
### RECTO
Quel est l'équivalent asymptotique du $n$-ième nombre premier $p_n$ ?
### VERSO
$p_n \sim n \ln(n)$.

## FLASHCARD 125 - Petit Fermat
### RECTO
Énoncer le petit théorème de Fermat pour un nombre premier $p$ et un entier $n$.
### VERSO
$n^p \equiv n \pmod p$.

## FLASHCARD 126 - Restes chinois
### RECTO
Quel isomorphisme d'anneaux est donné par le théorème des restes chinois pour $m, n$ premiers entre eux ?
### VERSO
$\mathbb{Z}/mn\mathbb{Z} \to \mathbb{Z}/m\mathbb{Z} \times \mathbb{Z}/n\mathbb{Z}$, défini par $x \pmod{mn} \mapsto (x \pmod m, x \pmod n)$.

## FLASHCARD 127 - Indicatrice d'Euler
### RECTO
Comment est définie l'indicatrice d'Euler $\varphi(n)$ (en lien avec le PGCD et les éléments inversibles) ?
### VERSO
$\varphi(n) = |\{k \in \{1..n\}, n \wedge k = 1\}|$. C'est le nombre d'inversibles de l'anneau $\mathbb{Z}/n\mathbb{Z}$, et le nombre de racines primitives $n$-ièmes.

## FLASHCARD 128 - Formule Euler
### RECTO
Donner la formule de $\varphi(n)$ à partir de sa décomposition en facteurs premiers $n = p_1^{k_1} \dots p_q^{k_q}$.
### VERSO
$\varphi(n) = n \prod_{i=1}^q \left(1 - \frac{1}{p_i}\right)$.

## FLASHCARD 129 - Théorème d'Euler
### RECTO
Énoncer le théorème d'Euler généralisant le petit théorème de Fermat.
### VERSO
Si $a, n \in \mathbb{N}^*$ sont premiers entre eux ($a \wedge n = 1$), alors $a^{\varphi(n)} \equiv 1 \pmod n$.

## FLASHCARD 130 - Somme Phi
### RECTO
Que donne la somme $\sum_{d|n} \varphi(d)$ portant sur les diviseurs d'un entier $n \in \mathbb{N}^*$ ?
### VERSO
$\sum_{d|n} \varphi(d) = n$.

## FLASHCARD 131 - Legendre
### RECTO
Donner la formule de Legendre pour la valuation $p$-adique de la factorielle $n!$.
### VERSO
$v_p(n!) = \sum_{k=1}^{+\infty} \lfloor \frac{n}{p^k} \rfloor$.

## FLASHCARD 132 - Monogène
### RECTO
À quel groupe usuel est isomorphe tout groupe monogène infini ? Et un groupe monogène fini ?
### VERSO
Un groupe monogène infini est isomorphe à $(\mathbb{Z}, +)$. Un groupe monogène fini d'ordre $n$ est isomorphe à $(\mathbb{Z}/n\mathbb{Z}, +)$.

## FLASHCARD 133 - Inversibles Z/pZ
### RECTO
Quelle est la structure du groupe des inversibles $(\mathbb{Z}/p\mathbb{Z})^*$ lorsque $p$ est un nombre premier ?
### VERSO
C'est un groupe cyclique.

## FLASHCARD 134 - Lagrange
### RECTO
Quel lien existe-t-il entre l'ordre d'un élément $g$ d'un groupe fini $G$ et le cardinal de $G$ ? Que dit le théorème de Lagrange pour un sous-groupe ?
### VERSO
L'ordre de l'élément $g$ divise le cardinal de $G$. Le théorème de Lagrange stipule que le cardinal de tout sous-groupe de $G$ divise le cardinal de $G$.

## FLASHCARD 135 - Idéaux K[X]
### RECTO
De quelle forme sont les idéaux de l'anneau des polynômes $\mathbb{K}[X]$ ?
### VERSO
Ils sont principaux, c'est-à-dire de la forme $A\mathbb{K}[X]$.

## FLASHCARD 136 - Gauss
### RECTO
Que stipule le lemme de Gauss dans l'anneau $\mathbb{Z}$ ou $\mathbb{K}[X]$ ?
### VERSO
Si $a$ divise $bc$ et que $a$ est premier avec $b$, alors $a$ divise $c$.

## FLASHCARD 137 - Bézout
### RECTO
Énoncer le théorème de Bézout concernant l'existence du PGCD et la caractérisation de la coprimalité (dans $\mathbb{Z}$ et dans $\mathbb{K}[X]$).*
### VERSO
L'idéal engendré par $A$ et $B$ est $D\mathbb{K}[X]$ (où $D$ est le PGCD). Les éléments $A$ et $B$ sont premiers entre eux si et seulement s'il existe $U$ et $V$ tels que $AU + BV = 1$.

# CHAPITRE 13 - Polynômes et fractions rationnelles

## FLASHCARD 138 - Division euclidienne
### RECTO
Énoncer le théorème de division euclidienne dans $\mathbb{K}[X]$. Quotient et reste dépendent-ils du corps ?
### VERSO
Pour $B$ de degré $\ge 1$, il existe un unique couple $(Q, R)$ tel que $A = BQ + R$ avec $\deg R \le \deg B - 1$. Le quotient et le reste ne dépendent pas du corps (identiques dans un sur-corps).

## FLASHCARD 139 - Racine rationnelle
### RECTO
Si un polynôme unitaire $P \in \mathbb{Z}[X]$ admet une racine rationnelle $r \in \mathbb{Q}$, que peut-on dire de $r$ ?
### VERSO
$r$ est un entier ($r \in \mathbb{Z}$).

## FLASHCARD 140 - Contenu et irréductibilité
### RECTO
Si le polynôme $P \in \mathbb{Z}[X]$ a des coefficients de PGCD égal à 1 (contenu $= 1$), quel est le lien entre son irréductibilité dans $\mathbb{Z}[X]$ et dans $\mathbb{Q}[X]$ ?
### VERSO
$P$ est irréductible dans $\mathbb{Z}[X]$ si et seulement si il est irréductible dans $\mathbb{Q}[X]$.

## FLASHCARD 141 - D'Alembert-Gauss
### RECTO
Que dit le théorème de d'Alembert-Gauss pour un polynôme $P \in \mathbb{C}[X]$ ? Quel est le lien avec le polynôme minimal d'un complexe algébrique sur $\mathbb{Q}$ ?
### VERSO
Tout polynôme $P \in \mathbb{C}[X]$ est scindé sur $\mathbb{C}$. Le polynôme minimal d'un élément algébrique est à racines simples dans $\mathbb{C}$.

## FLASHCARD 142 - Multiplicité
### RECTO
Dans un corps de caractéristique nulle, comment caractérise-t-on qu'un scalaire $a$ est racine de multiplicité $m$ d'un polynôme $P$ à l'aide des dérivées ?
### VERSO
$P^{(j)}(a) = 0$ pour tout $j \in \{0, \dots, m-1\}$ et $P^{(m)}(a) \neq 0$.

## FLASHCARD 143 - Divisibilité et racines
### RECTO
Soient $P$ et $Q$ dans $\mathbb{C}[X]$. À quelle condition sur les racines de $P$ peut-on affirmer que $P$ divise $Q$ ?
### VERSO
Si et seulement si toute racine de $P$ est racine de $Q$ avec une multiplicité plus grande ou égale comme racine de $Q$.

## FLASHCARD 144 - Dérivée scindé
### RECTO
Quel est l'effet de la dérivation sur un polynôme scindé sur $\mathbb{R}$ ?
### VERSO
Si $P$ est scindé sur $\mathbb{R}$, alors $P'$ est scindé sur $\mathbb{R}$. S'il est simplement scindé, alors $P'$ l'est aussi.

## FLASHCARD 145 - Dérivée logarithmique
### RECTO
Si $P = \lambda \prod_{k=1}^q (X-a_k)^{m_k}$, quelle est la formule de la dérivée logarithmique $P'/P$ ?
### VERSO
$P'/P = \sum_{k=1}^q \frac{m_k}{X-a_k}$.

## FLASHCARD 146 - Pôle simple
### RECTO
Quel est le coefficient de l'élément simple $\frac{1}{X-a_k}$ dans la décomposition de la fraction $F = P/Q$ si $a_k$ est un pôle simple ?
### VERSO
Le coefficient est $\frac{P(a_k)}{Q'(a_k)}$.

## FLASHCARD 147 - Pôle multiple
### RECTO
Si $a$ est un pôle de multiplicité $m$, quel est le coefficient de $\frac{1}{(X-a)^m}$ dans la décomposition en éléments simples de $P/Q$ ?
### VERSO
Le coefficient est $\frac{P(a)}{Q^{(m)}(a)/m!}$.

## FLASHCARD 148 - Interpolation Lagrange
### RECTO
Expliciter la formule de l'unique polynôme d'interpolation de Lagrange de degré $\le n$ tel que $P(x_k) = y_k$ pour $k \in \{0..n\}$.
### VERSO
$P = \sum_{k=0}^n y_k L_k$ où les polynômes de base sont $L_k = \prod_{0 \le i \le n, i \neq k} \frac{X - x_i}{x_k - x_i}$.

## FLASHCARD 149 - Tchebychev
### RECTO
Définir le polynôme de Tchebychev $T_n(X)$ via sa relation avec le cosinus. Quel est son degré et son coefficient dominant pour $n \in \mathbb{N}^*$ ?
### VERSO
$\forall \theta, T_n(\cos \theta) = \cos(n\theta)$. Son degré est $n$, et son coefficient dominant est $2^{n-1}$. La relation de récurrence est $T_{n+2} + T_n = 2X T_{n+1}$.

## FLASHCARD 150 - Contenu Gauss
### RECTO
Comment définit-on le contenu $c(P)$ d'un polynôme $P \in \mathbb{Z}[X]$ ? Quelle est la propriété multiplicative (Lemme de Gauss) ?
### VERSO
Le contenu $c(P)$ est le PGCD de ses coefficients. Pour $P=QR$, on a $C(P) = C(Q)C(R)$.

# CHAPITRE 14 - Algèbre linéaire

## FLASHCARD 151 - Homothétie
### RECTO
À quelle condition sur les familles $(x, u(x))$ un endomorphisme $u \in \mathcal{L}(E)$ est-il une homothétie ?
### VERSO
Si et seulement si, pour tout $x \in E$, la famille $(x, u(x))$ est liée.

## FLASHCARD 152 - Base incomplète
### RECTO
Que dit le théorème de la base incomplète à partir d'une famille libre et d'une famille génératrice ?
### VERSO
On peut compléter toute famille libre avec des vecteurs issus de la famille génératrice pour former une base de $E$.

## FLASHCARD 153 - Grassmann
### RECTO
Énoncer la formule de Grassmann pour les dimensions de sous-espaces de dimension finie.
### VERSO
$\dim(F+G) = \dim F + \dim G - \dim(F \cap G)$.

## FLASHCARD 154 - Somme directe applications
### RECTO
Soit $E = \bigoplus_{i=1}^p E_i$ et des applications linéaires $u_i \in \mathcal{L}(E_i, F)$. Que peut-on dire sur la construction d'une application linéaire $u \in \mathcal{L}(E, F)$ ?
### VERSO
Il existe une unique application linéaire $u \in \mathcal{L}(E, F)$ telle que sa restriction à chaque $E_i$ soit égale à $u_i$.

## FLASHCARD 155 - Théorème du rang
### RECTO
Que stipule le théorème du rang pour une application linéaire $u \in \mathcal{L}(E, F)$ en dimension finie ? Que fait $u$ sur un supplémentaire $S$ de $\ker u$ ?
### VERSO
$\dim E = \dim(\ker u) + \text{rg}(u)$. De plus, $u$ induit un isomorphisme du supplémentaire $S$ sur $\text{Im} u$.

## FLASHCARD 156 - Rang composée
### RECTO
Comment relier le rang d'une composée $v \circ u$ aux dimensions liées à $\text{Im} u$ et $\ker v$ ?
### VERSO
$\text{rg}(v \circ u) = \text{rg}(u) - \dim(\ker v \cap \text{Im} u)$.

## FLASHCARD 157 - Équivalence matrices
### RECTO
À quelle matrice canonique $J_r$ est équivalente toute matrice $A \in \mathcal{M}_{n,m}(\mathbb{K})$ de rang $r$ ? Le rang dépend-il du corps de base ?
### VERSO
$A$ est équivalente à une matrice $J_r$ ayant $I_r$ en haut à gauche et des zéros ailleurs. Le rang correspond à la plus grande matrice inversible extraite et ne dépend pas du corps de base.

## FLASHCARD 158 - Hadamard Matrices
### RECTO
Quelle est la condition sur les coefficients (Lemme d'Hadamard) assurant qu'une matrice est inversible (diagonale strictement dominante) ?
### VERSO
Pour tout $i$, la diagonale domine strictement la ligne : $|a_{i,i}| > \sum_{j \neq i} |a_{i,j}|$.

## FLASHCARD 159 - Vandermonde
### RECTO
Que vaut le déterminant de la matrice de Vandermonde $(a_i^{j-1})_{1 \le i, j \le n}$ ?
### VERSO
$\prod_{1 \le i < j \le n} (a_j - a_i)$.

## FLASHCARD 160 - Générateurs SLn GLn
### RECTO
Qu'est-ce qui engendre $SL_n(\mathbb{K})$ et $GL_n(\mathbb{K})$ en termes de matrices particulières ?
### VERSO
$SL_n(\mathbb{K})$ est engendré par les matrices de transvection. $GL_n(\mathbb{K})$ est engendré par des matrices de transvection et une matrice de dilatation. $SL_n(\mathbb{Z})$ par les transvections de paramètre $1$ et $-1$.

## FLASHCARD 161 - Exponentielle commutant
### RECTO
Comment se calcule l'exponentielle d'une matrice en rapport avec l'algèbre des polynômes, et que se passe-t-il si deux matrices $A$ et $B$ commutent ?
### VERSO
$\exp(A)$ s'exprime comme un polynôme en $A$. Si $A$ et $B$ commutent, alors $\exp(A+B) = \exp(A)\exp(B)$.

# CHAPITRE 15 - Réduction

## FLASHCARD 162 - Vecteurs propres libres
### RECTO
Que peut-on affirmer sur une famille de vecteurs propres associés à des valeurs propres distinctes ?
### VERSO
Toute famille de vecteurs propres associés à des valeurs propres distinctes est libre.

## FLASHCARD 163 - Poly caractéristique produit
### RECTO
Quelle égalité remarquable lie le polynôme caractéristique du produit $AB$ avec celui du produit $BA$ ?
### VERSO
$\chi_{AB} = \chi_{BA}$.

## FLASHCARD 164 - Condition suffisante diag
### RECTO
Quelle est la condition suffisante classique pour qu'un endomorphisme d'un espace de dimension $n$ soit diagonalisable ?
### VERSO
S'il possède un polynôme caractéristique scindé à racines simples (c'est-à-dire $n$ valeurs propres distinctes).

## FLASHCARD 165 - Densité diagonalisables
### RECTO
Quelle est la propriété topologique de l'ensemble des matrices de $M_n(\mathbb{C})$ diagonalisables (ayant $n$ valeurs propres distinctes) ?
### VERSO
Cet ensemble est dense dans $M_n(\mathbb{C})$.

## FLASHCARD 166 - CNS Diagonalisable
### RECTO
Quelle est la condition nécessaire et suffisante (CNS) portant sur les sous-espaces propres pour qu'un endomorphisme $u$ soit diagonalisable ?
### VERSO
$u$ est diagonalisable si et seulement si $\chi_u$ est scindé et pour tout $\lambda \in Sp(u)$, la dimension du sous-espace propre $E_\lambda(u)$ est égale à la multiplicité de $\lambda$ dans le polynôme caractéristique.

## FLASHCARD 167 - CNS Trigonalisable
### RECTO
Quelle est la CNS de trigonalisabilité d'un endomorphisme en termes de son polynôme caractéristique (ou polynôme annulateur) ?
### VERSO
Il est trigonalisable si et seulement si $\chi_u$ est scindé (ou s'il est annulé par un polynôme scindé sur le corps).

## FLASHCARD 168 - Trace et déterminant
### RECTO
Pour un endomorphisme trigonalisable de vp $\lambda_1, \dots, \lambda_n$ (avec multiplicités), que valent sa trace et son déterminant ?
### VERSO
$\det(u) = \lambda_1 \times \dots \times \lambda_n$ et $\text{Tr}(u) = \lambda_1 + \dots + \lambda_n$.

## FLASHCARD 169 - Endomorphisme induit
### RECTO
Si $u$ est un endomorphisme trigonalisable (ou diagonalisable) et $F$ un sous-espace stable par $u$, que dire de l'endomorphisme induit sur $F$ ?
### VERSO
L'endomorphisme induit $u_F$ est lui aussi trigonalisable (ou diagonalisable).

## FLASHCARD 170 - Stable dimension 1 ou 2
### RECTO
Dans un $\mathbb{R}$-espace vectoriel, quelle dimension peut toujours avoir un sous-espace stable par un endomorphisme $u$ ?
### VERSO
Il existe toujours un sous-espace stable de dimension 1 ou 2.

## FLASHCARD 171 - Nilpotent
### RECTO
Quelle est la caractérisation spectrale d'un endomorphisme nilpotent ? Que dire de son indice de nilpotence ?
### VERSO
Il est nilpotent si et seulement s'il est trigonalisable avec pour unique valeur propre 0. Son indice de nilpotence est inférieur ou égal à la dimension de l'espace.

## FLASHCARD 172 - Commutant stable
### RECTO
Si deux endomorphismes commutent ($u \circ v = v \circ u$), quels sous-espaces de $u$ sont stables par $v$ ?
### VERSO
L'image, le noyau, les sous-espaces propres et les sous-espaces caractéristiques de $u$ sont stables par $v$.

## FLASHCARD 173 - Codiagonalisation
### RECTO
Sous quelles conditions une famille d'endomorphismes qui commutent deux à deux est-elle codiagonalisable (resp. cotrigonalisable) ?
### VERSO
S'ils commutent et sont tous diagonalisables (resp. trigonalisables), il existe une base commune de vecteurs propres (resp. une base commune triangulaire).

## FLASHCARD 174 - Trace nilpotente
### RECTO
Sur un corps de caractéristique nulle, comment caractérise-t-on une matrice nilpotente via sa trace ?
### VERSO
$A$ est nilpotente si et seulement si $\forall k \in \{1 \dots n\}, \text{Tr}(A^k) = 0$.

## FLASHCARD 175 - Racines annulateur
### RECTO
Si $P$ est un polynôme annulateur de $u$, quel est le lien entre les racines de $P$, celles du polynôme minimal et les valeurs propres de $u$ ?
### VERSO
Toute valeur propre de $u$ est racine de $P$. Les racines du polynôme minimal sont exactement les valeurs propres de $u$.

## FLASHCARD 176 - Compagnon
### RECTO
Pour un polynôme unitaire $P = a_0 + \dots + a_{n-1}X^{n-1} + X^n$, quelle matrice particulière a exactement $P$ pour polynôme caractéristique et minimal ?
### VERSO
La matrice compagnon $C_P$ (avec des 1 sous la diagonale et l'opposé des coefficients sur la dernière colonne).

## FLASHCARD 177 - Cayley-Hamilton
### RECTO
Énoncer le théorème de Cayley-Hamilton. Quelle en est la conséquence pour le polynôme minimal ?
### VERSO
Le polynôme caractéristique annule l'endomorphisme : $\chi_u(u) = 0$. Par conséquent, le polynôme minimal divise le polynôme caractéristique.

## FLASHCARD 178 - Lemme des noyaux
### RECTO
Que donne le lemme des noyaux pour un endomorphisme $u$ et des polynômes $P_1, \dots, P_q$ deux à deux premiers entre eux ?
### VERSO
$\ker((P_1 \dots P_q)(u)) = \bigoplus_{i=1}^q \ker(P_i(u))$.

## FLASHCARD 179 - Degré minimal
### RECTO
Quelle est la caractérisation du degré $d$ du polynôme minimal à l'aide des puissances de $u$ ?
### VERSO
$d$ est l'unique entier tel que la famille $(u^k)_{0 \le k \le d-1}$ forme une base de l'algèbre $\mathbb{K}[u]$.

## FLASHCARD 180 - CNS Diag Annulateur
### RECTO
Énoncer la CNS de diagonalisabilité en termes de polynôme annulateur / polynôme minimal.
### VERSO
$u$ est diagonalisable si et seulement si son polynôme minimal est scindé à racines simples (c'est équivalent à être annulé par un polynôme simplement scindé).

## FLASHCARD 181 - Décomposition spectrale
### RECTO
Pour un polynôme scindé $P = \prod (X-\lambda_i)^{m_i}$ annulateur de $u$, quelle est la décomposition de l'espace en sous-espaces caractéristiques et l'action de $u$ sur ceux-ci ?
### VERSO
L'espace est la somme directe des sous-espaces caractéristiques $F_{\lambda_i} = \ker(u - \lambda_i id)^{m_i}$. Ces espaces sont stables, et l'endomorphisme y induit la somme d'une homothétie et d'un nilpotent.

## FLASHCARD 182 - Trigonalisation approchée
### RECTO
Que dit le théorème de trigonalisation approchée (à $\varepsilon$-près) sur $\mathbb{C}$ ?
### VERSO
Pour tout endomorphisme sur $\mathbb{C}$, il existe une base où la matrice est triangulaire supérieure avec des coefficients stricts au-dessus de la diagonale de module inférieur à $\varepsilon$.

## FLASHCARD 183 - Dunford
### RECTO
Énoncer le théorème de décomposition de Dunford pour un endomorphisme dont le polynôme caractéristique est scindé.
### VERSO
Il existe un unique couple d'endomorphismes $(d, n)$ tel que $u = d+n$, avec $d$ diagonalisable, $n$ nilpotent, et $d \circ n = n \circ d$. De plus, $d$ et $n$ sont des polynômes en $u$.

# CHAPITRE 16 - Algèbre euclidienne

## FLASHCARD 184 - Riesz représentation
### RECTO
Quel théorème permet d'associer un unique vecteur à une forme linéaire sur un espace euclidien ? (Théorème de représentation de Riesz).
### VERSO
Pour toute forme linéaire $\varphi$, il existe un unique vecteur $a$ tel que $\forall x, \varphi(x) = \langle a, x \rangle$. (Le noyau de $\varphi$ est l'orthogonal de $a$).

## FLASHCARD 185 - Gram-Schmidt
### RECTO
Que permet de construire le procédé d'orthonormalisation de Gram-Schmidt à partir d'une famille libre $(x_1, \dots, x_n)$ ?
### VERSO
Une unique famille orthonormée $(e_1, \dots, e_n)$ telle que $\text{Vect}(e_1..e_k) = \text{Vect}(x_1..x_k)$ et $\langle x_k, e_k \rangle > 0$. Formule : on orthogonalise via $y_k = x_k - \sum_{i<k} \langle x_k, e_i \rangle e_i$ puis $e_k = y_k/\|y_k\|$.

## FLASHCARD 186 - Projection orthogonale
### RECTO
Donner la formule explicite de la projection orthogonale $p$ sur un sous-espace $F$ muni d'une base orthonormée $(f_1, \dots, f_p)$.
### VERSO
$p(x) = \sum_{k=1}^p \langle x, f_k \rangle f_k$.

## FLASHCARD 187 - Supplémentaire orthogonal
### RECTO
Si $F$ est un sous-espace de dimension finie d'un espace préhilbertien, quelle décomposition de l'espace global $E$ obtient-on ?
### VERSO
$E = F \oplus F^\perp$.

## FLASHCARD 188 - Distance minimisée
### RECTO
Comment caractériser le point d'un sous-espace $F$ (de dimension finie) qui minimise la distance à un point $x$ ?
### VERSO
La distance est atteinte uniquement au projeté orthogonal $p(x)$, et on a $d(x, F)^2 = \|x - p(x)\|^2 = \langle x - p(x), x \rangle$.

## FLASHCARD 189 - Projecteur orthogonal
### RECTO
Quelles sont les caractérisations classiques pour qu'un projecteur $p \in \mathcal{L}(E)$ soit un projecteur orthogonal ?
### VERSO
1) $\forall x, \|p(x)\| \le \|x\|$. 2) $p$ est symétrique ($\forall x,y, \langle p(x), y \rangle = \langle x, p(y) \rangle$).

## FLASHCARD 190 - Inégalité Hadamard
### RECTO
Énoncer l'inégalité d'Hadamard pour le déterminant dans une base orthonormée, et son cas d'égalité.
### VERSO
$|\det(x_1, \dots, x_n)| \le \|x_1\| \times \dots \times \|x_n\|$. L'égalité a lieu si et seulement si un vecteur est nul ou si la famille est orthogonale.

## FLASHCARD 191 - Polynômes orthogonaux
### RECTO
Pour un produit scalaire intégral $\langle P, Q \rangle = \int_I P(t)Q(t)\omega(t)dt$ sur $\mathbb{R}[X]$, quelles propriétés possèdent les polynômes orthogonaux $P_n$ obtenus par Gram-Schmidt ?
### VERSO
$\deg(P_n) = n$, et $P_n$ est simplement scindé sur $\mathbb{R}$ avec toutes ses racines dans l'intervalle $I$.

## FLASHCARD 192 - Projection convexe
### RECTO
Sur un espace euclidien, quelle condition angulaire caractérise le projeté orthogonal $c_0$ d'un point $x$ sur un convexe fermé non vide $C$ ?
### VERSO
C'est l'unique élément $c_0 \in C$ tel que $\forall c \in C, \langle x-c_0, c-c_0 \rangle \le 0$ (condition d'angle obtus).

## FLASHCARD 193 - Bessel et Parseval
### RECTO
Que donne l'inégalité de Bessel pour une famille orthonormée finie $(e_i)$ ? Et que signifie qu'une telle famille est "totale" en dimension quelconque ?
### VERSO
Inégalité : $\sum_{i=1}^n \langle x, e_i \rangle^2 \le \|x\|^2$. Une famille est totale si l'espace vectoriel engendré est dense dans $E$ (on a alors l'égalité $\|x\|^2 = \sum \langle x, e_k \rangle e_k$ et $x = \sum \langle x, e_k \rangle e_k$).

## FLASHCARD 194 - Adjoint matrice
### RECTO
Comment relier la matrice de $u$ et celle de son adjoint $u^*$ dans une base orthonormée ?
### VERSO
La matrice de $u^*$ est la transposée de la matrice de $u$.

## FLASHCARD 195 - Stable par adjoint
### RECTO
Si un sous-espace $F$ est stable par une isométrie $u \in \mathcal{O}(E)$ ou un endomorphisme symétrique $u \in \mathcal{S}(E)$, que dire du sous-espace orthogonal $F^\perp$ ?
### VERSO
$F^\perp$ est également stable par $u$.

## FLASHCARD 196 - Réduction isométrie
### RECTO
Quelle est la réduction matricielle (forme par blocs) de toute isométrie $u \in \mathcal{O}(E)$ dans une base orthonormée bien choisie ?
### VERSO
La matrice est diagonale par blocs, avec des blocs $1 \times 1$ égaux à $1$ ou $-1$, et des blocs $2 \times 2$ de la forme $R(\theta)$ (matrices de rotation).

## FLASHCARD 197 - Antisymétrique
### RECTO
Sur quel ensemble (réel ou imaginaire) se trouve le spectre d'une matrice antisymétrique réelle $\mathcal{A}_n(\mathbb{R})$ ? Est-elle diagonalisable ?
### VERSO
Le spectre est inclus dans $i\mathbb{R}$ (imaginaires purs). Elle est diagonalisable sur $\mathbb{C}$.

## FLASHCARD 198 - Théorème spectral
### RECTO
Énoncer le théorème spectral pour les endomorphismes symétriques sur un espace euclidien, et la version matricielle correspondante.
### VERSO
Il existe une base orthonormée de vecteurs propres. La somme des sous-espaces propres est orthogonale et forme l'espace entier. Toute matrice symétrique réelle est ortho-semblable à une matrice diagonale ($A = P D P^{-1}$ avec $P \in \mathcal{O}_n(\mathbb{R})$).

## FLASHCARD 199 - Commutant symétrique
### RECTO
Si plusieurs endomorphismes symétriques commutent, que peut-on affirmer quant à leur réduction (co-ortho-diagonalisation) ?
### VERSO
Il existe une base orthonormée commune de vecteurs propres pour tous ces endomorphismes.

## FLASHCARD 200 - Rayleigh
### RECTO
Pour un endomorphisme symétrique $u$ de spectre ordonné $\lambda_1 \le \dots \le \lambda_n$, quel est l'encadrement du produit scalaire $\langle u(x), x \rangle$ (Quotient de Rayleigh) ?
### VERSO
$\lambda_1 \|x\|^2 \le \langle u(x), x \rangle \le \lambda_n \|x\|^2$.

## FLASHCARD 201 - Courant-Fischer
### RECTO
Comment s'exprime la valeur propre $\lambda_k$ d'un endomorphisme symétrique via le principe du Minimax de Courant-Fischer ?
### VERSO
$\lambda_k = \min_{\dim F=k} \max_{x \in F \setminus \{0\}} \frac{\langle u(x), x \rangle}{\|x\|^2} = \max_{\dim F=n-k+1} \min_{x \in F \setminus \{0\}} \frac{\langle u(x), x \rangle}{\|x\|^2}$.

## FLASHCARD 202 - Symétrique positive
### RECTO
Comment caractériser qu'un endomorphisme symétrique est positif (resp. défini positif) à l'aide de ses valeurs propres et de sa forme quadratique ?
### VERSO
Positif : $Sp(u) \subset \mathbb{R}^+ \iff \forall x, \langle u(x), x \rangle \ge 0$. Défini positif : $Sp(u) \subset \mathbb{R}^{+*} \iff \forall x \neq 0, \langle u(x), x \rangle > 0$.

## FLASHCARD 203 - Matrice de Gram
### RECTO
Définir la matrice de Gram $G$ d'une famille de vecteurs. Quelle est la particularité de $G$ et le lien entre son rang et celui de la famille ?
### VERSO
$G = (\langle x_i, x_j \rangle)$. $G$ est une matrice symétrique positive ($S_n^+(\mathbb{R})$). Son rang est égal au rang de la famille $(x_i)$. (Et toute matrice $S_n^+$ est une matrice de Gram pour le ps usuel).

## FLASHCARD 204 - Racine carrée matrice
### RECTO
Qu'affirme le théorème sur l'existence et l'unicité de la racine carrée d'une matrice symétrique positive ?
### VERSO
Pour toute matrice $A \in \mathcal{S}_n^+(\mathbb{R})$, il existe une *unique* matrice $B \in \mathcal{S}_n^+(\mathbb{R})$ telle que $B^2 = A$.

## FLASHCARD 205 - Décomposition polaire
### RECTO
Quelle est la décomposition polaire d'une matrice inversible $A \in GL_n(\mathbb{R})$ ? Et pour une matrice quelconque ?
### VERSO
Il existe un unique couple $(O, S)$ avec $O$ orthogonale et $S$ symétrique définie positive tel que $A = OS$. Si $A \notin GL_n(\mathbb{R})$, on a $A = OS$ avec $S$ symétrique positive, mais la décomposition n'est plus unique.

## FLASHCARD 206 - Norme opérateur
### RECTO
Comment exprimer la norme d'opérateur $\|u\|_{op}$ pour un endomorphisme symétrique $u$, puis pour un endomorphisme quelconque ?
### VERSO
Si $u$ est symétrique : $\|u\|_{op} = \max\{|\lambda| : \lambda \in Sp(u)\}$. Pour un endomorphisme quelconque : $\|u\|_{op} = \max\{\sqrt{\mu} : \mu \in Sp(u^* \circ u)\}$.

# CHAPITRE 17 - Probabilités

## FLASHCARD 207 - Continuité monotone
### RECTO
Traduire le principe de continuité croissante et décroissante pour une suite d'événements $(A_n)$.
### VERSO
Si la suite est croissante, $P(A_n) \to P(\cup A_n)$. Si la suite est décroissante, $P(A_n) \to P(\cap A_n)$.

## FLASHCARD 208 - Formule du crible
### RECTO
Quelle est l'expression de la formule du crible (formule de Poincaré) pour la réunion de $n$ événements $A_1 \cup \dots \cup A_n$ ?
### VERSO
$P(\bigcup A_i) = \sum_{k=1}^n (-1)^{k-1} \sum_{|I|=k} P(\bigcap_{i \in I} A_i)$.

## FLASHCARD 209 - Borel-Cantelli 1
### RECTO
Que stipule le premier lemme de Borel-Cantelli (condition de convergence) ?
### VERSO
Si la série $\sum P(A_n)$ converge, alors presque sûrement les événements $A_n$ ne se réalisent qu'un nombre fini de fois (la limite supérieure a une probabilité 0).

## FLASHCARD 210 - Borel-Cantelli 2
### RECTO
Que stipule le second lemme de Borel-Cantelli (condition de divergence et indépendance) ?
### VERSO
Si les événements $A_n$ sont *mutuellement indépendants* et que la série $\sum P(A_n)$ diverge, alors presque sûrement les événements $A_n$ se réalisent un nombre infini de fois (la limite supérieure a une probabilité 1).

## FLASHCARD 211 - Probabilités totales
### RECTO
Énoncer la formule des probabilités totales pour un événement $B$ et un système complet d'événements $(A_i)_{i \in I}$.
### VERSO
$P(B) = \sum_{i \in I} P(B \cap A_i) = \sum_{i \in I} P(B \mid A_i) P(A_i)$ (si $P(A_i) > 0$).

## FLASHCARD 212 - Bayes
### RECTO
Donner la formule de Bayes pour calculer $P(A_j \mid B)$ à partir d'un système complet d'événements $(A_i)$.
### VERSO
$P(A_j \mid B) = \frac{P(B \mid A_j)P(A_j)}{\sum_{i \in I} P(B \mid A_i)P(A_i)}$.

## FLASHCARD 213 - Cauchy-Schwarz Proba
### RECTO
Que donne l'inégalité de Cauchy-Schwarz probabiliste pour le moment de l'espérance du produit $E[XY]$ et la covariance ? Quel est le cas d'égalité ?
### VERSO
$(E[XY])^2 \le E[X^2]E[Y^2]$, d'où on déduit $\text{Cov}(X, Y)^2 \le V(X)V(Y)$. L'égalité a lieu ssi il existe une relation presque sûrement linéaire $Y = \lambda X$ (ou $X=0$ p.s.).

## FLASHCARD 214 - Variance somme
### RECTO
Comment s'exprime la variance d'une somme $\sum X_i$ de variables aléatoires ? Que devient cette formule si les variables sont décorrélées ou indépendantes ?
### VERSO
$V(\sum X_i) = \sum V(X_i) + 2 \sum_{i<j} \text{Cov}(X_i, X_j)$. Si les variables sont décorrélées (et a fortiori si indépendantes), $V(\sum X_i) = \sum V(X_i)$.

## FLASHCARD 215 - Loi jointe indépendance
### RECTO
Comment caractérise-t-on la loi jointe de variables mutuellement indépendantes ? Que dire de l'espérance de leur produit ?
### VERSO
La loi du n-uplet est le produit des lois (probabilité de l'intersection égale au produit des probabilités). L'espérance du produit est le produit des espérances : $E[X_1 \dots X_n] = E[X_1]\dots E[X_n]$.

## FLASHCARD 216 - Lemme des coalitions
### RECTO
Que stipule le lemme des coalitions pour des variables aléatoires mutuellement indépendantes $(X_1, \dots, X_n)$ ?
### VERSO
Des variables construites en regroupant par sous-ensembles disjoints d'indices via des fonctions (par ex. $f(X_1..X_m)$ et $g(X_{m+1}..X_n)$) sont mutuellement indépendantes.

## FLASHCARD 217 - Formule de transfert
### RECTO
Quelle est la formule de transfert pour calculer l'espérance d'une fonction d'une variable aléatoire discrète $f(X)$ ?
### VERSO
$E[f(X)] = \sum_{x \in E} f(x) P(X=x)$ (conditionné à l'absolue sommabilité).

## FLASHCARD 218 - Fonction génératrice
### RECTO
Comment définit-on la fonction génératrice $G_X(t)$ pour une variable à valeurs dans $\mathbb{N}$ ? Que vaut $G_{X+Y}$ si $X$ et $Y$ sont indépendantes ?
### VERSO
$G_X(t) = E[t^X] = \sum_{n=0}^{+\infty} P(X=n)t^n$ (rayon $\ge 1$). Si $X$ et $Y$ sont indépendantes, $G_{X+Y}(t) = G_X(t) G_Y(t)$.

## FLASHCARD 219 - Fonction caractéristique
### RECTO
Comment définit-on la fonction caractéristique $\varphi_X(t)$ d'une variable aléatoire et quelle est son utilité pour une somme de variables indépendantes ?
### VERSO
$\varphi_X(t) = E[e^{itX}]$. Elle détermine entièrement la loi, et pour des variables indépendantes, $\varphi_{X+Y}(t) = \varphi_X(t)\varphi_Y(t)$.

## FLASHCARD 220 - Espérance Variance usuelles
### RECTO
Rappeler l'espérance et la variance des trois lois discrètes classiques : Binomiale $B(n,p)$, Géométrique $\mathcal{G}(p)$, et de Poisson $\mathcal{P}(\lambda)$.
### VERSO
Binomiale : $E=np$, $V=np(1-p)$. Géométrique : $E=1/p$, $V=(1-p)/p^2$. Poisson : $E=\lambda$, $V=\lambda$.

## FLASHCARD 221 - Inégalités Proba
### RECTO
Énoncer les inégalités de Markov et de Bienaymé-Tchebychev pour des variables aléatoires (avec les hypothèses).
### VERSO
Markov (variable $X \ge 0$) : $P(X \ge a) \le \frac{E[X]}{a}$. Bienaymé-Tchebychev (variable avec moment d'ordre 2) : $P(|X - E[X]| \ge a) \le \frac{V(X)}{a^2}$.

## FLASHCARD 222 - LFGN
### RECTO
Énoncer la Loi Faible des Grands Nombres pour une suite $(X_n)$ de variables aléatoires indépendantes (ou décorrélées) de même loi avec moment d'ordre 2.
### VERSO
La moyenne empirique $\frac{1}{n} \sum_{i=1}^n X_i$ converge en probabilité vers $E[X_1]$ (pour tout $\varepsilon > 0$, $P(|\frac{S_n}{n} - E[X_1]| \ge \varepsilon) \to 0$ quand $n \to +\infty$).































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































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

