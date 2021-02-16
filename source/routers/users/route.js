import { Users } from '../../controllers';
import { Logs } from '../../controllers';

export const get = async (req, res) => {
    try {
        const user = new Users();
        const data = await user.getAllRecords();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const post = async (req, res) => {
    try {
        const user = new Users(req.body);
        const data = await user.create();
        const log = new Logs(req);
        await log.create();

        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
