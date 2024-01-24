import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { Category } from '../../data/models'
import retrieveCategories from './retrieveCategories'
import { cleanUp, generate } from '../helpers/tests'

dotenv.config()

describe('retrieveCategories', () => {
  before(async () => {
    await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_TEST}`
    )
  })

  let category
  let secondCategory

  beforeEach(async () => {
    category = generate.category()
    secondCategory = generate.category()

    await cleanUp()
  })

  after(async () => {
    await mongoose.disconnect()
  })

  it('succeeds on retrieve categories', async () => {
    await Category.create({
      name: category.name,
      slug: category.name,
      imageList: category.imageList,
      imageDetail: category.imageDetail,
    })

    await Category.create({
      name: secondCategory.name,
      slug: secondCategory.name,
      imageList: secondCategory.imageList,
      imageDetail: secondCategory.imageDetail,
    })

    const categories = await retrieveCategories()

    expect(categories).to.exist
    expect(categories).to.be.instanceOf(Array)
    expect(categories).to.have.lengthOf(2)
  })
})
