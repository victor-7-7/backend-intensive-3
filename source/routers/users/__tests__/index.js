// Core
import st from 'supertest';

import { app } from '../../../server';

const agent = st.agent(app);

describe('users cases', () => {
    beforeAll((done) => {
        // Надо залогиниться, чтобы мидлвар checkAuth пропускал дальше
        agent.post('/auth/login')
            .send({ foo: 'bar' })
            .then((res) => {
                console.log('beforeAll | res.headers[ "set-cookie" ]:',
                    res.headers[ 'set-cookie' ]);
                done();
            })
            .catch((error) => done(error));
    });

    test('post /users should return 201 status', (done) => {
        st(app).post('/users')
            .send({ name: 'jdoe', email: 'jdoe@example.com' }) // Для валидатора
            .then((res) => {
                expect(res.statusCode).toBe(201);
                done();
            })
            .catch((error) => done(error));
    });

    test('get /users should return 200 status', (done) => {
        agent.get('/users')
            .then((res) => {
                expect(res.statusCode).toBe(200);
                done();
            })
            .catch((error) => done(error));
    });

    test('get /users should return array', (done) => {
        agent.get('/users')
            .then((res) => {
                expect(Array.isArray(res.body)).toBeTruthy();
                done();
            })
            .catch((error) => done(error));
    });
});

