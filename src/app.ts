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

//root routes
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Yeah Bruh your server is "OK" !',
  })
})

app.all('*', (req, res, next) => {
  res.status(400).json({
    success: false,
    message: 'Invalid Route',
  })
})
export default app
