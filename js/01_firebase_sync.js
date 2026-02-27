/* === js/01_firebase_sync.js === */
/* Firebase Sync Module - Loaded before all other JS */

const FireSync = (() => {
  // Firebase config
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

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.database();

  let currentUser = null;
  let syncListener = null;
  let isSyncing = false;
  let lastSyncTime = 0;

  // --- AUTH ---
  function getUser() { return currentUser; }

  async function login(email, password) {
    try {
      const cred = await auth.signInWithEmailAndPassword(email, password);
      currentUser = cred.user;
      updateSyncUI();
      toast('Connecté : ' + currentUser.email, 'success');
      return currentUser;
    } catch (e) {
      console.error('Login error:', e);
      toast('Erreur connexion : ' + e.message, 'error');
      throw e;
    }
  }

  async function logout() {
    stopListening();
    await auth.signOut();
    currentUser = null;
    updateSyncUI();
    toast('Déconnecté', 'info');
  }

  // Listen for auth state
  auth.getRedirectResult().then(result => {
    if (result.user) {
      currentUser = result.user;
      updateSyncUI();
      toast('Connecté : ' + currentUser.email, 'success');
      startListening();
      smartSync();
    }
  }).catch(e => console.warn('Redirect result error:', e));

  auth.onAuthStateChanged(user => {
    currentUser = user;
    updateSyncUI();
    if (user) {
      console.log('[FireSync] Authenticated:', user.email);
    }
  });

  // --- SYNC LOGIC ---
  function getUserRef() {
    if (!currentUser) return null;
    return db.ref('users/' + currentUser.uid + '/flashcardData');
  }

  function getTimestampRef() {
    if (!currentUser) return null;
    return db.ref('users/' + currentUser.uid + '/lastModified');
  }

  // Upload current local data to Firebase
  async function pushToCloud() {
    if (!currentUser) { toast('Non connecté', 'error'); return; }
    if (typeof data === 'undefined') { toast('Pas de données locales', 'error'); return; }
    isSyncing = true;
    updateSyncUI();
    try {
      const ref = getUserRef();
      const tsRef = getTimestampRef();
      const now = Date.now();

      // Compress: store as JSON string to avoid Firebase key issues
      const payload = JSON.stringify(data);
      await ref.set(payload);
      await tsRef.set(now);
      lastSyncTime = now;

      toast('☁️ Données envoyées', 'success');
      console.log('[FireSync] Pushed to cloud at', new Date(now).toLocaleString());
    } catch (e) {
      console.error('[FireSync] Push error:', e);
      toast('Erreur envoi : ' + e.message, 'error');
    } finally {
      isSyncing = false;
      updateSyncUI();
    }
  }

  // Download data from Firebase and replace local
  async function pullFromCloud() {
    if (!currentUser) { toast('Non connecté', 'error'); return; }
    isSyncing = true;
    updateSyncUI();
    try {
      const ref = getUserRef();
      const snapshot = await ref.once('value');
      const raw = snapshot.val();

      if (!raw) {
        toast('Aucune donnée cloud trouvée', 'info');
        return;
      }

      const cloudData = typeof raw === 'string' ? JSON.parse(raw) : raw;
      
      if (!cloudData.subjects || !cloudData.app) {
        toast('Données cloud invalides', 'error');
        return;
      }

      // Replace local data
      data = cloudData;
      upgrade();
      applyTh();
      applyUI();
      saveData();
      Nav.clear();
      goDeck(false);

      lastSyncTime = Date.now();
      toast('☁️ Données récupérées', 'success');
      console.log('[FireSync] Pulled from cloud');
    } catch (e) {
      console.error('[FireSync] Pull error:', e);
      toast('Erreur récupération : ' + e.message, 'error');
    } finally {
      isSyncing = false;
      updateSyncUI();
    }
  }

  // Smart sync: compare timestamps, merge intelligently
  async function smartSync() {
    if (!currentUser) {
      showLoginPrompt();
      return;
    }
    isSyncing = true;
    updateSyncUI();
    try {
      const tsRef = getTimestampRef();
      const tsSnap = await tsRef.once('value');
      const cloudTime = tsSnap.val() || 0;
      
      // Get local modification time (use latest review timestamp)
      const localTime = getLocalModTime();

      if (cloudTime === 0) {
        // No cloud data, push local
        await pushToCloud();
        return;
      }

      if (localTime > cloudTime + 5000) {
        // Local is newer -> push
        if (confirm('Vos données locales sont plus récentes.\n\nEnvoyer vers le cloud ?')) {
          await pushToCloud();
        }
      } else if (cloudTime > localTime + 5000) {
        // Cloud is newer -> pull
        if (confirm('Le cloud contient des données plus récentes.\n\nRécupérer depuis le cloud ?')) {
          await pullFromCloud();
        }
      } else {
        // Same time, offer choice
        const choice = confirm(
          'Les données semblent synchronisées.\n\n' +
          'OK = Envoyer local → Cloud\n' +
          'Annuler = Récupérer Cloud → Local'
        );
        if (choice) await pushToCloud();
        else await pullFromCloud();
      }
    } catch (e) {
      console.error('[FireSync] Smart sync error:', e);
      toast('Erreur sync : ' + e.message, 'error');
    } finally {
      isSyncing = false;
      updateSyncUI();
    }
  }

  function getLocalModTime() {
    if (typeof data === 'undefined' || !data.subjects) return 0;
    let latest = 0;
    for (const s of data.subjects) {
      for (const c of (s.chapters || [])) {
        for (const card of (c.cards || [])) {
          if (card.lastReviewed && card.lastReviewed > latest) {
            latest = card.lastReviewed;
          }
        }
        // Check daily reviews
        for (const [k, v] of Object.entries(c.stats?.dailyReviews || {})) {
          const d = new Date(k).getTime();
          if (d > latest) latest = d;
        }
      }
    }
    return latest || Date.now();
  }

  // Auto-sync: push after each save (debounced)
  let autoSyncTimer = null;
  function scheduleAutoSync() {
    if (!currentUser) return;
    clearTimeout(autoSyncTimer);
    autoSyncTimer = setTimeout(() => {
      if (currentUser && !isSyncing) {
        pushToCloud().catch(e => console.warn('[FireSync] Auto-sync failed:', e));
      }
    }, 30000); // 30 seconds after last save
  }

  // Listen for real-time changes from other devices
  function startListening() {
    if (!currentUser || syncListener) return;
    const tsRef = getTimestampRef();
    syncListener = tsRef.on('value', snap => {
      const cloudTime = snap.val() || 0;
      if (cloudTime > lastSyncTime + 10000 && !isSyncing) {
        // Cloud was updated by another device
        const localTime = getLocalModTime();
        if (cloudTime > localTime + 5000) {
          toast('📱 Mise à jour détectée sur un autre appareil. Cliquez 🔄 pour synchroniser.', 'info', 5000);
        }
      }
    });
  }

  function stopListening() {
    if (syncListener && currentUser) {
      const tsRef = getTimestampRef();
      if (tsRef) tsRef.off('value', syncListener);
      syncListener = null;
    }
  }

  // --- UI ---
    function showLoginPrompt() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
      currentUser = result.user;
      updateSyncUI();
      toast('Connecté : ' + currentUser.email, 'success');
      startListening();
      smartSync();
    }).catch((e) => {
      console.error('Google login error:', e);
      // Fallback: sur mobile si popup bloqué, utiliser redirect
      if (e.code === 'auth/popup-blocked' || e.code === 'auth/popup-closed-by-user') {
        auth.signInWithRedirect(provider);
      } else {
        toast('Erreur connexion : ' + e.message, 'error');
      }
    });
  }

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
        // Long press = menu, normal click = smart sync
        smartSync();
      }
    };

    // Long press for options menu
    let pressTimer = null;
    btn.addEventListener('pointerdown', () => {
      pressTimer = setTimeout(() => {
        if (!currentUser) return;
        const action = prompt(
          'Options sync :\n\n' +
          '1 = Envoyer → Cloud\n' +
          '2 = Récupérer ← Cloud\n' +
          '3 = Déconnexion\n\n' +
          'Tapez 1, 2 ou 3 :'
        );
        if (action === '1') pushToCloud();
        else if (action === '2') pullFromCloud();
        else if (action === '3') logout();
      }, 800);
    });
    btn.addEventListener('pointerup', () => clearTimeout(pressTimer));
    btn.addEventListener('pointercancel', () => clearTimeout(pressTimer));
  }

  // --- PUBLIC API ---
  return {
    login,
    logout,
    getUser,
    pushToCloud,
    pullFromCloud,
    smartSync,
    scheduleAutoSync,
    startListening,
    stopListening,
    initSyncButton,
    showLoginPrompt,
    get isSyncing() { return isSyncing; },
    get isConnected() { return !!currentUser; }
  };
})();
