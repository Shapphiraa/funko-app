export type PopType = {
  variant: string
  name: string
  images: string[]
  category: string
  id: string
}

export default async function retrievePops({
  slug,
}: {
  slug?: string
}): Promise<PopType[]> {
  let url = 'http://localhost:3000/api/pops'

  if (slug) {
    url += `?slug=${slug}`
  }

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (res.status === 200) return await res.json()

  const { message } = await res.json()

  throw new Error(message)
}
