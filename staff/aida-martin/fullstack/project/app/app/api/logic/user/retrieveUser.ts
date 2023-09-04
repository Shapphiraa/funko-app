import { validateId, ExistenceError } from '../../../helpers'

import { User } from '../../data/models'

/**
 * Retrieves a user
 *
 * @param userId The user id
 * @returns The user
 *
 * @throws {TypeError} On non-string user id
 * @throws {ContentError} On user id does not have 24 characters or is not valid (hexadecimal)
 * @throws {ExistenceError} On non-existing user
 */

export default function retrieveUser(userId: string) {
  validateId(userId)

  return (async () => {
    const user: any = await User.findById(
      userId,
      'name avatar email role phoneNumber location'
    ).lean()

    if (!user) throw new ExistenceError('User not found! 😥')

    delete user._id

    return user
  })()
}
