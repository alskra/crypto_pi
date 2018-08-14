/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _header = __webpack_require__(3);

var _header2 = _interopRequireDefault(_header);

var _carousel = __webpack_require__(4);

var _carousel2 = _interopRequireDefault(_carousel);

var _faqItem = __webpack_require__(5);

var _faqItem2 = _interopRequireDefault(_faqItem);

var _popup = __webpack_require__(6);

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {
  (0, _header2.default)();
  (0, _carousel2.default)();
  (0, _faqItem2.default)();
  (0, _popup2.default)();
  window.popupOpen = _popup2.default.popupOpen;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = header;


var scrollTopCurrent = pageYOffset <= 0 ? 0 : pageYOffset;

header.init = function () {
  onScroll();
};

header.bindUIActions = function () {
  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', onScroll);
  document.addEventListener('click', togglePanel);
};

function header() {
  header.init();
  header.bindUIActions();
}

function onScroll() {
  var header = document.querySelector('.header'),
      vw = window.innerWidth;

  if (header) {
    if (pageYOffset > 0) {
      header.classList.add('header--fixed');
    } else {
      header.classList.remove('header--fixed');
    }

    if (vw < 960 && pageYOffset > scrollTopCurrent) {
      header.style.visibility = 'hidden';
    } else {
      header.style.visibility = '';
    }
  }

  scrollTopCurrent = pageYOffset <= 0 ? 0 : pageYOffset;
}

function togglePanel(event) {
  if (event.target.closest('[data-toggle=header__panel]')) {
    event.preventDefault();
    document.documentElement.classList.toggle('page--open-panel');
  }
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = carousel;


carousel.options = {
  slidesToShow: 3,
  slidesToScroll: 3,
  infinite: false,
  prevArrow: '<button type="button" class="slick-prev carousel__arrow carousel__arrow--prev"><svg role="img" class="icon-svg-angle-l">\n' + '  <use xlink:href="#icon-svg-angle-l"></use>\n' + '</svg></button>',
  nextArrow: '<button type="button" class="slick-next carousel__arrow carousel__arrow--next"><svg role="img" class="icon-svg-angle-l">\n' + '  <use xlink:href="#icon-svg-angle-l"></use>\n' + '</svg></button>',
  responsive: [{
    breakpoint: 960,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2
    }
  }, {
    breakpoint: 640,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }]
};

carousel.init = function () {
  document.querySelectorAll('.carousel').forEach(function (item) {
    carousel.options.appendArrows = item.querySelector('.carousel__arrows');
    $(item.querySelector('.carousel__inner')).slick(carousel.options);
  });
};

function carousel() {
  carousel.init();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = faqItem;


faqItem.init = function () {};

faqItem.bindUIActions = function () {
  document.addEventListener('click', toggle);
};

function faqItem() {
  faqItem.init();
  faqItem.bindUIActions();
}

function toggle(event) {
  if (event.target.closest('[data-toggle=faq-item]')) {
    var faqItemElement = event.target.closest('.faq-item');

    event.preventDefault();
    faqItemElement.classList.toggle('faq-item--opened');
    faqItemElement.querySelector('.faq-item__header-icon').children[0].setAttribute('xlink:href', '#icon-svg-' + (faqItemElement.classList.contains('faq-item--opened') ? 'minus' : 'plus'));
  }
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = popup;


popup.init = function () {};

popup.bindUIActions = function () {
  document.addEventListener('click', close);
};

popup.popupOpen = function (id) {
  var popupContent = document.querySelector(id).cloneNode(true);
  var newPopup = document.createElement('div');
  newPopup.classList.add('popup');
  newPopup.innerHTML = '<div class="popup__overlay"></div><div class="popup__container"></div>';
  newPopup.querySelector('.popup__container').appendChild(popupContent);
  document.body.appendChild(newPopup);
  setTimeout(function () {
    newPopup.classList.add('popup--inited');
  }, 10);
  //newPopup.classList.add('popup--inited');
  document.documentElement.classList.add('overflow-hidden');
};

function popup() {
  popup.init();
  popup.bindUIActions();
}

function close(event) {
  if (event.target.closest('[data-toggle=popup-close]')) {
    var popupElement = event.target.closest('.popup');

    event.preventDefault();
    popupElement.addEventListener('transitionend', function () {
      document.body.removeChild(popupElement);
      document.documentElement.classList.remove('overflow-hidden');
    });
    popupElement.classList.remove('popup--inited');
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map