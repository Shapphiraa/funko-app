import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { User, Category } from '../../data/models'
import createCategory from './createCategory'
import { cleanUp, generate } from '../helpers/tests'
import slugify from 'slugify'

dotenv.config()

describe('createCategory', () => {
  before(async () => {
    await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_TEST}`
    )
  })

  let user
  let category

  beforeEach(async () => {
    user = generate.user()
    category = generate.category()

    await cleanUp()
  })

  after(async () => {
    await mongoose.disconnect()
  })

  it('succeeds on create new category', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: 'admin',
    })

    const userRegistered = await User.findOne({ email: user.email })

    await createCategory({
      userId: userRegistered.id,
      name: category.name,
      imageList: category.imageList,
      imageDetail: category.imageDetail,
    })

    const newCategory = await Category.findOne({ name: category.name })

    expect(newCategory).to.exist
    expect(newCategory.name).to.equal(category.name)
    expect(newCategory.slug).to.equal(
      slugify(newCategory.name, { lower: true, locale: 'en' })
    )
    expect(newCategory.imageList).to.equal(category.imageList)
    expect(newCategory.imageDetail).to.equal(category.imageDetail)
  })

  it('fails on non-existing user', async () => {
    try {
      await createCategory({
        userId: '123123123123123123123123',
        name: category.name,
        imageList: category.imageList,
        imageDetail: category.imageDetail,
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User not found! 😥')
    }
  })

  it('fails on user not have permissions to perform this action', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: 'user',
    })

    const userRegistered = await User.findOne({ email: user.email })

    await createCategory({
      userId: userRegistered.id,
      name: category.name,
      imageList: category.imageList,
      imageDetail: category.imageDetail,
    })

    try {
      await Category.findOne({ name: category.name })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal(
        'You do not have permissions to perform this action! 😥'
      )
    }
  })

  it('fails on new category has already created', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: 'admin',
    })

    await Category.create({
      name: category.name,
      slug: category.name,
      imageList: category.imageList,
      imageDetail: category.imageDetail,
    })

    const userRegistered = await User.findOne({ email: user.email })

    try {
      await createCategory({
        userId: userRegistered.id,
        name: category.name,
        imageList: category.imageList,
        imageDetail: category.imageDetail,
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('This category is already created! 😥')
    }
  })
})
