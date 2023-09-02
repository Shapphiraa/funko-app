import { validateString, validateEmail, validatePassword } from '../helpers'

interface RegisterUserProps {
  name: string
  email: string
  password: string
  repeatPassword: string
}

export default function registerUser({
  name,
  email,
  password,
  repeatPassword,
}: RegisterUserProps): Promise<void> {
  validateString(name, 'Name')
  validateEmail(email)
  validatePassword(password)
  validatePassword(repeatPassword, 'Repeat password field')

  return (async () => {
    const res = await fetch(`http://localhost:3000/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, repeatPassword }),
    })

    if (res.status === 201) return

    const { message } = await res.json()

    throw new Error(message)
  })()
}
