import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
    title:        String,
    description:  String,
    order:        Number,
    hash:         String,
    availability: [ String ],
    content:      {
        videos: [
            {
                hash:  String,
                title: String,
                order: Number,
                uri:   String,
            },
        ],
        keynotes: [
            {
                hash:  String,
                title: String,
                order: Number,
                uri:   String,
            },
        ],
    },
    created:  Date,
    modified: Date,
});
const lessons = mongoose.model('lessons', lessonSchema);

export { lessons };
