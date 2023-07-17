import { validators } from 'com'
import context from './context'

const { validatePassword, validateCallback } = validators

export default function updateUserPassword(
  password,
  newPassword,
  newPasswordConfirm,
  callback
) {
  validatePassword(password)
  validatePassword(newPassword, 'New password')
  validatePassword(newPasswordConfirm)

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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/password`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    const data = { password, newPassword, newPasswordConfirm }
    const json = JSON.stringify(data)

    xhr.send(json)

    return
  }

  return fetch(`${import.meta.env.VITE_API_URL}/users/password`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${context.token}`,
    },
    body: JSON.stringify({ password, newPassword, newPasswordConfirm }),
  }).then((res) => {
    if (res.status !== 204)
      return res.json().then(({ message: message }) => {
        throw new Error(message)
      })
  })
}
