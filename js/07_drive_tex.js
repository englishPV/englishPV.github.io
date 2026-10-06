/*07_drive_tex.js*/
/* ══════════════════════════════════════════════════════════════
   TEXRENDER — Compilation LaTeX → HTML (rendu dans l'app)
   Gère : préambule, macros \newcommand, \maketitle,
   \tableofcontents, sections numérotées, listes imbriquées,
   tabular/longtable, floats (figure/table + \caption),
   verbatim, environnements de théorèmes, notes de bas de page,
   \ref/\eqref/\cite/\label, et toutes les maths (MathJax).
   ══════════════════════════════════════════════════════════════ */
const TexRender = (() => {
  'use strict';

  const PH = '\x00';                      // marqueur de placeholder
  const RULE = '\x01RULE\x01';            // marqueur \hline & co
  const LEVELS = ['part', 'chapter', 'section', 'subsection', 'subsubsection', 'paragraph', 'subparagraph'];
  const MATH_ENVS = {
    equation: 'single', displaymath: 'single', math: 'inline',
    align: 'aligned', alignat: 'aligned', flalign: 'aligned', eqnarray: 'aligned',
    gather: 'gathered', multline: 'gathered',
    split: 'aligned', aligned: 'raw', gathered: 'raw',
    cases: 'raw', array: 'raw', matrix: 'raw', pmatrix: 'raw', bmatrix: 'raw',
    Bmatrix: 'raw', vmatrix: 'raw', Vmatrix: 'raw', smallmatrix: 'raw'
  };
  const DISPLAY_WRAP = { aligned: 'aligned', gathered: 'gathered' };

  const ACCENTS = {
    "'": { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú', y: 'ý', A: 'Á', E: 'É', I: 'Í', O: 'Ó', U: 'Ú', c: 'ć', n: 'ń', s: 'ś', z: 'ź' },
    '`': { a: 'à', e: 'è', i: 'ì', o: 'ò', u: 'ù', A: 'À', E: 'È', I: 'Ì', O: 'Ò', U: 'Ù' },
    '^': { a: 'â', e: 'ê', i: 'î', o: 'ô', u: 'û', A: 'Â', E: 'Ê', I: 'Î', O: 'Ô', U: 'Û', c: 'ĉ', g: 'ĝ', h: 'ĥ', j: 'ĵ', s: 'ŝ', w: 'ŵ', y: 'ŷ' },
    '"': { a: 'ä', e: 'ë', i: 'ï', o: 'ö', u: 'ü', y: 'ÿ', A: 'Ä', E: 'Ë', I: 'Ï', O: 'Ö', U: 'Ü' },
    '~': { a: 'ã', n: 'ñ', o: 'õ', A: 'Ã', N: 'Ñ', O: 'Õ' },
    c: { c: 'ç', C: 'Ç', s: 'ş', S: 'Ş', g: 'ģ' },
    v: { c: 'č', s: 'š', z: 'ž', r: 'ř', e: 'ě', n: 'ň', d: 'ď', t: 'ť', C: 'Č', S: 'Š', Z: 'Ž', R: 'Ř' },
    u: { a: 'ă', g: 'ğ', A: 'Ă', G: 'Ğ' },
    H: { o: 'ő', u: 'ű' }, '.': { z: 'ż', e: 'ė', Z: 'Ż', E: 'Ė' }, '=': { a: 'ā', e: 'ē', i: 'ī', o: 'ō', u: 'ū' },
    k: { a: 'ą', e: 'ę' }, d: { a: 'ạ' }, b: { a: 'ạ' }, t: { a: 'ȁ' }
  };
  const SYMBOLS = {
    ldots: '…', dots: '…', cdots: '⋯', vdots: '⋮', ddots: '⋱', dotsb: '…',
    times: '×', div: '÷', pm: '±', mp: '∓', cdot: '·', ast: '∗', star: '⋆', bullet: '•',
    leq: '≤', le: '≤', geq: '≥', ge: '≥', neq: '≠', ne: '≠', approx: '≈', equiv: '≡', sim: '∼', simeq: '≃',
    propto: '∝', ll: '≪', gg: '≫', cong: '≅', in: '∈', notin: '∉', ni: '∋', subset: '⊂',
    supset: '⊃', subseteq: '⊆', supseteq: '⊇', cup: '∪', cap: '∩', setminus: '∖', emptyset: '∅', varnothing: '∅',
    infty: '∞', partial: '∂', nabla: '∇', forall: '∀', exists: '∃', neg: '¬', land: '∧', lor: '∨',
    to: '→', rightarrow: '→', Rightarrow: '⇒', leftarrow: '←', Leftarrow: '⇐', leftrightarrow: '↔',
    Leftrightarrow: '⇔', mapsto: '↦', longrightarrow: '⟶', longleftarrow: '⟵', implies: '⟹', iff: '⟺',
    uparrow: '↑', downarrow: '↓', nearrow: '↗', searrow: '↘', hookrightarrow: '↪', xrightarrow: '→',
    alpha: 'α', beta: 'β', gamma: 'γ', Gamma: 'Γ', delta: 'δ', Delta: 'Δ', epsilon: 'ϵ', varepsilon: 'ε',
    zeta: 'ζ', eta: 'η', theta: 'θ', Theta: 'Θ', vartheta: 'ϑ', iota: 'ι', kappa: 'κ', lambda: 'λ',
    Lambda: 'Λ', mu: 'μ', nu: 'ν', xi: 'ξ', Xi: 'Ξ', pi: 'π', Pi: 'Π', rho: 'ρ', sigma: 'σ', Sigma: 'Σ',
    tau: 'τ', upsilon: 'υ', phi: 'φ', Phi: 'Φ', varphi: 'φ', chi: 'χ', psi: 'ψ', Psi: 'Ψ', omega: 'ω', Omega: 'Ω',
    sum: '∑', prod: '∏', int: '∫', oint: '∮', angle: '∠', perp: '⊥', parallel: '∥',
    triangle: '△', square: '□', diamond: '◇', hbar: 'ℏ', ell: 'ℓ', aleph: 'ℵ',
    dag: '†', ddag: '‡', P: '¶', S: '§', pounds: '£', euro: '€', copyright: '©', registered: '®',
    textdegree: '°', degree: '°', textbackslash: '\\', textasciitilde: '~', textquotesingle: "'",
    textendash: '–', textemdash: '—', textbullet: '•', textperiodcentered: '·',
    and: ' et ', quad: '\u2003', qquad: '\u2003\u2003', enspace: '\u2002', thinspace: '\u2009',
    ',': '\u2009', ';': '\u2005', ':': '\u2004', '!': '', ' ': '\u00A0'
  };
  const MATHY = new Set(['frac', 'dfrac', 'tfrac', 'binom', 'sqrt', 'vec', 'hat', 'bar', 'tilde', 'dot', 'ddot',
    'overline', 'widehat', 'widetilde', 'mathbb', 'mathcal', 'mathbf', 'mathrm', 'mathit', 'mathsf', 'boldsymbol',
    'operatorname', 'lim', 'limsup', 'liminf', 'log', 'ln', 'exp', 'sin', 'cos', 'tan', 'arcsin', 'arccos',
    'arctan', 'sinh', 'cosh', 'tanh', 'det', 'dim', 'ker', 'sup', 'inf', 'max', 'min']);
  const MATHY_ARGS = { frac: 2, dfrac: 2, tfrac: 2, binom: 2 };

  const THEOREMS = {
    theorem: 'Théorème', theoreme: 'Théorème', lemma: 'Lemme', lemme: 'Lemme',
    proposition: 'Proposition', corollary: 'Corollaire', corollaire: 'Corollaire',
    definition: 'Définition', exemple: 'Exemple', example: 'Exemple', exercise: 'Exercice',
    exercice: 'Exercice', remarque: 'Remarque', remark: 'Remarque', note: 'Note',
    preuve: 'Preuve', proof: 'Démonstration', demonstration: 'Démonstration', demo: 'Démonstration',
    solution: 'Solution', hypothese: 'Hypothèse', notation: 'Notation', rappel: 'Rappel',
    methode: 'Méthode', propriete: 'Propriété', property: 'Propriété', conjecture: 'Conjecture',
    axiome: 'Axiome', axiom: 'Axiome', probleme: 'Problème', donnees: 'Données'
  };
  const VERB_ENVS = ['verbatim', 'Verbatim', 'lstlisting', 'minted', 'alltt'];

  /* ─────────── petits outils ─────────── */
  const escHtml = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const escAttr = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const stripTags = s => String(s || '').replace(/<[^>]*>/g, '');
  const sanitizeUrl = u => { const s = String(u || '').trim(); return /^(javascript|data):/i.test(s) ? '#' : s; };
  const colorOf = c => {
    const map = { red: '#ef4444', blue: '#3b82f6', green: '#22c55e', black: '#111', white: '#fff', gray: '#6b7280', grey: '#6b7280', orange: '#f97316', purple: '#a855f7', cyan: '#06b6d4', magenta: '#d946ef', brown: '#92400e', violet: '#8b5cf6', yellow: '#ca8a04' };
    const k = String(c || '').trim().toLowerCase();
    if (map[k]) return map[k];
    const mix = /^(\w+)!(\d+)/.exec(k); if (mix && map[mix[1]]) return map[mix[1]];
    return /^#[0-9a-f]{3,8}$/.test(k) ? k : 'inherit';
  };
  function skipWs(s, i) { while (i < s.length && /[ \t\n]/.test(s[i])) i++; return i; }

  function readGroup(s, i) {
    i = skipWs(s, i);
    if (s[i] !== '{') {
      if (s[i] === '\\') { const m = /^\\([a-zA-Z@]+|.)/.exec(s.slice(i)); const t = m ? m[0] : '\\'; return { text: t, end: i + t.length }; }
      return { text: s[i] === undefined ? '' : s[i], end: i + 1 };
    }
    let d = 0, j = i;
    while (j < s.length) {
      const ch = s[j];
      if (ch === '\\' && j + 1 < s.length) { j += 2; continue; }
      if (ch === '{') d++;
      else if (ch === '}') { d--; if (d === 0) return { text: s.slice(i + 1, j), end: j + 1 }; }
      j++;
    }
    return { text: s.slice(i + 1), end: s.length };
  }

  function readOpt(s, i) {
    const j0 = skipWs(s, i);
    if (s[j0] !== '[') return null;
    let d = 0, j = j0;
    while (j < s.length) {
      const ch = s[j];
      if (ch === '\\' && j + 1 < s.length) { j += 2; continue; }
      if (ch === '[') d++;
      else if (ch === ']') { d--; if (d === 0) return { text: s.slice(j0 + 1, j).trim(), end: j + 1 }; }
      j++;
    }
    return null;
  }

  // découpe au « niveau 0 » : hors {} et hors \begin..\end
  function splitTop(src, test) {
    const parts = [];
    let depth = 0, envDepth = 0, i = 0, start = 0;
    while (i < src.length) {
      const ch = src[i];
      if (ch === '\\' && i + 1 < src.length) {
        const b = /^\\begin\{([^}]*)\}/.exec(src.slice(i));
        const e = /^\\end\{([^}]*)\}/.exec(src.slice(i));
        if (b) { envDepth++; i += b[0].length; continue; }
        if (e) { envDepth = M.max(0, envDepth - 1); i += e[0].length; continue; }
        if (depth === 0 && envDepth === 0) {
          const hit = test(src, i);
          if (hit) { parts.push({ text: src.slice(start, i), cmd: hit }); i = hit.end; start = i; continue; }
        }
        if ('{}[]'.includes(src[i + 1])) { i += 2; continue; }
        i += 2; continue;
      }
      if (ch === '{') { depth++; i++; continue; }
      if (ch === '}') { depth = M.max(0, depth - 1); i++; continue; }
      if (depth === 0 && envDepth === 0) {
        const hit = test(src, i);
        if (hit) { parts.push({ text: src.slice(start, i), cmd: hit }); i = hit.end; start = i; continue; }
      }
      i++;
    }
    parts.push({ text: src.slice(start), cmd: null });
    return parts;
  }

  const splitRows = src => splitTop(src, (s, i) => /^\\\\/.test(s.slice(i)) ? { end: i + 2 } : null).map(p => p.text.trim());
  const splitCells = row => splitTop(row, (s, i) => (s[i] === '&' ? { end: i + 1 } : null)).map(p => p.text);

  // \bibitem{cle} …  (bibliographie)
  function splitBibItems(src) {
    const parts = splitTop(src, (s, i) => {
      const m = /^\\bibitem\s*(\[[^\]]*\])?\s*\{([^}]*)\}/.exec(s.slice(i));
      return m ? { end: i + m[0].length, label: m[2] } : null;
    });
    const out = [];
    parts.forEach((p, k) => { if (p.cmd) out.push({ label: p.cmd.label, body: parts[k + 1] ? parts[k + 1].text : '' }); });
    return out;
  }

  // \item : le label appartient au texte qui suit
  function splitItems(src) {
    const parts = splitTop(src, (s, i) => {
      const m = /^\\item\s*(\[[^\]]*\])?/.exec(s.slice(i));
      return m ? { end: i + m[0].length, label: m[1] ? m[1].slice(1, -1) : null } : null;
    });
    const out = [];
    parts.forEach((p, k) => {
      if (!p.cmd) return;
      const body = parts[k + 1] ? parts[k + 1].text : '';
      out.push({ label: p.cmd.label, body });
    });
    return out;
  }

  function extractEnv(src, start, name) {
    const beginTag = '\\begin{' + name + '}', endTag = '\\end{' + name + '}';
    let i = start + beginTag.length, depth = 1;
    while (i < src.length) {
      if (src.startsWith(beginTag, i)) { depth++; i += beginTag.length; continue; }
      if (src.startsWith(endTag, i)) { depth--; if (depth === 0) return { inner: src.slice(start + beginTag.length, i), end: i + endTag.length }; i += endTag.length; continue; }
      i++;
    }
    return { inner: src.slice(start + beginTag.length), end: src.length };
  }

  /* ─────────── préambule, macros, commentaires ─────────── */
  function stripComments(src) {
    return src.split('\n').map(line => {
      let out = '', i = 0;
      while (i < line.length) {
        if (line[i] === '\\' && i + 1 < line.length) { out += line[i] + line[i + 1]; i += 2; continue; }
        if (line[i] === '%') break;
        out += line[i]; i++;
      }
      return out;
    }).join('\n');
  }

  function collectMacros(src) {
    const macros = {};
    const re = /\\(?:newcommand|renewcommand|providecommand)\s*\{?\s*\\([a-zA-Z]+)\}?\s*/g;
    let m;
    while ((m = re.exec(src))) {
      let j = re.lastIndex;
      const ao = readOpt(src, j); const argc = ao ? (+ao.text || 0) : 0; if (ao) j = ao.end;
      const dflt = readOpt(src, j); if (dflt) j = dflt.end;
      const g = readGroup(src, j);
      macros[m[1]] = { argc, def: dflt ? dflt.text : null, body: g.text };
      re.lastIndex = g.end;
    }
    // \def\foo{...}
    const re2 = /\\def\s*\\([a-zA-Z]+)\s*/g;
    while ((m = re2.exec(src))) {
      const g = readGroup(src, re2.lastIndex);
      if (!macros[m[1]]) macros[m[1]] = { argc: 0, def: null, body: g.text };
      re2.lastIndex = g.end;
    }
    return macros;
  }

  // expansion des macros utilisateur AVANT la protection des maths
  function expandMacros(src, ctx, depth = 0) {
    if (depth > 14) return src;
    const names = Object.keys(ctx.macros);
    if (!names.length) return src;
    let out = '', i = 0;
    while (i < src.length) {
      if (src[i] === '\\' && /[a-zA-Z]/.test(src[i + 1] || '')) {
        const m = /^\\([a-zA-Z]+)/.exec(src.slice(i));
        const nm = m[1];
        if (ctx.macros[nm] && !/^\\(begin|end)\{/.test(src.slice(i))) {
          const mac = ctx.macros[nm];
          let j = i + m[0].length;
          const args = [];
          const o = readOpt(src, j);
          if (o && mac.def !== null) { args.push(o.text); j = o.end; }
          for (let a = args.length; a < (mac.argc || 0); a++) { const g = readGroup(src, j); args.push(g.text); j = g.end; }
          let body = mac.body;
          args.forEach((v, k) => { body = body.split('#' + (k + 1)).join('{' + v + '}'); });
          body = body.replace(/##/g, '#');
          out += expandMacros(body, ctx, depth + 1);
          i = j; continue;
        }
        out += m[0]; i += m[0].length; continue;
      }
      out += src[i]; i++;
    }
    return out;
  }

  function extractMeta(src) {
    const meta = { title: '', author: '', date: '', documentclass: '' };
    const dc = /\\documentclass\s*(\[[^\]]*\])?\s*\{([^}]*)\}/.exec(src);
    if (dc) meta.documentclass = dc[2];
    ['title', 'author', 'date'].forEach(k => {
      const re = new RegExp('\\\\' + k + '\\s*', 'g');
      let m;
      while ((m = re.exec(src))) { const g = readGroup(src, m.index + m[0].length); if (g.text.trim()) { meta[k] = g.text; break; } }
    });
    return meta;
  }

  /* ─────────── placeholders ─────────── */
  function stash(ctx, kind, html, block) {
    ctx.stash[kind].push({ html, block: !!block });
    return `${PH}${kind}${ctx.stash[kind].length - 1}${PH}`;
  }
  function restoreAll(html, ctx) {
    let prev = '';
    let guard = 0;
    while (prev !== html && guard++ < 6) {
      prev = html;
      html = html.replace(/\x00([A-Z])(\d+)\x00/g, (_, k, i) => {
        const e = ctx.stash[k] && ctx.stash[k][+i];
        return e ? e.html : '';
      });
    }
    return html;
  }

  function protectVerbatim(src, ctx) {
    let out = '', i = 0;
    while (i < src.length) {
      const m = /^\\begin\{([^}]*)\}/.exec(src.slice(i));
      if (m && VERB_ENVS.includes(m[1])) {
        const env = extractEnv(src, i, m[1]);
        out += stash(ctx, 'V', `<pre class="tex-verb"><code>${escHtml(env.inner.replace(/^\n+|\n+$/g, ''))}</code></pre>`, true);
        i = env.end; continue;
      }
      const v = /^\\(?:verb|lstinline)\*?(.)([\s\S]*?)\1/.exec(src.slice(i));
      if (v) { out += stash(ctx, 'V', `<code class="tex-verb-inline">${escHtml(v[2])}</code>`, false); i += v[0].length; continue; }
      out += src[i]; i++;
    }
    return out;
  }

  const eqNumber = ctx => (ctx.eqNo = (ctx.eqNo || 0) + 1);

  function pullLabels(src, ctx) {
    const labels = [];
    src = src.replace(/\\label\s*\{([^}]*)\}/g, (_, l) => { labels.push(l.trim()); return ''; });
    return { src, labels };
  }

  function mathBlock(tex, ctx, numbered, labels) {
    const num = numbered ? eqNumber(ctx) : null;
    ctx.lastNumber = num || ctx.lastNumber;
    (labels || []).forEach(l => { ctx.labels[l] = num === null ? '' : String(num); });
    const inner = `<div class="tex-eq-body">${tex}</div>`;
    const html = num
      ? `<div class="tex-eq">${inner}<div class="tex-eq-no">(${num})</div></div>`
      : `<div class="tex-eq tex-eq-nonum">${inner}</div>`;
    return stash(ctx, 'M', html, true);
  }

  function protectMath(src, ctx) {
    let out = '', i = 0;
    while (i < src.length) {
      const rest = src.slice(i);

      const bm = /^\\begin\{([a-zA-Z]+\*?)\}/.exec(rest);
      if (bm) {
        const baseName = bm[1].replace(/\*$/, '');
        const starred = bm[1].endsWith('*');
        if (MATH_ENVS[baseName]) {
          const env = extractEnv(src, i, bm[1]);
          const kind = MATH_ENVS[baseName];
          if (kind === 'inline') {
            const p = pullLabels(env.inner, ctx);
            out += stash(ctx, 'M', `\\(${p.src.trim()}\\)`, false);
          } else if (kind === 'raw') {
            const p = pullLabels(env.inner, ctx);
            out += mathBlock(`\\[\\begin{${baseName}}${p.src}\\end{${baseName}}\\]`, ctx, false, p.labels);
          } else if (kind === 'single') {
            const p = pullLabels(env.inner, ctx);
            out += mathBlock(`\\[${p.src.trim()}\\]`, ctx, !starred, p.labels);
          } else {
            // align / gather / … : une ligne = une équation (numérotée sauf \notag)
            const rows = splitRows(env.inner).filter(r => r.replace(/\\\\$/, '').trim());
            const envName = DISPLAY_WRAP[kind] || kind;
            rows.forEach(row => {
              const noTag = /\\(notag|nonumber)\b/.test(row);
              const p = pullLabels(row.replace(/\\(notag|nonumber)\b/g, '').replace(/\\\\$/, ''), ctx);
              if (!p.src.trim()) return;
              out += mathBlock(`\\[\\begin{${envName}}${p.src.trim()}\\end{${envName}}\\]`, ctx, !starred && !noTag, p.labels);
            });
          }
          i = env.end; continue;
        }
      }

      if (rest.startsWith('\\[')) {
        const j = src.indexOf('\\]', i + 2);
        const inner = j < 0 ? src.slice(i + 2) : src.slice(i + 2, j);
        const p = pullLabels(inner, ctx);
        out += stash(ctx, 'M', `\\[${p.src}\\]`, true);
        i = j < 0 ? src.length : j + 2; continue;
      }
      if (rest.startsWith('$$')) {
        const j = src.indexOf('$$', i + 2);
        const inner = j < 0 ? src.slice(i + 2) : src.slice(i + 2, j);
        out += stash(ctx, 'M', `\\[${inner}\\]`, true);
        i = j < 0 ? src.length : j + 2; continue;
      }
      if (rest.startsWith('\\(')) {
        const j = src.indexOf('\\)', i + 2);
        const inner = j < 0 ? src.slice(i + 2) : src.slice(i + 2, j);
        out += stash(ctx, 'M', `\\(${inner}\\)`, false);
        i = j < 0 ? src.length : j + 2; continue;
      }
      if (src[i] === '$') {
        let j = i + 1, buf = '';
        while (j < src.length) {
          if (src[j] === '\\' && j + 1 < src.length) { buf += src[j] + src[j + 1]; j += 2; continue; }
          if (src[j] === '$') break;
          if (src[j] === '\n' && src[j + 1] === '\n') break;
          buf += src[j]; j++;
        }
        if (j < src.length && buf.trim()) { out += stash(ctx, 'M', `\\(${buf.trim()}\\)`, false); i = j + 1; continue; }
      }
      out += src[i]; i++;
    }
    return out;
  }

  /* ─────────── rendu inline (mode texte) ─────────── */
  function inline(s, ctx) {
    if (s == null) return '';
    let out = '', i = 0;
    const n = s.length;
    while (i < n) {
      const c = s[i];

      if (c === PH) {
        const m = /^\x00([A-Z])(\d+)\x00/.exec(s.slice(i));
        if (m) { const e = ctx.stash[m[1]][+m[2]]; out += e ? e.html : ''; i += m[0].length; continue; }
      }

      if (c === '\\' && i + 1 < n) {
        const cm = /^\\([a-zA-Z@]+)(\*?)|^\\([^a-zA-Z@])/.exec(s.slice(i));
        if (!cm) { out += escHtml(c); i++; continue; }
        const r = command(cm[1] || cm[3], cm[2] === '*', s, i + cm[0].length, ctx);
        out += r.html; i = r.end; continue;
      }

      if (c === '{') { const g = readGroup(s, i); out += inline(g.text, ctx); i = g.end; continue; }
      if (c === '}') { i++; continue; }
      if (c === '~') { out += '&nbsp;'; i++; continue; }
      if (c === '-' && s.startsWith('---', i)) { out += '—'; i += 3; continue; }
      if (c === '-' && s.startsWith('--', i)) { out += '–'; i += 2; continue; }
      if (c === '`' && s[i + 1] === '`') { out += '“'; i += 2; continue; }
      if (c === "'" && s[i + 1] === "'") { out += '”'; i += 2; continue; }
      if (c === '\n') { out += ' '; i++; continue; }
      out += escHtml(c); i++;
    }
    return out;
  }

  function command(name, starred, s, i, ctx) {
    const A = () => readGroup(s, i);
    const k = name;                     // nom nu (sans backslash) sauf pour les caractères échappés

    switch (k) {
      /* ── mise en forme ── */
      case 'textbf': case 'bf': { const g = A(); return { html: `<strong>${inline(g.text, ctx)}</strong>`, end: g.end }; }
      case 'textsc': { const g = A(); return { html: `<strong class="tex-sc">${inline(g.text, ctx)}</strong>`, end: g.end }; }
      case 'textit': case 'emph': case 'it': { const g = A(); return { html: `<em>${inline(g.text, ctx)}</em>`, end: g.end }; }
      case 'texttt': case 'tt': { const g = A(); return { html: `<code class="tex-tt">${inline(g.text, ctx)}</code>`, end: g.end }; }
      case 'textsf': { const g = A(); return { html: `<span class="tex-sf">${inline(g.text, ctx)}</span>`, end: g.end }; }
      case 'textrm': case 'textnormal': case 'text': case 'textmd': case 'textup': case 'textsl': { const g = A(); return { html: inline(g.text, ctx), end: g.end }; }
      case 'underline': case 'uline': case 'sout': { const g = A(); return { html: `<span class="tex-ul">${inline(g.text, ctx)}</span>`, end: g.end }; }
      case 'textsuperscript': { const g = A(); return { html: `<sup>${inline(g.text, ctx)}</sup>`, end: g.end }; }
      case 'textsubscript': { const g = A(); return { html: `<sub>${inline(g.text, ctx)}</sub>`, end: g.end }; }
      case 'textcolor': { const g1 = A(); const g2 = readGroup(s, g1.end); return { html: `<span style="color:${colorOf(g1.text)}">${inline(g2.text, ctx)}</span>`, end: g2.end }; }
      case 'colorbox': case 'fcolorbox': { const g1 = A(); const g2 = readGroup(s, g1.end); return { html: `<span class="tex-colorbox" style="background:${colorOf(g1.text)}">${inline(g2.text, ctx)}</span>`, end: g2.end }; }
      case 'fbox': case 'framebox': case 'boxed': { const g = A(); return { html: `<span class="tex-fbox">${inline(g.text, ctx)}</span>`, end: g.end }; }
      case 'mbox': case 'makebox': case 'parbox': case 'minipage': case 'raisebox': case 'resizebox': case 'scalebox': {
        let j = i; const o = readOpt(s, j); if (o) j = o.end;
        if (['parbox', 'minipage', 'raisebox', 'resizebox', 'scalebox'].includes(k)) { const g1 = readGroup(s, j); j = g1.end; }
        const g = readGroup(s, j);
        return { html: inline(g.text, ctx), end: g.end };
      }
      case 'hspace': case 'vspace': { let j = i; const o = readOpt(s, j); if (o) j = o.end; const g = readGroup(s, j); return { html: k === 'hspace' ? '&nbsp;' : '', end: g.end }; }
      case 'rule': { const g1 = A(); const g2 = readGroup(s, g1.end); const g3 = readGroup(s, g2.end); return { html: '<span class="tex-rule-inline"></span>', end: g3.end }; }

      /* ── liens & images ── */
      case 'href': { const g1 = A(); const g2 = readGroup(s, g1.end); return { html: `<a href="${escAttr(sanitizeUrl(g1.text))}" target="_blank" rel="noopener">${inline(g2.text, ctx)}</a>`, end: g2.end }; }
      case 'url': { const g = A(); return { html: `<a class="tex-url" href="${escAttr(sanitizeUrl(g.text))}" target="_blank" rel="noopener">${escHtml(g.text)}</a>`, end: g.end }; }
      case 'hyperref': { const o = readOpt(s, i); const g = readGroup(s, o ? o.end : i); const key = (o ? o.text : g.text).trim(); return { html: `<span class="tex-ref" data-ref="${escAttr(key)}">${inline(g.text, ctx)}</span>`, end: g.end }; }
      case 'includegraphics': { const o = readOpt(s, i); const g = readGroup(s, o ? o.end : i); return { html: graphics(o ? o.text : '', g.text, ctx), end: g.end }; }
      case 'graphicspath': { const g = A(); return { html: '', end: g.end }; }

      /* ── références ── */
      case 'label': { const g = A(); ctx.labels[g.text.trim()] = ctx.lastNumber == null ? '' : String(ctx.lastNumber); return { html: '', end: g.end }; }
      case 'ref': case 'pageref': case 'autoref': case 'Cref': case 'cref': { const g = A(); return { html: `<span class="tex-ref" data-ref="${escAttr(g.text.trim())}">?</span>`, end: g.end }; }
      case 'eqref': { const g = A(); return { html: `(<span class="tex-ref" data-ref="${escAttr(g.text.trim())}">?</span>)`, end: g.end }; }
      case 'cite': case 'citep': case 'citet': case 'nocite': {
        const o = readOpt(s, i); const g = readGroup(s, o ? o.end : i);
        const keys = g.text.split(',').map(x => x.trim()).filter(Boolean);
        keys.forEach(x => { if (!ctx.cites.includes(x)) ctx.cites.push(x); });
        if (k === 'nocite') return { html: '', end: g.end };
        return { html: `<span class="tex-cite" data-cite="${escAttr(keys.join(','))}">[${keys.map(x => ctx.cites.indexOf(x) + 1).join(', ')}]</span>`, end: g.end };
      }
      case 'footnote': { const g = A(); ctx.footnotes.push(g.text); const j = ctx.footnotes.length; return { html: `<sup class="tex-fnref" id="texfnref-${j}"><a href="#texfn-${j}">${j}</a></sup>`, end: g.end }; }
      case 'index': { const g = A(); return { html: '', end: g.end }; }
      case 'caption': {
        const g = A();
        const pre = ctx.floatType ? `${ctx.floatType === 'table' ? 'Table' : 'Figure'} ${ctx.floatNum || 1}. ` : '';
        return { html: `<figcaption>${pre}${inline(g.text, ctx)}</figcaption>`, end: g.end };
      }

      /* ── listes / structure ── */
      case 'item': { const o = readOpt(s, i); return { html: o ? `<span class="tex-item-label">${inline(o.text, ctx)}</span> ` : '<span class="tex-bullet">•</span> ', end: o ? o.end : i }; }
      case 'title': case 'author': case 'date': { const g = A(); return { html: '', end: g.end }; }
      case '\\': { const o = readOpt(s, i); return { html: '<br>', end: o ? o.end : i }; }
      case 'newline': case 'linebreak': return { html: '<br>', end: i };
      case 'newpage': case 'clearpage': case 'pagebreak': return { html: '<hr class="tex-newpage">', end: i };
      case 'par': return { html: '</p><p>', end: i };
      case 'LaTeX': return { html: '<span class="tex-logo">L<sup>a</sup>T<sub>e</sub>X</span>', end: i };
      case 'TeX': return { html: '<span class="tex-logo">T<sub>e</sub>X</span>', end: i };
      case 'today': return { html: new Date().toLocaleDateString('fr-FR'), end: i };

      /* ── commandes ignorées (avec leurs arguments) ── */
      case 'noindent': case 'indent': case 'centering': case 'raggedright': case 'raggedbottom':
      case 'hfill': case 'vfill': case 'smallskip': case 'medskip': case 'bigskip':
      case 'normalsize': case 'small': case 'footnotesize': case 'scriptsize': case 'tiny':
      case 'large': case 'Large': case 'LARGE': case 'huge': case 'Huge':
      case 'bfseries': case 'itshape': case 'ttfamily': case 'sffamily': case 'rmfamily':
      case 'upshape': case 'slshape': case 'scshape': case 'mdseries': case 'protect':
      case 'displaystyle': case 'textstyle': case 'scriptstyle': case 'limits': case 'nolimits':
      case 'allowbreak': case 'onecolumn': case 'twocolumn': case 'maketitle': case 'normalfont':
        return { html: '', end: i };

      case 'setlength': case 'addtolength': case 'setcounter': case 'addtocounter': case 'stepcounter':
      case 'newcommand': case 'renewcommand': case 'providecommand': case 'newenvironment': case 'renewenvironment':
      case 'usepackage': case 'RequirePackage': case 'input': case 'include': case 'includeonly':
      case 'bibliography': case 'bibliographystyle': case 'addbibresource': case 'pagenumbering':
      case 'thispagestyle': case 'pagestyle': case 'markboth': case 'markright': case 'hypersetup':
      case 'usetikzlibrary': case 'tikzset': case 'captionsetup': case 'lstset': case 'lstinputlisting':
      case 'definecolor': case 'newcolumntype': case 'DeclareMathOperator': case 'numberwithin':
      case 'theoremstyle': case 'newtheorem': case 'renewtheorem': case 'setmainfont': case 'setsansfont':
      case 'geometry': case 'fontsize': case 'selectfont': case 'labelenumi':
      case 'thanks': case 'subtitle': case 'institute': {
        let j = i;
        const o = readOpt(s, j); if (o) j = o.end;
        const o2 = readOpt(s, j); if (o2) j = o2.end;
        const g = readGroup(s, j);
        return { html: '', end: g.end };
      }
      default: break;
    }

    /* ── macro utilisateur définie en cours de document ── */
    if (ctx.macros[k]) {
      const mac = ctx.macros[k];
      let j = i; const args = [];
      const o = readOpt(s, j);
      if (o && mac.def !== null) { args.push(o.text); j = o.end; }
      for (let a = args.length; a < (mac.argc || 0); a++) { const g = readGroup(s, j); args.push(g.text); j = g.end; }
      let body = mac.body;
      args.forEach((v, q) => { body = body.split('#' + (q + 1)).join('{' + v + '}'); });
      ctx.macroDepth = (ctx.macroDepth || 0) + 1;
      const html = ctx.macroDepth > 24 ? '' : renderFragment(body, ctx);
      ctx.macroDepth--;
      return { html, end: j };
    }

    /* ── caractère unique : échappements, accents, symboles ── */
    if (k.length === 1) {
      if ('%$&#_{}'.includes(k)) return { html: escHtml(k), end: i };
      if (ACCENTS[k]) {
        if (s[skipWs(s, i)] === '{') {
          const g = readGroup(s, i);
          const letter = g.text.trim();
          const map = ACCENTS[k];
          return { html: map[letter] || letter, end: g.end };
        }
        const nxt = s[i] || '';
        const map = ACCENTS[k];
        return { html: map[nxt] || nxt, end: i + 1 };
      }
      if (SYMBOLS[k] !== undefined) return { html: escHtml(SYMBOLS[k]), end: i };
    }

    /* ── symbole texte (grecques, flèches, opérateurs…) ── */
    if (SYMBOLS[k] !== undefined) return { html: escHtml(SYMBOLS[k]), end: i };

    /* ── commande mathématique utilisée en mode texte → on la rebascule en math ── */
    if (MATHY.has(k)) {
      const argc = MATHY_ARGS[k] || 1;
      const g1 = readGroup(s, i);
      const g2 = argc === 2 ? readGroup(s, g1.end) : null;
      const tex = argc === 2 ? `\\${k}{${g1.text}}{${g2.text}}` : `\\${k}{${g1.text}}`;
      return { html: stash(ctx, 'M', `\\(${tex}\\)`, false), end: g2 ? g2.end : g1.end };
    }

    ctx.warn(`\\${k} inconnu`);
    if (/^[a-zA-Z@]+$/.test(k) && s[skipWs(s, i)] === '{') {
      const g = readGroup(s, i);
      return { html: inline(g.text, ctx), end: g.end };
    }
    return { html: '', end: i };
  }

  const escMathSymbol = k => `\\${k} `;

  function renderFragment(tex, ctx) {
    let t = protectVerbatim(String(tex == null ? '' : tex), ctx);
    t = protectMath(t, ctx);
    return renderTokens(scan(t), ctx);
  }

  /* ─────────── images ─────────── */
  function graphics(opts, path, ctx) {
    const name = String(path || '').trim().replace(/^\.\//, '');
    let src = null;
    try { src = ctx.resolveAsset ? ctx.resolveAsset(name) : null; } catch { src = null; }
    const bits = [];
    const w = /width\s*=\s*([^,\]]+)/.exec(opts || '');
    if (w) {
      const v = w[1].trim();
      if (/\\(linewidth|textwidth|columnwidth|paperwidth)/.test(v)) {
        const f = parseFloat(v) || 1;
        bits.push(`max-width:${M.round(M.min(1.5, f) * 100)}%`);
      } else if (/^[\d.]+(cm|mm|in|pt|px)$/.test(v)) {
        const num = parseFloat(v), unit = v.replace(/^[\d.]+/, '');
        const px = { cm: 37.8, mm: 3.78, in: 96, pt: 1.333, px: 1 }[unit] || 37.8;
        bits.push(`width:${M.round(num * px)}px;max-width:100%`);
      } else if (/^[\d.]+$/.test(v)) bits.push(`width:${M.round(parseFloat(v) * 0.26)}px;max-width:100%`);
    }
    if (/^\s*angle\s*=/.test(opts || '')) { const a = /angle\s*=\s*(-?[\d.]+)/.exec(opts); if (a) bits.push(`transform:rotate(${a[1]}deg)`); }
    if (!src) {
      ctx.warn(`image introuvable : ${name}`);
      return `<span class="tex-missing-img">🖼 ${escHtml(name)}<small>image introuvable dans le Drive</small></span>`;
    }
    return `<img class="tex-img" src="${escAttr(src)}" alt="${escAttr(name)}" loading="lazy"${bits.length ? ` style="${bits.join(';')}"` : ''}>`;
  }

  /* ─────────── environnements ─────────── */
  function renderEnv(name, innerRaw, ctx) {
    const base = name.replace(/\*$/, ''), starred = name.endsWith('*');
    let inner = innerRaw;

    if (VERB_ENVS.includes(base)) return `<pre class="tex-verb"><code>${escHtml(inner.replace(/^\n+|\n+$/g, ''))}</code></pre>`;
    if (MATH_ENVS[base]) { const p = pullLabels(inner, ctx); return stash(ctx, 'M', `\\[\\begin{${base}}${p.src}\\end{${base}}\\]`, true); }

    // argument optionnel d'environnement ([h], [t], [H]…)
    const stripOpt = () => { const o = readOpt(inner, 0); if (o) inner = inner.slice(o.end); };

    switch (base) {
      case 'document': return renderFragment(inner, ctx);

      case 'itemize': case 'enumerate': case 'compactitem': case 'compactenum': case 'asparaitem':
      case 'itemize*': case 'enumerate*': {
        stripOpt();
        const items = splitItems(inner);
        const isOl = base.includes('enum');
        const tag = isOl ? 'ol' : 'ul';
        return `<${tag} class="tex-list">${items.map(it => `<li>${renderFragment(it.body, ctx)}</li>`).join('') || '<li></li>'}</${tag}>`;
      }
      case 'description': {
        stripOpt();
        return `<dl class="tex-desc">${splitItems(inner).map(it => `<dt>${inline(it.label || '', ctx)}</dt><dd>${renderFragment(it.body, ctx)}</dd>`).join('')}</dl>`;
      }
      case 'list': { const g = A2(inner, 0); const g2 = readGroup(inner, g.end); return `<ul class="tex-list">${splitItems(inner.slice(g2.end)).map(it => `<li>${renderFragment(it.body, ctx)}</li>`).join('')}</ul>`; }

      case 'center': return `<div class="tex-center">${renderFragment(inner, ctx)}</div>`;
      case 'flushleft': return `<div class="tex-left">${renderFragment(inner, ctx)}</div>`;
      case 'flushright': return `<div class="tex-right">${renderFragment(inner, ctx)}</div>`;
      case 'quote': case 'quotation': return `<blockquote class="tex-quote">${renderFragment(inner, ctx)}</blockquote>`;
      case 'verse': return `<pre class="tex-verse">${inline(inner, ctx)}</pre>`;
      case 'abstract': return `<div class="tex-abstract"><div class="tex-abstract-title">Résumé</div>${renderFragment(inner, ctx)}</div>`;

      case 'figure': case 'table': case 'wrapfigure': case 'wraptable': case 'sidewaysfigure': case 'subfigure': {
        stripOpt();
        const type = base.includes('table') ? 'table' : 'figure';
        if (base === 'subfigure') return `<span class="tex-minipage">${renderFragment(inner, ctx)}</span>`;
        ctx.counters[type] = (ctx.counters[type] || 0) + 1;
        ctx.lastNumber = String(ctx.counters[type]);
        const num = ctx.counters[type];
        // \caption extrait du contenu : rendu en dehors des paragraphes
        let caption = '';
        const cm = /\\caption\s*/.exec(inner);
        if (cm) {
          const g = readGroup(inner, cm.index + cm[0].length);
          caption = `<figcaption><span class="tex-cap-no">${type === 'table' ? 'Table' : 'Figure'} ${num}.</span> ${inline(g.text, ctx)}</figcaption>`;
          inner = inner.slice(0, cm.index) + inner.slice(g.end);
        }
        const prevType = ctx.floatType, prevNum = ctx.floatNum;
        ctx.floatType = type; ctx.floatNum = num;
        const body = renderFragment(inner, ctx);
        ctx.floatType = prevType; ctx.floatNum = prevNum;
        const innerHtml = type === 'table' ? caption + body : body + caption;
        return `<figure class="tex-float${type === 'table' ? ' tex-float-table' : ''}">${innerHtml}</figure>`;
      }
      case 'tabular': case 'tabular*': case 'longtable': case 'array': case 'tabu': case 'supertabular':
        return renderTabular(inner, ctx, base === 'longtable');
      case 'minipage': { const o = readOpt(inner, 0); let j = o ? o.end : 0; const g = readGroup(inner, j); return `<span class="tex-minipage">${renderFragment(inner.slice(g.end))}</span>`; }
      case 'columns': return `<div class="tex-columns">${renderFragment(inner, ctx)}</div>`;
      case 'column': { const g = A2(inner, 0); return `<div class="tex-column">${renderFragment(inner.slice(g.end))}</div>`; }
      case 'frame': {
        const o = readOpt(inner, 0);
        let j = o ? o.end : 0, title = '';
        if (inner[skipWs(inner, j)] === '{') { const g = readGroup(inner, j); title = g.text; j = g.end; }
        ctx.counters.frame = (ctx.counters.frame || 0) + 1;
        return `<section class="tex-frame">${title ? `<h2 class="tex-frame-title"><span class="tex-hnum">${ctx.counters.frame}</span> ${inline(title, ctx)}</h2>` : ''}${renderFragment(inner.slice(j), ctx)}</section>`;
      }
      case 'tikzpicture': case 'pgfpicture': case 'axis': case 'scope': {
        ctx.warn('environnement tikzpicture : le dessin vectoriel TeX n’est pas compilable dans le navigateur');
        return `<div class="tex-tikz"><div class="tex-tikz-head">🎨 Figure TikZ — code source (compilation impossible hors ligne)</div><pre class="tex-verb"><code>${escHtml(inner.trim())}</code></pre></div>`;
      }
      case 'thebibliography': {
        const g = A2(inner, 0);
        const items = splitBibItems(inner.slice(g.end));
        items.forEach((it, q) => { if (it.label) ctx.labels[it.label.trim()] = String(q + 1); });
        return `<div class="tex-biblio"><h2 class="tex-h tex-h2"><span class="tex-htitle">Bibliographie</span></h2><ol class="tex-list">${items.map(it => `<li id="tex-cite-${escAttr((it.label || '').trim())}">${renderFragment(it.body, ctx)}</li>`).join('')}</ol></div>`;
      }
      case 'keywords': return `<div class="tex-keywords"><strong>Mots-clés :</strong> ${renderFragment(inner, ctx)}</div>`;
      case 'titlepage': return `<div class="tex-titlepage">${renderFragment(inner, ctx)}</div>`;
      case 'proof': case 'preuve': case 'demonstration':
        return `<div class="tex-thm tex-proof"><span class="tex-thm-name">${THEOREMS[base] || base}.</span> ${renderFragment(inner, ctx)}<span class="tex-qed">∎</span></div>`;
      default: {
        if (THEOREMS[base]) {
          stripOpt();
          const o = readOpt(inner, 0);
          let extra = '';
          if (o) { extra = o.text; inner = inner.slice(o.end); }
          ctx.thmNo = (ctx.thmNo || 0) + 1;
          ctx.lastNumber = String(ctx.thmNo);
          return `<div class="tex-thm"><span class="tex-thm-name">${THEOREMS[base]}${starred ? '' : ' ' + ctx.thmNo}${extra ? ` (${inline(extra, ctx)})` : ''}.</span> ${renderFragment(inner, ctx)}</div>`;
        }
        ctx.warn(`environnement « ${name} » non reconnu`);
        return `<div class="tex-env-unknown">${renderFragment(inner, ctx)}</div>`;
      }
    }
  }
  const A2 = (s, i) => readGroup(s, i);

  function renderTabular(inner, ctx, isLong) {
    let i = 0;
    const o = readOpt(inner, i); if (o) i = o.end;
    const spec = readGroup(inner, i);
    const cols = parseColSpec(spec.text);
    let bodySrc = inner.slice(spec.end);

    // \caption → légende (retirée du corps)
    let caption = '';
    const cap = /\\caption\s*/.exec(bodySrc);
    if (cap) { const g = readGroup(bodySrc, cap.index + cap[0].length); caption = inline(g.text, ctx); bodySrc = bodySrc.slice(0, cap.index) + bodySrc.slice(g.end); }

    bodySrc = bodySrc.replace(/\\(?:hline|toprule|midrule|bottomrule|endhead|endfirsthead|endfoot|endlastfoot)\b/g, RULE)
      .replace(/\\(?:cline|cmidrule)\s*(?:\([^)]*\))?\s*\{[^}]*\}/g, RULE)
      .replace(/\\(?:centering|small|footnotesize|scriptsize|normalfont)\b/g, '');

    const rows = splitRows(bodySrc)
      .map(r => r.trim())
      .filter(r => r && r.split(RULE).join('').trim());

    const html = rows.map((r, ri) => {
      const isHead = ri === 0 && r.includes(RULE);
      const cells = splitCells(r);
      return `<tr>${cells.map((cell, ci) => {
        let text = cell.split(RULE).join('').trim();
        const al = cols[M.min(ci, cols.length - 1)] || 'l';
        const mc = /^\\multicolumn\s*\{(\d+)\}\s*\{([^}]*)\}/.exec(text);
        let span = 1, align = al;
        if (mc) {
          span = +mc[1] || 1;
          const a = /[lcr]/.exec(mc[2]); if (a) align = a[0];
          const g = readGroup(text, mc[0].length);
          text = g.text;
        }
        const tag = isHead ? 'th' : 'td';
        return `<${tag}${span > 1 ? ` colspan="${span}"` : ''} class="tex-${alignCls(align)}">${inline(text, ctx)}</${tag}>`;
      }).join('')}</tr>`;
    }).join('');

    return `<div class="tex-tabular-wrap${isLong ? ' tex-long' : ''}">${caption ? `<div class="tex-caption">${caption}</div>` : ''}<table class="tex-tabular"><tbody>${html}</tbody></table></div>`;
  }
  const alignCls = a => ({ l: 'left', c: 'center', r: 'right' }[a] || 'left');

  function parseColSpec(spec) {
    const cols = [];
    const re = /([lcr])|([pmb])\s*\{[^}]*\}|[|@!X]/g;
    let m;
    while ((m = re.exec(spec || ''))) { if (m[1]) cols.push(m[1]); else if (m[2]) cols.push('l'); }
    return cols.length ? cols : ['l'];
  }

  /* ─────────── texte : paragraphes & titres ─────────── */
  function headingHtml(level, starred, titleTex, ctx) {
    const idx = LEVELS.indexOf(level);
    let num = '';
    if (!starred) {
      if (idx === 0) { ctx.counters.part = (ctx.counters.part || 0) + 1; num = toRoman(ctx.counters.part); }
      else if (idx === 1) { ctx.counters.chapter = (ctx.counters.chapter || 0) + 1; LEVELS.slice(2).forEach(l => ctx.counters[l] = 0); num = String(ctx.counters.chapter); }
      else {
        ctx.counters[level] = (ctx.counters[level] || 0) + 1;
        LEVELS.slice(idx + 1).forEach(l => ctx.counters[l] = 0);
        const parts = [];
        if ((ctx.counters.chapter || 0) > 0) parts.push(ctx.counters.chapter);
        for (let q = 2; q <= idx; q++) parts.push(ctx.counters[LEVELS[q]] || 0);
        if (ctx.appendix && parts.length) parts[0] = String.fromCharCode(64 + (parts[0] || 1));
        num = parts.join('.');
      }
    }
    ctx.lastNumber = num || ctx.lastNumber;
    const h = M.min(6, M.max(1, idx - 1));
    const title = inline(titleTex, ctx).trim();
    const id = 'texsec-' + ctx.sections.length;
    ctx.sections.push({ level: idx, num, title: stripTags(title), id });
    if (idx >= 2 && idx <= 4) ctx.toc.push({ level: idx - 2, num, title: stripTags(title), id });
    return `<h${h} class="tex-h tex-h${idx}" id="${id}">${num ? `<span class="tex-hnum">${num}</span>` : ''}<span class="tex-htitle">${title}</span></h${h}>`;
  }
  const toRoman = n => { const t = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]; let r = ''; t.forEach(([v, s]) => { while (n >= v) { r += s; n -= v; } }); return r; };

  function renderText(src, ctx) {
    let out = '', buf = '', i = 0;

    const flushPara = () => {
      buf.split(/\n[ \t]*\n/).forEach(chunk => {
        const t = chunk.replace(/[ \t]*\n[ \t]*/g, ' ').trim();
        if (!t) return;
        // on découpe autour des blocs (équations, verbatim…) pour ne pas les mettre dans un <p>
        const segs = t.split(new RegExp(`(${PH}[A-Z]\\d+${PH})`));
        let run = '';
        const flushRun = () => { if (run.trim()) out += `<p>${inline(run.trim(), ctx)}</p>`; run = ''; };
        segs.forEach(seg => {
          const m = new RegExp(`^${PH}([A-Z])(\\d+)${PH}$`).exec(seg);
          if (m) {
            const e = ctx.stash[m[1]][+m[2]];
            if (e && e.block) { flushRun(); out += e.html; }
            else run += seg;
            return;
          }
          run += seg;
        });
        flushRun();
      });
      buf = '';
    };

    while (i < src.length) {
      if (src[i] === '\\') {
        const rest = src.slice(i);
        let m;
        if ((m = /^\\(part|chapter|section|subsection|subsubsection|paragraph|subparagraph)(\*?)\s*(\[[^\]]*\])?\s*/.exec(rest))) {
          flushPara();
          const g = readGroup(src, i + m[0].length);
          out += headingHtml(m[1], m[2] === '*', g.text, ctx);
          i = g.end; continue;
        }
        if ((m = /^\\(maketitle|tableofcontents|appendix|newpage|clearpage|pagebreak|bigskip|medskip|smallskip|hrule|vfill|listoffigures|listoftables)\b/.exec(rest))) {
          flushPara();
          const w = m[1];
          if (w === 'maketitle') out += maketitle(ctx);
          else if (w === 'tableofcontents') { out += '<!--TEXTOC-->'; ctx.wantToc = true; }
          else if (w === 'appendix') { ctx.appendix = true; ctx.counters.section = 0; }
          else if (w === 'newpage' || w === 'clearpage' || w === 'pagebreak') out += '<hr class="tex-newpage">';
          else if (w === 'hrule') out += '<hr class="tex-rule">';
          else if (w === 'listoffigures' || w === 'listoftables') out += '';
          else out += '<div class="tex-skip"></div>';
          i += m[0].length; continue;
        }
        if ((m = /^\\(bibliographystyle|bibliography|usepackage|documentclass|input|include|addcontentsline)\b/.exec(rest))) {
          let j = i + m[0].length; const o = readOpt(src, j); if (o) j = o.end; const g = readGroup(src, j); i = g.end; continue;
        }
      }
      buf += src[i]; i++;
    }
    flushPara();
    return out;
  }

  function maketitle(ctx) {
    const t = ctx.meta.title ? inline(ctx.meta.title, ctx) : '';
    const a = ctx.meta.author ? inline(ctx.meta.author, ctx) : '';
    const rawDate = (ctx.meta.date || '').trim();
    const d = rawDate ? (/^\\today$/.test(rawDate) ? new Date().toLocaleDateString('fr-FR') : inline(rawDate, ctx)) : new Date().toLocaleDateString('fr-FR');
    return `<div class="tex-titleblock">${t ? `<h1 class="tex-title">${t}</h1>` : ''}${a ? `<div class="tex-author">${a}</div>` : ''}${d ? `<div class="tex-date">${d}</div>` : ''}</div>`;
  }

  /* ─────────── scanner ─────────── */
  function scan(src) {
    const tokens = [];
    let i = 0, buf = '';
    const flush = () => { if (buf) { tokens.push({ t: 'text', v: buf }); buf = ''; } };
    while (i < src.length) {
      if (src.startsWith('\\begin{', i)) {
        const nm = /^\\begin\{([^}]*)\}/.exec(src.slice(i));
        if (nm) {
          const env = extractEnv(src, i, nm[1]);
          flush();
          tokens.push({ t: 'env', name: nm[1], inner: env.inner });
          i = env.end; continue;
        }
      }
      buf += src[i]; i++;
    }
    flush();
    return tokens;
  }

  function renderTokens(tokens, ctx) {
    return tokens.map(tk => tk.t === 'env' ? renderEnv(tk.name, tk.inner, ctx) : renderText(tk.v, ctx)).join('');
  }

  /* ─────────── post-traitements ─────────── */
  function resolveRefs(html, ctx) {
    return html.replace(/<span class="tex-ref" data-ref="([^"]*)">\?<\/span>/g, (_, key) => {
      const k = key.replace(/&amp;/g, '&');
      const v = ctx.labels[k.trim()];
      return (v === undefined || v === '')
        ? `<span class="tex-ref tex-ref-missing" title="label « ${escAttr(k)} » introuvable">${escHtml(k)}</span>`
        : `<span class="tex-ref">${escHtml(v)}</span>`;
    });
  }

  function resolveCites(html, ctx) {
    return html.replace(/<span class="tex-cite" data-cite="([^"]*)">\[[^\]]*\]<\/span>/g, (_, keys) => {
      const list = keys.split(',').map(x => x.trim()).filter(Boolean);
      const nums = list.map(x => {
        const lab = ctx.labels[x];
        if (lab !== undefined && /^\d+$/.test(String(lab))) return lab;
        const i = ctx.cites.indexOf(x);
        return i < 0 ? x : String(i + 1);
      });
      return `<span class="tex-cite">[${nums.join(', ')}]</span>`;
    });
  }

  function buildToc(ctx) {
    if (!ctx.toc.length) return '';
    return `<nav class="tex-toc"><div class="tex-toc-title">Table des matières</div><ul>${ctx.toc.map(e =>
      `<li class="tex-toc-l${e.level}"><a href="#${e.id}">${e.num ? `<span class="tex-toc-num">${e.num}</span>` : ''}${e.title}</a></li>`).join('')}</ul></nav>`;
  }

  function footnotesHtml(ctx) {
    if (!ctx.footnotes.length) return '';
    return `<div class="tex-footnotes"><div class="tex-fn-title">Notes</div><ol>${ctx.footnotes.map((f, q) =>
      `<li id="texfn-${q + 1}">${inline(f, ctx)}</li>`).join('')}</ol></div>`;
  }

  /* ─────────── API publique ─────────── */
  function compile(src, opts = {}) {
    const ctx = {
      stash: { M: [], V: [] }, labels: {}, cites: [], footnotes: [], sections: [], toc: [],
      counters: {}, macros: {}, meta: {}, warnings: [], wantToc: false, appendix: false,
      eqNo: 0, thmNo: 0, lastNumber: null, macroDepth: 0, floatType: null, floatNum: 0,
      resolveAsset: opts.resolveAsset || null,
      warn(w) { if (this.warnings.length < 25 && !this.warnings.includes(w)) this.warnings.push(w); }
    };

    let text = String(src == null ? '' : src).replace(/\r\n?/g, '\n');
    ctx.macros = collectMacros(text);
    ctx.meta = extractMeta(text);
    text = stripComments(text);

    // corps uniquement
    let body = text;
    const b = body.indexOf('\\begin{document}');
    if (b >= 0) {
      const e = body.indexOf('\\end{document}');
      body = body.slice(b + '\\begin{document}'.length, e > b ? e : body.length);
    } else {
      body = body.replace(/^[\s\S]*?\\documentclass[^\n]*(\n|$)/, '');
    }

    body = protectVerbatim(body, ctx);
    body = expandMacros(body, ctx);        // avant la protection : macros utilisables en math
    body = protectMath(body, ctx);

    let html = renderTokens(scan(body), ctx);

    const bib = /\\begin\{thebibliography\}[\s\S]*?\\end\{thebibliography\}/.exec(text);
    if (bib && !/tex-biblio/.test(html)) html += renderEnv('thebibliography', extractEnv(bib[0], 0, 'thebibliography').inner, ctx);

    if (ctx.wantToc) html = html.replace('<!--TEXTOC-->', buildToc(ctx));
    html = resolveRefs(html, ctx);
    html = restoreAll(html, ctx);          // placeholders restants (macros, etc.)
    html += footnotesHtml(ctx);
    html = resolveRefs(html, ctx);
    html = resolveCites(html, ctx);

    if (!html.trim()) html = '<div class="tex-empty">Document vide.</div>';
    if (ctx.warnings.length) {
      html += `<details class="tex-warnings"><summary>⚠️ ${ctx.warnings.length} avertissement(s) de compilation</summary><ul>${ctx.warnings.map(w => `<li>${escHtml(w)}</li>`).join('')}</ul></details>`;
    }

    return {
      html: `<div class="tex-doc${ctx.meta.documentclass === 'beamer' ? ' tex-beamer' : ''}">${html}</div>`,
      title: stripTags(ctx.meta.title || ''),
      meta: ctx.meta, toc: ctx.toc, sections: ctx.sections,
      warnings: ctx.warnings, hasMath: /\\\(|\\\[/.test(html)
    };
  }

  // fragment rapide (aperçu d'une ligne de LaTeX dans l'éditeur)
  function fragment(tex) {
    const ctx = {
      stash: { M: [], V: [] }, labels: {}, cites: [], footnotes: [], sections: [], toc: [],
      counters: {}, macros: collectMacros(String(tex || '')), meta: {}, warnings: [],
      warn() {}, resolveAsset: null, lastNumber: null, macroDepth: 0, floatType: null, floatNum: 0
    };
    let t = protectVerbatim(String(tex || ''), ctx);
    t = expandMacros(t, ctx);
    t = protectMath(t, ctx);
    return restoreAll(resolveAll(inline(t, ctx), ctx), ctx);
  }
  const resolveAll = (html, ctx) => resolveRefs(html, ctx);

  return { compile, fragment, escHtml, escAttr, THEOREMS };
})();
