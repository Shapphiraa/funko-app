import {
  validateId,
  validatePassword,
  ContentError,
  ExistenceError,
  AuthError,
} from '../../../com'

import { User } from '../../../../data/models'

interface UpdateUserPasswordProps {
  userId: string
  password: string
  newPassword: string
  newPasswordConfirm: string
}

export default function updateUserPassword({
  userId,
  password,
  newPassword,
  newPasswordConfirm,
}: UpdateUserPasswordProps) {
  validateId(userId, 'User ID')
  validatePassword(password)
  validatePassword(newPassword, 'New password')

  if (newPassword !== newPasswordConfirm)
    throw new ContentError('Passwords does not match 😢')

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😥')

    if (user.password !== password) throw new AuthError('Wrong password! 😢')

    if (user.password === newPassword)
      throw new ContentError('Your new password matches the current one 😥')

    await User.updateOne({ _id: userId }, { $set: { password: newPassword } })
  })()
}