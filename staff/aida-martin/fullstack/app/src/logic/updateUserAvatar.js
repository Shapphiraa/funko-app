import { validators } from 'com'
import { saveUser, findUserById } from '../data'

const { validateId, validateUrl, validateCallback } = validators

/**
 * Updates user's avatar in database
 *
 * @param {string} userId The user's ID
 * @param {string} url The user's avatar
 */

export default function updateAvatar (userId, url, callback) {
  validateId(userId, 'User ID')
  validateUrl(url, 'Avatar url')
  validateCallback(callback)

  findUserById(userId, user => {
    if (!user) {
      callback(new Error('User not found 😥'))

      return
    }

    user.avatar = url

    saveUser(user, () => callback(null))
  })
}