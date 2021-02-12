import { Lessons } from '../../controllers';

export const get = (req, res) => {
    try {
        res.status(200).json({ data: [] });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const post = async (req, res) => {
    try {
        const lesson = new Lessons(req.body);
        const data = await lesson.create();

        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
