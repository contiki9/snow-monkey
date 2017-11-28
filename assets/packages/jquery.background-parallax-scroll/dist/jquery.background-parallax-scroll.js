(function (jquery) {
'use strict';

jquery = jquery && jquery.hasOwnProperty('default') ? jquery['default'] : jquery;

/**
 * Name: jquery.background-parallax-scroll
 * Author: Takashi Kitajima (inc2734)
 * Author URI: https://2inc.org
 * License: MIT
 *
 * @param { speed }
 */

'use strict';

(function ($) {
  $.fn.backgroundParallaxScroll = function (params) {
    params = $.extend({
      speed: 3
    }, params);

    return this.each(function (i, e) {
      var target = $(e);
      var bg = target.find('.js-bg-parallax__bg');
      var src = bg.attr('src');
      var dummy = new Image();

      dummy.onload = function () {
        bg.addClass('js-bg-parallax__bg--loaded');

        init();
        setPosition(0);

        $(window).resize(function () {
          init();
          setPosition($(window).scrollTop());
        });

        $(window).scroll(function () {
          setPosition($(window).scrollTop());
        });

        /**
         * Set background image size and position
         *
         * @return {void}
         */
        function init() {
          var size = getImageSize();

          bg.css('width', size.width).css('height', size.height).css('left', 'calc(50% - ' + parseInt(size.width) / 2 + 'px)').css('top', 'calc(50% - ' + parseInt(size.height) / 2 + 'px)');
        }

        /**
         * Return background image size
         *
         * @return {hash}
         *   @var length width
         *   @var length height
         */
        function getImageSize() {
          var width = void 0,
              height = void 0;

          if (target.outerWidth() / target.outerHeight() > dummy.width / dummy.height) {
            width = target.outerWidth();
            height = dummy.height * (width / dummy.width);
          } else {
            height = target.outerHeight();
            width = dummy.width * (height / dummy.height);
          }

          return {
            width: width,
            height: height
          };
        }

        /**
         * Set background image position for parallax effect
         *
         * @param {int} scroll
         * @return {void}
         */
        function setPosition(scroll) {
          var offset = target.offset().top;
          var parallax = (scroll - offset) / params.speed;

          if ($(window).height() > offset) {
            parallax = scroll / params.speed;
          }

          if (Math.abs(parallax) > (bg.height() - target.outerHeight()) / 2) {
            return;
          }

          bg.css('transform', 'translateY(' + parallax + 'px)');
        }
      };

      dummy.src = src;
    });
  };
})(jQuery);

}(jQuery));
