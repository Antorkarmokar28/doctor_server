import express, { Request, Response } from 'express';
import globalErrorHandeling from './app/middlewares/globalErrorHandeling';
import notFound from './app/middlewares/notFound';
const app = express();

const testServer = async (req: Request, res: Response) => {
  res.send({ status: true, message: 'Server is running' });
};

app.get('/', testServer);

// global error handeler
app.use(globalErrorHandeling);
// not found router handeler
app.use(notFound);

export default app;
