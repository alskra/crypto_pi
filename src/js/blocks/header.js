'use strict';

export default header;

let scrollTopCurrent = pageYOffset <= 0 ? 0 : pageYOffset;

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
  let header = document.querySelector('.header'),
    vw = window.innerWidth;

  if (pageYOffset > 0) {
    header.classList.add('header--fixed');
  } else {
    header.classList.remove('header--fixed');
  }

  if (vw < 900 && pageYOffset > scrollTopCurrent) {
    header.style.opacity = 0;
  } else {
    header.style.opacity = '';
  }

  scrollTopCurrent = pageYOffset <= 0 ? 0 : pageYOffset;
}

function togglePanel(event) {
  event.preventDefault();
  if (event.target.closest('[data-toggle=header__panel]')) {
    document.documentElement.classList.toggle('page--open-panel');
  }
}