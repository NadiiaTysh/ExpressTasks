import express from 'express';

import { get, post } from './route';
import { getByHash, updateByHash, deleteByHash } from './hash';
import { addKeynotesByHash, getKeynotesByHash, deleteKeynotesByHash } from './hash/keynotes';
import { addVideosByHash, getVideosByHash, deleteVideosByHash } from './hash/videos';

// Utils
import { limiter, validator } from '../../utils';

// Schemas
import { videoSchema, keynoteSchema, lessonSchema } from '../../schemas';

const router = express.Router();

router.get('/', [ limiter(2, 1000 * 60) ], get);
router.post('/', [ validator(lessonSchema) ], post);

router.get('/:lessonHash', getByHash);
router.put('/:lessonHash', updateByHash);
router.delete('/:lessonHash', deleteByHash);

router.post('/:lessonHash/keynotes', [ validator(keynoteSchema) ], addKeynotesByHash);
router.get('/:lessonHash/keynotes/:keynoteHash', getKeynotesByHash);
router.delete('/:lessonHash/keynotes/:keynoteHash', deleteKeynotesByHash);

router.post('/:lessonHash/videos', [ validator(videoSchema) ], addVideosByHash);
router.get('/:lessonHash/videos/:videoHash', getVideosByHash);
router.delete('/:lessonHash/videos/:videoHash', deleteVideosByHash);

export { router as lessons };
