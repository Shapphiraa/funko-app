import { validatePhoneNumber } from '../helpers'
import context from './context'

interface UpdateUserPhoneNumberProps {
  phoneNumber: string
}

export default function updateUserPhoneNumber({
  phoneNumber,
}: UpdateUserPhoneNumberProps) {
  validatePhoneNumber(phoneNumber)

  return (async () => {
    const res = await fetch(`http://localhost:3000/api/user/phone-number`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
      body: JSON.stringify({ phoneNumber }),
    })

    if (res.status === 204) return

    const { message } = await res.json()

    throw new Error(message)
  })()
}
