# Flashcards · Physique & Maths

Application web de révision par répétition espacée (algorithme **FSRS**) : plus de
1 000 flashcards de physique et de mathématiques, support **LaTeX** complet (MathJax),
tableau de bord statistique global, synchronisation cloud optionnelle et « Drive » de
documents publiés depuis GitHub.

Site : <https://englishpv.github.io> · Emploi du temps : <https://schedulepv.web.app>

---

## Stack

| Élément | Détail |
| --- | --- |
| Type | Site statique (HTML + CSS + JavaScript vanilla, aucune étape de build) |
| Hébergement | GitHub Pages (`main` = production, `.nojekyll`) |
| Police | Inter variable, **auto-hébergée** (`fonts/`, 48 Ko, aucune requête tierce) |
| Formules | MathJax 3 chargé à la demande |
| PDF | **PDF.js 3.11 auto-hébergé** (`vendor/pdfjs/`), chargé à la demande — lecteur maison avec zoom |
| Sync | Firebase Realtime Database + Google Auth (optionnel) |
| Stockage local | `localStorage` (données) + IndexedDB (médias importés) |
| Mon Drive | Google Drive **personnel** de l'utilisateur (OAuth `drive.file`), optionnel — dossier `EnglishPV` |

## Structure

```
index.html                     coquille de l'application (barre latérale + barre d'app)
css/01_styles_theme_and_layout.css   design tokens, reset, coquille, primitives UI
css/02_drive.css               module Drive (onglets, listes, lecteur, éditeur)
css/03_modern.css              composants applicatifs (listes, stats, révision, QCM, réglages)
css/04_insights.css            pages défilantes : réglages, tableau de bord, menu Cartes
js/00_icons.js                 jeu d'icônes SVG inline (aucune requête réseau)
js/01..08_*.js                 logique applicative (sync, données, SRS, UI, Drive)
js/09_shell.js                 navigation latérale, tiroir mobile, raccourcis clavier
js/10_insights.js              statistiques globales + navigateur de cartes multi-chapitres
js/11_drive_pdf.js             lecteur PDF du Drive (ajustement largeur, zoom, rotation)
js/12_voice.js                 révision à la voix (Web Speech API, évaluation, réglages)
js/13_perso_drive.js           « Mon Drive » : Google Drive personnel de chaque utilisateur
js/14_media_library.js         bibliothèque d'images (galerie, usage par carte, sélecteur)
js/15_import_wizard.js         assistant d'import + moteur du format « pv-import »
css/05_voice.css               mode vocal : micro, bandeau d'état, correction colorée
css/06_library.css             images, Mon Drive, assistant d'import
vendor/pdfjs/                  PDF.js 3.11 (copie locale, chargée au premier PDF ouvert)
fonts/                         Inter variable (woff2, subset latin)
images/ · content/drive/       médias et documents publiés
```

## Vues

