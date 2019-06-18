import {BIT} from '../Core/Application';
import NotImplementedError from '../Error/NotImplementedError';


//TODO: there is a lot of duplicated code in the event classes.
//In addition there is code that should be debug only
//Find a way to abstract that code out so that at build time code is injected properly
export const Events = Object.freeze({
    None: 0,
    WindowClose: 1,
    WindowResize: 2,
    WindowFocus: 3,
    WindowLostFocus: 4,
    WindowMoved: 5,
    AppTick: 6,
    AppUpdate: 7,
    AppRender: 8,
    KeyPressed: 9,
    KeyReleased: 10,
    KeyTyped: 11,
    MouseButtonPressed: 12,
    MouseButtonReleased: 13,
    MouseMoved: 14,
    MouseScrolled: 15,
});

export const EventCategories = Object.freeze({
    ApplicationCategory: BIT(0),
    InputCategory: BIT(1),
    KeyboardCategory: BIT(2),
    MouseCategory: BIT(3),
    MouseButtonCategory: BIT(4),

})

export class Event {
    constructor() {
        this.toString = this.toString.bind(this);
    }

    _handled = false;

    getEventType() {
        throw new NotImplementedError();
    }
    getName() {
        throw new NotImplementedError();
    }
    getCategoryFlags() {
        throw new NotImplementedError();
    }
    toString() {
        return this.getName();
    }

    isInCategory(eventCategory) {
        return this.getCategoryFlags() & eventCategory;
    }
}

export class EventDispatcher {

    _event;
    constructor(event) {
        this._event = event;
    }

    dispatch(type, eventFunc) {
        if(this._event.getEventType() === type.getStaticType()) {
            this._event.handled = eventFunc(this._event);
            return true;
        }
        return false;
    }
}