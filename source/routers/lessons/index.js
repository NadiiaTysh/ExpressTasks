import express from 'express';

import { get, post } from './route';
import { getByHash, updateByHash, deleteByHash } from './hash';
import { addKeynotesByHash, getKeynotesByHash, deleteKeynotesByHash } from './hash/keynotes';
import { addVideosByHash, getVideosByHash, deleteVideosByHash } from './hash/videos';

// Utils
import { limiter } from '../../utils';

const router = express.Router();

router.get('/', [ limiter(2, 1000 * 60) ], get);
router.post('/', post);

router.get('/:lessonHash', getByHash);
router.put('/:lessonHash', updateByHash);
router.delete('/:lessonHash', deleteByHash);

router.post('/:lessonHash/keynotes', addKeynotesByHash);
router.get('/:lessonHash/keynotes/:keynoteHash', getKeynotesByHash);
router.delete('/:lessonHash/keynotes/:keynoteHash', deleteKeynotesByHash);

router.post('/:lessonHash/videos', addVideosByHash);
router.get('/:lessonHash/videos/:videoHash', getVideosByHash);
router.delete('/:lessonHash/videos/:videoHash', deleteVideosByHash);

export { router as lessons };
