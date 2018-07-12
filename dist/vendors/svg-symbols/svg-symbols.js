// Load and insert svg-symbols.svg
(function () {
  'use strict';
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 400) {
      document.body.insertAdjacentHTML('afterbegin', xhr.responseText);
    }
  };
  xhr.open('GET', 'img/svg-symbols.svg', true);
  xhr.send();
})();