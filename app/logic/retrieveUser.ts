import context from './context'

export interface User {
  name: string
  avatar: string
  email: string
  role: string
  phoneNumber?: string
  location?: string
}

export default async function retrieveUser(): Promise<User> {
  const res = await fetch(`http://localhost:3000/api/user`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${context.token}`,
    },
  })

  if (res.status === 200) return await res.json()

  const { message } = await res.json()

  throw new Error(message)
}
