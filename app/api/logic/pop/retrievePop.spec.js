import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { User, Category, Pop, SalePop } from '../../data/models'
import retrievePop from './retrievePop'
import { cleanUp, generate } from '../helpers/tests'
import calculateTrendingValue from '../helpers/tests/calculateTrendingValue'

dotenv.config()

describe('retrievePop', () => {
  before(async () => {
    await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_TEST}`
    )
  })

  let user
  let category
  let pop
  let salePop
  let secondSalePop
  let thirdSalePop

  beforeEach(async () => {
    user = generate.user()
    category = generate.category()
    pop = generate.pop()
    salePop = generate.salePop()
    secondSalePop = generate.salePop()
    thirdSalePop = generate.salePop()

    await cleanUp()
  })

  after(async () => {
    await mongoose.disconnect()
  })

  it('succeeds on retrieve pop without an user logged', async () => {
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

    const popRecovered = await retrievePop({ popId: popCreated.id })

    expect(popRecovered).to.exist
    expect(popRecovered.variant).to.equal(pop.variant)
    expect(popRecovered.exclusivity).to.equal(pop.exclusivity)
    expect(popRecovered.name).to.equal(pop.name)
    expect(popRecovered.number).to.equal(pop.number)
    expect(popRecovered.images).to.be.instanceOf(Array)
    expect(popRecovered.images).to.have.lengthOf(2)
    expect(popRecovered.category.id).to.equal(categoryCreated.id)
    expect(popRecovered.category.name).to.equal(category.name)
    expect(popRecovered.collect).to.equal(pop.collect)
    expect(popRecovered.release).to.equal(pop.release)
    expect(popRecovered.availability).to.equal(pop.availability)
    expect(popRecovered.trendingValue).to.equal(undefined)
    expect(popRecovered.userCollect).to.be.false
    expect(popRecovered.userWhislist).to.be.false
  })

  it('succeeds on retrieve pop with an user logged', async () => {
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
      role: 'user',
    })

    const userRegistered = await User.findOne({ email: user.email })

    const popRecovered = await retrievePop({
      userId: userRegistered.id,
      popId: popCreated.id,
    })

    expect(popRecovered).to.exist
    expect(popRecovered.variant).to.equal(pop.variant)
    expect(popRecovered.exclusivity).to.equal(pop.exclusivity)
    expect(popRecovered.name).to.equal(pop.name)
    expect(popRecovered.number).to.equal(pop.number)
    expect(popRecovered.images).to.be.instanceOf(Array)
    expect(popRecovered.images).to.have.lengthOf(2)
    expect(popRecovered.category.id).to.equal(categoryCreated.id)
    expect(popRecovered.category.name).to.equal(category.name)
    expect(popRecovered.collect).to.equal(pop.collect)
    expect(popRecovered.release).to.equal(pop.release)
    expect(popRecovered.availability).to.equal(pop.availability)
    expect(popRecovered.trendingValue).to.equal(undefined)
    expect(popRecovered.userCollect).to.be.false
    expect(popRecovered.userWhislist).to.be.false
    expect(userRegistered.popCollect).to.be.instanceOf(Array)
    expect(userRegistered.popCollect).to.have.lengthOf(0)
    expect(userRegistered.popWhislist).to.be.instanceOf(Array)
    expect(userRegistered.popWhislist).to.have.lengthOf(0)
  })

  it('succeeds on retrieve pop with trending value', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: 'user',
    })

    const userRegistered = await User.findOne({ email: user.email })

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

    await SalePop.create({
      author: userRegistered.id,
      description: salePop.description,
      condition: salePop.condition,
      pop: popCreated.id,
      images: salePop.images,
      price: salePop.price,
      status: 'Sold',
    })

    await SalePop.create({
      author: userRegistered.id,
      description: secondSalePop.description,
      condition: secondSalePop.condition,
      pop: popCreated.id,
      images: secondSalePop.images,
      price: secondSalePop.price,
      status: 'Sold',
    })

    await SalePop.create({
      author: userRegistered.id,
      description: thirdSalePop.description,
      condition: thirdSalePop.condition,
      pop: popCreated.id,
      images: thirdSalePop.images,
      price: thirdSalePop.price,
      status: 'Available',
    })

    const popRecovered = await retrievePop({ popId: popCreated.id })

    const _trendingValue = calculateTrendingValue([
      salePop.price,
      secondSalePop.price,
    ])

    expect(popRecovered).to.exist
    expect(popRecovered.trendingValue).to.equal(_trendingValue)
  })

  it('fails on non-existing pop', async () => {
    try {
      await retrievePop({ popId: '123123123123123123123123' })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('Pop not found! 😥')
    }
  })

  it('fails on an user logged but non-existing user', async () => {
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

    try {
      await retrievePop({
        userId: '123123123123123123123123',
        popId: popCreated.id,
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User not found! 😥')
    }
  })
})
