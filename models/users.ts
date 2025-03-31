export type HST_Apps = 'voicebridge' | 'tokei' | 'sky-survey'

export type HST_APP_User = {
  _id: string
  email: string
  joined: Date | string
  status: 'emailOnly' | 'activeCustomer' | 'formerCustomer' | 'doNotContact'
  usesApp: HST_Apps[]
}
