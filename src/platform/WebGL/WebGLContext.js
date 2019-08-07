import GraphicsContext from '../../Corvus/Renderer/GraphicsContext';
import CorvusLogger from '../../Corvus/Logger/CorvusLogger';

class WebGLContext extends GraphicsContext {

    constructor(windowHandle) {
        super(windowHandle);
        this._windowHandle = windowHandle;
        this._context = windowHandle.getContext('webgl2'); //TODO:(Ryan) abstract this out to support multiple browsers
        CorvusLogger.GetCoreLogger().assert(!!this._context, 'Could not initialize WebGL')
        this._context.viewport(0, 0, windowHandle.width, windowHandle.height);
    }

    init() {

    }

    swapBuffers() {

    }

    getGraphicsContext() {
        return this._context;
    }

}

export default WebGLContext;