'use strict';

import { create, throttle } from '../utils/module';
import { helpCard } from './help-card';

const backdrop = create({ id: 'ccjmne--google-search-hotkeys--backdrop', contents: `
    <div id="ccjmne--google-search-hotkeys--tilt-origin">
        <div id="ccjmne--google-search-hotkeys--help-shadow"></div>
        <div id="ccjmne--google-search-hotkeys--help-card-container"></div>
    </div>` }),
  tiltOrigin = backdrop.querySelector('#ccjmne--google-search-hotkeys--tilt-origin');

export function toggleHelp(visible) {
  if (visible && !backdrop.parentNode) {
    document.body.prepend(backdrop);
    backdrop.animate({ opacity: [0, 1] }, { duration: 200, easing: 'ease-out' });
    helpCard.animate({ transform: ['translateY(-50%) rotateX(80deg)', 'translateY(2%) rotateX(0)', 'translateY(0)'], opacity: [0, 1, 1], offset: [0, .8] }, { duration: 300, delay: 100, easing: 'ease-out', fill: 'backwards' });
  } else if (!visible && backdrop.parentNode) {
    tiltOrigin.style.transform = ``;
    backdrop.animate({ opacity: [1, 0] }, { duration: 200, easing: 'ease-out' }).onfinish = backdrop.detach;
    helpCard.animate({ transform: ['scale(1)', 'scale(1.1)', 'scale(.5)'] }, { duration: 200, easing: 'ease-out' });
  }
}

backdrop.querySelector('#ccjmne--google-search-hotkeys--help-card-container').appendChild(helpCard);
backdrop.addEventListener('click', () => toggleHelp(false));

tiltOrigin.addEventListener('mouseleave', () => (tiltOrigin.style.transform = ``));
tiltOrigin.addEventListener('mousemove', throttle(e => {
  const { left, top, right, bottom } = tiltOrigin.getBoundingClientRect();
  const x = e.clientX - (left + right) / 2,
    y = e.clientY - (top + bottom) / 2;
  const amplitude = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) / Math.max(helpCard.clientWidth, helpCard.clientHeight);
  tiltOrigin.style.transform = `rotate3d(${ Math.round(y) }, ${ -Math.round(x) }, 0, ${ amplitude * 10 }deg)`;
}, 100));

(click => {
  helpCard.addEventListener('mousedown', () => click.down());
  helpCard.addEventListener('mouseup', () => click.up());
  helpCard.addEventListener('mouseleave', () => click.up());
})({
  isDown: false,
  transform: ['scale(1)', 'scale(.95)'],
  down: function () { this.isDown = this.isDown || helpCard.animate({ transform: this.transform }, { duration: 100, fill: 'forwards', easing: 'ease-out' }); },
  up: function () { this.isDown = this.isDown && (helpCard.animate({ transform: [...this.transform].reverse() }, { duration: 300, fill: 'forwards', easing: 'cubic-bezier(.25, 2.5, .25, .5)' }), false); }
});
