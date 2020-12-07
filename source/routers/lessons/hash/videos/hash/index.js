import dg from 'debug';

const debug = dg('router:lessons:videos:hash');
const realHash = 'abc123';

export const getVideoByHash = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const data = 'GET /lessons/:lessonHash/videos/:videoHash';
        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeVideoByHash = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const hash = req.originalUrl.split('/').pop();
        if (hash !== realHash) {
            throw Error('incorrect video hash');
        }
        // todo: delete this video for lesson in db
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
