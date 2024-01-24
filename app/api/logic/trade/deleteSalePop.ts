import { validateId, ExistenceError, PropertyError } from '../../../helpers'

import { User, SalePop } from '../../data/models'

/**
 * Deletes a sale pop
 *
 * @param userId The user id
 * @param salePopId The sale pop id
 * @returns Promise
 *
 * @throws {TypeError} On non-string user id or sale pop id
 * @throws {ContentError} On user id or sale pop id does not have 24 characters or is not valid (hexadecimal)
 * @throws {ExistenceError} On non-existing user or sale pop
 * @throws {PropertyError} On sale pop does not belong to user
 */

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
