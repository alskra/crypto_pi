'use strict';

import './core-js';
import cssVars from 'css-vars-ponyfill';
import 'focus-visible';
import $ from 'jquery';

cssVars();
window.jQuery = window.$ = $;