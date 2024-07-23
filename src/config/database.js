import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let db;
console.log("process.env.MONGODB",process.env.MONGODB)
const connectDatabase = () => {
	mongoose.connect(process.env.MONGODB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	db = mongoose.connection;

	db.on('error', (err) => {
		console.error('MongoDB connection error:', err);
	});

	db.once('open', () => {
		console.log('Connected to MongoDB');
	});

	db.on('disconnected', () => {
		console.log('Disconnected from MongoDB');
	});

	// Handle Node process termination to close the MongoDB connection
	process.on('SIGINT', () => {
		db.close();
		process.exit(0);
	});
	return db;
};

export { connectDatabase, db };
