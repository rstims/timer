(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["timer"] = factory();
	else
		root["timer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(1).default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _xtend = __webpack_require__(2);

	var _xtend2 = _interopRequireDefault(_xtend);

	var _Base = __webpack_require__(3);

	var _Base2 = _interopRequireDefault(_Base);

	var _Animations = __webpack_require__(4);

	var _Animations2 = _interopRequireDefault(_Animations);

	var _Cookies = __webpack_require__(6);

	var _Cookies2 = _interopRequireDefault(_Cookies);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Timer = function () {
	    function Timer() {
	        var _this = this;

	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, Timer);

	        this.options = (0, _xtend2.default)(Timer.options, options);

	        this.transitionEnd = 'webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd, transitionEnd';

	        this._setupElements();

	        this.base = new _Base2.default();

	        this.animations = new _Animations2.default(this.options, this.elements, this.base);
	        this.cookies = new _Cookies2.default();

	        this.elements.reset.addEventListener('click', function (e) {
	            _this.elements.showLoader();
	            _this.reset();
	        }, false);

	        this.init();
	    }

	    _createClass(Timer, [{
	        key: 'setClick',
	        value: function setClick() {
	            this.elements.timer.addEventListener('click', this.fn, false);
	        }
	    }, {
	        key: 'setMessage',
	        value: function setMessage(messageType) {
	            var txt;
	            switch (messageType) {
	                case 'start':
	                    txt = Timer.startText.replace('%%duration%%', this.options.duration);
	                    break;
	                case 'end':
	                    txt = Timer.endText.replace('%%duration%%', this.options.duration);
	                    break;
	                default:
	                    txt = Timer.defaultText;
	                    break;
	            }

	            this.elements.message.innerHTML = txt;
	        }
	    }, {
	        key: 'init',
	        value: function init() {
	            var _this2 = this;

	            var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


	            this.fn = function (e) {
	                _this2.start();
	            };

	            this.setClick();

	            this.base.addClass(this.elements.message, 'timer__message--start');

	            if (this.options.inputControl) {
	                this.setMessage();
	            } else {
	                this.setMessage('start');
	            }

	            this.elements.message.style.display = 'block';

	            this.elements.hideLoader();
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            var _this3 = this;

	            this.elements.timer.removeEventListener('click', this.fn);

	            if (this.options.inputControl && this.options.inputControl == 0) {
	                alert('Value must be greater than 0');
	                return;
	            }

	            this.options['duration'] = this.options.inputControl ? this.options.inputControl.value : this.options.duration;

	            this.animations.run(this.options.duration, function () {
	                _this3.end();
	            });
	        }
	    }, {
	        key: 'end',
	        value: function end() {

	            this.setMessage('end');
	            this.elements.message.style.display = 'block';
	            this.elements.reset.style.display = 'block';
	        }
	    }, {
	        key: 'reset',
	        value: function reset() {
	            var _this4 = this;

	            console.log(1);
	            this.elements.message.style.display = 'none';
	            this.elements.reset.style.display = 'none';

	            var fn = function fn(e) {

	                _this4.base.removeClass(_this4.elements.message, 'timer__message--end');
	                _this4.base.removeClass(_this4.elements.timer, 'timer--not-reset');
	                _this4.base.addClass(_this4.elements.timer, 'timer--reset');
	                _this4.init();
	            };

	            this.base.onetime(this.elements.progress, this.transitionEnd, fn);

	            this.elements.progress.style.right = '100%';
	        }
	    }, {
	        key: '_setupElements',
	        value: function _setupElements() {
	            this.elements = {
	                timer: document.querySelector('.timer'),
	                progress: document.querySelector('.timer__progress'),
	                reset: document.querySelector('.timer__reset'),
	                loader: document.querySelector('.timer__loader'),
	                message: document.querySelector('.timer__message'),
	                showLoader: function showLoader() {
	                    console.log('showLoader');
	                    this.loader.style.display = 'block';
	                },
	                hideLoader: function hideLoader() {
	                    console.log('hideLoader');
	                    this.loader.style.display = 'none';
	                }
	            };

	            if (this.options.readyBGColor !== '') {
	                this.elements.timer.style.background = this.options.readyBGColor;
	            }
	            if (this.options.progressBGColor !== '') {
	                this.elements.progress.style.background = this.options.progressBGColor;
	            }
	        }
	    }]);

	    return Timer;
	}();

	//Will use str.replace() for display


	Timer.startText = 'Click to begin a %%duration%%-minute timer';
	Timer.endText = '%%duration%% minutes have passed';
	Timer.defaultText = 'Please choose time';

	// Overrideable options
	Timer.options = {
	    duration: 10,
	    readyBGColor: '',
	    progressBGColor: '',
	    endChime: '',
	    inputControl: false
	};
	exports.default = Timer;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = extend

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	function extend() {
	    var target = {}

	    for (var i = 0; i < arguments.length; i++) {
	        var source = arguments[i]

	        for (var key in source) {
	            if (hasOwnProperty.call(source, key)) {
	                target[key] = source[key]
	            }
	        }
	    }

	    return target
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Base = function () {
	    function Base() {
	        _classCallCheck(this, Base);
	    }

	    _createClass(Base, [{
	        key: 'removeClass',
	        value: function removeClass(el, cls) {
	            var classes = cls.split(' ');

	            for (var i = 0; i < classes.length; i++) {
	                el.classList.remove(classes[i]);
	            }
	        }
	    }, {
	        key: 'addClass',
	        value: function addClass(el, cls) {
	            var classes = cls.split(' ');

	            for (var i = 0; i < classes.length; i++) {
	                el.classList.add(classes[i]);
	            }
	        }
	    }, {
	        key: 'toggleClass',
	        value: function toggleClass(el, cls) {
	            var classes = cls.split(' ');

	            for (var i = 0; i < classes.length; i++) {
	                el.classList.toggle(classes[i]);
	            }
	        }
	    }, {
	        key: 'hasClass',
	        value: function hasClass(el, cls) {

	            var classes = cls.split(' ');

	            for (var i = 0; i < classes.length; i++) {
	                if (!el.classList.contains(classes[i])) {
	                    return false;
	                }
	            }

	            return true;
	        }
	    }, {
	        key: 'onetime',
	        value: function onetime(node, type, callback) {
	            var types = type.split(' '),
	                fn = function fn(e) {
	                for (var p = 0; p < types.length; p++) {
	                    e.target.removeEventListener(types[p], fn);
	                }
	                return callback(e);
	            };

	            for (var p = 0; p < types.length; p++) {
	                node.addEventListener(types[p], fn, false);
	            }
	        }
	    }, {
	        key: 'fireEvent',
	        value: function fireEvent(node, eventName) {
	            var event = new CustomEvent(eventName);
	            // The second parameter says go ahead with the default action
	            node.dispatchEvent(event, true);
	        }
	    }]);

	    return Base;
	}();

	exports.default = Base;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Sound = __webpack_require__(5);

	var _Sound2 = _interopRequireDefault(_Sound);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Animations = function () {
	    function Animations(options, elements, base) {
	        _classCallCheck(this, Animations);

	        this.sound = new _Sound2.default();

	        this.options = options;
	        this.elements = elements;
	        this.base = base;
	        this.init();

	        this.sound.init(this.options.endChime, 100, false, false);
	        this.transitionSeconds = 1000;
	    }

	    _createClass(Animations, [{
	        key: 'init',
	        value: function init() {
	            this.count = 100;
	            //this.sound.remove();
	        }
	    }, {
	        key: 'run',
	        value: function run() {
	            var _this = this;

	            var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	            console.log("Started timer...");
	            this.callback = callback;
	            this.durationSeconds = duration * 60;

	            this.base.removeClass(this.elements.message, 'timer__message--start');

	            this.base.removeClass(this.elements.timer, 'timer--stopped timer--reset');
	            this.base.addClass(this.elements.timer, 'timer--running');

	            this.base.addClass(this.elements.progress, 'timer__progress--running');

	            this.elements.message.style.display = 'none';

	            this.count = this.increment = 100 / this.durationSeconds;

	            this.setVendor(this.elements.progress, 'TransitionDuration', this.transitionSeconds / 1000 + 's');
	            console.log(this.elements.progress.style);
	            this.runInterval = setInterval(function () {
	                _this.step();
	            }, 1000);
	            return;
	        }
	    }, {
	        key: 'step',
	        value: function step() {
	            var _this2 = this;

	            console.log(this.count);
	            this.elements.progress.style.right = 100 - this.count + '%';

	            if (100 == parseInt(this.count)) {

	                setTimeout(function () {
	                    _this2.sound.start();
	                    _this2.stop();
	                    return;
	                }, this.transitionSeconds);
	            }

	            this.count += this.increment;
	            if (this.count > 100) {
	                this.count = 100;
	            }
	            return;
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {

	            this.count = 0;
	            clearInterval(this.runInterval);

	            this.base.addClass(this.elements.message, 'timer__message--end');

	            this.base.removeClass(this.elements.timer, 'timer--running');
	            this.base.removeClass(this.elements.progress, 'timer__progress--running');
	            this.base.addClass(this.elements.timer, 'timer--stopped timer--not-reset');

	            console.log("Stopped timer...");
	            this.init();
	            this.callback();
	            return;
	        }
	    }, {
	        key: 'setVendor',
	        value: function setVendor(element, property, value) {
	            element.style["webkit" + property] = value;
	            element.style["moz" + property] = value;
	            element.style["ms" + property] = value;
	            element.style["o" + property] = value;
	            return;
	        }
	    }]);

	    return Animations;
	}();

	exports.default = Animations;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Sound = function () {
	    function Sound() {
	        _classCallCheck(this, Sound);

	        var son;
	        this.son = son;
	        this.finish = false;
	    }

	    _createClass(Sound, [{
	        key: "stop",
	        value: function stop() {
	            //document.body.removeChild(this.son);
	            this.son.pause();
	            this.son.currentTime = 0;
	        }
	    }, {
	        key: "start",
	        value: function start() {
	            var _this = this;

	            this.son.play();

	            setTimeout(function () {
	                _this.stop();
	            }, this.son.duration * 1000);
	        }
	    }, {
	        key: "remove",
	        value: function remove() {

	            if (this.son == null) {
	                return false;
	            }

	            document.body.removeChild(this.son);
	            this.finish = true;
	        }
	    }, {
	        key: "init",
	        value: function init() {
	            var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	            var volume = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
	            var loop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	            var autoplay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

	            this.finish = false;
	            this.volume = volume;
	            this.loop = loop;

	            if (source === "") {
	                return;
	            }

	            this.source = source;
	            this.volume = volume;
	            this.loop = loop;

	            if (this.finish) return false;
	            this.son = document.createElement("audio");
	            this.son.setAttribute("src", this.source);
	            this.son.setAttribute("style", "visibility:hidden;height:0;");
	            this.son.setAttribute("volume", this.volume);
	            this.son.setAttribute("autostart", autoplay);
	            this.son.setAttribute("loop", this.loop);
	            document.body.appendChild(this.son);
	        }
	    }]);

	    return Sound;
	}();

	exports.default = Sound;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Cookies = function () {
	  function Cookies() {
	    _classCallCheck(this, Cookies);
	  }

	  _createClass(Cookies, [{
	    key: "set",
	    value: function set(name, value, days, path) {
	      if (days) {
	        var date = new Date();
	        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
	        var expires = "; expires=" + date.toGMTString();
	      } else var expires = "";

	      var dir = path || '/';
	      document.cookie = name + "=" + value + expires + "; path=" + dir;
	    }
	  }, {
	    key: "get",
	    value: function get(name) {
	      var nameEQ = name + "=";
	      var ca = document.cookie.split(';');
	      for (var i = 0; i < ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') {
	          c = c.substring(1, c.length);
	        }if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	      }
	      return null;
	    }
	  }, {
	    key: "delete",
	    value: function _delete(name) {
	      this.set(name, "", -1);
	    }
	  }]);

	  return Cookies;
	}();

	exports.default = Cookies;

/***/ }
/******/ ])
});
;