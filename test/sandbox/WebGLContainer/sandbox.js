import {Corvus, Application} from '../../../src/index';

class Sandbox extends Application {

    constructor() {
        super();
    }

    static createApplication() {
        return new Sandbox();
    }
}

const runSandbox = () => {
    console.log('runSandbox');
    Corvus(Sandbox);
}

export default runSandbox;