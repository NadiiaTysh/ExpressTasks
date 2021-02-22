import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { users, lessons } from './';

function dateValidator(value) {
    return this.duration.started < value;
}

const childStudents = new mongoose.Schema({
    user: {
        type:     mongoose.SchemaTypes.ObjectId,
        required: true,
        ref:      users,
    },
    status:   String,
    expelled: Boolean,
    notes:    {
        type:      String,
        required:  true,
        maxlength: 250,
    },
}, { _id: false });

const childLessons = new mongoose.Schema({
    lesson: {
        type:     mongoose.SchemaTypes.ObjectId,
        required: true,
        ref:      lessons,
    },
    scheduled: Date,
}, { _id: false });

const classSchema = new mongoose.Schema({
    title: {
        type:      String,
        required:  true,
        maxlength: 30,
    },
    description: {
        type:      String,
        required:  true,
        maxlength: 250,
    },
    hash: {
        type:    String,
        unique:  true,
        default: uuidv4,
    },
    students: [ childStudents ],
    lessons:  [ childLessons ],
    duration: {
        started: {
            type: Date,
        },
        closed: {
            type:     Date,
            validate: [ dateValidator, 'Closed day cannot be earlier than Started day' ],
        },
    },
    order: {
        type:     Number,
        required: true,
        min:      0,
    },
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' } });

classSchema.index({ title: 'text', description: 'text' });
classSchema.index({ order: 1 });

const classes = mongoose.model('classes', classSchema);
export { classes };
