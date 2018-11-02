'use strict';

import { onceAny, onceSome, getOpts } from '../utils/module';

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

Promise.all([onceAny(selectors.root), onceSome(`${ selectors.root } ${ selectors.menus }`), getOpts()]).then(([root, menus, options]) => {
  const udlr = options['mode:secondary-navigation'];
  const open = options['key:open-link'];
  root.addEventListener('keydown', e => {
    if (~['?', '/', 'Escape'].indexOf(e.key)) {
      // Bypass e.stopPropagation()
      return toggleFilter(false);
    }

    if (~['Enter', 'Escape', open, open.toUpperCase(), 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].concat(udlr.split('')).indexOf(e.key)) {
      const focused = root.querySelector(selectors.options.map(s => `${ s }:focus`)),
        options = [].slice.apply(root.querySelectorAll(selectors.options)),
        curMenu = (openedMenu => openedMenu ? menus.indexOf(openedMenu.previousElementSibling) : 0)(root.querySelector(`.hdtb-mn-o`)),
        cur = options.indexOf(focused);

      const opsMap = {
        'Enter':              () => focused.click(),
        [open]:               () => focused.click(),
        [open.toUpperCase()]: () => focused.click(),
        'ArrowLeft':          () => menus[curMenu > 0 ? curMenu - 1 : menus.length - 1].click(),
        'ArrowUp':            () => options[(cur > 0 ? cur - 1 : options.length - 1)].focus(),
        'ArrowRight':         () => menus[(curMenu + 1) % menus.length].click(),
        'ArrowDown':          () => options[(cur + 1) % options.length].focus(), // jshint -W069
        [udlr.charAt(0)]:     () => opsMap['ArrowUp'](),
        [udlr.charAt(1)]:     () => opsMap['ArrowDown'](),
        [udlr.charAt(2)]:     () => opsMap['ArrowLeft'](),
        [udlr.charAt(3)]:     () => opsMap['ArrowRight']() // jshint +W069
      };
      opsMap[e.key]();

      e.stopPropagation();
      e.preventDefault();
    }
  });
});
