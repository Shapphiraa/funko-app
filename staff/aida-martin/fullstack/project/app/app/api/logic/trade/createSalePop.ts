import {
  validateId,
  validateString,
  validateNumber,
  ExistenceError,
  validateDescription,
} from '../../../helpers'

import { User, SalePop } from '../../data/models'

interface CreateSalePopProps {
  userId: string
  description: string
  condition: string
  pop: string
  images: Array<string>
  price: number
}

/**
 * Creates new sale pop
 *
 * @param userId The user id
 * @param description The sale pop description
 * @param condition The sale pop condition
 * @param pop The related sale pop
 * @param images The sale pop images
 * @param price The sale pop price
 * @returns Promise
 *
 * @throws {TypeError} On non-string user id, description, condition, pop, images. On non-number price
 * @throws {ContentError} On user id does not have 24 characters or is not valid (hexadecimal). On empty description, condition, pop, images, price
 * @throws {RangeError} On description does not have 20 characters
 * @throws {ExistenceError} On non-existing user
 */

export default function createSalePop({
  userId,
  description,
  condition,
  pop,
  images,
  price,
}: CreateSalePopProps) {
  validateId(userId)
  validateDescription(description)
  validateString(condition, 'Condition')
  validateString(images[0], 'First image')
  validateString(images[1], 'Second image')
  validateString(pop, 'Pop')
  validateNumber(price, 'Price')

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😥')

    await SalePop.create({
      author: userId,
      description,
      condition,
      pop,
      images,
      price,
      date: new Date(),
    })
  })()
}
