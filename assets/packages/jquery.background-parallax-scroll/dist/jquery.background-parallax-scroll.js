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
      var bpy = 0;

      init();
      setPosition(0);

      $(window).resize(function () {
        init();
        setPosition($(window).scrollTop());
      });

      $(window).scroll(function () {
        setPosition($(window).scrollTop());
      });

      function init() {
        target.css('background-position-y', '');
        bpy = target.css('background-position-y');
      }

      function setPosition(scroll) {
        scroll = parseInt(scroll);
        var offset = target.offset().top;
        var parallax = (scroll - offset) / params.speed;
        var newBpy = 'calc(' + bpy + ' - ' + parallax + 'px)';
        target.css('background-position-y', newBpy);
      }
    });
  };
})(jQuery);

}(jQuery));
