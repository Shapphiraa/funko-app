import {
  validateId,
  // validateText,
  // validateUrl,
  ExistenceError,
  PermissionsError,
} from '../../../../com'

import { User, Pop } from '../../../data/models'

interface CreatePopProps {
  userId: string
  variant: string
  exclusivity: string
  name: string
  number: number
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
  validateId(userId, 'User ID')
  // validateUrl(image, 'Image URL')
  // validateText(text)

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😢')

    if (user.rol !== 'admin')
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
    })
  })()
}
