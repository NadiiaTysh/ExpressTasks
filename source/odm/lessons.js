import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
    title:       String,
    description: String,
    order:       Number,
    hash:        {
        type:   String,
        unique: true,
    },
    availability: [ String ],
    content:      {
        videos: [
            {
                hash: {
                    type:   String,
                    unique: true,
                },
                title: String,
                order: Number,
                uri:   String,
            },
        ],
        keynotes: [
            {
                hash: {
                    type:   String,
                    unique: true,
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
