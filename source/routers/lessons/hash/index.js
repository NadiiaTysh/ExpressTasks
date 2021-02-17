import { Lessons } from '../../../controllers';

export const getByHash = async (req, res) => {
    try {
        const { lessonHash } = req.params;

        const lesson = new Lessons();
        const data = await lesson.getOneRecord(lessonHash);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const updateByHash = async (req, res) => {
    try {
        const { lessonHash } = req.params;
        const payload = req.body;

        const lesson = new Lessons();
        const data = await lesson.modifyOneRecord(lessonHash, payload);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const deleteByHash = async (req, res) => {
    try {
        const { lessonHash } = req.params;

        const lesson = new Lessons();
        await lesson.removeOneRecord(lessonHash);

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
