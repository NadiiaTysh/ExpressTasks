// Core
import jwt from 'jsonwebtoken';

// Tools
import { getPassword } from '../../utils/env';

export const login = (req, res) => {
    try {
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const logout = (req, res) => {
    // throw new Error('Ooops');
    try {
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const authLogin = (req, res) => {
    try {
        req.session.user = { email: 'jdoe@example.com' };
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const apiLogin = (req, res) => {
    const privateKey = getPassword();
    jwt.sign({ email: 'jdoe@example.com' }, privateKey, function(error, token) {
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        res.header('X-Token', token);
        res.sendStatus(204);
    });
};
