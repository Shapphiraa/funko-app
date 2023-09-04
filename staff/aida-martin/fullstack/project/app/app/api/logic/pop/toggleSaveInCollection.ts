import { validateId, ExistenceError } from '../../../helpers'
import { User, Pop } from '../../data/models'

export default function toggleSaveInCollection(
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

    const index = user.popCollect.findIndex(
      (id: string) => id.toString() === popId.id
    )

    if (index < 0) {
      user.popCollect.push(popId.id)

      await user.save()
    } else {
      user.popCollect.splice(index, 1)

      await user.save()
    }
  })()
}
