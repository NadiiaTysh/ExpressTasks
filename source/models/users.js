import { users } from '../odm';

export class Users {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const data = await users.create(this.data);

        return data;
    }

    async getAllRecords(pageNum = 1, perPage = 10) {
        const data = await users.find({})
            .skip((pageNum - 1) * perPage)
            .limit(perPage);

        return data;
    }

    async getOneRecord(hash) {
        const data = await users.findOne({ hash });

        return data;
    }

    async modifyOneRecord(hash, payload) {
        const data = await users.findOneAndUpdate({ hash }, payload, { new: true });

        return data;
    }

    async removeOneRecord(hash) {
        const data = await users.findOneAndRemove({ hash });

        return data;
    }
}
