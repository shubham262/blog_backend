import express from 'express';
import {
	createNewUser,
	userExist,
} from '../controllers/userController.js';
import {
	validateCheckExistingUser,
	validateRegisterUserBody,
} from '../validators/oauthValidators.js';
const router = express.Router();

router.route('/register-user').post(validateRegisterUserBody, createNewUser);
router
	.route('/checkUserExists')
	.post(validateCheckExistingUser, userExist);

export const usersRoute = router; 
