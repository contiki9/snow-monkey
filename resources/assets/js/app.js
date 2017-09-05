(function ($) {
'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var BasisHamburgerBtn = function () {
  function BasisHamburgerBtn() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, BasisHamburgerBtn);

    this.args = $.extend({
      btn: '.c-hamburger-btn'
    }, args);
    this.hamburgerBtn = $(this.args.btn);
    this.setListener();
  }

  createClass(BasisHamburgerBtn, [{
    key: 'setListener',
    value: function setListener() {
      this.hamburgerBtn.each(function (i, e) {
        var hamburgerBtn = $(e);
        var target = $('#' + hamburgerBtn.attr('aria-controls'));

        hamburgerBtn.click(function (event) {
          event.preventDefault();
          event.stopPropagation();

          if ('false' === hamburgerBtn.attr('aria-expanded')) {
            hamburgerBtn.attr('aria-expanded', 'true');
            target.attr('aria-hidden', 'false');
          } else {
            hamburgerBtn.attr('aria-expanded', 'false');
            target.attr('aria-hidden', 'true');
          }
        });
      });
    }
  }]);
  return BasisHamburgerBtn;
}();

var BasisDrawer = function () {
  function BasisDrawer() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, BasisDrawer);

    this.args = $.extend({
      drawer: '.c-drawer',
      toggle: '.c-drawer__toggle',
      submenu: '.c-drawer__submenu'
    }, args);
    this.drawer = $(this.args.drawer);
    this.setListener();
  }

  createClass(BasisDrawer, [{
    key: 'setListener',
    value: function setListener() {
      var _this = this;

      this.drawer.each(function (i, e) {
        var drawer = $(e);
        _this.setIdForSubmenu(drawer);

        var container = drawer.parent();
        var btn = $('#' + drawer.attr('aria-labeledby'));
        var toggleBtns = drawer.find(_this.args.toggle + '[aria-controls]');

        container.on('click', function (event) {
          _this.close(btn);
          _this.hidden(drawer);
          _this.close(drawer.find(_this.args.toggle));
          _this.hidden(drawer.find(_this.args.submenu));
        });

        drawer.on('click', function (event) {
          event.stopPropagation();
        });

        $(window).on('resize', function (event) {
          _this.hidden(drawer);
          _this.close(btn);
        });

        toggleBtns.each(function (i, e) {
          var toggleBtn = $(e);
          var submenu = $('#' + toggleBtn.attr('aria-controls'));
          toggleBtn.on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            _this.toggleMenu(toggleBtn);
          });
        });
      });
    }
  }, {
    key: 'toggleMenu',
    value: function toggleMenu(btn) {
      var menu = $('#' + btn.attr('aria-controls'));
      if ('false' == btn.attr('aria-expanded')) {
        this.open(btn);
        this.show(menu);
      } else {
        this.close(btn);
        this.hidden(menu);
        this.close(menu.find(this.args.toggle));
        this.hidden(menu.find(this.args.submenu));
      }
    }
  }, {
    key: 'open',
    value: function open(target) {
      target.attr('aria-expanded', 'true');
    }
  }, {
    key: 'close',
    value: function close(target) {
      target.attr('aria-expanded', 'false');
    }
  }, {
    key: 'show',
    value: function show(target) {
      target.attr('aria-hidden', 'false');
    }
  }, {
    key: 'hidden',
    value: function hidden(target) {
      target.attr('aria-hidden', 'true');
    }
  }, {
    key: 'setIdForSubmenu',
    value: function setIdForSubmenu(drawer) {
      var _this2 = this;

      drawer.find(this.args.submenu + '[aria-hidden]').each(function (i, e) {
        var random = Math.floor(Math.random() * (9999999 - 1000000) + 1000000);
        var time = new Date().getTime();
        var id = 'drawer-' + time + random;
        var submenu = $(e);
        var toggleBtn = submenu.siblings(_this2.args.toggle);
        if (submenu.length && toggleBtn.length) {
          submenu.attr('id', id);
          toggleBtn.attr('aria-controls', '' + id);
        }
      });
    }
  }]);
  return BasisDrawer;
}();

