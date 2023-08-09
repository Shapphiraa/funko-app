import context from './context'

export interface Pop {
  variant: string
  name: string
  images: string[]
  category: string
  id: string
  userCollect: boolean
  userWhislist: boolean
}

export default async function retrievePops({
  slug,
}: {
  slug?: string
}): Promise<Pop[]> {
  let url = 'http://localhost:3000/api/pop'
  let res

  if (slug) {
    url += `?slug=${slug}`
  }

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
}
