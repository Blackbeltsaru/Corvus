"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CorvusLogger = require("../Logger/CorvusLogger");

var _CorvusLogger2 = _interopRequireDefault(_CorvusLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shader = function () {
    function Shader(glContext, vertexSrc, fragmentSrc) {
        _classCallCheck(this, Shader);

        this.glContext = glContext;

        var vertexShader = this._compileShader(glContext, glContext.VERTEX_SHADER, vertexSrc);
        var message = glContext.getShaderInfoLog(vertexShader);
        if (message.length > 0) {
            glContext.deleteShader(vertexShader);

            _CorvusLogger2.default.GetCoreLogger().error("Vertex Shader compilation failure:");
            _CorvusLogger2.default.GetCoreLogger().error(message);

            throw new Error("Vertex Shader compilation failure " + message);
        }

        var fragmentShader = this._compileShader(glContext, glContext.FRAGMENT_SHADER, fragmentSrc);
        message = glContext.getShaderInfoLog(fragmentShader);
        if (message.length > 0) {
            glContext.deleteShader(vertexShader);
            glContext.deleteShader(fragmentShader);

            _CorvusLogger2.default.GetCoreLogger().error("Fragment Shader compilation failure:");
            _CorvusLogger2.default.GetCoreLogger().error(message);

            throw new Error("Fragment Shader compilation failure: " + message);
        }

        this.rendererId = this._programShader(glContext, vertexShader, fragmentShader);
        var linkStatus = glContext.getProgramParameter(this.rendererId, glContext.LINK_STATUS);
        if (!linkStatus) {
            glContext.deleteProgram(this.rendererId);
            glContext.deleteShader(vertexShader);
            glContext.deleteShader(fragmentShader);

            var _message = context.getProgramInfoLog(this.rendererId);
            _CorvusLogger2.default.GetCoreLogger().error("Shader link failure:");
            _CorvusLogger2.default.GetCoreLogger().error(_message);

            throw new Error("Shader link failure " + _message);
        }
    }

    _createClass(Shader, [{
        key: "bind",
        value: function bind() {
            this.glContext.useProgram(this.rendererId);
        }
    }, {
        key: "unbind",
        value: function unbind() {
            this.glContext.useProgram(0);
        }
    }, {
        key: "_compileShader",
        value: function _compileShader(context, shaderType, src) {
            var shader = context.createShader(shaderType);
            context.shaderSource(shader, src);
            context.compileShader(shader);
            return shader;
        }
    }, {
        key: "_programShader",
        value: function _programShader(context, vertexShader, fragmentShader) {
            var shaderProgram = context.createProgram();
            context.attachShader(shaderProgram, vertexShader);
            context.attachShader(shaderProgram, fragmentShader);
            context.linkProgram(shaderProgram);
            return shaderProgram;
        }
    }, {
        key: "getShader",
        value: function getShader() {
            return this.rendererId;
        }
    }]);

    return Shader;
}();

exports.default = Shader;