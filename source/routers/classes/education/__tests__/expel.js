// Core
import request from 'supertest';

// Tools
import { app } from '../../../../server';
const server = request.agent(app);
const expelStudent = {
    user: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
};

describe('should expel class', () => {
    beforeAll(async (done) => {
        const email = 'jdoe@email.com';
        const response = await server.post('/login').send({ email });

        const cookie = response.headers[ 'set-cookie' ][ 0 ];

        server.jar.setCookie(cookie);
        done();
    });

    test('should have POST 204 status code for successful expel', async (done) => {
        const response = await server.post('/classes/123/expel').send(expelStudent);

        expect(response.statusCode).toBe(204);
        done();
    });
    test('should return nothing', async (done) => {
        const response = await server.post('/classes/123/expel').send(expelStudent);
        const responseLength = Object.keys(response.body).length;

        expect(Boolean(responseLength)).toBeFalsy();
        done();
    });
});
