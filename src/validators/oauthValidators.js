import validator from 'validator';
import { apiErrorHandler } from '../helpers/errorHandler.js';

export const validateRegisterUserBody = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			return res.status(400).json({
				message:
					'Please provide all required fields [username, email, password]',
			});
		}

		next();
	} catch (error) {
		return apiErrorHandler(res, error);
	}
};

export const validateCheckExistingUser = async (req, res, next) => {
	try {
		const { email } = req.body;
		if (!email?.length || !validator.isEmail(email)) {
			return res.status(400).json({
				success: false,
				message: 'Please Enter valid email Id',
			});
		}
	} catch (error) {
		return apiErrorHandler(res, error);
	}
};
