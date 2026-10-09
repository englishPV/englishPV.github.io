// Vue « Mon Drive » (js/13_perso_drive.js) : états affichés véridiques après connexion.
// Exécute le vrai module dans un contexte vm, avec un DOM minimal et des stubs Google / fetch.
// Lancer depuis la racine du dépôt : node --test tests/*.cjs
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'js/13_perso_drive.js'), 'utf8');
const ICONS = fs.readFileSync(path.join(ROOT, 'js/00_icons.js'), 'utf8');

// Stubs des globaux fournis par les autres fichiers (js/02, js/03, js/05).
const STUBS = `
  var data = { app: { prefs: {} }, subjects: [] };
  var State = { view: 'pdrive' };
  var saveData = function () {};
  var toast = function () {};
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); };
  var fmtBytes = function (n) { return n + ' o'; };
  var D = document, W = window, LS = localStorage, M = Math;
  var $ = function (s, p) { return (p || D).querySelector(s); };
  var $$ = function (s, p) { return Array.from((p || D).querySelectorAll(s)); };
  var MediaLib = undefined, FireSync = undefined;
`;

function makeEnv({ email, stored }) {
  const els = {};
  const fakeEl = () => ({
    innerHTML: '', textContent: '', value: '', hidden: false, disabled: false, dataset: {},
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    style: {}, addEventListener() {}, removeEventListener() {},
    querySelector() { return null; }, querySelectorAll() { return []; }, appendChild() {}, remove() {},
  });
  const LSMap = new Map();
  const sandbox = {
    console, setTimeout, clearTimeout, Promise, JSON, Math, Date, Array, Object, String, Number, Set, Map, RegExp, Error,
    localStorage: {
      getItem: k => (LSMap.has(k) ? LSMap.get(k) : null),
      setItem: (k, v) => LSMap.set(k, String(v)),
      removeItem: k => LSMap.delete(k),
    },
    document: {
      createElement: () => fakeEl(),
      querySelector: sel => (els[sel] = els[sel] || fakeEl()),
      querySelectorAll: () => [],
      getElementById: id => (els['#' + id] = els['#' + id] || fakeEl()),
      addEventListener() {}, removeEventListener() {},
      body: fakeEl(), documentElement: fakeEl(),
    },
    fetch: async (url) => {
      if (String(url).includes('/about')) return { ok: true, status: 200, json: async () => ({ user: { emailAddress: email } }) };
      return { ok: true, status: 200, json: async () => ({}) };
    },
    google: { accounts: { oauth2: { initTokenClient: (o) => ({ requestAccessToken: () => o.callback({ access_token: 'tok-test', expires_in: 3600 }) }) } } },
  };
  sandbox.window = sandbox;
  sandbox.localStorage.setItem('pv_pdrive_client_id', '123456-abc.apps.googleusercontent.com');
  vm.createContext(sandbox);
  vm.runInContext(STUBS + '\n;\n' + ICONS + '\n;\n' + SRC + '\n;', sandbox);
  sandbox.data.app.pDrive = stored;
  sandbox.__els = els;
  return sandbox;
}

// Connecte puis affiche la vue ; renvoie le HTML rendu dans #view.
async function connectAndView(opts) {
  const env = makeEnv(opts);
  await env.PDrive.connect();
  env.State.view = 'pdrive';
  env.PDrive.view();
  return env.__els['#view'].innerHTML + env.__els['#pdList'].innerHTML;
}

const FILE = { id: 'f1', name: 'cours.pdf', mime: 'application/pdf', size: 10, modifiedTime: '2026-10-01T10:00:00Z', isImage: false, isFolder: false, link: '' };

test('Drive connecté, jamais synchronisé : « Liste non chargée », pas « vide »', async () => {
  const html = await connectAndView({ email: 'me@example.com', stored: { email: '', folderId: '', files: [], syncedAt: 0 } });
  assert.ok(html.includes('Liste non chargée'), 'libellé de statut attendu');
  assert.ok(!html.includes('Ton Drive est vide ici'), 'la liste n\'a pas été chargée : « vide » serait faux');
});

test('Drive connecté et synchronisé sans fichier : « Ton Drive est vide ici »', async () => {
  const html = await connectAndView({ email: 'me@example.com', stored: { email: 'me@example.com', folderId: 'x', files: [], syncedAt: Date.now() } });
  assert.ok(html.includes('Ton Drive est vide ici'));
  assert.ok(!html.includes('Liste non chargée'));
});

test('Drive connecté avec fichiers en cache : la liste s\'affiche, sans état vide', async () => {
  const html = await connectAndView({ email: 'me@example.com', stored: { email: 'me@example.com', folderId: 'x', files: [FILE], syncedAt: Date.now() } });
  assert.ok(html.includes('cours.pdf'));
  assert.ok(!html.includes('Ton Drive est vide ici'));
  assert.ok(!html.includes('Liste non chargée'));
});

test('Changement de compte : la liste de l\'ancien compte n\'est plus présentée comme synchronisée', async () => {
  const env = makeEnv({ email: 'new@example.com', stored: { email: 'old@example.com', folderId: 'x', files: [FILE], syncedAt: 5 } });
  await env.PDrive.connect();
  assert.strictEqual(env.data.app.pDrive.files.length, 0, 'fichiers de l\'ancien compte retirés');
  assert.strictEqual(env.data.app.pDrive.syncedAt, 0, 'marqué non synchronisé pour le nouveau compte');
  env.State.view = 'pdrive';
  env.PDrive.view();
  assert.ok(env.__els['#view'].innerHTML.includes('Liste non chargée'));
});
