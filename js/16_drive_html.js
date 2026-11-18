/*16_drive_html.js*/
/* ══════════════════════════════════════════════════════════════
   DRIVE HTML — pages HTML interactives du Drive (QCM, fiches…)

   • Rendu : la page est injectée dans une iframe « bac à sable »
     (`sandbox="allow-scripts allow-modals"`) qui grandit avec le
     contenu — comme un PDF ou une image dans le lecteur du Drive.
   • Le code source n'est jamais téléchargeable depuis l'interface :
     le seul téléchargement proposé est le PDF **figé** (état courant
     figé, scripts retirés).
   • Export PDF : capture raster (html2canvas-pro + jsPDF, vendor/)
     → téléchargement direct ; repli automatique sur la fenêtre
     d'impression (« Enregistrer au format PDF ») en cas de souci.
   ══════════════════════════════════════════════════════════════ */
const DriveHtml = (() => {
  'use strict';

  const W = window, D = document;
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');

  /* ── Script injecté dans chaque page (bac à sable) ───────────
     1) localStorage/sessionStorage de secours (l'iframe opaque y
        n'a pas accès : sans shim, un QCM qui enregistre ses réponses
        planterait) ;
     2) hauteur du document → parent (iframe auto-grandissante) ;
     3) gel : à la demande du parent, fige l'état des formulaires et
        renvoie une copie statique (sans scripts ni gestionnaires). */
  const GUEST_JS = String.raw`(function () {
  'use strict';
  var W = window;

  /* 1) stockage de secours */
  try {
    W.localStorage.setItem('__pv', '1');
    W.localStorage.removeItem('__pv');
  } catch (e) {
    var mkStore = function () {
      var mem = {};
      return {
        getItem: function (k) { k = String(k); return Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null; },
        setItem: function (k, v) { mem[String(k)] = String(v); },
        removeItem: function (k) { delete mem[String(k)]; },
        clear: function () { mem = {}; },
        key: function (i) { var ks = Object.keys(mem); return i < ks.length ? ks[i] : null; },
        get length() { return Object.keys(mem).length; }
      };
    };
    try { Object.defineProperty(W, 'localStorage', { value: mkStore(), configurable: true }); } catch (e2) {}
    try { Object.defineProperty(W, 'sessionStorage', { value: mkStore(), configurable: true }); } catch (e2) {}
  }

  /* 2) hauteur du document → parent */
  function docHeight() {
    var d = document, el = d.documentElement, b = d.body;
    var h = el ? Math.max(el.scrollHeight, el.offsetHeight) : 0;
    if (b) h = Math.max(h, b.scrollHeight, b.offsetHeight);
    return h;
  }
  function postHeight() {
    try {
      if (W.parent === W) return;
      W.parent.postMessage({ pvHtml: 'height', h: docHeight() }, '*');
    } catch (e) {}
  }
  W.addEventListener('load', postHeight);
  if (W.ResizeObserver && document.documentElement) {
    try { new W.ResizeObserver(postHeight).observe(document.documentElement); } catch (e) { W.setInterval(postHeight, 1200); }
  } else {
    W.setInterval(postHeight, 1200);
  }

  /* liens internes (#ancre) : avec <base>, un simple href="#…" tenterait
     de charger le dossier — on fait défiler dans la page à la place */
  document.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest('a[href^="#"]') : null;
    if (!a) return;
    ev.preventDefault();
    var id = (a.getAttribute('href') || '').slice(1);
    var t = id ? document.getElementById(id) : null;
    if (t && t.scrollIntoView) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* 3) gel de la page pour l'export PDF */
  function syncForms() {
    var i, j, els = document.querySelectorAll('input');
    for (i = 0; i < els.length; i++) {
      var el = els[i];
      var t = (el.type || '').toLowerCase();
      if (t === 'checkbox' || t === 'radio') {
        if (el.checked) el.setAttribute('checked', ''); else el.removeAttribute('checked');
      } else if (t !== 'file') {
        el.setAttribute('value', el.value);
      }
    }
    els = document.querySelectorAll('textarea');
    for (i = 0; i < els.length; i++) els[i].textContent = els[i].value;
    els = document.querySelectorAll('select');
    for (i = 0; i < els.length; i++) {
      var opts = els[i].options;
      for (j = 0; j < opts.length; j++) {
        if (opts[j].selected) opts[j].setAttribute('selected', ''); else opts[j].removeAttribute('selected');
      }
    }
  }
  function freezeClone() {
    syncForms();
    var clone = document.documentElement.cloneNode(true);
    var i, k;
    var scripts = clone.querySelectorAll('script');
    for (i = 0; i < scripts.length; i++) {
      if (scripts[i].parentNode) scripts[i].parentNode.removeChild(scripts[i]);
    }
    var metas = clone.querySelectorAll('meta[http-equiv]');
    for (i = 0; i < metas.length; i++) {
      if (/^refresh$/i.test(metas[i].getAttribute('http-equiv') || '')) {
        if (metas[i].parentNode) metas[i].parentNode.removeChild(metas[i]);
      }
    }
    var all = clone.querySelectorAll('*');
    for (i = 0; i < all.length; i++) {
      var n = all[i];
      var attrs = Array.prototype.slice.call(n.attributes || []);
      for (k = 0; k < attrs.length; k++) {
        var a = attrs[k];
        if (/^on/i.test(a.name) || /^\s*javascript:/i.test(a.value)) n.removeAttribute(a.name);
      }
    }
    return '<!DOCTYPE html>' + clone.outerHTML;
  }
  W.addEventListener('message', function (ev) {
    var d = ev && ev.data;
    if (!d || d.pvHtml !== 'freeze') return;
    var out = null, err = null;
    try { out = freezeClone(); } catch (e) { err = String((e && e.message) || e); }
    try { W.parent.postMessage({ pvHtml: 'frozen', html: out, error: err }, '*'); } catch (e) {}
  });
})();`;

  /* Peau douce (écran) + impression — injectées EN TÊTE du document,
     avant les styles de l'auteur : en cas de conflit, l'auteur gagne. */
  const SKIN_CSS = [
    'html{ -webkit-text-size-adjust:100%; }',
    'img,video,iframe,svg{ max-width:100%; }'
  ].join('');

  const PRINT_CSS = [
    '@page{ margin:12mm; }',
    '@media print{',
    '  *{ animation:none !important; transition:none !important; }',
    '  .pv-no-print{ display:none !important; }',
    '}'
  ].join('');

  const isAbsUrl = u => /^(?:[a-z][a-z0-9+.\-]*:|\/\/|#|\?)/i.test(String(u == null ? '' : u).trim());

  /* ── Construction du document affiché ─────────────────────────
     Parse le HTML source, résout les ressources relatives (fichiers
     du Drive, images du site), injecte <base>, la peau, l'impression
     et le script hôte, puis renvoie la chaîne finale. */
  async function buildDoc(text, opts) {
    opts = opts || {};
    const src = String(text == null ? '' : text);
    const looksFull = /^\s*(?:<!doctype|<html[\s>]|<head[\s>]|<body[\s>])/i.test(src);
    const doc = new DOMParser().parseFromString(
      looksFull ? src : '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>' + src + '</body></html>',
      'text/html'
    );

    const root = doc.documentElement;
    let head = doc.head;
    if (!head) { head = doc.createElement('head'); root.insertBefore(head, root.firstChild); }

    if (!head.querySelector('meta[charset]')) {
      const meta = doc.createElement('meta');
      meta.setAttribute('charset', 'utf-8');
      head.insertBefore(meta, head.firstChild);
    }
    if (opts.name) {
      let t = head.querySelector('title');
      if (!t) { t = doc.createElement('title'); head.insertBefore(t, head.firstChild.nextSibling || head.firstChild); }
      t.textContent = String(opts.name).replace(/\.html?\.txt$/i, '').replace(/\.html?$/i, '');
    }
    if (opts.baseHref && !head.querySelector('base')) {
      const b = doc.createElement('base');
      b.setAttribute('href', String(opts.baseHref));
      head.insertBefore(b, head.firstChild.nextSibling || head.firstChild);
    }

    /* ressources relatives → URLs résolues (fichiers du Drive, images) */
    if (typeof opts.resolveUrl === 'function') {
      const nodes = doc.querySelectorAll('img[src],script[src],link[href],source[src],video[src],video[poster],audio[src],input[src],iframe[src]');
      for (const el of nodes) {
        const attr = el.hasAttribute('src') ? 'src' : el.hasAttribute('poster') ? 'poster' : 'href';
        const v = el.getAttribute(attr);
        if (!v || isAbsUrl(v)) continue;
        try {
          const u = await opts.resolveUrl(v);
          if (u) el.setAttribute(attr, u);
        } catch (e) { /* on garde l'URL d'origine */ }
      }
    }

    /* injections AVANT le contenu de l'auteur (priorité cascade à l'auteur) */
    const skin = doc.createElement('style');
    skin.textContent = SKIN_CSS;
    const prn = doc.createElement('style');
    prn.textContent = PRINT_CSS;
    const js = doc.createElement('script');
    js.textContent = GUEST_JS;
    const anchor = head.firstChild;
    head.insertBefore(js, anchor);
    head.insertBefore(prn, anchor);
    head.insertBefore(skin, anchor);

    return '<!DOCTYPE html>' + root.outerHTML;
  }

  /* Version statique de secours : mêmes retraits de sécurité, sans
     passer par la page vivante (scripts, gestionnaires, javascript:). */
  function freezeStatic(html) {
    const doc = new DOMParser().parseFromString(String(html || ''), 'text/html');
    doc.querySelectorAll('script').forEach(s => s.remove());
    doc.querySelectorAll('meta[http-equiv]').forEach(m => {
      if (/^refresh$/i.test(m.getAttribute('http-equiv') || '')) m.remove();
    });
    doc.querySelectorAll('*').forEach(n => {
      Array.prototype.slice.call(n.attributes || []).forEach(a => {
        if (/^on/i.test(a.name) || /^\s*javascript:/i.test(a.value)) n.removeAttribute(a.name);
      });
    });
    return '<!DOCTYPE html>' + doc.documentElement.outerHTML;
  }

  /* ── Écoute globale (hauteur + gel) ─────────────────────────── */
  let liveFrame = null;          // iframe de lecture courante
  let pendingFreeze = null;      // { resolve, reject } en attente du gel
  W.addEventListener('message', ev => {
    if (!ev || !ev.source) return;
    const d = ev.data;
    if (!d || typeof d !== 'object') return;
    if (d.pvHtml === 'height' && liveFrame && ev.source === liveFrame.contentWindow && typeof d.h === 'number' && d.h > 0) {
      liveFrame.style.height = Math.min(Math.max(Math.round(d.h) + 8, 240), 200000) + 'px';
    }
    if (d.pvHtml === 'frozen' && pendingFreeze && liveFrame && ev.source === liveFrame.contentWindow) {
      const p = pendingFreeze;
      pendingFreeze = null;
      if (d.html) p.resolve(d.html);
      else p.reject(new Error(d.error || 'Gel de la page impossible'));
    }
  });

  /* ── Montage dans le lecteur de fichier ─────────────────────── */
  function mount(opts) {
    const host = opts.host;
    if (!host) return null;
    host.innerHTML = '';
    const wrap = D.createElement('div');
    wrap.className = 'dhtml-wrap';
    const fr = D.createElement('iframe');
    fr.className = 'dhtml-frame';
    fr.setAttribute('sandbox', 'allow-scripts allow-modals');
    fr.setAttribute('title', opts.name || 'Page interactive');
    fr.style.height = '70vh';
    wrap.appendChild(fr);
    host.appendChild(wrap);

    const handle = {
      nodeId: opts.nodeId || null,
      frame: fr,
      html: null,
      ready: null,
      destroy() {
        if (liveFrame === fr) liveFrame = null;
        if (pendingFreeze) { pendingFreeze.reject(new Error('Vue quittée')); pendingFreeze = null; }
      }
    };

    handle.ready = buildDoc(opts.text, opts).then(html => {
      handle.html = html;
      liveFrame = fr;
      fr.srcdoc = html;
      return html;
    }).catch(e => {
      handle.error = e;
      host.innerHTML = `<div class="derror">⚠️ Impossible d'afficher cette page.<br><small>${esc(e.message || e)}</small></div>`;
      return null;
    });

    return handle;
  }

  /* ── Gel (état courant figé) ────────────────────────────────── */
  function freezeLive(timeoutMs) {
    return new Promise((resolve, reject) => {
      if (!liveFrame || !liveFrame.contentWindow) return reject(new Error('Page non chargée'));
      if (pendingFreeze) return reject(new Error('Gel déjà en cours'));
      const to = setTimeout(() => {
        if (pendingFreeze) { pendingFreeze = null; reject(new Error('Délai de gel dépassé')); }
      }, timeoutMs || 2500);
      pendingFreeze = {
        resolve: v => { clearTimeout(to); resolve(v); },
        reject: e => { clearTimeout(to); reject(e); }
      };
      try {
        liveFrame.contentWindow.postMessage({ pvHtml: 'freeze' }, '*');
      } catch (e) {
        pendingFreeze = null;
        clearTimeout(to);
        reject(e);
      }
    });
  }

  /* ── Export PDF figé ───────────────────────────────────────── */
  const PAGE_W_PX = 794;        // largeur A4 à 96 dpi (mise en page ≈ papier)

  function vendorUrl(p) {
    try { return new URL(p, location.href).href; } catch { return p; }
  }

  function injectScript(w, url, timeoutMs) {
    return new Promise((res, rej) => {
      const s = w.document.createElement('script');
      s.src = url;
      s.onload = () => res();
      s.onerror = () => rej(new Error('Chargement impossible : ' + url.split('/').pop()));
      (w.document.head || w.document.documentElement).appendChild(s);
      setTimeout(() => rej(new Error('Délai dépassé : ' + url.split('/').pop())), timeoutMs || 15000);
    });
  }

  function whenReady(w, timeoutMs) {
    return new Promise(res => {
      let done = false;
      const fin = () => { if (!done) { done = true; res(); } };
      setTimeout(fin, timeoutMs || 2500);
      try {
        const imgs = Array.prototype.slice.call(w.document.images || []);
        const pend = imgs.filter(im => !im.complete);
        if (!pend.length) return setTimeout(fin, 120);
        let left = pend.length;
        pend.forEach(im => {
          const tick = () => { if (--left <= 0) fin(); };
          im.addEventListener('load', tick);
          im.addEventListener('error', tick);
        });
      } catch (e) { return setTimeout(fin, 120); }
      try {
        if (w.document.fonts && w.document.fonts.ready) {
          w.document.fonts.ready.then(() => setTimeout(fin, 60)).catch(() => {});
        }
      } catch (e) {}
    });
  }

  function downloadBlob(blob, filename) {
    const u = URL.createObjectURL(blob);
    const a = D.createElement('a');
    a.href = u;
    a.download = filename;
    a.rel = 'noopener';
    D.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(u), 8000);
  }

  /* Capture raster → PDF A4 paginé, téléchargement direct */
  async function rasterToPdf(w) {
    const h2c = w.html2canvas;
    const jsPDFCtor = (w.jspdf && w.jspdf.jsPDF) || w.jsPDF;
    if (!h2c || !jsPDFCtor) throw new Error('Bibliothèques PDF indisponibles');

    const doc = w.document;
    const root = doc.documentElement;
    const capW = Math.max(root.scrollWidth, (doc.body ? doc.body.scrollWidth : 0), PAGE_W_PX);
    const capH = Math.max(root.scrollHeight, (doc.body ? doc.body.scrollHeight : 0), 200);

    let scale = capH > 26000 ? 1 : 2;
    /* limites de canvas des navigateurs (iOS surtout) : sinon repli impression */
    if (capW * scale * capH * scale > 16000000) scale = 1;
    if (capW * scale * capH * scale > 16000000) throw new Error('Document trop long pour un export raster');

    const canvas = await h2c(root, {
      scale,
      backgroundColor: '#ffffff',
      useCORS: true,
      allowTaint: false,
      logging: false,
      windowWidth: PAGE_W_PX,
      windowHeight: capH,
      width: capW,
      height: capH,
      x: 0, y: 0, scrollX: 0, scrollY: 0
    });
    if (!canvas || !canvas.width || !canvas.height) throw new Error('Capture vide');

    const cw = canvas.width, ch = canvas.height;
    const sliceH = Math.round(cw * 297 / 210);          // une page A4
    const pdf = new jsPDFCtor({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
    let y = 0, first = true;
    while (y < ch) {
      const h = Math.min(sliceH, ch - y);
      const page = D.createElement('canvas');
      page.width = cw;
      page.height = h;
      const ctx = page.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, cw, h);
      ctx.drawImage(canvas, 0, y, cw, h, 0, 0, cw, h);
      if (!first) pdf.addPage();
      pdf.addImage(page.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, 210, h * 297 / sliceH, undefined, 'FAST');
      first = false;
      y += h;
    }
    return pdf.output('blob');
  }

  async function exportPdf(opts) {
    opts = opts || {};
    const notify = opts.notify || (() => {});
    const name = String(opts.name || 'document').replace(/\.html?\.txt$/i, '').replace(/\.html?$/i, '') || 'document';

    /* 1) version figée — état courant si la page est ouverte, sinon source */
    let frozen = null;
    if (opts.live !== false && liveFrame && liveFrame.contentWindow) {
      try { frozen = await freezeLive(2500); } catch (e) { console.warn('[DriveHtml] gel', e); }
    }
    if (!frozen) {
      let html = opts.html || null;
      if (!html && opts.text != null) html = await buildDoc(opts.text, opts);
      if (!html) throw new Error('Contenu indisponible');
      frozen = freezeStatic(html);
    }

    /* 2) iframe hors écran, mise en page papier (794 px ≈ A4) */
    const fr = D.createElement('iframe');
    fr.className = 'dprint-frame';
    fr.setAttribute('title', 'Export PDF — ' + name);
    fr.setAttribute('aria-hidden', 'true');
    fr.style.cssText = 'position:fixed;left:-20000px;top:0;width:' + PAGE_W_PX + 'px;height:1123px;border:0;';
    D.body.appendChild(fr);
    const cleanup = () => setTimeout(() => { try { fr.remove(); } catch (e) {} }, 60000);

    try {
      await new Promise((res, rej) => {
        let done = false;
        fr.onload = () => { if (!done) { done = true; res(); } };
        fr.srcdoc = frozen;
        setTimeout(() => { if (!done) { done = true; res(); } }, 3000);
      });
      const w = fr.contentWindow;
      if (!w || !w.document) throw new Error('Aperçu indisponible');
      w.document.title = name;                     // nom du PDF proposé
      await whenReady(w);

      try {
        await injectScript(w, vendorUrl('vendor/html2canvas-pro/html2canvas-pro.min.js'));
        await injectScript(w, vendorUrl('vendor/jspdf/jspdf.umd.min.js'));
        const blob = await rasterToPdf(w);
        downloadBlob(blob, name + '.pdf');
        notify('PDF téléchargé (version figée)', 'success');
        cleanup();
      } catch (e) {
        /* repli : fenêtre d'impression du navigateur, destination PDF */
        console.warn('[DriveHtml] export raster', e);
        try {
          w.focus();
          w.print();
          notify('Fenêtre d’impression ouverte → choisis « Enregistrer au format PDF », puis « Enregistrer ».', 'info', 8000);
          cleanup();
        } catch (e2) {
          cleanup();
          throw new Error('Export PDF impossible : ' + ((e && e.message) || e));
        }
      }
    } catch (e) {
      cleanup();
      throw e;
    }
  }

  return { mount, buildDoc, freezeStatic, exportPdf, GUEST_JS, PRINT_CSS };
})();
