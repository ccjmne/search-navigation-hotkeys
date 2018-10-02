'use strict';

export function onceAny(selector) {
  return new Promise(resolve => {
    const _ = setInterval(() => (e => e && resolve(e) && clearInterval(_))(document.querySelector(selector)), 100);
  });
}

export function onceSome(selector) {
  return new Promise(resolve => {
    const _ = setInterval(() => (e => e.length > 0 && resolve([].slice.call(e)) && clearInterval(_))(document.querySelectorAll(selector)), 100);
  });
}
