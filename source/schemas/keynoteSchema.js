export const keynoteSchema = {
    type:       'object',
    properties: {
        title: {
            type: 'string',
        },
        order: {
            type: 'number',
            min:  1,
            max:  999,
        },
        uri: {
            type: 'string',
        },
    },
    required:             [ 'title', 'order', 'uri' ],
    additionalProperties: false,
};
