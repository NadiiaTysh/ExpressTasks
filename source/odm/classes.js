import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { students, lessons } from './';

function dateValidator(value) {
    return this.duration.started < value;
}

const childStudents = new mongoose.Schema({
    user: {
        type:     mongoose.SchemaTypes.ObjectId,
        required: true,
        ref:      students,
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

classSchema.path('students').validate(async function(value) {
    const addedUsersInClass = [];
    value.every((userObject) => addedUsersInClass.push(userObject.user));

    const data = await students.find({});
    const existingUsers = [];
    data.every((userInDb) => existingUsers.push(userInDb._id));

    const result = addedUsersInClass.every((personAddedInClass) => {
        const isSome = existingUsers.some((personExisted) => {
            return personAddedInClass.toString() === personExisted.toString();
        });
        if (!isSome) {
            throw new Error(`${personAddedInClass} is not found in 'students'`);
        }

        return isSome;
    });

    return result;
});

classSchema.path('lessons').validate(async function(value) {
    const addedLessonsInClass = [];
    value.every((lessonObject) => addedLessonsInClass.push(lessonObject.lesson));

    const data = await lessons.find({});
    const existingLessons = [];
    data.every((lessonInDb) => existingLessons.push(lessonInDb._id));

    const result = addedLessonsInClass.every((lessonAddedInClass) => {
        const isSome = existingLessons.some((lessonExisted) => {
            return lessonAddedInClass.toString() === lessonExisted.toString();
        });
        if (!isSome) {
            throw new Error(`${lessonAddedInClass} is not found in 'lessons'`);
        }

        return isSome;
    });

    return result;
});

export { classes };
