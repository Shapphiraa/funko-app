import context from './context'

export default async function retrieveUserRole(): Promise<string> {
  const res = await fetch(`http://localhost:3000/api/user/role`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${context.token}`,
    },
  })

  if (res.status === 200) return await res.json()

  const { message } = await res.json()

  throw new Error(message)
}
