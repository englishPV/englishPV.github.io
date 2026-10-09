/*13_perso_drive.js*/
/* ══════════════════════════════════════════════════════════════════════
   MON DRIVE — espace personnel de chaque utilisateur (Google Drive)

   Chaque personne qui se connecte avec son compte Google obtient SON
   espace : un dossier « EnglishPV » créé dans son propre Drive, visible
   dans drive.google.com, et strictement privé (l'appli n'utilise que la
   portée « drive.file » : elle ne voit QUE les fichiers qu'elle a créés).

   • aucun serveur : tout se fait depuis le navigateur (GIS + Drive v3) ;
   • les fichiers déposés ici peuvent être insérés dans n'importe quelle
     carte (bouton « Image » → onglet « Mon Drive ») ou référencés dans un
     import par `drive://nom-du-fichier.png` ;
   • le jeton d'accès reste en mémoire (jamais écrit sur le disque).

   ⚙️ Configuration (une fois, ~5 min) : voir PDrive.procedureHTML()
   ou la section « Mon Drive personnel » du README.
   ══════════════════════════════════════════════════════════════════════ */
const PDrive = (() => {
  'use strict';

  const CFG = {
    /* Identifiant client OAuth « Application Web » du projet Google Cloud.
       Laisser vide tant que la procédure n'est pas faite : l'appli affiche
       alors un diagnostic clair (et accepte un identifiant collé à la main
       dans Paramètres → Mon Drive). */
    clientId: '',
    scope: 'https://www.googleapis.com/auth/drive.file',
    folderName: 'EnglishPV',
    LS_CLIENT: 'pv_pdrive_client_id',
    GIS_SRC: 'https://accounts.google.com/gsi/client'
  };

  const DRIVE = 'https://www.googleapis.com/drive/v3';
  const UPLOAD = 'https://www.googleapis.com/upload/drive/v3/files';
  const FOLDER_MIME = 'application/vnd.google-apps.folder';
  const FILE_FIELDS = 'id,name,mimeType,size,modifiedTime,iconLink,webViewLink';

  const esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const uid = () => 'pvf-' + Date.now().toString(36) + '-' + M.random().toString(36).slice(2, 7);
  const isImg = (name, mime) => /^image\//i.test(mime || '') || /\.(png|jpe?g|gif|webp|svg|bmp|avif|ico|tiff?)$/i.test(name || '');

  function stored() {
    if (typeof data === 'undefined' || !data) return null;
    data.app = data.app || {};
    if (!data.app.pDrive) data.app.pDrive = { email: '', folderId: '', files: [], syncedAt: 0 };
    data.app.pDrive.files = data.app.pDrive.files || [];
    return data.app.pDrive;
  }
  const save = () => { try { saveData(); } catch {} };

  /* ── Identifiant client ─────────────────────────────────────────── */
  const clientId = () => CFG.clientId || (() => { try { return LS.getItem(CFG.LS_CLIENT) || ''; } catch { return ''; } })();
  const configured = () => !!clientId();
  function setClientId(id) {
    const v = String(id || '').trim();
    try { v ? LS.setItem(CFG.LS_CLIENT, v) : LS.removeItem(CFG.LS_CLIENT); } catch {}
    token = null; email = null;
  }

  /* ── État de connexion ──────────────────────────────────────────── */
  let token = null, tokenExp = 0, email = null, tokenClient = null, gisLoading = null;
  let folderId = null, mirroring = false;

  const isConnected = () => !!token && Date.now() < tokenExp - 5000;
  const busy = () => mirroring;
  const knownEmail = () => (stored() || {}).email || email || '';
  const lastSync = () => (stored() || {}).syncedAt || 0;

  /* ── Chargement de Google Identity Services ─────────────────────── */
  function loadGIS() {
    if (gisLoading) return gisLoading;
    gisLoading = new Promise((res, rej) => {
      if (window.google && google.accounts && google.accounts.oauth2) return res();
      const s = D.createElement('script');
      s.src = CFG.GIS_SRC; s.async = true; s.defer = true;
      s.onload = () => (window.google && google.accounts && google.accounts.oauth2)
        ? res() : rej(new Error('Google Identity Services indisponible'));
      s.onerror = () => rej(new Error('Chargement de Google Identity Services impossible (réseau ou bloqueur)'));
      D.head.appendChild(s);
    });
    return gisLoading;
  }

  function ensureToken() {
    if (isConnected()) return Promise.resolve(token);
    if (!configured()) return Promise.reject(new Error('Identifiant client Google non configuré'));
    return loadGIS().then(() => new Promise((res, rej) => {
      try {
        tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: clientId(),
          scope: CFG.scope,
          callback: resp => {
            if (resp && resp.access_token) {
              token = resp.access_token;
              tokenExp = Date.now() + (Number(resp.expires_in || 3600) * 1000);
              fetchEmail().catch(() => {});
              res(token);
            } else rej(new Error((resp && resp.error) || 'Autorisation refusée'));
          },
          error_callback: err => rej(new Error((err && (err.message || err.type)) || 'Autorisation refusée'))
        });
        tokenClient.requestAccessToken({ prompt: '' });
      } catch (e) { rej(e); }
    }));
  }

  function connect({ interactive = true } = {}) {
    if (!configured()) return Promise.reject(new Error('Identifiant client Google non configuré'));
    if (isConnected()) return Promise.resolve(email);
    return loadGIS().then(() => new Promise((res, rej) => {
      try {
        tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: clientId(),
          scope: CFG.scope,
          callback: async resp => {
            if (!resp || !resp.access_token) return rej(new Error((resp && resp.error) || 'Autorisation refusée'));
            token = resp.access_token;
            tokenExp = Date.now() + (Number(resp.expires_in || 3600) * 1000);
            try {
              const me = await fetchEmail();
              const st = stored();
              if (st && st.email && st.email !== me) { st.files = []; st.folderId = ''; st.syncedAt = 0; }   // autre compte → autre espace
              if (st) { st.email = me; save(); }
              email = me;
              res(me);
            } catch (e) { res(email || ''); }
          },
          error_callback: err => rej(new Error((err && (err.message || err.type)) || 'Autorisation refusée'))
        });
        tokenClient.requestAccessToken({ prompt: interactive ? 'consent' : '' });
      } catch (e) { rej(e); }
    }));
  }

  function disconnect() { token = null; tokenExp = 0; email = null; folderId = null; }

  /* ── Appels REST ────────────────────────────────────────────────── */
  async function api(path, opts = {}) {
    const t = await ensureToken();
    const res = await fetch(path.startsWith('http') ? path : DRIVE + path, {
      method: opts.method || 'GET',
      headers: Object.assign({ Authorization: 'Bearer ' + t }, opts.headers || {}),
      body: opts.body
    });
    if (!res.ok) {
      let msg = '';
      try { const j = await res.json(); msg = (j.error && (j.error.message || j.error.status)) || ''; } catch { try { msg = await res.text(); } catch {} }
      throw new Error('Drive ' + res.status + (msg ? ' — ' + String(msg).slice(0, 160) : ''));
    }
    return res;
  }
  const apiJSON = async (path, opts) => (await api(path, opts)).json();

  async function fetchEmail() {
    const j = await apiJSON('/about?fields=user(emailAddress,displayName)');
    email = (j.user && j.user.emailAddress) || '';
    return email;
  }

  /* ── Dossier « EnglishPV » ──────────────────────────────────────── */
  async function ensureFolder() {
    const st = stored();
    if (folderId) return folderId;
    if (st && st.folderId) { folderId = st.folderId; return folderId; }
    const q = encodeURIComponent(`name='${CFG.folderName}' and mimeType='${FOLDER_MIME}' and trashed=false`);
    const found = await apiJSON(`/files?q=${q}&fields=files(id,name)&pageSize=10&spaces=drive`);
    let id = found.files && found.files[0] && found.files[0].id;
    if (!id) {
      const created = await apiJSON('/files?fields=id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: CFG.folderName, mimeType: FOLDER_MIME, parents: ['root'] })
      });
      id = created.id;
    }
    folderId = id;
    if (st) { st.folderId = id; save(); }
    return id;
  }

  /* ── Liste des fichiers ─────────────────────────────────────────── */
  async function list({ silent = false } = {}) {
    const fid = await ensureFolder();
    const q = encodeURIComponent(`'${fid}' in parents and trashed=false`);
    const j = await apiJSON(`/files?q=${q}&fields=files(${FILE_FIELDS})&orderBy=modifiedTime desc&pageSize=1000`);
    const files = (j.files || []).map(f => ({
      id: f.id, name: f.name, mime: f.mimeType,
      size: Number(f.size || 0), modifiedTime: f.modifiedTime,
      isImage: isImg(f.name, f.mimeType), isFolder: f.mimeType === FOLDER_MIME,
      link: f.webViewLink || ''
    }));
    const st = stored();
    if (st) { st.files = files; st.syncedAt = Date.now(); st.email = email || st.email; save(); }
    if (!silent && typeof FireSync !== 'undefined' && FireSync.isConnected) { try { FireSync.pushToCloud(); } catch {} }
    return files;
  }
  const cached = () => ((stored() || {}).files || []).map(f => Object.assign({ isImage: isImg(f.name, f.mime) }, f));
  const listImages = async () => (await list()).filter(f => f.isImage);

  /* ── Envoi d'un fichier (multipart + progression) ───────────────── */
  function upload(file, { onProgress } = {}) {
    return ensureFolder().then(fid => ensureToken().then(t => new Promise((res, rej) => {
      const boundary = 'pvd' + Date.now().toString(36) + M.random().toString(36).slice(2, 8);
      const meta = { name: file.name || 'sans-nom', parents: [fid] };
      const head = `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(meta)}\r\n`;
      const mid = `--${boundary}\r\nContent-Type: ${file.type || 'application/octet-stream'}\r\n\r\n`;
      const tail = `\r\n--${boundary}--`;
      const body = new Blob([head, mid, file, tail]);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${UPLOAD}?uploadType=multipart&fields=${encodeURIComponent(FILE_FIELDS)}`);
      xhr.setRequestHeader('Authorization', 'Bearer ' + t);
      xhr.setRequestHeader('Content-Type', 'multipart/related; boundary=' + boundary);
      if (xhr.upload && onProgress) {
        xhr.upload.onprogress = e => { if (e.lengthComputable) onProgress(M.round(e.loaded * 100 / e.total)); };
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const f = JSON.parse(xhr.responseText);
            const st = stored();
            if (st) {
              st.files = [{
                id: f.id, name: f.name, mime: f.mimeType, size: Number(f.size || file.size || 0),
                modifiedTime: f.modifiedTime, isImage: isImg(f.name, f.mimeType), isFolder: false, link: f.webViewLink || ''
              }, ...(st.files || [])];
              st.syncedAt = Date.now();
              save();
            }
            res(f);
          } catch (e) { rej(new Error('Réponse Drive illisible')); }
        } else rej(new Error('Drive ' + xhr.status + ' — ' + String(xhr.responseText || '').slice(0, 160)));
      };
      xhr.onerror = () => rej(new Error('Envoi impossible (réseau)'));
      xhr.send(body);
    })));
  }

  /* Plusieurs fichiers d'un coup, avec progression globale */
  async function uploadFiles(fileList, { onProgress } = {}) {
    const files = [...(fileList || [])];
    if (!files.length) return { ok: 0, errors: [] };
    const out = { ok: 0, errors: [] };
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      try {
        await upload(f, { onProgress: p => onProgress && onProgress(M.round((i + p / 100) * 100 / files.length), f.name) });
        out.ok++;
      } catch (e) { out.errors.push((f.name || '?') + ' : ' + e.message); }
    }
    if (out.ok) { try { if (typeof FireSync !== 'undefined' && FireSync.isConnected) FireSync.pushToCloud(); } catch {} }
    return out;
  }

  /* Miroir automatique des images importées localement (appelé par MediaLib) */
  async function mirror(localFiles) {
    if (!isConnected() || mirroring) return { ok: 0, errors: [] };
    mirroring = true;
    try {
      const existing = new Set(cached().map(f => String(f.name).toLowerCase()));
      const toSend = [...localFiles].filter(f => !existing.has(String(f.name).toLowerCase()));
      if (!toSend.length) return { ok: 0, errors: [] };
      const res = await uploadFiles(toSend);
      if (res.ok) toast(res.ok + ' image(s) copiée(s) dans Mon Drive', 'success');
      return res;
    } catch (e) { console.warn('[PDrive] miroir', e); return { ok: 0, errors: [e.message] }; }
    finally { mirroring = false; }
  }

  /* ── Lecture / suppression / renommage ─────────────────────────── */
  async function findByName(name) {
    const n = String(name || '').toLowerCase();
    let list_ = cached();
    let hit = list_.find(f => String(f.name).toLowerCase() === n) || list_.find(f => String(f.name).toLowerCase().replace(/\.[^.]+$/, '') === n.replace(/\.[^.]+$/, ''));
    if (hit) return hit;
    list_ = await list({ silent: true });
    return list_.find(f => String(f.name).toLowerCase() === n || String(f.name).toLowerCase().replace(/\.[^.]+$/, '') === n.replace(/\.[^.]+$/, '')) || null;
  }

  async function blob(id) {
    const res = await api('/files/' + encodeURIComponent(id) + '?alt=media');
    return res.blob();
  }

  /* Télécharge un fichier de Mon Drive et l'enregistre dans la bibliothèque
     d'images locale → utilisable dans les cartes (`media://clé`). */
  async function useAsMedia(nameOrId) {
    let f = cached().find(x => x.id === nameOrId) || null;
    if (!f) f = await findByName(nameOrId);
    if (!f) throw new Error('fichier introuvable');
    const b = await blob(f.id);
    if (typeof MediaLib === 'undefined') throw new Error('bibliothèque indisponible');
    const key = await MediaLib.addImageBlob(f.name, b, { source: 'pdrive', driveId: f.id });
    return { key, name: f.name, id: f.id };
  }

  async function remove(id) {
    await api('/files/' + encodeURIComponent(id), { method: 'DELETE' });
    const st = stored();
    if (st) { st.files = (st.files || []).filter(f => f.id !== id); save(); }
    return true;
  }

  async function rename(id, name) {
    const j = await apiJSON('/files/' + encodeURIComponent(id) + '?fields=' + encodeURIComponent(FILE_FIELDS), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    const st = stored();
    if (st) { const f = (st.files || []).find(x => x.id === id); if (f) { f.name = j.name; f.isImage = isImg(j.name, j.mimeType); } save(); }
    return j;
  }

  async function download(id, name) {
    const b = await blob(id);
    const a = D.createElement('a');
    a.href = URL.createObjectURL(b);
    a.download = name || 'fichier';
    D.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }

  const canUse = () => configured() && isConnected();
  const openInDrive = id => { const f = cached().find(x => x.id === id); if (f && f.link) W.open(f.link, '_blank'); };

  /* ── Vue « Mon Drive » ─────────────────────────────────────────── */
  function goView(push = true) {
    if (typeof exitDrive === 'function') exitDrive();
    if (push && typeof Nav !== 'undefined') Nav.push();
    State.view = 'pdrive';
    setTop({ title: 'Mon Drive' });
    setBot({ actions: false, revision: false });
    hideRevAct();
    view();
  }

  function view() {
    const v = $('#view');
    if (!v || State.view !== 'pdrive') return;
    const connected = isConnected();
    const prof = stored() || {};
    const list_ = cached();
    const total = list_.reduce((n, f) => n + (f.size || 0), 0);

    v.innerHTML = `
      <div class="card card--flush">
        <div class="view-head">
          <div>
            <h2 class="view-head__title">${ico('cloud','ico--sm')} Mon Drive</h2>
            <div class="view-head__meta">
              ${connected ? `Connecté${prof.email ? ' · <b>' + esc(prof.email) + '</b>' : ''} · dossier « ${esc(CFG.folderName)} » de ton Google Drive`
                          : (configured() ? 'Non connecté à Google Drive' : 'Configuration Google requise (voir Paramètres → Mon Drive)')}
              ${list_.length ? ` · ${list_.length} fichier${list_.length > 1 ? 's' : ''} · ${fmtBytes(total)}` : ''}
            </div>
          </div>
          <div class="view-head__actions">
            ${connected
              ? `<button class="btn btn--outline btn--sm" id="pdRefresh">${ico('refresh','ico--sm')}<span>Synchroniser</span></button>
                 <button class="btn btn--solid btn--primary btn--sm" id="pdUp">${ico('upload','ico--sm')}<span>Déposer</span></button>
                 <button class="btn btn--ghost btn--sm" id="pdOff">${ico('log-out','ico--sm')}<span>Déconnecter</span></button>`
              : `<button class="btn btn--solid btn--primary btn--sm" id="pdOn" ${configured() ? '' : 'disabled'}>${ico('cloud','ico--sm')}<span>Connecter mon Drive</span></button>`}
            <input type="file" id="pdInput" multiple class="hidden" accept="*/*">
          </div>
        </div>
        ${connected ? `
        <div class="pd-drop" id="pdDrop">${ico('upload','ico--sm')} Dépose ici tous tes fichiers (PDF, images, textes, audio, vidéo, archives…) — ou clique pour parcourir</div>` : ''}
        ${!configured() ? `<div class="pd-warn">${ico('alert-triangle','ico--sm')} L'application n'a pas encore d'identifiant client Google.
            <button class="btn btn--outline btn--tiny" id="pdHelp">Voir la procédure (5 min)</button></div>` : ''}
        ${configured() && !connected ? `<div class="pd-warn pd-warn--info">${ico('info','ico--sm')} Clique sur « Connecter mon Drive » : Google demandera l'autorisation,
            puis les fichiers seront rangés dans un dossier <b>${esc(CFG.folderName)}</b> de ton Drive (visible par toi seul).</div>` : ''}
        <div id="pdScroll" class="scroll-y deck-scroll">
          <div class="pd-list" id="pdList">${list_.length ? '' : `<div class="empty">${ico('cloud','ico--lg')}
            <div class="empty__title">${connected ? (prof.syncedAt ? 'Ton Drive est vide ici' : 'Liste non chargée') : 'Rien à afficher'}</div>
            <div class="empty__sub">${connected ? (prof.syncedAt ? 'Dépose tes premiers fichiers : ils resteront dans ton compte Google.' : 'Fichiers non encore affichés sur cet appareil.') : 'Connecte ton compte Google pour retrouver tes fichiers sur tous tes appareils.'}</div></div>`}</div>
        </div>
      </div>`;

    const grid = $('#pdList');
    if (grid && list_.length) {
      grid.innerHTML = list_.map(f => `
        <div class="pd-row" data-id="${esc(f.id)}">
          <div class="pd-row__ico">${ico(f.isImage ? 'image' : 'paperclip','ico--sm')}</div>
          <div class="pd-row__main">
            <div class="pd-row__name">${esc(f.name)}</div>
            <div class="pd-row__meta">${fmtBytes(f.size || 0)} · ${f.modifiedTime ? new Date(f.modifiedTime).toLocaleDateString('fr-FR') : ''}${f.isImage ? ' · image' : ''}</div>
          </div>
          <div class="pd-row__act">
            ${f.isImage ? `<button class="dbtn-icon" data-act="use" title="Utiliser comme image de carte">${ico('pencil','ico--sm')}</button>` : ''}
            <button class="dbtn-icon" data-act="get" title="Télécharger">${ico('download','ico--sm')}</button>
            <button class="dbtn-icon" data-act="ren" title="Renommer">${ico('pencil','ico--sm')}</button>
            <button class="dbtn-icon" data-act="del" title="Supprimer">${ico('trash','ico--sm')}</button>
          </div>
        </div>`).join('');
    }

    const on = $('#pdOn');
    if (on) on.onclick = async () => {
      on.disabled = true; on.innerHTML = 'Connexion…';
      try { await connect(); toast('Google Drive connecté', 'success'); view(); }
      catch (e) { toast(e.message || 'Connexion impossible', 'error'); on.disabled = false; on.innerHTML = ico('cloud','ico--sm') + '<span>Connecter mon Drive</span>'; }
    };
    const off = $('#pdOff'); if (off) off.onclick = () => { if (confirm('Déconnecter Google Drive ? Tes fichiers restent dans ton Drive.')) { disconnect(); view(); } };
    const rf = $('#pdRefresh');
    if (rf) rf.onclick = async () => { rf.disabled = true; try { await list(); toast('Liste à jour', 'success'); } catch (e) { toast(e.message, 'error'); } view(); };
    const help = $('#pdHelp'); if (help) help.onclick = () => procedureModal();
    const up = $('#pdUp'), inp = $('#pdInput'), drop = $('#pdDrop');
    if (up && inp) { up.onclick = () => inp.click(); inp.onchange = e => send([...(e.target.files || [])]); }
    if (drop) {
      drop.onclick = () => inp && inp.click();
      ['dragenter', 'dragover'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('is-over'); }));
      ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('is-over'); }));
      drop.addEventListener('drop', e => send([...(e.dataTransfer?.files || [])]));
    }
    async function send(files) {
      if (!files.length) return;
      if (inp) inp.value = '';
      const bar = D.createElement('div');
      bar.className = 'pd-progress';
      bar.innerHTML = '<span></span>';
      (drop || v).parentNode.insertBefore(bar, (drop || v).nextSibling);
      try {
        const r = await uploadFiles(files, { onProgress: (p, n) => { bar.innerHTML = `<span style="width:${p}%"></span><i>${esc(n || '')} ${p}%</i>`; } });
        bar.remove();
        toast(r.ok + ' fichier(s) déposé(s)' + (r.errors.length ? ` · ${r.errors.length} échec(s)` : ''), r.errors.length ? 'warn' : 'success');
        if (r.errors.length) console.warn('[PDrive]', r.errors);
      } catch (e) { bar.remove(); toast(e.message || 'Envoi impossible', 'error'); }
      view();
    }
    if (grid) grid.onclick = async e => {
      const row = e.target.closest('.pd-row'); if (!row) return;
      const id = row.dataset.id;
      const f = cached().find(x => x.id === id) || {};
      const act = (e.target.closest('[data-act]') || {}).dataset?.act;
      if (act === 'get') return download(id, f.name);
      if (act === 'ren') {
        const n = prompt('Nouveau nom :', f.name || '');
        if (!n || n === f.name) return;
        try { await rename(id, n); toast('Fichier renommé', 'success'); } catch (err) { toast(err.message, 'error'); }
        return view();
      }
      if (act === 'del') {
        if (!confirm(`Supprimer « ${f.name} » de ton Drive ?`)) return;
        try { await remove(id); toast('Fichier supprimé', 'success'); } catch (err) { toast(err.message, 'error'); }
        return view();
      }
      if (act === 'use') {
        try { const got = await useAsMedia(id); toast('Image prête : insère-la depuis l\'éditeur d\'une carte', 'success'); if (got) { if (typeof MediaLib !== 'undefined') MediaLib.view(); } }
        catch (err) { toast(err.message, 'error'); }
        return;
      }
      if (!act && f.link) W.open(f.link, '_blank');
    };
  }

  /* ── Réglages (Paramètres → Mon Drive) ─────────────────────────── */
  function settingsHTML() {
    const connected = isConnected();
    const prof = stored() || {};
    const id = clientId();
    return `<div class="settings-section" id="pdSection">
      <div class="section-title">Mon Drive (personnel)</div>
      <div class="s-row">
        <div class="s-icon dynamic">${ico('cloud')}</div>
        <div class="s-label">
          <div class="s-title">${connected ? 'Connecté' : (configured() ? 'Prêt à connecter' : 'À configurer')}</div>
          <div class="s-sub">${connected ? esc(prof.email || email || 'compte Google') + ' · dossier « ' + esc(CFG.folderName) + ' »'
                                       : 'Range tes propres fichiers (PDF, images, textes…) dans ton compte Google'}</div>
        </div>
        ${connected ? `<button class="btn btn--outline btn--sm" id="pdSetOff">Déconnecter</button>`
                    : `<button class="btn btn--solid btn--primary btn--sm" id="pdSetOn" ${configured() ? '' : 'disabled'}>Connecter</button>`}
      </div>
      <div class="s-row">
        <div class="s-icon dynamic">${ico('key')}</div>
        <div class="s-label">
          <div class="s-title">Identifiant client Google (OAuth)</div>
          <div class="s-sub">${configured() ? 'Enregistré sur cet appareil' : 'Colle ici l\'identifiant « Application Web » (…apps.googleusercontent.com)'}</div>
        </div>
        <div class="pd-cid">
          <input class="input" id="pdClientId" placeholder="123456-abc.apps.googleusercontent.com" value="${esc(id || '')}" spellcheck="false" autocomplete="off">
          <button class="btn btn--outline btn--sm" id="pdClientSave">Enregistrer</button>
          <button class="btn btn--ghost btn--sm" id="pdProcedure">Procédure</button>
        </div>
      </div>
      <div class="set-note">Le dossier <b>${esc(CFG.folderName)}</b> est créé automatiquement dans ton Drive au premier envoi. L'application n'a
        accès qu'aux fichiers qu'elle a créés (portée <code>drive.file</code>) : personne d'autre ne voit tes fichiers, ils restent dans ton compte Google.</div>
    </div>`;
  }

  function bindSettings(root, { onChange } = {}) {
    const sc = root || D;
    const on = sc.querySelector('#pdSetOn');
    if (on) on.onclick = async () => {
      on.disabled = true; on.textContent = 'Connexion…';
      try { await connect(); toast('Google Drive connecté', 'success'); if (onChange) onChange(); }
      catch (e) { toast(e.message || 'Connexion impossible', 'error'); on.disabled = false; on.textContent = 'Connecter'; }
    };
    const off = sc.querySelector('#pdSetOff');
    if (off) off.onclick = () => { disconnect(); toast('Google Drive déconnecté', 'info'); if (onChange) onChange(); };
    const save = sc.querySelector('#pdClientSave');
    if (save) save.onclick = () => {
      const v = (sc.querySelector('#pdClientId') || {}).value || '';
      if (!/.apps\.googleusercontent\.com\s*$/.test(v.trim()) && v.trim()) { toast('Identifiant invalide', 'error'); return; }
      setClientId(v);
      toast(v.trim() ? 'Identifiant enregistré' : 'Identifiant effacé', 'success');
      if (onChange) onChange();
    };
    const proc = sc.querySelector('#pdProcedure');
    if (proc) proc.onclick = () => procedureModal();
  }

  const procedureHTML = () => `
    <ol class="pd-proc">
      <li>Va sur <b>console.cloud.google.com</b> et choisis le projet <b>englishpv-b6727</b> (celui de la synchronisation).</li>
      <li><b>APIs &amp; Services → Library</b> → cherche <b>Google Drive API</b> → <b>Enable</b>.</li>
      <li><b>APIs &amp; Services → OAuth consent screen</b> : type <b>External</b>, nom de l'appli (ex. « Flashcards JB »), ton e-mail ;
          dans <b>Scopes</b> ajoute <code>https://www.googleapis.com/auth/drive.file</code> ; dans <b>Test users</b> ajoute les adresses
          Google qui utiliseront la fonctionnalité (toi, tes amis). Pour un usage large, clique <b>Publish app</b>.</li>
      <li><b>APIs &amp; Services → Credentials → Create credentials → OAuth client ID</b> →
          <b>Web application</b> → <b>Authorized JavaScript origins</b> : <code>https://englishpv.github.io</code> (et
          <code>http://localhost:8000</code> si tu testes en local) → <b>Create</b>.</li>
      <li>Copie l'identifiant <code>…apps.googleusercontent.com</code> et colle-le dans
          <b>Paramètres → Mon Drive → Identifiant client Google</b> (ou, une fois pour toutes, dans <code>js/13_perso_drive.js</code>,
          champ <code>CFG.clientId</code>).</li>
      <li>Clique <b>Connecter</b> : Google demande l'autorisation, un dossier <b>${esc(CFG.folderName)}</b> est créé dans ton Drive,
          visible sur <b>drive.google.com</b>. Chaque personne qui fait ça obtient son propre espace, privé.</li>
    </ol>
    <div class="pd-note-op">Sans cette configuration, la connexion reste désactivée — le reste de l'application fonctionne normalement.</div>`;

  function procedureModal() {
    if (typeof MediaLib !== 'undefined' && MediaLib.openCardForEdit) { /* no-op : simple garde */ }
    const root = D.createElement('div');
    root.className = 'card-editor-overlay';
    root.innerHTML = `<div class="card-editor ml-modal ml-modal--wide">
      <div class="card-editor-header"><h3>Configurer Mon Drive (Google)</h3>
        <button class="ce-close-btn" data-close aria-label="Fermer">${ico('x','ico--sm')}</button></div>
      <div class="card-editor-body ml-modal__body">${procedureHTML()}</div>
      <div class="card-editor-footer"><button class="btn btn--ghost" data-close>Fermer</button></div>
    </div>`;
    D.body.appendChild(root);
    root.querySelectorAll('[data-close]').forEach(b => b.onclick = () => root.remove());
    root.onclick = e => { if (e.target === root) root.remove(); };
    return root;
  }

  return {
    CFG, connect, disconnect, isConnected, busy, configured, clientId, setClientId,
    ensureFolder, list, cached, listImages, upload, uploadFiles, mirror,
    useAsMedia, findByName, remove, rename, download, blob,
    canUse, knownEmail, lastSync, openInDrive,
    goView, view, settingsHTML, bindSettings, procedureHTML, procedureModal
  };
})();
window.PDrive = PDrive;
