import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDatabase } from './src/config/database.js';
import { healthRoute } from './src/routes/healthRoute.js';
import { usersRoute } from './src/routes/userRoute.js';

import { otpRoute } from './src/routes/otpRoute.js';
dotenv.config();
const app = express();

//connecting to database
connectDatabase();
app.use(cors());
app.use(express.json());
app.use('/api', healthRoute);
app.use('/api', usersRoute);
app.use('/api', otpRoute);

app.listen(process.env.PORT, () =>
	console.log(`server started at port ${process.env.PORT}`)
);
