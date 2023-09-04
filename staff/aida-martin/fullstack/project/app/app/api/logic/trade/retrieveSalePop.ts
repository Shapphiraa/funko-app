import { validateId, ExistenceError } from '../../../helpers'
import { SalePop } from '../../data/models'

export default function retrieveSalePop({ salePopId }: { salePopId: string }) {
  validateId(salePopId, 'Sale Pop ID')

  return (async () => {
    const salePop: any = await SalePop.findById(salePopId, '-__v')
      .populate('author', 'name avatar location phoneNumber')
      .populate({
        path: 'pop',
        populate: { path: 'category', select: 'name' },
        select: 'variant name exclusivity number collect',
      })
      .lean()

    if (!salePop) throw new ExistenceError('Sale pop not found! 😥')

    salePop.id = salePop._id.toString()
    delete salePop._id

    salePop.pop.id = salePop.pop._id.toString()
    delete salePop.pop._id

    salePop.author.id = salePop.author._id.toString()
    delete salePop.author._id

    salePop.pop.category.id = salePop.pop.category._id.toString()
    delete salePop.pop.category._id

    salePop.date = new Date(salePop.date).toLocaleDateString('en-GB')

    return salePop
  })()
}
