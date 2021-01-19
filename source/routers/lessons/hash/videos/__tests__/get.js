// Core
import request from 'supertest';

// Tools
import { app } from '../../../../../server';
const server = request.agent(app);

describe('should handle secure get route lessons/keynotes by hash', () => {
    beforeAll(async (done) => {
        const email = 'jdoe@email.com';
        const response = await server.post('/login').send({ email });

        const cookie = response.headers[ 'set-cookie' ][ 0 ];

        server.jar.setCookie(cookie);
        done();
    });

    test('should have GET 200 status code for corret data', async (done) => {
        const response = await server.get('/lessons/123/keynotes/123');

        expect(response.statusCode).toBe(200);
        done();
    });
    test('should return nothing', async (done) => {
        const response = await server.get('/lessons/123/keynotes/123');
        const responseLength = Object.keys(response.body).length;

        expect(Boolean(responseLength)).toBeFalsy();
        done();
    });
});
