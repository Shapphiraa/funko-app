import { validators } from 'com'
import context from './context'

const { validateId, validateCallback } = validators

export default function buyPost(postId, price, callback) {
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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}/sale`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    const data = { price }
    const json = JSON.stringify(data)

    xhr.send(json)

    return
  }

  return (async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/${postId}/sale`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${context.token}`,
        },
        body: JSON.stringify({ price }),
      }
    )

    if (res.status === 204) return

    const { type, message } = await res.json()

    const clazz = errors[type]

    throw new clazz(message)
  })()
}
