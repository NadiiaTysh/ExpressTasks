import bcrypt from 'bcryptjs';

import { staff } from '../odm';

export class Staff {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const staffPerson = await this._transformCreateStaffPerson(this.data);
        const data = await staff.create(staffPerson);

        return { hash: data.hash };
    }

    async getAllRecords(pageNum = 1, perPage = 10) {
        const data = await staff.find({})
            .skip((pageNum - 1) * perPage)
            .limit(perPage)
            .populate({ path: 'classes', select: '-_id -__v'});

        return data;
    }

    async getOneRecord(hash) {
        const data = await staff.findOne({ hash })
            .populate({ path: 'classes', select: '-_id -__v'});

        return data;
    }

    async modifyOneRecord(hash, payload) {
        const data = await staff.findOneAndUpdate({ hash }, payload, { new: true });

        return data;
    }

    async removeOneRecord(hash) {
        const data = await staff.findOneAndRemove({ hash });

        return data;
    }

    async _transformCreateStaffPerson(data) {
        const { name, emails, phones, password, sex, roles, image, classes, started } = data;
        const hashedPassword = await bcrypt.hash(password, 11);
        const [ first, last ] = name.split(' ');
        const staffPerson = {
            name: {
                first,
                last,
            },
            sex,
            emails,
            roles,
            phones,
            password: hashedPassword,
            image,
            classes,
            started,
        };

        return staffPerson;
    }
}
