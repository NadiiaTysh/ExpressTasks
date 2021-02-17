import { Users as UsersModel } from '../models';

export class Users {
    constructor(data) {
        this.models = {
            users: new UsersModel(data),
        };
    }

    async create() {
        const data = await this.models.users.create();

        return data;
    }

    async getAllRecords(pageNum, perPage) {
        const data = await this.models.users.getAllRecords(pageNum, perPage);

        return data;
    }

    async getOneRecord(hash) {
        const data = await this.models.users.getOneRecord(hash);

        return data;
    }

    async modifyOneRecord(hash, payload) {
        const data = await this.models.users.modifyOneRecord(hash, payload);

        return data;
    }

    async removeOneRecord(hash) {
        const data = await this.models.users.removeOneRecord(hash);

        return data;
    }
}