var BasisNavbar = function () {
  function BasisNavbar() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, BasisNavbar);

    this.args = $.extend({
      item: '.c-navbar__item',
      submenu: '.c-navbar__submenu',
      subitem: '.c-navbar__subitem'
    }, args);
    this.items = $(this.args.item + '[aria-haspopup="true"], ' + this.args.subitem + '[aria-haspopup="true"]');
    this.setListener();
  }

  createClass(BasisNavbar, [{
    key: 'setListener',
    value: function setListener() {
      var _this = this;

      this.items.each(function (i, e) {
        var item = $(e);
        item.on('mouseover focus', function (event) {
          _this.show(item.children(_this.args.submenu));
        });

        item.on('mouseleave', function (event) {
          _this.hidden(item.children(_this.args.submenu));
        });
      });
    }
  }, {
    key: 'show',
    value: function show(submenu) {
      submenu.attr('aria-hidden', 'false');
    }
  }, {
    key: 'hidden',
    value: function hidden(submenu) {
      submenu.attr('aria-hidden', 'true');
    }
  }]);
  return BasisNavbar;
}();

var BasisPageEffect = function () {
  function BasisPageEffect() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, BasisPageEffect);

    this.args = $.extend({
      pageEffect: '.c-page-effect',
      duration: 200
    }, args);
    this.container = $(this.args.pageEffect);
    this.pageOutObject = $('[data-page-effect-link="true"], a[href]:not([target="_blank"], [href^="#"], [href*="javascript"], [href*=".jpg"], [href*=".jpeg"], [href*=".gif"], [href*=".png"], [href*=".mov"], [href*=".swf"], [href*=".mp4"], [href*=".flv"], [href*=".avi"], [href*=".mp3"], [href*=".pdf"], [href*=".zip"], [href^="mailto:"], [data-page-effect-link="false"])');
    this.setListener();
  }

  createClass(BasisPageEffect, [{
    key: 'setListener',
    value: function setListener() {
      var _this = this;

      $(window).on('load', function (event) {
        _this.hide();
      });

      this.pageOutObject.each(function (i, e) {
        var link = $(e);
        link.on('click', function (event) {
          if (event.shiftKey || event.ctrlKey || event.metaKey) {
            return;
          }

          event.preventDefault();
          _this.show();
          var url = link.attr('href');
          _this.moveLocation(url);
        });
      });
    }
  }, {
    key: 'moveLocation',
    value: function moveLocation(url) {
      setTimeout(function () {
        location.href = url;
      }, this.args['duration']);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.container.attr('aria-hidden', 'true').attr('data-page-effect', 'fadein');
    }
  }, {
    key: 'show',
    value: function show() {
      this.container.attr('aria-hidden', 'false').attr('data-page-effect', 'fadeout');
    }
  }]);
  return BasisPageEffect;
}();

var BasisSelect = function BasisSelect() {
  var _this = this;

  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  classCallCheck(this, BasisSelect);

  this.args = $.extend({
    select: '.c-select',
    label: '.c-select__label'
  }, args);
  this.select = $(this.args.select);
  this.select.each(function (i, e) {
    var selectWrapper = $(e);
    var select = selectWrapper.find('select');
    var label = selectWrapper.find(_this.args.label);
    label.text(select.children('option:selected').text());

    select.on('change', function (event) {
      label.text($(select[0].selectedOptions).text());
    });

    select.on('focusin', function (event) {
      selectWrapper.attr('aria-selected', 'true');
    });

    select.on('focusout', function (event) {
      selectWrapper.attr('aria-selected', 'false');
    });
  });
};

new BasisHamburgerBtn();

new BasisDrawer();

new BasisNavbar();

new BasisPageEffect();

new BasisSelect();

/**
 * This is for the sticky header.
 */

var BasisStickyHeader = function () {
  function BasisStickyHeader() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, BasisStickyHeader);

    this.args = $.extend({
      container: '.l-container',
      header: '.l-header',
      contents: '.l-contents'
    }, args);

    this.windowScroll = $('html').attr('data-window-scroll');

    this.setScroll();
    this.setSticky();
    this.setListener();
  }

  createClass(BasisStickyHeader, [{
    key: 'setListener',
    value: function setListener() {
      var _this = this;

      var target = this.getScrollTarget();

      target.on('scroll resize', function (event) {
        _this.setScroll();
        _this.setSticky();
      });
    }
  }, {
    key: 'setScroll',
    value: function setScroll() {
      var scroll = this.getScrollTop();

      if (scroll > 0) {
        $('html').attr('data-scrolled', 'true');
      } else {
        $('html').attr('data-scrolled', 'false');
      }
    }
  }, {
    key: 'setSticky',
    value: function setSticky() {
      if ('sticky' !== $(this.args.header).attr('data-l-header-type')) {
        return;
      }
      var headerHeight = $(this.args.header).outerHeight();
      $(this.args.contents).css('marginTop', headerHeight + 'px');
    }
  }, {
    key: 'getScrollTarget',
    value: function getScrollTarget() {
      if ('false' == this.windowScroll) {
        return $(this.args.container);
      } else {
        return $(window);
      }
    }
  }, {
    key: 'getScrollTop',
    value: function getScrollTop() {
      return this.getScrollTarget().scrollTop();
    }
  }]);
  return BasisStickyHeader;
}();

