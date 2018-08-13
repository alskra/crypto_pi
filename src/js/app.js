'use strict';

import header from './blocks/header';
import carousel from './blocks/carousel';
import faqItem from './blocks/faq-item';
import popup from './blocks/popup';

$(() => {
  header();
  carousel();
  faqItem();
  popup();
  window.popupOpen = popup.popupOpen;
});