'use strict';

export function detach(element) {
  if (element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

export function create({ type = 'div', id = '', classes = [], contents = '' }) {
  const e = document.createElement(type);
  e.id = id;
  e.classList.add(...classes);
  e.innerHTML = contents;
  e.detach = detach.bind(e, e);
  return e;
}
