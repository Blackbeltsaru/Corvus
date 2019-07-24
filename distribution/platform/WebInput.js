'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Input2 = require('../Corvus/Input/Input');

var _Input3 = _interopRequireDefault(_Input2);

var _Application = require('../Corvus/Core/Application');

var _Application2 = _interopRequireDefault(_Application);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WebInput = function (_Input) {
    _inherits(WebInput, _Input);

    function WebInput() {
        _classCallCheck(this, WebInput);

        return _possibleConstructorReturn(this, (WebInput.__proto__ || Object.getPrototypeOf(WebInput)).call(this));
    }

    _createClass(WebInput, [{
        key: 'isKeyPressedImpl',
        value: function isKeyPressedImpl(keyCode) {
            return WebInput.s_Key.isDown(keyCode);
        }
    }, {
        key: 'isMousePressedImpl',
        value: function isMousePressedImpl(button) {
            return WebInput.s_Key.isMousePressed(button);
        }
    }, {
        key: 'getMouseXImpl',
        value: function getMouseXImpl() {
            return WebInput.s_Key.getMouseX();
        }
    }, {
        key: 'getMouseYImpl',
        value: function getMouseYImpl() {
            return WebInput.s_Key.getMouseY();
        }
    }], [{
        key: 'createInstance',
        value: function createInstance() {
            console.log('creating input instance');
            if (!_Input3.default.s_Instance) _Input3.default.s_Instance = new WebInput();
            console.log('input instance', _Input3.default.s_Instance);
        }
    }]);

    return WebInput;
}(_Input3.default);

WebInput.createInstance();

exports.default = WebInput;