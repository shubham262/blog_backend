import Otp from '../models/Otp.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const createNewUserService = async (data) => {
	try {
		const {  username, email, password, phone, displayPicture, otp } = data;

		console.log("Data gere", data)
		const newUser = {
			username,
			email,
			password,
			phone,
			displayPicture,
		};
		// Find the most recent OTP for the email
		const response = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
		console.log("response from otp", response)
		if (response.length === 0 || otp !== response[0].otp) {
			console.log("reacjed here")
		  return res.status(400).json({
			success: false,
			message: 'The OTP is not valid',
		  });
		}

		
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		newUser.password = hashedPassword;
		if (!displayPicture?.length) {
			delete newUser?.displayPicture;
		}
		if (!phone?.length) {
			delete newUser?.phone;
		}

		console.log("newUSer",newUser)
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

const userExistService = async (email) => {
	try {
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

		return {
			status: 200,
			data: false,
			message: 'Can Make New User',
		};
	} catch (error) {
		throw error;
	}
};

export { userExistService, createNewUserService };
