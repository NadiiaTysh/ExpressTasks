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
}
