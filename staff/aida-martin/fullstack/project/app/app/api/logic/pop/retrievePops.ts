import { ExistenceError } from '../../../helpers'
import { User, Pop, Category } from '../../data/models'

export default async function retrievePops({
  userId,
  filter,
}: {
  userId?: string
  filter: { slug?: string }
}) {
  //TODO validators

  // arreglar los any
  let user: any

  if (userId) {
    user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😥')
  }

  let pops

  if (filter.slug) {
    const category = await Category.findOne({ slug: filter.slug })

    if (!category) throw new ExistenceError('Category not found! 😥')

    pops = await Pop.find(
      { category: category._id },
      'variant name images category userCollect userWhislist'
    )
      .populate('category', 'name slug imageList imageDetail')
      .limit(20)
      .sort('-date')
      .lean()
  } else {
    pops = await Pop.find(
      {},
      'variant name images category userCollect userWhislist'
    )
      .populate('category', 'name slug imageList imageDetail')
      .limit(20)
      .sort('-date')
      .lean()
  }

  pops.forEach((pop: any) => {
    pop.id = pop._id.toString()
    delete pop._id

    if (pop.category._id) {
      pop.category.id = pop.category._id.toString()
      delete pop.category._id
    }

    pop.userCollect = user
      ? user.popCollect.some((id: string) => id.toString() === pop.id)
      : false

    pop.userWhislist = user
      ? user.popWhislist.some((id: string) => id.toString() === pop.id)
      : false
  })

  return pops
}
