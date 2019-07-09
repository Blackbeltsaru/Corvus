'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Window2 = require('../Window/Window');

var _CorvusLogger = require('../Logger/CorvusLogger');

var _CorvusLogger2 = _interopRequireDefault(_CorvusLogger);

var _NotImplementedError = require('../Error/NotImplementedError');

var _NotImplementedError2 = _interopRequireDefault(_NotImplementedError);

var _KeyboardEvent = require('../Events/KeyboardEvent');

var _MouseEvent = require('../Events/MouseEvent');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** A helper "class" to create window data */
var WindowData = function WindowData(title, width, height, vSync, eventCallback) {
    return { title: title, width: width, height: height, vSync: vSync, eventCallback: eventCallback };
};

var WebWindow = function (_Window) {
    _inherits(WebWindow, _Window);

    //Class variables
    // _Window;
    // _Context;
    // _Data;

    // static initialized = false;

    function WebWindow(props) {
        _classCallCheck(this, WebWindow);

        if (typeof WebWindow.initialized !== 'undefined') WebWindow.initialized = false;

        var _this = _possibleConstructorReturn(this, (WebWindow.__proto__ || Object.getPrototypeOf(WebWindow)).call(this));

        _this.init(props);
        return _this;
    }

    _createClass(WebWindow, [{
        key: 'init',
        value: function init(props) {
            var _this2 = this;

            this._Data = new WindowData(props.title, props.width, props.height);
            _CorvusLogger2.default.GetCoreLogger().info('Creating window ' + props.title + ' (' + props.width + ', ' + props.height + ')');

            if (!WebWindow.initialized) {
                this._Window = document.getElementById('canvas');
                this._Window.tabIndex = 1;
                this._Context = this._Window.getContext('webgl'); //TODO: abstract this out to support multiple browsers 

                var success = !!this._Context;
                _CorvusLogger2.default.GetCoreLogger().assert(success, 'Could not initialize WebGL');

                WebWindow.initialized = true;
            }

            this._Window.width = props.width;
            this._Window.height = props.height;

            this._Context.viewport(0, 0, props.width, props.height);

            //Set event callbacks
            this._Window.addEventListener("keydown", function (e) {
                e.preventDefault();
                var keyEvent = new _KeyboardEvent.KeyPressedEvent(e.keyCode, e.repeat ? 1 : 0); //keydown is only for the initial press TODO: track modifier keys?
                _this2._Data.eventCallback(keyEvent);
            }, false);
            this._Window.addEventListener("keyup", function (e) {
                e.preventDefault();
                var keyEvent = new _KeyboardEvent.KeyReleasedEvent(e.keyCode);
                _this2._Data.eventCallback(keyEvent);
            }, false);
            this._Window.addEventListener("mousedown", function (e) {
                e.preventDefault();
                //When we click on the canvas we want the engine to focus on the canvas - this should be an engine level operation 
                //This ensures that keyboard events get captured properly
                _this2._Window.focus();
                var mouseEvent = new _MouseEvent.MousePressedEvent(e.button);
                _this2._Data.eventCallback(mouseEvent);
            }, false);
            this._Window.addEventListener("mouseup", function (e) {
                e.preventDefault();
                var mouseEvent = new _MouseEvent.MouseReleasedEvent(e.button);
                _this2._Data.eventCallback(mouseEvent);
            }, false);
            this._Window.addEventListener("wheel", function (e) {
                e.preventDefault();
                var scrollEvent = new _MouseEvent.MouseScrolledEvent(e.wheelDeltaX, e.wheelDeltaY);
                _this2._Data.eventCallback(scrollEvent);
            }, false);
            this._Window.addEventListener("mousemove", function (e) {
                e.preventDefault();
                console.log('mousemove', e);
                var mouseEvent = new _MouseEvent.MouseMovedEvent(e.layerX, e.layerY);
                _this2._Data.eventCallback(mouseEvent);
            }, false);

            //Prevent right click context menu
            //TODO: add context menu event wrapper
            this._Window.addEventListener("contextmenu", function (e) {
                e.preventDefault();
                return false;
            }, false);
        }
    }, {
        key: 'shutdown',
        value: function shutdown() {
            //TODO: destroy the window?
            this._Context = null;
            this._Window = null;
        }
    }, {
        key: 'onUpdate',
        value: function onUpdate(callback) {
            //TODO: what do I do here
            _CorvusLogger2.default.GetCoreLogger().warn('typeof this.context = ', _typeof(this._Context));
            this._Context.requestAnimationFrame(callback);
        }
    }, {
        key: 'setEventCallback',
        value: function setEventCallback(eventCallback) {
            this._Data.eventCallback = eventCallback;
        }
    }], [{
        key: 'frameworkErrorCallback',
        value: function frameworkErrorCallback(error, description) {
            _CorvusLogger2.default.GetCoreLogger().error('Error in framework ' + error + ': ' + description);
        }
    }, {
        key: 'create',
        value: function create(props) {
            return new WebWindow(props);
        }
    }]);

    return WebWindow;
}(_Window2.Window);

exports.default = WebWindow;