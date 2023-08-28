import {
  validateId,
  validateString,
  validateNumber,
  ExistenceError,
  validateDescription,
  PropertyError,
} from '../../../helpers'

import { User, SalePop, Pop } from '../../data/models'

interface UpdateSalePopProps {
  userId: string
  salePopId: string
  description: string
  condition: string
  price: number
  images: Array<string>
}

export default function UpdateSalePop({
  userId,
  salePopId,
  description,
  condition,
  price,
  images,
}: UpdateSalePopProps) {
  validateId(userId)
  validateId(salePopId, 'Sale Pop ID')
  validateDescription(description)
  validateString(condition, 'Condition')
  validateNumber(price, 'Price')
  // validateString(images, 'Images')

  return (async () => {
    const [user, salePop] = await Promise.all([
      User.findById(userId),
      SalePop.findById(salePopId),
    ])

    if (!user) throw new ExistenceError('User not found! 😥')

    if (!salePop) throw new ExistenceError('Pop not found! 😥')

    if (salePop.author.toString() !== userId) {
      throw new PropertyError(
        `Sale pop with ID ${salePop._id.toString()} does not belong to user with ID ${userId} 😥`
      )
    }

    const pop = await Pop.findById(salePop.pop._id.toString())

    if (!pop) throw new ExistenceError('Pop not found! 😥')

    salePop.description = description
    salePop.condition = condition
    salePop.price = price
    salePop.images = images

    await salePop.save()
  })()
}
