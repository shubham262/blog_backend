import mongoose from 'mongoose';
import validator from 'validator';
import axios from 'axios';

const otpSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Please Enter your Email'],
		trim: true,
		unique: true,
		validate: [validator.isEmail, 'Please enter valid email'],
	},
	otp: {
		type: String,
		required: [true, 'Please Enter your otp'],
		trim: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
        expires: 60 * 5,
	},
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
	// Send the email using our custom mailSender Function
	try {

        const subject = "Verification Email"
        const htmlContent = `<h1>Please confirm your OTP </h1>
                                <p> Here is your OTP code:-> ${otp} </p>`
            
        const mailResponse = await axios.post('http://localhost:6000/api/send-email', { to: email, subject: subject, html: htmlContent}, {  headers: {
            'Content-Type': 'application/json'
        } });
		console.log("Email sent successfully: ", mailResponse);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

otpSchema.pre("save", async function (next) {
    console.log("New document saved to the database");
    // Only send an email when a new document is created
    // if (this.isNew) {
      await sendVerificationEmail(this.email, this.otp);
    // }
    next();
  });

const Otp = mongoose.model('OtpList', otpSchema);

export default Otp;
