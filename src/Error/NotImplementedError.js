/**
 * An error used to create abstract methods
 */
class NotImplementedError extends Error {
    constructor(...params) {
        super(...params);
        
        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, NotImplementedError);
        }
        this.name = 'NotImplementedError';
        this.date = new Date();
    }
}

export default NotImplementedError;