import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { User, Category, Pop } from '../../data/models'
import createPop from './createPop'
import { cleanUp, generate } from '../helpers/tests'

dotenv.config()

describe('createPop', () => {
  before(async () => {
    await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_TEST}`
    )
  })

  let user
  let category
  let pop

  beforeEach(async () => {
    user = generate.user()
    category = generate.category()
    pop = generate.pop()

    await cleanUp()
  })

  after(async () => {
    await mongoose.disconnect()
  })

  it('succeeds on create new pop', async () => {
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

    const categoryCreated = await Category.findOne({ name: category.name })

    await createPop({
      userId: userRegistered.id,
      variant: pop.variant,
      exclusivity: pop.exclusivity,
      name: pop.name,
      number: pop.number,
      images: pop.images,
      category: categoryCreated.id,
      collect: pop.collect,
      release: pop.release,
      availability: pop.availability,
    })

    const newPop = await Pop.findOne({ name: pop.name })

    expect(newPop).to.exist
    expect(newPop.variant).to.equal(pop.variant)
    expect(newPop.exclusivity).to.equal(pop.exclusivity)
    expect(newPop.name).to.equal(pop.name)
    expect(newPop.number).to.equal(pop.number)
    expect(newPop.images).to.be.instanceOf(Array)
    expect(newPop.images).to.have.lengthOf(2)
    expect(newPop.category.toString()).to.equal(categoryCreated.id)
    expect(newPop.collect).to.equal(pop.collect)
    expect(newPop.release).to.equal(pop.release)
    expect(newPop.availability).to.equal(pop.availability)
    expect(newPop.trendingValue).to.equal(undefined)
    expect(newPop.userCollect).to.be.false
    expect(newPop.userWhislist).to.be.false
  })

  it('fails on non-existing user', async () => {
    try {
      await createPop({
        userId: '123123123123123123123123',
        variant: pop.variant,
        exclusivity: pop.exclusivity,
        name: pop.name,
        number: pop.number,
        images: pop.images,
        category: '123123123123123123123123',
        collect: pop.collect,
        release: pop.release,
        availability: pop.availability,
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

    await Category.create({
      name: category.name,
      slug: category.name,
      imageList: category.imageList,
      imageDetail: category.imageDetail,
    })

    const userRegistered = await User.findOne({ email: user.email })

    const categoryCreated = await Category.findOne({ name: category.name })

    try {
      await createPop({
        userId: userRegistered.id,
        variant: pop.variant,
        exclusivity: pop.exclusivity,
        name: pop.name,
        number: pop.number,
        images: pop.images,
        category: categoryCreated.id,
        collect: pop.collect,
        release: pop.release,
        availability: pop.availability,
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal(
        'You do not have permissions to perform this action! 😥'
      )
    }
  })
})
