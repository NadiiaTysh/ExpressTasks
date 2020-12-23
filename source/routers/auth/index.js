import express from 'express';

import { login, logout, authLogin, apiLogin } from './route';

// Utils
import { authenticate } from '../../utils';

const router = express.Router();

router.post('/login', login);
router.post('/logout', [ authenticate ], logout);
router.post('/api/auth/login', authLogin);
router.post('/api/login', apiLogin);

export { router as auth };
