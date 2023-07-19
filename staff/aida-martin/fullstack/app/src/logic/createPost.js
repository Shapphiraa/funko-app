import { validators } from 'com'
import context from './context'

const { validateUrl, validateText, validateCallback } = validators

export default function createPost(image, text, callback) {
  validateUrl(image, 'Image URL')
  validateText(text)

  if (callback) {
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
    //Este token con callbacks ahora no va a funcionar después de haber puesto estado interno...
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    const post = { image, text }
    const json = JSON.stringify(post)

    xhr.send(json)

    return
  }

  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
      body: JSON.stringify({ image, text }),
    })

    if (res.status === 201) return

    const { type, message } = await res.json()

    const clazz = errors[type]

    throw new clazz(message)
  })()
}
