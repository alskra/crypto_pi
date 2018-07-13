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

  if (vw >= 900) {
    if (pageYOffset > (vw >= 1230 ? 250 : 0)) {
      header.classList.add('header--fixed');
    } else {
      header.classList.remove('header--fixed');
    }
  } else {
    if (pageYOffset > scrollTopCurrent) {
      header.classList.remove('header--fixed');
    } else {
      if (pageYOffset > 0) {
        header.classList.add('header--fixed');
      } else {
        header.classList.remove('header--fixed');
      }
    }
  }

  scrollTopCurrent = pageYOffset <= 0 ? 0 : pageYOffset;
}

function togglePanel(event) {
  event.preventDefault();
  if (event.target.closest('[data-toggle=panel]')) {
    document.documentElement.classList.toggle('page--open-panel');
  }
}