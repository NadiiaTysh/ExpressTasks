import { Classes } from '../../controllers';
import { Logs } from '../../controllers';

export const get = async (req, res) => {
    try {
        const classes = new Classes();
        const data = await classes.getAllRecords();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const post = async (req, res) => {
    try {
        const classItem = new Classes(req.body);
        const data = await classItem.create();
        const log = new Logs(req);
        await log.create();

        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
