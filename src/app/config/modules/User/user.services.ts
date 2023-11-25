import { userModel } from '../user.model'
import { TUserData } from './user.interface'

const createUserIntoDB = async (user: TUserData) => {
  const result = await userModel.create(user)
  return result
}

export const userService = {
  createUserIntoDB,
}
