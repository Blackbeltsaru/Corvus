'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Window2 = require('../../Corvus/Window/Window');

var _CorvusLogger = require('../../Corvus/Logger/CorvusLogger');

var _CorvusLogger2 = _interopRequireDefault(_CorvusLogger);

var _KeyboardEvent = require('../../Corvus/Events/KeyboardEvent');

var _MouseEvent = require('../../Corvus/Events/MouseEvent');

var _Input = require('../../Corvus/Input/Input');

var _Input2 = _interopRequireDefault(_Input);

var _WebInput = require('./WebInput');

var _WebInput2 = _interopRequireDefault(_WebInput);

var _WebGLContext = require('../WebGL/WebGLContext');

var _WebGLContext2 = _interopRequireDefault(_WebGLContext);

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
                //TODO:(Ryan) currently glmatrix is installed as a dependency of the child - this should be changed
                //Initialize the math library glMatrix
                // const glMatrixScript = document.createElement('script');
                // glMatrixScript.setAttribute('src', '../Libraries/gl-matrix-min.js')
                // document.head.appendChild(glMatrixScript);

                //Create the input instance
                //In other languages this input instance can be created statically at run time
                //However, I can't seem to get that to work in js
                //It is safe to assume we are using web input here because we are in a web window
                _WebInput2.default.createInstance();

                this._Window = document.getElementById('canvas');
                this._Window.tabIndex = 1;
                this._Context = new _WebGLContext2.default(this._Window);

                WebWindow.initialized = true;
            }

            this._Window.width = props.width;
            this._Window.height = props.height;

            this._Context.init();

            //Set event callbacks
            this._Window.addEventListener("keydown", function (e) {
                e.preventDefault();
                var keyEvent = new _KeyboardEvent.KeyPressedEvent(e.keyCode, e.repeat ? 1 : 0); //keydown is only for the initial press TODO: track modifier keys?
                _Input2.default.getKeyContainer().onKeyDown(e.keyCode);
                _this2._Data.eventCallback(keyEvent);
            }, false);
            this._Window.addEventListener("keyup", function (e) {
                e.preventDefault();
                var keyEvent = new _KeyboardEvent.KeyReleasedEvent(e.keyCode);
                _Input2.default.getKeyContainer().onKeyUp(e.keyCode);
                _this2._Data.eventCallback(keyEvent);
            }, false);
            this._Window.addEventListener("mousedown", function (e) {
                e.preventDefault();
                //When we click on the canvas we want the engine to focus on the canvas - this should be an engine level operation 
                //This ensures that keyboard events get captured properly
                _this2._Window.focus();
                var mouseEvent = new _MouseEvent.MousePressedEvent(e.button);
                _Input2.default.getKeyContainer().onMouseDown(e.button);
                _this2._Data.eventCallback(mouseEvent);
            }, false);
            this._Window.addEventListener("mouseup", function (e) {
                e.preventDefault();
                var mouseEvent = new _MouseEvent.MouseReleasedEvent(e.button);
                _Input2.default.getKeyContainer().onMouseUp(e.button);
                _this2._Data.eventCallback(mouseEvent);
            }, false);
            this._Window.addEventListener("wheel", function (e) {
                e.preventDefault();
                var scrollEvent = new _MouseEvent.MouseScrolledEvent(e.wheelDeltaX, e.wheelDeltaY);
                _this2._Data.eventCallback(scrollEvent);
            }, false);
            this._Window.addEventListener("mousemove", function (e) {
                e.preventDefault();
                var mouseEvent = new _MouseEvent.MouseMovedEvent(e.layerX, e.layerY);
                _Input2.default.getKeyContainer().onMouseMove(e.layerX, e.layerY);
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
            window.requestAnimationFrame(callback);
            // this._Context.swapBuffers();?
        }
    }, {
        key: 'setEventCallback',
        value: function setEventCallback(eventCallback) {
            this._Data.eventCallback = eventCallback;
        }
    }, {
        key: 'getNativeWindow',
        value: function getNativeWindow() {
            return this._Window;
        }
    }, {
        key: 'getContext',
        value: function getContext() {
            return this._Context;
        }
    }], [{
        key: 'frameworkErrorCallback',
        value: function frameworkErrorCallback(error, description) {
            _CorvusLogger2.default.coreLogger.error('Error in framework ' + error + ': ' + description);
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