import express from 'express';
import {
	createNewSupportingAgent,
	getAllSupportingAgent,
} from '../controllers/userController.js';
const router = express.Router();

router.route('/support-agents').post(createNewSupportingAgent);
router.route('/register-user').post()
router.route('/get-all-support-agents').get(getAllSupportingAgent);

export const UsersRoute = router;
