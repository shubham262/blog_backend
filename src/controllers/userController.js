// Create new Agents
import validator from 'validator';
import {
	createNewUserService,
	userExistService,
} from '../services/userService.js';
import { apiErrorHandler } from '../helpers/errorHandler.js';
import USER from '../models/User.js';

const createNewUser = async (req, res, next) => {
	try {
		// const { username, email, password, phone, displayPicture, otp } = req.body;

		const response = await createNewUserService(req.body);

		return res.status(201).json({
			message: 'User Created',
			data: response,
		});
	} catch (error) {
		return apiErrorHandler(res, error);
	}
};

const userExist = async (req, res, next) => {
	try {
		const { email } = req.body;
		const data = await userExistService(email);

		res.status(201).json({
			data,
		});
	} catch (error) {
		return apiErrorHandler(res, error);
	}
};

const loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: 'Plz fill all the details carefully',
			});
		}

		const User = await USER.findOne({ email });

		const payload = {
			email: User.email,
			id: User._id,
		};

		if (await bcrypt.compare(password, User.password)) {
			//if password matched
			//now lets create a JWT token
			let token = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: '2h',
			});
			User = User.toObject();
			User.token = token;

			User.password = undefined;
			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true, //It will make cookie not accessible on clinet side -> good way to keep hackers away
			};
			res.cookie('token', token, options).status(200).json({
				success: true,
				token,
				User,
				message: 'Logged in Successfully',
			});
		} else {
			return res.status(403).json({
				success: false,
				message: 'Password incorrects',
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Login failure :' + error,
		});
	}
};

export { userExist, createNewUser, loginUser };
