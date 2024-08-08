import validator from 'validator';
import { apiErrorHandler } from '../helpers/errorHandler.js';

export const validateRegisterUserBody = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				message: 'Please provide all required fields [email, password]',
			});
		}
		if (!validator.isEmail(email)) {
			return res.status(400).json({
				message: 'Not a valid email address',
			});
		}

		if (!password?.length || password?.length < 3) {
			return res.status(400).json({
				message:
					'Not a valid password,password must be at least 3 characters',
			});
		}

		next();
	} catch (error) {
		return apiErrorHandler(res, error);
	}
};
export const validateLoginBody = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				message: 'Please provide all required fields [email, password]',
			});
		}
		if (!validator.isEmail(email)) {
			return res.status(400).json({
				message: 'Not a valid email address',
			});
		}

		if (!password?.length || password?.length < 3) {
			return res.status(400).json({
				message:
					'Not a valid password,password must be at least 3 characters',
			});
		}

		next();
	} catch (error) {
		return apiErrorHandler(res, error);
	}
};
