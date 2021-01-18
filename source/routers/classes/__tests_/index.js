// Core
import request from 'supertest';

// Tools
import { app } from '../../../server';
const server = request.agent(app);

describe('should handle get request', () => {
    test('should return a collection array', async (done) => {
        const response = await server.get('/classes');

        const {
            body: { data },
        } = response;
        const isDataArray = Array.isArray(data);
        expect(isDataArray).toBeTruthy();
        done();
    });
    test('should return status 200 for correct user data', async (done) => {
        const response = await server.get('/classes');

        expect(response.statusCode).toBe(200);
        done();
    });
});
