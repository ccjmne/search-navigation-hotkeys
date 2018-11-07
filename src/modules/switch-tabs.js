'use strict';

import { create, onceAny, onceSome } from '../utils/module';
import { useAsRoot } from './back-to-main';

const selectors = (main => ({
  mainArea: main,
  tabs: `${ main } .hdtb-mitem a.q`,
  indicators: [`${ main } .hdtb-mitem .ccjmne-snh-kbd`, 'a[role=menuitem] .ccjmne-snh-kbd'],
  more: `${ main } .hdtb-mitem > a:not(.q)`
}))('#hdtb-msb');

const tabsMap = {};
let subTabsMap = tabsMap;

const trapFocus = create({});
trapFocus.addEventListener('keydown', e => {
  e.preventDefault();
  e.stopPropagation();
  if (typeof subTabsMap[e.key] !== 'undefined' && typeof subTabsMap[e.key].go === 'function') {
    return subTabsMap[e.key].go();
  }

  const deeper = Object.keys(subTabsMap).filter(s => s[0] === e.key).reduce((acc, k) => Object.assign(acc, {
    [k[1]]: subTabsMap[k]
  }), {});
  if (Object.keys(deeper).length === 0) {
    subTabsMap = tabsMap; // dead end, reset
  } else {
    subTabsMap = deeper; // found partial, advance
  }

  const remaining = Object.keys(subTabsMap).map(k => subTabsMap[k].el);
  onceSome(selectors.indicators).then(indicators => indicators.forEach(i => i.style.opacity = ~remaining.indexOf(i) ? 1 : 0));
});

const getContentsWidth = e => {
  const cs = getComputedStyle(e);
  const paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
  const borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
  return e.offsetWidth - paddingX - borderX;
};

export function toggleSwitchTabs(visible) {
  Promise.all([onceAny(selectors.mainArea), onceAny(selectors.more), onceSome(selectors.indicators)]).then(([mainArea, more, indicators]) => {
    if (visible === indicators.some(i => i.offsetParent === null)) {
      more.click();
    }

    if (visible) {
      subTabsMap = tabsMap;
      trapFocus.focus();
      mainArea.scrollIntoView({ block: 'center', inline: 'center' });
    }

    indicators.forEach(i => i.style.opacity = visible ? 1 : 0);
  });
}

onceSome(selectors.tabs).then(tabs => tabs
  .map(tab => (tab._name = tab.textContent.toLowerCase(), tab))
  .map(tab => [tab, tabs.map(t => t._name).filter(n => n !== tab._name)])
  .map(([tab, others]) => [tab, [...Array(tab._name.length).keys()].find(i => !others.some(o => o.startsWith(tab._name.substr(0, i))))])
  .map(([tab, length]) => [tab, tab._name.substring(0, length)])
  .map(([tab, short]) => Object.assign(create({
    type: 'kbd',
    classes: ['ccjmne-snh-kbd'],
    contents: short,
    children: [] //[create({ classes: ['kbd-addon'], contents: idx + 1 })]
  }), {
    menuItem: tab.matches('[role=menuitem]'),
    name: short,
    tab: tab
  })).forEach(indicator => {
    tabsMap[indicator.name] = ({ el: indicator, go: e => indicator.tab.dispatchEvent(new MouseEvent('click', e)) });
    indicator.tab.prepend(create({ classes: ['ccjmne-snh-tab-indicator-container'], children: [indicator] }));
    if (indicator.menuItem) {
      indicator.style.left = `-10px`;
      indicator.style.transform = 'translateX(-100%)';
    } else {
      indicator.style.top = `-2px`;
      indicator.style.left = `${ (getContentsWidth(indicator.tab) - indicator.getBoundingClientRect().width) / 2 }px`;
      indicator.style.transform = 'translateY(-100%)';
    }
  })).then(() => onceAny('body')).then(body => (body.append(trapFocus), useAsRoot(trapFocus).onBack(() => toggleSwitchTabs(false))));
