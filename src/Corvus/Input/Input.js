import NotImplementedError from '../Error/NotImplementedError';
import Key from './Key'

class Input {

    //s_Instance;
    //s_Key
    constructor() {
        if(!Input.s_Key) {
            Input.s_Key = new Key();
        }
    }

    static getKeyContainer() {
        return Input.s_Key;
    }

    static getInstance() {
        return Input.s_Instance;
    }

    static isKeyPressed(keyCode) {
        return Input.s_Instance.isKeyPressedImpl(keyCode);
    }

    static isMouseButtonPressed(button) {
        return Input.s_Instance.isMouseButtonPressedImpl(button);
    }

    static isKeyPressedImpl(keyCode) {
        throw new NotImplementedError();
    }

    static isMouseButtonPressedImpl(button) {
        throw new NotImplementedError();
    }

    static getMousePosition() {
        return Input.s_Instance.getMousePositionImpl();
    }

    static getMousePositionImpl() {
        throw new NotImplementedError();
    }
}

export default Input;