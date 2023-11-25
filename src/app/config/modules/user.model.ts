import { Schema, model } from 'mongoose'
import {
  TAddressInfo,
  TFullName,
  TOrder,
  TUserData,
  userMethods,
  userTypeModel,
} from './User/user.interface'
import bcrypt from 'bcrypt'
import config from '..'
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
const userSchema = new Schema<TUserData, userTypeModel, userMethods>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    maxlength: [20, 'Password More than 20 Charc Will be Accepted'],
  },
  fullName: {
    type: nameSchema,
    required: true,
  },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  isActive: {
    type: Boolean,

    default: false,
  },
  hobbies: { type: [String], required: true },
  address: addressInfoSchema,
  order: [orderInfoSchema],
})
//pre save middleware will on create

userSchema.pre('save', async function (next) {
  //hashing password and save into DB
  const user = this
  user.password = await bcrypt.hash(user.password, Number(config.saltKey))

  next()
})

userSchema.post('save', function (doc, next) {
  // console.log(this, "Post hook : we saved our Data");
  doc.password = undefined as unknown as string
  doc.order = undefined as unknown as []
  next()
})

userSchema.methods.isUserExists = async function (id: number) {
  const existingUser = await userModel.findOne({ userId: id })
  return existingUser
}

userSchema.pre('find', function (next) {
  this.find({ isActive: { $eq: true } }).projection({ order: false })

  next()
})
userSchema.pre('findOne', function (next) {
  // console.log(next);
  this.find({ isActive: { $ne: false } }).projection({ order: false })
  next()
})
userSchema.pre('aggregate', function (next) {
  // console.log(next);
  // this.find({ isDeleted: { $ne: true } });
  this.pipeline().unshift({ $match: { isActive: { $ne: true } } })
  next()
})

//Now we will make a model based on this Schema
export const userModel = model<TUserData, userTypeModel>('user', userSchema)
