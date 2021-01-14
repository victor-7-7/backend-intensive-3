import dg from 'debug';

const debug = dg('router:lessons:videos:hash');

export const getVideoByHash = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const mockData = 'GET /lessons/:lessonHash/videos/:videoHash';
        res.status(200).json(mockData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeVideoByHash = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // todo: delete this video for lesson in db
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
