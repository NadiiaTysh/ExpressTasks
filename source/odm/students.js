import mongoose from 'mongoose';

import { base } from './base';

export const students = base.discriminator(
    'students',
    new mongoose.Schema({
        social: {
            facebook: String,
            linkedIn: String,
            skype:    String,
            telegram: String,
        },
        roles: [
            {
                type: String,
                enum: [ 'newbie', 'student' ],
            },
        ],
        notes: String,
    }),
);
