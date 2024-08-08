import {
	createNewUserService,
	authenticateUserUsingPassword,
} from '../services/userService.js';
import { apiErrorHandler } from '../helpers/errorHandler.js';

export const createNewUser = async (req, res, next) => {
	try {
		const response = await createNewUserService(req.body);
		return res.status(201).json({
			data: response,
		});
	} catch (error) {
		return apiErrorHandler(res, error);
	}
};

export const loginUser = async (req, res, next) => {
	try {
		const response = await authenticateUserUsingPassword(req.body);

		return res.cookie('token', response?.token).status(200).json({
			data: response,
		});
	} catch (error) {
		return apiErrorHandler(res, error);
	}
};
