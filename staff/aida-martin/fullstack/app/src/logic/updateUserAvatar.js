import { validators } from 'com'
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

  xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/${userId}/avatar`)

  xhr.setRequestHeader('Content-Type', 'application/json')

  const data = { avatar: url }
  const json = JSON.stringify(data)

  xhr.send(json)
}
