'use strict';

export default carousel;

carousel.options = {
  slidesToShow: 3,
  slidesToScroll: 3,
  infinite: false,
  prevArrow: '<button type="button" class="slick-prev carousel__arrow carousel__arrow--prev"><svg role="img" class="icon-svg-angle-l">\n' +
  '  <use xlink:href="#icon-svg-angle-l"></use>\n' +
  '</svg></button>',
  nextArrow: '<button type="button" class="slick-next carousel__arrow carousel__arrow--next"><svg role="img" class="icon-svg-angle-l">\n' +
  '  <use xlink:href="#icon-svg-angle-l"></use>\n' +
  '</svg></button>',
  responsive: [
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

carousel.init = function () {
  document.querySelectorAll('.carousel').forEach(function (item) {
    carousel.options.appendArrows = item.querySelector('.carousel__arrows');
    $(item.querySelector('.carousel__inner')).slick(carousel.options);
  });
};

function carousel() {
  carousel.init();
}