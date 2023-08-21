import { validateId, ExistenceError } from '../../../com'

import { User } from '../../data/models'

export default function retrieveUserRole(userId: string) {
  validateId(userId)

  return (async () => {
    const user: any = await User.findById(userId, 'role').lean()

    if (!user) throw new ExistenceError('User not found! 😥')

    return user.role
  })()
}
