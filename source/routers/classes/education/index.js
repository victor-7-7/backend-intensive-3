import dg from 'debug';

const debug = dg('router:classes:education');

export const enroll = (req, res) => { // post classes/:classHash/enroll
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // todo: update student record (enroll to class) in db
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const expel = (req, res) => { // post classes/:classHash/expel
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // todo: update student record (expel from class) in db
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
