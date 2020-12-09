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
