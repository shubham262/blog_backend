import mongoose from 'mongoose';
import User from './User.js';
const userSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please Enter your valid title'],
		trim: true,
	},
	content: {
		type: String,
		trim: true,
	},
	authorId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: User, // Reference to the User model
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Post = mongoose.model('post', userSchema);

export default Post;
