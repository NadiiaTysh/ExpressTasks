import { classes } from '../odm';

export class Classes {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const data = await classes.create(this.data);

        return data;
    }

    async getAllRecords(pageNum = 1, perPage = 10) {
        const data = await classes.find({})
            .skip((pageNum - 1) * perPage)
            .limit(perPage);

        return data;
    }
}
