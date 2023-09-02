import {
  validateId,
  validateString,
  validateNumber,
  ExistenceError,
  validateDescription,
} from '../../../helpers'

import { User, SalePop } from '../../data/models'

interface CreateSalePopProps {
  userId: string
  description: string
  condition: string
  pop: string
  images: Array<string>
  price: number
}

export default function createSalePop({
  userId,
  description,
  condition,
  pop,
  images,
  price,
}: CreateSalePopProps) {
  validateId(userId)
  validateDescription(description)
  validateString(condition, 'Condition')
  validateString(images[0], 'First image')
  validateString(images[1], 'Second image')
  validateString(pop, 'Pop')
  validateNumber(price, 'Price')

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😥')

    await SalePop.create({
      author: userId,
      description,
      condition,
      pop,
      images,
      price,
      date: new Date(),
    })
  })()
}
