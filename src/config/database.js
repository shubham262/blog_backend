import mongoose from 'mongoose';

let db;
const connectDatabase = () => {
	try {
		mongoose.connect(process.env.MONGODB);

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
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		process.exit(1);
	}
};

export { connectDatabase, db };
