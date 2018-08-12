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
    faqItemElement.querySelector('.faq-item__header-icon')
      .children[0].setAttribute('xlink:href', `#icon-svg-${faqItemElement.classList.contains('faq-item--opened') ? 'minus' : 'plus'}`);
  }
}