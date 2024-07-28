import express from 'express';
import { sendOtp } from '../controllers/otpController.js';
const router = express.Router();

router.route('/send-otp').post(sendOtp);

export const otpRoute = router; 
