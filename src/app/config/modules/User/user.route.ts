import express from 'express'
import userController from './user.controller'

export const userRoute = express.Router()

userRoute.get('/', userController.getUsers)
userRoute.post('/', userController.createUser)
userRoute.get('/:userId', userController.getUser)
userRoute.patch('/:userId', userController.updateUser) //TODO:schema pre hooks not working
userRoute.delete('/:userId', userController.deleteUser)
userRoute.get('/:userId/orders', userController.getOrders)
userRoute.post('/:userId/orders', userController.addOrders)
userRoute.get('/:userId/orders/total-price', userController.totalPrice)
