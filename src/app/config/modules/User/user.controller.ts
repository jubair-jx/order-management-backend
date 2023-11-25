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

export const userController = {
  createUser,
}
