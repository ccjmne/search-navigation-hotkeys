'use strict';

import { create } from '../utils/module';

export const helpCard = create({ id: 'ccjmne-snh-help-card', contents: `
    <div id="ccjmne-snh-help-card-title">
        <span>Navigation Hotkeys for Google™ Search</span>
        <small>by&nbsp;<a href="https://github.com/ccjmne">ccjmne</a></small>
    </div>
    <table></table>` });

const metaChars = { '..': ' to ', '-': '+', '|': ' or ', '[': ' [', ']': '] ', 'w/': 'add ' };
const addons = { Up: '↑', Down: '↓', Left: '←', Right: '→', Ctrl: '⌃', Shift: '⇧', Space: '⎵', Enter: '↲', Escape: '␛' };

const table = helpCard.querySelector('table');

[
  [
    { desc: `Focus [previous] result`, hotkey: `Up|k` },
    { desc: `Focus [next] result`, hotkey: `Down|j` },
    { desc: `Navigate to [previous] page`, hotkey: `Left|h` },
    { desc: `Navigate to [next] page`, hotkey: `Right|l` }
  ],
  [
    { desc: `Open [focused] result`, hotkey: `Space|Enter` },
    { desc: `in [new tab]`, hotkey: `w/Ctrl`, indent: 1 },
    { desc: `and [follow]`, hotkey: `w/Ctrl-Shift`, indent: 2 },
    { desc: `Open result #[1] to #[9]`, hotkey: `1..9` }
  ],
  [
    { desc: `Focus [search] field`, hotkey: `/` },
    { desc: `Enter [filter & sort] mode`, hotkey: `Ctrl-/` }
  ],
  [
    { desc: `Search [all]`, hotkey: `a` },
    { desc: `Search [videos]`, hotkey: `v` },
    { desc: `Search [images]`, hotkey: `i` },
    { desc: `Search [news]`, hotkey: `n` }
  ],
  [
    { desc: `[Show] help`, hotkey: `?` },
    { desc: `[Close] help`, hotkey: `Escape` }
  ]
].forEach(block => block.forEach((op, idx) => table.appendChild(create({ type: 'tr', classes: idx === 0 ? ['ccjmne-snh-new-section'] : [], contents: `
    <td>${ op.indent ? `<div class="ccjmne-snh-indent ccjmne-snh-indent-${ op.indent }"></div>` : '' }${ op.desc.replace(/\[([^\]]+)\]/g, (unused, d) => `<em>${ d }</em>`) }</td>
    <td>${ op.hotkey
      /* tokenise  */.split(new RegExp((s => `(?=${ s })|(?<=${ s })`)(Object.keys(metaChars).map(k => k.replace(/./g, c => '\\' + c)).join('|'))))
      /* transform */.map(s => metaChars[s] || `<kbd>${ s }${ addons[s] ? `<span class="kbd-addon">${ addons[s] }</span>` : '' }</kbd>`)
      /* wrap up   */.join('') }</td>` }))));

helpCard.addEventListener('click', e => e.stopPropagation());
