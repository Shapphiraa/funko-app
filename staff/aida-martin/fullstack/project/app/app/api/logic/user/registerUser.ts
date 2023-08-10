import {
  validateString,
  validateEmail,
  validatePassword,
  DuplicityError,
  ContentError,
  UnknownError,
} from '../../../com'

import { User } from '../../../../data/models'
// const bcrypt = require('bcryptjs')

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

  if (password !== repeatPassword)
    throw new ContentError('Passwords does not match 😢')

  return (async () => {
    try {
      await User.create({
        name,
        email,
        password,
        avatar: null,
      })
    } catch (error: any) {
      if (error.message.includes('E11000'))
        throw new DuplicityError('You are already registered! Please login! 😅')

      throw new UnknownError(error.message)
    }
  })()
}
