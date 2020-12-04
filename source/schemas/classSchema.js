export const classSchema = {
    type:       'object',
    properties: {
        title: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        order: {
            type: 'number',
            min:  1,
            max:  9999,
        },
        duration: {
            started: {
                type:   'string',
                format: 'date',
            },
            closed: {
                type:   'string',
                format: 'date',
            },
        },
    },
    required:             [ 'title', 'description', 'order', 'duration', 'started', 'closed' ],
    additionalProperties: false,
};
