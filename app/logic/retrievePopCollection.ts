import context from './context'

export interface PopCollection {
  variant: string
  name: string
  images: string[]
  id: string
  userCollect: boolean
  userWhislist: boolean
}

export default async function retrievePopCollection(): Promise<
  PopCollection[]
> {
  const res = await fetch(`http://localhost:3000/api/pop/collection`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${context.token}`,
    },
  })

  if (res.status === 200) return await res.json()

  const { message } = await res.json()

  throw new Error(message)
}
