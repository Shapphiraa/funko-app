import { validators } from 'com'

const { validateToken, validateCallback } = validators

export default function retrieveUser(token, callback) {
  validateToken(token)

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
      const user = JSON.parse(json)

      callback(null, user)
    }

    xhr.onerror = () => {
      callback(new Error('Connection error'))
    }

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/users`)

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()

    return
  }

  return fetch(`${import.meta.env.VITE_API_URL}/users/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.status !== 200)
      return res.json().then(({ error: message }) => {
        throw new Error(message)
      })

    return res.json()
  })
}