var Inc2734_WP_Share_Buttons_Button = function () {
  function Inc2734_WP_Share_Buttons_Button(button) {
    var _this = this;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, Inc2734_WP_Share_Buttons_Button);

    $(function () {
      _this.button = button;
      _this.params = $.extend({
        post_id: _this.button.data('wp-share-buttons-postid')
      }, params);

      if (!_this.button.data('wp-share-buttons-has-cache')) {
        if (_this.button.find('.wp-share-button__count').length) {
          _this.count();
        }
      }
      _this.popup();
    });
  }

  createClass(Inc2734_WP_Share_Buttons_Button, [{
    key: 'count',
    value: function count() {}
  }, {
    key: 'popup',
    value: function popup() {}
  }]);
  return Inc2734_WP_Share_Buttons_Button;
}();

var Inc2734_WP_Share_Buttons_Share_Count = function () {
  function Inc2734_WP_Share_Buttons_Share_Count(target) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'jsonp';
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Inc2734_WP_Share_Buttons_Share_Count);

    this.target = target;
    this.type = type;
    this.data = data;
  }

  createClass(Inc2734_WP_Share_Buttons_Share_Count, [{
    key: 'request',
    value: function request() {
      return $.ajax({
        url: this.target,
        dataType: this.type,
        data: this.data
      });
    }
  }]);
  return Inc2734_WP_Share_Buttons_Share_Count;
}();

var Inc2734_WP_Share_Buttons_Popup = function () {
  function Inc2734_WP_Share_Buttons_Popup(target, title, width, height) {
    classCallCheck(this, Inc2734_WP_Share_Buttons_Popup);

    this.target = target;
    this.title = title;
    this.width = parseInt(width);
    this.height = parseInt(height);
    this.setListener();
  }

  createClass(Inc2734_WP_Share_Buttons_Popup, [{
    key: 'setListener',
    value: function setListener() {
      var _this = this;

      this.target.on('click', function (event) {
        event.preventDefault();
        window.open(_this.target.attr('href'), _this.title, 'width=' + _this.width + ', height=' + _this.height + ', menubar=no, toolbar=no, scrollbars=yes');
      });
    }
  }]);
  return Inc2734_WP_Share_Buttons_Popup;
}();

var Inc2734_WP_Share_Buttons_Facebook = function (_Inc2734_WP_Share_But) {
  inherits(Inc2734_WP_Share_Buttons_Facebook, _Inc2734_WP_Share_But);

  function Inc2734_WP_Share_Buttons_Facebook(button, params) {
    classCallCheck(this, Inc2734_WP_Share_Buttons_Facebook);
    return possibleConstructorReturn(this, (Inc2734_WP_Share_Buttons_Facebook.__proto__ || Object.getPrototypeOf(Inc2734_WP_Share_Buttons_Facebook)).call(this, button, params));
  }

  createClass(Inc2734_WP_Share_Buttons_Facebook, [{
    key: 'count',
    value: function count() {
      var _this2 = this;

      new Inc2734_WP_Share_Buttons_Share_Count(inc2734_wp_share_buttons_facebook.endpoint, 'json', {
        action: inc2734_wp_share_buttons_facebook.action,
        _ajax_nonce: inc2734_wp_share_buttons_facebook._ajax_nonce,
        post_id: this.params.post_id,
        url: this.params.url
      }).request().done(function (json) {
        _this2.button.find('.wp-share-button__count').text(json.count);
      });
    }
  }, {
    key: 'popup',
    value: function popup() {
      new Inc2734_WP_Share_Buttons_Popup(this.button.find('.wp-share-button__button'), 'Share on Facebook', 670, 400);
    }
  }]);
  return Inc2734_WP_Share_Buttons_Facebook;
}(Inc2734_WP_Share_Buttons_Button);

