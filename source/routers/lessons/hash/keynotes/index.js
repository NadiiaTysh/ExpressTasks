export const addKeynotesByHash = (req, res) => {
    try {
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const getKeynotesByHash = (req, res) => {
    try {
        res.sendStatus(200);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const deleteKeynotesByHash = (req, res) => {
    try {
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
