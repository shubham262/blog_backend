// Create new Agents
import validator from 'validator';
import {
	createNewUserService,
	validateUserEmailService,
} from '../services/userService.js';
import { apiErrorHandler } from '../helpers/errorHandler.js';

const createNewUser = async (req, res, next) => {
	try {
		const { username, email, password, phone, displayPicture } = req.body;
		const newUser = {
			username,
			email,
			password,
			phone,
			displayPicture,
		};
		const response = await createNewUserService(newUser);

		return res.status(201).json({
			message: 'User Created',
			data: response,
		});
	} catch (error) {
		return apiErrorHandler(res, error);
	}
};

const validateUserEmail = async (req, res, next) => {
	try {
		const { email } = req.body;
		const data = await validateUserEmailService(email);

		res.status(201).json({
			data,
		});
	} catch (error) {
		return apiErrorHandler(res, error);
	}
};

export { validateUserEmail, createNewUser };
