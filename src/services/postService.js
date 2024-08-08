import Post from '../models/Posts.js';

export const createNewPostService = async (data, authorId) => {
	try {
		let postdata = { ...data, authorId };
		if (!postdata?.content) {
			delete postdata?.content;
		}
		const createdPosts = await Post.create(postdata);
		return {
			status: 200,
			message: 'Created New User',
			data: createdPosts,
		};
	} catch (error) {
		let newError = { ...error, message: 'Unable to Create New Post' };
		throw newError;
	}
};

export const getAllPostsService = async (queries = {}) => {
	try {
		const postData = await Post.find({ ...queries });
		return {
			status: 200,
			data: postData,
		};
	} catch (error) {
		let newError = { ...error, message: 'Unable to fetch Posts' };
		throw newError;
	}
};
