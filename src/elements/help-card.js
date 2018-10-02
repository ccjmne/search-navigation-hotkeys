'use strict';

import { create } from '../utils/module';

export const helpCard = create({ id: 'ccjmne--google-search-hotkeys--help-card', contents: `
    <div id="ccjmne--google-search-hotkeys--help-card-title">
        <span>Google Search Hotkeys</span>
        <small>by&nbsp;<a href="https://github.com/ccjmne">ccjmne</a></small>
    </div>
    <table></table>` });

const table = helpCard.querySelector('table');

[
  [
    { desc: `Focus [previous] result`, hotkey: `Up|j` },
    { desc: `Focus [next] result`, hotkey: `Down|k` },
    { desc: `Navigate to [previous] page`, hotkey: `Left|h` },
    { desc: `Navigate to [next] page`, hotkey: `Right|l` }
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
    { desc: `Enter [filter/sort] mode`, hotkey: `Ctrl-/` },
    { desc: `[Show] help`, hotkey: `Shift-?` },
    { desc: `[Close] help`, hotkey: `Escape` }
  ]
].forEach(block => block.forEach((op, idx) => table.appendChild(create({ type: 'tr', classes: idx === 0 ? ['ccjmne--google-search-hotkeys--new-section'] : [], contents: `
    <td>${ op.desc.replace(/\[([^\]]+)\]/g, (unused, d) => `<em>${ d }</em>`) }</td>
    <td><kbd>${op.hotkey.replace(/[[\]+|-]|\.\./g, s => `</kbd>${ { '..': ' to ', '-': '+', '|': ' or ', '[': ' [', ']': '] ' }[s] }<kbd>`)}</kbd></td>` }))));

helpCard.addEventListener('click', e => e.stopPropagation());
