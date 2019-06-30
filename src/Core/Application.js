import CorvusLogger from '../Logger/CorvusLogger';
import WebWindow from '../../platform/WebWindow';
import {EventDispatcher} from '../Events/Events';
import {WindowCloseEvent} from '../Events/ApplicationEvent'
import NotImplementedError from '../Error/NotImplementedError';
import {WindowProps} from '../Window/Window';
import LayerStack from '../Layer/LayerStack';

//This returns a bit field with the x+1th bit on
//This can be used for bitwise operations 
export function BIT(x){return 1 << x}; 

class Application {

    m_Window = null;
    m_Running = true;
    m_LayerStack;

    static s_Instance = null;

    /**
     * This initialized the application.
     * Create the window and sets the eventCallback for the window
     */
    constructor() {
        //TODO: logging should be removed from release builds
        CorvusLogger.GetCoreLogger().assert(!Application.s_Instance, "Application already exists");
        Application.s_Instance = this;

        this.m_Window = WebWindow.create(new WindowProps());
        this.m_Window.setEventCallback(this.onEvent);
        this.m_LayerStack = new LayerStack();
    }

    /**
     * The event callback used by the window
     * @param {Event} event The event that will be propagated 
     */
    onEvent(event) {
        let dispatcher = new EventDispatcher(event);
        
        CorvusLogger.GetCoreLogger().info(`Event fireed: ${event}`)

        for(let it = this.m_LayerStack.end(); it !== this.m_LayerStack.begin(); it--) {
            this.m_LayerStack.get(it).onEvent(e);
            if(e.handled) break;
        }
    }

    /**
     * The main run loop
     */
    run() {
        //TODO: do application update-y stuff here

        
        for(let it = this.m_LayerStack.begin(); it !== this.m_LayerStack.end(); it++) {
            this.m_LayerStack.get(it).onUpdate();
        }

        if(this.m_Running) this.m_Window.onUpdate(this.run);
    }

    /** @returns {Window} the current window of the application */
    getWindow() {return this.m_Window;}
    /** @returns {Application} the current instance of the application */
    static get() {return Application.s_Instance;}

    /**
     * A static method to create the application
     * This should be implemented by the client
     */
    static createApplication() {
        throw new NotImplementedError();
    }

    pushLayer(layer) {
        this.m_LayerStack.pushLayer(layer);
    }
    
    pushOverlay(layer) {
        this.m_LayerStack.pushOverlay(layer);
    }
}

export default Application;