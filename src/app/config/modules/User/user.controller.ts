import { Request, Response } from 'express'

import userValidationSchema from './user.validation'
import userService from './user.services'

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUsers()
    res.status(201).json({
      success: true,
      data: result,
      message: 'Get All User Successfully',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 500,
        description: error,
      },
    })
  }
}
const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body

    const userValidation = userValidationSchema.parse(user)
    const result = await userService.createUser(userValidation)
    res.status(201).json({
      success: true,
      data: result,
      message: 'User Created Successfully',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    })
  }
}
const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId
    const result = await userService.getAllUser(id)
    res.status(200).json({
      success: true,
      data: result,
      message: 'Get User Success Fully',
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error,
      },
    })
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const id: string = req.params.userId
    const result = await userService.updateSingleUser(id, userData)
    res.status(200).json({
      success: true,
      data: result,
      message: 'Updated user successfully',
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error,
      },
    })
  }
}
const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId
    await userService.deleteSingleUser(id)
    res.status(200).json({
      success: true,
      data: null,
      message: 'User deleted successfully',
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error,
      },
    })
  }
}

const getOrders = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId
    const result = await userService.getOrders(id)
    res.status(200).json({
      success: true,
      data: result,
      message: 'Order Get successfully',
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}
const addOrders = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId
    const product = req.body
    await userService.addOrders(id, product)
    res.status(200).json({
      success: true,
      data: null,
      message: 'Order created successfully!',
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}
const totalPrice = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId
    const result = await userService.getTotalPrice(id)
    res.status(200).json({
      success: true,
      data: result,
      message: 'Get total Price successfully',
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

const userController = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getOrders,
  addOrders,
  totalPrice,
}
export default userController
