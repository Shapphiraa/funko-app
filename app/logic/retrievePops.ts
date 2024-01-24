import { validateString } from '../helpers'
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
  search,
}: {
  slug?: string
  search?: string
}): Promise<Pop[]> {
  let url = 'http://localhost:3000/api/pop'
  let res

  const params: { slug?: string; search?: string } = {}

  if (slug) {
    validateString(slug, 'Slug param')
    params.slug = slug
  }

  if (search) {
    validateString(search, 'Search param')
    params.search = search
  }

  const urlParams = new URLSearchParams(params).toString()

  if (urlParams.length > 0) {
    url += `?${urlParams}`
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
