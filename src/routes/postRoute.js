import express from 'express';
import { checkAuthenticatedUser } from '../middlewares/auth.js';
import { validateCreateNewPostBody } from '../validators/postValidator.js';
import { createNewPost, getAllPosts } from '../controllers/postController.js';

const router = express.Router();

router
	.route('/post')
	.post(checkAuthenticatedUser, validateCreateNewPostBody, createNewPost);
router.route('/posts').get(getAllPosts);

export const postsRoute = router;
