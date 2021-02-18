import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const childPhones = new mongoose.Schema({
    phone:   String,
    primary: Boolean,
}, { _id: false });

const childEmails = new mongoose.Schema({
    email: {
        type:   String,
        unique: true,
    },
    primary: Boolean,
}, { _id: false });

const userSchema = new mongoose.Schema({
    name: {
        first: String,
        last:  String,
    },
    phones:   [ childPhones ],
    emails:   [ childEmails ],
    password: {
        type:     String,
        select:   false,
        required: true,
    },
    sex:   String,
    roles: [
        {
            type:    String,
            default: 'newbie',
            enum:    [ 'newbie', 'student', 'teacher' ],
        },
    ],
    social: {
        facebook: String,
        linkedin: String,
        github:   String,
        skype:    String,
    },
    notes: String,
    hash:  {
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
