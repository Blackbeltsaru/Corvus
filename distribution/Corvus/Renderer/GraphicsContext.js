"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CorvusLogger = require("../Logger/CorvusLogger");

var _CorvusLogger2 = _interopRequireDefault(_CorvusLogger);

var _NotImplementedError = require("../Error/NotImplementedError");

var _NotImplementedError2 = _interopRequireDefault(_NotImplementedError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GraphicsContext = function () {

    //_context
    //_windowHandle

    function GraphicsContext(windowHandle) {
        _classCallCheck(this, GraphicsContext);
    }

    _createClass(GraphicsContext, [{
        key: "init",
        value: function init() {
            throw new _NotImplementedError2.default();
        }
    }, {
        key: "swapBuffers",
        value: function swapBuffers() {
            throw new _NotImplementedError2.default();
        }
    }, {
        key: "getGraphicsContext",
        value: function getGraphicsContext() {
            throw new _NotImplementedError2.default();
        }
    }]);

    return GraphicsContext;
}();

exports.default = GraphicsContext;