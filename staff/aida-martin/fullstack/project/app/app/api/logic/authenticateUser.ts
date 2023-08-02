import {
  validateEmail,
  validatePassword,
  ExistenceError,
  AuthError,
} from '../../../../com'

import { User } from '../../../data/models'
// const bcrypt = require('bcryptjs')

export default function authenticateUser(email: string, password: string) {
  validateEmail(email)
  validatePassword(password)

  return (async () => {
    const user = await User.findOne({ email })

    if (!user) throw new ExistenceError('User not found! 😥')

    // const match = await bcrypt.compare(password, user.password)

    if (password !== user.password) throw new AuthError('Wrong credentials! 😥')

    return user.id
  })()
}