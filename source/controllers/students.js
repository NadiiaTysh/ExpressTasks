import { Students as StudentsModel } from '../models';

export class Students {
    constructor(data) {
        this.models = {
            students: new StudentsModel(data),
        };
    }

    async create() {
        const data = await this.models.students.create();

        return data;
    }

    async getAllRecords(pageNum, perPage) {
        const data = await this.models.students.getAllRecords(pageNum, perPage);

        return data;
    }

    async getOneRecord(hash) {
        const data = await this.models.students.getOneRecord(hash);

        return data;
    }

    async modifyOneRecord(hash, payload) {
        const data = await this.models.students.modifyOneRecord(hash, payload);

        return data;
    }

    async removeOneRecord(hash) {
        const data = await this.models.students.removeOneRecord(hash);

        return data;
    }
}
