// Core
import st from 'supertest';

import { app } from '../../../server';

const agent = st.agent(app);

describe('auth cases', () => {
    test('post /login should return 204 status & set-cookie header', (done) => {
        agent.post('/auth/login')
            .send({ foo: 'bar' })
            .then((res) => {
                expect(res.statusCode).toBe(204);
                expect(res.headers[ 'set-cookie' ]).toBeDefined();
                done();
            })
            .catch((error) => done(error));
    });

    test('post /logout should return 204 status', (done) => {
        agent.post('/auth/logout')
            .then((res) => {
                expect(res.statusCode).toBe(204);
                done();
            })
            .catch((error) => done(error));
    });
});

