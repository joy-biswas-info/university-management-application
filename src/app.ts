import express, { Application, Request, Response,NextFunction } from 'express';
import cors from 'cors';
const app: Application = express();
import globalErrorHandler from './middlewares/globalErrorHandler';
import routes from './app/routes/routes';
import httpStatus from 'http-status';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// Application Routes
app.use('/api/v1/', routes);

// global error handeller
app.use(globalErrorHandler);

app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is working',
  });
});

// testing
// app.get('/',async(req: Request, res: Response) => {
//   // Promise.reject(new Error('unHandled Promis Rejection'))
//   // console.log(x);

//   // res.send('Working')
//   // throw new Error('ore baba go Bug');
//   // next('ore baba error')
// })

// handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found Any Route',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API not Found',
      },
    ],
  });
  next()
});

export default app;
