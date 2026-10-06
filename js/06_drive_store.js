/*06_drive_store.js*/
/* ══════════════════════════════════════════════════════════════
   DRIVE — Modèle de données, stockage local (IndexedDB) et
           publication vers le dépôt GitHub (Git Data API)

   • Les administrateurs (liste blanche d'emails Google) éditent
     un "working copy" local, puis cliquent sur « Publier » pour
     commiter dans /content/drive du dépôt.
   • Les autres utilisateurs lisent uniquement le manifeste publié
     (GitHub Pages, avec repli sur raw.githubusercontent.com).
   ══════════════════════════════════════════════════════════════ */
const DriveStore = (() => {
  'use strict';

  /* ── Configuration ─────────────────────────────────────────── */
  const CFG = {
    // ⬇️ SEULS ces comptes Google voient les outils d'administration
    admins: ['jb.cedric0@gmail.com', 'lolmacteur1@gmail.com'],
    owner: 'englishPV',
    repo: 'englishPV.github.io',
    branch: 'main',
    dir: 'content/drive',          // dossier publié dans le dépôt
    LS_STATE: 'pv_drive_state_v1',
    LS_SEEN: 'pv_drive_seen_v1',
    LS_TOKEN: 'pv_drive_gh_token_v1',
    LS_LAST: 'pv_drive_last_pub_v1'
  };
  const API = 'https://api.github.com';
  const REPO_PATH = `/repos/${CFG.owner}/${CFG.repo}`;
  const RAW_BASE = `https://raw.githubusercontent.com/${CFG.owner}/${CFG.repo}/${CFG.branch}/${CFG.dir}/`;
  const PAGES_BASE = `${CFG.dir}/`;

  /* ── Petits utilitaires ────────────────────────────────────── */
  const now = () => Date.now();
  const uid = p => `${p}-${now().toString(36)}-${M.random().toString(36).slice(2, 7)}`;
  const LSget = (k, fb) => { try { const v = LS.getItem(k); return v == null ? fb : JSON.parse(v); } catch { return fb; } };
  const LSset = (k, v) => { try { LS.setItem(k, JSON.stringify(v)); } catch (e) { console.warn('[Drive] localStorage', e); } };

  // Nom de fichier sûr pour git / GitHub Pages
  const safeName = n => String(n || 'sans-nom')
    .replace(/[\\/:*?"<>|#%&{}$!'@+`=]/g, '-')
    .replace(/\s+/g, ' ')
    .replace(/^[-.\s]+|[-.\s]+$/g, '')
    .replace(/^_+/, '')            // Jekyll ignore les fichiers commençant par _
    .slice(0, 120) || 'sans-nom';

  const localSlug = s => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const extOf = n => { const m = /\.([a-z0-9]{1,8})$/i.exec(String(n || '')); return m ? m[1].toLowerCase() : ''; };

  function kindOf(name, mime) {
    const e = extOf(name), m = String(mime || '');
    if (['tex', 'latex', 'ltx'].includes(e)) return 'latex';
    if (['md', 'markdown'].includes(e)) return 'markdown';
    if (m.startsWith('image/') || ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp', 'avif', 'ico'].includes(e)) return 'image';
    if (m === 'application/pdf' || e === 'pdf') return 'pdf';
    if (m.startsWith('audio/') || ['mp3', 'wav', 'ogg', 'm4a', 'flac', 'aac'].includes(e)) return 'audio';
    if (m.startsWith('video/') || ['mp4', 'webm', 'mov', 'mkv', 'avi'].includes(e)) return 'video';
    if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2'].includes(e)) return 'archive';
    if (m.startsWith('text/') || ['txt', 'csv', 'tsv', 'json', 'log', 'ini', 'yml', 'yaml', 'xml', 'html', 'css', 'js', 'py', 'c', 'cpp', 'h', 'java', 'sql', 'rtf'].includes(e)) return 'text';
    return 'file';
  }

  const TEXT_KINDS = ['text', 'latex', 'markdown'];
  const isTextKind = k => TEXT_KINDS.includes(k);

  /* ── IndexedDB (contenu des fichiers) ──────────────────────── */
  const IDB = {
    db: null,
    open() {
      if (this.db) return Promise.resolve(this.db);
      return new Promise((res, rej) => {
        const r = indexedDB.open('pv_drive', 1);
        r.onupgradeneeded = () => { if (!r.result.objectStoreNames.contains('blobs')) r.result.createObjectStore('blobs'); };
        r.onsuccess = () => { this.db = r.result; res(this.db); };
        r.onerror = () => rej(r.error);
        r.onblocked = () => rej(new Error('IndexedDB bloqué'));
      });
    },
    async put(k, v) { const d = await this.open(); return new Promise((res, rej) => { const tx = d.transaction('blobs', 'readwrite'); tx.objectStore('blobs').put(v, k); tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error); }); },
    async get(k) { const d = await this.open(); return new Promise((res, rej) => { const tx = d.transaction('blobs', 'readonly'); const q = tx.objectStore('blobs').get(k); q.onsuccess = () => res(q.result ?? null); q.onerror = () => rej(q.error); }); },
    async del(k) { const d = await this.open(); return new Promise(res => { const tx = d.transaction('blobs', 'readwrite'); tx.objectStore('blobs').delete(k); tx.oncomplete = res; tx.onerror = res; }); },
    async keys() { const d = await this.open(); return new Promise(res => { const tx = d.transaction('blobs', 'readonly'); const q = tx.objectStore('blobs').getAllKeys(); q.onsuccess = () => res(q.result || []); q.onerror = () => res([]); }); }
  };

  /* ── État (arbre des onglets / dossiers / fichiers) ────────── */
  // state = { v, drives:[{id,slug,title,emoji,createdAt,order,dirty,removed,published}],
  //           nodes:[{id,driveId,parentId,name,kind,mime,size,addedAt,updatedAt,
  //                   path,publishedPath,publishedAt,dirty,removed,by}] }
  let state = LSget(CFG.LS_STATE, null) || { v: 1, drives: [], nodes: [] };
  if (!Array.isArray(state.drives)) state.drives = [];
  if (!Array.isArray(state.nodes)) state.nodes = [];

  let remoteBase = PAGES_BASE;     // base gagnante du dernier manifeste
  let remoteInfo = null;           // { rev, generatedAt, count }
  let mirrorOnly = false;          // true = utilisateur non-admin (lecture seule)
  const listeners = new Set();
  const emit = ev => listeners.forEach(fn => { try { fn(ev || {}); } catch (e) { console.warn(e); } });

  // la copie de travail (admin) comme le miroir (lecteurs) sont mis en cache :
  // l'onglet s'affiche instantanément au prochain chargement
  function save() { LSset(CFG.LS_STATE, state); }
  function onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }

  /* ── Auth / droits ─────────────────────────────────────────── */
  function emails() {
    try {
      const u = (typeof FireSync !== 'undefined' && FireSync.getUser && FireSync.getUser()) ||
                (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) || null;
      if (!u) return [];
      const list = [u.email];
      (u.providerData || []).forEach(p => p && p.email && list.push(p.email));
      return list.filter(Boolean).map(e => String(e).trim().toLowerCase());
    } catch { return []; }
  }
  const isSignedIn = () => emails().length > 0;
  const isAdmin = () => emails().some(e => CFG.admins.includes(e));
  const adminEmail = () => emails().find(e => CFG.admins.includes(e)) || emails()[0] || null;
  const canEdit = () => isAdmin();

  /* ── Token GitHub (uniquement sur le navigateur de l'admin) ── */
  const getToken = () => { try { return LS.getItem(CFG.LS_TOKEN) || ''; } catch { return ''; } };
  function setToken(t) { const v = String(t || '').trim(); try { v ? LS.setItem(CFG.LS_TOKEN, v) : LS.removeItem(CFG.LS_TOKEN); } catch {} }
  const hasToken = () => !!getToken();

  /* ── "Pastilles bleues" : suivi des ouvertures ─────────────── */
  let seen = LSget(CFG.LS_SEEN, {});
  const saveSeen = () => LSset(CFG.LS_SEEN, seen);
  function markSeen(id, ts) { seen[id] = ts || now(); saveSeen(); }
  function markSeenAll(ids) { const t = now(); (ids || []).forEach(i => seen[i] = t); saveSeen(); }
  const lastSeen = id => seen[id] || 0;
  function isUnread(n) { return !!n && n.kind !== 'folder' && !n.removed && (n.updatedAt || n.addedAt || 0) > lastSeen(n.id); }
  function unreadIn(driveId, parentId) {
    let c = 0;
    const scan = pid => nodesOf(driveId, pid).forEach(n => {
      if (n.removed) return;
      if (n.kind === 'folder') c += unreadIn(driveId, n.id);
      else if (isUnread(n)) c++;
    });
    scan(parentId === undefined ? null : parentId);
    return c;
  }
  function unreadIds(driveId) {
    const out = [];
    const walk = pid => nodesOf(driveId, pid).forEach(n => {
      if (n.removed) return;
      if (n.kind === 'folder') walk(n.id); else if (isUnread(n)) out.push(n.id);
    });
    walk(null); return out;
  }

  /* ── Lectures de l'arbre ───────────────────────────────────── */
  const drives = () => state.drives.filter(d => !d.removed).sort((a, b) => (a.order || 0) - (b.order || 0));
  const drive = id => state.drives.find(d => d.id === id) || null;
  const node = id => state.nodes.find(n => n.id === id) || null;
  const liveNodes = () => state.nodes.filter(n => !n.removed);
  function nodesOf(driveId, parentId = null) {
    return liveNodes().filter(n => n.driveId === driveId && (n.parentId || null) === (parentId || null));
  }
  function childrenOf(folderId) { return liveNodes().filter(n => n.parentId === folderId); }
  function descendantsOf(folderId) {
    const out = []; const walk = pid => childrenOf(pid).forEach(c => { out.push(c); if (c.kind === 'folder') walk(c.id); });
    walk(folderId); return out;
  }
  function driveOf(node) { return node ? drive(node.driveId) : null; }
  function breadcrumb(n) {
    const chain = []; let cur = n;
    while (cur) { chain.unshift(cur); cur = cur.parentId ? node(cur.parentId) : null; }
    return chain;
  }
  const fullPath = n => breadcrumb(n).map(x => x.name).join(' / ');

  /* ── Chemins dans le dépôt ─────────────────────────────────── */
  function refreshPaths() {
    const used = new Set();
    drives().forEach(d => {
      const walk = (parentId, prefix) => {
        nodesOf(d.id, parentId).forEach(n => {
          if (n.kind === 'folder') {
            let base = safeName(n.name);
            let p = prefix + base, i = 2;
            while (used.has(p.toLowerCase())) { p = `${prefix}${base}-${i++}`; }
            used.add(p.toLowerCase());
            n.path = p;
            walk(n.id, p + '/');
          } else {
            let base = safeName(n.name);
            let p = prefix + base, i = 2;
            while (used.has(p.toLowerCase())) { const e = extOf(base); p = e ? `${prefix}${base.slice(0, -(e.length + 1))}-${i++}.${e}` : `${prefix}${base}-${i++}`; }
            used.add(p.toLowerCase());
            n.path = p;
          }
        });
      };
      walk(null, `${CFG.dir}/${d.slug || localSlug(d.title) || d.id}/`);
    });
  }

  /* ── Écritures (admin) ─────────────────────────────────────── */
  function addDrive(title, emoji) {
    const t = String(title || '').trim();
    if (!t) return null;
    const slugBase = (typeof slugify === 'function' ? slugify(t) : localSlug(t)) || 'drive';
    const d = {
      id: uid('drv'), slug: `${slugBase}-${M.random().toString(36).slice(2, 6)}`,
      title: t, emoji: String(emoji || '📁').trim(), createdAt: now(),
      order: (state.drives.length + 1) * 10, dirty: true, published: false
    };
    state.drives.push(d); save(); refreshPaths(); emit({ type: 'drive-added', id: d.id });
    return d;
  }

  function updateDrive(id, patch) {
    const d = drive(id); if (!d) return null;
    if (patch.title !== undefined) d.title = String(patch.title).trim() || d.title;
    if (patch.emoji !== undefined) d.emoji = String(patch.emoji).trim();
    if (patch.order !== undefined) d.order = patch.order;
    d.dirty = true; save(); refreshPaths(); emit({ type: 'drive-updated', id });
    return d;
  }

  function removeDrive(id) {
    const d = drive(id); if (!d) return false;
    const ids = new Set(state.nodes.filter(n => n.driveId === id).map(n => n.id));
    state.nodes.forEach(n => { if (ids.has(n.id)) n.removed = true; });
    d.removed = true; d.dirty = true;
    save(); emit({ type: 'drive-removed', id });
    return true;
  }

  function uniqueName(driveId, parentId, name, exceptId) {
    const taken = new Set(nodesOf(driveId, parentId).filter(n => n.id !== exceptId).map(n => n.name.toLowerCase()));
    if (!taken.has(String(name).toLowerCase())) return name;
    const e = extOf(name), base = e ? name.slice(0, -(e.length + 1)) : name;
    let i = 2, out;
    do { out = e ? `${base} (${i}).${e}` : `${base} (${i})`; i++; } while (taken.has(out.toLowerCase()));
    return out;
  }

  function addFolder(driveId, parentId, name) {
    const d = drive(driveId); if (!d) return null;
    const n = {
      id: uid('fld'), driveId, parentId: parentId || null,
      name: uniqueName(driveId, parentId, String(name || 'Nouveau dossier').trim() || 'Nouveau dossier'),
      kind: 'folder', mime: '', size: 0, addedAt: now(), updatedAt: now(),
      dirty: true, by: adminEmail()
    };
    state.nodes.push(n); save(); refreshPaths(); emit({ type: 'node-added', id: n.id });
    return n;
  }

  async function addTextFile(driveId, parentId, name, text, kind) {
    const d = drive(driveId); if (!d) return null;
    let nm = String(name || 'sans-titre').trim();
    if (!extOf(nm)) nm += kind === 'latex' ? '.tex' : kind === 'markdown' ? '.md' : '.txt';
    const k = kind || kindOf(nm);
    const n = {
      id: uid('fil'), driveId, parentId: parentId || null,
      name: uniqueName(driveId, parentId, nm), kind: k,
      mime: k === 'latex' ? 'application/x-tex' : 'text/plain',
      size: new Blob([text || '']).size, addedAt: now(), updatedAt: now(),
      dirty: true, by: adminEmail()
    };
    await IDB.put(n.id, new Blob([text || ''], { type: 'text/plain;charset=utf-8' }));
    state.nodes.push(n); save(); refreshPaths(); markSeen(n.id);
    emit({ type: 'node-added', id: n.id });
    return n;
  }

  async function addFiles(driveId, parentId, fileList, onProgress) {
    const out = [];
    const files = [...fileList];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      onProgress && onProgress({ i: i + 1, total: files.length, name: f.name });
      const kind = kindOf(f.name, f.type);
      const n = {
        id: uid('fil'), driveId, parentId: parentId || null,
        name: uniqueName(driveId, parentId, f.name),
        kind, mime: f.type || '', size: f.size,
        addedAt: now(), updatedAt: now(), dirty: true, by: adminEmail()
      };
      await IDB.put(n.id, f);
      state.nodes.push(n);
      markSeen(n.id);            // l'admin connaît déjà son propre import
      out.push(n);
    }
    save(); refreshPaths(); emit({ type: 'nodes-added', ids: out.map(n => n.id) });
    return out;
  }

  async function saveText(id, text) {
    const n = node(id); if (!n) return null;
    await IDB.put(id, new Blob([text || ''], { type: 'text/plain;charset=utf-8' }));
    n.size = new Blob([text || '']).size;
    n.updatedAt = now(); n.dirty = true;
    save(); emit({ type: 'node-updated', id });
    return n;
  }

  function rename(id, name) {
    const n = node(id); if (!n) return null;
    const nm = String(name || '').trim(); if (!nm) return null;
    n.name = uniqueName(n.driveId, n.parentId, nm, n.id);
    n.kind = n.kind === 'folder' ? 'folder' : kindOf(n.name, n.mime);
    n.updatedAt = now(); n.dirty = true;
    save(); refreshPaths(); emit({ type: 'node-updated', id });
    return n;
  }

  function move(id, parentId) {
    const n = node(id); if (!n) return false;
    const target = parentId ? node(parentId) : null;
    if (target && (target.kind !== 'folder' || target.driveId !== n.driveId)) return false;
    if (parentId && (parentId === n.id || descendantsOf(n.id).some(x => x.id === parentId))) return false;
    n.parentId = parentId || null;
    n.name = uniqueName(n.driveId, n.parentId, n.name, n.id);
    n.updatedAt = now(); n.dirty = true;
    save(); refreshPaths(); emit({ type: 'node-moved', id });
    return true;
  }

  function remove(id) {
    const n = node(id); if (!n) return false;
    const kill = x => {
      x.removed = true; x.dirty = true;
      if (x.kind === 'folder') childrenOf(x.id).forEach(kill);
    };
    kill(n); save(); emit({ type: 'node-removed', id });
    return true;
  }

  /* ── Contenu local / distant ───────────────────────────────── */
  const localBlob = id => IDB.get(id);
  async function blobText(b) {
    if (b == null) return null;
    if (typeof b === 'string') return b;
    if (typeof b.text === 'function') return await b.text();
    if (typeof b.arrayBuffer === 'function') return new TextDecoder().decode(await b.arrayBuffer());
    return String(b);
  }
  const localText = async id => blobText(await IDB.get(id));

  function pagesUrl(path) { return encodeURI(path).split('/').map(encodeURIComponent).join('/').replace(/%3A/g, ':'); }
  function rawUrl(path) { return RAW_BASE + path.split('/').slice(CFG.dir.split('/').length).map(encodeURIComponent).join('/'); }

  async function fetchText(url, asJson) {
    const r = await fetch(url, { cache: 'no-store' });
    if (!r.ok) throw Object.assign(new Error('HTTP ' + r.status), { status: r.status });
    return asJson ? r.json() : r.text();
  }

  // Récupère un fichier publié (Pages d'abord, raw en repli)
  async function fetchRemoteText(path) {
    const bust = '?t=' + now();
    try { return await fetchText(pagesUrl(path) + bust); }
    catch (e) { if (e.status !== 404) throw e; }
    return await fetchText(rawUrl(path) + bust);
  }
  function remoteFileUrl(path) { return pagesUrl(path); }     // pour <img>, <iframe>, <a download>

  async function getContent(n) {
    if (!n) return null;
    // 1) copie locale non publiée (admin)
    const local = await IDB.get(n.id);
    if (local) return { blob: local, source: 'local' };
    // 2) publié
    const p = n.path || n.publishedPath;
    if (!p) throw new Error('Fichier indisponible');
    try {
      const r = await fetch(pagesUrl(p), { cache: 'no-store' });
      if (r.ok) return { blob: await r.blob(), source: 'pages' };
    } catch {}
    const r2 = await fetch(rawUrl(p), { cache: 'no-store' });
    if (!r2.ok) throw new Error('HTTP ' + r2.status);
    return { blob: await r2.blob(), source: 'raw' };
  }

  async function getTextContent(n) {
    const c = await getContent(n);
    return c ? await blobText(c.blob) : '';
  }

  /* ── Manifeste publié ──────────────────────────────────────── */
  function buildManifest() {
    refreshPaths();
    const ds = drives();
    return {
      v: 1,
      rev: now(),
      generatedAt: now(),
      repo: `${CFG.owner}/${CFG.repo}`,
      branch: CFG.branch,
      publishedBy: adminEmail(),
      drives: ds.map(d => ({ id: d.id, slug: d.slug, title: d.title, emoji: d.emoji, createdAt: d.createdAt, order: d.order || 0 })),
      files: liveNodes().map(n => ({
        id: n.id, driveId: n.driveId, parentId: n.parentId || null,
        name: n.name, kind: n.kind, mime: n.mime || '', size: n.size || 0,
        addedAt: n.addedAt, updatedAt: n.updatedAt, publishedAt: now(),
        path: n.path, by: n.by || null
      }))
    };
  }

  function applyManifest(m) {
    const drivesIn = Array.isArray(m.drives) ? m.drives : [];
    const files = Array.isArray(m.files) ? m.files : [];
    state = {
      v: 1,
      drives: drivesIn.map((d, i) => ({
        id: d.id, slug: d.slug || ('drive-' + i), title: d.title || 'Drive', emoji: d.emoji || '📁',
        createdAt: d.createdAt || 0, order: d.order || (i + 1) * 10, published: true
      })),
      nodes: files.map(f => ({
        id: f.id, driveId: f.driveId, parentId: f.parentId || null, name: f.name,
        kind: f.kind || kindOf(f.name, f.mime), mime: f.mime || '', size: f.size || 0,
        addedAt: f.addedAt || 0, updatedAt: f.updatedAt || f.addedAt || 0,
        path: f.path, publishedPath: f.path, publishedAt: f.publishedAt || f.addedAt || 0,
        by: f.by || null, dirty: false
      }))
    };
    remoteInfo = { rev: m.rev || m.generatedAt || 0, generatedAt: m.generatedAt || 0, count: files.length };
    save();
  }

  async function fetchManifest() {
    const bust = '?t=' + now();
    const tries = [
      { base: PAGES_BASE, url: PAGES_BASE + 'manifest.json' + bust },
      { base: RAW_BASE, url: RAW_BASE + 'manifest.json' + bust }
    ];
    let best = null;
    for (const t of tries) {
      try {
        const m = await fetchText(t.url, true);
        if (m && (Array.isArray(m.files) || Array.isArray(m.drives))) {
          if (!best || (m.rev || m.generatedAt || 0) > (best.m.rev || best.m.generatedAt || 0)) best = { m, base: t.base };
          if (t.base === RAW_BASE) break;   // raw est toujours à jour
        }
      } catch (e) { /* 404 = pas encore publié */ }
    }
    if (!best) return null;
    remoteBase = best.base;
    return best.m;
  }

  /* Chargement au démarrage :
     • non-admin → miroir du manifeste publié (lecture seule)
     • admin     → copie locale ; si vide, on importe le publié  */
  async function boot() {
    if (!isAdmin()) {
      mirrorOnly = true;
      const cached = state.drives.length + state.nodes.length;   // miroir déjà en cache
      try {
        const m = await fetchManifest();
        if (m) applyManifest(m);
        else if (!cached) state = { v: 1, drives: [], nodes: [] };
      } catch (e) { console.warn('[Drive] boot', e); }
      mirrorOnly = true;
      emit({ type: 'boot' });
      return { admin: false, count: state.nodes.length };
    }
    mirrorOnly = false;
    refreshPaths();
    if (!state.drives.length && !state.nodes.length) {
      try { const m = await fetchManifest(); if (m) applyManifest(m); } catch {}
    } else {
      // on note juste l'état distant pour info
      fetchManifest().then(m => { if (m) remoteInfo = { rev: m.rev || 0, generatedAt: m.generatedAt || 0, count: (m.files || []).length }; emit({ type: 'remote-info' }); }).catch(() => {});
    }
    emit({ type: 'boot' });
    return { admin: true, count: state.nodes.length };
  }

  // Resynchronisation forcée depuis GitHub (admin, autre appareil)
  async function resyncFromRemote() {
    const m = await fetchManifest();
    if (!m) throw new Error('Aucun manifeste publié trouvé.');
    const ids = state.nodes.map(n => n.id);
    await Promise.all(ids.map(id => IDB.del(id).catch(() => {})));
    state = { v: 1, drives: [], nodes: [] };
    mirrorOnly = false;
    applyManifest(m);
    // les fichiers publiés sont lus à la demande depuis le dépôt
    emit({ type: 'resync' });
    return m;
  }

  /* ── Changements en attente ────────────────────────────────── */
  function pending() {
    refreshPaths();
    const up = [], del = new Set(), moved = [];
    state.nodes.forEach(n => {
      // un dossier n'existe pas en tant que tel dans git : seuls ses fichiers comptent
      if (n.removed) { if (n.kind !== 'folder' && n.publishedPath) del.add(n.publishedPath); return; }
      if (n.kind === 'folder') return;
      if (n.publishedPath && n.publishedPath !== n.path) { del.add(n.publishedPath); moved.push(n); }
      if (n.dirty || !n.publishedPath || n.publishedPath !== n.path) up.push(n);
    });
    const drivesDirty = state.drives.some(d => d.dirty || d.removed);
    return {
      upload: up, deletions: [...del], moved, drivesDirty,
      any: up.length > 0 || del.size > 0 || drivesDirty,
      count: up.length + del.size + (drivesDirty ? 1 : 0)
    };
  }

  const fmtSize = b => {
    b = +b || 0;
    if (b < 1024) return b + ' o';
    if (b < 1048576) return (b / 1024).toFixed(b < 10240 ? 1 : 0) + ' Ko';
    return (b / 1048576).toFixed(b < 10485760 ? 1 : 0) + ' Mo';
  };

  /* ── API GitHub ────────────────────────────────────────────── */
  async function gh(method, path, body) {
    const token = getToken();
    if (!token) throw new Error("Token GitHub absent — configure-le dans « Publier ».");
    const res = await fetch(API + path, {
      method,
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        ...(body ? { 'Content-Type': 'application/json' } : {})
      },
      body: body ? JSON.stringify(body) : undefined
    });
    if (!res.ok) {
      let msg = `GitHub ${res.status}`;
      try { const j = await res.json(); msg = j.message ? `${j.message} (${res.status})` : msg; } catch {}
      if (res.status === 401) msg = 'Token GitHub refusé (401) — régénère un token valide.';
      if (res.status === 403) msg = 'Accès refusé (403) — le token doit avoir « Contents: Read and write » sur ce dépôt.';
      if (res.status === 404) msg = 'Dépôt/branche introuvable (404) — vérifie le token et ses droits.';
      if (res.status === 409) msg = 'Conflit (409) — la branche a bougé, réessaie.';
      if (res.status === 422) msg = 'Contenu refusé par GitHub (422) — fichier trop volumineux ou chemin invalide.';
      throw new Error(msg);
    }
    if (res.status === 204) return null;
    const ct = res.headers.get('content-type') || '';
    return ct.includes('json') ? res.json() : res.text();
  }

  async function blobToBase64(blob) {
    const buf = new Uint8Array(await blob.arrayBuffer());
    const CH = 0x8000;
    let bin = '';
    for (let i = 0; i < buf.length; i += CH) bin += String.fromCharCode.apply(null, buf.subarray(i, i + CH));
    return btoa(bin);
  }
  const strToBase64 = s => btoa(unescape(encodeURIComponent(s)));

  async function putBlob(content, encoding) {
    const r = await gh('POST', `${REPO_PATH}/git/blobs`, { content, encoding });
    return r.sha;
  }

  async function testToken() {
    const me = await gh('GET', '/user');
    const repo = await gh('GET', REPO_PATH);
    if (!repo.permissions || !repo.permissions.push) throw new Error(`Le token de « ${me.login} » n'a pas le droit d'écriture sur ${CFG.owner}/${CFG.repo}.`);
    return { login: me.login, name: me.name || me.login, repo: repo.full_name };
  }

  /* ── PUBLICATION (commit atomique sur main) ────────────────── */
  async function publish(opts = {}) {
    if (!isAdmin()) throw new Error('Réservé aux administrateurs.');
    const prog = opts.onProgress || (() => {});
    const ch = pending();
    if (!ch.any) throw new Error('Rien à publier : tout est déjà à jour.');

    prog({ step: 'ref', label: `Lecture de ${CFG.branch}…` });
    const ref = await gh('GET', `${REPO_PATH}/git/ref/heads/${CFG.branch}`);
    const headSha = ref.object.sha;
    const headCommit = await gh('GET', `${REPO_PATH}/git/commits/${headSha}`);
    const baseTree = headCommit.tree.sha;

    const entries = [];
    const total = ch.upload.length + 1;
    for (let i = 0; i < ch.upload.length; i++) {
      const n = ch.upload[i];
      prog({ step: 'blob', i: i + 1, total, label: `Envoi de « ${n.name} » (${fmtSize(n.size)})…` });
      const blob = await IDB.get(n.id);
      if (!blob) throw new Error(`Contenu local introuvable pour « ${n.name} » (réimporte le fichier).`);
      const sha = await putBlob(await blobToBase64(blob), 'base64');
      entries.push({ path: n.path, mode: '100644', type: 'blob', sha });
    }

    ch.deletions.forEach(p => entries.push({ path: p, mode: '100644', type: 'blob', sha: null }));

    prog({ step: 'manifest', i: total, total, label: 'Écriture du manifeste…' });
    const manifest = buildManifest();
    entries.push({
      path: `${CFG.dir}/manifest.json`, mode: '100644', type: 'blob',
      sha: await putBlob(strToBase64(JSON.stringify(manifest, null, 1)), 'base64')
    });

    prog({ step: 'tree', label: 'Création de l’arbre git…' });
    const tree = await gh('POST', `${REPO_PATH}/git/trees`, { base_tree: baseTree, tree: entries });

    const summary = [];
    if (ch.upload.length) summary.push(`${ch.upload.length} fichier(s) ajouté(s)/modifié(s)`);
    if (ch.deletions.length) summary.push(`${ch.deletions.length} suppression(s)`);
    const msg = opts.message || `📦 drive: ${summary.join(', ') || 'mise à jour du manifeste'}`;
    const author = (() => {
      try {
        const u = FireSync.getUser();
        if (u && u.email) return { name: u.displayName || u.email, email: u.email, date: new Date().toISOString() };
      } catch {}
      return undefined;
    })();

    prog({ step: 'commit', label: 'Commit…' });
    const commit = await gh('POST', `${REPO_PATH}/git/commits`, Object.assign({ message: msg, tree: tree.sha, parents: [headSha] }, author ? { author, committer: author } : {}));

    prog({ step: 'push', label: `Mise à jour de ${CFG.branch}…` });
    await gh('PATCH', `${REPO_PATH}/git/refs/heads/${CFG.branch}`, { sha: commit.sha, force: false });

    // ── Finalisation locale ──
    const t = now();
    state.nodes.forEach(n => {
      if (n.removed) return;
      n.publishedPath = n.path; n.publishedAt = t; n.dirty = false;
    });
    state.nodes = state.nodes.filter(n => !n.removed);
    state.drives.forEach(d => { d.dirty = false; d.published = true; });
    state.drives = state.drives.filter(d => !d.removed);
    save();

    const last = { rev: manifest.rev, sha: commit.sha, at: t, by: adminEmail(), files: manifest.files.length };
    LSset(CFG.LS_LAST, last);
    remoteInfo = { rev: manifest.rev, generatedAt: manifest.generatedAt, count: manifest.files.length };
    remoteBase = PAGES_BASE;
    emit({ type: 'published', last });
    return last;
  }

  const lastPublish = () => LSget(CFG.LS_LAST, null);

  /* ── Export ────────────────────────────────────────────────── */
  return {
    CFG, RAW_BASE, PAGES_BASE,
    // droits
    isAdmin, isSignedIn, canEdit, adminEmail, emails,
    // token
    getToken, setToken, hasToken, testToken,
    // état
    get state() { return state; },
    drives, drive, node, nodesOf, childrenOf, descendantsOf, liveNodes,
    breadcrumb, fullPath, driveOf, refreshPaths,
    // écritures
    addDrive, updateDrive, removeDrive, addFolder, addTextFile, addFiles,
    saveText, rename, move, remove, uniqueName,
    // contenu
    localBlob, localText, blobText, getContent, getTextContent, IDB,
    remoteFileUrl, pagesUrl, rawUrl, fetchRemoteText,
    // distant
    boot, fetchManifest, applyManifest, resyncFromRemote, remoteInfo: () => remoteInfo, get remoteBase() { return remoteBase; },
    // publication
    pending, publish, lastPublish, buildManifest,
    // pastilles
    markSeen, markSeenAll, isUnread, unreadIn, unreadIds, lastSeen,
    // divers
    kindOf, isTextKind, extOf, safeName, fmtSize, onChange, emit, save
  };
})();
