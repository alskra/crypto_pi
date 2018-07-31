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