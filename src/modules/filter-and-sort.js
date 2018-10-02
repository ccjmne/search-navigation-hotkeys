'use strict';

import { onceAny, onceSome } from '../utils/module';

const selectors = { root: '#hdtbMenus', menus: '.hdtb-mn-hd[role=button][aria-haspopup=true]', options: ['.hdtb-mn-o .hdtbItm > a', '.hdtb-mn-o :not(input)[tabindex]'] };

export function toggleFilter(visible) {
  const tools = document.querySelector('#hdtb-tls.hdtb-tl'),
    activeFilter = document.querySelector(`${ selectors.root } ${ selectors.menus }.hdtb-tsel`),
    openedMenu = document.querySelector(`${ selectors.root } .hdtb-mn-o`);

  if (!tools.matches('.hdtb-tl-sel')) {
    tools.click();
  }

  if (visible && !openedMenu) {
    (activeFilter || document.querySelector(`${ selectors.root } ${ selectors.menus }`)).click();
  } else if (!visible && openedMenu) {
    openedMenu.previousElementSibling.click();
  }
}

Promise.all([onceAny(selectors.root), onceSome(`${ selectors.root } ${ selectors.menus }`)]).then(([root, menus]) => {
  root.addEventListener('keydown', e => {
    if (e.which === 191) {
      toggleFilter(false);
      if (e.ctrlKey) {
        // Don't stop propagation for slash (focus search field) and shift-? (show help)
        e.stopPropagation();
      }
    }

    if (~[13, 27, 32, 37, 38, 39, 40, 72, 74, 75, 76].indexOf(e.which)) {
      const focused = root.querySelector(selectors.options.map(s => `${ s }:focus`)),
        options = [].slice.apply(root.querySelectorAll(selectors.options)),
        curMenu = (openedMenu => openedMenu ? menus.indexOf(openedMenu.previousElementSibling) : 0)(root.querySelector(`.hdtb-mn-o`)),
        cur = options.indexOf(focused);

      ({
        13: /* enter  */ () => focused.click(),
        27: /* escape */ () => toggleFilter(false),
        32: /* space  */ () => focused.click(),
        37: /* left   */ () => menus[curMenu > 0 ? curMenu - 1 : menus.length - 1].click(),
        38: /* up     */ () => options[(cur > 0 ? cur - 1 : options.length - 1)].focus(),
        39: /* right  */ () => menus[(curMenu + 1) % menus.length].click(),
        40: /* down   */ () => options[(cur + 1) % options.length].focus(),
        72: /* h      */ () => menus[curMenu > 0 ? curMenu - 1 : menus.length - 1].click(),
        74: /* j      */ () => options[(cur > 0 ? cur - 1 : options.length - 1)].focus(),
        75: /* k      */ () => options[(cur + 1) % options.length].focus(),
        76: /* l      */ () => menus[(curMenu + 1) % menus.length].click()
      })[e.which]();

      e.stopPropagation();
      e.preventDefault();
    }
  });
});
