import {
  validateId,
  validateString,
  ExistenceError,
  PermissionsError,
  DuplicityError,
} from '../../../helpers'
import slugify from 'slugify'

import { User, Category } from '../../data/models'

interface CreateCategoryProps {
  userId: string
  name: string
  imageList: string
  imageDetail: string
}

/**
 * Creates new category
 *
 * @param userId The user id
 * @param name The category name
 * @param imageList The category image list
 * @param imageDetail The category image detail
 * @returns Promise
 *
 * @throws {TypeError} On non-string user id, name, imageList or imageDetail
 * @throws {ContentError} On user id does not have 24 characters or is not valid (hexadecimal). On empty name, imageList or imageDetail
 * @throws {ExistenceError} On non-existing user
 * @throws {PermissionsError} On user does not have permissions to perform this action
 * @throws {DuplicityError} On category already created
 */

export default function createCategory({
  userId,
  name,
  imageList,
  imageDetail,
}: CreateCategoryProps) {
  validateId(userId)
  validateString(name, 'Name')
  validateString(imageList, 'ImageList')
  validateString(imageDetail, 'ImageDetail')

  const slug = slugify(name, { lower: true, locale: 'en' })

  return (async () => {
    try {
      const user = await User.findById(userId)

      if (!user) throw new ExistenceError('User not found! 😢')

      if (user.role !== 'admin')
        throw new PermissionsError(
          'You do not have permissions to perform this action! 😥'
        )

      await Category.create({
        name,
        slug,
        imageList,
        imageDetail,
      })
    } catch (error: any) {
      if (error.message.includes('E11000'))
        throw new DuplicityError('This category is already created! 😥')
    }
  })()
}
