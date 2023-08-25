import { validateId, ExistenceError } from '../../../helpers'
import { User, Pop } from '../../data/models'

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
      // await User.updateOne(
      //   { _id: userId },
      //   { $push: { popWhislist: popId.id } }
      // )

      user.popWhislist.push(popId.id)

      await user.save()
    } else {
      user.popWhislist.splice(index, 1)

      //   await User.updateOne(
      //     { _id: userId },
      //     { $set: { popWhislist: user.popWhislist } }
      //   )

      await user.save()
    }
  })()
}
