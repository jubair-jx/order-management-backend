import express from 'express'
import { userController } from './user.controller'

const userRouter = express.Router()
//wil call controller function
userRouter.post('/create-user', userController.createUser)

export default userRouter
