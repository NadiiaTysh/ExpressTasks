import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        first: String,
        last:  String,
    },
    phones: [
        {
            phone:   String,
            primary: Boolean,
        },
    ],
    emails: [
        {
            email: {
                type:   String,
                unique: true,
            },
            primary: Boolean,
        },
    ],
    password: String,
    sex:      String,
    roles:    [ String ],
    social:   {
        facebook: String,
        linkedin: String,
        github:   String,
        skype:    String,
    },
    notes: String,
    hash:  {
        type:   String,
        unique: true,
    },
    disabled: Boolean,
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' } });

userSchema.index({ 'name.first': 1, 'name.last': 1 });
userSchema.index({ notes: 'text' });

const users = mongoose.model('users', userSchema);
export { users };
