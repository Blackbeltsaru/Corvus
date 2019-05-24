import CorvusLogger from './Logger/CorvusLogger';

export default function main (application) {
    CorvusLogger.init();
    CorvusLogger.coreLogger.info('Core logger');
    CorvusLogger.clientLogger.info('Client logger');
    // application.run();
}