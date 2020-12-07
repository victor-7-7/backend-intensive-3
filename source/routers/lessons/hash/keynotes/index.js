import dg from 'debug';

const debug = dg('router:lessons:keynotes');

export const addKeynote = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // todo: add keynote for lesson in db
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
