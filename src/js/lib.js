'use strict';

import './core-js';
import cssVars from 'css-vars-ponyfill';
import 'focus-visible';
import wowjs from 'wowjs';
import $ from 'jquery';
import 'slick-carousel';

const WOW = wowjs.WOW;

cssVars();
new WOW().init();
window.jQuery = window.$ = $;