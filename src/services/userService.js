import User from '../models/User.js';

const createNewAgentService = async (data) => {
	try {
		const { name, email, phone, description, active } = data;

		const agentWithGivenEmail = await Agent.find({ email });

		if (agentWithGivenEmail && agentWithGivenEmail?.length) {
			throw 'Agent with given Email Id already Exists';
		}

		const agentData = await Agent.create({
			name,
			email,
			phone,
			description,
			active: active || true,
		});

		return agentData;
	} catch (error) {
		throw error;
	}
};

const createNewUserService = async (newUser) => {
	try {
		console.log("newUser here", newUser)
		const createdUser = await User.create(newUser);

		return {
			status: 200,
			message: "Created New User",
			data: {
			  id: createdUser?._id,
			  username: createdUser?.username,
			  email: createdUser?.email
			},
		  };
	} catch (error) {
		throw new Error("Unable to Create New User");
	}
};

const validateUserEmailService = async (email) => {
	try {
		const existingUser = await User.findOne({
			$or: [{email}]
		})

		if (existingUser) {
			return {
				status: 400,
				message: "User already exists",
			  };
		}

		return {
			status: 200,
			message: "Can Make New User",
		  };
	} catch (error) {
		throw error;
	}
};


export { validateUserEmailService, createNewUserService };
