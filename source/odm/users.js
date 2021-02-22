import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { validUri, validEmail } from './helper';

const childPhones = new mongoose.Schema({
    phone:   String,
    primary: Boolean,
}, { _id: false });

const childEmails = new mongoose.Schema({
    email: {
        type:     String,
        required: true,
        match:    [ validEmail, 'Please fill a valid email address' ],
        unique:   true,
    },
    primary: Boolean,
}, { _id: false });

const userSchema = new mongoose.Schema({
    name: {
        first: {
            type:      String,
            required:  true,
            minlength: 2,
            maxlength: 15,
        },
        last: {
            type:      String,
            required:  true,
            minlength: 2,
            maxlength: 15,
        },
    },
    phones:   [ childPhones ],
    emails:   [ childEmails ],
    password: {
        type:     String,
        required: true,
        select:   false,
    },
    sex:   String,
    roles: [
        {
            type:     String,
            required: true,
            default:  'newbie',
            enum:     [ 'newbie', 'student', 'teacher' ],
        },
    ],
    social: {
        facebook: {
            type:  String,
            match: validUri,
        },
        linkedin: {
            type:  String,
            match: validUri,
        },
        github: {
            type:  String,
            match: validUri,
        },
        skype: {
            type:  String,
            match: validUri,
        },
    },
    notes: {
        type:      String,
        maxlength: 250,
    },
    hash: {
        type:    String,
        unique:  true,
        default: uuidv4,
    },
    disabled: Boolean,
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' } });

userSchema.index({ 'name.first': 1, 'name.last': 1 });
userSchema.index({ notes: 'text' });

const users = mongoose.model('users', userSchema);
export { users };
