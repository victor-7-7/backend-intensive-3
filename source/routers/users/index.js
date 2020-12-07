// Core
import express from 'express';

// Instruments
import { get, post } from './route.js';
import { getByHash, updateByHash, removeByHash } from './hash/index.js';
import { limiter, validator } from '../../utils/index.js';

// Schema
import { createUser } from '../../schemas/index.js';

export const router = express.Router();

router.get('/', [ limiter(5, 60 * 1000) ], get);
router.post('/', post);
// router.post('/', [ validator(createUser) ], post);
router.get('/:userHash', getByHash);
router.put('/:userHash', updateByHash);
router.delete('/:userHash', removeByHash);

export { router as users };

