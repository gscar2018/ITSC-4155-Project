import express from 'express';
import { signupHandler } from '../client/api/auth/signup.ts';
import { loginHandler } from '../client/api/auth/login.ts';

const router = express.Router();

// Route to handle user signup
router.post('/signup', signupHandler);

// Route to handle user login
router.post('/login', loginHandler);

export default router;