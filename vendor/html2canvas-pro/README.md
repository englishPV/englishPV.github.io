# html2canvas-pro (copie locale)

Capture « photo » du DOM en canvas, utilisée par l'export PDF figé des pages
HTML du Drive : [`js/16_drive_html.js`](../../js/16_drive_html.js).

| Fichier | Rôle |
|---|---|
| `html2canvas-pro.min.js` | build navigateur UMD → `window.html2canvas` |
| `LICENSE` | licence MIT |

* **Version** : `html2canvas-pro` **2.6.4** (fork de html2canvas qui supporte
  les espaces colorimétriques modernes : `oklch`, `lab`, `color-mix`…).
* **Provenance** : <https://registry.npmjs.org/html2canvas-pro/-/html2canvas-pro-2.6.4.tgz>
  (aucune modification du code).
* **Pourquoi une copie locale** : aucun CDN, aucun tiers, l'export PDF
  fonctionne même hors ligne et ne charge la bibliothèque qu'au premier
  téléchargement demandé.

## Mettre à jour

```bash
cd /tmp
curl -LO https://registry.npmjs.org/html2canvas-pro/-/html2canvas-pro-X.Y.Z.tgz
tar xzf html2canvas-pro-X.Y.Z.tgz package/dist/html2canvas-pro.min.js package/LICENSE
cp package/dist/html2canvas-pro.min.js package/LICENSE \
   /chemin/du/depot/vendor/html2canvas-pro/
```

Puis mettre à jour la version dans ce README et le numéro de cache
(`?v=`) de `js/16_drive_html.js` dans `index.html`.
