export interface Category {
  name: string
  imageList: string
  slug: string
  id: string
}

export default async function retrieveCategories(): Promise<Category[]> {
  let url = 'http://localhost:3000/api/category'

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (res.status === 200) return await res.json()

  const { message } = await res.json()

  throw new Error(message)
}
