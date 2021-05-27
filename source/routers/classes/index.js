// Core
import express from 'express';

// Instruments
import { get, post } from './route.js';
import { getByHash, updateByHash, removeByHash } from './hash/index.js';
import { enroll, expel } from './education/index.js';
import { checkAuth, checkHash, hints } from '../../utils/index.js';

export const classesRouter = express.Router();

// public endpoint
classesRouter.get('/', get);

classesRouter.post('/', [ checkAuth() ], post);

classesRouter.get('/:classHash',
    [ checkAuth()/*, checkHash()*/ ], getByHash);
classesRouter.put('/:classHash',
    [ checkAuth()/*, checkHash()*/ ], updateByHash);
classesRouter.delete('/:classHash',
    [ checkAuth()/*, checkHash()*/ ], removeByHash);

classesRouter.post('/:classHash/enroll',
    [ checkAuth()/*, checkHash(hints.notLast)*/ ], enroll);
classesRouter.post('/:classHash/expel',
    [ checkAuth()/*, checkHash(hints.notLast)*/ ], expel);

export { classesRouter as classes };
