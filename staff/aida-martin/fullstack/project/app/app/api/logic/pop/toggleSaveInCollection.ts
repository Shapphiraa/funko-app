import { validateId, ExistenceError } from '../../../com'
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

    // cambiar por pulls?
    if (index < 0) {
      // await User.updateOne({ _id: userId }, { $push: { popCollect: popId.id } })

      user.popCollect.push(popId.id)

      await user.save()
    } else {
      user.popCollect.splice(index, 1)

      // await User.updateOne(
      //   { _id: userId },
      //   { $set: { popCollect: user.popCollect } }
      // )

      await user.save()
    }
  })()
}
