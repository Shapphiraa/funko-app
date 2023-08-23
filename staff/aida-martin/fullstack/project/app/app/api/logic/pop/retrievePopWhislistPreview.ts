import { validateId, ExistenceError } from '../../../com'
import { User, Pop } from '../../data/models'

export default function retrieveWhislistPreview({
  userId,
}: {
  userId: string
}) {
  validateId(userId)

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😥')

    const quantity = user.popWhislist.length

    // Arreglar any!!
    const pop: any = await Pop.findById(
      user.popWhislist[user.popWhislist.length - 1],
      'images'
    ).lean()

    if (pop) {
      delete pop._id

      const lastAddedPopImage = pop.images[1]

      return {
        quantity,
        lastAddedPopImage,
      }
    }
  })()
}
