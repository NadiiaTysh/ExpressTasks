import { Students } from '../../../controllers';

export const getByHash = async (req, res) => {
    try {
        const { studentHash } = req.params;

        const student = new Students();
        const data = await student.getOneRecord(studentHash);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const updateByHash = async (req, res) => {
    try {
        const { studentHash } = req.params;
        const payload = req.body;

        const student = new Students();
        const data = await student.modifyOneRecord(studentHash, payload);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const deleteByHash = async (req, res) => {
    try {
        const { studentHash } = req.params;

        const student = new Students();
        await student.removeOneRecord(studentHash);

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
