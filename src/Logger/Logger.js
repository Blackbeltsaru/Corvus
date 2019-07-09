import LogLevel from './LogLevel';

export default class Logger {

    m_Id;
    m_Level;

    constructor(id, level) {
        this.m_Id = id;
        this.m_Level = level;

        this.advancedLog.bind(this);
    }

    stacktrace() { 
        const e = new Error();
        return e.stack;
      }

    advancedLog(level, msg, ...args) {
        if(this.m_Level.value > level.value) return;
        const logTime = new Date().toTimeString().split(' ')[0];
        console[level.method](`[${logTime}] ${this.m_Id} :: ${msg}`, ...args);
    };

    trace(msg, ...args) {
        this.advancedLog(LogLevel.TRACE, msg, ...args);
    };
    
    debug(msg, ...args) {
        this.advancedLog(LogLevel.DEBUG, msg, ...args);
    };

    info(msg, ...args) {
        this.advancedLog(LogLevel.INFO, msg, ...args);
    };

    warn(msg, ...args) {
        this.advancedLog(LogLevel.WARN, msg, ...args);
    };

    error(msg, ...args) {
        this.advancedLog(LogLevel.ERROR, msg, ...args);
    };

    fatal(msg, ...args) {
        this.advancedLog(LogLevel.FATAL, msg, ...args);
        this.advancedLog(LogLevel.FATAL, this.stacktrace());
    };

    assert(condition, errorMessage) {
        if(!condition) {
            throw new Error(errorMessage);
        }
    }
}

