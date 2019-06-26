import {Window, WindowProps} from './Window';
import CorvusLogger from '../Logger/CorvusLogger';
import NotImplementedError from '../Error/NotImplementedError';

const mouseDown = (e, data) => {
    CorvusLogger.GetCoreLogger().warn('mouse up event', e);
}

const WindowData = (title, width, height, vSync, eventCallback) => ({title, width, height, vSync, eventCallback});

class WebWindow extends Window {

    window;
    context;
    data;

    static initialized = false;

    constructor(props) {
        super();
        this.init(props);
    }

    static frameworkErrorCallback(error, description) {
        CorvusLogger.GetCoreLogger().error(`Error in framework ${error}: ${description}`)
    }

    static create(props) {
        return new WebWindow(props);
    }

    init(props) {
        this.data = new WindowData(props.title, props.width, props.height)
        CorvusLogger.GetCoreLogger().info(`Creating window ${props.title} (${props.width}, ${props.height})`);

        if(!WebWindow.initialized) {
            this.window = document.getElementById('canvas');
            this.context = this.window.getContext('webgl'); //TODO: abstract this out to support multiple browsers 
            
            const success = !!this.context;
            CorvusLogger.GetCoreLogger().assert(success, `Could not initialize WebGL`);

            WebWindow.initialized = true;
        }

        this.window.width = props.width;
        this.window.height = props.height;

        this.context.viewport(0, 0, props.width, props.height);

        //Set event callbacks
        this.window.addEventListener("mousedown", (e)=>{mouseDown(e, this.data)}, false);
    }

    shutdown() {
        //TODO: destroy the window?
        this.context = null;
        this.window = null;
    }

    onUpdate() {
        //TODO: what do I do here
    }

    setEventCallback(eventCallback) {
        this.eventCallbackFn = eventCallback;
    }
}

export default WebWindow;