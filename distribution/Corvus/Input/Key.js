"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Key = function () {
    function Key() {
        _classCallCheck(this, Key);

        this._keyPressed = {};
        this._mousePressed = {};
        this._mouseX = 0;
        this._mouseY = 0;
    }

    _createClass(Key, [{
        key: "isDOwn",
        value: function isDOwn(keyCode) {
            return this._keyPressed[keyCode];
        }
    }, {
        key: "onKeyDown",
        value: function onKeyDown(keyCode) {
            this._keyPressed[keyCode] = true;
        }
    }, {
        key: "onKeyUp",
        value: function onKeyUp(keyCode) {
            this._keyPressed[keyCode] = false;
        }
    }, {
        key: "isMousePressed",
        value: function isMousePressed(button) {
            return this._mousePressed[button];
        }
    }, {
        key: "onMouseDown",
        value: function onMouseDown(button) {
            this._mousePressed[button] = true;
        }
    }, {
        key: "onMouseUp",
        value: function onMouseUp(button) {
            this._mousePressed[button] = false;
        }
    }, {
        key: "onMouseMove",
        value: function onMouseMove(x, y) {
            this._mouseX = x;
            this._mouseY = y;
        }
    }, {
        key: "getMouseX",
        value: function getMouseX() {
            return this._mouseX;
        }
    }, {
        key: "getMouseY",
        value: function getMouseY() {
            return this._mouseY;
        }
    }]);

    return Key;
}();

exports.default = Key;