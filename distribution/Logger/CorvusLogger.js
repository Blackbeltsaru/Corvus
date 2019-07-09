'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Logger = require('./Logger');

var _Logger2 = _interopRequireDefault(_Logger);

var _LogLevel = require('./LogLevel');

var _LogLevel2 = _interopRequireDefault(_LogLevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CorvusLogger = function () {
    function CorvusLogger() {
        _classCallCheck(this, CorvusLogger);
    }

    _createClass(CorvusLogger, null, [{
        key: 'GetCoreLogger',

        // static coreLogger;
        // static clientLogger;
        value: function GetCoreLogger() {
            return CorvusLogger.coreLogger;
        }
    }, {
        key: 'GetClientLogger',
        value: function GetClientLogger() {
            return CorvusLogger.clientLogger;
        }
    }, {
        key: 'init',
        value: function init() {
            //TODO: get the log level from some properties 
            if (!CorvusLogger.coreLogger) CorvusLogger.coreLogger = new _Logger2.default('CORVUS', _LogLevel2.default.TRACE);
            if (!CorvusLogger.clientLogger) CorvusLogger.clientLogger = new _Logger2.default('CLIENT', _LogLevel2.default.TRACE);
        }
    }]);

    return CorvusLogger;
}();

exports.default = CorvusLogger;