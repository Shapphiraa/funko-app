import { ExistenceError } from '../../com'
import { Pop, Category } from '../../../data/models'

export default async function retrievePops(filter: { slug?: string }) {
  let pops

  if (filter.slug) {
    const [category] = await Category.find({ slug: filter.slug }).lean()

    if (!category) throw new ExistenceError('Category not found! 😥')

    pops = await Pop.find(
      { category: category._id },
      'variant name images category'
    )
      .populate('category', 'name slug imageList imageDetail')
      .sort('-date')
      .lean()
  } else {
    pops = await Pop.find({}, 'variant name images category')
      .populate('category', 'name slug imageList imageDetail')
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
  })

  return pops
}
