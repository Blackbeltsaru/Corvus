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
        console.log('creating input instance');
        if(!Input.s_Instance) Input.s_Instance = new WebInput();
        console.log('input instance', Input.s_Instance);
    }
}

WebInput.createInstance();

export default WebInput;