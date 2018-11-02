'use strict';

/* globals chrome */

// resources
const form = document.querySelector('form[name=options]');
const feedback = (e => (str => e.innerHTML = str))(document.getElementById('status'));
const defaults = { 'key:open-link': ' ', 'feature:whats-this': true, 'mode:secondary-navigation': 'khjl' };

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
document.querySelector('#save').addEventListener('click', () => save().then(() => feedback('Options saved.')));
document.querySelector('#reset').addEventListener('click', () => reset().then(() => feedback('Options reset to default.')));
