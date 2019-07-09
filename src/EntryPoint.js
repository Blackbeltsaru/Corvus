import CorvusLogger from './Logger/CorvusLogger';

export default function Corvus (application) {
    CorvusLogger.init();
    CorvusLogger.coreLogger.warn('Initializing Logger');
    
    const app = application.createApplication();
    app.run();
}