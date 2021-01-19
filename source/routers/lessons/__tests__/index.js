// Core
import request from 'supertest';

// Tools
import { app } from '../../../server';
const server = request.agent(app);

describe('should handle unsecure route /lessons', () => {
    test('should return status 200 for correct data', async (done) => {
        const response = await server.get('/lessons');

        expect(response.statusCode).toBe(200);
        done();
    });
    test('should return a collection array', async (done) => {
        const response = await server.get('/lessons');

        const {
            body: { data },
        } = response;
        const isDataArray = Array.isArray(data);
        expect(isDataArray).toBeTruthy();
        done();
    });
});
