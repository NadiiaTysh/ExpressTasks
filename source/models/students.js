import bcrypt from 'bcryptjs';

import { students } from '../odm';

export class Students {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const student = await this._transformCreateStudent(this.data);
        const data = await students.create(student);

        return { hash: data.hash };
    }

    async getAllRecords(pageNum = 1, perPage = 10) {
        const data = await students.find({})
            .skip((pageNum - 1) * perPage)
            .limit(perPage);

        return data;
    }

    async getOneRecord(hash) {
        const data = await students.findOne({ hash });

        return data;
    }

    async modifyOneRecord(hash, payload) {
        const data = await students.findOneAndUpdate({ hash }, payload, { new: true });

        return data;
    }

    async removeOneRecord(hash) {
        const data = await students.findOneAndRemove({ hash });

        return data;
    }

    async _transformCreateStudent(data) {
        const { name, emails, phones, password, sex, roles, social, notes, disabled } = data;
        const hashedPassword = await bcrypt.hash(password, 11);
        const [ first, last ] = name.split(' ');
        const student = {
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

        return student;
    }
}
