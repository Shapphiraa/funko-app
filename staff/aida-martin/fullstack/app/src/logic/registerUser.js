import { validators, errors } from 'com'

const { validateName, validateEmail, validatePassword, validateCallback } =
  validators

export default function registerUser(
  name,
  email,
  password,
  repeatPassword,
  callback
) {
  validateName(name)
  validateEmail(email)
  validatePassword(password)

  //Contemplamos opción con callback y con fetch
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

    xhr.open('POST', `${import.meta.env.VITE_API_URL}/users`)

    xhr.setRequestHeader('Content-Type', 'application/json')

    const user = { name, email, password, repeatPassword }
    const json = JSON.stringify(user)

    xhr.send(json)

    return
  }

  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, repeatPassword }),
    })

    if (res.status === 201) return

    const { type, message } = await res.json()

    // No se pone class por ser palabra reserved
    const clazz = errors[type]

    throw new clazz(message)
  })()
}
