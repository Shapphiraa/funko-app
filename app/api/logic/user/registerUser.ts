import {
  validateString,
  validateEmail,
  validatePassword,
  DuplicityError,
  ContentError,
  UnknownError,
} from '../../../helpers'

import { User } from '../../data/models'
import bcrypt from 'bcryptjs'

interface RegisterUserProps {
  name: string
  email: string
  password: string
  repeatPassword: string
}

/**
 * Registers a new user
 *
 * @param name The user name
 * @param email The user email
 * @param password The user password
 * @param repeatPassword The user password again
 * @returns Promise
 *
 * @throws {TypeError} On non-string email, password or name
 * @throws {ContentError} On empty/ non-valid email, password or name. On password and repeat password does not match
 * @throws {RangeError} On password length lower than 8 characters
 * @throws {DuplicityError} On user already registered
 */

export default function registerUser({
  name,
  email,
  password,
  repeatPassword,
}: RegisterUserProps) {
  validateString(name, 'Name')
  validateEmail(email)
  validatePassword(password)
  validatePassword(repeatPassword, 'Repeat password field')

  if (password !== repeatPassword) {
    throw new ContentError('Passwords does not match 😢')
  }

  return (async () => {
    try {
      const hash = await bcrypt.hash(password, 10)

      await User.create({
        name,
        email,
        password: hash,
      })
    } catch (error: any) {
      if (error.message.includes('E11000'))
        throw new DuplicityError('You are already registered! Please login! 😅')

      throw new UnknownError(error.message)
    }
  })()
}
