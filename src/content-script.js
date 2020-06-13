'use strict';

const getSettings = require('./get-settings.js');
const optionsSchema = require('./options-schema.js');
const json5 = require('json5');
const wavedrom = require('wavedrom');

const defaultSettings = Object.keys(optionsSchema).reduce((agg, key) => {
  agg[key] = optionsSchema[key].defaultVal;
  return agg;
}, {});

const onChange = (/*event*/) => {
  // console.log(event);
  const items = document.querySelectorAll('pre:not([wavedrom])');
  let i = 0;
  for (let el of items) {
    const txt = el.innerText;
    try {
      const obj = json5.parse(txt);
      // console.log(obj);
      const ml = wavedrom.renderAny(i++, obj, wavedrom.waveSkin);
      if (ml[0] === 'svg') {
        const svg = wavedrom.onml.stringify(ml);
        // console.log(svg);
        const newEl = document.createElement('div');
        newEl.innerHTML = svg;
        const detailsEl = document.createElement('details');

        const wrapEl = document.createElement('div');
        wrapEl.appendChild(newEl);
        wrapEl.appendChild(detailsEl);
        el.parentNode.replaceChild(wrapEl, el);
        el.setAttribute('wavedrom', 1);
        // console.log(el);
        detailsEl.appendChild(el);
      }
    } catch (err) {
      el.setAttribute('wavedrom', 0);
      // console.log('+');
    }
  }
};

getSettings(defaultSettings).then((/*settings*/) => {
  // console.log(settings);
  onChange();

  // ['DOMContentLoaded']
  //   .map(e => document.addEventListener(e, onChange));
  //
  // ['DOMContentLoaded', 'load', 'pjax:success', 'submit']
  //   .map(e => window.addEventListener(e, onChange));

  const observer = new MutationObserver(onChange);
  observer.observe(document.body, { attributes: true, childList: true, subtree: true });

}).catch(err => {
  console.error('An error occurred with WaveDrom. Please report an issue on GitHub');
  console.error(err);
});

/* eslint-env browser */
