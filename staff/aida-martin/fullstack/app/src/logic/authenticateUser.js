import { validateEmail, validatePassword, validateCallback } from './helpers/validators'
import { findUserByEmail } from '../data'

/**
 * Authenticates a user by email and password
 *
 * @param {string} email The user's email
 * @param {string} password The user's password
 *
 * @returns {string} The user's id
 */

export default function authenticateUser (email, password, callback) {
  validateEmail(email)
  validatePassword(password)
  validateCallback(callback)

  findUserByEmail(email, user => {
    if (!user) {
      callback(new Error('User not found 😥',
        { cause: 'userError' }))

      return
    }

    if (user.password !== password) {
      callback(new Error('Wrong password 😥',
        { cause: 'userError' }))

      return
    }

    // el user.id que se mandaba por return ahora por callback
    callback(null, user.id)
  })
}
