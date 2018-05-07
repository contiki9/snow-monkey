(function ($) {
'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

'use strict';

$.fn.SnowMonkeyWpawPickupSlider = function () {
  var methods = {
    init: function init(slider) {
      slider.slick('slickSetOption', 'arrows', true, true);
      slider.slick('slickSetOption', 'pauseOnFocus', false, true);
      slider.slick('slickSetOption', 'pauseOnHover', false, true);
      slider.slick('slickSetOption', 'prevArrow', '<button class="slick-prev slick-arrow" aria-label="Previous" type="button"><span><i class="fas fa-angle-left"></i></span></button>', true);
      slider.slick('slickSetOption', 'nextArrow', '<button class="slick-next slick-arrow" aria-label="Next" type="button"><span><i class="fas fa-angle-right"></i></span></button>', true);

      slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        slider.find('.slick-slide').removeClass('pan');
        slider.find('.slick-slide').eq(currentSlide).addClass('pan');
      });
    }
  };

  return this.each(function (i, e) {
    var slider = $(e);

    slider.on('init', function (event, slick) {
      setTimeout(function () {
        methods.init(slider);
      }, 0);
    });

    slider.WpawPickupSlider();
  });
};

'use strict';

$(function () {
  var api = wp.customize;

  api.selectiveRefresh.bind('partial-content-rendered', function (partial) {
    if (partial.container) {

      // Showcase widget
      if (partial.container.find('.wpaw-showcase').length) {
        partial.container.find('.wpaw-showcase').backgroundParallaxScroll();
      }

      // Pickup slider widget
      if (partial.container.find('.wpaw-pickup-slider__canvas').length) {
        partial.container.find('.wpaw-pickup-slider__canvas').SnowMonkeyWpawPickupSlider();
      }

      // Slider widget
      if (partial.container.find('.wpaw-slider__canvas').length) {
        partial.container.find('.wpaw-slider__canvas').WpawSlider();
      }

      // Contents outline widget
      if (partial.container.find('.wpco-wrapper').length) {
        partial.container.find('.wpco-wrapper').wpContentsOutline();
      }
    }
  });
});

}(jQuery));
