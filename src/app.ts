import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/config/modules/users/user.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

export default app;
