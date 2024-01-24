import { validateEmail } from '../helpers'
import context from './context'

interface UpdateUserEmailProps {
  email: string
}

export default function updateUserEmail({ email }: UpdateUserEmailProps) {
  validateEmail(email)

  return (async () => {
    const res = await fetch(`http://localhost:3000/api/user/email`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
      body: JSON.stringify({ email }),
    })

    if (res.status === 204) return

    const { message } = await res.json()

    throw new Error(message)
  })()
}