| Vue | Contenu |
| --- | --- |
| **Mes decks** | chapitres, dossiers (regroupements), import, accès direct aux stats et réglages |
| **Cartes** | navigateur global : sélecteurs matière / chapitre, filtres de niveau et de type, recherche, tri, révision directe — un chapitre ouvert est simplement présélectionné |
| **Images** | bibliothèque de toutes les images importées : vignettes, recherche, poids, **nombre de cartes qui utilisent chaque image** (clic → liste des cartes, édition directe), import de nouvelles images, suppression protégée |
| **Mon Drive** | espace **personnel** de l'utilisateur connecté à Google : dossier « EnglishPV » de son propre Drive, dépôt de fichiers de tout type (glisser-déposer), téléchargement, renommage, suppression, réutilisation d'une image dans une carte |
| **Statistiques** | tableau de bord global (période 7 j → 1 an) : KPI, donut des niveaux, activité quotidienne, carte de chaleur, prévisions FSRS, progression par chapitre, cartes difficiles, médias et stockage — export CSV |
| **Paramètres** | toujours accessibles, avec ou sans chapitre : onglet *Application* (apparence, typographie, révision, voix, **Mon Drive**, synchronisation, données) et onglet *Chapitre* (nom, emoji, filtres, session, échéance, voix pour l'anglais, danger) |

Sans chapitre sélectionné, **Cartes**, **Statistiques** et **Paramètres** s'ouvrent sur
leur version globale ; la barre latérale ne désactive plus que la *Révision*, qui a
besoin d'un chapitre pour construire sa file.

### Ordre des decks

La liste des chapitres et des dossiers est triée automatiquement :

1. les **dates limites** les plus proches d'abord ;
2. puis la **dernière activité** : réviser un chapitre (ou une de ses cartes), ou y
   ajouter/modifier une carte, le fait **remonter tout en haut** du deck.

L'horodatage vit dans le chapitre (`lastUsed`) ; s'il manque (sauvegarde ancienne ou
poussée depuis un autre appareil), l'ordre est reconstruit depuis `lastReviewed` des
cartes puis depuis le journal de révisions (`stats.dailyLog`). `reconcile()` conserve
désormais ces champs — réglages de chapitre, date limite, `lastUsed` et **état FSRS
des cartes** — au lieu de les réinitialiser, ce qui remettait les decks au milieu
après un rechargement ou une synchronisation.

## Design system

Les jetons sont définis une seule fois dans `:root` (`css/01_…css`) et se déclinent en
thème sombre (défaut) et clair via `[data-theme="light"]` :

- **Couleurs** — `--bg`, `--surface` (1/2/3), `--border`, `--text`, `--muted`, `--faint`
- **Accent** — `--primary` (+ `-soft`, `-line`, `--on-primary`), personnalisable dans les réglages
- **Typographie** — `--font-sans`, `--fs-term`, `--fs-def`, chiffres tabulaires pour les stats
- **Espacements** — échelle `--sp-1 … --sp-8` (4 → 40 px)
- **Rayons** — `--radius-xs … --radius-xl`, `--radius-full`
- **Ombres** — `--shadow-1 … --shadow-3`, `--inset-hi`, `--glass` (barres translucides)
- **Mouvement** — `--ease`, `--ease-out`, `--spring`, `--t-fast/base/slow`

Composants prêts à l'emploi : `.btn` (+ `--primary`, `--solid`, `--outline`, `--ghost`,
`--red/--amber/--blue/--green`, `--sm`, `--tiny`, `--icon`), `.icon-btn`, `.input`,
`.chip`, `.card`, `.stat-card`, `.legend-item`, `.dmodal`, `.toast`, `.empty`, `.ico`.

## Révision à la voix (chapitres d'anglais)

Un bouton **micro** apparaît sur les chapitres d'anglais (page du chapitre et
pendant la révision). Une fois activé, il reste allumé : d'une carte à l'autre,
d'une session à l'autre, y compris après « Continuer la révision ». Il ne
s'éteint que si on réappuie dessus ou si on quitte la révision (et il se rallume
tout seul en revenant).

Exception : si le navigateur n'arrive pas à écouter (service de reconnaissance
injoignable, micro absent ou occupé, micro qui ne démarre jamais), le micro ne
boucle pas. Après **2 tentatives ratées de suite**, il s'arrête : le motif
s'affiche sur le bandeau (révision et page du chapitre), sur le bouton et dans
les réglages. Il reste éteint en revenant sur la révision, et un nouvel appui
sur le micro relance l'essai. Un micro introuvable ou une langue non prise en
charge arrêtent tout de suite. Un silence normal ne compte pas comme un échec, et
une parole reconnue remet le compteur à zéro.

| Étape | Comportement |
| --- | --- |
| Réponse dite juste | Carte validée automatiquement, réponse affichée en vert, passage à la suivante après le délai réglé (1,2 s par défaut, 0–3 s) |
| Réponse fausse | La carte se retourne : les mots corrects restent normaux, **les mots manquants ou faux passent en rouge**, avec « ce que le micro a entendu » mot à mot |
| Notation | Aucune auto-évaluation : la note est calculée sur le nombre de formes justes (2 formes sur 3 → **note 2,33**) puis transmise à FSRS, qui interpole la note fractionnaire |
| Continuer | Mauvaise carte → **Réessayer** (aucune note conservée) ou **Carte suivante**. Bonne carte → clic ou fin du décompte |

