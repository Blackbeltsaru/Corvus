import CorvusLogger from '../Logger/CorvusLogger';
import WebWindow from '../../platform/Web/WebWindow';
import { EventDispatcher } from '../Events/Events';
import { WindowCloseEvent } from '../Events/ApplicationEvent'
import NotImplementedError from '../Error/NotImplementedError';
import { WindowProps } from '../Window/Window';
import LayerStack from '../Layer/LayerStack';
import Input from '../Input/Input';
import Shader from '../Shader/Shader'

//This returns a bit field with the x+1th bit on
//This can be used for bitwise operations 
export function BIT(x) { return 1 << x };

class Application {

    static getInstance() {
        return Application.instance;
    }

    constructor() {
        //TODO: logging should be removed from release builds
        CorvusLogger.coreLogger.info('Constructing Application');
        CorvusLogger.coreLogger.assert(!Application.getInstance(), "Application already exists");
        Application.instance = this;

        //Bind functions
        this.onEvent = this.onEvent.bind(this);
        this.run = this.run.bind(this);

        this._Running = true;
        this._Window = WebWindow.create(new WindowProps());
        this._Window.setEventCallback(this.onEvent);
        this._LayerStack = new LayerStack();
        CorvusLogger.coreLogger.info('Application constructed with ', this._Running, this._Window, this._LayerStack);

        //Setup webGL buffers
        //HACK
        //=================================================================================
        //=================================================================================
        //TODO:(Ryan) this is webGL specific and should be move to a platform file
        let context = this._Window.getContext().getGraphicsContext();
        //TODO:(Ryan) read about these methods and understand whats going on
        context.enable(context.DEPTH_TEST);
        context.viewport(0, 0, canvas.width, canvas.height);

        this.vertexArray = context.createVertexArray();
        context.bindVertexArray(this.vertexArray);


        let vertices = [-0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.0, -0.5, 0.0];

        //Bind to the array buffer to create a vertex buffer
        //This vertext buffer is used later for rendering the object
        let vertexBuffer = context.createBuffer();
        context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer);
        context.bufferData(context.ARRAY_BUFFER, new Float32Array(vertices), context.STATIC_DRAW);


        //Lets build and compile both the vertex and fragment shaders
        let vertexSrc =
        'precision mediump float;' + 
        'attribute vec3 coords;' +
        'varying vec3 outPosition;' +
        'void main(void) {' +
        ' outPosition = coords;' + 
        ' gl_Position = vec4(coords, 1.0);' +
        '}';
        
        let fragmentSrc =
        'precision mediump float;' + 
        'varying vec3 outPosition;' + 
        'void main(void) {' +
        ' gl_FragColor = vec4(outPosition * 0.5 + 0.5, 1);' +
        '}';
        this.shader = new Shader(context, vertexSrc, fragmentSrc);
        this.shader.bind();
        
        //Each attribute on the vertex shader needs to be bound to a vertex buffer
        let coords = context.getAttribLocation(this.shader.getShader(), "coords");
        context.vertexAttribPointer(coords, 3, context.FLOAT, false, 0, 0);
        context.enableVertexAttribArray(coords);

        let indices = [0, 1, 2];
        let indexBuffer = context.createBuffer();
        context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, indexBuffer);
        context.bufferData(context.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), context.STATIC_DRAW)

        //=================================================================================
        //=================================================================================
        //END HACK

    }

    onEvent() {
        let dispatcher = new EventDispatcher(event);

        for(let it = this._LayerStack.end(); it !== this._LayerStack.begin(); it--) {
            this._LayerStack.get(it).onEvent(e);
            if(e.handled) break;
        }
    }
    pushLayer() {
        this._LayerStack.pushLayer(layer);
        layer.onAttach();
    }
    popLayer() {
        this._LayerStack.pushOverlay(layer);
    }

    getWindow() {return this._Window;}

    static createApplication() {
        throw new NotImplementedError();
    }

    run() {
        let context = this._Window.getContext().getGraphicsContext();

        context.clearColor(0.8, 0.2, 0.3, 0.9);
        context.clear(context.COLOR_BUFFER_BIT);
        context.clear(context.DEPTH_BUFFER_BIT);

        this.shader.bind();

        context.bindVertexArray(this.vertexArray);

        context.drawElements(context.TRIANGLES, 3, context.UNSIGNED_SHORT, 0);

        for(let it = this._LayerStack.begin(); it !== this._LayerStack.end(); it++) {
            this._LayerStack.get(it).onUpdate();
        }
        //TODO:(Ryan) Do we need to have a layer render here?

        if(this._Running) this._Window.onUpdate(this.run);
    }
}

const _compileShader = (context, sahderType, shaderCode) => {
    let shader = context.createShader(sahderType);
    context.shaderSource(shader, shaderCode);
    context.compileShader(shader);
    return shader;
}

const _programShader = (context, vertexShader, fragmentShader) => {
    let shaderProgram = context.createProgram();
    context.attachShader(shaderProgram, vertexShader);
    context.attachShader(shaderProgram, fragmentShader);
    context.linkProgram(shaderProgram);
    context.useProgram(shaderProgram);
    return shaderProgram;
}

export default Application;