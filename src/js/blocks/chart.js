'use strict';

export default chart;

chart.init = function () {
  onScroll();
};

chart.bindUIActions = function () {
  window.addEventListener('scroll', onScroll);
};

function chart() {
  chart.init();
  chart.bindUIActions();
}

function onScroll() {
  let chart = document.querySelector('.chart');

  if (window.innerHeight > chart.getBoundingClientRect().top) {
    chart.classList.add('chart--animated');
  }
}