Le moteur est la **Web Speech API** du navigateur (Chrome/Edge : moteur Google ;
Safari : dictée Apple ; Firefox : non supporté, l'interface se désactive proprement).
Aucun modèle à télécharger, aucune clé API, aucun serveur.

L'évaluation (`js/12_voice.js`) est indépendante de la reconnaissance :

- découpage de la réponse en **tiroirs** — une liste de verbes irréguliers
  (`bear / bore / borne/born`) exige chaque forme, `borne/born` et les virgules
  sont des variantes acceptées, alors qu'en vocabulaire les ` / ` sont des
  traductions alternatives ;
- **alignement flou** mot à mot (distance d'édition + squelette phonétique pour
  les homophones *blew / blue*), mots outils (`to`, `a`, `the`…) jamais pénalisés,
  parenthèses `(GB)`, `(USA)` et `sb` / `sth` ignorées ;
- tolérance réglable : **Stricte / Normale / Souple**, langue reconnue
  (automatique, anglais UK/US ou français pour les chapitres en sens inverse).

Réglages : *Paramètres → Application* (et onglet *Chapitre* des chapitres
d'anglais) · délai avant la carte suivante, tolérance, langue, affichage de la
phrase reconnue, bouton **Tester le micro**.

## Importer : fichiers ou texte écrit (format « pv-import »)

Le bouton **Importer** (deck, menu latéral *Cartes* ou *Paramètres → Données*) ouvre un
assistant à trois onglets :

| Onglet | Contenu |
| --- | --- |
| **Fichier** | glisser-déposer ou sélection : **Anki `.apkg`**, **`.csv` / `.tsv`**, **`.json`**, **`.pv` / `.txt`**, **images** |
| **Texte / JSON** | zone de texte : on écrit les matières, chapitres et cartes à la main ; aperçu en direct (matières / chapitres / cartes / images) + erreurs et avertissements |
| **Format** | cette spécification, dans l'application (avec exemples prêts à copier) |

### 1. Où vont les cartes ?

- Une **matière** du même nom (insensible à la casse et aux accents) existe déjà → elle est
  réutilisée ; sinon elle est créée (et devient la matière courante).
- Un **chapitre** du même titre existe déjà dans cette matière → les cartes **s'y ajoutent** ;
  sinon le chapitre est créé (emoji et date limite appliqués).
- Rien n'est jamais écrasé : l'import **ajoute** seulement. L'option « Ignorer les doublons »
  (cochée par défaut) évite d'ajouter deux fois la même carte (même recto **et** même verso).
- Les chapitres ainsi créés sont marqués *importés* : ils se suppriment d'un bloc depuis le deck.

### 2. JSON complet (recommandé)

```json
{
  "format": "pv-import",
  "version": 1,
  "matieres": [
    {
      "nom": "Anglais",
      "chapitres": [
        {
          "titre": "Verbes irréguliers",
          "emoji": "💂",
          "dateLimite": "2026-12-31",
          "cartes": [
            { "recto": "porter", "verso": "bear / bore / borne|born" },
            { "recto": "vendre", "verso": "sell / sold / sold" },
            { "recto": "![ours](img://ours.png)", "verso": "a bear" }
          ]
        },
        {
          "titre": "Vocabulaire politique",
          "cartes": [
            { "recto": "an autocrat", "verso": "un autocrate\ndeep state: l'État profond" }
          ]
        }
      ]
    }
  ]
}
```

| Champ | Alias acceptés | Rôle |
| --- | --- | --- |
| `format`, `version` | — | facultatifs, purement informatifs |
| `matieres[]` | `subjects` | liste de matières (sinon `matiere` + `chapitres` à la racine, sinon un simple tableau) |
| `nom` | `matiere`, `subject`, `title`, `titre` | nom de la matière |
| `chapitres[]` | `chapters`, `chapter` | chapitres de la matière |
| `titre` | `title`, `nom`, `name` | titre du chapitre |
| `emoji` | `icone`, `icône` | emoji affiché dans le deck |
| `dateLimite` | `date`, `deadline`, `echeance`, `échéance` | **AAAA-MM-JJ** ; active l'objectif du jour et remonte le chapitre en haut du deck |
| `cartes[]` | `cards`, `carte`, `card` | liste de cartes |
| `recto` | `front`, `question`, `terme`, `face` | face avant |
| `verso` | `back`, `reponse`, `réponse`, `definition`, `définition` | face arrière |
| `imageRecto` | `rectoImage`, `image`, `img`, `illustration` | image ajoutée au recto (voir §4) |
| `imageVerso` | `versoImage`, `imageArriere` | image ajoutée au verso |

**Raccourcis de carte** : `"recto | verso"` (chaîne) ou `["recto", "verso"]` (liste) remplacent
l'objet. Dans une chaîne JSON, `\n` passe à la ligne et `\|` écrit un « | » littéral.

### 3. Format « PV-Lignes » (à taper à la main)

```
# commentaire (# ou // en début de ligne)
@matiere Anglais
@chapitre Verbes irréguliers {emoji: 💂, date: 2026-12-31}
porter | bear / bore / borne
vendre | sell / sold / sold
prendre | take / took / taken
@chapitre Vocabulaire politique
![ours](img://ours.png) | a bear
an autocrat | un autocrate

@matiere Maths
@chapitre Intégrales
dérivée de x² | 2x
@fin
```

- `@matiere Nom` — ouvre ou crée la matière. Sans cette ligne (ou avant), les cartes vont dans « Import ».
- `@chapitre Titre {emoji: 💂, date: 2026-12-31}` — ouvre ou crée le chapitre ; les options entre accolades sont facultatives.
- `recto | verso` — une carte par ligne. Le recto peut contenir une image (§4).
- `@fin` — referme la matière courante. Le format est détecté automatiquement (le texte commence par `{` ou `[` → JSON, sinon PV-Lignes).

### 4. Images

Quatre écritures, reconnues dans n'importe quel champ texte :

| Écriture | Source |
| --- | --- |
| `![légende](img://ours.png)` ou `{img: img://ours.png}` | une image **déjà importée** (onglet **Images**) ; le nom suffit : `img://ours` trouve `ours.png` |
| `![légende](https://exemple.fr/photo.jpg)` | une image **en ligne** (URL directe) |
| `![légende](data:image/png;base64,…)` | une image **collée en base64** (petites images) |
| `![légende](drive://nom.png)` | un fichier de **Mon Drive** : téléchargé et enregistré dans l'appli à l'import |

Toute image utilisée par une carte est stockée dans l'appli (IndexedDB) : la carte s'affiche
même hors connexion. Une image introuvable ne bloque pas l'import : elle est signalée en
avertissement et l'écriture d'origine reste visible dans la carte (il suffit de l'importer
dans l'onglet **Images** puis de relancer l'import).

### 5. Erreurs et avertissements

- **Erreurs** (bloquent l'import, listées avec le numéro de ligne) : JSON invalide, carte sans
  recto/verso, ligne sans « | », directive `@…` inconnue, matière ou chapitre sans nom.
- **Avertissements** (n'empêchent pas l'import) : date mal formée (ignorée), chapitre vide,
  image introuvable, aucune matière déclarée (repli sur « Import »).

## Images

Onglet **Images** (menu latéral, bouton *Images* du deck, ou *Paramètres → Bibliothèque d'images*) :

- **galerie** de toutes les images importées, triées de la plus récente à la plus ancienne, avec
  recherche par nom, poids et **nombre de cartes qui utilisent chaque image** ;
- **clic sur une image** → aperçu + liste des cartes utilisatrices (matière, chapitre, recto/verso) ;
  un clic sur une ligne ouvre **l'éditeur de cette carte** ;
- **Importer** : un ou plusieurs fichiers image (glisser-déposer possible) ; si *Mon Drive* est
  connecté, les images sont aussi copiées dans le dossier personnel du Drive ;
- **Mon Drive** : insère une image déjà présente dans le Drive de l'utilisateur ;
- **Supprimer** : propose une confirmation renforcée si l'image est utilisée par des cartes.

Dans l'**éditeur de carte** (bouton crayon d'une carte, ou « Nouvelle carte »), le bouton
**Image** insère `<img src="media://clé">` au curseur, dans le recto **ou** le verso. Les
vignettes sous chaque zone listent les images de la face courante et la croix `×` les retire.
Toutes les cartes sont modifiables : texte **et** images.

## Mon Drive personnel (Google Drive)

Chaque utilisateur peut **connecter son propre compte Google** et dispose alors de son espace :
un dossier **`EnglishPV`** créé dans *son* Drive — visible sur `drive.google.com`, sur tous ses
appareils, et **strictement privé** (l'application n'utilise que la portée
`https://www.googleapis.com/auth/drive.file` : elle ne voit que les fichiers qu'elle a créés).

- Vue **Mon Drive** : dépôt par glisser-déposer de **tout type de fichier** (PDF, images, textes,
  audio, vidéo, archives…), liste avec nom / poids / date, téléchargement, renommage, suppression,
  ouverture dans Drive, et « utiliser comme image de carte » (copie dans la bibliothèque locale).
- Les images importées localement sont aussi **copiées dans le Drive** quand la connexion est
  active (miroir automatique, sans blocage de l'interface).
- Le **jeton d'accès reste en mémoire** du navigateur (jamais écrit sur le disque) ; seule la
  liste des fichiers (nom, taille, date) est enregistrée dans les données, donc synchronisée
  entre appareils comme le reste.
- Hors connexion, la liste en cache reste consultable ; les fichiers se rechargent au prochain
  clic sur *Connecter*.

### Configuration (une fois, ~5 minutes)

1. **console.cloud.google.com** → projet **`englishpv-b6727`** (celui de la synchronisation Firebase).
2. **APIs & Services → Library** → *Google Drive API* → **Enable**.
3. **APIs & Services → OAuth consent screen** : type *External*, nom de l'app, e-mail de support ;
   dans *Scopes*, ajouter `https://www.googleapis.com/auth/drive.file` ; dans *Test users*, ajouter
   les adresses Google qui utiliseront la fonctionnalité. Pour un usage ouvert à tous, cliquer
   **Publish app**.
4. **APIs & Services → Credentials → Create credentials → OAuth client ID → Web application** :
   *Authorized JavaScript origins* = `https://englishpv.github.io` (+ `http://localhost:8000` pour
   tester en local) → **Create**.
5. Copier l'identifiant `…apps.googleusercontent.com` puis le coller soit dans
   **Paramètres → Mon Drive → Identifiant client Google**, soit une fois pour toutes dans
   `js/13_perso_drive.js` (champ `CFG.clientId`).
6. Cliquer **Connecter** : Google demande l'autorisation ; le dossier `EnglishPV` est créé au
   premier envoi. Chaque personne obtient son propre espace, avec son propre compte.

Tant que l'étape 5 n'est pas faite, la connexion reste **désactivée** (un bandeau renvoie vers la
procédure) — le reste de l'application fonctionne normalement.

## Statistiques

Les statistiques sont recalculées localement (aucun serveur) à partir des compteurs
`dailyReviews`, `dailyDurMs`, `dailyChanges` et des journaux `dailyLog` conservés
180 jours par `pruneStats()`. La rétention moyenne et les prévisions utilisent
directement le modèle FSRS (`stability`, `difficulty`, `dueAt`).

| Touche | Action |
| --- | --- |
| `⌘/Ctrl` + `K` ou `/` | Rechercher une carte |
| `Espace` / `Entrée` (révision) | Retourner la carte (mode vocal : « je ne sais pas », puis carte suivante) |
| `R` (mode vocal, correction affichée) | Réessayer la carte |
| `1` `2` `3` `4` (révision) | Échec · Difficile · Bien · Facile |
| `Maj` + molette | Agrandir / réduire la police (équivalent du pincement tactile) |
| `Ctrl` + molette (lecteur PDF) | Zoomer / dézoomer dans le PDF |
| `+` `−` `W` `R` `F` (lecteur PDF) | Zoomer · dézoomer · ajuster à la largeur · pivoter · plein écran |
| `PageUp` / `PageDown` (lecteur PDF) | Page précédente / suivante |
| `Échap` | Fermer le tiroir, les menus, la visionneuse d'images et le plein écran du PDF |

Sur téléphone, un PDF ouvert dans le Drive s'ajuste **à la largeur de l'écran** :
plus besoin de glisser vers la droite. Le zoom se fait au pincement (deux doigts)
ou par double-tap, et le bouton ⛶ bascule le lecteur en pleine fenêtre.

Sur ordinateur, `Maj` + molette agit sur la face survolée en révision (recto ou verso)
et sur les deux tailles ailleurs ; un petit indicateur affiche la valeur courante. La
grille de cartes suit également ces deux réglages.

## Développement

Aucune dépendance : ouvrez simplement `index.html`, ou servez le dossier localement.

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## Publication

1. Les modifications de contenu peuvent être publiées directement depuis l'app
   (onglet Drive → **Publier**, voir `DRIVE_ADMIN.md`).
2. Les modifications de code se font par commit sur `main` : GitHub Pages redéploie
   automatiquement. Les feuilles de style et scripts sont versionnés (`?v=`) pour
   forcer la mise à jour du cache.

## Sécurité

Voir `SECURITY.md`. Le jeton GitHub du Drive est stocké localement dans le navigateur
de l'administrateur et n'est jamais commité.
