import { validators } from 'com'

const { validateId, validateCallback } = validators
/**
 * Retrieves all posts from the database
 *
 * @param {string} userId The user's ID
 *
 * @returns {object array} All posts sorted by creation
 */

export default function retrievePosts (userId, callback) {
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
    const posts = JSON.parse(json)

    callback(null, posts)
  }

  xhr.onerror = () => {
    callback(new Error('Connection error'))
  }

  xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts`)

  xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

  xhr.send()
}
