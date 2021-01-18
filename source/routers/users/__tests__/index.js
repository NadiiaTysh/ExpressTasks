// Core
import request from 'supertest';

// Tools
import { app } from '../../../server';
const server = request.agent(app);

describe('should handle get request', () => {
    beforeAll(async (done) => {
        const email = 'jdoe@email.com';
        const response = await server.post('/login').send({ email });

        const cookie = response.headers[ 'set-cookie' ][ 0 ];

        server.jar.setCookie(cookie);
        done();
    });

    test('should return a collection array', async (done) => {
        const response = await server.get('/users');

        expect(response.statusCode).toBe(200);
        done();
    });
});
// // Core
// import request from 'supertest';
// import faker from 'faker';

// // Instruments
// import { app } from '../../../server';

// const server = request.agent(app);
// describe('users read:', () => {
//     beforeAll(async (done) => {
//         const email = Buffer.from(faker.internet.email()).toString('base64');
//         const password = Buffer.from(faker.internet.password()).toString('base64');

//         const response = await server.post('/login').send({ email, password });
//         const cookie = response.headers[ 'set-cookie' ][ 0 ];

//         server.jar.setCookie(cookie);
//         done();
//     });

//     test('should return 200 for getting all users', async (done) => {
//         const response = await server.get('/users');

//         expect(response.statusCode).toBe(200);
//         done();
//     });

//     test('should return 200 for getting all users and data should be an array', async (done) => {
//         const response = await server.get('/users');
//         const { data } = response.body;

//         expect(Array.isArray(data)).toBeTruthy();
//         done();
//     });
// });
