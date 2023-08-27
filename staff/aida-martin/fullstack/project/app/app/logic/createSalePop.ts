import { validateString, validateNumber, validateDescription } from '../helpers'
import context from './context'

interface CreateSalePopProps {
  tittle: string
  description: string
  condition: string
  pop: string
  images: Array<string>
  price: number
}

export default function createSalePop({
  tittle,
  description,
  condition,
  pop,
  images,
  price,
}: CreateSalePopProps): Promise<void> {
  validateString(tittle, 'Tittle')
  validateDescription(description)
  validateString(condition, 'Condition')
  // validateString(images, 'Images')
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
        tittle,
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
