import validator from 'validator';
import { apiErrorHandler } from '../helpers/errorHandler.js';

export const validateCreateNewPostBody = async (req, res, next) => {
	try {
		const { title } = req.body;

		if (!title || !title?.length) {
			return res.status(400).json({
				message: 'Please provide all required fields [title]',
			});
		}

		next();
	} catch (error) {
		return apiErrorHandler(res, error);
	}
};
