import { validators } from 'com'
import context from './context'

const { validateEmail, validatePassword, validateCallback } = validators

export default function loginUser(email, password, callback) {
  validateEmail(email)
  validatePassword(password)

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

    return
  }

  return (
    fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.status !== 200)
          return res.json().then(({ message: message }) => {
            throw new Error(message)
          })

        return res.json()
      })
      //Esto lo hacemos para convertir las lógicas (manejando estado interno). Guardamos estado ahora con el token. Las llaves se ponen para no devolver nada fuera de la lógica
      .then((token) => {
        context.token = token
      })
  )
}
