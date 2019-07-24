'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EventDispatcher = exports.Event = exports.EventCategories = exports.Events = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Application = require('../Core/Application');

var _NotImplementedError = require('../Error/NotImplementedError');

var _NotImplementedError2 = _interopRequireDefault(_NotImplementedError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * An enum to represent the different types of events that exist
 */
var Events = exports.Events = Object.freeze({
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
    MouseScrolled: 15
});

/**
 * An enum to represent the different types of event categories that exist
 * These are bit fields because an event can belong to multiple event categories
 * So bit fields make containment checking easy
 */
var EventCategories = exports.EventCategories = Object.freeze({
    ApplicationCategory: (0, _Application.BIT)(0),
    InputCategory: (0, _Application.BIT)(1),
    KeyboardCategory: (0, _Application.BIT)(2),
    MouseCategory: (0, _Application.BIT)(3),
    MouseButtonCategory: (0, _Application.BIT)(4)

});

/**
 * Abstract class to represent all events that will be used by the application. 
 */

var Event = exports.Event = function () {

    //Class variables 
    // handled = false;

    function Event() {
        _classCallCheck(this, Event);

        this.handled = false;
        this.toString = this.toString.bind(this);
    }

    _createClass(Event, [{
        key: 'getName',
        value: function getName() {
            throw new _NotImplementedError2.default();
        }
    }, {
        key: 'getCategoryFlags',
        value: function getCategoryFlags() {
            throw new _NotImplementedError2.default();
        }
    }, {
        key: 'getEventType',
        value: function getEventType() {
            return this.getStaticType();
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.getName();
        }
    }, {
        key: 'isInCategory',
        value: function isInCategory(eventCategory) {
            return this.getCategoryFlags() & eventCategory;
        }
    }]);

    return Event;
}();

/**
 * A class to enable the dispatch of events
 * Checks that the types are ones that can be propagated and 
 */


var EventDispatcher = exports.EventDispatcher = function () {

    // Class variables
    // _Event;
    function EventDispatcher(event) {
        _classCallCheck(this, EventDispatcher);

        this._Event = event;
    }

    /**
     * Dispatches my event with the given function if it is of given type
     */


    _createClass(EventDispatcher, [{
        key: 'dispatch',
        value: function dispatch(type, eventFunc) {
            if (this._Event.getEventType() === type.getStaticType()) {
                this._Event.handled = eventFunc(this._Event);
                return true;
            }
            return false;
        }
    }]);

    return EventDispatcher;
}();