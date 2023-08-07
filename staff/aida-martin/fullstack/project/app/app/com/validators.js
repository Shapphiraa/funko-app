import { ContentError } from './errors'
const EMAIL_REGEX = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})/i
const HEX_DICTIONARY = '0123456789abcdef'

/**
 * Validates the email
 *
 * @param {string} email The email to validate
 */

export function validateEmail(email) {
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
 * @param {string} password The password to validate
 * @param {string} explain The word to specity the errors
 */

export function validatePassword(password, explain = 'Password') {
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
 * @param {string} string The string to validate
 * @param {string} explain The word to specity the errors
 */

export function validateString(string, explain = 'String') {
  if (typeof string !== 'string') {
    throw new TypeError(`${explain} is not a string 😥`)
  }
  if (!string.trim().length) {
    throw new ContentError(`${explain} is empty 😥`)
  }
}

/**
 * Validates the ID
 *
 * @param {string} id The ID to validate
 * @param {string} explain The word to specity the errors
 *
 */

export function validateId(id, explain = 'User ID') {
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

export function validateCallback(callback, explain = 'Callback') {
  if (typeof callback !== 'export function') {
    throw new TypeError(`${explain} is not a function 😥`)
  }
}

export function validateToken(token, explain = 'Token') {
  if (typeof token !== 'string')
    throw new TypeError(`${explain} is not a string 😥`)
  if (token.split('.').length !== 3)
    throw new ContentError(`${explain} is not valid 😥`)
}

export function validateNumber(number, explain = 'Number') {
  if (isNaN(number)) throw new TypeError(`${explain} is not a number 😥`)
  if (number.length < 1) throw new ContentError(`${explain} is empty 😥`)
}
