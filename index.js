import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDatabase } from './src/config/database.js';

import { usersRoute } from './src/routes/userRoute.js';
import { postsRoute } from './src/routes/postRoute.js';

dotenv.config();
const app = express();

//connecting to database
connectDatabase();
app.use(cors());
app.use(express.json());

app.use(usersRoute);
app.use(postsRoute);

app.listen(process.env.PORT, () =>
	console.log(`server started at port ${process.env.PORT}`)
);
