export type User = {
  _id: string
  email: string
  joined: Date | string
  status: 'activeCustomer' | 'formerCustomer' | 'doNotContact'
}
