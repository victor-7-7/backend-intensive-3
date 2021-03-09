import dg from 'debug';

const debug = dg('router:classes:hash');

// classHash валиден, так как запрос проброшен сюда после checkHash()

export const getByHash = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    const mockData = 'GET /classes/:classHash';
    res.status(200).json({ mockData });
};

export const updateByHash = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // todo: update classes data in db
        const mockData = 'PUT /classes/:classHash';
        res.status(200).json({ mockData });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeByHash = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // todo: delete this class in db
        res.sendStatus(204); // No Content
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
