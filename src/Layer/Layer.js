import {NotImplementedError} from '../Error/NotImplementedError';

class Layer {

    //TODO: debugName should be removed from release builds
    m_DebugName;
    constructor(name) {
        super();
        //TODO: debugName should be removed from release builds
        this.m_DebugName = name;
    }

    onAttach() {throw new NotImplementedError();}
    onDetach() {throw new NotImplementedError();}
    onUpdate() {throw new NotImplementedError();}
    onEvent(event) {throw new NotImplementedError();}

    getName() {return this.m_DebugName}


}

export default Layer;