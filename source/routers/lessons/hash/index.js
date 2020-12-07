import dg from 'debug';

const debug = dg('router:lessons:hash');
const realHash = 'abc123';

export const getByHash = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const data = 'GET /lessons/:lessonHash';
        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateByHash = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const hash = req.originalUrl.split('/').pop();
        if (hash !== realHash) {
            throw Error('incorrect lesson hash');
        }
        // todo: update lessons data in db
        const data = 'PUT /lessons/:lessonHash';
        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeByHash = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const hash = req.originalUrl.split('/').pop();
        if (hash !== realHash) {
            throw Error('incorrect lesson hash');
        }
        // todo: delete this lesson in db
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
