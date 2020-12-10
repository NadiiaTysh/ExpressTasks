export class ValidationError extends Error {
    constructor(...args) {
        super(...args);
        const [ , statusCode = 400 ] = args;

        if (typeof statusCode !== 'number') {
            throw new Error('arguments are not valid');
        }

        if (!/^[1-5]{1}[0-9]{2}$/.test(statusCode)) {
            throw new Error('statusCost must be from 100 to 599');
        }

        Error.captureStackTrace(this, ValidationError);
        this.name = 'ValidationError';
        this.statusCode = statusCode;
    }
}
