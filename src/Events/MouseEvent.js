import {Event, Events, EventCategories} from './Events';

export class MouseMovedEvent extends Event {

    _mouseX;
    _mouseY;
    constructor(mouseX, mouseY) {
        super();
        this._mouseX = mouseX;
        this._mouseY = mouseY;
    }

    getX() {return this._mouseX;}
    getY() {return this._mouseY;}
    toString() {return `MouseMovedEvent: ${this._mouseX}, ${this._mouseY}`;}

    
    static getStaticType() {return Events.MouseMoved};
    getEventType() {return this.getStaticType()};
    getName() {return 'MouseMoved'}

    getCategoryFlags() {return EventCategories.MouseCategory | EventCategories.InputCategory}
}

export class MouseScrolledEvent extends Event {

    _xOffset;
    _yOffset;
    constructor(xOffset, yOffset) {
        super();
        this._xOffset = xOffset;
        this._yOffset = yOffset;
    }

    getXOffset() {return this._xOffset;}
    getYOffset() {return this.yOffset;}
    toString() {return `MouseScrolledEvent: ${this._xOffset}, ${this._yOffset}`}
    
    static getStaticType() {return Events.MouseScrolled};
    getEventType() {return this.getStaticType()};
    getName() {return 'MouseScrolled'}

    getCategoryFlags() {return EventCategories.MouseCategory | EventCategories.InputCategory}
}

export class MouseButtonEvent extends Event {

    _button;
    constructor(button) {
        super();
        this._button = button;
    }

    getMouseButton() {return this._button;}

    getCategoryFlags() {return EventCategories.MouseCategory | EventCategories.InputCategory}
}

export class MousePressedEvent extends MouseButtonEvent {

    constructor(button) {
        super(button)
    }
    toString() {return `MousePressedEvent: ${this._button}`}

    
    static getStaticType() {return Events.MouseButtonPressed};
    getEventType() {return this.getStaticType()};
    getName() {return 'MouseButtonPressed'}
}

export class MouseReleasedEvent extends MouseButtonEvent {

    constructor(button) {
        super(button)
    }
    toString() {return `MouseReleasedEvent: ${this._button}`}

    
    static getStaticType() {return Events.MouseButtonReleased};
    getEventType() {return this.getStaticType()};
    getName() {return 'MouseButtonReleased'}
}