import { validateId, ExistenceError, PermissionsError } from '../../../com'

import { User, Pop } from '../../data/models'

export default function deletePop(userId: string, popId: { id: string }) {
  validateId(userId)
  validateId(popId.id, 'Pop ID')

  return (async () => {
    const [user, pop] = await Promise.all([
      User.findById(userId),
      Pop.findById(popId.id),
    ])

    if (!user) throw new ExistenceError('User not found! 😢')

    if (user.role !== 'admin')
      throw new PermissionsError(
        'You do not have permissions to perform this action! 😥'
      )

    if (!pop) throw new ExistenceError('Pop not found! 😥')

    const users = await User.find({
      $or: [{ popCollect: popId.id }, { popWhislist: popId.id }],
    })

    // El map se usó en el deletePost de la app anterior y el Promise.all, pero no me funciona...

    // const usersUpdated = users.map((user) => {
    //   User.updateOne(
    //     { _id: user.id },
    //     {
    //       $pullAll: {
    //         popCollect: [popId.id],
    //         popWhislist: [popId.id],
    //       },
    //     }
    //   )
    // })

    users.forEach(async (user) => {
      await User.updateOne(
        { _id: user.id },
        {
          $pullAll: {
            popCollect: [popId.id],
            popWhislist: [popId.id],
          },
        }
      )
    })

    await Pop.deleteOne({ _id: popId.id })
  })()
}
