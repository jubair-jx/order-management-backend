import express, { Application } from 'express'
const app: Application = express()
import cors from 'cors'
import { userRoute } from './app/config/modules/User/user.route'

//parser
app.use(cors())
app.use(express.json())

//main User Router
app.use('/api/users', userRoute)
//no routes match
app.all('*', (req, res, next) => {
  res.status(400).json({
    success: false,
    message: 'Invalid Route',
  })
})
export default app
