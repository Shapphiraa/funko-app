import { validateString, validateNumber, validateDescription } from '../helpers'
import context from './context'

interface CreateSalePopProps {
  description: string
  condition: string
  pop: string
  images: Array<string>
  price: number
}

export default function createSalePop({
  description,
  condition,
  pop,
  images,
  price,
}: CreateSalePopProps): Promise<void> {
  validateDescription(description)
  validateString(condition, 'Condition')
  validateString(images[0], 'First image')
  validateString(images[1], 'Second image')
  validateString(pop, 'Pop')
  validateNumber(price, 'Price')

  return (async () => {
    const res = await fetch(`http://localhost:3000/api/trade`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
      body: JSON.stringify({
        description,
        condition,
        pop,
        images,
        price,
      }),
    })

    if (res.status === 201) return

    const { message } = await res.json()

    throw new Error(message)
  })()
}
