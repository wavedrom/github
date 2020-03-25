'use strict';

module.exports = function getSettings(defaults) {
  return new Promise((res, rej) => {
    chrome.storage.sync.get(defaults, options => {
      if (chrome.runtime.lastError) {
        rej(chrome.runtime.lastError);
        return;
      }
      res(options);
    });
  });
};

/* global chrome */
