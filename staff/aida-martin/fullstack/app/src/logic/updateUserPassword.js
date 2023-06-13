import { validators } from 'com'
const { validateId, validatePassword, validateCallback } = validators

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
  validatePassword(newPasswordConfirm)
  validateCallback(callback)

  // eslint-disable-next-line no-undef
  const xhr = new XMLHttpRequest()

  xhr.onload = () => {
    const { status } = xhr

    if (status !== 204) {
      const { response: json } = xhr
      const { error } = JSON.parse(json)

      callback(new Error(error))

      return
    }

    callback(null)
  }

  xhr.onerror = () => {
    callback(new Error('Connection error'))
  }

  xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/password`)

  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

  const data = { password, newPassword, newPasswordConfirm }
  const json = JSON.stringify(data)

  xhr.send(json)
}
