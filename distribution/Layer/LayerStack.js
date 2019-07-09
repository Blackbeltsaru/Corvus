"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LayerStack = function () {

    //Class variables
    // _Layers;
    // _LayerInsert;

    function LayerStack() {
        _classCallCheck(this, LayerStack);

        this._Layers = [];
        this._LayerInsert = 0;
    }

    _createClass(LayerStack, [{
        key: "pushLayer",
        value: function pushLayer(layer) {
            this._Layers.splice(this._LayerInsert, 0, layer);
            this._LayerInsert++;
        }
    }, {
        key: "pushOverlay",
        value: function pushOverlay(layer) {
            this._Layers.push(layer);
        }
    }, {
        key: "popLayer",
        value: function popLayer(layer) {
            //TODO: is filter the fastest way to do this?
            this._Layers = this._Layers.filter(function (l) {
                return l !== layer;
            });
            this._LayerInsert--;
        }
    }, {
        key: "popOverlay",
        value: function popOverlay(layer) {
            //TODO: is filter the fastest way to do this?
            this._Layers = this._Layers.filter(function (l) {
                return l !== layer;
            });
        }

        //TODO: in other languages these methods can be used to get
        //iterator pointers for the layers and then iterat from there

    }, {
        key: "begin",
        value: function begin() {
            return 0;
        }
    }, {
        key: "end",
        value: function end() {
            return this._Layers.length;
        }
    }, {
        key: "get",
        value: function get(i) {
            return this._Layers[i];
        }
    }]);

    return LayerStack;
}();

exports.default = LayerStack;