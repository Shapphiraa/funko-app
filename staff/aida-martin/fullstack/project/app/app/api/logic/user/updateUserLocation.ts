import { validateId, validateString, ExistenceError } from '../../../com'

import { User } from '../../../../data/models'

interface UpdateUserLocationProps {
  userId: string
  location: string
}

export default function updateUserLocation({
  userId,
  location,
}: UpdateUserLocationProps) {
  validateId(userId, 'User ID')
  validateString(location, 'Location')

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😥')

    await User.updateOne({ _id: userId }, { $set: { location: location } })
  })()
}
