import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const childVideos = new mongoose.Schema({
    hash: {
        type:    String,
        unique:  true,
        default: uuidv4,
    },
    title: String,
    order: Number,
    uri:   String,
}, { _id: false });

const childKeynotes = new mongoose.Schema({
    hash: {
        type:    String,
        unique:  true,
        default: uuidv4,
    },
    title: String,
    order: Number,
    uri:   String,
}, { _id: false });

const lessonSchema = new mongoose.Schema({
    title:       String,
    description: String,
    order:       Number,
    hash:        {
        type:    String,
        unique:  true,
        default: uuidv4,
    },
    availability: [ String ],
    content:      {
        type:     Object,
        videos:   [ childVideos ],
        keynotes: [ childKeynotes ],
    },
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' } });

lessonSchema.index({ order: 1 });

const lessons = mongoose.model('lessons', lessonSchema);
export { lessons };
