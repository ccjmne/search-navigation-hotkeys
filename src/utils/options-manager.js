'use strict';

/* globals chrome */

const defaults = { 'key:open-link': ' ', 'key:exit-current-mode': 'q', 'feature:whats-this': true, 'mode:secondary-navigation': 'kjhl' };
const pick = (keys, obj = defaults) => Object.keys(obj).filter(k => ~keys.indexOf(k)).reduce((acc, k) => Object.assign(acc, {
  [k]: obj[k]
}), {});

function get(opts = Object.keys(defaults)) {
  if (typeof chrome === 'undefined' || typeof chrome.storage === 'undefined' || typeof chrome.storage.sync === 'undefined') {
    return Promise.resolve(pick(opts));
  }

  return new Promise(resolve => chrome.storage.sync.get(pick(opts), data =>
    typeof opts === 'string' ? resolve(data[opts]) : resolve(data)
  ));
}

export { get, defaults };
