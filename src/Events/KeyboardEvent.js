import {Event, Events, EventCategories} from './Events';

export class KeyEvent extends Event {

    m_KeyCode;
    constructor(keyCode) {
        super();
        this.m_KeyCode = keyCode;
    }

    getKeyCode() {return this.m_KeyCode;}
    getCategoryFlags() {return EventCategories.KeyboardCategory | EventCategories.InputCategory;}
}

export class KeyPressedEvent extends KeyEvent {

    m_RepeatCount;
    constructor(keyCode, repeatCount) {
        super(keyCode);
        this.m_RepeatCount = repeatCount;
    }

    getRepeatCount() {return this.m_RepeatCount;}
    toString() {return `KeyPressed: ${this.m_KeyCode} (${this.m_RepeatCount} repeats)`;}
    
    static getStaticType() {return Events.KeyPressed;}
    getName() {return 'KeyPressed';}
}

export class KeyReleasedEvent extends KeyEvent {

    constructor(keyCode) {
        super(keyCode);
    }

    toString() {return `KeyReleasedEvent: ${this.m_KeyCode}`;}
    
    static getStaticType() {return Events.KeyReleased;}
    getName() {return 'KeyReleased';}
}

export class KeyTypedEvent extends KeyEvent {

    constructor(keyCode) {
        super(keyCode);
    }

    toString() {return `KeyTyped: ${this.m_KeyCode}`;}

    static getStaticType() {return Events.KeyTyped;}
    getName() {return 'KeyTyped';}
}