import {
  validateEmail,
  validatePassword,
  ExistenceError,
  AuthError,
} from '../../../helpers'

import { User } from '../../data/models'
import bcrypt from 'bcryptjs'

interface AuthenticateUserProps {
  email: string
  password: string
}

/**
 * Authenticates a user against his/her credentials
 *
 * @param email The user email
 * @param password The user password
 * @returns The user ID
 *
 * @throws {TypeError} On non-string email or password
 * @throws {ContentError} On empty/ non-valid email or password
 * @throws {RangeError} On password length lower than 8 characters
 * @throws {ExistenceError} On non-existing user
 * @throws {AuthError} On wrong password
 */

export default function authenticateUser({
  email,
  password,
}: AuthenticateUserProps) {
  validateEmail(email)
  validatePassword(password)

  return (async () => {
    const user = await User.findOne({ email })

    if (!user) throw new ExistenceError('User not found! 😥')

    const match = await bcrypt.compare(password, user.password)

    if (!match) throw new AuthError('Wrong credentials! 😥')

    return user.id
  })()
}
