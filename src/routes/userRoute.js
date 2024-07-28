import express from 'express';
import {
	createNewUser,
	validateUserEmail,
} from '../controllers/userController.js';
import {
	validateCheckExistingUser,
	validateRegisterUserBody,
} from '../validators/oauthValidators.js';
const router = express.Router();

router.route('/register-user').post(validateRegisterUserBody, createNewUser);
router
	.route('/checkUserExists')
	.post(validateCheckExistingUser, validateUserEmail);

export const usersRoute = router;
