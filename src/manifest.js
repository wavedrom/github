'use strict';

const pkg = require('../package.json');

const manifest = {
  name: 'WaveDrom',
  version: pkg.version,
  description: pkg.description,
  manifest_version: 3,
  homepage_url: 'https://wavedrom.com',
  permissions: ['storage'],
  options_ui: {
    page: 'options.html',
    open_in_tab: true
  },
  browser_specific_settings: {
    gecko: {
      id: '{5e76c1cd-894e-42d8-be16-884430d7898a}'
    }
  },
  content_scripts: [{
    matches: ['https://*.gitlab.com/*'],
    js: ['content-script.js'],
    run_at: 'document_idle'
  }, {
    matches: ['https://*.github.com/*'],
    js: ['content-script.js'],
    run_at: 'document_idle'
  }, {
    matches: ['https://*.ieee.org/*'],
    js: ['content-script.js'],
    run_at: 'document_idle'
  }]
};

manifest.icons = [16, 32, 48, 128].reduce((res, size) => {
  res[size] = 'icon-' + size + '.png';
  return res;
}, {});

console.log(JSON.stringify(manifest, null, 2));

/* eslint camelcase: 0 */
