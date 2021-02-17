import { Lessons as LessonsModel } from '../models';

export class Lessons {
    constructor(data) {
        this.models = {
            lessons: new LessonsModel(data),
        };
    }

    async create() {
        const data = await this.models.lessons.create();

        return data;
    }

    async getAllRecords(pageNum, perPage) {
        const data = await this.models.lessons.getAllRecords(pageNum, perPage);

        return data;
    }

    async getOneRecord(hash) {
        const data = await this.models.lessons.getOneRecord(hash);

        return data;
    }

    async modifyOneRecord(hash, payload) {
        const data = await this.models.lessons.modifyOneRecord(hash, payload);

        return data;
    }

    async removeOneRecord(hash) {
        const data = await this.models.lessons.removeOneRecord(hash);

        return data;
    }

    async addKeynotes(hash, payload) {
        const data = await this.models.lessons.addKeynotes(hash, payload);

        return data;
    }

    async getOneKeynote(lessonHash, keynoteHash) {
        const data = await this.models.lessons.getOneKeynote(lessonHash, keynoteHash);

        return data;
    }

    async deleteOneKeynote(lessonHash, keynoteHash) {
        const data = await this.models.lessons.deleteOneKeynote(lessonHash, keynoteHash);

        return data;
    }

    async addVideos(hash, payload) {
        const data = await this.models.lessons.addVideos(hash, payload);

        return data;
    }

    async getOneVideo(lessonHash, videoHash) {
        const data = await this.models.lessons.getOneVideo(lessonHash, videoHash);

        return data;
    }

    async deleteOneVideo(lessonHash, videoHash) {
        const data = await this.models.lessons.deleteOneVideo(lessonHash, videoHash);

        return data;
    }
}
