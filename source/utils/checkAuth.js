import { ValidationError } from './index.js';

export const checkAuth = () => (req, res, next) => {
    const code = req.header('Authorization');
    console.log('code: ', code);

    if (code === process.env.PASSWORD) {
        next();
    } else {
        next(new ValidationError('Invalid authorization header', 401));
        // throw new ValidationError('Invalid authorization header', 401);
        // res.status(401).json('Invalid authorization header');
    }
};

