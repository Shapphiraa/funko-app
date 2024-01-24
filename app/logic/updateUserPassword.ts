import { validatePassword } from '../helpers'
import context from './context'

interface UpdateUserPasswordProps {
  password: string
  newPassword: string
  newPasswordConfirm: string
}

export default function updateUserPassword({
  password,
  newPassword,
  newPasswordConfirm,
}: UpdateUserPasswordProps) {
  validatePassword(password)
  validatePassword(newPassword, 'New password')
  validatePassword(newPasswordConfirm, 'Confirm new password')

  return (async () => {
    const res = await fetch(`http://localhost:3000/api/user/password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
      body: JSON.stringify({ password, newPassword, newPasswordConfirm }),
    })

    if (res.status === 204) return

    const { message } = await res.json()

    throw new Error(message)
  })()
}
