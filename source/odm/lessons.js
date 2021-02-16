import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

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
        videos: [
            {
                hash: {
                    type:    String,
                    unique:  true,
                    default: uuidv4,
                },
                title: String,
                order: Number,
                uri:   String,
            },
        ],
        keynotes: [
            {
                hash: {
                    type:    String,
                    unique:  true,
                    default: uuidv4,
                },
                title: String,
                order: Number,
                uri:   String,
            },
        ],
    },
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' } });

lessonSchema.index({ order: 1 });

const lessons = mongoose.model('lessons', lessonSchema);
export { lessons };
