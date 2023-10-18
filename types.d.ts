export const FIELD_NAME = 'name'
export const FIELD_EMAIL = 'email'
export const FIELD_PHONE = 'phone'
export const FIELD_LOCATION = 'location'
export const FIELD_PASSWORD = 'password'

export type FieldType =
  | typeof FIELD_NAME
  | typeof FIELD_EMAIL
  | typeof FIELD_PHONE
  | typeof FIELD_LOCATION
  | typeof FIELD_PASSWORD

export interface PersonalInfo {
  label: string
  value: string
  field: FieldType
}
