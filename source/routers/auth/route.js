import dg from 'debug';

const debug = dg('router:auth');

export const login = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        req.session.data = { email: 'jdoe@example.com' };
        // todo: login user
        // console.log('post /auth/login |><| req.session:', req.session);
        res.sendStatus(204); // No Content
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    try {
        delete req.session.data;
        // todo: logout user
        res.sendStatus(204); // No Content
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
