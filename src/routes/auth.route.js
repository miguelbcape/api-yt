import { Router } from 'express';
import {
  register,
  login,
  logout,
  profile,
  verifyToken,
} from '../controllers/auth.controller.js';
import { routeError } from '../libs/functions.js';
import { authRequire } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.get('/verify', verifyToken);
router.post('/logout', logout);
router.get('/profile', authRequire, profile);

router.use((req, res) => routeError(req.url, res));

export default router;
