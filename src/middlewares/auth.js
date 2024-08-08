import { apiErrorHandler } from '../helpers/errorHandler.js';
import jwt from 'jsonwebtoken';
export const checkAuthenticatedUser = async (req, res, next) => {
	try {
		const authorization = req?.headers?.authorization + '';
		const token = authorization?.split(' ')?.[1]?.trim();

		if (!token) {
			return res.status(401).json({
				success: false,
				message: 'Access denied. No token provided.',
			});
		}

		// Verify the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded; // Attach the decoded token to the request object
		next();
	} catch (error) {
		return apiErrorHandler(res, error);
	}
};
