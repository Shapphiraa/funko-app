import { validateId, ExistenceError } from '../../../helpers'

import { User } from '../../data/models'

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
