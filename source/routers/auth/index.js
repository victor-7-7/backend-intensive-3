// Core
import express from 'express';

// Instruments
import { login, logout } from './route.js';
import { limiter, checkAuth } from '../../utils/index.js';

export const authRouter = express.Router();

// public endpoint
authRouter.post('/login', [ limiter(5, 60 * 1000) ], login);

authRouter.post('/logout', checkAuth(), [ limiter(5, 60 * 1000) ], logout);

export { authRouter as auth };
