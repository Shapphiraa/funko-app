import { validateId } from '../com'
import context from './context'

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
  userCollect: boolean
  userWhislist: boolean
}

export default function retrievePop({ id }: { id: string }): Promise<Pop> {
  validateId(id, 'Pop ID')

  return (async () => {
    let url = `http://localhost:3000/api/pop/${id}`
    let res

    if (context.token) {
      res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${context.token}`,
        },
      })
    } else {
      res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    if (res.status === 200) return await res.json()

    const { message } = await res.json()

    throw new Error(message)
  })()
}
