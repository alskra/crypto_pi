'use strict';

import './core-js';
import cssVars from 'css-vars-ponyfill';
import focusVisible from 'focus-visible';console.log(focusVisible);
import wowjs from 'wowjs';console.log(wowjs);
import $ from 'jquery';
import 'slick-carousel';

const WOW = wowjs.WOW;

cssVars();
new WOW().init();
window.jQuery = window.$ = $;