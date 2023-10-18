import { SalePop } from '../../data/models'

/**
 * Retrieves the sale pops
 *
 * @returns The sale pops
 *
 */

export default async function retrieveSalePops() {
  const salePops = await SalePop.find(
    {
      status: ['Available', 'Reserved'],
    },
    'price images status'
  )
    .limit(20)
    .populate('author', 'name avatar')
    .populate('pop', 'name')
    .sort('-date')
    .lean()

  salePops.forEach((salePop: any) => {
    salePop.id = salePop._id.toString()
    delete salePop._id

    if (salePop.pop._id) salePop.pop.id = salePop.pop._id.toString()
    delete salePop.pop._id

    if (salePop.author._id) salePop.author.id = salePop.author._id.toString()
    delete salePop.author._id
  })

  return salePops
}
