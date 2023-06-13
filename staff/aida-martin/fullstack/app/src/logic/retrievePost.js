import { validators } from 'com'

const { validateId, validateCallback } = validators

/**
 * Retrieves a post from the database
 *
 * @param {string} userId The user's ID
 *
 * @returns {object} A post
 */

export default function retrievePost (userId, postId, callback) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')
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
    const post = JSON.parse(json)

    callback(null, post)
  }

  xhr.onerror = () => {
    callback(new Error('Connection error'))
  }

  xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts/${postId}`)

  xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

  xhr.send()
}
