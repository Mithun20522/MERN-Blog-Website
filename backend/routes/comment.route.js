import express from 'express'
import { createComment, getComments, likeComment } from '../controllers/comment.controller.js';
import {verifyToken} from '../utils/verifyUser.js'
const router = express.Router();
router.post('/create-comment', verifyToken ,createComment);
router.get('/get-comment/:postId', getComments);
router.put('/like-comment/:commentId', verifyToken, likeComment)
export default router;