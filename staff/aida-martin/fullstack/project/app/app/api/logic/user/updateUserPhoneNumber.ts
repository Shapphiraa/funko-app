import {
  validateId,
  validatePhoneNumber,
  ExistenceError,
  DuplicityError,
  UnknownError,
  ContentError,
} from '../../../helpers'

import { User } from '../../data/models'

interface UpdateUserPhoneNumberProps {
  userId: string
  phoneNumber: string
}

/**
 * Updates the user phone number
 *
 * @param userId The user id
 * @param phoneNumber The user phone number
 * @returns Promise
 *
 * @throws {TypeError} On non-string user id or phone number
 * @throws {ContentError} On user id does not have 24 characters or is not valid (hexadecimal). On empty phone number or is not valid. On new phone number matches the current one
 * @throws {ExistenceError} On non-existing user
 * @throws {DuplicityError} On phone number already belongs to another user
 * @throws {UnknownError} On unknown error
 */

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

      if (phoneNumber.replaceAll(' ', '') === user.phoneNumber)
        throw new ContentError(
          'Your new phone number matches the current one 😥'
        )

      user.phoneNumber = phoneNumber.replaceAll(' ', '')

      await user.save()
    } catch (error: any) {
      if (error.message.includes('E11000'))
        throw new DuplicityError('You cannot use an existing phone number')

      throw new UnknownError(error.message)
    }
  })()
}
