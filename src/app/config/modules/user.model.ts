import { Schema, model } from 'mongoose'

import bcrypt from 'bcrypt'

import TUser, { TAddress, TFullName, TProduct } from './User/user.interface'
import config from '..'

const userFullNameSchema = new Schema<TFullName>(
  {
    firstName: {
      type: String,
      required: [true, 'You did not Provide Your First Name '],
    },
    lastName: {
      type: String,
      required: [true, 'You did not Provide Your Last Name '],
    },
  },
  { _id: false },
)

const userAddressSchema = new Schema<TAddress>(
  {
    city: { type: String, required: [true, 'Please Provide Your City'] },
    street: { type: String, required: [true, 'Please Provide Your Street'] },
    country: { type: String, required: [true, 'Please Provide Your Country'] },
  },
  { _id: false },
)

const productSchema = new Schema<TProduct>(
  {
    productName: {
      type: String,
      required: [true, 'you must Provide a Product Name'],
    },
    price: { type: Number, required: [true, 'You Must provide a Price'] },
    quantity: {
      type: Number,
      required: [true, 'You Must Provide Quantity'],
      default: 1,
    },
  },
  { _id: false },
)

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, 'Please Provide Your User'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Please Provide Username'],
    unique: true,
    minlength: [5, 'you user at least 5 character'],
  },
  password: { type: String },
  fullName: {
    type: userFullNameSchema,
    required: [true, 'Please Provide Full Name'],
  },
  age: { type: Number, required: [true, 'Please Provide Your Age'] },
  email: {
    type: String,
    required: [true, 'Please Provide Your Email'],
    unique: true,
  },
  isActive: {
    type: Boolean,
    required: [true, 'Please Activate'],
    default: true,
  },
  hobbies: [],
  address: {
    type: userAddressSchema,
    required: [true, 'Please Provide Your Address'],
  },
  orders: [productSchema],
})
userSchema.pre('save', async function (next) {
  const user = this
  user.password = await bcrypt.hash(user.password, Number(config.saltKey))
  next()
})
// userSchema.pre('findOneAndUpdate', { document: true }, async function (next) {
//   const user = this;
//   console.log(this);
// });
userSchema.post('save', function (doc, next) {
  doc.password = undefined as unknown as string
  doc.orders = undefined as unknown as []
  next()
})
userSchema.pre('find', function (next) {
  this.find({ isActive: { $ne: false } }).projection({
    password: false,
    orders: false,
  })
  next()
})
userSchema.pre('findOne', async function (next) {
  this.findOne({ isActive: { $ne: false } }).projection({
    orders: true,
    _id: false,
  })
  next()
})

const user = model<TUser>('user', userSchema)
export default user
