// Core
import request from 'supertest';

// Tools
import { app } from '../../../../server';
const server = request.agent(app);

describe('should handle secure get route classes by hash', () => {
    beforeAll(async (done) => {
        const email = 'jdoe@email.com';
        const response = await server.post('/login').send({ email });

        const cookie = response.headers[ 'set-cookie' ][ 0 ];

        server.jar.setCookie(cookie);
        done();
    });

    test('should have GET 200 status code for corret data', async (done) => {
        const response = await server.get('/classes/123');

        expect(response.statusCode).toBe(200);
        done();
    });
    test('should return a document object', async (done) => {
        const response = await server.get('/classes/123');

        const {
            body: { data },
        } = response;
        expect(typeof data).toBe('object');
        done();
    });
});
