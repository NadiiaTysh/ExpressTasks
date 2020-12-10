// Core
import Ajv from 'ajv';
import { ValidationError } from './errors';

export const validator = (schema) => (req, res, next) => {
    const ajv = new Ajv({allErrors: true});
    const validate = ajv.compile(schema);
    const isValid = validate(req.body);

    if (isValid) {
        return next();
    }

    const errors = validate.errors.map(({ params, dataPath }) => {
        const { additionalProperty, missingProperty } = params;
        let error = '';

        if (additionalProperty) {
            error = additionalProperty;
        }
        if (missingProperty) {
            error = missingProperty;
        }
        if (dataPath) {
            error = dataPath.slice(1);
        }

        return error.concat(' error');
    });

    const body = JSON.stringify(req.body, null, 2);
    next(new ValidationError(`${req.method}: ${req.originalUrl} [ ${errors.join(', ')} ]\n${body}`, 400));
};
