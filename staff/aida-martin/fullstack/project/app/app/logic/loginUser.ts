import context from './context'

// const { validateEmail, validatePassword, validateCallback } = validators

interface loginUserProps {
  email: string
  password: string
}

export default function loginUser({
  email,
  password,
}: loginUserProps): Promise<void> {
  // validateEmail(email)
  // validatePassword(password)

  return (async () => {
    const res = await fetch('http://localhost:3000/api/users/auth', {
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
