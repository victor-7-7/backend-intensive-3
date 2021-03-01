
export const checkAuth = () => (req, res, next) => {
    const code = req.header('Authorization');
    console.log('Request header Authorization:', code);

    if (code === process.env.PASSWORD) {
        next();
    } else {
        next(new Error(`Invalid authorization header: ${code}`));

        // throw new ValidationError('Invalid authorization header', 401);
        // res.status(401).json({'Invalid authorization header'});
    }
};

