'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NotImplementedError = require('../Error/NotImplementedError');

var _NotImplementedError2 = _interopRequireDefault(_NotImplementedError);

var _Key = require('./Key');

var _Key2 = _interopRequireDefault(_Key);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Input = function () {

    //s_Instance;
    //s_Key
    function Input() {
        _classCallCheck(this, Input);

        if (!Input.s_Key) {
            Input.s_Key = new _Key2.default();
        }
    }

    _createClass(Input, null, [{
        key: 'getKeyContainer',
        value: function getKeyContainer() {
            return Input.s_Key;
        }
    }, {
        key: 'getInstance',
        value: function getInstance() {
            return Input.s_Instance;
        }
    }, {
        key: 'isKeyPressed',
        value: function isKeyPressed(keyCode) {
            return Input.s_Instance.isKeyPressedImpl(keyCode);
        }
    }, {
        key: 'isMouseButtonPressed',
        value: function isMouseButtonPressed(button) {
            return Input.s_Instance.isMouseButtonPressedImpl(button);
        }
    }, {
        key: 'isKeyPressedImpl',
        value: function isKeyPressedImpl(keyCode) {
            throw new _NotImplementedError2.default();
        }
    }, {
        key: 'isMouseButtonPressedImpl',
        value: function isMouseButtonPressedImpl(button) {
            throw new _NotImplementedError2.default();
        }
    }, {
        key: 'getMousePosition',
        value: function getMousePosition() {
            return Input.s_Instance.getMousePositionImpl();
        }
    }, {
        key: 'getMousePositionImpl',
        value: function getMousePositionImpl() {
            throw new _NotImplementedError2.default();
        }
    }]);

    return Input;
}();

exports.default = Input;