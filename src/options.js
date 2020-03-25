'use strict';

const getSettings = require('./get-settings.js');
const optionsSchema = require('./options-schema.js');

function saveSettings(settings) {
  return new Promise((res, rej) => {
    chrome.storage.sync.set(settings, () => {
      if (chrome.runtime.lastError) {
        rej(chrome.runtime.lastError);
        return;
      }
      res();
    });
  });
}

const KEY_ATTR = 'data-key';

const markupGenerators = {
  bool: (key, value, descrip) => (`
    <label>
      <input
        type="checkbox"
        ${KEY_ATTR}="${key}"
        ${value ? 'checked': ''}
      />
      ${descrip}
    </label>
  `),
  string: (key, value, descrip) => (`
    ${descrip}
    <div>
      <input type="text" value="${value}" ${KEY_ATTR}="${key}" />
    </div>
  `)
};

getSettings().then(settings => {
  function getValue(key, defVal) {
    return settings.hasOwnProperty(key) ? settings[key] : defVal;
  }

  function generateOptionsMarkup(options) {
    return Object.keys(options).map(key => {
      const { type, descrip, defaultVal } = options[key];
      const markup = markupGenerators[type](key, getValue(key, defaultVal), descrip);

      return `<li>${markup}</li>`;
    }).join('');
  }

  document.querySelector('.options-list').innerHTML = generateOptionsMarkup(optionsSchema);
});

document.querySelector('.save-btn').addEventListener('click', () => {
  const inputs = document.querySelectorAll(`[${KEY_ATTR}]`);

  const settings = Array.from(inputs).reduce((settings, input) => {
    const key = input.getAttribute(KEY_ATTR);
    const value = input.type === 'text' ? input.value : input.checked;

    settings[key] = value;
    return settings;
  }, {});

  saveSettings(settings);
});

/* eslint-env browser */
/* global chrome */
