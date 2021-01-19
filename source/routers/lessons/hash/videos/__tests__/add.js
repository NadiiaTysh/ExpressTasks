// Core
import request from 'supertest';

// Tools
import { app } from '../../../../../server';
const server = request.agent(app);
const videosObject = {
    title: 'Node.js introduction',
    order: 1,
    uri:   'https://lectrum.io/videos/lesson-1',
};

describe('should handle secure add route lessons/videos by hash', () => {
    beforeAll(async (done) => {
        const email = 'jdoe@email.com';
        const response = await server.post('/login').send({ email });

        const cookie = response.headers[ 'set-cookie' ][ 0 ];

        server.jar.setCookie(cookie);
        done();
    });

    test('should have POST 200 status code for corret data', async (done) => {
        const response = await server.post('/lessons/123/videos').send(videosObject);

        expect(response.statusCode).toBe(204);
        done();
    });
    test('should return nothing', async (done) => {
        const response = await server.put('/lessons/123/videos').send(videosObject);
        const responseLength = Object.keys(response.body).length;

        expect(Boolean(responseLength)).toBeFalsy();
        done();
    });
});
