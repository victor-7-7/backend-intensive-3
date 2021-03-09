// Core
import express from 'express';

// Instruments
import { get, post } from './route.js';
import { getByHash, updateByHash, removeByHash } from './hash/index.js';
import { addKeynote } from './hash/keynotes/index.js';
import { getKeynoteByHash, removeKeynoteByHash } from './hash/keynotes/hash/index.js';
import { getVideoByHash, removeVideoByHash } from './hash/videos/hash/index.js';
import { addVideo } from './hash/videos/index.js';
import { checkAuth, checkHash, hints } from '../../utils/index.js';

export const lessonsRouter = express.Router();

// public endpoint
lessonsRouter.get('/', get);

lessonsRouter.post('/', [ checkAuth() ], post);

lessonsRouter.get('/:lessonHash',
    [ checkAuth(), checkHash() ], getByHash);
lessonsRouter.put('/:lessonHash',
    [ checkAuth(), checkHash() ], updateByHash);
lessonsRouter.delete('/:lessonHash',
    [ checkAuth(), checkHash() ], removeByHash);

lessonsRouter.post('/:lessonHash/videos',
    [ checkAuth(), checkHash(hints.notLast) ], addVideo);
lessonsRouter.post('/:lessonHash/keynotes',
    [ checkAuth(), checkHash(hints.notLast) ], addKeynote);

lessonsRouter.get('/:lessonHash/videos/:videoHash',
    [ checkAuth(), checkHash(hints.couple) ], getVideoByHash);
lessonsRouter.delete('/:lessonHash/videos/:videoHash',
    [ checkAuth(), checkHash(hints.couple) ], removeVideoByHash);

lessonsRouter.get('/:lessonHash/keynotes/:keynoteHash',
    [ checkAuth(), checkHash(hints.couple) ], getKeynoteByHash);
lessonsRouter.delete('/:lessonHash/keynotes/:keynoteHash',
    [ checkAuth(), checkHash(hints.couple) ], removeKeynoteByHash);

export { lessonsRouter as lessons };
