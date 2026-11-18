// Pages HTML du Drive (js/06_drive_store.js) : kind « html », publication en
// « .html.txt » (jamais exécuté par GitHub Pages), manifeste cohérent.
// Lancer depuis la racine du dépôt : node --test tests/*.cjs
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'js/06_drive_store.js'), 'utf8');

function loadStore() {
  const LSMap = new Map();
  const sandbox = {
    console,
    Date, JSON, Math, Array, Object, String, Number, Set, Map, RegExp, Error, Promise, Blob,
    M: Math,
    LS: {
      getItem: k => (LSMap.has(k) ? LSMap.get(k) : null),
      setItem: (k, v) => LSMap.set(k, String(v)),
      removeItem: k => LSMap.delete(k)
    },
    localStorage: {
      getItem: k => (LSMap.has(k) ? LSMap.get(k) : null),
      setItem: (k, v) => LSMap.set(k, String(v)),
      removeItem: k => LSMap.delete(k)
    },
    indexedDB: {
      open: () => ({ result: { objectStoreNames: { contains: () => true }, transaction: () => ({ objectStore: () => ({ put() {}, get: () => ({}) }) }) } })
    },
    fetch: async () => { throw new Error('offline'); },
    TextDecoder, Uint8Array, btoa: s => Buffer.from(s, 'binary').toString('base64')
  };
  vm.createContext(sandbox);
  vm.runInContext(SRC + '\n;globalThis.__DriveStore = DriveStore;', sandbox);
  return sandbox.__DriveStore;
}

const MANIFEST = {
  v: 1,
  rev: 1700000000000,
  generatedAt: 1700000000000,
  repo: 'englishPV/englishPV.github.io',
  branch: 'main',
  drives: [{ id: 'drv-1', slug: 'exemple-41se', title: 'Anglais divers', emoji: '💂', createdAt: 1700000000000, order: 10 }],
  files: [
    {
      id: 'fil-html-1', driveId: 'drv-1', parentId: null,
      name: 'Test QCM.html', kind: 'html', mime: 'text/html', size: 1234,
      addedAt: 1700000000000, updatedAt: 1700000000000, publishedAt: 1700000000000,
      path: 'content/drive/exemple-41se/Test QCM.html.txt', by: 'admin@example.com'
    },
    {
      id: 'fil-txt-1', driveId: 'drv-1', parentId: null,
      name: 'notes.txt', kind: 'text', mime: 'text/plain', size: 12,
      addedAt: 1700000000000, updatedAt: 1700000000000, publishedAt: 1700000000000,
      path: 'content/drive/exemple-41se/notes.txt', by: 'admin@example.com'
    }
  ]
};

test('kindOf : les pages HTML ont leur propre type', () => {
  const S = loadStore();
  assert.strictEqual(S.kindOf('fiche.html'), 'html');
  assert.strictEqual(S.kindOf('fiche.htm'), 'html');
  assert.strictEqual(S.kindOf('Test QCM démo.html.txt'), 'html'); // nom de publication
  assert.strictEqual(S.kindOf('fiche', 'text/html'), 'html');
  assert.strictEqual(S.isTextKind('html'), true);
});

test('kindOf : les autres types ne bougent pas', () => {
  const S = loadStore();
  assert.strictEqual(S.kindOf('notes.txt'), 'text');
  assert.strictEqual(S.kindOf('doc.pdf'), 'pdf');
  assert.strictEqual(S.kindOf('cours.md'), 'markdown');
  assert.strictEqual(S.kindOf('devoir.tex'), 'latex');
  assert.strictEqual(S.kindOf('style.css'), 'text');
  assert.strictEqual(S.kindOf('image.png'), 'image');
});

test('refreshPaths : une page HTML est publiée en « .html.txt »', () => {
  const S = loadStore();
  S.applyManifest(JSON.parse(JSON.stringify(MANIFEST)));
  S.refreshPaths();
  const html = S.liveNodes().find(n => n.id === 'fil-html-1');
  const txt = S.liveNodes().find(n => n.id === 'fil-txt-1');
  assert.strictEqual(html.path, 'content/drive/exemple-41se/Test QCM.html.txt');
  assert.strictEqual(txt.path, 'content/drive/exemple-41se/notes.txt');
});

test('buildManifest : le type html et le chemin .html.txt sont publiés tels quels', () => {
  const S = loadStore();
  S.applyManifest(JSON.parse(JSON.stringify(MANIFEST)));
  const m = S.buildManifest();
  const html = m.files.find(f => f.id === 'fil-html-1');
  assert.strictEqual(html.kind, 'html');
  assert.strictEqual(html.mime, 'text/html');
  assert.strictEqual(html.path, 'content/drive/exemple-41se/Test QCM.html.txt');
  const txt = m.files.find(f => f.id === 'fil-txt-1');
  assert.strictEqual(txt.kind, 'text');
  assert.strictEqual(txt.path, 'content/drive/exemple-41se/notes.txt');
});

test('rename : renommer sans extension conserve .html et le type', () => {
  const S = loadStore();
  S.applyManifest(JSON.parse(JSON.stringify(MANIFEST)));
  const n = S.rename('fil-html-1', 'Nouveau nom');
  assert.strictEqual(n.name, 'Nouveau nom.html');
  assert.strictEqual(n.kind, 'html');
  S.refreshPaths();
  assert.strictEqual(n.path, 'content/drive/exemple-41se/Nouveau nom.html.txt');
});
