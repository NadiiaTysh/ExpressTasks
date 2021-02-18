import express from 'express';

import { login, logout } from './route';

// Utils
import { authenticate } from '../../utils';

const router = express.Router();

router.post('/login', login);
router.post('/logout', [ authenticate ], logout);

export { router as auth };
