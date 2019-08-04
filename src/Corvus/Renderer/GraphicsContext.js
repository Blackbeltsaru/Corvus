import CorvusLogger from "../Logger/CorvusLogger";


class GraphicsContext {

    //_context
    //_windowHandle

    constructor(windowHandle) {
        this._windowHandle = windowHandle;
        this._context = windwoHandle.getContext('webgl');
        CorvusLogger.GetCoreLogger().assert(!!this._context, 'Could not initialize WebGL')
        this._context.viewport(0, 0, windowHandle.width, windowHandle.height);
    }

    init() {

    }
    swapBuffers() {

    }
}

export default GraphicsContext;