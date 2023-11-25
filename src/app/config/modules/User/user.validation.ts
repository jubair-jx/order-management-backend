import { z } from 'zod'

const userFullNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(20),
})

const userAddressValidationSchema = z.object({
  city: z.string().min(1).max(50),
  street: z.string().min(1).max(255),
  country: z.string().min(1).max(30),
})

const isValidUsername = (value: string) => /^[a-zA-Z0-9_-]+$/.test(value)

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(5).refine(isValidUsername, {
    message: 'Username must not contain spaces or symbols',
  }),
  password: z.string(),
  fullName: userFullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: userAddressValidationSchema,
})

export default userValidationSchema
