import { validateId, ExistenceError } from '../../../helpers'

import { User } from '../../data/models'

/**
 * Retrieves a user role
 *
 * @param userId The user id
 * @returns The user role
 *
 * @throws {TypeError} On non-string user id
 * @throws {ContentError} On user id does not have 24 characters or is not valid (hexadecimal)
 * @throws {ExistenceError} On non-existing user
 */

export default function retrieveUserRole(userId: string) {
  validateId(userId)

  return (async () => {
    const user: any = await User.findById(userId, 'role').lean()

    if (!user) throw new ExistenceError('User not found! 😥')

    return user.role
  })()
}
