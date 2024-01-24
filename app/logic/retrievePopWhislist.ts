import context from './context'

export interface PopWhislist {
  variant: string
  name: string
  images: string[]
  id: string
  userCollect: boolean
  userWhislist: boolean
}

export default async function retrievePopWhislist(): Promise<PopWhislist[]> {
  const res = await fetch(`http://localhost:3000/api/pop/whislist`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${context.token}`,
    },
  })

  if (res.status === 200) return await res.json()

  const { message } = await res.json()

  throw new Error(message)
}
