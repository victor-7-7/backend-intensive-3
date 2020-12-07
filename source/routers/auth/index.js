// Core
import express from 'express';

// Instruments
import { login, logout } from './route.js';
import { limiter } from '../../utils/index.js';

export const router = express.Router();

router.post('/login', [ limiter(5, 60 * 1000) ], login);
router.post('/logout', [ limiter(5, 60 * 1000) ], logout);

export { router as auth };
