'use strict';

import { create, getOpts } from '../utils/module';

const tooltip = create({ id: 'ccjmne-snh-tooltip' });

export const $tooltip = getOpts('feature:whats-this').then(enabled => Object.assign(tooltip, {
  concealTimer: null,
  reveal: e => {
    if (enabled && tooltip.parentNode !== e.target) {
      clearTimeout(tooltip.concealTimer);
      e.target.appendChild(tooltip);
      tooltip.concealTimer = setTimeout(tooltip.conceal, 3000);
      tooltip.animate({
        transform: ['translate(-50%, 0) scale(0)', 'translate(-100%, 1em) scale(1.1)', 'translate(-100%, 1em) scale(1)'],
        offset: [0, .8]
      }, { duration: 200, easing: 'ease-out', fill: 'both' });
    }
  },
  conceal: () => (tooltip.animate({
    transform: ['translate(-100%, 1em) scale(1)', 'translate(-100%, 1em) scale(1.1)', 'translate(-100%, 1em) scale(.5)'],
    opacity: [1, 1, 0],
    offset: [0, .3]
  }, { duration: 200, easing: 'ease-in', fill: 'backwards' }).onfinish = () => tooltip.parentNode && tooltip.parentNode.removeChild(tooltip)) && clearTimeout(tooltip.concealTimer)
}));

$tooltip.then(t => t.addEventListener('click', t.conceal));
