import express from 'express';

import { get, post } from './route';
import { getByHash, updateByHash, deleteByHash } from './hash';

// Utils
import { limiter, authenticate } from '../../utils';

const router = express.Router();

router.get('/', [ limiter(2, 1000 * 60), authenticate ], get);
router.post('/', post);

router.get('/:staffPersonHash', [ limiter(2, 1000 * 60), authenticate ], getByHash);
router.put('/:staffPersonHash', [ authenticate ], updateByHash);
router.delete('/:staffPersonHash', [ authenticate ], deleteByHash);

export { router as staff };
