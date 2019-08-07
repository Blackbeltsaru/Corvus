import {Window} from '../../Corvus/Window/Window';
import CorvusLogger from '../../Corvus/Logger/CorvusLogger';
import {KeyPressedEvent, KeyReleasedEvent} from '../../Corvus/Events/KeyboardEvent';
import {MousePressedEvent, MouseReleasedEvent, MouseScrolledEvent, MouseMovedEvent} from '../../Corvus/Events/MouseEvent';
import Input from '../../Corvus/Input/Input';
import WebInput from './WebInput';
import WebGLContext from '../WebGL/WebGLContext';

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
            //TODO:(Ryan) currently glmatrix is installed as a dependency of the child - this should be changed
            //Initialize the math library glMatrix
            // const glMatrixScript = document.createElement('script');
            // glMatrixScript.setAttribute('src', '../Libraries/gl-matrix-min.js')
            // document.head.appendChild(glMatrixScript);

            //Create the input instance
            //In other languages this input instance can be created statically at run time
            //However, I can't seem to get that to work in js
            //It is safe to assume we are using web input here because we are in a web window
            WebInput.createInstance();

            this._Window = document.getElementById('canvas');
            this._Window.tabIndex = 1;
            this._Context = new WebGLContext(this._Window);
            

            WebWindow.initialized = true;
        }

        this._Window.width = props.width;
        this._Window.height = props.height;


        this._Context.init();
        

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
        window.requestAnimationFrame(callback);
        // this._Context.swapBuffers();?
    }

    setEventCallback(eventCallback) {
        this._Data.eventCallback = eventCallback;
    }

    getNativeWindow() {
        return this._Window;
    }

    getContext() {
        return this._Context;
    }
}

export default WebWindow;