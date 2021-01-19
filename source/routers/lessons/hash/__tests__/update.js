// Core
import request from 'supertest';

// Tools
import { app } from '../../../../server';
const server = request.agent(app);
const lessonObject = {
    title:        'Backend',
    description:  'Backend Online Course',
    order:        2,
    availability: [[ 'select', 'premium' ]],
    content:      {
        videos: [
            {
                title: 'Node.js architecture',
                order: 1,
                uri:   'https://lectrum.io/videos/lesson-1',
            },
        ],
        keynotes: [
            {
                title: 'Node.js architecture',
                order: 1,
                uri:   'https://lectrum.io/keynotes/lesson-1',
            },
        ],
    },
};

describe('should handle secure update route lessons by hash', () => {
    beforeAll(async (done) => {
        const email = 'jdoe@email.com';
        const response = await server.post('/login').send({ email });

        const cookie = response.headers[ 'set-cookie' ][ 0 ];

        server.jar.setCookie(cookie);
        done();
    });

    test('should have PUT 200 status code for corret data', async (done) => {
        const response = await server.put('/lessons/123').send(lessonObject);

        expect(response.statusCode).toBe(200);
        done();
    });
    test('should return an updated document object', async (done) => {
        const response = await server.put('/lessons/123').send(lessonObject);

        const {
            body: { data },
        } = response;
        expect(typeof data).toBe('object');
        done();
    });
});
