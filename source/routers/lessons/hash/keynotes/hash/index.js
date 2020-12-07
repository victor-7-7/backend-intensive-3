import dg from 'debug';

const debug = dg('router:lessons:keynotes:hash');
const realHash = 'abc123';

export const getKeynoteByHash = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const data = 'GET /lessons/:lessonHash/keynotes/:keynoteHash';
        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeKeynoteByHash = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const hash = req.originalUrl.split('/').pop();
        if (hash !== realHash) {
            throw Error('incorrect keynote hash');
        }
        // todo: delete this keynote for lesson in db
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
