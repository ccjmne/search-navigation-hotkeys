'use strict';

/* globals chrome */

import { defaults } from './utils/options-manager';

// resources
const form = document.querySelector('form[name=options]');
class Logger {
  constructor(element) {
    this.e = element;
  }

  log(html) {
    clearTimeout(this._);
    this.e.innerHTML = html;
    this.e.animate({ color: ['crimson', ''] }, { duration: 200 });
    this._ = setTimeout(() => this.e.innerHTML = '', 3000);
  }
}

const logger = new Logger(document.getElementById('status'));

// operations
const restore = () => new Promise(resolve => chrome.storage.sync.get(
  defaults,
  data => resolve(Object.keys(data).forEach(name => (prop => form[name][prop] = data[name])(typeof data[name] === 'boolean' ? 'checked' : 'value')))));
const reset = () => new Promise(resolve => chrome.storage.sync.clear(() => resolve(restore())));
const save = () => new Promise(resolve => chrome.storage.sync.set(
  Object.keys(defaults).map(name => [name, form[name]]).map(([name, e]) => ({
    [name]: typeof e.checked !== 'undefined' ? e.checked : e.value
  })).reduce((acc, option) => Object.assign(acc, option), {}),
  resolve
));

// linking
document.addEventListener('DOMContentLoaded', restore);
document.querySelector('#save').addEventListener('click', () => save().then(() => logger.log('Configuration saved.')));
document.querySelector('#reset').addEventListener('click', () => reset().then(() => logger.log('Configuration reset to default.')));
