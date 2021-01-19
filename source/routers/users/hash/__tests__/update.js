// Core
import request from 'supertest';

// Tools
import { app } from '../../../../server';
const server = request.agent(app);
const user = {
    name:     'John Doe',
    email:    'jdoe@example.com',
    phone:    '+380662332377',
    password: 'ab12345Cd',
    sex:      'm',
    role:     'newbie',
};

describe('should handle secure update route users by hash', () => {
    beforeAll(async (done) => {
        const email = 'jdoe@email.com';
        const response = await server.post('/login').send({ email });

        const cookie = response.headers[ 'set-cookie' ][ 0 ];

        server.jar.setCookie(cookie);
        done();
    });

    test('should have PUT 200 status code for corret data', async (done) => {
        const response = await server.put('/users/123').send(user);

        expect(response.statusCode).toBe(200);
        done();
    });
    test('should return an updated document object', async (done) => {
        const response = await server.put('/users/123').send(user);

        const {
            body: { data },
        } = response;
        expect(typeof data).toBe('object');
        done();
    });
});
