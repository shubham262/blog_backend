import express from 'express';
import { createNewUser } from '../controllers/userController.js';
import { validateRegisterUserBody } from '../validators/oauthValidators.js';
const router = express.Router();

router.route('/register-user').post(validateRegisterUserBody, createNewUser);

export const usersRoute = router;
