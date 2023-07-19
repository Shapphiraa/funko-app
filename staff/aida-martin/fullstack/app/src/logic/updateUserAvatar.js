import { validators } from 'com'
import context from './context'

const { validateUrl, validateCallback } = validators

export default function updateUserAvatar(url, callback) {
  validateUrl(url, 'Avatar url')

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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/avatar`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    const data = { avatar: url }
    const json = JSON.stringify(data)

    xhr.send(json)

    return
  }

  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
      body: JSON.stringify({ avatar: url }),
    })

    if (res.status === 204) return

    const { type, message } = await res.json()

    const clazz = errors[type]

    throw new clazz(message)
  })()
}
