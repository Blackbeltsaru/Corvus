import {Event, Events, EventCategories} from './Events';

export class KeyEvent extends Event {

    _keyCode;
    constructor(keyCode) {
        this._keyCode = keyCode;
    }

    getKeyCode() {return this._keyCode;}

    getCategoryFlags() {return EventCategories.KeyboardCategory | EventCategories.InputCategory;}
}

export class KeyPressedEvent extends KeyEvent {

    _repeatCount;
    constructor(keyCode, repeatCount) {
        super(keyCode);
        this._repeatCount = repeatCount;
    }

    getRepeatCount() {return this._repeatCount;}

    toString() {return `KeyPressedEvent: ${this._keyCode} (${this._repeatCount} repeats)`;}
    
    static getStaticType() {return Events.KeyPressed};
    getEventType() {return this.getStaticType()};
    getName() {return 'KeyPressed'}
}

export class KeyReleasedEvent extends KeyEvent {

    constructor(keyCode) {
        super(keyCode);
    }

    toString() {return `KeyReleasedEvent: ${this._keyCode}`;}
    
    static getStaticType() {return Events.KeyReleased};
    getEventType() {return this.getStaticType()};
    getName() {return 'KeyReleased'}
}

export class KeyTypedEvent extends KeyEvent {

    constructor(keyCode) {
        super(keyCode);
    }

    toString() {return `KeyTypedEvent: ${this._keyCode}`;}

    static getStaticType() {return Events.KeyTyped};
    getEventType() {return this.getStaticType()};
    getName() {return 'KeyTypedEvent'}
}