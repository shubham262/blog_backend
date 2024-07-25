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
		throw error;
	}
};
