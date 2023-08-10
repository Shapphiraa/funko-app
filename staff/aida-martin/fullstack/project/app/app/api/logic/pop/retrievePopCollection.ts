import { ExistenceError } from '../../../com'
import { User, Pop } from '../../../../data/models'

export default async function retrievePopCollection({
  userId,
}: {
  userId: string
}) {
  //TODO validators

  const user = await User.findById(userId)

  if (!user) throw new ExistenceError('User not found! 😥')

  const popCollection = await Pop.find(
    { _id: { $in: user.popCollect } },
    'variant name images userCollect userWhislist'
  )
    .sort('-date')
    .lean()

  popCollection.forEach((pop: any) => {
    pop.id = pop._id.toString()
    delete pop._id

    pop.userCollect = user
      ? user.popCollect.some((id: string) => id.toString() === pop.id)
      : false

    pop.userWhislist = user
      ? user.popWhislist.some((id: string) => id.toString() === pop.id)
      : false
  })

  return popCollection
}
