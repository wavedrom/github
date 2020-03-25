'use strict';

const pkg = require('../package.json');

const manifest = {
  name: 'WaveDrom',
  version: pkg.version,
  description: pkg.description,
  manifest_version: 2,
  permissions: ['storage'],
  options_page: 'options.html',
  options_ui: {
    page: 'options.html',
    chrome_style: true
  },
  content_scripts: [{
    matches: ['*://github.com/*'],
    js: ['content-script.js'],
    run_at: 'document_idle'
  }],
  web_accessible_resources: [
    'pagenav-listener.js'
  ]
};

console.log(JSON.stringify(manifest, null, 4));
