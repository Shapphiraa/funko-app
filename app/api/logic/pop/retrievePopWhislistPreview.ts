import { validateId, ExistenceError } from '../../../helpers'
import { User, Pop } from '../../data/models'

/**
 * Retrieves a user pop whislist preview
 *
 * @param userId The user id
 * @returns The user pop whislist preview or null
 *
 * @throws {TypeError} On non-string user id
 * @throws {ContentError} On user id does not have 24 characters or is not valid (hexadecimal)
 * @throws {ExistenceError} On non-existing user
 */

export default function retrieveWhislistPreview({
  userId,
}: {
  userId: string
}) {
  validateId(userId)

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😥')

    const quantity = user.popWhislist.length

    // Arreglar any!!
    const pop: any = await Pop.findById(
      user.popWhislist[user.popWhislist.length - 1],
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
