import Input from '../Corvus/Input/Input';
import Application from '../Corvus/Core/Application';

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
        console.log('creating input instance');
        if(!Input.s_Instance) Input.s_Instance = new WebInput();
        console.log('input instance', Input.s_Instance);
    }
}

export default WebInput;