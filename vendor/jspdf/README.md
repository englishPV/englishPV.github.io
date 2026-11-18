# jsPDF (copie locale)

Création de PDF côté navigateur, utilisée par l'export PDF figé des pages HTML
du Drive : [`js/16_drive_html.js`](../../js/16_drive_html.js).

| Fichier | Rôle |
|---|---|
| `jspdf.umd.min.js` | build navigateur UMD → `window.jspdf.jsPDF` |
| `LICENSE` | licence MIT (jsPDF) |

* **Version** : `jspdf` **2.5.1**.
* **Provenance** : <https://registry.npmjs.org/jspdf/-/jspdf-2.5.1.tgz>
  (aucune modification du code).
* **Pourquoi une copie locale** : aucun CDN, aucun tiers, l'export PDF
  fonctionne même hors ligne et ne charge la bibliothèque qu'au premier
  téléchargement demandé.

## Mettre à jour

```bash
cd /tmp
curl -LO https://registry.npmjs.org/jspdf/-/jspdf-X.Y.Z.tgz
tar xzf jspdf-X.Y.Z.tgz package/dist/jspdf.umd.min.js package/LICENSE
cp package/dist/jspdf.umd.min.js package/LICENSE /chemin/du/depot/vendor/jspdf/
```

Puis mettre à jour la version dans ce README et le numéro de cache
(`?v=`) de `js/16_drive_html.js` dans `index.html`.
