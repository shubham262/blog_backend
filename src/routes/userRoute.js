import express from 'express';
import {
	createNewUser,
} from '../controllers/userController.js';
const router = express.Router();

router.route('/register-user').post(createNewUser)

export const UsersRoute = router;
