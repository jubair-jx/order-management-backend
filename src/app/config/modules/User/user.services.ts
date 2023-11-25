import mongoose from 'mongoose'

import TUser, { TProduct } from './user.interface'
import user from '../user.model'
//get all users
const getUsers = async () => {
  const result = await user.find()
  return result
}
//create a new user
const createNewUser = async (userData: TUser) => {
  const result = await user.create(userData)
  return result
}
// get a single user
const getSingleUser = async (id: string) => {
  const result = await user.find({
    _id: new mongoose.Types.ObjectId(id),
    isActive: true,
  })
  return result
}
//update a single user
const updateSingleUser = async (id: string, userData: object) => {
  const updatedData = await user.updateOne(
    {
      _id: new mongoose.Types.ObjectId(id),
      isActive: true,
    },
    { $set: userData },
  )
  if (updatedData.modifiedCount === 1) {
    const result = await user.find({
      _id: new mongoose.Types.ObjectId(id),
      isActive: true,
    })
    return result
  } else if (
    updatedData.modifiedCount === 0 &&
    updatedData.matchedCount === 1
  ) {
    return Promise.reject('You give Same data')
  } else {
    return Promise.reject('user Not Found')
  }
}
//delete a single user
const deleteSingleUser = async (id: string) => {
  const existUser = await user.findOne({
    _id: new mongoose.Types.ObjectId(id),
    isActive: true,
  })
  if (existUser) {
    const result = await user.findByIdAndUpdate(id, { isActive: false })

    return result
  } else {
    return Promise.reject('User not found')
  }
}
//get order function
const getOrders = async (id: string) => {
  const existUser = await user.findById(id)
  if (existUser) {
    const result = await user.findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { orders: -1 },
    )

    return result
  } else {
    return Promise.reject('User Not Found')
  }
}
//get add orders function
const addOrders = async (id: string, product: TProduct) => {
  const existUser = await user.findById(id)
  if (existUser && product) {
    await user.findByIdAndUpdate(
      id,
      {
        $push: { orders: product },
      },
      { new: true, runValidators: true },
    )

    return product
  }
}
//get total price functiona
const getTotalPrice = async (id: string) => {
  const existUser = await user.findById(id)
  if (existUser) {
    const totalPriceAggregate = await user.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      { $project: { orders: true } },
      { $unwind: '$orders' },
      {
        $addFields: {
          totalCostSingleProduct: {
            $multiply: ['$orders.price', '$orders.quantity'],
          },
        },
      },
      {
        $group: { _id: null, totalPrice: { $sum: '$totalCostSingleProduct' } },
      },
    ])
    const totalPrice = totalPriceAggregate[0].totalPrice

    return { totalPrice }
  } else {
    return Promise.reject('User Not found')
  }
}
const userService = {
  getUsers,
  createNewUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  getOrders,
  addOrders,
  getTotalPrice,
}

export default userService
