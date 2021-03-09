import dg from 'debug';

const debug = dg('router:lessons');

export const get = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const mockData = [ 'GET /lessons' ]; // Следует вернуть массив
        res.status(200).json(mockData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // todo: create a lesson based on red.body
        const mockData = 'POST /lessons';
        res.status(201).json({ mockData });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
