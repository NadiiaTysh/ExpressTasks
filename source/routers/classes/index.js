import express from 'express';

import { get, post } from './route';
import { getByHash, updateByHash, deleteByHash } from './hash';
import { enroll, expel } from './education';

// Utils
import { limiter, validator, authenticate } from '../../utils';

// Schemas
import { classSchema, enrollSchema, expelSchema } from '../../schemas';

const router = express.Router();

router.get('/', [ limiter(2, 1000 * 60) ], get);
router.post('/', [ validator(classSchema), authenticate ], post);

router.get('/:classHash', [ limiter(2, 1000 * 60), authenticate ], getByHash);
router.put('/:classHash', [ validator(classSchema), authenticate ], updateByHash);
router.delete('/:classHash', [ authenticate ], deleteByHash);
router.post('/:classHash/enroll', [ validator(enrollSchema), authenticate ], enroll);
router.post('/:classHash/expel', [ validator(expelSchema), authenticate ], expel);

export { router as classes };
