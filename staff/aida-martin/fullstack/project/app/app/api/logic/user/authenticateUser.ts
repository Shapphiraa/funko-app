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

export default function authenticateUser({
  email,
  password,
}: AuthenticateUserProps) {
  validateEmail(email)
  validatePassword(password)

  return (async () => {
    const user = await User.findOne({ email })

    if (!user) throw new ExistenceError('User not found! 😥')

    // const match = await bcrypt.compare(password, user.password)

    // if (!match) throw new AuthError('Wrong credentials! 😥')

    if (password !== user.password) throw new AuthError('Wrong credentials! 😥')

    return user.id
  })()
}
