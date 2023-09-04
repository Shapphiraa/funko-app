import { ExistenceError, validateString } from '../../../helpers'
import { Category } from '../../data/models'

export default function retrieveCategory(filter: { slug: string }) {
  validateString(filter.slug, 'Slug param')

  return (async () => {
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
  })()
}
