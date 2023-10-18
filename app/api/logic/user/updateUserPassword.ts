import {
  validateId,
  validatePassword,
  ContentError,
  ExistenceError,
  AuthError,
} from '../../../helpers'

import { User } from '../../data/models'

interface UpdateUserPasswordProps {
  userId: string
  password: string
  newPassword: string
  newPasswordConfirm: string
}

/**
 * Updates the user password
 *
 * @param userId The user id
 * @param password The user current password
 * @param newPassword The user new password
 * @param newPasswordConfirm The user new password again
 * @returns Promise
 *
 * @throws {TypeError} On non-string user id, password, new password or new password confirm
 * @throws {ContentError} On user id does not have 24 characters or is not valid (hexadecimal). On empty password, new password or new password confirm. On new password matches the current password
 * @throws {RangeError} On password, new password or new password confirm length is lower than 8 characters. On new password and new password confirm does not match
 * @throws {ExistenceError} On non-existing user
 * @throws {AuthError} On wrong password
 */

export default function updateUserPassword({
  userId,
  password,
  newPassword,
  newPasswordConfirm,
}: UpdateUserPasswordProps) {
  validateId(userId, 'User ID')
  validatePassword(password)
  validatePassword(newPassword, 'New password')
  validatePassword(newPasswordConfirm, 'Confirm new password')

  if (newPassword !== newPasswordConfirm)
    throw new ContentError('Passwords does not match 😥')

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😥')

    if (user.password !== password) throw new AuthError('Wrong password! 😥')

    if (user.password === newPassword)
      throw new ContentError('Your new password matches the current one 😥')

    user.password = newPassword

    await user.save()
  })()
}
