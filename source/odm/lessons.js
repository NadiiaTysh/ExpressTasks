import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { validUri } from './helper';

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
    order: {
        type:     Number,
        required: true,
        min:      0,
    },
    hash: {
        type:    String,
        unique:  true,
        default: uuidv4,
    },
    availability: [ String ],
    content:      {
        type:     Object,
        videos:   [ childVideos ],
        keynotes: [ childKeynotes ],
        validate: {
            validator(value) {
                const verification = (item) => {
                    if (!item.title || item.title.length > 30) {
                        return false;
                    }

                    if (!item.order || item.order < 0) {
                        return false;
                    }

                    if (!item.uri || !validUri.test(item.uri)) {
                        return false;
                    }

                    return true;
                };
                const videoArray = value.videos;
                const keynoteArray = value.keynotes;

                const resultVideo = videoArray.every(verification);
                const resultKeynote = keynoteArray.every(verification);

                return resultVideo && resultKeynote;
            },
            message(props) {
                const { path } = props;

                return `One of values in '${path}' field is not valid`;
            },
        },
    },
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' } });

lessonSchema.index({ order: 1 });

const lessons = mongoose.model('lessons', lessonSchema);
export { lessons };
