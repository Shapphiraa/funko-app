import {
  validateId,
  validateString,
  validateNumber,
  validateDescription,
} from '../helpers'
import context from './context'

interface UpdateSalePopProps {
  id: string
  description: string
  condition: string
  price: number
  images: Array<string>
}

export default function updateSalePop({
  id,
  description,
  condition,
  price,
  images,
}: UpdateSalePopProps) {
  validateId(id, 'Sale Pop ID')
  validateDescription(description)
  validateString(condition, 'Condition')
  validateNumber(price, 'Price')
  validateString(images[0], 'First image')
  validateString(images[1], 'Second image')

  return (async () => {
    const res = await fetch(`http://localhost:3000/api/trade/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
      body: JSON.stringify({
        description,
        condition,
        price,
        images,
      }),
    })

    if (res.status === 204) return

    const { message } = await res.json()

    throw new Error(message)
  })()
}
