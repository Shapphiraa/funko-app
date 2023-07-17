import { validators } from 'com'
import context from './context'

const { validateId, validateCallback } = validators

export default function retrievePost(postId, callback) {
  validateId(postId, 'Post ID')

  if (callback) {
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

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()

    return
  }

  return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${context.token}`,
    },
  }).then((res) => {
    if (res.status !== 200)
      return res.json().then(({ message: message }) => {
        throw new Error(message)
      })

    return res.json()
  })
}
