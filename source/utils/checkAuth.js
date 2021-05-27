
export const checkAuth = () => (req, res, next) => {
    // console.log('checkAuth |><| req.session:', req.session);
    if (!req.session.data) {
        return res.status(401)
            .json({ message: 'You are not authorized' }); // Unauthorized
    }

    if (req.session.data.email) {
        next();
    } else {
        res.status(401).json({ message: 'authentication credentials are not valid' });
    }
};

/*export const checkAuth = () => (req, res, next) => {
    const code = req.header('Authorization');
    console.log('Request header Authorization:', code);

    if (code === process.env.PASSWORD) {
        next();
    } else {
        next(new Error(`Invalid authorization header: ${code}`));
    }
};*/

