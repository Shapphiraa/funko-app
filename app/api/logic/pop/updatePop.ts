import {
  validateId,
  validateString,
  ExistenceError,
  PermissionsError,
} from '../../../helpers'

import { User, Pop } from '../../data/models'

interface UpdatePopProps {
  userId: string
  popId: string
  variant: string
  exclusivity: string
  name: string
  number: string
  category: string
  images: Array<string>
  collect: string
  release: string
  availability: string
}

/**
 * Updates a pop
 *
 * @param userId The user id
 * @param popId The pop id
 * @param variant The pop variant
 * @param exclusivity The pop exclusivity
 * @param name The pop name
 * @param number The pop number
 * @param images The pop images
 * @param category The pop category
 * @param collect The pop collect
 * @param release The pop release
 * @param availability The pop availability
 * @returns Promise
 *
 * @throws {TypeError} On non-string user id, pop id, variant, exclusivity, name, number, images, category, collect, release or availability
 * @throws {ContentError} On user id or pop id does not have 24 characters or is not valid (hexadecimal). On empty variant, exclusivity, name, number, images, category, collect, release or availability
 * @throws {ExistenceError} On non-existing user or pop
 * @throws {PermissionsError} On user does not have permissions to perform this action
 */

export default function UpdatePop({
  userId,
  popId,
  variant,
  exclusivity,
  name,
  number,
  category,
  images,
  collect,
  release,
  availability,
}: UpdatePopProps) {
  validateId(userId)
  validateId(popId, 'Pop ID')
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
    const [user, pop] = await Promise.all([
      User.findById(userId),
      Pop.findById(popId),
    ])

    if (!user) throw new ExistenceError('User not found! 😥')

    if (user.role !== 'admin')
      throw new PermissionsError(
        'You do not have permissions to perform this action! 😥'
      )

    if (!pop) throw new ExistenceError('Pop not found! 😥')

    pop.variant = variant
    pop.exclusivity = exclusivity
    pop.name = name
    pop.number = number
    pop.category = category
    pop.images = images
    pop.collect = collect
    pop.release = release
    pop.availability = availability

    await pop.save()
  })()
}
