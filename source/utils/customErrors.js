// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

export class ValidationError extends Error {
    constructor(message, statusCode) {
        super(message);
        /*
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ValidationError);
        }
        */
        this.name = 'ValidationError';
        this.statusCode = statusCode || 400;
    }
}

export class NotFoundError extends Error {
    constructor(message, statusCode) {
        super(message);
        /*
         // Maintains proper stack trace for where our error was thrown (only available on V8)
         if (Error.captureStackTrace) {
         Error.captureStackTrace(this, NotFoundError);
         }
         */
        this.name = 'NotFoundError';
        this.statusCode = statusCode || 400;
    }
}
