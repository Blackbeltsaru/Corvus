'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MouseReleasedEvent = exports.MousePressedEvent = exports.MouseButtonEvent = exports.MouseScrolledEvent = exports.MouseMovedEvent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Events = require('./Events');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MouseMovedEvent = exports.MouseMovedEvent = function (_Event) {
    _inherits(MouseMovedEvent, _Event);

    //Class variables
    // _MouseX;
    // _MouseY;
    function MouseMovedEvent(mouseX, mouseY) {
        _classCallCheck(this, MouseMovedEvent);

        var _this = _possibleConstructorReturn(this, (MouseMovedEvent.__proto__ || Object.getPrototypeOf(MouseMovedEvent)).call(this));

        _this._MouseX = mouseX;
        _this._MouseY = mouseY;
        return _this;
    }

    _createClass(MouseMovedEvent, [{
        key: 'getX',
        value: function getX() {
            return this._MouseX;
        }
    }, {
        key: 'getY',
        value: function getY() {
            return this._MouseY;
        }
    }, {
        key: 'toString',
        value: function toString() {
            return 'MouseMoved: ' + this._MouseX + ', ' + this._MouseY;
        }
    }, {
        key: 'getName',
        value: function getName() {
            return 'MouseMoved';
        }
    }, {
        key: 'getCategoryFlags',
        value: function getCategoryFlags() {
            return _Events.EventCategories.MouseCategory | _Events.EventCategories.InputCategory;
        }
    }], [{
        key: 'getStaticType',
        value: function getStaticType() {
            return _Events.Events.MouseMoved;
        }
    }]);

    return MouseMovedEvent;
}(_Events.Event);

var MouseScrolledEvent = exports.MouseScrolledEvent = function (_Event2) {
    _inherits(MouseScrolledEvent, _Event2);

    // Class variables
    // _XOffset;
    // _YOffset;
    function MouseScrolledEvent(xOffset, yOffset) {
        _classCallCheck(this, MouseScrolledEvent);

        var _this2 = _possibleConstructorReturn(this, (MouseScrolledEvent.__proto__ || Object.getPrototypeOf(MouseScrolledEvent)).call(this));

        _this2._XOffset = xOffset;
        _this2._YOffset = yOffset;
        return _this2;
    }

    _createClass(MouseScrolledEvent, [{
        key: 'getXOffset',
        value: function getXOffset() {
            return this._XOffset;
        }
    }, {
        key: 'getYOffset',
        value: function getYOffset() {
            return this.yOffset;
        }
    }, {
        key: 'toString',
        value: function toString() {
            return 'MouseScrolled: ' + this._XOffset + ', ' + this._YOffset;
        }
    }, {
        key: 'getName',
        value: function getName() {
            return 'MouseScrolled';
        }
    }, {
        key: 'getCategoryFlags',
        value: function getCategoryFlags() {
            return _Events.EventCategories.MouseCategory | _Events.EventCategories.InputCategory;
        }
    }], [{
        key: 'getStaticType',
        value: function getStaticType() {
            return _Events.Events.MouseScrolled;
        }
    }]);

    return MouseScrolledEvent;
}(_Events.Event);

var MouseButtonEvent = exports.MouseButtonEvent = function (_Event3) {
    _inherits(MouseButtonEvent, _Event3);

    //Class variables
    // _Button;
    function MouseButtonEvent(button) {
        _classCallCheck(this, MouseButtonEvent);

        var _this3 = _possibleConstructorReturn(this, (MouseButtonEvent.__proto__ || Object.getPrototypeOf(MouseButtonEvent)).call(this));

        _this3._Button = button;
        return _this3;
    }

    _createClass(MouseButtonEvent, [{
        key: 'getMouseButton',
        value: function getMouseButton() {
            return this._Button;
        }
    }, {
        key: 'getCategoryFlags',
        value: function getCategoryFlags() {
            return _Events.EventCategories.MouseCategory | _Events.EventCategories.InputCategory;
        }
    }]);

    return MouseButtonEvent;
}(_Events.Event);

var MousePressedEvent = exports.MousePressedEvent = function (_MouseButtonEvent) {
    _inherits(MousePressedEvent, _MouseButtonEvent);

    function MousePressedEvent(button) {
        _classCallCheck(this, MousePressedEvent);

        return _possibleConstructorReturn(this, (MousePressedEvent.__proto__ || Object.getPrototypeOf(MousePressedEvent)).call(this, button));
    }

    _createClass(MousePressedEvent, [{
        key: 'toString',
        value: function toString() {
            return 'MousePressedEvent: ' + this._Button;
        }
    }, {
        key: 'getName',
        value: function getName() {
            return 'MouseButtonPressed';
        }
    }], [{
        key: 'getStaticType',
        value: function getStaticType() {
            return _Events.Events.MouseButtonPressed;
        }
    }]);

    return MousePressedEvent;
}(MouseButtonEvent);

var MouseReleasedEvent = exports.MouseReleasedEvent = function (_MouseButtonEvent2) {
    _inherits(MouseReleasedEvent, _MouseButtonEvent2);

    function MouseReleasedEvent(button) {
        _classCallCheck(this, MouseReleasedEvent);

        return _possibleConstructorReturn(this, (MouseReleasedEvent.__proto__ || Object.getPrototypeOf(MouseReleasedEvent)).call(this, button));
    }

    _createClass(MouseReleasedEvent, [{
        key: 'toString',
        value: function toString() {
            return 'MouseReleasedEvent: ' + this._Button;
        }
    }, {
        key: 'getName',
        value: function getName() {
            return 'MouseButtonReleased';
        }
    }], [{
        key: 'getStaticType',
        value: function getStaticType() {
            return _Events.Events.MouseButtonReleased;
        }
    }]);

    return MouseReleasedEvent;
}(MouseButtonEvent);