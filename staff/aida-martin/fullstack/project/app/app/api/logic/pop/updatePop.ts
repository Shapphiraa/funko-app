import {
  validateId,
  validateString,
  validateNumber,
  ExistenceError,
  PermissionsError,
} from '../../../com'

import { User, Pop } from '../../data/models'

interface EditPopProps {
  userId: string
  popId: string
  variant: string
  exclusivity: string
  name: string
  number: number
  category: string
  // images: Array<string>
  collect: string
  release: string
  availability: string
}

export default function UpdatePop({
  userId,
  popId,
  variant,
  exclusivity,
  name,
  number,
  category,
  collect,
  release,
  availability,
}: EditPopProps) {
  validateId(userId)
  validateId(popId, 'Pop ID')
  validateString(variant, 'Variant')
  validateString(exclusivity, 'Exclusivity')
  validateString(name, 'Name')
  validateNumber(number, 'Number')
  // validateString(images, 'Images')
  validateString(category, 'Category')
  validateString(collect, 'Collect')
  validateString(release, 'Release')
  validateString(availability, 'Availability')

  return (async () => {
    const [user, pop] = await Promise.all([
      User.findById(userId),
      Pop.findById(popId),
    ])

    if (!user) throw new ExistenceError('User not found! 😢')

    if (user.role !== 'admin')
      throw new PermissionsError(
        'You do not have permissions to perform this action! 😥'
      )

    if (!pop) throw new ExistenceError('Pop not found! 😥')

    // await Pop.updateOne(
    // { _id: popId },
    // {
    //   $set: {
    //     variant: variant,
    //     exclusivity: exclusivity,
    //     name: name,
    //     number: number,
    //     collect: collect,
    //     release: release,
    //     availability: availability,
    //   },
    // }
    // )

    pop.variant = variant
    pop.exclusivity = exclusivity
    pop.name = name
    pop.number = number
    pop.category = category
    pop.collect = collect
    pop.release = release
    pop.availability = availability

    await pop.save()
  })()
}
