export const authenticate = (req, res, next) => {
    if (!req.session.user || !req.session.user.email) {
        return res.status(401).json({ message: 'Credentials are not valid' });
    }
    next();
};
