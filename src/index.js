'use strict';

import { create, onceAny, onceSome, getUrlParameter, updateUrlParameter } from './utils/module';
import { tooltip, indicator, toggleHelp } from './elements/module';
import { toggleFilter } from './modules/filter-and-sort';
require('./styles/module.scss');

onceAny('input.gsfi').then(searchField => {
  const focusSearchFiels = () => Promise.resolve().then(() => {
    searchField.focus();
    searchField.setSelectionRange(searchField.value.length, searchField.value.length);
  });

  const opsMap = {
    restoreFocus: () => 'noop', // not yet available
    'Escape': /*  -> close help   */ () => (toggleHelp(false), opsMap.restoreFocus()),
    '?': /*       -> show help    */ () => toggleHelp(true),
    'a': /*       -> 'All' tab    */ () => (window.location.href = updateUrlParameter('tbm', '')),
    'i': /*       -> 'Images' tab */ () => (window.location.href = updateUrlParameter('tbm', 'isch')),
    'm': /*       -> 'Maps' tab   */ () => null, // TODO: impl
    'n': /*       -> 'Vews' tab   */ () => (window.location.href = updateUrlParameter('tbm', 'nws')),
    'v': /*       -> 'Videos' tab */ () => (window.location.href = updateUrlParameter('tbm', 'vid')),
    '/':
      /* w/o Ctrl -> focus search input
       * w/ Ctrl  -> enter filter-and-sort mode */
      e => e.ctrlKey ? toggleFilter(true) : focusSearchFiels()
  };

  searchField.addEventListener('blur', () => opsMap.restoreFocus());

  document.body.onkeydown = (e => {
    /**
     * Don't mess with:
     * - typing into any input-able element,
     * - Alt-empowered combinations
     * - Ctrl-empowered combinations we don't control ('/', ' ', 'ArrowUp', 'ArrowDown', 'j', 'k')
     **/
    if (e.srcElement.matches(['input', 'select', 'textarea']) || e.altKey || (e.ctrlKey && !~['/', ' ', 'ArrowUp', 'ArrowDown', 'j', 'k'].indexOf(e.key))) {
      return;
    }

    // Results browsing only supported on 'All', 'Videos' and 'News' tabs
    if (~['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'h', 'j', 'k', 'l'].indexOf(e.key) && !~[undefined, null, '', 'nws', 'vid'].indexOf(getUrlParameter('tbm'))) {
      return;
    }

    // TODO: have another ops map for non-results browsing (i.e.: switch tabs, show help, focus search, toggle filter/sort mode...)
    (op => typeof op === 'function' && Promise.resolve(op(e)).then(() => (e.preventDefault(), e.stopPropagation())))(opsMap[e.key]);
  });

  // Once results are listed, additionally handle browsing them
  onceSome(['#search .r > a:first-of-type', '#search .r g-link:first-of-type > a', '.ads-ad h3 > a:not(:empty)', '.ads-ad a > h3']) // #res h3, .ads-ad h3 maybe?
    .then(nodes => nodes.filter(e => !e.closest(['g-scrolling-carousel', 'g-accordion-expander']))) // exclude carousel and 'people also ask' results
    .then(nodes => nodes.filter(e => e.offsetParent !== null)) // exclude invisible elements – e.g.: ads hidden by an ad-blocker (see https://stackoverflow.com/a/21696585)
    .then((function (nodes) {
      Object.assign(this, {
        prev: document.querySelector('a.pn#pnprev'),
        next: document.querySelector('a.pn#pnnext'),
        cur: nodes.length > 0 ? 0 : -1,
        results: nodes.map(x => ({ container: x.closest(['.r', 'li.ads-ad', '.ads-ad li']), palette: x.querySelector('h3') || x.closest('h3'), link: x.closest('a') })),
        go: e => this.results[this.cur] && this.results[this.cur].link.dispatchEvent(new MouseEvent('click', e)),
        focus: idx => (this.cur = idx) === -1 ? focusSearchFiels().then(indicator.detach) : (result => {
          result.link.focus();
          result.container.prepend(indicator);
          result.container.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
          indicator.animate([{ transform: 'translateX(-50px)' }, { transform: 'translateX(0)' }], { duration: 100, easing: 'ease-out' });
        })(this.results[idx])
      });

      this.results.forEach((result, idx) => {
        const numberIndicator = create({ classes: ['ccjmne-snh-number-indicator'], contents: idx + 1 });
        numberIndicator.pickStylesFrom(result.palette, ['height', 'line-height']);
        numberIndicator.addEventListener('mouseenter', tooltip.reveal);
        result.container.prepend(numberIndicator);
      });

      this.focus(this.cur);

      // 1 through 9 on the numbers row and/or on the numeric pad -> follow corresponding result
      Object.assign(opsMap, ...[...Array(9).keys()].map(idx => ({
        [idx + 1]: e => (this.focus(idx), this.go(e))
      })));
      Object.assign(opsMap, {
        'restoreFocus': () => this.focus(this.cur > 0 ? this.cur : 0),
        ' ': /*          -> follow focused  */ e => this.go({ ctrlKey: e.ctrlKey, shiftKey: e.shiftKey }),
        'ArrowLeft': /*  -> previous page   */ () => this.prev && this.prev.dispatchEvent(new MouseEvent('click')),
        'ArrowUp': /*    -> previous result */ () => this.focus(this.cur > 0 ? this.cur - 1 : this.results.length - 1),
        'ArrowRight': /* -> next page       */ () => this.next && this.next.dispatchEvent(new MouseEvent('click')),
        'ArrowDown': /*  -> next result     */ () => this.focus(++this.cur % this.results.length), // jshint -W069
        'h': /*          -> previous page   */ () => opsMap['ArrowLeft'](),
        'j': /*          -> next result     */ () => opsMap['ArrowDown'](),
        'k': /*          -> previous result */ () => opsMap['ArrowUp'](),
        'l': /*          -> next page       */ () => opsMap['ArrowRight']() // jshint +W069
      });
    }).bind({}));
});
