export const userSchema = {
    type:       'object',
    properties: {
        name: {
            first: {
                type:      'string',
                minLength: 3,
            },
            last: {
                type:      'string',
                minLength: 3,
            },
        },
        phones: {
            type:  'array',
            phone: {
                type: 'string',
            },
            primary: {
                type: 'boolean',
            },
        },
        emails: {
            type:  'array',
            email: {
                type:   'string',
                format: 'email',
            },
            primary: {
                type: 'boolean',
            },
        },
        password: {
            type: 'string',
        },
        notes: {
            type: 'string',
        },
        sex: {
            type: 'string',
            enum: [ 'f', 'm' ],
        },
        roles: {
            type: 'array',
            role: {
                type: 'string',
                enum: [ 'newbie', 'student', 'teacher' ],
            },
        },
    },
    required:             [ 'name', 'emails', 'phones', 'password', 'sex' ],
    additionalProperties: true,
};
