// Core
import request from 'supertest';

// Tools
import { app } from '../../../server';
const server = request.agent(app);
const email = 'jdoe@email.com';

describe('should login user', () => {
    test('should have POST 204 status code for successful login', async (done) => {
        const response = await server.post('/login').send({ email });

        expect(response.statusCode).toBe(204);
        done();
    });
    test('should return nothing', async (done) => {
        const response = await server.post('/login').send({ email });
        const responseLength = Object.keys(response.body).length;

        expect(Boolean(responseLength)).toBeFalsy();
        done();
    });
});
