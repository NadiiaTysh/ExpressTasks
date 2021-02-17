import { Classes as ClassesModel } from '../models';

export class Classes {
    constructor(data) {
        this.models = {
            classes: new ClassesModel(data),
        };
    }

    async create() {
        const data = await this.models.classes.create();

        return data;
    }

    async getAllRecords(pageNum, perPage) {
        const data = await this.models.classes.getAllRecords(pageNum, perPage);

        return data;
    }

    async getOneRecord(hash) {
        const data = await this.models.classes.getOneRecord(hash);

        return data;
    }

    async modifyOneRecord(hash, payload) {
        const data = await this.models.classes.modifyOneRecord(hash, payload);

        return data;
    }

    async removeOneRecord(hash) {
        const data = await this.models.classes.removeOneRecord(hash);

        return data;
    }

    async enrollStudent(hash, payload) {
        await this.models.classes.enrollStudent(hash, payload);
    }

    async expelStudent(hash, payload) {
        await this.models.classes.expelStudent(hash, payload);
    }
}
