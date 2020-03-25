'use strict';

const getSettings = require('./get-settings.js');
const optionsSchema = require('./options-schema.js');
const json5 = require('json5');
const wavedrom = require('wavedrom');

const defaultSettings = Object.keys(optionsSchema).reduce((agg, key) => {
  agg[key] = optionsSchema[key].defaultVal;
  return agg;
}, {});

getSettings(defaultSettings).then(settings => {
  console.log(settings);
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
}).catch(err => {
  console.error('An error occurred with WaveDrom. Please report an issue on GitHub');
  console.error(err);
});
module.exports = {};

/* eslint-env browser */