var Inc2734_WP_Share_Buttons_Twitter = function (_Inc2734_WP_Share_But) {
  inherits(Inc2734_WP_Share_Buttons_Twitter, _Inc2734_WP_Share_But);

  function Inc2734_WP_Share_Buttons_Twitter(button, params) {
    classCallCheck(this, Inc2734_WP_Share_Buttons_Twitter);
    return possibleConstructorReturn(this, (Inc2734_WP_Share_Buttons_Twitter.__proto__ || Object.getPrototypeOf(Inc2734_WP_Share_Buttons_Twitter)).call(this, button, params));
  }

  createClass(Inc2734_WP_Share_Buttons_Twitter, [{
    key: 'count',
    value: function count() {
      var _this2 = this;

      new Inc2734_WP_Share_Buttons_Share_Count(inc2734_wp_share_buttons_twitter.endpoint, 'json', {
        action: inc2734_wp_share_buttons_twitter.action,
        _ajax_nonce: inc2734_wp_share_buttons_twitter._ajax_nonce,
        post_id: this.params.post_id,
        url: this.params.url
      }).request().done(function (json) {
        _this2.button.find('.wp-share-button__count').text(json.count);
      });
    }
  }, {
    key: 'popup',
    value: function popup() {
      new Inc2734_WP_Share_Buttons_Popup(this.button.find('.wp-share-button__button'), 'Share on Twitter', 550, 400);
    }
  }]);
  return Inc2734_WP_Share_Buttons_Twitter;
}(Inc2734_WP_Share_Buttons_Button);

var Inc2734_WP_Share_Buttons_Hatena = function (_Inc2734_WP_Share_But) {
  inherits(Inc2734_WP_Share_Buttons_Hatena, _Inc2734_WP_Share_But);

  function Inc2734_WP_Share_Buttons_Hatena(button, params) {
    classCallCheck(this, Inc2734_WP_Share_Buttons_Hatena);
    return possibleConstructorReturn(this, (Inc2734_WP_Share_Buttons_Hatena.__proto__ || Object.getPrototypeOf(Inc2734_WP_Share_Buttons_Hatena)).call(this, button, params));
  }

  createClass(Inc2734_WP_Share_Buttons_Hatena, [{
    key: 'count',
    value: function count() {
      var _this2 = this;

      new Inc2734_WP_Share_Buttons_Share_Count(inc2734_wp_share_buttons_hatena.endpoint, 'json', {
        action: inc2734_wp_share_buttons_hatena.action,
        _ajax_nonce: inc2734_wp_share_buttons_hatena._ajax_nonce,
        post_id: this.params.post_id,
        url: this.params.url
      }).request().done(function (json) {
        _this2.button.find('.wp-share-button__count').text(json.count);
      });
    }
  }, {
    key: 'popup',
    value: function popup() {
      new Inc2734_WP_Share_Buttons_Popup(this.button.find('.wp-share-button__button'), 'Hatena Bookmark', 510, 420);
    }
  }]);
  return Inc2734_WP_Share_Buttons_Hatena;
}(Inc2734_WP_Share_Buttons_Button);

var Inc2734_WP_Share_Buttons_Line = function (_Inc2734_WP_Share_But) {
  inherits(Inc2734_WP_Share_Buttons_Line, _Inc2734_WP_Share_But);

  function Inc2734_WP_Share_Buttons_Line(button, params) {
    classCallCheck(this, Inc2734_WP_Share_Buttons_Line);
    return possibleConstructorReturn(this, (Inc2734_WP_Share_Buttons_Line.__proto__ || Object.getPrototypeOf(Inc2734_WP_Share_Buttons_Line)).call(this, button, params));
  }

  createClass(Inc2734_WP_Share_Buttons_Line, [{
    key: 'popup',
    value: function popup() {
      new Inc2734_WP_Share_Buttons_Popup(this.button.find('.wp-share-button__button'), 'Send to LINE', 670, 530);
    }
  }]);
  return Inc2734_WP_Share_Buttons_Line;
}(Inc2734_WP_Share_Buttons_Button);

