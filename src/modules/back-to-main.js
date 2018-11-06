'use strict';

const backEventName = 'ccjmne-snh-restoreFocus';
const keys = ['Escape', 'q', 'Q'];

export { backEventName as cameBack };

export function isBackKey(key) {
  return ~keys.indexOf(key);
}

export function useAsRoot(root) {
  const self = { hook: () => 'noop' };
  root.setAttribute('tabindex', -1);
  root.addEventListener('blur', () => self.hook());
  root.addEventListener('keydown', e => {
    /**
     * Don't mess with:
     * - typing into any input-able element,
     * - Alt-empowered combinations
     * - Ctrl-empowered combinations
     **/
    if (e.srcElement.matches(['input', 'select', 'textarea']) || e.altKey || e.ctrlKey) {
      return;
    }

    // Don't react to meta keys 'keydown'
    if (~['Control', 'Meta', 'Alt', 'Shift', 'CapsLock', 'Tab', 'Insert', 'Delete', 'Home', 'End', 'PageUp', 'PageDown', 'ScrollLock', 'Pause']
      .concat([...Array(12).keys()].map(i => 'F' + i)).indexOf(e.key)) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    if (~keys.indexOf(e.key)) {
      self.hook();
      root.dispatchEvent(new Event(backEventName, { bubbles: true }));
    }
  });

  const lib = {};
  return Object.assign(lib, { onBack: hook => (self.hook = hook, lib), andFocus: () => (root.focus(), lib) });
}
