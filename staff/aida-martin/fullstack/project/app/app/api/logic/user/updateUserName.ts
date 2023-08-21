import { validateId, validateString, ExistenceError } from '../../../com'

import { User } from '../../data/models'

interface UpdateUserNameProps {
  userId: string
  name: string
}

export default function updateUserName({ userId, name }: UpdateUserNameProps) {
  validateId(userId, 'User ID')
  validateString(name, 'Name')

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😥')

    // await User.updateOne({ _id: userId }, { $set: { name: name } })

    user.name = name

    await user.save()
  })()
}
