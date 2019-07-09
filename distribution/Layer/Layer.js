'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NotImplementedError = require('../Error/NotImplementedError');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Layer = function () {

    //TODO: debugName should be removed from release builds
    // _DebugName;
    function Layer(name) {
        _classCallCheck(this, Layer);

        //TODO: debugName should be removed from release builds
        this._DebugName = name;
    }

    _createClass(Layer, [{
        key: 'onAttach',
        value: function onAttach() {
            throw new _NotImplementedError.NotImplementedError();
        }
    }, {
        key: 'onDetach',
        value: function onDetach() {
            throw new _NotImplementedError.NotImplementedError();
        }
    }, {
        key: 'onUpdate',
        value: function onUpdate() {
            throw new _NotImplementedError.NotImplementedError();
        }
    }, {
        key: 'onEvent',
        value: function onEvent(event) {
            throw new _NotImplementedError.NotImplementedError();
        }
    }, {
        key: 'getName',
        value: function getName() {
            return this._DebugName;
        }
    }]);

    return Layer;
}();

exports.default = Layer;