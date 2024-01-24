import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { User, Category, Pop } from '../../data/models'
import updatePop from './updatePop'
import { cleanUp, generate } from '../helpers/tests'

dotenv.config()

describe('updatePop', () => {
  before(async () => {
    await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_TEST}`
    )
  })

  let user
  let category
  let pop
  let updatedPop

  beforeEach(async () => {
    user = generate.user()
    category = generate.category()
    pop = generate.pop()
    updatedPop = generate.pop()

    await cleanUp()
  })

  after(async () => {
    await mongoose.disconnect()
  })

  it('succeeds on update pop', async () => {
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
    })

    const userRegistered = await User.findOne({ email: user.email })

    await updatePop({
      userId: userRegistered.id,
      popId: popCreated.id,
      variant: updatedPop.variant,
      exclusivity: updatedPop.exclusivity,
      name: updatedPop.name,
      number: updatedPop.number,
      category: categoryCreated.id,
      images: updatedPop.images,
      collect: updatedPop.collect,
      release: updatedPop.release,
      availability: updatedPop.availability,
    })

    const popUpdatedRecovered = await Pop.findById(popCreated.id)

    expect(popUpdatedRecovered).to.exist
    expect(popUpdatedRecovered.variant).to.equal(updatedPop.variant)
    expect(popUpdatedRecovered.exclusivity).to.equal(updatedPop.exclusivity)
    expect(popUpdatedRecovered.name).to.equal(updatedPop.name)
    expect(popUpdatedRecovered.number).to.equal(updatedPop.number)
    expect(popUpdatedRecovered.category.toString()).to.equal(categoryCreated.id)
    expect(popUpdatedRecovered.collect).to.equal(updatedPop.collect)
    expect(popUpdatedRecovered.release).to.equal(updatedPop.release)
    expect(popUpdatedRecovered.availability).to.equal(updatedPop.availability)
  })

  it('fails on non-existing pop', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: 'admin',
    })

    const userRegistered = await User.findOne({ email: user.email })

    try {
      await updatePop({
        userId: userRegistered.id,
        popId: '123123123123123123123123',
        variant: updatedPop.variant,
        exclusivity: updatedPop.exclusivity,
        name: updatedPop.name,
        number: updatedPop.number,
        category: '123123123123123123123123',
        images: updatedPop.images,
        collect: updatedPop.collect,
        release: updatedPop.release,
        availability: updatedPop.availability,
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('Pop not found! 😥')
    }
  })

  it('fails on non-existing user', async () => {
    try {
      await updatePop({
        userId: '123123123123123123123123',
        popId: '123123123123123123123123',
        variant: updatedPop.variant,
        exclusivity: updatedPop.exclusivity,
        name: updatedPop.name,
        number: updatedPop.number,
        category: '123123123123123123123123',
        images: updatedPop.images,
        collect: updatedPop.collect,
        release: updatedPop.release,
        availability: updatedPop.availability,
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

    try {
      await updatePop({
        userId: userRegistered.id,
        popId: '123123123123123123123123',
        variant: updatedPop.variant,
        exclusivity: updatedPop.exclusivity,
        name: updatedPop.name,
        number: updatedPop.number,
        category: '123123123123123123123123',
        images: updatedPop.images,
        collect: updatedPop.collect,
        release: updatedPop.release,
        availability: updatedPop.availability,
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal(
        'You do not have permissions to perform this action! 😥'
      )
    }
  })
})
