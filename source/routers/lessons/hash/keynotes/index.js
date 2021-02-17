import { Lessons } from '../../../../controllers';

export const addKeynotesByHash = async (req, res) => {
    try {
        const lessons = new Lessons();
        const { lessonHash } = req.params;
        await lessons.addKeynotes(lessonHash, req.body);

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const getKeynotesByHash = async (req, res) => {
    try {
        const lessons = new Lessons();
        const { lessonHash, keynoteHash } = req.params;
        const data = await lessons.getOneKeynote(lessonHash, keynoteHash);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const deleteKeynotesByHash = async (req, res) => {
    try {
        const lessons = new Lessons();
        const { lessonHash, keynoteHash } = req.params;
        await lessons.deleteOneKeynote(lessonHash, keynoteHash);

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
