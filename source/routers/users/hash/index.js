import dg from 'debug';
const debug = dg('router:users:hash');

export const getByHash = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    const mockData = 'GET /users/:userHash';
    res.status(200).json(mockData);
};

export const updateByHash = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // todo: update user's data in db
        const mockData = 'PUT /users/:userHash';
        res.status(200).json(mockData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeByHash = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // todo: delete this user in db
        res.sendStatus(204); // No Content
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
