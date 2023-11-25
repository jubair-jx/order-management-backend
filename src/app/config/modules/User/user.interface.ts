import { Model } from 'mongoose'

//single type
export type TFullName = {
  firstName: string
  lastName: string
}
export type TOrder = {
  productName: string
  price: number
  quantity: number
}

export type TAddressInfo = {
  street: string
  city: string
  country: string
}
//single data of user details
export type TUserData = {
  userId: number
  username: string
  password: string
  fullName: TFullName
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: TAddressInfo
  order: Array<TOrder>
}

export type userMethods = {
  isUserExists(id: number): Promise<TUserData | null>
}
export type userTypeModel = Model<TUserData, Record<string, never>, userMethods>
