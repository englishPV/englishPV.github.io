/*11_drive_pdf.js*/
/* ══════════════════════════════════════════════════════════════
   LECTEUR PDF DU DRIVE  —  rendu maison avec PDF.js

   Il remplace l'aperçu natif du navigateur (<iframe>) :
     · sur téléphone, l'aperçu natif affiche la page à sa taille
       réelle → il faut glisser vers la droite/gauche pour tout
       voir. Ici la page est **ajustée à la largeur** par défaut ;
     · zoom +/−, **pincement à deux doigts**, double-tap,
       Ctrl + molette (ordinateur) ;
     · trois ajustements : **Largeur / Page entière / 100 %** ;
     · navigation page à page, **rotation**, **plein écran**
       (repli « fenêtre maximisée » sur iPhone, où l'API plein
       écran n'existe pas pour un simple conteneur) ;
     · texte sélectionnable + Ctrl+F sur ordinateur ;
     · rendu **paresseux** : seules les pages proches de l'écran
       sont dessinées, les pages lointaines sont libérées
       (mémoire préservée sur mobile) ;
     · repli automatique sur l'aperçu natif si PDF.js ne peut pas
       être chargé ou si le fichier est illisible.

   PDF.js est chargé **à la demande** (premier PDF ouvert) depuis
   le dépôt — voir vendor/pdfjs/README.md.
   ══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const W = window, D = document;
  const ico = (n, c) => (W.ico ? W.ico(n, c) : '');
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

  const PDFJS_VER = '3.11.174';
  const MIN_SCALE = 0.2, MAX_SCALE = 8, ZOOM_STEP = 1.25;
  /* Marge et espacement des pages : lus depuis les variables CSS
     --dpdfv-edge / --dpdfv-gap (css/02_drive.css) pour rester synchronisés. */
  let EDGE = 10, GAP = 10;
  const KEEP = 6;                       // pages rendues conservées de part et d'autre
  const LS_FIT = 'pv_drive_pdf_fit';
  const LS_HINT = 'pv_drive_pdf_hint';
  const FIT_LABEL = { width: 'Largeur', page: 'Page entière', actual: '100 %', custom: 'Libre' };
  const FIT_ORDER = ['width', 'page', 'actual'];

  const siteBase = () => W.location.href.replace(/[^/]*$/, '');
  const finePointer = () => { try { return W.matchMedia('(pointer: fine)').matches; } catch { return false; } };
  const LSget = (k, fb) => { try { const v = localStorage.getItem(k); return v == null ? fb : JSON.parse(v); } catch { return fb; } };
  const LSset = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
  const escAttr = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /* ─────────── Chargement paresseux de PDF.js (une seule fois) ─────────── */
  let pdfjsPromise = null;
  function loadPdfJs() {
    if (W.pdfjsLib && W.pdfjsLib.getDocument) return Promise.resolve(W.pdfjsLib);
    if (pdfjsPromise) return pdfjsPromise;
    pdfjsPromise = new Promise((res, rej) => {
      const s = D.createElement('script');
      s.src = siteBase() + 'vendor/pdfjs/pdf.min.js?v=' + PDFJS_VER;
      s.async = true;
      s.onload = () => {
        if (!W.pdfjsLib || !W.pdfjsLib.getDocument) { pdfjsPromise = null; return rej(new Error('PDF.js indisponible')); }
        try {
          W.pdfjsLib.GlobalWorkerOptions.workerSrc = siteBase() + 'vendor/pdfjs/pdf.worker.min.js?v=' + PDFJS_VER;
        } catch (e) { /* mode « fake worker » : pdf.js se débrouille seul */ }
        res(W.pdfjsLib);
      };
      s.onerror = () => { pdfjsPromise = null; rej(new Error('Chargement du lecteur PDF impossible')); };
      D.head.appendChild(s);
    });
    return pdfjsPromise;
  }

  function supported() {
    return !!(W.Promise && W.Uint8Array && D.createElement('canvas').getContext);
  }

  /* ══════════════════════════════════════════════════════════
     MONTAGE D'UN LECTEUR
     opts : { host, blob, name, url, fit, onFallback, onReady }
     retourne { el, destroy, setFit, zoom, rotate, goToPage,
                toggleMax, scale, fit, numPages, page, _state() }
     ══════════════════════════════════════════════════════════ */
  function mount(opts) {
    opts = opts || {};
    const host = opts.host;
    if (!host) throw new Error('DrivePdf.mount : « host » manquant');
    const name = opts.name || 'document.pdf';
    const fallbackUrl = opts.url || '';

    /* ── état ── */
    let pdfjs = null, pdf = null, destroyed = false;
    let numPages = 0, rotation = 0;
    let pageW0 = 612, pageH0 = 792;            // page 1 en pt, rotation utilisateur exclue
    let baseW = 612, baseH = 792;              // idem, rotation utilisateur incluse
    let scale = 1;
    let fit = opts.fit || LSget(LS_FIT, 'width');
    if (!FIT_LABEL[fit]) fit = 'width';
    let current = 0;
    let pages = [];                            // { i, el, canvas, tl, page, wpt, hpt, w, h, rendered, task }
    let offsets = [];                          // haut de chaque page dans le contenu déroulant (px)
    const pending = new Set();
    const visible = new Set();
    let pumping = false, token = 0;
    let io = null, ro = null, rafScroll = 0, resizeTimer = 0, hintTimer = 0, tlTimer = 0;
    const tlQueue = new Set();               // couche texte : rendue après la fin des gestes
    let maxMode = false;                       // repli CSS (iPhone)
    let zooming = false, zoomTimer = 0;        // pendant un geste : on étire l'image, on redessine à la fin
    const winListeners = [];

    /* ── squelette ── */
    host.innerHTML = `
      <div class="dpdfv" tabindex="0" role="group" aria-label="Lecteur PDF — ${escAttr(name)}">
        <div class="dpdfv-bar" data-pdfbar>
          <div class="dpdfv-grp">
            <button type="button" class="dpdfv-b" data-pdf="prev" title="Page précédente" aria-label="Page précédente">${ico('chevron-left', 'ico--sm')}</button>
            <span class="dpdfv-pageno">
              <input class="dpdfv-pagein" type="text" inputmode="numeric" pattern="[0-9]*"
                     value="–" size="2" aria-label="Aller à la page" autocomplete="off">
              <span class="dpdfv-pageof">/ –</span>
            </span>
            <button type="button" class="dpdfv-b" data-pdf="next" title="Page suivante" aria-label="Page suivante">${ico('chevron-right', 'ico--sm')}</button>
          </div>

          <div class="dpdfv-grp">
            <button type="button" class="dpdfv-b" data-pdf="out" title="Dézoomer (−)" aria-label="Dézoomer">${ico('minus', 'ico--sm')}</button>
            <button type="button" class="dpdfv-b dpdfv-pct" data-pdf="pct" title="Revenir à l'ajustement largeur">–</button>
            <button type="button" class="dpdfv-b" data-pdf="in" title="Zoomer (+)" aria-label="Zoomer">${ico('plus', 'ico--sm')}</button>
          </div>

          <div class="dpdfv-grp">
            <button type="button" class="dpdfv-b dpdfv-fit" data-pdf="fit"
                    title="Ajuster : largeur → page entière → 100 %">${ico('arrow-left-right', 'ico--sm')}<span data-fitlabel>${FIT_LABEL[fit]}</span></button>
            <button type="button" class="dpdfv-b" data-pdf="rotate" title="Pivoter (R)" aria-label="Pivoter">${ico('rotate-ccw', 'ico--sm')}</button>
            <button type="button" class="dpdfv-b" data-pdf="max" title="Plein écran (F)" aria-label="Plein écran" data-maxbtn>${ico('maximize', 'ico--sm')}</button>
          </div>
        </div>

        <div class="dpdfv-scroll scroll-y" data-pdfscroll>
          <div class="dpdfv-pages" data-pdfpages></div>
        </div>

        <div class="dpdfv-load" data-pdfload>
          <div class="dspinner"></div>
          <span data-pdfloadtxt>Chargement du PDF…</span>
          <i class="dpdfv-prog" data-pdfprog hidden><b></b></i>
        </div>

        <div class="dpdfv-hint" data-pdfhint hidden></div>
      </div>`;

    const root = host.querySelector('.dpdfv');
    const bar = host.querySelector('[data-pdfbar]');
    const scrollEl = host.querySelector('[data-pdfscroll]');
    const pagesEl = host.querySelector('[data-pdfpages]');
    const loadEl = host.querySelector('[data-pdfload]');
    const loadTxt = host.querySelector('[data-pdfloadtxt]');
    const progEl = host.querySelector('[data-pdfprog]');
    const progBar = progEl ? progEl.firstElementChild : null;
    const hintEl = host.querySelector('[data-pdfhint]');
    const pageIn = host.querySelector('.dpdfv-pagein');
    const pageOf = host.querySelector('.dpdfv-pageof');
    const pctBtn = host.querySelector('.dpdfv-pct');
    const fitLabel = host.querySelector('[data-fitlabel]');
    const maxBtn = host.querySelector('[data-maxbtn]');

    /* ─────────────────────  barre d'outils  ───────────────────── */
    bar.addEventListener('click', e => {
      const b = e.target.closest('[data-pdf]');
      if (!b) return;
      e.preventDefault();
      const act = b.dataset.pdf;
      if (act === 'prev') goToPage(current - 1, true);
      else if (act === 'next') goToPage(current + 1, true);
      else if (act === 'in') zoomBy(ZOOM_STEP);
      else if (act === 'out') zoomBy(1 / ZOOM_STEP);
      else if (act === 'pct') setFit('width');
      else if (act === 'fit') setFit(FIT_ORDER[(FIT_ORDER.indexOf(fit === 'custom' ? 'width' : fit) + 1) % FIT_ORDER.length]);
      else if (act === 'rotate') rotateBy(90);
      else if (act === 'max') toggleMax();
      try { root.focus({ preventScroll: true }); } catch {}
    });

    pageIn.addEventListener('keydown', e => {
      e.stopPropagation();                        // ne pas déclencher les raccourcis de l'app
      if (e.key === 'Enter') { e.preventDefault(); commitPageInput(); pageIn.blur(); }
      else if (e.key === 'Escape') { pageIn.value = String(current + 1); pageIn.blur(); }
    });
    pageIn.addEventListener('change', commitPageInput);
    pageIn.addEventListener('focus', () => { try { pageIn.select(); } catch {} });
    function commitPageInput() {
      const v = parseInt(String(pageIn.value).replace(/\D/g, ''), 10);
      if (!isNaN(v) && numPages) goToPage(v - 1, true);
      else pageIn.value = String(current + 1);
    }

    function syncBar() {
      if (!numPages) return;
      if (pageIn && D.activeElement !== pageIn) {
        const v = String(current + 1);
        if (pageIn.value !== v) pageIn.value = v;
      }
      if (pageOf) { const t = '/ ' + numPages; if (pageOf.textContent !== t) pageOf.textContent = t; }
      if (pctBtn) { const t = Math.round(scale * 100) + ' %'; if (pctBtn.textContent !== t) pctBtn.textContent = t; }
      if (fitLabel) fitLabel.textContent = FIT_LABEL[fit] || '';
      root.classList.toggle('is-fit', fit !== 'custom');
    }

    function syncMaxBtn() {
      if (!maxBtn) return;
      const on = maxMode || !!(D.fullscreenElement || D.webkitFullscreenElement);
      maxBtn.innerHTML = on ? ico('x', 'ico--sm') : ico('maximize', 'ico--sm');
      maxBtn.title = on ? 'Quitter le plein écran (Échap)' : 'Plein écran (F)';
      maxBtn.setAttribute('aria-label', on ? 'Quitter le plein écran' : 'Plein écran');
    }

    /* ─────────────────────  pleine fenêtre  ───────────────────── */
    function toggleMax() {
      if (D.fullscreenElement || D.webkitFullscreenElement) {
        const ex = D.exitFullscreen || D.webkitExitFullscreen;
        if (ex) { try { const r = ex.call(D); if (r && r.catch) r.catch(() => {}); } catch {} }
        return;
      }
      if (maxMode) { setMax(false); return; }
      const req = root.requestFullscreen || root.webkitRequestFullscreen;
      if (req) {
        try {
          const p = req.call(root);
          if (p && p.catch) p.catch(() => setMax(true));      // refusé (iPhone, iframe…) → repli CSS
        } catch { setMax(true); }
      } else setMax(true);
    }

    function setMax(on) {
      maxMode = on;
      root.classList.toggle('is-max', on);
      try { D.body.classList.toggle('dpdfv-locked', on); } catch {}
      syncMaxBtn();
      refitLater();
    }

    function onFsChange() {
      root.classList.toggle('is-fs', !!(D.fullscreenElement || D.webkitFullscreenElement));
      syncMaxBtn();
      refitLater();
    }

    /* ─────────────────────  échelle / ajustements  ───────────────────── */
    const availW = () => Math.max(80, (scrollEl.clientWidth || 320) - EDGE * 2);
    const availH = () => Math.max(80, (scrollEl.clientHeight || 480) - EDGE * 2);

    function fitScale() {
      if (fit === 'actual') return 1;
      if (fit === 'page') return Math.min(availW() / baseW, availH() / baseH);
      return availW() / baseW;                                 // 'width' et 'custom' → largeur
    }

    /* Nouvelle échelle en gardant fixe le point sous le doigt/curseur.
       anchor = { x, y } en coordonnées client (défaut : centre de l'écran). */
    function applyScale(next, anchor, force) {
      next = clamp(next, MIN_SCALE, MAX_SCALE);
      if (!numPages) { scale = next; syncBar(); return; }
      const same = Math.abs(next - scale) < 1e-4;
      if (same && !force) return;
      if (same) { layout(); requeue(); syncBar(); return; }   // cadrage forcé, même échelle
      const ref = pages[current] || pages[0];
      const sr = scrollEl.getBoundingClientRect();
      const ax = anchor ? anchor.x : sr.left + sr.width / 2;
      const ay = anchor ? anchor.y : sr.top + sr.height / 2;
      let fx = .5, fy = .5, hasRef = false, r0 = null;
      if (ref) {
        r0 = ref.el.getBoundingClientRect();
        if (r0.width > 0 && r0.height > 0) { fx = (ax - r0.left) / r0.width; fy = (ay - r0.top) / r0.height; hasRef = true; }
      }

      scale = next;
      /* Pendant un geste (pincement, molette, clics répétés) on se contente
         d'étirer l'image déjà dessinée : pas de clignotement blanc, pas de
         rendu à chaque palier. Le rendu net part à la fin du geste. */
      if (!zooming) { token++; cancelTasks(); resetText(); for (const p of pages) p.rendered = false; }
      layout();

      if (ref && hasRef) {
        const r1 = ref.el.getBoundingClientRect();
        scrollEl.scrollLeft += (r1.left + fx * r1.width) - ax;
        scrollEl.scrollTop += (r1.top + fy * r1.height) - ay;
      }
      if (!zooming) requeue();
      syncBar();
    }

    /* Début / fin d'un geste de zoom */
    function beginZoom() {
      zooming = true;
      clearTimeout(zoomTimer);
      root.classList.add('is-zooming');
    }
    function endZoom(delay) {
      clearTimeout(zoomTimer);
      zoomTimer = setTimeout(() => {
        zoomTimer = 0; zooming = false;
        root.classList.remove('is-zooming');
        if (destroyed || !numPages) return;
        token++; cancelTasks(); resetText();
        for (const p of pages) p.rendered = false;
        requeue();
      }, delay == null ? 170 : delay);
    }

    function zoomBy(f, anchor) {
      fit = 'custom'; LSset(LS_FIT, 'custom');
      beginZoom();
      applyScale(scale * f, anchor);
      endZoom(160);
      syncBar();
    }

    function setFit(mode) {
      if (!FIT_LABEL[mode]) mode = 'width';
      zooming = false; clearTimeout(zoomTimer); root.classList.remove('is-zooming');
      fit = mode;
      LSset(LS_FIT, mode);
      applyScale(fitScale(), null, true);           // force : même valeur, nouveau cadrage
    }

    function rotateBy(deg) {
      zooming = false; clearTimeout(zoomTimer); root.classList.remove('is-zooming');
      rotation = ((rotation + deg) % 360 + 360) % 360;
      const swap = rotation % 180 !== 0;
      baseW = swap ? pageH0 : pageW0;
      baseH = swap ? pageW0 : pageH0;
      token++; cancelTasks(); resetText();
      pages.forEach(p => { p.wpt = baseW; p.hpt = baseH; p.rendered = false; });
      applyScale(fit === 'custom' ? scale : fitScale(), null, true);
    }

    /* La taille de la fenêtre change (rotation du téléphone, plein écran,
       clavier virtuel…) : on recadre sans perdre le zoom manuel. */
    function refitLater() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (destroyed || !numPages) return;
        readMetrics();
        if (fit === 'custom') { layout(); requeue(); return; }
        applyScale(fitScale(), null, true);
      }, 150);
    }

    function requeue() {
      pending.clear();
      if (visible.size) visible.forEach(i => pending.add(i));
      else if (numPages) {                          // visibilité inconnue : on amorce
        for (let i = Math.max(0, current - 1); i <= Math.min(numPages - 1, current + 1); i++) {
          visible.add(i); pending.add(i);
        }
      }
      prune(true);
      pump();
    }

    /* Relit les métriques CSS (elles changent selon la largeur d'écran) */
    function readMetrics() {
      try {
        const cs = W.getComputedStyle(root);
        const e = parseFloat(cs.getPropertyValue('--dpdfv-edge'));
        const g = parseFloat(cs.getPropertyValue('--dpdfv-gap'));
        if (e > 0) EDGE = e;
        if (g >= 0) GAP = g;
      } catch { /* valeurs par défaut */ }
    }

    /* ─────────────────────  mise en page  ───────────────────── */
    /* Tout est calculé (pas de lecture du DOM pendant le défilement) :
       les pages font la même hauteur, sauf format mixte corrigé au rendu. */
    function layout() {
      const s = scale;
      let y = EDGE;
      offsets = new Array(numPages);
      for (const p of pages) {
        p.w = Math.max(1, Math.round(p.wpt * s));
        p.h = Math.max(1, Math.round(p.hpt * s));
        p.el.style.width = p.w + 'px';
        p.el.style.height = p.h + 'px';
        p.el.style.setProperty('--scale-factor', String(s));
        if (p.canvas) { p.canvas.style.width = p.w + 'px'; p.canvas.style.height = p.h + 'px'; }
        offsets[p.i] = y;
        y += p.h + GAP;
      }
    }

    function buildPages() {
      readMetrics();
      const frag = D.createDocumentFragment();
      pages = [];
      for (let i = 0; i < numPages; i++) {
        const el = D.createElement('div');
        el.className = 'dpdfv-page is-blank';
        el.dataset.i = String(i);
        const cv = D.createElement('canvas');
        cv.className = 'dpdfv-canvas';
        el.appendChild(cv);
        const lbl = D.createElement('span');
        lbl.className = 'dpdfv-num';
        lbl.textContent = String(i + 1);
        el.appendChild(lbl);
        frag.appendChild(el);
        pages.push({ i, el, canvas: cv, tl: null, page: null, wpt: baseW, hpt: baseH, w: 0, h: 0, rendered: false, task: null });
      }
      pagesEl.textContent = '';
      pagesEl.appendChild(frag);
      layout();

      if (io) { try { io.disconnect(); } catch {} io = null; }
      if (W.IntersectionObserver) {
        io = new W.IntersectionObserver(entries => {
          for (const en of entries) {
            const i = +en.target.dataset.i;
            if (en.isIntersecting) { visible.add(i); pending.add(i); }
            else visible.delete(i);
          }
          pump();
        }, { root: scrollEl, rootMargin: '80% 0px 80% 0px', threshold: 0 });
        pages.forEach(p => io.observe(p.el));
      }
    }

    function cancelTasks() {
      for (const p of pages) {
        if (p.task) { try { p.task.cancel(); } catch {} p.task = null; }
      }
    }

    /* Libère les pages trop éloignées : un gros PDF ne doit pas
       saturer la mémoire d'un téléphone. */
    function prune(force) {
      for (const p of pages) {
        if (Math.abs(p.i - current) <= KEEP) continue;
        if (p.task) { try { p.task.cancel(); } catch {} p.task = null; }
        if (force || !visible.has(p.i)) {
          if (p.canvas && p.canvas.width) p.canvas.width = p.canvas.height = 0;
          if (p.tl) p.tl.textContent = '';
          tlQueue.delete(p.i);
          p.rendered = false;
          p.el.classList.add('is-blank');
          p.el.classList.remove('is-rendered');
        }
      }
    }

    /* ─────────────────────  file de rendu  ───────────────────── */
    function pump() {
      if (pumping || destroyed || !pdf) return;
      if (!pending.size && numPages && !visible.size) {        // amorçage si l'observateur n'a rien vu
        visible.add(current); pending.add(current);
      }
      if (!pending.size) return;
      pumping = true;
      (async () => {
        while (pending.size && !destroyed) {
          let best = -1, bestD = Infinity;
          pending.forEach(i => { const d = Math.abs(i - current); if (d < bestD) { bestD = d; best = i; } });
          pending.delete(best);
          const p = pages[best];
          if (!p || p.rendered || p.task) continue;
          try { await renderOne(p); }
          catch (e) {
            if (e && e.name !== 'RenderingCancelledException') console.warn('[DrivePdf] page', best + 1, e);
          }
        }
        pumping = false;
        if (pending.size && !destroyed) pump();
      })();
    }

    async function renderOne(p) {
      const my = token;
      if (!p.page) {
        p.page = await pdf.getPage(p.i + 1);
        if (destroyed || my !== token) return;
        /* format différent du reste du document (page paysage isolée…) */
        const vp1 = p.page.getViewport({ scale: 1, rotation: p.page.rotate + rotation });
        if (Math.abs(vp1.width - p.wpt) > 1 || Math.abs(vp1.height - p.hpt) > 1) {
          p.wpt = vp1.width; p.hpt = vp1.height;
          layout();
        }
      }
      const dpr = clamp(W.devicePixelRatio || 1, 1, 2.5);
      const rot = p.page.rotate + rotation;
      const vpCss = p.page.getViewport({ scale, rotation: rot });
      const vpDev = p.page.getViewport({ scale: scale * dpr, rotation: rot });
      const w = Math.max(1, Math.round(vpCss.width)), h = Math.max(1, Math.round(vpCss.height));
      p.w = w; p.h = h;
      p.el.style.width = w + 'px'; p.el.style.height = h + 'px';
      p.canvas.style.width = w + 'px'; p.canvas.style.height = h + 'px';
      p.canvas.width = Math.max(1, Math.round(vpDev.width));
      p.canvas.height = Math.max(1, Math.round(vpDev.height));

      const ctx = p.canvas.getContext('2d', { alpha: false });
      if (!ctx) return;
      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, p.canvas.width, p.canvas.height);
      ctx.restore();

      const task = p.page.render({ canvasContext: ctx, viewport: vpDev });
      p.task = task;
      try { await task.promise; } finally { if (p.task === task) p.task = null; }
      if (destroyed || my !== token) return;

      p.rendered = true;
      p.renderedToken = my;
      p.el.classList.remove('is-blank');
      p.el.classList.add('is-rendered');
      scheduleText(p);                              // après l'image : le texte n'est pas prioritaire
    }

    /* La couche texte est recalée sur l'échelle du moment : pendant un zoom
       (molette, pincement) on la retire et on attend la fin du geste, sinon
       chaque palier relancerait l'extraction du texte de toutes les pages. */
    function resetText() {
      clearTimeout(tlTimer);
      tlQueue.clear();
      for (const p of pages) if (p.tl && p.tl.firstChild) p.tl.textContent = '';
    }

    function scheduleText(p) {
      if (!finePointer() || !pdfjs || !pdfjs.renderTextLayer) return;
      tlQueue.add(p.i);
      clearTimeout(tlTimer);
      tlTimer = setTimeout(() => {
        tlTimer = 0;
        const list = [...tlQueue];
        tlQueue.clear();
        for (const i of list) {
          const q = pages[i];
          if (destroyed || !q || !q.rendered || q.renderedToken !== token) continue;
          renderTextLayer(q, q.renderedToken);
        }
      }, 220);
    }

    /* Couche texte : sélection et Ctrl+F sur ordinateur. Sur téléphone elle
       reste désactivée pour ne pas accrocher les gestes (pincement, glisser). */
    async function renderTextLayer(p, my) {
      if (!finePointer() || !pdfjs || !pdfjs.renderTextLayer || !p.page) return;
      try {
        const tc = await p.page.getTextContent();
        if (destroyed || my !== token) return;
        const vp = p.page.getViewport({ scale, rotation: p.page.rotate + rotation });
        if (!p.tl) { p.tl = D.createElement('div'); p.tl.className = 'dpdfv-tl'; p.el.appendChild(p.tl); }
        p.tl.textContent = '';
        p.tl.style.setProperty('--scale-factor', String(scale));
        await pdfjs.renderTextLayer({
          textContentSource: tc, textContent: tc,
          container: p.tl, viewport: vp, textDivs: []
        }).promise;
      } catch (e) { /* PDF sans texte extractible : sans conséquence */ }
    }

    /* ─────────────────────  navigation  ───────────────────── */
    function goToPage(i, smooth) {
      if (!numPages) return;
      i = clamp(i | 0, 0, numPages - 1);
      current = i;
      const top = Math.max(0, (offsets[i] != null ? offsets[i] : EDGE) - EDGE);
      try { scrollEl.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' }); }
      catch { scrollEl.scrollTop = top; }
      visible.add(i); pending.add(i);
      prune(false); pump(); syncBar();
    }

    function pageAt(y) {
      let lo = 0, hi = numPages - 1;
      while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        const top = offsets[mid] || 0;
        const bot = top + ((pages[mid] && pages[mid].h) || 0);
        if (y < top) hi = mid - 1;
        else if (y >= bot) lo = mid + 1;
        else return mid;
      }
      return clamp(lo, 0, Math.max(0, numPages - 1));
    }

    let lastTop = 0;
    function onScroll() {
      if (rafScroll) return;
      rafScroll = requestAnimationFrame(() => {
        rafScroll = 0;
        if (destroyed || !numPages) return;
        const top = scrollEl.scrollTop;
        const dy = top - lastTop; lastTop = top;
        if (dy && typeof opts.onScroll === 'function') {
          try { opts.onScroll({ dir: dy > 0 ? 1 : -1, dy: Math.abs(dy), top }); } catch {}
        }
        const i = pageAt(top + scrollEl.clientHeight * 0.35);
        if (i !== current) { current = i; prune(false); }
        if (!W.IntersectionObserver) {                 // repli : visibilité calculée à la main
          const vTop = top - scrollEl.clientHeight * .8;
          const vBot = top + scrollEl.clientHeight * 1.8;
          for (const p of pages) {
            const t = offsets[p.i] || 0, b = t + (p.h || 0);
            if (b >= vTop && t <= vBot) { if (!visible.has(p.i)) { visible.add(p.i); pending.add(p.i); } }
            else visible.delete(p.i);
          }
          pump();
        }
        syncBar();
      });
    }

    /* ─────────────────────  gestes tactiles  ───────────────────── */
    let pinch = null, tapStart = null, lastPinchEnd = 0;
    const fingerDist = t => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);

    scrollEl.addEventListener('touchstart', e => {
      if (e.touches.length === 2) {
        beginZoom();
        tapStart = null;
        pinch = {
          d0: fingerDist(e.touches), s0: scale,
          x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
          y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
          moved: false
        };
      } else if (e.touches.length === 1) {
        pinch = null;
        tapStart = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now() };
      } else { pinch = null; tapStart = null; }
    }, { passive: true });

    scrollEl.addEventListener('touchmove', e => {
      if (!pinch || e.touches.length < 2 || !pinch.d0) return;
      e.preventDefault();                            // le zoom natif de la page est déjà désactivé
      const d = fingerDist(e.touches);
      if (d < 6) return;
      const next = clamp(pinch.s0 * (d / pinch.d0), MIN_SCALE, MAX_SCALE);
      if (Math.abs(next - scale) < 5e-3) return;
      pinch.moved = true;
      if (fit !== 'custom') { fit = 'custom'; syncBar(); }
      applyScale(next, { x: pinch.x, y: pinch.y });
    }, { passive: false });

    const endPinch = () => {
      if (!pinch) return;
      if (pinch.moved) { LSset(LS_FIT, 'custom'); lastPinchEnd = Date.now(); }
      pinch = null;
      endZoom(130);
      syncBar();
    };
    scrollEl.addEventListener('touchend', endPinch, { passive: true });
    scrollEl.addEventListener('touchcancel', endPinch, { passive: true });

    /* double-tap : largeur ⇄ zoom ×2,4.
       Un « tap » = un seul doigt, posé puis levé sans bouger et rapidement ;
       sans ces garde-fous, la fin d'un pincement (deux doigts levés coup sur
       coup) déclencherait un zoom intempestif. */
    let lastTap = 0, lastX = 0, lastY = 0;
    scrollEl.addEventListener('touchend', e => {
      if (pinch || (e.touches && e.touches.length)) return;
      const t = e.changedTouches && e.changedTouches[0];
      if (!t) return;
      const now = Date.now();
      const st = tapStart; tapStart = null;
      if (!st || Math.hypot(t.clientX - st.x, t.clientY - st.y) > 14 || now - st.t > 450) { lastTap = 0; return; }
      if (now - lastPinchEnd < 400) { lastTap = 0; return; }
      const near = Math.abs(t.clientX - lastX) < 44 && Math.abs(t.clientY - lastY) < 44;
      if (now - lastTap < 330 && near) {
        lastTap = 0;
        const wide = fitScale();
        if (fit === 'custom' && scale > wide * 1.35) { setFit('width'); return; }
        e.preventDefault();
        fit = 'custom'; LSset(LS_FIT, 'custom');
        beginZoom();
        applyScale(clamp(wide * 2.4, MIN_SCALE, MAX_SCALE), { x: t.clientX, y: t.clientY });
        endZoom(120);
        syncBar();
      } else { lastTap = now; lastX = t.clientX; lastY = t.clientY; }
    }, { passive: false });

    /* ─────────────────────  souris / clavier  ───────────────────── */
    scrollEl.addEventListener('wheel', e => {
      if (!(e.ctrlKey || e.metaKey)) {
        if (e.shiftKey) e.stopPropagation();          // pas le zoom de police des flashcards
        return;
      }
      e.preventDefault(); e.stopPropagation();
      if (fit !== 'custom') { fit = 'custom'; syncBar(); }
      beginZoom();
      applyScale(scale * (e.deltaY > 0 ? 1 / 1.12 : 1.12), { x: e.clientX, y: e.clientY });
      endZoom(170);
    }, { passive: false });

    root.addEventListener('pointerdown', () => { try { root.focus({ preventScroll: true }); } catch {} });

    root.addEventListener('keydown', e => {
      const k = e.key;
      if (k === 'Escape') {
        if (D.fullscreenElement || D.webkitFullscreenElement || maxMode) {
          e.preventDefault(); e.stopPropagation(); toggleMax();
        }
        return;
      }
      if (D.activeElement === pageIn) return;
      if (e.ctrlKey || e.metaKey) {
        if (k === '+' || k === '=') { e.preventDefault(); zoomBy(ZOOM_STEP); }
        else if (k === '-') { e.preventDefault(); zoomBy(1 / ZOOM_STEP); }
        else if (k === '0') { e.preventDefault(); setFit('width'); }
        return;
      }
      if (e.altKey) return;
      switch (k) {
        case '+': case '=': e.preventDefault(); zoomBy(ZOOM_STEP); break;
        case '-': case '_': e.preventDefault(); zoomBy(1 / ZOOM_STEP); break;
        case 'r': case 'R': e.preventDefault(); rotateBy(90); break;
        case 'f': case 'F': e.preventDefault(); toggleMax(); break;
        case 'w': case 'W': e.preventDefault(); setFit('width'); break;
        case 'PageDown': e.preventDefault(); goToPage(current + 1, true); break;
        case 'PageUp': e.preventDefault(); goToPage(current - 1, true); break;
        case 'Home': e.preventDefault(); goToPage(0, true); break;
        case 'End': e.preventDefault(); goToPage(numPages - 1, true); break;
        default: break;
      }
    });

    /* ─────────────────────  chargement / erreurs  ───────────────────── */
    function onWin(ev, fn, o) { W.addEventListener(ev, fn, o); winListeners.push([ev, fn, o]); }

    function showLoad(txt, pct) {
      if (!loadEl) return;
      loadEl.hidden = false;
      if (txt != null && loadTxt) loadTxt.textContent = txt;
      if (progEl) progEl.hidden = pct == null;
      if (progBar) progBar.style.width = (pct == null ? 0 : clamp(pct, 0, 1) * 100) + '%';
    }
    const hideLoad = () => { if (loadEl) loadEl.hidden = true; };

    function hint() {
      if (!hintEl || LSget(LS_HINT, false)) return;
      LSset(LS_HINT, true);
      hintEl.textContent = finePointer()
        ? 'La page s’ajuste à la largeur — Ctrl + molette pour zoomer, F pour le plein écran.'
        : 'La page s’ajuste à la largeur — pince pour zoomer, double-tap pour agrandir.';
      hintEl.hidden = false;
      clearTimeout(hintTimer);
      hintTimer = setTimeout(() => { hintEl.hidden = true; }, 6500);
    }

    /* Repli : aperçu natif du navigateur (comme avant) */
    function fallback(reason) {
      if (destroyed) return;
      teardown();
      destroyed = true;
      host.innerHTML = `
        <div class="dpdf-zone dpdf-zone--native">
          <iframe class="dpdf" src="${escAttr(fallbackUrl)}#toolbar=1&navpanes=0&view=FitH"
                  title="${escAttr(name)}" loading="eager"></iframe>
        </div>
        <div class="dimg-tip dimg-tip--pdf">
          ${escAttr(reason || 'Aperçu simplifié')} — utilise « Télécharger » ou « Nouvel onglet » si besoin.
        </div>`;
      if (typeof opts.onFallback === 'function') { try { opts.onFallback(reason); } catch {} }
    }

    function teardown() {
      cancelTasks();
      if (io) { try { io.disconnect(); } catch {} io = null; }
      if (ro) { try { ro.disconnect(); } catch {} ro = null; }
      clearTimeout(resizeTimer); clearTimeout(hintTimer); clearTimeout(tlTimer); clearTimeout(zoomTimer);
      if (rafScroll) { cancelAnimationFrame(rafScroll); rafScroll = 0; }
      winListeners.forEach(([ev, fn, o]) => { try { W.removeEventListener(ev, fn, o); } catch {} });
      winListeners.length = 0;
      if (maxMode) { try { D.body.classList.remove('dpdfv-locked'); } catch {} maxMode = false; }
    }

    async function openDoc(bytes, password) {
      const params = {
        data: bytes.slice(0),                 // copie : pdf.js « transfère » le tampon au worker
        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@' + PDFJS_VER + '/cmaps/',
        cMapPacked: true,
        standardFontDataUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@' + PDFJS_VER + '/standard_fonts/',
        isEvalSupported: false,
        verbosity: 0
      };
      if (password) params.password = password;
      const task = pdfjs.getDocument(params);
      try { task.onProgress = ev => { if (ev && ev.total) showLoad('Téléchargement du PDF…', ev.loaded / ev.total); }; } catch {}
      try {
        return await task.promise;
      } catch (err) {
        if (err && err.name === 'PasswordException') {
          const pw = await askPassword(err.code === 2 ? 'Mot de passe incorrect — réessaie.' : 'Ce PDF est protégé par un mot de passe.');
          if (pw == null) throw new Error('PDF protégé par mot de passe');
          return await openDoc(bytes, pw);
        }
        throw err;
      }
    }

    function askPassword(msg) {
      return new Promise(res => {
        showLoad();
        loadEl.innerHTML = `
          <form class="dpdfv-pw" data-pw>
            <div class="dpdfv-pw-ico">${ico('key', 'ico--sm')}</div>
            <div class="dpdfv-pw-txt">${escAttr(msg)}</div>
            <input class="input dpdfv-pw-in" type="password" placeholder="Mot de passe" autocomplete="off">
            <div class="dpdfv-pw-acts">
              <button type="button" class="dbtn" data-pw-cancel>Annuler</button>
              <button type="submit" class="dbtn dbtn-accent">Ouvrir</button>
            </div>
          </form>`;
        const form = loadEl.querySelector('[data-pw]');
        const input = form.querySelector('input');
        setTimeout(() => { try { input.focus(); } catch {} }, 60);
        form.addEventListener('submit', e => { e.preventDefault(); res(input.value || null); });
        form.querySelector('[data-pw-cancel]').onclick = () => res(null);
      });
    }

    async function start() {
      showLoad('Chargement du lecteur PDF…');
      pdfjs = await loadPdfJs();
      if (destroyed) return;
      if (!opts.blob) throw new Error('Contenu du PDF indisponible');

      const bytes = new Uint8Array(await opts.blob.arrayBuffer());
      if (destroyed) return;

      showLoad('Ouverture du document…');
      pdf = await openDoc(bytes, null);
      if (destroyed) return;

      numPages = pdf.numPages || 0;
      if (!numPages) throw new Error('Document vide');
      const first = await pdf.getPage(1);
      if (destroyed) return;
      const vp = first.getViewport({ scale: 1, rotation: first.rotate });
      pageW0 = baseW = Math.max(40, vp.width);
      pageH0 = baseH = Math.max(40, vp.height);

      buildPages();
      scale = clamp(fitScale(), MIN_SCALE, MAX_SCALE);
      layout();
      syncBar();
      hideLoad();

      for (let i = 0; i < Math.min(3, numPages); i++) { visible.add(i); pending.add(i); }
      pump();
      hint();
      if (typeof opts.onReady === 'function') { try { opts.onReady({ numPages, scale }); } catch {} }
    }

    /* ── branchements ── */
    scrollEl.addEventListener('scroll', onScroll, { passive: true });
    /* Redimensionnement réel de la zone de lecture (menu latéral, clavier
       mobile, en-tête du fichier qui s'efface…) : le seul 'resize' de la
       fenêtre ne le voit pas. Sans changement d'échelle, applyScale(force)
       ne re-dessine rien — le rappel initial de l'observateur ne coûte donc
       rien, et il recadre utilement un conteneur monté sans taille. */
    if (W.ResizeObserver) {
      ro = new W.ResizeObserver(() => refitLater());
      try { ro.observe(root); } catch {}
    }
    onWin('resize', refitLater, { passive: true });
    onWin('orientationchange', refitLater, { passive: true });
    onWin('fullscreenchange', onFsChange);
    onWin('webkitfullscreenchange', onFsChange);
    syncMaxBtn();

    start().catch(err => {
      if (destroyed) return;
      console.warn('[DrivePdf]', err);
      const m = String((err && err.message) || '');
      fallback(/mot de passe/i.test(m) ? m : 'Aperçu simplifié (le lecteur complet n’a pas pu démarrer)');
    });

    return {
      el: root,
      destroy() {
        if (destroyed) return;
        destroyed = true;
        teardown();
        if (pdf) { try { pdf.destroy(); } catch {} pdf = null; }
        host.innerHTML = '';
      },
      setFit, zoom: zoomBy, rotate: rotateBy, goToPage, toggleMax, refit: refitLater,
      get scale() { return scale; },
      get fit() { return fit; },
      get numPages() { return numPages; },
      get page() { return current + 1; },
      /* état brut, pour les tests hors-ligne */
      _state: () => ({ scale, fit, rotation, numPages, current, pages: pages.length, token, offsets: offsets.slice() })
    };
  }

  W.DrivePdf = { mount, loadPdfJs, supported, VERSION: PDFJS_VER };
})();
