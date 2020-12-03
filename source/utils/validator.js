// Core
import Ajv from 'ajv';

export const validator = (schema) => (req, res, next) => {
    const ajv = new Ajv({allErrors: true});
    const validate = ajv.compile(schema);

    const isValid = validate(req.body);

    if (isValid) {
        return next();
    }

    const errors = validate.errors.map(({ message }) => message).join(', ');

    res.status(400).json({ message: errors });
};
