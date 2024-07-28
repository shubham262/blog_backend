import { apiErrorHandler } from '../helpers/errorHandler.js';
import otpGenerator from 'otp-generator'
import OTP from '../models/Otp.js';

const sendOtp = async (req, res, next) => { 
	try {
        const { email } = req.body;

        let otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });
        let result = await OTP.findOne({ otp: otp });
        while (result) {
          otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
          });
          result = await OTP.findOne({ otp: otp });
        }
        const otpPayload = { email, otp };

        const otpBody = await OTP.create(otpPayload);
        res.status(200).json({
          success: true,
          message: 'OTP sent successfully',
          otp,
        });
    } catch (error) {
		return apiErrorHandler(res, error);
	}
};


export { sendOtp };
