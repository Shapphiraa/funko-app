// const {
//   validators: { validateName, validateEmail, validatePassword },
//   errors: { DuplicityError, ContentError, UnknownError },
// } = require('com')

import { User } from '../../../data/models'
// const bcrypt = require('bcryptjs')

export default function registerUser(
  name: string,
  email: string,
  password: string,
  repeatPassword: string
) {
  // validateName(name)
  // validateEmail(email)
  // validatePassword(password)

  if (password !== repeatPassword)
    throw new Error('Passwords does not match 😢')

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
        throw new Error('You are already registered! Please login! 😅')

      throw new Error(error.message)
    }
  })()
}
