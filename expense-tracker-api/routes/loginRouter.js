// File: src/routes/loginRouter.js

import express from 'express';
import morgan from 'morgan';
import { loginUser, createUser } from '../controllers/loginController.js';

const router = express.Router();

router.use(morgan('dev')); // Log HTTP requests

router.post('/login', loginUser);
router.post('/register', createUser);

export default router;
