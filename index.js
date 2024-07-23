import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './src/config/database.js';
import { AgentsRoute } from './src/routes/agentRoute.js';
import { TicketRoute } from './src/routes/ticketRoute.js';
dotenv.config();
const app = express();

//connecting to database
connectDatabase();

app.use(express.json());
app.use('/api', AgentsRoute);
app.use('/api', TicketRoute);

app.listen(process.env.PORT, () =>
	console.log(`server started at port ${process.env.PORT}`)
);
