// Vérifie que le lecteur peut accéder au module HTML via window.DriveHtml.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'js/16_drive_html.js'), 'utf8');

test('le module HTML est exposé sur window pour le lecteur du Drive', () => {
  const window = { addEventListener() {} };
  const sandbox = { window, document: {} };

  vm.createContext(sandbox);
  vm.runInContext(SRC, sandbox);

  assert.ok(window.DriveHtml, 'window.DriveHtml doit être défini après le chargement du script');
  assert.equal(typeof window.DriveHtml.mount, 'function');
  assert.equal(typeof window.DriveHtml.buildDoc, 'function');
  assert.equal(typeof window.DriveHtml.exportPdf, 'function');
});
