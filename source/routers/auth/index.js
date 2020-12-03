import express from 'express';

import { login, logout } from './route';

// Utils
import { limiter } from '../../utils';

const router = express.Router();

router.post('/login', [ limiter(2, 1000 * 60) ], login);
router.post('/logout', [ limiter(2, 1000 * 60) ], logout);

export { router as auth };
