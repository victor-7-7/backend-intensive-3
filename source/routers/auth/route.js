import dg from 'debug';

const debug = dg('router:auth');

export const login = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // todo: login user
        res.status(202).json('User is logged'); // Accepted
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // todo: logout user
        res.sendStatus(204); // No Content
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
