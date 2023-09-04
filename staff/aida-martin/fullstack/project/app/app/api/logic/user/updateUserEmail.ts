import {
  validateId,
  validateEmail,
  ExistenceError,
  DuplicityError,
  UnknownError,
  ContentError,
} from '../../../helpers'

import { User } from '../../data/models'

interface UpdateUserEmailProps {
  userId: string
  email: string
}

/**
 * Updates the user email
 *
 * @param userId The user id
 * @param email The user email
 * @returns Promise
 *
 * @throws {TypeError} On non-string user id or email
 * @throws {ContentError} On user id does not have 24 characters or is not valid (hexadecimal). On empty or non-valid email. On new email matches the current one
 * @throws {ExistenceError} On non-existing user
 */

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

      user.email = email

      await user.save()
    } catch (error: any) {
      if (error.message.includes('E11000'))
        throw new DuplicityError('You cannot use an existing email')

      throw new UnknownError(error.message)
    }
  })()
}
