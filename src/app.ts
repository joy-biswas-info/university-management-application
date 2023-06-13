import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
import globalErrorHandler from './middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/user/user.route'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

// Application Routes
app.use('/api/v1/users/', UserRoutes)

app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is working',
  })
})

// testing
// app.get('/',async(req: Request, res: Response) => {
//   // Promise.reject(new Error('unHandled Promis Rejection'))
//   // console.log(x);

//   // res.send('Working')
//   // throw new Error('ore baba go Bug');
//   // next('ore baba error')
// })

// global error handeller
app.use(globalErrorHandler)

export default app
