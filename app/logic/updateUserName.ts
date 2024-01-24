import { validateString } from '../helpers'
import context from './context'

interface UpdateUserNameProps {
  name: string
}

export default function updateUserName({ name }: UpdateUserNameProps) {
  validateString(name, 'Name')

  return (async () => {
    const res = await fetch(`http://localhost:3000/api/user/name`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
      body: JSON.stringify({ name }),
    })

    if (res.status === 204) return

    const { message } = await res.json()

    throw new Error(message)
  })()
}
