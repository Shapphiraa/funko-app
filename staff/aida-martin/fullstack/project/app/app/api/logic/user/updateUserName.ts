import {
  validateId,
  validateString,
  ExistenceError,
  ContentError,
} from '../../../helpers'

import { User } from '../../data/models'

interface UpdateUserNameProps {
  userId: string
  name: string
}

/**
 * Updates the user name
 *
 * @param userId The user id
 * @param name The user name
 * @returns Promise
 *
 * @throws {TypeError} On non-string user id or name
 * @throws {ContentError} On user id does not have 24 characters or is not valid (hexadecimal). On empty name. On new name matches the current one
 * @throws {ExistenceError} On non-existing user
 */

export default function updateUserName({ userId, name }: UpdateUserNameProps) {
  validateId(userId, 'User ID')
  validateString(name, 'Name')

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😥')

    if (name === user.name)
      throw new ContentError('Your new name matches the current one 😥')

    user.name = name

    await user.save()
  })()
}
