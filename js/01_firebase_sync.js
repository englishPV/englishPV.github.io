/* === js/01_firebase_sync.js === */
const FireSync = (() => {
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

  let deviceId = localStorage.getItem('fireSync_deviceId');
  if (!deviceId) {
    deviceId = 'dev-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 6);
    localStorage.setItem('fireSync_deviceId', deviceId);
  }

  // --- REFS ---
  function dataRef() { return currentUser ? db.ref('users/' + currentUser.uid + '/flashcardData') : null; }
  function metaRef() { return currentUser ? db.ref('users/' + currentUser.uid + '/syncMeta') : null; }

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
    if (initSyncDone) return;
    initSyncDone = true;
    // Only pull on first login/page load, nothing else automatic
    await pullIfNewer();
    updateSyncUI();
  }

  // --- PULL IF NEWER (called once on page load) ---
  async function pullIfNewer() {
    if (!currentUser) return false;
    isSyncing = true;
    updateSyncUI();
    try {
      const mSnap = await metaRef().once('value');
      const cloudMeta = mSnap.val() || {};
      const cloudTime = cloudMeta.lastModified || 0;

      if (cloudTime === 0) {
        console.log('[FireSync] No cloud data, pushing local');
        await pushToCloud();
        return false;
      }

      const localTime = getLocalModTime();
      console.log('[FireSync] cloud:', cloudTime, 'local:', localTime);

      if (cloudTime > localTime + 5000) {
        console.log('[FireSync] Cloud is newer, pulling');
        const snap = await dataRef().once('value');
        const raw = snap.val();
        if (!raw) return false;

        const cloudData = typeof raw === 'string' ? JSON.parse(raw) : raw;
        if (!cloudData.subjects || !cloudData.app) return false;

        data = cloudData;
        saveDataLocal();
        lastPushTime = cloudTime;

        // Re-render if app is already initialized
        if (typeof upgrade === 'function') {
          upgrade(); applyTh(); applyUI();
          if (typeof Nav !== 'undefined') { Nav.clear(); goDeck(false); }
        }

        console.log('[FireSync] Cloud data loaded');
        return true;
      } else {
        console.log('[FireSync] Local is same or newer');
        return false;
      }
    } catch (e) {
      console.error('[FireSync] pullIfNewer error:', e);
      return false;
    } finally {
      isSyncing = false;
      updateSyncUI();
    }
  }

  // --- PUSH ---
  async function pushToCloud() {
    if (!currentUser || typeof data === 'undefined') return;
    if (isSyncing) return;
    isSyncing = true;
    updateSyncUI();
    try {
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
    } catch (e) {
      console.error('[FireSync] Push error:', e);
    } finally {
      isSyncing = false;
      updateSyncUI();
    }
  }

  // --- PULL (manual) ---
  async function pullFromCloud() {
    if (!currentUser) return;
    if (isSyncing) return;
    isSyncing = true;
    updateSyncUI();
    try {
      const snap = await dataRef().once('value');
      const raw = snap.val();
      if (!raw) { console.log('[FireSync] No cloud data'); return; }

      const cloudData = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (!cloudData.subjects || !cloudData.app) { console.log('[FireSync] Invalid cloud data'); return; }

      data = cloudData;
      upgrade();
      applyTh();
      applyUI();
      saveDataLocal();
      Nav.clear();
      goDeck(false);

      lastPushTime = Date.now();
      hasRemoteUpdate = false;
      console.log('[FireSync] Pulled from cloud');
    } catch (e) {
      console.error('[FireSync] Pull error:', e);
    } finally {
      isSyncing = false;
      updateSyncUI();
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

  // --- LOCAL MOD TIME ---
  function getLocalModTime() {
    if (typeof data === 'undefined' || !data.subjects) return 0;
    let latest = 0;
    for (const s of data.subjects) {
      for (const c of (s.chapters || [])) {
        for (const card of (c.cards || [])) {
          if (card.lastReviewed > latest) latest = card.lastReviewed;
        }
      }
    }
    return latest || 0;
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
        // Simple click = push local to cloud
        pushToCloud();
      }
    };

    btn.addEventListener('pointerdown', () => {
      didLongPress = false;
      pressTimer = setTimeout(() => {
        didLongPress = true;
        if (!currentUser) return;
        const action = prompt(
          'Options sync :\n\n' +
          '1 = Envoyer → Cloud\n' +
          '2 = Récupérer ← Cloud\n' +
          '3 = Déconnexion\n' +
          '4 = 📦 Restaurer backup\n\n' +
          'Tapez 1, 2, 3 ou 4 :'
        );
        if (action === '1') pushToCloud();
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
    scheduleAutoSync,
    startListening: () => {},
    stopListening: () => {},
    initSyncButton,
    saveDataLocal,
    restoreFromBackup,
    get isSyncing() { return isSyncing; },
    get isConnected() { return !!currentUser; }
  };
})();
