import { validators } from 'com'
const { validateId, validateUrl, validateText, validateCallback } = validators

/**
 * Creates a new post, creates an ID for it and saves it in database
 *
 * @param {string} userId The user's ID (Post author)
 * @param {string} image The post's image
 * @param {string} text The post's text
 */

export default function createPost (userId, image, text, callback) {
  validateId(userId, 'User ID')
  validateUrl(image, 'Image URL')
  validateText(text)
  validateCallback(callback)

  // eslint-disable-next-line no-undef
  const xhr = new XMLHttpRequest()

  xhr.onload = () => {
    const { status } = xhr

    if (status !== 201) {
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

  xhr.open('POST', `${import.meta.env.VITE_API_URL}/posts`)

  xhr.setRequestHeader('Content-Type', 'application/json')

  const post = { userId, image, text }
  const json = JSON.stringify(post)

  xhr.send(json)
}
