import dg from 'debug';

const debug = dg('router:users');

export const get = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        const mockData = 'GET /users';
        res.status(200).json(mockData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // todo: create a user based on req.body
        const mockData = 'POST /users';
        res.status(201).json(mockData); // Created
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
