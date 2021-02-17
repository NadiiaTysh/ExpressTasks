import { v4 as uuidv4 } from 'uuid';

import { lessons } from '../odm';
import { errorLogger } from '../utils';

export class Lessons {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const data = await lessons.create(this.data);

        return data;
    }

    async getAllRecords(pageNum = 1, perPage = 10) {
        const data = await lessons.find({})
            .skip((pageNum - 1) * perPage)
            .limit(perPage);

        return data;
    }

    async getOneRecord(hash) {
        const data = await lessons.findOne({ hash });

        return data;
    }

    async modifyOneRecord(hash, payload) {
        const data = await lessons.findOneAndUpdate({ hash }, payload, { new: true });

        return data;
    }

    async removeOneRecord(hash) {
        const data = await lessons.findOneAndRemove({ hash });

        return data;
    }

    async addKeynotes(hash, payload) {
        try {
            const selectedLesson = await lessons.findOne({ hash });
            if (!selectedLesson) {
                throw Error(`Lesson ${hash} not found`);
            }

            const keynotesArray = selectedLesson.content.keynotes;
            let isInArray = true;

            if (keynotesArray) {
                isInArray = keynotesArray.some((item) => {
                    return item.title === payload.title;
                });
            }

            payload.hash = uuidv4();

            if (isInArray) {
                throw Error(`Keynote ${hash} is already added to this lesson`);
            } else {
                await lessons.findOneAndUpdate({ hash },
                    { $push: { 'content.keynotes': payload } });
            }
        } catch (error) {
            //eslint-disable-next-line
            console.log(`The error '${error.message}' occured`);
            errorLogger.error(error.message);
        }
    }

    async getOneKeynote(lessonHash, keynoteHash) {
        try {
            const selectedLesson = await lessons.findOne({ hash: lessonHash });
            if (!selectedLesson) {
                throw Error(`Lesson ${lessonHash} not found`);
            }

            const keynotesArray = selectedLesson.content.keynotes;
            const data = keynotesArray.filter((item) => item.hash === keynoteHash);

            if (!data.length) {
                throw Error(`Keynote ${keynoteHash} in lesson ${lessonHash} not found`);
            } else {
                return data;
            }
        } catch (error) {
            //eslint-disable-next-line
            console.log(`The error '${error.message}' occured`);
            errorLogger.error(error.message);
        }
    }

    async deleteOneKeynote(lessonHash, keynoteHash) {
        try {
            const selectedLesson = await lessons.findOne({ hash: lessonHash });
            if (!selectedLesson) {
                throw Error(`Lesson ${lessonHash} not found`);
            }

            const keynotesArray = selectedLesson.content.keynotes;
            let isInArray = true;

            if (keynotesArray) {
                isInArray = keynotesArray.some((item) => {
                    return item.hash === keynoteHash;
                });
            }

            if (!isInArray) {
                throw Error(`Keynotes ${keynoteHash} is not added to this lesson`);
            } else {
                await lessons.findOneAndUpdate({ hash: lessonHash, 'content.keynotes.hash': keynoteHash },
                    { $pull: { 'content.keynotes': { hash: keynoteHash } } });
            }
        } catch (error) {
            //eslint-disable-next-line
            console.log(`The error '${error.message}' occured`);
            errorLogger.error(error.message);
        }
    }

    async addVideos(hash, payload) {
        try {
            const selectedLesson = await lessons.findOne({ hash });
            if (!selectedLesson) {
                throw Error(`Lesson ${hash} not found`);
            }

            const videosArray = selectedLesson.content.videos;
            let isInArray = true;

            if (videosArray) {
                isInArray = videosArray.some((item) => {
                    return item.title === payload.title;
                });
            }

            payload.hash = uuidv4();

            if (isInArray) {
                throw Error(`Video ${hash} is already added to this lesson`);
            } else {
                await lessons.findOneAndUpdate({ hash },
                    { $push: { 'content.videos': payload } });
            }
        } catch (error) {
            //eslint-disable-next-line
            console.log(`The error '${error.message}' occured`);
            errorLogger.error(error.message);
        }
    }

    async getOneVideo(lessonHash, videoHash) {
        try {
            const selectedLesson = await lessons.findOne({ hash: lessonHash });
            if (!selectedLesson) {
                throw Error(`Lesson ${lessonHash} not found`);
            }

            const videosArray = selectedLesson.content.videos;
            const data = videosArray.filter((item) => item.hash === videoHash);

            if (!data.length) {
                throw Error(`Video ${videoHash} in lesson ${lessonHash} not found`);
            } else {
                return data;
            }
        } catch (error) {
            //eslint-disable-next-line
            console.log(`The error '${error.message}' occured`);
            errorLogger.error(error.message);
        }
    }

    async deleteOneVideo(lessonHash, videoHash) {
        try {
            const selectedLesson = await lessons.findOne({ hash: lessonHash });
            if (!selectedLesson) {
                throw Error(`Lesson ${lessonHash} not found`);
            }

            const videosArray = selectedLesson.content.videos;
            let isInArray = true;

            if (videosArray) {
                isInArray = videosArray.some((item) => {
                    return item.hash === videoHash;
                });
            }

            if (!isInArray) {
                throw Error(`Video ${videoHash} is not added to this lesson`);
            } else {
                await lessons.findOneAndUpdate({ hash: lessonHash, 'content.videos.hash': videoHash },
                    { $pull: { 'content.videos': { hash: videoHash } } });
            }
        } catch (error) {
            //eslint-disable-next-line
            console.log(`The error '${error.message}' occured`);
            errorLogger.error(error.message);
        }
    }
}
