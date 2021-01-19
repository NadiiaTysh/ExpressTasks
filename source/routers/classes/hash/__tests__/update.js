// Core
import request from 'supertest';

// Tools
import { app } from '../../../../server';
const server = request.agent(app);
const classObject = {
    title:       'Backend',
    description: 'Backend Online Course',
    order:       2,
    duration:    {
        started: '2019-06-19T07:44:06.353Z',
        closed:  '2019-06-19T07:44:06.353Z',
    },
};

describe('should handle secure update route classes by hash', () => {
    beforeAll(async (done) => {
        const email = 'jdoe@email.com';
        const response = await server.post('/login').send({ email });

        const cookie = response.headers[ 'set-cookie' ][ 0 ];

        server.jar.setCookie(cookie);
        done();
    });

    test('should have PUT 200 status code for corret data', async (done) => {
        const response = await server.put('/classes/123').send(classObject);

        expect(response.statusCode).toBe(200);
        done();
    });
    test('should return an updated document object', async (done) => {
        const response = await server.put('/classes/123').send(classObject);

        const {
            body: { data },
        } = response;
        expect(typeof data).toBe('object');
        done();
    });
});
