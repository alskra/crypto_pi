'use strict';

export default faqItem;

faqItem.init = function () {

};

faqItem.bindUIActions = function () {
  document.addEventListener('click', toggle);
};

function faqItem() {
  faqItem.init();
  faqItem.bindUIActions();
}

function toggle(event) {
  if (event.target.closest('[data-toggle=faq-item]')) {
    let faqItemElement = event.target.closest('.faq-item');
    event.preventDefault();
    faqItemElement.classList.toggle('faq-item--opened');
  }
}