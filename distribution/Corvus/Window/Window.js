"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Window = exports.WindowProps = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NotImplementedError = require("../Error/NotImplementedError");

var _NotImplementedError2 = _interopRequireDefault(_NotImplementedError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WindowProps =

//Class variables 
// title;
// width;
// height;

exports.WindowProps = function WindowProps() {
    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Corvus Engine";
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1280;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 720;

    _classCallCheck(this, WindowProps);

    this.title = title;
    this.width = width;
    this.height = height;
};

var Window = exports.Window = function () {

    //Class variables 
    // eventCallbackFn;

    function Window() {
        _classCallCheck(this, Window);
    }

    _createClass(Window, [{
        key: "onUpdate",
        value: function onUpdate() {
            throw new _NotImplementedError2.default();
        }
    }, {
        key: "getWidth",
        value: function getWidth() {
            throw new _NotImplementedError2.default();
        }
    }, {
        key: "getHeight",
        value: function getHeight() {
            throw new _NotImplementedError2.default();
        }

        //Window attributes

    }, {
        key: "setEventCallback",
        value: function setEventCallback(eventCallback) {
            throw new _NotImplementedError2.default();
        }
    }, {
        key: "setVSync",
        value: function setVSync(enabled) {
            throw new _NotImplementedError2.default();
        }
    }, {
        key: "isVSync",
        value: function isVSync() {
            throw new _NotImplementedError2.default();
        }
    }, {
        key: "getNativeWindow",
        value: function getNativeWindow() {
            throw new _NotImplementedError2.default();
        }
    }, {
        key: "getContext",
        value: function getContext() {
            throw new _NotImplementedError2.default();
        }
    }], [{
        key: "create",
        value: function create() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : WindowProps();
            throw new _NotImplementedError2.default();
        }
    }]);

    return Window;
}();