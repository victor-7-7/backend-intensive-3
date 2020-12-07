// Core
import express from 'express';

// Instruments
import { get, post } from './route.js';
import { getByHash, updateByHash, removeByHash } from './hash/index.js';
import { enroll, expel } from './education/index.js';

export const router = express.Router();

router.get('/', get);
router.post('/', post);

router.get('/:classHash', getByHash);
router.put('/:classHash', updateByHash);
router.delete('/:classHash', removeByHash);

router.post('/:classHash/enroll', enroll);
router.post('/:classHash/expel', expel);

export { router as classes };
