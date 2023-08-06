import {
  validateId,
  validateString,
  ExistenceError,
  PermissionsError,
} from '../../../../com'
import slugify from 'slugify'

import { User, Category } from '../../../data/models'

interface CreateCategoryProps {
  userId: string
  name: string
  imageList: string
  imageDetail: string
}

export default function createCategory({
  userId,
  name,
  imageList,
  imageDetail,
}: CreateCategoryProps) {
  validateId(userId)
  validateString(name, 'Name')

  const slug = slugify(name, { lower: true, locale: 'en' })

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😢')

    if (user.rol !== 'admin')
      throw new PermissionsError(
        'You do not have permissions to perform this action! 😥'
      )

    await Category.create({
      name,
      slug,
      imageList,
      imageDetail,
    })
  })()
}
