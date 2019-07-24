import {Window} from '../Corvus/Window/Window';
import CorvusLogger from '../Corvus/Logger/CorvusLogger';
import NotImplementedError from '../Corvus/Error/NotImplementedError';
import {KeyPressedEvent, KeyReleasedEvent} from '../Corvus/Events/KeyboardEvent';
import {MousePressedEvent, MouseReleasedEvent, MouseScrolledEvent, MouseMovedEvent} from '../Corvus/Events/MouseEvent';
import Input from '../Corvus/Input/Input';

/** A helper "class" to create window data */
const WindowData = (title, width, height, vSync, eventCallback) => ({title, width, height, vSync, eventCallback});

class WebWindow extends Window {

    //Class variables
    // _Window;
    // _Context;
    // _Data;

    // static initialized = false;

    constructor(props) {
        if(typeof WebWindow.initialized !== 'undefined') WebWindow.initialized = false;
        super();
        this.init(props);
    }

    static frameworkErrorCallback(error, description) {
        CorvusLogger.coreLogger.error(`Error in framework ${error}: ${description}`)
    }

    static create(props) {
        return new WebWindow(props);
    }

    init(props) {
        this._Data = new WindowData(props.title, props.width, props.height)
        CorvusLogger.GetCoreLogger().info(`Creating window ${props.title} (${props.width}, ${props.height})`);

        if(!WebWindow.initialized) {
            //Initialize the math library glMatrix
            const glMatrixScript = document.createElement('script');
            glMatrixScript.setAttribute('src', '../Libraries/gl-matrix-min.js')
            document.head.appendChild(glMatrixScript);

            this._Window = document.getElementById('canvas');
            this._Window.tabIndex = 1;
            this._Context = this._Window.getContext('webgl'); //TODO: abstract this out to support multiple browsers 
            
            const success = !!this._Context;
            CorvusLogger.GetCoreLogger().assert(success, `Could not initialize WebGL`);

            WebWindow.initialized = true;
        }

        this._Window.width = props.width;
        this._Window.height = props.height;

        this._Context.viewport(0, 0, props.width, props.height);

        //Set event callbacks
        this._Window.addEventListener("keydown", e => {
            e.preventDefault();
            const keyEvent = new KeyPressedEvent(e.keyCode, e.repeat ? 1 : 0); //keydown is only for the initial press TODO: track modifier keys?
            Input.getKeyContainer().onKeyDown(e.keyCode);
            this._Data.eventCallback(keyEvent)
        }, false);
        this._Window.addEventListener("keyup", e => {
            e.preventDefault();
            const keyEvent = new KeyReleasedEvent(e.keyCode);
            Input.getKeyContainer().onKeyUp(e.keyCode);
            this._Data.eventCallback(keyEvent);
        }, false);
        this._Window.addEventListener("mousedown", e => {
            e.preventDefault();
             //When we click on the canvas we want the engine to focus on the canvas - this should be an engine level operation 
             //This ensures that keyboard events get captured properly
            this._Window.focus();
            const mouseEvent = new MousePressedEvent(e.button);
            Input.getKeyContainer().onMouseDown(e.button);
            this._Data.eventCallback(mouseEvent);
        }, false);
        this._Window.addEventListener("mouseup", e=> {
            e.preventDefault();
            const mouseEvent = new MouseReleasedEvent(e.button);
            Input.getKeyContainer().onMouseUp(e.button);
            this._Data.eventCallback(mouseEvent);
        }, false);
        this._Window.addEventListener("wheel", e => {
            e.preventDefault();
            const scrollEvent = new MouseScrolledEvent(e.wheelDeltaX, e.wheelDeltaY);
            this._Data.eventCallback(scrollEvent);
        }, false);
        this._Window.addEventListener("mousemove", e => {
            e.preventDefault();
            console.log('mousemove', e);
            const mouseEvent = new MouseMovedEvent(e.layerX, e.layerY);
            Input.getKeyContainer().onMouseMove(e.layerX, e.layerY);
            this._Data.eventCallback(mouseEvent);
        }, false)


        //Prevent right click context menu
        //TODO: add context menu event wrapper
        this._Window.addEventListener("contextmenu", e => {
            e.preventDefault();
            return false;
        }, false)

    }

    shutdown() {
        //TODO: destroy the window?
        this._Context = null;
        this._Window = null;
    }

    onUpdate(callback) {
        //TODO: what do I do here
        // this._Window.requestAnimationFrame(callback)
    }

    setEventCallback(eventCallback) {
        this._Data.eventCallback = eventCallback;
    }

    getNativeWindow() {
        return this._Window;
    }
}

export default WebWindow;