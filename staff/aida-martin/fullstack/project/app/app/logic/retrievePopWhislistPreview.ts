import context from './context'

export interface PopWhislistPreview {
  quantity: number
  lastAddedPopImage: string
}

export default async function retrievePopCollectionPreview(): Promise<PopWhislistPreview> {
  const res = await fetch(`http://localhost:3000/api/pop/whislist/preview`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${context.token}`,
    },
  })

  if (res.status === 200) return await res.json()

  const { message } = await res.json()

  throw new Error(message)
}
