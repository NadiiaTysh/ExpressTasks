import { Staff } from '../../controllers';
import { Logs } from '../../controllers';

export const get = async (req, res) => {
    try {
        const staff = new Staff();
        const data = await staff.getAllRecords();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const post = async (req, res) => {
    try {
        const staffPerson = new Staff(req.body);
        const data = await staffPerson.create();
        const log = new Logs(req);
        await log.create();

        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
