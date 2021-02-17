import { Lessons } from '../../../../controllers';

export const addVideosByHash = async (req, res) => {
    try {
        const lessons = new Lessons();
        const { lessonHash } = req.params;
        await lessons.addVideos(lessonHash, req.body);

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const getVideosByHash = async (req, res) => {
    try {
        const lessons = new Lessons();
        const { lessonHash, videoHash } = req.params;
        const data = await lessons.getOneVideo(lessonHash, videoHash);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const deleteVideosByHash = async (req, res) => {
    try {
        const lessons = new Lessons();
        const { lessonHash, videoHash } = req.params;
        await lessons.deleteOneVideo(lessonHash, videoHash);

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
