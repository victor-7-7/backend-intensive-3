import dg from 'debug';

const debug = dg('router:classes');

export const get = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const mockData = [ 'GET /classes' ]; // Следует вернуть массив
        res.status(200).json(mockData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // todo: create a class based on red.body
        const mockData = 'POST /classes';
        res.status(201).json({ mockData }); // Created
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
