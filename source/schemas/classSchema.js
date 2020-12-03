export const classSchema = {
    type:       'object',
    properties: {
        title:       'string',
        description: 'string',
        order:       {
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
