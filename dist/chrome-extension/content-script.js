!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=5)}([function(e,t,n){"use strict";n.d(t,"b",function(){return c}),n.d(t,"a",function(){return r});var r={"key:open-link":" ","key:exit-current-mode":"q","feature:whats-this":!0,"mode:secondary-navigation":"kjhl"},o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r;return Object.keys(t).filter(function(t){return~e.indexOf(t)}).reduce(function(e,n){return Object.assign(e,function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}({},n,t[n]))},{})};function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Object.keys(r);return"undefined"==typeof chrome||void 0===chrome.storage||void 0===chrome.storage.sync?Promise.resolve(o(e)):new Promise(function(t){return chrome.storage.sync.get(o(e),function(n){return t("string"==typeof e?n[e]:n)})})}},function(e,t,n){"use strict";e.exports=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=0;return function(){var r=(new Date).getTime();if(r-n>=t)return n=r,e.apply(void 0,arguments)}}},function(e,t,n){},,,function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r);function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=50,a=1e3/i,u=250,s=function(){function e(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",r=arguments.length>1&&void 0!==arguments[1]&&arguments[1],o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.promise=new Promise(function(e,n){t.resolve=e,t.reject=n}),this._all=!!r,this._s=n,this._count=0,setTimeout(function(){return t._test()||(t._=setInterval(function(){return t._test()&&clearInterval(t._)},i))},o)}return function(e,t,n){t&&c(e.prototype,t),n&&c(e,n)}(e,[{key:"_test",value:function(){if(this._all){var e=document.querySelectorAll(this._s);if(e.length>0)return this.resolve([].slice.call(e)),!0}else{var t=document.querySelector(this._s);if(t)return this.resolve(t),!0}++this._count>a&&(clearInterval(this._),this.reject("Couldn't find ".concat(this._s," after ").concat(a," tries.")))}}]),e}();function l(e){return new s(e,!0).promise}function f(e){return new s(e,!1).promise}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function h(e){var t,n=e.type,r=void 0===n?"div":n,o=e.id,c=void 0===o?"":o,i=e.classes,a=void 0===i?[]:i,u=e.contents,s=void 0===u?"":u,l=e.children,f=void 0===l?[]:l,h=e.attributes,m=void 0===h?{}:h,y=document.createElement(r);return y.id=c,(t=y.classList).add.apply(t,p(a)),y.innerHTML=s,y.detach=function(e){e.parentNode&&e.parentNode.removeChild(e)}.bind(null,y),y.pickStylesFrom=function(e,t){return Object.assign(y.style,function(e){return t.reduce(function(t,n){return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){d(e,t,n[t])})}return e}({},t,d({},n,e[n]))},{})}(window.getComputedStyle(e)))},Object.keys(m).forEach(function(e){return y.setAttribute(e,m[e])}),f.forEach(y.appendChild.bind(y)),y}var m=n(0),y=h({id:"ccjmne-snh-tooltip"});Object.assign(y,{concealTimer:null,reveal:function(e){y.parentNode!==e.target&&(clearTimeout(y.concealTimer),e.target.appendChild(y),y.concealTimer=setTimeout(y.conceal,3e3),y.animate({transform:["translate(-50%, 0) scale(0)","translate(-100%, 1em) scale(1.1)","translate(-100%, 1em) scale(1)"],offset:[0,.8]},{duration:200,easing:"ease-out",fill:"both"}))},conceal:function(){return(y.animate({transform:["translate(-100%, 1em) scale(1)","translate(-100%, 1em) scale(1.1)","translate(-100%, 1em) scale(.5)"],opacity:[1,1,0],offset:[0,.3]},{duration:200,easing:"ease-in",fill:"backwards"}).onfinish=function(){return y.parentNode&&y.parentNode.removeChild(y)})&&clearTimeout(y.concealTimer)}}),y.addEventListener("click",y.conceal);var v=h({type:"span",id:"ccjmne-snh-indicator"}),b=h({id:"ccjmne-snh-help-card",contents:'\n    <div id="ccjmne-snh-help-card-title">\n        <span>Navigation Hotkeys for Google™ Search</span>\n        <small>by&nbsp;<a href="https://github.com/ccjmne">ccjmne</a></small>\n    </div>\n    <table></table>'}),g={"..":" to ","-":"+","|":" or ","[":" [","]":"] ","w/":"add ",",":", then "},w={Up:"↑",Down:"↓",Left:"←",Right:"→",Ctrl:"⌃",Shift:"⇧",Space:"⎵",Enter:"↲",Escape:"␛"},k=b.querySelector("table");function j(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}Object(m.b)(["mode:secondary-navigation","key:open-link","key:exit-current-mode"]).then(function(e){var t=e["mode:secondary-navigation"],n=" "===e["key:open-link"]?"Space":e["key:open-link"],r=e["key:exit-current-mode"];[[{desc:"Focus [previous] result",hotkey:"Up|".concat(t.charAt(0))},{desc:"Focus [next] result",hotkey:"Down|".concat(t.charAt(1))},{desc:"Navigate to [previous] page",hotkey:"Left|".concat(t.charAt(2))},{desc:"Navigate to [next] page",hotkey:"Right|".concat(t.charAt(3))}],[{desc:"Open [focused] result",hotkey:"Enter|".concat(n)},{desc:"in [new tab]",hotkey:"w/Ctrl",indent:1},{desc:"and [follow]",hotkey:"w/Ctrl-Shift",indent:2},{desc:"Open result #[1] to #[9]",hotkey:"1..9"}],[{desc:"Focus [search] field",hotkey:"/"},{desc:"Enter [filter & sort] mode",hotkey:"Ctrl-/"}],[{desc:"Enter [switch tabs] mode",hotkey:"g"},{desc:"switch to [all]",hotkey:"g,a",indent:1},{desc:"switch to [images]",hotkey:"g,i",indent:1},{desc:"switch to [videos]",hotkey:"g,v",indent:1},{desc:"switch to [news]",hotkey:"g,n",indent:1}],[{desc:"Enter [help] mode",hotkey:"?"},{desc:"[Quit] current mode",hotkey:"Escape|".concat(r)}]].forEach(function(e){return e.forEach(function(e,t){return k.appendChild(h({type:"tr",classes:0===t?["ccjmne-snh-new-section"]:[],contents:"\n  <td>".concat(e.indent?'<div class="ccjmne-snh-indent ccjmne-snh-indent-'.concat(e.indent,'"></div>'):"").concat(e.desc.replace(/\[([^\]]+)\]/g,function(e,t){return"<em>".concat(t,"</em>")}),"</td>\n  <td>").concat(e.hotkey.split(new RegExp(function(e){return"(?=".concat(e,")|(?<=").concat(e,")")}(Object.keys(g).map(function(e){return e.replace(/./g,function(e){return"\\"+e})}).join("|")))).map(function(e){return g[e]||'<kbd class="ccjmne-snh-kbd">'.concat(e).concat(w[e]?'<span class="kbd-addon">'.concat(w[e],"</span>"):"","</kbd>")}).join(""),"</td>")}))})}),b.addEventListener("click",function(e){return e.preventDefault(),e.stopPropagation()})});var A="ccjmne-snh-restoreFocus",E=[];function O(e){var t={hook:function(){return"noop"}};e.setAttribute("tabindex",-1),e.addEventListener("blur",function(){return t.hook()}),e.addEventListener("keydown",function(n){n.srcElement.matches(["input","select","textarea"])||n.altKey||n.ctrlKey||~["Control","Meta","Alt","Shift","CapsLock","Tab","Insert","Delete","Home","End","PageUp","PageDown","ScrollLock","Pause"].concat(j(Array(12).keys()).map(function(e){return"F"+e})).indexOf(n.key)||(n.preventDefault(),n.stopPropagation(),~E.indexOf(n.key)&&(t.hook(),e.dispatchEvent(new Event(A,{bubbles:!0}))))});var n={};return Object.assign(n,{onBack:function(e){return t.hook=e,n},andFocus:function(){return e.focus(),n}})}function S(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}Object(m.b)("key:exit-current-mode").then(function(e){return E=["Escape",e,e.toUpperCase()]});var x=h({id:"ccjmne-snh-backdrop",contents:'\n    <div id="ccjmne-snh-tilt-origin">\n        <div id="ccjmne-snh-help-shadow"></div>\n        <div id="ccjmne-snh-help-card-container"></div>\n    </div>'}),L=x.querySelector("#ccjmne-snh-tilt-origin");function P(e){e&&!x.parentNode?(document.body.prepend(x),O(x).andFocus().onBack(function(){return P(!1)}),x.animate({opacity:[0,1]},{duration:200,easing:"ease-out"}),b.animate({transform:["translateY(-50%) rotateX(80deg)","translateY(2%) rotateX(0)","translateY(0)"],opacity:[0,1,1],offset:[0,.8]},{duration:300,delay:100,easing:"ease-out",fill:"backwards"})):!e&&x.parentNode&&(L.style.transform="",x.animate({opacity:[1,0]},{duration:200,easing:"ease-out"}).onfinish=x.detach,b.animate({transform:["scale(1)","scale(1.1)","scale(.5)"]},{duration:200,easing:"ease-out"}))}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,o=!1,c=void 0;try{for(var i,a=e[Symbol.iterator]();!(r=(i=a.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,c=e}finally{try{r||null==a.return||a.return()}finally{if(o)throw c}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}x.querySelector("#ccjmne-snh-help-card-container").appendChild(b),x.addEventListener("click",function(){return P(!1)}),L.addEventListener("mouseleave",function(){return L.style.transform=""}),L.addEventListener("mousemove",o()(function(e){var t=L.getBoundingClientRect(),n=t.left,r=t.top,o=t.right,c=t.bottom,i=e.clientX-(n+o)/2,a=e.clientY-(r+c)/2,u=Math.sqrt(Math.pow(i,2)+Math.pow(a,2))/Math.max(b.clientWidth,b.clientHeight);L.style.transform="rotate3d(".concat(Math.round(a),", ").concat(-Math.round(i),", 0, ").concat(10*u,"deg)")},100)),function(e){b.addEventListener("mousedown",function(){return e.down()}),b.addEventListener("mouseup",function(){return e.up()}),b.addEventListener("mouseleave",function(){return e.up()})}({isDown:!1,transform:["scale(1)","scale(.95)"],down:function(){this.isDown=this.isDown||b.animate({transform:this.transform},{duration:100,fill:"forwards",easing:"ease-out"})},up:function(){this.isDown=this.isDown&&(b.animate({transform:S(this.transform).reverse()},{duration:300,fill:"forwards",easing:"cubic-bezier(.25, 2.5, .25, .5)"}),!1)}}),v.addEventListener("mouseenter",y.reveal),y.addEventListener("click",function(){return P(!0)});var D={root:"#hdtbMenus",menus:".hdtb-mn-hd[role=button][aria-haspopup=true]",options:[".hdtb-mn-o .hdtbItm > a",".hdtb-mn-o :not(input)[tabindex]"]};function T(e){var t=document.querySelector("#hdtb-tls.hdtb-tl"),n=document.querySelector("".concat(D.root," ").concat(D.menus,".hdtb-tsel")),r=document.querySelector("".concat(D.root," .hdtb-mn-o"));t.matches(".hdtb-tl-sel")||t.click(),e&&!r?(n||document.querySelector("".concat(D.root," ").concat(D.menus))).click():!e&&r&&r.previousElementSibling.click()}function q(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function F(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,o=!1,c=void 0;try{for(var i,a=e[Symbol.iterator]();!(r=(i=a.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,c=e}finally{try{r||null==a.return||a.return()}finally{if(o)throw c}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}Promise.all([f(D.root),l("".concat(D.root," ").concat(D.menus)),Object(m.b)()]).then(function(e){var t=_(e,3),n=t[0],r=t[1],o=t[2],c=o["mode:secondary-navigation"],i=o["key:open-link"];O(n).onBack(function(){return T(!1)}),n.addEventListener("keydown",function(e){if(~["Enter","Escape",i,i.toUpperCase(),"ArrowLeft","ArrowUp","ArrowRight","ArrowDown"].concat(c.split("")).indexOf(e.key)){var t,o=n.querySelector(D.options.map(function(e){return"".concat(e,":focus")})),a=[].slice.apply(n.querySelectorAll(D.options)),u=function(e){return e?r.indexOf(e.previousElementSibling):0}(n.querySelector(".hdtb-mn-o")),s=a.indexOf(o),l=(C(t={Enter:function(){return o.click()}},i,function(){return o.click()}),C(t,i.toUpperCase(),function(){return o.click()}),C(t,"ArrowLeft",function(){return r[u>0?u-1:r.length-1].click()}),C(t,"ArrowUp",function(){return a[s>0?s-1:a.length-1].focus()}),C(t,"ArrowRight",function(){return r[(u+1)%r.length].click()}),C(t,"ArrowDown",function(){return a[(s+1)%a.length].focus()}),C(t,c.charAt(0),function(){return l.ArrowUp()}),C(t,c.charAt(1),function(){return l.ArrowDown()}),C(t,c.charAt(2),function(){return l.ArrowLeft()}),C(t,c.charAt(3),function(){return l.ArrowRight()}),t);l[e.key](),e.stopPropagation(),e.preventDefault()}})});var M=function(e){return{mainArea:e,tabs:"".concat(e," .hdtb-mitem a.q"),indicators:["".concat(e," .hdtb-mitem .ccjmne-snh-kbd"),"a[role=menuitem] .ccjmne-snh-kbd"],more:"".concat(e," .hdtb-mitem > a:not(.q)")}}("#hdtb-msb"),I={},U=I,R=h({});R.addEventListener("keydown",function(e){if(e.preventDefault(),e.stopPropagation(),void 0!==U[e.key]&&"function"==typeof U[e.key].go)return U[e.key].go();var t=Object.keys(U).filter(function(t){return t[0]===e.key}).reduce(function(e,t){return Object.assign(e,function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}({},t[1],U[t]))},{});U=0===Object.keys(t).length?I:t;var n=Object.keys(U).map(function(e){return U[e].el});l(M.indicators).then(function(e){return e.forEach(function(e){return e.style.opacity=~n.indexOf(e)?1:0})})});function K(e){Promise.all([f(M.mainArea),f(M.more),l(M.indicators)]).then(function(t){var n=F(t,3),r=n[0],o=n[1],c=n[2];e===c.some(function(e){return null===e.offsetParent})&&o.click(),e&&(U=I,R.focus(),r.scrollIntoView({block:"center",inline:"center"})),c.forEach(function(t){return t.style.opacity=e?1:0})})}function N(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function B(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}l(M.tabs).then(function(e){return e.map(function(e){return e._name=e.textContent.toLowerCase(),e}).map(function(t){return[t,e.map(function(e){return e._name}).filter(function(e){return e!==t._name})]}).map(function(e){var t=F(e,2),n=t[0],r=t[1];return[n,q(Array(n._name.length).keys()).find(function(e){return!r.some(function(t){return t.startsWith(n._name.substr(0,e))})})]}).map(function(e){var t=F(e,2),n=t[0],r=t[1];return[n,n._name.substring(0,r)]}).map(function(e){var t=F(e,2),n=t[0],r=t[1];return Object.assign(h({type:"kbd",classes:["ccjmne-snh-kbd"],contents:r,children:[]}),{menuItem:n.matches("[role=menuitem]"),name:r,tab:n})}).forEach(function(e){I[e.name]={el:e,go:function(t){return e.tab.dispatchEvent(new MouseEvent("click",t))}},e.tab.prepend(h({classes:["ccjmne-snh-tab-indicator-container"],children:[e]})),e.menuItem?(e.style.left="-10px",e.style.transform="translateX(-100%)"):(e.style.top="-2px",e.style.left="".concat((function(e){var t=getComputedStyle(e),n=parseFloat(t.paddingLeft)+parseFloat(t.paddingRight),r=parseFloat(t.borderLeftWidth)+parseFloat(t.borderRightWidth);return e.offsetWidth-n-r}(e.tab)-e.getBoundingClientRect().width)/2,"px"),e.style.transform="translateY(-100%)")})}).then(function(){return f("body")}).then(function(e){return e.append(R),O(R).onBack(function(){return K(!1)})}),n(2),Object(m.b)().then(function(e){var t=e["mode:secondary-navigation"],n=e["key:open-link"],r={restoreFocus:function(){return"noop"},"?":function(){return P(!0)},g:function(){return K(!0)}};function o(e){var o=e.filter(function(e){return!e.closest(["g-scrolling-carousel","g-accordion-expander"])}).filter(function(e){return null!==e.offsetParent});!function(e){var c;Object.assign(e,{prev:document.querySelector("a.pn#pnprev"),next:document.querySelector("a.pn#pnnext"),cur:o.length>0?0:-1,results:o.map(function(e){return{container:e.closest([".r","li.ads-ad",".ads-ad li"]),palette:e.querySelector("h3")||e.closest("h3"),link:e.closest("a")}}),go:function(t){return e.results[e.cur]&&e.results[e.cur].link.dispatchEvent(new MouseEvent("click",t))},focus:function(t){return function(e){e.link.focus(),e.container.prepend(v),e.container.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),v.animate([{transform:"translateX(-50px)"},{transform:"translateX(0)"}],{duration:100,easing:"ease-out"})}(e.results[e.cur=t])}}),e.results.forEach(function(e,t){var n=h({classes:["ccjmne-snh-number-indicator"],contents:t+1});n.pickStylesFrom(e.palette,["height","line-height"]),n.addEventListener("mouseenter",y.reveal),e.container.style.position="relative",e.container.style.overflow="visible",e.container.querySelectorAll(".ccjmne-snh-number-indicator").forEach(function(t){return e.container.removeChild(t)}),e.container.prepend(n)}),Object.assign.apply(Object,[r].concat(B(B(Array(9).keys()).map(function(t){return N({},t+1,function(n){return e.focus(t),e.go(n)})})))),Object.assign(r,(N(c={restoreFocus:function(){return e.focus(e.cur>0?e.cur:0)}},n,function(t){return e.go({ctrlKey:t.ctrlKey,shiftKey:t.shiftKey})}),N(c,n.toUpperCase(),function(t){return e.go({ctrlKey:t.ctrlKey,shiftKey:t.shiftKey})}),N(c,"ArrowLeft",function(){return e.prev&&e.prev.dispatchEvent(new MouseEvent("click"))}),N(c,"ArrowUp",function(){return e.focus(e.cur>0?e.cur-1:e.results.length-1)}),N(c,"ArrowRight",function(){return e.next&&e.next.dispatchEvent(new MouseEvent("click"))}),N(c,"ArrowDown",function(){return e.focus(++e.cur%e.results.length)}),N(c,t.charAt(0),function(){return r.ArrowUp()}),N(c,t.charAt(1),function(){return r.ArrowDown()}),N(c,t.charAt(2),function(){return r.ArrowLeft()}),N(c,t.charAt(3),function(){return r.ArrowRight()}),c))}({})}f("input.gsfi").then(function(e){e.addEventListener("blur",function(){return r.restoreFocus()});Object.assign(r,{"/":function(t){return t.ctrlKey?T(!0):Promise.resolve().then(function(){e.focus(),e.setSelectionRange(e.value.length,e.value.length)})}})}),f("body").then(function(e){return e.addEventListener(A,function(){return r.restoreFocus()})}),f("body").then(function(e){return e.addEventListener("keydown",function(e){e.srcElement.matches(["input","select","textarea"])||e.altKey||e.ctrlKey&&!~["/",n,n.toUpperCase(),"ArrowUp","ArrowDown",t[0],t[1]].indexOf(e.key)||~["Control","Meta","Alt","Shift","CapsLock","Tab","Insert","Delete","Home","End","PageUp","PageDown","ScrollLock","Pause"].concat(B(Array(12).keys()).map(function(e){return"F"+e})).indexOf(e.key)||~["ArrowLeft","ArrowUp","ArrowRight","ArrowDown"].concat(t.split("")).indexOf(e.key)&&!~[void 0,null,"","nws","vid"].indexOf(function(e){return(window.location.search.match(new RegExp("(?<=[&?]".concat(e,"=)[^&]*")))||[])[0]}("tbm"))||(!function(t){"function"==typeof t&&Promise.resolve(e.preventDefault()).then(function(){return e.stopPropagation()}).then(function(){return t(e)})}(r[e.key]),function(e){return~E.indexOf(e)}(e.key)&&r.restoreFocus())})}),l(["#search .r > a:first-of-type","#search .r g-link:first-of-type > a",".ads-ad h3 > a:not(:empty)",".ads-ad a > h3"]).then(o).then(function(){return r.restoreFocus()}).then(function(){return function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u;return new s(e,!0,t).promise}(["#search .r > a:first-of-type","#search .r g-link:first-of-type > a",".ads-ad h3 > a:not(:empty)",".ads-ad a > h3"])}).then(o)})}])});