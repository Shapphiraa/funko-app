import { ExistenceError, validateString } from '../../../helpers'
import { Category } from '../../data/models'

/**
 * Retrieves a category
 *
 * @param filter.slug The category slug param
 * @returns The category
 *
 * @throws {TypeError} On non-string category slug param
 * @throws {ContentError} On empty category slug param
 * @throws {ExistenceError} On non-existing category
 */

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
