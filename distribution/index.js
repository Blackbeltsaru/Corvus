'use strict';

var _Application = require('./Core/Application');

var _Application2 = _interopRequireDefault(_Application);

var _EntryPoint = require('./EntryPoint');

var _EntryPoint2 = _interopRequireDefault(_EntryPoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    Application: _Application2.default,
    Corvus: _EntryPoint2.default
};