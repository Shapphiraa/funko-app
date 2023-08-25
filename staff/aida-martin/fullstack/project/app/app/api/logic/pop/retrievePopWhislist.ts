import { ExistenceError } from '../../../helpers'
import { User, Pop } from '../../data/models'

export default async function retrievePopCollection({
  userId,
}: {
  userId: string
}) {
  //TODO validators

  const user = await User.findById(userId)

  if (!user) throw new ExistenceError('User not found! 😥')

  const popWhislist = await Pop.find(
    { _id: { $in: user.popWhislist } },
    'variant name images userCollect userWhislist'
  )
    .sort('-date')
    .lean()

  popWhislist.forEach((pop: any) => {
    pop.id = pop._id.toString()
    delete pop._id

    pop.userCollect = user.popCollect.some(
      (id: string) => id.toString() === pop.id
    )

    pop.userWhislist = user.popWhislist.some(
      (id: string) => id.toString() === pop.id
    )
  })

  return popWhislist
}
