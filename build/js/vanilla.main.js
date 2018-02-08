'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
	function log(content) {
		console.log(content);
	}

	var hasClass = function hasClass(element, cls) {
		return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	};

	function addClass(element, cls) {
		if (!hasClass(element, cls)) {
			var empty = '';
			if (element.classList.value != "") empty = ' ';
			element.className += empty + cls;
		}
	}

	function removeClass(element, cls) {
		if (hasClass(element, cls)) element.classList.remove(cls);
	}

	function toggleClass(element, cls) {
		hasClass(element, cls) ? removeClass(element, cls) : addClass(element, cls);
	}

	var exists = function exists(element) {
		return typeof element != 'undefined' && element != null;
	};

	var Modal = function () {
		function Modal() {
			var _this = this;

			_classCallCheck(this, Modal);

			// Prefix for modal class
			this.prefix = '';

			// Name of modal class
			this.name = this.prefix + 'modal';

			// All modals
			this.modals = document.querySelectorAll('.' + this.name);

			// Open Buttons
			this.buttons = document.querySelectorAll('[data-action="' + this.name + '"]');

			// Close Button(`x`)
			this.closeButtons = document.querySelectorAll('[data-close="' + this.name + '"]');

			this.buttons.forEach(function (button) {
				button.addEventListener('click', function (e) {
					return _this._showButtonClick(e, _this);
				});
			});

			this.closeButtons.forEach(function (button) {
				button.addEventListener('click', function (e) {
					return _this._closeButtonClick(e, _this);
				});
			});

			this.bodyEvents = ['click', 'touchstart'];

			this.bodyEvents.forEach(function (bodyEvent) {
				document.body.addEventListener(bodyEvent, function (e) {
					_this._bodyClick(e, _this);
				});
			});
		}

		_createClass(Modal, [{
			key: 'modalClose',
			value: function modalClose(el) {
				removeClass(el, this.name + '_showing_in');
				removeClass(document.body, this.name + '-open');
			}
		}, {
			key: 'modalOpen',
			value: function modalOpen(el) {
				addClass(document.body, this.name + '-open');
				addClass(el, this.name + '_showing_in');
			}
		}, {
			key: '_showButtonClick',
			value: function _showButtonClick(e) {
				// Get button data-attributes
				var modalData = e.target.dataset;

				// Get attribute data-open and replace # with empty line
				var modalID = modalData.open.replace("#", "");

				if (exists(document.getElementById(modalID))) {

					var modalCurrent = document.getElementById(modalID);

					this.modalOpen(modalCurrent);

					// if(modalData.video != undefined){
					// 	let videoSRC = modalData.video;
					// 	let videoWrapper = modalCurrent.getElementsByClassName('v-modal__video')[0];

					// 	videoWrapper.innerHTML = '';

					// 	let videoIframe = document.createElement('iframe');

					// 	addClass(videoIframe, 'v-modal__iframe');
					// 	videoIframe.setAttribute('src', videoSRC);
					// 	videoWrapper.appendChild(videoIframe);
					// }
				} else {
					console.error('No element with ID: ' + modalID);
				}
			}
		}, {
			key: '_closeButtonClick',
			value: function _closeButtonClick(e) {
				this.modalClose(e.target.closest('.' + this.name));
			}
		}, {
			key: '_getEventTarget',
			value: function _getEventTarget(e) {
				var targ;

				if (e.target) {
					// W3C
					targ = e.target;
				} else if (e.srcElement) {
					// IE6-8
					targ = e.srcElement;
				} else if (e.originalTarget) {
					targ = e.originalTarget;
				}
				if (targ.nodeType == 3) {
					// Safari
					targ = targ.parentNode;
				}
				return targ;
			}
		}, {
			key: '_bodyClick',
			value: function _bodyClick(e) {
				var _this2 = this;

				var target = this._getEventTarget(e);

				//log(target);
				this.modals.forEach(function (modal) {
					if (target == modal) {
						_this2.modalClose(modal);
					}
				});
			}
		}]);

		return Modal;
	}();

	var Navigation = function () {
		function Navigation() {
			var _this3 = this;

			_classCallCheck(this, Navigation);

			this.prefix = '';
			this.navigation = document.getElementById('navigation');
			this.hamburger = document.getElementById('js-nav-hamburger');
			this.addition = document.getElementById('js-nav-addition');
			this.links = '.nav__menu-item-link';

			if (exists(this.hamburger)) {
				this.hamburger.addEventListener('click', function (e) {
					return _this3.hamburgerClick(e, _this3);
				});
			}

			if (exists(this.addition)) {
				this.addition.addEventListener('click', function (e) {
					return _this3.additionClick(e, _this3);
				});
			}

			this.linksScroll();

			if (exists(this.navigation)) {
				this.navigationScroll();
			}

			// this.buttons.forEach( (button) => {
			// 	button.addEventListener('click', (e) => this._showButtonClick(e, this));
			// });
		}

		_createClass(Navigation, [{
			key: 'checkScrollY',
			value: function checkScrollY() {
				window.scrollY > 0 ? addClass(this.navigation, 'nav_scrolled') : removeClass(this.navigation, 'nav_scrolled');
			}
		}, {
			key: 'navigationScroll',
			value: function navigationScroll() {
				var _this4 = this;

				this.checkScrollY();

				window.addEventListener("scroll", function () {
					return _this4.checkScrollY();
				});
			}
		}, {
			key: 'hamburgerClick',
			value: function hamburgerClick(el) {
				toggleClass(this.hamburger, 'active');
				toggleClass(this.navigation, 'nav__menu_active');
			}
		}, {
			key: 'additionClick',
			value: function additionClick(el) {
				toggleClass(this.addition, 'active');
			}
		}, {
			key: 'linksScroll',
			value: function linksScroll() {
				var _this5 = this;

				new SmoothScroll(this.links, {
					after: function after() {
						removeClass(_this5.hamburger, 'active');
						removeClass(_this5.navigation, 'nav__menu_active');
					}
				});
			}
		}]);

		return Navigation;
	}();

	document.addEventListener("DOMContentLoaded", function () {
		new Modal();

		new Navigation();
	});
})();