import { validateId, validatePassword, validateCallback } from './helpers/validators'
import { saveUser, findUserById } from '../data'

/**
 * Updates user's password in database
 *
 * @param {string} userId The user's ID
 * @param {string} password The user's current password
 * @param {string} newPassword The user's new password
 * @param {string} newPasswordConfirm The user's new password
 */

export default function changePassword (
  userId,
  password,
  newPassword,
  newPasswordConfirm,
  callback
) {
  validateId(userId, 'User ID')
  validatePassword(password)
  validatePassword(newPassword, 'New password')
  validatePassword(password)
  validateCallback(callback)

  if (newPassword !== newPasswordConfirm) { throw new Error('New passwords do not match 😥', { cause: 'userError' }) }
  if (newPassword === password) {
    throw new Error('Your new password matches the current one 😥', {
      cause: 'userError'
    })
  }
  if (!newPasswordConfirm.length) {
    throw new Error('You have not confirm your new password 😥', {
      cause: 'userError'
    })
  }
  if (newPassword.length < 8) {
    throw new Error('Your password does not have 8 characters 😥', {
      cause: 'userError'
    })
  }

  findUserById(userId, user => {
    if (!user) {
      callback(new Error('User not found 😥', { cause: 'userError' }))

      return
    }

    if (password !== user.password) {
      callback(new Error('Wrong password 😥', { cause: 'userError' }))

      return
    }

    user.password = newPassword

    saveUser(user, () => callback(null))
  })
}
