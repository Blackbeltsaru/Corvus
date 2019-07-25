'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.BIT = BIT;

var _CorvusLogger = require('../Logger/CorvusLogger');

var _CorvusLogger2 = _interopRequireDefault(_CorvusLogger);

var _WebWindow = require('../../platform/WebWindow');

var _WebWindow2 = _interopRequireDefault(_WebWindow);

var _Events = require('../Events/Events');

var _ApplicationEvent = require('../Events/ApplicationEvent');

var _NotImplementedError = require('../Error/NotImplementedError');

var _NotImplementedError2 = _interopRequireDefault(_NotImplementedError);

var _Window = require('../Window/Window');

var _LayerStack = require('../Layer/LayerStack');

var _LayerStack2 = _interopRequireDefault(_LayerStack);

var _Input = require('../Input/Input');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//This returns a bit field with the x+1th bit on
//This can be used for bitwise operations 
function BIT(x) {
    return 1 << x;
};

var Application = function () {
    _createClass(Application, null, [{
        key: 'getInstance',


        //Class variables 
        // _Window;
        // _Running;
        // _LayerStack;

        // static s_Instance;
        value: function getInstance() {
            return Application.s_instance;
        }

        /**
         * This initialized the application.
         * Create the window and sets the eventCallback for the window
         */

    }]);

    function Application() {
        _classCallCheck(this, Application);

        //TODO: logging should be removed from release builds
        _CorvusLogger2.default.coreLogger.info('Constructing Application');
        _CorvusLogger2.default.coreLogger.assert(!Application.getInstance(), "Application already exists");
        Application.s_Instance = this;
        this.onEvent = this.onEvent.bind(this);

        this._Running = true;
        this._Window = _WebWindow2.default.create(new _Window.WindowProps());
        this._Window.setEventCallback(this.onEvent);
        this._LayerStack = new _LayerStack2.default();
        _CorvusLogger2.default.coreLogger.info('Application constructed with ', this._Running, this._Window, this._LayerStack);
    }

    /**
     * The event callback used by the window
     * @param {Event} event The event that will be propagated 
     */


    _createClass(Application, [{
        key: 'onEvent',
        value: function onEvent(event) {
            var dispatcher = new _Events.EventDispatcher(event);

            for (var it = this._LayerStack.end(); it !== this._LayerStack.begin(); it--) {
                this._LayerStack.get(it).onEvent(e);
                if (e.handled) break;
            }
        }

        /**
         * The main run loop
         */

    }, {
        key: 'run',
        value: function run() {
            //TODO: do application update-y stuff here

            var mousePos = _Input2.default.getMousePosition();

            _CorvusLogger2.default.coreLogger.info('Mouse Position', mousePos);

            for (var it = this._LayerStack.begin(); it !== this._LayerStack.end(); it++) {
                this._LayerStack.get(it).onUpdate();
            }

            if (this._Running) this._Window.onUpdate(this.run);
        }

        /** @returns {Window} the current window of the application */

    }, {
        key: 'getWindow',
        value: function getWindow() {
            return this._Window;
        }
        /** @returns {Application} the current instance of the application */

    }, {
        key: 'pushLayer',
        value: function pushLayer(layer) {
            this._LayerStack.pushLayer(layer);
            layer.onAttach();
        }
    }, {
        key: 'pushOverlay',
        value: function pushOverlay(layer) {
            this._LayerStack.pushOverlay(layer);
        }
    }], [{
        key: 'get',
        value: function get() {
            return Application.getInstance();
        }

        /**
         * A static method to create the application
         * This should be implemented by the client
         */

    }, {
        key: 'createApplication',
        value: function createApplication() {
            throw new _NotImplementedError2.default();
        }
    }]);

    return Application;
}();

exports.default = Application;