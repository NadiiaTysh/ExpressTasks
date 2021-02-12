import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
    title:       String,
    description: String,
    hash:        {
        type:   String,
        unique: true,
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
    order:    Number,
    created:  Date,
    modified: Date,
});

classSchema.index({ title: 'text', description: 'text' });
classSchema.index({ order: 1 });

const classes = mongoose.model('classes', classSchema);
export { classes };
