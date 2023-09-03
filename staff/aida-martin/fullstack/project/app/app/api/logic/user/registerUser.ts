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
