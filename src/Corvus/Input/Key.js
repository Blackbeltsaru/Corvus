class Key {

    constructor() {
        this._keyPressed = {};
        this._mousePressed = {};
        this._mouseX = 0;
        this._mouseY = 0;
    }

    isDown(keyCode) {
        return this._keyPressed[keyCode];
    }

    onKeyDown(keyCode) {
        this._keyPressed[keyCode] = true;
    }

    onKeyUp(keyCode) {
        this._keyPressed[keyCode] = false;
    }

    isMousePressed(button) {
        return this._mousePressed[button];
    }

    onMouseDown(button) {
        this._mousePressed[button] = true;
    }

    onMouseUp(button) {
        this._mousePressed[button] = false;
    }

    onMouseMove(x, y) {
        this._mouseX = x;
        this._mouseY = y;
    }

    getMouseX() {
        return this._mouseX;
    }

    getMouseY() {
        return this._mouseY;
    }
}

export default Key;