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
  const items = document.querySelectorAll('pre[lang="wavedrom"]');
  let i = 0;
  for (let el of items) {
    // console.log(el);
    const txt = el.innerText;
    // console.log(txt);
    const obj = json5.parse(txt);
    // console.log(obj);
    const ml = wavedrom.renderAny(i++, obj, wavedrom.waveSkin);
    // console.log(ml);
    const svg = wavedrom.onml.stringify(ml);
    // console.log(svg);
    const newEl = document.createElement('div');
    newEl.innerHTML = svg;
    el.parentNode.replaceChild(newEl, el);
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
