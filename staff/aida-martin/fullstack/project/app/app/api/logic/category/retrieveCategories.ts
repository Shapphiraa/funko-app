import { Category } from '../../data/models'

export default async function retrieveCategories() {
  const categories = await Category.find({}, 'name imageList slug').lean()

  categories.forEach((category: any) => {
    category.id = category._id.toString()
    delete category._id
  })

  return categories
}
