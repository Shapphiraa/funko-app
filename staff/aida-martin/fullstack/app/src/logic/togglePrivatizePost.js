import { validators } from 'com'

const { validateId, validateCallback } = validators

export default function togglePrivatizePost(userId, postId, callback) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')
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

  xhr.open(
    'PATCH',
    `${import.meta.env.VITE_API_URL}/posts/${postId}/visibility`
  )

  xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

  xhr.send()
}
