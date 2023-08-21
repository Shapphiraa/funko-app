import { Pop, User } from '../../data/models'

export default async function retrievePop({
  userId,
  popId,
}: {
  userId?: string
  popId: string
}) {
  const pop: any = await Pop.findById(popId, '-__v -date')
    .populate('category', 'name')
    .lean()

  pop.id = pop._id.toString()
  delete pop._id

  pop.category.id = pop.category._id.toString()
  delete pop.category._id

  const user = await User.findById(userId)

  pop.userCollect = user
    ? user.popCollect.some((id: string) => id.toString() === pop.id)
    : false

  pop.userWhislist = user
    ? user.popWhislist.some((id: string) => id.toString() === pop.id)
    : false

  return pop
}
