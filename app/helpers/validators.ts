import { ContentError } from './errors'
const EMAIL_REGEX = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})/i
const HEX_DICTIONARY = '0123456789abcdef'
const PHONE_NUMBER_REGEX = /(^\+?(6\d{2}|7[1-9]\d{1})\d{6}$)/

/**
 * Validates the email
 *
 * @param email The email to validate
 */

export function validateEmail(email: string) {
  if (typeof email !== 'string') {
    throw new TypeError('Email is not a string 😥')
  }
  if (!email.trim().length) {
    throw new ContentError('Email is empty 😥')
  }

  if (!EMAIL_REGEX.test(email)) {
    throw new ContentError('Email is not valid 😥')
  }
}

/**
 * Validates the password
 *
 * @param password The password to validate
 * @param explain The word to specity the errors
 */

export function validatePassword(password: string, explain = 'Password') {
  if (typeof password !== 'string') {
    throw new TypeError(`${explain} is not a string 😥`)
  }
  if (!password.trim().length) {
    throw new ContentError(`${explain} is empty 😥`)
  }
  if (password.length < 8) {
    throw new RangeError(`${explain} does not have 8 characters 😥`)
  }
}

/**
 * Validates a string
 *
 * @param string The string to validate
 * @param explain The word to specity the errors
 */

export function validateString(string: string, explain: string) {
  if (typeof string !== 'string') {
    throw new TypeError(`${explain} is not a string 😥`)
  }
  if (!string.trim().length) {
    throw new ContentError(`${explain} is empty 😥`)
  }
}

/**
 * Validates a description
 *
 * @param description The description to validate
 * @param explain The word to specity the errors
 */

export function validateDescription(
  description: string,
  explain = 'Description'
) {
  if (typeof description !== 'string') {
    throw new TypeError(`${explain} is not a string 😥`)
  }
  if (!description.trim().length) {
    throw new ContentError(`${explain} is empty 😥`)
  }
  if (description.trim().length < 50) {
    throw new RangeError(`${explain} does not have 20 characters 😥`)
  }
}

/**
 * Validates the ID
 *
 * @param id The ID to validate
 * @param explain The word to specity the errors
 *
 */

export function validateId(id: string, explain = 'User ID') {
  if (typeof id !== 'string') {
    throw new TypeError(`${explain} is not a string 😥`)
  }
  if (id.trim().length !== 24) {
    throw new ContentError(`${explain} does not have 24 characters 😥`)
  }

  for (let i = 0; i < id.length; i++) {
    const char = id[i]

    if (!HEX_DICTIONARY.includes(char))
      throw new ContentError(`${explain} is not hexadecimal 😥`)
  }
}

/**
 * Validates a number
 *
 * @param number The number to validate
 * @param explain The word to specity the errors
 *
 */

export function validateNumber(number: number, explain = 'Number') {
  if (isNaN(number)) throw new TypeError(`${explain} is not a number 😥`)
  if (!number.toString().trim().length)
    throw new ContentError(`${explain} is empty 😥`)
}

/**
 * Validates the phone number
 *
 * @param phoneNumber The phone number to validate
 * @param explain The word to specity the errors
 *
 */

export function validatePhoneNumber(
  phoneNumber: string,
  explain = 'Phone Number'
) {
  if (!phoneNumber.trim().length)
    throw new ContentError(`${explain} is empty 😥`)

  if (!PHONE_NUMBER_REGEX.test(phoneNumber.replaceAll(' ', ''))) {
    throw new ContentError('Phone number is not valid 😥')
  }
}
