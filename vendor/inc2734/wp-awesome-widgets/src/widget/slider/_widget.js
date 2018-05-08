'use strict';

import $ from 'jquery';

$.fn.WpawSlider = function() {
  const methods = {
    setItemHeight: function(items) {
      let sliderHeight = 0;
      items.css('min-height', '');
      items.each((i, e) => {
        const slide = $(e);
        const naturalHeight   = slide.outerHeight();
        const recommendHeight = slide.outerWidth() * 0.5625;
        if (sliderHeight < naturalHeight || sliderHeight < recommendHeight) {
          if (recommendHeight < naturalHeight) {
            sliderHeight = naturalHeight;
          } else {
            sliderHeight = recommendHeight;
          }
        }
      });
      items.css('min-height', sliderHeight);
    }
  };

  let windowWidth = $(window).width();

  return this.each(function(i, e) {
    const slider = $(e);
    let sliderWidth = false;

    slider.on('init', (event, slick) => {
      setTimeout(() => {
        methods.setItemHeight(slider.find('.wpaw-slider__item'));
      }, 0);
    });

    slider.on('setPosition', (event, slick) => {
      if (slick.windowWidth !== windowWidth || slick.slideWidth !== sliderWidth) {
        methods.setItemHeight(slider.find('.wpaw-slider__item'));
        windowWidth = slick.windowWidth;
        sliderWidth = slick.slideWidth;
      }
    });

    slider.slick({
      "speed": slider.attr('data-wpaw-slide-duration'),
      "autoplaySpeed": slider.attr('data-wpaw-slide-interval'),
      "slidesToShow": slider.attr('data-wpaw-slide-slides-to-show'),
      "slidesToScroll": slider.attr('data-wpaw-slide-slides-to-scroll'),
      "autoplay": true,
      "fade": slider.attr('data-wpaw-slide-fade'),
      "dots": true,
      "infinite": true,
      "arrows": false,
      "responsive": [
        {
          "breakpoint": 1024,
          "settings": {
            "slidesToShow": 1,
            "slidesToScroll": 1
          }
        }
      ]
    });
  });
};