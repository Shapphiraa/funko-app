import { validateId, ExistenceError } from '../../../helpers'
import { User, Pop } from '../../data/models'

/**
 * Retrieves a user pop collection preview
 *
 * @param userId The user id
 * @returns The user pop collection preview or null
 *
 * @throws {TypeError} On non-string user id
 * @throws {ContentError} On user id does not have 24 characters or is not valid (hexadecimal)
 * @throws {ExistenceError} On non-existing user
 */

export default function retrievePopCollectionPreview({
  userId,
}: {
  userId: string
}) {
  validateId(userId)

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😥')

    const quantity = user.popCollect.length

    const pop: any = await Pop.findById(
      user.popCollect[user.popCollect.length - 1],
      'images'
    ).lean()

    if (pop) {
      delete pop._id

      const lastAddedPopImage = pop.images[1]

      return {
        quantity,
        lastAddedPopImage,
      }
    }

    return null
  })()
}
