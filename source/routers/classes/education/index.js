import dg from 'debug';

const debug = dg('router:classes:education');

export const enroll = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // todo: update student record (enroll to class) in db
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const expel = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // todo: update student record (expel from class) in db
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
