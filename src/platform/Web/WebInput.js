import Input from '../../Corvus/Input/Input';

class WebInput extends Input {

    constructor() {
        super();
    }

    isKeyPressedImpl(keyCode) {
        return Input.s_Key.isDown(keyCode);
    }

    isMousePressedImpl(button) {
        return Input.s_Key.isMousePressed(button);
    }

    getMousePositionImpl() {
        return {x: Input.s_Key.getMouseX(), y: Input.s_Key.getMouseY()}
    }

    static createInstance() {
        if(!Input.s_Instance) Input.s_Instance = new WebInput();
    }
}

export default WebInput;