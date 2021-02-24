import bcrypt from 'bcryptjs';

import { students } from '../odm';
import { staff } from '../odm';

export class Auth {
    constructor(data) {
        this.data = data;
    }

    async login() {
        const header = this.data;
        const [ , auth ] = header.split(' ');
        const [ userEmail, plainPassword ] = Buffer.from(auth, 'base64').toString()
            .split(':');

        const data1 = await students
            .findOne({ 'emails.email': userEmail })
            .select('password emails roles hash')
            .lean();

        const data2 = await staff
            .findOne({ 'emails.email': userEmail })
            .select('password emails roles hash')
            .lean();

        const data = data1 || data2;

        if (!data) {
            throw new Error('No user found');
        }

        const result = await bcrypt.compare(plainPassword, data.password);

        if (!result) {
            throw new Error('Credentials not valid');
        }

        const { roles, hash, emails } = data;

        return { roles, hash, emails };
    }
}
