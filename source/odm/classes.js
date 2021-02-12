import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
    title:       String,
    description: String,
    hash:        String,
    students:    [
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
    order:    Number,
    created:  Date,
    modified: Date,
});
const classes = mongoose.model('classes', classSchema);

export { classes };
