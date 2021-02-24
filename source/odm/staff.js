import mongoose from 'mongoose';

import { base } from './base';
import { classes } from './';

export const staff = base.discriminator(
    'staff',
    new mongoose.Schema({
        roles: [
            {
                type: String,
                enum: [ 'admin', 'teacher', 'mentor' ],
            },
        ],
        image:   String,
        classes: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref:  classes,
            },
        ],
        started: Date,
    }),
);
