// Core
import st from 'supertest';

import { app } from '../../../../../../server';

const agent = st.agent(app);

describe('lessons/:lessonHash/videos/:videoHash cases', () => {
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

    test('get /lessons/:lessonHash/videos/:videoHash should return 200 status', (done) => {
        // Параметры abc123, cab312 удовлетворяют checkHash()
        agent.get('/lessons/abc123/videos/cab312')
            .then((res) => {
                expect(res.statusCode).toBe(200);
                done();
            })
            .catch((error) => done(error));
    });

    test('get /lessons/:lessonHash/videos/:videoHash should return object', (done) => {
        agent.get('/lessons/abc123/videos/cab312')
            .then((res) => {
                expect(typeof res.body).toBe('object');
                expect(Array.isArray(res.body)).toBeFalsy();
                done();
            })
            .catch((error) => done(error));
    });

    test('delete /lessons/:lessonHash/videos/:videoHash should return 204 status', (done) => {
        agent.delete('/lessons/abc123/videos/cab312')
            .then((res) => {
                expect(res.statusCode).toBe(204);
                done();
            })
            .catch((error) => done(error));
    });
});

