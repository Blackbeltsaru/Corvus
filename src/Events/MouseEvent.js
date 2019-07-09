import {Event, Events, EventCategories} from './Events';

export class MouseMovedEvent extends Event {

    //Class variables
    // _MouseX;
    // _MouseY;
    constructor(mouseX, mouseY) {
        super();
        this._MouseX = mouseX;
        this._MouseY = mouseY;
    }

    getX() {return this._MouseX;}
    getY() {return this._MouseY;}

    
    static getStaticType() {return Events.MouseMoved;}
    toString() {return `MouseMoved: ${this._MouseX}, ${this._MouseY}`;}
    getName() {return 'MouseMoved';}
    getCategoryFlags() {return EventCategories.MouseCategory | EventCategories.InputCategory;}
}

export class MouseScrolledEvent extends Event {

    // Class variables
    // _XOffset;
    // _YOffset;
    constructor(xOffset, yOffset) {
        super();
        this._XOffset = xOffset;
        this._YOffset = yOffset;
    }

    getXOffset() {return this._XOffset;}
    getYOffset() {return this.yOffset;}
    toString() {return `MouseScrolled: ${this._XOffset}, ${this._YOffset}`;}
    
    static getStaticType() {return Events.MouseScrolled;}
    getName() {return 'MouseScrolled';}
    getCategoryFlags() {return EventCategories.MouseCategory | EventCategories.InputCategory;}
}

export class MouseButtonEvent extends Event {

    //Class variables
    // _Button;
    constructor(button) {
        super();
        this._Button = button;
    }

    getMouseButton() {return this._Button;}
    getCategoryFlags() {return EventCategories.MouseCategory | EventCategories.InputCategory;}
}

export class MousePressedEvent extends MouseButtonEvent {

    constructor(button) {
        super(button)
    }
    
    static getStaticType() {return Events.MouseButtonPressed;}
    toString() {return `MousePressedEvent: ${this._Button}`;}
    getName() {return 'MouseButtonPressed';}
}

export class MouseReleasedEvent extends MouseButtonEvent {

    constructor(button) {
        super(button)
    }

    static getStaticType() {return Events.MouseButtonReleased;}
    toString() {return `MouseReleasedEvent: ${this._Button}`;}
    getName() {return 'MouseButtonReleased';}
}