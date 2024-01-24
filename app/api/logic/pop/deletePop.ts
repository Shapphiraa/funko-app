import { validateId, ExistenceError, PermissionsError } from '../../../helpers'

import { User, Pop, SalePop } from '../../data/models'

/**
 * Deletes a pop
 *
 * @param userId The user id
 * @param popId The pop id
 * @returns Promise
 *
 * @throws {TypeError} On non-string user id or pop id
 * @throws {ContentError} On user id or pop id does not have 24 characters or is not valid (hexadecimal)
 * @throws {ExistenceError} On non-existing user or pop
 * @throws {PermissionsError} On user does not have permissions to perform this action
 */

export default function deletePop(userId: string, popId: { id: string }) {
  validateId(userId)
  validateId(popId.id, 'Pop ID')

  return (async () => {
    const [user, pop] = await Promise.all([
      User.findById(userId),
      Pop.findById(popId.id),
    ])

    if (!user) throw new ExistenceError('User not found! 😥')

    if (user.role !== 'admin')
      throw new PermissionsError(
        'You do not have permissions to perform this action! 😥'
      )

    if (!pop) throw new ExistenceError('Pop not found! 😥')

    const users = await User.find({
      $or: [{ popCollect: popId.id }, { popWhislist: popId.id }],
    })

    users.forEach(async (user) => {
      await User.updateOne(
        { _id: user.id },
        {
          $pullAll: {
            popCollect: [popId.id],
            popWhislist: [popId.id],
          },
        }
      )
    })

    await SalePop.deleteMany({ pop: popId.id })

    await Pop.deleteOne({ _id: popId.id })
  })()
}
