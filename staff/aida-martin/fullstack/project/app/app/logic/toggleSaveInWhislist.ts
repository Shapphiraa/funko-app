import { validateId } from '../helpers'
import context from './context'

export default function toggleSaveInWhislist({ id }: { id: string }) {
  validateId(id, 'Pop ID')

  return (async () => {
    const res = await fetch(`http://localhost:3000/api/pop/${id}/whislist`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
    })

    if (res.status === 204) return

    const { message } = await res.json()

    throw new Error(message)
  })()
}
