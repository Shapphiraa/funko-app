import { validators } from 'com'

const { validateEmail, validatePassword, validateCallback } = validators

export default function authenticateUser(email, password, callback) {
  validateEmail(email)
  validatePassword(password)
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

    const token = JSON.parse(json)

    // Antes de Mongodb lo hacíamos así: (ahora ya nos devuelve el userId directamente como string y no hay que destructurar)
    // const { userId } = JSON.parse(json);

    callback(null, token)
  }

  xhr.onerror = () => {
    callback(new Error('Connection error'))
  }

  xhr.open('POST', `${import.meta.env.VITE_API_URL}/users/auth`)

  xhr.setRequestHeader('Content-Type', 'application/json')

  const user = { email, password }
  const json = JSON.stringify(user)

  xhr.send(json)
}
