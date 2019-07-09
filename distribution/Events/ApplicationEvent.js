'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AppRenderEvent = exports.AppUpdateEvent = exports.AppTickEvent = exports.WindowCloseEvent = exports.WindowResizeEvent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Events = require('./Events');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * An event to represent that the window has been resized
 */
var WindowResizeEvent = exports.WindowResizeEvent = function (_Event) {
    _inherits(WindowResizeEvent, _Event);

    //Class variables
    // _width;
    // _height;
    /**
     * @param {number} width the new width of the window
     * @param {number} height the new height of the window
     */
    function WindowResizeEvent(width, height) {
        _classCallCheck(this, WindowResizeEvent);

        var _this = _possibleConstructorReturn(this, (WindowResizeEvent.__proto__ || Object.getPrototypeOf(WindowResizeEvent)).call(this));

        _this._width = width;
        _this._height = height;
        return _this;
    }

    /**@returns {number} the new width of the window*/


    _createClass(WindowResizeEvent, [{
        key: 'getWidth',
        value: function getWidth() {
            return this._width;
        }
        /**@returns {number} the new height of the window*/

    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this._height;
        }

        /**The tostring method used for logging */

    }, {
        key: 'toString',
        value: function toString() {
            return 'WindowResizeEvent: ' + this._width + ', ' + this._height;
        }

        /**@returns {Events} the type of the event */

    }, {
        key: 'getName',

        /**@returns {string} the name of the event */
        value: function getName() {
            return 'WindowResize';
        }

        /**@returns {EventCategories} which categories the event falls under */

    }, {
        key: 'getCategoryFlags',
        value: function getCategoryFlags() {
            return _Events.EventCategories.ApplicationCategory;
        }
    }], [{
        key: 'getStaticType',
        value: function getStaticType() {
            return _Events.Events.WindowResize;
        }
    }]);

    return WindowResizeEvent;
}(_Events.Event);

/**
 * An event to represent that the window has been closed
 */


var WindowCloseEvent = exports.WindowCloseEvent = function (_Event2) {
    _inherits(WindowCloseEvent, _Event2);

    function WindowCloseEvent() {
        _classCallCheck(this, WindowCloseEvent);

        return _possibleConstructorReturn(this, (WindowCloseEvent.__proto__ || Object.getPrototypeOf(WindowCloseEvent)).apply(this, arguments));
    }

    _createClass(WindowCloseEvent, [{
        key: 'getName',
        value: function getName() {
            return 'WinddowClose';
        }
    }, {
        key: 'getCategoryFlags',
        value: function getCategoryFlags() {
            return _Events.EventCategories.ApplicationCategory;
        }
    }], [{
        key: 'getStaticType',
        value: function getStaticType() {
            return _Events.Events.WindowClose;
        }
    }]);

    return WindowCloseEvent;
}(_Events.Event);

/**
 * An event to represent and application tick
 */


var AppTickEvent = exports.AppTickEvent = function (_Event3) {
    _inherits(AppTickEvent, _Event3);

    function AppTickEvent() {
        _classCallCheck(this, AppTickEvent);

        return _possibleConstructorReturn(this, (AppTickEvent.__proto__ || Object.getPrototypeOf(AppTickEvent)).apply(this, arguments));
    }

    _createClass(AppTickEvent, [{
        key: 'getName',
        value: function getName() {
            return 'AppTick';
        }
    }, {
        key: 'getCategoryFlags',
        value: function getCategoryFlags() {
            return _Events.EventCategories.ApplicationCategory;
        }
    }], [{
        key: 'getStaticType',
        value: function getStaticType() {
            return _Events.Events.AppTick;
        }
    }]);

    return AppTickEvent;
}(_Events.Event);

/**
 * An event to represent an application update
 */


var AppUpdateEvent = exports.AppUpdateEvent = function (_Event4) {
    _inherits(AppUpdateEvent, _Event4);

    function AppUpdateEvent() {
        _classCallCheck(this, AppUpdateEvent);

        return _possibleConstructorReturn(this, (AppUpdateEvent.__proto__ || Object.getPrototypeOf(AppUpdateEvent)).apply(this, arguments));
    }

    _createClass(AppUpdateEvent, [{
        key: 'getName',
        value: function getName() {
            return 'AppUpdate';
        }
    }, {
        key: 'getCategoryFlags',
        value: function getCategoryFlags() {
            return _Events.EventCategories.ApplicationCategory;
        }
    }], [{
        key: 'getStaticType',
        value: function getStaticType() {
            return _Events.Events.AppUpdate;
        }
    }]);

    return AppUpdateEvent;
}(_Events.Event);

/**
 * An event to represent an application render
 */


var AppRenderEvent = exports.AppRenderEvent = function (_Event5) {
    _inherits(AppRenderEvent, _Event5);

    function AppRenderEvent() {
        _classCallCheck(this, AppRenderEvent);

        return _possibleConstructorReturn(this, (AppRenderEvent.__proto__ || Object.getPrototypeOf(AppRenderEvent)).apply(this, arguments));
    }

    _createClass(AppRenderEvent, [{
        key: 'getName',
        value: function getName() {
            return 'AppRender';
        }
    }, {
        key: 'getCategoryFlags',
        value: function getCategoryFlags() {
            return _Events.EventCategories.ApplicationCategory;
        }
    }], [{
        key: 'getStaticType',
        value: function getStaticType() {
            return _Events.Events.AppRender;
        }
    }]);

    return AppRenderEvent;
}(_Events.Event);