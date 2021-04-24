// Core
import express from 'express';

// Instruments
import { get, post } from './route.js';
import { getByHash, updateByHash, removeByHash } from './hash/index.js';
import { limiter, validator, checkAuth, checkHash } from '../../utils/index.js';

// Schema
import { userScheme } from '../../schemas/index.js';

export const usersRouter = express.Router();

usersRouter.get('/', [ limiter(5, 60 * 1000), checkAuth() ], get);

// public endpoint
usersRouter.post('/', /*[ validator(userScheme) ],*/ post);

usersRouter.get('/:userHash', [ checkAuth(), checkHash() ], getByHash);
usersRouter.put('/:userHash', [ checkAuth(), checkHash() ], updateByHash);
usersRouter.delete('/:userHash', [ checkAuth(), checkHash() ], removeByHash);

export { usersRouter as users };
