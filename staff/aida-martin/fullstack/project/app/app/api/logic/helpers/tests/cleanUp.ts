import { User, Pop, Category } from '../../../data/models'

export default async function cleanUp() {
  await Promise.all([
    User.deleteMany(),
    Pop.deleteMany(),
    Category.deleteMany(),
  ])
}
