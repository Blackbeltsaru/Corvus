import Logger from './Logger';
import LogLevel from './LogLevel';

export default class CorvusLogger {
    // static coreLogger;
    // static clientLogger;
    static GetCoreLogger() {return CorvusLogger.coreLogger};
    static GetClientLogger() {return CorvusLogger.clientLogger}

    static init() {
        //TODO: get the log level from some properties 
        if(!CorvusLogger.coreLogger)
            CorvusLogger.coreLogger = new Logger('CORVUS', LogLevel.TRACE);
        if(!CorvusLogger.clientLogger)    
            CorvusLogger.clientLogger = new Logger('CLIENT', LogLevel.TRACE);
    }
}