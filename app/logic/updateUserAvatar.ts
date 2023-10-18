import { validateString } from '../helpers'
import context from './context'

interface UpdateUserAvatarProps {
  avatar: string
}

export default function updateUserAvatar({ avatar }: UpdateUserAvatarProps) {
  validateString(avatar, 'Avatar')

  return (async () => {
    const res = await fetch(`http://localhost:3000/api/user/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
      body: JSON.stringify({ avatar }),
    })

    if (res.status === 204) return

    const { message } = await res.json()

    throw new Error(message)
  })()
}
