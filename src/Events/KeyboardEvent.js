import {Event, Events, EventCategories} from './Events';

export class KeyEvent extends Event {

    // Class variables
    // _KeyCode;
    constructor(keyCode) {
        super();
        this._KeyCode = keyCode;
    }

    getKeyCode() {return this._KeyCode;}
    getCategoryFlags() {return EventCategories.KeyboardCategory | EventCategories.InputCategory;}
}

export class KeyPressedEvent extends KeyEvent {

    // Class variables
    // _RepeatCount;
    constructor(keyCode, repeatCount) {
        super(keyCode);
        this._RepeatCount = repeatCount;
    }

    getRepeatCount() {return this._RepeatCount;}
    toString() {return `KeyPressed: ${this._KeyCode} (${this._RepeatCount} repeats)`;}
    
    static getStaticType() {return Events.KeyPressed;}
    getName() {return 'KeyPressed';}
}

export class KeyReleasedEvent extends KeyEvent {

    constructor(keyCode) {
        super(keyCode);
    }

    toString() {return `KeyReleasedEvent: ${this._KeyCode}`;}
    
    static getStaticType() {return Events.KeyReleased;}
    getName() {return 'KeyReleased';}
}

export class KeyTypedEvent extends KeyEvent {

    constructor(keyCode) {
        super(keyCode);
    }

    toString() {return `KeyTyped: ${this._KeyCode}`;}

    static getStaticType() {return Events.KeyTyped;}
    getName() {return 'KeyTyped';}
}