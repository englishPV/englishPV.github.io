# PDF.js (copie locale)

Lecteur PDF utilisé par le Drive : [`js/11_drive_pdf.js`](../../js/11_drive_pdf.js).

| Fichier | Rôle |
|---|---|
| `pdf.min.js` | API principale (build *legacy* UMD → `window.pdfjsLib`) |
| `pdf.worker.min.js` | worker de rendu (décodage du PDF hors du thread principal) |
| `LICENSE` | licence Apache 2.0 de PDF.js |

* **Version** : `pdfjs-dist` **3.11.174**, build `legacy/build/*.min.js`
  (le build *legacy* est celui qui fonctionne sur le plus grand nombre de
  navigateurs, y compris les téléphones un peu anciens).
* **Provenance** : <https://registry.npmjs.org/pdfjs-dist/-/pdfjs-dist-3.11.174.tgz>
  (paquet officiel Mozilla, aucune modification du code).
* **Pourquoi une copie locale** : aucun CDN, aucun tiers, le lecteur fonctionne
  même hors ligne et se charge uniquement quand un PDF est ouvert.

## Mettre à jour

```bash
cd /tmp
curl -LO https://registry.npmjs.org/pdfjs-dist/-/pdfjs-dist-X.Y.Z.tgz
tar xzf pdfjs-dist-X.Y.Z.tgz package/legacy/build/pdf.min.js \
                             package/legacy/build/pdf.worker.min.js package/LICENSE
cp package/legacy/build/pdf.min.js package/legacy/build/pdf.worker.min.js \
   package/LICENSE  /chemin/du/depot/vendor/pdfjs/
```

Puis mettre à jour la version dans ce README et le numéro de cache
(`?v=`) de `js/11_drive_pdf.js` dans `index.html`.
⚠️ À partir de la 4.x, PDF.js n'est plus livré en UMD mais en modules ES :
il faudrait alors charger `pdf.min.mjs` avec `import()` et adapter
`js/11_drive_pdf.js`. Les deux fichiers (`pdf.min.js` et `pdf.worker.min.js`)
doivent **toujours** être de la même version.
