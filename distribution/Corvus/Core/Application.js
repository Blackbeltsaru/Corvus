'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.BIT = BIT;

var _CorvusLogger = require('../Logger/CorvusLogger');

var _CorvusLogger2 = _interopRequireDefault(_CorvusLogger);

var _WebWindow = require('../../platform/Web/WebWindow');

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

var _Shader = require('../Shader/Shader');

var _Shader2 = _interopRequireDefault(_Shader);

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

        //vertextArray
        //vertexBuffer
        //indexBuffer

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

        //Bind functions
        this.onEvent = this.onEvent.bind(this);
        this.run = this.run.bind(this);

        this._Running = true;
        this._Window = _WebWindow2.default.create(new _Window.WindowProps());
        this._Window.setEventCallback(this.onEvent);
        this._LayerStack = new _LayerStack2.default();
        _CorvusLogger2.default.coreLogger.info('Application constructed with ', this._Running, this._Window, this._LayerStack);

        //Setup webGL buffers
        //HACK
        //=================================================================================
        //=================================================================================
        //TODO:(Ryan) this is webGL specific and should be move to a platform file
        var context = this._Window.getContext().getGraphicsContext();
        //TODO:(Ryan) read about these methods and understand whats going on

        _CorvusLogger2.default.GetCoreLogger().warn("Finished Rendering");

        //=================================================================================
        //=================================================================================
        //END HACK

        //Bind functions
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
            var context = this._Window.getContext().getGraphicsContext();

            context.clearColor(0.8, 0.2, 0.3, 0.9);
            context.enable(context.DEPTH_TEST);
            context.clear(context.COLOR_BUFFER_BIT);
            context.clear(context.DEPTH_BUFFER_BIT);
            context.viewport(0, 0, this._Window.width, this._Window.height);

            // this.vertextArray = context.createVertexArray();
            // context.bindVertexArray(this.vertextArray);
            var verticies = [-0.5, 0.5, -0.5, -0.5, 0.0, -0.5];

            this.vertextBuffer = context.createBuffer();
            context.bindBuffer(context.ARRAY_BUFFER, this.vertextBuffer);
            context.bufferData(context.ARRAY_BUFFER, new Float32Array(verticies), context.STATIC_DRAW);
            context.bindBuffer(context.ARRAY_BUFFER, null);

            var vertexSrc = 'attribute vec2 coords;' + 'void main(void) {' + ' gl_Position = vec4(coords, 0.0, 1.0);' + '}';
            var vertShader = _compileShader(context, context.VERTEX_SHADER, vertexSrc);

            var fragmentSrc = 'void main(void) {' + ' gl_FragColor = vec4(0.2, 0.8, 0.3, 0.1);' + '}';
            var fragShader = _compileShader(context, context.FRAGMENT_SHADER, fragmentSrc);
            var shaderProgram = _programShader(context, vertShader, fragShader);

            // this.shader = new Shader(context, vertexSrc, fragmentSrc);

            context.bindBuffer(context.ARRAY_BUFFER, this.vertextBuffer);
            var coords = context.getAttribLocation(shaderProgram, "coords");
            context.vertexAttribPointer(coords, 2, context.FLOAT, false, 0, 0);
            context.enableVertexAttribArray(coords);

            // this.indexBuffer = context.createBuffer();
            // context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

            // let indices = [0, 1, 2];
            // context.bufferData(context.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), context.STATIC_DRAW);

            // this.shader.bind()
            context.drawArrays(context.TRIANGLES, 0, verticies.length);

            for (var it = this._LayerStack.begin(); it !== this._LayerStack.end(); it++) {
                this._LayerStack.get(it).onUpdate();
            }
            //TODO:(Ryan) Do we need to have a layer render here?

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

var _compileShader = function _compileShader(context, sahderType, shaderCode) {
    var shader = context.createShader(sahderType);
    context.shaderSource(shader, shaderCode);
    context.compileShader(shader);
    return shader;
};

var _programShader = function _programShader(context, vertexShader, fragmentShader) {
    var shaderProgram = context.createProgram();
    context.attachShader(shaderProgram, vertexShader);
    context.attachShader(shaderProgram, fragmentShader);
    context.linkProgram(shaderProgram);
    context.useProgram(shaderProgram);
    return shaderProgram;
};

exports.default = Application;