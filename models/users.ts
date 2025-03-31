export type Apps = 'voicebridge' | 'tokei' | 'sky-survey'

export type User = {
  _id: string
  email: string
  joined: Date | string
  status: 'emailOnly' | 'activeCustomer' | 'formerCustomer' | 'doNotContact'
  usesApp: Apps[]
}
