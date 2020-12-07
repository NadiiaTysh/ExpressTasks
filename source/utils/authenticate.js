export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const allowedPasswords = [ 'password', 'admin' ];
    const isAllowedPass = allowedPasswords.some((el) => el === authHeader);
console.log(req.session);
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
