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
            list: {
                type:     'array',
                minItems: 1,
                enum:     [ 'standard', 'select', 'premium' ],
            },
        },
        content: {
            type:   'object',
            videos: {
                type:     'array',
                minItems: 1,
                video:    {
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
                },
            },
            keynotes: {
                type:     'array',
                minItems: 1,
                keynote:  {
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
                },
            },
        },
    },
    required:             [ 'title', 'description', 'order', 'availability' ],
    additionalProperties: false,
};
