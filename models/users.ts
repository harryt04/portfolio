export type HST_Apps = 'voicebridge' | 'tokei' | 'sky-survey' | 'pantryiq'
export const ALLOWED_APPS: HST_Apps[] = [
  'voicebridge',
  'tokei',
  'sky-survey',
  'pantryiq',
]

export type HST_APP_User = {
  _id: string
  email: string
  joined: Date | string
  status?: 'emailOnly' | 'activeCustomer' | 'formerCustomer' | 'doNotContact'
  usesApps?: HST_Apps[]
  // Personal info for personalization
  firstName?: string
  lastName?: string
  source?: string
  // Notes for manual entries by marketing team
  marketingNotes?: string
  allowsMarketingEmails?: boolean
}
