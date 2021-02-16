import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const classSchema = new mongoose.Schema({
    title:       String,
    description: String,
    hash:        {
        type:    String,
        unique:  true,
        default: uuidv4,
    },
    students: [
        {
            user:     mongoose.SchemaTypes.ObjectId,
            status:   String,
            expelled: Boolean,
            notes:    String,
        },
    ],
    lessons: [
        {
            lesson:    mongoose.SchemaTypes.ObjectId,
            scheduled: Date,
        },
    ],
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
