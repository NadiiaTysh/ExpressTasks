import bcrypt from 'bcryptjs';

import { users } from '../odm';

export class Users {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const user = await this._transformCreateUser(this.data);
        const data = await users.create(user);

        return { hash: data.hash };
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

    async _transformCreateUser(data) {
        const { name, emails, phones, password, sex, roles, social, notes, disabled } = data;
        const hashedPassword = await bcrypt.hash(password, 11);
        const [ first, last ] = name.split(' ');
        const user = {
            name: {
                first,
                last,
            },
            sex,
            emails,
            roles,
            phones,
            password: hashedPassword,
            social,
            notes,
            disabled,
        };

        return user;
    }
}
