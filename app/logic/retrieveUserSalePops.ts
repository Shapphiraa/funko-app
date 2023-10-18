import context from './context'

export interface PopForSale {
  images: string[]
  price: number
  id: string
  author: {
    id: string
    name: string
    avatar: string
  }
  pop: {
    name: string
  }
  status: string
}

export default async function retrieveUserSalePops(): Promise<PopForSale[]> {
  const res = await fetch(`http://localhost:3000/api/trade/user`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${context.token}`,
    },
  })

  if (res.status === 200) return await res.json()

  const { message } = await res.json()

  throw new Error(message)
}
