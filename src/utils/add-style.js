'use strict';

module.exports = function addStyle(css) {
  (sheet => sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length))((document.getElementById('GM_addStyleBy8626') || (function () {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'GM_addStyleBy8626';
    document.head.appendChild(style);

    return style;
  })()).sheet);
};
