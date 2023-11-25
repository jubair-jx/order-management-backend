import express from 'express'
import { userController } from './user.controller'

const userRouter = express.Router()
//wil call controller function
userRouter.post('/create-user', userController.createUser)
//get all users routes
userRouter.get('/', userController.getAllusers)
//get single user routes
userRouter.get('/:userId', userController.getSingleUser)
//delete data from DB
userRouter.delete('/:userId', userController.deletedSingleUser)
//update data from DB
userRouter.patch('/:userId', userController.updateUserInfoDB)
export default userRouter
