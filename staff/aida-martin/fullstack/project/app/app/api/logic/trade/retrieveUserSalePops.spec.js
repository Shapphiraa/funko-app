import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { User, Category, Pop, SalePop } from '../../data/models'
import retrieveUserSalePops from './retrieveUserSalePops'
import { cleanUp, generate } from '../helpers/tests'

dotenv.config()

describe('retrieveUserSalePops', () => {
  before(async () => {
    await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_TEST}`
    )
  })

  let user
  let secondUser
  let category
  let pop
  let secondPop
  let salePop

  beforeEach(async () => {
    user = generate.user()
    secondUser = generate.user()
    category = generate.category()
    pop = generate.pop()
    secondPop = generate.pop()
    salePop = generate.salePop()

    await cleanUp()
  })

  after(async () => {
    await mongoose.disconnect()
  })

  it('succeeds on retrieve user sale pops', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    const userRegistered = await User.findOne({ email: user.email })

    await User.create({
      name: secondUser.name,
      email: secondUser.email,
      password: secondUser.password,
    })

    const secondUserRegistered = await User.findOne({ email: secondUser.email })

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

    await Pop.create({
      variant: secondPop.variant,
      exclusivity: secondPop.exclusivity,
      name: secondPop.name,
      number: secondPop.number,
      images: secondPop.images,
      category: categoryCreated.id,
      collect: secondPop.collect,
      release: secondPop.release,
      availability: secondPop.availability,
    })

    const secondPopCreated = await Pop.findOne({ name: secondPop.name })

    await SalePop.create({
      author: userRegistered.id,
      description: salePop.description,
      condition: salePop.condition,
      pop: popCreated.id,
      images: salePop.images,
      price: salePop.price,
      status: 'Available',
    })

    await SalePop.create({
      author: secondUserRegistered.id,
      description: salePop.description,
      condition: salePop.condition,
      pop: secondPopCreated.id,
      images: salePop.images,
      price: salePop.price,
      status: 'Reserved',
    })

    await SalePop.create({
      author: userRegistered.id,
      description: salePop.description,
      condition: salePop.condition,
      pop: popCreated.id,
      images: salePop.images,
      price: salePop.price,
      status: 'Sold',
    })

    const userSalePopsRecovered = await retrieveUserSalePops({
      userId: userRegistered.id,
    })

    expect(userSalePopsRecovered).to.exist
    expect(userSalePopsRecovered).to.be.instanceOf(Array)
    expect(userSalePopsRecovered).to.have.lengthOf(1)
    expect(userSalePopsRecovered[0].status).to.be.equal('Available')
  })

  it('fails on non-existing user', async () => {
    try {
      await retrieveUserSalePops({
        userId: '123123123123123123123123',
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User not found! 😥')
    }
  })
})
