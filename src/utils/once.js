'use strict';

module.exports = function onceSome(selector) {
  return new Promise(resolve => {
    const _ = setInterval(() => {
      if (document.querySelectorAll(selector).length > 0) {
        clearInterval(_);
        resolve(document.querySelectorAll(selector));
      }
    }, 100);
  });
};
