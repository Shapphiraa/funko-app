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

export default async function retrieveSalePops(): Promise<PopForSale[]> {
  let url = 'http://localhost:3000/api/trade'

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (res.status === 200) return await res.json()

  const { message } = await res.json()

  throw new Error(message)
}
