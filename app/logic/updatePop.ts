import { validateId, validateString } from '../helpers'
import context from './context'

interface UpdatePopProps {
  id: string
  variant: string
  exclusivity: string
  name: string
  number: string
  category: string
  images: Array<string>
  collect: string
  release: string
  availability: string
}

export default function updatePop({
  id,
  variant,
  exclusivity,
  name,
  number,
  category,
  images,
  collect,
  release,
  availability,
}: UpdatePopProps) {
  validateId(id, 'Pop ID')
  validateString(variant, 'Variant')
  validateString(exclusivity, 'Exclusivity')
  validateString(name, 'Name')
  validateString(number, 'Number')
  validateString(images[0], 'First image')
  validateString(images[1], 'Second image')
  validateString(category, 'Category')
  validateString(collect, 'Collect')
  validateString(release, 'Release')
  validateString(availability, 'Availability')

  return (async () => {
    const res = await fetch(`http://localhost:3000/api/pop/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
      body: JSON.stringify({
        variant,
        exclusivity,
        name,
        number,
        category,
        images,
        collect,
        release,
        availability,
      }),
    })

    if (res.status === 204) return

    const { message } = await res.json()

    throw new Error(message)
  })()
}
