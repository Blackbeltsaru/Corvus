import {Event, Events, EventCategories} from './Events';

export class WindowResizeEvent extends Event {
    _width;
    _height;
    constructor(width, height) {
        this._width = width;
        this._height = height;
        this.getEventType = this.getEventType.bind(this);
    }
    getWidth() {return this._width;}
    getHeight() {return this._height;}

    toString() {return `WindowResizeEvent: ${this._width}, ${this._height}`;}

    static getStaticType() {return Events.WindowResize};
    getEventType() {return this.getStaticType()};
    getName() {return 'WindowResize'}

    getCategoryFlags() {return EventCategories.ApplicationCategory}
}

export class WindowCloseEvent extends Event {
    static getStaticType() {return Events.WindowClose};
    getEventType() {return this.getStaticType()};
    getName() {return 'WinddowClose'}

    getCategoryFlags() {return EventCategories.ApplicationCategory}
}

export class AppTickEvent extends Event {
    static getStaticType() {return Events.AppTick};
    getEventType() {return this.getStaticType()};
    getName() {return 'AppTick'}

    getCategoryFlags() {return EventCategories.ApplicationCategory}
}

export class AppUpdateEvent extends Event {
    static getStaticType() {return Events.AppUpdate};
    getEventType() {return this.getStaticType()};
    getName() {return 'AppUpdate'}

    getCategoryFlags() {return EventCategories.ApplicationCategory}
}
export class AppRenderEvent extends Event {
    static getStaticType() {return Events.AppRender};
    getEventType() {return this.getStaticType()};
    getName() {return 'AppRender'}

    getCategoryFlags() {return EventCategories.ApplicationCategory}
}