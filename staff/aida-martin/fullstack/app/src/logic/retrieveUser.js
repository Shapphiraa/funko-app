import { validators } from 'com'
import { findUserById } from '../data'

const { validateId, validateCallback } = validators

/**
 * Retrieves the current user
 *
 * @param {string} userId The user's ID
 *
 * @returns {object} The current user
 */

export default function retrieveUser (userId, callback) {
  validateId(userId, 'User ID')
  validateCallback(callback)

  findUserById(userId, user => {
    if (!user) {
      callback(new Error('User not found 😥', { cause: 'userError' }))

      return
    }

    const _user = {
      name: user.name.split(' ')[0],
      avatar: user.avatar
    }

    const avatar = user.avatar

    if (user.avatar) {
      _user.avatar = avatar
    }

    callback(null, _user)
  })
}
