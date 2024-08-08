import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Please Enter your Email'],
		trim: true,
		unique: true,
		validate: [validator.isEmail, 'Please enter valid email'],
	},

	password: {
		type: String,
		required: [true, 'Please Enter your password'],
		trim: true,
	},
});

const User = mongoose.model('UsersList', userSchema);

export default User;
