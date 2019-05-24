import Logger from './Logger';
import LogLevel from './LogLevel';

export default class CorvusLogger {
    static coreLogger;
    static clientLogger;
    static GetCoreLogger() {return CorvusLogger.coreLogger};
    static GetClientLogger() {return CorvusLogger.clientLogger}

    static init() {
        if(!CorvusLogger.coreLogger)
            CorvusLogger.coreLogger = new Logger('CORVUS', LogLevel.INFO);
        if(!CorvusLogger.clientLogger)    
            CorvusLogger.clientLogger = new Logger('CLIENT', LogLevel.INFO);
    }
}