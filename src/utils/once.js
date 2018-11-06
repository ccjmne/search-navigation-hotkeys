'use strict';

const maxDuration = 1000;

const interval = 50;
const maxTries = maxDuration / interval;
const moreDelay = maxDuration / 4;

class Once {
  constructor(selector = '', selectAll = false, delay = 0) {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });

    this._all = !!selectAll;
    this._s = selector;
    this._count = 0;
    return setTimeout(() => this._test() || (this._ = setInterval(() => (res => res && clearInterval(this._))(this._test()), interval)), delay);
  }

  _test() {
    if (this._all) {
      const res = document.querySelectorAll(this._s);
      if (res.length > 0) {
        return this.resolve([].slice.call(res)), true;
      }
    } else {
      const res = document.querySelector(this._s);
      if (res) {
        return this.resolve(res), true;
      }
    }

    if ((++this._count) > maxTries) {
      clearInterval(this._);
      this.reject(`Couldn't find ${ this._s } after ${ maxTries } tries.`);
    }
  }
}

export function onceSome(selector) {
  return new Once(selector, true).promise;
}

export function onceMore(selector, delay = moreDelay) {
  return new Once(selector, true, delay).promise;
}

export function onceAny(selector) {
  return new Once(selector, false).promise;
}
