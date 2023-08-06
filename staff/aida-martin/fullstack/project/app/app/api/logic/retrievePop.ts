import { Pop } from '../../../data/models'

export default async function retrievePop(popId: { id: string }) {
  const pop: any = await Pop.findById(popId.id, '-__v -number -date')
    .populate('category', 'name')
    .lean()

  pop.id = pop._id.toString()
  delete pop._id

  delete pop.category._id

  return pop
}
