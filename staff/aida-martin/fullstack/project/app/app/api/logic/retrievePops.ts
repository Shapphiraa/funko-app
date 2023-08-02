import { Pop } from '../../../data/models'

export default async function retrievePosts() {
  // Con el {} dentro del find busca todos
  const pops = await Pop.find({}, 'variant name images').sort('-date').lean()

  pops.forEach((pop: any) => {
    pop.id = pop._id.toString()
    delete pop._id
  })

  return pops
}
