/*14_media_library.js*/
/* ══════════════════════════════════════════════════════════════════════
   BIBLIOTHÈQUE D'IMAGES — onglet « Images »

   • Galerie de toutes les images importées (data.mediaIndex + IndexedDB).
   • « Qui utilise cette image ? » : liste des cartes de toutes les matières
     qui la contiennent, avec accès direct à l'édition de la carte.
   • Import d'images supplémentaires (fichiers, ou depuis « Mon Drive »).
   • Sélecteur d'image réutilisé par l'éditeur de cartes.

   Les cartes contiennent l'image sous la forme  <img src="media://clé"> :
   la clé renvoie au blob stocké dans l'IndexedDB « flash9x16_media ».
   ══════════════════════════════════════════════════════════════════════ */
const MediaLib = (() => {
  'use strict';

  const esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const IMG_EXT = /\.(png|jpe?g|gif|webp|svg|bmp|avif|ico|tiff?)$/i;
  const isImageName = n => IMG_EXT.test(String(n || ''));
  const keyUrl = k => 'media://' + k;
  const refRe = k => new RegExp('media://' + String(k).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

  /* ── Inventaire ─────────────────────────────────────────────────── */
  function all() {
    const idx = data.mediaIndex || {};
    return Object.keys(idx).map(k => {
      const m = idx[k] || {};
      return { key: k, name: m.name || String(k).split('/').pop(), type: m.type || '', size: m.size || 0, driveId: m.driveId || null, ts: m.ts || 0 };
    });
  }
  const images = () => all().filter(x => /^image\//i.test(x.type) || isImageName(x.name));
  const files = () => all().filter(x => !(/^image\//i.test(x.type) || isImageName(x.name)));
  const count = () => all().length;
  const totalSize = () => all().reduce((n, x) => n + (x.size || 0), 0);

  /* ── Qui utilise cette image ? ──────────────────────────────────── */
  function usage(key) {
    const out = [], needle = keyUrl(key);
    (data.subjects || []).forEach(sub => (sub.chapters || []).forEach(ch => (ch.cards || []).forEach(card => {
      const [front, back] = [String(card.front || '').includes(needle), String(card.back || '').includes(needle)];
      if (front || back) out.push({
        subjectId: sub.id, subjectTitle: sub.title,
        chapterId: ch.id, chapterTitle: ch.title,
        cardId: card.id, front: card.front, back: card.back,
        faces: [front ? 'recto' : null, back ? 'verso' : null].filter(Boolean).join(' + ')
      });
    })));
    return out;
  }
  const usageCount = key => usage(key).length;

  /* Références média:// présentes dans un texte de carte */
  function refsIn(text) {
    const keys = [...String(text || '').matchAll(/media:\/\/([^"'\s>]+)/gi)].map(m => m[1]);
    const idx = data.mediaIndex || {};
    return [...new Set(keys)].map(k => ({ key: k, name: (idx[k] || {}).name || k, known: !!idx[k] }));
  }
  const removeRefFrom = (text, key) => String(text || '')
    .replace(new RegExp('<img\\b[^>]*src=["\']media://' + String(key).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '["\'][^>]*>', 'gi'), '')
    .replace(new RegExp('!\\[[^\\]]*\\]\\(img://' + String(key).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\)', 'g'), '');

  /* ── Import ─────────────────────────────────────────────────────── */
  async function addImageBlob(name, blob, meta = {}) {
    const key = meta.key || ('img-' + Date.now().toString(36) + '-' + M.random().toString(36).slice(2, 7) + '/' + (name || 'image'));
    await Media.save(key, blob, { name: name || key, type: blob.type || 'image/*', size: blob.size || 0, ts: Date.now(), ...meta });
    return key;
  }

  async function importFiles(fileList) {
    const arr = [...(fileList || [])], imgs = arr.filter(f => /^image\//i.test(f.type || '') || isImageName(f.name));
    if (!imgs.length) { if (arr.length) toast('Aucune image reconnue', 'warn'); return 0; }
    for (const f of imgs) await addImageBlob(f.name, f, { source: 'file' });
    saveData();
    toast(imgs.length + ' image' + (imgs.length > 1 ? 's' : '') + ' importée' + (imgs.length > 1 ? 's' : ''), 'success');
    /* Miroir vers « Mon Drive » si l'utilisateur est connecté (facultatif) */
    if (typeof PDrive !== 'undefined' && PDrive.isConnected() && !PDrive.busy()) {
      PDrive.mirror(imgs).catch(() => {});
    }
    return imgs.length;
  }

  async function remove(key, opts = {}) {
    const used = usageCount(key);
    if (used && !opts.force) return { ok: false, used };
    try { await Media.remove(key); } catch (e) { console.warn(e); }
    if (data.mediaIndex) delete data.mediaIndex[key];
    saveData();
    return { ok: true, used };
  }

  /* ── Modale générique ──────────────────────────────────────────── */
  function modal(html, opts = {}) {
    const root = D.createElement('div');
    root.className = 'card-editor-overlay ml-modal-overlay';
    root.innerHTML = `<div class="card-editor ml-modal ${opts.wide ? 'ml-modal--wide' : ''}">
      <div class="card-editor-header"><h3>${opts.title || ''}</h3>
        <button class="ce-close-btn" data-close aria-label="Fermer">${ico('x','ico--sm')}</button></div>
      <div class="card-editor-body ml-modal__body">${html}</div>
      <div class="card-editor-footer">${opts.footer || '<button class="btn btn--ghost" data-close>Fermer</button>'}</div>
    </div>`;
    D.body.appendChild(root);
    const close = () => { root.remove(); if (opts.onClose) opts.onClose(); };
    root.querySelectorAll('[data-close]').forEach(b => b.onclick = close);
    root.onclick = e => { if (e.target === root) close(); };
    return { root, close };
  }

  async function fillThumbs(scope) {
    await Media.resolve(scope);
    if (typeof tsLat === 'function') { try { tsLat(scope); } catch {} }
  }

  /* ── Modale « utilisée par … » ─────────────────────────────────── */
  function openUsage(key) {
    const idx = (data.mediaIndex || {})[key] || {};
    const list = usage(key);
    const m = modal(`
      <div class="ml-usage">
        <div class="ml-usage__img"><img src="media://${esc(key)}" alt="${esc(idx.name || key)}"></div>
        <div class="ml-usage__meta">
          <div class="ml-usage__name">${esc(idx.name || key)}</div>
          <div class="ml-usage__sub">${idx.type ? esc(idx.type) + ' · ' : ''}${fmtBytes(idx.size || 0)}</div>
          <div class="ml-usage__count">${list.length ? `Utilisée par <b>${list.length}</b> carte${list.length > 1 ? 's' : ''}` : 'Utilisée par aucune carte'}</div>
        </div>
      </div>
      ${list.length ? `<div class="ml-usage__list">${list.map(u => `
        <button class="ml-use-row" data-chap="${esc(u.chapterId)}" data-card="${esc(u.cardId)}" data-sub="${esc(u.subjectId)}">
          <div class="ml-use-row__main">
            <div class="ml-use-row__front">${fmtText(u.front)}</div>
            <div class="ml-use-row__back">${fmtText(u.back)}</div>
          </div>
          <div class="ml-use-row__meta"><span>${esc(u.chapterTitle)}</span><span class="ml-use-row__face">${esc(u.faces)}</span></div>
          <div class="ml-use-row__act">${ico('pencil','ico--sm')}</div>
        </button>`).join('')}</div>`
      : `<div class="ml-empty">Aucune carte n'utilise cette image pour l'instant. Tu peux l'insérer depuis
          l'éditeur d'une carte (bouton <b>Image</b>).</div>`}`,
      { title: 'Image', wide: true, footer: `<button class="btn btn--red btn--outline btn--sm" data-del>${ico('trash','ico--sm')}<span>Supprimer l'image</span></button>
        <button class="btn btn--ghost" data-close>Fermer</button>` });

    fillThumbs(m.root);
    m.root.querySelectorAll('[data-del]').forEach(b => b.onclick = async () => {
      if (list.length && !confirm(`Cette image est utilisée par ${list.length} carte(s). La supprimer quand même ?`)) return;
      if (!list.length && !confirm('Supprimer cette image ?')) return;
      await remove(key, { force: true });
      m.close(); toast('Image supprimée', 'success');
      if (State.view === 'images') render();
    });
    m.root.querySelectorAll('.ml-use-row').forEach(b => b.onclick = () => {
      const { chap, card, sub } = b.dataset;
      m.close();
      openCardForEdit(sub, chap, card);
    });
  }

  /* Ouvre l'éditeur de carte d'une carte précise (depuis n'importe où) */
  function openCardForEdit(subjectId, chapterId, cardId) {
    const sub = (data.subjects || []).find(s => s.id === subjectId) || getSub();
    const chap = (sub.chapters || []).find(c => c.id === chapterId) || (typeof getCh === 'function' ? getCh(chapterId) : null);
    if (!chap) { toast('Chapitre introuvable', 'error'); return; }
    const card = (chap.cards || []).find(c => c.id === cardId);
    if (!card) { toast('Carte introuvable', 'error'); return; }
    const back = () => { if (State.view === 'images') render(); else if (typeof goCards === 'function') goCards(chapterId, false); };
    try { if (typeof openCardEditor === 'function') openCardEditor(chap, card, back); }
    catch (e) { console.error(e); toast('Éditeur indisponible', 'error'); }
  }

  const fmtText = h => {
    const s = String(h || '').replace(/<img\b[^>]*>/gi, '🖼️ ').replace(/<br\s*\/?>/gi, ' ');
    const tmp = D.createElement('div');
    tmp.innerHTML = s;
    const t = (tmp.textContent || '').replace(/\s+/g, ' ').trim();
    return esc(t.length > 110 ? t.slice(0, 110) + '…' : (t || '—'));
  };

  /* ── Sélecteur d'image (éditeur de cartes) ─────────────────────── */
  function pickImage() {
    return new Promise(resolve => {
      let settled = false;
      const done = v => { if (!settled) { settled = true; resolve(v); } };
      const m = modal(`
        <div class="ml-pick">
          <div class="ml-pick__tabs">
            <button class="btn btn--sm btn--primary" data-mltab="lib">Bibliothèque</button>
            <button class="btn btn--sm btn--outline" data-mltab="up">Importer</button>
            ${(typeof PDrive !== 'undefined' && PDrive.isConnected()) ? '<button class="btn btn--sm btn--outline" data-mltab="drive">Mon Drive</button>' : ''}
          </div>
          <div class="ml-pick__pane" data-mlpane="lib"></div>
          <div class="ml-pick__pane hidden" data-mlpane="up">
            <div class="ml-drop" data-up>
              ${ico('image','ico--lg')}
              <div>Clique ou dépose des images ici</div>
              <div class="ml-drop__s">Elles sont copiées dans l'appli (et dans ton Drive si tu es connecté).</div>
              <input type="file" accept="image/*" multiple class="hidden" data-upinput>
            </div>
          </div>
          <div class="ml-pick__pane hidden" data-mlpane="drive"></div>
        </div>`,
        { title: 'Choisir une image', wide: true, onClose: () => done(null) });

      const paneLib = m.root.querySelector('[data-mlpane="lib"]');
      const paneDrive = m.root.querySelector('[data-mlpane="drive"]');
      const search = D.createElement('input');
      search.type = 'search'; search.className = 'input ml-pick__search'; search.placeholder = 'Rechercher une image…';

      function paintLib(q = '') {
        const needle = q.trim().toLowerCase();
        const list = images().filter(x => !needle || x.name.toLowerCase().includes(needle)).sort((a, b) => (b.ts || 0) - (a.ts || 0));
        paneLib.innerHTML = `${list.length ? '' : '<div class="ml-empty">Aucune image dans la bibliothèque.</div>'}`;
        if (!list.length) return;
        const grid = D.createElement('div'); grid.className = 'ml-grid ml-grid--pick';
        list.forEach(x => {
          const b = D.createElement('button');
          b.className = 'ml-tile';
          b.innerHTML = `<img src="media://${esc(x.key)}" alt="${esc(x.name)}" loading="lazy">
            <div class="ml-tile__name">${esc(x.name)}</div>`;
          b.onclick = () => { done({ key: x.key, name: x.name }); m.close(); };
          grid.appendChild(b);
        });
        paneLib.appendChild(grid);
        fillThumbs(paneLib);
      }
      paneLib.appendChild(search);
      search.oninput = () => paintLib(search.value);
      paintLib();

      /* onglet Importer */
      const upInput = m.root.querySelector('[data-upinput]');
      const upZone = m.root.querySelector('[data-up]');
      upZone.onclick = () => upInput.click();
      ['dragenter', 'dragover'].forEach(ev => upZone.addEventListener(ev, e => { e.preventDefault(); upZone.classList.add('is-over'); }));
      ['dragleave', 'drop'].forEach(ev => upZone.addEventListener(ev, e => { e.preventDefault(); upZone.classList.remove('is-over'); }));
      upZone.addEventListener('drop', e => takeFiles([...(e.dataTransfer?.files || [])]));
      upInput.onchange = e => { takeFiles([...(e.target.files || [])]); e.target.value = ''; };
      async function takeFiles(list) {
        if (!list.length) return;
        await importFiles(list);
        const last = images().sort((a, b) => (b.ts || 0) - (a.ts || 0))[0];
        if (last) { done({ key: last.key, name: last.name }); m.close(); }
      }

      /* onglet Mon Drive */
      async function paintDrive() {
        if (typeof PDrive === 'undefined') return;
        paneDrive.innerHTML = '<div class="ml-empty">Chargement de ton Drive…</div>';
        try {
          const list = await PDrive.listImages();
          if (!list.length) { paneDrive.innerHTML = '<div class="ml-empty">Aucune image dans ton Drive.</div>'; return; }
          paneDrive.innerHTML = '';
          const grid = D.createElement('div'); grid.className = 'ml-grid ml-grid--pick';
          list.forEach(f => {
            const b = D.createElement('button');
            b.className = 'ml-tile';
            b.innerHTML = `<div class="ml-tile__ph">${ico('image','ico--lg')}</div><div class="ml-tile__name">${esc(f.name)}</div>`;
            b.onclick = async () => {
              b.classList.add('is-loading');
              try {
                const got = await PDrive.useAsMedia(f.name || f.id);
                if (got && got.key) { done({ key: got.key, name: got.name || f.name }); m.close(); }
              } catch (e) { toast('Téléchargement impossible', 'error'); b.classList.remove('is-loading'); }
            };
            grid.appendChild(b);
          });
          paneDrive.appendChild(grid);
        } catch (e) {
          paneDrive.innerHTML = `<div class="ml-empty">${esc(e.message || 'Drive indisponible')}</div>`;
        }
      }

      m.root.querySelector('.ml-pick__tabs').onclick = e => {
        const b = e.target.closest('[data-mltab]'); if (!b) return;
        m.root.querySelectorAll('[data-mltab]').forEach(t => { t.classList.toggle('btn--primary', t === b); t.classList.toggle('btn--outline', t !== b); });
        m.root.querySelectorAll('[data-mlpane]').forEach(p => p.classList.toggle('hidden', p.dataset.mlpane !== b.dataset.mltab));
        if (b.dataset.mltab === 'drive') paintDrive();
      };
    });
  }

  /* ── Vue « Images » ────────────────────────────────────────────── */
  function goImages(push = true) {
    if (typeof exitDrive === 'function') exitDrive();
    if (push) Nav.push();
    State.view = 'images';
    setTop({ title: 'Images' });
    setBot({ actions: false, revision: false });
    hideRevAct();
    render();
  }

  function render() {
    const v = $('#view');
    if (!v || State.view !== 'images') return;
    const list = images().sort((a, b) => (b.ts || 0) - (a.ts || 0));
    const otherFiles = files().length;
    v.innerHTML = `
      <div class="card card--flush">
        <div class="view-head">
          <div>
            <h2 class="view-head__title">Images</h2>
            <div class="view-head__meta">${list.length} image${list.length > 1 ? 's' : ''} · ${fmtBytes(totalSize())}${otherFiles ? ` · ${otherFiles} autre(s) fichier(s)` : ''}</div>
          </div>
          <div class="view-head__actions">
            <button class="btn btn--solid btn--primary btn--sm" id="mlImport">${ico('plus')}<span>Importer</span></button>
            <input type="file" id="mlImportInput" accept="image/*" multiple class="hidden">
            ${(typeof PDrive !== 'undefined' && PDrive.isConnected()) ? `<button class="btn btn--outline btn--sm" id="mlDrive">${ico('cloud','ico--sm')}<span>Mon Drive</span></button>` : ''}
          </div>
        </div>
        <div class="search-field deck-search">
          ${ico('search')}
          <input type="text" id="mlSearch" class="input" placeholder="Rechercher une image par nom…" autocomplete="off">
        </div>
        <div id="mlScroll" class="scroll-y deck-scroll">
          <div class="ml-grid" id="mlGrid"></div>
        </div>
      </div>`;

    const grid = $('#mlGrid');
    const paint = (q = '') => {
      const needle = q.trim().toLowerCase();
      const l = list.filter(x => !needle || x.name.toLowerCase().includes(needle));
      if (!l.length) {
        grid.innerHTML = `<div class="empty" style="grid-column:1/-1">${ico('image','ico--lg')}
          <div class="empty__title">${needle ? 'Aucune image trouvée' : 'Aucune image importée'}</div>
          <div class="empty__sub">${needle ? 'Essaie un autre nom.' : 'Clique sur « Importer » : les images pourront être insérées dans n\'importe quelle carte (recto ou verso).'}</div></div>`;
        return;
      }
      grid.innerHTML = l.map(x => {
        const n = usageCount(x.key);
        return `<div class="ml-card" data-key="${esc(x.key)}">
          <div class="ml-card__thumb"><img src="media://${esc(x.key)}" alt="${esc(x.name)}" loading="lazy"></div>
          <div class="ml-card__info">
            <div class="ml-card__name" title="${esc(x.name)}">${esc(x.name)}</div>
            <div class="ml-card__meta">${fmtBytes(x.size)} · <b>${n}</b> carte${n > 1 ? 's' : ''}</div>
          </div>
          <div class="ml-card__act">
            <button class="dbtn-icon" data-act="usage" title="Voir les cartes qui utilisent cette image">${ico('search','ico--sm')}</button>
            <button class="dbtn-icon" data-act="del" title="Supprimer">${ico('trash','ico--sm')}</button>
          </div>
        </div>`;
      }).join('');
      fillThumbs(grid);
    };
    paint();

    $('#mlSearch').oninput = e => paint(e.target.value);
    $('#mlImport').onclick = () => $('#mlImportInput').click();
    $('#mlImportInput').onchange = async e => { await importFiles([...(e.target.files || [])]); e.target.value = ''; render(); };
    const md = $('#mlDrive');
    if (md) md.onclick = () => { State.view = 'pdrive'; if (typeof PDrive !== 'undefined') PDrive.view(false); };

    grid.onclick = async e => {
      const card = e.target.closest('.ml-card'); if (!card) return;
      const key = card.dataset.key;
      const act = (e.target.closest('[data-act]') || {}).dataset?.act;
      if (act === 'del') {
        const used = usageCount(key);
        if (used && !confirm(`Cette image est utilisée par ${used} carte(s). La supprimer quand même ?`)) return;
        if (!used && !confirm('Supprimer cette image ?')) return;
        await remove(key, { force: true });
        toast('Image supprimée', 'success');
        render();
        return;
      }
      openUsage(key);
    };
  }

  return {
    all, images, files, count, totalSize, usage, usageCount, refsIn, removeRefFrom,
    addImageBlob, importFiles, remove, pickImage, openUsage, openCardForEdit, goImages, view: render
  };
})();
window.MediaLib = MediaLib;
