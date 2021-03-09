// Core
import st from 'supertest';

import { app } from '../../../../server';

const agent = st.agent(app);

describe('classes/:classHash/** cases', () => {
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

    test('post /classes/:classHash/enroll should return 204 status', (done) => {
        agent.post('/classes/abc123/enroll') // Параметр abc123 удовлетворяет checkHash()
            .then((res) => {
                expect(res.statusCode).toBe(204);
                done();
            })
            .catch((error) => done(error));
    });

    test('post /classes/:classHash/expel should return 204 status', (done) => {
        agent.post('/classes/abc123/expel') // Параметр abc123 удовлетворяет checkHash()
            .then((res) => {
                expect(res.statusCode).toBe(204);
                done();
            })
            .catch((error) => done(error));
    });
});

