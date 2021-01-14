
export const checkAuth = () => (req, res, next) => {
    const code = req.header('Authorization');
    console.log('code: ', code);

    if (code === process.env.PASSWORD) {
        next();
    } else {
        res.status(401).json('Invalid authorization header');
        // res.sendStatus(401);
    }
};

