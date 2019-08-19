import CorvusLogger from "../Logger/CorvusLogger";

class Shader {


    constructor(glContext, vertexSrc, fragmentSrc) {
        this.glContext = glContext;

        let vertexShader = this._compileShader(glContext, glContext.VERTEX_SHADER, vertexSrc)
        let message = glContext.getShaderInfoLog(vertexShader);
        if(message.length > 0) {
            glContext.deleteShader(vertexShader);

            CorvusLogger.GetCoreLogger().error("Vertex Shader compilation failure:");
            CorvusLogger.GetCoreLogger().error(message);

            return;
        }

        let fragmentShader = this._compileShader(glContext, glContext.FRAGMENT_SHADER, fragmentSrc);
        message = glContext.getShaderInfoLog(fragmentShader);
        if(message.length > 0) {
            glContext.deleteShader(vertexShader);
            glContext.deleteShader(fragmentShader);

            CorvusLogger.GetCoreLogger().error("Fragment Shader compilation failure:");
            CorvusLogger.GetCoreLogger().error(message);

            return;
        }

        this.shader = this._programShader(glContext, vertexShader, fragmentShader);
        let linkStatus = context.getProgramParameter(this.shader, context.LINK_STATUS);
        if(!linkStatus) {
            glContext.deleteProgram(this.shader);
            glContext.deleteShader(vertexShader);
            glContext.deleteShader(fragmentShader);

            let message = context.getProgramInfoLog(this.shader);
            CorvusLogger.GetCoreLogger().error("Shader link failure:");
            CorvusLogger.GetCoreLogger().error(message);

            return;
        }

        // glContext.detatchShader(this.shader, vertexShader);
        // glContext.detatchShader(this.shader, fragmentShader);
    }

    bind() {
        this.glContext.useProgram(this.shader);
    }

    unbind() {
        this.glContext.useProgram(0);
    }

    _compileShader(context, shaderType, src) {
        let shader = context.createShader(shaderType);
        context.shaderSource(shader, src);
        context.compileShader(shader);
        return shader;
    }

    _programShader(context, vertexShader, fragmentShader) {
        let shaderProgram = context.createProgram();
        context.attachShader(shaderProgram, vertexShader);
        context.attachShader(shaderProgram, fragmentShader);
        context.linkProgram(shaderProgram);
        return shaderProgram;
    }

    getShader() {
        return this.shader
    }
}

export default Shader;