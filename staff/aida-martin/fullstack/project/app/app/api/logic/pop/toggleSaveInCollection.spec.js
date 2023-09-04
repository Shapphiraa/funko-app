import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { User, Category, Pop } from '../../data/models'
import toggleSaveInCollection from './toggleSaveInCollection'
import { cleanUp, generate } from '../helpers/tests'

dotenv.config()

describe('toggleSaveInCollection', () => {
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

  it('succeeds on save pop in user collection', async () => {
    await Category.create({
      name: category.name,
      slug: category.name,
      imageList: category.imageList,
      imageDetail: category.imageDetail,
    })

    const categoryCreated = await Category.findOne({ name: category.name })

    await Pop.create({
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

    const popCreated = await Pop.findOne({ name: pop.name })

    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      popCollect: [],
    })

    const userRegistered = await User.findOne({ email: user.email })

    await toggleSaveInCollection(userRegistered.id, { id: popCreated.id })

    const userRecovered = await User.findById(userRegistered.id)

    expect(userRecovered.popCollect).to.be.instanceOf(Array)
    expect(userRecovered.popCollect).to.include(popCreated.id)
  })

  it('succeeds on remove pop of user collection', async () => {
    await Category.create({
      name: category.name,
      slug: category.name,
      imageList: category.imageList,
      imageDetail: category.imageDetail,
    })

    const categoryCreated = await Category.findOne({ name: category.name })

    await Pop.create({
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

    const popCreated = await Pop.findOne({ name: pop.name })

    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      popCollect: [popCreated.id],
    })

    const userRegistered = await User.findOne({ email: user.email })

    await toggleSaveInCollection(userRegistered.id, { id: popCreated.id })

    const userRecovered = await User.findById(userRegistered.id)

    expect(userRecovered.popCollect).to.be.instanceOf(Array)
    expect(userRecovered.popCollect).to.have.lengthOf(0)
  })

  it('fails on non-existing user', async () => {
    try {
      await toggleSaveInCollection('123123123123123123123123', {
        id: '123123123123123123123123',
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User not found! 😥')
    }
  })

  it('fails on non-existing pop', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      popCollect: [],
    })

    const userRegistered = await User.findOne({ email: user.email })

    try {
      await toggleSaveInCollection(userRegistered.id, {
        id: '123123123123123123123123',
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('Pop not found! 😥')
    }
  })
})
