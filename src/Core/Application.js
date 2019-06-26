import CorvusLogger from '../Logger/CorvusLogger';
import WebWindow from '../Window/WebWindow';
import {EventDispatcher} from '../Events/Events';
import {WindowCloseEvent} from '../Events/ApplicationEvent'
import NotImplementedError from '../Error/NotImplementedError';
import {WindowProps} from '../Window/Window';

//This returns a bit field with the x+1th bit on
//This can be used for bitwise operations 
export function BIT(x){return 1 << x}; 

class Application {

    _window;
    _running = true;
    static _instance = null;;

    constructor() {
        CorvusLogger.GetCoreLogger().assert(!Application._instance, "Application already exists");
        Application._instance = this;

        this._window = WebWindow.create(new WindowProps());
        this._window.setEventCallback(this.onEvent.bind(this));
    }

    onEvent(event) {
        let dispatcher = new EventDispatcher(e);
        
        CorvusLogger.GetCoreLogger().debug(`Event fireed: ${event}`)
    }

    run() {
        //TODO: I don't think webGL needs a run loop
    }

    getWindow() {
        return this._window;
    }

    static get() {
        return Application._instance;
    }

    static createApplication() {
        throw new NotImplementedError();
    }
}

export default Application;