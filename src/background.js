'use strict';

/* globals chrome */

const tabs = {
  'i': { label: '📷 images', tbm: 'isch' },
  'v': { label: '🎞️ videos', tbm: 'vid' },
  'n': { label: '📰 news', tbm: 'nws' },
  'a': { label: 'all', tbm: '' }
};

const pattern = new RegExp(`^(?:([${ Object.keys(tabs).join('') }]):\\s*)+(.*)$`, 'i');
const parse = s => (([matched, type, query]) => ({
  matched: !!matched,
  type: matched && type.toLowerCase(),
  query: (matched ? query : s).trim()
}))(s.match(pattern) || []);

const dim = s => `<dim>${ s }</dim>`,
  match = s => `<match>${ s }</match>`,
  url = s => `<url>${ s }</url>`; // jshint ignore:line

chrome.omnibox.onInputChanged.addListener((s, suggest) => {
  const { matched, type, query } = parse(s);
  chrome.omnibox.setDefaultSuggestion({ description: (matched ? dim('Search ') + tabs[type].label : dim('Navigate directly to ') + 'the 🥇 first result') + (query ? ' for ' + match(query) : matched ? '' : ' for your search') });
  if (matched ? query : query.length >= 2) { // 2 is the minimum string length for `s` to be a match
    suggest(Object.keys(tabs).filter(t => t !== type).map(t => ({
      content: `${ t }: ${ query }`,
      description: dim('Search ') + tabs[t].label + dim(' for ') + match(query)
    })));
  } else {
    suggest([]);
  }
});

chrome.omnibox.onInputEntered.addListener(s => {
  const { matched, type, query } = parse(s);
  if (matched) {
    return chrome.tabs.update(null, { url: `https://www.google.com/search?q=${ encodeURIComponent(query) }&tbm=${ tabs[type].tbm }` });
  }

  chrome.tabs.update(null, { url: `https://www.google.com/search?q=${ encodeURIComponent(s) }&btnI` });
});
