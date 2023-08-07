import { validateId } from '../com'

export interface Pop {
  variant: string
  exclusivity: string
  name: string
  images: string[]
  category: {
    name: string
  }
  id: string
  collect: string
  release: string
  availability: string
  trendingValue: number
  userCollect: []
  userWhislist: []
}

export default function retrievePop({ id }: { id: string }): Promise<Pop> {
  validateId(id, 'Pop ID')

  return (async () => {
    const res = await fetch(`http://localhost:3000/api/pop/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.status === 200) return await res.json()

    const { message } = await res.json()

    throw new Error(message)
  })()
}
