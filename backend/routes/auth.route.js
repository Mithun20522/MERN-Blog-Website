import express from 'express'
import { signup } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/register', signup);

export default authRouter;