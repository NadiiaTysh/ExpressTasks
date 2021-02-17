import { Users } from '../../../controllers';

export const getByHash = async (req, res) => {
    try {
        const { userHash } = req.params;

        const user = new Users();
        const data = await user.getOneRecord(userHash);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const updateByHash = async (req, res) => {
    try {
        const { userHash } = req.params;
        const payload = req.body;

        const user = new Users();
        const data = await user.modifyOneRecord(userHash, payload);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const deleteByHash = async (req, res) => {
    try {
        const { userHash } = req.params;

        const user = new Users();
        await user.removeOneRecord(userHash);

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
