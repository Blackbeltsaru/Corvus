import Input from '../Corvus/Input/Input';
import Application from '../Corvus/Core/Application';

class WebInput extends Input {

    static s_Instance = new WebInput();

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
}