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
  isActive: 'active' | 'not'
  hobbies: string[]
  address: TAddressInfo
  order: Array<TOrder>
}
