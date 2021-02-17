import { Classes } from '../../../controllers';

export const getByHash = async (req, res) => {
    try {
        const { classHash } = req.params;

        const classItem = new Classes();
        const data = await classItem.getOneRecord(classHash);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const updateByHash = async (req, res) => {
    try {
        const { classHash } = req.params;
        const payload = req.body;

        const classItem = new Classes();
        const data = await classItem.modifyOneRecord(classHash, payload);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const deleteByHash = async (req, res) => {
    try {
        const { classHash } = req.params;

        const classItem = new Classes();
        await classItem.removeOneRecord(classHash);

        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
