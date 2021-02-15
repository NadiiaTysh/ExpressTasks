import mongoose from 'mongoose';

const logSchema = new mongoose.Schema(
    {
        method:   String,
        path:     String,
        duration: {
            start: Date,
            end:   Date,
        },
        payload: {
            type: Object,
        },
        agent: String,
    },
    { timestamps: { createdAt: 'created', updatedAt: false } },
    { capped: { size: 50 * 1024 * 1024, max: 50000 } },
);

const logs = mongoose.model('logs', logSchema);
export { logs };
