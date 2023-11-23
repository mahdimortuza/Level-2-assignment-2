import cors from 'cors';
import express, { Application } from 'express';
import { UsersRoutes } from './app/config/modules/users/user.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/', UsersRoutes);

export default app;
