import { lessons } from '../odm';

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
}
