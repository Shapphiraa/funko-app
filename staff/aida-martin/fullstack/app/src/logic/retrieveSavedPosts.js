import { validators } from 'com'

const { validateId, validateCallback } = validators

/**
 * Retrieves user's saved posts of the user from the database
 *
 * @param {string} userId The user's ID
 * @param {boolean} mySavedPosts If it refers to the saved posts or not
 *
 * @returns {string array} Array of user's saved posts
 */

export default function retrieveSavedPosts (userId, callback) {
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
    const savedPosts = JSON.parse(json)

    callback(null, savedPosts)
  }

  xhr.onerror = () => {
    callback(new Error('Connection error'))
  }

  xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts/saved`)

  xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

  xhr.send()
}
