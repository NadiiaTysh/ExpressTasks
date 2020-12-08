import express from 'express';

import { get, post } from './route';
import { getByHash, updateByHash, deleteByHash } from './hash';

// Utils
import { limiter, validator, authenticate } from '../../utils';

// Schemas
import { userSchema } from '../../schemas';

const router = express.Router();

router.get('/', [ limiter(2, 1000 * 60), authenticate ], get);
router.post('/', [ validator(userSchema) ], post);

router.get('/:userHash', [ limiter(2, 1000 * 60), authenticate ], getByHash);
router.put('/:userHash', [ validator(userSchema), authenticate ], updateByHash);
router.delete('/:userHash', [ authenticate ], deleteByHash);

export { router as users };
