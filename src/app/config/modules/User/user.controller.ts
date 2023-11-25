import { Request, Response } from 'express'
import { userService } from './user.services'
import userDataValidationSchema from './user.validation'

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.user
    //data validation with zod
    const zodParseData = userDataValidationSchema.parse(user)
    const result = await userService.createUserIntoDB(zodParseData)
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(401).json({
      success: false,
      message: err.message || 'Something has wrong',
      error: err,
    })
  }

  //will call service function to send data
}
//get all users
const getAllusers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersFromDB()

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(401).json({
      success: false,
      message: err.message || 'Something has wrong',
      error: err,
    })
  }
}
//get single users
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    // console.log(typeof userId)
    // const id = Number(userId)
    // console.log(studentId)
    const result = await userService.getSingleUserFromDB(Number(userId))
    res.status(200).json({
      success: true,
      message: 'Single User Data Fetch done',
      data: result,
    })
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User Not Found',
      error: err,
    })
  }
}
//get single Data delete from DB
const deletedSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const result = await userService.deletedStudentFromDB(Number(userId))
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(401).json({
      success: false,
      message: err.message || 'Something has wrong',
      error: err,
    })
  }
}
//get update data from DB
const updateUserInfoDB = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const body = req.body
    const result = await userService.updateUserDB(Number(userId), body)
    res.status(200).json({
      success: true,
      message: 'User Updated successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(401).json({
      success: false,
      message: err.message || 'Something has wrong',
      error: err,
    })
  }
}
export const userController = {
  createUser,
  getAllusers,
  getSingleUser,
  deletedSingleUser,
  updateUserInfoDB,
}
