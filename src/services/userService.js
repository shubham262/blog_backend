import User from '../models/User.js';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const createNewUserService = async (newUser) => {
	try {
		const { phone, password, displayPicture } = newUser;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		newUser.password = hashedPassword;
		if (!displayPicture?.length) {
			delete newUser?.displayPicture;
		}
		if (!phone?.length) {
			delete newUser?.phone;
		}

		const createdUser = await User.create(newUser);

		return {
			status: 200,
			message: 'Created New User',
			data: {
				id: createdUser?._id,
				username: createdUser?.username,
				email: createdUser?.email,
			},
		};
	} catch (error) {
		let newError = { ...error, message: 'Unable to Create New User' };
		throw newError;
	}
};

const validateUserEmailService = async (email) => {
	try {
		const existingUser = await User.findOne({
			$or: [{ email }],
		});

		if (existingUser) {
			return {
				status: 400,
				message: 'User already exists',
			};
		}

		return {
			status: 200,
			message: 'Can Make New User',
		};
	} catch (error) {
		throw error;
	}
};

export { validateUserEmailService, createNewUserService };
