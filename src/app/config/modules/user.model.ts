import { Schema, model } from 'mongoose'
import {
  TAddressInfo,
  TFullName,
  TOrder,
  TUserData,
} from './User/user.interface'

//name schema information
const nameSchema = new Schema<TFullName>(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
      maxlength: [10, 'More than 10 characters are not allowed'],
      minlength: [3, 'More than 3 characters are not allowed'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required'],
      max: [10, 'More than 10 characters are not allowed'],
      min: [3, 'More than 3 characters are not allowed'],
      trim: true,
    },
  },
  {
    _id: false,
  },
)
//addressInformation
const addressInfoSchema = new Schema<TAddressInfo>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  {
    _id: false,
  },
)
//order information
const orderInfoSchema = new Schema<TOrder>(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false },
)
//main userSchema
const userSchema = new Schema<TUserData>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    type: nameSchema,
    required: true,
  },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  isActive: {
    type: String,
    enum: ['active', 'not'],
    default: 'active',
  },
  hobbies: { type: [String], required: true },
  address: addressInfoSchema,
  order: [orderInfoSchema],
})
//Now we will make a model based on this Schema
export const userModel = model<TUserData>('user', userSchema)
