import { Staff } from '../../../controllers';

export const getByHash = async (req, res) => {
    try {
        const { staffPersonHash } = req.params;

        const staffPerson = new Staff();
        const data = await staffPerson.getOneRecord(staffPersonHash);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const updateByHash = async (req, res) => {
    try {
        const { staffPersonHash } = req.params;
        const payload = req.body;

        const staffPerson = new Staff();
        const data = await staffPerson.modifyOneRecord(staffPersonHash, payload);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const deleteByHash = async (req, res) => {
    try {
        const { staffPersonHash } = req.params;

        const staffPerson = new Staff();
        await staffPerson.removeOneRecord(staffPersonHash);

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
