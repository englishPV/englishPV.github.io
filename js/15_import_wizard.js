/*15_import_wizard.js*/
/* ══════════════════════════════════════════════════════════════════════
   ASSISTANT D'IMPORT — bouton « Importer » : au choix
      ① un fichier  (.apkg Anki, .csv/.tsv, .json, .pv/.txt)
      ② du texte écrit à la main (JSON « pv-import » ou format « PV-Lignes »)
   Le texte permet de créer des matières, des chapitres et des cartes
   (texte + images) uniquement par écrit.

   Format documenté en détail : `PVImport.docHTML()` (onglet « Format »)
   et dans le README.
   ══════════════════════════════════════════════════════════════════════ */
const PVImport = (() => {
  'use strict';

  const esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const norm = s => String(s == null ? '' : s).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const clean = s => String(s == null ? '' : s).trim();
  const IMG_EXT = 'png|jpe?g|gif|webp|svg|bmp|avif|ico|tiff?';
  const IMG_RE = new RegExp('\\.(' + IMG_EXT + ')$', 'i');
  const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

  /* ── Références d'image reconnues dans un champ texte ────────────────
     img://nom        → une image déjà importée dans l'appli (onglet Images)
     drive://nom      → un fichier de « Mon Drive » (Google Drive personnel)
     https://…        → une image en ligne (URL directe)
     data:image/…     → une image encodée en base64, collée dans le texte  */
  function refKind(src) {
    const s = clean(src);
    if (/^img:\/\//i.test(s)) return 'media';
    if (/^drive:\/\//i.test(s)) return 'drive';
    if (/^https?:\/\//i.test(s)) return 'url';
    if (/^data:image\//i.test(s)) return 'data';
    if (IMG_RE.test(s)) return 'name';            // nom de fichier → image importée si elle existe
    return 'unknown';
  }
  const refName = src => clean(src).replace(/^(img|drive):\/\//i, '');

  /* Trouve une image importée par nom (clé, nom complet, sans extension, slug) */
  function findMedia(name) {
    const idx = data.mediaIndex || {};
    const want = norm(name);
    const wantBase = norm(String(name).replace(new RegExp('\\.(' + IMG_EXT + ')$', 'i'), ''));
    for (const k of Object.keys(idx)) {
      const meta = idx[k] || {};
      const nm = norm(meta.name || k);
      const key = norm(k);
      const base = norm(String(k).split('/').pop().replace(new RegExp('\\.(' + IMG_EXT + ')$', 'i'), ''));
      const baseName = norm(String(meta.name || '').replace(new RegExp('\\.(' + IMG_EXT + ')$', 'i'), ''));
      if (nm === want || key === want || base === wantBase || baseName === wantBase) return { key: k, meta };
    }
    return null;
  }

  /* ── Texte écrit → HTML d'une face de carte ──────────────────────── */
  function fieldToHTML(raw, report) {
    let t = esc(String(raw == null ? '' : raw));
    const markup = (alt, src) => `![${alt}](${src})`;        // écriture d'origine, affichée telle quelle si non résolue
    const put = (alt, src) => {
      const kind = refKind(src);
      const name = refName(src);
      if (report) report.images.push({ src: clean(src), kind, name });
      if (kind === 'media' || kind === 'name') {
        const m = findMedia(name);
        if (m) { if (report) report.images[report.images.length - 1].key = m.key; return `<img src="media://${m.key}" alt="${alt}">`; }
        if (report) report.missing.push(name);
        return markup(alt, src);
      }
      if (kind === 'drive') {
        if (typeof PDrive === 'undefined' || !PDrive.canUse()) { if (report) report.missing.push(name); return markup(alt, src); }
        return `<img src="${src}" data-drive="${esc(name)}" alt="${alt}">`;
      }
      if (kind === 'url' || kind === 'data') return `<img src="${src}" alt="${alt}">`;
      if (report) report.missing.push(name);
      return markup(alt, src);
    };
    /* ![alt](source) */
    t = t.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (x, alt, src) => put(alt, src));
    /* {img: source}  ou  {image: source} */
    t = t.replace(/\{\s*(?:img|image)\s*:\s*([^}]+?)\s*\}/gi, (x, src) => put('', src));
    /* retours à la ligne */
    return t.split(/\r?\n/).map(l => l.trim()).filter(Boolean).join('<br>');
  }

  const inlineImage = (src, report) => src ? fieldToHTML('![image](' + src + ')', report) : '';

  /* ══════════════ ② FORMAT « PV-LIGNES » (texte simple) ══════════════
     # commentaire            (ou //)
     @matiere Anglais
     @chapitre Verbes irréguliers {emoji: 💂, date: 2026-12-31}
     recto | verso            (une carte par ligne)
     @fin                     (ferme la matière courante)
  */
  function parseLines(text, out) {
    let subject = null, chapter = null;
    const lines = String(text).split(/\r?\n/);
    lines.forEach((line, i) => {
      const n = i + 1;
      const raw = line.trim();
      if (!raw || raw.startsWith('#') || raw.startsWith('//')) return;

      const dir = raw.match(/^@(\S+)\s*(.*)$/);
      if (dir) {
        const key = norm(dir[1]), rest = dir[2].trim();
        if (key === 'matiere' || key === 'matière' || key === 'subject') {
          if (!rest) return out.errors.push(`Ligne ${n} : il manque le nom de la matière après @matiere.`);
          subject = out.plan.find(p => norm(p.nom) === norm(rest));
          if (!subject) { subject = { nom: rest, chapters: [] }; out.plan.push(subject); }
          chapter = null;
          return;
        }
        if (key === 'chapitre' || key === 'chapter') {
          if (!subject) { subject = { nom: 'Import', chapters: [] }; out.plan.push(subject); out.warnings.push(`Ligne ${n} : aucune matière déclarée, les cartes vont dans « Import ».`); }
          let title = rest, emoji = '', date = '';
          const opt = rest.match(/\{\s*(.*?)\s*\}\s*$/);
          if (opt) {
            title = rest.slice(0, opt.index).trim();
            opt[1].split(',').forEach(kv => {
              const m = kv.match(/^\s*(emoji|date|datelimite|dateLimite|échéance|echeance)\s*:\s*(.+?)\s*$/);
              if (!m) return;
              const k = norm(m[1]);
              if (k === 'emoji') emoji = m[2];
              else date = m[2];
            });
          }
          if (!title) return out.errors.push(`Ligne ${n} : il manque le titre du chapitre après @chapitre.`);
          if (date && !DATE_RE.test(date)) { out.warnings.push(`Ligne ${n} : date « ${date} » ignorée (format attendu AAAA-MM-JJ).`); date = ''; }
          chapter = { titre: title, emoji, dateLimite: date, cartes: [] };
          subject.chapters.push(chapter);
          return;
        }
        if (key === 'fin' || key === 'end') { chapter = null; subject = null; return; }
        if (key === 'format' || key === 'version') return;             // en-tête toléré
        return out.errors.push(`Ligne ${n} : directive inconnue @${dir[1]}.`);
      }

      if (!subject) { subject = { nom: 'Import', chapters: [] }; out.plan.push(subject); }
      if (!chapter) { chapter = { titre: 'Cartes importées', emoji: '', dateLimite: '', cartes: [] }; subject.chapters.push(chapter); }

      const parts = raw.split(/(?<!\\)\|/);
      if (parts.length < 2) return out.errors.push(`Ligne ${n} : sépare le recto et le verso par « | ».`);
      const recto = parts[0].replace(/\\\|/g, '|').trim();
      const verso = parts.slice(1).join('|').replace(/\\\|/g, '|').trim();
      if (!recto) return out.errors.push(`Ligne ${n} : recto vide.`);
      chapter.cartes.push({ recto, verso });
    });
    return out;
  }

  /* ══════════════ ① BESOIN JSON « pv-import » ══════════════ */
  const pick = (o, ...keys) => { for (const k of keys) if (o && o[k] !== undefined && o[k] !== null) return o[k]; return undefined; };

  function chapterFromJSON(obj, out, where) {
    if (typeof obj === 'string') obj = { titre: obj, cartes: [] };
    const titre = clean(pick(obj, 'titre', 'title', 'nom', 'name'));
    if (!titre) { out.errors.push(`Chapitre sans titre (${where}).`); return null; }
    const date = clean(pick(obj, 'dateLimite', 'date', 'deadline', 'echeance', 'échéance'));
    if (date && !DATE_RE.test(date)) { out.warnings.push(`Chapitre « ${titre} » : date « ${date} » ignorée (AAAA-MM-JJ attendu).`); }
    const ch = {
      titre,
      emoji: clean(pick(obj, 'emoji', 'icone', 'icône')),
      dateLimite: date && DATE_RE.test(date) ? date : '',
      cartes: []
    };
    let cards = pick(obj, 'cartes', 'cards', 'card', 'carte');
    if (typeof cards === 'string') cards = cards.split(/\r?\n/).filter(Boolean);
    if (!Array.isArray(cards)) cards = [];
    cards.forEach((c, i) => {
      if (typeof c === 'string') {
        const parts = c.split(/(?<!\\)\|/);
        if (parts.length < 2) { out.errors.push(`« ${titre} » carte ${i + 1} : utilise « recto | verso ».`); return; }
        ch.cartes.push({ recto: parts[0].trim(), verso: parts.slice(1).join('|').trim() });
        return;
      }
      if (Array.isArray(c)) {                        // ["recto", "verso"]
        ch.cartes.push({ recto: clean(c[0]), verso: clean(c[1]) });
        return;
      }
      if (!c || typeof c !== 'object') { out.errors.push(`« ${titre} » carte ${i + 1} : format illisible.`); return; }
      const recto = pick(c, 'recto', 'front', 'face', 'question', 'terme');
      const verso = pick(c, 'verso', 'back', 'reponse', 'réponse', 'definition', 'définition');
      if (recto === undefined && verso === undefined) { out.errors.push(`« ${titre} » carte ${i + 1} : il faut au moins « recto » et « verso ».`); return; }
      ch.cartes.push({
        recto: clean(recto),
        verso: clean(verso),
        imageRecto: clean(pick(c, 'imageRecto', 'rectoImage', 'image', 'img', 'illustration')),
        imageVerso: clean(pick(c, 'imageVerso', 'versoImage', 'imageArriere'))
      });
    });
    if (!ch.cartes.length) out.warnings.push(`Chapitre « ${titre} » : aucune carte.`);
    return ch;
  }

  function subjectFromJSON(obj, out, where) {
    if (typeof obj === 'string') obj = { nom: obj };
    const nom = clean(pick(obj, 'nom', 'name', 'matiere', 'matière', 'subject', 'title', 'titre'));
    let chapters = pick(obj, 'chapitres', 'chapters', 'chapter');
    if (!Array.isArray(chapters)) chapters = chapters ? [chapters] : [];
    if (!nom) { out.errors.push(`Matière sans nom (${where}).`); return null; }
    const sub = { nom, chapters: [] };
    chapters.forEach((ch, i) => { const c = chapterFromJSON(ch, out, nom + ' chapitre ' + (i + 1)); if (c) sub.chapters.push(c); });
    return sub;
  }

  /* Accepte :
     • { format:'pv-import', version:1, matieres:[…] }
     • { matiere:'Anglais', chapitres:[…] }
     • [{ front, back, chapter }]           (format historique)
     • { subject:'Anglais', cards:[…] }     (format historique)               */
  function parseJSON(obj, out) {
    if (Array.isArray(obj)) {
      const byChapter = {};
      obj.forEach(r => {
        if (!r || typeof r !== 'object') return;
        const cn = clean(pick(r, 'chapter', 'chapitre', 'matiere', 'matière') || 'Général') || 'Général';
        (byChapter[cn] = byChapter[cn] || []).push({
          recto: clean(pick(r, 'front', 'recto', 'question', 'terme')),
          verso: clean(pick(r, 'back', 'verso', 'reponse', 'réponse', 'definition', 'définition'))
        });
      });
      const chapters = Object.keys(byChapter).map(t => ({ titre: t, cartes: byChapter[t] }));
      out.plan.push({ nom: clean(pick(obj[0] || {}, 'matiere', 'matière') || 'Import') , chapters });
      return out;
    }
    if (!obj || typeof obj !== 'object') { out.errors.push('Le JSON doit être un objet { … } ou une liste [ … ].'); return out; }

    const list = pick(obj, 'matieres', 'matières', 'subjects');
    if (Array.isArray(list)) {
      list.forEach((s, i) => { const sub = subjectFromJSON(s, out, 'matière ' + (i + 1)); if (sub) out.plan.push(sub); });
      return out;
    }
    if (obj.cards && !obj.chapitres && !obj.chapters) obj.chapitres = [{ titre: 'Cartes importées', cartes: obj.cards }];
    const sub = subjectFromJSON(obj, out, 'racine');
    if (sub) out.plan.push(sub);
    return out;
  }

  /* ── Analyse : texte quelconque → plan + rapport ─────────────────── */
  const emptyStats = () => ({ subjects: 0, chapters: 0, cards: 0, images: 0 });

  function parse(text) {
    const out = { plan: [], errors: [], warnings: [], images: [], missing: [], stats: emptyStats(), kind: 'json', ok: false };
    const raw = String(text || '').trim();
    if (!raw) { out.errors.push('Rien à importer : colle du texte ou choisis un fichier.'); return out; }

    if (raw[0] === '{' || raw[0] === '[') {
      let obj;
      try { obj = JSON.parse(raw.replace(/^\uFEFF/, '')); }
      catch (e) { out.errors.push('JSON invalide : ' + e.message.replace(/^JSON\.parse: /, '')); return out; }
      parseJSON(obj, out);
    } else {
      out.kind = 'lines';
      parseLines(raw, out);
    }

    /* conversion des faces + collecte des images */
    const imgReport = { images: [], missing: [] };
    out.plan.forEach(sub => sub.chapters.forEach(ch => ch.cartes.forEach(c => {
      c.rectoHTML = fieldToHTML(c.recto, imgReport);
      c.versoHTML = fieldToHTML(c.verso, imgReport);
      if (c.imageRecto) c.rectoHTML = (c.rectoHTML ? c.rectoHTML + '<br>' : '') + inlineImage(c.imageRecto, imgReport);
      if (c.imageVerso) c.versoHTML = (c.versoHTML ? c.versoHTML + '<br>' : '') + inlineImage(c.imageVerso, imgReport);
    })));
    out.images = imgReport.images.filter(x => x.kind !== 'unknown');
    out.missing = [...new Set(imgReport.missing)];

    out.plan = out.plan.filter(s => s.chapters.length);
    out.stats = {
      subjects: out.plan.length,
      chapters: out.plan.reduce((n, s) => n + s.chapters.length, 0),
      cards: out.plan.reduce((n, s) => n + s.chapters.reduce((m, c) => m + c.cartes.length, 0), 0),
      images: out.images.length
    };
    out.ok = !out.errors.length && out.stats.cards > 0;
    if (!out.ok && !out.errors.length) out.errors.push('Aucune carte trouvée.');
    return out;
  }

  /* ── Application du plan dans l'application ──────────────────────── */
  const normHTML = h => String(h || '').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();

  async function resolveDriveImages(plan, rep) {
    if (typeof PDrive === 'undefined' || !PDrive.canUse()) return;
    const names = new Set();
    plan.forEach(s => s.chapters.forEach(ch => ch.cartes.forEach(c => {
      ['recto', 'verso', 'imageRecto', 'imageVerso'].forEach(k => {
        const found = String(c[k] || '').match(/drive:\/\/([^)\s}]+)/gi) || [];
        found.forEach(tok => names.add(tok.replace(/^drive:\/\//i, '')));
      });
    })));
    if (!names.size) return;

    /* téléchargement une seule fois par nom, puis réécriture des références */
    const map = new Map();
    for (const name of names) {
      try {
        const got = await PDrive.useAsMedia(name);              // → { key, url }
        if (got && got.key) { map.set(name.toLowerCase(), got.key); rep.media.push({ name, key: got.key }); }
        else rep.errors.push(`« ${name} » introuvable dans Mon Drive.`);
      } catch (e) { rep.errors.push(`« ${name} » introuvable dans Mon Drive (${e.message || e}).`); }
    }
    if (!map.size) return;

    plan.forEach(s => s.chapters.forEach(ch => ch.cartes.forEach(c => {
      let touched = false;
      ['recto', 'verso', 'imageRecto', 'imageVerso'].forEach(k => {
        const v = String(c[k] || '');
        if (!/drive:\/\//i.test(v)) return;
        touched = true;
        c[k] = v.replace(/drive:\/\/([^)\s}]+)/gi, (tok, nm) => {
          const key = map.get(String(nm).toLowerCase());
          return key ? 'img://' + key : tok;
        });
      });
      if (touched) {
        const rep2 = { images: [], missing: [] };
        c.rectoHTML = fieldToHTML(c.recto, rep2);
        c.versoHTML = fieldToHTML(c.verso, rep2);
        if (c.imageRecto) c.rectoHTML = (c.rectoHTML ? c.rectoHTML + '<br>' : '') + inlineImage(c.imageRecto, rep2);
        if (c.imageVerso) c.versoHTML = (c.versoHTML ? c.versoHTML + '<br>' : '') + inlineImage(c.imageVerso, rep2);
      }
    })));
  }

  async function apply(plan, opts = {}) {
    const rep = { subjectsNew: [], subjectsUsed: [], chaptersNew: [], chaptersUsed: [], cards: 0, dupes: 0, media: [], missing: [], errors: [], newSubjectIds: [] };
    const skipDupes = opts.skipDuplicates !== false;
    await resolveDriveImages(plan, rep);

    plan.forEach(p => {
      let sub = data.subjects.find(s => norm(s.title) === norm(p.nom));
      if (!sub) {
        sub = { id: 'imp-' + (typeof slugify === 'function' ? slugify(p.nom) : norm(p.nom).replace(/\s+/g, '-')) + '-' + Date.now(), title: p.nom, chapters: [], groups: [], imported: true };
        data.subjects.push(sub);
        rep.subjectsNew.push(p.nom); rep.newSubjectIds.push(sub.id);
      } else rep.subjectsUsed.push(p.nom);

      p.chapters.forEach(ch => {
        let chapter = (sub.chapters || []).find(c => norm(c.title) === norm(ch.titre));
        if (!chapter) {
          chapter = (typeof mkChapter === 'function')
            ? mkChapter('chap-' + (typeof slugify === 'function' ? slugify(ch.titre) : norm(ch.titre).replace(/\s+/g, '-')) + '-' + Date.now(), ch.titre, [], true)
            : { id: 'chap-' + Date.now(), title: ch.titre, settings: {}, filters: { grades: {} }, stats: { gradeCounts: {} }, cards: [], imported: true };
          sub.chapters.push(chapter);
          rep.chaptersNew.push(p.nom + ' › ' + ch.titre);
        } else rep.chaptersUsed.push(p.nom + ' › ' + ch.titre);
        if (ch.emoji) chapter.emoji = ch.emoji;
        if (ch.dateLimite) chapter.deadline = ch.dateLimite;

        /* index des cartes existantes (doublons) */
        const seen = new Set(chapter.cards.map(c => normHTML(c.front) + '|' + normHTML(c.back)));
        ch.cartes.forEach(card => {
          const front = card.rectoHTML || '', back = card.versoHTML || '';
          if (!front && !back) return;
          const sig = normHTML(front) + '|' + normHTML(back);
          if (skipDupes && seen.has(sig)) { rep.dupes++; return; }
          seen.add(sig);
          const nc = (typeof mkCard === 'function')
            ? mkCard('card-' + Date.now().toString(36) + '-' + M.random().toString(36).slice(2, 7), front, back)
            : { id: 'card-' + Date.now() + '-' + M.floor(M.random() * 1000), front, back, grade: 'unseen', timesReviewed: 0, lastReviewed: 0, lastMs: 0, avgMs: 0, perfEma: .5, ef: 2.5, intervalDays: 0, dueAt: 0, streak: 0, successes: 0, failures: 0 };
          chapter.cards.push(nc);
          rep.cards++;
        });
        if (typeof syncG === 'function') syncG(chapter);
      });
      if (sub.chapters) sub.chapters.forEach(c => { if (!c.settings) c.settings = { sessionSize: 10, dailyGoal: 10, reviewOrder: 'front-first', langSwap: false }; });
    });

    if (rep.cards) {
      if (rep.newSubjectIds.length) data.app.currentSubjectId = rep.newSubjectIds[0];
      if (typeof saveData === 'function') saveData();
    }
    return rep;
  }

  /* Import d'un fichier .json / .pv / .txt → retourne un rapport texte */
  async function importText(text, opts = {}) {
    const res = parse(text);
    if (!res.ok) {
      const e = new Error(res.errors[0] || 'Texte illisible');
      e.errors = res.errors; throw e;
    }
    const rep = await apply(res.plan, opts);
    return { parsed: res, report: rep };
  }

  /* ══════════════════════ EXEMPLES & DOCUMENTATION ══════════════════ */
  const SAMPLE_FULL = `{
  "format": "pv-import",
  "version": 1,
  "matieres": [
    {
      "nom": "Anglais",
      "chapitres": [
        {
          "titre": "Verbes irréguliers",
          "emoji": "💂",
          "dateLimite": "2026-12-31",
          "cartes": [
            { "recto": "porter", "verso": "bear / bore / borne|born" },
            { "recto": "vendre", "verso": "sell / sold / sold" },
            { "recto": "![ours](img://ours.png)", "verso": "a bear" }
          ]
        },
        {
          "titre": "Vocabulaire politique",
          "cartes": [
            { "recto": "an autocrat", "verso": "un autocrate\\ndeep state: l'État profond" }
          ]
        }
      ]
    }
  ]
}`;

  const SAMPLE_SHORT = `{
  "matiere": "Anglais",
  "chapitres": [
    { "titre": "Verbes irréguliers", "emoji": "💂", "cartes": [
        "porter | bear / bore / borne",
        "vendre | sell / sold / sold"
    ] },
    { "titre": "Vocabulaire", "cartes": [
        { "recto": "a bear", "verso": "un ours", "imageVerso": "img://ours.png" }
    ] }
  ]
}`;

  const SAMPLE_LINES = `# Format « PV-Lignes » — une carte par ligne, recto | verso
@matiere Anglais
@chapitre Verbes irréguliers {emoji: 💂, date: 2026-12-31}
porter | bear / bore / borne
vendre | sell / sold / sold
prendre | take / took / taken
@chapitre Vocabulaire politique
![ours](img://ours.png) | a bear
an autocrat | un autocrate

@matiere Maths
@chapitre Intégrales
dérivée de x² | 2x
@fin`;

  const SAMPLES = { full: SAMPLE_FULL, short: SAMPLE_SHORT, lines: SAMPLE_LINES };

  function docHTML() {
    return `
    <div class="pv-doc">
      <p class="pv-doc__lead">Deux écritures possibles dans l'onglet <b>Texte</b> : le <b>JSON « pv-import »</b>
      (précis, idéal à générer) ou le <b>format PV-Lignes</b> (à taper à la main). Les deux créent
      des <b>matières</b>, des <b>chapitres</b> et des <b>cartes</b> — avec du texte et des images.</p>

      <h4>1. Où vont les cartes ?</h4>
      <ul>
        <li>Une <b>matière</b> du même nom existe déjà → elle est réutilisée, sinon créée.</li>
        <li>Un <b>chapitre</b> du même titre existe déjà dans cette matière → les cartes s'y ajoutent, sinon le chapitre est créé.</li>
        <li>Les cartes ne sont jamais modifiées : l'import ne fait qu'ajouter. L'option
            « Ignorer les doublons » évite d'ajouter deux fois la même carte (même recto + même verso).</li>
        <li>Les chapitres ainsi créés sont marqués <b>importés</b> : ils peuvent être supprimés d'un bloc depuis le deck.</li>
      </ul>

      <h4>2. JSON complet (recommandé)</h4>
      <pre class="pv-code">${esc(SAMPLE_FULL)}</pre>
      <p class="pv-doc__note">Champs acceptés — les noms anglais sont aussi valides :</p>
      <table class="pv-table">
        <thead><tr><th>Champ</th><th>Alias</th><th>Rôle</th></tr></thead>
        <tbody>
          <tr><td><code>format</code>, <code>version</code></td><td>—</td><td>facultatifs, purement informatifs.</td></tr>
          <tr><td><code>matieres[]</code></td><td><code>subjects</code></td><td>liste de matières ; sinon <code>matiere</code> + <code>chapitres</code> à la racine.</td></tr>
          <tr><td><code>nom</code></td><td><code>matiere</code>, <code>subject</code>, <code>title</code></td><td>nom de la matière.</td></tr>
          <tr><td><code>chapitres[]</code></td><td><code>chapters</code>, <code>chapter</code></td><td>chapitres de la matière.</td></tr>
          <tr><td><code>titre</code></td><td><code>title</code>, <code>nom</code></td><td>titre du chapitre.</td></tr>
          <tr><td><code>emoji</code></td><td><code>icone</code></td><td>emoji affiché dans le deck.</td></tr>
          <tr><td><code>dateLimite</code></td><td><code>date</code>, <code>deadline</code>, <code>echeance</code></td><td><b>AAAA-MM-JJ</b> ; affiche l'objectif du jour et remonte le chapitre en haut du deck.</td></tr>
          <tr><td><code>cartes[]</code></td><td><code>cards</code>, <code>carte</code></td><td>liste de cartes.</td></tr>
          <tr><td><code>recto</code></td><td><code>front</code>, <code>question</code>, <code>terme</code></td><td>face avant (question).</td></tr>
          <tr><td><code>verso</code></td><td><code>back</code>, <code>reponse</code>, <code>definition</code></td><td>face arrière (réponse).</td></tr>
          <tr><td><code>imageRecto</code></td><td><code>rectoImage</code>, <code>image</code>, <code>img</code></td><td>image ajoutée au recto (voir §4).</td></tr>
          <tr><td><code>imageVerso</code></td><td><code>versoImage</code></td><td>image ajoutée au verso.</td></tr>
        </tbody>
      </table>
      <p class="pv-doc__note">Raccourcis : <code>"recto | verso"</code> (chaîne) ou <code>["recto","verso"]</code> (liste)
      remplacent l'objet de carte. Dans une chaîne, <code>\\n</code> passe à la ligne et <code>\\|</code> écrit un « | » littéral.</p>

      <h4>3. Format PV-Lignes (à taper à la main)</h4>
      <pre class="pv-code">${esc(SAMPLE_LINES)}</pre>
      <ul>
        <li><code>@matiere Nom</code> : ouvre (ou crée) une matière. Sans cette ligne, les cartes vont dans « Import ».</li>
        <li><code>@chapitre Titre {emoji: 💂, date: 2026-12-31}</code> : ouvre (ou crée) un chapitre ; les options entre
            accolades sont facultatives.</li>
        <li><code>recto | verso</code> : une carte. Le recto peut contenir une image (voir §4).</li>
        <li><code>@fin</code> : ferme la matière courante. <code>#</code> ou <code>//</code> en début de ligne : commentaire.</li>
      </ul>

      <h4>4. Images</h4>
      <p>Dans n'importe quel champ texte, quatre écritures sont reconnues :</p>
      <ul>
        <li><code>![légende](img://nom.png)</code> ou <code>{img: img://nom.png}</code> → une image <b>déjà importée</b>
            dans l'appli (onglet <b>Images</b>). Le nom suffit : <code>img://ours</code> trouve <code>ours.png</code>.</li>
        <li><code>![légende](https://exemple.fr/photo.jpg)</code> → une image en ligne.</li>
        <li><code>![légende](data:image/png;base64,…)</code> → une image collée en base64 (petites images).</li>
        <li><code>![légende](drive://nom.png)</code> → un fichier de <b>Mon Drive</b> (Google Drive personnel) :
            il est téléchargé et enregistré dans l'appli à l'import.</li>
      </ul>
      <p class="pv-doc__note">Toute image <b>utilisée par une carte</b> est conservée dans l'appli (IndexedDB) :
      la carte s'affiche même hors connexion.</p>

      <h4>5. Erreurs & rapports</h4>
      <ul>
        <li>Le panneau de gauche affiche en temps réel le nombre de matières, chapitres, cartes et images détectés.</li>
        <li>Les <b>erreurs</b> bloquent l'import (JSON invalide, carte sans verso, ligne sans « | »…) : elles sont listées avec le numéro de ligne.</li>
        <li>Les <b>avertissements</b> n'empêchent pas l'import (date mal formée, image introuvable, chapitre vide).</li>
      </ul>
    </div>`;
  }

  /* ══════════════════════════ INTERFACE ══════════════════════════════ */
  const ROUTES = [
    { re: /\.apkg$/i, label: 'Anki (.apkg)', fn: f => impApkg(f) },
    { re: /\.(csv|tsv)$/i, label: 'Tableau CSV / TSV', fn: f => impDelim(f) },
    { re: /\.(json|pv|txt|text)$/i, label: 'Texte / JSON', fn: (f, o) => f.text().then(t => importText(t, o)) },
    { re: /\.(png|jpe?g|gif|webp|svg|bmp|avif|ico)$/i, label: 'Images', fn: null }
  ];
  const routeOf = name => ROUTES.find(r => r.re.test(name)) || null;

  async function routeFile(file, opts = {}) {
    if (/^image\//i.test(file.type || '') || (routeOf(file.name) || {}).label === 'Images') {
      if (typeof MediaLib === 'undefined') throw new Error('Bibliothèque d\'images indisponible');
      return { kind: 'images', added: await MediaLib.importFiles([file]) };
    }
    const r = routeOf(file.name);
    if (!r || !r.fn) throw new Error('Type de fichier non géré : ' + file.name);
    const out = await r.fn(file, opts);
    return { kind: r.label, out };
  }

  function openWizard(onDone) {
    const overlay = D.createElement('div');
    overlay.className = 'card-editor-overlay pv-wizard-overlay';
    overlay.innerHTML = `<div class="card-editor pv-wizard">
      <div class="card-editor-header">
        <h3>Importer</h3>
        <button class="ce-close-btn" id="pvClose" aria-label="Fermer">${ico('x','ico--sm')}</button>
      </div>
      <div class="pv-tabs">
        <button class="pv-tab active" data-tab="file">${ico('upload','ico--sm')} Fichier</button>
        <button class="pv-tab" data-tab="text">${ico('pencil','ico--sm')} Texte / JSON</button>
        <button class="pv-tab" data-tab="doc">${ico('info','ico--sm')} Format</button>
      </div>
      <div class="card-editor-body pv-body">
        <div class="pv-pane" data-pane="file">
          <div class="pv-drop" id="pvDrop">
            ${ico('package','ico--lg')}
            <div class="pv-drop__t">Dépose un ou plusieurs fichiers ici</div>
            <div class="pv-drop__s">ou <b>clique pour parcourir</b> — Anki (.apkg), CSV / TSV, JSON, .pv / .txt, images</div>
            <input type="file" id="pvFile" multiple class="hidden" accept="*/*">
          </div>
          <div class="pv-log" id="pvLog"></div>
        </div>
        <div class="pv-pane hidden" data-pane="text">
          <div class="pv-text-top">
            <div class="pv-sample">Exemple :
              <button class="btn btn--outline btn--tiny" data-sample="full">JSON complet</button>
              <button class="btn btn--outline btn--tiny" data-sample="short">JSON court</button>
              <button class="btn btn--outline btn--tiny" data-sample="lines">PV-Lignes</button>
            </div>
            <label class="pv-opt"><input type="checkbox" id="pvDupes" checked> Ignorer les doublons</label>
          </div>
          <textarea id="pvText" spellcheck="false" placeholder='Colle ici du JSON { "matiere": "…" } ou du texte PV-Lignes (@matiere / @chapitre / recto | verso)'></textarea>
          <div class="pv-summary" id="pvSummary"></div>
          <div class="pv-errors" id="pvErrors"></div>
        </div>
        <div class="pv-pane hidden pv-pane--doc" data-pane="doc">${docHTML()}</div>
      </div>
      <div class="card-editor-footer">
        <button class="btn btn--ghost" id="pvCancel">Fermer</button>
        <button class="btn btn--solid btn--primary" id="pvRun" disabled>Importer</button>
      </div>
    </div>`;

    D.body.appendChild(overlay);
    const $q = s => overlay.querySelector(s);
    const close = () => { overlay.remove(); if (typeof onDone === 'function') onDone(); };
    $q('#pvClose').onclick = close;
    $q('#pvCancel').onclick = close;
    overlay.onclick = e => { if (e.target === overlay) close(); };

    /* onglets */
    $q('.pv-tabs').onclick = e => {
      const b = e.target.closest('.pv-tab'); if (!b) return;
      overlay.querySelectorAll('.pv-tab').forEach(t => t.classList.toggle('active', t === b));
      overlay.querySelectorAll('.pv-pane').forEach(p => p.classList.toggle('hidden', p.dataset.pane !== b.dataset.tab));
    };

    /* ── onglet Fichier ── */
    const fileInput = $q('#pvFile'), drop = $q('#pvDrop'), log = $q('#pvLog');
    const logLine = (msg, cls) => { const d = D.createElement('div'); d.className = 'pv-log__row ' + (cls || ''); d.innerHTML = msg; log.appendChild(d); log.scrollTop = log.scrollHeight; };
    drop.onclick = () => fileInput.click();
    ['dragenter', 'dragover'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('is-over'); }));
    ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('is-over'); }));
    drop.addEventListener('drop', e => runFiles([...(e.dataTransfer?.files || [])]));

    async function runFiles(files) {
      if (!files.length) return;
      const opts = { skipDuplicates: $q('#pvDupes').checked };
      let created = null;
      for (const f of files) {
        logLine(`<b>${esc(f.name)}</b> — ${fmtBytes(f.size)}…`);
        try {
          const out = await routeFile(f, opts);
          if (out.kind === 'images') logLine(`✅ ${out.added} image(s) ajoutée(s) à la bibliothèque.`, 'ok');
          else if (out.out && out.out.report) {
            const r = out.out.report;
            logLine(`✅ ${r.cards} carte(s) ajoutée(s) · ${r.chaptersNew.length} chapitre(s) créé(s) · ${r.subjectsNew.length} matière(s) créée(s)` +
                    (r.dupes ? ` · ${r.dupes} doublon(s) ignoré(s)` : '') +
                    (r.media.length ? ` · ${r.media.length} image(s) de Mon Drive` : ''), 'ok');
            r.errors.forEach(x => logLine('⚠️ ' + esc(x), 'warn'));
            created = created || r;
          } else {
            logLine(`✅ ${out.kind} importé.`, 'ok');
          }
        } catch (e) {
          logLine(`❌ ${esc(f.name)} : ${esc(e.message || e)}`, 'err');
          (e.errors || []).slice(1, 6).forEach(x => logLine('· ' + esc(x), 'err'));
        }
      }
      if (created) { try { goDeck(false); } catch {} }
    }
    fileInput.onchange = e => { runFiles([...(e.target.files || [])]); e.target.value = ''; };

    /* ── onglet Texte ── */
    const ta = $q('#pvText'), sum = $q('#pvSummary'), errs = $q('#pvErrors'), run = $q('#pvRun');
    let last = null;
    const refresh = () => {
      const txt = ta.value.trim();
      if (!txt) { sum.innerHTML = '<span class="pv-dim">Colle ton texte ou ton JSON pour voir l\'aperçu.</span>'; errs.innerHTML = ''; run.disabled = true; last = null; return; }
      const res = parse(txt);
      last = res;
      const chips = [
        ['matière', res.stats.subjects, res.stats.subjects > 1 ? 's' : ''],
        ['chapitre', res.stats.chapters, res.stats.chapters > 1 ? 's' : ''],
        ['carte', res.stats.cards, res.stats.cards > 1 ? 's' : ''],
        ['image', res.stats.images, res.stats.images > 1 ? 's' : '']
      ];
      sum.innerHTML = `<span class="pv-kind">${res.kind === 'lines' ? 'Format PV-Lignes' : 'JSON'}</span>` +
        chips.map(([l, n, s]) => `<span class="pv-chip ${n ? 'is-on' : ''}"><b>${n}</b> ${l}${s}</span>`).join('');
      errs.innerHTML =
        res.errors.map(x => `<div class="pv-err">⛔ ${esc(x)}</div>`).join('') +
        res.warnings.map(x => `<div class="pv-warn">⚠️ ${esc(x)}</div>`).join('') +
        (res.missing.length ? `<div class="pv-warn">⚠️ Image(s) introuvable(s) dans la bibliothèque : ${esc(res.missing.join(', '))} — importe-les dans l'onglet <b>Images</b>, puis relance (l'image sera ajoutée à l'import suivant).</div>` : '');
      run.disabled = !res.ok;
    };
    let t = null;
    ta.oninput = () => { clearTimeout(t); t = setTimeout(refresh, 300); };
    $q('.pv-sample').onclick = e => {
      const b = e.target.closest('[data-sample]'); if (!b) return;
      ta.value = SAMPLES[b.dataset.sample] || '';
      refresh();
    };

    run.onclick = async () => {
      if (!last || !last.ok) return;
      run.disabled = true; run.textContent = 'Import…';
      try {
        const rep = await apply(last.plan, { skipDuplicates: $q('#pvDupes').checked });
        toast(`${rep.cards} carte(s) importée(s)`, 'success');
        close();
        try { goDeck(false); } catch {}
      } catch (e) {
        errs.innerHTML = `<div class="pv-err">⛔ ${esc(e.message || e)}</div>`;
      } finally { run.disabled = false; run.textContent = 'Importer'; }
    };
    return overlay;
  }

  return { parse, apply, importText, openWizard, routeFile, docHTML, samples: SAMPLES, fieldToHTML };
})();
window.PVImport = PVImport;
