export type PopType = {
  variant: string
  name: string
  images: string[]
  id: string
}

export default async function retrievePops(): Promise<PopType[]> {
  const res = await fetch(`http://localhost:3000/api/pops`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (res.status === 200) return await res.json()

  const { message } = await res.json()

  throw new Error(message)
}
