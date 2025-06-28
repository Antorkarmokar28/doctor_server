import express, { Request, Response } from 'express';
import globalErrorHandeling from './app/middlewares/globalErrorHandeling';
const app = express();

const testServer = async (req: Request, res: Response) => {
  res.send({ status: true, message: 'Server is running' });
};

app.get('/', testServer);

// global error handeler
app.use(globalErrorHandeling);

export default app;
