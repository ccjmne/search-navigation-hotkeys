'use strict';

import { onceSome, throttle, getUrlParameter, updateUrlParameter } from './utils/module';
require('./styles/module.scss');


/*
 * Help panel
 */
const backdrop = document.createElement('div');
backdrop.id = 'ccjmne--google-search-hotkeys--backdrop';
backdrop.innerHTML = `
      <div id="ccjmne--google-search-hotkeys--tilt-origin">
          <div id="ccjmne--google-search-hotkeys--help-shadow"></div>
          <div id="ccjmne--google-search-hotkeys--help-card-container">
              <div id="ccjmne--google-search-hotkeys--help-card">
                  <div id="ccjmne--google-search-hotkeys--help-card-title"><span>Google Search Hotkeys</span><small>by&nbsp;<a href="https://github.com/ccjmne">ccjmne</a></small></div>
                  <table></table>
              </div>
          </div>
      </div>`;

const tiltOrigin = backdrop.querySelector('#ccjmne--google-search-hotkeys--tilt-origin'),
  helpCard = backdrop.querySelector('#ccjmne--google-search-hotkeys--help-card'),
  helpTable = helpCard.querySelector('table');

tiltOrigin.addEventListener('mouseleave', () => (tiltOrigin.style.transform = ``));
tiltOrigin.addEventListener('mousemove', throttle(e => {
  const { left, top, right, bottom } = tiltOrigin.getBoundingClientRect();
  const x = e.clientX - (left + right) / 2,
    y = e.clientY - (top + bottom) / 2;
  const amplitude = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) / Math.max(helpCard.clientWidth, helpCard.clientHeight);
  tiltOrigin.style.transform = `rotate3d(${ Math.round(y) }, ${ -Math.round(x) }, 0, ${ amplitude * 10 }deg)`;
}, 100));

function toggleHelp(shown) {
  if (shown && !backdrop.parentNode) {
    document.body.prepend(backdrop);
    backdrop.animate({ opacity: [0, 1] }, { duration: 200, easing: 'ease-out' });
    helpCard.animate({ transform: ['translateY(-50%) rotateX(80deg)', 'translateY(2%) rotateX(0)', 'translateY(0)'], opacity: [0, 1, 1], offset: [0, .8] }, { duration: 300, delay: 100, easing: 'ease-out', fill: 'backwards' });
  } else if (!shown && backdrop.parentNode) {
    tiltOrigin.style.transform = ``;
    backdrop.animate({ opacity: [1, 0] }, { duration: 200, easing: 'ease-out' }).onfinish = () => backdrop.parentNode.removeChild(backdrop);
    helpCard.animate({ transform: ['scale(1)', 'scale(1.1)', 'scale(.5)'] }, { duration: 200, easing: 'ease-out' });
  }
}

backdrop.addEventListener('click', () => toggleHelp(false));
helpCard.addEventListener('click', e => e.stopPropagation());

[
  [
    { desc: `Focus [next] result`, hotkey: `Down` },
    { desc: `Focus [previous] result`, hotkey: `Up` },
    { desc: `Navigate to [next] page`, hotkey: `Right` },
    { desc: `Navigate to [previous] page`, hotkey: `Left` }
  ],
  [
    { desc: `[Open] focused`, hotkey: `Space|Enter` },
    { desc: `[Open] focused in [new tab]`, hotkey: `Ctrl-[Space|Enter]` },
    { desc: `Open #[1] to #[9]`, hotkey: `1..9` },
    { desc: `Open #[1] to #[9] in [new tab]`, hotkey: `Ctrl-[1..9]` }
  ],
  [
    { desc: `Focus [search] field`, hotkey: `/` },
    { desc: `Search [all]`, hotkey: `a` },
    { desc: `Search [videos]`, hotkey: `v` },
    { desc: `Search [images]`, hotkey: `i` },
    { desc: `Search [news]`, hotkey: `n` }
  ],
  [
    { desc: `[Show] help`, hotkey: `Shift-?` },
    { desc: `[Close] help`, hotkey: `Escape` }
  ]
].forEach(block => block.forEach((op, idx) => {
  const helpItem = document.createElement('tr');
  helpTable.appendChild(helpItem);
  helpItem.innerHTML = `
          <td>${ op.desc.replace(/\[([^\]]+)\]/g, (unused, d) => `<em>${ d }</em>`) }</td>
          <td><kbd>${op.hotkey.replace(/[[\]+|-]|\.\./g, s => `</kbd>${ { '..': ' to ', '-': '+', '|': ' or ', '[': ' [', ']': '] ' }[s] }<kbd>`)}</kbd></td>`;
  if (idx === 0) {
    helpItem.classList.add('ccjmne--google-search-hotkeys--new-section');
  }
}));

