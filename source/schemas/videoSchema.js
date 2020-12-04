export const viedoSchema = {
    definitions: {
        videoSchema: {
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
};
