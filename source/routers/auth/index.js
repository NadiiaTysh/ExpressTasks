import express from 'express';

import { logout, authLogin } from './route';

// Utils
import { authenticate } from '../../utils';

const router = express.Router();

router.post('/login', authLogin);
router.post('/logout', [ authenticate ], logout);

export { router as auth };
