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

  // --- PRESENCE (detect other devices) ---
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
      toast('Connecté : ' + currentUser.email, 'success');
      onLoginComplete();
    }).catch(e => {
      if (e.code === 'auth/popup-blocked' || e.code === 'auth/popup-closed-by-user') {
        auth.signInWithRedirect(provider);
      } else {
        toast('Erreur connexion : ' + e.message, 'error');
      }
    });
  }

  auth.getRedirectResult().then(result => {
    if (result.user) {
      currentUser = result.user;
      updateSyncUI();
      toast('Connecté : ' + currentUser.email, 'success');
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
    toast('Déconnecté', 'info');
  }

  // --- CALLED AFTER LOGIN ---
   let initSyncDone = false;

  async function onLoginComplete() {
    setupPresence();
    // Don't run initialSync if init() already handled it via pullIfNewer
    if (!initSyncDone) {
      initSyncDone = true;
      await initialSync();
    }
    startListening();
  }

  // --- INITIAL SYNC (on login / page load) ---
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
        // No cloud data → push local
        console.log('[FireSync] No cloud data, pushing local');
        await pushToCloud(true);
        return;
      }

      if (cloudDevice === deviceId && cloudTime >= localTime) {
        // We pushed last, and cloud is same or newer → skip
        console.log('[FireSync] Cloud is from this device, skipping');
        lastPushTime = cloudTime;
        return;
      }

      if (cloudTime > localTime + 3000) {
        // Cloud is newer (from another device) → auto pull
        console.log('[FireSync] Cloud is newer, auto pulling');
        await pullFromCloud(true);
        toast('📱 Données synchronisées depuis un autre appareil', 'success', 3000);
      } else if (localTime > cloudTime + 3000) {
        // Local is newer → auto push
        console.log('[FireSync] Local is newer, auto pushing');
        await pushToCloud(true);
      } else {
        // Very close timestamps → push local (last writer wins)
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

  // --- PUSH ---
  async function pushToCloud(silent = false) {
    if (!currentUser) return;
    if (typeof data === 'undefined') return;
    try {
      const now = Date.now();
      ignoreNextRemote = true;
      await dataRef().set(JSON.stringify(data));
      await metaRef().set({
        lastModified: now,
        fromDevice: deviceId,
        email: currentUser.email
      });
      lastPushTime = now;
      if (!silent) toast('☁️ Données envoyées', 'success');
      console.log('[FireSync] Pushed at', new Date(now).toLocaleTimeString());
      // Reset ignore after a short delay
      setTimeout(() => { ignoreNextRemote = false; }, 3000);
    } catch (e) {
      console.error('[FireSync] Push error:', e);
      if (!silent) toast('Erreur envoi : ' + e.message, 'error');
    }
  }

  // --- PULL ---
  async function pullFromCloud(silent = false) {
    if (!currentUser) return;
    try {
      const snap = await dataRef().once('value');
      const raw = snap.val();
      if (!raw) {
        if (!silent) toast('Aucune donnée cloud', 'info');
        return;
      }
      const cloudData = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (!cloudData.subjects || !cloudData.app) {
        if (!silent) toast('Données cloud invalides', 'error');
        return;
      }

      // Replace local
      data = cloudData;
      upgrade();
      applyTh();
      applyUI();
      saveDataLocal(); // save WITHOUT triggering auto-sync
      Nav.clear();
      goDeck(false);

      lastPushTime = Date.now();
      if (!silent) toast('☁️ Données récupérées', 'success');
      console.log('[FireSync] Pulled from cloud');
    } catch (e) {
      console.error('[FireSync] Pull error:', e);
      if (!silent) toast('Erreur récupération : ' + e.message, 'error');
    }
  }

  // --- REAL-TIME LISTENER (auto-sync from other devices) ---
  function startListening() {
    if (!currentUser || remoteListener) return;
    const ref = metaRef();
    remoteListener = ref.on('value', async snap => {
      if (ignoreNextRemote) return;
      const meta = snap.val();
      if (!meta) return;

      const cloudTime = meta.lastModified || 0;
      const fromDevice = meta.fromDevice || '';

      // Only react if change came from ANOTHER device
      if (fromDevice === deviceId) return;
      if (cloudTime <= lastPushTime) return;

      console.log('[FireSync] Remote change detected from', fromDevice);

      // Check if user is in the middle of a review
      if (typeof State !== 'undefined' && State.view === 'review' && State.review && !State.review.end) {
        toast('📱 Mise à jour dispo. Synchronisation après la révision.', 'info', 4000);
        // Queue sync for after review
        window._pendingSync = true;
        return;
      }

      // Auto pull
      isSyncing = true;
      updateSyncUI();
      await pullFromCloud(true);
      isSyncing = false;
      updateSyncUI();
      toast('📱 Synchronisé depuis ' + (fromDevice.includes('dev-') ? 'un autre appareil' : fromDevice), 'success', 3000);
    });
  }

  function stopListening() {
    if (remoteListener && currentUser) {
      try { metaRef()?.off('value', remoteListener); } catch(e) {}
      remoteListener = null;
    }
  }

  // --- AUTO PUSH (debounced, after local saves) ---
  function scheduleAutoSync() {
    if (!currentUser) return;
    clearTimeout(autoSyncTimer);
    autoSyncTimer = setTimeout(() => {
      if (currentUser && !isSyncing) {
        pushToCloud(true).catch(e => console.warn('[FireSync] Auto-push failed:', e));
      }
    }, 5000); // 5 seconds after last save
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

  // --- SAVE LOCAL ONLY (no auto-sync trigger) ---
  function saveDataLocal() {
    try { localStorage.setItem('flashcards9x16_data', JSON.stringify(data)); } catch(e) {}
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

    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!currentUser) {
        showLoginPrompt();
      } else {
        // Normal click = force push
        pushToCloud(false);
      }
    };

    // Long press = options
    let pressTimer = null;
    let didLongPress = false;
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
          '4 = État sync\n\n' +
          'Tapez 1, 2, 3 ou 4 :'
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
      }, 800);
    });
    btn.addEventListener('pointerup', (e) => {
      clearTimeout(pressTimer);
      if (didLongPress) { e.preventDefault(); e.stopPropagation(); }
    });
    btn.addEventListener('pointercancel', () => clearTimeout(pressTimer));
  }

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

        // Replace local data BEFORE reconcile runs
        data = cloudData;
        saveDataLocal();
        lastPushTime = cloudTime;
        console.log('[FireSync] Cloud data loaded successfully');
        return true;
      } else {
        console.log('[FireSync] Local is same or newer, keeping local');
        return false;
      }
    } catch(e) {
      console.error('[FireSync] pullIfNewer error:', e);
      return false;
    }
  }

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
    get isSyncing() { return isSyncing; },
    get isConnected() { return !!currentUser; }
  };
})();
