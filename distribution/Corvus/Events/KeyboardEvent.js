'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KeyTypedEvent = exports.KeyReleasedEvent = exports.KeyPressedEvent = exports.KeyEvent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Events = require('./Events');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KeyEvent = exports.KeyEvent = function (_Event) {
    _inherits(KeyEvent, _Event);

    // Class variables
    // _KeyCode;
    function KeyEvent(keyCode) {
        _classCallCheck(this, KeyEvent);

        var _this = _possibleConstructorReturn(this, (KeyEvent.__proto__ || Object.getPrototypeOf(KeyEvent)).call(this));

        _this._KeyCode = keyCode;
        return _this;
    }

    _createClass(KeyEvent, [{
        key: 'getKeyCode',
        value: function getKeyCode() {
            return this._KeyCode;
        }
    }, {
        key: 'getCategoryFlags',
        value: function getCategoryFlags() {
            return _Events.EventCategories.KeyboardCategory | _Events.EventCategories.InputCategory;
        }
    }]);

    return KeyEvent;
}(_Events.Event);

var KeyPressedEvent = exports.KeyPressedEvent = function (_KeyEvent) {
    _inherits(KeyPressedEvent, _KeyEvent);

    // Class variables
    // _RepeatCount;
    function KeyPressedEvent(keyCode, repeatCount) {
        _classCallCheck(this, KeyPressedEvent);

        var _this2 = _possibleConstructorReturn(this, (KeyPressedEvent.__proto__ || Object.getPrototypeOf(KeyPressedEvent)).call(this, keyCode));

        _this2._RepeatCount = repeatCount;
        return _this2;
    }

    _createClass(KeyPressedEvent, [{
        key: 'getRepeatCount',
        value: function getRepeatCount() {
            return this._RepeatCount;
        }
    }, {
        key: 'toString',
        value: function toString() {
            return 'KeyPressed: ' + this._KeyCode + ' (' + this._RepeatCount + ' repeats)';
        }
    }, {
        key: 'getName',
        value: function getName() {
            return 'KeyPressed';
        }
    }], [{
        key: 'getStaticType',
        value: function getStaticType() {
            return _Events.Events.KeyPressed;
        }
    }]);

    return KeyPressedEvent;
}(KeyEvent);

var KeyReleasedEvent = exports.KeyReleasedEvent = function (_KeyEvent2) {
    _inherits(KeyReleasedEvent, _KeyEvent2);

    function KeyReleasedEvent(keyCode) {
        _classCallCheck(this, KeyReleasedEvent);

        return _possibleConstructorReturn(this, (KeyReleasedEvent.__proto__ || Object.getPrototypeOf(KeyReleasedEvent)).call(this, keyCode));
    }

    _createClass(KeyReleasedEvent, [{
        key: 'toString',
        value: function toString() {
            return 'KeyReleasedEvent: ' + this._KeyCode;
        }
    }, {
        key: 'getName',
        value: function getName() {
            return 'KeyReleased';
        }
    }], [{
        key: 'getStaticType',
        value: function getStaticType() {
            return _Events.Events.KeyReleased;
        }
    }]);

    return KeyReleasedEvent;
}(KeyEvent);

var KeyTypedEvent = exports.KeyTypedEvent = function (_KeyEvent3) {
    _inherits(KeyTypedEvent, _KeyEvent3);

    function KeyTypedEvent(keyCode) {
        _classCallCheck(this, KeyTypedEvent);

        return _possibleConstructorReturn(this, (KeyTypedEvent.__proto__ || Object.getPrototypeOf(KeyTypedEvent)).call(this, keyCode));
    }

    _createClass(KeyTypedEvent, [{
        key: 'toString',
        value: function toString() {
            return 'KeyTyped: ' + this._KeyCode;
        }
    }, {
        key: 'getName',
        value: function getName() {
            return 'KeyTyped';
        }
    }], [{
        key: 'getStaticType',
        value: function getStaticType() {
            return _Events.Events.KeyTyped;
        }
    }]);

    return KeyTypedEvent;
}(KeyEvent);