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
  let remoteListener = null;
  let ignoreNextRemote = false;
  let autoSyncTimer = null;
  let initSyncDone = false;

  let deviceId = localStorage.getItem('fireSync_deviceId');
  if (!deviceId) {
    deviceId = 'dev-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 6);
    localStorage.setItem('fireSync_deviceId', deviceId);
  }

  // --- REFS ---
  function dataRef() { return currentUser ? db.ref('users/' + currentUser.uid + '/flashcardData') : null; }
  function metaRef() { return currentUser ? db.ref('users/' + currentUser.uid + '/syncMeta') : null; }
  function presenceRef() { return currentUser ? db.ref('users/' + currentUser.uid + '/presence/' + deviceId) : null; }
  function allPresenceRef() { return currentUser ? db.ref('users/' + currentUser.uid + '/presence') : null; }

  // --- PRESENCE ---
  function setupPresence() {
    if (!currentUser) return;
    const ref = presenceRef();
    const connRef = db.ref('.info/connected');
    connRef.on('value', snap => {
      if (snap.val() === true) {
        ref.set({
          online: true,
          lastSeen: firebase.database.ServerValue.TIMESTAMP,
          device: deviceId,
          userAgent: navigator.userAgent.substring(0, 60)
        });
        ref.onDisconnect().set({
          online: false,
          lastSeen: firebase.database.ServerValue.TIMESTAMP,
          device: deviceId,
          userAgent: navigator.userAgent.substring(0, 60)
        });
      }
    });
  }

  async function getOtherDevices() {
    if (!currentUser) return [];
    const snap = await allPresenceRef().once('value');
    const val = snap.val() || {};
    const others = [];
    const now = Date.now();
    for (const [id, info] of Object.entries(val)) {
      if (id === deviceId) continue;
      if (info.online || (now - (info.lastSeen || 0)) < 120000) {
        others.push(info);
      }
    }
    return others;
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
    stopListening();
    const ref = presenceRef();
    if (ref) await ref.set({ online: false, lastSeen: firebase.database.ServerValue.TIMESTAMP, device: deviceId });
    await auth.signOut();
    currentUser = null;
    updateSyncUI();
    console.log('[FireSync] Disconnected');
  }

  // --- CALLED AFTER LOGIN ---
  async function onLoginComplete() {
    setupPresence();
    if (!initSyncDone) {
      initSyncDone = true;
      await initialSync();
    }
    startListening();
  }

  // --- INITIAL SYNC ---
  async function initialSync() {
    if (!currentUser || isSyncing) return;
    isSyncing = true;
    updateSyncUI();
    try {
      const mSnap = await metaRef().once('value');
      const cloudMeta = mSnap.val() || {};
      const cloudTime = cloudMeta.lastModified || 0;
      const cloudDevice = cloudMeta.fromDevice || '';
      const localTime = getLocalModTime();

      if (cloudTime === 0) {
        console.log('[FireSync] No cloud data, pushing local');
        await pushToCloud(true);
        return;
      }

      if (cloudDevice === deviceId && cloudTime >= localTime) {
        console.log('[FireSync] Cloud is from this device, skipping');
        lastPushTime = cloudTime;
        return;
      }

      if (cloudTime > localTime + 3000) {
        console.log('[FireSync] Cloud is newer, auto pulling');
        await pullFromCloud(true);
      } else if (localTime > cloudTime + 3000) {
        console.log('[FireSync] Local is newer, auto pushing');
        await pushToCloud(true);
      } else {
        console.log('[FireSync] Timestamps close, pushing local');
        await pushToCloud(true);
      }
    } catch (e) {
      console.error('[FireSync] Initial sync error:', e);
    } finally {
      isSyncing = false;
      updateSyncUI();
    }
  }

  // --- PULL IF NEWER (called by init before reconcile) ---
  async function pullIfNewer() {
    if (!currentUser) return false;
    try {
      const mSnap = await metaRef().once('value');
      const cloudMeta = mSnap.val() || {};
      const cloudTime = cloudMeta.lastModified || 0;

      if (cloudTime === 0) {
        console.log('[FireSync] No cloud data exists yet');
        return false;
      }

      const localTime = getLocalModTime();
      console.log('[FireSync] pullIfNewer — cloud:', cloudTime, 'local:', localTime);

      if (cloudTime > localTime + 2000) {
        console.log('[FireSync] Cloud is newer, pulling before reconcile');
        const snap = await dataRef().once('value');
        const raw = snap.val();
        if (!raw) return false;

        const cloudData = typeof raw === 'string' ? JSON.parse(raw) : raw;
        if (!cloudData.subjects || !cloudData.app) return false;

        data = cloudData;
        saveDataLocal();
        lastPushTime = cloudTime;
        console.log('[FireSync] Cloud data loaded successfully');
        return true;
      } else {
        console.log('[FireSync] Local is same or newer, keeping local');
        return false;
      }
    } catch (e) {
      console.error('[FireSync] pullIfNewer error:', e);
      return false;
    }
  }

  // --- PUSH ---
  async function pushToCloud(silent = false) {
    if (!currentUser) return;
    if (typeof data === 'undefined') return;
    isSyncing = true;
    updateSyncUI();
    try {
      const now = Date.now();
      ignoreNextRemote = true;

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
      console.log('[FireSync] Pushed at', new Date(now).toLocaleTimeString());
      setTimeout(() => { ignoreNextRemote = false; }, 3000);
    } catch (e) {
      console.error('[FireSync] Push error:', e);
    } finally {
      isSyncing = false;
      updateSyncUI();
    }
  }

  // --- PULL ---
  async function pullFromCloud(silent = false) {
    if (!currentUser) return;
    isSyncing = true;
    updateSyncUI();
    try {
      const snap = await dataRef().once('value');
      const raw = snap.val();
      if (!raw) {
        console.log('[FireSync] No cloud data');
        return;
      }
      const cloudData = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (!cloudData.subjects || !cloudData.app) {
        console.log('[FireSync] Invalid cloud data');
        return;
      }

      data = cloudData;
      upgrade();
      applyTh();
      applyUI();
      saveDataLocal();
      Nav.clear();
      goDeck(false);

      lastPushTime = Date.now();
      console.log('[FireSync] Pulled from cloud');
    } catch (e) {
      console.error('[FireSync] Pull error:', e);
    } finally {
      isSyncing = false;
      updateSyncUI();
    }
  }

  // --- REAL-TIME LISTENER ---
  function startListening() {
    if (!currentUser || remoteListener) return;
    const ref = metaRef();
    remoteListener = ref.on('value', async snap => {
      if (ignoreNextRemote) return;
      const meta = snap.val();
      if (!meta) return;

      const cloudTime = meta.lastModified || 0;
      const fromDevice = meta.fromDevice || '';

      if (fromDevice === deviceId) return;
      if (cloudTime <= lastPushTime) return;

      console.log('[FireSync] Remote change detected from', fromDevice);

      if (typeof State !== 'undefined' && State.view === 'review' && State.review && !State.review.end) {
        console.log('[FireSync] Sync queued after review');
        window._pendingSync = true;
        return;
      }

      isSyncing = true;
      updateSyncUI();
      await pullFromCloud(true);
      isSyncing = false;
      updateSyncUI();
      console.log('[FireSync] Auto-synced from', fromDevice);
    });
  }

  function stopListening() {
    if (remoteListener && currentUser) {
      try { metaRef()?.off('value', remoteListener); } catch (e) {}
      remoteListener = null;
    }
  }

  // --- AUTO PUSH ---
  function scheduleAutoSync() {
    if (!currentUser) return;
    clearTimeout(autoSyncTimer);
    autoSyncTimer = setTimeout(() => {
      if (currentUser && !isSyncing) {
        pushToCloud(true).catch(e => console.warn('[FireSync] Auto-push failed:', e));
      }
    }, 5000);
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
    if (!currentUser) { console.error('[FireSync] Not connected'); return; }
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
      msg += '\nTapez le numéro (1, 2 ou 3) :';

      const choice = prompt(msg);
      const idx = parseInt(choice) - 1;
      if (isNaN(idx) || idx < 0 || idx >= keys.length) return;

      const backup = backups[keys[idx]];
      const backupData = typeof backup.data === 'string' ? JSON.parse(backup.data) : backup.data;

      if (!backupData.subjects || !backupData.app) {
        alert('Backup invalide');
        return;
      }

      if (!confirm('⚠️ Restaurer le backup du ' + new Date(backup.savedAt || parseInt(keys[idx])).toLocaleString() + ' ?\n\nCeci remplacera TOUTES vos données actuelles.')) return;

      data = backupData;
      upgrade();
      applyTh();
      applyUI();
      saveDataLocal();
      Nav.clear();
      goDeck(false);

      console.log('[FireSync] Backup restored');
      await pushToCloud(true);
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
      btn.classList.add('syncing');
    } else if (currentUser) {
      btn.textContent = '☁️';
      btn.disabled = false;
      btn.title = 'Sync: ' + currentUser.email;
      btn.classList.remove('syncing');
    } else {
      btn.textContent = '🔄';
      btn.disabled = false;
      btn.title = 'Se connecter & synchroniser';
      btn.classList.remove('syncing');
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
        pushToCloud(false);
      }
    };

    btn.addEventListener('pointerdown', () => {
      didLongPress = false;
      pressTimer = setTimeout(() => {
        didLongPress = true;
        if (!currentUser) return;
        const action = prompt(
          'Options sync :\n\n' +
          '1 = Forcer envoi → Cloud\n' +
          '2 = Forcer récupération ← Cloud\n' +
          '3 = Déconnexion\n' +
          '4 = État sync\n' +
          '5 = 📦 Restaurer un backup\n\n' +
          'Tapez 1, 2, 3, 4 ou 5 :'
        );
        if (action === '1') pushToCloud(false);
        else if (action === '2') pullFromCloud(false);
        else if (action === '3') logout();
        else if (action === '4') {
          getOtherDevices().then(others => {
            alert(
              '🔄 État de la synchronisation\n\n' +
              'Appareil: ' + deviceId + '\n' +
              'Connecté: ' + (currentUser ? currentUser.email : 'Non') + '\n' +
              'Dernier push: ' + (lastPushTime ? new Date(lastPushTime).toLocaleString() : 'Jamais') + '\n' +
              'Autres appareils en ligne: ' + others.length + '\n' +
              (others.length ? others.map(o => '  • ' + o.device + (o.online ? ' (en ligne)' : ' (hors ligne)')).join('\n') : '')
            );
          });
        }
        else if (action === '5') {
          restoreFromBackup();
        }
      }, 800);
    });
    btn.addEventListener('pointerup', (e) => {
      clearTimeout(pressTimer);
      if (didLongPress) { e.preventDefault(); e.stopPropagation(); }
    });
    btn.addEventListener('pointercancel', () => clearTimeout(pressTimer));
  }

  // --- PUBLIC API ---
  return {
    login: showLoginPrompt,
    logout,
    getUser: () => currentUser,
    pushToCloud,
    pullFromCloud,
    pullIfNewer,
    scheduleAutoSync,
    startListening,
    stopListening,
    initSyncButton,
    saveDataLocal,
    restoreFromBackup,
    get isSyncing() { return isSyncing; },
    get isConnected() { return !!currentUser; }
  };
})();
