import { getPassword } from './env/getPassword';

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const password = getPassword();
    const isAllowedPass = authHeader === password;

    if (!authHeader) {
        return res.status(401).json({
            status:  401,
            message: 'Not authorized',
        });
    } else if (!isAllowedPass) {
        return res.status(401).json({
            status:  401,
            message: 'Invalid credentials',
        });
    }
    next();
};
