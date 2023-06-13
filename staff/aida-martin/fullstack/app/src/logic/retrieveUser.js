import { validators } from 'com'

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

  // eslint-disable-next-line no-undef
  const xhr = new XMLHttpRequest()

  xhr.onload = () => {
    const { status } = xhr

    if (status !== 200) {
      const { response: json } = xhr
      const { error } = JSON.parse(json)

      callback(new Error(error))

      return
    }

    const { response: json } = xhr
    const user = JSON.parse(json)

    callback(null, user)
  }

  xhr.onerror = () => {
    callback(new Error('Connection error'))
  }

  xhr.open('GET', `${import.meta.env.VITE_API_URL}/users`)

  xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

  xhr.send()
}
