import { ExistenceError, validateId } from '../../../helpers'
import { SalePop, User } from '../../data/models'

/**
 * Retrieves the user sale pops
 *
 * @param userId The user id
 * @returns The user sale pops
 *
 * @throws {TypeError} On non-string user id
 * @throws {ContentError} On user id does not have 24 characters or is not valid (hexadecimal)
 * @throws {ExistenceError} On non-existing user
 */

export default function retrieveUserSalePops({ userId }: { userId: string }) {
  validateId(userId)

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😥')

    const userSalePops = await SalePop.find(
      {
        $and: [
          { author: userId },
          {
            status: ['Available', 'Reserved'],
          },
        ],
      },
      'price images status'
    )
      .limit(20)
      .populate('author', 'name avatar')
      .populate('pop', 'name')
      .sort('-date')
      .lean()

    userSalePops.forEach((salePop: any) => {
      salePop.id = salePop._id.toString()
      delete salePop._id

      if (salePop.pop._id) salePop.pop.id = salePop.pop._id.toString()
      delete salePop.pop._id

      if (salePop.author._id) salePop.author.id = salePop.author._id.toString()
      delete salePop.author._id
    })

    return userSalePops
  })()
}
