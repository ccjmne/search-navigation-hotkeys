'use strict';

const interval = 50;
const maxTries = 1000 / interval;

class Once {
  constructor(selector = '', selectAll = false) {
    this.all = !!selectAll;
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });

    this._s = selector;
    this._count = 0;
    return this._test() || (this._ = setInterval(() => (res => res && clearInterval(this._))(this._test()), interval));
  }

  _test() {
    if (this.all) {
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

export function onceAny(selector) {
  return new Once(selector, false).promise;
}
