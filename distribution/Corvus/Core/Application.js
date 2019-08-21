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
        value: function getInstance() {
            return Application.instance;
        }
    }]);

    function Application() {
        _classCallCheck(this, Application);

        //TODO: logging should be removed from release builds
        _CorvusLogger2.default.coreLogger.info('Constructing Application');
        _CorvusLogger2.default.coreLogger.assert(!Application.getInstance(), "Application already exists");
        Application.instance = this;

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
        context.enable(context.DEPTH_TEST);
        context.viewport(0, 0, canvas.width, canvas.height);

        this.vertexArray = context.createVertexArray();
        context.bindVertexArray(this.vertexArray);

        var vertices = [-0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.0, -0.5, 0.0];

        //Bind to the array buffer to create a vertex buffer
        //This vertext buffer is used later for rendering the object
        var vertexBuffer = context.createBuffer();
        context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer);
        context.bufferData(context.ARRAY_BUFFER, new Float32Array(vertices), context.STATIC_DRAW);

        //Lets build and compile both the vertex and fragment shaders
        var vertexSrc = 'precision mediump float;' + 'attribute vec3 coords;' + 'varying vec3 outPosition;' + 'void main(void) {' + ' outPosition = coords;' + ' gl_Position = vec4(coords, 1.0);' + '}';

        var fragmentSrc = 'precision mediump float;' + 'varying vec3 outPosition;' + 'void main(void) {' + ' gl_FragColor = vec4(outPosition * 0.5 + 0.5, 1);' + '}';
        this.shader = new _Shader2.default(context, vertexSrc, fragmentSrc);
        this.shader.bind();

        //Each attribute on the vertex shader needs to be bound to a vertex buffer
        var coords = context.getAttribLocation(this.shader.getShader(), "coords");
        context.vertexAttribPointer(coords, 3, context.FLOAT, false, 0, 0);
        context.enableVertexAttribArray(coords);

        var indices = [0, 1, 2];
        var indexBuffer = context.createBuffer();
        context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, indexBuffer);
        context.bufferData(context.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), context.STATIC_DRAW);

        //=================================================================================
        //=================================================================================
        //END HACK
    }

    _createClass(Application, [{
        key: 'onEvent',
        value: function onEvent() {
            var dispatcher = new _Events.EventDispatcher(event);

            for (var it = this._LayerStack.end(); it !== this._LayerStack.begin(); it--) {
                this._LayerStack.get(it).onEvent(e);
                if (e.handled) break;
            }
        }
    }, {
        key: 'pushLayer',
        value: function pushLayer() {
            this._LayerStack.pushLayer(layer);
            layer.onAttach();
        }
    }, {
        key: 'popLayer',
        value: function popLayer() {
            this._LayerStack.pushOverlay(layer);
        }
    }, {
        key: 'getWindow',
        value: function getWindow() {
            return this._Window;
        }
    }, {
        key: 'run',
        value: function run() {
            var context = this._Window.getContext().getGraphicsContext();

            context.clearColor(0.8, 0.2, 0.3, 0.9);
            context.clear(context.COLOR_BUFFER_BIT);
            context.clear(context.DEPTH_BUFFER_BIT);

            this.shader.bind();

            context.bindVertexArray(this.vertexArray);

            context.drawElements(context.TRIANGLES, 3, context.UNSIGNED_SHORT, 0);

            for (var it = this._LayerStack.begin(); it !== this._LayerStack.end(); it++) {
                this._LayerStack.get(it).onUpdate();
            }
            //TODO:(Ryan) Do we need to have a layer render here?

            if (this._Running) this._Window.onUpdate(this.run);
        }
    }], [{
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