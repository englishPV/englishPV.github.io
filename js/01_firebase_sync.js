/*01_firebase_sync.js*/
/* === js/01_firebase_sync.js === */
/* Repli « mode local » : si les scripts Firebase ne sont pas chargés
   (blocage réseau/extension, hors-ligne, erreur d'init), l'app doit
   rester 100 % fonctionnelle.
   ⚠️ FireSync doit TOUJOURS être initialisé : sinon le binding `const`
   reste dans sa temporal dead zone et chaque `typeof FireSync` des
   autres scripts lève une ReferenceError qui bloque toute l'appli. */
const _fireSyncLocal = {
  login() {}, logout() {}, getUser: () => null,
  pushToCloud: () => Promise.resolve(),
  pullFromCloud: () => Promise.resolve(),
  pullIfNewer: () => Promise.resolve(false),
  syncNow: () => Promise.resolve(false),
  checkRemote: () => Promise.resolve(false),
  scheduleAutoSync() {}, startListening() {}, stopListening() {},
  initSyncButton() {}, saveDataLocal() {}, restoreFromBackup: () => Promise.resolve(),
  get isSyncing() { return false; }, get isConnected() { return false; }
};
const FireSync = (() => {
  try {
  if (typeof firebase === 'undefined') {
    console.warn('[FireSync] Scripts Firebase non chargés — mode local.');
    return _fireSyncLocal;
  }
  const firebaseConfig = {
    apiKey: "AIzaSyCc8-kMmHvJagbj-nV4ZGcWDUXYytRrD0I",
    authDomain: "englishpv-b6727.firebaseapp.com",
    databaseURL: "https://englishpv-b6727-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "englishpv-b6727",
    storageBucket: "englishpv-b6727.firebasestorage.app",
    messagingSenderId: "285413164654",
    appId: "1:285413164654:web:a0d8d27dfa0009ab45887f",
    measurementId: "G-VKX6DSZV4Z"
  };

  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.database();

  let currentUser = null;
  let isSyncing = false;
  let lastPushTime = 0;
  let autoSyncTimer = null;
  let initSyncDone = false;
  let hasRemoteUpdate = false;
  let pushQueued = false;
  let pullQueued = false;
  let metaListenerRef = null;
  let pollTimer = null;

  let deviceId = localStorage.getItem('fireSync_deviceId');
  if (!deviceId) {
    deviceId = 'dev-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 6);
    localStorage.setItem('fireSync_deviceId', deviceId);
  }

  // --- REFS ---
  function dataRef() { return currentUser ? db.ref('users/' + currentUser.uid + '/flashcardData') : null; }
  function metaRef() { return currentUser ? db.ref('users/' + currentUser.uid + '/syncMeta') : null; }

  // --- HORS RÉVISION ? (on ne remplace JAMAIS les données pendant une session) ---
  function inReview() {
    try { return typeof State !== 'undefined' && State && (State.view === 'review' || State.view === 'recap'); }
    catch (e) { return false; }
  }

  // --- Horodatage local : la dernière révision d'une carte.
  // (Consciemment PAS l'heure du boot : un appareil tout neuf doit
  //  toujours rattraper le cloud, et non l'écraser.) ---
  function localModTime() {
    if (typeof data === 'undefined' || !data.subjects) return 0;
    let latest = 0;
    for (const s of data.subjects) {
      for (const c of (s.chapters || [])) {
        for (const card of (c.cards || [])) {
          if (card.lastReviewed > latest) latest = card.lastReviewed;
        }
      }
    }
    return latest;
  }

  // --- AUTH ---
  function showLoginPrompt() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(result => {
      currentUser = result.user;
      updateSyncUI();
      console.log('[FireSync] Connected:', currentUser.email);
      onLoginComplete();
    }).catch(e => {
      if (e.code === 'auth/popup-blocked' || e.code === 'auth/popup-closed-by-user') {
        auth.signInWithRedirect(provider);
      } else {
        console.error('[FireSync] Login error:', e.message);
      }
    });
  }

  auth.getRedirectResult().then(result => {
    if (result.user) {
      currentUser = result.user;
      updateSyncUI();
      console.log('[FireSync] Connected:', currentUser.email);
      onLoginComplete();
    }
  }).catch(e => console.warn('Redirect result error:', e));

  auth.onAuthStateChanged(user => {
    currentUser = user;
    updateSyncUI();
    if (user) {
      console.log('[FireSync] Authenticated:', user.email);
      onLoginComplete();
    } else {
      stopListening();
    }
  });

  async function logout() {
    await auth.signOut();
    currentUser = null;
    hasRemoteUpdate = false;
    updateSyncUI();
    console.log('[FireSync] Disconnected');
  }

  // --- CALLED AFTER LOGIN ---
  async function onLoginComplete() {
    startListening();
    startPolling();
    if (initSyncDone) return;
    initSyncDone = true;
    // Synchronisation bidirectionnelle à la connexion
    await syncNow();
    updateSyncUI();
  }

  // --- APPLIQUE DES DONNÉES DU CLOUD À L'APP ---
  // redirect=true → retour à l'écran decks (pull manuel / boot) ;
  // redirect=false → re-rend la vue courante (synchro de fond).
  function applyRemoteData(cloudData, redirect) {
    data = cloudData;
    try {
      if (typeof reconcile === 'function') {
        reconcile();
        data.app.version = typeof APP_VER !== 'undefined' ? APP_VER : data.app.version;
      }
      if (data.app && data.app._mathReset !== MATH_FINGERPRINT) {
        data.subjects = (data.subjects || []).filter(s => !/math/i.test(s.title || ''));
        if (typeof buildMathSub === 'function') {
          data.subjects.splice(1, 0, buildMathSub());
        }
        data.app._mathReset = MATH_FINGERPRINT;
      }
      if (typeof upgrade === 'function') upgrade();
      applyTh(); applyUI();
      saveDataLocal();
    } catch (e) { console.error('[FireSync] applyRemoteData:', e); }

    if (typeof Nav !== 'undefined' && Nav && typeof goDeck === 'function') {
      if (redirect) { try { Nav.clear(); goDeck(false); } catch (e) {} }
      else if (typeof render === 'function') { try { render(false); } catch (e) {} }
    }
  }

  // --- SYNC BIDIRECTIONNEL (dès l'ouverture, bouton ☁, après session) ---
  // Compare l'horodatage du cloud et de l'app :
  //   cloud plus récent  → on récupère (pull)
  //   local plus récent  → on pousse (push)   ← corrigé : avant, rien n'était fait
  //   à jour             → on ne touche à rien
  async function syncNow() {
    if (!currentUser || typeof data === 'undefined') return false;
    if (isSyncing) { pullQueued = true; return false; }
    isSyncing = true; updateSyncUI();
    try {
      const [mSnap, dSnap] = await Promise.all([
        metaRef().once('value'), dataRef().once('value')
      ]);
      const cloudMeta = mSnap.val() || {};
      const cloudTime = cloudMeta.lastModified || 0;
      const localTime = localModTime();
      const raw = dSnap.val();
      const cloudData = raw ? (typeof raw === 'string' ? JSON.parse(raw) : raw) : null;
      const cloudOk = !!(cloudData && cloudData.subjects && cloudData.app);

      console.log('[FireSync] sync — cloud:', cloudTime, 'local:', localTime);

      if (cloudOk && cloudTime > localTime) {
        console.log('[FireSync] Cloud is newer, pulling');
        applyRemoteData(cloudData, true);
        lastPushTime = cloudTime;
        hasRemoteUpdate = false;
        setTimeout(pushToCloud, 1500); // réécrire le cloud depuis cet appareil (normalise)
        return true;
      }
      if (!cloudOk && (localTime > 0 || (data.subjects || []).length)) {
        console.log('[FireSync] No cloud data, pushing local');
        await doPush();
        return true;
      }
      if (localTime > cloudTime) {
        console.log('[FireSync] Local is newer, pushing');
        await doPush();
        return true;
      }
      return false; // à jour
    } catch (e) {
      console.error('[FireSync] syncNow error:', e);
      return false;
    } finally {
      isSyncing = false; updateSyncUI();
      settleQueued();
    }
  }

  // Compat : l'ancien nom, sémantique désormais bidirectionnelle
  function pullIfNewer() { return syncNow(); }

  // --- VÉRIFICATION LÉGÈRE (meta uniquement, sans télécharger les données) ---
  async function checkRemote() {
    if (!currentUser || isSyncing || inReview()) return false;
    try {
      const mSnap = await metaRef().once('value');
      const m = mSnap.val() || {};
      if (!m.lastModified || m.fromDevice === deviceId) return false;
      if (m.lastModified <= localModTime()) return false;
      console.log('[FireSync] checkRemote: cloud plus récent, pull');
      return await pullFromCloud();
    } catch (e) { return false; }
  }

  // --- TEMPS RÉEL : le meta change sur un autre appareil → on pull ---
  function startListening() {
    stopListening();
    if (!currentUser) return;
    try {
      metaListenerRef = metaRef();
      metaListenerRef.on('value', snap => {
        const m = snap.val() || {};
        if (!m.lastModified || m.fromDevice === deviceId) return; // écho de notre propre push
        if (m.lastModified <= localModTime()) return;
        if (inReview()) {
          // On ne remplace pas les données sous une session en cours :
          // la sonde de fond (toutes les 5 min) rattrapera dès la fin.
          hasRemoteUpdate = true;
          return;
        }
        console.log('[FireSync] Mise à jour distante détectée, synchronisation…');
        pullFromCloud();
      }, err => console.warn('[FireSync] meta listener error:', err));
    } catch (e) { console.warn('[FireSync] startListening error:', e); }
  }

  function stopListening() {
    if (metaListenerRef) { try { metaListenerRef.off('value'); } catch (e) {} metaListenerRef = null; }
  }

  // --- SONDE DE FOND (repli si le temps réel est coupé, ex. téléphone en veille) ---
  function startPolling() {
    if (pollTimer) return;
    pollTimer = setInterval(() => {
      if (currentUser && !isSyncing && !inReview()) checkRemote();
    }, 5 * 60 * 1000);
  }

  // --- File d'attente : plus de push/pull « perdus » si un autre op' est en cours ---
  function settleQueued() {
    if (pushQueued) { pushQueued = false; setTimeout(pushToCloud, 500); }
    if (pullQueued) { pullQueued = false; setTimeout(pullFromCloud, 500); }
  }

  // --- PUSH ---
  // doPush = le travail pur (appelé quand isSyncing est déjà posé par
  // l'appelant) ; pushToCloud = le public, qui met en file au lieu de
  // jeter le push s'une opération est déjà en cours.
  async function doPush() {
    const now = Date.now();

    // Rolling backup (keep last 3)
    try {
      const backupRef = db.ref('users/' + currentUser.uid + '/backups');
      const bSnap = await backupRef.once('value');
      const existing = bSnap.val() || {};
      const keys = Object.keys(existing).sort();
      while (keys.length >= 3) {
        await backupRef.child(keys.shift()).remove();
      }
      const currentCloud = await dataRef().once('value');
      if (currentCloud.val()) {
        await backupRef.child(String(now)).set({
          data: currentCloud.val(),
          savedAt: now,
          fromDevice: deviceId
        });
      }
    } catch (backupErr) {
      console.warn('[FireSync] Backup failed:', backupErr);
    }

    await dataRef().set(JSON.stringify(data));
    await metaRef().set({
      lastModified: now,
      fromDevice: deviceId,
      email: currentUser.email
    });
    lastPushTime = now;
    hasRemoteUpdate = false;
    console.log('[FireSync] Pushed at', new Date(now).toLocaleTimeString());
  }

  async function pushToCloud() {
    if (!currentUser || typeof data === 'undefined') return;
    if (isSyncing) { pushQueued = true; return; }
    isSyncing = true;
    updateSyncUI();
    try {
      await doPush();
    } catch (e) {
      console.error('[FireSync] Push error:', e);
    } finally {
      isSyncing = false;
      updateSyncUI();
      settleQueued();
    }
  }

  // --- PULL (manuel « Récupérer ← Cloud », temps réel, sonde de fond) ---
  async function pullFromCloud() {
    if (!currentUser) return;
    if (isSyncing) { pullQueued = true; return; }
    isSyncing = true;
    updateSyncUI();
    try {
      const [mSnap, snap] = await Promise.all([metaRef().once('value'), dataRef().once('value')]);
      const raw = snap.val();
      if (!raw) { console.log('[FireSync] No cloud data'); return; }

      const cloudData = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (!cloudData.subjects || !cloudData.app) { console.log('[FireSync] Invalid cloud data'); return; }

      const inRev = inReview();
      applyRemoteData(cloudData, !inRev);

      lastPushTime = Date.now();
      hasRemoteUpdate = false;
      console.log('[FireSync] Pulled from cloud');
      // Réécrire le cloud depuis cet appareil pour normaliser l'horodatage
      setTimeout(pushToCloud, 2000);
    } catch (e) {
      console.error('[FireSync] Pull error:', e);
    } finally {
      isSyncing = false;
      updateSyncUI();
      settleQueued();
    }
  }

  // --- AUTO PUSH (very debounced — only after 2 minutes of inactivity) ---
  function scheduleAutoSync() {
    if (!currentUser) return;
    clearTimeout(autoSyncTimer);
    autoSyncTimer = setTimeout(() => {
      if (currentUser && !isSyncing) {
        pushToCloud(true).catch(e => console.warn('[FireSync] Auto-push failed:', e));
      }
    }, 3000); // 10 seconds
  }

  // --- SAVE LOCAL ONLY ---
  function saveDataLocal() {
    try { localStorage.setItem('flashcards9x16_data', JSON.stringify(data)); } catch (e) {}
  }

  // --- RESTORE FROM BACKUP ---
  async function restoreFromBackup() {
    if (!currentUser) return;
    try {
      const backupRef = db.ref('users/' + currentUser.uid + '/backups');
      const snap = await backupRef.once('value');
      const backups = snap.val();
      if (!backups) { alert('Aucun backup trouvé.'); return; }

      const keys = Object.keys(backups).sort().reverse();
      let msg = '📦 Backups disponibles :\n\n';
      keys.forEach((k, i) => {
        const b = backups[k];
        const date = new Date(b.savedAt || parseInt(k)).toLocaleString();
        msg += `${i + 1} — ${date} (depuis ${b.fromDevice || '?'})\n`;
      });
      msg += '\nTapez le numéro :';

      const choice = prompt(msg);
      const idx = parseInt(choice) - 1;
      if (isNaN(idx) || idx < 0 || idx >= keys.length) return;

      const backup = backups[keys[idx]];
      const backupData = typeof backup.data === 'string' ? JSON.parse(backup.data) : backup.data;
      if (!backupData.subjects || !backupData.app) { alert('Backup invalide'); return; }
      if (!confirm('⚠️ Restaurer ce backup ?\nCeci remplacera TOUTES vos données.')) return;

      data = backupData;
      upgrade(); applyTh(); applyUI();
      saveDataLocal();
      Nav.clear(); goDeck(false);
      console.log('[FireSync] Backup restored');
      await pushToCloud();
    } catch (e) {
      console.error('[FireSync] Restore error:', e);
    }
  }

  // --- UI ---
  function updateSyncUI() {
    const btn = document.getElementById('syncBtn');
    if (!btn) return;
    if (isSyncing) {
      btn.textContent = '⏳';
      btn.disabled = true;
    } else if (currentUser) {
      btn.textContent = '☁️';
      btn.disabled = false;
      btn.title = currentUser.email;
    } else {
      btn.textContent = '🔄';
      btn.disabled = false;
      btn.title = 'Se connecter';
    }
  }

  function initSyncButton() {
    const btn = document.getElementById('syncBtn');
    if (!btn) return;

    let pressTimer = null;
    let didLongPress = false;

    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (didLongPress) { didLongPress = false; return; }
      if (!currentUser) {
        showLoginPrompt();
      } else {
        // Simple click = synchronisation bidirectionnelle
        // (récupère si le cloud est plus récent, pousse sinon)
        syncNow();
      }
    };

    btn.addEventListener('pointerdown', () => {
      didLongPress = false;
      pressTimer = setTimeout(() => {
        didLongPress = true;
        if (!currentUser) return;
        const action = prompt(
          'Options sync :\n\n' +
          '0 = Synchroniser (bidirectionnel)\n' +
          '1 = Envoyer → Cloud\n' +
          '2 = Récupérer ← Cloud\n' +
          '3 = Déconnexion\n' +
          '4 = 📦 Restaurer backup\n\n' +
          'Tapez 0, 1, 2, 3 ou 4 :'
        );
        if (action === '0') syncNow();
        else if (action === '1') pushToCloud();
        else if (action === '2') pullFromCloud();
        else if (action === '3') logout();
        else if (action === '4') restoreFromBackup();
      }, 800);
    });
    btn.addEventListener('pointerup', (e) => {
      clearTimeout(pressTimer);
      if (didLongPress) { e.preventDefault(); e.stopPropagation(); }
    });
    btn.addEventListener('pointercancel', () => clearTimeout(pressTimer));
  }

  return {
    login: showLoginPrompt,
    logout,
    getUser: () => currentUser,
    pushToCloud,
    pullFromCloud,
    pullIfNewer,
    syncNow,
    checkRemote,
    scheduleAutoSync,
    startListening,
    stopListening,
    initSyncButton,
    saveDataLocal,
    restoreFromBackup,
    get isSyncing() { return isSyncing; },
    get isConnected() { return !!currentUser; }
  };
  } catch (e) {
    console.warn('[FireSync] Initialisation en échec — mode local :', e);
    return _fireSyncLocal;
  }
})();
