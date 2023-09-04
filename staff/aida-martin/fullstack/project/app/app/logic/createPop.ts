import { validateString } from '../helpers'
import context from './context'

interface CreatePopProps {
  variant: string
  exclusivity: string
  name: string
  number: string
  images: Array<string>
  category: string
  collect: string
  release: string
  availability: string
}

export default function createPop({
  variant,
  exclusivity,
  name,
  number,
  images,
  category,
  collect,
  release,
  availability,
}: CreatePopProps): Promise<void> {
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
    const res = await fetch(`http://localhost:3000/api/pop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
      body: JSON.stringify({
        variant,
        exclusivity,
        name,
        number,
        images,
        category,
        collect,
        release,
        availability,
      }),
    })

    if (res.status === 201) return

    const { message } = await res.json()

    throw new Error(message)
  })()
}
