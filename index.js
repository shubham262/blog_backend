import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './src/config/database.js';
import { TicketRoute } from './src/routes/ticketRoute.js';
import { UsersRoute } from './src/routes/userRoute.js';
dotenv.config();
const app = express();

//connecting to database
connectDatabase();

app.use(express.json());
app.use('/api', UsersRoute);
app.use('/api', TicketRoute);

app.listen(process.env.PORT, () =>
	console.log(`server started at port ${process.env.PORT}`)
);
