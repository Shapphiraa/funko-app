import { validateId, validateString, ExistenceError } from '../../../helpers'

import { User } from '../../data/models'

interface UpdateUserAvatarProps {
  userId: string
  avatar: string
}

export default function updateUserName({
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
