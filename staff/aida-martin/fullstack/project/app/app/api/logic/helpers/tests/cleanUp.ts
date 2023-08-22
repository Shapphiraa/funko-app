import { User, Pop } from '../../../data/models'

export default async function cleanUp() {
  await Promise.all([User.deleteMany(), Pop.deleteMany()])
}
