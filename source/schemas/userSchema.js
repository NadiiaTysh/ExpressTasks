export const userSchema = {
    type:       'object',
    properties: {
        name: {
            type:      'string',
            minLength: 3,
        },
        email: {
            type:   'string',
            format: 'email',
        },
        phone: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
        sex: {
            type: 'string',
            enum: [ 'f', 'm' ],
        },
        role: {
            type: 'string',
            enum: [ 'newbie', 'student', 'teacher' ],
        },
    },
    required:             [ 'name', 'email', 'phone', 'password', 'sex' ],
    additionalProperties: false,
};
