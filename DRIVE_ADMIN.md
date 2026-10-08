# 📦 Drive intégré — guide administrateur

Le site embarque un mini « Drive » : des **onglets** (ex. *Anglais*) qui contiennent des
**dossiers** et des **fichiers** (texte, Markdown, **LaTeX**, images, PDF, archives…).

* **Toi (administrateur)** : tu crées les onglets, tu ajoutes/modifies les fichiers, puis tu
  cliques sur **📤 Publier** → tout est commité directement dans ce dépôt GitHub
  (dossier `content/drive/`).
* **Les autres utilisateurs** : ils voient les mêmes onglets en **lecture seule**, avec la
  **date d'import** de chaque fichier, un bouton **⬇ Télécharger**, et une **pastille bleue**
  sur les nouveautés (elle disparaît dès qu'ils ouvrent le fichier).

---

## 1. Qui est administrateur ?

La liste blanche est en haut du fichier [`js/06_drive_store.js`](js/06_drive_store.js) :

```js
const CFG = {
  admins: ['jb.cedric0@gmail.com', 'lolmacteur1@gmail.com'],
  owner: 'englishPV',
  repo: 'englishPV.github.io',
  branch: 'main',
  dir: 'content/drive',
  ...
};
```

L'administrateur doit être **connecté avec Google** dans l'app (bouton 🔄 en haut à droite).
Si l'email du compte Google connecté figure dans `admins`, la barre d'onglets affiche alors :

* le bouton **＋** (créer un onglet),
* la barre d'outils **Texte / LaTeX / Markdown / Dossier / Importer**,
* les actions **✏️ Renommer · 📂 Déplacer · 🗑 Supprimer**,
* le bouton **📤 Publier**.

Tout le monde voit les onglets ; seuls les administrateurs voient ces outils.
Pour ajouter/retirer un admin : modifie la liste puis repousse le fichier sur GitHub.

---

## 2. Créer le token GitHub (une seule fois, ~2 minutes)

La publication se fait **depuis ton navigateur** vers l'API GitHub : il faut donc un
**fine-grained personal access token**. Il est stocké **uniquement dans le `localStorage` de
ton navigateur** — il n'est jamais écrit dans le code, jamais publié, jamais visible par les
autres utilisateurs.

1. Ouvre <https://github.com/settings/personal-access-tokens/new>
2. **Token name** : `drive-englishpv`
3. **Expiration** : à ta convenance (90 jours ou « No expiration »)
4. **Repository access** → *Only select repositories* → **englishPV/englishPV.github.io**
5. **Permissions → Repository permissions → Contents** = **Read and write**
   (c'est la seule permission nécessaire)
6. **Generate token**, copie le token (`github_pat_…`)
7. Dans l'app : onglet Drive → **⚙️** → **🔑 Token GitHub**, ou clique sur **📤 Publier**
   (la fenêtre du token s'ouvre automatiquement la première fois) → colle → **✔ Tester & enregistrer**

> 🔒 Bonnes pratiques : n'utilise pas ce token ailleurs, ne le mets pas dans un email/chat,
> et révoque-le sur <https://github.com/settings/tokens> si ton appareil est compromis.
> Le « vrai » garde-fou reste le token : sans lui, personne ne peut publier, même en
> modifiant le JavaScript dans son navigateur.

---

## 3. Utilisation courante

| Action | Où |
|---|---|
| Créer un onglet (ex. « Anglais ») | barre d'onglets → **＋** |
| Ouvrir un onglet | clic sur l'onglet |
| Créer un fichier texte / Markdown / LaTeX | barre d'outils du Drive |
| Créer un dossier | **📁 Dossier** |
| Importer des fichiers (images, PDF, zip…) | **⬆️ Importer** ou **glisser-déposer** dans la liste |
| Renommer / déplacer / supprimer | boutons ✏️ 📂 🗑 sur la ligne |
| Lire un PDF (zoom, plein écran) | clic sur le fichier → barre du lecteur : `‹ 3/12 ›` · `− 128 % +` · **Largeur** · ⟳ · ⛶ |
| Télécharger | **⬇** sur la ligne (tout le monde) |
| Publier vers GitHub | **📤 Publier** (barre d'onglets, barre du bas, ou ⚙️) |
| Recharger depuis GitHub | **🔄** |
| Renommer/supprimer un onglet, gérer le token, resynchroniser | **⚙️** |
| Revenir à la page Main | bouton **← Retour** (remonte d'un niveau, puis quitte le Drive) ou onglet **🏠 Main** |

**Rien n'est envoyé avant que tu cliques sur « Publier ».** Les fichiers en attente sont
signalés par un point orange sur la ligne et par le badge du bouton 📤.

---

## 4. Ce qui est écrit dans le dépôt

```
content/drive/
├── manifest.json              ← index : onglets, arborescence, dates, tailles, chemins
└── anglais-x7k2/              ← un dossier par onglet (slug + suffixe unique)
    ├── Chapitre 1 - Democracy/
    │   ├── cours-01.tex
    │   └── schema.png
    └── notes.md
```

* La publication crée **un seul commit atomique** via l'API *Git Data*
  (`blobs` → `tree` → `commit` → `refs`), avec comme auteur ton compte Google.
* Les renommages/déplacements/suppressions sont propagés (l'ancien chemin est supprimé).
* Les noms de fichiers sont nettoyés pour git (`:`, `/`, `*`, `?`, `"` … → `-`) et
  dédoublonnés automatiquement (`cours (2).tex`).
* `.nojekyll` est présent à la racine pour que GitHub Pages serve les fichiers **tels quels**
  (sinon Jekyll transformerait les `.md` en `.html`).
* Les visiteurs lisent `content/drive/manifest.json` depuis GitHub Pages, avec **repli
  automatique sur `raw.githubusercontent.com`** pendant la minute que prend le redéploiement.

---

## 5. LaTeX : ce qui compile

Les fichiers `.tex` / `.latex` sont **compilés dans le navigateur** (rendu HTML + MathJax),
avec une bascule **Rendu / Source**, un bouton **🖨 PDF** (impression navigateur) et
**⬇ Télécharger**.

**Pris en charge** : préambule ignoré proprement, `\maketitle`, `\tableofcontents`,
`\part/\chapter/\section/\subsection/\subsubsection` (numérotés, `\appendix`),
`itemize/enumerate/description` (imbriqués), `tabular/longtable` (`\hline`, `\multicolumn`,
alignements `lcr`, `p{}`), `figure/table` + `\caption` + numérotation,
`equation/align/gather/multline/eqnarray/cases/array/matrix…` (numérotées, `\notag` géré),
toutes les maths inline `$…$`, `\(…\)`, `$$…$$`, `\[…\]`,
`verbatim/lstlisting/\verb`, `theorem/lemma/definition/proof/exemple…`, `\footnote`,
`\ref/\eqref/\label/\cite` + `thebibliography`, `\href/\url`, `\includegraphics`
(l'image est retrouvée dans le Drive, sinon dans `images/`), `\textbf/\emph/\texttt/\textsc/
\underline/\textcolor`, macros `\newcommand`/`\def` (avec arguments, y compris **dans** les
formules), accents `\'e \c{c} \^o`, `~`, `--`, `---`, `\today`.

**Non compilable** (affiché proprement avec un avertissement) : `tikzpicture`/PGF (le code
source est affiché), packages purement typographiques, et tout macro inconnue (elle est
signalée dans « ⚠️ avertissements de compilation » en bas du document, son argument reste
lisible). Pour un PDF parfait, garde le bouton **🖨 PDF** ou compile le `.tex` téléchargé.

---

## 6. PDF : lecture confortable (téléphone compris)

Les PDF sont rendus **dans la page** par un lecteur maison
([`js/11_drive_pdf.js`](js/11_drive_pdf.js), basé sur PDF.js), et non plus par
l'aperçu natif du navigateur dans une `<iframe>`.

| Problème avant | Maintenant |
|---|---|
| Sur téléphone, la page s'affichait à sa taille réelle → il fallait **glisser vers la droite/gauche** pour lire une ligne entière | La page est **ajustée à la largeur** de l'écran dès l'ouverture (le réglage est mémorisé) |
| Aucun moyen de zoomer sur mobile | **Pincement à deux doigts**, **double-tap** (largeur ⇄ ×2,4), boutons `−` / `%` / `+` |
| Sur ordinateur, le menu ⋮ de l'aperçu natif ouvrait des options sans effet dans une iframe | Barre d'outils du site : `Ctrl + molette` pour zoomer, `R` pour pivoter, `F` pour le plein écran |
| Impossible de passer en plein écran au doigt | Bouton **⛶** : plein écran natif, avec repli « fenêtre maximisée » sur iPhone (où l'API plein écran n'existe pas pour un simple conteneur) |
| L'aperçu cassait pendant la minute de redéploiement GitHub Pages | Le fichier est téléchargé par le Drive (Pages → `raw.githubusercontent.com` en repli), avec **cache HTTP** : la réouverture est instantanée |
| L'en-tête du fichier (nom, date, taille, auteur, chemin) et les boutons *Télécharger* / *Nouvel onglet* mangeaient le tiers d'un écran de téléphone, sans moyen de les faire disparaître | Ils se **replient** d'un chevron ▸ et **s'effacent dès qu'on fait défiler** le document — un geste vers le haut, ou le retour en haut de page, les fait revenir |

Détails utiles :

* **Trois ajustements** — bouton *Largeur* : `Largeur` → `Page entière` → `100 %`.
  Dès que l'utilisateur zoome à la main, le mode passe en *Libre* et l'échelle est
  conservée ; le bouton `%` (ou la touche `W`) revient à la largeur.
* **Navigation** — `‹ 3 / 12 ›`, champ de numéro modifiable, `PageUp`/`PageDown`,
  `Home`/`End`. La page courante est suivie pendant le défilement.
* **Rendu paresseux** — seules les pages proches de l'écran sont dessinées
  (canvas à la résolution de l'écran, plafonnée à ×2,5) ; les pages éloignées de
  plus de 6 écrans sont **libérées** : un gros PDF ne sature pas la mémoire d'un
  téléphone.
* **Texte sélectionnable** sur ordinateur (couche texte) → `Ctrl + F` fonctionne
  dans le document. Elle est désactivée sur téléphone pour ne pas accrocher les
  gestes.
* **Toute la place à la page** — sur téléphone (≤ 900 px ou écran tactile), les
  informations du fichier sont repliées par défaut (chevron ▸ pour les rouvrir ;
  le choix est mémorisé dans `pv_drive_fileinfo`) et l'en-tête, ses boutons et la
  barre d'onglets du Drive s'effacent pendant le défilement (classe `chrome-min`
  sur `#app`). Le lecteur se **réajuste tout seul** quand l'espace change
  (`ResizeObserver`) — sans re-dessiner les pages si l'échelle ne bouge pas.
* **PDF protégé** — un champ mot de passe apparaît dans le lecteur.
* **Poids** — PDF.js (build *legacy* 3.11.174, `vendor/pdfjs/`, ~1,5 Mo) n'est
  téléchargé **qu'au premier PDF ouvert**, jamais au démarrage du site.
* **Repli automatique** — si PDF.js ne peut pas être chargé ou si le fichier est
  illisible, l'ancien aperçu natif (`<iframe>`, avec `#view=FitH`) reprend la main
  et un message l'explique. « Télécharger » et « Nouvel onglet » restent
  disponibles dans tous les cas.
* Mise à jour de PDF.js : voir [`vendor/pdfjs/README.md`](vendor/pdfjs/README.md).

---

## 7. Pastilles bleues (nouveautés)

* Un **badge bleu** apparaît sur l'onglet tant qu'il contient des fichiers non ouverts,
  avec le nombre exact.
* Dans la liste, chaque nouveau fichier porte une **pastille bleue** (et la ligne est
  légèrement teintée).
* Ouvrir le fichier efface sa pastille ; le compteur de l'onglet se met à jour aussitôt.
* L'état « vu » est stocké **par appareil** (`localStorage`) : chaque utilisateur a ses
  propres pastilles, et l'admin ne voit pas ses propres ajouts comme « nouveaux ».
* Une notification s'affiche au chargement quand du contenu a été publié depuis la dernière
  visite ; la liste est revérifiée toutes les 3 minutes.

---

## 8. Dépannage

| Symptôme | Cause / solution |
|---|---|
| `GitHub 401` | token expiré ou mal copié → ⚙️ → 🔑 Token GitHub |
| `GitHub 403` | le token n'a pas **Contents: Read and write** sur ce dépôt |
| `GitHub 404` | mauvais dépôt/branche, ou token limité à d'autres dépôts |
| `GitHub 409` | la branche a bougé pendant la publication → reclique sur **Publier** |
| `GitHub 422` | fichier trop gros (> 100 Mo) ou chemin refusé par GitHub |
| Les autres ne voient rien après publication | GitHub Pages redéploie en ~1 min ; le bouton **🔄** force la relecture (repli sur `raw.githubusercontent.com`) |
| Un fichier ne s'ouvre pas | le chemin a changé entre-temps → **🔄** ; ou ⚙️ → **Resynchroniser depuis GitHub** |
| Onglets invisibles | aucun contenu publié **et** pas connecté avec un compte admin |
| « Aperçu simplifié » sur un PDF | PDF.js n'a pas pu être chargé (réseau coupé, bloqueur de scripts) → l'aperçu natif prend le relais ; **🔄** pour réessayer |
| PDF illisible / corrompu | le fichier importé n'est pas un vrai PDF, ou il est protégé → saisis le mot de passe demandé, ou utilise **⬇ Télécharger** |
| Le menu ☰ semblait ne rien faire | corrigé : le tiroir passe au-dessus des calques, ferme les modales/lightbox à l'ouverture, et sortir du Drive est fait avant chaque action du menu |

⚙️ → **Resynchroniser depuis GitHub** remplace ta copie locale par la version publiée
(utile si tu publies depuis plusieurs appareils). À éviter si tu as des modifications
non publiées.

---

## 9. Tests automatisés

Quatre suites hors-ligne (Node ≥ 18) couvrent tout le Drive sans jamais toucher au dépôt :

| Suite | Ce qu'elle vérifie |
|---|---|
| `tex_test.mjs` | le compilateur LaTeX : sommaire, sections numérotées, équations, `\notag`, `\ref`/`\eqref`, tableaux et légendes, théorèmes/preuves, verbatim, accents, macros, tikzpicture — **dont le vrai `fiche-revision.tex` publié** |
| `store_test.mjs` | les droits (admin / lecteur), le CRUD, les pastilles bleues, l'encodage des URL (espaces, accents), IndexedDB, et une publication complète contre une API GitHub simulée |
| `ui_test.mjs` | l'interface : lecteur **non-admin sur le contenu réellement publié dans `content/drive/`** (lecture seule, dates, rendu LaTeX, téléchargement, lightbox, retours), puis le parcours admin (onglet → dossier → éditeur LaTeX → import d'image → token → publication) |
| `pdf_test.mjs` | le lecteur PDF : ajustement **largeur** par défaut, zoom `+`/`−` borné, cycles *Largeur → Page entière → 100 %*, rotation, navigation (boutons, champ de page, `PageUp/Down`, `Home/End`), raccourcis clavier, `Ctrl` + molette, **pincement** et **double-tap** simulés, couche texte selon le pointeur, rendu paresseux et offsets de défilement, mot de passe, repli `<iframe>`, libération à la destruction, contrat `onScroll`/`ResizeObserver`
  avec le Drive (en-tête qui s'efface, recadrage sans rendu superflu) et les règles CSS/JS
  du repli de l'en-tête — plus le **décodage des vrais PDF publiés** par le PDF.js du dépôt et le câblage du menu latéral (`exitDrive`, z-index du tiroir) |

Elles vivent hors du dépôt (aucune dépendance ajoutée au site) :

```bash
cd /chemin/hors-dépôt/_tests
npm install jsdom fake-indexeddb
node tex_test.mjs && node store_test.mjs && node ui_test.mjs && node pdf_test.mjs
# ✅ 84 + 128 + 126 + 157 assertions
```

Le serveur fictif des tests lit les fichiers **sur le disque** et décode les URL comme le
ferait GitHub Pages : un chemin mal encodé y produit donc un vrai 404.
