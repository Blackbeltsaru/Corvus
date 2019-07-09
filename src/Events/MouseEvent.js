import {Event, Events, EventCategories} from './Events';

export class MouseMovedEvent extends Event {

    m_MouseX;
    m_MouseY;
    constructor(mouseX, mouseY) {
        super();
        this.m_MouseX = mouseX;
        this.m_MouseY = mouseY;
    }

    getX() {return this.m_MouseX;}
    getY() {return this.m_MouseY;}

    
    static getStaticType() {return Events.MouseMoved;}
    toString() {return `MouseMoved: ${this.m_MouseX}, ${this.m_MouseY}`;}
    getName() {return 'MouseMoved';}
    getCategoryFlags() {return EventCategories.MouseCategory | EventCategories.InputCategory;}
}

export class MouseScrolledEvent extends Event {

    m_XOffset;
    m_YOffset;
    constructor(xOffset, yOffset) {
        super();
        this.m_XOffset = xOffset;
        this.m_YOffset = yOffset;
    }

    getXOffset() {return this.m_XOffset;}
    getYOffset() {return this.yOffset;}
    toString() {return `MouseScrolled: ${this.m_XOffset}, ${this.m_YOffset}`;}
    
    static getStaticType() {return Events.MouseScrolled;}
    getName() {return 'MouseScrolled';}
    getCategoryFlags() {return EventCategories.MouseCategory | EventCategories.InputCategory;}
}

export class MouseButtonEvent extends Event {

    m_Button;
    constructor(button) {
        super();
        this.m_Button = button;
    }

    getMouseButton() {return this.m_Button;}
    getCategoryFlags() {return EventCategories.MouseCategory | EventCategories.InputCategory;}
}

export class MousePressedEvent extends MouseButtonEvent {

    constructor(button) {
        super(button)
    }
    
    static getStaticType() {return Events.MouseButtonPressed;}
    toString() {return `MousePressedEvent: ${this.m_Button}`;}
    getName() {return 'MouseButtonPressed';}
}

export class MouseReleasedEvent extends MouseButtonEvent {

    constructor(button) {
        super(button)
    }

    static getStaticType() {return Events.MouseButtonReleased;}
    toString() {return `MouseReleasedEvent: ${this.m_Button}`;}
    getName() {return 'MouseButtonReleased';}
}