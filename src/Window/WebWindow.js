import {Window} from './Window';
import CorvusLogger from '../Logger/CorvusLogger';
import NotImplementedError from '../Error/NotImplementedError';
import {KeyPressedEvent, KeyReleasedEvent} from '../Events/KeyboardEvent';
import {MousePressedEvent, MouseReleasedEvent, MouseScrolledEvent, MouseMovedEvent} from '../Events/MouseEvent';

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
            this.window.tabIndex = 1;
            this.context = this.window.getContext('webgl'); //TODO: abstract this out to support multiple browsers 
            
            const success = !!this.context;
            CorvusLogger.GetCoreLogger().assert(success, `Could not initialize WebGL`);

            WebWindow.initialized = true;
        }

        this.window.width = props.width;
        this.window.height = props.height;

        this.context.viewport(0, 0, props.width, props.height);

        //Set event callbacks
        this.window.addEventListener("keydown", e => {
            e.preventDefault();
            const keyEvent = new KeyPressedEvent(e.keyCode, e.repeat ? 1 : 0); //keydown is only for the initial press TODO: track modifier keys?
            this.data.eventCallback(keyEvent)
        }, false);
        this.window.addEventListener("keyup", e => {
            e.preventDefault();
            const keyEvent = new KeyReleasedEvent(e.keyCode);
            this.data.eventCallback(keyEvent);
        }, false);
        this.window.addEventListener("mousedown", e => {
            e.preventDefault();
             //When we click on the canvas we want the engine to focus on the canvas - this should be an engine level operation 
             //This ensures that keyboard events get captured properly
            this.window.focus();
            const mouseEvent = new MousePressedEvent(e.button);
            this.data.eventCallback(mouseEvent);
        }, false);
        this.window.addEventListener("mouseup", e=> {
            e.preventDefault();
            const mouseEvent = new MouseReleasedEvent(e.button);
            this.data.eventCallback(mouseEvent);
        }, false);
        this.window.addEventListener("wheel", e => {
            e.preventDefault();
            const scrollEvent = new MouseScrolledEvent(e.wheelDeltaX, e.wheelDeltaY);
            this.data.eventCallback(scrollEvent);
        }, false);
        this.window.addEventListener("mousemove", e => {
            e.preventDefault();
            console.log('mousemove', e);
            const mouseEvent = new MouseMovedEvent(e.layerX, e.layerY);
            this.data.eventCallback(mouseEvent);
        }, false)


        //Prevent right click context menu
        //TODO: add context menu event wrapper
        this.window.addEventListener("contextmenu", e => {
            e.preventDefault();
            return false;
        }, false)

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
        this.data.eventCallback = eventCallback;
    }
}

export default WebWindow;