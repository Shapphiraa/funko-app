import { validators } from 'com'
import context from './context'

const { validateId, validateCallback } = validators

export default function buyPost(postId, callback) {
  validateId(postId, 'Post ID')

  if (callback) {
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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}/buy`)

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()

    return
  }

  return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/buy`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${context.token}`,
    },
  }).then((res) => {
    if (res.status !== 204)
      return res.json().then(({ message: message }) => {
        throw new Error(message)
      })
  })
}
