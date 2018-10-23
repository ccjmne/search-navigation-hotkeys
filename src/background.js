'use strict';

// jshint -W117
chrome.omnibox.onInputEntered.addListener(s =>
  chrome.tabs.update(null, { url: `https://www.google.com/search?q=${ encodeURIComponent(s) }&btnI` })
);
