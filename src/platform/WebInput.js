import Input from '../Corvus/Input/Input';
import Application from '../Corvus/Core/Application';

class WebInput extends Input {

    constructor() {
        super();
    }

    isKeyPressedImpl(keyCode) {
        return WebInput.s_Key.isDown(keyCode);
    }

    isMousePressedImpl(button) {
        return WebInput.s_Key.isMousePressed(button);
    }

    getMouseXImpl() {
        return WebInput.s_Key.getMouseX();
    }

    getMouseYImpl() {
        return WebInput.s_Key.getMouseY();
    }

    static createInstance() {
        if(!WebInput.s_Instance) WebInput.s_Instance = new WebInput();
    }
}

WebInput.createInstance();

export default WebInput;