/*
 * Main code
 */
const indicator = document.createElement('span');
indicator.id = 'ccjmne--google-search-hotkeys--indicator';
indicator.innerHTML = '▶';

const tooltip = document.createElement('div');
tooltip.id = 'ccjmne--google-search-hotkeys--tooltip';
Object.assign(tooltip, {
  concealTimer: null,
  reveal: e => {
    if (tooltip.parentNode !== e.target) {
      clearTimeout(tooltip.concealTimer);
      e.target.appendChild(tooltip);
      tooltip.concealTimer = setTimeout(tooltip.conceal, 3000);
      tooltip.animate({
        transform: ['translate(-50%, 0) scale(0)', 'translate(-100%, 1em) scale(1.1)', 'translate(-100%, 1em) scale(1)'],
        offset: [0, .8]
      }, { duration: 200, easing: 'ease-out', fill: 'both' });
    }
  },
  conceal: () => (tooltip.animate({
    transform: ['translate(-100%, 1em) scale(1)', 'translate(-100%, 1em) scale(1.1)', 'translate(-100%, 1em) scale(.5)'],
    opacity: [1, 1, 0],
    offset: [0, .3]
  }, { duration: 200, easing: 'ease-in', fill: 'backwards' }).onfinish = () => tooltip.parentNode && tooltip.parentNode.removeChild(tooltip)) && clearTimeout(tooltip.concealTimer)
});

tooltip.addEventListener('click', () => {
  tooltip.conceal();
  toggleHelp(true);
});
indicator.addEventListener('mouseenter', tooltip.reveal);

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
   * Don't mess with typing into the Search field, or w/ Ctrl and Shift keys, unless:
   *   Ctrl-Space                   (32)
   *   Ctrl-Shift-Space             (32)
   *   Ctrl-ArrowUp                 (38)      -> to allow browsing up while maintainting Ctrl and/or Shift
   *   Ctrl-ArrowDown               (40)      -> to allow browsing down while maintainting Ctrl and/or Shift
   *   Ctrl-[1..9]                  (49..57)
   *   Ctrl-[Numpad1..Numpad9]      (97..105)
   *   Shift-?                      (191)
   */
  if (e.srcElement === document.querySelector('input[title=Search]') ||
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
onceSome('#main a > h3:first-child, #main h3 > a:first-child').then((function (nodes) {
  Object.assign(this, {
    cur: nodes.length > 0 ? 0 : -1,
    results: [].map.call(nodes, x => ({ container: x.parentNode.parentNode, link: x.closest('a') })),
    go: e => this.results[this.cur] && this.results[this.cur].link.dispatchEvent(new MouseEvent('click', e)),
    focus: idx => (this.cur = idx) === -1 ? (input => {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
      if (indicator.parentNode) { indicator.parentNode.removeChild(indicator); }
    })(document.querySelector('input[title=Search]')) : (result => {
      result.link.focus();
      result.container.prepend(indicator);
      result.container.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      indicator.animate([{ transform: 'translateX(-50px)' }, { transform: 'translateX(0)' }], { duration: 100, easing: 'ease-out' });
    })(this.results[idx])
  });

  this.results.forEach((result, idx) => {
    Object.assign(result.container.style, { position: 'relative', overflow: 'visible' });
    const numberIndicator = document.createElement('div');
    numberIndicator.classList.add('ccjmne--google-search-hotkeys--number-indicator');
    numberIndicator.innerHTML = idx + 1;
    numberIndicator.addEventListener('mouseenter', tooltip.reveal);
    result.container.prepend(numberIndicator);
  });

  this.focus(this.cur);

  // 1 through 9 on the bar and on the numpad -> follow corresponding result
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
      /* slash   -> search input
       * shift-? -> show help       */
      e => e.shiftKey ? toggleHelp(true) : this.focus(-1),
    37: /* left    -> previous page   */ () => window.location.replace(updateUrlParameter('start', Math.max(parseInt(getUrlParameter('start') || '0') - this.results.length, 0))),
    38: /* up      -> previous result */ () => this.focus(this.cur > 0 ? this.cur - 1 : this.results.length - 1),
    39: /* right   -> next page       */ () => window.location.replace(updateUrlParameter('start', parseInt(getUrlParameter('start') || '0') + this.results.length)),
    40: /* down    -> next result     */ () => this.focus(++this.cur % this.results.length)
  });
}).bind({}));
