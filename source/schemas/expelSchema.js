export const expelSchema = {
    type:       'object',
    properties: {
        user: {
            type:    'string',
            pattern: '[0-9, a-f]{8}-[0-9, a-f]{4}-[0-9, a-f]{4}-[0-9, a-f]{4}-[0-9, a-f]{12}',
        },
    },
    required:             [ 'user' ],
    additionalProperties: false,
};
