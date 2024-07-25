// Create new Agents
import validator from 'validator';
import {
	createNewUserService,
	validateUserEmailService,
} from '../services/userService.js';

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

		res.status(201).json({
			message: 'User Created',
			data: response,
		});
	} catch (error) {
		if (error?.name === 'ValidationError') {
			return res.status(400).json({
				success: false,
				message: error?.message || 'Validation error',
				errors: error.errors,
			});
		}

		// Handle other types of errors
		return res.status(500).json({
			success: false,
			message: error?.message || 'Internal Server Error',
			error: error,
		});
	}
};

const validateUserEmail = async (req, res, next) => {
	try {
		const { email } = req.body;

		if (!email?.length) {
			return res.status(400).json({
				success: false,
				message: 'Please Enter valid email ',
			});
		}

		if (!validator.isEmail(email)) {
			return res.status(400).json({
				success: false,
				message: 'Please Enter valid email id.',
			});
		}

		const userData = await validateUserEmailService({ ...req.body });

		res.status(201).json({
			success: true,
			agentData,
		});
	} catch (error) {
		if (error.name === 'ValidationError') {
			return res.status(400).json({
				success: false,
				message: 'Validation error',
				errors: error.errors,
			});
		}

		// Handle other types of errors
		return res.status(500).json({
			success: false,
			message: 'Internal Server Error',
			error: error,
		});
	}
};

export { validateUserEmail, createNewUser };
