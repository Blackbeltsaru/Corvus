import CorvusLogger from '../Logger/CorvusLogger';
import WebWindow from '../platform/WebWindow';
import {EventDispatcher} from '../Events/Events';
import {WindowCloseEvent} from '../Events/ApplicationEvent'
import NotImplementedError from '../Error/NotImplementedError';
import {WindowProps} from '../Window/Window';
import LayerStack from '../Layer/LayerStack';

//This returns a bit field with the x+1th bit on
//This can be used for bitwise operations 
export function BIT(x){return 1 << x}; 

class Application {

    //Class variables 
    // _Window;
    // _Running;
    // _LayerStack;

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

        this._Running = true;
        this._Window = WebWindow.create(new WindowProps());
        this._Window.setEventCallback(this.onEvent);
        this._LayerStack = new LayerStack();
        CorvusLogger.coreLogger.info('Application constructed with ', this._Running, this._Window, this._LayerStack);
    }

    /**
     * The event callback used by the window
     * @param {Event} event The event that will be propagated 
     */
    onEvent(event) {
        let dispatcher = new EventDispatcher(event);
        
        CorvusLogger.coreLogger.info(`Event fireed: ${event}`)

        CorvusLogger.coreLogger.info('layerStack', this._LayerStack);
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

        
        for(let it = this._LayerStack.begin(); it !== this._LayerStack.end(); it++) {
            this._LayerStack.get(it).onUpdate();
        }

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
    }
    
    pushOverlay(layer) {
        this._LayerStack.pushOverlay(layer);
    }
}

export default Application;