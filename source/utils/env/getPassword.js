// Tools
import { ValidationError } from '../errors';

export const getPassword = () => {
    const { PASSWORD } = process.env;

    if (!PASSWORD) {
        throw new ValidationError('Environment variable PASSWORD should be specified');
    }

    const isValid = /^([0-9A-Za-z-!@#$%^&*()_=+]){8,}$/.test(PASSWORD);

    if (!isValid) {
        throw new ValidationError(
            'Environment variable PASSWORD should have 8 or more characters',
        );
    }

    return PASSWORD;
};
