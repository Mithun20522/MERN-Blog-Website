import express from 'express'
import { signup, signin, google } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/register', signup);
authRouter.post('/login', signin);
authRouter.post('/google', google);

export default authRouter;