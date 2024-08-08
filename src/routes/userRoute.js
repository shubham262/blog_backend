import express from 'express';
import { createNewUser, loginUser } from '../controllers/userController.js';
import {
	validateRegisterUserBody,
	validateLoginBody,
} from '../validators/userValidator.js';

const router = express.Router();

router.route('/signup').post(validateRegisterUserBody, createNewUser);
router.route('/login').post(validateLoginBody, loginUser);

export const usersRoute = router;
