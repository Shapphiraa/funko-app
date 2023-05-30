import {
  validateName,
  validateEmail,
  validatePassword,
  validateCallback
} from './helpers/validators'
import { loadUsers, saveUsers, findUserByEmail } from '../data'

/**
 * Registers a new user with their name, email and password. Updates database
 *
 * @param {string} name The user's name
 * @param {string} email The user's email
 * @param {string} password The user's password
 * @param {string} repeatPassword The user's password
 */

export default function registerUser (name, email, password, repeatPassword, callback) {
  validateName(name)
  validateEmail(email)
  validatePassword(password)
  validateCallback(callback)

  if (password !== repeatPassword) {
    throw new Error('Passwords do not match 😢', {
      cause: 'userError'
    })
  }

  findUserByEmail(email, foundUser => {
    if (foundUser) {
      callback(new Error('You are already registered! Please login! 😅', {
        cause: 'userError'
      }))

      return
    }

    let id = 'user-1'

    loadUsers(users => {
      const lastUser = users[users.length - 1]

      if (lastUser) {
        id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)
      }

      const user = {
        id,
        name,
        email,
        password,
        saves: []
      }

      users.push(user)

      // el null de que "no ha habido error"
      saveUsers(users, () => callback(null))
    })
  })
}
