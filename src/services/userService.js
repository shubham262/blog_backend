import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const saltRounds = 10;

export const createNewUserService = async (data) => {
	try {
		const { email, password } = data;

		const existingUser = await User.findOne({
			$or: [{ email }],
		});

		if (existingUser) {
			return {
				status: 400,
				data: true,
				message: 'User already exists',
			};
		}

		const newUser = {
			email,
			password,
		};
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		newUser.password = hashedPassword;
		const createdUser = await User.create(newUser);

		const payload = {
			id: createdUser?._id,
			email: createdUser?.email,
		};

		let token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: '2h',
		});

		return {
			status: 200,
			message: 'Created New User',
			data: {
				id: createdUser?._id,
				email: createdUser?.email,
			},
			token,
		};
	} catch (error) {
		let newError = { ...error, message: 'Unable to Create New User' };
		throw newError;
	}
};

export const authenticateUserUsingPassword = async (data) => {
	try {
		const { email, password } = data;

		const existingUser = await User.findOne({
			$or: [{ email }],
		});

		if (!existingUser) {
			return {
				status: 400,
				data: true,
				message: 'User does not  exists',
			};
		}

		const passwordComparison = await bcrypt.compare(
			password,
			existingUser.password
		);
		if (!passwordComparison) {
			return {
				status: 400,
				data: true,
				message: 'Incorrect email or password',
			};
		}

		const payload = {
			email: existingUser.email,
			id: existingUser._id,
		};

		let token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: '2h',
		});

		return {
			status: 200,
			message: 'Logged in Successfully',
			token,
		};
	} catch (error) {
		let newError = { ...error, message: 'Unable to authenticate User' };
		throw newError;
	}
};
