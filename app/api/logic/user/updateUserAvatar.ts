import { validateId, validateString, ExistenceError } from '../../../helpers'

import { User } from '../../data/models'

interface UpdateUserAvatarProps {
  userId: string
  avatar: string
}

/**
 * Updates the user avatar
 *
 * @param userId The user id
 * @param avatar The user avatar
 * @returns Promise
 *
 * @throws {TypeError} On non-string user id or avatar
 * @throws {ContentError} On user id does not have 24 characters or is not valid (hexadecimal). On empty avatar
 * @throws {ExistenceError} On non-existing user
 */

export default function updateUserAvatar({
  userId,
  avatar,
}: UpdateUserAvatarProps) {
  validateId(userId, 'User ID')
  validateString(avatar, 'Avatar')

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😥')

    user.avatar = avatar

    await user.save()
  })()
}
