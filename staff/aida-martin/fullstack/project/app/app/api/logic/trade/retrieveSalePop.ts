import { validateId, ExistenceError } from '../../../helpers'
import { SalePop, Pop } from '../../data/models'

export default async function retrieveSalePop({
  salePopId,
}: {
  salePopId: string
}) {
  validateId(salePopId, 'Sale Pop ID')

  const salePop: any = await SalePop.findById(salePopId, '-__v')
    .populate('author', 'name avatar')
    .populate({
      path: 'pop',
      populate: { path: 'category', select: 'name' },
      select: 'variant name exclusivity number collect',
    })
    .lean()

  if (!salePop) throw new ExistenceError('Sale pop not found! 😥')

  const pop = await Pop.findById(salePop.pop._id.toString())

  if (!pop) throw new ExistenceError('Pop not found! 😥')

  salePop.id = salePop._id.toString()
  delete salePop._id

  salePop.pop.id = salePop.pop._id.toString()
  delete salePop.pop._id

  salePop.author.id = salePop.author._id.toString()
  delete salePop.author._id

  salePop.pop.category.id = salePop.pop.category._id.toString()
  delete salePop.pop.category._id

  return salePop
}