var Inc2734_WP_Share_Buttons_Pocket = function (_Inc2734_WP_Share_But) {
  inherits(Inc2734_WP_Share_Buttons_Pocket, _Inc2734_WP_Share_But);

  function Inc2734_WP_Share_Buttons_Pocket(button, params) {
    classCallCheck(this, Inc2734_WP_Share_Buttons_Pocket);
    return possibleConstructorReturn(this, (Inc2734_WP_Share_Buttons_Pocket.__proto__ || Object.getPrototypeOf(Inc2734_WP_Share_Buttons_Pocket)).call(this, button, params));
  }

  createClass(Inc2734_WP_Share_Buttons_Pocket, [{
    key: 'popup',
    value: function popup() {
      new Inc2734_WP_Share_Buttons_Popup(this.button.find('.wp-share-button__button'), 'Pocket', 550, 350);
    }
  }]);
  return Inc2734_WP_Share_Buttons_Pocket;
}(Inc2734_WP_Share_Buttons_Button);

var Inc2734_WP_Share_Buttons_Feedly = function (_Inc2734_WP_Share_But) {
  inherits(Inc2734_WP_Share_Buttons_Feedly, _Inc2734_WP_Share_But);

  function Inc2734_WP_Share_Buttons_Feedly(button, params) {
    classCallCheck(this, Inc2734_WP_Share_Buttons_Feedly);
    return possibleConstructorReturn(this, (Inc2734_WP_Share_Buttons_Feedly.__proto__ || Object.getPrototypeOf(Inc2734_WP_Share_Buttons_Feedly)).call(this, button, params));
  }

  createClass(Inc2734_WP_Share_Buttons_Feedly, [{
    key: 'count',
    value: function count() {
      var _this2 = this;

      new Inc2734_WP_Share_Buttons_Share_Count(inc2734_wp_share_buttons_feedly.endpoint, 'json', {
        action: inc2734_wp_share_buttons_feedly.action,
        _ajax_nonce: inc2734_wp_share_buttons_feedly._ajax_nonce,
        post_id: this.params.post_id,
        url: this.params.url
      }).request().done(function (json) {
        _this2.button.find('.wp-share-button__count').text(json.count);
      });
    }
  }]);
  return Inc2734_WP_Share_Buttons_Feedly;
}(Inc2734_WP_Share_Buttons_Button);

var Inc2734_WP_Share_Buttons = function Inc2734_WP_Share_Buttons() {
  classCallCheck(this, Inc2734_WP_Share_Buttons);

  $(function () {
    $('.wp-share-button--facebook').each(function (i, e) {
      new Inc2734_WP_Share_Buttons_Facebook($(e));
    });

    $('.wp-share-button--twitter').each(function (i, e) {
      new Inc2734_WP_Share_Buttons_Twitter($(e));
    });

    $('.wp-share-button--hatena').each(function (i, e) {
      new Inc2734_WP_Share_Buttons_Hatena($(e));
    });

    $('.wp-share-button--line').each(function (i, e) {
      new Inc2734_WP_Share_Buttons_Line($(e));
    });

    $('.wp-share-button--pocket').each(function (i, e) {
      new Inc2734_WP_Share_Buttons_Pocket($(e));
    });

    $('.wp-share-button--feedly').each(function (i, e) {
      new Inc2734_WP_Share_Buttons_Feedly($(e));
    });
  });
};

var FixAdminBar = function () {
  function FixAdminBar() {
    var _this = this;

    classCallCheck(this, FixAdminBar);

    this.min = 599;
    this.container = $('.l-container');
    this.header = $('.l-header');
    this.contents = $('.l-contents');

    $(function () {
      _this.adminBar = $('#wpadminbar');

      if (_this.adminBar.length) {
        _this.fixHeaderPosition();
        _this.fixStickyFooter();
        _this.fixDisableWindowScroll();
        _this.setListener();
      }
    });
  }

  createClass(FixAdminBar, [{
    key: 'setListener',
    value: function setListener() {
      var _this2 = this;

      $(window).resize(function () {
        _this2.fixHeaderPosition();
        _this2.fixStickyFooter();
        _this2.fixDisableWindowScroll();
      });

      $(window).scroll(function () {
        _this2.fixHeaderPosition();
      });
    }
  }, {
    key: 'fixHeaderPosition',
    value: function fixHeaderPosition() {
      if (-1 !== $.inArray(this.header.attr('data-l-header-type'), ['sticky', 'overlay'])) {
        var scroll = $(window).scrollTop();
        var adminbar_height = parseInt(this.adminBar.outerHeight());

        if (this.min > $(window).outerWidth()) {
          if (scroll >= this.adminBar.outerHeight()) {
            this.header.css('top', 0);
            this.header.css('position', '');
          } else {
            if ('sticky' === this.header.attr('data-l-header-type')) {
              this.header.css('position', 'relative');
              this.header.css('top', '');
            } else {
              this.header.css('top', adminbar_height + scroll * -1);
            }
            $('html').attr('data-scrolled', false);
            this.contents.css('margin-top', 0);
          }
        } else {
          this.header.css('top', '');
          this.header.css('position', '');
        }
      }
    }
  }, {
    key: 'fixStickyFooter',
    value: function fixStickyFooter() {
      if ('true' == $('html').attr('data-sticky-footer')) {
        var adminbar_height = parseInt(this.adminBar.outerHeight());
        this.container.css('min-height', 'calc(100vh - ' + adminbar_height + 'px)');
      }
    }
  }, {
    key: 'fixDisableWindowScroll',
    value: function fixDisableWindowScroll() {
      if ('false' == $('html').attr('data-window-scroll')) {
        var adminbar_height = parseInt(this.adminBar.outerHeight());
        this.container.css('max-height', 'calc(100vh - ' + adminbar_height + 'px)');
      }
    }
  }]);
  return FixAdminBar;
}();

