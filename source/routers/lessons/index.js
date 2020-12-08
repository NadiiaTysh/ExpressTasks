import express from 'express';

import { get, post } from './route';
import { getByHash, updateByHash, deleteByHash } from './hash';
import { addKeynotesByHash, getKeynotesByHash, deleteKeynotesByHash } from './hash/keynotes';
import { addVideosByHash, getVideosByHash, deleteVideosByHash } from './hash/videos';

// Utils
import { limiter, validator, authenticate } from '../../utils';

// Schemas
import { videoSchema, keynoteSchema, lessonSchema } from '../../schemas';

const router = express.Router();

router.get('/', [ limiter(2, 1000 * 60) ], get);
router.post('/', [ validator(lessonSchema), authenticate ], post);

router.get('/:lessonHash', [ limiter(2, 1000 * 60), authenticate ], getByHash);
router.put('/:lessonHash', [ validator(lessonSchema), authenticate ], updateByHash);
router.delete('/:lessonHash', [ authenticate ], deleteByHash);

router.post('/:lessonHash/keynotes', [ validator(keynoteSchema), authenticate ], addKeynotesByHash);
router.get('/:lessonHash/keynotes/:keynoteHash', [ limiter(2, 1000 * 60), authenticate ], getKeynotesByHash);
router.delete('/:lessonHash/keynotes/:keynoteHash', [ authenticate ], deleteKeynotesByHash);

router.post('/:lessonHash/videos', [ validator(videoSchema), authenticate ], addVideosByHash);
router.get('/:lessonHash/videos/:videoHash', [ limiter(2, 1000 * 60), authenticate ], getVideosByHash);
router.delete('/:lessonHash/videos/:videoHash', [ authenticate ], deleteVideosByHash);

export { router as lessons };
