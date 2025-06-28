import express, { Request, Response } from 'express';
import globalErrorHandeling from './app/middlewares/globalErrorHandeling';
import notFound from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './app/routes';
const app = express();
//using parser
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: '*', credentials: true }));
// hit the application route
app.use('/api', router);
const testServer = async (req: Request, res: Response) => {
  res.send({ status: true, message: 'Server is running' });
};

app.get('/', testServer);

// global error handeler
app.use(globalErrorHandeling);
// not found router handeler
app.use(notFound);

export default app;
