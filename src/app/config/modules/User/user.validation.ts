import { z } from 'zod'

// Define Zod schema for TFullName
const fullNameValidationSchema = z.object({
  firstName: z.string().min(3).max(10),
  lastName: z.string().min(3).max(10),
})

// Define Zod schema for TAddressInfo
const addressInfoValidationSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
})

// Define Zod schema for TOrder
const orderValidationSchema = z.object({
  productName: z.string().min(1),
  price: z.number(),
  quantity: z.number(),
})

// Define Zod schema for TUserData
export const userDataValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string().max(20),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1)),
  address: addressInfoValidationSchema,
  order: z.array(orderValidationSchema),
})
export default userDataValidationSchema
