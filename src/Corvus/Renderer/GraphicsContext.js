import CorvusLogger from "../Logger/CorvusLogger";
import NotImplementedError from "../Error/NotImplementedError";


class GraphicsContext {

    //_context
    //_windowHandle

    constructor(windowHandle) {
    }

    init() {throw new NotImplementedError();}
    swapBuffers() {throw new NotImplementedError();}

    getGraphicsContext() {throw new NotImplementedError();}
}

export default GraphicsContext;