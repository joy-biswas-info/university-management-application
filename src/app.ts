import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
import usersRouter from './app/modules/users/users.route'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

// Application Routes
app.use('/api/v1/users/', usersRouter)

app.get('/', async (req: Request, res: Response) => {
  res.send('Working')
})

export default app
