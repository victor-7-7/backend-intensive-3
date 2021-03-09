// Core
import st from 'supertest';

import { app } from '../../../server';

const agent = st.agent(app);

describe('classes cases', () => {
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

    test('post /classes should return 201 status', (done) => {
        agent.post('/classes')
            .send({ foo: 'bar' })
            .then((res) => {
                expect(res.statusCode).toBe(201);
                done();
            })
            .catch((error) => done(error));
    });

    test('get /classes should return 200 status', (done) => {
        agent.get('/classes')
            .then((res) => {
                expect(res.statusCode).toBe(200);
                done();
            })
            .catch((error) => done(error));
    });

    test('get /classes should return array', (done) => {
        agent.get('/classes')
            .then((res) => {
                expect(Array.isArray(res.body)).toBeTruthy();
                done();
            })
            .catch((error) => done(error));
    });
});

