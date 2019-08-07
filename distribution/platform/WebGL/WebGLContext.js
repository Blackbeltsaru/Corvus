'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GraphicsContext2 = require('../../Corvus/Renderer/GraphicsContext');

var _GraphicsContext3 = _interopRequireDefault(_GraphicsContext2);

var _CorvusLogger = require('../../Corvus/Logger/CorvusLogger');

var _CorvusLogger2 = _interopRequireDefault(_CorvusLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WebGLContext = function (_GraphicsContext) {
    _inherits(WebGLContext, _GraphicsContext);

    function WebGLContext(windowHandle) {
        _classCallCheck(this, WebGLContext);

        var _this = _possibleConstructorReturn(this, (WebGLContext.__proto__ || Object.getPrototypeOf(WebGLContext)).call(this, windowHandle));

        _this._windowHandle = windowHandle;
        _this._context = windowHandle.getContext('webgl2'); //TODO:(Ryan) abstract this out to support multiple browsers
        _CorvusLogger2.default.GetCoreLogger().assert(!!_this._context, 'Could not initialize WebGL');
        _this._context.viewport(0, 0, windowHandle.width, windowHandle.height);
        return _this;
    }

    _createClass(WebGLContext, [{
        key: 'init',
        value: function init() {}
    }, {
        key: 'swapBuffers',
        value: function swapBuffers() {}
    }, {
        key: 'getGraphicsContext',
        value: function getGraphicsContext() {
            return this._context;
        }
    }]);

    return WebGLContext;
}(_GraphicsContext3.default);

exports.default = WebGLContext;