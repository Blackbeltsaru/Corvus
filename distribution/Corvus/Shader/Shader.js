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
        // if(message.length > 0) {
        //     glContext.deleteShader(vertexShader);

        //     CorvusLogger.GetCoreLogger().error("Vertex Shader compilation failure:");
        //     CorvusLogger.GetCoreLogger().error(message);

        //     return;
        // }

        var fragmentShader = this._compileShader(glContext, glContext.FRAGMENT_SHADER, fragmentSrc);
        message = glContext.getShaderInfoLog(fragmentShader);
        // if(message.length > 0) {
        //     glContext.deleteShader(vertexShader);
        //     glContext.deleteShader(fragmentShader);

        //     CorvusLogger.GetCoreLogger().error("Fragment Shader compilation failure:");
        //     CorvusLogger.GetCoreLogger().error(message);

        //     return;
        // }

        this.rendererId = this._programShader(glContext, vertexShader, fragmentShader);
        var linkStatus = glContext.getProgramParameter(this.rendererId, glContext.LINK_STATUS);
        // if(!linkStatus) {
        //     glContext.deleteProgram(this.rendererId);
        //     glContext.deleteShader(vertexShader);
        //     glContext.deleteShader(fragmentShader);

        //     let message = context.getProgramInfoLog(this.rendererId);
        //     CorvusLogger.GetCoreLogger().error("Shader link failure:");
        //     CorvusLogger.GetCoreLogger().error(message);

        //     return;
        // }

        glContext.detatchShader(this.rendererId, vertexShader);
        glContext.detatchShader(this.rendererId, fragmentShader);
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