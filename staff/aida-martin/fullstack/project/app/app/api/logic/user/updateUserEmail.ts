import {
  validateId,
  validateEmail,
  ExistenceError,
  DuplicityError,
  UnknownError,
  ContentError,
} from '../../../com'

import { User } from '../../data/models'

interface UpdateUserEmailProps {
  userId: string
  email: string
}

export default function updateUserEmail({
  userId,
  email,
}: UpdateUserEmailProps) {
  validateId(userId, 'User ID')
  validateEmail(email)

  return (async () => {
    try {
      const user = await User.findById(userId)

      if (!user) throw new ExistenceError('User not found! 😥')

      if (email === user.email)
        throw new ContentError('Your new email matches the current one 😥')

      // await User.updateOne({ _id: userId }, { $set: { email: email } })

      user.email = email

      await user.save()
    } catch (error: any) {
      if (error.message.includes('E11000'))
        throw new DuplicityError('You cannot use an existing email')

      throw new UnknownError(error.message)
    }
  })()
}
