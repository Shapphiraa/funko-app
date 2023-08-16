import {
  validateId,
  validatePhoneNumber,
  ExistenceError,
  DuplicityError,
  UnknownError,
  ContentError,
} from '../../../com'

import { User } from '../../../../data/models'

interface UpdateUserPhoneNumberProps {
  userId: string
  phoneNumber: string
}

export default function updateUserPhoneNumber({
  userId,
  phoneNumber,
}: UpdateUserPhoneNumberProps) {
  validateId(userId, 'User ID')
  validatePhoneNumber(phoneNumber)

  return (async () => {
    try {
      const user = await User.findById(userId)

      if (!user) throw new ExistenceError('User not found! 😥')

      if (phoneNumber === user.phoneNumber)
        throw new ContentError('Your new email matches the current one 😥')

      await User.updateOne(
        { _id: userId },
        { $set: { phoneNumber: phoneNumber.replaceAll(' ', '') } }
      )
    } catch (error: any) {
      if (error.message.includes('E11000'))
        throw new DuplicityError('You cannot use an existing phone number')

      throw new UnknownError(error.message)
    }
  })()
}
