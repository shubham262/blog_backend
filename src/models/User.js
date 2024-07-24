import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please Enter your name '],
		trim: true,
		default: ""
	},
	email: {
		type: String,
		required: [true, 'Please Enter your Email'],
		trim: true,
		unique: true,
		validate: [validator.isEmail, 'Please enter valid email'],
	},
	phone: {
		type: String,
		trim: true,
		validate: [validator.isMobilePhone, 'Please enter valid phoneNumber'],
		default: ""
	},
    password: {
		type: String,
		required: [true, 'Please Enter your password'],
		trim: true,
	},
	displayPicture: {
		type: String,
		trim: true,
		default: ""
	},
	dateCreated: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model('UsersList', userSchema);

export default User;
