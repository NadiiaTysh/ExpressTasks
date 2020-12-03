import express from 'express';

import { get, post } from './route';
import { getByHash, updateByHash, deleteByHash } from './hash';
import { enroll, expel } from './education';

// Utils
import { limiter, validator } from '../../utils';

// Schemas
import { classSchema } from '../../schemas';

const router = express.Router();

router.get('/', [ limiter(2, 1000 * 60) ], get);
router.post('/', [ validator(classSchema) ], post);

router.get('/:classHash', [ limiter(2, 1000 * 60) ], getByHash);
router.put('/:classHash', [ validator(classSchema) ], updateByHash);
router.delete('/:classHash', deleteByHash);
router.post('/:classHash/enroll', enroll);
router.post('/:classHash/expel', expel);

export { router as classes };
