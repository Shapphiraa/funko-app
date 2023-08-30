import { validateId, ExistenceError, PropertyError } from '../../../helpers'

import { User, SalePop } from '../../data/models'

interface changeSalePopStatusToSoldProps {
  userId: string
  salePopId: string
}

export default function changeSalePopStatusToSold({
  userId,
  salePopId,
}: changeSalePopStatusToSoldProps) {
  validateId(userId)
  validateId(salePopId, 'Sale Pop ID')

  return (async () => {
    const [user, salePop] = await Promise.all([
      User.findById(userId),
      SalePop.findById(salePopId),
    ])

    if (!user) throw new ExistenceError('User not found! 😥')

    if (!salePop) throw new ExistenceError('Sale pop not found! 😥')

    if (salePop.author.toString() !== userId) {
      throw new PropertyError(
        `Sale pop with ID ${salePop._id.toString()} does not belong to user with ID ${userId} 😥`
      )
    }

    salePop.status = 'Sold'

    await salePop.save()
  })()
}
