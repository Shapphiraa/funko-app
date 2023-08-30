import { validateId, ExistenceError } from '../../../helpers'
import { Pop, User, SalePop } from '../../data/models'
import calculateTrendingValue from '../helpers/tests/calculateTrendingValue'

export default async function retrievePop({
  userId,
  popId,
}: {
  userId?: string
  popId: string
}) {
  // TODO: validators
  const pop: any = await Pop.findById(popId, '-__v -date')
    .populate('category', 'name')
    .lean()

  if (!pop) throw new ExistenceError('Pop not found! 😥')

  pop.id = pop._id.toString()
  delete pop._id

  pop.category.id = pop.category._id.toString()
  delete pop.category._id

  let user

  if (userId) {
    user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😥')
  }

  pop.userCollect = user
    ? user.popCollect.some((id: string) => id.toString() === pop.id)
    : false

  pop.userWhislist = user
    ? user.popWhislist.some((id: string) => id.toString() === pop.id)
    : false

  const salePops: any = await SalePop.find({
    $and: [{ pop: pop.id }, { status: 'Sold' }],
  })

  if (salePops.length > 1) {
    const salePopPrices = salePops.map((salePop: any) => salePop.price)

    const trendingValue = calculateTrendingValue(salePopPrices)

    pop.trendingValue = trendingValue
  }

  return pop
}
