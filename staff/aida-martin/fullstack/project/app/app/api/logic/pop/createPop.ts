import {
  validateId,
  validateString,
  ExistenceError,
  PermissionsError,
} from '../../../helpers'

import { User, Pop } from '../../data/models'

interface CreatePopProps {
  userId: string
  variant: string
  exclusivity: string
  name: string
  number: string
  images: Array<string>
  category: string
  collect: string
  release: string
  availability: string
}

export default function createPop({
  userId,
  variant,
  exclusivity,
  name,
  number,
  images,
  category,
  collect,
  release,
  availability,
}: CreatePopProps) {
  validateId(userId)
  validateString(variant, 'Variant')
  validateString(exclusivity, 'Exclusivity')
  validateString(name, 'Name')
  validateString(number, 'Number')
  validateString(images[0], 'First image')
  validateString(images[1], 'Second image')
  validateString(category, 'Category')
  validateString(collect, 'Collect')
  validateString(release, 'Release')
  validateString(availability, 'Availability')

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😥')

    if (user.role !== 'admin')
      throw new PermissionsError(
        'You do not have permissions to perform this action! 😥'
      )

    await Pop.create({
      variant,
      exclusivity,
      name,
      number,
      images,
      category,
      collect,
      release,
      availability,
      date: new Date(),
    })
  })()
}
