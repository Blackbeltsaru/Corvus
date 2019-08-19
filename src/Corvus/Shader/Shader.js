import CorvusLogger from "../Logger/CorvusLogger";

function createShader(glContext, vertexSrc, fragmentSrc) {

    let vertexShader = _compileShader(glContext, glContext.VERTEX_SHADER, vertexSrc)
    let message = glContext.getShaderInfoLog(vertexShader);
    if (message.length > 0) {
        glContext.deleteShader(vertexShader);

        CorvusLogger.GetCoreLogger().error("Vertex Shader compilation failure:");
        CorvusLogger.GetCoreLogger().error(message);

        return;
    }

    let fragmentShader = _compileShader(glContext, glContext.FRAGMENT_SHADER, fragmentSrc);
    message = glContext.getShaderInfoLog(fragmentShader);
    if (message.length > 0) {
        glContext.deleteShader(vertexShader);
        glContext.deleteShader(fragmentShader);

        CorvusLogger.GetCoreLogger().error("Fragment Shader compilation failure:");
        CorvusLogger.GetCoreLogger().error(message);

        return;
    }

    let shader = _programShader(glContext, vertexShader, fragmentShader);
    let linkStatus = context.getProgramParameter(shader, context.LINK_STATUS);
    if (!linkStatus) {
        glContext.deleteProgram(shader);
        glContext.deleteShader(vertexShader);
        glContext.deleteShader(fragmentShader);

        let message = context.getProgramInfoLog(shader);
        CorvusLogger.GetCoreLogger().error("Shader link failure:");
        CorvusLogger.GetCoreLogger().error(message);

        return;
    }

    glContext.detatchShader(shader, vertexShader);
    glContext.detatchShader(shader, fragmentShader);

    return shader;
}

function _compileShader(context, shaderType, src) {
    let shader = context.createShader(shaderType);
    context.shaderSource(shader, src);
    context.compileShader(shader);
    return shader;
}

function _programShader(context, vertexShader, fragmentShader) {
    let shaderProgram = context.createProgram();
    context.attachShader(shaderProgram, vertexShader);
    context.attachShader(shaderProgram, fragmentShader);
    context.linkProgram(shaderProgram);
    return shaderProgram;
}

export default createShader;