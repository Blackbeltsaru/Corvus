import LogLevel from './LogLevel';

export default class Logger {

    _id;
    _level;

    constructor(id, level) {
        this._id = id;
        this._level = level;

        this.advancedLog.bind(this);
        this.stacktrace.bind(this);
    }

    stacktrace() { 
        const e = new Error();
        return e.stack;
      }

    advancedLog(level, msg, ...args) {
        if(this._level.value > level.value) return;
        const logTime = new Date().toTimeString().split(' ')[0];
        console[level.method](`[${logTime}] ${this._id} :: ${msg}`);
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
}

