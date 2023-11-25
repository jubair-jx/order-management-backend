export interface TFullName {
  firstName: string
  lastName: string
}

export interface TAddress {
  street: string
  city: string
  country: string
}

export interface TProduct {
  productName: string
  price: number
  quantity: number
}
export type orders = Array<TProduct>
export default interface TUser {
  userId: number
  username: string
  password: string
  fullName: TFullName
  age: number
  email: string
  isActive: boolean
  hobbies?: string[]
  address: TAddress
  orders?: orders
}