var SnowMonkeyMainVisual = function SnowMonkeyMainVisual() {
  classCallCheck(this, SnowMonkeyMainVisual);

  $(function () {
    var slider = $('.p-main-visual');

    slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      slider.find('.slick-slide').removeClass('pan');
      slider.find('.slick-slide').eq(currentSlide).addClass('pan');
    });

    slider.slick({
      "speed": 500,
      "autoplaySpeed": 4000,
      "slidesToShow": 1,
      "fade": true,
      "autoplay": true,
      "dots": false,
      "infinite": true,
      "adaptiveHeight": true,
      "arrows": true,
      "pauseOnFocus": false,
      "pauseOnHover": false
    });
  });
};

var SnowMonkeyWidgetItemExpander = function SnowMonkeyWidgetItemExpander() {
  classCallCheck(this, SnowMonkeyWidgetItemExpander);

  $(function () {
    var parents = $('.c-widget li:has(.children, .sub-menu)');

    parents.each(function (i, e) {
      var parent = $(e);

      parent.prepend('<button class="children-expander" data-is-expanded="false"></button>');
      parent.find('.children, .sub-menu').attr('data-is-hidden', 'true');

      parent.children('.children-expander').click(function (event) {
        if ('false' === $(event.target).attr('data-is-expanded')) {
          $(event.target).attr('data-is-expanded', 'true');
          parent.children('.children, .sub-menu').attr('data-is-hidden', 'false');
        } else {
          parent.find('.children-expander').attr('data-is-expanded', 'false');
          parent.find('.children, .sub-menu').attr('data-is-hidden', 'true');
        }
      });
    });
  });
};

var SnowMonkeyHeader = function () {
  function SnowMonkeyHeader() {
    var _this = this;

    classCallCheck(this, SnowMonkeyHeader);

    $(function () {
      _this.min = 1023;
      _this.header = $('.l-header');
      _this.contents = $('.l-contents');

      _this.init();

      $(window).resize(function () {
        _this.init();
      });
    });
  }

  createClass(SnowMonkeyHeader, [{
    key: 'init',
    value: function init() {
      if (this.min < $(window).width() && !this.header.attr('data-l-header-type')) {
        this.header.attr('data-l-header-type', '');
        this.contents.css('margin-top', '');
      } else {
        this.header.attr('data-l-header-type', 'sticky');
        if ('fixed' === this.header.css('position') || 'absolute' === this.header.css('position')) {
          var headerHeight = this.header.outerHeight();
          this.contents.css('marginTop', headerHeight + 'px');
        }
      }
    }
  }]);
  return SnowMonkeyHeader;
}();

