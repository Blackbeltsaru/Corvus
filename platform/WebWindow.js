import {Window} from '../src/Window/Window';
import CorvusLogger from '../src/Logger/CorvusLogger';
import NotImplementedError from '../src/Error/NotImplementedError';
import {KeyPressedEvent, KeyReleasedEvent} from '../src/Events/KeyboardEvent';
import {MousePressedEvent, MouseReleasedEvent, MouseScrolledEvent, MouseMovedEvent} from '../src/Events/MouseEvent';

/** A helper "class" to create window data */
const WindowData = (title, width, height, vSync, eventCallback) => ({title, width, height, vSync, eventCallback});

class WebWindow extends Window {

    m_Window;
    m_Context;
    m_Data;

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
        this.m_Data = new WindowData(props.title, props.width, props.height)
        CorvusLogger.GetCoreLogger().info(`Creating window ${props.title} (${props.width}, ${props.height})`);

        if(!WebWindow.initialized) {
            this.m_Window = document.getElementById('canvas');
            this.m_Window.tabIndex = 1;
            this.m_Context = this.m_Window.getContext('webgl'); //TODO: abstract this out to support multiple browsers 
            
            const success = !!this.m_Context;
            CorvusLogger.GetCoreLogger().assert(success, `Could not initialize WebGL`);

            WebWindow.initialized = true;
        }

        this.m_Window.width = props.width;
        this.m_Window.height = props.height;

        this.m_Context.viewport(0, 0, props.width, props.height);

        //Set event callbacks
        this.m_Window.addEventListener("keydown", e => {
            e.preventDefault();
            const keyEvent = new KeyPressedEvent(e.keyCode, e.repeat ? 1 : 0); //keydown is only for the initial press TODO: track modifier keys?
            this.m_Data.eventCallback(keyEvent)
        }, false);
        this.m_Window.addEventListener("keyup", e => {
            e.preventDefault();
            const keyEvent = new KeyReleasedEvent(e.keyCode);
            this.m_Data.eventCallback(keyEvent);
        }, false);
        this.m_Window.addEventListener("mousedown", e => {
            e.preventDefault();
             //When we click on the canvas we want the engine to focus on the canvas - this should be an engine level operation 
             //This ensures that keyboard events get captured properly
            this.m_Window.focus();
            const mouseEvent = new MousePressedEvent(e.button);
            this.m_Data.eventCallback(mouseEvent);
        }, false);
        this.m_Window.addEventListener("mouseup", e=> {
            e.preventDefault();
            const mouseEvent = new MouseReleasedEvent(e.button);
            this.m_Data.eventCallback(mouseEvent);
        }, false);
        this.m_Window.addEventListener("wheel", e => {
            e.preventDefault();
            const scrollEvent = new MouseScrolledEvent(e.wheelDeltaX, e.wheelDeltaY);
            this.m_Data.eventCallback(scrollEvent);
        }, false);
        this.m_Window.addEventListener("mousemove", e => {
            e.preventDefault();
            console.log('mousemove', e);
            const mouseEvent = new MouseMovedEvent(e.layerX, e.layerY);
            this.m_Data.eventCallback(mouseEvent);
        }, false)


        //Prevent right click context menu
        //TODO: add context menu event wrapper
        this.m_Window.addEventListener("contextmenu", e => {
            e.preventDefault();
            return false;
        }, false)

    }

    shutdown() {
        //TODO: destroy the window?
        this.m_Context = null;
        this.m_Window = null;
    }

    onUpdate(callback) {
        //TODO: what do I do here
        this.m_Context.requestAnimationFrame(callback)
    }

    setEventCallback(eventCallback) {
        this.m_Data.eventCallback = eventCallback;
    }
}

export default WebWindow;