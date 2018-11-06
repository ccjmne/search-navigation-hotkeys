'use strict';

import { create, getOpts } from '../utils/module';

export const helpCard = create({ id: 'ccjmne-snh-help-card', contents: `
    <div id="ccjmne-snh-help-card-title">
        <span>Navigation Hotkeys for Google™ Search</span>
        <small>by&nbsp;<a href="https://github.com/ccjmne">ccjmne</a></small>
    </div>
    <table></table>` });

const metaChars = { '..': ' to ', '-': '+', '|': ' or ', '[': ' [', ']': '] ', 'w/': 'add ', ',': ', then ' };
const addons = { Up: '↑', Down: '↓', Left: '←', Right: '→', Ctrl: '⌃', Shift: '⇧', Space: '⎵', Enter: '↲', Escape: '␛' };

const table = helpCard.querySelector('table');

getOpts(['mode:secondary-navigation', 'key:open-link']).then(options => {
  const udlr = options['mode:secondary-navigation'];
  const open = options['key:open-link'] === ' ' ? 'Space' : options['key:open-link'];

  [
    [
      { desc: `Focus [previous] result`, hotkey: `Up|${ udlr.charAt(0) }` },
      { desc: `Focus [next] result`, hotkey: `Down|${ udlr.charAt(1) }` },
      { desc: `Navigate to [previous] page`, hotkey: `Left|${ udlr.charAt(2) }` },
      { desc: `Navigate to [next] page`, hotkey: `Right|${ udlr.charAt(3) }` }
    ],
    [
      { desc: `Open [focused] result`, hotkey: `Enter|${ open }` },
      { desc: `in [new tab]`, hotkey: `w/Ctrl`, indent: 1 },
      { desc: `and [follow]`, hotkey: `w/Ctrl-Shift`, indent: 2 },
      { desc: `Open result #[1] to #[9]`, hotkey: `1..9` }
    ],
    [
      { desc: `Focus [search] field`, hotkey: `/` },
      { desc: `Enter [filter & sort] mode`, hotkey: `Ctrl-/` }
    ],
    [
      { desc: `Enter [switch tabs] mode`, hotkey: 'g' },
      // TODO: extract following from DOM contents
      { desc: `switch to [all]`, hotkey: `g,a`, indent: 1 },
      { desc: `switch to [images]`, hotkey: `g,i`, indent: 1 },
      { desc: `switch to [videos]`, hotkey: `g,v`, indent: 1 },
      { desc: `switch to [news]`, hotkey: `g,n`, indent: 1 }
    ],
    [
      { desc: `Enter [help] mode`, hotkey: `?` },
      { desc: `[Quit] current mode`, hotkey: `Escape|q` }
    ]
  ].forEach(block => block.forEach((op, idx) => table.appendChild(create({ type: 'tr', classes: idx === 0 ? ['ccjmne-snh-new-section'] : [], contents: `
  <td>${ op.indent ? `<div class="ccjmne-snh-indent ccjmne-snh-indent-${ op.indent }"></div>` : '' }${ op.desc.replace(/\[([^\]]+)\]/g, (unused, d) => `<em>${ d }</em>`) }</td>
  <td>${ op.hotkey
    /* tokenise  */.split(new RegExp((s => `(?=${ s })|(?<=${ s })`)(Object.keys(metaChars).map(k => k.replace(/./g, c => '\\' + c)).join('|'))))
    /* transform */.map(s => metaChars[s] || `<kbd class="ccjmne-snh-kbd">${ s }${ addons[s] ? `<span class="kbd-addon">${ addons[s] }</span>` : '' }</kbd>`)
    /* wrap up   */.join('') }</td>` }))));

  helpCard.addEventListener('click', e => (e.preventDefault(), e.stopPropagation()));
});
