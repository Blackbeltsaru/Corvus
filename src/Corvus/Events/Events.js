import {BIT} from '../Core/Application';
import NotImplementedError from '../Error/NotImplementedError';

/**
 * An enum to represent the different types of events that exist
 */
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

/**
 * An enum to represent the different types of event categories that exist
 * These are bit fields because an event can belong to multiple event categories
 * So bit fields make containment checking easy
 */
export const EventCategories = Object.freeze({
    ApplicationCategory: BIT(0),
    InputCategory: BIT(1),
    KeyboardCategory: BIT(2),
    MouseCategory: BIT(3),
    MouseButtonCategory: BIT(4),

})

/**
 * Abstract class to represent all events that will be used by the application. 
 */
export class Event {

    //Class variables 
    // handled = false;

    constructor() {
        this.handled = false;
        this.toString = this.toString.bind(this);
    }



    getName() {throw new NotImplementedError();}
    getCategoryFlags() {throw new NotImplementedError();}

    getEventType() {return this.getStaticType();}
    toString() {return this.getName();}
    isInCategory(eventCategory) {return this.getCategoryFlags() & eventCategory;}
}

/**
 * A class to enable the dispatch of events
 * Checks that the types are ones that can be propagated and 
 */
export class EventDispatcher {

    // Class variables
    // _Event;
    constructor(event) {
        this._Event = event;
    }

    /**
     * Dispatches my event with the given function if it is of given type
     */
    dispatch(type, eventFunc) {
        if(this._Event.getEventType() === type.getStaticType()) {
            this._Event.handled = eventFunc(this._Event);
            return true;
        }
        return false;
    }
}