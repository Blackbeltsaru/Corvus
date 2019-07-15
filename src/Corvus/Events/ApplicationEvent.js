import {Event, Events, EventCategories} from './Events';

/**
 * An event to represent that the window has been resized
 */
export class WindowResizeEvent extends Event {
    //Class variables
    // _width;
    // _height;
    /**
     * @param {number} width the new width of the window
     * @param {number} height the new height of the window
     */
    constructor(width, height) {
        super();
        this._width = width;
        this._height = height;
    }

    /**@returns {number} the new width of the window*/
    getWidth() {return this._width;}
    /**@returns {number} the new height of the window*/
    getHeight() {return this._height;}

    /**The tostring method used for logging */
    toString() {return `WindowResizeEvent: ${this._width}, ${this._height}`;}

    /**@returns {Events} the type of the event */
    static getStaticType() {return Events.WindowResize};
    /**@returns {string} the name of the event */
    getName() {return 'WindowResize';}

    /**@returns {EventCategories} which categories the event falls under */
    getCategoryFlags() {return EventCategories.ApplicationCategory;}
}

/**
 * An event to represent that the window has been closed
 */
export class WindowCloseEvent extends Event {
    static getStaticType() {return Events.WindowClose;}
    getName() {return 'WinddowClose';}

    getCategoryFlags() {return EventCategories.ApplicationCategory;}
}

/**
 * An event to represent and application tick
 */
export class AppTickEvent extends Event {
    static getStaticType() {return Events.AppTick;}
    getName() {return 'AppTick';}

    getCategoryFlags() {return EventCategories.ApplicationCategory;}
}

/**
 * An event to represent an application update
 */
export class AppUpdateEvent extends Event {
    static getStaticType() {return Events.AppUpdate;}
    getName() {return 'AppUpdate';}

    getCategoryFlags() {return EventCategories.ApplicationCategory;}
}

/**
 * An event to represent an application render
 */
export class AppRenderEvent extends Event {
    static getStaticType() {return Events.AppRender;}
    getName() {return 'AppRender';}

    getCategoryFlags() {return EventCategories.ApplicationCategory;}
}