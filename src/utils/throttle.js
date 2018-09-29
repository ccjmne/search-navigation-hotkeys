'use strict';

module.exports = function throttle(fn, delay = 0) {
  let lastCall = 0;

  return function (...args) {
    const now = (new Date()).getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      return fn(...args);
    }
  };
};
