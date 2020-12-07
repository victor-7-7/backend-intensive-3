// Core
import express from 'express';

// Instruments
import { get, post } from './route.js';
import { getByHash, updateByHash, removeByHash } from './hash/index.js';
import { addKeynote } from './hash/keynotes/index.js';
import { getKeynoteByHash, removeKeynoteByHash } from './hash/keynotes/hash/index.js';
import { getVideoByHash, removeVideoByHash } from './hash/videos/hash/index.js';
import { addVideo } from './hash/videos/index.js';

export const router = express.Router();

router.get('/', get);
router.post('/', post);

router.get('/:lessonHash', getByHash);
router.put('/:lessonHash', updateByHash);
router.delete('/:lessonHash', removeByHash);

router.post('/:lessonHash/videos', addVideo);
router.post('/:lessonHash/keynotes', addKeynote);

router.get('/:lessonHash/videos/:videoHash', getVideoByHash);
router.delete('/:lessonHash/videos/:videoHash', removeVideoByHash);

router.get('/:lessonHash/keynotes/:keynoteHash', getKeynoteByHash);
router.delete('/:lessonHash/keynotes/:keynoteHash', removeKeynoteByHash);

export { router as lessons };
