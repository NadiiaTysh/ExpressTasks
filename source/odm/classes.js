import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { users, lessons } from './';

const childStudents = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:  users,
    },
    status:   String,
    expelled: Boolean,
    notes:    String,
}, { _id: false });

const childLessons = new mongoose.Schema({
    lesson: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:  lessons,
    },
    scheduled: Date,
}, { _id: false });

const classSchema = new mongoose.Schema({
    title:       String,
    description: String,
    hash:        {
        type:    String,
        unique:  true,
        default: uuidv4,
    },
    students: [ childStudents ],
    lessons:  [ childLessons ],
    duration: {
        started: Date,
        closed:  Date,
    },
    order: Number,
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' } });

classSchema.index({ title: 'text', description: 'text' });
classSchema.index({ order: 1 });

const classes = mongoose.model('classes', classSchema);
export { classes };
