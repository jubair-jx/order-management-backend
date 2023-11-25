import { userModel } from '../user.model'
import { TUserData } from './user.interface'

const createUserIntoDB = async (user: TUserData) => {
  const users = new userModel(user)
  if (await users.isUserExists(user.userId)) {
    throw new Error(`User ${user.userId} already exists`)
  }
  const result = await users.save()
  return result
}
//get all users from DB
const getAllUsersFromDB = async () => {
  const result = await userModel.find()
  return result
}
//get single user from DB
const getSingleUserFromDB = async (id: number) => {
  const result = await userModel.findOne({ userId: id })
  return result
}
//delete single user from DB
const deletedStudentFromDB = async (id: number) => {
  const result = await userModel.updateOne({ userId: id }, { isActive: false })
  return result
}
const updateUserDB = async (id: number, Userdata: object) => {
  const result = await userModel.updateOne(
    { userId: id, isActive: true },

    { $set: Userdata },
  )
  console.log(result)
  if (result.modifiedCount === 1) {
    const UpdatedResult = await userModel.findOne({ userId: id })
    return UpdatedResult
  }
}
export const userService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deletedStudentFromDB,
  updateUserDB,
}
