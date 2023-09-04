import { validateId, ExistenceError } from '../../../helpers'
import { User, Pop } from '../../data/models'

export default function retrievePopCollectionPreview({
  userId,
}: {
  userId: string
}) {
  validateId(userId)

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😥')

    const quantity = user.popCollect.length

    const pop: any = await Pop.findById(
      user.popCollect[user.popCollect.length - 1],
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

    return null
  })()
}
