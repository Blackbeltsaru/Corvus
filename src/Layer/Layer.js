import {NotImplementedError} from '../Error/NotImplementedError';

class Layer {

    //TODO: debugName should be removed from release builds
    // _DebugName;
    constructor(name) {
        //TODO: debugName should be removed from release builds
        this._DebugName = name;
    }

    onAttach() {throw new NotImplementedError();}
    onDetach() {throw new NotImplementedError();}
    onUpdate() {throw new NotImplementedError();}
    onEvent(event) {throw new NotImplementedError();}

    getName() {return this._DebugName}


}

export default Layer;