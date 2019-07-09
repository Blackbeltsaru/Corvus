'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LogLevel = require('./LogLevel');

var _LogLevel2 = _interopRequireDefault(_LogLevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {

    //Class variables
    // _Id;
    // _Level;

    function Logger(id, level) {
        _classCallCheck(this, Logger);

        this._Id = id;
        this._Level = level;

        this.advancedLog.bind(this);
    }

    _createClass(Logger, [{
        key: 'stacktrace',
        value: function stacktrace() {
            var e = new Error();
            return e.stack;
        }
    }, {
        key: 'advancedLog',
        value: function advancedLog(level, msg) {
            var _console;

            if (this._Level.value > level.value) return;
            var logTime = new Date().toTimeString().split(' ')[0];

            for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                args[_key - 2] = arguments[_key];
            }

            (_console = console)[level.method].apply(_console, ['[' + logTime + '] ' + this._Id + ' :: ' + msg].concat(args));
        }
    }, {
        key: 'trace',
        value: function trace(msg) {
            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
            }

            this.advancedLog.apply(this, [_LogLevel2.default.TRACE, msg].concat(args));
        }
    }, {
        key: 'debug',
        value: function debug(msg) {
            for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                args[_key3 - 1] = arguments[_key3];
            }

            this.advancedLog.apply(this, [_LogLevel2.default.DEBUG, msg].concat(args));
        }
    }, {
        key: 'info',
        value: function info(msg) {
            for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                args[_key4 - 1] = arguments[_key4];
            }

            this.advancedLog.apply(this, [_LogLevel2.default.INFO, msg].concat(args));
        }
    }, {
        key: 'warn',
        value: function warn(msg) {
            for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
                args[_key5 - 1] = arguments[_key5];
            }

            this.advancedLog.apply(this, [_LogLevel2.default.WARN, msg].concat(args));
        }
    }, {
        key: 'error',
        value: function error(msg) {
            for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
                args[_key6 - 1] = arguments[_key6];
            }

            this.advancedLog.apply(this, [_LogLevel2.default.ERROR, msg].concat(args));
        }
    }, {
        key: 'fatal',
        value: function fatal(msg) {
            for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
                args[_key7 - 1] = arguments[_key7];
            }

            this.advancedLog.apply(this, [_LogLevel2.default.FATAL, msg].concat(args));
            this.advancedLog(_LogLevel2.default.FATAL, this.stacktrace());
        }
    }, {
        key: 'assert',
        value: function assert(condition, errorMessage) {
            if (!condition) {
                throw new Error(errorMessage);
            }
        }
    }]);

    return Logger;
}();

exports.default = Logger;