import CorvusLogger from '../Logger/CorvusLogger';
import WebWindow from '../../platform/Web/WebWindow';
import {EventDispatcher} from '../Events/Events';
import {WindowCloseEvent} from '../Events/ApplicationEvent'
import NotImplementedError from '../Error/NotImplementedError';
import {WindowProps} from '../Window/Window';
import LayerStack from '../Layer/LayerStack';
import Input from '../Input/Input';
import Shader from '../Shader/Shader'

//This returns a bit field with the x+1th bit on
//This can be used for bitwise operations 
export function BIT(x){return 1 << x}; 

class Application {

    //Class variables 
    // _Window;
    // _Running;
    // _LayerStack;

    //vertextArray
    //vertexBuffer
    //indexBuffer

    // static s_Instance;
    static getInstance() {
        return Application.s_instance;
    }

    /**
     * This initialized the application.
     * Create the window and sets the eventCallback for the window
     */
    constructor() {
        //TODO: logging should be removed from release builds
        CorvusLogger.coreLogger.info('Constructing Application');
        CorvusLogger.coreLogger.assert(!Application.getInstance(), "Application already exists");
        Application.s_Instance = this;

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
        context.clearColor(0.5, 0.5, 0.5, 0.9);
        context.enable(context.DEPTH_TEST);
        context.clear(context.COLOR_BUFFER_BIT);
        context.clear(context.DEPTH_BUFFER_BIT);
        context.viewport(0, 0, this._Window.width, this._Window.height);

        // this.vertextArray = context.createVertexArray();
        // context.bindVertexArray(this.vertextArray);

        this.vertextBuffer = context.createBuffer();
        context.bindBuffer(context.ARRAY_BUFFER, this.vertextBuffer);

        let verticies = [
            -0.5, 0.5,
            0.5, -0.5,
            0, 0.5
        ]

        context.bufferData(context.ARRAY_BUFFER, new Float32Array(verticies), context.STATIC_DRAW);
        context.bindBuffer(context.ARRAY_BUFFER, null);
        let vertexSrc = 
        'attribute vec2 coords;' +
        'void main(void) {' +
        ' gl_Position = vec4(coords, 0.0, 1.0);' + 
        '}';

        let fragmentSrc = 
        'void main(void) {' +
        ' gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' + 
        '}';
        this.shader = new Shader(context, vertexSrc, fragmentSrc);

        context.bindBuffer(context.ARRAY_BUFFER, this.vertextBuffer)

        let coords = context.getAttribLocation(this.shader.getShader(), "coords");
        context.enableVertexAttribArray(coords);
        context.vertexAttribPointer(coords, 2, context.FLOAT, false, 0, 0);

        // this.indexBuffer = context.createBuffer();
        // context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        // let indices = [0, 1, 2];
        // context.bufferData(context.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), context.STATIC_DRAW);

        this.shader.bind()
        context.drawArrays(context.TRIANGLES, 0, verticies.length);

        CorvusLogger.GetCoreLogger().warn("Finished Rendering");


        //=================================================================================
        //=================================================================================
        //END HACK

        //Bind functions
    }

    /**
     * The event callback used by the window
     * @param {Event} event The event that will be propagated 
     */
    onEvent(event) {
        let dispatcher = new EventDispatcher(event);

        for(let it = this._LayerStack.end(); it !== this._LayerStack.begin(); it--) {
            this._LayerStack.get(it).onEvent(e);
            if(e.handled) break;
        }
    }

    /**
     * The main run loop
     */
    run() {
        //TODO: do application update-y stuff here

        //Clear the background color here
        //TODO:(Ryan) this is weblGL specific and should be move out to a platform file
        // let context = this._Window.getContext().getGraphicsContext();
        
        // context.clearColor(0.5, 0.5, 0.5, 0.9);
        // context.clear(context.COLOR_BUFFER_BIT);
        // context.clear(context.DEPTH_BUFFER_BIT);

        // this.shader.bind();

        // context.bindVertexArray(this.vertextArray)
        // context.drawElements(context.TRIANGLES, 3, context.UNSIGNED_INT, 0) 
        
        for(let it = this._LayerStack.begin(); it !== this._LayerStack.end(); it++) {
            this._LayerStack.get(it).onUpdate();
        }
        //TODO:(Ryan) Do we need to have a layer render here?

        if(this._Running) this._Window.onUpdate(this.run);
    }

    /** @returns {Window} the current window of the application */
    getWindow() {return this._Window;}
    /** @returns {Application} the current instance of the application */
    static get() {return Application.getInstance();}

    /**
     * A static method to create the application
     * This should be implemented by the client
     */
    static createApplication() {
        throw new NotImplementedError();
    }

    pushLayer(layer) {
        this._LayerStack.pushLayer(layer);
        layer.onAttach();
    }
    
    pushOverlay(layer) {
        this._LayerStack.pushOverlay(layer);
    }
}

export default Application;