var SnowMonkeyDropNav = function () {
  function SnowMonkeyDropNav() {
    var _this = this;

    classCallCheck(this, SnowMonkeyDropNav);

    $(function () {
      _this.header = $('.l-header');
      _this.nav = $('.l-header__drop-nav');
      _this.min = 1023;
      _this.defaultWindowWidth = $(window).width();

      _this.onScroll();
      _this.onResize();
    });
  }

  createClass(SnowMonkeyDropNav, [{
    key: 'onScroll',
    value: function onScroll() {
      var _this2 = this;

      $(window).scroll(function () {
        if (_this2.min < $(window).width()) {
          if (_this2.header.outerHeight() < $(window).scrollTop()) {
            _this2.nav.attr('aria-hidden', 'false');
            return;
          }
        }

        _this2.nav.attr('aria-hidden', 'true');
      });
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      var _this3 = this;

      $(window).resize(function () {
        if ($(window).width() === _this3.defaultWindowWidth) {
          return;
        }

        _this3.nav.attr('aria-hidden', 'true');
      });
    }
  }]);
  return SnowMonkeyDropNav;
}();

var SmoothScroll = function () {
  function SmoothScroll(target) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, SmoothScroll);

    this.target = target;

    var defaults$$1 = {
      duration: 1000,
      easing: 'easeOutQuint',
      offset: 0,
      hash: true
    };
    this.params = $.extend(defaults$$1, params);
  }

  createClass(SmoothScroll, [{
    key: '_getTargetBody',
    value: function _getTargetBody() {
      var wst = $(window).scrollTop();
      if (0 === wst) {
        $(window).scrollTop(wst + 1);
      }

      if (0 < $('html').scrollTop()) {
        return $('html');
      } else if (0 < $('body').scrollTop()) {
        return $('body');
      }
    }
  }, {
    key: '_scroll',
    value: function _scroll(event, body) {
      var _this = this;

      var targetHash = event.currentTarget.hash.split('%').join('\\%').split('(').join('\\(').split(')').join('\\)');
      var offset = $(targetHash).eq(0).offset();

      if (!targetHash || !offset) {
        return;
      }

      body.animate({
        scrollTop: offset.top - this.params.offset
      }, this.params.duration, this.params.easing, function () {
        if (true === _this.params.hash) {
          window.history.pushState('', '', targetHash);
        }
      });
    }
  }, {
    key: '_disableMouseWheel',
    value: function _disableMouseWheel(body) {
      if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', function () {
          body.stop(true);
        }, false);
      }
      window.onmousewheel = document.onmousewheel = function () {
        body.stop(true);
      };
    }
  }, {
    key: 'off',
    value: function off() {
      this.target.unbind('click.SmoothScroll');
    }
  }, {
    key: 'on',
    value: function on() {
      var _this2 = this;

      $(this.target).each(function (i, e) {
        $(e).on('click.SmoothScroll', function (event) {
          event.preventDefault();

          var body = _this2._getTargetBody();
          if (!body) {
            return;
          }

          _this2._scroll(event, body);
          _this2._disableMouseWheel(body);
        });
      });
    }
  }]);
  return SmoothScroll;
}();

/**
 * Name: jquery.smoothscroll
 * Author: Takashi Kitajima (inc2734)
 * Author URI: https://2inc.org
 * License: MIT
 *
 * easing: http://gsgd.co.uk/sandbox/jquery/easing/
 * @param { duration, easing, offset, hash)
 */

(function ($$$1) {
  var methods = {
    init: function init(params) {
      var _SmoothScroll = new SmoothScroll(this, params);
      _SmoothScroll.on();
      return this;
    },

    off: function off() {
      var _SmoothScroll = new SmoothScroll(this);
      _SmoothScroll.off();
      return this;
    }
  };

  $$$1.fn.SmoothScroll = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if ((typeof method === 'undefined' ? 'undefined' : _typeof(method)) === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $$$1.error('Method ' + method + ' does not exist');
    }
  };
})(jQuery);

var SnowMonkeyPageTopScroll = function SnowMonkeyPageTopScroll() {
  var _this = this;

  classCallCheck(this, SnowMonkeyPageTopScroll);

  $(function () {
    _this.pageTop = $('.c-page-top');

    $(window).scroll(function () {
      if (500 > $(window).scrollTop()) {
        _this.pageTop.attr('aria-hidden', 'true');
      } else {
        _this.pageTop.attr('aria-hidden', 'false');
      }
    });

    _this.pageTop.find('a[href^="#"]').SmoothScroll({
      duration: 1000,
      easing: 'easeOutQuint'
    });
  });
};

new BasisStickyHeader();

new Inc2734_WP_Share_Buttons();

new FixAdminBar();

new SnowMonkeyMainVisual();

new SnowMonkeyWidgetItemExpander();

new SnowMonkeyHeader();

new SnowMonkeyDropNav();

new SnowMonkeyPageTopScroll();

}(jQuery));
