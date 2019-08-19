"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _CorvusLogger = require("../Logger/CorvusLogger");

var _CorvusLogger2 = _interopRequireDefault(_CorvusLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createShader(glContext, vertexSrc, fragmentSrc) {

    var vertexShader = _compileShader(glContext, glContext.VERTEX_SHADER, vertexSrc);
    var message = glContext.getShaderInfoLog(vertexShader);
    if (message.length > 0) {
        glContext.deleteShader(vertexShader);

        _CorvusLogger2.default.GetCoreLogger().error("Vertex Shader compilation failure:");
        _CorvusLogger2.default.GetCoreLogger().error(message);

        return;
    }

    var fragmentShader = _compileShader(glContext, glContext.FRAGMENT_SHADER, fragmentSrc);
    message = glContext.getShaderInfoLog(fragmentShader);
    if (message.length > 0) {
        glContext.deleteShader(vertexShader);
        glContext.deleteShader(fragmentShader);

        _CorvusLogger2.default.GetCoreLogger().error("Fragment Shader compilation failure:");
        _CorvusLogger2.default.GetCoreLogger().error(message);

        return;
    }

    var shader = _programShader(glContext, vertexShader, fragmentShader);
    var linkStatus = context.getProgramParameter(shader, context.LINK_STATUS);
    if (!linkStatus) {
        glContext.deleteProgram(shader);
        glContext.deleteShader(vertexShader);
        glContext.deleteShader(fragmentShader);

        var _message = context.getProgramInfoLog(shader);
        _CorvusLogger2.default.GetCoreLogger().error("Shader link failure:");
        _CorvusLogger2.default.GetCoreLogger().error(_message);

        return;
    }

    glContext.detatchShader(shader, vertexShader);
    glContext.detatchShader(shader, fragmentShader);

    return shader;
}

function _compileShader(context, shaderType, src) {
    var shader = context.createShader(shaderType);
    context.shaderSource(shader, src);
    context.compileShader(shader);
    return shader;
}

function _programShader(context, vertexShader, fragmentShader) {
    var shaderProgram = context.createProgram();
    context.attachShader(shaderProgram, vertexShader);
    context.attachShader(shaderProgram, fragmentShader);
    context.linkProgram(shaderProgram);
    return shaderProgram;
}

exports.default = createShader;