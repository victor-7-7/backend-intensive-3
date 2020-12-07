import dg from 'debug';

const debug = dg('router:lessons:videos');

export const addVideo = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // todo: add video for lesson in db
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
