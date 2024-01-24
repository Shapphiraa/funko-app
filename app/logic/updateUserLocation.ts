import { validateString } from '../helpers'
import context from './context'

interface UpdateUserLocationProps {
  location: string
}

export default function updateUserPhoneNumber({
  location,
}: UpdateUserLocationProps) {
  validateString(location, 'Location')

  return (async () => {
    const res = await fetch(`http://localhost:3000/api/user/location`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
      body: JSON.stringify({ location }),
    })

    if (res.status === 204) return

    const { message } = await res.json()

    throw new Error(message)
  })()
}
