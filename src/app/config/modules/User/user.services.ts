import mongoose from 'mongoose'

import TUser, { TProduct } from './user.interface'
import user from '../user.model'
const getUsers = async () => {
  const result = await user.find()
  return result
}

const createUser = async (userData: TUser) => {
  const result = await user.create(userData)
  return result
}
const getAllUser = async (id: string) => {
  const result = await user.find({
    _id: new mongoose.Types.ObjectId(id),
    isActive: true,
  })
  return result
}

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
  createUser,
  getAllUser,
  updateSingleUser,
  deleteSingleUser,
  getOrders,
  addOrders,
  getTotalPrice,
}

export default userService
