'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * An error used to create abstract methods
 */
var NotImplementedError = function (_Error) {
    _inherits(NotImplementedError, _Error);

    function NotImplementedError() {
        var _ref;

        _classCallCheck(this, NotImplementedError);

        for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
            params[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = NotImplementedError.__proto__ || Object.getPrototypeOf(NotImplementedError)).call.apply(_ref, [this].concat(params)));

        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, NotImplementedError);
        }
        _this.name = 'NotImplementedError';
        _this.date = new Date();
        return _this;
    }

    return NotImplementedError;
}(Error);

exports.default = NotImplementedError;