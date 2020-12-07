import dg from 'debug';

const debug = dg('router:auth');

export const login = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    debug('request headers ==>\n', req.headers);
    try {
        // todo: check email:password from req header - authorization
        // todo: and login user
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        // todo: check user from req header - ??
        // todo: and logout user if it was login
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
