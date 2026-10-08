/*09_shell.js — Coquille applicative
  · Navigation latérale (desktop) / tiroir (mobile)
  · Liste des matières synchronisée avec l'état de l'app
  · Raccourcis clavier (⌘/Ctrl+K, /, Espace, 1–4, Échap) */

(function () {
  'use strict';

  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];
  const ico = (n, c) => (window.ico ? window.ico(n, c) : '');

  const sidebar = $('#sidebar');
  const scrim = $('#drawerScrim');
  const menuBtn = $('#menuBtn');
  const navEl = $('#sidebarNav');
  const subjEl = $('#sidebarSubjects');
  const brandSub = $('#brandSub');
  const footEl = $('#sidebarFoot');
  const mob = () => window.matchMedia('(max-width: 999px)').matches;

  /* ───────────────────────── Navigation principale ───────────────────────── */
  const NAV = [
    {
      key: 'deck', icon: 'layers', label: 'Mes decks',
      run: () => goDeck(false),
      enabled: () => true
    },
    {
      key: 'cards', icon: 'grid', label: 'Cartes',
      /* Menu global (sélecteurs matière / chapitre). Si un chapitre est ouvert,
         il est simplement présélectionné dans les filtres. */
      run: () => {
        if (!State.chapterId) return goAllCards(true);
        const sub = (data.subjects || []).find(s => (s.chapters || []).some(c => c.id === State.chapterId));
        return goAllCards(true, '', { subjectId: sub ? sub.id : '', chapterId: State.chapterId });
      },
      enabled: () => true
    },
    {
      key: 'review', icon: 'zap', label: 'Révision',
      run: () => State.chapterId && startRev(State.chapterId),
      enabled: () => !!State.chapterId,
      badge: () => (State.chapterId && typeof cntAv === 'function' ? cntAv(getCh(State.chapterId)) || 0 : 0)
    },
    {
      key: 'images', icon: 'image', label: 'Images',
      run: () => (typeof MediaLib !== 'undefined') && MediaLib.goImages(true),
      enabled: () => typeof MediaLib !== 'undefined',
      badge: () => 0
    },
    {
      key: 'pdrive', icon: 'cloud', label: 'Mon Drive',
      run: () => (typeof PDrive !== 'undefined') && PDrive.goView(true),
      enabled: () => typeof PDrive !== 'undefined',
      badge: () => 0
    },
    {
      key: 'stats', icon: 'chart', label: 'Statistiques',
      /* Toujours accessible : sans chapitre → tableau de bord global */
      run: () => goStats(true),
      enabled: () => true
    },
    {
      key: 'settings', icon: 'settings', label: 'Paramètres',
      /* Toujours accessible : sans chapitre → réglages généraux */
      run: () => openSet(State.chapterId || null, true, 'general'),
      enabled: () => true
    }
  ];

  function activeKey() {
    if (State.view === 'deck') return 'deck';
    if (State.view === 'cards') return 'cards';
    if (State.view === 'review' || State.view === 'recap') return 'review';
    if (State.view === 'settings') return 'settings';
    if (State.view === 'images') return 'images';
    if (State.view === 'pdrive') return 'pdrive';
    if (State.view === 'stats' || State.view === 'dailyAll') return 'stats';
    if (State.view === 'daily') return State.chapterId ? 'cards' : 'stats';
    return 'stats';
  }

  function renderNav() {
    if (!navEl) return;
    const current = activeKey();
    navEl.innerHTML = NAV.map(it => {
      let on = true;
      try { on = it.enabled === undefined ? true : !!it.enabled(); } catch { on = false; }
      let badge = 0;
      try { badge = it.badge ? it.badge() : 0; } catch { badge = 0; }
      return `<button class="nav-item ${current === it.key ? 'is-active' : ''}${on ? '' : ' is-disabled'}"
                data-nav="${it.key}" ${on ? '' : 'aria-disabled="true" title="Ouvre un chapitre pour commencer"'}>
          ${ico(it.icon)}
          <span>${it.label}</span>
          ${badge > 0 ? `<span class="nav-item__badge">${badge}</span>` : ''}
        </button>`;
    }).join('');

    $$('.nav-item', navEl).forEach(btn => {
      btn.addEventListener('click', () => {
        const it = NAV.find(x => x.key === btn.dataset.nav);
        if (!it) return;
        let on = true;
        try { on = it.enabled === undefined ? true : !!it.enabled(); } catch { on = false; }
        if (!on) {
          /* Bouton indisponible : on le signale au lieu de rester muet */
          if (typeof toast === 'function') toast('Ouvre d’abord un chapitre pour commencer', 'info');
          closeDrawer();
          return;
        }
        /* Quitter le Drive d'abord : ses écrans détournent goDeck() et le clic
           semblerait sans effet. */
        try { exitDrive(); } catch {}
        try {
          it.run();
        } catch (e) {
          console.error('[nav]', e);
          if (typeof toast === 'function') toast('Action impossible pour le moment', 'error');
        }
        closeDrawer();
      });
    });
  }

  /* ─────────────────────────── Liste des matières ─────────────────────────── */
  function renderSubjects() {
    if (!subjEl) return;
    const subs = (data && data.subjects) || [];
    const cur = data?.app?.currentSubjectId;

    subjEl.innerHTML = subs.map(s => {
      const nb = (s.chapters || []).length;
      return `<button class="subj-item ${s.id === cur ? 'is-active' : ''}" data-sub="${s.id}">
          <span class="subj-emoji">${s.emoji || ico('book', 'ico--sm')}</span>
          <span class="subj-name">${escapeHtml(s.title || 'Sans titre')}</span>
          <span class="subj-count">${nb}</span>
        </button>`;
    }).join('') + `
      <button class="sidebar__cta" id="sidebarAddSubject">
        ${ico('plus', 'ico--sm')}<span>Nouvelle matière</span>
      </button>`;

    $$('.subj-item', subjEl).forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.sub;
        try { exitDrive(); } catch {}
        if (id !== data.app.currentSubjectId && typeof setSub === 'function') setSub(id);
        goDeck(false);
        closeDrawer();
      });
    });

    const add = $('#sidebarAddSubject');
    if (add) add.addEventListener('click', () => {
      const title = prompt('Nom de la matière :');
      if (!title || !title.trim()) return;
      const emoji = prompt('Emoji (optionnel) :', '') || '';
      try { exitDrive(); } catch {}
      const newSub = {
        id: 'sub-' + slugify(title) + '-' + Date.now(),
        title: title.trim(), emoji: emoji.trim(), chapters: [], groups: []
      };
      data.subjects.push(newSub);
      data.app.currentSubjectId = newSub.id;
      saveData();
      if (typeof toast === 'function') toast('Matière créée', 'success');
      goDeck(false);
      closeDrawer();
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* ─────────────────────────────── Synchro UI ─────────────────────────────── */
  let syncTimer = null;
  function syncShell() {
    /* Chaque section est rendue séparément : une erreur ponctuelle ne
       doit jamais vider tout le menu. */
    try { renderNav(); } catch (e) { console.error('[shell] renderNav', e); }
    try { renderSubjects(); } catch (e) { console.error('[shell] renderSubjects', e); }
    try {
      const s = typeof getSub === 'function' ? getSub() : null;
      if (brandSub && s) brandSub.textContent = `${s.emoji ? s.emoji + ' ' : ''}${s.title}`;
      if (footEl && typeof APP_VER !== 'undefined') footEl.textContent = `v${APP_VER}`;
    } catch (e) { /* la coquille ne doit jamais bloquer l'app */ }
  }
  /* Version regroupée, pour les observateurs qui peuvent déclencher en rafale */
  function queueSync() { clearTimeout(syncTimer); syncTimer = setTimeout(syncShell, 30); }

  /* ──────────────────────────────── Tiroir ──────────────────────────────── */
  function openDrawer() {
    if (!sidebar) return;
    /* Le tiroir doit passer au-dessus de tout : on ferme d'abord les calques
       (lightbox, modales du Drive, menu des matières) qui pourraient le masquer
       et donner l'impression que le bouton ne fait rien. */
    try { closeOverlays(); } catch { /* tant pis, on ouvre quand même */ }
    try { syncShell(); } catch { /* le tiroir doit s'ouvrir quoi qu'il arrive */ }
    sidebar.classList.add('is-open');
    /* Le voile n'a de sens qu'en mode tiroir : sur ordinateur la barre est
       déjà visible, l'assombrir donnerait un écran « cassé » sans raison. */
    const asDrawer = mob();
    if (scrim) {
      if (asDrawer) { scrim.hidden = false; requestAnimationFrame(() => scrim.classList.add('is-open')); }
      else { scrim.classList.remove('is-open'); scrim.hidden = true; }
    }
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
    if (typeof haptic === 'function') haptic('light');
  }
  function closeDrawer() {
    sidebar?.classList.remove('is-open');
    if (scrim) { scrim.classList.remove('is-open'); setTimeout(() => { if (!scrim.classList.contains('is-open')) scrim.hidden = true; }, 220); }
    syncMenuBtn();
  }

  /* ─────────────── Ordinateur : replier / déplier la barre latérale ───────────────
     Sur PC la barre est visible par défaut ; le bouton ☰ la cache ou l'affiche. */
  const shell = sidebar?.parentElement || null;
  const navCollapsed = () => !!shell && shell.classList.contains('is-nav-collapsed');
  function setNavCollapsed(on) {
    shell?.classList.toggle('is-nav-collapsed', !!on);
    syncMenuBtn();
  }
  /* État ARIA du bouton ☰ selon le mode courant (tiroir mobile ou barre desktop) */
  function syncMenuBtn() {
    if (!menuBtn) return;
    if (mob()) {
      menuBtn.setAttribute('aria-expanded', String(!!sidebar?.classList.contains('is-open')));
      menuBtn.setAttribute('aria-label', 'Ouvrir le menu');
      menuBtn.title = 'Menu';
    } else {
      const shown = !navCollapsed();
      menuBtn.setAttribute('aria-expanded', String(shown));
      menuBtn.setAttribute('aria-label', shown ? 'Masquer le menu' : 'Afficher le menu');
      menuBtn.title = shown ? 'Masquer le menu' : 'Afficher le menu';
    }
  }

  function toggleDrawer() {
    if (!mob()) { setNavCollapsed(!navCollapsed()); return; }
    sidebar?.classList.contains('is-open') ? closeDrawer() : openDrawer();
  }

  menuBtn?.setAttribute('aria-controls', 'sidebar');
  menuBtn?.addEventListener('click', e => { e.stopPropagation(); toggleDrawer(); });
  scrim?.addEventListener('click', closeDrawer);
  syncMenuBtn();

  /* ─────────────────────────── Raccourcis clavier ─────────────────────────── */

  /* Notation 1–4 : fonctionne quelle que soit la disposition du clavier.
     · Chiffres (rangée du haut ou pavé numérique) → via la touche physique (e.code)
     · Sur AZERTY, les chiffres 1 à 4 sont aussi les touches « & é " ' » (sans Maj) */
  const GRADE_CODES = { Digit1: '1', Digit2: '2', Digit3: '3', Digit4: '4', Numpad1: '1', Numpad2: '2', Numpad3: '3', Numpad4: '4' };
  const GRADE_CHARS = { '&': '1', 'é': '2', 'É': '2', '"': '3', "'": '4' };
  function gradeFromKey(e) {
    if (/^[1-4]$/.test(e.key)) return e.key;
    if (GRADE_CODES[e.code]) return GRADE_CODES[e.code];
    return GRADE_CHARS[e.key] || null;
  }
  const typing = () => {
    const el = document.activeElement;
    return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
  };

  function focusSearch() {
    const input = $('#globalSearch');
    if (input) { input.focus(); input.select?.(); return; }
    goDeck(false);
    requestAnimationFrame(() => {
      const i = $('#globalSearch');
      if (i) i.focus();
    });
  }

  document.addEventListener('keydown', e => {
    const meta = e.metaKey || e.ctrlKey;

    if (e.key === 'Escape') {
      if (typeof safeCloseLB === 'function') safeCloseLB();
      closeDrawer();
      const menu = $('#subjectMenu');
      if (menu && menu.style.display === 'block' && typeof closeSubMenu === 'function') closeSubMenu();
      return;
    }
    if (meta && e.key.toLowerCase() === 'k') { e.preventDefault(); focusSearch(); return; }
    if (e.key === '/' && !typing()) { e.preventDefault(); focusSearch(); return; }
    if (typing() || meta) return;

    /* Fin de session (récapitulatif) : Entrée lance la suite, sans passer par la souris.
       Un bouton déjà focalisé (ex. « Revenir aux decks ») garde son comportement natif. */
    if (State?.view === 'recap') {
      const ae = document.activeElement;
      const onOtherButton = ae && ae.id !== 'contBtn' && (ae.tagName === 'BUTTON' || ae.tagName === 'A');
      if (e.key === 'Enter' && !e.repeat && !onOtherButton) {
        const cont = $('#contBtn');
        if (cont) { e.preventDefault(); cont.click(); }
      }
      return;
    }

    /* Révision : Espace retourne la carte, 1–4 notent */
    if (State?.view === 'review') {
      /* Mode vocal : tant qu'un retour est affiché, seule la suite compte
         (Espace = carte suivante, R = réessayer) et 1–4 ne notent pas. */
      if (typeof voiceKeyAction === 'function' && voiceKeyAction(e)) return;
      if (e.key === ' ' || e.key === 'Enter') {
        const flip = $('#flipBtn');
        if (flip) { e.preventDefault(); flip.click(); }
        return;
      }
      const map = { '1': 'echec', '2': 'difficile', '3': 'bien', '4': 'facile' };
      const grade = gradeFromKey(e);
      if (grade && map[grade]) {
        const b = $('#g_' + map[grade]);
        if (b) { e.preventDefault(); b.click(); }
      }
    }
  });

  /* ─────────────── Vue : détail d'une journée de révision ───────────────
     Appelée par les barres « 7 derniers jours » (goChapter). */
  window.goDaily = function (cid, key, push = true) {
    if (typeof safeCloseLB === 'function') safeCloseLB();
    try { exitDrive(); } catch {}
    if (push) Nav.push();
    State.view = 'daily'; State.chapterId = cid; State.dailyKey = key;
    const c = typeof getCh === 'function' ? getCh(cid) : null;
    if (!c) { Nav.back(); return; }

    setTop({ title: fmtDayFR(key) });
    setBot({ actions: false, revision: false });
    hideRevAct();

    const log = ((c.stats && c.stats.dailyLog && c.stats.dailyLog[key]) || []).slice().sort((a, b) => b.ts - a.ts);
    const dur = log.reduce((n, e) => n + (e.ms || 0), 0);
    const ok = log.filter(e => isSucc(e.next)).length;
    const changed = log.filter(e => e.prev !== e.next).length;
    const byId = new Map(c.cards.map(x => [x.id, x]));
    const GR = { echec: 'circle-x', difficile: 'circle-alert', bien: 'circle-check', facile: 'zap' };

    const rows = log.map(e => {
      const card = byId.get(e.cardId);
      const front = card ? getSides(card, c).f : 'Carte supprimée';
      const h = new Date(e.ts);
      const time = `${String(h.getHours()).padStart(2, '0')}:${String(h.getMinutes()).padStart(2, '0')}`;
      return `<div class="day-item">
        <div class="day-item__main">
          <div class="day-item__front">${formatText(front)}</div>
          <div class="day-item__meta">${time} · ${fmtDur(e.ms || 0)} · avant : ${e.prev}</div>
        </div>
        <span class="grade-tag ${e.next}">${ico(GR[e.next] || 'dot', 'ico--xs')}${e.next}</span>
      </div>`;
    }).join('');

    $('#view').innerHTML = `
      <div class="card card--flush">
        <div class="view-head">
          <div>
            <h2 class="view-head__title">${fmtDayFR(key)}</h2>
            <div class="view-head__meta">${c.title} · ${log.length} carte${log.length > 1 ? 's' : ''} révisée${log.length > 1 ? 's' : ''}</div>
          </div>
          <div class="view-head__actions">
            <button class="btn btn--outline btn--sm" id="dayBackBtn">${ico('chevron-left', 'ico--sm')}<span>Statistiques</span></button>
          </div>
        </div>
        <div class="view-body day-view">
          <div class="day-kpis">
            <div class="stat-card"><div class="stat-val">${log.length}</div><div class="stat-lbl">Cartes révisées</div></div>
            <div class="stat-card"><div class="stat-val">${log.length ? Math.round(ok / log.length * 100) : 0}%</div><div class="stat-lbl">Taux de réussite</div></div>
            <div class="stat-card"><div class="stat-val">${changed}</div><div class="stat-lbl">Changements de niveau</div></div>
            <div class="stat-card"><div class="stat-val">${fmtDur(dur)}</div><div class="stat-lbl">Temps de révision</div></div>
          </div>
          <div class="section-title">Décisions prises</div>
          ${log.length ? `<div class="day-log">${rows}</div>`
            : `<div class="empty">${ico('calendar', 'ico--xl')}<div class="empty__title">Aucune révision ce jour-là</div><div class="empty__sub">Les révisions quotidiennes apparaîtront ici, avec les décisions prises sur chaque carte.</div></div>`}
        </div>
      </div>`;

    tsLat($('#view'));
    const back = $('#dayBackBtn');
    if (back) back.onclick = () => goChapter(cid, false);
  };

  /* ─────────── Zoom typographique : Maj + molette (ordinateur) ───────────
     Équivalent souris du pincement sur mobile : agit sur la face survolée
     (recto / verso) en révision, sinon sur les deux tailles à la fois. */
  const FZ_MIN = 12, FZ_MAX = 72;
  let lastZoomStep = 0, hudTimer = null, zoomAcc = 0;

  function zoomHud(text) {
    let el = document.getElementById('zoomHud');
    if (!el) {
      el = document.createElement('div');
      el.id = 'zoomHud';
      el.className = 'zoom-hud';
      el.setAttribute('aria-hidden', 'true');
      document.body.appendChild(el);
    }
    el.innerHTML = `${ico('keyboard', 'ico--sm')}<span></span>`;
    el.lastElementChild.textContent = text;
    el.classList.add('show');
    clearTimeout(hudTimer);
    hudTimer = setTimeout(() => el.classList.remove('show'), 1100);
  }

  /* Si l'écran des réglages est ouvert, les curseurs suivent le zoom */
  function syncFontControls(P) {
    if (typeof State === 'undefined' || State.view !== 'settings') return;
    const sT = document.getElementById('sldT');
    const sD = document.getElementById('sldD');
    if (sT) { sT.value = P.fsTerm; sT.dispatchEvent(new Event('input')); }
    if (sD) { sD.value = P.fsDef; sD.dispatchEvent(new Event('input')); }
  }

  document.addEventListener('wheel', (e) => {
    if (!e.shiftKey) return;
    if (!e.target || !e.target.closest) return;
    if (e.target.closest('.scroll-x')) return;           // laisse le défilement horizontal
    const delta = e.deltaY || e.deltaX;
    if (!delta) return;
    e.preventDefault();

    const now = Date.now();
    if (now - lastZoomStep < 85) return;                 // cadence régulière, même au trackpad
    lastZoomStep = now;

    let face = 'both';
    if (e.target.closest('.review-card, .card-block, .ac-item')) {
      face = e.target.closest('.term, .ac-item__front') ? 'term'
           : e.target.closest('.definition, .ac-item__back') ? 'def' : 'both';
    }

    const P = data?.app?.prefs;
    if (!P) return;
    const step = v => Math.min(FZ_MAX, Math.max(FZ_MIN, Math.round(v * (delta > 0 ? 0.95 : 1.05))));
    if (face !== 'def') P.fsTerm = step(P.fsTerm || 20);
    if (face !== 'term') P.fsDef = step(P.fsDef || 24);

    applyUI();
    if (typeof debouncedSave === 'function') debouncedSave();
    syncFontControls(P);
    zoomHud(face === 'term' ? `Recto · ${P.fsTerm} px`
          : face === 'def' ? `Verso · ${P.fsDef} px`
          : `Police · ${P.fsTerm} / ${P.fsDef} px`);
  }, { passive: false });

  /* Navigation clavier sur le titre (matières) */
  $('#title')?.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); $('#title').click(); }
  });

  /* ─────────────────────── Suivi des changements de vue ─────────────────────── */
  const titleEl = $('#title');
  if (titleEl) {
    new MutationObserver(queueSync).observe(titleEl, { childList: true, characterData: true, subtree: true });
  }
  window.addEventListener('resize', () => { if (!mob()) closeDrawer(); syncMenuBtn(); }, { passive: true });
  window.addEventListener('popstate', queueSync);

  const baseSetTop = window.setTop;
  if (typeof baseSetTop === 'function') window.setTop = function (o) { baseSetTop(o); syncShell(); };
  const baseApplyUI = window.applyUI;
  if (typeof baseApplyUI === 'function') window.applyUI = function () { baseApplyUI(); syncShell(); };

  /* Adaptation de l'indice clavier selon la plateforme (⌘ sur Mac) */
  (function platformKeys() {
    const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent || '');
    $$('.search-kbd kbd').forEach((k, i) => {
      if (isMac) k.textContent = i === 0 ? '⌘' : 'K';
    });
    $$('.review-hint kbd').forEach(k => {
      if (isMac && k.textContent === 'Espace') k.textContent = 'Espace';
    });
  })();

  /* Premier rendu */
  const boot = () => { syncShell(); setTimeout(queueSync, 600); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
