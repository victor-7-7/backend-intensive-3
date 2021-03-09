import dg from 'debug';

const debug = dg('router:lessons:keynotes:hash');

export const getKeynoteByHash = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const mockData = 'GET /lessons/:lessonHash/keynotes/:keynoteHash';
        res.status(200).json({ mockData });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeKeynoteByHash = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // todo: delete this keynote for lesson in db
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
