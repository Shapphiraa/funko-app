import { ExistenceError } from '../../../helpers'
import { User, Pop, Category } from '../../data/models'

export default async function retrievePops({
  userId,
  filter,
}: {
  userId?: string
  filter: { slug?: string; search?: string }
}) {
  //TODO validators

  // arreglar los any
  let user: any

  if (userId) {
    user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😥')
  }

  let findAnd = []

  if (filter.slug) {
    const category = await Category.findOne({ slug: filter.slug })

    if (!category) throw new ExistenceError('Category not found! 😥')

    findAnd.push({ category: category._id })
  }

  // validador search > 2 characters (utilizar el validateString pero arreglar en otro si necesito algún string con menos de 3 caracteres, ej num del pop)
  if (filter.search) {
    findAnd.push({
      name: { $regex: '.*' + filter.search.trim() + '.*', $options: 'i' },
    })
  }

  const find = findAnd.length > 0 ? { $and: findAnd } : {}

  const pops = await Pop.find(
    find,
    'variant name images category userCollect userWhislist'
  )
    .populate('category', 'name slug imageList imageDetail')
    .limit(20)
    .sort('-date')
    .lean()

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
