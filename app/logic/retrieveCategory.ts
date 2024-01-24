import { validateString } from '../helpers'

export default async function retrieveCategory({ slug }: { slug: string }) {
  validateString(slug, 'Slug param')

  const res = await fetch(`http://localhost:3000/api/category/${slug}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (res.status === 200) return await res.json()

  const { message } = await res.json()

  throw new Error(message)
}
