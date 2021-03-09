// Core
import st from 'supertest';

import { app } from '../../../../../server';

const agent = st.agent(app);

describe('lessons/:lessonHash/videos cases', () => {
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

    test('post /lessons/:lessonHash/videos should return 201 status', (done) => {
        agent.post('/lessons/abc123/videos')
            .then((res) => {
                expect(res.statusCode).toBe(201);
                done();
            })
            .catch((error) => done(error));
    });
});

