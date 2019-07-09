'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * An enum to represent the possible log levels
 */
exports.default = {
    TRACE: { value: 1, method: 'trace' },
    DEBUG: { value: 2, method: 'debug' },
    INFO: { value: 3, method: 'log' },
    WARN: { value: 4, method: 'warn' },
    ERROR: { value: 5, method: 'error' },
    FATAL: { value: 6, method: 'error' }
};