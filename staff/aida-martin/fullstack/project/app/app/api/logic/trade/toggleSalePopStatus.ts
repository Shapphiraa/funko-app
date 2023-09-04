import { validateId, ExistenceError, PropertyError } from '../../../helpers'

import { User, SalePop } from '../../data/models'

interface UpdateSalePopStatusProps {
  userId: string
  salePopId: string
}

export default function ToggleSalePopStatus({
  userId,
  salePopId,
}: UpdateSalePopStatusProps) {
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

    if (salePop.status === 'Available') {
      salePop.status = 'Reserved'
    } else if (salePop.status === 'Reserved') {
      salePop.status = 'Available'
    }

    await salePop.save()
  })()
}
