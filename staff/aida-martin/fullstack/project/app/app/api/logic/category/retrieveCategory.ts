import { ExistenceError } from '../../../com'
import { Category } from '../../data/models'

export default async function retrieveCategory(filter: { slug: string }) {
  const category = await Category.findOne(
    { slug: filter.slug },
    'name imageDetail'
  )

  if (!category) throw new ExistenceError('Category not found! 😥')

  if (category._id) {
    category.id = category._id.toString()
    delete category._id
  }

  return category
}
