import dg from 'debug';

const debug = dg('router:lessons:videos');

export const addVideo = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // todo: add video for lesson in db
        const mockData = 'POST lessons/:lessonHash/videos';
        res.status(201).json({ mockData }); // Created
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
