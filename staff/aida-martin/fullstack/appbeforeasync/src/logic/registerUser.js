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

  return fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, repeatPassword }),
  }).then((res) => {
    if (res.status !== 201) {
      return res.json().then(({ type, message }) => {
        // Con [type] llamamos al constructor para que venga el tipo de error (es como errors.type)
        throw new errors[type](message)
      })
    }
  })
}
