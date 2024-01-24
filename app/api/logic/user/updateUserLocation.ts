import {
  validateId,
  validateString,
  ExistenceError,
  ContentError,
} from '../../../helpers'

import { User } from '../../data/models'

interface UpdateUserLocationProps {
  userId: string
  location: string
}

/**
 * Updates the user location
 *
 * @param userId The user id
 * @param location The user location
 * @returns Promise
 *
 * @throws {TypeError} On non-string user id or location
 * @throws {ContentError} On user id does not have 24 characters or is not valid (hexadecimal). On empty location. On new location matches the current one
 * @throws {ExistenceError} On non-existing user
 */

export default function updateUserLocation({
  userId,
  location,
}: UpdateUserLocationProps) {
  validateId(userId, 'User ID')
  validateString(location, 'Location')

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😥')

    if (location === user.location)
      throw new ContentError('Your new location matches the current one 😥')

    user.location = location

    await user.save()
  })()
}
