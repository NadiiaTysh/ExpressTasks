import { Lessons } from '../../controllers';
import { Logs } from '../../controllers';

export const get = async (req, res) => {
    try {
        const lessons = new Lessons();
        const data = await lessons.getAllRecords();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const post = async (req, res) => {
    try {
        const lesson = new Lessons(req.body);
        const data = await lesson.create();
        const log = new Logs(req);
        await log.create();

        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
