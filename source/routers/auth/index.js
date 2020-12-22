import express from 'express';

import { login, logout, authLogin } from './route';

// Utils
import { authenticate } from '../../utils';

const router = express.Router();

router.post('/login', login);
router.post('/logout', [ authenticate ], logout);

router.post('/api/auth/login', authLogin);

export { router as auth };
