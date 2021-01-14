import dg from 'debug';

const debug = dg('router:lessons:hash');

export const getByHash = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const mockData = 'GET /lessons/:lessonHash';
        res.status(200).json(mockData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateByHash = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // todo: update lessons data in db
        const mockData = 'PUT /lessons/:lessonHash';
        res.status(200).json(mockData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeByHash = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // todo: delete this lesson in db
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
