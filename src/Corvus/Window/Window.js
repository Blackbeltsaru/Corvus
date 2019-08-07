import NotImplementedError from '../Error/NotImplementedError';

export class WindowProps {

    //Class variables 
    // title;
    // width;
    // height;

    constructor(title = "Corvus Engine", width = 1280, height = 720) {
        this.title = title;
        this.width = width;
        this.height = height;
    }
}

export class Window {

    //Class variables 
    // eventCallbackFn;

    constructor() {

    }

    onUpdate() {throw new NotImplementedError();}

    getWidth() {throw new NotImplementedError();}
    getHeight() {throw new NotImplementedError();}

    //Window attributes
    setEventCallback(eventCallback) {throw new NotImplementedError();}
    setVSync(enabled) {throw new NotImplementedError();}
    isVSync() {throw new NotImplementedError();}

    getNativeWindow() {throw new NotImplementedError();}
    getContext() {throw new NotImplementedError();}

    static create (props = WindowProps()) {throw new NotImplementedError();}
}