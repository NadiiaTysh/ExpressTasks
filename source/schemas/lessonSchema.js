export const lessonSchema = {
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
        availability: {
            type: 'array',
            enum: [ 'standard', 'select', 'premium' ],
        },
        content: {
            type:   'object',
            videos: {
                type: 'array',
                $ref: 'viedoSchema.js#/videoSchema',
            },
            keynotes: {
                type: 'array',
                $ref: 'viedoSchema.js#/videoSchema',
            },
        },
    },
};
