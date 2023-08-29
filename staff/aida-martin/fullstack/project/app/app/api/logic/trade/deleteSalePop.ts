import { validateId, ExistenceError, PropertyError } from '../../../helpers'

import { User, SalePop } from '../../data/models'

export default function deleteSalePop(
  userId: string,
  salePopId: { id: string }
) {
  validateId(userId)
  validateId(salePopId.id, 'Sale Pop ID')

  return (async () => {
    const [user, salePop] = await Promise.all([
      User.findById(userId),
      SalePop.findById(salePopId.id),
    ])

    if (!user) throw new ExistenceError('User not found! 😥')

    if (!salePop) throw new ExistenceError('Sale pop not found! 😥')

    if (salePop.author.toString() !== userId) {
      throw new PropertyError(
        `Sale pop with ID ${salePop._id.toString()} does not belong to user with ID ${userId} 😥`
      )
    }

    await SalePop.deleteOne({ _id: salePopId.id })
  })()
}
