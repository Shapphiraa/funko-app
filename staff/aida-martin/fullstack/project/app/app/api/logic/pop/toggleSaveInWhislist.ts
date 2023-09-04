import { validateId, ExistenceError } from '../../../helpers'
import { User, Pop } from '../../data/models'

/**
 * Toggles save/remove pop in user whislist
 *
 * @param userId The user id
 * @param popId The pop id
 * @returns Promise
 *
 * @throws {TypeError} On non-string user id or pop id
 * @throws {ContentError} On user id or pop id does not have 24 characters or is not valid (hexadecimal)
 * @throws {ExistenceError} On non-existing user or pop
 */

export default function toggleSaveIWhislist(
  userId: string,
  popId: { id: string }
) {
  validateId(userId)
  validateId(popId.id, 'Pop ID')

  return (async () => {
    const [user, pop] = await Promise.all([
      User.findById(userId),
      Pop.findById(popId.id),
    ])

    if (!user) throw new ExistenceError('User not found! 😥')
    if (!pop) throw new ExistenceError('Pop not found! 😥')

    const index = user.popWhislist.findIndex(
      (id: string) => id.toString() === popId.id
    )

    if (index < 0) {
      user.popWhislist.push(popId.id)

      await user.save()
    } else {
      user.popWhislist.splice(index, 1)

      await user.save()
    }
  })()
}
