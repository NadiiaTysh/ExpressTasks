export const enrollSchema = {
    type:       'object',
    properties: {
        user: {
            type:    'string',
            pattern: '[0-9, a-f]{8}-[0-9, a-f]{4}-[0-9, a-f]{4}-[0-9, a-f]{4}-[0-9, a-f]{12}',
        },
        status: {
            type: 'string',
            enum: [ 'standard', 'select', 'premium' ],
        },
        notes: {
            type: 'string',
        },
    },
    required:             [ 'user', 'status' ],
    additionalProperties: false,
};
