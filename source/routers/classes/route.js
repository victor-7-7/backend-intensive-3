import dg from 'debug';

const debug = dg('router:classes');

export const get = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const data = [ 'GET /classes' ];
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // todo: create a class based on red.body
        const data = 'POST /classes';
        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
