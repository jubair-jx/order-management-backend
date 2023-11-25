import express, { Application } from 'express'
const app: Application = express()
import cors from 'cors'
import userRouter from './app/config/modules/User/user.route'

//parser
app.use(cors())
app.use(express.json())

//main User Router
app.use('/api/users', userRouter)

export default app
