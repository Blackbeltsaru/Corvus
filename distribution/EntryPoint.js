'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Corvus;

var _CorvusLogger = require('./Logger/CorvusLogger');

var _CorvusLogger2 = _interopRequireDefault(_CorvusLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Corvus(application) {
    _CorvusLogger2.default.init();
    _CorvusLogger2.default.coreLogger.warn('Initializing Logger');

    var app = application.createApplication();
    app.run();
}