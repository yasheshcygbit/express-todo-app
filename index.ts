import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import corsFunction from './src/middlewares/cors';
import routes from './src/routes';
import './src/config/db';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(corsFunction);

app.use(express.json());

app.use('/', routes);

app.use((req: Request, res: Response) => {
	// render the error page
	res.status(404).json({ message: 'resource not found' });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
