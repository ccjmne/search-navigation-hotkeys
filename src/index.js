'use strict';

import { create, onceAny, onceSome, onceMore, getUrlParameter, getOpts } from './utils/module';
import { tooltip, indicator, toggleHelp } from './elements/module';
import { cameBack, isBackKey } from './modules/back-to-main';
import { toggleFilter } from './modules/filter-and-sort';
import { toggleSwitchTabs } from './modules/switch-tabs';
require('./styles/module.scss');

getOpts().then(options => {
  const udlr = options['mode:secondary-navigation'];
  const open = options['key:open-link'];
  const opsMap = {
    restoreFocus: () => 'noop', // not yet available
    '?': /*       -> show help              */ () => toggleHelp(true),
    'g': /*       -> enter switch-tabs mode */ () => toggleSwitchTabs(true)
  };

  onceAny('input.gsfi').then(searchField => {
    searchField.addEventListener('blur', () => opsMap.restoreFocus());
    const focusSearchFields = () => Promise.resolve().then(() => {
      searchField.focus();
      searchField.setSelectionRange(searchField.value.length, searchField.value.length);
    });

    Object.assign(opsMap, {
      '/':
        /* w/o Ctrl -> focus search input
         * w/ Ctrl  -> enter filter-and-sort mode */
        e => e.ctrlKey ? toggleFilter(true) : focusSearchFields()
    });
  });

  onceAny('body').then(body => body.addEventListener(cameBack, () => opsMap.restoreFocus()));
  onceAny('body').then(body => body.addEventListener('keydown', e => {
    /**
     * Don't mess with:
     * - typing into any input-able element,
     * - Alt-empowered combinations
     * - Ctrl-empowered combinations other than those we control ('/', ' ', 'ArrowUp', 'ArrowDown', 'j', 'k')
     **/
    if (e.srcElement.matches(['input', 'select', 'textarea']) || e.altKey || (e.ctrlKey && !~['/', open, open.toUpperCase(), 'ArrowUp', 'ArrowDown', udlr[0], udlr[1]].indexOf(e.key))) {
      return;
    }

    // Don't react to meta keys 'keydown'
    if (~['Control', 'Meta', 'Alt', 'Shift', 'CapsLock', 'Tab', 'Insert', 'Delete', 'Home', 'End', 'PageUp', 'PageDown', 'ScrollLock', 'Pause']
      .concat([...Array(12).keys()].map(i => 'F' + i)).indexOf(e.key)) {
      return;
    }

    // Results browsing only supported on 'All', 'Videos' and 'News' tabs
    if (~['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].concat(udlr.split('')).indexOf(e.key) && !~[undefined, null, '', 'nws', 'vid'].indexOf(getUrlParameter('tbm'))) {
      return;
    }

    (op => typeof op === 'function' && Promise.resolve(e.preventDefault()).then(() => e.stopPropagation()).then(() => op(e)))(opsMap[e.key]);

    if (isBackKey(e.key)) {
      opsMap.restoreFocus();
    }
  }));

  function init(nodes) {
    const elements = nodes
      .filter(e => !e.closest(['g-scrolling-carousel', 'g-accordion-expander'])) // exclude carousel and 'people also ask' results
      .filter(e => e.offsetParent !== null); // exclude invisible elements – e.g.: ads hidden by an ad-blocker (see https://stackoverflow.com/a/21696585)

    (function (self) {
      Object.assign(self, {
        prev: document.querySelector('a.pn#pnprev'),
        next: document.querySelector('a.pn#pnnext'),
        cur: elements.length > 0 ? 0 : -1,
        results: elements.map(x => ({ container: x.closest(['.r', 'li.ads-ad', '.ads-ad li']), palette: x.querySelector('h3') || x.closest('h3'), link: x.closest('a') })),
        go: e => self.results[self.cur] && self.results[self.cur].link.dispatchEvent(new MouseEvent('click', e)),
        focus: idx => (result => {
          result.link.focus();
          result.container.prepend(indicator);
          result.container.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
          indicator.animate([{ transform: 'translateX(-50px)' }, { transform: 'translateX(0)' }], { duration: 100, easing: 'ease-out' });
        })(self.results[self.cur = idx])
      });

      self.results.forEach((result, idx) => {
        const numberIndicator = create({ classes: ['ccjmne-snh-number-indicator'], contents: idx + 1 });
        numberIndicator.pickStylesFrom(result.palette, ['height', 'line-height']);
        numberIndicator.addEventListener('mouseenter', e => tooltip.reveal(e));
        result.container.style.position = 'relative';
        result.container.style.overflow = 'visible';
        result.container.querySelectorAll('.ccjmne-snh-number-indicator').forEach(e => result.container.removeChild(e));
        result.container.prepend(numberIndicator);
      });

      // 1 through 9 on the numbers row and/or on the numeric pad -> follow corresponding result
      Object.assign(opsMap, ...[...Array(9).keys()].map(idx => ({
        [idx + 1]: e => (self.focus(idx), self.go(e))
      })));
      Object.assign(opsMap, {
        'restoreFocus': () => self.focus(self.cur > 0 ? self.cur : 0),
        [open]: /*               -> follow focused  */ e => self.go({ ctrlKey: e.ctrlKey, shiftKey: e.shiftKey }),
        [open.toUpperCase()]: /* -> follow focused  */ e => self.go({ ctrlKey: e.ctrlKey, shiftKey: e.shiftKey }),
        'ArrowLeft': /*          -> previous page   */ () => self.prev && self.prev.dispatchEvent(new MouseEvent('click')),
        'ArrowUp': /*            -> previous result */ () => self.focus(self.cur > 0 ? self.cur - 1 : self.results.length - 1),
        'ArrowRight': /*         -> next page       */ () => self.next && self.next.dispatchEvent(new MouseEvent('click')),
        'ArrowDown': /*          -> next result     */ () => self.focus(++self.cur % self.results.length), // jshint -W069
        [udlr.charAt(0)]: /*     -> previous result */ () => opsMap['ArrowUp'](),
        [udlr.charAt(1)]: /*     -> next result     */ () => opsMap['ArrowDown'](),
        [udlr.charAt(2)]: /*     -> previous page   */ () => opsMap['ArrowLeft'](),
        [udlr.charAt(3)]: /*     -> next page       */ () => opsMap['ArrowRight']() // jshint +W069
      });
    })({});
  }

  // Once results are listed, additionally handle browsing them
  onceSome(['#search .r > a:first-of-type', '#search .r g-link:first-of-type > a', '.ads-ad h3 > a:not(:empty)', '.ads-ad a > h3']) // #res h3, .ads-ad h3 maybe?
    .then(init) // ASAP, init w/ first results available
    .then(() => opsMap.restoreFocus())
    .then(() => onceMore(['#search .r > a:first-of-type', '#search .r g-link:first-of-type > a', '.ads-ad h3 > a:not(:empty)', '.ads-ad a > h3']))
    .then(init); // 2nd pass, w/ potentially more results loaded shortly after the page was ready
});
