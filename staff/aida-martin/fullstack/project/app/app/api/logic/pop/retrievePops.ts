import { ExistenceError } from '../../../com'
import { User, Pop, Category } from '../../../../data/models'

export default async function retrievePops({
  userId,
  filter,
}: {
  userId?: string
  filter: { slug?: string }
}) {
  //TODO validators

  let pops

  if (filter.slug) {
    const [category] = await Category.find({ slug: filter.slug }).lean()

    if (!category) throw new ExistenceError('Category not found! 😥')

    pops = await Pop.find(
      { category: category._id },
      'variant name images category userCollect userWhislist'
    )
      .populate('category', 'name slug imageList imageDetail')
      .sort('-date')
      .lean()
  } else {
    pops = await Pop.find(
      {},
      'variant name images category userCollect userWhislist'
    )
      .populate('category', 'name slug imageList imageDetail')
      .sort('-date')
      .lean()
  }

  const user = await User.findById(userId)

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
