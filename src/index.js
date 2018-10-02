'use strict';

import { create, onceSome, getUrlParameter, updateUrlParameter } from './utils/module';
import { tooltip, indicator, toggleHelp } from './elements/module';
require('./styles/module.scss');

const opsMap = {
  27: /* Escape -> close help   */ () => toggleHelp(false),
  65: /* a      -> 'All' tab    */ () => (window.location.href = updateUrlParameter('tbm', '')),
  73: /* i      -> 'Images' tab */ () => (window.location.href = updateUrlParameter('tbm', 'isch')),
  77: /* m      -> 'Maps' tab   */ () => null, // TODO: impl
  78: /* n      -> 'Vews' tab   */ () => (window.location.href = updateUrlParameter('tbm', 'nws')),
  86: /* v      -> 'Videos' tab */ () => (window.location.href = updateUrlParameter('tbm', 'vid'))
};

document.body.onkeydown = (e => {
  /*
   * Don't mess with typing into any input-able element; with Alt key; or w/ Ctrl and Shift keys, unless:
   *   Ctrl-Space                   (32)
   *   Ctrl-Shift-Space             (32)
   *   Ctrl-ArrowUp                 (38)      -> to allow browsing up while maintainting Ctrl and/or Shift
   *   Ctrl-ArrowDown               (40)      -> to allow browsing down while maintainting Ctrl and/or Shift
   *   Ctrl-[1..9]                  (49..57)
   *   Ctrl-[Numpad1..Numpad9]      (97..105)
   *   Shift-?                      (191)
   */
  if (e.srcElement.matches(['input', 'select', 'textarea']) || e.altKey ||
    (e.shiftKey && !~[32, 38, 40, 191].indexOf(e.keyCode)) ||
    (e.ctrlKey && !~[32, 38, 40].concat([...Array(9).keys()].map(x => 49 + x)).concat([...Array(9).keys()].map(x => 97 + x)).indexOf(e.keyCode))) {
    return;
  }

  // Results browsing only supported on 'All', 'Videos' and 'News' tabs
  if (~([37, 38, 39, 40].indexOf(e.keyCode)) && !~([undefined, null, '', 'nws', 'vid'].indexOf(getUrlParameter('tbm')))) {
    return;
  }

  (op => typeof op === 'function' && Promise.resolve(op(e)).then(() => e.preventDefault()))(opsMap[e.keyCode]);
});

// Once results are listed, additionally handle browsing them
onceSome(['#search .r > a', '#search .r > g-link > a', '.ads-ad h3 > a:not(:empty)', '.ads-ad a > h3'])
  .then(nodes => nodes.filter(x => !x.closest('g-scrolling-carousel'))) // exclude carousel results
  .then((function (nodes) {
    Object.assign(this, {
      prev: document.querySelector('a.pn#pnprev'),
      next: document.querySelector('a.pn#pnnext'),
      cur: nodes.length > 0 ? 0 : -1,
      results: nodes.map(x => ({ container: x.querySelector('h3') || x.closest('h3'), link: x.closest('a') })),
      go: e => this.results[this.cur] && this.results[this.cur].link.dispatchEvent(new MouseEvent('click', e)),
      focus: idx => (this.cur = idx) === -1 ? (input => {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
        indicator.detach();
      })(document.querySelector('input[title=Search]')) : (result => {
        result.link.focus();
        result.container.prepend(indicator);
        result.container.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        indicator.animate([{ transform: 'translateX(-50px)' }, { transform: 'translateX(0)' }], { duration: 100, easing: 'ease-out' });
      })(this.results[idx])
    });

    this.results.forEach((result, idx) => {
      Object.assign(result.container.style, { position: 'relative', overflow: 'visible' });
      const numberIndicator = create({ classes: ['ccjmne--google-search-hotkeys--number-indicator'], contents: idx + 1 });
      numberIndicator.addEventListener('mouseenter', tooltip.reveal);
      result.container.prepend(numberIndicator);
    });

    this.focus(this.cur);

    // 1 through 9 on the numbers row and/or on the numeric pad -> follow corresponding result
    [...Array(9).keys()].forEach(x => (op => Object.assign(opsMap, {
      [49 + x]: op,
      [97 + x]: op
    }))(e => {
      this.focus(x);
      this.go(e);
    }));
    Object.assign(opsMap, {
      32: /* space   -> follow focused  */ e => this.go({ ctrlKey: e.ctrlKey, shiftKey: e.shiftKey }),
      191:
        /* slash     -> search input
         * shift-?   -> show help       */
        e => e.shiftKey ? toggleHelp(true) : this.focus(-1),
      37: /* left    -> previous page   */ () => this.prev && this.prev.dispatchEvent(new MouseEvent('click')),
      38: /* up      -> previous result */ () => this.focus(this.cur > 0 ? this.cur - 1 : this.results.length - 1),
      39: /* right   -> next page       */ () => this.next && this.next.dispatchEvent(new MouseEvent('click')),
      40: /* down    -> next result     */ () => this.focus(++this.cur % this.results.length)
    });
  }).bind({}));
