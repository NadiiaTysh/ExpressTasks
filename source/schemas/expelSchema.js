export const expelSchema = {
    type:       'object',
    properties: {
        user: {
            type: 'string',
        },
    },
    required:             [ 'user' ],
    additionalProperties: false,
};
