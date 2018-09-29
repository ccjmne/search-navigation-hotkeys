'use strict';

// https://stackoverflow.com/a/6021027
function updateUrlParameter(key, value) {
  return (uri => {
    var i = uri.indexOf('#');
    var hash = i === -1 ? '' : uri.substr(i);
    uri = i === -1 ? uri : uri.substr(0, i);

    var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
    var separator = uri.indexOf('?') !== -1 ? '&' : '?';
    if (uri.match(re)) {
      uri = uri.replace(re, '$1' + key + '=' + value + '$2');
    } else {
      uri = uri + separator + key + '=' + value;
    }

    return uri + hash;
  })(window.location.href);
}

function getUrlParameter(key) {
  return (window.location.search.match(new RegExp(`(?<=[&?]${key}=)[^&]*`)) || [])[0];
}

export { updateUrlParameter, getUrlParameter };
