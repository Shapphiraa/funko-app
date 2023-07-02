import { validators } from 'com'

const { validateToken, validateCallback } = validators

export default function retrieveSavedPosts(token, callback) {
  validateToken(token)
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
    const savedPosts = JSON.parse(json)

    callback(null, savedPosts)
  }

  xhr.onerror = () => {
    callback(new Error('Connection error'))
  }

  xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts/saved`)

  xhr.setRequestHeader('Authorization', `Bearer ${token}`)

  xhr.send()
}
