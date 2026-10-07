# Flashcards · Physique & Maths

Application web de révision par répétition espacée (algorithme **FSRS**) : plus de
1 000 flashcards de physique et de mathématiques, support **LaTeX** complet (MathJax),
statistiques détaillées, synchronisation cloud optionnelle et « Drive » de documents
publiés depuis GitHub.

Site : <https://englishpv.github.io> · Emploi du temps : <https://schedulepv.web.app>

---

## Stack

| Élément | Détail |
| --- | --- |
| Type | Site statique (HTML + CSS + JavaScript vanilla, aucune étape de build) |
| Hébergement | GitHub Pages (`main` = production, `.nojekyll`) |
| Police | Inter variable, **auto-hébergée** (`fonts/`, 48 Ko, aucune requête tierce) |
| Formules | MathJax 3 chargé à la demande |
| Sync | Firebase Realtime Database + Google Auth (optionnel) |
| Stockage local | `localStorage` (données) + IndexedDB (médias importés) |

## Structure

```
index.html                     coquille de l'application (barre latérale + barre d'app)
css/01_styles_theme_and_layout.css   design tokens, reset, coquille, primitives UI
css/02_drive.css               module Drive (onglets, listes, lecteur, éditeur)
css/03_modern.css              composants applicatifs (listes, stats, révision, QCM, réglages)
js/00_icons.js                 jeu d'icônes SVG inline (aucune requête réseau)
js/01..08_*.js                 logique applicative (sync, données, SRS, UI, Drive)
js/09_shell.js                 navigation latérale, tiroir mobile, raccourcis clavier
fonts/                         Inter variable (woff2, subset latin)
images/ · content/drive/       médias et documents publiés
```

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

## Raccourcis clavier

| Touche | Action |
| --- | --- |
| `⌘/Ctrl` + `K` ou `/` | Rechercher une carte |
| `Espace` / `Entrée` (révision) | Retourner la carte |
| `1` `2` `3` `4` (révision) | Échec · Difficile · Bien · Facile |
| `Échap` | Fermer le tiroir, les menus et la visionneuse d'images |

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
