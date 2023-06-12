import { validators } from 'com'

const { validateId, validateUrl, validateText, validateCallback } = validators

/**
 * Updates post's data in database
 *
 * @param {string} userId The user's ID
 * @param {string} postId The post's ID
 * @param {string} image The post's image
 * @param {string} text The post's text
 */

export default function updatePost (userId, postId, image, text, callback) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')
  validateUrl(image, 'Image URL')
  validateText(text, 'Text')
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

  xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}`)

  xhr.setRequestHeader('Content-Type', 'application/json')

  const data = { userId, image, text }
  const json = JSON.stringify(data)

  xhr.send(json)
}
