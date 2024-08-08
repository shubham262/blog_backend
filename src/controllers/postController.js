import {
	createNewPostService,
	getAllPostsService,
} from '../services/postService.js';
import { apiErrorHandler } from '../helpers/errorHandler.js';

export const createNewPost = async (req, res, next) => {
	try {
		const authorId = req.user.id;
		const response = await createNewPostService(req.body, authorId);
		return res.status(201).json({
			data: response,
		});
	} catch (error) {
		return apiErrorHandler(res, error);
	}
};

export const getAllPosts = async (req, res, next) => {
	try {
		let query = {};
		if (req?.query?.author) {
			query.authorId = req.query.author;
		}
		const response = await getAllPostsService(query);
		return res.status(201).json({
			data: response,
		});
	} catch (error) {
		return apiErrorHandler(res, error);
	}
};
