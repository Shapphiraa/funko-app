import context from '../logic/context'

import { validateEmail, validatePassword } from '../helpers'

interface LoginUserProps {
  email: string
  password: string
}

export default function loginUser({
  email,
  password,
}: LoginUserProps): Promise<void> {
  validateEmail(email)
  validatePassword(password)

  return (async () => {
    const res = await fetch('http://localhost:3000/api/user/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (res.status === 200) {
      const token = await res.json()

      context.token = token

      return
    }

    const { message } = await res.json()

    throw new Error(message)
  })()
}
