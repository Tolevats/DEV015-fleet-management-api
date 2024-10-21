import { Router } from 'express';
import { loginUser } from '../controllers/authController';

const router = Router();

// POST /auth/login route for user login
router.post('/login', loginUser);

export default router;
