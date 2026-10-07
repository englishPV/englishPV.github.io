/*08_drive_ui.js*/
/* ══════════════════════════════════════════════════════════════
   DRIVE UI — barre d'onglets, vues "Drive", lecteur de fichiers,
   éditeur texte/LaTeX et publication GitHub.

   • Admin (liste blanche) : créer des onglets, dossiers, fichiers,
     importer, renommer, supprimer, puis « Publier » vers GitHub.
   • Autres utilisateurs : lecture seule + téléchargement +
     pastilles bleues sur les nouveautés.
   ══════════════════════════════════════════════════════════════ */
const Drive = (() => {
  'use strict';

  const S = DriveStore;
  const KIND_ICON = { folder: 'folder', text: 'file-text', latex: 'file-code', markdown: 'list', image: 'image', pdf: 'book', audio: 'music', video: 'video', archive: 'archive', file: 'paperclip' };
  const KIND_LABEL = { folder: 'Dossier', text: 'Texte', latex: 'LaTeX', markdown: 'Markdown', image: 'Image', pdf: 'PDF', audio: 'Audio', video: 'Vidéo', archive: 'Archive', file: 'Fichier' };
  const MONTHS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];

  /* ─────────── utilitaires ─────────── */
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const LSget = (k, fb) => { try { const v = localStorage.getItem(k); return v == null ? fb : JSON.parse(v); } catch { return fb; } };
  const LSset = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
  const admin = () => S.isAdmin();
  const siteBase = () => location.href.replace(/[^/]*$/, '');

  let isOpen = false;
  let stack = [];            // pile d'écrans du Drive
  let cur = null;            // écran courant
  let sortMode = LSget('pv_drive_sort', 'recent');
  let query = '';
  let booted = false;
  let fileView = {};         // fileId -> 'render' | 'source'
  const objUrls = [];

  function fmtDate(ts) {
    if (!ts) return '—';
    const d = new Date(ts);
    return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()} à ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  }
  function fmtShort(ts) {
    if (!ts) return '—';
    const d = new Date(ts);
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  }
  function fmtRel(ts) {
    if (!ts) return '';
    const diff = Date.now() - ts;
    if (diff < 60e3) return "à l'instant";
    if (diff < 3600e3) return `il y a ${M.round(diff / 60e3)} min`;
    if (diff < 86400e3) return `il y a ${M.round(diff / 3600e3)} h`;
    if (diff < 172800e3) return 'hier';
    if (diff < 604800e3) return `il y a ${M.round(diff / 86400e3)} j`;
    return fmtShort(ts);
  }
  const icon = n => ico(KIND_ICON[n.kind] || KIND_ICON.file);
  function trackUrl(u) { objUrls.push(u); if (objUrls.length > 30) URL.revokeObjectURL(objUrls.shift()); return u; }

  function notify(msg, type) { try { toast(msg, type || 'info'); } catch { console.log(msg); } }

  /* ─────────── modales ─────────── */
  function openModal(html, onMount, opts = {}) {
    const root = D.createElement('div');
    root.className = 'dmodal-root';
    root.innerHTML = `<div class="dmodal-backdrop"></div><div class="dmodal ${opts.wide ? 'dmodal-wide' : ''}">${html}</div>`;
    D.body.appendChild(root);
    const close = () => { root.classList.add('closing'); setTimeout(() => root.remove(), 160); D.removeEventListener('keydown', onKey); };
    const onKey = e => { if (e.key === 'Escape' && !opts.locked) close(); };
    D.addEventListener('keydown', onKey);
    root.querySelector('.dmodal-backdrop').onclick = () => { if (!opts.locked) close(); };
    onMount && onMount(root.querySelector('.dmodal'), close, root);
    requestAnimationFrame(() => root.classList.add('open'));
    return { root, el: root.querySelector('.dmodal'), close };
  }
  const btnRow = (id, label, cls = '') => `<button class="btn ${cls}" data-x="${id}">${label}</button>`;

  function promptModal({ title, fields = [], okLabel = 'Valider', danger = false }) {
    return new Promise(resolve => {
      const body = fields.map(f => `
        <label class="dfield">
          <span class="dfield-label">${esc(f.label)}</span>
          ${f.type === 'textarea'
            ? `<textarea class="input dfield-input" data-k="${esc(f.key)}" rows="${f.rows || 4}" placeholder="${esc(f.ph || '')}">${esc(f.value || '')}</textarea>`
            : f.type === 'select'
              ? `<select class="input dfield-input" data-k="${esc(f.key)}">${(f.options || []).map(o => `<option value="${esc(o.value)}" ${String(o.value) === String(f.value) ? 'selected' : ''}>${esc(o.label)}</option>`).join('')}</select>`
              : `<input class="input dfield-input" data-k="${esc(f.key)}" type="${f.type || 'text'}" value="${esc(f.value || '')}" placeholder="${esc(f.ph || '')}" ${f.attrs || ''}>`}
          ${f.hint ? `<small class="dfield-hint">${f.hint}</small>` : ''}
        </label>`).join('');
      const m = openModal(`
        <div class="dmodal-head"><h3>${esc(title)}</h3><button class="dmodal-x" data-x="cancel" aria-label="Fermer">${ico('x','ico--sm')}</button></div>
        <div class="dmodal-body">${body}</div>
        <div class="dmodal-foot">${btnRow('cancel', 'Annuler', 'btn--ghost')}${btnRow('ok', esc(okLabel), danger ? 'btn--red' : 'btn--solid btn--primary')}</div>`,
        (el, close) => {
          const get = () => { const out = {}; el.querySelectorAll('[data-k]').forEach(i => out[i.dataset.k] = i.value); return out; };
          el.querySelector('[data-x="cancel"]').onclick = () => { close(); resolve(null); };
          el.querySelector('[data-x="ok"]').onclick = () => { close(); resolve(get()); };
          el.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') { e.preventDefault(); close(); resolve(get()); } });
          const first = el.querySelector('input,textarea,select'); first && setTimeout(() => first.focus(), 60);
        });
    });
  }
  const confirmModal = (title, text, okLabel = 'Confirmer', danger = true) =>
    new Promise(res => {
      const m = openModal(`
        <div class="dmodal-head"><h3>${esc(title)}</h3></div>
        <div class="dmodal-body"><p class="dmodal-text">${text}</p></div>
        <div class="dmodal-foot">${btnRow('no', 'Annuler', 'btn--ghost')}${btnRow('yes', esc(okLabel), danger ? 'btn--red' : 'btn--solid btn--primary')}</div>`,
        (el, close) => {
          el.querySelector('[data-x="no"]').onclick = () => { close(); res(false); };
          el.querySelector('[data-x="yes"]').onclick = () => { close(); res(true); };
        });
    });

  /* ══════════════════════════════════════════════════════════
     BARRE D'ONGLETS
     ══════════════════════════════════════════════════════════ */
  function tabsEl() { return D.getElementById('driveTabs'); }

  function renderTabs() {
    const bar = tabsEl();
    if (!bar) return;
    const drives = S.drives();
    const visible = drives.length > 0 || admin();
    bar.classList.toggle('hidden', !visible);
    D.getElementById('app').style.setProperty('--row-tabs', visible ? 'var(--dtabs-h)' : '0px');
    if (!visible) return;

    const pend = admin() ? S.pending() : null;
    const tabs = drives.map(d => {
      const unread = S.unreadIn(d.id, null);
      const active = isOpen && cur && cur.driveId === d.id;
      return `<button class="dtab ${active ? 'is-active' : ''}" data-drive="${esc(d.id)}" title="${esc(d.title)}">
          <span class="dtab-emoji">${esc(d.emoji || '📁')}</span>
          <span class="dtab-name">${esc(d.title)}</span>
          ${unread ? `<i class="dbadge ${unread > 9 ? 'dbadge-big' : ''}">${unread > 9 ? '9+' : unread}</i>` : ''}
        </button>`;
    }).join('');

    bar.innerHTML = `
      <div class="dtabs-scroll scroll-x">
        <button class="dtab dtab-main ${!isOpen ? 'is-active' : ''}" data-act="main" title="Retour aux flashcards">
          <span class="dtab-emoji">${ico('home','ico--sm')}</span><span class="dtab-name">Flashcards</span>
        </button>
        ${tabs}
        ${admin() ? `<button class="dtab dtab-add" data-act="add-drive" title="Ajouter un onglet (admin)">${ico('plus','ico--sm')}</button>` : ''}
      </div>
      ${admin() ? `<div class="dtabs-side">
          <button class="dpub ${pend && pend.any ? 'is-dirty' : ''}" data-act="publish" title="Publier sur GitHub">
            ${ico('upload','ico--sm')}<span class="dpub-label">Publier</span>
            ${pend && pend.any ? `<i class="dbadge dbadge-pub">${pend.count > 9 ? '9+' : pend.count}</i>` : ''}
          </button>
        </div>` : ''}`;

    bar.onclick = e => {
      const t = e.target.closest('[data-drive],[data-act]');
      if (!t) return;
      if (t.dataset.drive) return openDrive(t.dataset.drive);
      const act = t.dataset.act;
      if (act === 'main') return close();
      if (act === 'add-drive') return addDriveModal();
      if (act === 'publish') return publishModal();
    };
  }

  /* ══════════════════════════════════════════════════════════
     NAVIGATION
     ══════════════════════════════════════════════════════════ */
  function show(screen) {
    isOpen = true;
    cur = screen;
    stack.push(screen);
    paint();
    renderTabs();
  }
  function replace(screen) {
    isOpen = true;
    cur = screen;
    if (stack.length) stack[stack.length - 1] = screen; else stack.push(screen);
    paint();
    renderTabs();
  }
  function openDrive(driveId) {
    if (!S.drive(driveId)) return;
    query = '';
    stack = [];
    show({ screen: 'root', driveId });
  }
  function close() {
    if (!isOpen) { try { goDeck(false); } catch {} return; }
    isOpen = false; cur = null; stack = []; query = '';
    const v = D.getElementById('view');
    if (v) v.classList.remove('drive-open');
    try {
      setBot({ actions: false, revision: false });
      hideRevAct();
      goDeck(false);
    } catch (e) { console.warn(e); }
    renderTabs();
  }
  function back() {
    if (!isOpen) return false;
    if (stack.length > 1) { stack.pop(); cur = stack[stack.length - 1]; paint(); renderTabs(); }
    else close();
    return true;
  }
  function goRoot() {
    if (!isOpen || !cur) return;
    stack = [{ screen: 'root', driveId: cur.driveId }];
    cur = stack[0]; paint(); renderTabs();
  }

  /* ══════════════════════════════════════════════════════════
     RENDU PRINCIPAL
     ══════════════════════════════════════════════════════════ */
  function paint() {
    const v = D.getElementById('view');
    if (!v || !cur) return;
    v.classList.add('drive-open');
    try { setBot({ actions: false, revision: false }); hideRevAct(); } catch {}
    D.getElementById('reviewActionsBar').style.display = 'none';
    if (cur.screen === 'file') return paintFile(v);
    return paintList(v);
  }

  function setTopBar(title, sub) {
    try { setTop({ title, showBack: true }); } catch { }
    const t = D.getElementById('title');
    if (t) t.innerHTML = `${esc(title)}${sub ? ` <span class="dtitle-sub">${esc(sub)}</span>` : ''}`;
  }

  /* ─────────── liste (racine / dossier) ─────────── */
  function paintList(v) {
    const d = S.drive(cur.driveId);
    if (!d) return close();
    const folder = cur.folderId ? S.node(cur.folderId) : null;
    if (cur.folderId && (!folder || folder.kind !== 'folder')) { cur.folderId = null; }

    let items = S.nodesOf(d.id, cur.folderId || null);
    if (query.trim()) items = searchItems(d.id, query.trim().toLowerCase());

    items = sortItems(items);
    const totalFiles = S.liveNodes().filter(n => n.driveId === d.id && n.kind !== 'folder').length;
    const unread = S.unreadIn(d.id, null);

    setTopBar(`${d.emoji || '📁'} ${d.title}`, query ? `· recherche « ${query} »` : '');

    const crumb = folder ? S.breadcrumb(folder) : [];
    v.innerHTML = `
      <div class="drive-wrap">
        <div class="drive-top">
          <div class="drive-crumb">
            <button class="dcrumb" data-act="root">${esc(d.emoji || '📁')} ${esc(d.title)}</button>
            ${crumb.map(c => `<span class="dcrumb-sep">${ico('chevron-right','ico--xs')}</span><button class="dcrumb ${c.id === cur.folderId ? 'is-cur' : ''}" data-go="${esc(c.id)}">${esc(c.name)}</button>`).join('')}
          </div>
          <div class="drive-topmeta">
            ${totalFiles} fichier${totalFiles > 1 ? 's' : ''}${unread ? ` · <span class="dunread-txt">${unread} nouveau${unread > 1 ? 'x' : ''}</span>` : ''}
            ${S.lastPublish() ? ` · publié ${fmtRel(S.lastPublish().at)}` : ''}
          </div>
        </div>

        ${admin() ? `
        <div class="drive-toolbar">
          <button class="dbtn" data-act="new-text" title="Nouveau fichier texte">${ico('file-text','ico--sm')}Texte</button>
          <button class="dbtn" data-act="new-latex" title="Nouveau fichier LaTeX">${ico('file-code','ico--sm')}LaTeX</button>
          <button class="dbtn" data-act="new-md" title="Nouveau fichier Markdown">${ico('list','ico--sm')}Markdown</button>
          <button class="dbtn" data-act="new-folder" title="Nouveau dossier">${ico('folder','ico--sm')}Dossier</button>
          <button class="dbtn dbtn-accent" data-act="import" title="Importer des fichiers">${ico('upload','ico--sm')}Importer</button>
          <input type="file" id="driveImport" multiple class="hidden">
        </div>` : ''}

        <div class="drive-filter">
          <input class="input dsearch" id="driveSearch" placeholder="Rechercher dans ${esc(d.title)}…" value="${esc(query)}" autocomplete="off" spellcheck="false">
          ${query ? `<button class="dbtn-icon" data-act="clear-search" title="Effacer la recherche">${ico('x','ico--sm')}</button>` : ''}
          <button class="dbtn-icon" data-act="sort" title="Trier">${ico(sortMode === 'recent' ? 'clock' : sortMode === 'name' ? 'list' : 'grid','ico--sm')}</button>
          <button class="dbtn-icon" data-act="refresh" title="Recharger depuis GitHub">${ico('refresh','ico--sm')}</button>
          ${admin() ? `<button class="dbtn-icon" data-act="admin-panel" title="Administration">${ico('settings','ico--sm')}</button>` : ''}
        </div>

        <div class="drive-scroll scroll-y" id="driveScroll">
          <div class="drive-list" id="driveList">
            ${items.length ? items.map(rowHtml).join('') : emptyHtml(folder)}
          </div>
        </div>

        ${admin() ? `<div class="drive-dropzone" id="driveDrop">${ico('upload','ico--sm')} Dépose tes fichiers ici pour les ajouter à « ${esc(folder ? folder.name : d.title)} »</div>` : ''}
        ${admin() && S.pending().any ? `<div class="drive-pubbar" data-act="publish">${ico('upload','ico--sm')} ${S.pending().count} modification(s) en attente — <strong>Publier sur GitHub</strong></div>` : ''}
      </div>`;

    bindList(v, d);
  }

  function emptyHtml(folder) {
    if (query) return `<div class="dempty">${ico('search','ico--lg')}<div class="dempty-t">Aucun résultat</div><div class="dempty-s">Aucun fichier ne correspond à « ${esc(query)} ».</div></div>`;
    return `<div class="dempty">
      ${ico(folder ? 'folder-open' : 'folder','ico--lg')} <div class="dempty-t">${folder ? 'Ce dossier est vide' : 'Cet onglet est vide'}</div>
      <div class="dempty-s">${admin() ? 'Utilise la barre d’outils pour créer un fichier, un dossier ou importer des documents.' : 'L’administrateur n’a encore rien publié ici.'}</div>
    </div>`;
  }

  function rowHtml(n) {
    const unread = S.isUnread(n);
    const isFolder = n.kind === 'folder';
    const kids = isFolder ? S.descendantsOf(n.id).filter(x => x.kind !== 'folder').length : 0;
    return `
      <div class="drow ${unread ? 'is-new' : ''} ${isFolder ? 'is-folder' : ''}" data-id="${esc(n.id)}" data-kind="${esc(n.kind)}">
        <div class="drow-ico">${icon(n)}</div>
        <div class="drow-main">
          <div class="drow-name">${esc(n.name)}${unread ? '<i class="dnew" title="Nouveau contenu"></i>' : ''}${n.dirty && admin() ? '<i class="ddirty" title="Non publié"></i>' : ''}</div>
          <div class="drow-meta">
            <span>Ajouté le ${fmtDate(n.addedAt)}</span>
            ${isFolder ? `<span>· ${kids} fichier${kids > 1 ? 's' : ''}</span>` : `<span>· ${S.fmtSize(n.size)}</span><span>· ${KIND_LABEL[n.kind] || 'Fichier'}</span>`}
            ${n.updatedAt && n.updatedAt > n.addedAt + 60000 ? `<span>· modifié ${fmtRel(n.updatedAt)}</span>` : ''}
            ${query && n.parentId ? `<span class="drow-path">· ${esc(S.fullPath(S.node(n.parentId) || { name: '' }))}</span>` : ''}
          </div>
        </div>
        <div class="drow-acts">
          ${!isFolder ? `<button class="dact" data-act="download" title="Télécharger">${ico('download','ico--sm')}</button>` : ''}
          ${admin() ? `<button class="dact" data-act="rename" title="Renommer">${ico('pencil','ico--sm')}</button>
                       <button class="dact" data-act="move" title="Déplacer">${ico('folder-open','ico--sm')}</button>
                       <button class="dact dact-danger" data-act="delete" title="Supprimer">${ico('trash','ico--sm')}</button>` : ''}
          <div class="drow-chev">${ico('chevron-right','ico--sm')}</div>
        </div>
      </div>`;
  }

  function sortItems(items) {
    const folders = items.filter(i => i.kind === 'folder');
    const files = items.filter(i => i.kind !== 'folder');
    const byName = (a, b) => a.name.localeCompare(b.name, 'fr', { numeric: true });
    if (sortMode === 'name') { folders.sort(byName); files.sort(byName); }
    else if (sortMode === 'type') { files.sort((a, b) => a.kind.localeCompare(b.kind) || byName(a, b)); folders.sort(byName); }
    else { files.sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0)); folders.sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0)); }
    return [...folders, ...files];
  }

  function searchItems(driveId, q) {
    return S.liveNodes().filter(n => n.driveId === driveId && n.name.toLowerCase().includes(q));
  }

  function bindList(v, d) {
    const list = v.querySelector('#driveList');
    const scroll = v.querySelector('#driveScroll');

    list && list.addEventListener('click', async e => {
      const actBtn = e.target.closest('[data-act]');
      const row = e.target.closest('.drow');
      if (!row) return;
      const n = S.node(row.dataset.id);
      if (!n) return;
      if (actBtn) {
        e.stopPropagation();
        const act = actBtn.dataset.act;
        if (act === 'download') return downloadNode(n);
        if (act === 'rename') return renameModal(n);
        if (act === 'move') return moveModal(n);
        if (act === 'delete') return deleteModal(n);
        return;
      }
      if (n.kind === 'folder') return show({ screen: 'root', driveId: d.id, folderId: n.id });
      S.markSeen(n.id);
      renderTabs();
      show({ screen: 'file', driveId: d.id, fileId: n.id });
    });

    v.querySelectorAll('[data-act]').forEach(b => {
      if (b.closest('.drow')) return;
      b.onclick = async e => {
        e.stopPropagation();
        const act = b.dataset.act;
        if (act === 'root') { goRoot(); return; }
        if (act === 'new-text' || act === 'new-latex' || act === 'new-md') return newFileModal(act === 'new-latex' ? 'latex' : act === 'new-md' ? 'markdown' : 'text');
        if (act === 'new-folder') return newFolderModal(d.id, cur.folderId || null);
        if (act === 'import') { const i = v.querySelector('#driveImport'); i && i.click(); return; }
        if (act === 'clear-search') { query = ''; paint(); return; }
        if (act === 'sort') {
          sortMode = sortMode === 'recent' ? 'name' : sortMode === 'name' ? 'type' : 'recent';
          LSset('pv_drive_sort', sortMode); paint(); return;
        }
        if (act === 'refresh') return refreshNow();
        if (act === 'admin-panel') return adminPanel();
        if (act === 'publish') return publishModal();
      };
    });
    v.querySelectorAll('[data-go]').forEach(b => b.onclick = () => {
      const n = S.node(b.dataset.go);
      if (!n) return goRoot();
      const chain = S.breadcrumb(n);
      stack = [{ screen: 'root', driveId: d.id }];
      chain.slice(0, -1).forEach(f => stack.push({ screen: 'root', driveId: d.id, folderId: f.id }));
      cur = { screen: 'root', driveId: d.id, folderId: n.id };
      stack.push(cur);
      paint(); renderTabs();
    });

    const input = v.querySelector('#driveImport');
    if (input) input.onchange = async e => {
      const files = [...e.target.files];
      e.target.value = '';
      if (files.length) await importFiles(d.id, cur.folderId || null, files);
    };

    const search = v.querySelector('#driveSearch');
    if (search) {
      search.oninput = () => { query = search.value; const pos = search.selectionStart; paint(); const s2 = v.querySelector('#driveSearch'); if (s2) { s2.focus(); try { s2.setSelectionRange(pos, pos); } catch {} } };
      search.onkeydown = e => { if (e.key === 'Escape') { query = ''; paint(); } };
    }

    // glisser-déposer (admin)
    const dz = v.querySelector('#driveDrop');
    if (dz && scroll) {
      ['dragenter', 'dragover'].forEach(ev => scroll.addEventListener(ev, e => { e.preventDefault(); dz.classList.add('on'); }));
      ['dragleave', 'drop'].forEach(ev => scroll.addEventListener(ev, e => { e.preventDefault(); if (ev === 'dragleave' && e.relatedTarget && scroll.contains(e.relatedTarget)) return; dz.classList.remove('on'); }));
      scroll.addEventListener('drop', async e => {
        e.preventDefault(); dz.classList.remove('on');
        const files = [...(e.dataTransfer?.files || [])];
        if (files.length) await importFiles(d.id, cur.folderId || null, files);
      });
    }
  }

  /* ══════════════════════════════════════════════════════════
     LECTEUR DE FICHIER
     ══════════════════════════════════════════════════════════ */
  async function paintFile(v) {
    const n = S.node(cur.fileId);
    if (!n) return back();
    const d = S.drive(n.driveId);
    setTopBar(`${icon(n)} ${n.name}`, '· Drive');

    const mode = fileView[n.id] || (n.kind === 'latex' || n.kind === 'markdown' ? 'render' : 'render');
    v.innerHTML = `
      <div class="drive-wrap">
        <div class="dfile-head">
          <div class="dfile-ico">${icon(n)}</div>
          <div class="dfile-info">
            <div class="dfile-name">${esc(n.name)}${S.isUnread(n) ? '<i class="dnew"></i>' : ''}</div>
            <div class="dfile-meta">
              <span>${ico('clock','ico--xs')} Ajouté le <strong>${fmtDate(n.addedAt)}</strong></span>
              ${n.updatedAt > n.addedAt + 60000 ? `<span>· modifié le ${fmtDate(n.updatedAt)}</span>` : ''}
              <span>· ${S.fmtSize(n.size)}</span><span>· ${KIND_LABEL[n.kind] || 'Fichier'}</span>
              ${n.by ? `<span>· par ${esc(n.by)}</span>` : ''}
            </div>
            <div class="dfile-path">${esc(S.fullPath(n))}</div>
          </div>
        </div>

        <div class="dfile-actions">
          <button class="dbtn" data-act="download">${ico('download','ico--sm')}Télécharger</button>
          ${(n.kind === 'latex' || n.kind === 'markdown') ? `
            <div class="dseg">
              <button class="dseg-b ${mode === 'render' ? 'on' : ''}" data-act="view-render">Rendu</button>
              <button class="dseg-b ${mode === 'source' ? 'on' : ''}" data-act="view-source">Source</button>
            </div>` : ''}
          ${n.kind === 'latex' || n.kind === 'markdown' || n.kind === 'text' ? `<button class="dbtn" data-act="print"><span>🖨</span>PDF</button>` : ''}
          ${n.kind === 'pdf' ? `<button class="dbtn" data-act="newtab">${ico('external-link','ico--sm')}Nouvel onglet</button>` : ''}
          ${admin() ? `<button class="dbtn" data-act="edit">${ico('pencil','ico--sm')}Éditer</button>
                       <button class="dbtn dbtn-danger" data-act="delete" title="Supprimer">${ico('trash','ico--sm')}</button>` : ''}
        </div>

        <div class="dfile-body scroll-y" id="dfileBody">
          <div class="dloading"><div class="dspinner"></div>Chargement du fichier…</div>
        </div>
      </div>`;

    const body = v.querySelector('#dfileBody');

    v.querySelectorAll('[data-act]').forEach(b => b.onclick = async e => {
      e.stopPropagation();
      const act = b.dataset.act;
      if (act === 'download') return downloadNode(n);
      if (act === 'view-render') { fileView[n.id] = 'render'; paint(); return; }
      if (act === 'view-source') { fileView[n.id] = 'source'; paint(); return; }
      if (act === 'edit') return editorModal(n);
      if (act === 'delete') return deleteModal(n);
      if (act === 'print') return printNode(n, body);
      if (act === 'newtab') { const u = await objectUrlFor(n); if (u) W.open(u, '_blank', 'noopener'); return; }
    });

    // chargement du contenu
    try {
      const text = S.isTextKind(n.kind) ? await S.getTextContent(n) : null;
      if (n.kind === 'latex') {
        if (mode === 'source') body.innerHTML = `<pre class="dsrc"><code>${esc(text)}</code></pre>`;
        else await renderLatex(body, text, n);
      } else if (n.kind === 'markdown') {
        body.innerHTML = mode === 'source' ? `<pre class="dsrc"><code>${esc(text)}</code></pre>`
          : `<div class="dmd">${mdToHtml(text, n)}</div>`;
      } else if (n.kind === 'text') {
        body.innerHTML = `<pre class="dsrc"><code>${esc(text)}</code></pre>`;
      } else if (n.kind === 'image') {
        const u = await objectUrlFor(n);
        body.innerHTML = `<div class="dimgwrap"><img class="dimg" src="${esc(u)}" alt="${esc(n.name)}"></div>
          <div class="dimg-tip">Touche l'image pour l'agrandir</div>`;
        body.querySelector('img').onclick = e => { try { openLB(e.target, body); } catch { W.open(u, '_blank'); } };
      } else if (n.kind === 'pdf') {
        const p = n.path || n.publishedPath;
        body.innerHTML = `<iframe class="dpdf" src="${esc(S.pagesUrl(p))}#toolbar=1" title="${esc(n.name)}"></iframe>
          <div class="dimg-tip">Si l'aperçu ne s'affiche pas, utilise « Télécharger » ou « Nouvel onglet ».</div>`;
      } else if (n.kind === 'audio') {
        const u = await objectUrlFor(n);
        body.innerHTML = `<div class="dmedia"><audio controls src="${esc(u)}"></audio></div>`;
      } else if (n.kind === 'video') {
        const u = await objectUrlFor(n);
        body.innerHTML = `<div class="dmedia"><video controls playsinline src="${esc(u)}"></video></div>`;
      } else {
        body.innerHTML = `<div class="dbinary">
            <div class="dbinary-ico">${icon(n)}</div>
            <div class="dbinary-name">${esc(n.name)}</div>
            <div class="dbinary-meta">${S.fmtSize(n.size)} · ${esc(n.mime || KIND_LABEL[n.kind] || 'fichier')}</div>
            <div class="dbinary-tip">Aperçu non disponible pour ce type de fichier — tu peux le télécharger.</div>
          </div>`;
      }
    } catch (e) {
      body.innerHTML = `<div class="derror">⚠️ Impossible de charger ce fichier.<br><small>${esc(e.message || e)}</small>
        ${!admin() ? '<br><small class="muted">La publication est peut-être encore en cours de déploiement sur GitHub Pages (≤ 2 min).</small>' : ''}</div>`;
    }
  }

  async function objectUrlFor(n) {
    const c = await S.getContent(n);
    if (!c) throw new Error('Contenu indisponible');
    return trackUrl(URL.createObjectURL(c.blob));
  }

  function resolveAssetFrom(node, name) {
    const base = String(name || '').split('/').pop();
    const tryNames = [String(name || ''), base];
    // 1) même dossier, puis même onglet, puis tout le drive
    const scopes = [S.nodesOf(node.driveId, node.parentId || null), S.liveNodes().filter(x => x.driveId === node.driveId), S.liveNodes()];
    for (const scope of scopes) {
      for (const cand of tryNames) {
        const hit = scope.find(x => x.kind !== 'folder' && (x.name === cand || x.name.toLowerCase() === String(cand).toLowerCase()));
        if (hit) {
          const p = hit.path || hit.publishedPath;
          return p ? S.pagesUrl(p) : null;
        }
      }
    }
    // 2) dossier images/ du site (flashcards)
    return 'images/' + base.split('/').map(encodeURIComponent).join('/');
  }

  async function renderLatex(body, text, n) {
    let out;
    try {
      out = TexRender.compile(text, { resolveAsset: name => resolveAssetFrom(n, name) });
    } catch (e) {
      body.innerHTML = `<div class="derror">⚠️ Erreur de compilation LaTeX<br><small>${esc(e.message || e)}</small></div>
        <pre class="dsrc"><code>${esc(text)}</code></pre>`;
      return;
    }
    body.innerHTML = `<div class="dlatex">${out.html}</div>`;
    if (out.title) {
      const head = body.querySelector('.dfile-name');
      if (head && !head.textContent.trim()) head.textContent = out.title;
    }
    if (out.hasMath && W.loadMathJax) {
      try {
        await W.loadMathJax();
        if (W.MathJax && W.MathJax.typesetPromise) await W.MathJax.typesetPromise([body]);
      } catch (e) { console.warn('[Drive] MathJax', e); }
    }
    // ancres internes (TOC)
    body.querySelectorAll('a[href^="#"]').forEach(a => a.onclick = e => {
      const t = body.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  }

  async function printNode(n, body) {
    const html = body.innerHTML;
    const w = W.open('', '_blank');
    if (!w) return notify('Pop-up bloquée par le navigateur', 'error');
    const base = siteBase();
    w.document.write(`<!DOCTYPE html><html lang="fr" data-theme="${esc(D.documentElement.dataset.theme || 'dark')}"><head><meta charset="utf-8"><title>${esc(n.name)}</title>
      <link rel="stylesheet" href="${esc(base)}css/01_styles_theme_and_layout.css">
      <link rel="stylesheet" href="${esc(base)}css/02_drive.css">
      <script>window.MathJax={tex:{inlineMath:[['$','$'],['\\(','\\)']],displayMath:[['$$','$$'],['\\[','\\]']]}};<\/script>
      <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"><\/script></head>
      <body class="print-body">
      <div class="print-head"><strong>${esc(n.name)}</strong> <span class="muted">— Drive · ${esc(new Date().toLocaleDateString('fr-FR'))}</span></div>
      ${html}<script>setTimeout(function(){window.print();},1500);<\/script></body></html>`);
    w.document.close();
  }

  /* ─────────── Markdown minimal ─────────── */
  function mdToHtml(src, n) {
    let s = esc(src || '');
    s = s.replace(/```([\s\S]*?)```/g, (_, c) => `<pre class="dsrc"><code>${c}</code></pre>`);
    s = s.replace(/`([^`]+)`/g, '<code class="dinline">$1</code>');
    s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, a, u) => `<img class="dimg" src="${esc(resolveAssetFrom(n, u))}" alt="${a}">`);
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    s = s.replace(/^######\s+(.*)$/gm, '<h6>$1</h6>').replace(/^#####\s+(.*)$/gm, '<h5>$1</h5>')
      .replace(/^####\s+(.*)$/gm, '<h4>$1</h4>').replace(/^###\s+(.*)$/gm, '<h3>$1</h3>')
      .replace(/^##\s+(.*)$/gm, '<h2>$1</h2>').replace(/^#\s+(.*)$/gm, '<h1>$1</h1>');
    s = s.replace(/^\s*[-*+]\s+(.*)$/gm, '<li>$1</li>').replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>');
    s = s.replace(/^>\s?(.*)$/gm, '<blockquote>$1</blockquote>');
    s = s.replace(/<\/ul>\s*<ul>/g, '');
    s = s.split(/\n{2,}/).map(b => /^<(h\d|ul|pre|blockquote)/.test(b.trim()) ? b : `<p>${b.replace(/\n/g, '<br>')}</p>`).join('\n');
    return s;
  }

  /* ══════════════════════════════════════════════════════════
     ACTIONS ADMIN
     ══════════════════════════════════════════════════════════ */
  async function addDriveModal() {
    if (!admin()) return notify('Réservé aux administrateurs', 'error');
    const EMOJIS = ['📁', '📘', '📗', '📕', '📙', '📚', '🧪', '⚛️', '🧮', '🗣️', '🇬🇧', '📝', '🎓', '🧠', '💡', '📊'];
    const r = await promptModal({
      title: 'Nouvel onglet Drive',
      fields: [
        { key: 'title', label: "Nom de l'onglet", ph: 'ex : Anglais', value: '' },
        { key: 'emoji', label: 'Emoji', ph: '📘', value: '📁', hint: `Suggestions : ${EMOJIS.join(' ')}` }
      ],
      okLabel: 'Créer l’onglet'
    });
    if (!r || !r.title.trim()) return;
    const d = S.addDrive(r.title, r.emoji || '📁');
    if (!d) return notify('Nom invalide', 'error');
    renderTabs();
    openDrive(d.id);
    notify(`Onglet « ${d.title} » créé — n’oublie pas de publier`, 'success');
  }

  async function newFolderModal(driveId, parentId) {
    const r = await promptModal({ title: 'Nouveau dossier', fields: [{ key: 'name', label: 'Nom du dossier', ph: 'ex : Chapitre 1' }], okLabel: 'Créer' });
    if (!r || !r.name.trim()) return;
    S.addFolder(driveId, parentId, r.name.trim());
    paint(); renderTabs();
    notify('Dossier créé — pense à publier', 'success');
  }

  async function newFileModal(kind) {
    const labels = { latex: 'LaTeX (.tex)', markdown: 'Markdown (.md)', text: 'Texte (.txt)' };
    const exts = { latex: '.tex', markdown: '.md', text: '.txt' };
    const templates = {
      latex: `\\documentclass[12pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{amsmath,amssymb}
\\usepackage{graphicx}

\\title{Titre du document}
\\author{Auteur}
\\date{\\today}

\\begin{document}
\\maketitle
\\tableofcontents

\\section{Première section}
Texte avec des maths : $E = mc^2$ et une équation numérotée
\\begin{equation}
  \\int_0^{\\infty} e^{-x^2}\\,dx = \\frac{\\sqrt{\\pi}}{2}
\\end{equation}

\\subsection{Une liste}
\\begin{itemize}
  \\item premier élément ;
  \\item deuxième élément.
\\end{itemize}

\\end{document}
`,
      markdown: `# Titre

## Section

- élément 1
- élément 2

**gras**, *italique*, \`code\`
`,
      text: ''
    };
    const r = await promptModal({
      title: `Nouveau fichier ${labels[kind]}`,
      fields: [{ key: 'name', label: 'Nom du fichier', ph: `ex : cours-01${exts[kind]}`, value: '' }],
      okLabel: 'Créer et éditer'
    });
    if (!r || !r.name.trim()) return;
    const n = await S.addTextFile(cur.driveId, cur.folderId || null, r.name.trim(), templates[kind] || '', kind);
    paint(); renderTabs();
    editorModal(n);
  }

  async function importFiles(driveId, parentId, files) {
    if (!admin()) return;
    const m = openModal(`
      <div class="dmodal-head"><h3>Import en cours</h3></div>
      <div class="dmodal-body"><div class="dprogress"><div class="dprogress-bar"><i style="width:0%"></i></div>
      <div class="dprogress-txt" id="impTxt">Préparation…</div></div></div>`, null, { locked: true });
    try {
      await S.addFiles(driveId, parentId, files, p => {
        const bar = m.el.querySelector('.dprogress-bar i');
        if (bar) bar.style.width = M.round(p.i * 100 / p.total) + '%';
        const t = m.el.querySelector('#impTxt');
        if (t) t.textContent = `${p.i}/${p.total} — ${p.name}`;
      });
      m.close();
      notify(`${files.length} fichier(s) importé(s) — pense à publier`, 'success');
      paint(); renderTabs();
    } catch (e) {
      m.close();
      notify('Erreur d’import : ' + (e.message || e), 'error');
    }
  }

  async function renameModal(n) {
    const r = await promptModal({ title: 'Renommer', fields: [{ key: 'name', label: 'Nouveau nom', value: n.name }], okLabel: 'Renommer' });
    if (!r || !r.name.trim() || r.name.trim() === n.name) return;
    S.rename(n.id, r.name.trim());
    paint(); renderTabs();
    notify('Renommé — pense à publier', 'success');
  }

  async function moveModal(n) {
    const d = S.drive(n.driveId);
    const folders = S.liveNodes().filter(x => x.driveId === d.id && x.kind === 'folder' && x.id !== n.id && !S.descendantsOf(n.id).some(y => y.id === x.id));
    const opts = [{ value: '', label: `📂 ${d.title} (racine)` }].concat(folders.map(f => ({ value: f.id, label: '📁 ' + S.fullPath(f) })));
    const r = await promptModal({ title: `Déplacer « ${n.name} »`, fields: [{ key: 'to', label: 'Destination', type: 'select', options: opts, value: n.parentId || '' }], okLabel: 'Déplacer' });
    if (!r) return;
    S.move(n.id, r.to || null);
    paint(); renderTabs();
    notify('Déplacé — pense à publier', 'success');
  }

  async function deleteModal(n) {
    const kids = n.kind === 'folder' ? S.descendantsOf(n.id).length : 0;
    const ok = await confirmModal('Supprimer ?',
      `« <strong>${esc(n.name)}</strong> »${kids ? ` et ses <strong>${kids}</strong> élément(s)` : ''} seront supprimés du Drive.<br>
       <span class="muted">La suppression ne sera effective pour les autres utilisateurs qu’après publication.</span>`, 'Supprimer');
    if (!ok) return;
    S.remove(n.id);
    if (cur.screen === 'file') back(); else paint();
    renderTabs();
    notify('Supprimé — pense à publier', 'success');
  }

  async function downloadNode(n) {
    try {
      const c = await S.getContent(n);
      if (!c) throw new Error('Contenu indisponible');
      const u = URL.createObjectURL(c.blob);
      const a = D.createElement('a');
      a.href = u; a.download = n.name; a.rel = 'noopener';
      D.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(u), 4000);
      notify('Téléchargement lancé', 'success');
    } catch (e) { notify('Téléchargement impossible : ' + (e.message || e), 'error'); }
  }

  /* ══════════════════════════════════════════════════════════
     ÉDITEUR (texte / LaTeX / markdown)
     ══════════════════════════════════════════════════════════ */
  const SNIPPETS = [
    { l: '§ Section', v: '\\section{Titre}\n' },
    { l: '§§ Sous-section', v: '\\subsection{Titre}\n' },
    { l: ' Gras', v: '\\textbf{texte}' },
    { l: ' Italique', v: '\\emph{texte}' },
    { l: '∑ Liste à puces', v: '\\begin{itemize}\n  \\item élément\n\\end{itemize}\n' },
    { l: '1. Liste numérotée', v: '\\begin{enumerate}\n  \\item élément\n\\end{enumerate}\n' },
    { l: 'a/b Fraction', v: '\\frac{a}{b}' },
    { l: '√ Racine', v: '\\sqrt{x}' },
    { l: '∫ Intégrale', v: '\\int_{a}^{b} f(x)\\,dx' },
    { l: '≡ Équation', v: '\\begin{equation}\n  E = mc^2\n\\end{equation}\n' },
    { l: '⎯ Alignement', v: '\\begin{align}\n  a &= b \\\\\n  c &= d\n\\end{align}\n' },
    { l: '$ Math inline', v: '$x^2$' },
    { l: '▦ Tableau', v: '\\begin{tabular}{|l|c|r|}\n  \\hline\n  A & B & C \\\\\n  \\hline\n  1 & 2 & 3 \\\\\n  \\hline\n\\end{tabular}\n' },
    { l: '🖼 Image', v: '\\includegraphics[width=0.8\\linewidth]{image.png}\n' },
    { l: '◻ Figure', v: '\\begin{figure}[h]\n  \\centering\n  \\includegraphics[width=0.7\\linewidth]{image.png}\n  \\caption{Légende}\n\\end{figure}\n' },
    { l: '📌 Théorème', v: '\\begin{theorem}[Nom]\n  Énoncé.\n\\end{theorem}\n' },
    { l: '† Note de bas de page', v: '\\footnote{note}' },
    { l: '⌗ Code', v: '\\begin{verbatim}\ncode\n\\end{verbatim}\n' }
  ];

  function editorModal(n) {
    if (!admin()) return;
    const isTex = n.kind === 'latex';
    const m = openModal(`
      <div class="dmodal-head">
        <h3>${ico(isTex ? 'file-code' : n.kind === 'markdown' ? 'list' : 'file-text','ico--sm')} Éditeur ${KIND_LABEL[n.kind] || ''}</h3>
        <button class="dmodal-x" data-x="close" aria-label="Fermer">${ico('x','ico--sm')}</button>
      </div>
      <div class="dedit-name">
        <input class="input" id="edName" value="${esc(n.name)}" spellcheck="false">
        <button class="dbtn" id="edPreviewBtn" ${n.kind === 'text' ? 'disabled' : ''}>${ico('eye','ico--sm')}Aperçu</button>
      </div>
      ${isTex ? `<div class="dedit-tools">${SNIPPETS.map((s, i) => `<button class="dtool" data-sn="${i}" title="${esc(s.v)}">${esc(s.l)}</button>`).join('')}</div>` : ''}
      <div class="dedit-body">
        <textarea id="edText" class="dedit-text" spellcheck="false" placeholder="${isTex ? '\\documentclass{article}…' : 'Écris ton contenu ici…'}"></textarea>
        <div id="edPreview" class="dedit-preview hidden"></div>
      </div>
      <div class="dmodal-foot">
        <span class="dedit-stat muted" id="edStat"></span>
        <button class="btn btn--ghost" data-x="close">Fermer</button>
        <button class="btn btn--solid btn--primary" data-x="save">${ico('save','ico--sm')}Enregistrer</button>
        <button class="btn btn--primary" data-x="savepub">${ico('upload','ico--sm')}Enregistrer + publier</button>
      </div>`,
      async (el, close) => {
        const ta = el.querySelector('#edText');
        const nameI = el.querySelector('#edName');
        const stat = el.querySelector('#edStat');
        const prev = el.querySelector('#edPreview');
        let previewOn = false;

        ta.value = (await S.localText(n.id)) || (n.publishedPath ? await S.getTextContent(n).catch(() => '') : '');
        const updStat = () => stat.textContent = `${ta.value.length} caractères · ${new Blob([ta.value]).size} o · ${ta.value.split('\n').length} lignes`;
        updStat();
        ta.oninput = () => { updStat(); if (previewOn) schedulePreview(); };

        let tPrev;
        const schedulePreview = () => { clearTimeout(tPrev); tPrev = setTimeout(doPreview, 500); };
        async function doPreview() {
          prev.innerHTML = '<div class="dloading"><div class="dspinner"></div>Compilation…</div>';
          try {
            if (isTex) {
              const out = TexRender.compile(ta.value, { resolveAsset: nm => resolveAssetFrom(n, nm) });
              prev.innerHTML = `<div class="dlatex">${out.html}</div>`;
              if (out.hasMath && W.loadMathJax) { await W.loadMathJax(); W.MathJax.typesetPromise && await W.MathJax.typesetPromise([prev]); }
            } else {
              prev.innerHTML = `<div class="dmd">${mdToHtml(ta.value, n)}</div>`;
            }
          } catch (e) { prev.innerHTML = `<div class="derror">${esc(e.message || e)}</div>`; }
        }
        el.querySelector('#edPreviewBtn').onclick = () => {
          previewOn = !previewOn;
          prev.classList.toggle('hidden', !previewOn);
          el.classList.toggle('split', previewOn);
          if (previewOn) doPreview();
        };
        el.querySelectorAll('[data-sn]').forEach(b => b.onclick = () => {
          const sn = SNIPPETS[+b.dataset.sn];
          const s = ta.selectionStart || ta.value.length, e = ta.selectionEnd || s;
          ta.value = ta.value.slice(0, s) + sn.v + ta.value.slice(e);
          ta.focus();
          const p = s + sn.v.length;
          ta.setSelectionRange(p, p);
          updStat(); if (previewOn) schedulePreview();
        });

        const doSave = async () => {
          const nm = nameI.value.trim();
          if (nm && nm !== n.name) S.rename(n.id, nm);
          await S.saveText(n.id, ta.value);
          paint(); renderTabs();
          return S.node(n.id);
        };
        el.querySelectorAll('[data-x="close"]').forEach(b => b.onclick = () => { close(); paint(); });
        el.querySelector('[data-x="save"]').onclick = async () => { await doSave(); close(); notify('Fichier enregistré (non publié)', 'success'); paint(); };
        el.querySelector('[data-x="savepub"]').onclick = async () => { await doSave(); close(); paint(); publishModal(); };
        ta.addEventListener('keydown', e => {
          if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); doSave().then(() => notify('Enregistré', 'success')); }
          if (e.key === 'Tab') { e.preventDefault(); const s = ta.selectionStart; ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(ta.selectionEnd); ta.setSelectionRange(s + 2, s + 2); }
        });
      }, { wide: true });
    return m;
  }

  /* ══════════════════════════════════════════════════════════
     PUBLICATION GITHUB
     ══════════════════════════════════════════════════════════ */
  async function publishModal() {
    if (!admin()) return notify('Réservé aux administrateurs', 'error');
    if (!S.isSignedIn()) return notify('Connecte-toi d’abord avec Google (bouton de synchronisation en haut)', 'error');

    const ch = S.pending();
    if (!S.hasToken()) return tokenModal(() => publishModal());
    if (!ch.any) return openModal(`
      <div class="dmodal-head"><h3>Publier sur GitHub</h3></div>
      <div class="dmodal-body"><p class="dmodal-text">✅ Tout est déjà publié.<br><span class="muted">Dernière publication : ${S.lastPublish() ? fmtDate(S.lastPublish().at) : 'jamais'}</span></p></div>
      <div class="dmodal-foot">${btnRow('ok', 'OK', 'btn--solid btn--primary')}</div>`,
      (el, close) => el.querySelector('[data-x="ok"]').onclick = close);

    const listHtml = [
      ...ch.upload.map(n => `<li class="dp-item"><span>${icon(n)}</span> ${esc(n.name)} <em class="muted">${n.publishedPath && n.publishedPath !== n.path ? '(déplacé/renommé)' : n.publishedPath ? '(modifié)' : '(nouveau)'} · ${S.fmtSize(n.size)}</em></li>`),
      ...ch.deletions.map(p => `<li class="dp-item dp-del"><span>🗑</span> ${esc(p.split('/').pop())} <em class="muted">supprimé</em></li>`),
      ...(ch.drivesDirty && !ch.upload.length && !ch.deletions.length ? [`<li class="dp-item"><span>🗂</span> Structure des onglets <em class="muted">mise à jour</em></li>`] : [])
    ].join('');

    openModal(`
      <div class="dmodal-head"><h3>Publier sur GitHub</h3><button class="dmodal-x" data-x="cancel" aria-label="Fermer">${ico('x','ico--sm')}</button></div>
      <div class="dmodal-body">
        <p class="dmodal-text">Ces modifications seront commitées directement sur <strong>${esc(S.CFG.branch)}</strong> de
          <a href="https://github.com/${esc(S.CFG.owner)}/${esc(S.CFG.repo)}" target="_blank" rel="noopener">${esc(S.CFG.owner)}/${esc(S.CFG.repo)}</a>
          dans <code>${esc(S.CFG.dir)}/</code>. Les autres utilisateurs les verront au rechargement de la page
          <span class="muted">(déploiement GitHub Pages : ~1 min)</span>.</p>
        <ul class="dp-list">${listHtml}</ul>
        <label class="dfield"><span class="dfield-label">Message du commit (optionnel)</span>
          <input class="input" id="pubMsg" placeholder="📦 drive : ajout du chapitre 3"></label>
        <div class="dprogress hidden" id="pubProg"><div class="dprogress-bar"><i style="width:0%"></i></div><div class="dprogress-txt"></div></div>
        <div class="dp-result hidden" id="pubRes"></div>
      </div>
      <div class="dmodal-foot">
        <button class="btn btn--ghost" data-x="cancel">Annuler</button>
        <button class="btn btn--solid btn--primary" data-x="go">${ico('upload','ico--sm')}Publier maintenant</button>
      </div>`,
      (el, close) => {
        const prog = el.querySelector('#pubProg'), bar = prog.querySelector('i'), txt = prog.querySelector('.dprogress-txt'), res = el.querySelector('#pubRes');
        el.querySelector('[data-x="cancel"]').onclick = () => close();
        el.querySelector('[data-x="go"]').onclick = async e => {
          const b = e.currentTarget;
          b.disabled = true; b.textContent = '⏳ Publication…';
          el.querySelector('[data-x="cancel"]').classList.add('hidden');
          prog.classList.remove('hidden');
          try {
            const last = await S.publish({
              message: el.querySelector('#pubMsg').value.trim() || undefined,
              onProgress: p => {
                const pct = p.total ? M.round(((p.i || 0) / p.total) * 100) : ({ ref: 5, blob: 40, manifest: 75, tree: 85, commit: 92, push: 97 }[p.step] || 10);
                bar.style.width = M.min(99, pct) + '%';
                txt.textContent = p.label || p.step;
              }
            });
            bar.style.width = '100%';
            txt.textContent = 'Terminé !';
            res.classList.remove('hidden');
            res.innerHTML = `✅ Publié — commit <code>${esc(last.sha.slice(0, 7))}</code> à ${fmtDate(last.at)}.
              <br><span class="muted">Visible par les autres utilisateurs dès que GitHub Pages a redéployé (~1 min).</span>
              <br><a href="https://github.com/${esc(S.CFG.owner)}/${esc(S.CFG.repo)}/commit/${esc(last.sha)}" target="_blank" rel="noopener">Voir le commit sur GitHub →</a>`;
            b.innerHTML = ico('circle-check','ico--sm') + 'Publié';
            renderTabs(); paint();
            notify('Publication réussie !', 'success');
          } catch (err) {
            res.classList.remove('hidden');
            res.className = 'dp-result dp-error';
            res.innerHTML = `⚠️ Échec : ${esc(err.message || err)}`;
            b.disabled = false; b.innerHTML = ico('refresh','ico--sm') + 'Réessayer';
            el.querySelector('[data-x="cancel"]').classList.remove('hidden');
            notify('Publication échouée', 'error');
          }
        };
      }, { wide: true });
  }

  function tokenModal(after) {
    openModal(`
      <div class="dmodal-head"><h3>${ico('key','ico--sm')} Token GitHub requis</h3><button class="dmodal-x" data-x="cancel" aria-label="Fermer">${ico('x','ico--sm')}</button></div>
      <div class="dmodal-body">
        <p class="dmodal-text">Pour publier directement dans le dépôt depuis ton navigateur, il faut un
          <strong>fine-grained personal access token</strong>. Il est stocké <strong>uniquement dans ce navigateur</strong>
          (localStorage) et n’est jamais publié ni partagé avec les autres utilisateurs.</p>
        <ol class="dp-steps">
          <li>Ouvre <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener">github.com/settings/personal-access-tokens/new</a></li>
          <li><em>Repository access</em> → <strong>Only select repositories</strong> → <code>${esc(S.CFG.owner)}/${esc(S.CFG.repo)}</code></li>
          <li><em>Permissions → Repository permissions → Contents</em> = <strong>Read and write</strong></li>
          <li><em>Generate token</em>, puis copie-colle le token ci-dessous</li>
        </ol>
        <label class="dfield"><span class="dfield-label">Token (commence par github_pat_… ou ghp_…)</span>
          <input class="input" id="tokIn" type="password" placeholder="github_pat_…" autocomplete="off" spellcheck="false"></label>
        <div class="dp-result hidden" id="tokRes"></div>
      </div>
      <div class="dmodal-foot">
        <button class="btn btn--ghost" data-x="cancel">Plus tard</button>
        <button class="btn btn--solid btn--primary" data-x="test">${ico('check','ico--sm')}Tester &amp; enregistrer</button>
      </div>`,
      (el, close) => {
        const res = el.querySelector('#tokRes');
        el.querySelector('[data-x="cancel"]').onclick = () => close();
        el.querySelector('[data-x="test"]').onclick = async e => {
          const v = el.querySelector('#tokIn').value.trim();
          if (!v) return;
          const b = e.currentTarget; b.disabled = true; b.textContent = '⏳ Test…';
          S.setToken(v);
          try {
            const info = await S.testToken();
            res.className = 'dp-result'; res.classList.remove('hidden');
            res.innerHTML = `✅ Connecté en tant que <strong>${esc(info.login)}</strong> — écriture OK sur ${esc(info.repo)}.`;
            notify('Token GitHub enregistré', 'success');
            setTimeout(() => { close(); after && after(); }, 600);
          } catch (err) {
            S.setToken('');
            res.className = 'dp-result dp-error'; res.classList.remove('hidden');
            res.innerHTML = `⚠️ ${esc(err.message || err)}`;
            b.disabled = false; b.innerHTML = ico('check','ico--sm') + 'Tester & enregistrer';
          }
        };
      }, { wide: true });
  }

  function adminPanel() {
    if (!admin()) return;
    // le Drive peut être fermé (cur === null) : on retombe sur le premier onglet
    const d = (cur && S.drive(cur.driveId)) || S.drives().filter(x => !x.removed)[0] || null;
    const last = S.lastPublish();
    const pend = S.pending();
    openModal(`
      <div class="dmodal-head"><h3>${ico('settings','ico--sm')} Administration du Drive</h3><button class="dmodal-x" data-x="cancel">✕</button></div>
      <div class="dmodal-body">
        <div class="dpanel-grid">
          <div><span class="muted">Connecté</span><br><strong>${esc(S.adminEmail() || '—')}</strong></div>
          <div><span class="muted">Dernière publication</span><br><strong>${last ? fmtDate(last.at) : 'jamais'}</strong></div>
          <div><span class="muted">En attente</span><br><strong>${pend.count} modification(s)</strong></div>
          <div><span class="muted">Token GitHub</span><br><strong>${S.hasToken() ? '✔ configuré' : '✘ absent'}</strong></div>
        </div>
        <div class="dpanel-sep"></div>
        <div class="dpanel-title">Onglet « ${esc(d ? d.title : '')} »</div>
        <div class="dpanel-actions">
          <button class="btn" data-x="rename-drive">Renommer l’onglet</button>
          <button class="btn btn--red" data-x="del-drive">Supprimer l’onglet</button>
        </div>
        <div class="dpanel-sep"></div>
        <div class="dpanel-title">Dépôt</div>
        <div class="dpanel-actions">
          <button class="btn" data-x="token">Token GitHub</button>
          <button class="btn" data-x="resync">Resynchroniser depuis GitHub</button>
          <button class="btn" data-x="publish">📤 Publier</button>
          <a class="btn" href="https://github.com/${esc(S.CFG.owner)}/${esc(S.CFG.repo)}/tree/${esc(S.CFG.branch)}/${esc(S.CFG.dir)}" target="_blank" rel="noopener">↗ Voir sur GitHub</a>
        </div>
        <p class="dmodal-text muted" style="margin-top:10px">Administrateurs autorisés : ${S.CFG.admins.map(esc).join(', ')}</p>
      </div>
      <div class="dmodal-foot"><button class="btn btn--ghost" data-x="cancel">Fermer</button></div>`,
      (el, close) => {
        el.querySelector('[data-x="cancel"]').onclick = () => close();
        el.querySelector('[data-x="rename-drive"]').onclick = async () => {
          if (!d) return notify('Aucun onglet à renommer', 'error');
          const r = await promptModal({ title: "Renommer l'onglet", fields: [{ key: 'title', label: 'Nom', value: d.title }, { key: 'emoji', label: 'Emoji', value: d.emoji || '' }], okLabel: 'Enregistrer' });
          if (r && r.title.trim()) { S.updateDrive(d.id, { title: r.title, emoji: r.emoji }); renderTabs(); paint(); notify('Onglet renommé', 'success'); }
        };
        el.querySelector('[data-x="del-drive"]').onclick = async () => {
          if (!d) return notify('Aucun onglet à supprimer', 'error');
          close();
          const ok = await confirmModal('Supprimer cet onglet ?', `L’onglet « <strong>${esc(d.title)}</strong> » et tous ses fichiers seront supprimés après publication.`, 'Supprimer l’onglet');
          if (!ok) return;
          S.removeDrive(d.id); renderTabs(); close(); notify('Onglet supprimé — publie pour appliquer', 'success');
        };
        el.querySelector('[data-x="token"]').onclick = () => { close(); tokenModal(adminPanel); };
        el.querySelector('[data-x="publish"]').onclick = () => { close(); publishModal(); };
        el.querySelector('[data-x="resync"]').onclick = async () => {
          const ok = await confirmModal('Resynchroniser ?', 'Ta copie locale sera <strong>remplacée</strong> par la version publiée sur GitHub. Les modifications non publiées seront perdues.', 'Resynchroniser');
          if (!ok) return;
          try { await S.resyncFromRemote(); renderTabs(); paint(); notify('Resynchronisé depuis GitHub', 'success'); }
          catch (e) { notify('Erreur : ' + (e.message || e), 'error'); }
        };
      }, { wide: true });
  }

  async function refreshNow() {
    const body = D.querySelector('#driveList');
    if (body) body.innerHTML = '<div class="dloading"><div class="dspinner"></div>Rechargement…</div>';
    try {
      const m = await S.fetchManifest();
      if (!m) throw new Error('Aucun contenu publié');
      if (admin()) {
        // on ne remplace la copie locale que si rien n'est en attente de publication
        if (!S.pending().any) await S.resyncFromRemote();
        else { S.applyManifest(m); notify('Modifications locales non publiées conservées', 'info'); }
      } else { S.applyManifest(m); LSset('pv_drive_rev', m.rev || m.generatedAt || 0); }
      renderTabs(); paint();
      notify('Drive rechargé', 'success');
    } catch (e) {
      paint();
      notify('Rechargement impossible : ' + (e.message || e), 'error');
    }
  }

  /* ══════════════════════════════════════════════════════════
     INITIALISATION
     ══════════════════════════════════════════════════════════ */
  function hookBackButton() {
    // Tant que le Drive est ouvert, on ignore les rendus de l'app flashcards
    // (ex. retour d'un pull Firebase) pour ne pas écraser l'affichage.
    if (!W.__driveDeckHooked && typeof W.goDeck === 'function') {
      W.__driveDeckHooked = true;
      const origDeck = W.goDeck;
      W.goDeck = function () {
        if (isOpen) { paint(); return; }
        return origDeck.apply(this, arguments);
      };
    }
    const btn = D.getElementById('backBtn');      // ⚠️ ne pas nommer cette variable « back » :
    if (!btn || btn.dataset.driveHooked) return;  //    elle masquerait la fonction back() du module
    btn.dataset.driveHooked = '1';
    const orig = btn.onclick;
    btn.onclick = e => {
      if (isOpen) { e.preventDefault(); e.stopPropagation(); back(); return; }
      orig && orig(e);
    };
    const title = D.getElementById('title');
    if (title && !title.dataset.driveHooked) {
      title.dataset.driveHooked = '1';
      const origT = title.onclick;
      title.onclick = e => { if (isOpen) { e.stopPropagation(); goRoot(); return; } origT && origT(e); };
    }
  }

  async function init() {
    if (booted) return;
    booted = true;
    hookBackButton();

    const run = async () => {
      const wasAdmin = admin();
      try { await S.boot(); } catch (e) { console.warn('[Drive] boot', e); }
      LSset('pv_drive_rev', (S.remoteInfo() || {}).rev || 0);
      renderTabs();
      if (isOpen && cur) paint();
      // notification de nouveauté pour les utilisateurs
      if (!wasAdmin || !admin()) notifyNewContent();
    };

    // premier lancement (l'auth Firebase peut arriver après)
    run();
    if (typeof firebase !== 'undefined' && firebase.auth) {
      firebase.auth().onAuthStateChanged(() => { renderTabs(); if (isOpen && cur) paint(); run(); });
    }
    S.onChange(() => { renderTabs(); });

    // raccourci clavier : Échap ferme le Drive
    D.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen && !D.querySelector('.dmodal-root')) back(); });

    // rechargement périodique du manifeste (nouveautés) — toutes les 3 min
    setInterval(() => {
      if (admin()) return;
      S.fetchManifest().then(m => {
        if (!m) return;
        const known = LSget('pv_drive_rev', 0);
        const rev = m.rev || m.generatedAt || 0;
        if (rev && rev > known) { S.applyManifest(m); LSset('pv_drive_rev', rev); renderTabs(); if (isOpen) paint(); notifyNewContent(); }
      }).catch(() => {});
    }, 180000);
  }

  function notifyNewContent() {
    const ids = S.drives().flatMap(d => S.unreadIds(d.id));
    if (!ids.length) return;
    const known = LSget('pv_drive_notif_rev', 0);
    const rev = (S.remoteInfo() || {}).rev || 0;
    if (rev && rev <= known) return;
    LSset('pv_drive_notif_rev', rev);
    notify(`${ids.length} nouveauté(s) dans le Drive`, 'info', 3500);
  }

  return {
    init, renderTabs, openDrive, close, back, goRoot, paint,
    get isOpen() { return isOpen; },
    get current() { return cur; },
    publishModal, adminPanel, refreshNow, addDriveModal,
    Store: S
  };
})();

/* ── démarrage différé (après l'init de l'app) ── */
(function startDrive() {
  const boot = () => { try { Drive.init(); } catch (e) { console.error('[Drive] init', e); } };
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', () => setTimeout(boot, 400));
  else setTimeout(boot, 400);
})();
