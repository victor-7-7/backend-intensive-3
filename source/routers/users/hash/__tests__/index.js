// Core
import st from 'supertest';

import { app } from '../../../../server';

const agent = st.agent(app);

describe('users/:userHash cases', () => {
    beforeAll((done) => {
        // Надо залогиниться, чтобы мидлвар checkAuth пропускал дальше
        agent.post('/auth/login')
            .send({ foo: 'bar' })
            .then((res) => {
                /*console.log('beforeAll | res.headers[ "set-cookie" ]:',
                    res.headers[ 'set-cookie' ]);*/
                done();
            })
            .catch((error) => done(error));
    });

    test('get /users/:userHash should return 200 status', (done) => {
        agent.get('/users/abc123') // Параметр abc123 удовлетворяет checkHash()
            .then((res) => {
                expect(res.statusCode).toBe(200);
                done();
            })
            .catch((error) => done(error));
    });

    test('get /users/:userHash should return object', (done) => {
        agent.get('/users/abc123') // Параметр abc123 удовлетворяет checkHash()
            .then((res) => {
                expect(typeof res.body).toBe('object');
                expect(Array.isArray(res.body)).toBeFalsy();
                done();
            })
            .catch((error) => done(error));
    });

    test('put /users/:userHash should return 200 status', (done) => {
        agent.put('/users/abc123')
            .then((res) => {
                expect(res.statusCode).toBe(200);
                done();
            })
            .catch((error) => done(error));
    });

    test('delete /users/:userHash should return 204 status', (done) => {
        agent.delete('/users/abc123')
            .then((res) => {
                expect(res.statusCode).toBe(204);
                done();
            })
            .catch((error) => done(error));
    });
});

