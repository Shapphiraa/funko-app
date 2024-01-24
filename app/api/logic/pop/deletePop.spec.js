import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { User, Category, Pop } from '../../data/models'
import deletePop from './deletePop'
import { cleanUp, generate } from '../helpers/tests'

dotenv.config()

describe('deletePop', () => {
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

  it('succeeds on delete pop', async () => {
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
      role: 'admin',
      popCollection: [popCreated.id],
      popWhislist: [popCreated.id],
    })

    const userRegistered = await User.findOne({ email: user.email })

    await deletePop(userRegistered.id, { id: popCreated.id })

    const popDeleted = await Pop.findById(popCreated.id)

    const userRecovered = await User.findById(userRegistered.id)

    expect(popDeleted).to.be.null
    expect(userRecovered.popCollect).to.have.lengthOf(0)
    expect(userRecovered.popWhislist).to.have.lengthOf(0)
  })

  it('fails on non-existing pop', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: 'admin',
      popCollection: [],
      popWhislist: [],
    })

    const userRegistered = await User.findOne({ email: user.email })

    try {
      await deletePop(userRegistered.id, { id: '123123123123123123123123' })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('Pop not found! 😥')
    }
  })

  it('fails on non-existing user', async () => {
    try {
      await deletePop('123123123123123123123123', {
        id: '123123123123123123123123',
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
      popCollection: [],
      popWhislist: [],
    })

    const userRegistered = await User.findOne({ email: user.email })

    try {
      await deletePop(userRegistered.id, { id: '123123123123123123123123' })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal(
        'You do not have permissions to perform this action! 😥'
      )
    }
  })
})
