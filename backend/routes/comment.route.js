import express from 'express'
import { createComment, getComments, likeComment, editComment, deleteComment , getCommentsForDashBoard} from '../controllers/comment.controller.js';
import {verifyToken} from '../utils/verifyUser.js'
const router = express.Router();
router.post('/create-comment', verifyToken ,createComment);
router.get('/get-comment/:postId', getComments);
router.put('/like-comment/:commentId', verifyToken, likeComment);
router.put('/edit-comment/:commentId', verifyToken, editComment);
router.delete('/delete-comment/:commentId', verifyToken, deleteComment);
router.get('/get-comments', verifyToken, getCommentsForDashBoard);
export default router;