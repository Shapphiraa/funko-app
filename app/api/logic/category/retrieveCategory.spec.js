import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { Category } from '../../data/models'
import retrieveCategory from './retrieveCategory'
import { cleanUp, generate } from '../helpers/tests'

dotenv.config()

describe('retrieveCategory', () => {
  before(async () => {
    await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_TEST}`
    )
  })

  let category

  beforeEach(async () => {
    category = generate.category()

    await cleanUp()
  })

  after(async () => {
    await mongoose.disconnect()
  })

  it('succeeds on retrieve category', async () => {
    await Category.create({
      name: category.name,
      slug: category.name,
      imageList: category.imageList,
      imageDetail: category.imageDetail,
    })

    const categoryRecovered = await retrieveCategory({ slug: category.name })

    expect(categoryRecovered).to.exist
    expect(categoryRecovered.name).to.equal(category.name)
    expect(categoryRecovered.imageDetail).to.equal(
      categoryRecovered.imageDetail
    )
  })

  it('fails on non-existing category', async () => {
    try {
      await retrieveCategory({ slug: category.name })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('Category not found! 😥')
    }
  })
})
