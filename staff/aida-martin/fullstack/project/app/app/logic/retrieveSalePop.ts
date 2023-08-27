export interface PopForSale {
  tittle: string
  description: string
  condition: string
  images: string[]
  price: number
  id: string
  author: {
    id: string
    name: string
    avatar: string
  }
  pop: {
    variant: string
    exclusivity: string
    number: string
    category: {
      name: string
    }
    collect: string
  }
  date: string
  status: string
}

export default async function retrieveSalePop({
  id,
}: {
  id: string
}): Promise<PopForSale> {
  let url = `http://localhost:3000/api/trade/${id}`

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (res.status === 200) return await res.json()

  const { message } = await res.json()

  throw new Error(message)
}
